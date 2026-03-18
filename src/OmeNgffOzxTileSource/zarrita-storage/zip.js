// zip.js – Zarr‑compatible store for ZIP/Ω‑Zarr files
// -------------------------------------------------
// The original implementation already provided a `get` method, but the
// Zarr library sometimes also calls `store.list` (and a few older parts of
// the demo used `getBytes`).  The changes below add those optional methods
// while keeping the original behaviour intact.
// -------------------------------------------------
//  Added a full `range` implementation and made it an *own* property
//  so Zarr’s “joined store” wrapper can see it.
// -------------------------------------------------

//import { unzip } from "unzipit";
//import { unzip } from "https://unpkg.com/unzipit@1.4.3/dist/unzipit.js";
//import { unzip } from "./unzipit.js";
// zip.js – Zarr‑compatible store for ZIP/Ω‑Zarr files

// zip.js – Zarr‑compatible store for ZIP/Ω‑Zarr files

import { unzip } from "./unzipit.module.js";
import { assert, fetch_range, strip_prefix } from "./util.js";

/* ------------------------------------------------------------------
   Helper readers – one for Blob objects (local *.ozx* files) and one
   for HTTP‑range requests (remote *.ozx* URLs).
   ------------------------------------------------------------------ */

/**
 * Checks whether a ZipEntry object has the internal properties needed by
 * {@link ZipFileStore}.  These are non‑standard fields that `unzipit` exposes
 * at runtime.
 *
 * @param {Object} entry
 * @returns {boolean}
 */
function isZipEntryInternal(entry) {
  if (!("compressionMethod" in entry) || !("_rawEntry" in entry)) {
    return false;
  }

  const rawEntry = entry._rawEntry;
  return (
    typeof entry.compressionMethod === "number" &&
    typeof rawEntry === "object" &&
    rawEntry !== null &&
    "relativeOffsetOfLocalHeader" in rawEntry &&
    typeof rawEntry.relativeOffsetOfLocalHeader === "number"
  );
}

/* -------------------------------------------------------------------------- */
/*                           Blob based Reader                               */
/* -------------------------------------------------------------------------- */

/**
 * Reader implementation that reads from a {@link Blob}.
 */
export class BlobReader {
  /**
   * @param {Blob} blob
   */
  constructor(blob) {
    this.blob = blob;
  }

  async getLength() {
    return this.blob.size;
  }

  async read(offset, length) {
    const slice = this.blob.slice(offset, offset + length);
    return new Uint8Array(await slice.arrayBuffer());
  }
}

/* -------------------------------------------------------------------------- */
/*                     HTTP Range Reader (Partial Content)                     */
/* -------------------------------------------------------------------------- */

/**
 * @typedef {Object} ZipFileStoreOptions
 * @property {function(Object):Object} [transformEntries] – optional function to
 *   transform the entry map returned by `unzipit`.
 */

/** @experimental */
export class HTTPRangeReader {
  url;
  #overrides;
  length;

  /**
   * @param {string|URL} url
   * @param {Object} [opts]
   * @param {RequestInit} [opts.overrides] – optional fetch options that will be
   *   merged into every request.
   */
  constructor(url, opts = {}) {
    this.url = url;
    this.#overrides = opts.overrides ?? {};
  }

  async getLength() {
    if (this.length === undefined) {
      // HEAD works for http/https, but not for blob: URLs.
      // Fall back to a tiny GET‑range request.
      if (this.url.startsWith("blob:")) {
        const req = await fetch(this.url, {
          method: "GET",
          headers: { Range: "bytes=0-0" },
          ...this.#overrides,
        });
        if (!req.ok) {
          throw new Error(`failed http request ${this.url}: ${req.statusText}`);
        }
        const length = Number(req.headers.get("content-length"));
        if (!Number.isNaN(length)) return length;
        const buf = await req.arrayBuffer();
        return Number(req.headers.get("content-range")?.split("/")[1] ?? buf.byteLength);
      }

      const res = await fetch(this.url, {
        ...this.#overrides,
        method: "HEAD",
      });
      assert(res.ok, `failed http request ${this.url}, status: ${res.status}: ${res.statusText}`);
      this.length = Number(res.headers.get("content-length"));
      if (Number.isNaN(this.length)) {
        throw new Error("could not get length");
      }
    }
    return this.length;
  }

  async read(offset, size) {
    if (size === 0) {
      return new Uint8Array(0);
    }
    const res = await fetch_range(this.url, offset, size, this.#overrides);
    assert(
      res.ok,
      `failed http request ${this.url}, status: ${res.status} offset: ${offset} size: ${size}: ${res.statusText}`
    );
    return new Uint8Array(await res.arrayBuffer());
  }
}

/* -------------------------------------------------------------------------- */
/*                              ZipFileStore                                 */
/* -------------------------------------------------------------------------- */

/**
 * @experimental
 * A read‑only store that serves files from a ZIP archive without extracting it
 * to disk.  It works with any {@link Reader} implementation (e.g. the two
 * above).  Ranges can be read efficiently for stored (uncompressed) entries.
 */
export default class ZipFileStore {
  #reader;
  #infoPromise;

  /**
   * @param {Object} reader – a {@link Reader} instance (BlobReader,
   *   HTTPRangeReader, …)
   * @param {ZipFileStoreOptions} [opts]
   */
  constructor(reader, opts = {}) {
    this.#reader = reader;
    this.#infoPromise = unzip(reader).then((info) => {
      if (opts.transformEntries) {
        info.entries = opts.transformEntries(info.entries);
      }

      const keys = Object.keys(info.entries);
      console.log("[ZipFileStore] Zip entries count:", keys.length);
      if (keys.length > 0) {
        console.log("[ZipFileStore] Sample entries:", keys.slice(0, 10));
      }

      // Detect if there's a common root directory
      // If all keys start with "something/" then we can consider that the root.
      if (keys.length > 100) {
        const firstKey = keys[0];
        const slashIndex = firstKey.indexOf("/");
        if (slashIndex !== -1) {
          const prefix = firstKey.substring(0, slashIndex + 1);
          // Only check a subset of keys for efficiency on huge ZIPs
          const sampleIndices = [
            Math.floor(keys.length / 4),
            Math.floor(keys.length / 2),
            Math.floor((3 * keys.length) / 4),
            keys.length - 1,
          ];
          const allSamplesHavePrefix = sampleIndices.every((i) => keys[i].startsWith(prefix));

          if (allSamplesHavePrefix) {
            console.log(`[ZipFileStore] Probable common root prefix detected: ${prefix}`);
            this.commonPrefix = prefix;
          }
        }
      } else if (keys.length > 0) {
        const firstKey = keys[0];
        const slashIndex = firstKey.indexOf("/");
        if (slashIndex !== -1) {
          const prefix = firstKey.substring(0, slashIndex + 1);
          const allHavePrefix = keys.every((k) => k.startsWith(prefix));
          if (allHavePrefix) {
            console.log(`[ZipFileStore] Detected common root prefix: ${prefix}`);
            this.commonPrefix = prefix;
          }
        }
      }

      return info;
    });
  }

  /**
   * Compute the byte offset where an entry’s data begins in the ZIP file.
   *
   * Because the central directory does not contain the size of the local
   * header’s variable fields (filename & extra field), we need to read the
   * local header to calculate the correct offset.
   *
   * @param {Object} entry – a ZIP entry (must have the internal fields).
   * @returns {Promise<number>}
   */
  async getEntryDataOffset(entry) {
    const localHeaderOffset = entry._rawEntry.relativeOffsetOfLocalHeader;
    // Minimum local header size = 30 bytes
    const header = await this.#reader.read(localHeaderOffset, 30);
    // filename length @ 26 (2‑byte LE)
    const fileNameLength = header[26] + header[27] * 256;
    // extra field length @ 28 (2‑byte LE)
    const extraFieldLength = header[28] + header[29] * 256;
    // Data starts after header + filename + extra field
    return localHeaderOffset + 30 + fileNameLength + extraFieldLength;
  }

  /**
   * Internal helper to find an entry in the ZIP, with fallbacks for
   * common path variations (slashes, prefixes, etc).
   *
   * @param {string} key
   * @returns {Promise<Object|undefined>}
   */
  async _getEntry(key) {
    const info = await this.#infoPromise;
    const stripped = strip_prefix(key);
    const keys = info.entries;

    // Helper to check with all variations
    const find = (k) => {
      // 1. Exact
      if (keys[k]) return keys[k];
      // 2. Dot-slash
      if (keys["./" + k]) return keys["./" + k];
      // 3. Common prefix
      if (this.commonPrefix && !k.startsWith(this.commonPrefix)) {
        const prefK = this.commonPrefix + k;
        if (keys[prefK]) return keys[prefK];
        if (keys["./" + prefK]) return keys["./" + prefK];
      }
      return null;
    };

    // Try forward-slash version
    const forward = stripped.replace(/\\/g, "/");
    let entry = find(forward);
    if (entry) return entry;

    // Try backslash version (common in ZIPs created on Windows)
    const backward = stripped.replace(/\//g, "\\");
    entry = find(backward);
    if (entry) return entry;

    return undefined;
  }

  /**
   * Retrieve the full contents of a file inside the ZIP.
   *
   * @param {string} key – absolute path (including leading `/`).
   * @returns {Promise<Uint8Array|undefined>}
   */
  async get(key) {
    const entry = await this._getEntry(key);
    if (!entry) {
      console.debug(`[ZipFileStore] Key not found: ${key}`);
      return undefined;
    }
    return new Uint8Array(await entry.arrayBuffer());
  }

  /** -------------------------------------------------------------
   *  Alias used by some older code paths – delegating to `get`.
   * ------------------------------------------------------------- */
  async getBytes(key) {
    return this.get(key);
  }

  /**
   * Retrieve a byte range from a file inside the ZIP.
   *
   * For compressed entries a full read is performed and the slice is taken.
   * For stored (uncompressed) entries the underlying {@link Reader} is used
   * to fetch only the needed bytes.
   *
   * @param {string} key – absolute path.
   * @param {Object} range – either `{offset, length}` or `{suffixLength}`.
   * @returns {Promise<Uint8Array|undefined>}
   */
  async getRange(key, range) {
    const entry = await this._getEntry(key);
    if (!entry) return undefined;

    if (!isZipEntryInternal(entry)) {
      throw new Error(
        "ZipFileStore.getRange requires internal unzipit properties that are not available. " +
          "This may indicate an incompatible version of unzipit."
      );
    }

    // If entry is compressed (deflate etc.) we cannot jump to its raw data.
    if (entry.compressionMethod !== 0) {
      const bytes = await entry.arrayBuffer();
      const view = new Uint8Array(bytes);
      if ("suffixLength" in range) {
        return view.slice(-range.suffixLength);
      }
      return view.slice(range.offset, range.offset + range.length);
    }

    // Uncompressed (stored) entry – calculate exact data offset.
    const dataOffset = await this.getEntryDataOffset(entry);
    if ("suffixLength" in range) {
      const start = dataOffset + entry.size - range.suffixLength;
      return this.#reader.read(start, range.suffixLength);
    }
    return this.#reader.read(dataOffset + range.offset, range.length);
  }

  /**
   * Checks whether a given path exists in the ZIP.
   *
   * @param {string} key – absolute path.
   * @returns {Promise<boolean>}
   */
  async has(key) {
    const entry = await this._getEntry(key);
    return !!entry;
  }

  /** -------------------------------------------------------------
   *  Optional – Zarr may request a listing of keys that share a prefix.
   *  The method returns the **full** keys (without stripping the prefix)
   *  because callers usually apply their own prefix handling.
   * ------------------------------------------------------------- */
  async list(prefix = "") {
    const info = await this.#infoPromise;
    const entries = info.entries;
    let pref = strip_prefix(prefix);

    // If we have a common prefix and the requested prefix doesn't have it, prepend it
    if (this.commonPrefix && !pref.startsWith(this.commonPrefix)) {
      pref = this.commonPrefix + pref;
    }

    if (!pref) {
      // No prefix – return every key
      return Object.keys(entries);
    }

    return Object.keys(entries).filter((k) => k.startsWith(pref));
  }

  /** -------------------------------------------------------------
   *  Factory helpers – the public API used throughout the demo.
   * ------------------------------------------------------------- */

  /**
   * Construct a {@link ZipFileStore} from a remote URL.
   *
   * @param {string|URL} href
   * @param {Object} [opts] – may contain `overrides` (fetch options) and
   *   `transformEntries`.
   * @returns {ZipFileStore}
   */
  static fromUrl(href, opts = {}) {
    return new ZipFileStore(new HTTPRangeReader(href, opts), opts);
  }

  /**
   * Construct a {@link ZipFileStore} from a {@link Blob}.
   *
   * @param {Blob} blob
   * @param {ZipFileStoreOptions} [opts]
   * @returns {ZipFileStore}
   */
  static fromBlob(blob, opts = {}) {
    return new ZipFileStore(new BlobReader(blob), opts);
  }
}

/* Export both named and default */
export { ZipFileStore };
//export default ZipFileStore;

//# sourceMappingURL=zip.js.map
