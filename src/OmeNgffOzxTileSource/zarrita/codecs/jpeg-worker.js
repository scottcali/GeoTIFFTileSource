// Web Worker for TurboJPEG decoding
// This runs in a separate thread, providing isolation for the WASM memory
// and enabling true parallel decoding.

let turboPromise = null;

async function getTurboJPEG() {
  if (turboPromise !== null) {
    return turboPromise;
  }

  turboPromise = (async () => {
    try {
      const { default: initTurboJPEG } =
        await import("../../../turbojpeg-codec/libjpegturb_inline_es6_decoder.js");
      const turbo = await initTurboJPEG();
      if (!turbo || !turbo.JPEGDecoder) {
        throw new Error("TurboJPEG module loaded but JPEGDecoder not available");
      }
      return turbo;
    } catch (err) {
      console.warn("[JpegWorker] TurboJPEG not available:", err.message);
      throw err;
    }
  })();

  return turboPromise;
}

let decoderInstance = null;

async function decodeTurbo(bytes, expectedHeight, expectedWidth) {
  const turbo = await getTurboJPEG();

  if (!decoderInstance) {
    decoderInstance = new turbo.JPEGDecoder();
  }

  const encBuf = decoderInstance.getEncodedBuffer(bytes.byteLength);
  encBuf.set(new Uint8Array(bytes));

  decoderInstance.readHeader();
  decoderInstance.decode();

  const frameInfo = decoderInstance.getFrameInfo();
  const decBuf = decoderInstance.getDecodedBuffer();

  const actualWidth = frameInfo.width;
  const actualHeight = frameInfo.height;
  const actualPixels = actualWidth * actualHeight;

  if (actualPixels === 0 || decBuf.length === 0) {
    throw new Error("TurboJPEG returned empty buffer");
  }

  const expectedPixels = expectedWidth * expectedHeight;
  let grayData;

  if (actualWidth === expectedWidth && actualHeight === expectedHeight) {
    if (frameInfo.componentCount === 1) {
      // Copy out of WASM memory
      grayData = new Uint8Array(decBuf);
    } else {
      grayData = new Uint8Array(expectedPixels);
      for (let i = 0; i < expectedPixels; i++) {
        const idx = i * 3;
        // Fast integer math instead of slow floats & Math.round
        // 0.299 * 256 ≈ 77, 0.587 * 256 ≈ 150, 0.114 * 256 ≈ 29
        grayData[i] = (decBuf[idx] * 77 + decBuf[idx + 1] * 150 + decBuf[idx + 2] * 29) >> 8;
      }
    }
  } else {
    // Dimension padding
    grayData = new Uint8Array(expectedPixels);
    const copyWidth = Math.min(actualWidth, expectedWidth);
    const copyHeight = Math.min(actualHeight, expectedHeight);

    if (frameInfo.componentCount === 1) {
      for (let y = 0; y < copyHeight; y++) {
        const srcOffset = y * actualWidth;
        const dstOffset = y * expectedWidth;
        // Fast memory copy for full rows instead of pixel-by-pixel
        grayData.set(decBuf.subarray(srcOffset, srcOffset + copyWidth), dstOffset);
      }
    } else if (frameInfo.componentCount === 3) {
      for (let y = 0; y < copyHeight; y++) {
        const srcRowOffset = y * actualWidth * 3;
        const dstRowOffset = y * expectedWidth;
        for (let x = 0; x < copyWidth; x++) {
          const srcIdx = srcRowOffset + x * 3;
          grayData[dstRowOffset + x] =
            (decBuf[srcIdx] * 77 + decBuf[srcIdx + 1] * 150 + decBuf[srcIdx + 2] * 29) >> 8;
        }
      }
    }
  }

  return grayData;
}

self.addEventListener("message", async (e) => {
  const { id, bytes, expectedHeight, expectedWidth } = e.data;

  try {
    const start = performance.now();
    const result = await decodeTurbo(bytes, expectedHeight, expectedWidth);
    const workerTime = performance.now() - start;

    // We can't transfer the buffer back if it's the exact same buffer
    // from WASM memory. We must clone it. `decodeTurbo` returns a newly
    // allocated `Uint8Array`, so its `.buffer` is safe to transfer.
    self.postMessage({ id, result: result.buffer, success: true, workerTime }, [result.buffer]);
  } catch (err) {
    self.postMessage({ id, error: err.message, success: false });
  }
});
