var Di = Object.defineProperty;
var ve = (g) => {
  throw TypeError(g);
};
var wi = (g, I, A) => I in g ? Di(g, I, { enumerable: !0, configurable: !0, writable: !0, value: A }) : g[I] = A;
var oA = (g, I, A) => wi(g, typeof I != "symbol" ? I + "" : I, A), Dg = (g, I, A) => I.has(g) || ve("Cannot " + A);
var M = (g, I, A) => (Dg(g, I, "read from private field"), A ? A.call(g) : I.get(g)), RA = (g, I, A) => I.has(g) ? ve("Cannot add the same private member more than once") : I instanceof WeakSet ? I.add(g) : I.set(g, A), eA = (g, I, A, e) => (Dg(g, I, "write to private field"), e ? e.call(g, A) : I.set(g, A), A), z = (g, I, A) => (Dg(g, I, "access private method"), A);
var wg = (g, I, A, e) => ({
  set _(t) {
    eA(g, I, t, A);
  },
  get _() {
    return M(g, I, e);
  }
});
function CA(g) {
  return (I, ...A) => ui(g, I, A);
}
function BI(g, I) {
  return CA(
    QB(
      g,
      I
    ).get
  );
}
const {
  apply: ui,
  getOwnPropertyDescriptor: QB,
  getPrototypeOf: Fe,
  ownKeys: di
} = Reflect, {
  iterator: pI,
  toStringTag: Si
} = Symbol, Gi = Object, {
  create: Ne,
  defineProperty: Fi
} = Gi, Ni = Array, pi = Ni.prototype, oB = pi[pI], Ri = CA(oB), EB = ArrayBuffer, ki = EB.prototype;
BI(ki, "byteLength");
const Pe = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : null;
Pe && BI(Pe.prototype, "byteLength");
const aB = Fe(Uint8Array);
aB.from;
const EA = aB.prototype;
EA[pI];
CA(EA.keys);
CA(
  EA.values
);
CA(
  EA.entries
);
CA(EA.set);
CA(
  EA.reverse
);
CA(EA.fill);
CA(
  EA.copyWithin
);
CA(EA.sort);
CA(EA.slice);
CA(
  EA.subarray
);
BI(
  EA,
  "buffer"
);
BI(
  EA,
  "byteOffset"
);
BI(
  EA,
  "length"
);
BI(
  EA,
  Si
);
const Li = Uint8Array, sB = Uint16Array, pe = Uint32Array, Ui = Float32Array, uI = Fe([][pI]()), nB = CA(uI.next), Yi = CA(function* () {
}().next), mi = Fe(uI), Mi = DataView.prototype, Ki = CA(
  Mi.getUint16
), Re = WeakMap, cB = Re.prototype, hB = CA(cB.get), bi = CA(cB.set), lB = new Re(), Ji = Ne(null, {
  next: {
    value: function() {
      const I = hB(lB, this);
      return nB(I);
    }
  },
  [pI]: {
    value: function() {
      return this;
    }
  }
});
function Hi(g) {
  if (g[pI] === oB && uI.next === nB)
    return g;
  const I = Ne(Ji);
  return bi(lB, I, Ri(g)), I;
}
const qi = new Re(), xi = Ne(mi, {
  next: {
    value: function() {
      const I = hB(qi, this);
      return Yi(I);
    },
    writable: !0,
    configurable: !0
  }
});
for (const g of di(uI))
  g !== "next" && Fi(xi, g, QB(uI, g));
const fB = new EB(4), Oi = new Ui(fB), Ti = new pe(fB), lA = new sB(512), fA = new Li(512);
for (let g = 0; g < 256; ++g) {
  const I = g - 127;
  I < -24 ? (lA[g] = 0, lA[g | 256] = 32768, fA[g] = 24, fA[g | 256] = 24) : I < -14 ? (lA[g] = 1024 >> -I - 14, lA[g | 256] = 1024 >> -I - 14 | 32768, fA[g] = -I - 1, fA[g | 256] = -I - 1) : I <= 15 ? (lA[g] = I + 15 << 10, lA[g | 256] = I + 15 << 10 | 32768, fA[g] = 13, fA[g | 256] = 13) : I < 128 ? (lA[g] = 31744, lA[g | 256] = 64512, fA[g] = 24, fA[g | 256] = 24) : (lA[g] = 31744, lA[g | 256] = 64512, fA[g] = 13, fA[g | 256] = 13);
}
const ke = new pe(2048);
for (let g = 1; g < 1024; ++g) {
  let I = g << 13, A = 0;
  for (; !(I & 8388608); )
    I <<= 1, A -= 8388608;
  I &= -8388609, A += 947912704, ke[g] = I | A;
}
for (let g = 1024; g < 2048; ++g)
  ke[g] = 939524096 + (g - 1024 << 13);
const iI = new pe(64);
for (let g = 1; g < 31; ++g)
  iI[g] = g << 23;
iI[31] = 1199570944;
iI[32] = 2147483648;
for (let g = 33; g < 63; ++g)
  iI[g] = 2147483648 + (g - 32 << 23);
iI[63] = 3347054592;
const yB = new sB(64);
for (let g = 1; g < 64; ++g)
  g !== 32 && (yB[g] = 1024);
function vi(g) {
  const I = g >> 10;
  return Ti[0] = ke[yB[I] + (g & 1023)] + iI[I], Oi[0];
}
function DB(g, I, ...A) {
  return vi(
    Ki(g, I, ...Hi(A))
  );
}
function ug(g, I, A) {
  const e = typeof g == "object" ? g.outer : g, t = e.slice(0, e.indexOf(">") + 1), B = ['"', "'"];
  for (let C = 0; C < B.length; C++) {
    const i = B[C], o = I + "\\=" + i + "([^" + i + "]*)" + i, Q = new RegExp(o).exec(t);
    if (Q) return Q[1];
  }
}
function Pi(g, I, A) {
  const t = new RegExp(I).exec(g.slice(A));
  return t ? A + t.index : -1;
}
function dg(g, I, A) {
  const t = new RegExp(I).exec(g.slice(A));
  return t ? A + t.index + t[0].length - 1 : -1;
}
function je(g, I) {
  const A = new RegExp(I, "g"), e = g.match(A);
  return e ? e.length : 0;
}
function ji(g, I, A) {
  const e = A && A.debug || !1, t = !(A && typeof A.nested === !1), B = A && A.startIndex || 0;
  e && console.log("[xml-utils] starting findTagByName with", I, " and ", A);
  const C = Pi(g, `<${I}[ 
>/]`, B);
  if (e && console.log("[xml-utils] start:", C), C === -1) return;
  const i = g.slice(C + I.length);
  let o = dg(i, "^[^<]*[ /]>", 0);
  const r = o !== -1 && i[o - 1] === "/";
  if (e && console.log("[xml-utils] selfClosing:", r), r === !1)
    if (t) {
      let a = 0, n = 1, h = 0;
      for (; (o = dg(i, "[ /]" + I + ">", a)) !== -1; ) {
        const c = i.substring(a, o + 1);
        if (n += je(c, "<" + I + `[ 
	>]`), h += je(c, "</" + I + ">"), h >= n) break;
        a = o;
      }
    } else
      o = dg(i, "[ /]" + I + ">", 0);
  const Q = C + I.length + o + 1;
  if (e && console.log("[xml-utils] end:", Q), Q === -1) return;
  const s = g.slice(C, Q);
  let E;
  return r ? E = null : E = s.slice(s.indexOf(">") + 1, s.lastIndexOf("<")), { inner: E, outer: s, start: C, end: Q };
}
function Zi(g, I, A) {
  const e = [];
  let B = 0, C;
  for (; C = ji(g, I, { debug: !1, startIndex: B }); )
    B = C.start + 1 + I.length, e.push(C);
  return e;
}
const u = {
  BYTE: 1,
  ASCII: 2,
  SHORT: 3,
  LONG: 4,
  RATIONAL: 5,
  SBYTE: 6,
  UNDEFINED: 7,
  SSHORT: 8,
  SLONG: 9,
  SRATIONAL: 10,
  FLOAT: 11,
  DOUBLE: 12,
  // IFD offset, suggested by https://owl.phy.queensu.ca/~phil/exiftool/standards.html
  IFD: 13,
  // introduced by BigTIFF
  LONG8: 16,
  SLONG8: 17,
  IFD8: 18
}, Wi = {
  [u.BYTE]: 1,
  [u.ASCII]: 1,
  [u.SBYTE]: 1,
  [u.UNDEFINED]: 1,
  [u.SHORT]: 2,
  [u.SSHORT]: 2,
  [u.LONG]: 4,
  [u.SLONG]: 4,
  [u.FLOAT]: 4,
  [u.IFD]: 4,
  [u.RATIONAL]: 8,
  [u.SRATIONAL]: 8,
  [u.DOUBLE]: 8,
  [u.LONG8]: 8,
  [u.SLONG8]: 8,
  [u.IFD8]: 8
};
function dI(g) {
  const I = Wi[g];
  if (I === void 0)
    throw new RangeError(`Invalid field type: ${g}`);
  return I;
}
const Vi = [
  { tag: 254, name: "NewSubfileType", fieldTypes: u.LONG },
  { tag: 255, name: "SubfileType", type: u.SHORT },
  { tag: 256, name: "ImageWidth", type: u.SHORT },
  { tag: 257, name: "ImageLength", type: u.SHORT },
  {
    tag: 258,
    name: "BitsPerSample",
    type: u.SHORT,
    isArray: !0,
    eager: !0
  },
  { tag: 259, name: "Compression", type: u.SHORT },
  { tag: 262, name: "PhotometricInterpretation", type: u.SHORT },
  { tag: 263, name: "Threshholding", type: u.SHORT },
  { tag: 264, name: "CellWidth", type: u.SHORT },
  { tag: 265, name: "CellLength", type: u.SHORT },
  { tag: 266, name: "FillOrder", type: u.SHORT },
  { tag: 269, name: "DocumentName", type: u.ASCII },
  { tag: 270, name: "ImageDescription", type: u.ASCII },
  { tag: 271, name: "Make", type: u.ASCII },
  { tag: 272, name: "Model", type: u.ASCII },
  { tag: 273, name: "StripOffsets", type: u.SHORT, isArray: !0 },
  { tag: 274, name: "Orientation", type: u.SHORT },
  { tag: 277, name: "SamplesPerPixel", type: u.SHORT },
  { tag: 278, name: "RowsPerStrip", type: u.SHORT },
  { tag: 279, name: "StripByteCounts", type: u.LONG, isArray: !0 },
  { tag: 280, name: "MinSampleValue", type: u.SHORT, isArray: !0 },
  { tag: 281, name: "MaxSampleValue", type: u.SHORT, isArray: !0 },
  { tag: 282, name: "XResolution", type: u.RATIONAL },
  { tag: 283, name: "YResolution", type: u.RATIONAL },
  { tag: 284, name: "PlanarConfiguration", fieldTypes: u.SHORT },
  { tag: 285, name: "PageName", type: u.ASCII },
  { tag: 286, name: "XPosition", type: u.RATIONAL },
  { tag: 287, name: "YPosition", type: u.RATIONAL },
  { tag: 288, name: "FreeOffsets", type: u.LONG },
  { tag: 289, name: "FreeByteCounts", type: u.LONG },
  { tag: 290, name: "GrayResponseUnit", type: u.SHORT },
  {
    tag: 291,
    name: "GrayResponseCurve",
    type: u.SHORT,
    isArray: !0
  },
  { tag: 292, name: "T4Options", type: u.LONG },
  { tag: 293, name: "T6Options", type: u.LONG },
  { tag: 296, name: "ResolutionUnit", type: u.SHORT },
  { tag: 297, name: "PageNumber", type: u.SHORT, isArray: !0 },
  { tag: 301, name: "TransferFunction", type: u.SHORT, isArray: !0 },
  { tag: 305, name: "Software", type: u.ASCII },
  { tag: 306, name: "DateTime", type: u.ASCII },
  { tag: 315, name: "Artist", type: u.ASCII },
  { tag: 316, name: "HostComputer", type: u.ASCII },
  { tag: 317, name: "Predictor", type: u.SHORT },
  { tag: 318, name: "WhitePoint", type: u.RATIONAL, isArray: !0 },
  {
    tag: 319,
    name: "PrimaryChromaticities",
    type: u.RATIONAL,
    isArray: !0
  },
  { tag: 320, name: "ColorMap", type: u.SHORT, isArray: !0 },
  { tag: 321, name: "HalftoneHints", type: u.SHORT, isArray: !0 },
  { tag: 322, name: "TileWidth", type: u.SHORT },
  { tag: 323, name: "TileLength", type: u.SHORT },
  { tag: 324, name: "TileOffsets", type: u.LONG, isArray: !0 },
  { tag: 325, name: "TileByteCounts", type: u.SHORT, isArray: !0 },
  { tag: 332, name: "InkSet", type: u.SHORT },
  { tag: 333, name: "InkNames", type: u.ASCII },
  { tag: 334, name: "NumberOfInks", type: u.SHORT },
  { tag: 336, name: "DotRange", type: u.BYTE, isArray: !0 },
  { tag: 337, name: "TargetPrinter", type: u.ASCII },
  { tag: 338, name: "ExtraSamples", type: u.BYTE, isArray: !0 },
  {
    tag: 339,
    name: "SampleFormat",
    type: u.SHORT,
    isArray: !0,
    eager: !0
  },
  { tag: 340, name: "SMinSampleValue", type: u.Any, isArray: !0 },
  { tag: 341, name: "SMaxSampleValue", type: u.Any, isArray: !0 },
  { tag: 342, name: "TransferRange", type: u.SHORT, isArray: !0 },
  { tag: 512, name: "JPEGProc", type: u.SHORT },
  { tag: 513, name: "JPEGInterchangeFormat", type: u.LONG },
  { tag: 514, name: "JPEGInterchangeFormatLngth", type: u.LONG },
  { tag: 515, name: "JPEGRestartInterval", type: u.SHORT },
  {
    tag: 517,
    name: "JPEGLosslessPredictors",
    type: u.SHORT,
    isArray: !0
  },
  {
    tag: 518,
    name: "JPEGPointTransforms",
    type: u.SHORT,
    isArray: !0
  },
  { tag: 519, name: "JPEGQTables", type: u.LONG, isArray: !0 },
  { tag: 520, name: "JPEGDCTables", type: u.LONG, isArray: !0 },
  { tag: 521, name: "JPEGACTables", type: u.LONG, isArray: !0 },
  {
    tag: 529,
    name: "YCbCrCoefficients",
    type: u.RATIONAL,
    isArray: !0
  },
  { tag: 530, name: "YCbCrSubSampling", type: u.SHORT, isArray: !0 },
  { tag: 531, name: "YCbCrPositioning", type: u.SHORT },
  {
    tag: 532,
    name: "ReferenceBlackWhite",
    type: u.LONG,
    isArray: !0
  },
  { tag: 33432, name: "Copyright", type: u.ASCII },
  // TIFF Extended
  { tag: 326, name: "BadFaxLines" },
  { tag: 327, name: "CleanFaxData" },
  { tag: 343, name: "ClipPath" },
  { tag: 328, name: "ConsecutiveBadFaxLines" },
  { tag: 433, name: "Decode" },
  { tag: 434, name: "DefaultImageColor" },
  { tag: 346, name: "Indexed" },
  { tag: 347, name: "JPEGTables", isArray: !0, eager: !0 },
  { tag: 559, name: "StripRowCounts", isArray: !0 },
  { tag: 330, name: "SubIFDs", isArray: !0 },
  { tag: 344, name: "XClipPathUnits" },
  { tag: 345, name: "YClipPathUnits" },
  // EXIF
  { tag: 37378, name: "ApertureValue" },
  { tag: 40961, name: "ColorSpace" },
  { tag: 36868, name: "DateTimeDigitized" },
  { tag: 36867, name: "DateTimeOriginal" },
  { tag: 34665, name: "Exif IFD", type: u.LONG },
  { tag: 36864, name: "ExifVersion" },
  { tag: 33434, name: "ExposureTime" },
  { tag: 41728, name: "FileSource" },
  { tag: 37385, name: "Flash" },
  { tag: 40960, name: "FlashpixVersion" },
  { tag: 33437, name: "FNumber" },
  { tag: 42016, name: "ImageUniqueID" },
  { tag: 37384, name: "LightSource" },
  { tag: 37500, name: "MakerNote" },
  { tag: 37377, name: "ShutterSpeedValue" },
  { tag: 37510, name: "UserComment" },
  // IPTC
  { tag: 33723, name: "IPTC" },
  // Laser Scanning Microscopy
  { tag: 34412, name: "CZ_LSMINFO" },
  // ICC
  { tag: 34675, name: "ICC Profile" },
  // XMP
  { tag: 700, name: "XMP" },
  // GDAL
  { tag: 42112, name: "GDAL_METADATA" },
  { tag: 42113, name: "GDAL_NODATA", type: u.ASCII },
  // Photoshop
  { tag: 34377, name: "Photoshop" },
  // GeoTiff
  {
    tag: 33550,
    name: "ModelPixelScale",
    type: u.DOUBLE,
    isArray: !0,
    eager: !0
  },
  {
    tag: 33922,
    name: "ModelTiepoint",
    type: u.DOUBLE,
    isArray: !0,
    eager: !0
  },
  {
    tag: 34264,
    name: "ModelTransformation",
    type: u.DOUBLE,
    isArray: !0,
    eager: !0
  },
  {
    tag: 34735,
    name: "GeoKeyDirectory",
    type: u.SHORT,
    isArray: !0,
    eager: !0
  },
  {
    tag: 34736,
    name: "GeoDoubleParams",
    type: u.DOUBLE,
    isArray: !0,
    eager: !0
  },
  { tag: 34737, name: "GeoAsciiParams", type: u.ASCII, eager: !0 },
  // LERC
  { tag: 50674, name: "LercParameters", eager: !0 }
], Le = {}, SI = {};
function _i(g, I, A = void 0, e = !1, t = !1) {
  Le[I] = g, SI[g] = { tag: g, name: I, type: typeof A == "string" ? u[A] : A, isArray: e, eager: t };
}
for (const g of Vi)
  _i(g.tag, g.name, g.type, g.isArray, g.eager);
function YI(g) {
  return typeof g == "number" ? g : Le[g];
}
const IA = {
  WhiteIsZero: 0,
  BlackIsZero: 1,
  RGB: 2,
  Palette: 3,
  TransparencyMask: 4,
  CMYK: 5,
  YCbCr: 6,
  CIELab: 8
}, zi = {
  Unspecified: 0
}, Xi = {
  AddCompression: 1
}, Sg = {
  None: 0,
  Deflate: 1,
  Zstandard: 2
}, Ig = {
  1024: "GTModelTypeGeoKey",
  1025: "GTRasterTypeGeoKey",
  1026: "GTCitationGeoKey",
  2048: "GeographicTypeGeoKey",
  2049: "GeogCitationGeoKey",
  2050: "GeogGeodeticDatumGeoKey",
  2051: "GeogPrimeMeridianGeoKey",
  2052: "GeogLinearUnitsGeoKey",
  2053: "GeogLinearUnitSizeGeoKey",
  2054: "GeogAngularUnitsGeoKey",
  2055: "GeogAngularUnitSizeGeoKey",
  2056: "GeogEllipsoidGeoKey",
  2057: "GeogSemiMajorAxisGeoKey",
  2058: "GeogSemiMinorAxisGeoKey",
  2059: "GeogInvFlatteningGeoKey",
  2060: "GeogAzimuthUnitsGeoKey",
  2061: "GeogPrimeMeridianLongGeoKey",
  2062: "GeogTOWGS84GeoKey",
  3072: "ProjectedCSTypeGeoKey",
  3073: "PCSCitationGeoKey",
  3074: "ProjectionGeoKey",
  3075: "ProjCoordTransGeoKey",
  3076: "ProjLinearUnitsGeoKey",
  3077: "ProjLinearUnitSizeGeoKey",
  3078: "ProjStdParallel1GeoKey",
  3079: "ProjStdParallel2GeoKey",
  3080: "ProjNatOriginLongGeoKey",
  3081: "ProjNatOriginLatGeoKey",
  3082: "ProjFalseEastingGeoKey",
  3083: "ProjFalseNorthingGeoKey",
  3084: "ProjFalseOriginLongGeoKey",
  3085: "ProjFalseOriginLatGeoKey",
  3086: "ProjFalseOriginEastingGeoKey",
  3087: "ProjFalseOriginNorthingGeoKey",
  3088: "ProjCenterLongGeoKey",
  3089: "ProjCenterLatGeoKey",
  3090: "ProjCenterEastingGeoKey",
  3091: "ProjCenterNorthingGeoKey",
  3092: "ProjScaleAtNatOriginGeoKey",
  3093: "ProjScaleAtCenterGeoKey",
  3094: "ProjAzimuthAngleGeoKey",
  3095: "ProjStraightVertPoleLongGeoKey",
  3096: "ProjRectifiedGridAngleGeoKey",
  4096: "VerticalCSTypeGeoKey",
  4097: "VerticalCitationGeoKey",
  4098: "VerticalDatumGeoKey",
  4099: "VerticalUnitsGeoKey"
};
for (const g in Ig)
  Ig.hasOwnProperty(g);
function $i(g, I) {
  const { width: A, height: e } = g, t = new Uint8Array(A * e * 3);
  let B;
  for (let C = 0, i = 0; C < g.length; ++C, i += 3)
    B = 256 - g[C] / I * 256, t[i] = B, t[i + 1] = B, t[i + 2] = B;
  return t;
}
function AC(g, I) {
  const { width: A, height: e } = g, t = new Uint8Array(A * e * 3);
  let B;
  for (let C = 0, i = 0; C < g.length; ++C, i += 3)
    B = g[C] / I * 256, t[i] = B, t[i + 1] = B, t[i + 2] = B;
  return t;
}
function IC(g, I) {
  const { width: A, height: e } = g, t = new Uint8Array(A * e * 3), B = I.length / 3, C = I.length / 3 * 2;
  for (let i = 0, o = 0; i < g.length; ++i, o += 3) {
    const r = g[i];
    t[o] = I[r] / 65536 * 256, t[o + 1] = I[r + B] / 65536 * 256, t[o + 2] = I[r + C] / 65536 * 256;
  }
  return t;
}
function gC(g) {
  const { width: I, height: A } = g, e = new Uint8Array(I * A * 3);
  for (let t = 0, B = 0; t < g.length; t += 4, B += 3) {
    const C = g[t], i = g[t + 1], o = g[t + 2], r = g[t + 3];
    e[B] = 255 * ((255 - C) / 256) * ((255 - r) / 256), e[B + 1] = 255 * ((255 - i) / 256) * ((255 - r) / 256), e[B + 2] = 255 * ((255 - o) / 256) * ((255 - r) / 256);
  }
  return e;
}
function eC(g) {
  const { width: I, height: A } = g, e = new Uint8ClampedArray(I * A * 3);
  for (let t = 0, B = 0; t < g.length; t += 3, B += 3) {
    const C = g[t], i = g[t + 1], o = g[t + 2];
    e[B] = C + 1.402 * (o - 128), e[B + 1] = C - 0.34414 * (i - 128) - 0.71414 * (o - 128), e[B + 2] = C + 1.772 * (i - 128);
  }
  return e;
}
const tC = 0.95047, BC = 1, iC = 1.08883;
function CC(g) {
  const { width: I, height: A } = g, e = new Uint8Array(I * A * 3);
  for (let t = 0, B = 0; t < g.length; t += 3, B += 3) {
    const C = g[t + 0], i = g[t + 1] << 24 >> 24, o = g[t + 2] << 24 >> 24;
    let r = (C + 16) / 116, Q = i / 500 + r, s = r - o / 200, E, a, n;
    Q = tC * (Q * Q * Q > 8856e-6 ? Q * Q * Q : (Q - 16 / 116) / 7.787), r = BC * (r * r * r > 8856e-6 ? r * r * r : (r - 16 / 116) / 7.787), s = iC * (s * s * s > 8856e-6 ? s * s * s : (s - 16 / 116) / 7.787), E = Q * 3.2406 + r * -1.5372 + s * -0.4986, a = Q * -0.9689 + r * 1.8758 + s * 0.0415, n = Q * 0.0557 + r * -0.204 + s * 1.057, E = E > 31308e-7 ? 1.055 * E ** (1 / 2.4) - 0.055 : 12.92 * E, a = a > 31308e-7 ? 1.055 * a ** (1 / 2.4) - 0.055 : 12.92 * a, n = n > 31308e-7 ? 1.055 * n ** (1 / 2.4) - 0.055 : 12.92 * n, e[B] = Math.max(0, Math.min(1, E)) * 255, e[B + 1] = Math.max(0, Math.min(1, a)) * 255, e[B + 2] = Math.max(0, Math.min(1, n)) * 255;
  }
  return e;
}
const qA = /* @__PURE__ */ new Map();
async function WI(g) {
  const I = !g.hasTag("StripOffsets");
  return {
    tileWidth: I ? await g.loadValue("TileWidth") : await g.loadValue("ImageWidth"),
    tileHeight: I ? await g.loadValue("TileLength") : await g.loadValue("RowsPerStrip") || await g.loadValue("ImageLength"),
    planarConfiguration: await g.loadValue("PlanarConfiguration"),
    bitsPerSample: await g.loadValue("BitsPerSample"),
    predictor: await g.loadValue("Predictor") || 1
  };
}
function rC(g, I, A = WI, e = !0) {
  Array.isArray(g) || (g = [g]), g.forEach((t) => {
    qA.set(t, { importFn: I, decoderParameterFn: A, preferWorker: e });
  });
}
async function QC(g, I) {
  if (!qA.has(g))
    throw new Error(`Unknown compression method identifier: ${g}`);
  const { decoderParameterFn: A } = qA.get(g);
  return A(I);
}
async function wB(g, I) {
  if (!qA.has(g))
    throw new Error(`Unknown compression method identifier: ${g}`);
  const { importFn: A } = qA.get(g), e = await A();
  return new e(I);
}
function oC(g) {
  if (!qA.has(g))
    throw new Error(`Unknown compression method identifier: ${g}`);
  return qA.get(g).preferWorker;
}
const EC = [
  // No compression
  {
    cases: [void 0, 1],
    importFn: () => Promise.resolve().then(() => DE).then((g) => g.default),
    preferWorker: !1
  },
  // LZW
  {
    cases: 5,
    importFn: () => Promise.resolve().then(() => GE).then((g) => g.default)
  },
  // Old-style JPEG
  {
    cases: 6,
    importFn: () => {
      throw new Error("old style JPEG compression is not supported.");
    }
  },
  // JPEG
  {
    cases: 7,
    importFn: () => Promise.resolve().then(() => kE).then((g) => g.default),
    decoderParameterFn: async (g) => ({
      ...await WI(g),
      JPEGTables: await g.loadValue("JPEGTables")
    })
  },
  // Deflate / Adobe Deflate
  {
    cases: [8, 32946],
    importFn: () => Promise.resolve().then(() => Pa).then((g) => g.default)
  },
  // PackBits
  {
    cases: 32773,
    importFn: () => Promise.resolve().then(() => Za).then((g) => g.default)
  },
  // LERC
  {
    cases: 34887,
    importFn: () => Promise.resolve().then(() => $a).then(async (g) => (await g.zstd.init(), g)).then((g) => g.default),
    decoderParameterFn: async (g) => ({
      ...await WI(g),
      LercParameters: await g.loadValue("LercParameters")
    })
  },
  // zstd
  {
    cases: 5e4,
    importFn: () => Promise.resolve().then(() => gs).then(async (g) => (await g.zstd.init(), g)).then((g) => g.default)
  },
  // WebP Images
  {
    cases: 50001,
    importFn: () => Promise.resolve().then(() => ts).then((g) => g.default),
    decoderParameterFn: async (g) => ({
      ...await WI(g),
      samplesPerPixel: await g.loadValue("SamplesPerPixel") || 4
    }),
    preferWorker: !1
  }
];
for (const g of EC) {
  const { cases: I, importFn: A, decoderParameterFn: e, preferWorker: t } = g;
  rC(I, A, e, t);
}
function og(g, I, A, e = 1) {
  return new (Object.getPrototypeOf(g)).constructor(I * A * e);
}
function aC(g, I, A, e, t) {
  const B = I / e, C = A / t;
  return g.map((i) => {
    const o = og(i, e, t);
    for (let r = 0; r < t; ++r) {
      const Q = Math.min(Math.round(C * r), A - 1);
      for (let s = 0; s < e; ++s) {
        const E = Math.min(Math.round(B * s), I - 1), a = i[Q * I + E];
        o[r * e + s] = a;
      }
    }
    return o;
  });
}
function XA(g, I, A) {
  return (1 - A) * g + A * I;
}
function sC(g, I, A, e, t) {
  const B = I / e, C = A / t;
  return g.map((i) => {
    const o = og(i, e, t);
    for (let r = 0; r < t; ++r) {
      const Q = C * r, s = Math.floor(Q), E = Math.min(Math.ceil(Q), A - 1);
      for (let a = 0; a < e; ++a) {
        const n = B * a, h = n % 1, c = Math.floor(n), D = Math.min(Math.ceil(n), I - 1), y = i[s * I + c], d = i[s * I + D], l = i[E * I + c], w = i[E * I + D], S = XA(
          XA(y, d, h),
          XA(l, w, h),
          Q % 1
        );
        o[r * e + a] = S;
      }
    }
    return o;
  });
}
function nC(g, I, A, e, t, B = "nearest") {
  switch (B.toLowerCase()) {
    case "nearest":
      return aC(g, I, A, e, t);
    case "bilinear":
    case "linear":
      return sC(g, I, A, e, t);
    default:
      throw new Error(`Unsupported resampling method: '${B}'`);
  }
}
function cC(g, I, A, e, t, B) {
  const C = I / e, i = A / t, o = og(g, e, t, B);
  for (let r = 0; r < t; ++r) {
    const Q = Math.min(Math.round(i * r), A - 1);
    for (let s = 0; s < e; ++s) {
      const E = Math.min(Math.round(C * s), I - 1);
      for (let a = 0; a < B; ++a) {
        const n = g[Q * I * B + E * B + a];
        o[r * e * B + s * B + a] = n;
      }
    }
  }
  return o;
}
function hC(g, I, A, e, t, B) {
  const C = I / e, i = A / t, o = og(g, e, t, B);
  for (let r = 0; r < t; ++r) {
    const Q = i * r, s = Math.floor(Q), E = Math.min(Math.ceil(Q), A - 1);
    for (let a = 0; a < e; ++a) {
      const n = C * a, h = n % 1, c = Math.floor(n), D = Math.min(Math.ceil(n), I - 1);
      for (let y = 0; y < B; ++y) {
        const d = g[s * I * B + c * B + y], l = g[s * I * B + D * B + y], w = g[E * I * B + c * B + y], S = g[E * I * B + D * B + y], G = XA(
          XA(d, l, h),
          XA(w, S, h),
          Q % 1
        );
        o[r * e * B + a * B + y] = G;
      }
    }
  }
  return o;
}
function lC(g, I, A, e, t, B, C = "nearest") {
  switch (C.toLowerCase()) {
    case "nearest":
      return cC(
        g,
        I,
        A,
        e,
        t,
        B
      );
    case "bilinear":
    case "linear":
      return hC(
        g,
        I,
        A,
        e,
        t,
        B
      );
    default:
      throw new Error(`Unsupported resampling method: '${C}'`);
  }
}
function fC(g, I, A) {
  let e = 0;
  for (let t = I; t < A; ++t)
    e += g[t];
  return e;
}
function ie(g, I, A) {
  switch (g) {
    case 1:
      if (I <= 8)
        return new Uint8Array(A);
      if (I <= 16)
        return new Uint16Array(A);
      if (I <= 32)
        return new Uint32Array(A);
      break;
    case 2:
      if (I === 8)
        return new Int8Array(A);
      if (I === 16)
        return new Int16Array(A);
      if (I === 32)
        return new Int32Array(A);
      break;
    case 3:
      switch (I) {
        case 16:
        case 32:
          return new Float32Array(A);
        case 64:
          return new Float64Array(A);
      }
      break;
  }
  throw Error("Unsupported data format/bitsPerSample");
}
function yC(g, I) {
  return (g === 1 || g === 2) && I <= 32 && I % 8 === 0 ? !1 : !(g === 3 && (I === 16 || I === 32 || I === 64));
}
function DC(g, I, A, e, t, B, C) {
  const i = new DataView(g), o = A === 2 ? C * B : C * B * e, r = A === 2 ? 1 : e, Q = ie(I, t, o), s = parseInt("1".repeat(t), 2);
  if (I === 1) {
    let E;
    A === 1 ? E = e * t : E = t;
    let a = B * E;
    a & 7 && (a = a + 7 & -8);
    for (let n = 0; n < C; ++n) {
      const h = n * a;
      for (let c = 0; c < B; ++c) {
        const D = h + c * r * t;
        for (let y = 0; y < r; ++y) {
          const d = D + y * t, l = (n * B + c) * r + y, w = Math.floor(d / 8), S = d % 8;
          if (S + t <= 8)
            Q[l] = i.getUint8(w) >> 8 - t - S & s;
          else if (S + t <= 16)
            Q[l] = i.getUint16(w) >> 16 - t - S & s;
          else if (S + t <= 24) {
            const G = i.getUint16(w) << 8 | i.getUint8(w + 2);
            Q[l] = G >> 24 - t - S & s;
          } else
            Q[l] = i.getUint32(w) >> 32 - t - S & s;
        }
      }
    }
  }
  return Q.buffer;
}
class wC {
  /**
   * @constructor
   * @param {import("./imagefiledirectory.js").ImageFileDirectory} fileDirectory The parsed file directory
   * @param {DataView} dataView The DataView for the underlying file.
   * @param {Boolean} littleEndian Whether the file is encoded in little or big endian
   * @param {Boolean} cache Whether or not decoded tiles shall be cached
   * @param {import('./source/basesource').BaseSource} source The datasource to read from
   */
  constructor(I, A, e, t, B) {
    this.fileDirectory = I, this.dataView = A, this.littleEndian = e, this.tiles = t ? {} : null, this.isTiled = !I.hasTag("StripOffsets");
    const C = I.getValue("PlanarConfiguration");
    if (this.planarConfiguration = typeof C > "u" ? 1 : C, this.planarConfiguration !== 1 && this.planarConfiguration !== 2)
      throw new Error("Invalid planar configuration.");
    this.source = B;
  }
  /**
   * Returns the associated parsed file directory.
   * @returns {import("./imagefiledirectory.js").ImageFileDirectory} the parsed file directory
   */
  getFileDirectory() {
    return this.fileDirectory;
  }
  /**
   * Returns the associated parsed geo keys.
   * @returns {Object} the parsed geo keys
   */
  getGeoKeys() {
    return this.fileDirectory.parseGeoKeyDirectory();
  }
  /**
   * Returns the width of the image.
   * @returns {Number} the width of the image
   */
  getWidth() {
    return this.fileDirectory.getValue("ImageWidth");
  }
  /**
   * Returns the height of the image.
   * @returns {Number} the height of the image
   */
  getHeight() {
    return this.fileDirectory.getValue("ImageLength");
  }
  /**
   * Returns the number of samples per pixel.
   * @returns {Number} the number of samples per pixel
   */
  getSamplesPerPixel() {
    return this.fileDirectory.hasTag("SamplesPerPixel") ? this.fileDirectory.getValue("SamplesPerPixel") : 1;
  }
  /**
   * Returns the width of each tile.
   * @returns {Number} the width of each tile
   */
  getTileWidth() {
    return this.isTiled ? this.fileDirectory.getValue("TileWidth") : this.getWidth();
  }
  /**
   * Returns the height of each tile.
   * @returns {Number} the height of each tile
   */
  getTileHeight() {
    return this.isTiled ? this.fileDirectory.getValue("TileLength") : this.fileDirectory.hasTag("RowsPerStrip") ? Math.min(this.fileDirectory.getValue("RowsPerStrip"), this.getHeight()) : this.getHeight();
  }
  getBlockWidth() {
    return this.getTileWidth();
  }
  getBlockHeight(I) {
    return this.isTiled || (I + 1) * this.getTileHeight() <= this.getHeight() ? this.getTileHeight() : this.getHeight() - I * this.getTileHeight();
  }
  /**
   * Calculates the number of bytes for each pixel across all samples. Only full
   * bytes are supported, an exception is thrown when this is not the case.
   * @returns {Number} the bytes per pixel
   */
  getBytesPerPixel() {
    let I = 0;
    for (let A = 0; A < this.fileDirectory.getValue("BitsPerSample").length; ++A)
      I += this.getSampleByteSize(A);
    return I;
  }
  getSampleByteSize(I) {
    const A = this.fileDirectory.getValue("BitsPerSample");
    if (I >= A.length)
      throw new RangeError(`Sample index ${I} is out of range.`);
    return Math.ceil(A[I] / 8);
  }
  getReaderForSample(I) {
    const A = this.fileDirectory.hasTag("SampleFormat") ? this.fileDirectory.getValue("SampleFormat")[I] : 1, e = this.fileDirectory.getValue("BitsPerSample")[I];
    switch (A) {
      case 1:
        if (e <= 8)
          return DataView.prototype.getUint8;
        if (e <= 16)
          return DataView.prototype.getUint16;
        if (e <= 32)
          return DataView.prototype.getUint32;
        break;
      case 2:
        if (e <= 8)
          return DataView.prototype.getInt8;
        if (e <= 16)
          return DataView.prototype.getInt16;
        if (e <= 32)
          return DataView.prototype.getInt32;
        break;
      case 3:
        switch (e) {
          case 16:
            return function(t, B) {
              return DB(this, t, B);
            };
          case 32:
            return DataView.prototype.getFloat32;
          case 64:
            return DataView.prototype.getFloat64;
        }
        break;
    }
    throw Error("Unsupported data format/bitsPerSample");
  }
  getSampleFormat(I = 0) {
    return this.fileDirectory.hasTag("SampleFormat") ? this.fileDirectory.getValue("SampleFormat")[I] : 1;
  }
  getBitsPerSample(I = 0) {
    return this.fileDirectory.getValue("BitsPerSample")[I];
  }
  getArrayForSample(I, A) {
    const e = this.getSampleFormat(I), t = this.getBitsPerSample(I);
    return ie(e, t, A);
  }
  /**
   * Returns the decoded strip or tile.
   * @param {Number} x the strip or tile x-offset
   * @param {Number} y the tile y-offset (0 for stripped images)
   * @param {Number} sample the sample to get for separated samples
   * @param {import("./geotiff").Pool|import("./geotiff").BaseDecoder} poolOrDecoder the decoder or decoder pool
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise.<{x: number, y: number, sample: number, data: ArrayBuffer}>} the decoded strip or tile
   */
  async getTileOrStrip(I, A, e, t, B) {
    const C = Math.ceil(this.getWidth() / this.getTileWidth()), i = Math.ceil(this.getHeight() / this.getTileHeight());
    let o;
    const { tiles: r } = this;
    this.planarConfiguration === 1 ? o = A * C + I : this.planarConfiguration === 2 && (o = e * C * i + A * C + I);
    let Q, s;
    if (this.isTiled ? (Q = await this.fileDirectory.loadValueIndexed("TileOffsets", o), s = await this.fileDirectory.loadValueIndexed("TileByteCounts", o)) : (Q = await this.fileDirectory.loadValueIndexed("StripOffsets", o), s = await this.fileDirectory.loadValueIndexed("StripByteCounts", o)), s === 0) {
      const n = this.getBlockHeight(A) * this.getTileWidth(), h = this.planarConfiguration === 2 ? this.getSampleByteSize(e) : this.getBytesPerPixel(), c = new ArrayBuffer(n * h);
      return this.getArrayForSample(e, c).fill(this.getGDALNoData() || 0), { x: I, y: A, sample: e, data: c };
    }
    const E = (await this.source.fetch([{ offset: Q, length: s }], B))[0];
    let a;
    return r === null || !r[o] ? (a = (async () => {
      let n = await t.decode(E);
      const h = this.getSampleFormat(), c = this.getBitsPerSample();
      return yC(h, c) && (n = DC(
        n,
        h,
        this.planarConfiguration,
        this.getSamplesPerPixel(),
        c,
        this.getTileWidth(),
        this.getBlockHeight(A)
      )), n;
    })(), r !== null && (r[o] = a)) : a = r[o], { x: I, y: A, sample: e, data: await a };
  }
  /**
   * Internal read function.
   * @private
   * @param {Array} imageWindow The image window in pixel coordinates
   * @param {Array} samples The selected samples (0-based indices)
   * @param {TypedArray|TypedArray[]} valueArrays The array(s) to write into
   * @param {Boolean} interleave Whether or not to write in an interleaved manner
   * @param {import("./geotiff").Pool|AbstractDecoder} poolOrDecoder the decoder or decoder pool
   * @param {number} width the width of window to be read into
   * @param {number} height the height of window to be read into
   * @param {number} resampleMethod the resampling method to be used when interpolating
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise<ReadRasterResult>}
   */
  async _readRaster(I, A, e, t, B, C, i, o, r) {
    const Q = this.getTileWidth(), s = this.getTileHeight(), E = this.getWidth(), a = this.getHeight(), n = Math.max(Math.floor(I[0] / Q), 0), h = Math.min(
      Math.ceil(I[2] / Q),
      Math.ceil(E / Q)
    ), c = Math.max(Math.floor(I[1] / s), 0), D = Math.min(
      Math.ceil(I[3] / s),
      Math.ceil(a / s)
    ), y = I[2] - I[0];
    let d = this.getBytesPerPixel();
    const l = [], w = [];
    for (let f = 0; f < A.length; ++f)
      this.planarConfiguration === 1 ? l.push(fC(await this.fileDirectory.loadValue("BitsPerSample"), 0, A[f]) / 8) : l.push(0), w.push(this.getReaderForSample(A[f]));
    const S = [], { littleEndian: G } = this;
    for (let f = c; f < D; ++f)
      for (let F = n; F < h; ++F) {
        let N;
        this.planarConfiguration === 1 && (N = this.getTileOrStrip(F, f, 0, B, r));
        for (let p = 0; p < A.length; ++p) {
          const J = p, L = A[p];
          this.planarConfiguration === 2 && (d = this.getSampleByteSize(L), N = this.getTileOrStrip(F, f, L, B, r));
          const b = N.then((Y) => {
            const v = Y.data, BA = new DataView(v), rA = this.getBlockHeight(Y.y), QA = Y.y * s, R = Y.x * Q, K = QA + rA, H = (Y.x + 1) * Q, j = w[J], k = Math.min(rA, rA - (K - I[3]), a - QA), U = Math.min(Q, Q - (H - I[2]), E - R);
            for (let m = Math.max(0, I[1] - QA); m < k; ++m)
              for (let O = Math.max(0, I[0] - R); O < U; ++O) {
                const x = (m * Q + O) * d, P = j.call(
                  BA,
                  x + l[J],
                  G
                );
                let Z;
                t ? (Z = (m + QA - I[1]) * y * A.length + (O + R - I[0]) * A.length + J, e[Z] = P) : (Z = (m + QA - I[1]) * y + O + R - I[0], e[J][Z] = P);
              }
          });
          S.push(b);
        }
      }
    if (await Promise.all(S), C && I[2] - I[0] !== C || i && I[3] - I[1] !== i) {
      let f;
      return t ? f = lC(
        e,
        I[2] - I[0],
        I[3] - I[1],
        C,
        i,
        A.length,
        o
      ) : f = nC(
        e,
        I[2] - I[0],
        I[3] - I[1],
        C,
        i,
        o
      ), f.width = C, f.height = i, f;
    }
    return e.width = C || I[2] - I[0], e.height = i || I[3] - I[1], e;
  }
  /**
   * Reads raster data from the image. This function reads all selected samples
   * into separate arrays of the correct type for that sample or into a single
   * combined array when `interleave` is set. When provided, only a subset
   * of the raster is read for each sample.
   *
   * @param {ReadRasterOptions} [options={}] optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded arrays as a promise
   */
  async readRasters({
    window: I,
    samples: A = [],
    interleave: e,
    pool: t = null,
    width: B,
    height: C,
    resampleMethod: i,
    fillValue: o,
    signal: r
  } = {}) {
    const Q = I || [0, 0, this.getWidth(), this.getHeight()];
    if (Q[0] > Q[2] || Q[1] > Q[3])
      throw new Error("Invalid subsets");
    const s = Q[2] - Q[0], E = Q[3] - Q[1], a = s * E, n = this.getSamplesPerPixel();
    if (!A || !A.length)
      for (let l = 0; l < n; ++l)
        A.push(l);
    else
      for (let l = 0; l < A.length; ++l)
        if (A[l] >= n)
          return Promise.reject(new RangeError(`Invalid sample index '${A[l]}'.`));
    let h;
    if (e) {
      const l = this.fileDirectory.hasTag("SampleFormat") ? Math.max.apply(null, this.fileDirectory.getValue("SampleFormat")) : 1, w = Math.max.apply(null, this.fileDirectory.getValue("BitsPerSample"));
      h = ie(l, w, a * A.length), o && h.fill(o);
    } else {
      h = [];
      for (let l = 0; l < A.length; ++l) {
        const w = this.getArrayForSample(A[l], a);
        Array.isArray(o) && l < o.length ? w.fill(o[l]) : o && !Array.isArray(o) && w.fill(o), h.push(w);
      }
    }
    const c = this.fileDirectory.getValue("Compression") || 1, D = await QC(c, this.fileDirectory), y = t ? t.bindParameters(c, D) : await wB(c, D);
    return await this._readRaster(
      Q,
      A,
      h,
      e,
      y,
      B,
      C,
      i,
      r
    );
  }
  /**
   * Reads raster data from the image as RGB.
   * Colorspaces other than RGB will be transformed to RGB, color maps expanded.
   * When no other method is applicable, the first sample is used to produce a
   * grayscale image.
   * When provided, only a subset of the raster is read for each sample.
   *
   * @param {Object} [options] optional parameters
   * @param {Array<number>} [options.window] the subset to read data from in pixels.
   * @param {boolean} [options.interleave=true] whether the data shall be read
   *                                             in one single array or separate
   *                                             arrays.
   * @param {import("./geotiff").Pool} [options.pool=null] The optional decoder pool to use.
   * @param {number} [options.width] The desired width of the output. When the width is no the
   *                                 same as the images, resampling will be performed.
   * @param {number} [options.height] The desired height of the output. When the width is no the
   *                                  same as the images, resampling will be performed.
   * @param {string} [options.resampleMethod='nearest'] The desired resampling method.
   * @param {boolean} [options.enableAlpha=false] Enable reading alpha channel if present.
   * @param {AbortSignal} [options.signal] An AbortSignal that may be signalled if the request is
   *                                       to be aborted
   * @returns {Promise<ReadRasterResult>} the RGB array as a Promise
   */
  async readRGB({
    window: I,
    interleave: A = !0,
    pool: e = null,
    width: t,
    height: B,
    resampleMethod: C,
    enableAlpha: i = !1,
    signal: o
  } = {}) {
    const r = I || [0, 0, this.getWidth(), this.getHeight()];
    if (r[0] > r[2] || r[1] > r[3])
      throw new Error("Invalid subsets");
    const Q = this.fileDirectory.getValue("PhotometricInterpretation");
    if (Q === IA.RGB) {
      let D = [0, 1, 2];
      if (this.fileDirectory.getValue("ExtraSamples") !== zi.Unspecified && i) {
        D = [];
        for (let y = 0; y < this.fileDirectory.getValue("BitsPerSample").length; y += 1)
          D.push(y);
      }
      return this.readRasters({
        window: I,
        interleave: A,
        samples: D,
        pool: e,
        width: t,
        height: B,
        resampleMethod: C,
        signal: o
      });
    }
    let s;
    switch (Q) {
      case IA.WhiteIsZero:
      case IA.BlackIsZero:
      case IA.Palette:
        s = [0];
        break;
      case IA.CMYK:
        s = [0, 1, 2, 3];
        break;
      case IA.YCbCr:
      case IA.CIELab:
        s = [0, 1, 2];
        break;
      default:
        throw new Error("Invalid or unsupported photometric interpretation.");
    }
    const E = {
      window: r,
      interleave: !0,
      samples: s,
      pool: e,
      width: t,
      height: B,
      resampleMethod: C,
      signal: o
    }, { fileDirectory: a } = this, n = await this.readRasters(E), h = 2 ** this.getBitsPerSample(0);
    let c;
    switch (Q) {
      case IA.WhiteIsZero:
        c = $i(n, h);
        break;
      case IA.BlackIsZero:
        c = AC(n, h);
        break;
      case IA.Palette:
        c = IC(n, await a.loadValue("ColorMap"));
        break;
      case IA.CMYK:
        c = gC(n);
        break;
      case IA.YCbCr:
        c = eC(n);
        break;
      case IA.CIELab:
        c = CC(n);
        break;
      default:
        throw new Error("Unsupported photometric interpretation.");
    }
    if (!A) {
      const D = new Uint8Array(c.length / 3), y = new Uint8Array(c.length / 3), d = new Uint8Array(c.length / 3);
      for (let l = 0, w = 0; l < c.length; l += 3, ++w)
        D[w] = c[l], y[w] = c[l + 1], d[w] = c[l + 2];
      c = [D, y, d];
    }
    return c.width = n.width, c.height = n.height, c;
  }
  /**
   * Returns an array of tiepoints.
   * @returns {Object[]}
   */
  async getTiePoints() {
    if (!this.fileDirectory.hasTag("ModelTiepoint"))
      return [];
    const I = await this.fileDirectory.loadValue("ModelTiepoint"), A = [];
    for (let e = 0; e < I.length; e += 6)
      A.push({
        i: I[e],
        j: I[e + 1],
        k: I[e + 2],
        x: I[e + 3],
        y: I[e + 4],
        z: I[e + 5]
      });
    return A;
  }
  /**
   * Returns the parsed GDAL metadata items.
   *
   * If sample is passed to null, dataset-level metadata will be returned.
   * Otherwise only metadata specific to the provided sample will be returned.
   *
   * @param {number} [sample=null] The sample index.
   * @returns {Object}
   */
  async getGDALMetadata(I = null) {
    const A = {};
    if (!this.fileDirectory.hasTag("GDAL_METADATA"))
      return null;
    const e = await this.fileDirectory.loadValue("GDAL_METADATA");
    let t = Zi(e, "Item");
    I === null ? t = t.filter((B) => ug(B, "sample") === void 0) : t = t.filter((B) => Number(ug(B, "sample")) === I);
    for (let B = 0; B < t.length; ++B) {
      const C = t[B];
      A[ug(C, "name")] = C.inner;
    }
    return A;
  }
  /**
   * Returns the GDAL nodata value
   * @returns {number|null}
   */
  getGDALNoData() {
    if (!this.fileDirectory.hasTag("GDAL_NODATA"))
      return null;
    const I = this.fileDirectory.getValue("GDAL_NODATA");
    return Number(I.substring(0, I.length - 1));
  }
  /**
   * Returns the image origin as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @returns {Array<number>} The origin as a vector
   */
  getOrigin() {
    const I = this.fileDirectory.getValue("ModelTiepoint"), A = this.fileDirectory.getValue("ModelTransformation");
    if (I && I.length === 6)
      return [
        I[3],
        I[4],
        I[5]
      ];
    if (A)
      return [
        A[3],
        A[7],
        A[11]
      ];
    throw new Error("The image does not have an affine transformation.");
  }
  /**
   * Returns the image resolution as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @param {GeoTIFFImage} [referenceImage=null] A reference image to calculate the resolution from
   *                                             in cases when the current image does not have the
   *                                             required tags on its own.
   * @returns {Array<number>} The resolution as a vector
   */
  getResolution(I = null) {
    const A = this.fileDirectory.getValue("ModelPixelScale"), e = this.fileDirectory.getValue("ModelTransformation");
    if (A)
      return [
        A[0],
        -A[1],
        A[2]
      ];
    if (e)
      return e[1] === 0 && e[4] === 0 ? [
        e[0],
        -e[5],
        e[10]
      ] : [
        Math.sqrt(e[0] * e[0] + e[4] * e[4]),
        -Math.sqrt(e[1] * e[1] + e[5] * e[5]),
        e[10]
      ];
    if (I) {
      const [t, B, C] = I.getResolution();
      return [
        t * I.getWidth() / this.getWidth(),
        B * I.getHeight() / this.getHeight(),
        C * I.getWidth() / this.getWidth()
      ];
    }
    throw new Error("The image does not have an affine transformation.");
  }
  /**
   * Returns whether or not the pixels of the image depict an area (or point).
   * @returns {Boolean} Whether the pixels are a point
   */
  pixelIsArea() {
    return this.geoKeys.GTRasterTypeGeoKey === 1;
  }
  /**
   * Returns the image bounding box as an array of 4 values: min-x, min-y,
   * max-x and max-y. When the image has no affine transformation, then an
   * exception is thrown.
   * @param {boolean} [tilegrid=false] If true return extent for a tilegrid
   *                                   without adjustment for ModelTransformation.
   * @returns {Array<number>} The bounding box
   */
  getBoundingBox(I = !1) {
    const A = this.getHeight(), e = this.getWidth();
    if (this.fileDirectory.hasTag("ModelTransformation") && !I) {
      const [t, B, C, i, o, r, Q, s] = this.fileDirectory.getValue("ModelTransformation"), a = [
        [0, 0],
        [0, A],
        [e, 0],
        [e, A]
      ].map(([c, D]) => [
        i + t * c + B * D,
        s + o * c + r * D
      ]), n = a.map((c) => c[0]), h = a.map((c) => c[1]);
      return [
        Math.min(...n),
        Math.min(...h),
        Math.max(...n),
        Math.max(...h)
      ];
    } else {
      const t = this.getOrigin(), B = this.getResolution(), C = t[0], i = t[1], o = C + B[0] * e, r = i + B[1] * A;
      return [
        Math.min(C, o),
        Math.min(i, r),
        Math.max(C, o),
        Math.max(i, r)
      ];
    }
  }
}
class uC {
  constructor(I) {
    this._dataView = new DataView(I);
  }
  get buffer() {
    return this._dataView.buffer;
  }
  getUint64(I, A) {
    const e = this.getUint32(I, A), t = this.getUint32(I + 4, A);
    let B;
    if (A) {
      if (B = e + 2 ** 32 * t, !Number.isSafeInteger(B))
        throw new Error(
          `${B} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`
        );
      return B;
    }
    if (B = 2 ** 32 * e + t, !Number.isSafeInteger(B))
      throw new Error(
        `${B} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`
      );
    return B;
  }
  // adapted from https://stackoverflow.com/a/55338384/8060591
  getInt64(I, A) {
    let e = 0;
    const t = (this._dataView.getUint8(I + (A ? 7 : 0)) & 128) > 0;
    let B = !0;
    for (let C = 0; C < 8; C++) {
      let i = this._dataView.getUint8(I + (A ? C : 7 - C));
      t && (B ? i !== 0 && (i = ~(i - 1) & 255, B = !1) : i = ~i & 255), e += i * 256 ** C;
    }
    return t && (e = -e), e;
  }
  getUint8(I, A) {
    return this._dataView.getUint8(I, A);
  }
  getInt8(I, A) {
    return this._dataView.getInt8(I, A);
  }
  getUint16(I, A) {
    return this._dataView.getUint16(I, A);
  }
  getInt16(I, A) {
    return this._dataView.getInt16(I, A);
  }
  getUint32(I, A) {
    return this._dataView.getUint32(I, A);
  }
  getInt32(I, A) {
    return this._dataView.getInt32(I, A);
  }
  getFloat16(I, A) {
    return DB(this._dataView, I, A);
  }
  getFloat32(I, A) {
    return this._dataView.getFloat32(I, A);
  }
  getFloat64(I, A) {
    return this._dataView.getFloat64(I, A);
  }
}
class gg {
  constructor(I, A, e, t) {
    this._dataView = new DataView(I), this._sliceOffset = A, this._littleEndian = e, this._bigTiff = t;
  }
  get sliceOffset() {
    return this._sliceOffset;
  }
  get sliceTop() {
    return this._sliceOffset + this.buffer.byteLength;
  }
  get littleEndian() {
    return this._littleEndian;
  }
  get bigTiff() {
    return this._bigTiff;
  }
  get buffer() {
    return this._dataView.buffer;
  }
  covers(I, A) {
    return this.sliceOffset <= I && this.sliceTop >= I + A;
  }
  readUint8(I) {
    return this._dataView.getUint8(
      I - this._sliceOffset,
      this._littleEndian
    );
  }
  readInt8(I) {
    return this._dataView.getInt8(
      I - this._sliceOffset,
      this._littleEndian
    );
  }
  readUint16(I) {
    return this._dataView.getUint16(
      I - this._sliceOffset,
      this._littleEndian
    );
  }
  readInt16(I) {
    return this._dataView.getInt16(
      I - this._sliceOffset,
      this._littleEndian
    );
  }
  readUint32(I) {
    return this._dataView.getUint32(
      I - this._sliceOffset,
      this._littleEndian
    );
  }
  readInt32(I) {
    return this._dataView.getInt32(
      I - this._sliceOffset,
      this._littleEndian
    );
  }
  readFloat32(I) {
    return this._dataView.getFloat32(
      I - this._sliceOffset,
      this._littleEndian
    );
  }
  readFloat64(I) {
    return this._dataView.getFloat64(
      I - this._sliceOffset,
      this._littleEndian
    );
  }
  readUint64(I) {
    const A = this.readUint32(I), e = this.readUint32(I + 4);
    let t;
    if (this._littleEndian) {
      if (t = A + 2 ** 32 * e, !Number.isSafeInteger(t))
        throw new Error(
          `${t} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`
        );
      return t;
    }
    if (t = 2 ** 32 * A + e, !Number.isSafeInteger(t))
      throw new Error(
        `${t} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`
      );
    return t;
  }
  // adapted from https://stackoverflow.com/a/55338384/8060591
  readInt64(I) {
    let A = 0;
    const e = (this._dataView.getUint8(I + (this._littleEndian ? 7 : 0)) & 128) > 0;
    let t = !0;
    for (let B = 0; B < 8; B++) {
      let C = this._dataView.getUint8(
        I + (this._littleEndian ? B : 7 - B)
      );
      e && (t ? C !== 0 && (C = ~(C - 1) & 255, t = !1) : C = ~C & 255), A += C * 256 ** B;
    }
    return e && (A = -A), A;
  }
  readOffset(I) {
    return this._bigTiff ? this.readUint64(I) : this.readUint32(I);
  }
}
const dC = typeof Worker < "u" ? Worker : void 0;
function SC() {
  return new dC(new URL(
    /* @vite-ignore */
    "/assets/decoder-BRlgn5r6.js",
    import.meta.url
  ), {
    type: "module"
  });
}
const GC = typeof navigator < "u" && navigator.hardwareConcurrency || 2;
class FC {
  /**
   * @param {Worker} worker the worker to wrap
   */
  constructor(I) {
    this.worker = I, this.worker.addEventListener("message", (A) => this._onWorkerMessage(A)), this.jobIdCounter = 0, this.jobs = /* @__PURE__ */ new Map();
  }
  /**
   * Get a new job id
   * @returns {Number} the new job id
   */
  newJobId() {
    return this.jobIdCounter++;
  }
  /**
   * Get the number of jobs currently running
   * @returns {Number} the number of jobs currently running
   */
  getJobCount() {
    return this.jobs.size;
  }
  _onWorkerMessage(I) {
    const { jobId: A, error: e, ...t } = I.data, B = this.jobs.get(A);
    this.jobs.delete(A), e ? B.reject(new Error(e)) : B.resolve(t);
  }
  /**
   * Submit a job to the worker
   * @param {Object} message the message to send to the worker. A "jobId" property will be added to this object.
   * @param {Object[]} [transferables] an optional array of transferable objects to transfer to the worker.
   * @returns {Promise} a promise that gets resolved/rejected when a message with the same jobId is received from the worker.
   */
  submitJob(I, A = void 0) {
    const e = this.newJobId();
    let t, B;
    const C = new Promise((i, o) => {
      t = i, B = o;
    });
    return this.jobs.set(e, { resolve: t, reject: B }), this.worker.postMessage({ ...I, jobId: e }, A), C;
  }
  terminate() {
    this.worker.terminate();
  }
}
const NC = new FinalizationRegistry((g) => {
  g.terminate();
});
class pC {
  /**
   * @constructor
   * @param {Number} [size] The size of the pool. Defaults to the number of CPUs
   *                      available. When this parameter is `null` or 0, then the
   *                      decoding will be done in the main thread.
   * @param {function(): Worker} [createWorker] A function that creates the decoder worker.
   * Defaults to a worker with all decoders that ship with geotiff.js. The `createWorker()`
   * function is expected to return a `Worker` compatible with Web Workers. For code that
   * runs in Node, [web-worker](https://www.npmjs.com/package/web-worker) is a good choice.
   *
   * A worker that uses a custom lzw decoder would look like this `my-custom-worker.js` file:
   * ```js
   * import { addDecoder, getDecoder } from 'geotiff';
   * addDecoder(5, () => import ('./my-custom-lzw').then((m) => m.default));
   * self.addEventListener('message', async (e) => {
   *   const { id, fileDirectory, buffer } = e.data;
   *   const decoder = await getDecoder(fileDirectory);
   *   const decoded = await decoder.decode(fileDirectory, buffer);
   *   self.postMessage({ decoded, id }, [decoded]);
   * });
   * ```
   * The way the above code is built into a worker by the `createWorker()` function
   * depends on the used bundler. For most bundlers, something like this will work:
   * ```js
   * function createWorker() {
   *   return new Worker(new URL('./my-custom-worker.js', import.meta.url));
   * }
   * ```
   */
  constructor(I = GC, A = SC) {
    this.workerWrappers = null, I && (this.workerWrappers = (async () => {
      const e = [];
      for (let t = 0; t < I; t++) {
        const B = A(), C = new FC(B);
        e.push(C), NC.register(C, B, C);
      }
      return e;
    })());
  }
  bindParameters(I, A) {
    return {
      decode: async (e) => {
        if (oC(I) && this.workerWrappers) {
          const t = (await this.workerWrappers).reduce((C, i) => C.getJobCount() < i.getJobCount() ? C : i), { decoded: B } = await t.submitJob({ compression: I, decoderParameters: A, buffer: e }, [e]);
          return B;
        } else
          return (await wB(I, A)).decode(e);
      }
    };
  }
  async destroy() {
    this.workerWrappers && ((await this.workerWrappers).forEach((I) => {
      I.terminate();
    }), this.workerWrappers = null);
  }
}
const Ze = `\r
\r
`;
function uB(g) {
  if (typeof Object.fromEntries < "u")
    return Object.fromEntries(g);
  const I = {};
  for (const [A, e] of g)
    I[A.toLowerCase()] = e;
  return I;
}
function RC(g) {
  const I = g.split(`\r
`).map((A) => {
    const e = A.split(":").map((t) => t.trim());
    return e[0] = e[0].toLowerCase(), e;
  });
  return uB(I);
}
function kC(g) {
  const [I, ...A] = g.split(";").map((t) => t.trim()), e = A.map((t) => t.split("="));
  return { type: I, params: uB(e) };
}
function Ce(g) {
  let I, A, e;
  return g && ([, I, A, e] = g.match(/bytes (\d+)-(\d+)\/(\d+)/), I = parseInt(I, 10), A = parseInt(A, 10), e = parseInt(e, 10)), { start: I, end: A, total: e };
}
function LC(g, I) {
  let A = null;
  const e = new TextDecoder("ascii"), t = [], B = `--${I}`, C = `${B}--`;
  for (let i = 0; i < 10; ++i)
    e.decode(
      new Uint8Array(g, i, B.length)
    ) === B && (A = i);
  if (A === null)
    throw new Error("Could not find initial boundary");
  for (; A < g.byteLength; ) {
    const i = e.decode(
      new Uint8Array(
        g,
        A,
        Math.min(B.length + 1024, g.byteLength - A)
      )
    );
    if (i.length === 0 || i.startsWith(C))
      break;
    if (!i.startsWith(B))
      throw new Error("Part does not start with boundary");
    const o = i.substr(B.length + 2);
    if (o.length === 0)
      break;
    const r = o.indexOf(Ze), Q = RC(o.substr(0, r)), { start: s, end: E, total: a } = Ce(Q["content-range"]), n = A + B.length + r + Ze.length, h = parseInt(E, 10) + 1 - parseInt(s, 10);
    t.push({
      headers: Q,
      data: g.slice(n, n + h),
      offset: s,
      length: h,
      fileSize: a
    }), A = n + h + 4;
  }
  return t;
}
class Ue {
  /**
   *
   * @param {Slice[]} slices
   * @returns {ArrayBuffer[]}
   */
  async fetch(I, A = void 0) {
    return Promise.all(
      I.map((e) => this.fetchSlice(e, A))
    );
  }
  /**
   *
   * @param {Slice} slice
   * @returns {ArrayBuffer}
   */
  async fetchSlice(I) {
    throw new Error(`fetching of slice ${I} not possible, not implemented`);
  }
  /**
   * Returns the filesize if already determined and null otherwise
   */
  get fileSize() {
    return null;
  }
  async close() {
  }
}
var aA, W, $, kA, II, LA, T, VI, hA, dB, re, Qe, oe, SB, _I;
class UC extends Map {
  constructor(A = {}) {
    super();
    RA(this, T);
    RA(this, aA, 0);
    RA(this, W, /* @__PURE__ */ new Map());
    RA(this, $, /* @__PURE__ */ new Map());
    RA(this, kA);
    RA(this, II);
    RA(this, LA);
    if (!(A.maxSize && A.maxSize > 0))
      throw new TypeError("`maxSize` must be a number greater than 0");
    if (typeof A.maxAge == "number" && A.maxAge === 0)
      throw new TypeError("`maxAge` must be a number greater than 0");
    eA(this, kA, A.maxSize), eA(this, II, A.maxAge || Number.POSITIVE_INFINITY), eA(this, LA, A.onEviction);
  }
  // For tests.
  get __oldCache() {
    return M(this, $);
  }
  get(A) {
    if (M(this, W).has(A)) {
      const e = M(this, W).get(A);
      return z(this, T, re).call(this, A, e);
    }
    if (M(this, $).has(A)) {
      const e = M(this, $).get(A);
      if (z(this, T, hA).call(this, A, e) === !1)
        return z(this, T, SB).call(this, A, e), e.value;
    }
  }
  set(A, e, { maxAge: t = M(this, II) } = {}) {
    const B = typeof t == "number" && t !== Number.POSITIVE_INFINITY ? Date.now() + t : void 0;
    return M(this, W).has(A) ? M(this, W).set(A, {
      value: e,
      expiry: B
    }) : z(this, T, oe).call(this, A, { value: e, expiry: B }), this;
  }
  has(A) {
    return M(this, W).has(A) ? !z(this, T, hA).call(this, A, M(this, W).get(A)) : M(this, $).has(A) ? !z(this, T, hA).call(this, A, M(this, $).get(A)) : !1;
  }
  peek(A) {
    if (M(this, W).has(A))
      return z(this, T, Qe).call(this, A, M(this, W));
    if (M(this, $).has(A))
      return z(this, T, Qe).call(this, A, M(this, $));
  }
  expiresIn(A) {
    const e = M(this, W).get(A) ?? M(this, $).get(A);
    if (e)
      return e.expiry ? e.expiry - Date.now() : Number.POSITIVE_INFINITY;
  }
  delete(A) {
    const e = M(this, W).delete(A);
    return e && wg(this, aA)._--, M(this, $).delete(A) || e;
  }
  clear() {
    M(this, W).clear(), M(this, $).clear(), eA(this, aA, 0);
  }
  resize(A) {
    if (!(A && A > 0))
      throw new TypeError("`maxSize` must be a number greater than 0");
    const e = [...z(this, T, _I).call(this)], t = e.length - A;
    t < 0 ? (eA(this, W, new Map(e)), eA(this, $, /* @__PURE__ */ new Map()), eA(this, aA, e.length)) : (t > 0 && z(this, T, VI).call(this, e.slice(0, t)), eA(this, $, new Map(e.slice(t))), eA(this, W, /* @__PURE__ */ new Map()), eA(this, aA, 0)), eA(this, kA, A);
  }
  evict(A = 1) {
    const e = Number(A);
    if (!e || e <= 0)
      return;
    const t = [...z(this, T, _I).call(this)], B = Math.trunc(Math.min(e, Math.max(t.length - 1, 0)));
    B <= 0 || (z(this, T, VI).call(this, t.slice(0, B)), eA(this, $, new Map(t.slice(B))), eA(this, W, /* @__PURE__ */ new Map()), eA(this, aA, 0));
  }
  *keys() {
    for (const [A] of this)
      yield A;
  }
  *values() {
    for (const [, A] of this)
      yield A;
  }
  *[Symbol.iterator]() {
    for (const A of M(this, W)) {
      const [e, t] = A;
      z(this, T, hA).call(this, e, t) === !1 && (yield [e, t.value]);
    }
    for (const A of M(this, $)) {
      const [e, t] = A;
      M(this, W).has(e) || z(this, T, hA).call(this, e, t) === !1 && (yield [e, t.value]);
    }
  }
  *entriesDescending() {
    let A = [...M(this, W)];
    for (let e = A.length - 1; e >= 0; --e) {
      const t = A[e], [B, C] = t;
      z(this, T, hA).call(this, B, C) === !1 && (yield [B, C.value]);
    }
    A = [...M(this, $)];
    for (let e = A.length - 1; e >= 0; --e) {
      const t = A[e], [B, C] = t;
      M(this, W).has(B) || z(this, T, hA).call(this, B, C) === !1 && (yield [B, C.value]);
    }
  }
  *entriesAscending() {
    for (const [A, e] of z(this, T, _I).call(this))
      yield [A, e.value];
  }
  get size() {
    if (!M(this, aA))
      return M(this, $).size;
    let A = 0;
    for (const e of M(this, $).keys())
      M(this, W).has(e) || A++;
    return Math.min(M(this, aA) + A, M(this, kA));
  }
  get maxSize() {
    return M(this, kA);
  }
  get maxAge() {
    return M(this, II);
  }
  entries() {
    return this.entriesAscending();
  }
  forEach(A, e = this) {
    for (const [t, B] of this.entriesAscending())
      A.call(e, B, t, this);
  }
  get [Symbol.toStringTag]() {
    return "QuickLRU";
  }
  toString() {
    return `QuickLRU(${this.size}/${this.maxSize})`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
}
aA = new WeakMap(), W = new WeakMap(), $ = new WeakMap(), kA = new WeakMap(), II = new WeakMap(), LA = new WeakMap(), T = new WeakSet(), VI = function(A) {
  if (typeof M(this, LA) == "function")
    for (const [e, t] of A)
      M(this, LA).call(this, e, t.value);
}, hA = function(A, e) {
  return typeof e.expiry == "number" && e.expiry <= Date.now() ? (typeof M(this, LA) == "function" && M(this, LA).call(this, A, e.value), this.delete(A)) : !1;
}, dB = function(A, e) {
  if (z(this, T, hA).call(this, A, e) === !1)
    return e.value;
}, re = function(A, e) {
  return e.expiry ? z(this, T, dB).call(this, A, e) : e.value;
}, Qe = function(A, e) {
  const t = e.get(A);
  return z(this, T, re).call(this, A, t);
}, oe = function(A, e) {
  M(this, W).set(A, e), wg(this, aA)._++, M(this, aA) >= M(this, kA) && (eA(this, aA, 0), z(this, T, VI).call(this, M(this, $)), eA(this, $, M(this, W)), eA(this, W, /* @__PURE__ */ new Map()));
}, SB = function(A, e) {
  M(this, $).delete(A), z(this, T, oe).call(this, A, e);
}, _I = function* () {
  for (const A of M(this, $)) {
    const [e, t] = A;
    M(this, W).has(e) || z(this, T, hA).call(this, e, t) === !1 && (yield A);
  }
  for (const A of M(this, W)) {
    const [e, t] = A;
    z(this, T, hA).call(this, e, t) === !1 && (yield A);
  }
};
function GB(g, I) {
  for (const A in I)
    I.hasOwnProperty(A) && (g[A] = I[A]);
}
function YC(g) {
  const I = {};
  for (const A in g)
    if (g.hasOwnProperty(A)) {
      const e = g[A];
      I[e] = A;
    }
  return I;
}
function mC(g, I) {
  const A = [];
  for (let e = 0; e < g; e++)
    A.push(I(e));
  return A;
}
async function MC(g) {
  return new Promise((I) => setTimeout(I, g));
}
function KC(g, I) {
  const A = Array.isArray(g) ? g : Array.from(g), e = Array.isArray(I) ? I : Array.from(I);
  return A.map((t, B) => [t, e[B]]);
}
class gI extends Error {
  constructor(I) {
    super(I), Error.captureStackTrace && Error.captureStackTrace(this, gI), this.name = "AbortError";
  }
}
class bC extends Error {
  constructor(I, A) {
    super(A), this.errors = I, this.message = A, this.name = "AggregateError";
  }
}
const JC = bC;
class HC {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {ArrayBuffer} [data]
   */
  constructor(I, A, e = null) {
    this.offset = I, this.length = A, this.data = e;
  }
  /**
   * @returns {number} the top byte border
   */
  get top() {
    return this.offset + this.length;
  }
}
class We {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {number[]} blockIds
   */
  constructor(I, A, e) {
    this.offset = I, this.length = A, this.blockIds = e;
  }
}
class qC extends Ue {
  /**
   *
   * @param {BaseSource} source The underlying source that shall be blocked and cached
   * @param {object} options
   * @param {number} [options.blockSize]
   * @param {number} [options.cacheSize]
   */
  constructor(I, { blockSize: A = 65536, cacheSize: e = 100 } = {}) {
    super(), this.source = I, this.blockSize = A, this.blockCache = new UC({
      maxSize: e,
      onEviction: (t, B) => {
        this.evictedBlocks.set(t, B);
      }
    }), this.evictedBlocks = /* @__PURE__ */ new Map(), this.blockRequests = /* @__PURE__ */ new Map(), this.blockIdsToFetch = /* @__PURE__ */ new Set(), this.abortedBlockIds = /* @__PURE__ */ new Set();
  }
  get fileSize() {
    return this.source.fileSize;
  }
  /**
   *
   * @param {import("./basesource").Slice[]} slices
   */
  async fetch(I, A) {
    const e = [], t = [], B = [];
    this.evictedBlocks.clear();
    for (const { offset: E, length: a } of I) {
      let n = E + a;
      const { fileSize: h } = this;
      h !== null && (n = Math.min(n, h));
      const c = Math.floor(E / this.blockSize) * this.blockSize;
      for (let D = c; D < n; D += this.blockSize) {
        const y = Math.floor(D / this.blockSize);
        !this.blockCache.has(y) && !this.blockRequests.has(y) && (this.blockIdsToFetch.add(y), t.push(y)), this.blockRequests.has(y) && e.push(this.blockRequests.get(y)), B.push(y);
      }
    }
    await MC(), this.fetchBlocks(A);
    const C = [];
    for (const E of t)
      this.blockRequests.has(E) && C.push(this.blockRequests.get(E));
    await Promise.allSettled(e), await Promise.allSettled(C);
    const i = [], o = B.filter((E) => this.abortedBlockIds.has(E) || !this.blockCache.has(E));
    if (o.forEach((E) => this.blockIdsToFetch.add(E)), o.length > 0 && A && !A.aborted) {
      this.fetchBlocks(null);
      for (const E of o) {
        const a = this.blockRequests.get(E);
        if (!a)
          throw new Error(`Block ${E} is not in the block requests`);
        i.push(a);
      }
      await Promise.allSettled(i);
    }
    if (A && A.aborted)
      throw new gI("Request was aborted");
    const r = B.map((E) => this.blockCache.get(E) || this.evictedBlocks.get(E)), Q = r.filter((E) => !E);
    if (Q.length)
      throw new JC(Q, "Request failed");
    const s = new Map(KC(B, r));
    return this.readSliceData(I, s);
  }
  /**
   *
   * @param {AbortSignal} signal
   */
  fetchBlocks(I) {
    if (this.blockIdsToFetch.size > 0) {
      const A = this.groupBlocks(this.blockIdsToFetch), e = this.source.fetch(A, I);
      for (let t = 0; t < A.length; ++t) {
        const B = A[t];
        for (const C of B.blockIds)
          this.blockRequests.set(C, (async () => {
            try {
              const i = (await e)[t], o = C * this.blockSize, r = o - i.offset, Q = Math.min(r + this.blockSize, i.data.byteLength), s = i.data.slice(r, Q), E = new HC(
                o,
                s.byteLength,
                s,
                C
              );
              this.blockCache.set(C, E), this.abortedBlockIds.delete(C);
            } catch (i) {
              if (i.name === "AbortError")
                i.signal = I, this.blockCache.delete(C), this.abortedBlockIds.add(C);
              else
                throw i;
            } finally {
              this.blockRequests.delete(C);
            }
          })());
      }
      this.blockIdsToFetch.clear();
    }
  }
  /**
   *
   * @param {Set} blockIds
   * @returns {BlockGroup[]}
   */
  groupBlocks(I) {
    const A = Array.from(I).sort((C, i) => C - i);
    if (A.length === 0)
      return [];
    let e = [], t = null;
    const B = [];
    for (const C of A)
      t === null || t + 1 === C ? (e.push(C), t = C) : (B.push(new We(
        e[0] * this.blockSize,
        e.length * this.blockSize,
        e
      )), e = [C], t = C);
    return B.push(new We(
      e[0] * this.blockSize,
      e.length * this.blockSize,
      e
    )), B;
  }
  /**
   *
   * @param {import("./basesource").Slice[]} slices
   * @param {Map} blocks
   */
  readSliceData(I, A) {
    return I.map((e) => {
      let t = e.offset + e.length;
      this.fileSize !== null && (t = Math.min(this.fileSize, t));
      const B = Math.floor(e.offset / this.blockSize), C = Math.floor((t - 1) / this.blockSize), i = new ArrayBuffer(e.length), o = new Uint8Array(i);
      for (let r = B; r <= C; ++r) {
        const Q = A.get(r), s = Q.offset - e.offset, E = Q.top - t;
        let a = 0, n = 0, h;
        s < 0 ? a = -s : s > 0 && (n = s), E < 0 ? h = Q.length - a : h = t - Q.offset - a;
        const c = new Uint8Array(Q.data, a, h);
        o.set(c, n);
      }
      return i;
    });
  }
}
class Ye {
  /**
   * Returns whether the response has an ok'ish status code
   */
  get ok() {
    return this.status >= 200 && this.status <= 299;
  }
  /**
   * Returns the status code of the response
   */
  get status() {
    throw new Error("not implemented");
  }
  /**
   * Returns the value of the specified header
   * @param {string} headerName the header name
   * @returns {string} the header value
   */
  getHeader(I) {
    throw new Error("not implemented");
  }
  /**
   * @returns {ArrayBuffer} the response data of the request
   */
  async getData() {
    throw new Error("not implemented");
  }
}
class me {
  constructor(I) {
    this.url = I;
  }
  /**
   * Send a request with the options
   * @param {{headers: HeadersInit, signal: AbortSignal}} [options={}]
   * @returns {Promise<BaseResponse>}
   */
  async request({ headers: I, signal: A } = {}) {
    throw new Error("request is not implemented");
  }
}
class xC extends Ye {
  /**
   * BaseResponse facade for fetch API Response
   * @param {Response} response
   */
  constructor(I) {
    super(), this.response = I;
  }
  get status() {
    return this.response.status;
  }
  getHeader(I) {
    return this.response.headers.get(I);
  }
  async getData() {
    return this.response.arrayBuffer ? await this.response.arrayBuffer() : (await this.response.buffer()).buffer;
  }
}
class OC extends me {
  constructor(I, A) {
    super(I), this.credentials = A;
  }
  /**
   * @param {{headers: HeadersInit, signal: AbortSignal}} [options={}]
   * @returns {Promise<FetchResponse>}
   */
  async request({ headers: I, signal: A } = {}) {
    const e = await fetch(this.url, {
      headers: I,
      credentials: this.credentials,
      signal: A
    });
    return new xC(e);
  }
}
class TC extends Ye {
  /**
   * BaseResponse facade for XMLHttpRequest
   * @param {XMLHttpRequest} xhr
   * @param {ArrayBuffer} data
   */
  constructor(I, A) {
    super(), this.xhr = I, this.data = A;
  }
  get status() {
    return this.xhr.status;
  }
  getHeader(I) {
    return this.xhr.getResponseHeader(I);
  }
  async getData() {
    return this.data;
  }
}
class vC extends me {
  constructRequest(I, A) {
    return new Promise((e, t) => {
      const B = new XMLHttpRequest();
      B.open("GET", this.url), B.responseType = "arraybuffer";
      for (const [C, i] of Object.entries(I))
        B.setRequestHeader(C, i);
      B.onload = () => {
        const C = B.response;
        e(new TC(B, C));
      }, B.onerror = t, B.onabort = () => t(new gI("Request aborted")), B.send(), A && (A.aborted && B.abort(), A.addEventListener("abort", () => B.abort()));
    });
  }
  async request({ headers: I, signal: A } = {}) {
    return await this.constructRequest(I, A);
  }
}
const Ee = {}, PC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ee
}, Symbol.toStringTag, { value: "Module" }));
var nI = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function jC(g) {
  if (g.__esModule) return g;
  var I = g.default;
  if (typeof I == "function") {
    var A = function e() {
      return this instanceof e ? Reflect.construct(I, arguments, this.constructor) : I.apply(this, arguments);
    };
    A.prototype = I.prototype;
  } else A = {};
  return Object.defineProperty(A, "__esModule", { value: !0 }), Object.keys(g).forEach(function(e) {
    var t = Object.getOwnPropertyDescriptor(g, e);
    Object.defineProperty(A, e, t.get ? t : {
      enumerable: !0,
      get: function() {
        return g[e];
      }
    });
  }), A;
}
var CI = {}, eg = { exports: {} };
/*! https://mths.be/punycode v1.4.1 by @mathias */
eg.exports;
(function(g, I) {
  (function(A) {
    var e = I && !I.nodeType && I, t = g && !g.nodeType && g, B = typeof nI == "object" && nI;
    (B.global === B || B.window === B || B.self === B) && (A = B);
    var C, i = 2147483647, o = 36, r = 1, Q = 26, s = 38, E = 700, a = 72, n = 128, h = "-", c = /^xn--/, D = /[^\x20-\x7E]/, y = /[\x2E\u3002\uFF0E\uFF61]/g, d = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, l = o - r, w = Math.floor, S = String.fromCharCode, G;
    function f(R) {
      throw new RangeError(d[R]);
    }
    function F(R, K) {
      for (var H = R.length, j = []; H--; )
        j[H] = K(R[H]);
      return j;
    }
    function N(R, K) {
      var H = R.split("@"), j = "";
      H.length > 1 && (j = H[0] + "@", R = H[1]), R = R.replace(y, ".");
      var k = R.split("."), U = F(k, K).join(".");
      return j + U;
    }
    function p(R) {
      for (var K = [], H = 0, j = R.length, k, U; H < j; )
        k = R.charCodeAt(H++), k >= 55296 && k <= 56319 && H < j ? (U = R.charCodeAt(H++), (U & 64512) == 56320 ? K.push(((k & 1023) << 10) + (U & 1023) + 65536) : (K.push(k), H--)) : K.push(k);
      return K;
    }
    function J(R) {
      return F(R, function(K) {
        var H = "";
        return K > 65535 && (K -= 65536, H += S(K >>> 10 & 1023 | 55296), K = 56320 | K & 1023), H += S(K), H;
      }).join("");
    }
    function L(R) {
      return R - 48 < 10 ? R - 22 : R - 65 < 26 ? R - 65 : R - 97 < 26 ? R - 97 : o;
    }
    function b(R, K) {
      return R + 22 + 75 * (R < 26) - ((K != 0) << 5);
    }
    function Y(R, K, H) {
      var j = 0;
      for (R = H ? w(R / E) : R >> 1, R += w(R / K); R > l * Q >> 1; j += o)
        R = w(R / l);
      return w(j + (l + 1) * R / (R + s));
    }
    function v(R) {
      var K = [], H = R.length, j, k = 0, U = n, m = a, O, x, P, Z, V, gA, cA, pA, KA;
      for (O = R.lastIndexOf(h), O < 0 && (O = 0), x = 0; x < O; ++x)
        R.charCodeAt(x) >= 128 && f("not-basic"), K.push(R.charCodeAt(x));
      for (P = O > 0 ? O + 1 : 0; P < H; ) {
        for (Z = k, V = 1, gA = o; P >= H && f("invalid-input"), cA = L(R.charCodeAt(P++)), (cA >= o || cA > w((i - k) / V)) && f("overflow"), k += cA * V, pA = gA <= m ? r : gA >= m + Q ? Q : gA - m, !(cA < pA); gA += o)
          KA = o - pA, V > w(i / KA) && f("overflow"), V *= KA;
        j = K.length + 1, m = Y(k - Z, j, Z == 0), w(k / j) > i - U && f("overflow"), U += w(k / j), k %= j, K.splice(k++, 0, U);
      }
      return J(K);
    }
    function BA(R) {
      var K, H, j, k, U, m, O, x, P, Z, V, gA = [], cA, pA, KA, yg;
      for (R = p(R), cA = R.length, K = n, H = 0, U = a, m = 0; m < cA; ++m)
        V = R[m], V < 128 && gA.push(S(V));
      for (j = k = gA.length, k && gA.push(h); j < cA; ) {
        for (O = i, m = 0; m < cA; ++m)
          V = R[m], V >= K && V < O && (O = V);
        for (pA = j + 1, O - K > w((i - H) / pA) && f("overflow"), H += (O - K) * pA, K = O, m = 0; m < cA; ++m)
          if (V = R[m], V < K && ++H > i && f("overflow"), V == K) {
            for (x = H, P = o; Z = P <= U ? r : P >= U + Q ? Q : P - U, !(x < Z); P += o)
              yg = x - Z, KA = o - Z, gA.push(
                S(b(Z + yg % KA, 0))
              ), x = w(yg / KA);
            gA.push(S(b(x, 0))), U = Y(H, pA, j == k), H = 0, ++j;
          }
        ++H, ++K;
      }
      return gA.join("");
    }
    function rA(R) {
      return N(R, function(K) {
        return c.test(K) ? v(K.slice(4).toLowerCase()) : K;
      });
    }
    function QA(R) {
      return N(R, function(K) {
        return D.test(K) ? "xn--" + BA(K) : K;
      });
    }
    if (C = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      version: "1.4.1",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      ucs2: {
        decode: p,
        encode: J
      },
      decode: v,
      encode: BA,
      toASCII: QA,
      toUnicode: rA
    }, e && t)
      if (g.exports == e)
        t.exports = C;
      else
        for (G in C)
          C.hasOwnProperty(G) && (e[G] = C[G]);
    else
      A.punycode = C;
  })(nI);
})(eg, eg.exports);
var ZC = eg.exports, rI = TypeError;
const WC = /* @__PURE__ */ jC(PC);
var Me = typeof Map == "function" && Map.prototype, Gg = Object.getOwnPropertyDescriptor && Me ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, tg = Me && Gg && typeof Gg.get == "function" ? Gg.get : null, Ve = Me && Map.prototype.forEach, Ke = typeof Set == "function" && Set.prototype, Fg = Object.getOwnPropertyDescriptor && Ke ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, Bg = Ke && Fg && typeof Fg.get == "function" ? Fg.get : null, _e = Ke && Set.prototype.forEach, VC = typeof WeakMap == "function" && WeakMap.prototype, cI = VC ? WeakMap.prototype.has : null, _C = typeof WeakSet == "function" && WeakSet.prototype, hI = _C ? WeakSet.prototype.has : null, zC = typeof WeakRef == "function" && WeakRef.prototype, ze = zC ? WeakRef.prototype.deref : null, XC = Boolean.prototype.valueOf, $C = Object.prototype.toString, Ar = Function.prototype.toString, Ir = String.prototype.match, be = String.prototype.slice, UA = String.prototype.replace, gr = String.prototype.toUpperCase, Xe = String.prototype.toLowerCase, FB = RegExp.prototype.test, $e = Array.prototype.concat, dA = Array.prototype.join, er = Array.prototype.slice, At = Math.floor, ae = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, Ng = Object.getOwnPropertySymbols, se = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, eI = typeof Symbol == "function" && typeof Symbol.iterator == "object", lI = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === eI || !0) ? Symbol.toStringTag : null, NB = Object.prototype.propertyIsEnumerable, It = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(g) {
  return g.__proto__;
} : null);
function gt(g, I) {
  if (g === 1 / 0 || g === -1 / 0 || g !== g || g && g > -1e3 && g < 1e3 || FB.call(/e/, I))
    return I;
  var A = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof g == "number") {
    var e = g < 0 ? -At(-g) : At(g);
    if (e !== g) {
      var t = String(e), B = be.call(I, t.length + 1);
      return UA.call(t, A, "$&_") + "." + UA.call(UA.call(B, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return UA.call(I, A, "$&_");
}
var ne = WC, et = ne.custom, tt = kB(et) ? et : null, pB = {
  __proto__: null,
  double: '"',
  single: "'"
}, tr = {
  __proto__: null,
  double: /(["\\])/g,
  single: /(['\\])/g
}, Eg = function g(I, A, e, t) {
  var B = A || {};
  if (FA(B, "quoteStyle") && !FA(pB, B.quoteStyle))
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (FA(B, "maxStringLength") && (typeof B.maxStringLength == "number" ? B.maxStringLength < 0 && B.maxStringLength !== 1 / 0 : B.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var C = FA(B, "customInspect") ? B.customInspect : !0;
  if (typeof C != "boolean" && C !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (FA(B, "indent") && B.indent !== null && B.indent !== "	" && !(parseInt(B.indent, 10) === B.indent && B.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (FA(B, "numericSeparator") && typeof B.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var i = B.numericSeparator;
  if (typeof I > "u")
    return "undefined";
  if (I === null)
    return "null";
  if (typeof I == "boolean")
    return I ? "true" : "false";
  if (typeof I == "string")
    return UB(I, B);
  if (typeof I == "number") {
    if (I === 0)
      return 1 / 0 / I > 0 ? "0" : "-0";
    var o = String(I);
    return i ? gt(I, o) : o;
  }
  if (typeof I == "bigint") {
    var r = String(I) + "n";
    return i ? gt(I, r) : r;
  }
  var Q = typeof B.depth > "u" ? 5 : B.depth;
  if (typeof e > "u" && (e = 0), e >= Q && Q > 0 && typeof I == "object")
    return ce(I) ? "[Array]" : "[Object]";
  var s = ur(B, e);
  if (typeof t > "u")
    t = [];
  else if (LB(t, I) >= 0)
    return "[Circular]";
  function E(L, b, Y) {
    if (b && (t = er.call(t), t.push(b)), Y) {
      var v = {
        depth: B.depth
      };
      return FA(B, "quoteStyle") && (v.quoteStyle = B.quoteStyle), g(L, v, e + 1, t);
    }
    return g(L, B, e + 1, t);
  }
  if (typeof I == "function" && !Bt(I)) {
    var a = sr(I), n = mI(I, E);
    return "[Function" + (a ? ": " + a : " (anonymous)") + "]" + (n.length > 0 ? " { " + dA.call(n, ", ") + " }" : "");
  }
  if (kB(I)) {
    var h = eI ? UA.call(String(I), /^(Symbol\(.*\))_[^)]*$/, "$1") : se.call(I);
    return typeof I == "object" && !eI ? oI(h) : h;
  }
  if (yr(I)) {
    for (var c = "<" + Xe.call(String(I.nodeName)), D = I.attributes || [], y = 0; y < D.length; y++)
      c += " " + D[y].name + "=" + RB(Br(D[y].value), "double", B);
    return c += ">", I.childNodes && I.childNodes.length && (c += "..."), c += "</" + Xe.call(String(I.nodeName)) + ">", c;
  }
  if (ce(I)) {
    if (I.length === 0)
      return "[]";
    var d = mI(I, E);
    return s && !wr(d) ? "[" + he(d, s) + "]" : "[ " + dA.call(d, ", ") + " ]";
  }
  if (Cr(I)) {
    var l = mI(I, E);
    return !("cause" in Error.prototype) && "cause" in I && !NB.call(I, "cause") ? "{ [" + String(I) + "] " + dA.call($e.call("[cause]: " + E(I.cause), l), ", ") + " }" : l.length === 0 ? "[" + String(I) + "]" : "{ [" + String(I) + "] " + dA.call(l, ", ") + " }";
  }
  if (typeof I == "object" && C) {
    if (tt && typeof I[tt] == "function" && ne)
      return ne(I, { depth: Q - e });
    if (C !== "symbol" && typeof I.inspect == "function")
      return I.inspect();
  }
  if (nr(I)) {
    var w = [];
    return Ve && Ve.call(I, function(L, b) {
      w.push(E(b, I, !0) + " => " + E(L, I));
    }), it("Map", tg.call(I), w, s);
  }
  if (lr(I)) {
    var S = [];
    return _e && _e.call(I, function(L) {
      S.push(E(L, I));
    }), it("Set", Bg.call(I), S, s);
  }
  if (cr(I))
    return pg("WeakMap");
  if (fr(I))
    return pg("WeakSet");
  if (hr(I))
    return pg("WeakRef");
  if (Qr(I))
    return oI(E(Number(I)));
  if (Er(I))
    return oI(E(ae.call(I)));
  if (or(I))
    return oI(XC.call(I));
  if (rr(I))
    return oI(E(String(I)));
  if (typeof window < "u" && I === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && I === globalThis || typeof nI < "u" && I === nI)
    return "{ [object globalThis] }";
  if (!ir(I) && !Bt(I)) {
    var G = mI(I, E), f = It ? It(I) === Object.prototype : I instanceof Object || I.constructor === Object, F = I instanceof Object ? "" : "null prototype", N = !f && lI && Object(I) === I && lI in I ? be.call(mA(I), 8, -1) : F ? "Object" : "", p = f || typeof I.constructor != "function" ? "" : I.constructor.name ? I.constructor.name + " " : "", J = p + (N || F ? "[" + dA.call($e.call([], N || [], F || []), ": ") + "] " : "");
    return G.length === 0 ? J + "{}" : s ? J + "{" + he(G, s) + "}" : J + "{ " + dA.call(G, ", ") + " }";
  }
  return String(I);
};
function RB(g, I, A) {
  var e = A.quoteStyle || I, t = pB[e];
  return t + g + t;
}
function Br(g) {
  return UA.call(String(g), /"/g, "&quot;");
}
function OA(g) {
  return !lI || !(typeof g == "object" && (lI in g || typeof g[lI] < "u"));
}
function ce(g) {
  return mA(g) === "[object Array]" && OA(g);
}
function ir(g) {
  return mA(g) === "[object Date]" && OA(g);
}
function Bt(g) {
  return mA(g) === "[object RegExp]" && OA(g);
}
function Cr(g) {
  return mA(g) === "[object Error]" && OA(g);
}
function rr(g) {
  return mA(g) === "[object String]" && OA(g);
}
function Qr(g) {
  return mA(g) === "[object Number]" && OA(g);
}
function or(g) {
  return mA(g) === "[object Boolean]" && OA(g);
}
function kB(g) {
  if (eI)
    return g && typeof g == "object" && g instanceof Symbol;
  if (typeof g == "symbol")
    return !0;
  if (!g || typeof g != "object" || !se)
    return !1;
  try {
    return se.call(g), !0;
  } catch {
  }
  return !1;
}
function Er(g) {
  if (!g || typeof g != "object" || !ae)
    return !1;
  try {
    return ae.call(g), !0;
  } catch {
  }
  return !1;
}
var ar = Object.prototype.hasOwnProperty || function(g) {
  return g in this;
};
function FA(g, I) {
  return ar.call(g, I);
}
function mA(g) {
  return $C.call(g);
}
function sr(g) {
  if (g.name)
    return g.name;
  var I = Ir.call(Ar.call(g), /^function\s*([\w$]+)/);
  return I ? I[1] : null;
}
function LB(g, I) {
  if (g.indexOf)
    return g.indexOf(I);
  for (var A = 0, e = g.length; A < e; A++)
    if (g[A] === I)
      return A;
  return -1;
}
function nr(g) {
  if (!tg || !g || typeof g != "object")
    return !1;
  try {
    tg.call(g);
    try {
      Bg.call(g);
    } catch {
      return !0;
    }
    return g instanceof Map;
  } catch {
  }
  return !1;
}
function cr(g) {
  if (!cI || !g || typeof g != "object")
    return !1;
  try {
    cI.call(g, cI);
    try {
      hI.call(g, hI);
    } catch {
      return !0;
    }
    return g instanceof WeakMap;
  } catch {
  }
  return !1;
}
function hr(g) {
  if (!ze || !g || typeof g != "object")
    return !1;
  try {
    return ze.call(g), !0;
  } catch {
  }
  return !1;
}
function lr(g) {
  if (!Bg || !g || typeof g != "object")
    return !1;
  try {
    Bg.call(g);
    try {
      tg.call(g);
    } catch {
      return !0;
    }
    return g instanceof Set;
  } catch {
  }
  return !1;
}
function fr(g) {
  if (!hI || !g || typeof g != "object")
    return !1;
  try {
    hI.call(g, hI);
    try {
      cI.call(g, cI);
    } catch {
      return !0;
    }
    return g instanceof WeakSet;
  } catch {
  }
  return !1;
}
function yr(g) {
  return !g || typeof g != "object" ? !1 : typeof HTMLElement < "u" && g instanceof HTMLElement ? !0 : typeof g.nodeName == "string" && typeof g.getAttribute == "function";
}
function UB(g, I) {
  if (g.length > I.maxStringLength) {
    var A = g.length - I.maxStringLength, e = "... " + A + " more character" + (A > 1 ? "s" : "");
    return UB(be.call(g, 0, I.maxStringLength), I) + e;
  }
  var t = tr[I.quoteStyle || "single"];
  t.lastIndex = 0;
  var B = UA.call(UA.call(g, t, "\\$1"), /[\x00-\x1f]/g, Dr);
  return RB(B, "single", I);
}
function Dr(g) {
  var I = g.charCodeAt(0), A = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[I];
  return A ? "\\" + A : "\\x" + (I < 16 ? "0" : "") + gr.call(I.toString(16));
}
function oI(g) {
  return "Object(" + g + ")";
}
function pg(g) {
  return g + " { ? }";
}
function it(g, I, A, e) {
  var t = e ? he(A, e) : dA.call(A, ", ");
  return g + " (" + I + ") {" + t + "}";
}
function wr(g) {
  for (var I = 0; I < g.length; I++)
    if (LB(g[I], `
`) >= 0)
      return !1;
  return !0;
}
function ur(g, I) {
  var A;
  if (g.indent === "	")
    A = "	";
  else if (typeof g.indent == "number" && g.indent > 0)
    A = dA.call(Array(g.indent + 1), " ");
  else
    return null;
  return {
    base: A,
    prev: dA.call(Array(I + 1), A)
  };
}
function he(g, I) {
  if (g.length === 0)
    return "";
  var A = `
` + I.prev + I.base;
  return A + dA.call(g, "," + A) + `
` + I.prev;
}
function mI(g, I) {
  var A = ce(g), e = [];
  if (A) {
    e.length = g.length;
    for (var t = 0; t < g.length; t++)
      e[t] = FA(g, t) ? I(g[t], g) : "";
  }
  var B = typeof Ng == "function" ? Ng(g) : [], C;
  if (eI) {
    C = {};
    for (var i = 0; i < B.length; i++)
      C["$" + B[i]] = B[i];
  }
  for (var o in g)
    FA(g, o) && (A && String(Number(o)) === o && o < g.length || eI && C["$" + o] instanceof Symbol || (FB.call(/[^\w$]/, o) ? e.push(I(o, g) + ": " + I(g[o], g)) : e.push(o + ": " + I(g[o], g))));
  if (typeof Ng == "function")
    for (var r = 0; r < B.length; r++)
      NB.call(g, B[r]) && e.push("[" + I(B[r]) + "]: " + I(g[B[r]], g));
  return e;
}
var dr = Eg, Sr = rI, ag = function(g, I, A) {
  for (var e = g, t; (t = e.next) != null; e = t)
    if (t.key === I)
      return e.next = t.next, A || (t.next = /** @type {NonNullable<typeof list.next>} */
      g.next, g.next = t), t;
}, Gr = function(g, I) {
  if (g) {
    var A = ag(g, I);
    return A && A.value;
  }
}, Fr = function(g, I, A) {
  var e = ag(g, I);
  e ? e.value = A : g.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: I,
    next: g.next,
    value: A
  };
}, Nr = function(g, I) {
  return g ? !!ag(g, I) : !1;
}, pr = function(g, I) {
  if (g)
    return ag(g, I, !0);
}, Rr = function() {
  var I, A = {
    assert: function(e) {
      if (!A.has(e))
        throw new Sr("Side channel does not contain " + dr(e));
    },
    delete: function(e) {
      var t = I && I.next, B = pr(I, e);
      return B && t && t === B && (I = void 0), !!B;
    },
    get: function(e) {
      return Gr(I, e);
    },
    has: function(e) {
      return Nr(I, e);
    },
    set: function(e, t) {
      I || (I = {
        next: void 0
      }), Fr(
        /** @type {NonNullable<typeof $o>} */
        I,
        e,
        t
      );
    }
  };
  return A;
}, YB = Object, kr = Error, Lr = EvalError, Ur = RangeError, Yr = ReferenceError, mr = SyntaxError, Mr = URIError, Kr = Math.abs, br = Math.floor, Jr = Math.max, Hr = Math.min, qr = Math.pow, xr = Math.round, Or = Number.isNaN || function(I) {
  return I !== I;
}, Tr = Or, vr = function(I) {
  return Tr(I) || I === 0 ? I : I < 0 ? -1 : 1;
}, Pr = Object.getOwnPropertyDescriptor, zI = Pr;
if (zI)
  try {
    zI([], "length");
  } catch {
    zI = null;
  }
var mB = zI, XI = Object.defineProperty || !1;
if (XI)
  try {
    XI({}, "a", { value: 1 });
  } catch {
    XI = !1;
  }
var jr = XI, Rg, Ct;
function Zr() {
  return Ct || (Ct = 1, Rg = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var I = {}, A = Symbol("test"), e = Object(A);
    if (typeof A == "string" || Object.prototype.toString.call(A) !== "[object Symbol]" || Object.prototype.toString.call(e) !== "[object Symbol]")
      return !1;
    var t = 42;
    I[A] = t;
    for (var B in I)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(I).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(I).length !== 0)
      return !1;
    var C = Object.getOwnPropertySymbols(I);
    if (C.length !== 1 || C[0] !== A || !Object.prototype.propertyIsEnumerable.call(I, A))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var i = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(I, A)
      );
      if (i.value !== t || i.enumerable !== !0)
        return !1;
    }
    return !0;
  }), Rg;
}
var kg, rt;
function Wr() {
  if (rt) return kg;
  rt = 1;
  var g = typeof Symbol < "u" && Symbol, I = Zr();
  return kg = function() {
    return typeof g != "function" || typeof Symbol != "function" || typeof g("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : I();
  }, kg;
}
var Lg, Qt;
function MB() {
  return Qt || (Qt = 1, Lg = typeof Reflect < "u" && Reflect.getPrototypeOf || null), Lg;
}
var Ug, ot;
function KB() {
  if (ot) return Ug;
  ot = 1;
  var g = YB;
  return Ug = g.getPrototypeOf || null, Ug;
}
var Yg, Et;
function Vr() {
  if (Et) return Yg;
  Et = 1;
  var g = "Function.prototype.bind called on incompatible ", I = Object.prototype.toString, A = Math.max, e = "[object Function]", t = function(o, r) {
    for (var Q = [], s = 0; s < o.length; s += 1)
      Q[s] = o[s];
    for (var E = 0; E < r.length; E += 1)
      Q[E + o.length] = r[E];
    return Q;
  }, B = function(o, r) {
    for (var Q = [], s = r, E = 0; s < o.length; s += 1, E += 1)
      Q[E] = o[s];
    return Q;
  }, C = function(i, o) {
    for (var r = "", Q = 0; Q < i.length; Q += 1)
      r += i[Q], Q + 1 < i.length && (r += o);
    return r;
  };
  return Yg = function(o) {
    var r = this;
    if (typeof r != "function" || I.apply(r) !== e)
      throw new TypeError(g + r);
    for (var Q = B(arguments, 1), s, E = function() {
      if (this instanceof s) {
        var D = r.apply(
          this,
          t(Q, arguments)
        );
        return Object(D) === D ? D : this;
      }
      return r.apply(
        o,
        t(Q, arguments)
      );
    }, a = A(0, r.length - Q.length), n = [], h = 0; h < a; h++)
      n[h] = "$" + h;
    if (s = Function("binder", "return function (" + C(n, ",") + "){ return binder.apply(this,arguments); }")(E), r.prototype) {
      var c = function() {
      };
      c.prototype = r.prototype, s.prototype = new c(), c.prototype = null;
    }
    return s;
  }, Yg;
}
var mg, at;
function sg() {
  if (at) return mg;
  at = 1;
  var g = Vr();
  return mg = Function.prototype.bind || g, mg;
}
var Mg, st;
function Je() {
  return st || (st = 1, Mg = Function.prototype.call), Mg;
}
var Kg, nt;
function bB() {
  return nt || (nt = 1, Kg = Function.prototype.apply), Kg;
}
var _r = typeof Reflect < "u" && Reflect && Reflect.apply, zr = sg(), Xr = bB(), $r = Je(), AQ = _r, IQ = AQ || zr.call($r, Xr), gQ = sg(), eQ = rI, tQ = Je(), BQ = IQ, JB = function(I) {
  if (I.length < 1 || typeof I[0] != "function")
    throw new eQ("a function is required");
  return BQ(gQ, tQ, I);
}, bg, ct;
function iQ() {
  if (ct) return bg;
  ct = 1;
  var g = JB, I = mB, A;
  try {
    A = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (C) {
    if (!C || typeof C != "object" || !("code" in C) || C.code !== "ERR_PROTO_ACCESS")
      throw C;
  }
  var e = !!A && I && I(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), t = Object, B = t.getPrototypeOf;
  return bg = e && typeof e.get == "function" ? g([e.get]) : typeof B == "function" ? (
    /** @type {import('./get')} */
    function(i) {
      return B(i == null ? i : t(i));
    }
  ) : !1, bg;
}
var Jg, ht;
function CQ() {
  if (ht) return Jg;
  ht = 1;
  var g = MB(), I = KB(), A = iQ();
  return Jg = g ? function(t) {
    return g(t);
  } : I ? function(t) {
    if (!t || typeof t != "object" && typeof t != "function")
      throw new TypeError("getProto: not an object");
    return I(t);
  } : A ? function(t) {
    return A(t);
  } : null, Jg;
}
var Hg, lt;
function rQ() {
  if (lt) return Hg;
  lt = 1;
  var g = Function.prototype.call, I = Object.prototype.hasOwnProperty, A = sg();
  return Hg = A.call(g, I), Hg;
}
var q, QQ = YB, oQ = kr, EQ = Lr, aQ = Ur, sQ = Yr, tI = mr, $A = rI, nQ = Mr, cQ = Kr, hQ = br, lQ = Jr, fQ = Hr, yQ = qr, DQ = xr, wQ = vr, HB = Function, qg = function(g) {
  try {
    return HB('"use strict"; return (' + g + ").constructor;")();
  } catch {
  }
}, GI = mB, uQ = jr, xg = function() {
  throw new $A();
}, dQ = GI ? function() {
  try {
    return arguments.callee, xg;
  } catch {
    try {
      return GI(arguments, "callee").get;
    } catch {
      return xg;
    }
  }
}() : xg, vA = Wr()(), iA = CQ(), SQ = KB(), GQ = MB(), qB = bB(), RI = Je(), WA = {}, FQ = typeof Uint8Array > "u" || !iA ? q : iA(Uint8Array), HA = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? q : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? q : ArrayBuffer,
  "%ArrayIteratorPrototype%": vA && iA ? iA([][Symbol.iterator]()) : q,
  "%AsyncFromSyncIteratorPrototype%": q,
  "%AsyncFunction%": WA,
  "%AsyncGenerator%": WA,
  "%AsyncGeneratorFunction%": WA,
  "%AsyncIteratorPrototype%": WA,
  "%Atomics%": typeof Atomics > "u" ? q : Atomics,
  "%BigInt%": typeof BigInt > "u" ? q : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? q : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? q : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? q : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": oQ,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": EQ,
  "%Float16Array%": typeof Float16Array > "u" ? q : Float16Array,
  "%Float32Array%": typeof Float32Array > "u" ? q : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? q : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? q : FinalizationRegistry,
  "%Function%": HB,
  "%GeneratorFunction%": WA,
  "%Int8Array%": typeof Int8Array > "u" ? q : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? q : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? q : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": vA && iA ? iA(iA([][Symbol.iterator]())) : q,
  "%JSON%": typeof JSON == "object" ? JSON : q,
  "%Map%": typeof Map > "u" ? q : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !vA || !iA ? q : iA((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": QQ,
  "%Object.getOwnPropertyDescriptor%": GI,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? q : Promise,
  "%Proxy%": typeof Proxy > "u" ? q : Proxy,
  "%RangeError%": aQ,
  "%ReferenceError%": sQ,
  "%Reflect%": typeof Reflect > "u" ? q : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? q : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !vA || !iA ? q : iA((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? q : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": vA && iA ? iA(""[Symbol.iterator]()) : q,
  "%Symbol%": vA ? Symbol : q,
  "%SyntaxError%": tI,
  "%ThrowTypeError%": dQ,
  "%TypedArray%": FQ,
  "%TypeError%": $A,
  "%Uint8Array%": typeof Uint8Array > "u" ? q : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? q : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? q : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? q : Uint32Array,
  "%URIError%": nQ,
  "%WeakMap%": typeof WeakMap > "u" ? q : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? q : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? q : WeakSet,
  "%Function.prototype.call%": RI,
  "%Function.prototype.apply%": qB,
  "%Object.defineProperty%": uQ,
  "%Object.getPrototypeOf%": SQ,
  "%Math.abs%": cQ,
  "%Math.floor%": hQ,
  "%Math.max%": lQ,
  "%Math.min%": fQ,
  "%Math.pow%": yQ,
  "%Math.round%": DQ,
  "%Math.sign%": wQ,
  "%Reflect.getPrototypeOf%": GQ
};
if (iA)
  try {
    null.error;
  } catch (g) {
    var NQ = iA(iA(g));
    HA["%Error.prototype%"] = NQ;
  }
var pQ = function g(I) {
  var A;
  if (I === "%AsyncFunction%")
    A = qg("async function () {}");
  else if (I === "%GeneratorFunction%")
    A = qg("function* () {}");
  else if (I === "%AsyncGeneratorFunction%")
    A = qg("async function* () {}");
  else if (I === "%AsyncGenerator%") {
    var e = g("%AsyncGeneratorFunction%");
    e && (A = e.prototype);
  } else if (I === "%AsyncIteratorPrototype%") {
    var t = g("%AsyncGenerator%");
    t && iA && (A = iA(t.prototype));
  }
  return HA[I] = A, A;
}, ft = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, kI = sg(), ig = rQ(), RQ = kI.call(RI, Array.prototype.concat), kQ = kI.call(qB, Array.prototype.splice), yt = kI.call(RI, String.prototype.replace), Cg = kI.call(RI, String.prototype.slice), LQ = kI.call(RI, RegExp.prototype.exec), UQ = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, YQ = /\\(\\)?/g, mQ = function(I) {
  var A = Cg(I, 0, 1), e = Cg(I, -1);
  if (A === "%" && e !== "%")
    throw new tI("invalid intrinsic syntax, expected closing `%`");
  if (e === "%" && A !== "%")
    throw new tI("invalid intrinsic syntax, expected opening `%`");
  var t = [];
  return yt(I, UQ, function(B, C, i, o) {
    t[t.length] = i ? yt(o, YQ, "$1") : C || B;
  }), t;
}, MQ = function(I, A) {
  var e = I, t;
  if (ig(ft, e) && (t = ft[e], e = "%" + t[0] + "%"), ig(HA, e)) {
    var B = HA[e];
    if (B === WA && (B = pQ(e)), typeof B > "u" && !A)
      throw new $A("intrinsic " + I + " exists, but is not available. Please file an issue!");
    return {
      alias: t,
      name: e,
      value: B
    };
  }
  throw new tI("intrinsic " + I + " does not exist!");
}, He = function(I, A) {
  if (typeof I != "string" || I.length === 0)
    throw new $A("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof A != "boolean")
    throw new $A('"allowMissing" argument must be a boolean');
  if (LQ(/^%?[^%]*%?$/, I) === null)
    throw new tI("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var e = mQ(I), t = e.length > 0 ? e[0] : "", B = MQ("%" + t + "%", A), C = B.name, i = B.value, o = !1, r = B.alias;
  r && (t = r[0], kQ(e, RQ([0, 1], r)));
  for (var Q = 1, s = !0; Q < e.length; Q += 1) {
    var E = e[Q], a = Cg(E, 0, 1), n = Cg(E, -1);
    if ((a === '"' || a === "'" || a === "`" || n === '"' || n === "'" || n === "`") && a !== n)
      throw new tI("property names with quotes must have matching quotes");
    if ((E === "constructor" || !s) && (o = !0), t += "." + E, C = "%" + t + "%", ig(HA, C))
      i = HA[C];
    else if (i != null) {
      if (!(E in i)) {
        if (!A)
          throw new $A("base intrinsic for " + I + " exists, but the property is not available.");
        return;
      }
      if (GI && Q + 1 >= e.length) {
        var h = GI(i, E);
        s = !!h, s && "get" in h && !("originalValue" in h.get) ? i = h.get : i = i[E];
      } else
        s = ig(i, E), i = i[E];
      s && !o && (HA[C] = i);
    }
  }
  return i;
}, xB = He, OB = JB, KQ = OB([xB("%String.prototype.indexOf%")]), TB = function(I, A) {
  var e = (
    /** @type {(this: unknown, ...args: unknown[]) => unknown} */
    xB(I, !!A)
  );
  return typeof e == "function" && KQ(I, ".prototype.") > -1 ? OB(
    /** @type {const} */
    [e]
  ) : e;
}, bQ = He, LI = TB, JQ = Eg, HQ = rI, Dt = bQ("%Map%", !0), qQ = LI("Map.prototype.get", !0), xQ = LI("Map.prototype.set", !0), OQ = LI("Map.prototype.has", !0), TQ = LI("Map.prototype.delete", !0), vQ = LI("Map.prototype.size", !0), vB = !!Dt && /** @type {Exclude<import('.'), false>} */
function() {
  var I, A = {
    assert: function(e) {
      if (!A.has(e))
        throw new HQ("Side channel does not contain " + JQ(e));
    },
    delete: function(e) {
      if (I) {
        var t = TQ(I, e);
        return vQ(I) === 0 && (I = void 0), t;
      }
      return !1;
    },
    get: function(e) {
      if (I)
        return qQ(I, e);
    },
    has: function(e) {
      return I ? OQ(I, e) : !1;
    },
    set: function(e, t) {
      I || (I = new Dt()), xQ(I, e, t);
    }
  };
  return A;
}, PQ = He, ng = TB, jQ = Eg, MI = vB, ZQ = rI, PA = PQ("%WeakMap%", !0), WQ = ng("WeakMap.prototype.get", !0), VQ = ng("WeakMap.prototype.set", !0), _Q = ng("WeakMap.prototype.has", !0), zQ = ng("WeakMap.prototype.delete", !0), XQ = PA ? (
  /** @type {Exclude<import('.'), false>} */
  function() {
    var I, A, e = {
      assert: function(t) {
        if (!e.has(t))
          throw new ZQ("Side channel does not contain " + jQ(t));
      },
      delete: function(t) {
        if (PA && t && (typeof t == "object" || typeof t == "function")) {
          if (I)
            return zQ(I, t);
        } else if (MI && A)
          return A.delete(t);
        return !1;
      },
      get: function(t) {
        return PA && t && (typeof t == "object" || typeof t == "function") && I ? WQ(I, t) : A && A.get(t);
      },
      has: function(t) {
        return PA && t && (typeof t == "object" || typeof t == "function") && I ? _Q(I, t) : !!A && A.has(t);
      },
      set: function(t, B) {
        PA && t && (typeof t == "object" || typeof t == "function") ? (I || (I = new PA()), VQ(I, t, B)) : MI && (A || (A = MI()), A.set(t, B));
      }
    };
    return e;
  }
) : MI, $Q = rI, Ao = Eg, Io = Rr, go = vB, eo = XQ, to = eo || go || Io, PB = function() {
  var I, A = {
    assert: function(e) {
      if (!A.has(e))
        throw new $Q("Side channel does not contain " + Ao(e));
    },
    delete: function(e) {
      return !!I && I.delete(e);
    },
    get: function(e) {
      return I && I.get(e);
    },
    has: function(e) {
      return !!I && I.has(e);
    },
    set: function(e, t) {
      I || (I = to()), I.set(e, t);
    }
  };
  return A;
}, Bo = String.prototype.replace, io = /%20/g, Og = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, qe = {
  default: Og.RFC3986,
  formatters: {
    RFC1738: function(g) {
      return Bo.call(g, io, "+");
    },
    RFC3986: function(g) {
      return String(g);
    }
  },
  RFC1738: Og.RFC1738,
  RFC3986: Og.RFC3986
}, Co = qe, ro = PB, Tg = Object.prototype.hasOwnProperty, JA = Array.isArray, cg = ro(), jB = function(I, A) {
  return cg.set(I, A), I;
}, rg = function(I) {
  return cg.has(I);
}, le = function(I) {
  return cg.get(I);
}, ZB = function(I, A) {
  cg.set(I, A);
}, yA = function() {
  for (var g = [], I = 0; I < 256; ++I)
    g.push("%" + ((I < 16 ? "0" : "") + I.toString(16)).toUpperCase());
  return g;
}(), Qo = function(I) {
  for (; I.length > 1; ) {
    var A = I.pop(), e = A.obj[A.prop];
    if (JA(e)) {
      for (var t = [], B = 0; B < e.length; ++B)
        typeof e[B] < "u" && t.push(e[B]);
      A.obj[A.prop] = t;
    }
  }
}, xe = function(I, A) {
  for (var e = A && A.plainObjects ? { __proto__: null } : {}, t = 0; t < I.length; ++t)
    typeof I[t] < "u" && (e[t] = I[t]);
  return e;
}, oo = function g(I, A, e) {
  if (!A)
    return I;
  if (typeof A != "object" && typeof A != "function") {
    if (JA(I))
      I.push(A);
    else if (I && typeof I == "object")
      if (rg(I)) {
        var t = le(I) + 1;
        I[t] = A, ZB(I, t);
      } else (e && (e.plainObjects || e.allowPrototypes) || !Tg.call(Object.prototype, A)) && (I[A] = !0);
    else
      return [I, A];
    return I;
  }
  if (!I || typeof I != "object") {
    if (rg(A)) {
      for (var B = Object.keys(A), C = e && e.plainObjects ? { __proto__: null, 0: I } : { 0: I }, i = 0; i < B.length; i++) {
        var o = parseInt(B[i], 10);
        C[o + 1] = A[B[i]];
      }
      return jB(C, le(A) + 1);
    }
    return [I].concat(A);
  }
  var r = I;
  return JA(I) && !JA(A) && (r = xe(I, e)), JA(I) && JA(A) ? (A.forEach(function(Q, s) {
    if (Tg.call(I, s)) {
      var E = I[s];
      E && typeof E == "object" && Q && typeof Q == "object" ? I[s] = g(E, Q, e) : I.push(Q);
    } else
      I[s] = Q;
  }), I) : Object.keys(A).reduce(function(Q, s) {
    var E = A[s];
    return Tg.call(Q, s) ? Q[s] = g(Q[s], E, e) : Q[s] = E, Q;
  }, r);
}, Eo = function(I, A) {
  return Object.keys(A).reduce(function(e, t) {
    return e[t] = A[t], e;
  }, I);
}, ao = function(g, I, A) {
  var e = g.replace(/\+/g, " ");
  if (A === "iso-8859-1")
    return e.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}, vg = 1024, so = function(I, A, e, t, B) {
  if (I.length === 0)
    return I;
  var C = I;
  if (typeof I == "symbol" ? C = Symbol.prototype.toString.call(I) : typeof I != "string" && (C = String(I)), e === "iso-8859-1")
    return escape(C).replace(/%u[0-9a-f]{4}/gi, function(a) {
      return "%26%23" + parseInt(a.slice(2), 16) + "%3B";
    });
  for (var i = "", o = 0; o < C.length; o += vg) {
    for (var r = C.length >= vg ? C.slice(o, o + vg) : C, Q = [], s = 0; s < r.length; ++s) {
      var E = r.charCodeAt(s);
      if (E === 45 || E === 46 || E === 95 || E === 126 || E >= 48 && E <= 57 || E >= 65 && E <= 90 || E >= 97 && E <= 122 || B === Co.RFC1738 && (E === 40 || E === 41)) {
        Q[Q.length] = r.charAt(s);
        continue;
      }
      if (E < 128) {
        Q[Q.length] = yA[E];
        continue;
      }
      if (E < 2048) {
        Q[Q.length] = yA[192 | E >> 6] + yA[128 | E & 63];
        continue;
      }
      if (E < 55296 || E >= 57344) {
        Q[Q.length] = yA[224 | E >> 12] + yA[128 | E >> 6 & 63] + yA[128 | E & 63];
        continue;
      }
      s += 1, E = 65536 + ((E & 1023) << 10 | r.charCodeAt(s) & 1023), Q[Q.length] = yA[240 | E >> 18] + yA[128 | E >> 12 & 63] + yA[128 | E >> 6 & 63] + yA[128 | E & 63];
    }
    i += Q.join("");
  }
  return i;
}, no = function(I) {
  for (var A = [{ obj: { o: I }, prop: "o" }], e = [], t = 0; t < A.length; ++t)
    for (var B = A[t], C = B.obj[B.prop], i = Object.keys(C), o = 0; o < i.length; ++o) {
      var r = i[o], Q = C[r];
      typeof Q == "object" && Q !== null && e.indexOf(Q) === -1 && (A.push({ obj: C, prop: r }), e.push(Q));
    }
  return Qo(A), I;
}, co = function(I) {
  return Object.prototype.toString.call(I) === "[object RegExp]";
}, ho = function(I) {
  return !I || typeof I != "object" ? !1 : !!(I.constructor && I.constructor.isBuffer && I.constructor.isBuffer(I));
}, lo = function(I, A, e, t) {
  if (rg(I)) {
    var B = le(I) + 1;
    return I[B] = A, ZB(I, B), I;
  }
  var C = [].concat(I, A);
  return C.length > e ? jB(xe(C, { plainObjects: t }), C.length - 1) : C;
}, fo = function(I, A) {
  if (JA(I)) {
    for (var e = [], t = 0; t < I.length; t += 1)
      e.push(A(I[t]));
    return e;
  }
  return A(I);
}, WB = {
  arrayToObject: xe,
  assign: Eo,
  combine: lo,
  compact: no,
  decode: ao,
  encode: so,
  isBuffer: ho,
  isOverflow: rg,
  isRegExp: co,
  maybeMap: fo,
  merge: oo
}, VB = PB, $I = WB, fI = qe, yo = Object.prototype.hasOwnProperty, _B = {
  brackets: function(I) {
    return I + "[]";
  },
  comma: "comma",
  indices: function(I, A) {
    return I + "[" + A + "]";
  },
  repeat: function(I) {
    return I;
  }
}, uA = Array.isArray, Do = Array.prototype.push, zB = function(g, I) {
  Do.apply(g, uA(I) ? I : [I]);
}, wo = Date.prototype.toISOString, wt = fI.default, tA = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  commaRoundTrip: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: $I.encode,
  encodeValuesOnly: !1,
  filter: void 0,
  format: wt,
  formatter: fI.formatters[wt],
  // deprecated
  indices: !1,
  serializeDate: function(I) {
    return wo.call(I);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, uo = function(I) {
  return typeof I == "string" || typeof I == "number" || typeof I == "boolean" || typeof I == "symbol" || typeof I == "bigint";
}, Pg = {}, So = function g(I, A, e, t, B, C, i, o, r, Q, s, E, a, n, h, c, D, y) {
  for (var d = I, l = y, w = 0, S = !1; (l = l.get(Pg)) !== void 0 && !S; ) {
    var G = l.get(I);
    if (w += 1, typeof G < "u") {
      if (G === w)
        throw new RangeError("Cyclic object value");
      S = !0;
    }
    typeof l.get(Pg) > "u" && (w = 0);
  }
  if (typeof Q == "function" ? d = Q(A, d) : d instanceof Date ? d = a(d) : e === "comma" && uA(d) && (d = $I.maybeMap(d, function(R) {
    return R instanceof Date ? a(R) : R;
  })), d === null) {
    if (C)
      return r && !c ? r(A, tA.encoder, D, "key", n) : A;
    d = "";
  }
  if (uo(d) || $I.isBuffer(d)) {
    if (r) {
      var f = c ? A : r(A, tA.encoder, D, "key", n);
      return [h(f) + "=" + h(r(d, tA.encoder, D, "value", n))];
    }
    return [h(A) + "=" + h(String(d))];
  }
  var F = [];
  if (typeof d > "u")
    return F;
  var N;
  if (e === "comma" && uA(d))
    c && r && (d = $I.maybeMap(d, r)), N = [{ value: d.length > 0 ? d.join(",") || null : void 0 }];
  else if (uA(Q))
    N = Q;
  else {
    var p = Object.keys(d);
    N = s ? p.sort(s) : p;
  }
  var J = o ? String(A).replace(/\./g, "%2E") : String(A), L = t && uA(d) && d.length === 1 ? J + "[]" : J;
  if (B && uA(d) && d.length === 0)
    return L + "[]";
  for (var b = 0; b < N.length; ++b) {
    var Y = N[b], v = typeof Y == "object" && Y && typeof Y.value < "u" ? Y.value : d[Y];
    if (!(i && v === null)) {
      var BA = E && o ? String(Y).replace(/\./g, "%2E") : String(Y), rA = uA(d) ? typeof e == "function" ? e(L, BA) : L : L + (E ? "." + BA : "[" + BA + "]");
      y.set(I, w);
      var QA = VB();
      QA.set(Pg, y), zB(F, g(
        v,
        rA,
        e,
        t,
        B,
        C,
        i,
        o,
        e === "comma" && c && uA(d) ? null : r,
        Q,
        s,
        E,
        a,
        n,
        h,
        c,
        D,
        QA
      ));
    }
  }
  return F;
}, Go = function(I) {
  if (!I)
    return tA;
  if (typeof I.allowEmptyArrays < "u" && typeof I.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof I.encodeDotInKeys < "u" && typeof I.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (I.encoder !== null && typeof I.encoder < "u" && typeof I.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var A = I.charset || tA.charset;
  if (typeof I.charset < "u" && I.charset !== "utf-8" && I.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var e = fI.default;
  if (typeof I.format < "u") {
    if (!yo.call(fI.formatters, I.format))
      throw new TypeError("Unknown format option provided.");
    e = I.format;
  }
  var t = fI.formatters[e], B = tA.filter;
  (typeof I.filter == "function" || uA(I.filter)) && (B = I.filter);
  var C;
  if (I.arrayFormat in _B ? C = I.arrayFormat : "indices" in I ? C = I.indices ? "indices" : "repeat" : C = tA.arrayFormat, "commaRoundTrip" in I && typeof I.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var i = typeof I.allowDots > "u" ? I.encodeDotInKeys === !0 ? !0 : tA.allowDots : !!I.allowDots;
  return {
    addQueryPrefix: typeof I.addQueryPrefix == "boolean" ? I.addQueryPrefix : tA.addQueryPrefix,
    allowDots: i,
    allowEmptyArrays: typeof I.allowEmptyArrays == "boolean" ? !!I.allowEmptyArrays : tA.allowEmptyArrays,
    arrayFormat: C,
    charset: A,
    charsetSentinel: typeof I.charsetSentinel == "boolean" ? I.charsetSentinel : tA.charsetSentinel,
    commaRoundTrip: !!I.commaRoundTrip,
    delimiter: typeof I.delimiter > "u" ? tA.delimiter : I.delimiter,
    encode: typeof I.encode == "boolean" ? I.encode : tA.encode,
    encodeDotInKeys: typeof I.encodeDotInKeys == "boolean" ? I.encodeDotInKeys : tA.encodeDotInKeys,
    encoder: typeof I.encoder == "function" ? I.encoder : tA.encoder,
    encodeValuesOnly: typeof I.encodeValuesOnly == "boolean" ? I.encodeValuesOnly : tA.encodeValuesOnly,
    filter: B,
    format: e,
    formatter: t,
    serializeDate: typeof I.serializeDate == "function" ? I.serializeDate : tA.serializeDate,
    skipNulls: typeof I.skipNulls == "boolean" ? I.skipNulls : tA.skipNulls,
    sort: typeof I.sort == "function" ? I.sort : null,
    strictNullHandling: typeof I.strictNullHandling == "boolean" ? I.strictNullHandling : tA.strictNullHandling
  };
}, Fo = function(g, I) {
  var A = g, e = Go(I), t, B;
  typeof e.filter == "function" ? (B = e.filter, A = B("", A)) : uA(e.filter) && (B = e.filter, t = B);
  var C = [];
  if (typeof A != "object" || A === null)
    return "";
  var i = _B[e.arrayFormat], o = i === "comma" && e.commaRoundTrip;
  t || (t = Object.keys(A)), e.sort && t.sort(e.sort);
  for (var r = VB(), Q = 0; Q < t.length; ++Q) {
    var s = t[Q], E = A[s];
    e.skipNulls && E === null || zB(C, So(
      E,
      s,
      i,
      o,
      e.allowEmptyArrays,
      e.strictNullHandling,
      e.skipNulls,
      e.encodeDotInKeys,
      e.encode ? e.encoder : null,
      e.filter,
      e.sort,
      e.allowDots,
      e.serializeDate,
      e.format,
      e.formatter,
      e.encodeValuesOnly,
      e.charset,
      r
    ));
  }
  var a = C.join(e.delimiter), n = e.addQueryPrefix === !0 ? "?" : "";
  return e.charsetSentinel && (e.charset === "iso-8859-1" ? n += "utf8=%26%2310003%3B&" : n += "utf8=%E2%9C%93&"), a.length > 0 ? n + a : "";
}, YA = WB, Ag = Object.prototype.hasOwnProperty, ut = Array.isArray, AA = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: YA.decode,
  delimiter: "&",
  depth: 5,
  duplicates: "combine",
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictDepth: !1,
  strictNullHandling: !1,
  throwOnLimitExceeded: !1
}, No = function(g) {
  return g.replace(/&#(\d+);/g, function(I, A) {
    return String.fromCharCode(parseInt(A, 10));
  });
}, XB = function(g, I, A) {
  if (g && typeof g == "string" && I.comma && g.indexOf(",") > -1)
    return g.split(",");
  if (I.throwOnLimitExceeded && A >= I.arrayLimit)
    throw new RangeError("Array limit exceeded. Only " + I.arrayLimit + " element" + (I.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
  return g;
}, po = "utf8=%26%2310003%3B", Ro = "utf8=%E2%9C%93", ko = function(I, A) {
  var e = { __proto__: null }, t = A.ignoreQueryPrefix ? I.replace(/^\?/, "") : I;
  t = t.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var B = A.parameterLimit === 1 / 0 ? void 0 : A.parameterLimit, C = t.split(
    A.delimiter,
    A.throwOnLimitExceeded ? B + 1 : B
  );
  if (A.throwOnLimitExceeded && C.length > B)
    throw new RangeError("Parameter limit exceeded. Only " + B + " parameter" + (B === 1 ? "" : "s") + " allowed.");
  var i = -1, o, r = A.charset;
  if (A.charsetSentinel)
    for (o = 0; o < C.length; ++o)
      C[o].indexOf("utf8=") === 0 && (C[o] === Ro ? r = "utf-8" : C[o] === po && (r = "iso-8859-1"), i = o, o = C.length);
  for (o = 0; o < C.length; ++o)
    if (o !== i) {
      var Q = C[o], s = Q.indexOf("]="), E = s === -1 ? Q.indexOf("=") : s + 1, a, n;
      if (E === -1 ? (a = A.decoder(Q, AA.decoder, r, "key"), n = A.strictNullHandling ? null : "") : (a = A.decoder(Q.slice(0, E), AA.decoder, r, "key"), a !== null && (n = YA.maybeMap(
        XB(
          Q.slice(E + 1),
          A,
          ut(e[a]) ? e[a].length : 0
        ),
        function(c) {
          return A.decoder(c, AA.decoder, r, "value");
        }
      ))), n && A.interpretNumericEntities && r === "iso-8859-1" && (n = No(String(n))), Q.indexOf("[]=") > -1 && (n = ut(n) ? [n] : n), a !== null) {
        var h = Ag.call(e, a);
        h && A.duplicates === "combine" ? e[a] = YA.combine(
          e[a],
          n,
          A.arrayLimit,
          A.plainObjects
        ) : (!h || A.duplicates === "last") && (e[a] = n);
      }
    }
  return e;
}, Lo = function(g, I, A, e) {
  var t = 0;
  if (g.length > 0 && g[g.length - 1] === "[]") {
    var B = g.slice(0, -1).join("");
    t = Array.isArray(I) && I[B] ? I[B].length : 0;
  }
  for (var C = e ? I : XB(I, A, t), i = g.length - 1; i >= 0; --i) {
    var o, r = g[i];
    if (r === "[]" && A.parseArrays)
      YA.isOverflow(C) ? o = C : o = A.allowEmptyArrays && (C === "" || A.strictNullHandling && C === null) ? [] : YA.combine(
        [],
        C,
        A.arrayLimit,
        A.plainObjects
      );
    else {
      o = A.plainObjects ? { __proto__: null } : {};
      var Q = r.charAt(0) === "[" && r.charAt(r.length - 1) === "]" ? r.slice(1, -1) : r, s = A.decodeDotInKeys ? Q.replace(/%2E/g, ".") : Q, E = parseInt(s, 10);
      !A.parseArrays && s === "" ? o = { 0: C } : !isNaN(E) && r !== s && String(E) === s && E >= 0 && A.parseArrays && E <= A.arrayLimit ? (o = [], o[E] = C) : s !== "__proto__" && (o[s] = C);
    }
    C = o;
  }
  return C;
}, Uo = function(I, A) {
  var e = A.allowDots ? I.replace(/\.([^.[]+)/g, "[$1]") : I;
  if (A.depth <= 0)
    return !A.plainObjects && Ag.call(Object.prototype, e) && !A.allowPrototypes ? void 0 : [e];
  var t = /(\[[^[\]]*])/, B = /(\[[^[\]]*])/g, C = t.exec(e), i = C ? e.slice(0, C.index) : e, o = [];
  if (i) {
    if (!A.plainObjects && Ag.call(Object.prototype, i) && !A.allowPrototypes)
      return;
    o.push(i);
  }
  for (var r = 0; (C = B.exec(e)) !== null && r < A.depth; ) {
    r += 1;
    var Q = C[1].slice(1, -1);
    if (!A.plainObjects && Ag.call(Object.prototype, Q) && !A.allowPrototypes)
      return;
    o.push(C[1]);
  }
  if (C) {
    if (A.strictDepth === !0)
      throw new RangeError("Input depth exceeded depth option of " + A.depth + " and strictDepth is true");
    o.push("[" + e.slice(C.index) + "]");
  }
  return o;
}, Yo = function(I, A, e, t) {
  if (I) {
    var B = Uo(I, e);
    if (B)
      return Lo(B, A, e, t);
  }
}, mo = function(I) {
  if (!I)
    return AA;
  if (typeof I.allowEmptyArrays < "u" && typeof I.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof I.decodeDotInKeys < "u" && typeof I.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (I.decoder !== null && typeof I.decoder < "u" && typeof I.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof I.charset < "u" && I.charset !== "utf-8" && I.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  if (typeof I.throwOnLimitExceeded < "u" && typeof I.throwOnLimitExceeded != "boolean")
    throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
  var A = typeof I.charset > "u" ? AA.charset : I.charset, e = typeof I.duplicates > "u" ? AA.duplicates : I.duplicates;
  if (e !== "combine" && e !== "first" && e !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var t = typeof I.allowDots > "u" ? I.decodeDotInKeys === !0 ? !0 : AA.allowDots : !!I.allowDots;
  return {
    allowDots: t,
    allowEmptyArrays: typeof I.allowEmptyArrays == "boolean" ? !!I.allowEmptyArrays : AA.allowEmptyArrays,
    allowPrototypes: typeof I.allowPrototypes == "boolean" ? I.allowPrototypes : AA.allowPrototypes,
    allowSparse: typeof I.allowSparse == "boolean" ? I.allowSparse : AA.allowSparse,
    arrayLimit: typeof I.arrayLimit == "number" ? I.arrayLimit : AA.arrayLimit,
    charset: A,
    charsetSentinel: typeof I.charsetSentinel == "boolean" ? I.charsetSentinel : AA.charsetSentinel,
    comma: typeof I.comma == "boolean" ? I.comma : AA.comma,
    decodeDotInKeys: typeof I.decodeDotInKeys == "boolean" ? I.decodeDotInKeys : AA.decodeDotInKeys,
    decoder: typeof I.decoder == "function" ? I.decoder : AA.decoder,
    delimiter: typeof I.delimiter == "string" || YA.isRegExp(I.delimiter) ? I.delimiter : AA.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof I.depth == "number" || I.depth === !1 ? +I.depth : AA.depth,
    duplicates: e,
    ignoreQueryPrefix: I.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof I.interpretNumericEntities == "boolean" ? I.interpretNumericEntities : AA.interpretNumericEntities,
    parameterLimit: typeof I.parameterLimit == "number" ? I.parameterLimit : AA.parameterLimit,
    parseArrays: I.parseArrays !== !1,
    plainObjects: typeof I.plainObjects == "boolean" ? I.plainObjects : AA.plainObjects,
    strictDepth: typeof I.strictDepth == "boolean" ? !!I.strictDepth : AA.strictDepth,
    strictNullHandling: typeof I.strictNullHandling == "boolean" ? I.strictNullHandling : AA.strictNullHandling,
    throwOnLimitExceeded: typeof I.throwOnLimitExceeded == "boolean" ? I.throwOnLimitExceeded : !1
  };
}, Mo = function(g, I) {
  var A = mo(I);
  if (g === "" || g === null || typeof g > "u")
    return A.plainObjects ? { __proto__: null } : {};
  for (var e = typeof g == "string" ? ko(g, A) : g, t = A.plainObjects ? { __proto__: null } : {}, B = Object.keys(e), C = 0; C < B.length; ++C) {
    var i = B[C], o = Yo(i, e[i], A, typeof g == "string");
    t = YA.merge(t, o, A);
  }
  return A.allowSparse === !0 ? t : YA.compact(t);
}, Ko = Fo, bo = Mo, Jo = qe, Ho = {
  formats: Jo,
  parse: bo,
  stringify: Ko
}, qo = ZC;
function sA() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
}
var xo = /^([a-z0-9.+-]+:)/i, Oo = /:[0-9]*$/, To = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, vo = [
  "<",
  ">",
  '"',
  "`",
  " ",
  "\r",
  `
`,
  "	"
], Po = [
  "{",
  "}",
  "|",
  "\\",
  "^",
  "`"
].concat(vo), fe = ["'"].concat(Po), dt = [
  "%",
  "/",
  "?",
  ";",
  "#"
].concat(fe), St = [
  "/",
  "?",
  "#"
], jo = 255, Gt = /^[+a-z0-9A-Z_-]{0,63}$/, Zo = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, Wo = {
  javascript: !0,
  "javascript:": !0
}, ye = {
  javascript: !0,
  "javascript:": !0
}, AI = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
}, De = Ho;
function UI(g, I, A) {
  if (g && typeof g == "object" && g instanceof sA)
    return g;
  var e = new sA();
  return e.parse(g, I, A), e;
}
sA.prototype.parse = function(g, I, A) {
  if (typeof g != "string")
    throw new TypeError("Parameter 'url' must be a string, not " + typeof g);
  var e = g.indexOf("?"), t = e !== -1 && e < g.indexOf("#") ? "?" : "#", B = g.split(t), C = /\\/g;
  B[0] = B[0].replace(C, "/"), g = B.join(t);
  var i = g;
  if (i = i.trim(), !A && g.split("#").length === 1) {
    var o = To.exec(i);
    if (o)
      return this.path = i, this.href = i, this.pathname = o[1], o[2] ? (this.search = o[2], I ? this.query = De.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : I && (this.search = "", this.query = {}), this;
  }
  var r = xo.exec(i);
  if (r) {
    r = r[0];
    var Q = r.toLowerCase();
    this.protocol = Q, i = i.substr(r.length);
  }
  if (A || r || i.match(/^\/\/[^@/]+@[^@/]+/)) {
    var s = i.substr(0, 2) === "//";
    s && !(r && ye[r]) && (i = i.substr(2), this.slashes = !0);
  }
  if (!ye[r] && (s || r && !AI[r])) {
    for (var E = -1, a = 0; a < St.length; a++) {
      var n = i.indexOf(St[a]);
      n !== -1 && (E === -1 || n < E) && (E = n);
    }
    var h, c;
    E === -1 ? c = i.lastIndexOf("@") : c = i.lastIndexOf("@", E), c !== -1 && (h = i.slice(0, c), i = i.slice(c + 1), this.auth = decodeURIComponent(h)), E = -1;
    for (var a = 0; a < dt.length; a++) {
      var n = i.indexOf(dt[a]);
      n !== -1 && (E === -1 || n < E) && (E = n);
    }
    E === -1 && (E = i.length), this.host = i.slice(0, E), i = i.slice(E), this.parseHost(), this.hostname = this.hostname || "";
    var D = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!D)
      for (var y = this.hostname.split(/\./), a = 0, d = y.length; a < d; a++) {
        var l = y[a];
        if (l && !l.match(Gt)) {
          for (var w = "", S = 0, G = l.length; S < G; S++)
            l.charCodeAt(S) > 127 ? w += "x" : w += l[S];
          if (!w.match(Gt)) {
            var f = y.slice(0, a), F = y.slice(a + 1), N = l.match(Zo);
            N && (f.push(N[1]), F.unshift(N[2])), F.length && (i = "/" + F.join(".") + i), this.hostname = f.join(".");
            break;
          }
        }
      }
    this.hostname.length > jo ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), D || (this.hostname = qo.toASCII(this.hostname));
    var p = this.port ? ":" + this.port : "", J = this.hostname || "";
    this.host = J + p, this.href += this.host, D && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), i[0] !== "/" && (i = "/" + i));
  }
  if (!Wo[Q])
    for (var a = 0, d = fe.length; a < d; a++) {
      var L = fe[a];
      if (i.indexOf(L) !== -1) {
        var b = encodeURIComponent(L);
        b === L && (b = escape(L)), i = i.split(L).join(b);
      }
    }
  var Y = i.indexOf("#");
  Y !== -1 && (this.hash = i.substr(Y), i = i.slice(0, Y));
  var v = i.indexOf("?");
  if (v !== -1 ? (this.search = i.substr(v), this.query = i.substr(v + 1), I && (this.query = De.parse(this.query)), i = i.slice(0, v)) : I && (this.search = "", this.query = {}), i && (this.pathname = i), AI[Q] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
    var p = this.pathname || "", BA = this.search || "";
    this.path = p + BA;
  }
  return this.href = this.format(), this;
};
function Vo(g) {
  return typeof g == "string" && (g = UI(g)), g instanceof sA ? g.format() : sA.prototype.format.call(g);
}
sA.prototype.format = function() {
  var g = this.auth || "";
  g && (g = encodeURIComponent(g), g = g.replace(/%3A/i, ":"), g += "@");
  var I = this.protocol || "", A = this.pathname || "", e = this.hash || "", t = !1, B = "";
  this.host ? t = g + this.host : this.hostname && (t = g + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (t += ":" + this.port)), this.query && typeof this.query == "object" && Object.keys(this.query).length && (B = De.stringify(this.query, {
    arrayFormat: "repeat",
    addQueryPrefix: !1
  }));
  var C = this.search || B && "?" + B || "";
  return I && I.substr(-1) !== ":" && (I += ":"), this.slashes || (!I || AI[I]) && t !== !1 ? (t = "//" + (t || ""), A && A.charAt(0) !== "/" && (A = "/" + A)) : t || (t = ""), e && e.charAt(0) !== "#" && (e = "#" + e), C && C.charAt(0) !== "?" && (C = "?" + C), A = A.replace(/[?#]/g, function(i) {
    return encodeURIComponent(i);
  }), C = C.replace("#", "%23"), I + t + A + C + e;
};
function _o(g, I) {
  return UI(g, !1, !0).resolve(I);
}
sA.prototype.resolve = function(g) {
  return this.resolveObject(UI(g, !1, !0)).format();
};
function zo(g, I) {
  return g ? UI(g, !1, !0).resolveObject(I) : I;
}
sA.prototype.resolveObject = function(g) {
  if (typeof g == "string") {
    var I = new sA();
    I.parse(g, !1, !0), g = I;
  }
  for (var A = new sA(), e = Object.keys(this), t = 0; t < e.length; t++) {
    var B = e[t];
    A[B] = this[B];
  }
  if (A.hash = g.hash, g.href === "")
    return A.href = A.format(), A;
  if (g.slashes && !g.protocol) {
    for (var C = Object.keys(g), i = 0; i < C.length; i++) {
      var o = C[i];
      o !== "protocol" && (A[o] = g[o]);
    }
    return AI[A.protocol] && A.hostname && !A.pathname && (A.pathname = "/", A.path = A.pathname), A.href = A.format(), A;
  }
  if (g.protocol && g.protocol !== A.protocol) {
    if (!AI[g.protocol]) {
      for (var r = Object.keys(g), Q = 0; Q < r.length; Q++) {
        var s = r[Q];
        A[s] = g[s];
      }
      return A.href = A.format(), A;
    }
    if (A.protocol = g.protocol, !g.host && !ye[g.protocol]) {
      for (var d = (g.pathname || "").split("/"); d.length && !(g.host = d.shift()); )
        ;
      g.host || (g.host = ""), g.hostname || (g.hostname = ""), d[0] !== "" && d.unshift(""), d.length < 2 && d.unshift(""), A.pathname = d.join("/");
    } else
      A.pathname = g.pathname;
    if (A.search = g.search, A.query = g.query, A.host = g.host || "", A.auth = g.auth, A.hostname = g.hostname || g.host, A.port = g.port, A.pathname || A.search) {
      var E = A.pathname || "", a = A.search || "";
      A.path = E + a;
    }
    return A.slashes = A.slashes || g.slashes, A.href = A.format(), A;
  }
  var n = A.pathname && A.pathname.charAt(0) === "/", h = g.host || g.pathname && g.pathname.charAt(0) === "/", c = h || n || A.host && g.pathname, D = c, y = A.pathname && A.pathname.split("/") || [], d = g.pathname && g.pathname.split("/") || [], l = A.protocol && !AI[A.protocol];
  if (l && (A.hostname = "", A.port = null, A.host && (y[0] === "" ? y[0] = A.host : y.unshift(A.host)), A.host = "", g.protocol && (g.hostname = null, g.port = null, g.host && (d[0] === "" ? d[0] = g.host : d.unshift(g.host)), g.host = null), c = c && (d[0] === "" || y[0] === "")), h)
    A.host = g.host || g.host === "" ? g.host : A.host, A.hostname = g.hostname || g.hostname === "" ? g.hostname : A.hostname, A.search = g.search, A.query = g.query, y = d;
  else if (d.length)
    y || (y = []), y.pop(), y = y.concat(d), A.search = g.search, A.query = g.query;
  else if (g.search != null) {
    if (l) {
      A.host = y.shift(), A.hostname = A.host;
      var w = A.host && A.host.indexOf("@") > 0 ? A.host.split("@") : !1;
      w && (A.auth = w.shift(), A.hostname = w.shift(), A.host = A.hostname);
    }
    return A.search = g.search, A.query = g.query, (A.pathname !== null || A.search !== null) && (A.path = (A.pathname ? A.pathname : "") + (A.search ? A.search : "")), A.href = A.format(), A;
  }
  if (!y.length)
    return A.pathname = null, A.search ? A.path = "/" + A.search : A.path = null, A.href = A.format(), A;
  for (var S = y.slice(-1)[0], G = (A.host || g.host || y.length > 1) && (S === "." || S === "..") || S === "", f = 0, F = y.length; F >= 0; F--)
    S = y[F], S === "." ? y.splice(F, 1) : S === ".." ? (y.splice(F, 1), f++) : f && (y.splice(F, 1), f--);
  if (!c && !D)
    for (; f--; f)
      y.unshift("..");
  c && y[0] !== "" && (!y[0] || y[0].charAt(0) !== "/") && y.unshift(""), G && y.join("/").substr(-1) !== "/" && y.push("");
  var N = y[0] === "" || y[0] && y[0].charAt(0) === "/";
  if (l) {
    A.hostname = N ? "" : y.length ? y.shift() : "", A.host = A.hostname;
    var w = A.host && A.host.indexOf("@") > 0 ? A.host.split("@") : !1;
    w && (A.auth = w.shift(), A.hostname = w.shift(), A.host = A.hostname);
  }
  return c = c || A.host && y.length, c && !N && y.unshift(""), y.length > 0 ? A.pathname = y.join("/") : (A.pathname = null, A.path = null), (A.pathname !== null || A.search !== null) && (A.path = (A.pathname ? A.pathname : "") + (A.search ? A.search : "")), A.auth = g.auth || A.auth, A.slashes = A.slashes || g.slashes, A.href = A.format(), A;
};
sA.prototype.parseHost = function() {
  var g = this.host, I = Oo.exec(g);
  I && (I = I[0], I !== ":" && (this.port = I.substr(1)), g = g.substr(0, g.length - I.length)), g && (this.hostname = g);
};
CI.parse = UI;
CI.resolve = _o;
CI.resolveObject = zo;
CI.format = Vo;
CI.Url = sA;
class Xo extends Ye {
  /**
   * BaseResponse facade for node HTTP/HTTPS API Response
   * @param {http.ServerResponse} response
   */
  constructor(I, A) {
    super(), this.response = I, this.dataPromise = A;
  }
  get status() {
    return this.response.statusCode;
  }
  getHeader(I) {
    return this.response.headers[I];
  }
  async getData() {
    return await this.dataPromise;
  }
}
class $o extends me {
  constructor(I) {
    super(I), this.parsedUrl = CI.parse(this.url), this.httpApi = (this.parsedUrl.protocol === "http:", Ee);
  }
  constructRequest(I, A) {
    return new Promise((e, t) => {
      const B = this.httpApi.get(
        {
          ...this.parsedUrl,
          headers: I
        },
        (C) => {
          const i = new Promise((o) => {
            const r = [];
            C.on("data", (Q) => {
              r.push(Q);
            }), C.on("end", () => {
              const Q = Buffer.concat(r).buffer;
              o(Q);
            }), C.on("error", t);
          });
          e(new Xo(C, i));
        }
      );
      B.on("error", t), A && (A.aborted && B.destroy(new gI("Request aborted")), A.addEventListener("abort", () => B.destroy(new gI("Request aborted"))));
    });
  }
  async request({ headers: I, signal: A } = {}) {
    return await this.constructRequest(I, A);
  }
}
class Oe extends Ue {
  /**
   *
   * @param {BaseClient} client
   * @param {object} headers
   * @param {numbers} maxRanges
   * @param {boolean} allowFullFile
   */
  constructor(I, A, e, t) {
    super(), this.client = I, this.headers = A, this.maxRanges = e, this.allowFullFile = t, this._fileSize = null;
  }
  /**
   *
   * @param {Slice[]} slices
   */
  async fetch(I, A) {
    return this.maxRanges >= I.length ? this.fetchSlices(I, A) : (this.maxRanges > 0 && I.length > 1, Promise.all(
      I.map((e) => this.fetchSlice(e, A))
    ));
  }
  async fetchSlices(I, A) {
    const e = await this.client.request({
      headers: {
        ...this.headers,
        Range: `bytes=${I.map(({ offset: t, length: B }) => `${t}-${t + B}`).join(",")}`
      },
      signal: A
    });
    if (e.ok)
      if (e.status === 206) {
        const { type: t, params: B } = kC(e.getHeader("content-type"));
        if (t === "multipart/byteranges") {
          const s = LC(await e.getData(), B.boundary);
          return this._fileSize = s[0].fileSize || null, s;
        }
        const C = await e.getData(), { start: i, end: o, total: r } = Ce(e.getHeader("content-range"));
        this._fileSize = r || null;
        const Q = [{
          data: C,
          offset: i,
          length: o - i
        }];
        if (I.length > 1) {
          const s = await Promise.all(I.slice(1).map((E) => this.fetchSlice(E, A)));
          return Q.concat(s);
        }
        return Q;
      } else {
        if (!this.allowFullFile)
          throw new Error("Server responded with full file");
        const t = await e.getData();
        return this._fileSize = t.byteLength, [{
          data: t,
          offset: 0,
          length: t.byteLength
        }];
      }
    else throw new Error("Error fetching data.");
  }
  async fetchSlice(I, A) {
    const { offset: e, length: t } = I, B = await this.client.request({
      headers: {
        ...this.headers,
        Range: `bytes=${e}-${e + t}`
      },
      signal: A
    });
    if (B.ok)
      if (B.status === 206) {
        const C = await B.getData(), { total: i } = Ce(B.getHeader("content-range"));
        return this._fileSize = i || null, {
          data: C,
          offset: e,
          length: t
        };
      } else {
        if (!this.allowFullFile)
          throw new Error("Server responded with full file");
        const C = await B.getData();
        return this._fileSize = C.byteLength, {
          data: C,
          offset: 0,
          length: C.byteLength
        };
      }
    else throw new Error("Error fetching data.");
  }
  get fileSize() {
    return this._fileSize;
  }
}
function Te(g, { blockSize: I, cacheSize: A }) {
  return I === null ? g : new qC(g, { blockSize: I, cacheSize: A });
}
function AE(g, { headers: I = {}, credentials: A, maxRanges: e = 0, allowFullFile: t = !1, ...B } = {}) {
  const C = new OC(g, A), i = new Oe(C, I, e, t);
  return Te(i, B);
}
function IE(g, { headers: I = {}, maxRanges: A = 0, allowFullFile: e = !1, ...t } = {}) {
  const B = new vC(g), C = new Oe(B, I, A, e);
  return Te(C, t);
}
function gE(g, { headers: I = {}, maxRanges: A = 0, allowFullFile: e = !1, ...t } = {}) {
  const B = new $o(g), C = new Oe(B, I, A, e);
  return Te(C, t);
}
function eE(g, { forceXHR: I = !1, ...A } = {}) {
  return typeof fetch == "function" && !I ? AE(g, A) : typeof XMLHttpRequest < "u" ? IE(g, A) : gE(g, A);
}
class tE extends Ue {
  constructor(I) {
    super(), this.file = I;
  }
  async fetchSlice(I, A) {
    return new Promise((e, t) => {
      const B = this.file.slice(I.offset, I.offset + I.length), C = new FileReader();
      C.onload = (i) => e(i.target.result), C.onerror = t, C.onabort = t, C.readAsArrayBuffer(B), A && A.addEventListener("abort", () => C.abort());
    });
  }
}
function BE(g) {
  return new tE(g);
}
function VA(g, I) {
  switch (g) {
    case u.BYTE:
    case u.ASCII:
    case u.UNDEFINED:
      return new Uint8Array(I);
    case u.SBYTE:
      return new Int8Array(I);
    case u.SHORT:
      return new Uint16Array(I);
    case u.SSHORT:
      return new Int16Array(I);
    case u.LONG:
    case u.IFD:
      return new Uint32Array(I);
    case u.SLONG:
      return new Int32Array(I);
    case u.LONG8:
    case u.IFD8:
      return new Array(I);
    case u.SLONG8:
      return new Array(I);
    case u.RATIONAL:
      return new Uint32Array(I * 2);
    case u.SRATIONAL:
      return new Int32Array(I * 2);
    case u.FLOAT:
      return new Float32Array(I);
    case u.DOUBLE:
      return new Float64Array(I);
    default:
      throw new RangeError(`Invalid field type: ${g}`);
  }
}
function _A(g, I) {
  switch (I) {
    case u.BYTE:
    case u.ASCII:
    case u.UNDEFINED:
      return g.readUint8;
    case u.SBYTE:
      return g.readInt8;
    case u.SHORT:
      return g.readUint16;
    case u.SSHORT:
      return g.readInt16;
    case u.LONG:
    case u.IFD:
      return g.readUint32;
    case u.SLONG:
      return g.readInt32;
    case u.LONG8:
    case u.IFD8:
      return g.readUint64;
    case u.SLONG8:
      return g.readInt64;
    case u.RATIONAL:
      return g.readUint32;
    case u.SRATIONAL:
      return g.readInt32;
    case u.FLOAT:
      return g.readFloat32;
    case u.DOUBLE:
      return g.readFloat64;
    default:
      throw new RangeError(`Invalid field type: ${I}`);
  }
}
function sI(g = null, I, A, e, t, B, C) {
  const i = dI(e), o = g || VA(e, t), r = e === u.RATIONAL || e === u.SRATIONAL;
  if (r)
    for (let Q = 0; Q < t; Q += 2)
      o[Q] = I.call(A, B + Q * i), o[Q + 1] = I.call(
        A,
        B + (Q * i + 4)
      );
  else
    for (let Q = 0; Q < t; ++Q)
      o[Q] = I.call(A, B + Q * i);
  return e === u.ASCII ? new TextDecoder("utf-8").decode(o) : t === 1 && !C && !r ? o[0] : o;
}
class iE {
  /**
   * Creates a DeferredArray for lazy-loading of large TIFF field arrays.
   * @param {import("./source/basesource.js").BaseSource} source - Data source for fetching
   * @param {number} arrayOffset - Byte offset where the array data starts
   * @param {boolean} littleEndian - Endianness of the data
   * @param {number} fieldType - TIFF field type constant
   * @param {number} length - Number of elements in the array
   */
  constructor(I, A, e, t, B) {
    this.source = I, this.arrayOffset = A, this.littleEndian = e, this.fieldType = t, this.length = B, this.data = VA(t, B), this.itemSize = dI(t), this.maskBitmap = new Uint8Array(Math.ceil(B / 8)), this.fetchIndexPromises = /* @__PURE__ */ new Map(), this.fullFetchPromise = null;
  }
  /**
   * Loads all values in the deferred array at once.
   * Subsequent calls return the same promise to avoid redundant fetches.
   * @returns {Promise<TypedArray>} Promise resolving to the fully loaded array
   */
  async loadAll() {
    return this.fullFetchPromise || (this.fullFetchPromise = this.source.fetch([{
      offset: this.arrayOffset,
      length: this.itemSize * this.length
    }]).then((I) => {
      const A = new gg(
        I[0],
        this.arrayOffset,
        !0,
        !1
        // we can ignore bigTiff here
      ), e = sI(
        this.data,
        _A(A, this.fieldType),
        A,
        this.fieldType,
        this.length,
        this.arrayOffset,
        !0
      );
      return this.maskBitmap.fill(255), this.fetchIndexPromises.clear(), e;
    })), this.fullFetchPromise;
  }
  /**
   * Loads and returns a single value at the specified index.
   * If the value is already loaded, returns it immediately. Otherwise, fetches it
   * from the source. Multiple calls for the same index reuse the same promise.
   * @param {number} index - Zero-based index of the value to load
   * @returns {Promise<number|bigint>} Promise resolving to the value at the given index
   * @throws {RangeError} If index is out of bounds
   */
  async get(I) {
    if (I < 0 || I >= this.data.length)
      throw new RangeError(
        `Index ${I} out of bounds for length ${this.data.length}`
      );
    const A = Math.floor(I / 8), e = 1 << I % 8, t = this.arrayOffset + I * this.itemSize;
    if (!(this.maskBitmap[A] & e)) {
      if (!this.fetchIndexPromises.has(I)) {
        const B = this.source.fetch([{
          offset: t,
          length: this.itemSize
        }]).then((C) => {
          const i = new gg(
            C[0],
            this.arrayOffset + I * this.itemSize,
            !0,
            !1
            // we can ignore bigTiff here
          ), r = _A(i, this.fieldType).call(i, t);
          return this.data[I] = r, this.maskBitmap[A] |= e, this.fetchIndexPromises.delete(I), r;
        });
        this.fetchIndexPromises.set(I, B);
      }
      return this.fetchIndexPromises.get(I);
    }
    return this.data[I];
  }
}
class CE {
  /**
   * Create an ImageFileDirectory.
   * @param {Map} actualizedFields the file directory, mapping tag names to values
   * @param {Map} deferredFields the deferred fields, mapping tag names to async functions
   * @param {Map} deferredArrays the deferred arrays, mapping tag names to DeferredArray objects
   * @param {number} nextIFDByteOffset the byte offset to the next IFD
   */
  constructor(I, A, e, t) {
    this.actualizedFields = I, this.deferredFields = A, this.deferredFieldsBeingResolved = /* @__PURE__ */ new Map(), this.deferredArrays = e, this.nextIFDByteOffset = t;
  }
  /**
   * @param {number|string} tagIdentifier The field tag ID or name
   * @returns {boolean} whether the field exists (actualized or deferred)
   */
  hasTag(I) {
    const A = YI(I);
    return this.actualizedFields.has(A) || this.deferredFields.has(A) || this.deferredArrays.has(A);
  }
  /**
   * Synchronously retrieves the value for a given tag. If it is deferred, an error is thrown.
   * @param {number|string} tagIdentifier The field tag ID or name
   * @returns the field value, or undefined if it does not exist
   * @throws {Error} If the tag is deferred and requires asynchronous loading
   */
  getValue(I) {
    const A = YI(I);
    if (this.deferredFields.has(A) || this.deferredArrays.has(A)) {
      const e = SI[A], t = (e == null ? void 0 : e.name) || `Tag${A}`;
      throw new Error(
        `Field '${t}' (${A}) is deferred. Use loadValue() to load it asynchronously.`
      );
    }
    if (this.actualizedFields.has(A))
      return this.actualizedFields.get(A);
  }
  /**
   * Retrieves the value for a given tag. If it is deferred, it will be loaded first.
   * @param {number|string} tagIdentifier The field tag ID or name
   * @returns the field value, or undefined if it does not exist
   */
  async loadValue(I) {
    const A = YI(I);
    if (this.actualizedFields.has(A))
      return this.actualizedFields.get(A);
    if (this.deferredFieldsBeingResolved.has(A))
      return this.deferredFieldsBeingResolved.get(A);
    if (this.deferredFields.has(A)) {
      const e = this.deferredFields.get(A);
      this.deferredFields.delete(A);
      const t = (async () => {
        try {
          const B = await e();
          return this.actualizedFields.set(A, B), B;
        } finally {
          this.deferredFieldsBeingResolved.delete(A);
        }
      })();
      return this.deferredFieldsBeingResolved.set(A, t), t;
    }
    if (this.deferredArrays.has(A))
      return this.deferredArrays.get(A).loadAll();
  }
  /**
   * Retrieves the value at a given index for a tag that is an array. If it is deferred, it will be loaded first.
   * @param {number|string} tagIdentifier The field tag ID or name
   * @param {number} index The index within the array
   * @returns the field value at the given index, or undefined if it does not exist
   */
  async loadValueIndexed(I, A) {
    const e = YI(I);
    if (this.actualizedFields.has(e))
      return this.actualizedFields.get(e)[A];
    if (this.deferredArrays.has(e))
      return this.deferredArrays.get(e).get(A);
    if (this.hasTag(e))
      return (await this.loadValue(e))[A];
  }
  /**
   * Parses the GeoTIFF GeoKeyDirectory tag into a structured object.
   * The GeoKeyDirectory is a special TIFF tag that contains geographic metadata
   * in a key-value format as defined by the GeoTIFF specification.
   * @returns {Object|null} Parsed geo key directory mapping key names to values, or null if not present
   * @throws {Error} If a referenced geo key value cannot be retrieved
   */
  parseGeoKeyDirectory() {
    const I = this.getValue("GeoKeyDirectory");
    if (!I)
      return null;
    const A = {};
    for (let e = 4; e <= I[3] * 4; e += 4) {
      const t = Ig[I[e]], B = I[e + 1] || null, C = I[e + 2], i = I[e + 3];
      let o = null;
      if (!B)
        o = i;
      else {
        if (o = this.getValue(B), typeof o > "u" || o === null)
          throw new Error(`Could not get value of geoKey '${t}'.`);
        typeof o == "string" ? o = o.substring(i, i + C - 1) : o.subarray && (o = o.subarray(i, i + C), C === 1 && (o = o[0]));
      }
      A[t] = o;
    }
    return A;
  }
  toObject() {
    const I = {};
    for (const [A, e] of this.actualizedFields.entries()) {
      const t = SI[A], B = t ? t.name : `Tag${A}`;
      I[B] = e;
    }
    return I;
  }
}
class rE {
  /**
   * @param {import("./source/basesource.js").BaseSource} source the data source to fetch from
   * @param {boolean} littleEndian the endianness of the file
   * @param {boolean} bigTiff whether the file is a BigTIFF
   * @param {boolean} [eager=false] whether to eagerly fetch deferred fields.
   *                                 When false (default), tags are loaded lazily on-demand.
   *                                 When true, all tags are loaded immediately during parsing.
   */
  constructor(I, A, e, t = !1) {
    this.source = I, this.littleEndian = A, this.bigTiff = e, this.eager = t;
  }
  /**
   * Helper function to retrieve a DataSlice from the source.
   * @param {number} offset Byte offset of the slice
   * @param {number} [length] Length of the slice
   * @returns {Promise<DataSlice>}
   */
  async getSlice(I, A) {
    const e = this.bigTiff ? 4048 : 1024;
    return new gg(
      (await this.source.fetch([
        {
          offset: I,
          length: typeof A < "u" ? A : e
        }
      ]))[0],
      I,
      this.littleEndian,
      this.bigTiff
    );
  }
  /**
   * Instructs to parse an image file directory at the given file offset.
   * As there is no way to ensure that a location is indeed the start of an IFD,
   * this function must be called with caution (e.g only using the IFD offsets from
   * the headers or other IFDs).
   * @param {number} offset the offset to parse the IFD at
   * @returns {Promise<ImageFileDirectory>} the parsed IFD
   */
  async parseFileDirectoryAt(I) {
    var E, a;
    const A = this.bigTiff ? 20 : 12, e = this.bigTiff ? 8 : 2;
    let t = await this.getSlice(I);
    const B = this.bigTiff ? t.readUint64(I) : t.readUint16(I), C = B * (A + (this.bigTiff ? 16 : 6));
    t.covers(I, C) || (t = await this.getSlice(I, C));
    const i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    let Q = I + (this.bigTiff ? 8 : 2);
    for (let n = 0; n < B; Q += A, ++n) {
      const h = t.readUint16(Q), c = t.readUint16(Q + 2), D = this.bigTiff ? t.readUint64(Q + 4) : t.readUint32(Q + 4);
      let y = null, d = null, l = null;
      const w = dI(c), S = Q + (this.bigTiff ? 12 : 8), G = (E = SI[h]) == null ? void 0 : E.isArray, f = ((a = SI[h]) == null ? void 0 : a.eager) || this.eager;
      if (w * D <= (this.bigTiff ? 8 : 4))
        y = sI(
          VA(c, D),
          _A(t, c),
          t,
          c,
          D,
          S,
          G
        );
      else {
        const F = t.readOffset(S), N = dI(c) * D;
        if (t.covers(F, N))
          y = sI(
            VA(c, D),
            _A(t, c),
            t,
            c,
            D,
            F,
            G
          );
        else if (f) {
          const p = await this.getSlice(F, N);
          y = sI(
            VA(c, D),
            _A(p, c),
            p,
            c,
            D,
            F,
            G
          );
        } else G ? l = new iE(
          this.source,
          F,
          this.littleEndian,
          c,
          D
        ) : d = async () => {
          const p = await this.getSlice(F, N);
          return sI(
            VA(c, D),
            _A(p, c),
            p,
            c,
            D,
            F,
            G
          );
        };
      }
      y !== null ? i.set(h, y) : d !== null ? o.set(h, d) : l !== null && r.set(h, l);
    }
    const s = t.readOffset(
      I + e + A * B
    );
    return new CE(
      i,
      o,
      r,
      s
    );
  }
}
const QE = Le, oE = YC(Ig), $B = {};
GB($B, QE);
GB($B, oE);
const yI = {
  ui8: new Uint8Array(8)
};
yI.fl64 = new Float64Array(yI.ui8.buffer);
yI.writeDouble = (g, I, A) => {
  yI.fl64[0] = A, mC(8, (e) => {
    g[I + e] = yI.ui8[7 - e];
  });
};
function EE(g, I) {
  let A = g.length - I, e = 0;
  do {
    for (let t = I; t > 0; t--)
      g[e + I] += g[e], e++;
    A -= I;
  } while (A > 0);
}
function aE(g, I, A) {
  let e = 0, t = g.length;
  const B = t / A;
  for (; t > I; ) {
    for (let i = I; i > 0; --i)
      g[e + I] += g[e], ++e;
    t -= I;
  }
  const C = g.slice();
  for (let i = 0; i < B; ++i)
    for (let o = 0; o < A; ++o)
      g[A * i + o] = C[(A - o - 1) * B + i];
}
function sE(g, I, A, e, t, B) {
  if (!I || I === 1)
    return g;
  for (let o = 0; o < t.length; ++o) {
    if (t[o] % 8 !== 0)
      throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");
    if (t[o] !== t[0])
      throw new Error("When decoding with predictor, all samples must have the same size.");
  }
  const C = t[0] / 8, i = B === 2 ? 1 : t.length;
  for (let o = 0; o < e && !(o * i * A * C >= g.byteLength); ++o) {
    let r;
    if (I === 2) {
      switch (t[0]) {
        case 8:
          r = new Uint8Array(
            g,
            o * i * A * C,
            i * A * C
          );
          break;
        case 16:
          r = new Uint16Array(
            g,
            o * i * A * C,
            i * A * C / 2
          );
          break;
        case 32:
          r = new Uint32Array(
            g,
            o * i * A * C,
            i * A * C / 4
          );
          break;
        default:
          throw new Error(`Predictor 2 not allowed with ${t[0]} bits per sample.`);
      }
      EE(r, i);
    } else I === 3 && (r = new Uint8Array(
      g,
      o * i * A * C,
      i * A * C
    ), aE(r, i, C));
  }
  return g;
}
class MA {
  constructor(I) {
    this.parameters = I;
  }
  async decode(I) {
    const A = await this.decodeBlock(I), {
      tileWidth: e,
      tileHeight: t,
      predictor: B,
      bitsPerSample: C,
      planarConfiguration: i
    } = this.parameters;
    return B !== 1 ? sE(
      A,
      B,
      e,
      t,
      C,
      i
    ) : A;
  }
}
console.log("Loading GeoTiff Reader 2026.01.18 Version 3.0.0-beta.3");
const nE = new Uint8Array([
  0,
  0,
  2,
  28,
  97,
  112,
  112,
  108,
  2,
  32,
  0,
  0,
  109,
  110,
  116,
  114,
  82,
  71,
  66,
  32,
  88,
  89,
  90,
  32,
  7,
  220,
  0,
  1,
  0,
  25,
  0,
  3,
  0,
  41,
  0,
  57,
  97,
  99,
  115,
  112,
  65,
  80,
  80,
  76,
  0,
  0,
  0,
  0,
  97,
  112,
  112,
  108,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  246,
  214,
  0,
  1,
  0,
  0,
  0,
  0,
  211,
  45
]);
function jg(g, I, A, e) {
  let t = null, B = null;
  const C = dI(I);
  switch (I) {
    case u.BYTE:
    case u.ASCII:
    case u.UNDEFINED:
      t = new Uint8Array(A), B = g.readUint8;
      break;
    case u.SBYTE:
      t = new Int8Array(A), B = g.readInt8;
      break;
    case u.SHORT:
      t = new Uint16Array(A), B = g.readUint16;
      break;
    case u.SSHORT:
      t = new Int16Array(A), B = g.readInt16;
      break;
    case u.LONG:
    case u.IFD:
      t = new Uint32Array(A), B = g.readUint32;
      break;
    case u.SLONG:
      t = new Int32Array(A), B = g.readInt32;
      break;
    case u.LONG8:
    case u.IFD8:
      t = new Array(A), B = g.readUint64;
      break;
    case u.SLONG8:
      t = new Array(A), B = g.readInt64;
      break;
    case u.RATIONAL:
      t = new Uint32Array(A * 2), B = g.readUint32;
      break;
    case u.SRATIONAL:
      t = new Int32Array(A * 2), B = g.readInt32;
      break;
    case u.FLOAT:
      t = new Float32Array(A), B = g.readFloat32;
      break;
    case u.DOUBLE:
      t = new Float64Array(A), B = g.readFloat64;
      break;
    default:
      throw new RangeError(`Invalid field type: ${I}`);
  }
  for (let i = 0; i < A; ++i)
    t[i] = B.call(
      g,
      e + i * C
    );
  return new TextDecoder("utf-8").decode(t);
}
class KI extends Error {
  constructor(I) {
    super(`No image at index ${I}`), this.index = I;
  }
}
class cE {
  /**
   * (experimental) Reads raster data from the best fitting image. This function uses
   * the image with the lowest resolution that is still a higher resolution than the
   * requested resolution.
   * When specified, the `bbox` option is translated to the `window` option and the
   * `resX` and `resY` to `width` and `height` respectively.
   * Then, the [readRasters]{@link GeoTIFFImage#readRasters} method of the selected
   * image is called and the result returned.
   * @see GeoTIFFImage.readRasters
   * @param {import('./geotiffimage').ReadRasterOptions} [options={}] optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded array(s), with `height` and `width`, as a promise
   */
  async readRasters(I = {}) {
    const { window: A, width: e, height: t } = I;
    let { resX: B, resY: C, bbox: i } = I;
    const o = await this.getImage();
    let r = o;
    const Q = await this.getImageCount(), s = o.getBoundingBox();
    if (A && i)
      throw new Error('Both "bbox" and "window" passed.');
    if (e || t) {
      if (A) {
        const [n, h] = o.getOrigin(), [c, D] = o.getResolution();
        i = [
          n + A[0] * c,
          h + A[1] * D,
          n + A[2] * c,
          h + A[3] * D
        ];
      }
      const a = i || s;
      if (e) {
        if (B)
          throw new Error("Both width and resX passed");
        B = (a[2] - a[0]) / e;
      }
      if (t) {
        if (C)
          throw new Error("Both width and resY passed");
        C = (a[3] - a[1]) / t;
      }
    }
    if (B || C) {
      const a = [];
      for (let n = 0; n < Q; ++n) {
        const h = await this.getImage(n), c = h.fileDirectory.getValue("SubfileType"), D = h.fileDirectory.getValue("NewSubfileType");
        (n === 0 || c === 2 || D & 1) && a.push(h);
      }
      a.sort((n, h) => n.getWidth() - h.getWidth());
      for (let n = 0; n < a.length; ++n) {
        const h = a[n], c = (s[2] - s[0]) / h.getWidth(), D = (s[3] - s[1]) / h.getHeight();
        if (r = h, B && B > c || C && C > D)
          break;
      }
    }
    let E = A;
    if (i) {
      const [a, n] = o.getOrigin(), [h, c] = r.getResolution(o);
      E = [
        Math.round((i[0] - a) / h),
        Math.round((i[1] - n) / c),
        Math.round((i[2] - a) / h),
        Math.round((i[3] - n) / c)
      ], E = [
        Math.min(E[0], E[2]),
        Math.min(E[1], E[3]),
        Math.max(E[0], E[2]),
        Math.max(E[1], E[3])
      ];
    }
    return r.readRasters({ ...I, window: E });
  }
}
class hg extends cE {
  /**
   * @constructor
   * @param {(source.ArrayBufferSource|source.Remote|source.Custom|source.DataView)}
   *          source The data source from where to read the TIFF file.
   * @param {boolean} littleEndian Whether the TIFF file is in little endian format.
   * @param {boolean} bigTiff Whether the TIFF file is a BigTIFF file.
   * @param {number} firstIFDOffset The numeric byte-offset from the start of the file to the first IFD.
   * @param {object} [options] Further options.
   * @param {boolean} [options.cache=true] Enable caching for higher performance.
   */
  constructor(I, A, e, t, B = {}) {
    super(), this.source = I, this.parser = new rE(I, A, e, !1), this.littleEndian = A, this.bigTiff = e, this.firstIFDOffset = t, this.cache = B.cache !== !1, this.ifdRequests = [], this.ghostValues = null, this.iccProfileCache = /* @__PURE__ */ new Map(), this.iccProfileCache.set("generic", nE);
  }
  async getSlice(I, A) {
    const e = this.bigTiff ? 4048 : 1024;
    return new gg(
      (await this.source.fetch([{
        offset: I,
        length: typeof A < "u" ? A : e
      }]))[0],
      I,
      this.littleEndian,
      this.bigTiff
    );
  }
  async requestIFD(I) {
    if (this.ifdRequests[I])
      return this.ifdRequests[I];
    if (I === 0)
      return this.ifdRequests[I] = this.parser.parseFileDirectoryAt(this.firstIFDOffset), this.ifdRequests[I];
    if (!this.ifdRequests[I - 1])
      try {
        this.ifdRequests[I - 1] = this.requestIFD(I - 1);
      } catch (A) {
        throw A instanceof KI ? new KI(I) : A;
      }
    return this.ifdRequests[I] = (async () => {
      const A = await this.ifdRequests[I - 1];
      if (A.nextIFDByteOffset === 0)
        throw new KI(I);
      return this.parser.parseFileDirectoryAt(A.nextIFDByteOffset);
    })(), this.ifdRequests[I];
  }
  /**
   * Get the n-th internal subfile of an image. By default, the first is returned.
   *
   * @param {number} [index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  async getImage(I = 0) {
    return new wC(
      await this.requestIFD(I),
      this.dataView,
      this.littleEndian,
      this.cache,
      this.source
    );
  }
  /**
   * Returns the count of the internal subfiles.
   *
   * @returns {Promise<number>} the number of internal subfile images
   */
  async getImageCount() {
    let I = 0, A = !0;
    for (; A; )
      try {
        await this.requestIFD(I), ++I;
      } catch (e) {
        if (e instanceof KI)
          A = !1;
        else
          throw e;
      }
    return I;
  }
  /**
   * Get the values of the COG ghost area as a parsed map.
   * See https://gdal.org/drivers/raster/cog.html#header-ghost-area for reference
   * @returns {Promise<Object>} the parsed ghost area or null, if no such area was found
   */
  async getGhostValues() {
    const I = this.bigTiff ? 16 : 8;
    if (this.ghostValues)
      return this.ghostValues;
    const A = "GDAL_STRUCTURAL_METADATA_SIZE=", e = A.length + 100;
    let t = await this.getSlice(I, e);
    if (A === jg(t, u.ASCII, A.length, I)) {
      const C = jg(t, u.ASCII, e, I).split(`
`)[0], i = Number(C.split("=")[1].split(" ")[0]) + C.length;
      i > e && (t = await this.getSlice(I, i));
      const o = jg(t, u.ASCII, i, I);
      this.ghostValues = {}, o.split(`
`).filter((r) => r.length > 0).map((r) => r.split("=")).forEach(([r, Q]) => {
        this.ghostValues[r] = Q;
      });
    }
    return this.ghostValues;
  }
  /**
   * Parse a (Geo)TIFF file from the given source.
   *
   * @param {*} source The source of data to parse from.
   * @param {GeoTIFFOptions} [options] Additional options.
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   */
  static async fromSource(I, A, e) {
    const t = (await I.fetch([{ offset: 0, length: 1024 }], e))[0], B = new uC(t), C = B.getUint16(0, 0);
    let i;
    if (C === 18761)
      i = !0;
    else if (C === 19789)
      i = !1;
    else
      throw new TypeError("Invalid byte order value.");
    const o = B.getUint16(2, i);
    let r;
    if (o === 42)
      r = !1;
    else if (o === 43) {
      if (r = !0, B.getUint16(4, i) !== 8)
        throw new Error("Unsupported offset byte-size.");
    } else
      throw new TypeError("Invalid magic number.");
    const Q = r ? B.getUint64(8, i) : B.getUint32(4, i);
    return new hg(I, i, r, Q, A);
  }
  /**
   * Closes the underlying file buffer
   * N.B. After the GeoTIFF has been completely processed it needs
   * to be closed but only if it has been constructed from a file.
   */
  close() {
    return typeof this.source.close == "function" ? this.source.close() : !1;
  }
}
async function Ft(g, I = {}, A) {
  return hg.fromSource(eE(g, I), I, A);
}
async function Nt(g, I = {}, A) {
  return hg.fromSource(BE(g), I, A);
}
class Zg {
  constructor() {
    this.promise = new Promise((I, A) => {
      this.reject = A, this.resolve = I;
    });
  }
}
const hE = (g) => {
  var A, e, t;
  const I = /* @__PURE__ */ new Map();
  for (const B of g) {
    const C = new DOMParser().parseFromString(
      (A = B.fileDirectory) == null ? void 0 : A.ImageDescription,
      "text/xml"
    ), i = (e = C == null ? void 0 : C.querySelector("Name")) == null ? void 0 : e.textContent, o = (t = C == null ? void 0 : C.querySelector("Color")) == null ? void 0 : t.textContent;
    if (!i)
      continue;
    const r = o ? o.split(",").map((Q) => parseInt(Q)) : [255, 255, 255];
    I.has(i) || I.set(i, {
      name: i,
      color: r,
      images: []
    }), I.get(i).images.push(B);
  }
  return I;
};
class bA {
  static RGBAfromYCbCr(I) {
    const A = new Uint8ClampedArray(I.length * 4 / 3);
    let e, t;
    for (e = 0, t = 0; e < I.length; e += 3, t += 4) {
      const B = I[e], C = I[e + 1], i = I[e + 2];
      A[t] = B + 1.402 * (i - 128), A[t + 1] = B - 0.34414 * (C - 128) - 0.71414 * (i - 128), A[t + 2] = B + 1.772 * (C - 128), A[t + 3] = 255;
    }
    return A;
  }
  static RGBAfromRGB(I) {
    const A = new Uint8ClampedArray(I.length * 4 / 3);
    let e, t;
    for (e = 0, t = 0; e < I.length; e += 3, t += 4)
      A[t] = I[e], A[t + 1] = I[e + 1], A[t + 2] = I[e + 2], A[t + 3] = 255;
    return A;
  }
  static RGBAfromWhiteIsZero(I, A) {
    const e = new Uint8ClampedArray(I.length * 4);
    let t;
    for (let B = 0, C = 0; B < I.length; ++B, C += 4)
      t = 256 - I[B] / A * 256, e[C] = t, e[C + 1] = t, e[C + 2] = t, e[C + 3] = 255;
    return e;
  }
  static RGBAfromBlackIsZero(I, A) {
    const e = new Uint8ClampedArray(I.length * 4);
    let t;
    for (let B = 0, C = 0; B < I.length; ++B, C += 4)
      t = I[B] / A * 256, e[C] = t, e[C + 1] = t, e[C + 2] = t, e[C + 3] = 255;
    return e;
  }
  static RGBAfromPalette(I, A) {
    const e = new Uint8ClampedArray(I.length * 4), t = A.length / 3, B = A.length / 3 * 2;
    for (let C = 0, i = 0; C < I.length; ++C, i += 4) {
      const o = I[C];
      e[i] = A[o] / 65536 * 256, e[i + 1] = A[o + t] / 65536 * 256, e[i + 2] = A[o + B] / 65536 * 256, e[i + 3] = 255;
    }
    return e;
  }
  static RGBAfromCMYK(I) {
    const A = new Uint8ClampedArray(I.length);
    for (let e = 0, t = 0; e < I.length; e += 4, t += 4) {
      const B = I[e], C = I[e + 1], i = I[e + 2], o = I[e + 3];
      A[t] = 255 * ((255 - B) / 256) * ((255 - o) / 256), A[t + 1] = 255 * ((255 - C) / 256) * ((255 - o) / 256), A[t + 2] = 255 * ((255 - i) / 256) * ((255 - o) / 256), A[t + 3] = 255;
    }
    return A;
  }
  static RGBAfromCIELab(I) {
    const B = new Uint8ClampedArray(I.length * 4 / 3);
    for (let C = 0, i = 0; C < I.length; C += 3, i += 4) {
      const o = I[C + 0], r = I[C + 1] << 24 >> 24, Q = I[C + 2] << 24 >> 24;
      let s = (o + 16) / 116, E = r / 500 + s, a = s - Q / 200, n, h, c;
      E = 0.95047 * (E * E * E > 8856e-6 ? E * E * E : (E - 16 / 116) / 7.787), s = 1 * (s * s * s > 8856e-6 ? s * s * s : (s - 16 / 116) / 7.787), a = 1.08883 * (a * a * a > 8856e-6 ? a * a * a : (a - 16 / 116) / 7.787), n = E * 3.2406 + s * -1.5372 + a * -0.4986, h = E * -0.9689 + s * 1.8758 + a * 0.0415, c = E * 0.0557 + s * -0.204 + a * 1.057, n = n > 31308e-7 ? 1.055 * n ** (1 / 2.4) - 0.055 : 12.92 * n, h = h > 31308e-7 ? 1.055 * h ** (1 / 2.4) - 0.055 : 12.92 * h, c = c > 31308e-7 ? 1.055 * c ** (1 / 2.4) - 0.055 : 12.92 * c, B[i] = Math.max(0, Math.min(1, n)) * 255, B[i + 1] = Math.max(0, Math.min(1, h)) * 255, B[i + 2] = Math.max(0, Math.min(1, c)) * 255, B[i + 3] = 255;
    }
    return B;
  }
}
function lE(g) {
  if (!g.version || g.version.major < 2 || g.version.major == 2 && g.version.minor < 3) {
    console.error("This version of OpenSeadragon is too old to support this monkey patch");
    return;
  }
  if (g.ImageJob)
    return;
  function I(e) {
    g.extend(
      !0,
      this,
      {
        timeout: g.DEFAULT_SETTINGS.timeout,
        jobId: null
      },
      e
    ), this.image = null;
  }
  I.prototype = {
    errorMsg: null,
    /**
     * Starts the image job.
     * @method
     */
    start: function() {
      var e = this, t = this.abort;
      this.image = new Image(), this.image.onload = function() {
        e.finish(!0);
      }, this.image.onabort = this.image.onerror = function() {
        e.errorMsg = "Image load aborted", e.finish(!1);
      }, this.jobId = window.setTimeout(function() {
        e.errorMsg = "Image load exceeded timeout (" + e.timeout + " ms)", e.finish(!1);
      }, this.timeout), this.loadWithAjax ? (this.request = g.makeAjaxRequest({
        url: this.src,
        withCredentials: this.ajaxWithCredentials,
        headers: this.ajaxHeaders,
        responseType: "arraybuffer",
        postData: this.postData,
        success: function(B) {
          var C;
          try {
            C = new window.Blob([B.response]);
          } catch (Q) {
            var i = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            if (Q.name === "TypeError" && i) {
              var o = new i();
              o.append(B.response), C = o.getBlob();
            }
          }
          C.size === 0 && (e.errorMsg = "Empty image response.", e.finish(!1));
          var r = (window.URL || window.webkitURL).createObjectURL(C);
          e.image.src = r;
        },
        error: function(B) {
          e.errorMsg = "Image load aborted - XHR error: Ajax returned " + B.status, e.finish(!1);
        }
      }), this.abort = function() {
        e.request.abort(), typeof t == "function" && t();
      }) : (this.crossOriginPolicy !== !1 && (this.image.crossOrigin = this.crossOriginPolicy), this.src.fetch ? this.src.fetch().then((B) => this.image.src = B) : this.image.src = this.src);
    },
    finish: function(e) {
      this.image.onload = this.image.onerror = this.image.onabort = null, e || (this.image = null), this.jobId && window.clearTimeout(this.jobId), this.callback(this);
    }
  };
  function A(e, t, B) {
    var C;
    e.jobsInProgress--, (!e.jobLimit || e.jobsInProgress < e.jobLimit) && e.jobQueue.length > 0 && (C = e.jobQueue.shift(), C.start(), e.jobsInProgress++), B(t.image, t.errorMsg, t.request);
  }
  g.ImageLoader.prototype.addJob = function(e) {
    var t = this, B = function(o) {
      A(t, o, e.callback);
    }, C = {
      src: e.src,
      loadWithAjax: e.loadWithAjax,
      ajaxHeaders: e.loadWithAjax ? e.ajaxHeaders : null,
      crossOriginPolicy: e.crossOriginPolicy,
      ajaxWithCredentials: e.ajaxWithCredentials,
      postData: e.postData,
      callback: B,
      abort: e.abort,
      timeout: this.timeout
    }, i = new I(C);
    !this.jobLimit || this.jobsInProgress < this.jobLimit ? (i.start(), this.jobsInProgress++) : this.jobQueue.push(i);
  }, g.Tile.prototype._hasTransparencyChannel = function() {
    return !1;
  };
}
console.log("Loading GeoTIFF Tile Source from 2026.01.07  ...");
const fE = (g) => {
  let I = 0;
  const e = class e extends g.TileSource {
    constructor(C, i = { logLatency: !1 }) {
      super();
      /**
       * Return the tileWidth for a given level.
       * @function
       * @param {Number} level
       */
      oA(this, "getTileWidth", (C) => {
        if (this.levels.length > C)
          return this.levels[C].tileWidth;
      });
      /**
       * Return the tileHeight for a given level.
       * @function
       * @param {Number} level
       */
      oA(this, "getTileHeight", (C) => {
        if (this.levels.length > C)
          return this.levels[C].tileHeight;
      });
      /**
       * @function
       * @param {Number} level
       */
      oA(this, "getLevelScale", (C) => {
        let i = NaN;
        return this.levels.length > 0 && C >= this.minLevel && C <= this.maxLevel && (i = this.levels[C].width / this.levels[this.maxLevel].width), i;
      });
      /**
       * Handle maintaining unique caches per channel in multi-channel images
       */
      oA(this, "getTileHashKey", (C, i, o) => {
        var r;
        return `geotiffTileSource${this._tsCounter}_${((r = this == null ? void 0 : this.channel) == null ? void 0 : r.name) ?? ""}_${C}_${i}_${o}`;
      });
      /**
       * Implement function here instead of as custom tile source in client code
       * @function
       * @param {Number} levelnum
       * @param {Number} x
       * @param {Number} y
       */
      oA(this, "getTileUrl", (C, i, o) => {
        let r = this.levels[C], Q = new String(`${C}/${i}_${o}`);
        return Q.fetch = /* @__PURE__ */ ((s, E, a, n, h) => () => this.regionToDataUrl.call(s, E, a, n, h))(this, r, i, o, Q), Q;
      });
      oA(this, "downloadTileStart", (C) => {
        C.src.fetch().then((i) => {
          let o = new Image(), r = "" + C.src;
          o.onload = function() {
            C.finish(o);
          }, o.onerror = o.onabort = function() {
            C.finish(null, r, "Request aborted");
          }, o.src = i;
        });
      });
      oA(this, "downloadTileAbort", (C) => {
        C.src.abortController && C.src.abortController.abort();
      });
      oA(this, "setupComplete", () => {
        this._ready = !0, this.promises.ready.resolve(), this.raiseEvent("ready", { tileSource: this });
      });
      oA(this, "setupLevels", () => {
        if (this._ready)
          return;
        let C = this.GeoTIFFImages.sort((E, a) => a.getWidth() - E.getWidth()), i = this._tileSize, o = this._tileSize, r = C[0].getWidth();
        this.width = r;
        let Q = C[0].getHeight();
        if (this.height = Q, this.tileOverlap = 0, this.minLevel = 0, this.aspectRatio = this.width / this.height, this.dimensions = new g.Point(this.width, this.height), C.reduce(
          (E, a) => (E.width !== -1 && (E.valid = E.valid && a.getWidth() < E.width), E.width = a.getWidth(), E),
          { valid: !0, width: -1 }
        ).valid)
          this.levels = C.map((E) => {
            let a = E.getWidth(), n = E.getHeight();
            return {
              width: a,
              height: n,
              tileWidth: this.options.tileWidth || E.getTileWidth() || i,
              tileHeight: this.options.tileHeight || E.getTileHeight() || o,
              image: E,
              scaleFactor: 1
            };
          }), this.maxLevel = this.levels.length - 1;
        else {
          let E = Math.ceil(
            Math.log2(Math.max(r / i, Q / o))
          ), a = [...Array(E).keys()].filter((n) => n % 2 == 0);
          this.levels = a.map((n) => {
            let h = Math.pow(2, n);
            const c = C.filter((y) => {
              const d = Math.pow(2, n - 1);
              return d >= 0 ? y.getWidth() * d < r && y.getWidth() * h >= r : y.getWidth() * h >= r;
            });
            if (c.length === 0)
              return null;
            const D = c[0];
            return {
              width: r / h,
              height: Q / h,
              tileWidth: this.options.tileWidth || D.getTileWidth() || i,
              tileHeight: this.options.tileHeight || D.getTileHeight() || o,
              image: D,
              scaleFactor: h * D.getWidth() / r
            };
          }).filter((n) => n !== null), this.maxLevel = this.levels.length - 1;
        }
        this.levels = this.levels.sort((E, a) => E.width - a.width), this._tileWidth = this.levels[0].tileWidth, this._tileHeight = this.levels[0].tileHeight, this.setupComplete();
      });
      oA(this, "regionToDataUrl", (C, i, o, r) => {
        var y, d, l, w, S;
        let Q = this.options.logLatency && Date.now(), E = (r.abortController = new AbortController()).signal;
        const a = C.tileWidth, n = C.tileHeight, h = [i * a, o * n, (i + 1) * a, (o + 1) * n].map(
          (G) => G * C.scaleFactor
        ), c = C.image;
        if ((d = (y = c.fileDirectory) == null ? void 0 : y.Software) == null ? void 0 : d.startsWith("PerkinElmer-QPI")) {
          const G = new DOMParser().parseFromString(
            (l = c.fileDirectory) == null ? void 0 : l.ImageDescription,
            "text/xml"
          );
          (w = G.querySelector("Name")) == null || w.textContent;
          const f = (S = G.querySelector("Color")) == null ? void 0 : S.textContent, F = f ? f.split(",").map((N) => parseInt(N)) : [255, 255, 255];
          return C.image.readRGB({
            interleave: !0,
            window: h,
            pool: this._pool,
            width: C.tileWidth,
            height: C.tileHeight,
            signal: E
          }).then((N) => {
            let p = document.createElement("canvas");
            p.width = C.tileWidth, p.height = C.tileHeight;
            let J = p.getContext("2d"), L = new Uint8ClampedArray(4 * p.width * p.height), b = new Uint8ClampedArray(N), Y, v;
            for (Y = 0, v = 0; Y < b.length; Y += 3, v += 4)
              L[v] = b[Y] * F[0] / 255, L[v + 1] = b[Y + 1] * F[1] / 255, L[v + 2] = b[Y + 2] * F[2] / 255, L[v + 3] = 255;
            const BA = J.createImageData(p.width, p.height);
            BA.data.set(L), J.putImageData(BA, 0, 0);
            let rA = p.toDataURL("image/jpeg", 0.8);
            return this.options.logLatency && (typeof this.options.logLatency == "function" ? this.options.logLatency : console.log)("Tile latency (ms):", Date.now() - Q), rA;
          });
        } else
          return C.image.getTileOrStrip(i, o, null, this._pool, E).then((G) => {
            let f = new Uint8ClampedArray(G.data), F = document.createElement("canvas");
            F.width = C.tileWidth, F.height = C.tileHeight;
            let N = F.getContext("2d"), p = C.image.fileDirectory.PhotometricInterpretation, J;
            if (f.length / (F.width * F.height) % 4 === 0)
              J = f;
            else
              switch (p) {
                case IA.WhiteIsZero:
                  J = bA.RGBAfromWhiteIsZero(
                    f,
                    2 ** C.image.fileDirectory.BitsPerSample[0]
                  );
                  break;
                case IA.BlackIsZero:
                  J = bA.RGBAfromBlackIsZero(
                    f,
                    2 ** C.image.fileDirectory.BitsPerSample[0]
                  );
                  break;
                case IA.RGB:
                  J = bA.RGBAfromRGB(f);
                  break;
                case IA.Palette:
                  J = bA.RGBAfromPalette(f, 2 ** C.image.fileDirectory.colorMap);
                  break;
                case IA.CMYK:
                  J = bA.RGBAfromCMYK(f);
                  break;
                case IA.YCbCr:
                  J = bA.RGBAfromYCbCr(f);
                  break;
                case IA.CIELab:
                  J = bA.RGBAfromCIELab(f);
                  break;
              }
            const L = N.createImageData(F.width, F.height);
            L.data.set(J), N.putImageData(L, 0, 0);
            let b = F.toDataURL("image/jpeg", 0.8);
            return this.options.logLatency && (typeof this.options.logLatency == "function" ? this.options.logLatency : console.log)(
              "Tile latency (ms):",
              Date.now() - Q
            ), b;
          });
      });
      e._osdReady || e.applyOSDPatch(g);
      let o = this;
      this.input = C, this.options = i, this.channel = (C == null ? void 0 : C.channel) ?? null, this._ready = !1, this._pool = e.sharedPool, this._tileSize = 256, this._tsCounter = I, I += 1, C.GeoTIFF && C.GeoTIFFImages ? (this.promises = {
        GeoTIFF: Promise.resolve(C.GeoTIFF),
        GeoTIFFImages: Promise.resolve(C.GeoTIFFImages),
        ready: new Zg()
      }, this.GeoTIFF = C.GeoTIFF, this.imageCount = C.GeoTIFFImages.length, this.GeoTIFFImages = C.GeoTIFFImages, this.setupLevels()) : (this.promises = {
        GeoTIFF: C instanceof File ? Nt(C) : Ft(C),
        GeoTIFFImages: new Zg(),
        ready: new Zg()
      }, this.promises.GeoTIFF.then((r) => (o.GeoTIFF = r, r.getImageCount())).then((r) => {
        o.imageCount = r;
        let Q = [...Array(r).keys()].map((s) => o.GeoTIFF.getImage(s));
        return Promise.all(Q);
      }).then((r) => {
        o.GeoTIFFImages = r, o.promises.GeoTIFFImages.resolve(r), this.setupLevels();
      }).catch((r) => {
        throw console.error("Re-throwing error with GeoTIFF:", r), r;
      }));
    }
  };
  /**
   * Create a shared GeoTIFF Pool for all GeoTIFFTileSources to use.
   *
   * If a shared pool is not created, every page of every GeoTIFF will create its own pool,
   * which can quickly lead to browser crashes.
   *
   * @static sharedPool
   * @type {Pool}
   */
  oA(e, "sharedPool", new pC()), oA(e, "_osdReady", !1), // Apply ImageJob patch to OpenSeadragon. Can be extended for modular patches.
  oA(e, "applyOSDPatch", (C) => {
    lE(C), e._osdReady = !0;
  }), oA(e, "getAllTileSources", async (C, i) => {
    const o = C instanceof File ? C.name.split(".").pop() : C.split(".").pop();
    let r = C instanceof File ? Nt(C) : Ft(C);
    return r.then((Q) => (r = Q, Q.getImageCount())).then(
      (Q) => Promise.all([...Array(Q).keys()].map(async (s) => (await r).getImage(s)))
    ).then((Q) => {
      Q = Q.filter(
        (n) => n.fileDirectory.photometricInterpretation !== IA.TransparencyMask
      ), Q.sort((n, h) => h.getWidth() - n.getWidth());
      const s = 0.015;
      return Q.reduce((n, h) => {
        const c = h.getWidth() / h.getHeight();
        let D = "";
        h.fileDirectory.ImageDescription && (D = h.fileDirectory.ImageDescription.split(`
`)[1] ?? "");
        const y = n.filter(
          (d) => Math.abs(1 - d.aspectRatio / c) < s && !(D != null && D.includes("macro") || D != null && D.includes("label"))
          // Separate out macro thumbnails and labels
        );
        if (y.length === 0) {
          let d = {
            aspectRatio: c,
            images: [h]
          };
          n.push(d);
        } else
          y[0].images.push(h);
        return n;
      }, []).map((n) => n.images).map((n, h) => {
        if (h !== 0)
          return new g.GeoTIFFTileSource(
            {
              GeoTIFF: r,
              GeoTIFFImages: n
            },
            i
          );
        switch (o) {
          case "qptiff":
            const c = hE(n);
            return Array.from(c.values()).map((D, y) => new g.GeoTIFFTileSource(
              {
                GeoTIFF: r,
                GeoTIFFImages: D.images,
                channel: {
                  name: D.name,
                  color: D.color
                }
              },
              i
            ));
          default:
            return new g.GeoTIFFTileSource(
              {
                GeoTIFF: r,
                GeoTIFFImages: n
              },
              i
            );
        }
      });
    });
  });
  let A = e;
  g.GeoTIFFTileSource = A;
};
(function(g, I) {
  typeof exports > "u" || typeof g.OpenSeadragon < "u" && I(g.OpenSeadragon);
})(typeof window < "u" ? window : void 0, fE);
class yE extends MA {
  decodeBlock(I) {
    return I;
  }
}
const DE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yE
}, Symbol.toStringTag, { value: "Module" })), pt = 9, Wg = 256, we = 257, wE = 12;
function uE(g, I, A) {
  const e = I % 8, t = Math.floor(I / 8), B = 8 - e, C = I + A - (t + 1) * 8;
  let i = 8 * (t + 2) - (I + A);
  const o = (t + 2) * 8 - I;
  if (i = Math.max(0, i), t >= g.length)
    return console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)"), we;
  let r = g[t] & 2 ** (8 - e) - 1;
  r <<= A - B;
  let Q = r;
  if (t + 1 < g.length) {
    let s = g[t + 1] >>> i;
    s <<= Math.max(0, A - o), Q += s;
  }
  if (C > 8 && t + 2 < g.length) {
    const s = (t + 3) * 8 - (I + A), E = g[t + 2] >>> s;
    Q += E;
  }
  return Q;
}
function Vg(g, I) {
  for (let A = I.length - 1; A >= 0; A--)
    g.push(I[A]);
  return g;
}
function dE(g) {
  const I = new Uint16Array(4093), A = new Uint8Array(4093);
  for (let n = 0; n <= 257; n++)
    I[n] = 4096, A[n] = n;
  let e = 258, t = pt, B = 0;
  function C() {
    e = 258, t = pt;
  }
  function i(n) {
    const h = uE(n, B, t);
    return B += t, h;
  }
  function o(n, h) {
    return A[e] = h, I[e] = n, e++, e - 1;
  }
  function r(n) {
    const h = [];
    for (let c = n; c !== 4096; c = I[c])
      h.push(A[c]);
    return h;
  }
  const Q = [];
  C();
  const s = new Uint8Array(g);
  let E = i(s), a;
  for (; E !== we; ) {
    if (E === Wg) {
      for (C(), E = i(s); E === Wg; )
        E = i(s);
      if (E === we)
        break;
      if (E > Wg)
        throw new Error(`corrupted code at scanline ${E}`);
      {
        const n = r(E);
        Vg(Q, n), a = E;
      }
    } else if (E < e) {
      const n = r(E);
      Vg(Q, n), o(a, n[n.length - 1]), a = E;
    } else {
      const n = r(a);
      if (!n)
        throw new Error(`Bogus entry. Not in dictionary, ${a} / ${e}, position: ${B}`);
      Vg(Q, n), Q.push(n[n.length - 1]), o(a, n[n.length - 1]), a = E;
    }
    e + 1 >= 2 ** t && (t === wE ? a = void 0 : t++), E = i(s);
  }
  return new Uint8Array(Q);
}
class SE extends MA {
  decodeBlock(I) {
    return dE(I).buffer;
  }
}
const GE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SE
}, Symbol.toStringTag, { value: "Module" })), DI = new Int32Array([
  0,
  1,
  8,
  16,
  9,
  2,
  3,
  10,
  17,
  24,
  32,
  25,
  18,
  11,
  4,
  5,
  12,
  19,
  26,
  33,
  40,
  48,
  41,
  34,
  27,
  20,
  13,
  6,
  7,
  14,
  21,
  28,
  35,
  42,
  49,
  56,
  57,
  50,
  43,
  36,
  29,
  22,
  15,
  23,
  30,
  37,
  44,
  51,
  58,
  59,
  52,
  45,
  38,
  31,
  39,
  46,
  53,
  60,
  61,
  54,
  47,
  55,
  62,
  63
]), bI = 4017, JI = 799, HI = 3406, qI = 2276, xI = 1567, OI = 3784, jA = 5793, TI = 2896;
function Rt(g, I) {
  let A = 0;
  const e = [];
  let t = 16;
  for (; t > 0 && !g[t - 1]; )
    --t;
  e.push({ children: [], index: 0 });
  let B = e[0], C;
  for (let i = 0; i < t; i++) {
    for (let o = 0; o < g[i]; o++) {
      for (B = e.pop(), B.children[B.index] = I[A]; B.index > 0; )
        B = e.pop();
      for (B.index++, e.push(B); e.length <= i; )
        e.push(C = { children: [], index: 0 }), B.children[B.index] = C.children, B = C;
      A++;
    }
    i + 1 < t && (e.push(C = { children: [], index: 0 }), B.children[B.index] = C.children, B = C);
  }
  return e[0].children;
}
function FE(g, I, A, e, t, B, C, i, o) {
  const { mcusPerLine: r, progressive: Q } = A, s = I;
  let E = I, a = 0, n = 0;
  function h() {
    if (n > 0)
      return n--, a >> n & 1;
    if (a = g[E++], a === 255) {
      const k = g[E++];
      if (k)
        throw new Error(`unexpected marker: ${(a << 8 | k).toString(16)}`);
    }
    return n = 7, a >>> 7;
  }
  function c(k) {
    let U = k, m;
    for (; (m = h()) !== null; ) {
      if (U = U[m], typeof U == "number")
        return U;
      if (typeof U != "object")
        throw new Error("invalid huffman sequence");
    }
    return null;
  }
  function D(k) {
    let U = k, m = 0;
    for (; U > 0; ) {
      const O = h();
      if (O === null)
        return;
      m = m << 1 | O, --U;
    }
    return m;
  }
  function y(k) {
    const U = D(k);
    return U >= 1 << k - 1 ? U : U + (-1 << k) + 1;
  }
  function d(k, U) {
    const m = c(k.huffmanTableDC), O = m === 0 ? 0 : y(m);
    k.pred += O, U[0] = k.pred;
    let x = 1;
    for (; x < 64; ) {
      const P = c(k.huffmanTableAC), Z = P & 15, V = P >> 4;
      if (Z === 0) {
        if (V < 15)
          break;
        x += 16;
      } else {
        x += V;
        const gA = DI[x];
        U[gA] = y(Z), x++;
      }
    }
  }
  function l(k, U) {
    const m = c(k.huffmanTableDC), O = m === 0 ? 0 : y(m) << o;
    k.pred += O, U[0] = k.pred;
  }
  function w(k, U) {
    U[0] |= h() << o;
  }
  let S = 0;
  function G(k, U) {
    if (S > 0) {
      S--;
      return;
    }
    let m = B;
    const O = C;
    for (; m <= O; ) {
      const x = c(k.huffmanTableAC), P = x & 15, Z = x >> 4;
      if (P === 0) {
        if (Z < 15) {
          S = D(Z) + (1 << Z) - 1;
          break;
        }
        m += 16;
      } else {
        m += Z;
        const V = DI[m];
        U[V] = y(P) * (1 << o), m++;
      }
    }
  }
  let f = 0, F;
  function N(k, U) {
    let m = B;
    const O = C;
    let x = 0;
    for (; m <= O; ) {
      const P = DI[m], Z = U[P] < 0 ? -1 : 1;
      switch (f) {
        case 0: {
          const V = c(k.huffmanTableAC), gA = V & 15;
          if (x = V >> 4, gA === 0)
            x < 15 ? (S = D(x) + (1 << x), f = 4) : (x = 16, f = 1);
          else {
            if (gA !== 1)
              throw new Error("invalid ACn encoding");
            F = y(gA), f = x ? 2 : 3;
          }
          continue;
        }
        case 1:
        case 2:
          U[P] ? U[P] += (h() << o) * Z : (x--, x === 0 && (f = f === 2 ? 3 : 0));
          break;
        case 3:
          U[P] ? U[P] += (h() << o) * Z : (U[P] = F << o, f = 0);
          break;
        case 4:
          U[P] && (U[P] += (h() << o) * Z);
          break;
      }
      m++;
    }
    f === 4 && (S--, S === 0 && (f = 0));
  }
  function p(k, U, m, O, x) {
    const P = m / r | 0, Z = m % r, V = P * k.v + O, gA = Z * k.h + x;
    U(k, k.blocks[V][gA]);
  }
  function J(k, U, m) {
    const O = m / k.blocksPerLine | 0, x = m % k.blocksPerLine;
    U(k, k.blocks[O][x]);
  }
  const L = e.length;
  let b, Y, v, BA, rA, QA;
  Q ? B === 0 ? QA = i === 0 ? l : w : QA = i === 0 ? G : N : QA = d;
  let R = 0, K, H;
  L === 1 ? H = e[0].blocksPerLine * e[0].blocksPerColumn : H = r * A.mcusPerColumn;
  const j = t || H;
  for (; R < H; ) {
    for (Y = 0; Y < L; Y++)
      e[Y].pred = 0;
    if (S = 0, L === 1)
      for (b = e[0], rA = 0; rA < j; rA++)
        J(b, QA, R), R++;
    else
      for (rA = 0; rA < j; rA++) {
        for (Y = 0; Y < L; Y++) {
          b = e[Y];
          const { h: k, v: U } = b;
          for (v = 0; v < U; v++)
            for (BA = 0; BA < k; BA++)
              p(b, QA, R, v, BA);
        }
        if (R++, R === H)
          break;
      }
    if (n = 0, K = g[E] << 8 | g[E + 1], K < 65280)
      throw new Error("marker was not found");
    if (K >= 65488 && K <= 65495)
      E += 2;
    else
      break;
  }
  return E - s;
}
function NE(g, I) {
  const A = [], { blocksPerLine: e, blocksPerColumn: t } = I, B = e << 3, C = new Int32Array(64), i = new Uint8Array(64);
  function o(r, Q, s) {
    const E = I.quantizationTable;
    let a, n, h, c, D, y, d, l, w;
    const S = s;
    let G;
    for (G = 0; G < 64; G++)
      S[G] = r[G] * E[G];
    for (G = 0; G < 8; ++G) {
      const f = 8 * G;
      if (S[1 + f] === 0 && S[2 + f] === 0 && S[3 + f] === 0 && S[4 + f] === 0 && S[5 + f] === 0 && S[6 + f] === 0 && S[7 + f] === 0) {
        w = jA * S[0 + f] + 512 >> 10, S[0 + f] = w, S[1 + f] = w, S[2 + f] = w, S[3 + f] = w, S[4 + f] = w, S[5 + f] = w, S[6 + f] = w, S[7 + f] = w;
        continue;
      }
      a = jA * S[0 + f] + 128 >> 8, n = jA * S[4 + f] + 128 >> 8, h = S[2 + f], c = S[6 + f], D = TI * (S[1 + f] - S[7 + f]) + 128 >> 8, l = TI * (S[1 + f] + S[7 + f]) + 128 >> 8, y = S[3 + f] << 4, d = S[5 + f] << 4, w = a - n + 1 >> 1, a = a + n + 1 >> 1, n = w, w = h * OI + c * xI + 128 >> 8, h = h * xI - c * OI + 128 >> 8, c = w, w = D - d + 1 >> 1, D = D + d + 1 >> 1, d = w, w = l + y + 1 >> 1, y = l - y + 1 >> 1, l = w, w = a - c + 1 >> 1, a = a + c + 1 >> 1, c = w, w = n - h + 1 >> 1, n = n + h + 1 >> 1, h = w, w = D * qI + l * HI + 2048 >> 12, D = D * HI - l * qI + 2048 >> 12, l = w, w = y * JI + d * bI + 2048 >> 12, y = y * bI - d * JI + 2048 >> 12, d = w, S[0 + f] = a + l, S[7 + f] = a - l, S[1 + f] = n + d, S[6 + f] = n - d, S[2 + f] = h + y, S[5 + f] = h - y, S[3 + f] = c + D, S[4 + f] = c - D;
    }
    for (G = 0; G < 8; ++G) {
      const f = G;
      if (S[1 * 8 + f] === 0 && S[2 * 8 + f] === 0 && S[3 * 8 + f] === 0 && S[4 * 8 + f] === 0 && S[5 * 8 + f] === 0 && S[6 * 8 + f] === 0 && S[7 * 8 + f] === 0) {
        w = jA * s[G + 0] + 8192 >> 14, S[0 * 8 + f] = w, S[1 * 8 + f] = w, S[2 * 8 + f] = w, S[3 * 8 + f] = w, S[4 * 8 + f] = w, S[5 * 8 + f] = w, S[6 * 8 + f] = w, S[7 * 8 + f] = w;
        continue;
      }
      a = jA * S[0 * 8 + f] + 2048 >> 12, n = jA * S[4 * 8 + f] + 2048 >> 12, h = S[2 * 8 + f], c = S[6 * 8 + f], D = TI * (S[1 * 8 + f] - S[7 * 8 + f]) + 2048 >> 12, l = TI * (S[1 * 8 + f] + S[7 * 8 + f]) + 2048 >> 12, y = S[3 * 8 + f], d = S[5 * 8 + f], w = a - n + 1 >> 1, a = a + n + 1 >> 1, n = w, w = h * OI + c * xI + 2048 >> 12, h = h * xI - c * OI + 2048 >> 12, c = w, w = D - d + 1 >> 1, D = D + d + 1 >> 1, d = w, w = l + y + 1 >> 1, y = l - y + 1 >> 1, l = w, w = a - c + 1 >> 1, a = a + c + 1 >> 1, c = w, w = n - h + 1 >> 1, n = n + h + 1 >> 1, h = w, w = D * qI + l * HI + 2048 >> 12, D = D * HI - l * qI + 2048 >> 12, l = w, w = y * JI + d * bI + 2048 >> 12, y = y * bI - d * JI + 2048 >> 12, d = w, S[0 * 8 + f] = a + l, S[7 * 8 + f] = a - l, S[1 * 8 + f] = n + d, S[6 * 8 + f] = n - d, S[2 * 8 + f] = h + y, S[5 * 8 + f] = h - y, S[3 * 8 + f] = c + D, S[4 * 8 + f] = c - D;
    }
    for (G = 0; G < 64; ++G) {
      const f = 128 + (S[G] + 8 >> 4);
      f < 0 ? Q[G] = 0 : f > 255 ? Q[G] = 255 : Q[G] = f;
    }
  }
  for (let r = 0; r < t; r++) {
    const Q = r << 3;
    for (let s = 0; s < 8; s++)
      A.push(new Uint8Array(B));
    for (let s = 0; s < e; s++) {
      o(I.blocks[r][s], i, C);
      let E = 0;
      const a = s << 3;
      for (let n = 0; n < 8; n++) {
        const h = A[Q + n];
        for (let c = 0; c < 8; c++)
          h[a + c] = i[E++];
      }
    }
  }
  return A;
}
class pE {
  constructor() {
    this.jfif = null, this.adobe = null, this.quantizationTables = [], this.huffmanTablesAC = [], this.huffmanTablesDC = [], this.resetFrames();
  }
  resetFrames() {
    this.frames = [];
  }
  parse(I) {
    let A = 0;
    function e() {
      const i = I[A] << 8 | I[A + 1];
      return A += 2, i;
    }
    function t() {
      const i = e(), o = I.subarray(A, A + i - 2);
      return A += o.length, o;
    }
    function B(i) {
      let o = 0, r = 0, Q, s;
      for (s in i.components)
        i.components.hasOwnProperty(s) && (Q = i.components[s], o < Q.h && (o = Q.h), r < Q.v && (r = Q.v));
      const E = Math.ceil(i.samplesPerLine / 8 / o), a = Math.ceil(i.scanLines / 8 / r);
      for (s in i.components)
        if (i.components.hasOwnProperty(s)) {
          Q = i.components[s];
          const n = Math.ceil(Math.ceil(i.samplesPerLine / 8) * Q.h / o), h = Math.ceil(Math.ceil(i.scanLines / 8) * Q.v / r), c = E * Q.h, D = a * Q.v, y = [];
          for (let d = 0; d < D; d++) {
            const l = [];
            for (let w = 0; w < c; w++)
              l.push(new Int32Array(64));
            y.push(l);
          }
          Q.blocksPerLine = n, Q.blocksPerColumn = h, Q.blocks = y;
        }
      i.maxH = o, i.maxV = r, i.mcusPerLine = E, i.mcusPerColumn = a;
    }
    let C = e();
    if (C !== 65496)
      throw new Error("SOI not found");
    for (C = e(); C !== 65497; ) {
      switch (C) {
        case 65280:
          break;
        case 65504:
        case 65505:
        case 65506:
        case 65507:
        case 65508:
        case 65509:
        case 65510:
        case 65511:
        case 65512:
        case 65513:
        case 65514:
        case 65515:
        case 65516:
        case 65517:
        case 65518:
        case 65519:
        case 65534: {
          const i = t();
          C === 65504 && i[0] === 74 && i[1] === 70 && i[2] === 73 && i[3] === 70 && i[4] === 0 && (this.jfif = {
            version: { major: i[5], minor: i[6] },
            densityUnits: i[7],
            xDensity: i[8] << 8 | i[9],
            yDensity: i[10] << 8 | i[11],
            thumbWidth: i[12],
            thumbHeight: i[13],
            thumbData: i.subarray(14, 14 + 3 * i[12] * i[13])
          }), C === 65518 && i[0] === 65 && i[1] === 100 && i[2] === 111 && i[3] === 98 && i[4] === 101 && i[5] === 0 && (this.adobe = {
            version: i[6],
            flags0: i[7] << 8 | i[8],
            flags1: i[9] << 8 | i[10],
            transformCode: i[11]
          });
          break;
        }
        case 65499: {
          const o = e() + A - 2;
          for (; A < o; ) {
            const r = I[A++], Q = new Int32Array(64);
            if (r >> 4)
              if (r >> 4 === 1)
                for (let s = 0; s < 64; s++) {
                  const E = DI[s];
                  Q[E] = e();
                }
              else
                throw new Error("DQT: invalid table spec");
            else for (let s = 0; s < 64; s++) {
              const E = DI[s];
              Q[E] = I[A++];
            }
            this.quantizationTables[r & 15] = Q;
          }
          break;
        }
        case 65472:
        case 65473:
        case 65474: {
          e();
          const i = {
            extended: C === 65473,
            progressive: C === 65474,
            precision: I[A++],
            scanLines: e(),
            samplesPerLine: e(),
            components: {},
            componentsOrder: []
          }, o = I[A++];
          let r;
          for (let Q = 0; Q < o; Q++) {
            r = I[A];
            const s = I[A + 1] >> 4, E = I[A + 1] & 15, a = I[A + 2];
            i.componentsOrder.push(r), i.components[r] = {
              h: s,
              v: E,
              quantizationIdx: a
            }, A += 3;
          }
          B(i), this.frames.push(i);
          break;
        }
        case 65476: {
          const i = e();
          for (let o = 2; o < i; ) {
            const r = I[A++], Q = new Uint8Array(16);
            let s = 0;
            for (let a = 0; a < 16; a++, A++)
              Q[a] = I[A], s += Q[a];
            const E = new Uint8Array(s);
            for (let a = 0; a < s; a++, A++)
              E[a] = I[A];
            o += 17 + s, r >> 4 ? this.huffmanTablesAC[r & 15] = Rt(
              Q,
              E
            ) : this.huffmanTablesDC[r & 15] = Rt(
              Q,
              E
            );
          }
          break;
        }
        case 65501:
          e(), this.resetInterval = e();
          break;
        case 65498: {
          e();
          const i = I[A++], o = [], r = this.frames[0];
          for (let n = 0; n < i; n++) {
            const h = r.components[I[A++]], c = I[A++];
            h.huffmanTableDC = this.huffmanTablesDC[c >> 4], h.huffmanTableAC = this.huffmanTablesAC[c & 15], o.push(h);
          }
          const Q = I[A++], s = I[A++], E = I[A++], a = FE(
            I,
            A,
            r,
            o,
            this.resetInterval,
            Q,
            s,
            E >> 4,
            E & 15
          );
          A += a;
          break;
        }
        case 65535:
          I[A] !== 255 && A--;
          break;
        default:
          if (I[A - 3] === 255 && I[A - 2] >= 192 && I[A - 2] <= 254) {
            A -= 3;
            break;
          }
          throw new Error(`unknown JPEG marker ${C.toString(16)}`);
      }
      C = e();
    }
  }
  getResult() {
    const { frames: I } = this;
    if (this.frames.length === 0)
      throw new Error("no frames were decoded");
    this.frames.length > 1 && console.warn("more than one frame is not supported");
    for (let Q = 0; Q < this.frames.length; Q++) {
      const s = this.frames[Q].components;
      for (const E of Object.keys(s))
        s[E].quantizationTable = this.quantizationTables[s[E].quantizationIdx], delete s[E].quantizationIdx;
    }
    const A = I[0], { components: e, componentsOrder: t } = A, B = [], C = A.samplesPerLine, i = A.scanLines;
    for (let Q = 0; Q < t.length; Q++) {
      const s = e[t[Q]];
      B.push({
        lines: NE(A, s),
        scaleX: s.h / A.maxH,
        scaleY: s.v / A.maxV
      });
    }
    const o = new Uint8Array(C * i * B.length);
    let r = 0;
    for (let Q = 0; Q < i; ++Q)
      for (let s = 0; s < C; ++s)
        for (let E = 0; E < B.length; ++E) {
          const a = B[E];
          o[r] = a.lines[0 | Q * a.scaleY][0 | s * a.scaleX], ++r;
        }
    return o;
  }
}
class RE extends MA {
  constructor(I) {
    super(I), this.reader = new pE(), I.JPEGTables && this.reader.parse(I.JPEGTables);
  }
  decodeBlock(I) {
    try {
      return this.reader.resetFrames(), this.reader.parse(new Uint8Array(I)), this.reader.getResult().buffer;
    } catch (A) {
      if (A.message === "SOI not found") {
        console.warn("Suppressed JPEG decoding error: SOI not found");
        const e = new ArrayBuffer(4), t = new Uint8Array(e);
        return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, e;
      }
      throw A;
    }
  }
}
const kE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RE
}, Symbol.toStringTag, { value: "Module" }));
function QI(g) {
  let I = g.length;
  for (; --I >= 0; )
    g[I] = 0;
}
const LE = 3, UE = 258, Ai = 29, YE = 256, mE = YE + 1 + Ai, Ii = 30, ME = 512, KE = new Array((mE + 2) * 2);
QI(KE);
const bE = new Array(Ii * 2);
QI(bE);
const JE = new Array(ME);
QI(JE);
const HE = new Array(UE - LE + 1);
QI(HE);
const qE = new Array(Ai);
QI(qE);
const xE = new Array(Ii);
QI(xE);
const OE = (g, I, A, e) => {
  let t = g & 65535 | 0, B = g >>> 16 & 65535 | 0, C = 0;
  for (; A !== 0; ) {
    C = A > 2e3 ? 2e3 : A, A -= C;
    do
      t = t + I[e++] | 0, B = B + t | 0;
    while (--C);
    t %= 65521, B %= 65521;
  }
  return t | B << 16 | 0;
};
var ue = OE;
const TE = () => {
  let g, I = [];
  for (var A = 0; A < 256; A++) {
    g = A;
    for (var e = 0; e < 8; e++)
      g = g & 1 ? 3988292384 ^ g >>> 1 : g >>> 1;
    I[A] = g;
  }
  return I;
}, vE = new Uint32Array(TE()), PE = (g, I, A, e) => {
  const t = vE, B = e + A;
  g ^= -1;
  for (let C = e; C < B; C++)
    g = g >>> 8 ^ t[(g ^ I[C]) & 255];
  return g ^ -1;
};
var DA = PE, de = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, gi = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
const jE = (g, I) => Object.prototype.hasOwnProperty.call(g, I);
var ZE = function(g) {
  const I = Array.prototype.slice.call(arguments, 1);
  for (; I.length; ) {
    const A = I.shift();
    if (A) {
      if (typeof A != "object")
        throw new TypeError(A + "must be non-object");
      for (const e in A)
        jE(A, e) && (g[e] = A[e]);
    }
  }
  return g;
}, WE = (g) => {
  let I = 0;
  for (let e = 0, t = g.length; e < t; e++)
    I += g[e].length;
  const A = new Uint8Array(I);
  for (let e = 0, t = 0, B = g.length; e < B; e++) {
    let C = g[e];
    A.set(C, t), t += C.length;
  }
  return A;
}, ei = {
  assign: ZE,
  flattenChunks: WE
};
let ti = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  ti = !1;
}
const FI = new Uint8Array(256);
for (let g = 0; g < 256; g++)
  FI[g] = g >= 252 ? 6 : g >= 248 ? 5 : g >= 240 ? 4 : g >= 224 ? 3 : g >= 192 ? 2 : 1;
FI[254] = FI[254] = 1;
var VE = (g) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(g);
  let I, A, e, t, B, C = g.length, i = 0;
  for (t = 0; t < C; t++)
    A = g.charCodeAt(t), (A & 64512) === 55296 && t + 1 < C && (e = g.charCodeAt(t + 1), (e & 64512) === 56320 && (A = 65536 + (A - 55296 << 10) + (e - 56320), t++)), i += A < 128 ? 1 : A < 2048 ? 2 : A < 65536 ? 3 : 4;
  for (I = new Uint8Array(i), B = 0, t = 0; B < i; t++)
    A = g.charCodeAt(t), (A & 64512) === 55296 && t + 1 < C && (e = g.charCodeAt(t + 1), (e & 64512) === 56320 && (A = 65536 + (A - 55296 << 10) + (e - 56320), t++)), A < 128 ? I[B++] = A : A < 2048 ? (I[B++] = 192 | A >>> 6, I[B++] = 128 | A & 63) : A < 65536 ? (I[B++] = 224 | A >>> 12, I[B++] = 128 | A >>> 6 & 63, I[B++] = 128 | A & 63) : (I[B++] = 240 | A >>> 18, I[B++] = 128 | A >>> 12 & 63, I[B++] = 128 | A >>> 6 & 63, I[B++] = 128 | A & 63);
  return I;
};
const _E = (g, I) => {
  if (I < 65534 && g.subarray && ti)
    return String.fromCharCode.apply(null, g.length === I ? g : g.subarray(0, I));
  let A = "";
  for (let e = 0; e < I; e++)
    A += String.fromCharCode(g[e]);
  return A;
};
var zE = (g, I) => {
  const A = I || g.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(g.subarray(0, I));
  let e, t;
  const B = new Array(A * 2);
  for (t = 0, e = 0; e < A; ) {
    let C = g[e++];
    if (C < 128) {
      B[t++] = C;
      continue;
    }
    let i = FI[C];
    if (i > 4) {
      B[t++] = 65533, e += i - 1;
      continue;
    }
    for (C &= i === 2 ? 31 : i === 3 ? 15 : 7; i > 1 && e < A; )
      C = C << 6 | g[e++] & 63, i--;
    if (i > 1) {
      B[t++] = 65533;
      continue;
    }
    C < 65536 ? B[t++] = C : (C -= 65536, B[t++] = 55296 | C >> 10 & 1023, B[t++] = 56320 | C & 1023);
  }
  return _E(B, t);
}, XE = (g, I) => {
  I = I || g.length, I > g.length && (I = g.length);
  let A = I - 1;
  for (; A >= 0 && (g[A] & 192) === 128; )
    A--;
  return A < 0 || A === 0 ? I : A + FI[g[A]] > I ? A : I;
}, Se = {
  string2buf: VE,
  buf2string: zE,
  utf8border: XE
};
function $E() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var Aa = $E;
const vI = 16209, Ia = 16191;
var ga = function(I, A) {
  let e, t, B, C, i, o, r, Q, s, E, a, n, h, c, D, y, d, l, w, S, G, f, F, N;
  const p = I.state;
  e = I.next_in, F = I.input, t = e + (I.avail_in - 5), B = I.next_out, N = I.output, C = B - (A - I.avail_out), i = B + (I.avail_out - 257), o = p.dmax, r = p.wsize, Q = p.whave, s = p.wnext, E = p.window, a = p.hold, n = p.bits, h = p.lencode, c = p.distcode, D = (1 << p.lenbits) - 1, y = (1 << p.distbits) - 1;
  A:
    do {
      n < 15 && (a += F[e++] << n, n += 8, a += F[e++] << n, n += 8), d = h[a & D];
      I:
        for (; ; ) {
          if (l = d >>> 24, a >>>= l, n -= l, l = d >>> 16 & 255, l === 0)
            N[B++] = d & 65535;
          else if (l & 16) {
            w = d & 65535, l &= 15, l && (n < l && (a += F[e++] << n, n += 8), w += a & (1 << l) - 1, a >>>= l, n -= l), n < 15 && (a += F[e++] << n, n += 8, a += F[e++] << n, n += 8), d = c[a & y];
            g:
              for (; ; ) {
                if (l = d >>> 24, a >>>= l, n -= l, l = d >>> 16 & 255, l & 16) {
                  if (S = d & 65535, l &= 15, n < l && (a += F[e++] << n, n += 8, n < l && (a += F[e++] << n, n += 8)), S += a & (1 << l) - 1, S > o) {
                    I.msg = "invalid distance too far back", p.mode = vI;
                    break A;
                  }
                  if (a >>>= l, n -= l, l = B - C, S > l) {
                    if (l = S - l, l > Q && p.sane) {
                      I.msg = "invalid distance too far back", p.mode = vI;
                      break A;
                    }
                    if (G = 0, f = E, s === 0) {
                      if (G += r - l, l < w) {
                        w -= l;
                        do
                          N[B++] = E[G++];
                        while (--l);
                        G = B - S, f = N;
                      }
                    } else if (s < l) {
                      if (G += r + s - l, l -= s, l < w) {
                        w -= l;
                        do
                          N[B++] = E[G++];
                        while (--l);
                        if (G = 0, s < w) {
                          l = s, w -= l;
                          do
                            N[B++] = E[G++];
                          while (--l);
                          G = B - S, f = N;
                        }
                      }
                    } else if (G += s - l, l < w) {
                      w -= l;
                      do
                        N[B++] = E[G++];
                      while (--l);
                      G = B - S, f = N;
                    }
                    for (; w > 2; )
                      N[B++] = f[G++], N[B++] = f[G++], N[B++] = f[G++], w -= 3;
                    w && (N[B++] = f[G++], w > 1 && (N[B++] = f[G++]));
                  } else {
                    G = B - S;
                    do
                      N[B++] = N[G++], N[B++] = N[G++], N[B++] = N[G++], w -= 3;
                    while (w > 2);
                    w && (N[B++] = N[G++], w > 1 && (N[B++] = N[G++]));
                  }
                } else if (l & 64) {
                  I.msg = "invalid distance code", p.mode = vI;
                  break A;
                } else {
                  d = c[(d & 65535) + (a & (1 << l) - 1)];
                  continue g;
                }
                break;
              }
          } else if (l & 64)
            if (l & 32) {
              p.mode = Ia;
              break A;
            } else {
              I.msg = "invalid literal/length code", p.mode = vI;
              break A;
            }
          else {
            d = h[(d & 65535) + (a & (1 << l) - 1)];
            continue I;
          }
          break;
        }
    } while (e < t && B < i);
  w = n >> 3, e -= w, n -= w << 3, a &= (1 << n) - 1, I.next_in = e, I.next_out = B, I.avail_in = e < t ? 5 + (t - e) : 5 - (e - t), I.avail_out = B < i ? 257 + (i - B) : 257 - (B - i), p.hold = a, p.bits = n;
};
const ZA = 15, kt = 852, Lt = 592, Ut = 0, _g = 1, Yt = 2, ea = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]), ta = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]), Ba = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]), ia = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]), Ca = (g, I, A, e, t, B, C, i) => {
  const o = i.bits;
  let r = 0, Q = 0, s = 0, E = 0, a = 0, n = 0, h = 0, c = 0, D = 0, y = 0, d, l, w, S, G, f = null, F;
  const N = new Uint16Array(ZA + 1), p = new Uint16Array(ZA + 1);
  let J = null, L, b, Y;
  for (r = 0; r <= ZA; r++)
    N[r] = 0;
  for (Q = 0; Q < e; Q++)
    N[I[A + Q]]++;
  for (a = o, E = ZA; E >= 1 && N[E] === 0; E--)
    ;
  if (a > E && (a = E), E === 0)
    return t[B++] = 1 << 24 | 64 << 16 | 0, t[B++] = 1 << 24 | 64 << 16 | 0, i.bits = 1, 0;
  for (s = 1; s < E && N[s] === 0; s++)
    ;
  for (a < s && (a = s), c = 1, r = 1; r <= ZA; r++)
    if (c <<= 1, c -= N[r], c < 0)
      return -1;
  if (c > 0 && (g === Ut || E !== 1))
    return -1;
  for (p[1] = 0, r = 1; r < ZA; r++)
    p[r + 1] = p[r] + N[r];
  for (Q = 0; Q < e; Q++)
    I[A + Q] !== 0 && (C[p[I[A + Q]]++] = Q);
  if (g === Ut ? (f = J = C, F = 20) : g === _g ? (f = ea, J = ta, F = 257) : (f = Ba, J = ia, F = 0), y = 0, Q = 0, r = s, G = B, n = a, h = 0, w = -1, D = 1 << a, S = D - 1, g === _g && D > kt || g === Yt && D > Lt)
    return 1;
  for (; ; ) {
    L = r - h, C[Q] + 1 < F ? (b = 0, Y = C[Q]) : C[Q] >= F ? (b = J[C[Q] - F], Y = f[C[Q] - F]) : (b = 96, Y = 0), d = 1 << r - h, l = 1 << n, s = l;
    do
      l -= d, t[G + (y >> h) + l] = L << 24 | b << 16 | Y | 0;
    while (l !== 0);
    for (d = 1 << r - 1; y & d; )
      d >>= 1;
    if (d !== 0 ? (y &= d - 1, y += d) : y = 0, Q++, --N[r] === 0) {
      if (r === E)
        break;
      r = I[A + C[Q]];
    }
    if (r > a && (y & S) !== w) {
      for (h === 0 && (h = a), G += s, n = r - h, c = 1 << n; n + h < E && (c -= N[n + h], !(c <= 0)); )
        n++, c <<= 1;
      if (D += 1 << n, g === _g && D > kt || g === Yt && D > Lt)
        return 1;
      w = y & S, t[w] = a << 24 | n << 16 | G - B | 0;
    }
  }
  return y !== 0 && (t[G + y] = r - h << 24 | 64 << 16 | 0), i.bits = a, 0;
};
var wI = Ca;
const ra = 0, Bi = 1, ii = 2, {
  Z_FINISH: mt,
  Z_BLOCK: Qa,
  Z_TREES: PI,
  Z_OK: xA,
  Z_STREAM_END: oa,
  Z_NEED_DICT: Ea,
  Z_STREAM_ERROR: nA,
  Z_DATA_ERROR: Ci,
  Z_MEM_ERROR: ri,
  Z_BUF_ERROR: aa,
  Z_DEFLATED: Mt
} = gi, lg = 16180, Kt = 16181, bt = 16182, Jt = 16183, Ht = 16184, qt = 16185, xt = 16186, Ot = 16187, Tt = 16188, vt = 16189, Qg = 16190, SA = 16191, zg = 16192, Pt = 16193, Xg = 16194, jt = 16195, Zt = 16196, Wt = 16197, Vt = 16198, jI = 16199, ZI = 16200, _t = 16201, zt = 16202, Xt = 16203, $t = 16204, AB = 16205, $g = 16206, IB = 16207, gB = 16208, X = 16209, Qi = 16210, oi = 16211, sa = 852, na = 592, ca = 15, ha = ca, eB = (g) => (g >>> 24 & 255) + (g >>> 8 & 65280) + ((g & 65280) << 8) + ((g & 255) << 24);
function la() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const TA = (g) => {
  if (!g)
    return 1;
  const I = g.state;
  return !I || I.strm !== g || I.mode < lg || I.mode > oi ? 1 : 0;
}, Ei = (g) => {
  if (TA(g))
    return nA;
  const I = g.state;
  return g.total_in = g.total_out = I.total = 0, g.msg = "", I.wrap && (g.adler = I.wrap & 1), I.mode = lg, I.last = 0, I.havedict = 0, I.flags = -1, I.dmax = 32768, I.head = null, I.hold = 0, I.bits = 0, I.lencode = I.lendyn = new Int32Array(sa), I.distcode = I.distdyn = new Int32Array(na), I.sane = 1, I.back = -1, xA;
}, ai = (g) => {
  if (TA(g))
    return nA;
  const I = g.state;
  return I.wsize = 0, I.whave = 0, I.wnext = 0, Ei(g);
}, si = (g, I) => {
  let A;
  if (TA(g))
    return nA;
  const e = g.state;
  return I < 0 ? (A = 0, I = -I) : (A = (I >> 4) + 5, I < 48 && (I &= 15)), I && (I < 8 || I > 15) ? nA : (e.window !== null && e.wbits !== I && (e.window = null), e.wrap = A, e.wbits = I, ai(g));
}, ni = (g, I) => {
  if (!g)
    return nA;
  const A = new la();
  g.state = A, A.strm = g, A.window = null, A.mode = lg;
  const e = si(g, I);
  return e !== xA && (g.state = null), e;
}, fa = (g) => ni(g, ha);
let tB = !0, Ae, Ie;
const ya = (g) => {
  if (tB) {
    Ae = new Int32Array(512), Ie = new Int32Array(32);
    let I = 0;
    for (; I < 144; )
      g.lens[I++] = 8;
    for (; I < 256; )
      g.lens[I++] = 9;
    for (; I < 280; )
      g.lens[I++] = 7;
    for (; I < 288; )
      g.lens[I++] = 8;
    for (wI(Bi, g.lens, 0, 288, Ae, 0, g.work, { bits: 9 }), I = 0; I < 32; )
      g.lens[I++] = 5;
    wI(ii, g.lens, 0, 32, Ie, 0, g.work, { bits: 5 }), tB = !1;
  }
  g.lencode = Ae, g.lenbits = 9, g.distcode = Ie, g.distbits = 5;
}, ci = (g, I, A, e) => {
  let t;
  const B = g.state;
  return B.window === null && (B.wsize = 1 << B.wbits, B.wnext = 0, B.whave = 0, B.window = new Uint8Array(B.wsize)), e >= B.wsize ? (B.window.set(I.subarray(A - B.wsize, A), 0), B.wnext = 0, B.whave = B.wsize) : (t = B.wsize - B.wnext, t > e && (t = e), B.window.set(I.subarray(A - e, A - e + t), B.wnext), e -= t, e ? (B.window.set(I.subarray(A - e, A), 0), B.wnext = e, B.whave = B.wsize) : (B.wnext += t, B.wnext === B.wsize && (B.wnext = 0), B.whave < B.wsize && (B.whave += t))), 0;
}, Da = (g, I) => {
  let A, e, t, B, C, i, o, r, Q, s, E, a, n, h, c = 0, D, y, d, l, w, S, G, f;
  const F = new Uint8Array(4);
  let N, p;
  const J = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (TA(g) || !g.output || !g.input && g.avail_in !== 0)
    return nA;
  A = g.state, A.mode === SA && (A.mode = zg), C = g.next_out, t = g.output, o = g.avail_out, B = g.next_in, e = g.input, i = g.avail_in, r = A.hold, Q = A.bits, s = i, E = o, f = xA;
  A:
    for (; ; )
      switch (A.mode) {
        case lg:
          if (A.wrap === 0) {
            A.mode = zg;
            break;
          }
          for (; Q < 16; ) {
            if (i === 0)
              break A;
            i--, r += e[B++] << Q, Q += 8;
          }
          if (A.wrap & 2 && r === 35615) {
            A.wbits === 0 && (A.wbits = 15), A.check = 0, F[0] = r & 255, F[1] = r >>> 8 & 255, A.check = DA(A.check, F, 2, 0), r = 0, Q = 0, A.mode = Kt;
            break;
          }
          if (A.head && (A.head.done = !1), !(A.wrap & 1) || /* check if zlib header allowed */
          (((r & 255) << 8) + (r >> 8)) % 31) {
            g.msg = "incorrect header check", A.mode = X;
            break;
          }
          if ((r & 15) !== Mt) {
            g.msg = "unknown compression method", A.mode = X;
            break;
          }
          if (r >>>= 4, Q -= 4, G = (r & 15) + 8, A.wbits === 0 && (A.wbits = G), G > 15 || G > A.wbits) {
            g.msg = "invalid window size", A.mode = X;
            break;
          }
          A.dmax = 1 << A.wbits, A.flags = 0, g.adler = A.check = 1, A.mode = r & 512 ? vt : SA, r = 0, Q = 0;
          break;
        case Kt:
          for (; Q < 16; ) {
            if (i === 0)
              break A;
            i--, r += e[B++] << Q, Q += 8;
          }
          if (A.flags = r, (A.flags & 255) !== Mt) {
            g.msg = "unknown compression method", A.mode = X;
            break;
          }
          if (A.flags & 57344) {
            g.msg = "unknown header flags set", A.mode = X;
            break;
          }
          A.head && (A.head.text = r >> 8 & 1), A.flags & 512 && A.wrap & 4 && (F[0] = r & 255, F[1] = r >>> 8 & 255, A.check = DA(A.check, F, 2, 0)), r = 0, Q = 0, A.mode = bt;
        case bt:
          for (; Q < 32; ) {
            if (i === 0)
              break A;
            i--, r += e[B++] << Q, Q += 8;
          }
          A.head && (A.head.time = r), A.flags & 512 && A.wrap & 4 && (F[0] = r & 255, F[1] = r >>> 8 & 255, F[2] = r >>> 16 & 255, F[3] = r >>> 24 & 255, A.check = DA(A.check, F, 4, 0)), r = 0, Q = 0, A.mode = Jt;
        case Jt:
          for (; Q < 16; ) {
            if (i === 0)
              break A;
            i--, r += e[B++] << Q, Q += 8;
          }
          A.head && (A.head.xflags = r & 255, A.head.os = r >> 8), A.flags & 512 && A.wrap & 4 && (F[0] = r & 255, F[1] = r >>> 8 & 255, A.check = DA(A.check, F, 2, 0)), r = 0, Q = 0, A.mode = Ht;
        case Ht:
          if (A.flags & 1024) {
            for (; Q < 16; ) {
              if (i === 0)
                break A;
              i--, r += e[B++] << Q, Q += 8;
            }
            A.length = r, A.head && (A.head.extra_len = r), A.flags & 512 && A.wrap & 4 && (F[0] = r & 255, F[1] = r >>> 8 & 255, A.check = DA(A.check, F, 2, 0)), r = 0, Q = 0;
          } else A.head && (A.head.extra = null);
          A.mode = qt;
        case qt:
          if (A.flags & 1024 && (a = A.length, a > i && (a = i), a && (A.head && (G = A.head.extra_len - A.length, A.head.extra || (A.head.extra = new Uint8Array(A.head.extra_len)), A.head.extra.set(
            e.subarray(
              B,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              B + a
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            G
          )), A.flags & 512 && A.wrap & 4 && (A.check = DA(A.check, e, a, B)), i -= a, B += a, A.length -= a), A.length))
            break A;
          A.length = 0, A.mode = xt;
        case xt:
          if (A.flags & 2048) {
            if (i === 0)
              break A;
            a = 0;
            do
              G = e[B + a++], A.head && G && A.length < 65536 && (A.head.name += String.fromCharCode(G));
            while (G && a < i);
            if (A.flags & 512 && A.wrap & 4 && (A.check = DA(A.check, e, a, B)), i -= a, B += a, G)
              break A;
          } else A.head && (A.head.name = null);
          A.length = 0, A.mode = Ot;
        case Ot:
          if (A.flags & 4096) {
            if (i === 0)
              break A;
            a = 0;
            do
              G = e[B + a++], A.head && G && A.length < 65536 && (A.head.comment += String.fromCharCode(G));
            while (G && a < i);
            if (A.flags & 512 && A.wrap & 4 && (A.check = DA(A.check, e, a, B)), i -= a, B += a, G)
              break A;
          } else A.head && (A.head.comment = null);
          A.mode = Tt;
        case Tt:
          if (A.flags & 512) {
            for (; Q < 16; ) {
              if (i === 0)
                break A;
              i--, r += e[B++] << Q, Q += 8;
            }
            if (A.wrap & 4 && r !== (A.check & 65535)) {
              g.msg = "header crc mismatch", A.mode = X;
              break;
            }
            r = 0, Q = 0;
          }
          A.head && (A.head.hcrc = A.flags >> 9 & 1, A.head.done = !0), g.adler = A.check = 0, A.mode = SA;
          break;
        case vt:
          for (; Q < 32; ) {
            if (i === 0)
              break A;
            i--, r += e[B++] << Q, Q += 8;
          }
          g.adler = A.check = eB(r), r = 0, Q = 0, A.mode = Qg;
        case Qg:
          if (A.havedict === 0)
            return g.next_out = C, g.avail_out = o, g.next_in = B, g.avail_in = i, A.hold = r, A.bits = Q, Ea;
          g.adler = A.check = 1, A.mode = SA;
        case SA:
          if (I === Qa || I === PI)
            break A;
        case zg:
          if (A.last) {
            r >>>= Q & 7, Q -= Q & 7, A.mode = $g;
            break;
          }
          for (; Q < 3; ) {
            if (i === 0)
              break A;
            i--, r += e[B++] << Q, Q += 8;
          }
          switch (A.last = r & 1, r >>>= 1, Q -= 1, r & 3) {
            case 0:
              A.mode = Pt;
              break;
            case 1:
              if (ya(A), A.mode = jI, I === PI) {
                r >>>= 2, Q -= 2;
                break A;
              }
              break;
            case 2:
              A.mode = Zt;
              break;
            case 3:
              g.msg = "invalid block type", A.mode = X;
          }
          r >>>= 2, Q -= 2;
          break;
        case Pt:
          for (r >>>= Q & 7, Q -= Q & 7; Q < 32; ) {
            if (i === 0)
              break A;
            i--, r += e[B++] << Q, Q += 8;
          }
          if ((r & 65535) !== (r >>> 16 ^ 65535)) {
            g.msg = "invalid stored block lengths", A.mode = X;
            break;
          }
          if (A.length = r & 65535, r = 0, Q = 0, A.mode = Xg, I === PI)
            break A;
        case Xg:
          A.mode = jt;
        case jt:
          if (a = A.length, a) {
            if (a > i && (a = i), a > o && (a = o), a === 0)
              break A;
            t.set(e.subarray(B, B + a), C), i -= a, B += a, o -= a, C += a, A.length -= a;
            break;
          }
          A.mode = SA;
          break;
        case Zt:
          for (; Q < 14; ) {
            if (i === 0)
              break A;
            i--, r += e[B++] << Q, Q += 8;
          }
          if (A.nlen = (r & 31) + 257, r >>>= 5, Q -= 5, A.ndist = (r & 31) + 1, r >>>= 5, Q -= 5, A.ncode = (r & 15) + 4, r >>>= 4, Q -= 4, A.nlen > 286 || A.ndist > 30) {
            g.msg = "too many length or distance symbols", A.mode = X;
            break;
          }
          A.have = 0, A.mode = Wt;
        case Wt:
          for (; A.have < A.ncode; ) {
            for (; Q < 3; ) {
              if (i === 0)
                break A;
              i--, r += e[B++] << Q, Q += 8;
            }
            A.lens[J[A.have++]] = r & 7, r >>>= 3, Q -= 3;
          }
          for (; A.have < 19; )
            A.lens[J[A.have++]] = 0;
          if (A.lencode = A.lendyn, A.lenbits = 7, N = { bits: A.lenbits }, f = wI(ra, A.lens, 0, 19, A.lencode, 0, A.work, N), A.lenbits = N.bits, f) {
            g.msg = "invalid code lengths set", A.mode = X;
            break;
          }
          A.have = 0, A.mode = Vt;
        case Vt:
          for (; A.have < A.nlen + A.ndist; ) {
            for (; c = A.lencode[r & (1 << A.lenbits) - 1], D = c >>> 24, y = c >>> 16 & 255, d = c & 65535, !(D <= Q); ) {
              if (i === 0)
                break A;
              i--, r += e[B++] << Q, Q += 8;
            }
            if (d < 16)
              r >>>= D, Q -= D, A.lens[A.have++] = d;
            else {
              if (d === 16) {
                for (p = D + 2; Q < p; ) {
                  if (i === 0)
                    break A;
                  i--, r += e[B++] << Q, Q += 8;
                }
                if (r >>>= D, Q -= D, A.have === 0) {
                  g.msg = "invalid bit length repeat", A.mode = X;
                  break;
                }
                G = A.lens[A.have - 1], a = 3 + (r & 3), r >>>= 2, Q -= 2;
              } else if (d === 17) {
                for (p = D + 3; Q < p; ) {
                  if (i === 0)
                    break A;
                  i--, r += e[B++] << Q, Q += 8;
                }
                r >>>= D, Q -= D, G = 0, a = 3 + (r & 7), r >>>= 3, Q -= 3;
              } else {
                for (p = D + 7; Q < p; ) {
                  if (i === 0)
                    break A;
                  i--, r += e[B++] << Q, Q += 8;
                }
                r >>>= D, Q -= D, G = 0, a = 11 + (r & 127), r >>>= 7, Q -= 7;
              }
              if (A.have + a > A.nlen + A.ndist) {
                g.msg = "invalid bit length repeat", A.mode = X;
                break;
              }
              for (; a--; )
                A.lens[A.have++] = G;
            }
          }
          if (A.mode === X)
            break;
          if (A.lens[256] === 0) {
            g.msg = "invalid code -- missing end-of-block", A.mode = X;
            break;
          }
          if (A.lenbits = 9, N = { bits: A.lenbits }, f = wI(Bi, A.lens, 0, A.nlen, A.lencode, 0, A.work, N), A.lenbits = N.bits, f) {
            g.msg = "invalid literal/lengths set", A.mode = X;
            break;
          }
          if (A.distbits = 6, A.distcode = A.distdyn, N = { bits: A.distbits }, f = wI(ii, A.lens, A.nlen, A.ndist, A.distcode, 0, A.work, N), A.distbits = N.bits, f) {
            g.msg = "invalid distances set", A.mode = X;
            break;
          }
          if (A.mode = jI, I === PI)
            break A;
        case jI:
          A.mode = ZI;
        case ZI:
          if (i >= 6 && o >= 258) {
            g.next_out = C, g.avail_out = o, g.next_in = B, g.avail_in = i, A.hold = r, A.bits = Q, ga(g, E), C = g.next_out, t = g.output, o = g.avail_out, B = g.next_in, e = g.input, i = g.avail_in, r = A.hold, Q = A.bits, A.mode === SA && (A.back = -1);
            break;
          }
          for (A.back = 0; c = A.lencode[r & (1 << A.lenbits) - 1], D = c >>> 24, y = c >>> 16 & 255, d = c & 65535, !(D <= Q); ) {
            if (i === 0)
              break A;
            i--, r += e[B++] << Q, Q += 8;
          }
          if (y && !(y & 240)) {
            for (l = D, w = y, S = d; c = A.lencode[S + ((r & (1 << l + w) - 1) >> l)], D = c >>> 24, y = c >>> 16 & 255, d = c & 65535, !(l + D <= Q); ) {
              if (i === 0)
                break A;
              i--, r += e[B++] << Q, Q += 8;
            }
            r >>>= l, Q -= l, A.back += l;
          }
          if (r >>>= D, Q -= D, A.back += D, A.length = d, y === 0) {
            A.mode = AB;
            break;
          }
          if (y & 32) {
            A.back = -1, A.mode = SA;
            break;
          }
          if (y & 64) {
            g.msg = "invalid literal/length code", A.mode = X;
            break;
          }
          A.extra = y & 15, A.mode = _t;
        case _t:
          if (A.extra) {
            for (p = A.extra; Q < p; ) {
              if (i === 0)
                break A;
              i--, r += e[B++] << Q, Q += 8;
            }
            A.length += r & (1 << A.extra) - 1, r >>>= A.extra, Q -= A.extra, A.back += A.extra;
          }
          A.was = A.length, A.mode = zt;
        case zt:
          for (; c = A.distcode[r & (1 << A.distbits) - 1], D = c >>> 24, y = c >>> 16 & 255, d = c & 65535, !(D <= Q); ) {
            if (i === 0)
              break A;
            i--, r += e[B++] << Q, Q += 8;
          }
          if (!(y & 240)) {
            for (l = D, w = y, S = d; c = A.distcode[S + ((r & (1 << l + w) - 1) >> l)], D = c >>> 24, y = c >>> 16 & 255, d = c & 65535, !(l + D <= Q); ) {
              if (i === 0)
                break A;
              i--, r += e[B++] << Q, Q += 8;
            }
            r >>>= l, Q -= l, A.back += l;
          }
          if (r >>>= D, Q -= D, A.back += D, y & 64) {
            g.msg = "invalid distance code", A.mode = X;
            break;
          }
          A.offset = d, A.extra = y & 15, A.mode = Xt;
        case Xt:
          if (A.extra) {
            for (p = A.extra; Q < p; ) {
              if (i === 0)
                break A;
              i--, r += e[B++] << Q, Q += 8;
            }
            A.offset += r & (1 << A.extra) - 1, r >>>= A.extra, Q -= A.extra, A.back += A.extra;
          }
          if (A.offset > A.dmax) {
            g.msg = "invalid distance too far back", A.mode = X;
            break;
          }
          A.mode = $t;
        case $t:
          if (o === 0)
            break A;
          if (a = E - o, A.offset > a) {
            if (a = A.offset - a, a > A.whave && A.sane) {
              g.msg = "invalid distance too far back", A.mode = X;
              break;
            }
            a > A.wnext ? (a -= A.wnext, n = A.wsize - a) : n = A.wnext - a, a > A.length && (a = A.length), h = A.window;
          } else
            h = t, n = C - A.offset, a = A.length;
          a > o && (a = o), o -= a, A.length -= a;
          do
            t[C++] = h[n++];
          while (--a);
          A.length === 0 && (A.mode = ZI);
          break;
        case AB:
          if (o === 0)
            break A;
          t[C++] = A.length, o--, A.mode = ZI;
          break;
        case $g:
          if (A.wrap) {
            for (; Q < 32; ) {
              if (i === 0)
                break A;
              i--, r |= e[B++] << Q, Q += 8;
            }
            if (E -= o, g.total_out += E, A.total += E, A.wrap & 4 && E && (g.adler = A.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            A.flags ? DA(A.check, t, E, C - E) : ue(A.check, t, E, C - E)), E = o, A.wrap & 4 && (A.flags ? r : eB(r)) !== A.check) {
              g.msg = "incorrect data check", A.mode = X;
              break;
            }
            r = 0, Q = 0;
          }
          A.mode = IB;
        case IB:
          if (A.wrap && A.flags) {
            for (; Q < 32; ) {
              if (i === 0)
                break A;
              i--, r += e[B++] << Q, Q += 8;
            }
            if (A.wrap & 4 && r !== (A.total & 4294967295)) {
              g.msg = "incorrect length check", A.mode = X;
              break;
            }
            r = 0, Q = 0;
          }
          A.mode = gB;
        case gB:
          f = oa;
          break A;
        case X:
          f = Ci;
          break A;
        case Qi:
          return ri;
        case oi:
        default:
          return nA;
      }
  return g.next_out = C, g.avail_out = o, g.next_in = B, g.avail_in = i, A.hold = r, A.bits = Q, (A.wsize || E !== g.avail_out && A.mode < X && (A.mode < $g || I !== mt)) && ci(g, g.output, g.next_out, E - g.avail_out), s -= g.avail_in, E -= g.avail_out, g.total_in += s, g.total_out += E, A.total += E, A.wrap & 4 && E && (g.adler = A.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  A.flags ? DA(A.check, t, E, g.next_out - E) : ue(A.check, t, E, g.next_out - E)), g.data_type = A.bits + (A.last ? 64 : 0) + (A.mode === SA ? 128 : 0) + (A.mode === jI || A.mode === Xg ? 256 : 0), (s === 0 && E === 0 || I === mt) && f === xA && (f = aa), f;
}, wa = (g) => {
  if (TA(g))
    return nA;
  let I = g.state;
  return I.window && (I.window = null), g.state = null, xA;
}, ua = (g, I) => {
  if (TA(g))
    return nA;
  const A = g.state;
  return A.wrap & 2 ? (A.head = I, I.done = !1, xA) : nA;
}, da = (g, I) => {
  const A = I.length;
  let e, t, B;
  return TA(g) || (e = g.state, e.wrap !== 0 && e.mode !== Qg) ? nA : e.mode === Qg && (t = 1, t = ue(t, I, A, 0), t !== e.check) ? Ci : (B = ci(g, I, A, A), B ? (e.mode = Qi, ri) : (e.havedict = 1, xA));
};
var Sa = ai, Ga = si, Fa = Ei, Na = fa, pa = ni, Ra = Da, ka = wa, La = ua, Ua = da, Ya = "pako inflate (from Nodeca project)", NA = {
  inflateReset: Sa,
  inflateReset2: Ga,
  inflateResetKeep: Fa,
  inflateInit: Na,
  inflateInit2: pa,
  inflate: Ra,
  inflateEnd: ka,
  inflateGetHeader: La,
  inflateSetDictionary: Ua,
  inflateInfo: Ya
};
function ma() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var Ma = ma;
const hi = Object.prototype.toString, {
  Z_NO_FLUSH: Ka,
  Z_FINISH: ba,
  Z_OK: NI,
  Z_STREAM_END: ge,
  Z_NEED_DICT: ee,
  Z_STREAM_ERROR: Ja,
  Z_DATA_ERROR: BB,
  Z_MEM_ERROR: Ha
} = gi;
function fg(g) {
  this.options = ei.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, g || {});
  const I = this.options;
  I.raw && I.windowBits >= 0 && I.windowBits < 16 && (I.windowBits = -I.windowBits, I.windowBits === 0 && (I.windowBits = -15)), I.windowBits >= 0 && I.windowBits < 16 && !(g && g.windowBits) && (I.windowBits += 32), I.windowBits > 15 && I.windowBits < 48 && (I.windowBits & 15 || (I.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Aa(), this.strm.avail_out = 0;
  let A = NA.inflateInit2(
    this.strm,
    I.windowBits
  );
  if (A !== NI)
    throw new Error(de[A]);
  if (this.header = new Ma(), NA.inflateGetHeader(this.strm, this.header), I.dictionary && (typeof I.dictionary == "string" ? I.dictionary = Se.string2buf(I.dictionary) : hi.call(I.dictionary) === "[object ArrayBuffer]" && (I.dictionary = new Uint8Array(I.dictionary)), I.raw && (A = NA.inflateSetDictionary(this.strm, I.dictionary), A !== NI)))
    throw new Error(de[A]);
}
fg.prototype.push = function(g, I) {
  const A = this.strm, e = this.options.chunkSize, t = this.options.dictionary;
  let B, C, i;
  if (this.ended) return !1;
  for (I === ~~I ? C = I : C = I === !0 ? ba : Ka, hi.call(g) === "[object ArrayBuffer]" ? A.input = new Uint8Array(g) : A.input = g, A.next_in = 0, A.avail_in = A.input.length; ; ) {
    for (A.avail_out === 0 && (A.output = new Uint8Array(e), A.next_out = 0, A.avail_out = e), B = NA.inflate(A, C), B === ee && t && (B = NA.inflateSetDictionary(A, t), B === NI ? B = NA.inflate(A, C) : B === BB && (B = ee)); A.avail_in > 0 && B === ge && A.state.wrap > 0 && g[A.next_in] !== 0; )
      NA.inflateReset(A), B = NA.inflate(A, C);
    switch (B) {
      case Ja:
      case BB:
      case ee:
      case Ha:
        return this.onEnd(B), this.ended = !0, !1;
    }
    if (i = A.avail_out, A.next_out && (A.avail_out === 0 || B === ge))
      if (this.options.to === "string") {
        let o = Se.utf8border(A.output, A.next_out), r = A.next_out - o, Q = Se.buf2string(A.output, o);
        A.next_out = r, A.avail_out = e - r, r && A.output.set(A.output.subarray(o, o + r), 0), this.onData(Q);
      } else
        this.onData(A.output.length === A.next_out ? A.output : A.output.subarray(0, A.next_out));
    if (!(B === NI && i === 0)) {
      if (B === ge)
        return B = NA.inflateEnd(this.strm), this.onEnd(B), this.ended = !0, !0;
      if (A.avail_in === 0) break;
    }
  }
  return !0;
};
fg.prototype.onData = function(g) {
  this.chunks.push(g);
};
fg.prototype.onEnd = function(g) {
  g === NI && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = ei.flattenChunks(this.chunks)), this.chunks = [], this.err = g, this.msg = this.strm.msg;
};
function qa(g, I) {
  const A = new fg(I);
  if (A.push(g), A.err) throw A.msg || de[A.err];
  return A.result;
}
var xa = qa, Oa = {
  inflate: xa
};
const { inflate: Ta } = Oa;
var li = Ta;
class va extends MA {
  decodeBlock(I) {
    return li(new Uint8Array(I)).buffer;
  }
}
const Pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: va
}, Symbol.toStringTag, { value: "Module" }));
class ja extends MA {
  decodeBlock(I) {
    const A = new DataView(I), e = [];
    for (let t = 0; t < I.byteLength; ++t) {
      let B = A.getInt8(t);
      if (B < 0) {
        const C = A.getUint8(t + 1);
        B = -B;
        for (let i = 0; i <= B; ++i)
          e.push(C);
        t += 1;
      } else {
        for (let C = 0; C <= B; ++C)
          e.push(A.getUint8(t + C + 1));
        t += B + 1;
      }
    }
    return new Uint8Array(e).buffer;
  }
}
const Za = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ja
}, Symbol.toStringTag, { value: "Module" }));
/*! Lerc 4.0
Copyright 2015 - 2023 Esri
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
A local copy of the license and additional notices are located with the
source distribution at:
http://github.com/Esri/lerc/
Contributors:  Thomas Maurer, Wenxue Ju
*/
const Wa = [
  {
    pixelType: "S8",
    size: 1,
    ctor: Int8Array,
    range: [-128, 128]
  },
  {
    pixelType: "U8",
    size: 1,
    ctor: Uint8Array,
    range: [0, 255]
  },
  {
    pixelType: "S16",
    size: 2,
    ctor: Int16Array,
    range: [-32768, 32767]
  },
  {
    pixelType: "U16",
    size: 2,
    ctor: Uint16Array,
    range: [0, 65536]
  },
  {
    pixelType: "S32",
    size: 4,
    ctor: Int32Array,
    range: [-2147483648, 2147483647]
  },
  {
    pixelType: "U32",
    size: 4,
    ctor: Uint32Array,
    range: [0, 4294967296]
  },
  {
    pixelType: "F32",
    size: 4,
    ctor: Float32Array,
    range: [-34027999387901484e22, 34027999387901484e22]
  },
  {
    pixelType: "F64",
    size: 8,
    ctor: Float64Array,
    range: [-17976931348623157e292, 17976931348623157e292]
  }
], iB = {
  getBlobInfo: null,
  decode: null
};
function Va(g, I, A, e, t) {
  if (A < 2)
    return g;
  const B = new e(I * A);
  for (let C = 0, i = 0; C < I; C++)
    for (let o = 0, r = C; o < A; o++, r += I)
      B[r] = g[i++];
  return B;
}
function _a(g, I = {}) {
  var A, e;
  const t = (A = I.inputOffset) !== null && A !== void 0 ? A : 0, B = g instanceof Uint8Array ? g.subarray(t) : new Uint8Array(g, t), C = iB.getBlobInfo(B), { data: i, maskData: o } = iB.decode(B, C), { width: r, height: Q, bandCount: s, dimCount: E, depthCount: a, dataType: n, maskCount: h, statistics: c } = C, D = Wa[n], y = new D.ctor(i.buffer), d = [], l = [], w = r * Q, S = w * a, G = (e = I.returnInterleaved) !== null && e !== void 0 ? e : I.returnPixelInterleavedDims;
  for (let L = 0; L < s; L++) {
    const b = y.subarray(L * S, (L + 1) * S);
    if (G)
      d.push(b);
    else {
      const Y = Va(b, w, a, D.ctor);
      d.push(Y);
    }
    l.push(o.subarray(L * S, (L + 1) * S));
  }
  const f = h === 0 ? null : h === 1 ? l[0] : new Uint8Array(w);
  if (h > 1) {
    f.set(l[0]);
    for (let L = 1; L < l.length; L++) {
      const b = l[L];
      for (let Y = 0; Y < w; Y++)
        f[Y] = f[Y] & b[Y];
    }
  }
  const { noDataValue: F } = I, N = F != null && D.range[0] <= F && D.range[1] >= F;
  if (h > 0 && N)
    for (let L = 0; L < s; L++) {
      const b = d[L], Y = l[L] || f;
      for (let v = 0; v < w; v++)
        Y[v] === 0 && (b[v] = F);
    }
  const p = h === s && s > 1 ? l : null, { pixelType: J } = D;
  return {
    width: r,
    height: Q,
    pixelType: J,
    statistics: c,
    pixels: d,
    mask: f,
    dimCount: E,
    depthCount: a,
    bandMasks: p
  };
}
let EI, GA, Ge;
const te = {
  env: {
    emscripten_notify_memory_growth: (g) => {
      Ge = new Uint8Array(GA.exports.memory.buffer);
    }
  }
};
let za = class {
  init() {
    return EI || (typeof fetch < "u" ? EI = fetch(`data:application/wasm;base64,${CB}`).then((I) => I.arrayBuffer()).then((I) => WebAssembly.instantiate(I, te)).then(this._init) : EI = WebAssembly.instantiate(Buffer.from(CB, "base64"), te).then(this._init), EI);
  }
  _init(I) {
    GA = I.instance, te.env.emscripten_notify_memory_growth(0);
  }
  decode(I, A = 0) {
    if (!GA) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const e = I.byteLength, t = GA.exports.malloc(e);
    Ge.set(I, t), A = A || Number(GA.exports.ZSTD_findDecompressedSize(t, e));
    const B = GA.exports.malloc(A), C = GA.exports.ZSTD_decompress(B, A, t, e), i = Ge.slice(B, B + C);
    return GA.exports.free(t), GA.exports.free(B), i;
  }
};
const CB = "AGFzbQEAAAABoAEUYAF/AGADf39/AGACf38AYAF/AX9gBX9/f39/AX9gA39/fwF/YAR/f39/AX9gAn9/AX9gAAF/YAd/f39/f39/AX9gB39/f39/f38AYAR/f39/AX5gAn9/AX5gBn9/f39/fwBgDn9/f39/f39/f39/f39/AX9gCH9/f39/f39/AX9gCX9/f39/f39/fwF/YAN+f38BfmAFf39/f38AYAAAAicBA2Vudh9lbXNjcmlwdGVuX25vdGlmeV9tZW1vcnlfZ3Jvd3RoAAADJyYDAAMACAQJBQEHBwADBgoLBAQDBAEABgUMBQ0OAQEBDxAREgYAEwQFAXABAgIFBwEBggKAgAIGCAF/AUGgnwQLB9MBCgZtZW1vcnkCAAxaU1REX2lzRXJyb3IADRlaU1REX2ZpbmREZWNvbXByZXNzZWRTaXplABkPWlNURF9kZWNvbXByZXNzACQGbWFsbG9jAAEEZnJlZQACGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBABlfZW1zY3JpcHRlbl9zdGFja19yZXN0b3JlAAQcZW1zY3JpcHRlbl9zdGFja19nZXRfY3VycmVudAAFIl9fY3hhX2luY3JlbWVudF9leGNlcHRpb25fcmVmY291bnQAJQkHAQBBAQsBJgwBCgqtkgMm1ScBC38jAEEQayIKJAACQAJAAkACQAJAAkACQAJAAkACQCAAQfQBTQRAQagbKAIAIgRBECAAQQtqQfgDcSAAQQtJGyIGQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiAkEDdCIBQdAbaiIAIAFB2BtqKAIAIgEoAggiBUYEQEGoGyAEQX4gAndxNgIADAELIAUgADYCDCAAIAU2AggLIAFBCGohACABIAJBA3QiAkEDcjYCBCABIAJqIgEgASgCBEEBcjYCBAwLCyAGQbAbKAIAIghNDQEgAQRAAkBBAiAAdCICQQAgAmtyIAEgAHRxaCIBQQN0IgBB0BtqIgIgAEHYG2ooAgAiACgCCCIFRgRAQagbIARBfiABd3EiBDYCAAwBCyAFIAI2AgwgAiAFNgIICyAAIAZBA3I2AgQgACAGaiIHIAFBA3QiASAGayIFQQFyNgIEIAAgAWogBTYCACAIBEAgCEF4cUHQG2ohAUG8GygCACECAn8gBEEBIAhBA3Z0IgNxRQRAQagbIAMgBHI2AgAgAQwBCyABKAIICyEDIAEgAjYCCCADIAI2AgwgAiABNgIMIAIgAzYCCAsgAEEIaiEAQbwbIAc2AgBBsBsgBTYCAAwLC0GsGygCACILRQ0BIAtoQQJ0QdgdaigCACICKAIEQXhxIAZrIQMgAiEBA0ACQCABKAIQIgBFBEAgASgCFCIARQ0BCyAAKAIEQXhxIAZrIgEgAyABIANJIgEbIQMgACACIAEbIQIgACEBDAELCyACKAIYIQkgAiACKAIMIgBHBEAgAigCCCIBIAA2AgwgACABNgIIDAoLIAIoAhQiAQR/IAJBFGoFIAIoAhAiAUUNAyACQRBqCyEFA0AgBSEHIAEiAEEUaiEFIAAoAhQiAQ0AIABBEGohBSAAKAIQIgENAAsgB0EANgIADAkLQX8hBiAAQb9/Sw0AIABBC2oiAUF4cSEGQawbKAIAIgdFDQBBHyEIQQAgBmshAyAAQfT//wdNBEAgBkEmIAFBCHZnIgBrdkEBcSAAQQF0a0E+aiEICwJAAkACQCAIQQJ0QdgdaigCACIBRQRAQQAhAAwBC0EAIQAgBkEZIAhBAXZrQQAgCEEfRxt0IQIDQAJAIAEoAgRBeHEgBmsiBCADTw0AIAEhBSAEIgMNAEEAIQMgASEADAMLIAAgASgCFCIEIAQgASACQR12QQRxaigCECIBRhsgACAEGyEAIAJBAXQhAiABDQALCyAAIAVyRQRAQQAhBUECIAh0IgBBACAAa3IgB3EiAEUNAyAAaEECdEHYHWooAgAhAAsgAEUNAQsDQCAAKAIEQXhxIAZrIgIgA0khASACIAMgARshAyAAIAUgARshBSAAKAIQIgEEfyABBSAAKAIUCyIADQALCyAFRQ0AIANBsBsoAgAgBmtPDQAgBSgCGCEIIAUgBSgCDCIARwRAIAUoAggiASAANgIMIAAgATYCCAwICyAFKAIUIgEEfyAFQRRqBSAFKAIQIgFFDQMgBUEQagshAgNAIAIhBCABIgBBFGohAiAAKAIUIgENACAAQRBqIQIgACgCECIBDQALIARBADYCAAwHCyAGQbAbKAIAIgVNBEBBvBsoAgAhAAJAIAUgBmsiAUEQTwRAIAAgBmoiAiABQQFyNgIEIAAgBWogATYCACAAIAZBA3I2AgQMAQsgACAFQQNyNgIEIAAgBWoiASABKAIEQQFyNgIEQQAhAkEAIQELQbAbIAE2AgBBvBsgAjYCACAAQQhqIQAMCQsgBkG0GygCACICSQRAQbQbIAIgBmsiATYCAEHAG0HAGygCACIAIAZqIgI2AgAgAiABQQFyNgIEIAAgBkEDcjYCBCAAQQhqIQAMCQtBACEAIAZBL2oiAwJ/QYAfKAIABEBBiB8oAgAMAQtBjB9CfzcCAEGEH0KAoICAgIAENwIAQYAfIApBDGpBcHFB2KrVqgVzNgIAQZQfQQA2AgBB5B5BADYCAEGAIAsiAWoiBEEAIAFrIgdxIgEgBk0NCEHgHigCACIFBEBB2B4oAgAiCCABaiIJIAhNIAUgCUlyDQkLAkBB5B4tAABBBHFFBEACQAJAAkACQEHAGygCACIFBEBB6B4hAANAIAAoAgAiCCAFTQRAIAUgCCAAKAIEakkNAwsgACgCCCIADQALC0EAEAMiAkF/Rg0DIAEhBEGEHygCACIAQQFrIgUgAnEEQCABIAJrIAIgBWpBACAAa3FqIQQLIAQgBk0NA0HgHigCACIABEBB2B4oAgAiBSAEaiIHIAVNIAAgB0lyDQQLIAQQAyIAIAJHDQEMBQsgBCACayAHcSIEEAMiAiAAKAIAIAAoAgRqRg0BIAIhAAsgAEF/Rg0BIAZBMGogBE0EQCAAIQIMBAtBiB8oAgAiAiADIARrakEAIAJrcSICEANBf0YNASACIARqIQQgACECDAMLIAJBf0cNAgtB5B5B5B4oAgBBBHI2AgALIAEQAyICQX9GQQAQAyIAQX9GciAAIAJNcg0FIAAgAmsiBCAGQShqTQ0FC0HYHkHYHigCACAEaiIANgIAQdweKAIAIABJBEBB3B4gADYCAAsCQEHAGygCACIDBEBB6B4hAANAIAIgACgCACIBIAAoAgQiBWpGDQIgACgCCCIADQALDAQLQbgbKAIAIgBBACAAIAJNG0UEQEG4GyACNgIAC0EAIQBB7B4gBDYCAEHoHiACNgIAQcgbQX82AgBBzBtBgB8oAgA2AgBB9B5BADYCAANAIABBA3QiAUHYG2ogAUHQG2oiBTYCACABQdwbaiAFNgIAIABBAWoiAEEgRw0AC0G0GyAEQShrIgBBeCACa0EHcSIBayIFNgIAQcAbIAEgAmoiATYCACABIAVBAXI2AgQgACACakEoNgIEQcQbQZAfKAIANgIADAQLIAIgA00gASADS3INAiAAKAIMQQhxDQIgACAEIAVqNgIEQcAbIANBeCADa0EHcSIAaiIBNgIAQbQbQbQbKAIAIARqIgIgAGsiADYCACABIABBAXI2AgQgAiADakEoNgIEQcQbQZAfKAIANgIADAMLQQAhAAwGC0EAIQAMBAtBuBsoAgAgAksEQEG4GyACNgIACyACIARqIQVB6B4hAAJAA0AgBSAAKAIAIgFHBEAgACgCCCIADQEMAgsLIAAtAAxBCHFFDQMLQegeIQADQAJAIAAoAgAiASADTQRAIAMgASAAKAIEaiIFSQ0BCyAAKAIIIQAMAQsLQbQbIARBKGsiAEF4IAJrQQdxIgFrIgc2AgBBwBsgASACaiIBNgIAIAEgB0EBcjYCBCAAIAJqQSg2AgRBxBtBkB8oAgA2AgAgAyAFQScgBWtBB3FqQS9rIgAgACADQRBqSRsiAUEbNgIEIAFB8B4pAgA3AhAgAUHoHikCADcCCEHwHiABQQhqNgIAQeweIAQ2AgBB6B4gAjYCAEH0HkEANgIAIAFBGGohAANAIABBBzYCBCAAQQhqIQIgAEEEaiEAIAIgBUkNAAsgASADRg0AIAEgASgCBEF+cTYCBCADIAEgA2siAkEBcjYCBCABIAI2AgACfyACQf8BTQRAIAJBeHFB0BtqIQACf0GoGygCACIBQQEgAkEDdnQiAnFFBEBBqBsgASACcjYCACAADAELIAAoAggLIQEgACADNgIIIAEgAzYCDEEMIQJBCAwBC0EfIQAgAkH///8HTQRAIAJBJiACQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAAsgAyAANgIcIANCADcCECAAQQJ0QdgdaiEBAkACQEGsGygCACIFQQEgAHQiBHFFBEBBrBsgBCAFcjYCACABIAM2AgAMAQsgAkEZIABBAXZrQQAgAEEfRxt0IQAgASgCACEFA0AgBSIBKAIEQXhxIAJGDQIgAEEddiEFIABBAXQhACABIAVBBHFqIgQoAhAiBQ0ACyAEIAM2AhALIAMgATYCGEEIIQIgAyIBIQBBDAwBCyABKAIIIgAgAzYCDCABIAM2AgggAyAANgIIQQAhAEEYIQJBDAsgA2ogATYCACACIANqIAA2AgALQbQbKAIAIgAgBk0NAEG0GyAAIAZrIgE2AgBBwBtBwBsoAgAiACAGaiICNgIAIAIgAUEBcjYCBCAAIAZBA3I2AgQgAEEIaiEADAQLQaQbQTA2AgBBACEADAMLIAAgAjYCACAAIAAoAgQgBGo2AgQgAkF4IAJrQQdxaiIIIAZBA3I2AgQgAUF4IAFrQQdxaiIEIAYgCGoiA2shBwJAQcAbKAIAIARGBEBBwBsgAzYCAEG0G0G0GygCACAHaiIANgIAIAMgAEEBcjYCBAwBC0G8GygCACAERgRAQbwbIAM2AgBBsBtBsBsoAgAgB2oiADYCACADIABBAXI2AgQgACADaiAANgIADAELIAQoAgQiAEEDcUEBRgRAIABBeHEhCSAEKAIMIQICQCAAQf8BTQRAIAQoAggiASACRgRAQagbQagbKAIAQX4gAEEDdndxNgIADAILIAEgAjYCDCACIAE2AggMAQsgBCgCGCEGAkAgAiAERwRAIAQoAggiACACNgIMIAIgADYCCAwBCwJAIAQoAhQiAAR/IARBFGoFIAQoAhAiAEUNASAEQRBqCyEBA0AgASEFIAAiAkEUaiEBIAAoAhQiAA0AIAJBEGohASACKAIQIgANAAsgBUEANgIADAELQQAhAgsgBkUNAAJAIAQoAhwiAEECdEHYHWoiASgCACAERgRAIAEgAjYCACACDQFBrBtBrBsoAgBBfiAAd3E2AgAMAgsCQCAEIAYoAhBGBEAgBiACNgIQDAELIAYgAjYCFAsgAkUNAQsgAiAGNgIYIAQoAhAiAARAIAIgADYCECAAIAI2AhgLIAQoAhQiAEUNACACIAA2AhQgACACNgIYCyAHIAlqIQcgBCAJaiIEKAIEIQALIAQgAEF+cTYCBCADIAdBAXI2AgQgAyAHaiAHNgIAIAdB/wFNBEAgB0F4cUHQG2ohAAJ/QagbKAIAIgFBASAHQQN2dCICcUUEQEGoGyABIAJyNgIAIAAMAQsgACgCCAshASAAIAM2AgggASADNgIMIAMgADYCDCADIAE2AggMAQtBHyECIAdB////B00EQCAHQSYgB0EIdmciAGt2QQFxIABBAXRrQT5qIQILIAMgAjYCHCADQgA3AhAgAkECdEHYHWohAAJAAkBBrBsoAgAiAUEBIAJ0IgVxRQRAQawbIAEgBXI2AgAgACADNgIADAELIAdBGSACQQF2a0EAIAJBH0cbdCECIAAoAgAhAQNAIAEiACgCBEF4cSAHRg0CIAJBHXYhASACQQF0IQIgACABQQRxaiIFKAIQIgENAAsgBSADNgIQCyADIAA2AhggAyADNgIMIAMgAzYCCAwBCyAAKAIIIgEgAzYCDCAAIAM2AgggA0EANgIYIAMgADYCDCADIAE2AggLIAhBCGohAAwCCwJAIAhFDQACQCAFKAIcIgFBAnRB2B1qIgIoAgAgBUYEQCACIAA2AgAgAA0BQawbIAdBfiABd3EiBzYCAAwCCwJAIAUgCCgCEEYEQCAIIAA2AhAMAQsgCCAANgIUCyAARQ0BCyAAIAg2AhggBSgCECIBBEAgACABNgIQIAEgADYCGAsgBSgCFCIBRQ0AIAAgATYCFCABIAA2AhgLAkAgA0EPTQRAIAUgAyAGaiIAQQNyNgIEIAAgBWoiACAAKAIEQQFyNgIEDAELIAUgBkEDcjYCBCAFIAZqIgQgA0EBcjYCBCADIARqIAM2AgAgA0H/AU0EQCADQXhxQdAbaiEAAn9BqBsoAgAiAUEBIANBA3Z0IgJxRQRAQagbIAEgAnI2AgAgAAwBCyAAKAIICyEBIAAgBDYCCCABIAQ2AgwgBCAANgIMIAQgATYCCAwBC0EfIQAgA0H///8HTQRAIANBJiADQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAAsgBCAANgIcIARCADcCECAAQQJ0QdgdaiEBAkACQCAHQQEgAHQiAnFFBEBBrBsgAiAHcjYCACABIAQ2AgAgBCABNgIYDAELIANBGSAAQQF2a0EAIABBH0cbdCEAIAEoAgAhAQNAIAEiAigCBEF4cSADRg0CIABBHXYhASAAQQF0IQAgAiABQQRxaiIHKAIQIgENAAsgByAENgIQIAQgAjYCGAsgBCAENgIMIAQgBDYCCAwBCyACKAIIIgAgBDYCDCACIAQ2AgggBEEANgIYIAQgAjYCDCAEIAA2AggLIAVBCGohAAwBCwJAIAlFDQACQCACKAIcIgFBAnRB2B1qIgUoAgAgAkYEQCAFIAA2AgAgAA0BQawbIAtBfiABd3E2AgAMAgsCQCACIAkoAhBGBEAgCSAANgIQDAELIAkgADYCFAsgAEUNAQsgACAJNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAIoAhQiAUUNACAAIAE2AhQgASAANgIYCwJAIANBD00EQCACIAMgBmoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBCyACIAZBA3I2AgQgAiAGaiIFIANBAXI2AgQgAyAFaiADNgIAIAgEQCAIQXhxQdAbaiEAQbwbKAIAIQECf0EBIAhBA3Z0IgcgBHFFBEBBqBsgBCAHcjYCACAADAELIAAoAggLIQQgACABNgIIIAQgATYCDCABIAA2AgwgASAENgIIC0G8GyAFNgIAQbAbIAM2AgALIAJBCGohAAsgCkEQaiQAIAAL3AsBCH8CQCAARQ0AIABBCGsiAyAAQQRrKAIAIgJBeHEiAGohBQJAIAJBAXENACACQQJxRQ0BIAMgAygCACIEayIDQbgbKAIASQ0BIAAgBGohAAJAAkACQEG8GygCACADRwRAIAMoAgwhASAEQf8BTQRAIAEgAygCCCICRw0CQagbQagbKAIAQX4gBEEDdndxNgIADAULIAMoAhghByABIANHBEAgAygCCCICIAE2AgwgASACNgIIDAQLIAMoAhQiAgR/IANBFGoFIAMoAhAiAkUNAyADQRBqCyEEA0AgBCEGIAIiAUEUaiEEIAEoAhQiAg0AIAFBEGohBCABKAIQIgINAAsgBkEANgIADAMLIAUoAgQiAkEDcUEDRw0DQbAbIAA2AgAgBSACQX5xNgIEIAMgAEEBcjYCBCAFIAA2AgAPCyACIAE2AgwgASACNgIIDAILQQAhAQsgB0UNAAJAIAMoAhwiBEECdEHYHWoiAigCACADRgRAIAIgATYCACABDQFBrBtBrBsoAgBBfiAEd3E2AgAMAgsCQCADIAcoAhBGBEAgByABNgIQDAELIAcgATYCFAsgAUUNAQsgASAHNgIYIAMoAhAiAgRAIAEgAjYCECACIAE2AhgLIAMoAhQiAkUNACABIAI2AhQgAiABNgIYCyADIAVPDQAgBSgCBCIEQQFxRQ0AAkACQAJAAkAgBEECcUUEQEHAGygCACAFRgRAQcAbIAM2AgBBtBtBtBsoAgAgAGoiADYCACADIABBAXI2AgQgA0G8GygCAEcNBkGwG0EANgIAQbwbQQA2AgAPC0G8GygCACIHIAVGBEBBvBsgAzYCAEGwG0GwGygCACAAaiIANgIAIAMgAEEBcjYCBCAAIANqIAA2AgAPCyAEQXhxIABqIQAgBSgCDCEBIARB/wFNBEAgBSgCCCICIAFGBEBBqBtBqBsoAgBBfiAEQQN2d3E2AgAMBQsgAiABNgIMIAEgAjYCCAwECyAFKAIYIQggASAFRwRAIAUoAggiAiABNgIMIAEgAjYCCAwDCyAFKAIUIgIEfyAFQRRqBSAFKAIQIgJFDQIgBUEQagshBANAIAQhBiACIgFBFGohBCABKAIUIgINACABQRBqIQQgASgCECICDQALIAZBADYCAAwCCyAFIARBfnE2AgQgAyAAQQFyNgIEIAAgA2ogADYCAAwDC0EAIQELIAhFDQACQCAFKAIcIgRBAnRB2B1qIgIoAgAgBUYEQCACIAE2AgAgAQ0BQawbQawbKAIAQX4gBHdxNgIADAILAkAgBSAIKAIQRgRAIAggATYCEAwBCyAIIAE2AhQLIAFFDQELIAEgCDYCGCAFKAIQIgIEQCABIAI2AhAgAiABNgIYCyAFKAIUIgJFDQAgASACNgIUIAIgATYCGAsgAyAAQQFyNgIEIAAgA2ogADYCACADIAdHDQBBsBsgADYCAA8LIABB/wFNBEAgAEF4cUHQG2ohAgJ/QagbKAIAIgRBASAAQQN2dCIAcUUEQEGoGyAAIARyNgIAIAIMAQsgAigCCAshACACIAM2AgggACADNgIMIAMgAjYCDCADIAA2AggPC0EfIQEgAEH///8HTQRAIABBJiAAQQh2ZyICa3ZBAXEgAkEBdGtBPmohAQsgAyABNgIcIANCADcCECABQQJ0QdgdaiEEAn8CQAJ/QawbKAIAIgZBASABdCICcUUEQEGsGyACIAZyNgIAIAQgAzYCAEEYIQFBCAwBCyAAQRkgAUEBdmtBACABQR9HG3QhASAEKAIAIQQDQCAEIgIoAgRBeHEgAEYNAiABQR12IQQgAUEBdCEBIAIgBEEEcWoiBigCECIEDQALIAYgAzYCEEEYIQEgAiEEQQgLIQAgAyICDAELIAIoAggiBCADNgIMIAIgAzYCCEEYIQBBCCEBQQALIQYgASADaiAENgIAIAMgAjYCDCAAIANqIAY2AgBByBtByBsoAgBBAWsiAEF/IAAbNgIACwtsAQJ/QaAbKAIAIgEgAEEHakF4cSICaiEAAkAgAkEAIAAgAU0bRQRAIAA/AEEQdE0NASAAPwBBEHRrQf//A2pBEHZAAEF/RgR/QQAFQQAQAEEBCw0BC0GkG0EwNgIAQX8PC0GgGyAANgIAIAELBgAgACQACwQAIwALuQUBDH8jAEEQayIMJAACQCAEQQdNBEAgDEIANwMIIAQEQCAMQQhqIAMgBPwKAAALQWwgACABIAIgDEEIakEIEAYiACAAIARLGyAAIABBiX9JGyEFDAELIAEoAgBBAWoiDkEBdCIIBEAgAEEAIAj8CwALIAMoAAAiBUEPcSIHQQpLBEBBVCEFDAELIAIgB0EFajYCACADIARqIgJBBGshCCACQQdrIQ0gB0EGaiEPQQQhBiAFQQR2IQVBICAHdCIJQQFyIQpBACECQQEhByADIQQDQAJAIAdBAXFFBEADQCAFQX9zQYCAgIB4cmgiB0EYSUUEQCACQSRqIQIgBCANTQR/IARBA2oFIAQgDWtBA3QgBmpBH3EhBiAICyIEKAAAIAZ2IQUMAQsLIAYgB0EecSILakECaiEGIAdBAXZBA2wgAmogBSALdkEDcWoiAiAOTw0BAn8gBCANSyAGQQN2IARqIgUgCEtxRQRAIAZBB3EhBiAFDAELIAQgCGtBA3QgBmpBH3EhBiAICyIEKAAAIAZ2IQULIAUgCUEBa3EiByAJQQF0QQFrIgsgCmsiEEkEfyAPQQFrBSAFIAtxIgUgEEEAIAUgCU4bayEHIA8LIQUgACACQQF0aiAHQQFrIgs7AQAgAkEBaiECIAUgBmohBiAJQQEgB2sgCyAHQQBKGyAKaiIKSgRAIApBAkgNAUEgIApnIgVrIQ9BASAFQR9zdCEJCyACIA5PDQAgC0EARyEHAn8gBCANSyAGQQN1IARqIgUgCEtxRQRAIAZBB3EhBiAFDAELIAYgBCAIa0EDdGpBH3EhBiAICyIEKAAAIAZ2IQUMAQsLQWwhBSAKQQFHDQAgAiAOSwRAQVAhBQwBCyAGQSBKDQAgASACQQFrNgIAIAQgBkEHakEDdWogA2shBQsgDEEQaiQAIAULrRkCEX8BfiMAQTBrIgckAEG4fyEIAkAgBUUNACAELAAAIglB/wFxIQ0CQAJAIAlBAEgEQCANQf4Aa0EBdiIGIAVPDQMgDUH/AGsiCEH/AUsNAiAEQQFqIQRBACEFA0AgBSAITwRAIAYhDQwDBSAAIAVqIg0gBCAFQQF2aiIJLQAAQQR2OgAAIA0gCS0AAEEPcToAASAFQQJqIQUMAQsACwALIAUgDU0NAiAHQf8BNgIEIAYgB0EEaiAHQQhqIARBAWoiCiANEAYiBEGIf0sEQCAEIQgMAwtBVCEIIAcoAggiC0EGSw0CIAcoAgQiBUEBdCIMQQJqrUIBIAuthiIYQQQgC3QiCUEIaq18fEILfEL8//////////8Ag0LoAlYNAkFSIQggBUH/AUsNAkHoAiAJa60gBUEBaiIQQQF0rSAYfEIIfFQNAiANIARrIRQgBCAKaiEVIAwgBkGABGoiDCAJakEEaiIWakECaiERIAZBhARqIRcgBkGGBGohE0GAgAIgC3RBEHYhCEEAIQVBASEOQQEgC3QiCkEBayISIQQDQCAFIBBGRQRAAkAgBiAFQQF0Ig9qLwEAIglB//8DRgRAIBMgBEECdGogBToAACAEQQFrIQRBASEJDAELIA5BACAIIAnBShshDgsgDyAWaiAJOwEAIAVBAWohBQwBCwsgBiAOOwGCBCAGIAs7AYAEAkAgBCASRgRAQgAhGEEAIQlBACEIA0AgCSAQRgRAIApBA3YgCkEBdmpBA2oiBkEBdCEJQQAhBEEAIQgDQCAIIApPDQQgCCARaiEQQQAhBQNAIAVBAkZFBEAgEyAFIAZsIARqIBJxQQJ0aiAFIBBqLQAAOgAAIAVBAWohBQwBCwsgCEECaiEIIAQgCWogEnEhBAwACwAFIAYgCUEBdGouAQAhBCAIIBFqIg8gGDcAAEEIIQUDQCAEIAVMRQRAIAUgD2ogGDcAACAFQQhqIQUMAQsLIBhCgYKEiJCgwIABfCEYIAlBAWohCSAEIAhqIQgMAQsACwALIApBA3YgCkEBdmpBA2ohEUEAIQhBACEFA0AgCCAQRkUEQEEAIQkgBiAIQQF0ai4BACIPQQAgD0EAShshDwNAIAkgD0ZFBEAgEyAFQQJ0aiAIOgAAA0AgBSARaiAScSIFIARLDQALIAlBAWohCQwBCwsgCEEBaiEIDAELC0F/IQggBQ0DCyALQR9rIQhBACEFA0AgBSAKRkUEQCAWIBcgBUECdGoiBC0AAkEBdGoiBiAGLwEAIgZBAWo7AQAgBCAIIAZnaiIJOgADIAQgBiAJdCAKazsBACAFQQFqIQUMAQsLAkACQCAOQf//A3EEQCAHQRxqIgQgFSAUEAgiCEGIf0sNAiAHQRRqIAQgDBAJIAdBDGogBCAMEAkgBygCICIIQSBLDQECQCAHAn8gBygCJCIEIAcoAixPBEAgByAEIAhBA3ZrIgU2AiQgCEEHcQwBCyAEIAcoAigiBUYNASAHIAQgBCAFayAIQQN2IgYgBCAGayAFSRsiBGsiBTYCJCAIIARBA3RrCyIINgIgIAcgBSgAADYCHAtBACEFA0ACQAJAIAhBIU8EQCAHQbAaNgIkDAELIAcCfyAHKAIkIgQgBygCLE8EQCAHIAQgCEEDdmsiBDYCJEEBIQkgCEEHcQwBCyAEIAcoAigiBkYNASAHIAQgCEEDdiIJIAQgBmsgBCAJayAGTyIJGyIGayIENgIkIAggBkEDdGsLNgIgIAcgBCgAADYCHCAJRSAFQfsBS3INACAAIAVqIgggB0EUaiAHQRxqIgQQCjoAACAIIAdBDGogBBAKOgABAkAgBygCICIGQSFPBEAgB0GwGjYCJAwBCyAHKAIkIgQgBygCLE8EQCAHIAZBB3E2AiAgByAEIAZBA3ZrIgQ2AiQgByAEKAAANgIcDAMLIAQgBygCKCIJRg0AIAcgBiAEIAlrIAZBA3YiBiAEIAZrIgYgCUkbIgpBA3RrNgIgIAcgBCAKayIENgIkIAcgBCgAADYCHCAGIAlPDQILIAVBAnIhBQsgAEEBaiEMAn8CQANAQbp/IQggBUH9AUsNByAAIAVqIgogB0EUaiAHQRxqEAo6AAAgBSAMaiELIAcoAiAiBkEgSw0BAkAgBwJ/IAcoAiQiBCAHKAIsTwRAIAcgBCAGQQN2ayIENgIkIAZBB3EMAQsgBCAHKAIoIglGDQEgByAEIAQgCWsgBkEDdiIOIAQgDmsgCUkbIglrIgQ2AiQgBiAJQQN0aws2AiAgByAEKAAANgIcCyAFQf0BRg0HIAsgB0EMaiAHQRxqEAo6AAAgBUECaiEFIAcoAiAiBkEgTQRAIAcCfyAHKAIkIgQgBygCLE8EQCAHIAQgBkEDdmsiCDYCJCAGQQdxDAELIAQgBygCKCIIRg0CIAcgBCAEIAhrIAZBA3YiCSAEIAlrIAhJGyIEayIINgIkIAYgBEEDdGsLNgIgIAcgCCgAADYCHAwBCwsgB0GwGjYCJCAAIAVqIAdBFGogB0EcahAKOgAAIApBA2oMAQsgB0GwGjYCJCALIAdBDGogB0EcahAKOgAAIApBAmoLIABrIQgMBAsgCCAHQRRqIAdBHGoiBBAKOgACIAggB0EMaiAEEAo6AAMgBUEEaiEFIAcoAiAhCAwACwALIAdBHGoiBCAVIBQQCCIIQYh/Sw0BIAdBFGogBCAMEAkgB0EMaiAEIAwQCSAHKAIgIghBIEsNAAJAIAcCfyAHKAIkIgQgBygCLE8EQCAHIAQgCEEDdmsiBTYCJCAIQQdxDAELIAQgBygCKCIFRg0BIAcgBCAEIAVrIAhBA3YiBiAEIAZrIAVJGyIEayIFNgIkIAggBEEDdGsLIgg2AiAgByAFKAAANgIcC0EAIQUDQAJAAkAgCEEhTwRAIAdBsBo2AiQMAQsgBwJ/IAcoAiQiBCAHKAIsTwRAIAcgBCAIQQN2ayIENgIkQQEhCSAIQQdxDAELIAQgBygCKCIGRg0BIAcgBCAIQQN2IgkgBCAGayAEIAlrIAZPIgkbIgZrIgQ2AiQgCCAGQQN0aws2AiAgByAEKAAANgIcIAlFIAVB+wFLcg0AIAAgBWoiCCAHQRRqIAdBHGoiBBALOgAAIAggB0EMaiAEEAs6AAECQCAHKAIgIgZBIU8EQCAHQbAaNgIkDAELIAcoAiQiBCAHKAIsTwRAIAcgBkEHcTYCICAHIAQgBkEDdmsiBDYCJCAHIAQoAAA2AhwMAwsgBCAHKAIoIglGDQAgByAGIAQgCWsgBkEDdiIGIAQgBmsiBiAJSRsiCkEDdGs2AiAgByAEIAprIgQ2AiQgByAEKAAANgIcIAYgCU8NAgsgBUECciEFCyAAQQFqIQwCfwJAA0BBun8hCCAFQf0BSw0GIAAgBWoiCiAHQRRqIAdBHGoQCzoAACAFIAxqIQsgBygCICIGQSBLDQECQCAHAn8gBygCJCIEIAcoAixPBEAgByAEIAZBA3ZrIgQ2AiQgBkEHcQwBCyAEIAcoAigiCUYNASAHIAQgBCAJayAGQQN2Ig4gBCAOayAJSRsiCWsiBDYCJCAGIAlBA3RrCzYCICAHIAQoAAA2AhwLIAVB/QFGDQYgCyAHQQxqIAdBHGoQCzoAACAFQQJqIQUgBygCICIGQSBNBEAgBwJ/IAcoAiQiBCAHKAIsTwRAIAcgBCAGQQN2ayIINgIkIAZBB3EMAQsgBCAHKAIoIghGDQIgByAEIAQgCGsgBkEDdiIJIAQgCWsgCEkbIgRrIgg2AiQgBiAEQQN0aws2AiAgByAIKAAANgIcDAELCyAHQbAaNgIkIAAgBWogB0EUaiAHQRxqEAs6AAAgCkEDagwBCyAHQbAaNgIkIAsgB0EMaiAHQRxqEAs6AAAgCkECagsgAGshCAwDCyAIIAdBFGogB0EcaiIEEAs6AAIgCCAHQQxqIAQQCzoAAyAFQQRqIQUgBygCICEIDAALAAtBbCEICyAIQYh/Sw0CC0EAIQUgAUEAQTT8CwAgCCEGQQAhBANAIAUgBkcEQCAAIAVqIggtAAAiCUEMSw0CIAEgCUECdGoiCSAJKAIAQQFqNgIAIAVBAWohBUEBIAgtAAB0QQF1IARqIQQMAQsLQWwhCCAERQ0BIARnIgVBHHNBC0sNASADQSAgBWsiAzYCAEGAgICAeEEBIAN0IARrIgNnIgR2IANHDQEgACAGakEgIARrIgA6AAAgASAAQQJ0aiIAIAAoAgBBAWo2AgAgASgCBCIAQQJJIABBAXFyDQEgAiAGQQFqNgIAIA1BAWohCAwBC0FsIQgLIAdBMGokACAIC/UBAQF/IAJFBEAgAEIANwIAIABBADYCECAAQgA3AghBuH8PCyAAIAE2AgwgACABQQRqNgIQIAJBBE8EQCAAIAEgAmoiAUEEayIDNgIIIAAgAygAADYCACABQQFrLQAAIgEEQCAAQQggAWdBH3NrNgIEIAIPCyAAQQA2AgRBfw8LIAAgATYCCCAAIAEtAAAiAzYCAAJAAkACQCACQQJrDgIBAAILIAAgAS0AAkEQdCADciIDNgIACyAAIAEtAAFBCHQgA2o2AgALIAEgAmpBAWstAAAiAUUEQCAAQQA2AgRBbA8LIAAgAWcgAkEDdGtBCWo2AgQgAguuAQEEfyABIAIvAQAiAyABKAIEaiIENgIEIAAgA0ECdEGwGWooAgAgASgCAEEAIARrdnE2AgACQCAEQSFPBEAgAUGwGjYCCAwBCyABKAIIIgMgASgCEE8EQCABEAwMAQsgAyABKAIMIgVGDQAgASADIAMgBWsgBEEDdiIGIAMgBmsgBUkbIgNrIgU2AgggASAEIANBA3RrNgIEIAEgBSgAADYCAAsgACACQQRqNgIEC0wBBH8gACgCBCAAKAIAQQJ0aiICLQACIQMgAi8BACEEIAEgASgCBCIFIAItAAMiAmo2AgQgACAEIAEoAgAgBXRBACACa3ZqNgIAIAMLVgEEfyAAKAIEIAAoAgBBAnRqIgItAAIhAyACLwEAIQQgASACLQADIgIgASgCBGoiBTYCBCAAIAQgAkECdEGwGWooAgAgASgCAEEAIAVrdnFqNgIAIAMLLwEBfyAAIAAoAgQiAUEHcTYCBCAAIAAoAgggAUEDdmsiATYCCCAAIAEoAAA2AgALCAAgAEGIf0sLxQkCDX8CfiMAQRBrIgskACALQQA2AgwgC0EANgIIAn8CQCADQdQJaiIFIAMgC0EIaiALQQxqIAEgAiADQegAahAHIhBBiH9LDQAgCygCCCEIQQogACgCACIJQf8BcSIHIAdBCk8bQQFqIgQgCygCDCIBTwRAAkAgASAETw0AIAQgAWshAkEAIQEDQCABIAhGBEAgBCEBA0AgASACTQRAA0AgAkUNBSADIAJBAnRqQQA2AgAgAkEBayECDAALAAUgAyABQQJ0aiADIAEgAmtBAnRqKAIANgIAIAFBAWshAQwBCwALAAUgASAFaiIKIAJBACAKLQAAIgobIApqOgAAIAFBAWohAQwBCwALAAsgBCEBC0FUIAEgB0EBaksNARogAEEEaiEKIAAgCUH/gYB4cSABQRB0QYCA/AdxcjYCACABQQFqIQ4gA0E0aiEEQQAhAUEAIQIDQCACIA5GRQRAIAMgAkECdCIAaigCACEHIAAgBGogATYCACACQQFqIQIgASAHaiEBDAELCyADQdQHaiEHIAhBA2shAUEAIQADQAJAQQAhAiAAIAFOBEADQCAAIAhODQIgBCAAIAVqLQAAQQJ0aiIBIAEoAgAiAUEBajYCACABIAdqIAA6AAAgAEEBaiEADAALAAUDQCACQQRGRQRAIAQgBSAAIAJyIglqLQAAQQJ0aiIMIAwoAgAiDEEBajYCACAHIAxqIAk6AAAgAkEBaiECDAELCyAAQQRqIQAMAgsACwsgAygCACEIQQAhAEEBIQkDQCAJIA5GDQEgDiAJayEEIAMgCUECdGooAgAhBQJAAkACQAJAAkACQEEBIAl0QQF1IgxBAWsOCAABBAIEBAQDBAtBACECIAVBACAFQQBKGyEGIAAhAQNAIAIgBkYNBSAKIAFBAXRqIg0gByACIAhqai0AADoAASANIAQ6AAAgAkEBaiECIAFBAWohAQwACwALQQAhAiAFQQAgBUEAShshDSAAIQEDQCACIA1GDQQgCiABQQF0aiIGIAcgAiAIamotAAAiDzoAAyAGIAQ6AAIgBiAPOgABIAYgBDoAACACQQFqIQIgAUECaiEBDAALAAtBACECIAVBACAFQQBKGyEGIARB/wFxrSERIAAhAQNAIAIgBkYNAyAKIAFBAXRqIAcgAiAIamoxAABCCIYgEYRCgYCEgJCAwAB+NwAAIAJBAWohAiABQQRqIQEMAAsAC0EAIQIgBUEAIAVBAEobIQYgBEH/AXGtIREgACEBA0AgAiAGRg0CIAogAUEBdGoiBCAHIAIgCGpqMQAAQgiGIBGEQoGAhICQgMAAfiISNwAIIAQgEjcAACACQQFqIQIgAUEIaiEBDAALAAtBACEBIAVBACAFQQBKGyENIARB/wFxrSESIAAhBANAIAEgDUYNASAKIARBAXRqIQ8gByABIAhqajEAAEIIhiAShEKBgISAkIDAAH4hEUEAIQIDQCACIAxORQRAIA8gAkEBdGoiBiARNwAYIAYgETcAECAGIBE3AAggBiARNwAAIAJBEGohAgwBCwsgAUEBaiEBIAQgDGohBAwACwALIAlBAWohCSAFIAhqIQggBSAMbCAAaiEADAALAAsgEAshAiALQRBqJAAgAgufAwIBfgF/AkACQAJAAkACQAJAQQEgBCADa3QiCEEBaw4IAAEEAgQEBAMECyAGQRh0IANBEHRqIQMDQCABIAJGDQUgACABLQAAIgQgBEEIdCAFciAGQQFGGyADcjYBACABQQFqIQEgAEEEaiEADAALAAsgBkEYdCADQRB0aiEDA0AgASACRg0EIAAgAS0AACIEIARBCHQgBXIgBkEBRhsgA3IiBDYBBCAAIAQ2AQAgAUEBaiEBIABBCGohAAwACwALA0AgASACRg0DIAAgAS0AACADIAUgBhAQIgc3AQggACAHNwEAIAFBAWohASAAQRBqIQAMAAsACwNAIAEgAkYNAiAAIAEtAAAgAyAFIAYQECIHNwEYIAAgBzcBECAAIAc3AQggACAHNwEAIAFBAWohASAAQSBqIQAMAAsACwNAIAEgAkYNASAAIAhBAnRqIQQgAS0AACADIAUgBhAQIQcDQCAAIARGRQRAIAAgBzcBGCAAIAc3ARAgACAHNwEIIAAgBzcBACAAQSBqIQAMAQsLIAFBAWohASAEIQAMAAsACwsmACADQRh0IAFBEHRqIAAgAEEIdCACciADQQFGG3KtQoGAgIAQfgu7BgEKfyMAQSBrIgUkACAELwECIQsgBUEMaiACIAMQCCIDQYh/TQRAIARBBGohCCAAIAFqIQkCQAJAAkAgAUEETwRAIAlBA2shDUEAIAtrQR9xIQwgBSgCFCEDIAUoAhghByAFKAIcIQ4gBSgCDCEGIAUoAhAhBANAIARBIEsEQEGwGiEDDAQLAkAgAyAOTwRAIARBB3EhAiAEQQN2IQZBASEEDAELIAMgB0YNBCAEIARBA3YiAiADIAdrIAMgAmsgB08iBBsiBkEDdGshAgsgAyAGayIDKAAAIQYgBEUgACANT3INAiAIIAYgAnQgDHZBAXRqIgQtAAAhCiAAIAQtAAE6AAAgCCAGIAIgCmoiAnQgDHZBAXRqIgQtAAAhCiAAIAQtAAE6AAEgAiAKaiEEIABBAmohAAwACwALIAUoAhAiBEEhTwRAIAVBsBo2AhQMAwsgBSgCFCIDIAUoAhxPBEAgBSAEQQdxIgI2AhAgBSADIARBA3ZrIgM2AhQgBSADKAAANgIMIAIhBAwDCyADIAUoAhgiAkYNAiAFIAQgAyACayAEQQN2IgQgAyAEayACSRsiAkEDdGsiBDYCECAFIAMgAmsiAjYCFCAFIAIoAAA2AgwMAgsgAiEECyAFIAQ2AhAgBSADNgIUIAUgBjYCDAtBACALa0EfcSEHA0ACQCAEQSFPBEAgBUGwGjYCFAwBCyAFAn8gBSgCFCICIAUoAhxPBEAgBSACIARBA3ZrIgM2AhRBASEGIARBB3EMAQsgAiAFKAIYIgNGDQEgBSACIARBA3YiBiACIANrIAIgBmsgA08iBhsiAmsiAzYCFCAEIAJBA3RrCyIENgIQIAUgAygAACICNgIMIAZFIAAgCU9yDQAgCCACIAR0IAd2QQF0aiICLQABIQMgBSAEIAItAABqNgIQIAAgAzoAACAAQQFqIQAgBSgCECEEDAELCwNAIAAgCU9FBEAgCCAFKAIMIAUoAhAiAnQgB3ZBAXRqIgMtAAEhBCAFIAIgAy0AAGo2AhAgACAEOgAAIABBAWohAAwBCwtBbEFsIAEgBSgCEEEgRxsgBSgCFCAFKAIYRxshAwsgBUEgaiQAIAML/SEBGX8jAEHQAGsiBSQAQWwhBgJAIAFBBkkgA0EKSXINAAJAIAMgAi8ABCIHIAIvAAAiCiACLwACIglqakEGaiILSQ0AIAAgAUEDakECdiIMaiIIIAxqIg0gDGoiDCAAIAFqIhFLDQAgBC8BAiEOIAVBPGogAkEGaiICIAoQCCIGQYh/Sw0BIAVBKGogAiAKaiICIAkQCCIGQYh/Sw0BIAVBFGogAiAJaiICIAcQCCIGQYh/Sw0BIAUgAiAHaiADIAtrEAgiBkGIf0sNASAEQQRqIQogEUEDayESAkAgESAMa0EESQRAIAwhAyANIQIgCCEEDAELQQAgDmtBH3EhBkEAIQkgDCEDIA0hAiAIIQQDQCAJQQFxIAMgEk9yDQEgACAKIAUoAjwiCSAFKAJAIgt0IAZ2QQJ0aiIHLwEAOwAAIActAAIhECAHLQADIQ8gBCAKIAUoAigiEyAFKAIsIhR0IAZ2QQJ0aiIHLwEAOwAAIActAAIhFSAHLQADIRYgAiAKIAUoAhQiFyAFKAIYIhh0IAZ2QQJ0aiIHLwEAOwAAIActAAIhGSAHLQADIRogAyAKIAUoAgAiGyAFKAIEIhx0IAZ2QQJ0aiIHLwEAOwAAIActAAIhHSAHLQADIQcgACAPaiIPIAogCSALIBBqIgl0IAZ2QQJ0aiIALwEAOwAAIAUgCSAALQACajYCQCAALQADIQkgBCAWaiIEIAogEyAUIBVqIgt0IAZ2QQJ0aiIALwEAOwAAIAUgCyAALQACajYCLCAALQADIQsgAiAaaiICIAogFyAYIBlqIhB0IAZ2QQJ0aiIALwEAOwAAIAUgECAALQACajYCGCAALQADIRAgAyAHaiIHIAogGyAcIB1qIgB0IAZ2QQJ0aiIDLwEAOwAAIAUgACADLQACajYCBCAJIA9qIQAgBCALaiEEIAIgEGohAiAHIAMtAANqIQMgBUE8ahATIAVBKGoQE3IgBUEUahATciAFEBNyQQBHIQkMAAsACyAAIAhLIAQgDUtyDQBBbCEGIAIgDEsNAQJAAkAgCCAAayIJQQRPBEAgCEEDayEQQQAgDmtBH3EhCyAFKAJAIQYDQCAGQSFPBEAgBUGwGjYCRAwDCyAFAn8gBSgCRCIHIAUoAkxPBEAgBSAHIAZBA3ZrIgk2AkRBASEHIAZBB3EMAQsgByAFKAJIIglGDQMgBSAHIAZBA3YiDyAHIAlrIAcgD2sgCU8iBxsiD2siCTYCRCAGIA9BA3RrCyIGNgJAIAUgCSgAACIJNgI8IAdFIAAgEE9yDQIgACAKIAkgBnQgC3ZBAnRqIgYvAQA7AAAgBSAFKAJAIAYtAAJqIgc2AkAgACAGLQADaiIJIAogBSgCPCAHdCALdkECdGoiAC8BADsAACAFIAUoAkAgAC0AAmoiBjYCQCAJIAAtAANqIQAMAAsACyAFKAJAIgZBIU8EQCAFQbAaNgJEDAILIAUoAkQiCyAFKAJMTwRAIAUgBkEHcSIHNgJAIAUgCyAGQQN2ayIGNgJEIAUgBigAADYCPCAHIQYMAgsgCyAFKAJIIgdGDQEgBSAGIAsgB2sgBkEDdiIGIAsgBmsgB0kbIgdBA3RrIgY2AkAgBSALIAdrIgc2AkQgBSAHKAAANgI8DAELIAggAGshCQsCQCAJQQJJDQAgCEECayELQQAgDmtBH3EhEANAAkAgBkEhTwRAIAVBsBo2AkQMAQsgBQJ/IAUoAkQiByAFKAJMTwRAIAUgByAGQQN2ayIJNgJEQQEhByAGQQdxDAELIAcgBSgCSCIJRg0BIAUgByAGQQN2Ig8gByAJayAHIA9rIAlPIgcbIg9rIgk2AkQgBiAPQQN0awsiBjYCQCAFIAkoAAAiCTYCPCAHRSAAIAtLcg0AIAAgCiAJIAZ0IBB2QQJ0aiIHLwEAOwAAIAUgBSgCQCAHLQACaiIGNgJAIAAgBy0AA2ohAAwBCwsDQCAAIAtLDQEgACAKIAUoAjwgBnQgEHZBAnRqIgcvAQA7AAAgBSAFKAJAIActAAJqIgY2AkAgACAHLQADaiEADAALAAsCQCAAIAhPDQAgACAKIAUoAjwgBnRBACAOa3ZBAnRqIgAtAAA6AAAgBQJ/IAAtAANBAUYEQCAFKAJAIAAtAAJqDAELIAUoAkAiCEEfSw0BQSAgCCAALQACaiIAIABBIE8bCzYCQAsCQAJAIA0gBGsiBkEETwRAIA1BA2shCUEAIA5rQR9xIQcgBSgCLCEAA0AgAEEhTwRAIAVBsBo2AjAMAwsgBQJ/IAUoAjAiCCAFKAI4TwRAIAUgCCAAQQN2ayIGNgIwQQEhCCAAQQdxDAELIAggBSgCNCIGRg0DIAUgCCAAQQN2IgsgCCAGayAIIAtrIAZPIggbIgtrIgY2AjAgACALQQN0awsiADYCLCAFIAYoAAAiBjYCKCAIRSAEIAlPcg0CIAQgCiAGIAB0IAd2QQJ0aiIALwEAOwAAIAUgBSgCLCAALQACaiIINgIsIAQgAC0AA2oiBiAKIAUoAiggCHQgB3ZBAnRqIgQvAQA7AAAgBSAFKAIsIAQtAAJqIgA2AiwgBiAELQADaiEEDAALAAsgBSgCLCIAQSFPBEAgBUGwGjYCMAwCCyAFKAIwIgcgBSgCOE8EQCAFIABBB3EiCDYCLCAFIAcgAEEDdmsiADYCMCAFIAAoAAA2AiggCCEADAILIAcgBSgCNCIIRg0BIAUgACAHIAhrIABBA3YiACAHIABrIAhJGyIIQQN0ayIANgIsIAUgByAIayIINgIwIAUgCCgAADYCKAwBCyANIARrIQYLAkAgBkECSQ0AIA1BAmshCUEAIA5rQR9xIQsDQAJAIABBIU8EQCAFQbAaNgIwDAELIAUCfyAFKAIwIgggBSgCOE8EQCAFIAggAEEDdmsiBjYCMEEBIQcgAEEHcQwBCyAIIAUoAjQiBkYNASAFIAggAEEDdiIHIAggBmsgCCAHayAGTyIHGyIIayIGNgIwIAAgCEEDdGsLIgA2AiwgBSAGKAAAIgg2AiggB0UgBCAJS3INACAEIAogCCAAdCALdkECdGoiCC8BADsAACAFIAUoAiwgCC0AAmoiADYCLCAEIAgtAANqIQQMAQsLA0AgBCAJSw0BIAQgCiAFKAIoIAB0IAt2QQJ0aiIILwEAOwAAIAUgBSgCLCAILQACaiIANgIsIAQgCC0AA2ohBAwACwALAkAgBCANTw0AIAQgCiAFKAIoIAB0QQAgDmt2QQJ0aiIALQAAOgAAIAUCfyAALQADQQFGBEAgBSgCLCAALQACagwBCyAFKAIsIgRBH0sNAUEgIAQgAC0AAmoiACAAQSBPGws2AiwLAkACQCAMIAJrIgZBBE8EQCAMQQNrIQdBACAOa0EfcSEIIAUoAhghAANAIABBIU8EQCAFQbAaNgIcDAMLIAUCfyAFKAIcIgQgBSgCJE8EQCAFIAQgAEEDdmsiBjYCHEEBIQkgAEEHcQwBCyAEIAUoAiAiDUYNAyAFIAQgAEEDdiIGIAQgDWsgBCAGayANTyIJGyIEayIGNgIcIAAgBEEDdGsLIgA2AhggBSAGKAAAIgQ2AhQgCUUgAiAHT3INAiACIAogBCAAdCAIdkECdGoiAC8BADsAACAFIAUoAhggAC0AAmoiBDYCGCACIAAtAANqIg0gCiAFKAIUIAR0IAh2QQJ0aiICLwEAOwAAIAUgBSgCGCACLQACaiIANgIYIA0gAi0AA2ohAgwACwALIAUoAhgiAEEhTwRAIAVBsBo2AhwMAgsgBSgCHCIIIAUoAiRPBEAgBSAAQQdxIgQ2AhggBSAIIABBA3ZrIgA2AhwgBSAAKAAANgIUIAQhAAwCCyAIIAUoAiAiBEYNASAFIAAgCCAEayAAQQN2IgAgCCAAayAESRsiBEEDdGsiADYCGCAFIAggBGsiBDYCHCAFIAQoAAA2AhQMAQsgDCACayEGCwJAIAZBAkkNACAMQQJrIQ1BACAOa0EfcSEHA0ACQCAAQSFPBEAgBUGwGjYCHAwBCyAFAn8gBSgCHCIEIAUoAiRPBEAgBSAEIABBA3ZrIgY2AhxBASEIIABBB3EMAQsgBCAFKAIgIghGDQEgBSAEIABBA3YiBiAEIAhrIAQgBmsgCE8iCBsiBGsiBjYCHCAAIARBA3RrCyIANgIYIAUgBigAACIENgIUIAhFIAIgDUtyDQAgAiAKIAQgAHQgB3ZBAnRqIgQvAQA7AAAgBSAFKAIYIAQtAAJqIgA2AhggAiAELQADaiECDAELCwNAIAIgDUsNASACIAogBSgCFCAAdCAHdkECdGoiBC8BADsAACAFIAUoAhggBC0AAmoiADYCGCACIAQtAANqIQIMAAsACwJAIAIgDE8NACACIAogBSgCFCAAdEEAIA5rdkECdGoiAC0AADoAACAFAn8gAC0AA0EBRgRAIAUoAhggAC0AAmoMAQsgBSgCGCICQR9LDQFBICACIAAtAAJqIgAgAEEgTxsLNgIYCwJAIBEgA2tBBE8EQEEAIA5rQR9xIQQgBSgCBCEAA0AgAEEhTwRAIAVBsBo2AggMAwsgBQJ/IAUoAggiAiAFKAIQTwRAIAUgAiAAQQN2ayIGNgIIQQEhAiAAQQdxDAELIAIgBSgCDCIMRg0DIAUgAiAAQQN2IgggAiAMayACIAhrIAxPIgIbIgxrIgY2AgggACAMQQN0awsiADYCBCAFIAYoAAAiDDYCACACRSADIBJPcg0CIAMgCiAMIAB0IAR2QQJ0aiIALwEAOwAAIAUgBSgCBCAALQACaiICNgIEIAMgAC0AA2oiAyAKIAUoAgAgAnQgBHZBAnRqIgIvAQA7AAAgBSAFKAIEIAItAAJqIgA2AgQgAyACLQADaiEDDAALAAsgBSgCBCIAQSFPBEAgBUGwGjYCCAwBCyAFKAIIIgQgBSgCEE8EQCAFIABBB3EiAjYCBCAFIAQgAEEDdmsiADYCCCAFIAAoAAA2AgAgAiEADAELIAQgBSgCDCICRg0AIAUgACAEIAJrIABBA3YiACAEIABrIAJJGyICQQN0ayIANgIEIAUgBCACayICNgIIIAUgAigAADYCAAsCQCARIANrQQJJDQAgEUECayEEQQAgDmtBH3EhDANAAkAgAEEhTwRAIAVBsBo2AggMAQsgBQJ/IAUoAggiAiAFKAIQTwRAIAUgAiAAQQN2ayIGNgIIQQEhCSAAQQdxDAELIAIgBSgCDCIIRg0BIAUgAiAAQQN2Ig0gAiAIayACIA1rIAhPIgkbIgJrIgY2AgggACACQQN0awsiADYCBCAFIAYoAAAiAjYCACAJRSADIARLcg0AIAMgCiACIAB0IAx2QQJ0aiICLwEAOwAAIAUgBSgCBCACLQACaiIANgIEIAMgAi0AA2ohAwwBCwsDQCADIARLDQEgAyAKIAUoAgAgAHQgDHZBAnRqIgIvAQA7AAAgBSAFKAIEIAItAAJqIgA2AgQgAyACLQADaiEDDAALAAsCQCADIBFPDQAgAyAKIAUoAgAgAHRBACAOa3ZBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAUoAgQgAi0AAmohAAwBCyAFKAIEIgBBH0sNAEEgIAAgAi0AAmoiACAAQSBPGyEAC0FsQWxBbEFsQWxBbEFsQWwgASAAQSBHGyAFKAIIIAUoAgxHGyAFKAIYQSBHGyAFKAIcIAUoAiBHGyAFKAIsQSBHGyAFKAIwIAUoAjRHGyAFKAJAQSBHGyAFKAJEIAUoAkhHGyEGDAELQWwhBgsgBUHQAGokACAGCxkAIAAoAgggACgCEEkEQEEDDwsgABAMQQAL8xwBFn8jAEHQAGsiBSQAQWwhCAJAIAFBBkkgA0EKSXINAAJAIAMgAi8ABCIGIAIvAAAiCiACLwACIglqakEGaiISSQ0AIAAgAUEDakECdiILaiIHIAtqIg4gC2oiCyAAIAFqIg9LDQAgBC8BAiEMIAVBPGogAkEGaiICIAoQCCIIQYh/Sw0BIAVBKGogAiAKaiICIAkQCCIIQYh/Sw0BIAVBFGogAiAJaiICIAYQCCIIQYh/Sw0BIAUgAiAGaiADIBJrEAgiCEGIf0sNASAEQQRqIQogD0EDayESAkAgDyALa0EESQRAIAshAyAOIQIgByEEDAELQQAgDGtBH3EhCEEAIQYgCyEDIA4hAiAHIQQDQCAGQQFxIAMgEk9yDQEgCiAFKAI8IgYgBSgCQCIJdCAIdkEBdGoiDS0AACEQIAAgDS0AAToAACAKIAUoAigiDSAFKAIsIhF0IAh2QQF0aiITLQAAIRUgBCATLQABOgAAIAogBSgCFCITIAUoAhgiFnQgCHZBAXRqIhQtAAAhFyACIBQtAAE6AAAgCiAFKAIAIhQgBSgCBCIYdCAIdkEBdGoiGS0AACEaIAMgGS0AAToAACAKIAYgCSAQaiIGdCAIdkEBdGoiCS0AASEQIAUgBiAJLQAAajYCQCAAIBA6AAEgCiANIBEgFWoiBnQgCHZBAXRqIgktAAEhDSAFIAYgCS0AAGo2AiwgBCANOgABIAogEyAWIBdqIgZ0IAh2QQF0aiIJLQABIQ0gBSAGIAktAABqNgIYIAIgDToAASAKIBQgGCAaaiIGdCAIdkEBdGoiCS0AASENIAUgBiAJLQAAajYCBCADIA06AAEgA0ECaiEDIAJBAmohAiAEQQJqIQQgAEECaiEAIAVBPGoQEyAFQShqEBNyIAVBFGoQE3IgBRATckEARyEGDAALAAsgACAHSyAEIA5Lcg0AQWwhCCACIAtLDQECQCAHIABrQQROBEAgB0EDayEQQQAgDGtBH3EhDQNAIAUoAkAiBkEhTwRAIAVBsBo2AkQMAwsgBQJ/IAUoAkQiCCAFKAJMTwRAIAUgCCAGQQN2ayIINgJEQQEhCSAGQQdxDAELIAggBSgCSCIJRg0DIAUgCCAGQQN2IhEgCCAJayAIIBFrIAlPIgkbIhFrIgg2AkQgBiARQQN0awsiBjYCQCAFIAgoAAAiCDYCPCAJRSAAIBBPcg0CIAogCCAGdCANdkEBdGoiCC0AASEJIAUgBiAILQAAajYCQCAAIAk6AAAgCiAFKAI8IAUoAkAiBnQgDXZBAXRqIggtAAEhCSAFIAYgCC0AAGo2AkAgACAJOgABIABBAmohAAwACwALIAUoAkAiBkEhTwRAIAVBsBo2AkQMAQsgBSgCRCIJIAUoAkxPBEAgBSAGQQdxIgg2AkAgBSAJIAZBA3ZrIgY2AkQgBSAGKAAANgI8IAghBgwBCyAJIAUoAkgiCEYNACAFIAYgCSAIayAGQQN2IgYgCSAGayAISRsiCEEDdGsiBjYCQCAFIAkgCGsiCDYCRCAFIAgoAAA2AjwLQQAgDGtBH3EhCANAAkAgBkEhTwRAIAVBsBo2AkQMAQsgBQJ/IAUoAkQiCSAFKAJMTwRAIAUgCSAGQQN2ayIMNgJEQQEhCSAGQQdxDAELIAkgBSgCSCIMRg0BIAUgCSAGQQN2Ig0gCSAMayAJIA1rIAxPIgkbIg1rIgw2AkQgBiANQQN0awsiBjYCQCAFIAwoAAAiDDYCPCAJRSAAIAdPcg0AIAogDCAGdCAIdkEBdGoiCS0AASEMIAUgBiAJLQAAajYCQCAAIAw6AAAgAEEBaiEAIAUoAkAhBgwBCwsDQCAAIAdPRQRAIAogBSgCPCAFKAJAIgZ0IAh2QQF0aiIJLQABIQwgBSAGIAktAABqNgJAIAAgDDoAACAAQQFqIQAMAQsLAkAgDiAEa0EETgRAIA5BA2shCQNAIAUoAiwiAEEhTwRAIAVBsBo2AjAMAwsgBQJ/IAUoAjAiByAFKAI4TwRAIAUgByAAQQN2ayIGNgIwQQEhByAAQQdxDAELIAcgBSgCNCIGRg0DIAUgByAAQQN2IgwgByAGayAHIAxrIAZPIgcbIgxrIgY2AjAgACAMQQN0awsiADYCLCAFIAYoAAAiBjYCKCAHRSAEIAlPcg0CIAogBiAAdCAIdkEBdGoiBy0AASEGIAUgACAHLQAAajYCLCAEIAY6AAAgCiAFKAIoIAUoAiwiAHQgCHZBAXRqIgctAAEhBiAFIAAgBy0AAGo2AiwgBCAGOgABIARBAmohBAwACwALIAUoAiwiAEEhTwRAIAVBsBo2AjAMAQsgBSgCMCIGIAUoAjhPBEAgBSAAQQdxIgc2AiwgBSAGIABBA3ZrIgA2AjAgBSAAKAAANgIoIAchAAwBCyAGIAUoAjQiB0YNACAFIAAgBiAHayAAQQN2IgAgBiAAayAHSRsiB0EDdGsiADYCLCAFIAYgB2siBzYCMCAFIAcoAAA2AigLA0ACQCAAQSFPBEAgBUGwGjYCMAwBCyAFAn8gBSgCMCIHIAUoAjhPBEAgBSAHIABBA3ZrIgY2AjBBASEHIABBB3EMAQsgByAFKAI0IgZGDQEgBSAHIABBA3YiCSAHIAZrIAcgCWsgBk8iBxsiCWsiBjYCMCAAIAlBA3RrCyIANgIsIAUgBigAACIGNgIoIAdFIAQgDk9yDQAgCiAGIAB0IAh2QQF0aiIHLQABIQYgBSAAIActAABqNgIsIAQgBjoAACAEQQFqIQQgBSgCLCEADAELCwNAIAQgDk9FBEAgCiAFKAIoIAUoAiwiAHQgCHZBAXRqIgctAAEhBiAFIAAgBy0AAGo2AiwgBCAGOgAAIARBAWohBAwBCwsCQCALIAJrQQROBEAgC0EDayEOA0AgBSgCGCIAQSFPBEAgBUGwGjYCHAwDCyAFAn8gBSgCHCIEIAUoAiRPBEAgBSAEIABBA3ZrIgQ2AhxBASEGIABBB3EMAQsgBCAFKAIgIgdGDQMgBSAEIABBA3YiBiAEIAdrIAQgBmsgB08iBhsiB2siBDYCHCAAIAdBA3RrCyIANgIYIAUgBCgAACIENgIUIAZFIAIgDk9yDQIgCiAEIAB0IAh2QQF0aiIELQABIQcgBSAAIAQtAABqNgIYIAIgBzoAACAKIAUoAhQgBSgCGCIAdCAIdkEBdGoiBC0AASEHIAUgACAELQAAajYCGCACIAc6AAEgAkECaiECDAALAAsgBSgCGCIAQSFPBEAgBUGwGjYCHAwBCyAFKAIcIgcgBSgCJE8EQCAFIABBB3EiBDYCGCAFIAcgAEEDdmsiADYCHCAFIAAoAAA2AhQgBCEADAELIAcgBSgCICIERg0AIAUgACAHIARrIABBA3YiACAHIABrIARJGyIEQQN0ayIANgIYIAUgByAEayIENgIcIAUgBCgAADYCFAsDQAJAIABBIU8EQCAFQbAaNgIcDAELIAUCfyAFKAIcIgQgBSgCJE8EQCAFIAQgAEEDdmsiBDYCHEEBIQYgAEEHcQwBCyAEIAUoAiAiB0YNASAFIAQgAEEDdiIOIAQgB2sgBCAOayAHTyIGGyIHayIENgIcIAAgB0EDdGsLIgA2AhggBSAEKAAAIgQ2AhQgBkUgAiALT3INACAKIAQgAHQgCHZBAXRqIgQtAAEhByAFIAAgBC0AAGo2AhggAiAHOgAAIAJBAWohAiAFKAIYIQAMAQsLA0AgAiALT0UEQCAKIAUoAhQgBSgCGCIAdCAIdkEBdGoiBC0AASEHIAUgACAELQAAajYCGCACIAc6AAAgAkEBaiECDAELCwJAIA8gA2tBBE4EQANAIAUoAgQiAEEhTwRAIAVBsBo2AggMAwsgBQJ/IAUoAggiAiAFKAIQTwRAIAUgAiAAQQN2ayIENgIIQQEhAiAAQQdxDAELIAIgBSgCDCIERg0DIAUgAiAAQQN2IgsgAiAEayACIAtrIARPIgIbIgtrIgQ2AgggACALQQN0awsiADYCBCAFIAQoAAAiBDYCACACRSADIBJPcg0CIAogBCAAdCAIdkEBdGoiAi0AASEEIAUgACACLQAAajYCBCADIAQ6AAAgCiAFKAIAIAUoAgQiAHQgCHZBAXRqIgItAAEhBCAFIAAgAi0AAGo2AgQgAyAEOgABIANBAmohAwwACwALIAUoAgQiAEEhTwRAIAVBsBo2AggMAQsgBSgCCCIEIAUoAhBPBEAgBSAAQQdxIgI2AgQgBSAEIABBA3ZrIgA2AgggBSAAKAAANgIAIAIhAAwBCyAEIAUoAgwiAkYNACAFIAAgBCACayAAQQN2IgAgBCAAayACSRsiAkEDdGsiADYCBCAFIAQgAmsiAjYCCCAFIAIoAAA2AgALA0ACQCAAQSFPBEAgBUGwGjYCCAwBCyAFAn8gBSgCCCICIAUoAhBPBEAgBSACIABBA3ZrIgQ2AghBASECIABBB3EMAQsgAiAFKAIMIgRGDQEgBSACIABBA3YiCyACIARrIAIgC2sgBE8iAhsiC2siBDYCCCAAIAtBA3RrCyIANgIEIAUgBCgAACIENgIAIAJFIAMgD09yDQAgCiAEIAB0IAh2QQF0aiICLQABIQQgBSAAIAItAABqNgIEIAMgBDoAACADQQFqIQMgBSgCBCEADAELCwNAIAMgD09FBEAgCiAFKAIAIAUoAgQiAHQgCHZBAXRqIgItAAEhBCAFIAAgAi0AAGo2AgQgAyAEOgAAIANBAWohAwwBCwtBbEFsQWxBbEFsQWxBbEFsIAEgBSgCBEEgRxsgBSgCCCAFKAIMRxsgBSgCGEEgRxsgBSgCHCAFKAIgRxsgBSgCLEEgRxsgBSgCMCAFKAI0RxsgBSgCQEEgRxsgBSgCRCAFKAJIRxshCAwBC0FsIQgLIAVB0ABqJAAgCAsaACAABEAgAQRAIAIgACABEQIADwsgABACCwtSAQN/AkAgACgCmOsBIgFFDQAgASgCACABKAK01QEiAiABKAK41QEiAxAVIAIEQCADIAEgAhECAAwBCyABEAILIABBADYCqOsBIABCADcDmOsBC5QFAgR/An4jAEEQayIGJAACQCABIAJFckUEQEF/IQQMAQsCQEEBQQUgAxsiBCACSwRAIAJFIANBAUZyDQIgBkGo6r5pNgIMIAJFIgBFBEAgBkEMaiABIAL8CgAACyAGKAIMQajqvmlGDQIgBkHQ1LTCATYCDCAARQRAIAZBDGogASAC/AoAAAsgBigCDEFwcUHQ1LTCAUYNAgwBCyAAQQBBMPwLAEEBIQUCQCADQQFGDQAgAyEFIAEoAAAiA0Go6r5pRg0AIANBcHFB0NS0wgFHDQFBCCEEIAJBCEkNAiAAQQE2AhQgASgAACECIABBCDYCGCAAIAJB0NS0wgFrNgIcIAAgATUABDcDAEEAIQQMAgsgAiABIAIgBRAYIgJJBEAgAiEEDAILIAAgAjYCGCABIARqIgVBAWstAAAiAkEIcQRAQXIhBAwCCyACQSBxIgNFBEAgBS0AACIFQacBSwRAQXAhBAwDCyAFQQdxrUIBIAVBA3ZBCmqthiIIQgOIfiAIfCEJIARBAWohBAsgAkEGdiEFIAJBAnYhBwJAAkACQAJAIAJBA3EiAkEBaw4DAAECAwsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAdBAXEhBwJ+AkACQAJAAkAgBUEBaw4DAQIDAAtCfyADRQ0DGiABIARqMQAADAMLIAEgBGozAABCgAJ8DAILIAEgBGo1AAAMAQsgASAEaikAAAshCCAAIAc2AiAgACACNgIcIAAgCDcDAEEAIQQgAEEANgIUIAAgCCAJIAMbIgg3AwggAEKAgAggCCAIQoCACFobPgIQDAELQXYhBAsgBkEQaiQAIAQLXwEBf0G4fyEDIAFBAUEFIAIbIgFPBH8gACABakEBay0AACIAQQNxQQJ0QcAaaigCACABaiAAQQR2QQxxQdAaaigCAGogAEEgcSIBRWogAUEFdiAAQcAASXFqBUG4fwsLxAICBH8CfiMAQUBqIgQkAAJAA0AgAUEFTwRAAkAgACgAAEFwcUHQ1LTCAUYEQEJ+IQYgAUEISQ0EIAAoAAQiA0F3Sw0EIANBCGoiAiABSw0EIANBgX9JDQEMBAsgBEEQaiIDIAAgAUEAEBchAkJ+IAQpAxBCACAEKAIkQQFHGyACGyIGQn1WDQMgBiAHfCIHIAZUIQJCfiEGIAINAyADIAAgAUEAEBciAkGIf0sgAnINAyABIAQoAigiA2shAiAAIANqIQMDQCADIAIgBEEEahAaIgVBiH9LDQQgAiAFQQNqIgVJDQQgAiAFayECIAMgBWohAyAEKAIIRQ0ACyAEKAIwBH8gAkEESQ0EIANBBGoFIAMLIABrIgJBiH9LDQMLIAEgAmshASAAIAJqIQAMAQsLQn4gByABGyEGCyAEQUBrJAAgBgtkAQF/Qbh/IQMCQCABQQNJDQAgAC0AAiEBIAIgAC8AACIAQQFxNgIEIAIgAEEBdkEDcSIDNgIAIAIgACABQRB0ckEDdiIANgIIAkACQCADQQFrDgMCAQABC0FsDwsgACEDCyADC7ABAAJ/IAIgACgClOsBBH8gACgC0OkBBUGAgAgLIgIgA2pBQGtLBEAgACABIAJqQSBqIgE2AvzrAUEBIQIgASADagwBCyADQYCABE0EQCAAIABBiOwBaiIBNgL86wFBACECIAEgA2oMAQsgACABIARqIgEgA2siAkHg/wNqIgQgAiAFGzYC/OsBQQIhAiADIARqQYCABGsgASAFGwshAyAAIAI2AoTsASAAIAM2AoDsAQuyBwIEfwF+IwBBgAFrIg4kACAOIAM2AnwCQAJAAkACQAJAAkAgAkEBaw4DAAMCAQsgBkUEQEG4fyEKDAULIAMgBS0AACICSQ0DIAIgCGotAAAhAyAHIAJBAnRqKAIAIQIgAEEAOgALIABCADcCACAAIAI2AgwgACADOgAKIABBADsBCCABIAA2AgBBASEKDAQLIAEgCTYCAEEAIQoMAwsgCkUNAUEAIQogC0UgDEEZSXINAkEIIAR0QQhyIQBBACEDA0AgACADTQ0DIANBQGshAwwACwALQWwhCiAOIA5B/ABqIA5B+ABqIAUgBhAGIgNBiH9LDQEgDigCeCICIARLDQEgAEEMaiEMIA4oAnxBAWohEUGAgAIgAnRBEHYhEEEAIQRBASEFQQEgAnQiCkEBayILIQkDQCAEIBFHBEACQCAOIARBAXQiD2ovAQAiBkH//wNGBEAgDCAJQQN0aiAENgIAIAlBAWshCUEBIQYMAQsgBUEAIBAgBsFKGyEFCyANIA9qIAY7AQAgBEEBaiEEDAELCyAAIAI2AgQgACAFNgIAAkAgCSALRgRAIA1B6gBqIRBBACEJQQAhBQNAIAkgEUYEQCAKQQN2IApBAXZqQQNqIglBAXQhEUEAIQZBACEFA0AgBSAKTw0EIAUgEGohD0EAIQQDQCAEQQJHBEAgDCAEIAlsIAZqIAtxQQN0aiAEIA9qLQAANgIAIARBAWohBAwBCwsgBUECaiEFIAYgEWogC3EhBgwACwAFIA4gCUEBdGouAQAhBiAFIBBqIg8gEjcAAEEIIQQDQCAEIAZIBEAgBCAPaiASNwAAIARBCGohBAwBCwsgEkKBgoSIkKDAgAF8IRIgCUEBaiEJIAUgBmohBQwBCwALAAsgCkEDdiAKQQF2akEDaiEQQQAhBUEAIQYDQCAFIBFGDQFBACEEIA4gBUEBdGouAQAiD0EAIA9BAEobIQ8DQCAEIA9HBEAgDCAGQQN0aiAFNgIAA0AgBiAQaiALcSIGIAlLDQALIARBAWohBAwBCwsgBUEBaiEFDAALAAsgAEEIaiEJIAJBH2shC0EAIQYDQCAGIApHBEAgDSAJIAZBA3RqIgIoAgQiBEEBdGoiBSAFLwEAIgVBAWo7AQAgAiALIAVnaiIMOgADIAIgBSAMdCAKazsBACACIAQgCGotAAA6AAIgAiAHIARBAnRqKAIANgIEIAZBAWohBgwBCwsgASAANgIAIAMhCgwBC0FsIQoLIA5BgAFqJAAgCgtwAQR/IABCADcCACACBEAgAUEKaiEGIAEoAgQhBEEAIQJBACEBA0AgASAEdkUEQCACIAYgAUEDdGotAAAiBSACIAVLGyECIAFBAWohASADIAVBFktqIQMMAQsLIAAgAjYCBCAAIANBCCAEa3Q2AgALC64BAQR/IAEgAigCBCIDIAEoAgRqIgQ2AgQgACADQQJ0QbAZaigCACABKAIAQQAgBGt2cTYCAAJAIARBIU8EQCABQbAaNgIIDAELIAEoAggiAyABKAIQTwRAIAEQDAwBCyADIAEoAgwiBUYNACABIAMgAyAFayAEQQN2IgYgAyAGayAFSRsiA2siBTYCCCABIAQgA0EDdGs2AgQgASAFKAAANgIACyAAIAJBCGo2AgQLjQICA38BfiAAIAJqIQQCQAJAIAJBCE4EQCAAIAFrIgJBeUgNAQsDQCAAIARPDQIgACABLQAAOgAAIABBAWohACABQQFqIQEMAAsACwJAAkAgAkFvSw0AIAAgBEEgayICSw0AIAEpAAAhBiAAIAEpAAg3AAggACAGNwAAIAIgAGsiBUERTgRAIABBEGohACABIQMDQCADKQAQIQYgACADKQAYNwAIIAAgBjcAACADKQAgIQYgACADKQAoNwAYIAAgBjcAECADQSBqIQMgAEEgaiIAIAJJDQALCyABIAVqIQEMAQsgACECCwNAIAIgBE8NASACIAEtAAA6AAAgAkEBaiECIAFBAWohAQwACwALC98BAQZ/Qbp/IQoCQCACKAIEIgggAigCACIJaiINIAEgAGtLDQBBbCEKIAkgBCADKAIAIgtrSw0AIAAgCWoiBCACKAIIIgxrIQIgACABQSBrIgEgCyAJQQAQIyADIAkgC2o2AgACQAJAIAQgBWsgDE8EQCACIQUMAQsgDCAEIAZrSw0CIAcgByACIAVrIgNqIgIgCGpPBEAgCEUNAiAEIAIgCPwKAAAMAgtBACADayIABEAgBCACIAD8CgAACyADIAhqIQggBCADayEECyAEIAEgBSAIQQEQIwsgDSEKCyAKC+sBAQZ/Qbp/IQsCQCADKAIEIgkgAygCACIKaiINIAEgAGtLDQAgBSAEKAIAIgVrIApJBEBBbA8LIAMoAgghDCAAIAVLIAUgCmoiDiAAS3ENACAAIApqIgMgDGshASAAIAUgChAfIAQgDjYCAAJAAkAgAyAGayAMTwRAIAEhBgwBC0FsIQsgDCADIAdrSw0CIAggCCABIAZrIgBqIgEgCWpPBEAgCUUNAiADIAEgCfwKAAAMAgtBACAAayIEBEAgAyABIAT8CgAACyAAIAlqIQkgAyAAayEDCyADIAIgBiAJQQEQIwsgDSELCyALC6sCAQJ/IAJBH3EhAyABIQQDQCADQQhJRQRAIANBCGshAyAEKQAAQs/W077Sx6vZQn5CH4lCh5Wvr5i23puef34gAIVCG4lCh5Wvr5i23puef35CnaO16oOxjYr6AH0hACAEQQhqIQQMAQsLIAEgAkEYcWohASACQQdxIgNBBEkEfyABBSADQQRrIQMgATUAAEKHla+vmLbem55/fiAAhUIXiULP1tO+0ser2UJ+Qvnz3fGZ9pmrFnwhACABQQRqCyEEA0AgAwRAIANBAWshAyAEMQAAQsXP2bLx5brqJ34gAIVCC4lCh5Wvr5i23puef34hACAEQQFqIQQMAQsLIABCIYggAIVCz9bTvtLHq9lCfiIAQh2IIACFQvnz3fGZ9pmrFn4iAEIgiCAAhQvhBAIBfgJ/IAAgA2ohBwJAIANBB0wEQANAIAAgB08NAiAAIAItAAA6AAAgAEEBaiEAIAJBAWohAgwACwALIAQEQAJAIAAgAmsiBkEHTQRAIAAgAi0AADoAACAAIAItAAE6AAEgACACLQACOgACIAAgAi0AAzoAAyAAIAIgBkECdCIGQeAaaigCAGoiAigAADYABCACIAZBgBtqKAIAayECDAELIAAgAikAADcAAAsgA0EIayEDIAJBCGohAiAAQQhqIQALIAEgB08EQCAAIANqIQEgBEUgACACa0EPSnJFBEADQCAAIAIpAAA3AAAgAkEIaiECIABBCGoiACABSQ0ADAMLAAsgAikAACEFIAAgAikACDcACCAAIAU3AAAgA0ERSQ0BIABBEGohAANAIAIpABAhBSAAIAIpABg3AAggACAFNwAAIAIpACAhBSAAIAIpACg3ABggACAFNwAQIAJBIGohAiAAQSBqIgAgAUkNAAsMAQsCQCAAIAFLBEAgACEBDAELIAEgAGshBgJAIARFIAAgAmtBD0pyRQRAIAIhAwNAIAAgAykAADcAACADQQhqIQMgAEEIaiIAIAFJDQALDAELIAIpAAAhBSAAIAIpAAg3AAggACAFNwAAIAZBEUgNACAAQRBqIQAgAiEDA0AgAykAECEFIAAgAykAGDcACCAAIAU3AAAgAykAICEFIAAgAykAKDcAGCAAIAU3ABAgA0EgaiEDIABBIGoiACABSQ0ACwsgAiAGaiECCwNAIAEgB08NASABIAItAAA6AAAgAUEBaiEBIAJBAWohAgwACwALC6HFAQI2fwV+IwBBEGsiMSQAAkBBwOwFEAEiCEUEQEFAIQYMAQsgCEIANwL86gEgCEEANgKc6wEgCEEANgKQ6wEgCEEANgLU6wEgCEEANgLE6wEgCEIANwKk6wEgCEEANgK46QEgCEEANgK87AUgCEIANwK86wEgCEEANgKs6wEgCEIBNwKU6wEgCEIANwPo6wEgCEGBgIDAADYCzOsBIAhCADcC7OoBIAhCADcDsOsBIAhBADYCuOsBIAhBhOsBakEANgIAIAgQFiAIQbjqAWohNCAIQcDpAWohNiAIQZDqAWohNyAAISwCQAJAAkACQANAQQFBBSAIKALs6gEiCxshEwJAA0AgAyATSQ0BAkAgA0EESSALcg0AIAIoAABBcHFB0NS0wgFHDQBBuH8hBiADQQhJDQcgAigABCIHQXdLBEBBciEGDAgLIAMgB0EIaiIESQ0HIAdBgH9LBEAgBCEGDAgLIAMgBGshAyACIARqIQIMAQsLIAhCADcCrOkBIAhCADcD8OkBIAhBjICA4AA2AqhQIAhBADYCoOsBIAhCADcDiOoBIAhBATYClOsBIAhCAzcDgOoBIAhBtOkBakIANwIAIAhB+OkBakIANwMAIAhB9A4pAgA3AqzQASAIQbTQAWpB/A4oAgA2AgAgCCAIQRBqNgIAIAggCEGgMGo2AgQgCCAIQZggajYCCCAIIAhBqNAAajYCDCAIQQFBBSAIKALs6gEbNgK86QECQCABRQ0AICwgCCgCrOkBIgZGDQAgCCAGNgK46QEgCCAsNgKs6QEgCCgCsOkBIQQgCCAsNgKw6QEgCCAsIAQgBmtqNgK06QELQbh/IQYgA0EFQQkgCCgC7OoBIhMbSQ0FIAJBAUEFIBMbIBMQGCIEQYh/Sw0EIAMgBEEDakkNBSA2IAIgBCATEBciBkGIf0sEQCAGIQQMBQsgBg0DAkACQCAIKAKw6wFBAUcNACAIKAKs6wEiC0UNACAIKAKc6wFFDQAgCygCBCEGIDEgCCgC3OkBIgo2AgQgBkEBayIHQsnP2bLx5brqJyAxQQRqQQQQIqdxIRMgCygCACELA0AgCiALIBNBAnRqKAIAIgwEfyAMKAKo1QEFQQALIgZHBEAgByATcUEBaiETIAYNAQsLIAxFDQAgCBAWIAhBfzYCqOsBIAggDDYCnOsBIAggCCgC3OkBIhM2AqDrAQwBCyAIKALc6QEhEwsCQCATRQ0AIAgoAqDrASATRg0AQWAhBAwFCwJAIAgoAuDpAQRAIAggCCgC8OoBIgZFNgL06gEgBg0BIDdBAEHYAPwLACAIQvnq0NDnyaHk4QA3A7DqASAIQs/W077Sx6vZQjcDoOoBIAhC1uuC7ur9ifXgADcDmOoBDAELIAhBADYC9OoBCyAIIAgpA/DpASAErXw3A/DpASAIKAK46wEiEwRAIAggCCgC0OkBIgYgEyAGIBNJGzYC0OkBCyABICxqITUgAyAEayEDIAIgBGohAiAsIRMDQCACIAMgMUEEahAaIiBBiH9LBEAgICEEDAYLIANBA2siOCAgSQ0EIAJBA2oiHSA1IB0gNUkbIDUgEyAdTRshAkFsIQQCQAJAAkACQAJAAkACQAJAIDEoAgQOAwECAA0LIAIgE2shFEEAITMjAEHQAmsiBSQAAkACQCAIKAKU6wEiAgR/IAgoAtDpAQVBgIAICyAgSQ0AAkAgIEECSQ0AIB0tAAAiA0EDcSEaIAIEfyAIKALQ6QEFQYCACAshBgJAAkACQAJAAkACQAJAAkACQAJAIBpBAWsOAwMBAAILIAgoAojqAQ0AQWIhAwwLCyAgQQVJDQhBAyEMIB0oAAAhBAJ/An8CQAJAAkAgA0ECdkEDcSICQQJrDgIBAgALIARBDnZB/wdxIQ0gBEEEdkH/B3EhECACQQBHDAMLIARBEnYhDSAEQQR2Qf//AHEhEEEEDAELIB0tAARBCnQgBEEWdnIhDSAEQQR2Qf//D3EhEEEFCyEMQQELIQRBun8hAyATQQEgEBtFDQogBiAQSQ0IIBBBBkkgBHEEQEFoIQMMCwsgDCANaiIKICBLDQggBiAUIAYgFEkbIgIgEEkNCiAIIBMgFCAQIAJBABAbAkAgCCgCpOsBRSAQQYEGSXINAEEAIQMDQCADQYOAAUsNASADQUBrIQMMAAsACyAaQQNGBEAgDCAdaiEGIAgoAgwiCy0AAUEIdCECIAgoAvzrASEDIARFBEAgAgRAIAVB4AFqIAYgDRAIIg5BiH9LDQkgC0EEaiEZIAMgEGohESALLwECIQkgEEEETwRAIBFBA2shBkEAIAlrQR9xIQcgBSgC6AEhDCAFKALsASEPIAUoAvABIQQgBSgC4AEhDSAFKALkASEOA0AgDkEgSwRAQbAaIQwMCgsCQCAEIAxNBEAgDkEHcSESIA5BA3YhDUEBIQ4MAQsgDCAPRg0KIA4gDkEDdiICIAwgD2sgDCACayAPTyIOGyINQQN0ayESCyAMIA1rIgwoAAAhDSAORSADIAZPcg0IIAMgGSANIBJ0IAd2QQJ0aiICLwEAOwAAIAMgAi0AA2oiAyAZIA0gEiACLQACaiICdCAHdkECdGoiCy8BADsAACADIAstAANqIQMgAiALLQACaiEODAALAAsgBSgC5AEiDkEhTwRAIAVBsBo2AugBDAkLIAUoAugBIgYgBSgC8AFPBEAgBSAOQQdxIgI2AuQBIAUgBiAOQQN2ayIENgLoASAFIAQoAAA2AuABIAIhDgwJCyAGIAUoAuwBIgRGDQggBSAOIAYgBGsgDkEDdiICIAYgAmsgBEkbIgJBA3RrIg42AuQBIAUgBiACayICNgLoASAFIAIoAAA2AuABDAgLIAMgECAGIA0gCxARIQ4MCAsgAgRAIAMgECAGIA0gCxASIQ4MCAsgAyAQIAYgDSALEBQhDgwHCyAIQazVAWohFyAMIB1qISEgCEGo0ABqIQcgCCgC/OsBIRYgBEUEQCAHICEgDSAXEA4iDkGIf0sNByANIA5NDQMgFiAQIA4gIWogDSAOayAHEBEhDgwHCyAQRQRAQbp/IQ4MBwsgDUUEQEFsIQ4MBwsgEEEIdiIDIA0gEEkEfyANQQR0IBBuBUEPC0EEdCIEQYwIaigCAGwgBEGICGooAgBqIgJBBXYgAmogBEGACGooAgAgBEGECGooAgAgA2xqSQRAIwBBEGsiLSQAIAcoAgAhESAXQfAEaiIeQQBB8AD8CwBBVCEDAkAgEUH/AXEiL0EMSw0AIBdB4AdqIgkgHiAtQQhqIC1BDGogISANIBdB4AlqEAciBEGIf00EQCAtKAIMIgsgL0sNASAXQagFaiEZIBdBpAVqITAgB0EEaiEbIBFBgICAeHEhJCALQQFqIjIhAyALIQYDQCADIgJBAWshAyAGIgxBAWshBiAeIAxBAnRqKAIARQ0AC0EBIAIgAkEBTRshDkEAIQZBASEDA0AgAyAORwRAIB4gA0ECdCIPaigCACECIA8gGWogBjYCACADQQFqIQMgAiAGaiEGDAELCyAXIAY2AqgFIBkgDEEBaiIfQQJ0aiAGNgIAIBdB4AVqISZBACEDIC0oAgghBgNAIAMgBkcEQCAZIAMgCWotAABBAnRqIgIgAigCACICQQFqNgIAIAIgJmogAzoAACADQQFqIQMMAQsLQQAhBiAZQQA2AgBBCyAvIBFB/wFxQQxGGyAvIAtBDEkbIikgC0F/c2ohD0EBIQMDQCADIA5HBEAgHiADQQJ0IgtqKAIAIQIgCyAXaiAGNgIAIAIgAyAPanQgBmohBiADQQFqIQMMAQsLICkgMiAMayILa0EBaiEJIAshBgNAIAYgCUkEQCAXIAZBNGxqIQ9BASEDA0AgAyAORwRAIA8gA0ECdCICaiACIBdqKAIAIAZ2NgIAIANBAWohAwwBCwsgBkEBaiEGDAELCyAyIClrIRUgDEEAIAxBAEobQQFqISdBASEuA0AgJyAuRwRAIDIgLmshBiAXIC5BAnQiAmooAgAhJSACIDBqKAIAISogMCAuQQFqIi5BAnRqKAIAIRggCyApIAZrIgNNBEAgHyAGIBVqIgJBASACQQFKIhIbIgIgAiAfSBshHCAXIAZBNGxqIh4gAkECdGohGSAGIDJqIREgBkEQdEGAgIAIaiEOQQEgA3QiCUECayEPA0AgGCAqRg0DIBsgJUECdGohKCAmICpqLQAAISsgAiEDIBIEQCAOICtyrUKBgICAEH4hOiAZKAIAIQZBACEDAkACQAJAAkAgDw4DAQIAAgsgKCA6NwEICyAoIDo3AQAMAQsDQCADIAZODQEgKCADQQJ0aiIMIDo3ARggDCA6NwEQIAwgOjcBCCAMIDo3AQAgA0EIaiEDDAALAAsgAiEDCwNAIAMgHEcEQCARIANrIQwgKCAeIANBAnQiBmooAgBBAnRqICYgBiAwaigCAGogJiAwIANBAWoiA0ECdGooAgBqIAwgKSArQQIQDwwBCwsgKkEBaiEqIAkgJWohJQwACwAFIBsgJUECdGogJiAqaiAYICZqIAYgKUEAQQEQDwwCCwALCyAHIClBEHQgJHIgL3JBgAJyNgIACyAEIQMLIC1BEGokACADIg5BiH9LDQcgAyANTw0DIBYgECADICFqIA0gA2sgBxASIQ4MBwsgByAhIA0gFxAOIg5BiH9LDQYgDSAOTQ0CIBYgECAOICFqIA0gDmsgBxAUIQ4MBgtBAiEQAn8CQAJAAkAgA0ECdkEDcUEBaw4DAQACAAtBASEQIANBA3YMAgsgHS8AAEEEdgwBCyAgQQJGDQhBAyEQIB0vAAAgHS0AAkEQdHJBBHYLIQtBun8hAyATQQEgCxtFDQkgBiALSQ0HIAsgFEsNCSAIIBMgFCALIAYgFCAGIBRJG0EBEBsgICALIBBqIgpBIGpJBEAgCiAgSw0IIBAgHWohBCAIKAL86wEhAwJAIAgoAoTsAUECRgRAIAtBgIAEayICBEAgAyAEIAL8CgAACyAIQYjsAWogAiAEakGAgAT8CgAADAELIAtFDQAgAyAEIAv8CgAACyAIIAs2AojrASAIIAgoAvzrATYC+OoBDAcLIAhBADYChOwBIAggCzYCiOsBIAggECAdaiICNgL46gEgCCACIAtqNgKA7AEMBgsCfwJAAkACQCADQQJ2QQNxQQFrDgMBAAIAC0EBIRAgA0EDdgwCCyAgQQJGDQhBAiEQIB0vAABBBHYMAQsgIEEESQ0HQQMhECAdLwAAIB0tAAJBEHRyQQR2CyELQbp/IQMgE0EBIAsbRQ0IIAYgC0kNBiALIBRLDQggCCATIBQgCyAGIBQgBiAUSRtBARAbIBAgHWoiAy0AACEGIAgoAvzrASEEAkAgCCgChOwBQQJGBEAgC0GAgARrIgIEQCAEIAYgAvwLAAsgCEGI7AFqIAMtAABBgIAE/AsADAELIAtFDQAgBCAGIAv8CwALIAggCzYCiOsBIAggCCgC/OsBNgL46gEgEEEBaiEKDAULQbh/IQ4MAwsgEiEOCyAFIA42AuQBIAUgDDYC6AEgBSANNgLgAQsCQCARIANrQQJJDQAgEUECayELQQAgCWtBH3EhBgNAAkAgDkEhTwRAIAVBsBo2AugBDAELIAUCfyAFKALoASIHIAUoAvABTwRAIAUgByAOQQN2ayIMNgLoAUEBISUgDkEHcQwBCyAHIAUoAuwBIgRGDQEgBSAHIA5BA3YiAiAHIARrIAcgAmsgBE8iJRsiAmsiDDYC6AEgDiACQQN0awsiDjYC5AEgBSAMKAAAIgI2AuABICVFIAMgC0tyDQAgAyAZIAIgDnQgBnZBAnRqIgIvAQA7AAAgBSAFKALkASACLQACaiIONgLkASADIAItAANqIQMMAQsLA0AgAyALSw0BIAMgGSAFKALgASAOdCAGdkECdGoiAi8BADsAACAFIAUoAuQBIAItAAJqIg42AuQBIAMgAi0AA2ohAwwACwALAkAgAyARTw0AIAMgGSAFKALgASAOdEEAIAlrdkECdGoiAi0AADoAACACLQADQQFGBEAgBSgC5AEgAi0AAmohDgwBCyAFKALkASIOQR9LDQBBICAOIAItAAJqIgIgAkEgTxshDgtBbEFsIBAgDkEgRxsgBSgC6AEgBSgC7AFHGyEOCyAIKAKE7AFBAkYEQCAIQYjsAWogCCgCgOwBQYCABGtBgIAE/AoAACAQQYCABGsiAwRAIAgoAvzrASICQeD/A2ogAiAD/AoAAAsgCCAIKAL86wFB4P8DajYC/OsBIAggCCgCgOwBQSBrNgKA7AELIA5BiH9LDQEgCCAQNgKI6wEgCEEBNgKI6gEgCCAIKAL86wE2AvjqASAaQQJGBEAgCCAIQajQAGo2AgwLIAoiA0GIf0sNAwsgCCgClOsBBH8gCCgC0OkBBUGAgAgLIQwgCiAgRg0BICAgCmshCSAIKAK06QEhCyAdICBqIQ0gCCgCpOsBIQYCfwJAAn8gCiAdaiIRLQAAIg7AIgJBAE4EQCARQQFqDAELIAJBf0YEQCAJQQNJDQUgEUEDaiEEIBEvAAFBgP4BaiEODAILIAlBAUYNBCARLQABIA5BCHRyQYCAAmshDiARQQJqCyEEIA4NAEFsIQMgBCANRw0EQQAhDiAJDAELQbh/IQMgBEEBaiIPIA1LDQMgBC0AACIKQQNxDQEgCEEQaiAIIApBBnZBI0EJIA8gDSAPa0HADUHQDkGADyAIKAKM6gEgBiAOIAhBrNUBaiIHEBwiAkGIf0sNASAIQZggaiAIQQhqIApBBHZBA3FBH0EIIAIgD2oiBCANIARrQYAKQYALQZATIAgoAozqASAIKAKk6wEgDiAHEBwiAkGIf0sNAUFsIQMgCEGgMGogCEEEaiAKQQJ2QQNxQTRBCSACIARqIgQgDSAEa0GgC0GADUGgFSAIKAKM6gEgCCgCpOsBIA4gBxAcIgJBiH9LDQMgAiAEaiARawsiA0GIf0sNAgJAIBNBAEcgFEEAR3FFIA5BAEpxDQACQAJAIBMgFCAMIAwgFEsbIgJBACACQQBKG2ogC2siAkH8//8fTQRAIAYgAkGBgIAISXIgDkEJSHINAiAFQeABaiAIKAIIIA4QHQwBCyAFQeABaiAIKAIIIA4QHSAFKALkAUEZSyEzIAYNAQsgBSgC4AFBE0shBgsgCSADayEHIAMgEWohBCAIQQA2AqTrASAIKAKE7AEhAgJAIAYEQAJ/IAJBAUYEQCAIKAL86wEMAQsgEyAUQQAgFEEAShtqCyEUIAUgCCgC+OoBIgM2AswCIAgoAoDsASEcIA5FBEAgEyEJDAILIAgoArjpASEiIAgoArTpASEXIAgoArDpASELIAhBATYCjOoBIAhBrNABaiEyIAVB1AFqISZBACECA0AgAkEDRwRAICYgAkECdCIDaiADIDJqKAIANgIAIAJBAWohAgwBCwtBbCEDIAVBqAFqIgIgBCAHEAhBiH9LDQUgBUG8AWogAiAIKAIAEB4gBUHEAWogAiAIKAIIEB4gBUHMAWogAiAIKAIEEB5BCCAOIA5BCE4bIihBACAoQQBKGyElIA5BAWshGiATIAtrIS0gBSgCsAEhAiAFKALYASEGIAUoAtQBIRIgBSgCrAEhBCAFKAK0ASEjIAUoArgBISkgBSgCyAEhGCAFKALQASErIAUoAsABISQgBSgCqAEhCSAFKALEASEhIAUoAswBISogBSgCvAEhMCAzRSEVQQAhEANAIBIhESAQICVGBEAgBSAqNgLMASAFIDA2ArwBIAUgAjYCsAEgBSAhNgLEASAFIAk2AqgBIAhBmOwBaiEeIAhBiOwFaiEZIAhBiOwBaiEWIBRBIGshGyAzRSEnIBMhCQNAIA4gJUcEQCAFKALAASAFKAK8AUEDdGoiBi0AAiEfIAUoAtABIAUoAswBQQN0aiIELQACIRggBSgCyAEgBSgCxAFBA3RqIgItAAMhKyAELQADISQgBi0AAyEVIAIvAQAhEiAELwEAIREgBi8BACEKIAIoAgQhByAGKAIEIRAgBCgCBCEMAkAgAi0AAiINQQJPBEACQCAnIA1BGUlyRQRAIAcgBSgCqAEiDyAFKAKsASICdEEFIA1rdkEFdGohBwJAIAIgDWpBBWsiAkEhTwRAIAVBsBo2ArABDAELIAUoArABIgYgBSgCuAFPBEAgBSACQQdxIgQ2AqwBIAUgBiACQQN2ayICNgKwASAFIAIoAAAiDzYCqAEgBCECDAELIAYgBSgCtAEiBEYNACAFIAIgBiAEayACQQN2IgIgBiACayAESRsiBEEDdGsiAjYCrAEgBSAGIARrIgQ2ArABIAUgBCgAACIPNgKoAQsgBSACQQVqIgY2AqwBIAcgDyACdEEbdmohDQwBCyAFIAUoAqwBIgIgDWoiBjYCrAEgBSgCqAEgAnRBACANa3YgB2ohDSAGQSFPBEAgBUGwGjYCsAEMAQsgBSgCsAEiByAFKAK4AU8EQCAFIAZBB3EiAjYCrAEgBSAHIAZBA3ZrIgQ2ArABIAUgBCgAADYCqAEgAiEGDAELIAcgBSgCtAEiBEYNACAFIAYgByAEayAGQQN2IgIgByACayAESRsiAkEDdGsiBjYCrAEgBSAHIAJrIgI2ArABIAUgAigAADYCqAELIAUpAtQBITogBSANNgLUASAFIDo3AtgBDAELIBBFIQQgDUUEQCAmIBBBAEdBAnRqKAIAIQIgBSAmIARBAnRqKAIAIg02AtQBIAUgAjYC2AEgBSgCrAEhBgwBCyAFIAUoAqwBIgJBAWoiBjYCrAECQAJAIAQgB2ogBSgCqAEgAnRBH3ZqIgRBA0YEQCAFKALUAUEBayICQX8gAhshDQwBCyAmIARBAnRqKAIAIgJBfyACGyENIARBAUYNAQsgBSAFKALYATYC3AELIAUgBSgC1AE2AtgBIAUgDTYC1AELIBggH2ohBAJAIBhFBEAgBiECDAELIAUgBiAYaiICNgKsASAFKAKoASAGdEEAIBhrdiAMaiEMCwJAIARBFEkNACACQSFPBEAgBUGwGjYCsAEMAQsgBSgCsAEiBiAFKAK4AU8EQCAFIAJBB3EiBDYCrAEgBSAGIAJBA3ZrIgI2ArABIAUgAigAADYCqAEgBCECDAELIAYgBSgCtAEiBEYNACAFIAIgBiAEayACQQN2IgIgBiACayAESRsiBEEDdGsiAjYCrAEgBSAGIARrIgQ2ArABIAUgBCgAADYCqAELAkAgH0UEQCACIQQMAQsgBSACIB9qIgQ2AqwBIAUoAqgBIAJ0QQAgH2t2IBBqIRALAkAgBEEhTwRAQbAaIQIgBUGwGjYCsAEMAQsgBSgCsAEiAiAFKAK4AU8EQCAFIARBB3EiBjYCrAEgBSACIARBA3ZrIgI2ArABIAUgAigAADYCqAEgBiEEDAELIAIgBSgCtAEiB0YNACAFIAIgAiAHayAEQQN2IgYgAiAGayAHSRsiBmsiAjYCsAEgBSAEIAZBA3RrIgQ2AqwBIAUgAigAADYCqAELAkAgGiAlRg0AIAUgFUECdEGwGWooAgAgBSgCqAEiB0EAIAQgFWoiBGt2cSAKajYCvAEgBSAkQQJ0QbAZaigCACAHQQAgBCAkaiIEa3ZxIBFqNgLMAQJAIARBIU8EQEGwGiECIAVBsBo2ArABDAELIAUoArgBIAJNBEAgBSAEQQdxIgY2AqwBIAUgAiAEQQN2ayICNgKwASAFIAIoAAAiBzYCqAEgBiEEDAELIAIgBSgCtAEiCkYNACAFIAIgAiAKayAEQQN2IgYgAiAGayAKSRsiBmsiAjYCsAEgBSAEIAZBA3RrIgQ2AqwBIAUgAigAACIHNgKoAQsgBSAEICtqIgQ2AqwBIAUgK0ECdEGwGWooAgAgB0EAIARrdnEgEmo2AsQBIARBIU8EQCAFQbAaNgKwAQwBCyAFKAK4ASACTQRAIAUgBEEHcTYCrAEgBSACIARBA3ZrIgI2ArABIAUgAigAADYCqAEMAQsgAiAFKAK0ASIGRg0AIAUgBCACIAZrIARBA3YiBCACIARrIAZJGyIEQQN0azYCrAEgBSACIARrIgI2ArABIAUgAigAADYCqAELAkACQCAIKAKE7AFBAkYEQCAFKALMAiIHIAVB4AFqICVBB3FBDGxqIhUoAgAiAmoiCiAIKAKA7AEiBEsEQCAEIAdHBEAgBCAHayIEIBQgCWtLDQsgCSAHIAQQHyAVIAIgBGsiAjYCACAEIAlqIQkLIAUgFjYCzAIgCEEANgKE7AECQAJAAkAgAkGAgARKDQAgCSAVKAIEIhIgAmoiBmogG0sNACAGQSBqIBQgCWtNDQELIAUgFSgCCDYCgAEgBSAVKQIANwN4IAkgFCAFQfgAaiAFQcwCaiAZIAsgFyAiECAhBgwBCyACIBZqIQcgAiAJaiEEIBUoAgghESAWKQAAITogCSAWKQAINwAIIAkgOjcAAAJAIAJBEUkNACAeKQAAITogCSAeKQAINwAYIAkgOjcAECACQRBrQRFIDQAgCUEgaiECIB4hDwNAIA8pABAhOiACIA8pABg3AAggAiA6NwAAIA8pACAhOiACIA8pACg3ABggAiA6NwAQIA9BIGohDyACQSBqIgIgBEkNAAsLIAQgEWshAiAFIAc2AswCIAQgC2sgEUkEQCARIAQgF2tLDQ8gIiAiIAIgC2siCmoiByASak8EQCASRQ0CIAQgByAS/AoAAAwCC0EAIAprIgIEQCAEIAcgAvwKAAALIAogEmohEiAEIAprIQQgCyECCyARQRBPBEAgAikAACE6IAQgAikACDcACCAEIDo3AAAgEkERSA0BIAQgEmohByAEQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAELAkAgEUEHTQRAIAQgAi0AADoAACAEIAItAAE6AAEgBCACLQACOgACIAQgAi0AAzoAAyAEIAIgEUECdCIHQeAaaigCAGoiAigAADYABCACIAdBgBtqKAIAayECDAELIAQgAikAADcAAAsgEkEJSQ0AIAQgEmohCiAEQQhqIgcgAkEIaiICa0EPTARAA0AgByACKQAANwAAIAJBCGohAiAHQQhqIgcgCkkNAAwCCwALIAIpAAAhOiAHIAIpAAg3AAggByA6NwAAIBJBGUgNACAEQRhqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIApJDQALCyAGQYh/SwRAIAYhAwwOCyAVIA02AgggFSAMNgIEIBUgEDYCACAZIRwMAwsgCkEgayEEAkACQCAKIBxLDQAgCSAVKAIEIhEgAmoiBmogBEsNACAGQSBqIBQgCWtNDQELIAUgFSgCCDYCkAEgBSAVKQIANwOIASAJIBQgBCAFQYgBaiAFQcwCaiAcIAsgFyAiECEhBgwCCyACIAlqIQQgFSgCCCEPIAcpAAAhOiAJIAcpAAg3AAggCSA6NwAAAkAgAkERSQ0AIAcpABAhOiAJIAcpABg3ABggCSA6NwAQIAJBEGtBEUgNACAHQRBqIQIgCUEgaiEHA0AgAikAECE6IAcgAikAGDcACCAHIDo3AAAgAikAICE6IAcgAikAKDcAGCAHIDo3ABAgAkEgaiECIAdBIGoiByAESQ0ACwsgBCAPayECIAUgCjYCzAIgBCALayAPSQRAIA8gBCAXa0sNDSAiICIgAiALayIKaiIHIBFqTwRAIBFFDQMgBCAHIBH8CgAADAMLQQAgCmsiAgRAIAQgByAC/AoAAAsgCiARaiERIAQgCmshBCALIQILIA9BEE8EQCACKQAAITogBCACKQAINwAIIAQgOjcAACARQRFIDQIgBCARaiEHIARBEGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgB0kNAAsMAgsCQCAPQQdNBEAgBCACLQAAOgAAIAQgAi0AAToAASAEIAItAAI6AAIgBCACLQADOgADIAQgAiAPQQJ0IgdB4BpqKAIAaiICKAAANgAEIAIgB0GAG2ooAgBrIQIMAQsgBCACKQAANwAACyARQQlJDQEgBCARaiEKIARBCGoiByACQQhqIgJrQQ9MBEADQCAHIAIpAAA3AAAgAkEIaiECIAdBCGoiByAKSQ0ADAMLAAsgAikAACE6IAcgAikACDcACCAHIDo3AAAgEUEZSA0BIARBGGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgCkkNAAsMAQsCQAJAIAUoAswCIhEgBUHgAWogJUEHcUEMbGoiDygCACICaiIHIBxLDQAgCSAPKAIEIgogAmoiBmogG0sNACAGQSBqIBQgCWtNDQELIAUgDygCCDYCoAEgBSAPKQIANwOYASAJIBQgBUGYAWogBUHMAmogHCALIBcgIhAgIQYMAQsgAiAJaiEEIA8oAgghFSARKQAAITogCSARKQAINwAIIAkgOjcAAAJAIAJBEUkNACARKQAQITogCSARKQAYNwAYIAkgOjcAECACQRBrQRFIDQAgEUEQaiECIAlBIGohEgNAIAIpABAhOiASIAIpABg3AAggEiA6NwAAIAIpACAhOiASIAIpACg3ABggEiA6NwAQIAJBIGohAiASQSBqIhIgBEkNAAsLIAQgFWshAiAFIAc2AswCIAQgC2sgFUkEQCAVIAQgF2tLDQwgIiAiIAIgC2siD2oiByAKak8EQCAKRQ0CIAQgByAK/AoAAAwCC0EAIA9rIgIEQCAEIAcgAvwKAAALIAogD2ohCiAEIA9rIQQgCyECCyAVQRBPBEAgAikAACE6IAQgAikACDcACCAEIDo3AAAgCkERSA0BIAQgCmohByAEQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAELAkAgFUEHTQRAIAQgAi0AADoAACAEIAItAAE6AAEgBCACLQACOgACIAQgAi0AAzoAAyAEIAIgFUECdCIHQeAaaigCAGoiAigAADYABCACIAdBgBtqKAIAayECDAELIAQgAikAADcAAAsgCkEJSQ0AIAQgCmohDyAEQQhqIgcgAkEIaiICa0EPTARAA0AgByACKQAANwAAIAJBCGohAiAHQQhqIgcgD0kNAAwCCwALIAIpAAAhOiAHIAIpAAg3AAggByA6NwAAIApBGUgNACAEQRhqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIA9JDQALCyAGQYh/SwRAIAYhAwwLCyAFQeABaiAlQQdxQQxsaiICIA02AgggAiAMNgIEIAIgEDYCAAsgBiAJaiEJICVBAWohJSAQIC1qIAxqIS0MAQsLIAUoArABIAUoArQBRw0HIAUoAqwBQSBHDQcgDiAoayEQA0ACQCAOIBBMBEBBACECA0AgAkEDRg0CIDIgAkECdCIDaiADICZqKAIANgIAIAJBAWohAgwACwALIAVB4AFqIBBBB3FBDGxqIQoCfwJAIAgoAoTsAUECRgRAIAUoAswCIg8gCigCACIEaiIHIAgoAoDsASICSwRAIAIgD0cEQCACIA9rIgIgFCAJa0sNCyAJIA8gAhAfIAogBCACayIENgIAIAIgCWohCQsgBSAWNgLMAiAIQQA2AoTsAQJAAkACQCAEQYCABEoNACAJIAooAgQiDSAEaiIGaiAbSw0AIAZBIGogFCAJa00NAQsgBSAKKAIINgJQIAUgCikCADcDSCAJIBQgBUHIAGogBUHMAmogGSALIBcgIhAgIQYMAQsgBCAWaiEHIAQgCWohDCAKKAIIIQogFikAACE6IAkgFikACDcACCAJIDo3AAACQCAEQRFJDQAgHikAACE6IAkgHikACDcAGCAJIDo3ABAgBEEQa0ERSA0AIAlBIGohAiAeIQQDQCAEKQAQITogAiAEKQAYNwAIIAIgOjcAACAEKQAgITogAiAEKQAoNwAYIAIgOjcAECAEQSBqIQQgAkEgaiICIAxJDQALCyAMIAprIQIgBSAHNgLMAiAMIAtrIApJBEAgCiAMIBdrSw0PICIgIiACIAtrIgdqIgQgDWpPBEAgDUUNAiAMIAQgDfwKAAAMAgtBACAHayICBEAgDCAEIAL8CgAACyAHIA1qIQ0gDCAHayEMIAshAgsgCkEQTwRAIAIpAAAhOiAMIAIpAAg3AAggDCA6NwAAIA1BEUgNASAMIA1qIQcgDEEQaiEEA0AgAikAECE6IAQgAikAGDcACCAEIDo3AAAgAikAICE6IAQgAikAKDcAGCAEIDo3ABAgAkEgaiECIARBIGoiBCAHSQ0ACwwBCwJAIApBB00EQCAMIAItAAA6AAAgDCACLQABOgABIAwgAi0AAjoAAiAMIAItAAM6AAMgDCACIApBAnQiBEHgGmooAgBqIgIoAAA2AAQgAiAEQYAbaigCAGshAgwBCyAMIAIpAAA3AAALIA1BCUkNACAMIA1qIQcgDEEIaiIEIAJBCGoiAmtBD0wEQANAIAQgAikAADcAACACQQhqIQIgBEEIaiIEIAdJDQAMAgsACyACKQAAITogBCACKQAINwAIIAQgOjcAACANQRlIDQAgDEEYaiEEA0AgAikAECE6IAQgAikAGDcACCAEIDo3AAAgAikAICE6IAQgAikAKDcAGCAEIDo3ABAgAkEgaiECIARBIGoiBCAHSQ0ACwsgBkGJf08EQCAGIQMMDgsgGSEcIAYgCWoMAwsgB0EgayECAkACQCAHIBxLDQAgCSAKKAIEIhIgBGoiDGogAksNACAMQSBqIBQgCWtNDQELIAUgCigCCDYCYCAFIAopAgA3A1ggCSAUIAIgBUHYAGogBUHMAmogHCALIBcgIhAhIQwMAgsgBCAJaiEGIAooAgghCiAPKQAAITogCSAPKQAINwAIIAkgOjcAAAJAIARBEUkNACAPKQAQITogCSAPKQAYNwAYIAkgOjcAECAEQRBrQRFIDQAgD0EQaiECIAlBIGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgBkkNAAsLIAYgCmshAiAFIAc2AswCIAYgC2sgCkkEQCAKIAYgF2tLDQ0gIiAiIAIgC2siB2oiBCASak8EQCASRQ0DIAYgBCAS/AoAAAwDC0EAIAdrIgIEQCAGIAQgAvwKAAALIAcgEmohEiAGIAdrIQYgCyECCyAKQRBPBEAgAikAACE6IAYgAikACDcACCAGIDo3AAAgEkERSA0CIAYgEmohByAGQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAILAkAgCkEHTQRAIAYgAi0AADoAACAGIAItAAE6AAEgBiACLQACOgACIAYgAi0AAzoAAyAGIAIgCkECdCIEQeAaaigCAGoiAigAADYABCACIARBgBtqKAIAayECDAELIAYgAikAADcAAAsgEkEJSQ0BIAYgEmohByAGQQhqIgQgAkEIaiICa0EPTARAA0AgBCACKQAANwAAIAJBCGohAiAE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", fi = new za();
class Xa extends MA {
  decodeBlock(I) {
    const A = this.parameters.LercParameters[Xi.AddCompression];
    switch (A) {
      case Sg.None:
        break;
      case Sg.Deflate:
        I = li(new Uint8Array(I)).buffer;
        break;
      case Sg.Zstandard:
        I = fi.decode(new Uint8Array(I)).buffer;
        break;
      default:
        throw new Error(`Unsupported LERC additional compression method identifier: ${A}`);
    }
    return _a(I, { returnPixelInterleavedDims: this.parameters.planarConfiguration === 1 }).pixels[0].buffer;
  }
}
const $a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xa,
  zstd: fi
}, Symbol.toStringTag, { value: "Module" }));
let aI, _, zA, wA;
const Be = {
  env: {
    emscripten_notify_memory_growth: (g) => {
      zA = new Uint8Array(_.exports.memory.buffer), wA = new DataView(zA.buffer);
    }
  }
};
class As {
  init() {
    return aI || (typeof fetch < "u" ? aI = fetch(`data:application/wasm;base64,${rB}`).then((I) => I.arrayBuffer()).then((I) => WebAssembly.instantiate(I, Be)).then(this._init) : aI = WebAssembly.instantiate(Buffer.from(rB, "base64"), Be).then(this._init), aI);
  }
  _init(I) {
    _ = I.instance, Be.env.emscripten_notify_memory_growth(0);
  }
  decode(I, A = 0) {
    if (!_) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const e = I.byteLength, t = _.exports.malloc(e);
    if (zA.set(I, t), A === 0 && (A = Number(_.exports.ZSTD_findDecompressedSize(t, e))), A === -1) {
      _.exports.free(t);
      const o = [];
      for (const E of this.decodeStreaming([I]))
        o.push(E);
      if (o.length === 1)
        return o[0];
      const r = o.reduce((E, a) => E + a.byteLength, 0), Q = new Uint8Array(r);
      let s = 0;
      for (const E of o)
        Q.set(E, s), s += E.byteLength;
      return Q;
    }
    const B = _.exports.malloc(A), C = _.exports.ZSTD_decompress(B, A, t, e), i = zA.slice(B, B + C);
    return _.exports.free(t), _.exports.free(B), i;
  }
  *decodeStreaming(I) {
    if (!_) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const A = _.exports.ZSTD_DStreamInSize(), e = _.exports.malloc(A), t = _.exports.ZSTD_DStreamOutSize(), B = _.exports.malloc(t), C = _.exports.ZSTD_createDCtx(), i = 4, o = 4, r = _.exports.malloc(i + o * 2), Q = _.exports.malloc(i + o * 2);
    let s = 0;
    for (const E of I) {
      const a = _.exports.malloc(E.byteLength);
      for (zA.set(E, a), wA.setInt32(r, a, !0), wA.setInt32(r + i, E.byteLength, !0), wA.setInt32(r + i + o, 0, !0); wA.getUint32(r + i + o, !0) < wA.getUint32(r + i, !0); ) {
        wA.setInt32(Q, B, !0), wA.setInt32(Q + i, t, !0), wA.setInt32(Q + i + o, 0, !0), s = _.exports.ZSTD_decompressStream(C, Q, r);
        const n = wA.getUint32(Q + i + o, !0);
        yield zA.slice(B, B + n);
      }
      _.exports.free(a);
    }
    if (_.exports.ZSTD_freeDCtx(C), _.exports.free(e), _.exports.free(B), _.exports.free(r), _.exports.free(Q), s !== 0)
      throw new Error("Incomplete stream, more data expected.");
  }
}
const rB = "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QQhyIQBBACEDA0AgACADTQ0DIANBQGshAwwACwALQWwhCiAOIA5B/ABqIA5B+ABqIAUgBhAGIgJBiH9LDQEgDigCeCIDIARLDQEgACAOIA4oAnwgByAIIAMgDRAlIAEgADYCACACIQoMAQtBbCEKCyAOQYABaiQAIAoLcAEEfyAAQgA3AgAgAgRAIAFBCmohBiABKAIEIQRBACECQQAhAQNAIAEgBHZFBEAgAiAGIAFBA3RqLQAAIgUgAiAFSxshAiABQQFqIQEgAyAFQRZLaiEDDAELCyAAIAI2AgQgACADQQggBGt0NgIACwuuAQEEfyABIAIoAgQiAyABKAIEaiIENgIEIAAgA0ECdEGwGWooAgAgASgCAEEAIARrdnE2AgACQCAEQSFPBEAgAUGwGjYCCAwBCyABKAIIIgMgASgCEE8EQCABEAwMAQsgAyABKAIMIgVGDQAgASADIAMgBWsgBEEDdiIGIAMgBmsgBUkbIgNrIgU2AgggASAEIANBA3RrNgIEIAEgBSgAADYCAAsgACACQQhqNgIEC40CAgN/AX4gACACaiEEAkACQCACQQhOBEAgACABayICQXlIDQELA0AgACAETw0CIAAgAS0AADoAACAAQQFqIQAgAUEBaiEBDAALAAsCQAJAIAJBb0sNACAAIARBIGsiAksNACABKQAAIQYgACABKQAINwAIIAAgBjcAACACIABrIgVBEU4EQCAAQRBqIQAgASEDA0AgAykAECEGIAAgAykAGDcACCAAIAY3AAAgAykAICEGIAAgAykAKDcAGCAAIAY3ABAgA0EgaiEDIABBIGoiACACSQ0ACwsgASAFaiEBDAELIAAhAgsDQCACIARPDQEgAiABLQAAOgAAIAJBAWohAiABQQFqIQEMAAsACwvfAQEGf0G6fyEKAkAgAigCBCIIIAIoAgAiCWoiDSABIABrSw0AQWwhCiAJIAQgAygCACILa0sNACAAIAlqIgQgAigCCCIMayECIAAgAUEgayIBIAsgCUEAEDMgAyAJIAtqNgIAAkACQCAEIAVrIAxPBEAgAiEFDAELIAwgBCAGa0sNAiAHIAcgAiAFayIDaiICIAhqTwRAIAhFDQIgBCACIAj8CgAADAILQQAgA2siAARAIAQgAiAA/AoAAAsgAyAIaiEIIAQgA2shBAsgBCABIAUgCEEBEDML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", yi = new As();
class Is extends MA {
  decodeBlock(I) {
    return yi.decode(new Uint8Array(I)).buffer;
  }
}
const gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Is,
  zstd: yi
}, Symbol.toStringTag, { value: "Module" }));
class es extends MA {
  constructor(I) {
    if (super(I), typeof createImageBitmap > "u")
      throw new Error("Cannot decode WebImage as `createImageBitmap` is not available");
    if (typeof document > "u" && typeof OffscreenCanvas > "u")
      throw new Error("Cannot decode WebImage as neither `document` nor `OffscreenCanvas` is not available");
  }
  async decodeBlock(I) {
    const A = new Blob([I]), e = await createImageBitmap(A);
    let t;
    typeof document < "u" ? (t = document.createElement("canvas"), t.width = e.width, t.height = e.height) : t = new OffscreenCanvas(e.width, e.height);
    const B = t.getContext("2d");
    B.drawImage(e, 0, 0);
    const C = B.getImageData(0, 0, e.width, e.height).data, i = this.parameters.samplesPerPixel || 4;
    if (i === 4)
      return C.buffer;
    if (i === 3) {
      const o = new Uint8ClampedArray(e.width * e.height * 3);
      for (let r = 0, Q = 0; r < o.length; r += 3, Q += 4)
        o[r] = C[Q], o[r + 1] = C[Q + 1], o[r + 2] = C[Q + 2];
      return o.buffer;
    } else
      throw new Error(`Unsupported SamplesPerPixel value: ${i}`);
  }
}
const ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: es
}, Symbol.toStringTag, { value: "Module" }));
export {
  fE as enableGeoTIFFTileSource
};
//# sourceMappingURL=geotiff-tilesource.mjs.map
