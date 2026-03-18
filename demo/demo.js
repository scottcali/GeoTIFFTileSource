/* demo.js – updated to add Z, T, C sliders for OME-Zarr and GeoTIFF‑sets */

//import { Blosc, GZip, Zlib, LZ4, Zstd } from '../src/OmeNgffOzxTileSource/numcodecs/index.js';
//import { Blosc, GZip, Zlib, LZ4, Zstd } from '../src/OmeNgffOzxTileSource/numcodecs/index.js';

import OpenSeadragon from "openseadragon";
import { NeighbourPrefetcher } from "../src//NeighbourPrefetcher.js";

let enableDebug = true;

/**
 * Internal debug logger – only prints when `enableDebug` is true.
 *
 * @param {Any} ...args
 */
const consolelog = (...args) => {
  if (enableDebug) console.log("[Demo]", ...args);
};

/* Make OpenSeadragon global for UMD plugins (if not already set) */
if (typeof window.OpenSeadragon === "undefined" && typeof OpenSeadragon !== "undefined") {
  window.OpenSeadragon = OpenSeadragon;
}

/* Basic viewer setup – assumes OpenSeadragon is loaded */
let viewer = (window.viewer = OpenSeadragon({
  element: "viewer",
  prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
  minZoomImageRatio: 0.01,
  visibilityRatio: 0,
  crossOriginPolicy: "Anonymous",
  ajaxWithCredentials: true,
  sequenceMode: true,
}));

/* ------------------------------------------------------------
   Small debounce helper – runs `fn` only after `delay` ms have
   elapsed without another call.
   ------------------------------------------------------------ */
function debounce(fn, delay = 300) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * --------------------------------------------------------------------
 * Global state helpers for the Z‑slider (GeoTIFF set)
 * --------------------------------------------------------------------
 */
let globalZOptions = null; // Options object that remains alive while a GeoTIFF‑set is active
let zSliderContainer = null; // DOM element for the slider container
let zSliderInput = null; // The `<input type="range">` element
let zSliderValueSpan = null; // Span for showing the current Z value

/**
 * --------------------------------------------------------------------
 * Global state helpers for OME-Zarr (Z, T, C sliders)
 * --------------------------------------------------------------------
 */
let globalOMEState = {
  url: null,
  z: 0,
  t: 0,
  c: 0,
  zSize: 1,
  tSize: 1,
  cSize: 1,
};
let omeSlidersContainer = null; // Container for all OME sliders

/**
 * Remove the Z-slider (GeoTIFF) from the DOM.
 */
function removeSlider() {
  if (zSliderContainer) {
    zSliderContainer.remove();
    zSliderContainer = null;
    zSliderInput = null;
    zSliderValueSpan = null;
  }
}

/**
 * Remove the OME-Zarr sliders from the DOM.
 */
function removeOMESliders() {
  if (omeSlidersContainer) {
    omeSlidersContainer.remove();
    omeSlidersContainer = null;
  }
}

/**
 * Create the slider overlay on the viewer.
 * @param {Object} opts
 */
function addZSlider(opts) {
  // Remove any previous slider
  removeSlider();

  const viewerEl = document.getElementById("viewer");

  const container = document.createElement("div");
  container.id = "z-slider-container";
  container.style.position = "absolute";
  container.style.left = "10px";
  container.style.bottom = "10px";
  container.style.padding = "4px 8px";
  container.style.background = "rgba(255,255,255,0.8)";
  container.style.borderRadius = "4px";
  container.style.fontSize = "12px";
  container.style.fontFamily = "Arial, Helvetica, sans-serif";
  container.style.zIndex = "999";

  const label = document.createElement("label");
  label.textContent = "Z: ";

  const valueSpan = document.createElement("span");
  valueSpan.textContent = opts.CurrentZ;
  label.appendChild(valueSpan);

  const input = document.createElement("input");
  input.type = "range";
  input.min = opts.MinZ;
  input.max = opts.MaxZ;
  input.value = opts.CurrentZ;
  input.style.margin = "0 4px";

  /* -----  “‑” button (decrease)  ----- */
  const decBtn = document.createElement("button");
  decBtn.textContent = "−";
  decBtn.title = "Previous Z";
  decBtn.style.minWidth = "20px";

  //decBtn.addEventListener("click", (e) => {
  //    e.stopPropagation();
  //    const newVal = Math.max(parseInt(input.value, 10) - 1, opts.MinZ);
  //    input.value = newVal;
  //    if (zSliderValueSpan) zSliderValueSpan.textContent = newVal;
  //    openZIndex(newVal);
  //});

  const debouncedOpen = debounce(openZIndex, 250);
  decBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const newVal = Math.max(parseInt(input.value, 10) - 1, opts.MinZ);
    input.value = newVal;
    if (zSliderValueSpan) zSliderValueSpan.textContent = newVal;
    debouncedOpen(newVal);
  });

  /* -----  “+” button (increase)  ----- */
  const incBtn = document.createElement("button");
  incBtn.textContent = "+";
  incBtn.title = "Next Z";
  incBtn.style.minWidth = "20px";

  //incBtn.addEventListener("click", (e) => {
  //    e.stopPropagation();
  //    const newVal = Math.min(parseInt(input.value, 10) + 1, opts.MaxZ);
  //    input.value = newVal;
  //    if (zSliderValueSpan) zSliderValueSpan.textContent = newVal;
  //    openZIndex(newVal);
  //});

  incBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const newVal = Math.min(parseInt(input.value, 10) + 1, opts.MaxZ);
    input.value = newVal;
    if (zSliderValueSpan) zSliderValueSpan.textContent = newVal;
    debouncedOpen(newVal);
  });

  container.appendChild(label);
  container.appendChild(decBtn);
  container.appendChild(input);
  container.appendChild(incBtn);

  viewerEl.appendChild(container);

  // Store refs
  zSliderContainer = container;
  zSliderInput = input;
  zSliderValueSpan = valueSpan;

  // Bind change
  //input.addEventListener("input", function (e) {
  //   const val = parseInt(e.target.value, 10);
  //    if (zSliderValueSpan) zSliderValueSpan.textContent = val;
  //    openZIndex(val);
  //});

  const debouncedInput = debounce(openZIndex, 250);
  input.addEventListener("input", function (e) {
    const val = parseInt(e.target.value, 10);
    if (zSliderValueSpan) zSliderValueSpan.textContent = val;
    debouncedInput(val);
  });
}

/**
 * Create sliders for OME-Zarr (Z, T, C) based on metadata.
 */
function setupOMEZarrSliders(metadata) {
  removeOMESliders();

  const viewerEl = document.getElementById("viewer");
  const container = document.createElement("div");
  container.id = "ome-sliders-container";
  container.style.position = "absolute";
  container.style.left = "10px";
  container.style.bottom = "10px";
  container.style.padding = "4px 8px";
  container.style.background = "rgba(255,255,255,0.8)";
  container.style.borderRadius = "4px";
  container.style.fontSize = "12px";
  container.style.fontFamily = "Arial, Helvetica, sans-serif";
  container.style.zIndex = "999";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "4px";

  // Helper to create a slider
  const createSlider = (label, val, size, type) => {
    /* Create a slider only when the dimension has more than one step */
    if (size <= 1) return;

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";

    const lbl = document.createElement("label");
    lbl.textContent = `${label}: `;
    lbl.style.marginRight = "4px";

    const valSpan = document.createElement("span");
    valSpan.textContent = val;
    valSpan.style.minWidth = "24px";
    valSpan.style.textAlign = "center";

    const input = document.createElement("input");
    input.type = "range";
    input.min = 0;
    input.max = size - 1; // inclusive max index
    input.value = val;
    input.style.margin = "0 4px";

    /* -----  “‑” button (decrease)  ----- */
    const decBtn = document.createElement("button");
    decBtn.textContent = "−";
    decBtn.title = `Previous ${label}`;
    decBtn.style.minWidth = "20px";

    //decBtn.addEventListener("click", () => {
    //    const cur = parseInt(input.value, 10);
    //    const newVal = Math.max(cur - 1, 0);
    //    input.value = newVal;
    //    valSpan.textContent = newVal;
    //    updateOMEZarrSource(type, newVal);
    //});

    const debouncedUpdate = debounce(updateOMEZarrSource, 250);
    decBtn.addEventListener("click", () => {
      const cur = parseInt(input.value, 10);
      const newVal = Math.max(cur - 1, 0);
      input.value = newVal;
      valSpan.textContent = newVal;
      debouncedUpdate(type, newVal);
    });

    /* -----  “+” button (increase)  ----- */
    const incBtn = document.createElement("button");
    incBtn.textContent = "+";
    incBtn.title = `Next ${label}`;
    incBtn.style.minWidth = "20px";

    //incBtn.addEventListener("click", () => {
    //    const cur = parseInt(input.value, 10);
    //    const newVal = Math.min(cur + 1, size - 1);
    //    input.value = newVal;
    //    valSpan.textContent = newVal;
    //    updateOMEZarrSource(type, newVal);
    //});

    incBtn.addEventListener("click", () => {
      const cur = parseInt(input.value, 10);
      const newVal = Math.min(cur + 1, size - 1);
      input.value = newVal;
      valSpan.textContent = newVal;
      debouncedUpdate(type, newVal);
    });

    row.appendChild(lbl);
    row.appendChild(valSpan);
    row.appendChild(decBtn);
    row.appendChild(input);
    row.appendChild(incBtn);
    container.appendChild(row);

    //input.addEventListener("input", (e) => {
    //    const newVal = parseInt(e.target.value, 10);
    //    valSpan.textContent = newVal;
    //    updateOMEZarrSource(type, newVal);
    //});

    const debouncedInput = debounce(updateOMEZarrSource, 250);
    input.addEventListener("input", (e) => {
      const newVal = parseInt(e.target.value, 10);
      valSpan.textContent = newVal;
      debouncedInput(type, newVal);
    });
  };

  // Add sliders if dimensions > 1
  if (metadata.zSize > 1) createSlider("Z", metadata.z, metadata.zSize, "z");
  if (metadata.tSize > 1) createSlider("T", metadata.t, metadata.tSize, "t");
  if (metadata.cSize > 1) createSlider("C", metadata.c, metadata.cSize, "c");

  if (container.children.length > 0) {
    viewerEl.appendChild(container);
    omeSlidersContainer = container;
  }
}

/**
 * Open a new tile source for the given Z index (GeoTIFF set).
 * Keeps the current viewport centre/zoom.
 * @param {Number} zIndex
 */
function openZIndex(zIndex) {
  if (!globalZOptions) return; // Should not happen

  // Update the options object for the new Z value
  globalZOptions.CurrentZ = zIndex;

  const newInput = globalZOptions.ImageArray[zIndex];

  // Capture the current viewport state
  const center = viewer.viewport.getCenter(true);
  const zoom = viewer.viewport.getZoom(true);

  // Open the new tile source
  OpenSeadragon.GeoTIFFTileSource.getAllTileSources(newInput, globalZOptions).then((ts) => {
    viewer.open(ts);

    // Re‑position the viewport once the new image is ready
    viewer.addHandler("open", function reposition() {
      viewer.removeHandler("open", reposition);
      // Use zoomTo with center to keep the same view
      viewer.viewport.zoomTo(zoom, center);
    });
  });
}

/**
 * Update the OME-Zarr tile source with new Z, T, or C value.
 * @param {String} type 'z', 't', or 'c'
 * @param {Number} value
 */
/*
function updateOMEZarrSource(type, value) {
    if (!globalOMEState.url) return;

    // Update state
    globalOMEState[type] = value;

    // Capture viewport
    const center = viewer.viewport.getCenter(true);
    const zoom = viewer.viewport.getZoom(true);

    // Create new source with updated indices
    const newSource = new OpenSeadragon.OmeNgffOzxTileSource({
        url: globalOMEState.url,
        z: globalOMEState.zSize > 1 ? globalOMEState.z : undefined,
        t: globalOMEState.tSize > 1 ? globalOMEState.t : undefined,
        c: globalOMEState.cSize > 1 ? globalOMEState.c : undefined
    });

    viewer.open(newSource);

    viewer.addHandler("open", function reposition() {
        viewer.removeHandler("open", reposition);
        viewer.viewport.zoomTo(zoom, center);
    });
}
*/

/* --------------------------------------------------------------------- */
/*  Utility functions for displaying image information                   */
/* --------------------------------------------------------------------- */

function clearImageInfo() {
  document.getElementById("image-description").textContent = "";
  document.getElementById("associated-images").textContent = "";
}

function showTileSourcesInfo(tileSources) {
  clearImageInfo();
  const desc = document.getElementById("image-description");
  tileSources.map((ts, index) => {
    // Add safety check here
    if (!ts) return; // Skip if undefined

    // Check for OMEZarr metadata
    if (ts.OMEZarrMetadata) {
      const h = document.createElement("h3");
      h.textContent = "TileSource #" + index + " (OME-Zarr)";
      desc.appendChild(h);
      const info = document.createElement("div");
      info.innerHTML = `
                <strong>Z Size:</strong> ${ts.OMEZarrMetadata.zSize}<br>
                <strong>T Size:</strong> ${ts.OMEZarrMetadata.tSize}<br>
                <strong>C Size:</strong> ${ts.OMEZarrMetadata.cSize}
            `;
      desc.appendChild(info);
      desc.appendChild(document.createElement("hr"));
      return;
    }

    const images = ts.GeoTIFFImages;
    if (!images) return;

    const h = document.createElement("h3");
    h.textContent = "TileSource #" + index;
    desc.appendChild(h);
    showImageInfo(images);
    desc.appendChild(document.createElement("hr"));
    return images;
  });
}

function showImageInfo(images) {
  const desc = document.getElementById("image-description");
  const frag = document.createDocumentFragment();

  images.forEach((image, index) => {
    const d = document.createElement("div");
    frag.appendChild(d);
    const t = document.createElement("h4");
    d.appendChild(t);
    t.textContent = "Tiff Page " + index;

    const fd = Object.assign({}, image.fileDirectory);
    if (fd.ImageDescription) {
      const info = document.createElement("div");
      d.appendChild(info);
      const ID =
        "<u>ImageDescription contents for this subimage</u><br>" +
        fd.ImageDescription.replaceAll("|", "<br>");
      delete fd.ImageDescription;
      info.innerHTML = ID;
    }

    const to_print = {};
    Object.entries(fd).forEach(([k, v]) => {
      to_print[k] =
        typeof v !== "string" && v.length > 8
          ? "" + v.constructor.name + " (" + v.length + ") [...]"
          : typeof v !== "string" && typeof v.length !== "undefined"
            ? v.constructor.name + "(" + v.length + ")" + " [" + [...v.values()] + "]"
            : v;
    });

    const pre = document.createElement("pre");
    d.appendChild(pre);
    pre.textContent = JSON.stringify(to_print, null, 2);
  });
  desc.appendChild(frag);
}

/* --------------------------------------------------------------------- */
/*  Function to open a GeoTIFF (or a set of them)                       */
/* --------------------------------------------------------------------- */

function setupImage(tileSourceInput, tilesourceName = "", isGeoTiffSet = false) {
  viewer.close();
  clearImageInfo();
  document.getElementById("filename").textContent = tilesourceName;

  if (isGeoTiffSet == false) {
    // Normal (non‑Z stack) – remove slider if it existed
    removeSlider();
    globalZOptions = null;
    // Also remove OME sliders just in case
    removeOMESliders();
    globalOMEState = { url: null, z: 0, t: 0, c: 0, zSize: 1, tSize: 1, cSize: 1 };

    const options = {
      GeoTiffSet: false,
      CurrentZ: 0,
      MaxZ: 0,
      MinZ: 0,
      ImageArray: tileSourceInput,
      logLatency: true,
    };

    const tiffTileSources = OpenSeadragon.GeoTIFFTileSource.getAllTileSources(
      tileSourceInput,
      options
    );

    tiffTileSources.then((ts) => {
      if (!ts) return; // Check for null

      viewer.open(ts);
      // Check if it's OME-Zarr and setup sliders if so
      if (
        ts &&
        ts[0] &&
        ts[0] instanceof OpenSeadragon.OmeNgffOzxTileSource &&
        ts[0].OMEZarrMetadata
      ) {
        handleOMEZarrOpen(ts[0]);
      }
    });

    tiffTileSources.then((tileSources) => {
      if (!tileSources || !Array.isArray(tileSources) || tileSources.length === 0) {
        console.error("No tile sources returned");
        document.getElementById("filename").textContent += ": No valid tile sources found";
        return;
      }

      document.getElementById("filename").textContent +=
        " -- " + tileSources.length + " image" + (tileSources.length !== 1 ? "s" : "") + " found";

      // Filter out any undefined/null tile sources before processing
      const validTileSources = tileSources.filter((ts) => ts !== null && ts !== undefined);
      if (validTileSources.length === 0) {
        console.error("No valid tile sources after filtering");
        return;
      }

      // Only try to access promises if they exist
      const promises = validTileSources
        .filter((ts) => ts.promises && ts.promises.ready)
        .map((t) => t.promises.ready);

      if (promises.length > 0) {
        Promise.all(promises).then(() => showTileSourcesInfo(validTileSources));
      } else {
        showTileSourcesInfo(validTileSources);
      }
    });

    return;
  } else {
    const lineCount = tileSourceInput.length;
    // Use 0‑based indices for the slider
    const currentIndex = Math.floor((lineCount - 1) / 2);
    const tileSourceInputCurrent = tileSourceInput[currentIndex]; // initial image

    const options = {
      GeoTiffSet: true,
      CurrentZ: currentIndex,
      MaxZ: lineCount - 1, // last index
      MinZ: 0, // first index
      ImageArray: tileSourceInput,
      logLatency: true,
    };

    // Save the options globally so the slider can access them
    globalZOptions = options;

    const tiffTileSources = OpenSeadragon.GeoTIFFTileSource.getAllTileSources(
      tileSourceInputCurrent,
      options
    );

    tiffTileSources.then((tileSources) => {
      if (!tileSources || !Array.isArray(tileSources) || tileSources.length === 0) {
        console.error("No tile sources returned");
        document.getElementById("filename").textContent += ": No valid tile sources found";
        return;
      }

      document.getElementById("filename").textContent +=
        " -- " + tileSources.length + " image" + (tileSources.length !== 1 ? "s" : "") + " found";

      // Filter out any undefined/null tile sources before processing
      const validTileSources = tileSources.filter((ts) => ts !== null && ts !== undefined);
      if (validTileSources.length === 0) {
        console.error("No valid tile sources after filtering");
        return;
      }

      // Only try to access promises if they exist
      const promises = validTileSources
        .filter((ts) => ts.promises && ts.promises.ready)
        .map((t) => t.promises.ready);

      if (promises.length > 0) {
        Promise.all(promises).then(() => showTileSourcesInfo(validTileSources));
      } else {
        showTileSourcesInfo(validTileSources);
      }
    });

    return;
  }

  return;
}

/**
 * Helper to handle OME-Zarr specific UI setup
 */
function handleOMEZarrOpen(tileSource) {
  if (!tileSource.OMEZarrMetadata) return;

  // Update global state – keep the original File (if any) so that later
  // updates can rebuild a source correctly (blob URLs lose the .ozx extension).

  globalOMEState.url = tileSource._file || tileSource.url;

  // Extract current values from the source
  //globalOMEState.z = tileSource.z ?? 0;
  //globalOMEState.t = tileSource.t ?? 0;
  //globalOMEState.c = tileSource.c ?? 0;
  globalOMEState.z = tileSource.z !== undefined ? tileSource.z : 0;
  globalOMEState.t = tileSource.t !== undefined ? tileSource.t : 0;
  globalOMEState.c = tileSource.c !== undefined ? tileSource.c : 0;

  // Copy sizes
  const meta = tileSource.OMEZarrMetadata;
  globalOMEState.zSize = meta.zSize;
  globalOMEState.tSize = meta.tSize;
  globalOMEState.cSize = meta.cSize;

  // Build sliders for Z/T/C
  setupOMEZarrSliders(globalOMEState);

  // ---------------------------------------------------------
  //  Attach a neighbour‑prefetcher so that when the viewer is idle
  //  we start loading tiles from the adjacent Z/T/C slices.
  // ---------------------------------------------------------
  if (window.omePrefetcher) {
    // let the old instance be garbage‑collected
    window.omePrefetcher = null;
  }
  window.omePrefetcher = new NeighbourPrefetcher(viewer, tileSource);

  return;
}

/* … later, when the slice is changed … */

function updateOMEZarrSource(type, value) {
  if (!globalOMEState.url) return;

  // Update the global slice index
  globalOMEState[type] = value;

  // Preserve the current viewport
  const center = viewer.viewport.getCenter(true);
  const zoom = viewer.viewport.getZoom(true);

  // Build a fresh source with the new index
  const newSource = new OpenSeadragon.OmeNgffOzxTileSource({
    url: globalOMEState.url,
    z: globalOMEState.zSize > 1 ? globalOMEState.z : undefined,
    t: globalOMEState.tSize > 1 ? globalOMEState.t : undefined,
    c: globalOMEState.cSize > 1 ? globalOMEState.c : undefined,
  });

  viewer.open(newSource);

  // Re‑position the viewport once the image is ready
  viewer.addHandler("open", function reposition() {
    viewer.removeHandler("open", reposition);
    viewer.viewport.zoomTo(zoom, center);
  });

  // ----------  NEW – start a fresh prefetcher for the *new* slice ----------
  if (window.omePrefetcher) {
    window.omePrefetcher = null;
  }
  window.omePrefetcher = new NeighbourPrefetcher(viewer, newSource);
}

/* --------------------------------------------------------------------- */
/*  Helper functions – file‑format detection                             */
/* --------------------------------------------------------------------- */

function isOZX(urlOrFile) {
  if (Array.isArray(urlOrFile)) return false; // local Zarr is array of File objects
  const name = typeof urlOrFile === "string" ? urlOrFile : urlOrFile.name;

  const lower = name.toLowerCase();
  // Check for OME-Zarr file extensions
  return (
    lower.endsWith(".ozx") ||
    lower.endsWith(".zarr") ||
    lower.endsWith(".zip") ||
    lower.includes(".zarr") ||
    (name.includes(".") && name.split(".").pop() === "zarr")
  );
}

function isGeoTiffSet(urlOrFile) {
  if (Array.isArray(urlOrFile)) return false;
  const name = typeof urlOrFile === "string" ? urlOrFile : urlOrFile.name;
  const lower = name.toLowerCase();

  consolelog("In isGeoTiffSet, checking the file:" + name);

  return (
    !(
      lower.includes(".svs") ||
      lower.includes(".ozx") ||
      lower.includes(".zarr") ||
      lower.endsWith(".zip")
    ) &&
    (lower.includes(".ezio.tiff.txt") ||
      lower.includes(".ezio.tiff") ||
      lower.includes(".ezio.tif.txt") ||
      lower.includes(".ezio.tif") ||
      lower.includes(".ezio") ||
      lower.includes(".companion.ezio"))
  );
}

function isSVSTiff(urlOrFile) {
  if (Array.isArray(urlOrFile)) return false;
  const name = typeof urlOrFile === "string" ? urlOrFile : urlOrFile.name;
  const lower = name.toLowerCase();

  consolelog("In isSVSTiff, checking the file :" + name);

  return (
    !(
      lower.includes(".ezio.tiff.txt") ||
      lower.includes(".ezio.tif.txt") ||
      lower.includes(".ezio.tiff") ||
      lower.includes(".ezio.tif") ||
      lower.includes(".ezio") ||
      lower.includes(".companion.ome") ||
      lower.includes(".companion.ezio") ||
      lower.includes(".ozx") ||
      lower.includes(".zarr") ||
      lower.endsWith(".zip")
    ) &&
    (lower.includes(".tiff") || lower.includes(".tif") || lower.includes(".svs"))
  );
}

/* --------------------------------------------------------------------- */
/*  Async line‑iterator for text files (used for URL based GeoTIFF‑set)   */
/* --------------------------------------------------------------------- */

async function* makeTextFileLineIterator(url) {
  console.log("makeTextFileLineIterator file:" + url);
  const response = await fetch(url);
  const utf8Decoder = new TextDecoder("utf-8");
  const reader = response.body.getReader();
  let { value: chunk, done: readerDone } = await reader.read();
  chunk = chunk ? utf8Decoder.decode(chunk, { stream: true }) : "";

  const re = /\r\n|\n|\r/gm;
  let startIndex = 0;

  while (true) {
    const result = re.exec(chunk);
    if (!result) {
      if (readerDone) break;
      const remainder = chunk.substr(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      chunk = remainder + (chunk ? utf8Decoder.decode(chunk, { stream: true }) : "");
      startIndex = re.lastIndex = 0;
      continue;
    }
    yield chunk.substring(startIndex, result.index);
    startIndex = re.lastIndex;
  }
  if (startIndex < chunk.length) {
    yield chunk.substr(startIndex);
  }
}

/* --------------------------------------------------------------------- */
/*  File picker – handle local files (GeoTIFF‑set or single image)       */
/* --------------------------------------------------------------------- */

document.getElementById("file-picker").onchange = async function (event) {
  viewer.close();
  clearImageInfo();

  const file = this.files[0];
  if (!file) {
    consolelog("File is NULL, return.");
    return;
  }
  const fileName = file.name;
  if (!fileName) {
    consolelog("File Name is NULL, return.");
    return;
  }

  consolelog("Find out what kind of file format for " + fileName);

  try {
    /*  GEO‑TIFF‑SET (with Z‑stack) */
    if (isGeoTiffSet(fileName)) {
      consolelog("It is GEO‑TIFF-SET (with Z‑stack) ...");
      const text = await file.text();
      const lines = text.split(/\r\n|\n/);
      const legacyLines = lines.filter(
        (line) => line.includes(".tiff") || line.includes(".tif") || line.includes(".svs")
      );

      const lineCount = legacyLines.length;
      const currentZ = (lineCount + 1) / 2;
      const MaxZ = lineCount;
      const MinZ = 1;

      if (enableDebug) {
        for (let i = 0; i < lineCount; i++) {
          consolelog("File " + i + ": " + legacyLines[i]);
        }
      }
      // Use the updated setupImage logic
      setupImage(legacyLines, file.name, true);
      return;
    } else {
      /*  SVS / GEO‑TIFF (single image) */
      if (isSVSTiff(file)) {
        consolelog("It is svs or GEO-Tiff  ...");
        setupImage(file, file.name);
        return;
      } else {
        if (isOZX(file)) {
          consolelog("It is OME-Zarr file  ...");
          setupImage(file, file.name);
          return;
        } else {
          console.error("We don't support this file yet, please check it carefully ...");
          return;
        }
      }
    }
  } catch (e) {
    console.error(e);
    return;
  }

  return;
};

/* --------------------------------------------------------------------- */
/*  URL lookup – handle remote files (GeoTIFF‑set or single image)         */
/* --------------------------------------------------------------------- */

document.getElementById("use-link").onclick = async function () {
  viewer.close();
  clearImageInfo();

  const input = document.getElementById("link-input");
  const url = input.value;
  if (!url) return;

  consolelog("Find out what kind of file format for the URL: " + url);

  try {
    /*  GEO‑TIFF‑SET (with Z‑stack) */
    if (isGeoTiffSet(url)) {
      consolelog("It is GEO‑TIFF-SET (with Z‑stack) ...");
      const lineIterator = makeTextFileLineIterator(url);
      const legacyLines = [];
      for await (const line of lineIterator) {
        if (line.includes(".tiff") || line.includes(".tif") || line.includes(".svs")) {
          legacyLines.push(line);
        }
      }

      const lineCount = legacyLines.length;
      const currentZ = (lineCount + 1) / 2;
      const MaxZ = lineCount;
      const MinZ = 1;

      if (enableDebug) {
        for (let i = 0; i < lineCount; i++) {
          consolelog("File " + i + ": " + legacyLines[i]);
        }
      }
      setupImage(legacyLines, url, true);
      return;
    } else {
      /*  SVS / GEO‑TIFF (single image) */
      if (isSVSTiff(url)) {
        consolelog("It is svs or GEO-Tiff  ...");
        setupImage(url, url);
        return;
      } else {
        if (isOZX(url)) {
          consolelog("It is OME-Zarr file  ...");
          setupImage(url, url);
          return;
        } else {
          console.error("We don't support this file yet, please check it carefully ...");
          return;
        }
      }
    }
  } catch (e) {
    console.error(e);
    return;
  }

  return;
};

/* --------------------------------------------------------------------- */
/*  Demo‑link helpers                                                    */
/* --------------------------------------------------------------------- */

let links = [...document.querySelectorAll(".demo-link")].map((el) => {
  el.onclick = function () {
    const href = this.getAttribute("data-href");
    document.querySelector("#link-input").setAttribute("value", href);
    document.querySelector("#use-link").dispatchEvent(new Event("click"));
  };
  return el;
});
