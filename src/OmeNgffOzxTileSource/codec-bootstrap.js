/*  codec‑bootstrap.js – ZSTD-free initialization */
console.log("[CodecBootstrap] Starting initialization...");

// Create a global registry if it doesn't exist
if (typeof globalThis.numcodecs === "undefined") {
  globalThis.numcodecs = {
    registry: new Map(),
    registerCodec: function (codecDef) {
      this.registry.set(codecDef.name, codecDef.codec);
    },
    getCodec: function (name) {
      return this.registry.get(name);
    },
  };
}

// Load all codecs with better error handling
const codecBootstrapReady = Promise.all([
  import("numcodecs/blosc.js")
    .then((m) => {
      console.log("[CodecBootstrap] blosc codec loaded");
      return m;
    })
    .catch((e) => {
      console.warn("[CodecBootstrap] blosc failed to load:", e.message);
      return null;
    }),
  import("numcodecs/gzip.js")
    .then((m) => {
      console.log("[CodecBootstrap] gzip codec loaded");
      return m;
    })
    .catch((e) => {
      console.warn("[CodecBootstrap] gzip failed to load:", e.message);
      return null;
    }),
  import("numcodecs/zlib.js")
    .then((m) => {
      console.log("[CodecBootstrap] zlib codec loaded");
      return m;
    })
    .catch((e) => {
      console.warn("[CodecBootstrap] zlib failed to load:", e.message);
      return null;
    }),
  import("numcodecs/lz4.js")
    .then((m) => {
      console.log("[CodecBootstrap] lz4 codec loaded");
      return m;
    })
    .catch((e) => {
      console.warn("[CodecBootstrap] lz4 failed to load:", e.message);
      return null;
    }),
])
  .then(() => {
    console.log("[CodecBootstrap] All codecs initialized successfully");
    return true;
  })
  .catch((error) => {
    console.warn("[CodecBootstrap] Codec initialization had issues:", error);
    return true;
  });

export { codecBootstrapReady };
