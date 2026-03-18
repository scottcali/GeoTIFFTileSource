// -------------------------------------------------------------
// 2️⃣  Prefetch helper – neighbour slices & OSD cache usage
// -------------------------------------------------------------

const MAX_PREFETCH_CACHE_SIZE = 128; // Reduced to save memory
const MAX_PREFETCH_WORKERS = 2; // Drastically reduced so prefetch doesn't block main tiles
const MAX_LevelOffset = 4;
const MAX_TILES_PER_IDLE = 4; // Limit how many tiles we ask for at once

export class NeighbourPrefetcher {
  /**
   * @param {OpenSeadragon.Viewer} viewer   the OSD instance
   * @param {OmeNgffOzxTileSource} source    the OME‑Zarr tile source
   * @param {Object} [options]            optional tuning
   *        {number} depth      – how many slices ahead/behind (default 1)
   *        {number} maxParallel – simultaneous fetches (default 6)
   *        {number} levelOffset – lower‑res level to pre‑fetch (default 2)
   */
  constructor(viewer, source, options = {}) {
    this.viewer = viewer;
    this.source = source;
    this.depth = options.depth ?? 1;
    this.maxPar = options.maxParallel ?? MAX_PREFETCH_WORKERS;
    this.levelOff = options.levelOffset ?? MAX_LevelOffset; // e.g. 2 levels coarser than current

    // -----------------------------------------------------------------
    // Track in‑flight requests so we never exceed maxParallel
    // -----------------------------------------------------------------
    this.inFlight = 0;
    this.pending = new Set(); // URLs already queued

    // -----------------------------------------------------------------
    // Keep more tiles in the OSD LRU cache for smoother slice browsing
    // -----------------------------------------------------------------
    this.viewer.maxImageCacheCount = options.maxCacheCount ?? MAX_PREFETCH_CACHE_SIZE;

    // -----------------------------------------------------------------
    // Hook into viewer lifecycle – we want to start pre‑fetching after every
    // animation frame and after any tile for the *current* slice loads.
    // -----------------------------------------------------------------
    this.viewer.addHandler("animation-finish", () => this.schedulePrefetch());
    this.viewer.addHandler("tile-loaded", (ev) => this.onTileLoaded(ev.tile));

    // -----------------------------------------------------------------
    // Kick‑off the first round as soon as the object is created.
    // -----------------------------------------------------------------
    this.schedulePrefetch();
  }

  // -----------------------------------------------------------------
  //   Event handlers
  // -----------------------------------------------------------------
  onTileLoaded(/*tile*/) {
    // After a tile of the *current* slice finishes we schedule another round.
    // Using requestIdleCallback protects the UI thread.
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(() => this.schedulePrefetch());
    } else {
      setTimeout(() => this.schedulePrefetch(), 0);
    }
  }

  // -----------------------------------------------------------------
  //   Main entry point – called when the viewer is idle
  // -----------------------------------------------------------------
  schedulePrefetch() {
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(() => this.prefetchNeighbourSlices());
    } else {
      setTimeout(() => this.prefetchNeighbourSlices(), 0);
    }
  }

  // -----------------------------------------------------------------
  //   Core logic – compute URLs → fire background loads
  // -----------------------------------------------------------------
  prefetchNeighbourSlices() {
    // -------------------------------------------------
    // 1️⃣  Current slice (Z/T/C) that the user sees
    // -------------------------------------------------
    const curSlice = this.source.getCurrentSlice(); // {z,t,c}
    const axisLen = this.source.getAxisLengths(); // {z:…, t:…, c:…}

    // -------------------------------------------------
    // 2️⃣  Build a list of neighbour slice coordinates
    // -------------------------------------------------
    const neighbourCoords = this.buildNeighbourCoords(curSlice, axisLen);
    if (neighbourCoords.length === 0) return; // nothing to pre‑fetch

    // -------------------------------------------------
    // 3️⃣  Determine which tiles actually cover the *visible* viewport.
    //      We use a lower‑resolution level so we don’t hammer the network.
    // -------------------------------------------------
    const previewLevel = Math.max(0, this.source.maxLevel - this.levelOff);
    const visibleTileInfos = this.tilesCoveringViewport(previewLevel);
    if (visibleTileInfos.length === 0) return;

    // -------------------------------------------------
    // 4️⃣  For each (tile, slice) combination ask the source to fetch the tile.
    // -------------------------------------------------
    //visibleTileInfos.forEach(({ x, y }) => {
    //  neighbourCoords.forEach(coord => {
    //    this._prefetchTile(previewLevel, x, y, coord);
    //  });
    //});

    // -------------------------------------------------------------
    //   Limit the amount of work we do in a single idle‑callback.
    //   We only ask for the first *MAX_TILES_PER_IDLE* visible tiles.
    //   The remaining tiles will be processed on the next idle turn.
    //   ------------------------------------------------------------- //
    const limitedTiles = visibleTileInfos.slice(0, MAX_TILES_PER_IDLE);

    limitedTiles.forEach(({ x, y }) => {
      neighbourCoords.forEach((coord) => {
        this._prefetchTile(previewLevel, x, y, coord);
      });
    });

    // -------------------------------------------------------------
    //   If there are still tiles left, schedule another round.
    //   This way the UI gets a chance to repaint before we keep
    //   hammering the source with more work.
    //   ------------------------------------------------------------- //
    if (visibleTileInfos.length > MAX_TILES_PER_IDLE) {
      // schedule the next chunk when the browser is idle again
      if (typeof requestIdleCallback === "function") {
        requestIdleCallback(() => this.prefetchNeighbourSlices());
      } else {
        setTimeout(() => this.prefetchNeighbourSlices(), 0);
      }
    }

    return;
  }

  // -----------------------------------------------------------------
  //   Helper: enumerate neighbour slices (depth = 1 → z‑1, z+1, …)
  // -----------------------------------------------------------------
  buildNeighbourCoords(cur, max) {
    const list = [];
    const axes = ["z", "t", "c"];
    axes.forEach((ax) => {
      for (let d = -this.depth; d <= this.depth; d++) {
        if (d === 0) continue; // skip the current slice itself
        const val = cur[ax] + d;
        if (val >= 0 && val < max[ax]) {
          const coord = { ...cur, [ax]: val };
          list.push(coord);
        }
      }
    });
    return list; // e.g. [{z:12,t:0,c:2}, {z:13,…}, {t:1,…}, …]
  }

  // -----------------------------------------------------------------
  //   Helper: which (x,y) tile indexes are needed to fill the viewport?
  // -----------------------------------------------------------------
  // -----------------------------------------------------------------
  //  Which (x,y) tile indexes are needed to fill the viewport?
  //  The calculation is now **clamped** so we never ask for a tile
  //  with a negative index or an index beyond the image edge.
  // -----------------------------------------------------------------

  tilesCoveringViewport(level) {
    // Get the first (and only) TiledImage that OpenSeadragon created.
    const tiledImage = this.viewer.world.getItemAt(0);
    if (!tiledImage) return [];

    // Viewport bounds in image‑coordinates (0 … 1)
    const bounds = this.viewer.viewport.getBounds(true);

    // Tile dimensions for the *preview* level.
    const tileW = tiledImage.source.getTileWidth(level);
    const tileH = tiledImage.source.getTileHeight(level);

    // Full image size (in pixels) for the *preview* level.
    // OSD’s TiledImage does **not** expose a `getPixelSize` method.
    // The size can be derived from the source’s full‑resolution dimensions
    // multiplied by the level scale factor.
    const levelScale = tiledImage.source.getLevelScale(level);
    const imgSize = {
      x: tiledImage.source.dimensions.x * levelScale,
      y: tiledImage.source.dimensions.y * levelScale,
    };

    // Convert the viewport bounds → tile column / row indices.
    //const minX = Math.floor(bounds.x * imgSize.x / tileW);
    //const maxX = Math.ceil((bounds.x + bounds.width) * imgSize.x / tileW);
    //const minY = Math.floor(bounds.y * imgSize.y / tileH);
    //const maxY = Math.ceil((bounds.y + bounds.height) * imgSize.y / tileH);

    // Maximum tile index (zero‑based) for this level.
    const maxTileX = Math.max(0, Math.ceil(imgSize.x / tileW) - 1);
    const maxTileY = Math.max(0, Math.ceil(imgSize.y / tileH) - 1);

    // Convert the viewport bounds → tile column / row indices.
    const rawMinX = Math.floor((bounds.x * imgSize.x) / tileW);
    const rawMaxX = Math.ceil(((bounds.x + bounds.width) * imgSize.x) / tileW);
    const rawMinY = Math.floor((bounds.y * imgSize.y) / tileH);
    const rawMaxY = Math.ceil(((bounds.y + bounds.height) * imgSize.y) / tileH);

    // Clamp to the valid range (no negative or out‑of‑range tiles)
    const minX = Math.max(0, rawMinX);
    const maxX = Math.min(maxTileX, rawMaxX);
    const minY = Math.max(0, rawMinY);
    const maxY = Math.min(maxTileY, rawMaxY);

    const tiles = [];
    for (let tx = minX; tx <= maxX; tx++) {
      for (let ty = minY; ty <= maxY; ty++) {
        tiles.push({ x: tx, y: ty });
      }
    }
    return tiles;
  }

  // -----------------------------------------------------------------
  //   Prefetch a single tile (specific slice) using the TileSource API.
  // -----------------------------------------------------------------
  // -----------------------------------------------------------------
  //  Prefetch a single tile – we also guard against negative indices
  //  that could have slipped through (defensive programming).
  // -----------------------------------------------------------------

  _prefetchTile(level, x, y, slice) {
    // Defensive guard – never request a tile with a negative index.
    if (x < 0 || y < 0) return;

    const key = `${level},${x},${y},${slice.z ?? 0},${slice.c ?? 0},${slice.t ?? 0}`;
    if (this.pending.has(key)) return; // already queued
    if (this.inFlight >= this.maxPar) return; // throttled – will be retried later

    // -------------------------------------------------
    // Mark as pending & increase the in‑flight counter
    // -------------------------------------------------
    this.pending.add(key);
    this.inFlight++;

    // -------------------------------------------------
    // Temporarily switch the source to the required slice.
    // -------------------------------------------------
    const original = { z: this.source.z, t: this.source.t, c: this.source.c };
    if (slice.z !== undefined) this.source.z = slice.z;
    if (slice.t !== undefined) this.source.t = slice.t;
    if (slice.c !== undefined) this.source.c = slice.c;

    // -------------------------------------------------
    // Ask the source to download the tile.  When it finishes we
    // restore the original slice indices and mark the request
    // as completed.
    // -------------------------------------------------
    const ctx = {
      src: this.source.getTileUrl(level, x, y),
      finish: () => {
        // Restore original slice indices.
        this.source.z = original.z;
        this.source.t = original.t;
        this.source.c = original.c;
        this.donePrefetch(key);
      },
      // `userData` is required by OSD’s tile‑download contract.
      userData: {},
    };

    //this.source.downloadTileStart(ctx);

    // -------------------------------------------------------------
    //    The actual download (and the heavy `renderImage` call) is
    //    performed **inside** an idle‑callback so it does not block
    //    the UI thread.  If the browser does not support
    //    `requestIdleCallback` we fall back to `setTimeout`.
    // ------------------------------------------------------------- //
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(() => this.source.downloadTileStart(ctx));
    } else {
      setTimeout(() => this.source.downloadTileStart(ctx), 0);
    }

    return;
  }

  // -----------------------------------------------------------------
  //   Called when a tile download finishes (or fails)
  // -----------------------------------------------------------------
  donePrefetch(key) {
    this.pending.delete(key);
    this.inFlight--;
    // If we have room for more, the next idle‑callback will refill the queue.
  }
}

// Export both as a named export (the original API) and a default export
// so that `import NeighbourPrefetcher from …` as well as
// `import {NeighbourPrefetcher} from …` both work.
export default NeighbourPrefetcher;
