// OME-Zarr TileSource – renders multiscale OME-Zarr data (plain folder or *.ozx* zip)
// as a normal OpenSeadragon TileSource.

// OME-Zarr TileSource – reads multiscale OME-Zarr data (plain folder
// or *.ozx* zip) and presents it to OpenSeadragon as a normal
// TileSource.  A simple predictive prefetcher is added that,
//
// The code now supports a per‑tile cache (with debug logging) and a
// predictive prefetcher for whole‑slice (Z/T/C) data.
//   • pre-loads neighbouring slices (Z, C, T) when a source becomes
//     ready, and
//   • stores the pre‑fetched sources in a global cache so that
//     subsequent requests can reuse them.
//

import * as zarr from "./zarrita/index.js";
import { renderImage } from "./ome-zarr.js";
import ZipFileStore from "./zarrita-storage/zip.js";
import OpenSeadragon from "openseadragon";

// Import codecs (they are side‑effect‑imported by codec‑bootstrap)
import "numcodecs/blosc.js";
import "numcodecs/gzip.js";
import "numcodecs/zlib.js";
import "numcodecs/lz4.js";
import "numcodecs/zstd.js";

// Import the codec bootstrap to ensure proper initialization
import { codecBootstrapReady } from "./codec-bootstrap.js";

// ---------------------------------------------------------------------- /
//  Global slice prefetch cache (whole‑slice TileSources)  /
// ---------------------------------------------------------------------- //
// Prefetch cache management
const prefetchCache = new Map();
const MAX_PREFETCH_CACHE_SIZE = 64; // Reduced from 256
const MAX_PREFETCH_CACHE_DISTANCE = 2; // Reduced from 4
const MAX_PREFETCH_WORKERS = 8; // Reduced from 32
const MAX_PREFETCH_TILES = 4;

//-----------------------------------------------------------------
//   Global per‑tile cache – shared by **all** OmeNgffOzxTileSource instances.
//   The key already contains the Z/T/C indices, so tiles for different
//   slices can safely live together.
//----------------------------------------------------------------- //
class GlobalTileCache {
  constructor(maxSize = MAX_PREFETCH_CACHE_SIZE) {
    this.map = new Map(); // key → dataURL
    this.maxSize = maxSize;
  }

  get(key) {
    const value = this.map.get(key);
    // Strict LRU logic: When a tile is accessed, move it to the "newest" end of the map
    if (value !== undefined) {
      this.map.delete(key);
      this.map.set(key, value);
    }
    return value;
  }

  has(key) {
    return this.map.has(key);
  }

  set(key, v) {
    // If updating, delete to push it to the end
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    this.map.set(key, v);
    this._trim();
  }

  delete(key) {
    this.map.delete(key);
  }

  _trim() {
    // Delete in batches to reduce GC pressure and thrashing
    const overage = this.map.size - this.maxSize;
    if (overage > 0) {
      const keysIterator = this.map.keys();
      for (let i = 0; i < overage; i++) {
        const oldest = keysIterator.next().value;
        this.map.delete(oldest);
      }
    }
  }
}

// ---------------------------------------------------------------------
//  OmeNgffOzxTileSource
// ---------------------------------------------------------------------
export class OmeNgffOzxTileSource extends OpenSeadragon.TileSource {
  // --------------------------------------------------------------------
  //  Dummy XHR required by the OpenSeadragon download API
  // -------------------------------------------------------------------- //
  static DUMMY_XHR = new XMLHttpRequest();

  // -------------------------------------------------------------- //
  //  Helper – dropin `once` that uses the normal OpenSeadragon API.   //
  // -------------------------------------------------------------- //
  once(eventName, handler) {
    // Keep a reference to the wrapper so we can remove it after 1 call.
    const wrapper = (...args) => {
      handler(...args);
      this.removeHandler(eventName, wrapper);
    };
    this.addHandler(eventName, wrapper);
  }

  // --------------------------------------------------------------------
  //  Constructor – accepts a string (URL), a File (local *.ozx*), or an
  //  object `{ url, z?, t?, c?, prefetch?, zip? }`.
  // --------------------------------------------------------------------
  //
  //  Constructor – keep a reference to the original File and
  //  remember whether we are dealing with a zip file.
  //
  // Constructor – accepts a string (URL), a File (local *.ozx*), or an
  // object `{ url, z?, t?, c?, prefetch?, zip? }`.
  //
  // @param {Object|string|File} config
  //   * If a string – interpreted as a URL.
  //   * If a File – a local *.ozx* file.
  //   * If an object – `{url:..., z:?, t:?, c:?}`.

  constructor(config, options = {}) {
    // no arguments for the base TileSource
    super(); // OSD TileSource base

    // -------------------------------------------------------------
    // 1️⃣  Keep a **shared** per‑tile cache (instead of a brand‑new
    //      Map for each instance).  This is the core of “cache all
    //      current tiles and reuse them later”.
    // -------------------------------------------------------------
    const maxTileCacheSize = options.maxTileCacheSize ?? MAX_PREFETCH_CACHE_SIZE;

    // If the caller passes a custom cache we honour it, otherwise we
    // fall back to the global one that will be created later
    // (static property on the class).
    this._tileCache = (options.sharedTileCache ?? OmeNgffOzxTileSource.globalTileCache).map;

    // Store the **limit** on that shared cache so we don’t grow without
    // bound.  The `set` method of `GlobalTileCache` already trims the map,
    // but we keep the per‑instance limit for the existing
    // `_maintainTileCacheSize` helper.
    OmeNgffOzxTileSource.globalTileCache.maxSize = maxTileCacheSize;
    this._maxTileCacheSize = maxTileCacheSize; // used by _maintainTileCacheSize

    // -------------------------------------------------------------
    // (the rest of the original constructor stays exactly the same)
    // -------------------------------------------------------------

    // ----------  Codec ready ------------------------------------------------
    // Ensure codecs are ready before proceeding
    this._codecReady = codecBootstrapReady;

    // ----------  Normalise config ----------------------------------------

    // -----------------------------------------------------------------
    // Normalise the incoming config – we keep a *stable* identifier for the
    // source that never changes when a blob URL is created.  This identifier
    // is later used for tile‑hashes and pre‑fetch keys.
    // -----------------------------------------------------------------
    let rawUrl;
    if (typeof config === "string") {
      rawUrl = config;
      this.z = undefined;
      this.t = undefined;
      this.c = undefined;
    } else {
      rawUrl = config.url;

      // Only set indices if they were explicitly provided
      this.z = "z" in config ? config.z : undefined;
      this.t = "t" in config ? config.t : undefined;
      this.c = "c" in config ? config.c : undefined;

      // optional user‑provided flag (remote .ozx files)
      this.zip = config.zip;

      // Allow passing an existing store to avoid re-parsing ZIP files
      this.store = config.store;
    }

    // -----------------------------------------------------------------
    // Store a stable key for the source – the original file name for local
    // files, otherwise the exact URL string that was passed in.
    // -----------------------------------------------------------------
    this._sourceKey = rawUrl instanceof File ? rawUrl.name : String(rawUrl);

    // ----------  Disable automatic prefetching if requested --------------
    // -------------------------------------------------------------------
    //  Allow the caller to disable the automatic pre‑fetching.
    // ------------------------------------------------------------------- //

    this.prefetchEnabled =
      config && typeof config === "object" && "prefetch" in config ? !!config.prefetch : true;

    // ----------  File handling – keep original File and create blob URL ----
    // -----------------------------------------------------------------
    // Keep a reference to a File object (if we got one) and build a *blob*
    // URL for the internal loader.  Blob URLs do **not** carry the original
    // filename extension, so we also retain the original File so that later
    // updates can reconstruct a proper ZipFileStore.
    // -----------------------------------------------------------------

    // ---------------------------------------------------------------
    // File handling – keep the original `File` object (if we have one) and
    // create a blob URL *only* for the OpenSeadragon side‑effects.
    // ---------------------------------------------------------------
    if (rawUrl instanceof File) {
      this._file = rawUrl;
      const lowerName = rawUrl.name.toLowerCase();
      this.isZip = lowerName.endsWith(".ozx") || lowerName.endsWith(".zip");
      this._sourceUrl = URL.createObjectURL(rawUrl); // for OSD only
    } else {
      this._file = null;
      const lowerUrl = String(rawUrl).toLowerCase();
      this.isZip =
        typeof rawUrl === "string" && (lowerUrl.endsWith(".ozx") || lowerUrl.endsWith(".zip"));
      this._sourceUrl = rawUrl; // string URL
    }

    // Public property expected by the demo and OSD – holds the URL (blob or remote)
    // Public property (used by the UI/demo) – the actual URL string that
    // OpenSeadragon sees.  For local files this is a blob URL, for remote
    // files it is the original URL.
    this.url = this._sourceUrl;

    // ----------  Basic properties ----------------------------------------
    // Default values – will be overwritten once the Zarr group is read.
    this.aspectRatio = 1;
    this.dimensions = new OpenSeadragon.Point(10, 10);
    this.maxLevel = 0;
    this.maxWidthArr = new Array();
    this.maxHeightArr = new Array();
    this.ready = false;
    this.CurrentLevel = 0;

    this._omero = undefined;
    this._multiscale = undefined;
    this._axisIndices = undefined;
    this._arrays = undefined;

    // ----------  Slice prefetcher --------------------------------------- //
    this.prefetchDistance = options.prefetchDistance ?? MAX_PREFETCH_CACHE_DISTANCE;
    this.prefetchConcurrency = options.prefetchConcurrency ?? MAX_PREFETCH_WORKERS;
    this.activePrefetches = 0;
    this.prefetchQueue = [];

    // ----------  Global prefetch cache (slice level) ------------------- //
    // (prefetchCache defined above – shared by all instances)

    // ----------  Load the metadata – asynchronous -----------------------
    // ----‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑-
    //   • If a source for the same URL+Z/T/C combination was already
    //     created by the pre‑fetcher, reuse its metadata instead of
    //     loading it again.
    //   • The key must be exactly the same as the one used in
    //     `_getPrefetchKey()` (file‑name + z/t/c).
    // --------------------------------------------------------------------
    const prefKey = `${this._sourceKey}_z${this.z ?? 0}_t${this.t ?? 0}_c${this.c ?? 0}`;
    const cached = prefetchCache.get(prefKey);
    if (cached) {
      // Copy the ready state from the cached source.
      this._omero = cached._omero;
      this._multiscale = cached._multiscale;
      this._axisIndices = cached._axisIndices;
      this._arrays = cached._arrays;
      this.aspectRatio = cached.aspectRatio;
      this.dimensions = cached.dimensions;
      this.maxLevel = cached.maxLevel;
      this.ready = true;

      // Clone the tile cache so that the new instance can serve the prefetched tiles.
      //this._tileCache    = new Map(cached._tileCache);
      // **Share** the tile cache – it already contains Z/T/C in the key,
      // so tiles for different slices can coexist safely.
      // Sharing the reference means that tiles added later by the
      // pre‑fetcher become instantly visible to every source that uses the
      // same image.
      this._tileCache = cached._tileCache;
      console.debug(`Reusing prefetched source for ${prefKey}`);
      // The “ready” listener (registered a few lines below) will start
      // pre‑fetching neighbours of the *new* slice.
      this.raiseEvent("ready", { tileSource: this });
    } else {
      // No cached source – load the metadata the normal way.
      this.getImageInfo(this._sourceUrl);
    }

    // ----------  Start prefetching

    // ----------  Start prefetching when source is ready -----------------
    this.once("ready", () => {
      if (this.prefetchEnabled) this._startPrefetching();
    });
    return;
  }

  // ----------------------------------------------------------------------
  //  Read the full OME-Zarr metadata, build multiscale arrays,
  //  and fire the `"ready"` event.
  // ---------------------------------------------------------------------- //
  async getImageInfo(url) {
    await this._codecReady;
    // Check if numcodecs global is available
    if (typeof globalThis.numcodecs !== "undefined") {
      console.debug("[OMEZarr] numcodecs global available");
      const zstdCodec = globalThis.numcodecs.getCodec("zstd");
      console.debug("[OMEZarr] ZSTD codec:", zstdCodec ? "available" : "missing");
      console.debug("[OMEZarr] Codecs are ready, proceeding with Zarr opening");
    } else {
      console.warn("[OMEZarr] numcodecs global not available");
    }

    console.debug(`getting image info for ${url}`);

    // -----------------------------------------------------------------
    // Choose the appropriate Zarr store:
    //   • If we have the original File → BlobReader (`fromBlob`)
    //   • Otherwise a remote *.ozx* → HTTPRangeReader (`fromUrl`)
    //   • Non‑zip → plain FetchStore
    // -----------------------------------------------------------------
    // If the source is a ZIP (remote or local) use ZipFileStore.
    // For a local .ozx File we have the original File object in this._file,
    // which lets us use the BlobReader path (no HEAD request needed).
    // Choose store – use provided one or create new
    if (!this.store) {
      this.store =
        this.isZip || this.zip
          ? this._file
            ? ZipFileStore.fromBlob(this._file)
            : ZipFileStore.fromUrl(url)
          : new zarr.FetchStore(url);
    }
    const store = this.store;

    try {
      let group = await zarr.open(store, { kind: "group" });

      // Recursive search helper
      const findMultiscalesInfo = (obj) => {
        if (!obj || typeof obj !== "object") return null;
        if (obj.multiscales) {
          return { multiscales: obj.multiscales, omero: obj.omero };
        }
        for (const key in obj) {
          const result = findMultiscalesInfo(obj[key]);
          if (result) return result;
        }
        return null;
      };

      let info = findMultiscalesInfo(group.attrs);
      let multiscales = info?.multiscales;
      let omero = info?.omero;

      // Fallback for OME-Zarr v0.5 / bioformats2raw layout:
      // If the root doesn't have multiscales, try opening the "0" subgroup.
      if (!multiscales) {
        try {
          console.log("[OmeNgff] Root has no multiscales, trying subgroup '0'...");
          const subGroup = await zarr.open(group.resolve("0"), { kind: "group" });
          const subInfo = findMultiscalesInfo(subGroup.attrs);
          if (subInfo) {
            console.log("[OmeNgff] Found multiscales in subgroup '0'");
            multiscales = subInfo.multiscales;
            omero = subInfo.omero;
            group = subGroup; // Use this group for subsequent resolutions
          }
        } catch (e) {
          console.debug("[OmeNgff] No '0' subgroup found or it has no metadata.");
        }
      }

      if (!multiscales || multiscales.length === 0) {
        throw new Error("missing multiscales metadata in OME‑Zarr metadata");
      }

      const multiscale = multiscales[0];
      const axisIndices = OmeNgffOzxTileSource._getAxisIndices(multiscale);

      console.debug("OME-Zarr Multiscales:", multiscale);

      const arrays = await Promise.all(
        multiscale.datasets.map(async (ds) => {
          let dsPath = ds.path;
          if (dsPath === "." || dsPath === "") dsPath = "/";
          const arrayPath = group.resolve(dsPath);
          console.debug(`Opening multiscale array at: ${arrayPath.path} (original: ${ds.path})`);
          try {
            return await zarr.open(arrayPath, { kind: "array" });
          } catch (e) {
            console.error(`Failed to open array at ${arrayPath.path}. Error:`, e);
            const fallbackPath = ds.path.replace(/^\//, "");
            if (fallbackPath !== ds.path) {
              console.debug(`Trying fallback path: ${fallbackPath}`);
              return await zarr.open(group.resolve(fallbackPath), { kind: "array" });
            }
            throw e;
          }
        })
      );

      const maxWidth = arrays[0].shape[axisIndices.x];
      const maxHeight = arrays[0].shape[axisIndices.y];

      this._omero = omero;
      this._multiscale = multiscale;
      this._axisIndices = axisIndices;
      this._arrays = arrays;

      this.aspectRatio = maxWidth / maxHeight;
      this.dimensions = new OpenSeadragon.Point(maxWidth, maxHeight);
      this.maxLevel = arrays.length - 1;
      this.ready = true;

      for (let i = 0; i < arrays.length; i++) {
        this.maxWidthArr[i] = arrays[i].shape[axisIndices.x];
        this.maxHeightArr[i] = arrays[i].shape[axisIndices.y];
      }

      console.debug(`!!!arrays maxWidth` + this.maxWidthArr);
      console.debug(`!!!arrays maxHeight` + this.maxHeightArr);

      console.debug(`OME‑Zarr ready for ${url}`);
      this.raiseEvent("ready", { tileSource: this });
    } catch (err) {
      this._omero = undefined;
      this._multiscale = undefined;
      this._axisIndices = undefined;
      this._arrays = undefined;

      this.aspectRatio = 1;
      this.dimensions = new OpenSeadragon.Point(10, 10);
      this.maxLevel = 0;
      this.ready = false;
      console.error(`failed to get image info for ${url}: ${err}`);
      this.raiseEvent("open-failed", { message: err.toString(), source: url });
    }
  }

  // -----------------------------------------------------------------
  // --------------------  TileSource API IMPLEMENTATION  -------------
  // -----------------------------------------------------------------
  // --------------------------------------------------------------------
  //  TileSource API: dimensions, level scales
  // --------------------------------------------------------------------

  // Add bounds checking to getTileWidth and getTileHeight methods

  getTileWidth(level) {
    if (!this._axisIndices || !this._arrays) {
      throw new Error("tile source not ready");
    }

    //// Ensure level is within bounds
    //level = Math.max(0, Math.min(level, this.maxLevel));

    if (level < 0 || level > this.maxLevel) {
      //throw new Error("level out of bounds");
      if (level < 0) {
        console.debug(`level=${level} < 0 while downloading tile, set level=${0}`);
        level = 0;
      }
      if (level > this.maxLevel) {
        console.debug(
          `level=${level} > ${this.maxLevel} while downloading tile, set level=${this.maxLevel}`
        );
        level = this.maxLevel;
      }
    }

    const arrayIndex = this.maxLevel - level;
    //const arrayIndex = level;
    if (arrayIndex < 0 || arrayIndex >= this._arrays.length) {
      throw new Error("array index out of bounds");
    }
    const array = this._arrays[arrayIndex];
    return array.chunks[this._axisIndices.x];
  }

  getTileHeight(level) {
    if (!this._axisIndices || !this._arrays) {
      throw new Error("tile source not ready");
    }

    //// Ensure level is within bounds
    //level = Math.max(0, Math.min(level, this.maxLevel));

    if (level < 0 || level > this.maxLevel) {
      //throw new Error("level out of bounds");
      if (level < 0) {
        console.debug(`level=${level} < 0 while downloading tile, set level=0`);
        level = 0;
      }
      if (level > this.maxLevel) {
        console.debug(
          `level=${level} > ${this.maxLevel} while downloading tile, set level=${this.maxLevel}`
        );
        level = this.maxLevel;
      }
    }

    const arrayIndex = this.maxLevel - level;
    //const arrayIndex = level;
    if (arrayIndex < 0 || arrayIndex >= this._arrays.length) {
      throw new Error("array index out of bounds");
    }
    const array = this._arrays[arrayIndex];
    return array.chunks[this._axisIndices.y];
  }

  getLevelScale(level) {
    if (!this._axisIndices || !this._arrays) {
      throw new Error("tile source not ready");
    }

    //// Ensure level is within bounds
    //level = Math.max(0, Math.min(level, this.maxLevel));

    if (level < 0 || level > this.maxLevel) {
      //throw new Error("level out of bounds");
      if (level < 0) {
        console.debug(`level=${level} < 0 while downloading tile, set level=0`);
        level = 0;
      }
      if (level > this.maxLevel) {
        console.debug(
          `level=${level} > ${this.maxLevel} while downloading tile, set level=${this.maxLevel}`
        );
        level = this.maxLevel;
      }
    }

    //const array = this._arrays[this.maxLevel - level];
    const arrayIndex = this.maxLevel - level;

    // Validate array index
    if (arrayIndex < 0 || arrayIndex >= this._arrays.length) {
      console.debug(`Invalid array index ${arrayIndex} for level ${level}`);
      return 1; // Return default scale
    }

    const array = this._arrays[arrayIndex];
    const arrayWidth = array.shape[this._axisIndices.x];
    const maxWidth = this._arrays[0].shape[this._axisIndices.x];

    // Add safety check to prevent division by zero
    if (maxWidth === 0) {
      console.warn("Max width is 0, returning scale 1");
      return 1;
    }

    // Use a small epsilon to handle floating point rounding
    const scale = arrayWidth / maxWidth;
    return scale;
  }

  // --------------------------------------------------------------------
  //  URL/hash helpers – OSD expects a string for src and a stable hash
  // --------------------------------------------------------------------
  //
  // OpenSeadragon passes a *string* to `downloadTileStart`.  We encode the
  // tile location as query‑string parameters – the `src` is therefore a
  // `URLSearchParams` string such as `level=2&x=3&y=4`.
  //

  // --------------------------------------------------------------------
  //  URL/hash helpers – OSD expects a string for src and a stable hash
  // --------------------------------------------------------------------

  getTileUrl(level, x, y) {
    const p = new URLSearchParams();
    p.append("level", level);
    p.append("x", x);
    p.append("y", y);
    return p.toString();
  }

  // --------------------------------------------------------------------
  // The hash key must be **stable** for a given tile.  We use a full URL
  // (including Z/T/C indices) so that the OSD cache differentiates slices.
  // --------------------------------------------------------------------

  //
  // Build a stable cache‑key for a tile.  For normal HTTP URLs we can safely
  // use the URL constructor; for blob URLs the constructor throws an error,
  // so we fall back to simple string concatenation.
  //
  // Build a stable cache‑key for a tile.
  //
  // For blob URLs we cannot use the `URL` constructor, so we fall back to
  // simple string concatenation.  The key also incorporates the current Z/T/C
  // indices so that the OpenSeadragon cache distinguishes slices.
  //
  //
  // Build a **stable** cache‑key for a tile.
  //
  // • If the source identifier is a real URL (http(s)://, https://, blob: …)
  //   we use the `URL` API so that any existing query string is preserved.
  // • If the identifier is just a plain string (e.g. a file name
  //   “prone.ozx”), we cannot construct a `URL`.  In that case we simply
  //   concatenate the parameters – OpenSeadragon only needs a stable
  //   string for its internal tile‑cache, it never performs a network
  //   request with this value.
  //
  // The result also contains the current Z/T/C indices so that different
  // slices get different cache entries.
  //

  getTileHashKey(level, x, y) {
    const base = this._sourceKey; // stable identifier (file name or full URL)

    const params = new URLSearchParams();
    params.append("level", level);
    params.append("x", x);
    params.append("y", y);
    if (this.z !== undefined) params.append("z", this.z);
    if (this.c !== undefined) params.append("c", this.c);
    if (this.t !== undefined) params.append("t", this.t);

    // Detect whether `base` already looks like a URL (scheme:// or blob:)
    const looksLikeUrl =
      typeof base === "string" && (base.startsWith("blob:") || /^[a-z][a-z0-9+.-]*:/i.test(base));

    if (looksLikeUrl) {
      // Normal URL – keep any existing query string.
      const url = new URL(base);
      url.search = url.search ? `${url.search.slice(1)}&${params.toString()}` : params.toString();
      return url.toString();
    }

    // Not a URL (plain file name).  Just concatenate the query‑string.
    return `${base}?${params.toString()}`;
  }

  // --------------------------------------------------------------------
  //  Helpers needed for predictive pre‑fetching
  // --------------------------------------------------------------------
  //
  // Build a tile URL for a specific slice without permanently changing the source.
  //
  // @param {number} level OSD zoom level.
  // @param {number} x     Tile column.
  // @param {number} y     Tile row.
  // @param {Object} slice {z?,t?,c?} – slice indices to use for this request.
  // @returns {string} URL string that OSD would use for that tile.
  //
  getTileUrlForSlice(level, x, y, slice = {}) {
    // Save the current indices
    const cur = { z: this.z, t: this.t, c: this.c };
    // Apply the temporary slice
    if (slice.z !== undefined) this.z = slice.z;
    if (slice.t !== undefined) this.t = slice.t;
    if (slice.c !== undefined) this.c = slice.c;
    try {
      // Build the URL while the temporary indices are in place
      return this.getTileUrl(level, x, y);
    } finally {
      // Restore the original indices
      this.z = cur.z;
      this.t = cur.t;
      this.c = cur.c;
    }
  }

  // Return the slice currently selected by the viewer (defaults → 0). //
  getCurrentSlice() {
    return { z: this.z ?? 0, t: this.t ?? 0, c: this.c ?? 0 };
  }

  // Return the size of each axis (z, t, c) taken from the Zarr metadata. //
  getAxisLengths() {
    const lens = { z: 0, t: 0, c: 0 };
    if (!this._axisIndices || !this._arrays) return lens;
    const shape = this._arrays[0].shape;
    const idx = this._axisIndices;
    if (idx.z !== undefined) lens.z = shape[idx.z];
    if (idx.t !== undefined) lens.t = shape[idx.t];
    if (idx.c !== undefined) lens.c = shape[idx.c];
    return lens;
  }

  // --------------------------------------------------------------------
  //  Per‑tile cache – logs cache hit / miss
  // --------------------------------------------------------------------
  _maintainTileCacheSize() {
    // Legacy support for instance cache sizing
    // Now handled natively inside GlobalTileCache._trim()
  }

  // --------------------------------------------------------------------
  //  Main tile download routine
  // --------------------------------------------------------------------

  // -----------------------------------------------------------------
  // --------------------  Tile download implementation  ------------
  // -----------------------------------------------------------------

  /**
   * Helper to finish a tile request with a transparent 1x1 pixel image.
   * This is better than finishing with null because some hooks treat
   * null as a load failure.
   */
  _finishWithEmptyTile(context) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const dataUrl = canvas.toDataURL();
    const img = new Image();
    img.onload = () => context.finish(img, OmeNgffOzxTileSource.DUMMY_XHR, "");
    img.src = dataUrl;
  }

  downloadTileStart(context) {
    const abortController = new AbortController();
    context.userData.abortController = abortController;

    const params = new URLSearchParams(context.src);
    let level = Number(params.get("level"));

    if (level < 0 || level > this.maxLevel) {
      level = Math.max(0, Math.min(level, this.maxLevel));
    }

    this.CurrentLevel = level;
    const tileWidth = this.getTileWidth(level);
    const tileHeight = this.getTileHeight(level);
    let x = Number(params.get("x"));
    let y = Number(params.get("y"));

    if (x < 0 || y < 0) {
      this._finishWithEmptyTile(context);
      return;
    }

    const cacheKey = `${level},${x},${y},${this.z ?? 0},${this.c ?? 0},${this.t ?? 0}`;

    // ---- 1. Try to serve from cache ----
    if (this._tileCache.has(cacheKey)) {
      const dataUrl = this._tileCache.get(cacheKey);
      const img = new Image();
      img.onload = () => context.finish(img, OmeNgffOzxTileSource.DUMMY_XHR, "");
      img.src = dataUrl;
      return;
    }

    // ---- 2. Build tile from scratch ----
    try {
      if (!this._multiscale || !this._axisIndices || !this._arrays) {
        throw new Error("tile source not ready");
      }

      const arrayIndex = this.maxLevel - level;
      if (arrayIndex < 0 || arrayIndex >= this._arrays.length) {
        this._finishWithEmptyTile(context);
        return;
      }

      const array = this._arrays[arrayIndex];
      if (!this._validateIndices(array)) {
        this._finishWithEmptyTile(context);
        return;
      }

      const maxTileWidth = array.shape[this._axisIndices.x];
      const maxTileHeight = array.shape[this._axisIndices.y];
      const startX = x * tileWidth;
      const startY = y * tileHeight;

      if (startX >= maxTileWidth || startY >= maxTileHeight) {
        this._finishWithEmptyTile(context);
        return;
      }

      const endX = Math.min(startX + tileWidth, maxTileWidth);
      const endY = Math.min(startY + tileHeight, maxTileHeight);

      if (endX <= startX || endY <= startY) {
        this._finishWithEmptyTile(context);
        return;
      }

      // ---- Render the tile ----
      renderImage(array, this._multiscale.axes, this._omero, {
        x: [startX, endX],
        y: [startY, endY],
        z: this.z,
        c: this.c,
        t: this.t,
      })
        .then(async (dataUrl) => {
          abortController.signal.throwIfAborted();

          if (!dataUrl || !dataUrl.startsWith("data:image/")) {
            this._finishWithEmptyTile(context);
            return;
          }

          this._tileCache.set(cacheKey, dataUrl);
          this._maintainTileCacheSize();

          const img = new Image();
          img.onload = () => context.finish(img, OmeNgffOzxTileSource.DUMMY_XHR, "");
          img.onerror = () => this._finishWithEmptyTile(context);
          img.src = dataUrl;
        })
        .catch((err) => {
          if (!abortController.signal.aborted) {
            console.error(`Render error for tile ${cacheKey}:`, err);
            this._finishWithEmptyTile(context);
          }
        });
    } catch (error) {
      console.error(`Failed to download tile ${cacheKey}:`, error);
      this._finishWithEmptyTile(context);
    }
  }

  downloadTileAbort(context) {
    if (context.userData.abortController) {
      context.userData.abortController.abort();
      context.userData.abortController = undefined;
    }
    if (context.userData.img) {
      context.userData.src = "";
      context.userData.img = undefined;
    }
  }

  // Add this helper method to validate image data
  async _validateImageData(dataUrl, expectedWidth, expectedHeight) {
    return new Promise((resolve) => {
      try {
        // Skip validation for very small images or if validation is disabled
        if (expectedWidth < 10 || expectedHeight < 10) {
          resolve(true);
          return;
        }

        const img = new Image();
        img.onload = () => {
          try {
            // Create a canvas to analyze the image
            const canvas = document.createElement("canvas");
            canvas.width = Math.min(img.width, 16); // Sample small area
            canvas.height = Math.min(img.height, 16);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Get image data and check if it's all transparent or black
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Check if all pixels are transparent
            let allTransparent = true;
            let allBlack = true;

            for (let i = 0; i < data.length; i += 4) {
              const alpha = data[i + 3];
              const red = data[i];
              const green = data[i + 1];
              const blue = data[i + 2];

              // If any pixel has alpha > 0, it's not all transparent
              if (alpha > 0) {
                allTransparent = false;
              }

              // If any pixel has color data, it's not all black
              if (red > 0 || green > 0 || blue > 0) {
                allBlack = false;
              }

              // Early exit if we found non-transparent and non-black pixels
              if (!allTransparent && !allBlack) {
                break;
              }
            }

            // Consider it valid if it's not completely transparent or not completely black
            const isValid = !allTransparent || !allBlack;
            resolve(isValid);
          } catch (e) {
            // If we can't analyze it, assume it's valid
            console.debug("Could not analyze image data, assuming valid");
            resolve(true);
          }
        };

        img.onerror = () => {
          console.debug("Image failed to load during validation");
          resolve(false);
        };

        img.src = dataUrl;
      } catch (e) {
        // If validation fails, assume the image is valid
        console.debug("Image validation failed, assuming valid:", e.message);
        resolve(true);
      }
    });
  }

  // --------------------------------------------------------------------
  //  Helper – validate indices against dataset shape
  // --------------------------------------------------------------------

  // Add this helper method to validate indices
  _validateIndices(array) {
    if (!this._axisIndices) return true;

    // Validate Z index
    if (this.z !== undefined && this._axisIndices.z !== undefined) {
      const zSize = array.shape[this._axisIndices.z];
      if (this.z < 0 || this.z >= zSize) {
        console.warn(`Z index ${this.z} out of bounds for size ${zSize}`);
        return false;
      }
    }

    // Validate T index
    if (this.t !== undefined && this._axisIndices.t !== undefined) {
      const tSize = array.shape[this._axisIndices.t];
      if (this.t < 0 || this.t >= tSize) {
        console.warn(`T index ${this.t} out of bounds for size ${tSize}`);
        return false;
      }
    }

    // Validate C index
    if (this.c !== undefined && this._axisIndices.c !== undefined) {
      const cSize = array.shape[this._axisIndices.c];
      if (this.c < 0 || this.c >= cSize) {
        console.warn(`C index ${this.c} out of bounds for size ${cSize}`);
        return false;
      }
    }

    return true;
  }

  // --------------------------------------------------------------------
  //  Predictive prefetching – neighbouring Z/T/C slices
  // -------------------------------------------------------------------- //
  _startPrefetching() {
    if (!this._arrays || !this._axisIndices) return;

    const axis = this._axisIndices;
    const shape = this._arrays[0].shape;

    const zSize = axis.z !== undefined ? shape[axis.z] : 0;
    const tSize = axis.t !== undefined ? shape[axis.t] : 0;
    const cSize = axis.c !== undefined ? shape[axis.c] : 0;

    //---- neighbours ----
    const zNeighbors = [];
    if (zSize) {
      for (
        let offset = -MAX_PREFETCH_CACHE_DISTANCE;
        offset <= MAX_PREFETCH_CACHE_DISTANCE;
        ++offset
      ) {
        const nz = (this.z ?? 0) + offset;
        if (nz >= 0 && nz < zSize && nz !== (this.z ?? 0)) {
          zNeighbors.push({ z: nz, t: this.t ?? 0, c: this.c ?? 0 });
        }
      }
      //console.debug(`!!!zNeighbors : ${zNeighbors}`);
      console.debug(`!!!zNeighbors : ` + zNeighbors);
    }

    const tNeighbors = [];
    if (tSize) {
      for (
        let offset = -MAX_PREFETCH_CACHE_DISTANCE;
        offset <= MAX_PREFETCH_CACHE_DISTANCE;
        ++offset
      ) {
        const nt = (this.t ?? 0) + offset;
        if (nt >= 0 && nt < tSize && nt !== (this.t ?? 0)) {
          tNeighbors.push({ z: this.z ?? 0, t: nt, c: this.c ?? 0 });
        }
      }
      console.debug(`!!!tNeighbors : ` + tNeighbors);
    }

    const cNeighbors = [];
    if (cSize) {
      for (
        let offset = -MAX_PREFETCH_CACHE_DISTANCE;
        offset <= MAX_PREFETCH_CACHE_DISTANCE;
        ++offset
      ) {
        const nc = (this.c ?? 0) + offset;
        if (nc >= 0 && nc < cSize && nc !== (this.c ?? 0)) {
          cNeighbors.push({ z: this.z ?? 0, t: this.t ?? 0, c: nc });
        }
      }
      console.debug(`!!!cNeighbors : ` + cNeighbors);
    }

    const all = [...zNeighbors, ...tNeighbors, ...cNeighbors];
    this._prefetchBatch(all);
  }

  //Prefetch a small batch of neighbour slices.
  _prefetchBatch(neighbors) {
    const CONCURRENCY = MAX_PREFETCH_WORKERS;
    for (let i = 0; i < neighbors.length; i += CONCURRENCY) {
      const batch = neighbors.slice(i, i + CONCURRENCY);
      const promises = batch.map((n) => this._prefetchSlice(n.z, n.t, n.c));
      // eslint-disable-next-line no-await-in-loop
      // In practice we'll await asynchronously – but to keep within a single Promise.all
      // we just start them all (the method is async, so await inside)
      Promise.all(promises).catch((e) => console.warn(e));
    }
  }

  // Prefetch a single slice — creates a temporary TileSource with
  //  `prefetch:false` to avoid endless recursion. /
  //
  // Prefetch a slice – we need to *reuse the original File* (when we have one)
  // so that the ZipFileStore path is used. If the source was created from a
  // remote URL we keep the original URL and the `zip` flag.
  //
  // --------------------------------------------------------------------
  //  Prefetch a single slice — creates a temporary TileSource with
  //  `prefetch:false` to avoid endless recursion.
  // --------------------------------------------------------------------

  _prefetchSlice(z, t, c) {
    const key = this._getPrefetchKey(z, t, c);
    if (prefetchCache.has(key)) return;

    if (prefetchCache.size >= MAX_PREFETCH_CACHE_SIZE) {
      const firstKey = prefetchCache.keys().next().value;
      if (firstKey) prefetchCache.delete(firstKey);
    }

    // -----------------------------------------------------------------
    // Build a config that guarantees the same storage backend used for the
    // original source.
    // -----------------------------------------------------------------
    const sourceConfig = this._file
      ? {
          url: this._file, // real File → ZipFileStore.fromBlob
          store: this.store,
          zip: true,
          z,
          t,
          c,
          prefetch: false,
        }
      : {
          url: this.url, // original remote URL (or blob URL for remote .ozx)
          store: this.store,
          zip: this.isZip, // keep zip flag if it was a remote .ozx
          z,
          t,
          c,
          prefetch: false,
        };

    const tempSource = new OmeNgffOzxTileSource(sourceConfig);

    // Wait for the temporary source to be ready, then render a few tiles
    // so that they end up in its per‑tile cache.
    return new Promise((resolve) => {
      tempSource.once("ready", async () => {
        try {
          // Render a couple of low‑resolution tiles (central + top‑left)
          await this._prefetchTilesForSource(tempSource);

          // Only cache the source if it actually has some valid tiles
          // Check if the source has successfully cached any tiles
          const hasCachedTiles = tempSource._tileCache.size > 0;

          if (hasCachedTiles) {
            // Store the temporary source (with its warm tile-cache) in the global cache
            prefetchCache.set(key, tempSource);
            console.debug(`Prefetched and cached slice Z=${z} T=${t} C=${c}`);
          } else {
            console.debug(`Skipped caching slice Z=${z} T=${t} C=${c} - no valid tiles`);
          }

          resolve();
        } catch (e) {
          console.warn(`Failed to prefetch tiles for slice Z=${z} T=${t} C=${c}: ${e}`);
          // Don't cache failed sources
          resolve();
        }
      });
    }).catch((err) => {
      console.warn(`Failed to prefetch slice Z=${z} T=${t} C=${c}: ${err}`);
    });
  }

  //
  // Render a few low‑resolution tiles for the supplied source so that they are
  // stored inside the source’s per‑tile cache.
  //
  // @param {OmeNgffOzxTileSource} source – the temporary source that already has
  //                                      its metadata loaded.
  //the _prefetchTilesForSource method should handle null tiles properly
  //
  async _prefetchTilesForSource(source) {
    // Choose a level a few steps coarser than the highest‑resolution level.
    const levelOffset = Math.min(this.prefetchDistance, source.maxLevel);
    //const level = Math.max(0, source.maxLevel - levelOffset);
    const level = this.CurrentLevel;

    const tileW = source.getTileWidth(level);
    const tileH = source.getTileHeight(level);
    const imgW = source.dimensions.x;
    const imgH = source.dimensions.y;

    const tilesX = Math.ceil(imgW / tileW);
    const tilesY = Math.ceil(imgH / tileH);
    if (tilesX === 0 || tilesY === 0) return;

    // Pick a couple of tiles (centre + top‑left) – limited by
    // MAX_PREFETCH_TILES.
    const positions = [{ x: Math.floor(tilesX / 2), y: Math.floor(tilesY / 2) }];
    if (tilesX > 1 || tilesY > 1) {
      positions.push({ x: 0, y: 0 });
    }

    const limited = positions.slice(0, Math.min(MAX_PREFETCH_TILES, positions.length));

    /*
	const loadPromises = limited.map(
		(coord) =>
		  new Promise((resolve) => {
			const ctx = {
			  src: source.getTileUrl(level, coord.x, coord.y),
			  finish: (img, xhr, errorMsg) => {
				// Check if the tile was successfully loaded (img is not null)
				if (img !== null) {
				  resolve(true); // Successfully loaded
				} else {
				  resolve(false); // Null tile (failed/out of bounds)
				}
			  },
			  userData: {},
			};
			source.downloadTileStart(ctx);
		  })
	);

	const results = await Promise.all(loadPromises);
	// Optionally log how many tiles were successfully prefetched
	const successCount = results.filter(result => result === true).length;
	console.debug(`!!!Prefetched ${successCount}/${results.length} tiles for source`);
    */

    // Track successful prefetches
    let successfulPrefetches = 0;

    for (const coord of limited) {
      try {
        const success = await new Promise((resolve) => {
          const ctx = {
            src: source.getTileUrl(level, coord.x, coord.y),
            finish: (img, xhr, errorMsg) => {
              // Resolve true if image was successfully loaded (not null)
              if (img !== null && !errorMsg) {
                resolve(true);
              } else {
                resolve(false);
              }
            },
            userData: {},
          };
          source.downloadTileStart(ctx);
        });

        if (success) {
          successfulPrefetches++;
        }
      } catch (e) {
        console.debug(`!!!Failed to prefetch tile at ${coord.x},${coord.y}:`, e);
      }
    }

    console.debug(`!!!Successfully prefetched ${successfulPrefetches}/${limited.length} tiles`);
    return successfulPrefetches > 0; // Return true if at least one tile was successfully prefetched
  }

  // Helper for building keys for the global slice cache. //
  _getPrefetchKey(z, t, c) {
    // Use the stable source identifier – not the volatile blob URL.
    return `${this._sourceKey}_z${z}_t${t}_c${c}`;
  }

  // --------------------------------------------------------------------
  //  Helper functions for slice presence
  // -------------------------------------------------------------------- //
  _hasMultipleChannels() {
    return this._omero && this._omero.channels && this._omero.channels.length > 1;
  }

  _hasTimeSeries() {
    return this._multiscale && this._multiscale.datasets && this._multiscale.datasets.length > 1;
  }

  // --------------------------------------------------------------------
  //  Static helper – expose OME‑Zarr metadata (t‑size, c‑size, z‑size)
  // -------------------------------------------------------------------- //
  // -----------------------------------------------------------------
  // ----------  STATIC HELPER – EXPOSE METADATA FOR SLIDERS  ----------
  //   Static helper that is used by the UI **before** a full
  //     TileSource is built.  It now chooses the correct Zarr store.
  // -----------------------------------------------------------------
  //
  // Reads only the OME‑Zarr metadata (t‑size, c‑size, z‑size).  It returns
  // an object like `{tSize: N, cSize: M, zSize: K}`.  This method is used by
  // the demo (and by installHook.js) before a full TileSource is constructed.
  //
  // @param {string|File} urlOrFile   Remote URL *or* a local *.ozx* File.
  // @returns {Promise<{tSize:number,cSize:number,zSize:number}|null>}
  //

  static async getMetadata(urlOrFile) {
    await codecBootstrapReady;

    // to revoke the temporary blob URL
    let cleanupUrl = null;

    try {
      // ---------------------------------------------------------
      // Turn a File into a blob‑URL *only* so that the caller can
      // keep the same API (urlOrFile → string).  The Zarr store
      // will be created with the original File via `fromBlob`.
      // ---------------------------------------------------------
      let store;
      let isZip = false;

      if (urlOrFile instanceof File) {
        // Local *.ozx* or *.zip* file → use the BlobReader.
        const lowerName = urlOrFile.name.toLowerCase();
        isZip = lowerName.endsWith(".ozx") || lowerName.endsWith(".zip");
        store = ZipFileStore.fromBlob(urlOrFile);

        // We still need a URL value for later error messages / debug.
        // It *must* be revoked after we have finished.
        cleanupUrl = URL.createObjectURL(urlOrFile);
      } else if (typeof urlOrFile === "string") {
        // Remote URL – decide based on the extension.
        const lowerUrl = urlOrFile.toLowerCase();
        isZip = lowerUrl.endsWith(".ozx") || lowerUrl.endsWith(".zip");
        store = isZip ? ZipFileStore.fromUrl(urlOrFile) : new zarr.FetchStore(urlOrFile);
      } else {
        throw new Error("Unsupported type for OME‑Zarr source");
      }

      // ---------------------------------------------------------
      // Load the Zarr group and read the OME‑Zarr metadata.
      // ---------------------------------------------------------
      let group = await zarr.open(store, { kind: "group" });

      console.log("[OmeNgff] Group attributes:", JSON.stringify(group.attrs, null, 2));

      // Recursive search helper
      const findMultiscalesInfo = (obj) => {
        if (!obj || typeof obj !== "object") return null;
        if (obj.multiscales) {
          return { multiscales: obj.multiscales, omero: obj.omero };
        }
        for (const key in obj) {
          const result = findMultiscalesInfo(obj[key]);
          if (result) return result;
        }
        return null;
      };

      let info = findMultiscalesInfo(group.attrs);
      let multiscales = info?.multiscales;
      let omero = info?.omero;

      // Fallback for OME-Zarr v0.5 / bioformats2raw layout:
      // If the root doesn't have multiscales, try opening the "0" subgroup.
      if (!multiscales) {
        try {
          console.log("[OmeNgff] Root has no multiscales, trying subgroup '0'...");
          const subGroup = await zarr.open(group.resolve("0"), { kind: "group" });
          const subInfo = findMultiscalesInfo(subGroup.attrs);
          if (subInfo) {
            console.log("[OmeNgff] Found multiscales in subgroup '0'");
            multiscales = subInfo.multiscales;
            omero = subInfo.omero;
            group = subGroup; // Use this group for subsequent resolutions
          }
        } catch (e) {
          console.debug("[OmeNgff] No '0' subgroup found or it has no metadata.");
        }
      }

      if (!multiscales) {
        throw new Error(
          "Missing multiscales metadata in OME‑Zarr attributes. See console for group.attrs"
        );
      }

      const multiscale = multiscales[0];

      // Load the first multiscale array to obtain its shape
      let datasetPath = multiscale.datasets[0].path;
      // If dataset path is empty or ".", it refers to the current group
      if (datasetPath === "." || datasetPath === "") {
        datasetPath = "/";
      }
      const arrayPath = group.resolve(datasetPath);
      console.debug(
        `Opening root array at: ${arrayPath.path} (original: ${multiscale.datasets[0].path})`
      );

      let rootArray;
      try {
        rootArray = await zarr.open(arrayPath, { kind: "array" });
      } catch (e) {
        console.error(`Failed to open root array at ${arrayPath.path}. Error:`, e);
        // Try one more thing: maybe the path is relative and needs to be stripped of leading slashes
        const fallbackPath = multiscale.datasets[0].path.replace(/^\//, "");
        if (fallbackPath !== multiscale.datasets[0].path) {
          console.debug(`Trying fallback path: ${fallbackPath}`);
          rootArray = await zarr.open(group.resolve(fallbackPath), { kind: "array" });
        } else {
          throw e;
        }
      }

      //const metadata = { t: 0, c: 0, z: 0, tSize: 1, cSize: 1, zSize: 1 };
      const metadata = {
        t: undefined,
        c: undefined,
        z: undefined,
        tSize: 1,
        cSize: 1,
        zSize: 1,
      };

      multiscale.axes.forEach((axis, idx) => {
        const name = typeof axis === "string" ? axis : axis.name;
        const size = rootArray.shape[idx];
        if (name === "t") {
          metadata.tSize = size;
          if (size > 1) metadata.t = 0; // Only set default if size > 1
        }
        if (name === "c") {
          metadata.cSize = size;
          if (size > 1) metadata.c = 0; // Only set default if size > 1
        }
        if (name === "z") {
          metadata.zSize = size;
          if (size > 1) metadata.z = 0; // Only set default if size > 1
        }
      });

      // Clean‑up the temporary blob URL (if we created one).
      if (cleanupUrl) URL.revokeObjectURL(cleanupUrl);

      return metadata;
    } catch (error) {
      console.error("Failed to get OME‑Zarr metadata:", error);
      // Ensure we do not leak a blob URL if we bailed out early.
      if (cleanupUrl) URL.revokeObjectURL(cleanupUrl);
      return null;
    }
  }

  // -----------------------------------------------------------------
  // --------------------  Helper utilities (static) -----------------
  // -----------------------------------------------------------------

  // --------------------------------------------------------------------
  //  Static helper – expose TileSource class for OpenSeadragon
  // -------------------------------------------------------------------- //
  static enable(os = OpenSeadragon) {
    os.OmeNgffOzxTileSource = OmeNgffOzxTileSource;
  }

  static _getAxisIndices(multiscale) {
    let t, c, z, y, x;
    for (let i = 0; i < multiscale.axes.length; i++) {
      const axis = multiscale.axes[i];
      const name = typeof axis === "string" ? axis : axis.name;
      switch (name) {
        case "t":
          t = i;
          break;
        case "c":
          c = i;
          break;
        case "z":
          z = i;
          break;
        case "y":
          y = i;
          break;
        case "x":
          x = i;
          break;
        default:
          throw new Error(`unsupported axis: ${name}`);
      }
    }
    if (x === undefined || y === undefined) {
      throw new Error("missing X or Y axis");
    }
    return { t, c, z, y, x };
  }

  // --------------------------------------------------------------------
  //  Compatibility helpers expected by OSD.
  // -------------------------------------------------------------------- //
  supports(data) {
    if (Array.isArray(data) || data instanceof Document) return false;
    if (typeof data === "string") return data.endsWith(".ozx");
    return data.type === "ome-zarr";
  }

  configure(data, _url, postData = null) {
    if (Array.isArray(data)) throw new Error("configuration from array is not supported");
    if (data instanceof Document)
      throw new Error("configuration from XML Document is not supported");
    if (postData) throw new Error("configuration with postData is not supported");
    if (typeof data === "string") return { type: "ome-zarr", url: data };
    return { type: "ome-zarr", ...data };
  }

  equals(other) {
    return (
      other instanceof OmeNgffOzxTileSource &&
      this.url === other.url &&
      this.zip === other.zip &&
      this.t === other.t &&
      this.c === other.c &&
      this.z === other.z
    );
  }
}

// a *single* instance – every source will point to it //
OmeNgffOzxTileSource.globalTileCache = new GlobalTileCache();
