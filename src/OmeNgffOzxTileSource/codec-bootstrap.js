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
        globalThis.numcodecs.registerCodec({ name: "blosc", codec: m.Blosc });
        console.log("[CodecBootstrap] blosc codec registered");
      }
      if (m.LZ4) {
        globalThis.numcodecs.registerCodec({ name: "lz4", codec: m.LZ4 });
        console.log("[CodecBootstrap] lz4 codec registered");
      }
      if (m.Zstd) {
        globalThis.numcodecs.registerCodec({ name: "zstd", codec: m.Zstd });
        console.log("[CodecBootstrap] zstd codec registered");
      }
      if (m.GZip) {
        globalThis.numcodecs.registerCodec({ name: "gzip", codec: m.GZip });
        console.log("[CodecBootstrap] gzip codec registered");
      }
      if (m.Zlib) {
        globalThis.numcodecs.registerCodec({ name: "zlib", codec: m.Zlib });
        console.log("[CodecBootstrap] zlib codec registered");
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
