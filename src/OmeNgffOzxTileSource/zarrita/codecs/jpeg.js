import { get_ctr, get_strides } from "../util.js";

const DEBUG = true;

function log(...args) {
  if (DEBUG) console.log("[JpegCodec]", ...args);
}

// Performance tracking
const perfStats = {
  turbo: { count: 0, totalTime: 0, maxTime: 0, totalWallTime: 0 },
  native: { count: 0, totalTime: 0, maxTime: 0 },
};

function printPerfStats() {
  if (perfStats.turbo.count > 0 || perfStats.native.count > 0) {
    const turboAvg =
      perfStats.turbo.count > 0
        ? (perfStats.turbo.totalTime / perfStats.turbo.count).toFixed(2)
        : 0;
    const turboWallAvg =
      perfStats.turbo.count > 0
        ? (perfStats.turbo.totalWallTime / perfStats.turbo.count).toFixed(2)
        : 0;
    const nativeAvg =
      perfStats.native.count > 0
        ? (perfStats.native.totalTime / perfStats.native.count).toFixed(2)
        : 0;

    let speedup = "";
    if (turboAvg > 0 && nativeAvg > 0) {
      const ratio = (nativeAvg / turboAvg).toFixed(2);
      speedup = ` (Turbo Worker is ${ratio}x faster)`;
    }

    console.log(
      `[JpegCodec] Performance: \n` +
        `  Turbo Worker: ${perfStats.turbo.count} tiles, pure decode avg ${turboAvg}ms (queue+decode avg ${turboWallAvg}ms), max ${perfStats.turbo.maxTime.toFixed(2)}ms\n` +
        `  Native Main:  ${perfStats.native.count} tiles, avg ${nativeAvg}ms, max ${perfStats.native.maxTime.toFixed(2)}ms` +
        speedup
    );
  }
}

// Print stats every 5 seconds if there's activity
setInterval(() => {
  if (perfStats.turbo.count > 0 || perfStats.native.count > 0) {
    printPerfStats();
  }
}, 5000);

// Native Decoder fallback on Main Thread
let sharedCanvas = null;
let sharedCtx = null;
function getSharedCanvas(width, height) {
  if (!sharedCanvas) {
    if (typeof OffscreenCanvas !== "undefined") {
      try {
        sharedCanvas = new OffscreenCanvas(width, height);
      } catch (e) {
        sharedCanvas = null;
      }
    }
    if (!sharedCanvas && typeof document !== "undefined") {
      sharedCanvas = document.createElement("canvas");
    }
  }

  if (sharedCanvas) {
    if (sharedCanvas.width < width || sharedCanvas.height < height) {
      sharedCanvas.width = Math.max(sharedCanvas.width, width);
      sharedCanvas.height = Math.max(sharedCanvas.height, height);
      sharedCtx = null;
    }
    if (!sharedCtx) {
      try {
        sharedCtx = sharedCanvas.getContext("2d", { willReadFrequently: true });
      } catch (e) {
        sharedCtx = null;
      }
    }
  }
  return { canvas: sharedCanvas, ctx: sharedCtx };
}

async function decodeNative(bytes, height, width) {
  const start = performance.now();

  const blob = new Blob([bytes], { type: "image/jpeg" });
  let bitmap;
  try {
    bitmap = await createImageBitmap(blob);
  } catch (err) {
    log("Native decode: invalid image blob", err.message);
    return new Uint8Array(height * width);
  }

  if (bitmap.width === 0 || bitmap.height === 0) {
    bitmap.close();
    log("Native decode: bitmap has zero dimension, returning empty data");
    return new Uint8Array(height * width);
  }

  const { canvas, ctx } = getSharedCanvas(
    Math.max(bitmap.width, width),
    Math.max(bitmap.height, height)
  );

  if (!canvas || !ctx) {
    bitmap.close();
    throw new Error("Cannot create canvas for JPEG decoding");
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0);
  const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height);
  bitmap.close();

  const rgbaData = imageData.data;
  const grayData = new Uint8Array(height * width);

  for (let y = 0; y < bitmap.height && y < height; y++) {
    for (let x = 0; x < bitmap.width && x < width; x++) {
      const srcIdx = (y * bitmap.width + x) * 4;
      const dstIdx = y * width + x;
      // Fast integer math instead of slow floats
      grayData[dstIdx] =
        (rgbaData[srcIdx] * 77 + rgbaData[srcIdx + 1] * 150 + rgbaData[srcIdx + 2] * 29) >> 8;
    }
  }

  const timeMs = performance.now() - start;
  perfStats.native.count++;
  perfStats.native.totalTime += timeMs;
  perfStats.native.maxTime = Math.max(perfStats.native.maxTime, timeMs);

  return grayData;
}

// -----------------------------------------------------------------
// Web Worker Pool for TurboJPEG
// -----------------------------------------------------------------
// Increase worker count significantly. For tasks like WASM decompression that
// might have brief IO/memory pauses, oversubscribing the CPU cores (1.5x)
// often yields higher throughput than matching them 1:1.
const NUM_WORKERS = Math.max(4, Math.floor((navigator.hardwareConcurrency || 4) * 1.5));
const MAX_IN_FLIGHT = NUM_WORKERS * 3; // Allow deep queues so workers never starve
const workers = [];
let workerIdCounter = 0;
let requestCounter = 0;
const pendingRequests = new Map();
const highPriorityQueue = []; // For current visible tiles
const lowPriorityQueue = []; // For prefetch tiles
let inFlightCount = 0;

// Initialize worker pool lazily
function getWorker() {
  if (workers.length === 0) {
    log(`Initializing Web Worker Pool with ${NUM_WORKERS} workers for TurboJPEG`);
    for (let i = 0; i < NUM_WORKERS; i++) {
      try {
        // Vite handles worker URL construction
        const worker = new Worker(new URL("./jpeg-worker.js", import.meta.url), { type: "module" });

        worker.onmessage = (e) => {
          const { id, result, error, success, workerTime } = e.data;
          const req = pendingRequests.get(id);
          inFlightCount--;

          if (req) {
            pendingRequests.delete(id);
            if (success) {
              const wallTimeMs = performance.now() - req.start;
              const pureTimeMs = workerTime || wallTimeMs; // Use exact worker time if available

              perfStats.turbo.count++;
              perfStats.turbo.totalTime += pureTimeMs;
              perfStats.turbo.totalWallTime += wallTimeMs;
              perfStats.turbo.maxTime = Math.max(perfStats.turbo.maxTime, pureTimeMs);
              req.resolve(new Uint8Array(result));
            } else {
              req.reject(new Error(error));
            }
          }

          // Process next task
          processWorkerQueue();
        };

        worker.onerror = (err) => {
          log(`Worker ${i} error:`, err);
          inFlightCount--;
          processWorkerQueue();
        };

        workers.push(worker);
      } catch (e) {
        log("Failed to initialize worker:", e.message);
        break;
      }
    }
  }

  return workers;
}

function processWorkerQueue() {
  // If we've maxed out workers' internal queues or nothing to process, wait
  if (
    inFlightCount >= MAX_IN_FLIGHT ||
    (highPriorityQueue.length === 0 && lowPriorityQueue.length === 0)
  ) {
    return;
  }

  const workerList = getWorker();
  if (!workerList || workerList.length === 0) return;

  // Pop next task (prioritize high)
  const task = highPriorityQueue.length > 0 ? highPriorityQueue.shift() : lowPriorityQueue.shift();
  if (!task) return;

  const worker = workerList[workerIdCounter % workerList.length];
  workerIdCounter++;

  inFlightCount++;

  try {
    worker.postMessage(
      {
        id: task.id,
        bytes: task.buffer,
        expectedHeight: task.expectedHeight,
        expectedWidth: task.expectedWidth,
      },
      [task.buffer]
    );
  } catch (e) {
    inFlightCount--;
    task.reject(e);
  }

  // Try to schedule another if we have capacity
  if (
    inFlightCount < MAX_IN_FLIGHT &&
    (highPriorityQueue.length > 0 || lowPriorityQueue.length > 0)
  ) {
    processWorkerQueue();
  }
}

async function decodeTurboWorker(bytes, expectedHeight, expectedWidth) {
  // Ensure workers are initialized
  getWorker();

  const id = requestCounter++;
  const start = performance.now();

  return new Promise((resolve, reject) => {
    // Create a copy of the buffer to transfer to the worker
    const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);

    const task = { id, buffer, expectedHeight, expectedWidth, resolve, reject, start };
    pendingRequests.set(id, task);

    // Add to appropriate queue
    // Heuristic: If we suddenly get > 8 requests, the later ones are probably prefetches
    if (pendingRequests.size > 8 || expectedWidth > 1024) {
      lowPriorityQueue.push(task);
    } else {
      highPriorityQueue.push(task);
    }

    processWorkerQueue();
  });
}

// -----------------------------------------------------------------
// Main Decoder
// -----------------------------------------------------------------

async function decodeWithTurboOrNative(bytes, shape) {
  const rank = shape.length;
  const expectedHeight = shape[rank - 2];
  const expectedWidth = shape[rank - 1];

  try {
    const result = await decodeTurboWorker(bytes, expectedHeight, expectedWidth);
    return result;
  } catch (err) {
    log("Turbo Worker decode failed, falling back to Native main-thread:", err.message);
    return decodeNative(bytes, expectedHeight, expectedWidth);
  }
}

export class JpegCodec {
  kind = "array_to_bytes";
  #shape;
  #stride;

  constructor(configuration, meta) {
    this.#shape = meta.shape;
    this.#stride = get_strides(meta.shape, "C");
  }

  static fromConfig(configuration, meta) {
    return new JpegCodec(configuration, meta);
  }

  encode(_arr) {
    throw new Error("JPEG encoding not implemented");
  }

  decode(bytes) {
    return decodeWithTurboOrNative(bytes, this.#shape).then((data) => ({
      data,
      shape: this.#shape,
      stride: this.#stride,
    }));
  }
}
