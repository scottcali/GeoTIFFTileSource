import { beforeEach, describe, expect, it } from "vitest";

describe("GeoTIFFTileSource plugin", () => {
  let OpenSeadragon;
  let enableGeoTIFFTileSource;

  beforeEach(async () => {
    // Dynamically import OpenSeadragon and the plugin
    OpenSeadragon = (await import("openseadragon")).default;
    const pluginModule = await import("../dist/geotiff-tilesource.mjs");
    enableGeoTIFFTileSource = pluginModule.enableGeoTIFFTileSource;

    // Enable GeoTIFF Tile Source for OpenSeadragon
    enableGeoTIFFTileSource(OpenSeadragon);
  });

  it("should import init function", () => {
    expect(enableGeoTIFFTileSource).toBeDefined();
  });

  it("should attach GeoTIFFTileSource to the OpenSeadragon namespace", () => {
    expect(OpenSeadragon.GeoTIFFTileSource).toBeDefined();
  });
});
