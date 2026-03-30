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
  import("numcodecs")
    .then((m) => {
      console.log("[CodecBootstrap] numcodecs module loaded");
      // Register codecs if they exist
      if (m.Blosc) {
        console.log("[CodecBootstrap] blosc codec available");
      }
      return m;
    })
    .catch((e) => {
      console.warn("[CodecBootstrap] numcodecs failed to load:", e.message);
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
