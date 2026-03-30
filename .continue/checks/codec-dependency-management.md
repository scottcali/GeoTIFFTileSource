---
name: Codec Dependency Management
description: Ensure proper handling of codec dependencies and imports in OME-Zarr implementation
---

Review changes to codec-related files to ensure:

1. Codec bootstrap initialization:

   - Verify that codec-bootstrap.js properly imports and registers codecs from the numcodecs module
   - Confirm that all necessary codecs (Blosc, LZ4, Zstd) are correctly initialized
   - Check that the bootstrap process follows the correct sequence for registering codecs with zarrita

2. Zarrita codec implementations:

   - Validate that zarrita/codecs.js uses correct dynamic import syntax for named exports from numcodecs
   - Confirm that Blosc, LZ4, and Zstd codecs are properly implemented with correct parameter handling
   - Ensure that codec classes extend the appropriate base classes and implement required methods

3. LERC codec implementation:

   - Check that lerc.js uses proper ES module import syntax (\* as Lerc from 'lerc')
   - Verify that the LERC codec implementation properly wraps the lerc module functionality
   - Confirm that encoding/decoding methods correctly handle the LERC format

4. Dependency import patterns:

   - Ensure that obsolete direct codec imports are removed from OmeNgffOzxTileSource.js
   - Verify that all codec dependencies are accessed through the proper bootstrap mechanism
   - Check that import statements follow modern ES module syntax and best practices

5. Error handling and fallbacks:
   - Confirm that codec initialization gracefully handles missing or incompatible dependencies
   - Verify that appropriate error messages are provided when codecs fail to load
   - Check that the system can operate with reduced functionality when optional codecs are unavailable
