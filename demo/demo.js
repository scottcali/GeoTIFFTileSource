/* demo.js – updated to add a Z‑axis slider for GeoTIFF‑sets */

let enableDebug = true;

/**
 * Internal debug logger – only prints when `enableDebug` is true.
 *
 * @param {Any} ...args
 */
const consolelog = (...args) => {
    if (enableDebug) console.log('[Demo]', ...args);
};

/* Make OpenSeadragon global for UMD plugins (if not already set) */
if (typeof window.OpenSeadragon === 'undefined' && typeof OpenSeadragon !== 'undefined') {
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

/**
 * --------------------------------------------------------------------
 * Global state helpers for the Z‑slider
 * --------------------------------------------------------------------
 */
let globalZOptions = null;          // Options object that remains alive while a GeoTIFF‑set is active
let zSliderContainer = null;      // DOM element for the slider container
let zSliderInput = null;          // The `<input type="range">` element
let zSliderValueSpan = null;       // Span for showing the current Z value

/**
 * Remove the slider from the DOM (if it exists).
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
    input.style.marginLeft = "4px";

    container.appendChild(label);
    container.appendChild(input);
    viewerEl.appendChild(container);

    // Store refs
    zSliderContainer = container;
    zSliderInput = input;
    zSliderValueSpan = valueSpan;

    // Bind change
    input.addEventListener("input", function (e) {
        const val = parseInt(e.target.value, 10);
        if (zSliderValueSpan) zSliderValueSpan.textContent = val;
        openZIndex(val);
    });
}

/**
 * Open a new tile source for the given Z index.
 * Keeps the current viewport centre/zoom.
 * @param {Number} zIndex
 */
function openZIndex(zIndex) {
    if (!globalZOptions) return;       // Should not happen

    // Update the options object for the new Z value
    globalZOptions.CurrentZ = zIndex;

    const newInput = globalZOptions.ImageArray[zIndex];

    // Capture the current viewport state
    const center = viewer.viewport.getCenter(true);
    const zoom = viewer.viewport.getZoom(true);

    // Open the new tile source
    OpenSeadragon.GeoTIFFTileSource.getAllTileSources(newInput, globalZOptions).then(
        (ts) => {
            viewer.open(ts);

            // Re‑position the viewport once the new image is ready
            viewer.addHandler("open", function reposition() {
                viewer.removeHandler("open", reposition);
                // Use zoomTo with center to keep the same view
                viewer.viewport.zoomTo(zoom, center);
            });
        }
    );
}

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
        const images = ts.GeoTIFFImages;
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

        const options = {
            GeoTiffSet: false,
            CurrentZ: 0,
            MaxZ: 0,
            MinZ: 0,
            ImageArray: tileSourceInput,
            logLatency: true,
        };

        const tiffTileSources = OpenSeadragon.GeoTIFFTileSource.getAllTileSources(tileSourceInput, options);

        tiffTileSources.then((ts) => viewer.open(ts));

        tiffTileSources
            .then((tileSources) => {
                document.getElementById("filename").textContent +=
                    " -- " + tileSources.length + " image" + (tileSources.length !== 1 ? "s" : "") + " found";
                Promise.all(tileSources.map((t) => t.promises.ready)).then(() =>
                    showTileSourcesInfo(tileSources)
                );
            })
            .catch((error) => {
                document.getElementById("filename").textContent +=
                    ": Error opening file. Is this a valid tiff? See console for details.";
                console.error(error);
            });
			
			return;
			
    } else {
        const lineCount = tileSourceInput.length;
        // Use 0‑based indices for the slider
        const currentIndex = Math.floor((lineCount - 1) / 2);
        const tileSourceInputCurrent = tileSourceInput[currentIndex];   // initial image

        const options = {
            GeoTiffSet: true,
            CurrentZ: currentIndex,
            MaxZ: lineCount - 1,   // last index
            MinZ: 0,               // first index
            ImageArray: tileSourceInput,
            logLatency: true,
        };

        // Save the options globally so the slider can access them
        globalZOptions = options;

        const tiffTileSources = OpenSeadragon.GeoTIFFTileSource.getAllTileSources(tileSourceInputCurrent, options);

        tiffTileSources.then((ts) => viewer.open(ts));
        // Add the slider overlay now
        addZSlider(options);

        tiffTileSources
            .then((tileSources) => {
                document.getElementById("filename").textContent +=
                    " -- " + tileSources.length + " image" + (tileSources.length !== 1 ? "s" : "") + " found";
                Promise.all(tileSources.map((t) => t.promises.ready)).then(() =>
                    showTileSourcesInfo(tileSources)
                );
            })
            .catch((error) => {
                document.getElementById("filename").textContent +=
                    ": Error opening file. Is this a valid tiff? See console for details.";
                console.error(error);
            });
			
			return;
    }
	
	return;
}

/* --------------------------------------------------------------------- */
/*  Helper functions – file‑format detection                             */
/* --------------------------------------------------------------------- */

function isGeoTiffSet(urlOrFile) {
    if (Array.isArray(urlOrFile)) return false;
    const name = typeof urlOrFile === "string" ? urlOrFile : urlOrFile.name;

    consolelog("In isGeoTiffSet, checking the file:" + name);

    return (
        name.includes(".ezio.tiff.txt") ||
        name.includes(".ezio.tiff") ||
        name.includes(".ezio.tif.txt") ||
        name.includes(".ezio.tif") ||
        name.includes(".ezio") ||
        name.includes(".companion.ezio")
    );
}

function isSVSTiff(urlOrFile) {
    if (Array.isArray(urlOrFile)) return false;
    const name = typeof urlOrFile === "string" ? urlOrFile : urlOrFile.name;

    consolelog("In isSVSTiff, checking the file :" + name);

    return (
        !(
            name.includes(".ezio.tiff.txt") ||
            name.includes(".ezio.tif.txt") ||
            name.includes(".ezio.tiff") ||
            name.includes(".ezio") ||
            name.includes(".ezio.tif") ||
            name.includes(".companion.ome") ||
            name.includes(".companion.ezio")
        ) &&
        (name.includes(".tiff") || name.includes(".tif") || name.includes(".svs"))
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

document.getElementById("file-picker").onchange = async function () {
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
                console.error("We don't support this file yet, please check it carefully ...");
				return;
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
// https://localhost:8080/GeoTIFFTileSource/demo/multifile-Z5all_url.ezio.tiff.txt
// https://localhost:8080/GeoTIFFTileSource/demo/multifile-Z5all.ezio.tiff.txt


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
                console.error("We don't support this file yet, please check it carefully ...");
				return;
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
