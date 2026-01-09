/********************************************************************
 * demo.js – no import‑map, uses the global OpenSeadragon that we
 * loaded from the CDN in demo.html.
 *
 * What we do:
 *   1️⃣ Import only the *enable* helper from the GeoTIFF‑TileSource
 *      plugin (the plugin itself is an ES‑module, so this line stays)
 *   2️⃣ Call the helper with the global `OpenSeadragon` object.
 *   3️⃣ Use that global throughout the rest of the file.
 ********************************************************************/

/* -----------------------------------------------------------------
 * 1️⃣  Import the enable‑function from the plugin.
 * ----------------------------------------------------------------- */
import { enableGeoTIFFTileSource } from "../dist/geotiff-tilesource.mjs";

/* -----------------------------------------------------------------
 * 2️⃣  Attach the GeoTIFFTileSource to the OpenSeadragon global.
 * ----------------------------------------------------------------- */
// The CDN script already created `window.OpenSeadragon`.
if (!window.OpenSeadragon) {
  // Helpful early‑failure message if the CDN script didn’t load.
  throw new Error(
    "OpenSeadragon is not available. Make sure the CDN script <script src=\"https://cdnjs.cloudflare.com/ajax/libs/openseadragon/5.0.1/openseadragon.min.js\"></script> is loaded before demo.js."
  );
}
const OpenSeadragon = window.OpenSeadragon;

// Register the plugin (adds `OpenSeadragon.GeoTIFFTileSource` etc.)
enableGeoTIFFTileSource(OpenSeadragon);

window.OpenSeadragon.DEFAULT_SETTINGS.timeout = 120000;

/* -----------------------------------------------------------------
 * 3️⃣  Create the viewer – now we can use the global OSD object.
 * ----------------------------------------------------------------- */
let viewer = (window.viewer = OpenSeadragon({
  // `element` can be a DOM node *or* the ID of the container.
  element: "viewer",
  prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
  minZoomImageRatio: 0.01,
  visibilityRatio: 0,
  crossOriginPolicy: "Anonymous",
  ajaxWithCredentials: true,
  sequenceMode: true,
}));

/* -----------------------------------------------------------------
 * UI wiring (file picker, link input, demo buttons)
 * ----------------------------------------------------------------- */
document.getElementById("file-picker").onchange = function (ev) {
  viewer.close();
  clearImageInfo();
  // `this.files[0]` is a File object; its `name` is shown in the UI.
  setupImage(this.files[0], this.files[0].name);
};

document.getElementById("use-link").onclick = function () {
  viewer.close();
  clearImageInfo();
  const url = document.getElementById("link-input").value.trim();
  if (!url) return;
  setupImage(url, url);
};

/* -----------------------------------------------------------------
 * “Demo” links – click a button, copy its URL to the input and fire
 * a click on the “Load from link” button.
 * ----------------------------------------------------------------- */
[...document.querySelectorAll(".demo-link")].forEach((el) => {
  el.onclick = function () {
    const href = this.dataset.href;
    document.getElementById("link-input").value = href;
    document.getElementById("use-link").dispatchEvent(new Event("click"));
  };
});

/* -----------------------------------------------------------------
 * Core logic – open a TIFF (local File or remote URL) and display it.
 * ----------------------------------------------------------------- */
function setupImage(tileSourceInput, tilesourceName = "") {
  viewer.close();
  clearImageInfo();
  document.getElementById("filename").textContent = tilesourceName;

  // Ask the plugin to create one or more GeoTIFF tile sources.
  const tiffTileSources = OpenSeadragon.GeoTIFFTileSource.getAllTileSources(
    tileSourceInput,
    { logLatency: true }
  );

  // When the promise resolves we give the result to OSD.
  tiffTileSources
    .then((sources) => viewer.open(sources))
    .catch((err) => {
      document.getElementById(
        "filename"
      ).textContent += ": Error opening file. Is this a valid TIFF? See console.";
      console.error(err);
    });

  // ---- UI: report how many sub‑images we found -----------------
  tiffTileSources
    .then((tileSources) => {
      document.getElementById("filename").textContent +=
        ` -- ${tileSources.length} image${tileSources.length !== 1 ? "s" : ""} found`;
      // Wait until each tile‑source has finished its async init.
      return Promise.all(
        tileSources.map((ts) => ts.promises.ready)
      ).then(() => tileSources);
    })
    .then(showTileSourcesInfo)
    .catch(() => {}); // already handled above
}

/* -----------------------------------------------------------------
 * UI helpers – clear, render info, etc.
 * ----------------------------------------------------------------- */
function clearImageInfo() {
  document.getElementById("image-description").textContent = "";
  document.getElementById("associated-images").textContent = "";
}

function showTileSourcesInfo(tileSources) {
  clearImageInfo();
  const desc = document.getElementById("image-description");

  tileSources.forEach((ts, index) => {
    const header = document.createElement("h3");
    header.textContent = `TileSource #${index}`;
    desc.appendChild(header);

    showImageInfo(ts.GeoTIFFImages);
    desc.appendChild(document.createElement("hr"));
  });
}

function showImageInfo(images) {
  const container = document.getElementById("image-description");
  const frag = document.createDocumentFragment();

  images.forEach((image, i) => {
    const wrapper = document.createElement("div");
    frag.appendChild(wrapper);

    const h4 = document.createElement("h4");
    h4.textContent = `Tiff Page ${i}`;
    wrapper.appendChild(h4);

    const fd = { ...image.fileDirectory };
    if (fd.ImageDescription) {
      const infoDiv = document.createElement("div");
      const html = `<u>ImageDescription contents for this sub‑image</u><br>${fd.ImageDescription.replaceAll(
        "|",
        "<br>"
      )}`;
      delete fd.ImageDescription;
      infoDiv.innerHTML = html;
      wrapper.appendChild(infoDiv);
    }

    // Build a printable, short‑hand version of the file directory.
    const printable = {};
    Object.entries(fd).forEach(([k, v]) => {
      printable[k] =
        typeof v !== "string" && v.length > 8
          ? `${v.constructor.name} (${v.length}) [...]`
          : typeof v !== "string" && typeof v.length !== "undefined"
          ? `${v.constructor.name}(${v.length}) [${[...v.values()]}]`
          : v;
    });

    const pre = document.createElement("pre");
    pre.textContent = JSON.stringify(printable, null, 2);
    wrapper.appendChild(pre);
  });

  container.appendChild(frag);
}
