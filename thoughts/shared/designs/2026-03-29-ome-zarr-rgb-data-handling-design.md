---
date: 2026-03-29
topic: OME-Zarr RGB Data Handling Fix
status: implemented
---

# OME-Zarr RGB Data Handling Enhancement Design

## Problem Statement

The current OME-Zarr implementation doesn't properly handle RGB data when stored together in shape `[1, nZ, h, w, 3]` format versus the traditional channel-separated format `[1, 3, nZ, h, w]`. This causes incorrect rendering of RGB images that have channels combined in the last dimension.

## Constraints & Requirements

- Must maintain backward compatibility with existing channel-separated data format
- Must support both RGB-stored-together and channel-separated data formats
- Must follow existing code patterns and architecture
- Must not impact performance for existing use cases

## Proposed Solution

The solution involves modifying the `renderTo8bitArray` function (X) to detect and handle both data formats appropriately:

### 1. Format Detection Enhancement

Enhance detection logic to identify whether channels are stored together (shape ending with 3) or separated (channel dimension within shape):

```javascript
// Enhanced channel detection
function detectChannelFormat(shape, axes) {
  const channelIndex = axes.indexOf("c");

  // Case 1: Channel-separated format [1, 3, nZ, h, w] - channel dimension has size > 1
  if (channelIndex !== -1 && shape[channelIndex] > 1) {
    return { format: "separated", channelIndex };
  }

  // Case 2: RGB-stored-together format [1, nZ, h, w, 3] - last dimension is 3
  if (shape[shape.length - 1] === 3 && channelIndex === shape.length - 1) {
    return { format: "together", channelIndex: shape.length - 1 };
  }

  // Default to separated format for backward compatibility
  return { format: "separated", channelIndex };
}
```

### 2. Adaptive Data Processing

Modify the main processing loop to handle both formats:

```javascript
function X(e, a, t, l, r, n = !1) {
  const s = e[0].shape,
    m = s[0],
    p = s[1],
    c = m * p;
  a || (a = e.map(j));
  const f = l == null ? void 0 : l.map((o) => o && $(o));
  let u = performance.now(),
    i = new Uint8ClampedArray(4 * m * p).fill(0),
    h = 0;

  // Detect channel format
  const channelFormat = detectChannelFormat(s /* axes info */);

  if (channelFormat.format === "together") {
    // Handle RGB-stored-together format
    // Extract RGB data directly from last dimension
    // ...
  } else {
    // Handle existing channel-separated format (existing logic)
    for (let o = 0; o < e.length; o++) {
      h = 0;
      let y = t[o],
        b = f == null ? void 0 : f[o],
        A = e[o].data,
        v = a[o],
        S = r == null ? void 0 : r[o];
      for (let d = 0; d < c; d++) {
        let M = (Number(A[d]) - v[0]) / (v[1] - v[0]);
        M = Math.min(1, Math.max(0, M));
        for (let _ = 0; _ < 3; _++) {
          let x;
          if (b) {
            let U = (M * 255) << 0;
            (x = b[U][_]), S && (x = 255 - x);
          } else (x = (M * y[_]) << 0), S && y[_] != 0 && (x = 255 - x);
          i[h * 4 + _] = Math.max(i[h * 4 + _], x);
        }
        (i[h * 4 + 3] = 255), (h += 1);
      }
    }
  }

  // ... rest of function unchanged
}
```

## Error Handling Strategy

- Maintain existing error handling for invalid data
- Add graceful degradation for unrecognized formats
- Preserve backward compatibility by defaulting to existing behavior

## Testing Approach

1. Create unit tests for both data format scenarios
2. Test with sample OME-Zarr files in both `[1, 3, nZ, h, w]` and `[1, nZ, h, w, 3]` formats
3. Verify visual output correctness
4. Ensure no regression in existing functionality
