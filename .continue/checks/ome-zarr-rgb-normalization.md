---
name: OME-Zarr RGB Normalization
description: Ensure proper RGB data normalization and codec handling in OME-Zarr implementation
---

Review changes to OME-Zarr related files to ensure:

1. RGB data normalization properly handles edge cases:

   - Check that renderTo8bitArray function correctly processes RGB-stored-together format [1, nZ, h, w, 3]
   - Verify getMinMaxValues function protects against division by zero errors
   - Confirm global min/max calculation across RGB channels when specific channel values are missing

2. Codec initialization follows correct patterns:

   - Validate that codec-bootstrap.js properly initializes codecs from numcodecs module
   - Check that zarrita codecs use correct dynamic import syntax for named exports
   - Ensure lerc.js uses proper ES module import syntax (\* as Lerc from 'lerc')

3. File format handling meets requirements:

   - Confirm support for both RGB-stored-together format [1, nZ, h, w, 3] and channel-separated format [1, 3, nZ, h, w]
   - Verify that normalization calculations prevent division by zero errors

4. Dependency management is correct:
   - Ensure all codec dependencies are properly imported and registered
   - Check that obsolete direct codec imports are removed from OmeNgffOzxTileSource.js
