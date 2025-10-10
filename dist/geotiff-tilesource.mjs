var tB = Object.defineProperty;
var oB = (g, I, A) => I in g ? tB(g, I, { enumerable: !0, configurable: !0, writable: !0, value: A }) : g[I] = A;
var z = (g, I, A) => oB(g, typeof I != "symbol" ? I + "" : I, A);
const ug = new ArrayBuffer(4), sB = new Float32Array(ug), rB = new Uint32Array(ug), BA = new Uint32Array(512), CA = new Uint32Array(512);
for (let g = 0; g < 256; ++g) {
  const I = g - 127;
  I < -27 ? (BA[g] = 0, BA[g | 256] = 32768, CA[g] = 24, CA[g | 256] = 24) : I < -14 ? (BA[g] = 1024 >> -I - 14, BA[g | 256] = 1024 >> -I - 14 | 32768, CA[g] = -I - 1, CA[g | 256] = -I - 1) : I <= 15 ? (BA[g] = I + 15 << 10, BA[g | 256] = I + 15 << 10 | 32768, CA[g] = 13, CA[g | 256] = 13) : I < 128 ? (BA[g] = 31744, BA[g | 256] = 64512, CA[g] = 24, CA[g | 256] = 24) : (BA[g] = 31744, BA[g | 256] = 64512, CA[g] = 13, CA[g | 256] = 13);
}
const zA = new Uint32Array(2048), lA = new Uint32Array(64), WA = new Uint32Array(64);
zA[0] = 0;
for (let g = 1; g < 1024; ++g) {
  let I = g << 13, A = 0;
  for (; !(I & 8388608); )
    A -= 8388608, I <<= 1;
  I &= -8388609, A += 947912704, zA[g] = I | A;
}
for (let g = 1024; g < 2048; ++g)
  zA[g] = 939524096 + (g - 1024 << 13);
lA[0] = 0;
for (let g = 1; g < 31; ++g)
  lA[g] = g << 23;
lA[31] = 1199570944;
lA[32] = 2147483648;
for (let g = 33; g < 63; ++g)
  lA[g] = 2147483648 + (g - 32 << 23);
lA[63] = 3347054592;
WA[0] = 0;
for (let g = 1; g < 64; ++g)
  g === 32 ? WA[g] = 0 : WA[g] = 1024;
function aB(g) {
  const I = g >> 10;
  return rB[0] = zA[WA[I] + (g & 1023)] + lA[I], sB[0];
}
const nB = Reflect.getPrototypeOf(Uint8Array).prototype, hB = Reflect.getOwnPropertyDescriptor(nB, Symbol.toStringTag).get;
function DB(g) {
  return hB.call(g) !== void 0;
}
const cB = Object.prototype.toString;
function wB(g) {
  return !(!ArrayBuffer.isView(g) || DB(g) || cB.call(g) !== "[object DataView]");
}
function kg(g, I, ...A) {
  if (!wB(g))
    throw new TypeError("First argument to getFloat16 function must be a DataView");
  return aB(g.getUint16(I, ...A));
}
function uI(g) {
  return g && g.__esModule && Object.prototype.hasOwnProperty.call(g, "default") ? g.default : g;
}
var kI = { exports: {} };
function Rg(g, I, A) {
  const B = A && A.debug || !1;
  B && console.log("[xml-utils] getting " + I + " in " + g);
  const i = typeof g == "object" ? g.outer : g, Q = i.slice(0, i.indexOf(">") + 1), t = ['"', "'"];
  for (let E = 0; E < t.length; E++) {
    const D = t[E], e = I + "\\=" + D + "([^" + D + "]*)" + D;
    B && console.log("[xml-utils] pattern:", e);
    const o = new RegExp(e).exec(Q);
    if (B && console.log("[xml-utils] match:", o), o) return o[1];
  }
}
kI.exports = Rg;
kI.exports.default = Rg;
var lB = kI.exports;
const gI = /* @__PURE__ */ uI(lB);
var RI = { exports: {} }, LI = { exports: {} }, UI = { exports: {} };
function Lg(g, I, A) {
  const i = new RegExp(I).exec(g.slice(A));
  return i ? A + i.index : -1;
}
UI.exports = Lg;
UI.exports.default = Lg;
var fB = UI.exports, YI = { exports: {} };
function Ug(g, I, A) {
  const i = new RegExp(I).exec(g.slice(A));
  return i ? A + i.index + i[0].length - 1 : -1;
}
YI.exports = Ug;
YI.exports.default = Ug;
var yB = YI.exports, MI = { exports: {} };
function Yg(g, I) {
  const A = new RegExp(I, "g"), B = g.match(A);
  return B ? B.length : 0;
}
MI.exports = Yg;
MI.exports.default = Yg;
var SB = MI.exports;
const GB = fB, BI = yB, qI = SB;
function Mg(g, I, A) {
  const B = A && A.debug || !1, i = !(A && typeof A.nested === !1), Q = A && A.startIndex || 0;
  B && console.log("[xml-utils] starting findTagByName with", I, " and ", A);
  const t = GB(g, `<${I}[ 
>/]`, Q);
  if (B && console.log("[xml-utils] start:", t), t === -1) return;
  const E = g.slice(t + I.length);
  let D = BI(E, "^[^<]*[ /]>", 0);
  const e = D !== -1 && E[D - 1] === "/";
  if (B && console.log("[xml-utils] selfClosing:", e), e === !1)
    if (i) {
      let s = 0, r = 1, c = 0;
      for (; (D = BI(E, "[ /]" + I + ">", s)) !== -1; ) {
        const n = E.substring(s, D + 1);
        if (r += qI(n, "<" + I + `[ 
	>]`), c += qI(n, "</" + I + ">"), c >= r) break;
        s = D;
      }
    } else
      D = BI(E, "[ /]" + I + ">", 0);
  const C = t + I.length + D + 1;
  if (B && console.log("[xml-utils] end:", C), C === -1) return;
  const o = g.slice(t, C);
  let a;
  return e ? a = null : a = o.slice(o.indexOf(">") + 1, o.lastIndexOf("<")), { inner: a, outer: o, start: t, end: C };
}
LI.exports = Mg;
LI.exports.default = Mg;
var dB = LI.exports;
const FB = dB;
function Kg(g, I, A) {
  const B = [], i = A && A.debug || !1, Q = A && typeof A.nested == "boolean" ? A.nested : !0;
  let t = A && A.startIndex || 0, E;
  for (; E = FB(g, I, { debug: i, startIndex: t }); )
    Q ? t = E.start + 1 + I.length : t = E.end, B.push(E);
  return i && console.log("findTagsByName found", B.length, "tags"), B;
}
RI.exports = Kg;
RI.exports.default = Kg;
var NB = RI.exports;
const uB = /* @__PURE__ */ uI(NB), cA = {
  // TIFF Baseline
  315: "Artist",
  258: "BitsPerSample",
  265: "CellLength",
  264: "CellWidth",
  320: "ColorMap",
  259: "Compression",
  33432: "Copyright",
  306: "DateTime",
  338: "ExtraSamples",
  266: "FillOrder",
  289: "FreeByteCounts",
  288: "FreeOffsets",
  291: "GrayResponseCurve",
  290: "GrayResponseUnit",
  316: "HostComputer",
  270: "ImageDescription",
  257: "ImageLength",
  256: "ImageWidth",
  271: "Make",
  281: "MaxSampleValue",
  280: "MinSampleValue",
  272: "Model",
  254: "NewSubfileType",
  274: "Orientation",
  262: "PhotometricInterpretation",
  284: "PlanarConfiguration",
  296: "ResolutionUnit",
  278: "RowsPerStrip",
  277: "SamplesPerPixel",
  305: "Software",
  279: "StripByteCounts",
  273: "StripOffsets",
  255: "SubfileType",
  263: "Threshholding",
  282: "XResolution",
  283: "YResolution",
  // TIFF Extended
  326: "BadFaxLines",
  327: "CleanFaxData",
  343: "ClipPath",
  328: "ConsecutiveBadFaxLines",
  433: "Decode",
  434: "DefaultImageColor",
  269: "DocumentName",
  336: "DotRange",
  321: "HalftoneHints",
  346: "Indexed",
  347: "JPEGTables",
  285: "PageName",
  297: "PageNumber",
  317: "Predictor",
  319: "PrimaryChromaticities",
  532: "ReferenceBlackWhite",
  339: "SampleFormat",
  340: "SMinSampleValue",
  341: "SMaxSampleValue",
  559: "StripRowCounts",
  330: "SubIFDs",
  292: "T4Options",
  293: "T6Options",
  325: "TileByteCounts",
  323: "TileLength",
  324: "TileOffsets",
  322: "TileWidth",
  301: "TransferFunction",
  318: "WhitePoint",
  344: "XClipPathUnits",
  286: "XPosition",
  529: "YCbCrCoefficients",
  531: "YCbCrPositioning",
  530: "YCbCrSubSampling",
  345: "YClipPathUnits",
  287: "YPosition",
  // EXIF
  37378: "ApertureValue",
  40961: "ColorSpace",
  36868: "DateTimeDigitized",
  36867: "DateTimeOriginal",
  34665: "Exif IFD",
  36864: "ExifVersion",
  33434: "ExposureTime",
  41728: "FileSource",
  37385: "Flash",
  40960: "FlashpixVersion",
  33437: "FNumber",
  42016: "ImageUniqueID",
  37384: "LightSource",
  37500: "MakerNote",
  37377: "ShutterSpeedValue",
  37510: "UserComment",
  // IPTC
  33723: "IPTC",
  // Laser Scanning Microscopy
  34412: "CZ_LSMINFO",
  // ICC
  34675: "ICC Profile",
  // XMP
  700: "XMP",
  // GDAL
  42112: "GDAL_METADATA",
  42113: "GDAL_NODATA",
  // Photoshop
  34377: "Photoshop",
  // GeoTiff
  33550: "ModelPixelScale",
  33922: "ModelTiepoint",
  34264: "ModelTransformation",
  34735: "GeoKeyDirectory",
  34736: "GeoDoubleParams",
  34737: "GeoAsciiParams",
  // LERC
  50674: "LercParameters"
}, eA = {};
for (const g in cA)
  cA.hasOwnProperty(g) && (eA[cA[g]] = parseInt(g, 10));
const kB = [
  eA.BitsPerSample,
  eA.ExtraSamples,
  eA.SampleFormat,
  eA.StripByteCounts,
  eA.StripOffsets,
  eA.StripRowCounts,
  eA.TileByteCounts,
  eA.TileOffsets,
  eA.SubIFDs
], VA = {
  1: "BYTE",
  2: "ASCII",
  3: "SHORT",
  4: "LONG",
  5: "RATIONAL",
  6: "SBYTE",
  7: "UNDEFINED",
  8: "SSHORT",
  9: "SLONG",
  10: "SRATIONAL",
  11: "FLOAT",
  12: "DOUBLE",
  // IFD offset, suggested by https://owl.phy.queensu.ca/~phil/exiftool/standards.html
  13: "IFD",
  // introduced by BigTIFF
  16: "LONG8",
  17: "SLONG8",
  18: "IFD8"
}, q = {};
for (const g in VA)
  VA.hasOwnProperty(g) && (q[VA[g]] = parseInt(g, 10));
const W = {
  WhiteIsZero: 0,
  BlackIsZero: 1,
  RGB: 2,
  Palette: 3,
  TransparencyMask: 4,
  CMYK: 5,
  YCbCr: 6,
  CIELab: 8
}, RB = {
  Unspecified: 0
}, LB = {
  AddCompression: 1
}, CI = {
  None: 0,
  Deflate: 1,
  Zstandard: 2
}, RA = {
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
}, UB = {};
for (const g in RA)
  RA.hasOwnProperty(g) && (UB[RA[g]] = parseInt(g, 10));
function YB(g, I) {
  const { width: A, height: B } = g, i = new Uint8Array(A * B * 3);
  let Q;
  for (let t = 0, E = 0; t < g.length; ++t, E += 3)
    Q = 256 - g[t] / I * 256, i[E] = Q, i[E + 1] = Q, i[E + 2] = Q;
  return i;
}
function MB(g, I) {
  const { width: A, height: B } = g, i = new Uint8Array(A * B * 3);
  let Q;
  for (let t = 0, E = 0; t < g.length; ++t, E += 3)
    Q = g[t] / I * 256, i[E] = Q, i[E + 1] = Q, i[E + 2] = Q;
  return i;
}
function KB(g, I) {
  const { width: A, height: B } = g, i = new Uint8Array(A * B * 3), Q = I.length / 3, t = I.length / 3 * 2;
  for (let E = 0, D = 0; E < g.length; ++E, D += 3) {
    const e = g[E];
    i[D] = I[e] / 65536 * 256, i[D + 1] = I[e + Q] / 65536 * 256, i[D + 2] = I[e + t] / 65536 * 256;
  }
  return i;
}
function JB(g) {
  const { width: I, height: A } = g, B = new Uint8Array(I * A * 3);
  for (let i = 0, Q = 0; i < g.length; i += 4, Q += 3) {
    const t = g[i], E = g[i + 1], D = g[i + 2], e = g[i + 3];
    B[Q] = 255 * ((255 - t) / 256) * ((255 - e) / 256), B[Q + 1] = 255 * ((255 - E) / 256) * ((255 - e) / 256), B[Q + 2] = 255 * ((255 - D) / 256) * ((255 - e) / 256);
  }
  return B;
}
function HB(g) {
  const { width: I, height: A } = g, B = new Uint8ClampedArray(I * A * 3);
  for (let i = 0, Q = 0; i < g.length; i += 3, Q += 3) {
    const t = g[i], E = g[i + 1], D = g[i + 2];
    B[Q] = t + 1.402 * (D - 128), B[Q + 1] = t - 0.34414 * (E - 128) - 0.71414 * (D - 128), B[Q + 2] = t + 1.772 * (E - 128);
  }
  return B;
}
const mB = 0.95047, pB = 1, xB = 1.08883;
function bB(g) {
  const { width: I, height: A } = g, B = new Uint8Array(I * A * 3);
  for (let i = 0, Q = 0; i < g.length; i += 3, Q += 3) {
    const t = g[i + 0], E = g[i + 1] << 24 >> 24, D = g[i + 2] << 24 >> 24;
    let e = (t + 16) / 116, C = E / 500 + e, o = e - D / 200, a, s, r;
    C = mB * (C * C * C > 8856e-6 ? C * C * C : (C - 16 / 116) / 7.787), e = pB * (e * e * e > 8856e-6 ? e * e * e : (e - 16 / 116) / 7.787), o = xB * (o * o * o > 8856e-6 ? o * o * o : (o - 16 / 116) / 7.787), a = C * 3.2406 + e * -1.5372 + o * -0.4986, s = C * -0.9689 + e * 1.8758 + o * 0.0415, r = C * 0.0557 + e * -0.204 + o * 1.057, a = a > 31308e-7 ? 1.055 * a ** (1 / 2.4) - 0.055 : 12.92 * a, s = s > 31308e-7 ? 1.055 * s ** (1 / 2.4) - 0.055 : 12.92 * s, r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : 12.92 * r, B[Q] = Math.max(0, Math.min(1, a)) * 255, B[Q + 1] = Math.max(0, Math.min(1, s)) * 255, B[Q + 2] = Math.max(0, Math.min(1, r)) * 255;
  }
  return B;
}
const Jg = /* @__PURE__ */ new Map(), Hg = /* @__PURE__ */ new Map();
function sA(g, I, A = !0) {
  Array.isArray(g) || (g = [g]), g.forEach((B) => {
    Jg.set(B, I), Hg.set(B, A);
  });
}
async function mg(g) {
  const I = Jg.get(g.Compression);
  if (!I)
    throw new Error(`Unknown compression method identifier: ${g.Compression}`);
  const A = await I();
  return new A(g);
}
function qB(g) {
  return Hg.get(g.Compression);
}
sA([void 0, 1], () => Promise.resolve().then(() => vC).then((g) => g.default));
sA(5, () => Promise.resolve().then(() => WC).then((g) => g.default));
sA(6, () => {
  throw new Error("old style JPEG compression is not supported.");
});
sA(7, () => Promise.resolve().then(() => AQ).then((g) => g.default));
sA([8, 32946], () => Promise.resolve().then(() => De).then((g) => g.default));
sA(32773, () => Promise.resolve().then(() => we).then((g) => g.default));
sA(
  34887,
  () => Promise.resolve().then(() => Ge).then(async (g) => (await g.zstd.init(), g)).then((g) => g.default)
);
sA(
  5e4,
  () => Promise.resolve().then(() => Ne).then(async (g) => (await g.zstd.init(), g)).then((g) => g.default)
);
sA(50001, () => Promise.resolve().then(() => ke).then((g) => g.default));
function XA(g, I, A, B = 1) {
  return new (Object.getPrototypeOf(g)).constructor(I * A * B);
}
function TB(g, I, A, B, i) {
  const Q = I / B, t = A / i;
  return g.map((E) => {
    const D = XA(E, B, i);
    for (let e = 0; e < i; ++e) {
      const C = Math.min(Math.round(t * e), A - 1);
      for (let o = 0; o < B; ++o) {
        const a = Math.min(Math.round(Q * o), I - 1), s = E[C * I + a];
        D[e * B + o] = s;
      }
    }
    return D;
  });
}
function dA(g, I, A) {
  return (1 - A) * g + A * I;
}
function OB(g, I, A, B, i) {
  const Q = I / B, t = A / i;
  return g.map((E) => {
    const D = XA(E, B, i);
    for (let e = 0; e < i; ++e) {
      const C = t * e, o = Math.floor(C), a = Math.min(Math.ceil(C), A - 1);
      for (let s = 0; s < B; ++s) {
        const r = Q * s, c = r % 1, n = Math.floor(r), h = Math.min(Math.ceil(r), I - 1), l = E[o * I + n], G = E[o * I + h], f = E[a * I + n], d = E[a * I + h], w = dA(
          dA(l, G, c),
          dA(f, d, c),
          C % 1
        );
        D[e * B + s] = w;
      }
    }
    return D;
  });
}
function vB(g, I, A, B, i, Q = "nearest") {
  switch (Q.toLowerCase()) {
    case "nearest":
      return TB(g, I, A, B, i);
    case "bilinear":
    case "linear":
      return OB(g, I, A, B, i);
    default:
      throw new Error(`Unsupported resampling method: '${Q}'`);
  }
}
function jB(g, I, A, B, i, Q) {
  const t = I / B, E = A / i, D = XA(g, B, i, Q);
  for (let e = 0; e < i; ++e) {
    const C = Math.min(Math.round(E * e), A - 1);
    for (let o = 0; o < B; ++o) {
      const a = Math.min(Math.round(t * o), I - 1);
      for (let s = 0; s < Q; ++s) {
        const r = g[C * I * Q + a * Q + s];
        D[e * B * Q + o * Q + s] = r;
      }
    }
  }
  return D;
}
function ZB(g, I, A, B, i, Q) {
  const t = I / B, E = A / i, D = XA(g, B, i, Q);
  for (let e = 0; e < i; ++e) {
    const C = E * e, o = Math.floor(C), a = Math.min(Math.ceil(C), A - 1);
    for (let s = 0; s < B; ++s) {
      const r = t * s, c = r % 1, n = Math.floor(r), h = Math.min(Math.ceil(r), I - 1);
      for (let l = 0; l < Q; ++l) {
        const G = g[o * I * Q + n * Q + l], f = g[o * I * Q + h * Q + l], d = g[a * I * Q + n * Q + l], w = g[a * I * Q + h * Q + l], S = dA(
          dA(G, f, c),
          dA(d, w, c),
          C % 1
        );
        D[e * B * Q + s * Q + l] = S;
      }
    }
  }
  return D;
}
function PB(g, I, A, B, i, Q, t = "nearest") {
  switch (t.toLowerCase()) {
    case "nearest":
      return jB(
        g,
        I,
        A,
        B,
        i,
        Q
      );
    case "bilinear":
    case "linear":
      return ZB(
        g,
        I,
        A,
        B,
        i,
        Q
      );
    default:
      throw new Error(`Unsupported resampling method: '${t}'`);
  }
}
function VB(g, I, A) {
  let B = 0;
  for (let i = I; i < A; ++i)
    B += g[i];
  return B;
}
function lI(g, I, A) {
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
function WB(g, I) {
  return (g === 1 || g === 2) && I <= 32 && I % 8 === 0 ? !1 : !(g === 3 && (I === 16 || I === 32 || I === 64));
}
function _B(g, I, A, B, i, Q, t) {
  const E = new DataView(g), D = A === 2 ? t * Q : t * Q * B, e = A === 2 ? 1 : B, C = lI(I, i, D), o = parseInt("1".repeat(i), 2);
  if (I === 1) {
    let a;
    A === 1 ? a = B * i : a = i;
    let s = Q * a;
    s & 7 && (s = s + 7 & -8);
    for (let r = 0; r < t; ++r) {
      const c = r * s;
      for (let n = 0; n < Q; ++n) {
        const h = c + n * e * i;
        for (let l = 0; l < e; ++l) {
          const G = h + l * i, f = (r * Q + n) * e + l, d = Math.floor(G / 8), w = G % 8;
          if (w + i <= 8)
            C[f] = E.getUint8(d) >> 8 - i - w & o;
          else if (w + i <= 16)
            C[f] = E.getUint16(d) >> 16 - i - w & o;
          else if (w + i <= 24) {
            const S = E.getUint16(d) << 8 | E.getUint8(d + 2);
            C[f] = S >> 24 - i - w & o;
          } else
            C[f] = E.getUint32(d) >> 32 - i - w & o;
        }
      }
    }
  }
  return C.buffer;
}
class zB {
  /**
   * @constructor
   * @param {Object} fileDirectory The parsed file directory
   * @param {Object} geoKeys The parsed geo-keys
   * @param {DataView} dataView The DataView for the underlying file.
   * @param {Boolean} littleEndian Whether the file is encoded in little or big endian
   * @param {Boolean} cache Whether or not decoded tiles shall be cached
   * @param {import('./source/basesource').BaseSource} source The datasource to read from
   */
  constructor(I, A, B, i, Q, t) {
    this.fileDirectory = I, this.geoKeys = A, this.dataView = B, this.littleEndian = i, this.tiles = Q ? {} : null, this.isTiled = !I.StripOffsets;
    const E = I.PlanarConfiguration;
    if (this.planarConfiguration = typeof E > "u" ? 1 : E, this.planarConfiguration !== 1 && this.planarConfiguration !== 2)
      throw new Error("Invalid planar configuration.");
    this.source = t;
  }
  /**
   * Returns the associated parsed file directory.
   * @returns {Object} the parsed file directory
   */
  getFileDirectory() {
    return this.fileDirectory;
  }
  /**
   * Returns the associated parsed geo keys.
   * @returns {Object} the parsed geo keys
   */
  getGeoKeys() {
    return this.geoKeys;
  }
  /**
   * Returns the width of the image.
   * @returns {Number} the width of the image
   */
  getWidth() {
    return this.fileDirectory.ImageWidth;
  }
  /**
   * Returns the height of the image.
   * @returns {Number} the height of the image
   */
  getHeight() {
    return this.fileDirectory.ImageLength;
  }
  /**
   * Returns the number of samples per pixel.
   * @returns {Number} the number of samples per pixel
   */
  getSamplesPerPixel() {
    return typeof this.fileDirectory.SamplesPerPixel < "u" ? this.fileDirectory.SamplesPerPixel : 1;
  }
  /**
   * Returns the width of each tile.
   * @returns {Number} the width of each tile
   */
  getTileWidth() {
    return this.isTiled ? this.fileDirectory.TileWidth : this.getWidth();
  }
  /**
   * Returns the height of each tile.
   * @returns {Number} the height of each tile
   */
  getTileHeight() {
    return this.isTiled ? this.fileDirectory.TileLength : typeof this.fileDirectory.RowsPerStrip < "u" ? Math.min(this.fileDirectory.RowsPerStrip, this.getHeight()) : this.getHeight();
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
    for (let A = 0; A < this.fileDirectory.BitsPerSample.length; ++A)
      I += this.getSampleByteSize(A);
    return I;
  }
  getSampleByteSize(I) {
    if (I >= this.fileDirectory.BitsPerSample.length)
      throw new RangeError(`Sample index ${I} is out of range.`);
    return Math.ceil(this.fileDirectory.BitsPerSample[I] / 8);
  }
  getReaderForSample(I) {
    const A = this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[I] : 1, B = this.fileDirectory.BitsPerSample[I];
    switch (A) {
      case 1:
        if (B <= 8)
          return DataView.prototype.getUint8;
        if (B <= 16)
          return DataView.prototype.getUint16;
        if (B <= 32)
          return DataView.prototype.getUint32;
        break;
      case 2:
        if (B <= 8)
          return DataView.prototype.getInt8;
        if (B <= 16)
          return DataView.prototype.getInt16;
        if (B <= 32)
          return DataView.prototype.getInt32;
        break;
      case 3:
        switch (B) {
          case 16:
            return function(i, Q) {
              return kg(this, i, Q);
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
    return this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[I] : 1;
  }
  getBitsPerSample(I = 0) {
    return this.fileDirectory.BitsPerSample[I];
  }
  getArrayForSample(I, A) {
    const B = this.getSampleFormat(I), i = this.getBitsPerSample(I);
    return lI(B, i, A);
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
  async getTileOrStrip(I, A, B, i, Q) {
    const t = Math.ceil(this.getWidth() / this.getTileWidth()), E = Math.ceil(this.getHeight() / this.getTileHeight());
    let D;
    const { tiles: e } = this;
    this.planarConfiguration === 1 ? D = A * t + I : this.planarConfiguration === 2 && (D = B * t * E + A * t + I);
    let C, o;
    if (this.isTiled ? (C = this.fileDirectory.TileOffsets[D], o = this.fileDirectory.TileByteCounts[D]) : (C = this.fileDirectory.StripOffsets[D], o = this.fileDirectory.StripByteCounts[D]), o === 0) {
      const r = this.getBlockHeight(A) * this.getTileWidth(), c = this.planarConfiguration === 2 ? this.getSampleByteSize(B) : this.getBytesPerPixel(), n = new ArrayBuffer(r * c);
      return this.getArrayForSample(B, n).fill(this.getGDALNoData() || 0), { x: I, y: A, sample: B, data: n };
    }
    const a = (await this.source.fetch([{ offset: C, length: o }], Q))[0];
    let s;
    return e === null || !e[D] ? (s = (async () => {
      let r = await i.decode(this.fileDirectory, a);
      const c = this.getSampleFormat(), n = this.getBitsPerSample();
      return WB(c, n) && (r = _B(
        r,
        c,
        this.planarConfiguration,
        this.getSamplesPerPixel(),
        n,
        this.getTileWidth(),
        this.getBlockHeight(A)
      )), r;
    })(), e !== null && (e[D] = s)) : s = e[D], { x: I, y: A, sample: B, data: await s };
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
  async _readRaster(I, A, B, i, Q, t, E, D, e) {
    const C = this.getTileWidth(), o = this.getTileHeight(), a = this.getWidth(), s = this.getHeight(), r = Math.max(Math.floor(I[0] / C), 0), c = Math.min(
      Math.ceil(I[2] / C),
      Math.ceil(a / C)
    ), n = Math.max(Math.floor(I[1] / o), 0), h = Math.min(
      Math.ceil(I[3] / o),
      Math.ceil(s / o)
    ), l = I[2] - I[0];
    let G = this.getBytesPerPixel();
    const f = [], d = [];
    for (let y = 0; y < A.length; ++y)
      this.planarConfiguration === 1 ? f.push(VB(this.fileDirectory.BitsPerSample, 0, A[y]) / 8) : f.push(0), d.push(this.getReaderForSample(A[y]));
    const w = [], { littleEndian: S } = this;
    for (let y = n; y < h; ++y)
      for (let u = r; u < c; ++u) {
        let k;
        this.planarConfiguration === 1 && (k = this.getTileOrStrip(u, y, 0, Q, e));
        for (let F = 0; F < A.length; ++F) {
          const U = F, L = A[F];
          this.planarConfiguration === 2 && (G = this.getSampleByteSize(L), k = this.getTileOrStrip(u, y, L, Q, e));
          const x = k.then((R) => {
            const N = R.data, Y = new DataView(N), M = this.getBlockHeight(R.y), J = R.y * o, m = R.x * C, H = J + M, O = (R.x + 1) * C, j = d[U], K = Math.min(M, M - (H - I[3]), s - J), b = Math.min(C, C - (O - I[2]), a - m);
            for (let p = Math.max(0, I[1] - J); p < K; ++p)
              for (let T = Math.max(0, I[0] - m); T < b; ++T) {
                const v = (p * C + T) * G, V = j.call(
                  Y,
                  v + f[U],
                  S
                );
                let _;
                i ? (_ = (p + J - I[1]) * l * A.length + (T + m - I[0]) * A.length + U, B[_] = V) : (_ = (p + J - I[1]) * l + T + m - I[0], B[U][_] = V);
              }
          });
          w.push(x);
        }
      }
    if (await Promise.all(w), t && I[2] - I[0] !== t || E && I[3] - I[1] !== E) {
      let y;
      return i ? y = PB(
        B,
        I[2] - I[0],
        I[3] - I[1],
        t,
        E,
        A.length,
        D
      ) : y = vB(
        B,
        I[2] - I[0],
        I[3] - I[1],
        t,
        E,
        D
      ), y.width = t, y.height = E, y;
    }
    return B.width = t || I[2] - I[0], B.height = E || I[3] - I[1], B;
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
    interleave: B,
    pool: i = null,
    width: Q,
    height: t,
    resampleMethod: E,
    fillValue: D,
    signal: e
  } = {}) {
    const C = I || [0, 0, this.getWidth(), this.getHeight()];
    if (C[0] > C[2] || C[1] > C[3])
      throw new Error("Invalid subsets");
    const o = C[2] - C[0], a = C[3] - C[1], s = o * a, r = this.getSamplesPerPixel();
    if (!A || !A.length)
      for (let l = 0; l < r; ++l)
        A.push(l);
    else
      for (let l = 0; l < A.length; ++l)
        if (A[l] >= r)
          return Promise.reject(new RangeError(`Invalid sample index '${A[l]}'.`));
    let c;
    if (B) {
      const l = this.fileDirectory.SampleFormat ? Math.max.apply(null, this.fileDirectory.SampleFormat) : 1, G = Math.max.apply(null, this.fileDirectory.BitsPerSample);
      c = lI(l, G, s * A.length), D && c.fill(D);
    } else {
      c = [];
      for (let l = 0; l < A.length; ++l) {
        const G = this.getArrayForSample(A[l], s);
        Array.isArray(D) && l < D.length ? G.fill(D[l]) : D && !Array.isArray(D) && G.fill(D), c.push(G);
      }
    }
    const n = i || await mg(this.fileDirectory);
    return await this._readRaster(
      C,
      A,
      c,
      B,
      n,
      Q,
      t,
      E,
      e
    );
  }
  /**
   * Reads raster data from the image as RGB. The result is always an
   * interleaved typed array.
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
    pool: B = null,
    width: i,
    height: Q,
    resampleMethod: t,
    enableAlpha: E = !1,
    signal: D
  } = {}) {
    const e = I || [0, 0, this.getWidth(), this.getHeight()];
    if (e[0] > e[2] || e[1] > e[3])
      throw new Error("Invalid subsets");
    const C = this.fileDirectory.PhotometricInterpretation;
    if (C === W.RGB) {
      let h = [0, 1, 2];
      if (this.fileDirectory.ExtraSamples !== RB.Unspecified && E) {
        h = [];
        for (let l = 0; l < this.fileDirectory.BitsPerSample.length; l += 1)
          h.push(l);
      }
      return this.readRasters({
        window: I,
        interleave: A,
        samples: h,
        pool: B,
        width: i,
        height: Q,
        resampleMethod: t,
        signal: D
      });
    }
    let o;
    switch (C) {
      case W.WhiteIsZero:
      case W.BlackIsZero:
      case W.Palette:
        o = [0];
        break;
      case W.CMYK:
        o = [0, 1, 2, 3];
        break;
      case W.YCbCr:
      case W.CIELab:
        o = [0, 1, 2];
        break;
      default:
        throw new Error("Invalid or unsupported photometric interpretation.");
    }
    const a = {
      window: e,
      interleave: !0,
      samples: o,
      pool: B,
      width: i,
      height: Q,
      resampleMethod: t,
      signal: D
    }, { fileDirectory: s } = this, r = await this.readRasters(a), c = 2 ** this.fileDirectory.BitsPerSample[0];
    let n;
    switch (C) {
      case W.WhiteIsZero:
        n = YB(r, c);
        break;
      case W.BlackIsZero:
        n = MB(r, c);
        break;
      case W.Palette:
        n = KB(r, s.ColorMap);
        break;
      case W.CMYK:
        n = JB(r);
        break;
      case W.YCbCr:
        n = HB(r);
        break;
      case W.CIELab:
        n = bB(r);
        break;
      default:
        throw new Error("Unsupported photometric interpretation.");
    }
    if (!A) {
      const h = new Uint8Array(n.length / 3), l = new Uint8Array(n.length / 3), G = new Uint8Array(n.length / 3);
      for (let f = 0, d = 0; f < n.length; f += 3, ++d)
        h[d] = n[f], l[d] = n[f + 1], G[d] = n[f + 2];
      n = [h, l, G];
    }
    return n.width = r.width, n.height = r.height, n;
  }
  /**
   * Returns an array of tiepoints.
   * @returns {Object[]}
   */
  getTiePoints() {
    if (!this.fileDirectory.ModelTiepoint)
      return [];
    const I = [];
    for (let A = 0; A < this.fileDirectory.ModelTiepoint.length; A += 6)
      I.push({
        i: this.fileDirectory.ModelTiepoint[A],
        j: this.fileDirectory.ModelTiepoint[A + 1],
        k: this.fileDirectory.ModelTiepoint[A + 2],
        x: this.fileDirectory.ModelTiepoint[A + 3],
        y: this.fileDirectory.ModelTiepoint[A + 4],
        z: this.fileDirectory.ModelTiepoint[A + 5]
      });
    return I;
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
  getGDALMetadata(I = null) {
    const A = {};
    if (!this.fileDirectory.GDAL_METADATA)
      return null;
    const B = this.fileDirectory.GDAL_METADATA;
    let i = uB(B, "Item");
    I === null ? i = i.filter((Q) => gI(Q, "sample") === void 0) : i = i.filter((Q) => Number(gI(Q, "sample")) === I);
    for (let Q = 0; Q < i.length; ++Q) {
      const t = i[Q];
      A[gI(t, "name")] = t.inner;
    }
    return A;
  }
  /**
   * Returns the GDAL nodata value
   * @returns {number|null}
   */
  getGDALNoData() {
    if (!this.fileDirectory.GDAL_NODATA)
      return null;
    const I = this.fileDirectory.GDAL_NODATA;
    return Number(I.substring(0, I.length - 1));
  }
  /**
   * Returns the image origin as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @returns {Array<number>} The origin as a vector
   */
  getOrigin() {
    const I = this.fileDirectory.ModelTiepoint, A = this.fileDirectory.ModelTransformation;
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
    const A = this.fileDirectory.ModelPixelScale, B = this.fileDirectory.ModelTransformation;
    if (A)
      return [
        A[0],
        -A[1],
        A[2]
      ];
    if (B)
      return B[1] === 0 && B[4] === 0 ? [
        B[0],
        -B[5],
        B[10]
      ] : [
        Math.sqrt(B[0] * B[0] + B[4] * B[4]),
        -Math.sqrt(B[1] * B[1] + B[5] * B[5]),
        B[10]
      ];
    if (I) {
      const [i, Q, t] = I.getResolution();
      return [
        i * I.getWidth() / this.getWidth(),
        Q * I.getHeight() / this.getHeight(),
        t * I.getWidth() / this.getWidth()
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
    const A = this.getHeight(), B = this.getWidth();
    if (this.fileDirectory.ModelTransformation && !I) {
      const [i, Q, t, E, D, e, C, o] = this.fileDirectory.ModelTransformation, s = [
        [0, 0],
        [0, A],
        [B, 0],
        [B, A]
      ].map(([n, h]) => [
        E + i * n + Q * h,
        o + D * n + e * h
      ]), r = s.map((n) => n[0]), c = s.map((n) => n[1]);
      return [
        Math.min(...r),
        Math.min(...c),
        Math.max(...r),
        Math.max(...c)
      ];
    } else {
      const i = this.getOrigin(), Q = this.getResolution(), t = i[0], E = i[1], D = t + Q[0] * B, e = E + Q[1] * A;
      return [
        Math.min(t, D),
        Math.min(E, e),
        Math.max(t, D),
        Math.max(E, e)
      ];
    }
  }
}
class XB {
  constructor(I) {
    this._dataView = new DataView(I);
  }
  get buffer() {
    return this._dataView.buffer;
  }
  getUint64(I, A) {
    const B = this.getUint32(I, A), i = this.getUint32(I + 4, A);
    let Q;
    if (A) {
      if (Q = B + 2 ** 32 * i, !Number.isSafeInteger(Q))
        throw new Error(
          `${Q} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/scottcali//geotiff.js/issues`
        );
      return Q;
    }
    if (Q = 2 ** 32 * B + i, !Number.isSafeInteger(Q))
      throw new Error(
        `${Q} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/scottcali//geotiff.js/issues`
      );
    return Q;
  }
  // adapted from https://stackoverflow.com/a/55338384/8060591
  getInt64(I, A) {
    let B = 0;
    const i = (this._dataView.getUint8(I + (A ? 7 : 0)) & 128) > 0;
    let Q = !0;
    for (let t = 0; t < 8; t++) {
      let E = this._dataView.getUint8(I + (A ? t : 7 - t));
      i && (Q ? E !== 0 && (E = ~(E - 1) & 255, Q = !1) : E = ~E & 255), B += E * 256 ** t;
    }
    return i && (B = -B), B;
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
    return kg(this._dataView, I, A);
  }
  getFloat32(I, A) {
    return this._dataView.getFloat32(I, A);
  }
  getFloat64(I, A) {
    return this._dataView.getFloat64(I, A);
  }
}
class $B {
  constructor(I, A, B, i) {
    this._dataView = new DataView(I), this._sliceOffset = A, this._littleEndian = B, this._bigTiff = i;
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
    const A = this.readUint32(I), B = this.readUint32(I + 4);
    let i;
    if (this._littleEndian) {
      if (i = A + 2 ** 32 * B, !Number.isSafeInteger(i))
        throw new Error(
          `${i} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/scottcali//geotiff.js/issues`
        );
      return i;
    }
    if (i = 2 ** 32 * A + B, !Number.isSafeInteger(i))
      throw new Error(
        `${i} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/scottcali//geotiff.js/issues`
      );
    return i;
  }
  // adapted from https://stackoverflow.com/a/55338384/8060591
  readInt64(I) {
    let A = 0;
    const B = (this._dataView.getUint8(I + (this._littleEndian ? 7 : 0)) & 128) > 0;
    let i = !0;
    for (let Q = 0; Q < 8; Q++) {
      let t = this._dataView.getUint8(
        I + (this._littleEndian ? Q : 7 - Q)
      );
      B && (i ? t !== 0 && (t = ~(t - 1) & 255, i = !1) : t = ~t & 255), A += t * 256 ** Q;
    }
    return B && (A = -A), A;
  }
  readOffset(I) {
    return this._bigTiff ? this.readUint64(I) : this.readUint32(I);
  }
}
const AC = typeof Worker < "u" ? Worker : void 0;
function IC() {
  return new AC(new URL(
    /* @vite-ignore */
    "/assets/decoder-BqdFVzST.js",
    import.meta.url
  ), {
    type: "module"
  });
}
const gC = typeof navigator < "u" && navigator.hardwareConcurrency || 2;
class BC {
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
    const { jobId: A, error: B, ...i } = I.data, Q = this.jobs.get(A);
    this.jobs.delete(A), B ? Q.reject(new Error(B)) : Q.resolve(i);
  }
  /**
   * Submit a job to the worker
   * @param {Object} message the message to send to the worker. A "jobId" property will be added to this object.
   * @param {Object[]} [transferables] an optional array of transferable objects to transfer to the worker.
   * @returns {Promise} a promise that gets resolved/rejected when a message with the same jobId is received from the worker.
   */
  submitJob(I, A = void 0) {
    const B = this.newJobId();
    let i, Q;
    const t = new Promise((E, D) => {
      i = E, Q = D;
    });
    return this.jobs.set(B, { resolve: i, reject: Q }), this.worker.postMessage({ ...I, jobId: B }, A), t;
  }
  terminate() {
    this.worker.terminate();
  }
}
const CC = new FinalizationRegistry((g) => {
  g.terminate();
});
class QC {
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
  constructor(I = gC, A = IC) {
    this.workerWrappers = null, I && (this.workerWrappers = (async () => {
      const B = [];
      for (let i = 0; i < I; i++) {
        const Q = A(), t = new BC(Q);
        B.push(t), CC.register(t, Q, t);
      }
      return B;
    })());
  }
  /**
   * Decode the given block of bytes with the set compression method.
   * @param {ArrayBuffer} buffer the array buffer of bytes to decode.
   * @returns {Promise<ArrayBuffer>} the decoded result as a `Promise`
   */
  async decode(I, A) {
    if (qB(I) && this.workerWrappers) {
      const B = (await this.workerWrappers).reduce((Q, t) => Q.getJobCount() < t.getJobCount() ? Q : t), { decoded: i } = await B.submitJob({ fileDirectory: I, buffer: A }, [A]);
      return i;
    } else
      return mg(I).then((B) => B.decode(I, A));
  }
  async destroy() {
    this.workerWrappers && ((await this.workerWrappers).forEach((I) => {
      I.terminate();
    }), this.workerWrappers = null);
  }
}
const TI = `\r
\r
`;
function pg(g) {
  if (typeof Object.fromEntries < "u")
    return Object.fromEntries(g);
  const I = {};
  for (const [A, B] of g)
    I[A.toLowerCase()] = B;
  return I;
}
function eC(g) {
  const I = g.split(`\r
`).map((A) => {
    const B = A.split(":").map((i) => i.trim());
    return B[0] = B[0].toLowerCase(), B;
  });
  return pg(I);
}
function iC(g) {
  const [I, ...A] = g.split(";").map((i) => i.trim()), B = A.map((i) => i.split("="));
  return { type: I, params: pg(B) };
}
function fI(g) {
  let I, A, B;
  return g && ([, I, A, B] = g.match(/bytes (\d+)-(\d+)\/(\d+)/), I = parseInt(I, 10), A = parseInt(A, 10), B = parseInt(B, 10)), { start: I, end: A, total: B };
}
function EC(g, I) {
  let A = null;
  const B = new TextDecoder("ascii"), i = [], Q = `--${I}`, t = `${Q}--`;
  for (let E = 0; E < 10; ++E)
    B.decode(
      new Uint8Array(g, E, Q.length)
    ) === Q && (A = E);
  if (A === null)
    throw new Error("Could not find initial boundary");
  for (; A < g.byteLength; ) {
    const E = B.decode(
      new Uint8Array(
        g,
        A,
        Math.min(Q.length + 1024, g.byteLength - A)
      )
    );
    if (E.length === 0 || E.startsWith(t))
      break;
    if (!E.startsWith(Q))
      throw new Error("Part does not start with boundary");
    const D = E.substr(Q.length + 2);
    if (D.length === 0)
      break;
    const e = D.indexOf(TI), C = eC(D.substr(0, e)), { start: o, end: a, total: s } = fI(C["content-range"]), r = A + Q.length + e + TI.length, c = parseInt(a, 10) + 1 - parseInt(o, 10);
    i.push({
      headers: C,
      data: g.slice(r, r + c),
      offset: o,
      length: c,
      fileSize: s
    }), A = r + c + 4;
  }
  return i;
}
class KI {
  /**
   *
   * @param {Slice[]} slices
   * @returns {ArrayBuffer[]}
   */
  async fetch(I, A = void 0) {
    return Promise.all(
      I.map((B) => this.fetchSlice(B, A))
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
class tC extends Map {
  constructor(I = {}) {
    if (super(), !(I.maxSize && I.maxSize > 0))
      throw new TypeError("`maxSize` must be a number greater than 0");
    if (typeof I.maxAge == "number" && I.maxAge === 0)
      throw new TypeError("`maxAge` must be a number greater than 0");
    this.maxSize = I.maxSize, this.maxAge = I.maxAge || Number.POSITIVE_INFINITY, this.onEviction = I.onEviction, this.cache = /* @__PURE__ */ new Map(), this.oldCache = /* @__PURE__ */ new Map(), this._size = 0;
  }
  // TODO: Use private class methods when targeting Node.js 16.
  _emitEvictions(I) {
    if (typeof this.onEviction == "function")
      for (const [A, B] of I)
        this.onEviction(A, B.value);
  }
  _deleteIfExpired(I, A) {
    return typeof A.expiry == "number" && A.expiry <= Date.now() ? (typeof this.onEviction == "function" && this.onEviction(I, A.value), this.delete(I)) : !1;
  }
  _getOrDeleteIfExpired(I, A) {
    if (this._deleteIfExpired(I, A) === !1)
      return A.value;
  }
  _getItemValue(I, A) {
    return A.expiry ? this._getOrDeleteIfExpired(I, A) : A.value;
  }
  _peek(I, A) {
    const B = A.get(I);
    return this._getItemValue(I, B);
  }
  _set(I, A) {
    this.cache.set(I, A), this._size++, this._size >= this.maxSize && (this._size = 0, this._emitEvictions(this.oldCache), this.oldCache = this.cache, this.cache = /* @__PURE__ */ new Map());
  }
  _moveToRecent(I, A) {
    this.oldCache.delete(I), this._set(I, A);
  }
  *_entriesAscending() {
    for (const I of this.oldCache) {
      const [A, B] = I;
      this.cache.has(A) || this._deleteIfExpired(A, B) === !1 && (yield I);
    }
    for (const I of this.cache) {
      const [A, B] = I;
      this._deleteIfExpired(A, B) === !1 && (yield I);
    }
  }
  get(I) {
    if (this.cache.has(I)) {
      const A = this.cache.get(I);
      return this._getItemValue(I, A);
    }
    if (this.oldCache.has(I)) {
      const A = this.oldCache.get(I);
      if (this._deleteIfExpired(I, A) === !1)
        return this._moveToRecent(I, A), A.value;
    }
  }
  set(I, A, { maxAge: B = this.maxAge } = {}) {
    const i = typeof B == "number" && B !== Number.POSITIVE_INFINITY ? Date.now() + B : void 0;
    this.cache.has(I) ? this.cache.set(I, {
      value: A,
      expiry: i
    }) : this._set(I, { value: A, expiry: i });
  }
  has(I) {
    return this.cache.has(I) ? !this._deleteIfExpired(I, this.cache.get(I)) : this.oldCache.has(I) ? !this._deleteIfExpired(I, this.oldCache.get(I)) : !1;
  }
  peek(I) {
    if (this.cache.has(I))
      return this._peek(I, this.cache);
    if (this.oldCache.has(I))
      return this._peek(I, this.oldCache);
  }
  delete(I) {
    const A = this.cache.delete(I);
    return A && this._size--, this.oldCache.delete(I) || A;
  }
  clear() {
    this.cache.clear(), this.oldCache.clear(), this._size = 0;
  }
  resize(I) {
    if (!(I && I > 0))
      throw new TypeError("`maxSize` must be a number greater than 0");
    const A = [...this._entriesAscending()], B = A.length - I;
    B < 0 ? (this.cache = new Map(A), this.oldCache = /* @__PURE__ */ new Map(), this._size = A.length) : (B > 0 && this._emitEvictions(A.slice(0, B)), this.oldCache = new Map(A.slice(B)), this.cache = /* @__PURE__ */ new Map(), this._size = 0), this.maxSize = I;
  }
  *keys() {
    for (const [I] of this)
      yield I;
  }
  *values() {
    for (const [, I] of this)
      yield I;
  }
  *[Symbol.iterator]() {
    for (const I of this.cache) {
      const [A, B] = I;
      this._deleteIfExpired(A, B) === !1 && (yield [A, B.value]);
    }
    for (const I of this.oldCache) {
      const [A, B] = I;
      this.cache.has(A) || this._deleteIfExpired(A, B) === !1 && (yield [A, B.value]);
    }
  }
  *entriesDescending() {
    let I = [...this.cache];
    for (let A = I.length - 1; A >= 0; --A) {
      const B = I[A], [i, Q] = B;
      this._deleteIfExpired(i, Q) === !1 && (yield [i, Q.value]);
    }
    I = [...this.oldCache];
    for (let A = I.length - 1; A >= 0; --A) {
      const B = I[A], [i, Q] = B;
      this.cache.has(i) || this._deleteIfExpired(i, Q) === !1 && (yield [i, Q.value]);
    }
  }
  *entriesAscending() {
    for (const [I, A] of this._entriesAscending())
      yield [I, A.value];
  }
  get size() {
    if (!this._size)
      return this.oldCache.size;
    let I = 0;
    for (const A of this.oldCache.keys())
      this.cache.has(A) || I++;
    return Math.min(this._size + I, this.maxSize);
  }
  entries() {
    return this.entriesAscending();
  }
  forEach(I, A = this) {
    for (const [B, i] of this.entriesAscending())
      I.call(A, i, B, this);
  }
  get [Symbol.toStringTag]() {
    return JSON.stringify([...this.entriesAscending()]);
  }
}
function xg(g, I) {
  for (const A in I)
    I.hasOwnProperty(A) && (g[A] = I[A]);
}
function JI(g) {
  const I = {};
  for (const A in g)
    if (g.hasOwnProperty(A)) {
      const B = g[A];
      I[B] = A;
    }
  return I;
}
function oC(g, I) {
  const A = [];
  for (let B = 0; B < g; B++)
    A.push(I(B));
  return A;
}
async function sC(g) {
  return new Promise((I) => setTimeout(I, g));
}
function rC(g, I) {
  const A = Array.isArray(g) ? g : Array.from(g), B = Array.isArray(I) ? I : Array.from(I);
  return A.map((i, Q) => [i, B[Q]]);
}
class FA extends Error {
  constructor(I) {
    super(I), Error.captureStackTrace && Error.captureStackTrace(this, FA), this.name = "AbortError";
  }
}
class aC extends Error {
  constructor(I, A) {
    super(A), this.errors = I, this.message = A, this.name = "AggregateError";
  }
}
const nC = aC;
class hC {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {ArrayBuffer} [data]
   */
  constructor(I, A, B = null) {
    this.offset = I, this.length = A, this.data = B;
  }
  /**
   * @returns {number} the top byte border
   */
  get top() {
    return this.offset + this.length;
  }
}
class OI {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {number[]} blockIds
   */
  constructor(I, A, B) {
    this.offset = I, this.length = A, this.blockIds = B;
  }
}
class DC extends KI {
  /**
   *
   * @param {BaseSource} source The underlying source that shall be blocked and cached
   * @param {object} options
   * @param {number} [options.blockSize]
   * @param {number} [options.cacheSize]
   */
  constructor(I, { blockSize: A = 65536, cacheSize: B = 100 } = {}) {
    super(), this.source = I, this.blockSize = A, this.blockCache = new tC({
      maxSize: B,
      onEviction: (i, Q) => {
        this.evictedBlocks.set(i, Q);
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
    const B = [], i = [], Q = [];
    this.evictedBlocks.clear();
    for (const { offset: a, length: s } of I) {
      let r = a + s;
      const { fileSize: c } = this;
      c !== null && (r = Math.min(r, c));
      const n = Math.floor(a / this.blockSize) * this.blockSize;
      for (let h = n; h < r; h += this.blockSize) {
        const l = Math.floor(h / this.blockSize);
        !this.blockCache.has(l) && !this.blockRequests.has(l) && (this.blockIdsToFetch.add(l), i.push(l)), this.blockRequests.has(l) && B.push(this.blockRequests.get(l)), Q.push(l);
      }
    }
    await sC(), this.fetchBlocks(A);
    const t = [];
    for (const a of i)
      this.blockRequests.has(a) && t.push(this.blockRequests.get(a));
    await Promise.allSettled(B), await Promise.allSettled(t);
    const E = [], D = Q.filter((a) => this.abortedBlockIds.has(a) || !this.blockCache.has(a));
    if (D.forEach((a) => this.blockIdsToFetch.add(a)), D.length > 0 && A && !A.aborted) {
      this.fetchBlocks(null);
      for (const a of D) {
        const s = this.blockRequests.get(a);
        if (!s)
          throw new Error(`Block ${a} is not in the block requests`);
        E.push(s);
      }
      await Promise.allSettled(E);
    }
    if (A && A.aborted)
      throw new FA("Request was aborted");
    const e = Q.map((a) => this.blockCache.get(a) || this.evictedBlocks.get(a)), C = e.filter((a) => !a);
    if (C.length)
      throw new nC(C, "Request failed");
    const o = new Map(rC(Q, e));
    return this.readSliceData(I, o);
  }
  /**
   *
   * @param {AbortSignal} signal
   */
  fetchBlocks(I) {
    if (this.blockIdsToFetch.size > 0) {
      const A = this.groupBlocks(this.blockIdsToFetch), B = this.source.fetch(A, I);
      for (let i = 0; i < A.length; ++i) {
        const Q = A[i];
        for (const t of Q.blockIds)
          this.blockRequests.set(t, (async () => {
            try {
              const E = (await B)[i], D = t * this.blockSize, e = D - E.offset, C = Math.min(e + this.blockSize, E.data.byteLength), o = E.data.slice(e, C), a = new hC(
                D,
                o.byteLength,
                o,
                t
              );
              this.blockCache.set(t, a), this.abortedBlockIds.delete(t);
            } catch (E) {
              if (E.name === "AbortError")
                E.signal = I, this.blockCache.delete(t), this.abortedBlockIds.add(t);
              else
                throw E;
            } finally {
              this.blockRequests.delete(t);
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
    const A = Array.from(I).sort((t, E) => t - E);
    if (A.length === 0)
      return [];
    let B = [], i = null;
    const Q = [];
    for (const t of A)
      i === null || i + 1 === t ? (B.push(t), i = t) : (Q.push(new OI(
        B[0] * this.blockSize,
        B.length * this.blockSize,
        B
      )), B = [t], i = t);
    return Q.push(new OI(
      B[0] * this.blockSize,
      B.length * this.blockSize,
      B
    )), Q;
  }
  /**
   *
   * @param {import("./basesource").Slice[]} slices
   * @param {Map} blocks
   */
  readSliceData(I, A) {
    return I.map((B) => {
      let i = B.offset + B.length;
      this.fileSize !== null && (i = Math.min(this.fileSize, i));
      const Q = Math.floor(B.offset / this.blockSize), t = Math.floor((i - 1) / this.blockSize), E = new ArrayBuffer(B.length), D = new Uint8Array(E);
      for (let e = Q; e <= t; ++e) {
        const C = A.get(e), o = C.offset - B.offset, a = C.top - i;
        let s = 0, r = 0, c;
        o < 0 ? s = -o : o > 0 && (r = o), a < 0 ? c = C.length - s : c = i - C.offset - s;
        const n = new Uint8Array(C.data, s, c);
        D.set(n, r);
      }
      return E;
    });
  }
}
class HI {
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
class mI {
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
class cC extends HI {
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
class wC extends mI {
  constructor(I, A) {
    super(I), this.credentials = A;
  }
  /**
   * @param {{headers: HeadersInit, signal: AbortSignal}} [options={}]
   * @returns {Promise<FetchResponse>}
   */
  async request({ headers: I, signal: A } = {}) {
    const B = await fetch(this.url, {
      headers: I,
      credentials: this.credentials,
      signal: A
    });
    return new cC(B);
  }
}
class lC extends HI {
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
class fC extends mI {
  constructRequest(I, A) {
    return new Promise((B, i) => {
      const Q = new XMLHttpRequest();
      Q.open("GET", this.url), Q.responseType = "arraybuffer";
      for (const [t, E] of Object.entries(I))
        Q.setRequestHeader(t, E);
      Q.onload = () => {
        const t = Q.response;
        B(new lC(Q, t));
      }, Q.onerror = i, Q.onabort = () => i(new FA("Request aborted")), Q.send(), A && (A.aborted && Q.abort(), A.addEventListener("abort", () => Q.abort()));
    });
  }
  async request({ headers: I, signal: A } = {}) {
    return await this.constructRequest(I, A);
  }
}
const QI = {};
class yC extends HI {
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
class SC extends mI {
  constructor(I) {
    super(I), this.parsedUrl = QI.parse(this.url), this.httpApi = (this.parsedUrl.protocol === "http:", QI);
  }
  constructRequest(I, A) {
    return new Promise((B, i) => {
      const Q = this.httpApi.get(
        {
          ...this.parsedUrl,
          headers: I
        },
        (t) => {
          const E = new Promise((D) => {
            const e = [];
            t.on("data", (C) => {
              e.push(C);
            }), t.on("end", () => {
              const C = Buffer.concat(e).buffer;
              D(C);
            }), t.on("error", i);
          });
          B(new yC(t, E));
        }
      );
      Q.on("error", i), A && (A.aborted && Q.destroy(new FA("Request aborted")), A.addEventListener("abort", () => Q.destroy(new FA("Request aborted"))));
    });
  }
  async request({ headers: I, signal: A } = {}) {
    return await this.constructRequest(I, A);
  }
}
class pI extends KI {
  /**
   *
   * @param {BaseClient} client
   * @param {object} headers
   * @param {numbers} maxRanges
   * @param {boolean} allowFullFile
   */
  constructor(I, A, B, i) {
    super(), this.client = I, this.headers = A, this.maxRanges = B, this.allowFullFile = i, this._fileSize = null;
  }
  /**
   *
   * @param {Slice[]} slices
   */
  async fetch(I, A) {
    return this.maxRanges >= I.length ? this.fetchSlices(I, A) : (this.maxRanges > 0 && I.length > 1, Promise.all(
      I.map((B) => this.fetchSlice(B, A))
    ));
  }
  async fetchSlices(I, A) {
    const B = await this.client.request({
      headers: {
        ...this.headers,
        Range: `bytes=${I.map(({ offset: i, length: Q }) => `${i}-${i + Q}`).join(",")}`
      },
      signal: A
    });
    if (B.ok)
      if (B.status === 206) {
        const { type: i, params: Q } = iC(B.getHeader("content-type"));
        if (i === "multipart/byteranges") {
          const o = EC(await B.getData(), Q.boundary);
          return this._fileSize = o[0].fileSize || null, o;
        }
        const t = await B.getData(), { start: E, end: D, total: e } = fI(B.getHeader("content-range"));
        this._fileSize = e || null;
        const C = [{
          data: t,
          offset: E,
          length: D - E
        }];
        if (I.length > 1) {
          const o = await Promise.all(I.slice(1).map((a) => this.fetchSlice(a, A)));
          return C.concat(o);
        }
        return C;
      } else {
        if (!this.allowFullFile)
          throw new Error("Server responded with full file");
        const i = await B.getData();
        return this._fileSize = i.byteLength, [{
          data: i,
          offset: 0,
          length: i.byteLength
        }];
      }
    else throw new Error("Error fetching data.");
  }
  async fetchSlice(I, A) {
    const { offset: B, length: i } = I, Q = await this.client.request({
      headers: {
        ...this.headers,
        Range: `bytes=${B}-${B + i}`
      },
      signal: A
    });
    if (Q.ok)
      if (Q.status === 206) {
        const t = await Q.getData(), { total: E } = fI(Q.getHeader("content-range"));
        return this._fileSize = E || null, {
          data: t,
          offset: B,
          length: i
        };
      } else {
        if (!this.allowFullFile)
          throw new Error("Server responded with full file");
        const t = await Q.getData();
        return this._fileSize = t.byteLength, {
          data: t,
          offset: 0,
          length: t.byteLength
        };
      }
    else throw new Error("Error fetching data.");
  }
  get fileSize() {
    return this._fileSize;
  }
}
function xI(g, { blockSize: I, cacheSize: A }) {
  return I === null ? g : new DC(g, { blockSize: I, cacheSize: A });
}
function GC(g, { headers: I = {}, credentials: A, maxRanges: B = 0, allowFullFile: i = !1, ...Q } = {}) {
  const t = new wC(g, A), E = new pI(t, I, B, i);
  return xI(E, Q);
}
function dC(g, { headers: I = {}, maxRanges: A = 0, allowFullFile: B = !1, ...i } = {}) {
  const Q = new fC(g), t = new pI(Q, I, A, B);
  return xI(t, i);
}
function FC(g, { headers: I = {}, maxRanges: A = 0, allowFullFile: B = !1, ...i } = {}) {
  const Q = new SC(g), t = new pI(Q, I, A, B);
  return xI(t, i);
}
function NC(g, { forceXHR: I = !1, ...A } = {}) {
  return typeof fetch == "function" && !I ? GC(g, A) : typeof XMLHttpRequest < "u" ? dC(g, A) : FC(g, A);
}
class uC extends KI {
  constructor(I) {
    super(), this.file = I;
  }
  async fetchSlice(I, A) {
    return new Promise((B, i) => {
      const Q = this.file.slice(I.offset, I.offset + I.length), t = new FileReader();
      t.onload = (E) => B(E.target.result), t.onerror = i, t.onabort = i, t.readAsArrayBuffer(Q), A && A.addEventListener("abort", () => t.abort());
    });
  }
}
function kC(g) {
  return new uC(g);
}
const RC = JI(cA), LC = JI(RA), bg = {};
xg(bg, RC);
xg(bg, LC);
JI(VA);
const LA = {
  ui8: new Uint8Array(8)
};
LA.fl64 = new Float64Array(LA.ui8.buffer);
LA.writeDouble = (g, I, A) => {
  LA.fl64[0] = A, oC(8, (B) => {
    g[I + B] = LA.ui8[7 - B];
  });
};
class UC {
  log() {
  }
  debug() {
  }
  info() {
  }
  warn() {
  }
  error() {
  }
  time() {
  }
  timeEnd() {
  }
}
let YC = new UC();
function MC(...g) {
  return YC.debug(...g);
}
function KC(g, I) {
  let A = g.length - I, B = 0;
  do {
    for (let i = I; i > 0; i--)
      g[B + I] += g[B], B++;
    A -= I;
  } while (A > 0);
}
function JC(g, I, A) {
  let B = 0, i = g.length;
  const Q = i / A;
  for (; i > I; ) {
    for (let E = I; E > 0; --E)
      g[B + I] += g[B], ++B;
    i -= I;
  }
  const t = g.slice();
  for (let E = 0; E < Q; ++E)
    for (let D = 0; D < A; ++D)
      g[A * E + D] = t[(A - D - 1) * Q + E];
}
function HC(g, I, A, B, i, Q) {
  if (I === 1)
    return g;
  for (let D = 0; D < i.length; ++D) {
    if (i[D] % 8 !== 0)
      throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");
    if (i[D] !== i[0])
      throw new Error("When decoding with predictor, all samples must have the same size.");
  }
  const t = i[0] / 8, E = Q === 2 ? 1 : i.length;
  for (let D = 0; D < B && !(D * E * A * t >= g.byteLength); ++D) {
    let e;
    if (I === 2) {
      switch (i[0]) {
        case 8:
          e = new Uint8Array(
            g,
            D * E * A * t,
            E * A * t
          );
          break;
        case 16:
          e = new Uint16Array(
            g,
            D * E * A * t,
            E * A * t / 2
          );
          break;
        case 32:
          e = new Uint32Array(
            g,
            D * E * A * t,
            E * A * t / 4
          );
          break;
        default:
          throw new Error(`Predictor 2 not allowed with ${i[0]} bits per sample.`);
      }
      KC(e, E);
    } else I === 3 && (e = new Uint8Array(
      g,
      D * E * A * t,
      E * A * t
    ), JC(e, E, t));
  }
  return g;
}
class nA {
  async decode(I, A) {
    const B = await this.decodeBlock(A), i = I.Predictor || 1;
    if (i !== 1) {
      const Q = !I.StripOffsets, t = Q ? I.TileWidth : I.ImageWidth, E = Q ? I.TileLength : I.RowsPerStrip || I.ImageLength;
      return HC(
        B,
        i,
        t,
        E,
        I.BitsPerSample,
        I.PlanarConfiguration
      );
    }
    return B;
  }
}
console.log("Loading GeoTiff Reader 2025.10.09 Version 2.1.4-beta.0");
const vI = new Uint8Array([
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
function yI(g) {
  switch (g) {
    case q.BYTE:
    case q.ASCII:
    case q.SBYTE:
    case q.UNDEFINED:
      return 1;
    case q.SHORT:
    case q.SSHORT:
      return 2;
    case q.LONG:
    case q.SLONG:
    case q.FLOAT:
    case q.IFD:
      return 4;
    case q.RATIONAL:
    case q.SRATIONAL:
    case q.DOUBLE:
    case q.LONG8:
    case q.SLONG8:
    case q.IFD8:
      return 8;
    default:
      throw new RangeError(`Invalid field type: ${g}`);
  }
}
function mC(g) {
  const I = g.GeoKeyDirectory;
  if (!I)
    return null;
  const A = {};
  for (let B = 4; B <= I[3] * 4; B += 4) {
    const i = RA[I[B]], Q = I[B + 1] ? cA[I[B + 1]] : null, t = I[B + 2], E = I[B + 3];
    let D = null;
    if (!Q)
      D = E;
    else {
      if (D = g[Q], typeof D > "u" || D === null)
        throw new Error(`Could not get value of geoKey '${i}'.`);
      typeof D == "string" ? D = D.substring(E, E + t - 1) : D.subarray && (D = D.subarray(E, E + t), t === 1 && (D = D[0]));
    }
    A[i] = D;
  }
  return A;
}
function fA(g, I, A, B) {
  let i = null, Q = null;
  const t = yI(I);
  switch (I) {
    case q.BYTE:
    case q.ASCII:
    case q.UNDEFINED:
      i = new Uint8Array(A), Q = g.readUint8;
      break;
    case q.SBYTE:
      i = new Int8Array(A), Q = g.readInt8;
      break;
    case q.SHORT:
      i = new Uint16Array(A), Q = g.readUint16;
      break;
    case q.SSHORT:
      i = new Int16Array(A), Q = g.readInt16;
      break;
    case q.LONG:
    case q.IFD:
      i = new Uint32Array(A), Q = g.readUint32;
      break;
    case q.SLONG:
      i = new Int32Array(A), Q = g.readInt32;
      break;
    case q.LONG8:
    case q.IFD8:
      i = new Array(A), Q = g.readUint64;
      break;
    case q.SLONG8:
      i = new Array(A), Q = g.readInt64;
      break;
    case q.RATIONAL:
      i = new Uint32Array(A * 2), Q = g.readUint32;
      break;
    case q.SRATIONAL:
      i = new Int32Array(A * 2), Q = g.readInt32;
      break;
    case q.FLOAT:
      i = new Float32Array(A), Q = g.readFloat32;
      break;
    case q.DOUBLE:
      i = new Float64Array(A), Q = g.readFloat64;
      break;
    default:
      throw new RangeError(`Invalid field type: ${I}`);
  }
  if (I === q.RATIONAL || I === q.SRATIONAL)
    for (let E = 0; E < A; E += 2)
      i[E] = Q.call(
        g,
        B + E * t
      ), i[E + 1] = Q.call(
        g,
        B + (E * t + 4)
      );
  else
    for (let E = 0; E < A; ++E)
      i[E] = Q.call(
        g,
        B + E * t
      );
  return I === q.ASCII ? new TextDecoder("utf-8").decode(i) : i;
}
class pC {
  /**
   * Create an ImageFileDirectory.
   * @param {object} fileDirectory the file directory, mapping tag names to values
   * @param {Map} rawFileDirectory the raw file directory, mapping tag IDs to values
   * @param {object} geoKeyDirectory the geo key directory, mapping geo key names to values
   * @param {number} nextIFDByteOffset the byte offset to the next IFD
   */
  constructor(I, A, B, i) {
    this.fileDirectory = I, this.rawFileDirectory = A, this.geoKeyDirectory = B, this.nextIFDByteOffset = i;
  }
}
class HA extends Error {
  constructor(I) {
    super(`No image at index ${I}`), this.index = I;
  }
}
class xC {
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
    const { window: A, width: B, height: i } = I;
    let { resX: Q, resY: t, bbox: E } = I;
    const D = await this.getImage();
    let e = D;
    const C = await this.getImageCount(), o = D.getBoundingBox();
    if (A && E)
      throw new Error('Both "bbox" and "window" passed.');
    if (B || i) {
      if (A) {
        const [r, c] = D.getOrigin(), [n, h] = D.getResolution();
        E = [
          r + A[0] * n,
          c + A[1] * h,
          r + A[2] * n,
          c + A[3] * h
        ];
      }
      const s = E || o;
      if (B) {
        if (Q)
          throw new Error("Both width and resX passed");
        Q = (s[2] - s[0]) / B;
      }
      if (i) {
        if (t)
          throw new Error("Both width and resY passed");
        t = (s[3] - s[1]) / i;
      }
    }
    if (Q || t) {
      const s = [];
      for (let r = 0; r < C; ++r) {
        const c = await this.getImage(r), { SubfileType: n, NewSubfileType: h } = c.fileDirectory;
        (r === 0 || n === 2 || h & 1) && s.push(c);
      }
      s.sort((r, c) => r.getWidth() - c.getWidth());
      for (let r = 0; r < s.length; ++r) {
        const c = s[r], n = (o[2] - o[0]) / c.getWidth(), h = (o[3] - o[1]) / c.getHeight();
        if (e = c, Q && Q > n || t && t > h)
          break;
      }
    }
    let a = A;
    if (E) {
      const [s, r] = D.getOrigin(), [c, n] = e.getResolution(D);
      a = [
        Math.round((E[0] - s) / c),
        Math.round((E[1] - r) / n),
        Math.round((E[2] - s) / c),
        Math.round((E[3] - r) / n)
      ], a = [
        Math.min(a[0], a[2]),
        Math.min(a[1], a[3]),
        Math.max(a[0], a[2]),
        Math.max(a[1], a[3])
      ];
    }
    return e.readRasters({ ...I, window: a });
  }
}
class $A extends xC {
  /**
   * @constructor
   * @param {(source.ArrayBufferSource|source.Remote|source.Custom|source.DataView)} source The data source from where to read the TIFF file.
   * @param {boolean} littleEndian Whether the TIFF file is in little endian format.
   * @param {boolean} bigTiff Whether the TIFF file is a BigTIFF file.
   * @param {number} firstIFDOffset The numeric byte-offset from the start of the file to the first IFD.
   * @param {object} [options] Further options.
   * @param {boolean} [options.cache=true] Enable caching for higher performance.
   */
  constructor(I, A, B, i, Q = {}) {
    super(), this.source = I, this.littleEndian = A, this.bigTiff = B, this.firstIFDOffset = i, this.cache = Q.cache !== !1, this.ifdRequests = [], this.ghostValues = null, this.iccProfileCache = /* @__PURE__ */ new Map(), this.iccProfileCache.set("generic", vI);
  }
  async getSlice(I, A) {
    const B = this.bigTiff ? 4048 : 1024;
    return new $B(
      (await this.source.fetch([{
        offset: I,
        length: typeof A < "u" ? A : B
      }]))[0],
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
    const A = this.bigTiff ? 20 : 12, B = this.bigTiff ? 8 : 2;
    let i = await this.getSlice(I);
    const Q = this.bigTiff ? i.readUint64(I) : i.readUint16(I), t = Q * A + (this.bigTiff ? 16 : 6);
    i.covers(I, t) || (i = await this.getSlice(I, t));
    const E = {}, D = /* @__PURE__ */ new Map();
    let e = I + (this.bigTiff ? 8 : 2);
    for (let a = 0; a < Q; e += A, ++a) {
      const s = i.readUint16(e), r = i.readUint16(e + 2), c = this.bigTiff ? i.readUint64(e + 4) : i.readUint32(e + 4);
      let n, h;
      const l = yI(r), G = e + (this.bigTiff ? 12 : 8);
      if (s === 34675) {
        MC("Using generic ICC profile instead of embedded one"), h = vI;
        const w = cA[s];
        w && (E[w] = h), D.set(s, h);
        continue;
      }
      if (l * c <= (this.bigTiff ? 8 : 4))
        n = fA(i, r, c, G);
      else {
        const w = i.readOffset(G), S = yI(r) * c;
        if (i.covers(w, S))
          n = fA(i, r, c, w);
        else {
          const y = await this.getSlice(w, S);
          n = fA(y, r, c, w);
        }
      }
      c === 1 && kB.indexOf(s) === -1 && !(r === q.RATIONAL || r === q.SRATIONAL) ? h = n[0] : h = n;
      const d = cA[s];
      d && (E[d] = h), D.set(s, h);
    }
    const C = mC(E), o = i.readOffset(
      I + B + A * Q
    );
    return new pC(
      E,
      D,
      C,
      o
    );
  }
  async requestIFD(I) {
    if (this.ifdRequests[I])
      return this.ifdRequests[I];
    if (I === 0)
      return this.ifdRequests[I] = this.parseFileDirectoryAt(this.firstIFDOffset), this.ifdRequests[I];
    if (!this.ifdRequests[I - 1])
      try {
        this.ifdRequests[I - 1] = this.requestIFD(I - 1);
      } catch (A) {
        throw A instanceof HA ? new HA(I) : A;
      }
    return this.ifdRequests[I] = (async () => {
      const A = await this.ifdRequests[I - 1];
      if (A.nextIFDByteOffset === 0)
        throw new HA(I);
      return this.parseFileDirectoryAt(A.nextIFDByteOffset);
    })(), this.ifdRequests[I];
  }
  /**
   * Get the n-th internal subfile of an image. By default, the first is returned.
   *
   * @param {number} [index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  async getImage(I = 0) {
    const A = await this.requestIFD(I);
    return new zB(
      A.fileDirectory,
      A.geoKeyDirectory,
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
      } catch (B) {
        if (B instanceof HA)
          A = !1;
        else
          throw B;
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
    const A = "GDAL_STRUCTURAL_METADATA_SIZE=", B = A.length + 100;
    let i = await this.getSlice(I, B);
    if (A === fA(i, q.ASCII, A.length, I)) {
      const t = fA(i, q.ASCII, B, I).split(`
`)[0], E = Number(t.split("=")[1].split(" ")[0]) + t.length;
      E > B && (i = await this.getSlice(I, E));
      const D = fA(i, q.ASCII, E, I);
      this.ghostValues = {}, D.split(`
`).filter((e) => e.length > 0).map((e) => e.split("=")).forEach(([e, C]) => {
        this.ghostValues[e] = C;
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
  static async fromSource(I, A, B) {
    const i = (await I.fetch([{ offset: 0, length: 1024 }], B))[0], Q = new XB(i), t = Q.getUint16(0, 0);
    let E;
    if (t === 18761)
      E = !0;
    else if (t === 19789)
      E = !1;
    else
      throw new TypeError("Invalid byte order value.");
    const D = Q.getUint16(2, E);
    let e;
    if (D === 42)
      e = !1;
    else if (D === 43) {
      if (e = !0, Q.getUint16(4, E) !== 8)
        throw new Error("Unsupported offset byte-size.");
    } else
      throw new TypeError("Invalid magic number.");
    const C = e ? Q.getUint64(8, E) : Q.getUint32(4, E);
    return new $A(I, E, e, C, A);
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
async function jI(g, I = {}, A) {
  return $A.fromSource(NC(g, I), I, A);
}
async function ZI(g, I = {}, A) {
  return $A.fromSource(kC(g), I, A);
}
class eI {
  constructor() {
    this.promise = new Promise((I, A) => {
      this.reject = A, this.resolve = I;
    });
  }
}
const bC = (g) => {
  var A, B, i;
  const I = /* @__PURE__ */ new Map();
  for (const Q of g) {
    const t = new DOMParser().parseFromString(
      (A = Q.fileDirectory) == null ? void 0 : A.ImageDescription,
      "text/xml"
    ), E = (B = t == null ? void 0 : t.querySelector("Name")) == null ? void 0 : B.textContent, D = (i = t == null ? void 0 : t.querySelector("Color")) == null ? void 0 : i.textContent;
    if (!E)
      continue;
    const e = D ? D.split(",").map((C) => parseInt(C)) : [255, 255, 255];
    I.has(E) || I.set(E, {
      name: E,
      color: e,
      images: []
    }), I.get(E).images.push(Q);
  }
  return I;
};
class DA {
  static RGBAfromYCbCr(I) {
    const A = new Uint8ClampedArray(I.length * 4 / 3);
    let B, i;
    for (B = 0, i = 0; B < I.length; B += 3, i += 4) {
      const Q = I[B], t = I[B + 1], E = I[B + 2];
      A[i] = Q + 1.402 * (E - 128), A[i + 1] = Q - 0.34414 * (t - 128) - 0.71414 * (E - 128), A[i + 2] = Q + 1.772 * (t - 128), A[i + 3] = 255;
    }
    return A;
  }
  static RGBAfromRGB(I) {
    const A = new Uint8ClampedArray(I.length * 4 / 3);
    let B, i;
    for (B = 0, i = 0; B < I.length; B += 3, i += 4)
      A[i] = I[B], A[i + 1] = I[B + 1], A[i + 2] = I[B + 2], A[i + 3] = 255;
    return A;
  }
  static RGBAfromWhiteIsZero(I, A) {
    const B = new Uint8ClampedArray(I.length * 4);
    let i;
    for (let Q = 0, t = 0; Q < I.length; ++Q, t += 4)
      i = 256 - I[Q] / A * 256, B[t] = i, B[t + 1] = i, B[t + 2] = i, B[t + 3] = 255;
    return B;
  }
  static RGBAfromBlackIsZero(I, A) {
    const B = new Uint8ClampedArray(I.length * 4);
    let i;
    for (let Q = 0, t = 0; Q < I.length; ++Q, t += 4)
      i = I[Q] / A * 256, B[t] = i, B[t + 1] = i, B[t + 2] = i, B[t + 3] = 255;
    return B;
  }
  static RGBAfromPalette(I, A) {
    const B = new Uint8ClampedArray(I.length * 4), i = A.length / 3, Q = A.length / 3 * 2;
    for (let t = 0, E = 0; t < I.length; ++t, E += 4) {
      const D = I[t];
      B[E] = A[D] / 65536 * 256, B[E + 1] = A[D + i] / 65536 * 256, B[E + 2] = A[D + Q] / 65536 * 256, B[E + 3] = 255;
    }
    return B;
  }
  static RGBAfromCMYK(I) {
    const A = new Uint8ClampedArray(I.length);
    for (let B = 0, i = 0; B < I.length; B += 4, i += 4) {
      const Q = I[B], t = I[B + 1], E = I[B + 2], D = I[B + 3];
      A[i] = 255 * ((255 - Q) / 256) * ((255 - D) / 256), A[i + 1] = 255 * ((255 - t) / 256) * ((255 - D) / 256), A[i + 2] = 255 * ((255 - E) / 256) * ((255 - D) / 256), A[i + 3] = 255;
    }
    return A;
  }
  static RGBAfromCIELab(I) {
    const Q = new Uint8ClampedArray(I.length * 4 / 3);
    for (let t = 0, E = 0; t < I.length; t += 3, E += 4) {
      const D = I[t + 0], e = I[t + 1] << 24 >> 24, C = I[t + 2] << 24 >> 24;
      let o = (D + 16) / 116, a = e / 500 + o, s = o - C / 200, r, c, n;
      a = 0.95047 * (a * a * a > 8856e-6 ? a * a * a : (a - 16 / 116) / 7.787), o = 1 * (o * o * o > 8856e-6 ? o * o * o : (o - 16 / 116) / 7.787), s = 1.08883 * (s * s * s > 8856e-6 ? s * s * s : (s - 16 / 116) / 7.787), r = a * 3.2406 + o * -1.5372 + s * -0.4986, c = a * -0.9689 + o * 1.8758 + s * 0.0415, n = a * 0.0557 + o * -0.204 + s * 1.057, r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : 12.92 * r, c = c > 31308e-7 ? 1.055 * c ** (1 / 2.4) - 0.055 : 12.92 * c, n = n > 31308e-7 ? 1.055 * n ** (1 / 2.4) - 0.055 : 12.92 * n, Q[E] = Math.max(0, Math.min(1, r)) * 255, Q[E + 1] = Math.max(0, Math.min(1, c)) * 255, Q[E + 2] = Math.max(0, Math.min(1, n)) * 255, Q[E + 3] = 255;
    }
    return Q;
  }
}
function qC(g) {
  if (!g.version || g.version.major < 2 || g.version.major == 2 && g.version.minor < 3) {
    console.error("This version of OpenSeadragon is too old to support this monkey patch");
    return;
  }
  if (g.ImageJob)
    return;
  function I(B) {
    g.extend(
      !0,
      this,
      {
        timeout: g.DEFAULT_SETTINGS.timeout,
        jobId: null
      },
      B
    ), this.image = null;
  }
  I.prototype = {
    errorMsg: null,
    /**
     * Starts the image job.
     * @method
     */
    start: function() {
      var B = this, i = this.abort;
      this.image = new Image(), this.image.onload = function() {
        B.finish(!0);
      }, this.image.onabort = this.image.onerror = function() {
        B.errorMsg = "Image load aborted", B.finish(!1);
      }, this.jobId = window.setTimeout(function() {
        B.errorMsg = "Image load exceeded timeout (" + B.timeout + " ms)", B.finish(!1);
      }, this.timeout), this.loadWithAjax ? (this.request = g.makeAjaxRequest({
        url: this.src,
        withCredentials: this.ajaxWithCredentials,
        headers: this.ajaxHeaders,
        responseType: "arraybuffer",
        postData: this.postData,
        success: function(Q) {
          var t;
          try {
            t = new window.Blob([Q.response]);
          } catch (C) {
            var E = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            if (C.name === "TypeError" && E) {
              var D = new E();
              D.append(Q.response), t = D.getBlob();
            }
          }
          t.size === 0 && (B.errorMsg = "Empty image response.", B.finish(!1));
          var e = (window.URL || window.webkitURL).createObjectURL(t);
          B.image.src = e;
        },
        error: function(Q) {
          B.errorMsg = "Image load aborted - XHR error: Ajax returned " + Q.status, B.finish(!1);
        }
      }), this.abort = function() {
        B.request.abort(), typeof i == "function" && i();
      }) : (this.crossOriginPolicy !== !1 && (this.image.crossOrigin = this.crossOriginPolicy), this.src.fetch ? this.src.fetch().then((Q) => this.image.src = Q) : this.image.src = this.src);
    },
    finish: function(B) {
      this.image.onload = this.image.onerror = this.image.onabort = null, B || (this.image = null), this.jobId && window.clearTimeout(this.jobId), this.callback(this);
    }
  };
  function A(B, i, Q) {
    var t;
    B.jobsInProgress--, (!B.jobLimit || B.jobsInProgress < B.jobLimit) && B.jobQueue.length > 0 && (t = B.jobQueue.shift(), t.start(), B.jobsInProgress++), Q(i.image, i.errorMsg, i.request);
  }
  g.ImageLoader.prototype.addJob = function(B) {
    var i = this, Q = function(D) {
      A(i, D, B.callback);
    }, t = {
      src: B.src,
      loadWithAjax: B.loadWithAjax,
      ajaxHeaders: B.loadWithAjax ? B.ajaxHeaders : null,
      crossOriginPolicy: B.crossOriginPolicy,
      ajaxWithCredentials: B.ajaxWithCredentials,
      postData: B.postData,
      callback: Q,
      abort: B.abort,
      timeout: this.timeout
    }, E = new I(t);
    !this.jobLimit || this.jobsInProgress < this.jobLimit ? (E.start(), this.jobsInProgress++) : this.jobQueue.push(E);
  }, g.Tile.prototype._hasTransparencyChannel = function() {
    return !1;
  };
}
console.log("Loading GeoTIFF Tile Source from 2025.10.09  ...");
const TC = (g) => {
  let I = 0;
  const B = class B extends g.TileSource {
    constructor(t, E = { logLatency: !1 }) {
      super();
      /**
       * Return the tileWidth for a given level.
       * @function
       * @param {Number} level
       */
      z(this, "getTileWidth", (t) => {
        if (this.levels.length > t)
          return this.levels[t].tileWidth;
      });
      /**
       * Return the tileHeight for a given level.
       * @function
       * @param {Number} level
       */
      z(this, "getTileHeight", (t) => {
        if (this.levels.length > t)
          return this.levels[t].tileHeight;
      });
      /**
       * @function
       * @param {Number} level
       */
      z(this, "getLevelScale", (t) => {
        let E = NaN;
        return this.levels.length > 0 && t >= this.minLevel && t <= this.maxLevel && (E = this.levels[t].width / this.levels[this.maxLevel].width), E;
      });
      /**
       * Handle maintaining unique caches per channel in multi-channel images
       */
      z(this, "getTileHashKey", (t, E, D) => {
        var e;
        return `geotiffTileSource${this._tsCounter}_${((e = this == null ? void 0 : this.channel) == null ? void 0 : e.name) ?? ""}_${t}_${E}_${D}`;
      });
      /**
       * Implement function here instead of as custom tile source in client code
       * @function
       * @param {Number} levelnum
       * @param {Number} x
       * @param {Number} y
       */
      z(this, "getTileUrl", (t, E, D) => {
        let e = this.levels[t], C = new String(`${t}/${E}_${D}`);
        return C.fetch = /* @__PURE__ */ ((o, a, s, r, c) => () => this.regionToDataUrl.call(o, a, s, r, c))(this, e, E, D, C), C;
      });
      z(this, "downloadTileStart", (t) => {
        t.src.fetch().then((E) => {
          let D = new Image(), e = "" + t.src;
          D.onload = function() {
            t.finish(D);
          }, D.onerror = D.onabort = function() {
            t.finish(null, e, "Request aborted");
          }, D.src = E;
        });
      });
      z(this, "downloadTileAbort", (t) => {
        t.src.abortController && t.src.abortController.abort();
      });
      z(this, "setupComplete", () => {
        this._ready = !0, this.promises.ready.resolve(), this.raiseEvent("ready", { tileSource: this });
      });
      z(this, "setupLevels", () => {
        if (this._ready)
          return;
        let t = this.GeoTIFFImages.sort((a, s) => s.getWidth() - a.getWidth()), E = this._tileSize, D = this._tileSize, e = t[0].getWidth();
        this.width = e;
        let C = t[0].getHeight();
        if (this.height = C, this.tileOverlap = 0, this.minLevel = 0, this.aspectRatio = this.width / this.height, this.dimensions = new g.Point(this.width, this.height), t.reduce(
          (a, s) => (a.width !== -1 && (a.valid = a.valid && s.getWidth() < a.width), a.width = s.getWidth(), a),
          { valid: !0, width: -1 }
        ).valid)
          this.levels = t.map((a) => {
            let s = a.getWidth(), r = a.getHeight();
            return {
              width: s,
              height: r,
              tileWidth: this.options.tileWidth || a.getTileWidth() || E,
              tileHeight: this.options.tileHeight || a.getTileHeight() || D,
              image: a,
              scaleFactor: 1
            };
          }), this.maxLevel = this.levels.length - 1;
        else {
          let a = Math.ceil(
            Math.log2(Math.max(e / E, C / D))
          ), s = [...Array(a).keys()].filter((r) => r % 2 == 0);
          this.levels = s.map((r) => {
            let c = Math.pow(2, r);
            const n = t.filter((l) => {
              const G = Math.pow(2, r - 1);
              return G >= 0 ? l.getWidth() * G < e && l.getWidth() * c >= e : l.getWidth() * c >= e;
            });
            if (n.length === 0)
              return null;
            const h = n[0];
            return {
              width: e / c,
              height: C / c,
              tileWidth: this.options.tileWidth || h.getTileWidth() || E,
              tileHeight: this.options.tileHeight || h.getTileHeight() || D,
              image: h,
              scaleFactor: c * h.getWidth() / e
            };
          }).filter((r) => r !== null), this.maxLevel = this.levels.length - 1;
        }
        this.levels = this.levels.sort((a, s) => a.width - s.width), this._tileWidth = this.levels[0].tileWidth, this._tileHeight = this.levels[0].tileHeight, this.setupComplete();
      });
      z(this, "regionToDataUrl", (t, E, D, e) => {
        var l, G, f, d, w;
        let C = this.options.logLatency && Date.now(), a = (e.abortController = new AbortController()).signal;
        const s = t.tileWidth, r = t.tileHeight, c = [E * s, D * r, (E + 1) * s, (D + 1) * r].map(
          (S) => S * t.scaleFactor
        ), n = t.image;
        if ((G = (l = n.fileDirectory) == null ? void 0 : l.Software) == null ? void 0 : G.startsWith("PerkinElmer-QPI")) {
          const S = new DOMParser().parseFromString(
            (f = n.fileDirectory) == null ? void 0 : f.ImageDescription,
            "text/xml"
          );
          (d = S.querySelector("Name")) == null || d.textContent;
          const y = (w = S.querySelector("Color")) == null ? void 0 : w.textContent, u = y ? y.split(",").map((k) => parseInt(k)) : [255, 255, 255];
          return t.image.readRGB({
            interleave: !0,
            window: c,
            pool: this._pool,
            width: t.tileWidth,
            height: t.tileHeight,
            signal: a
          }).then((k) => {
            let F = document.createElement("canvas");
            F.width = t.tileWidth, F.height = t.tileHeight;
            let U = F.getContext("2d"), L = new Uint8ClampedArray(4 * F.width * F.height), x = new Uint8ClampedArray(k), R, N;
            for (R = 0, N = 0; R < x.length; R += 3, N += 4)
              L[N] = x[R] * u[0] / 255, L[N + 1] = x[R + 1] * u[1] / 255, L[N + 2] = x[R + 2] * u[2] / 255, L[N + 3] = 255;
            const Y = U.createImageData(F.width, F.height);
            Y.data.set(L), U.putImageData(Y, 0, 0);
            let M = F.toDataURL("image/jpeg", 0.8);
            return this.options.logLatency && (typeof this.options.logLatency == "function" ? this.options.logLatency : console.log)("Tile latency (ms):", Date.now() - C), M;
          });
        } else
          return t.image.getTileOrStrip(E, D, null, this._pool, a).then((S) => {
            let y = new Uint8ClampedArray(S.data), u = document.createElement("canvas");
            u.width = t.tileWidth, u.height = t.tileHeight;
            let k = u.getContext("2d"), F = t.image.fileDirectory.PhotometricInterpretation, U;
            if (y.length / (u.width * u.height) % 4 === 0)
              U = y;
            else
              switch (F) {
                case W.WhiteIsZero:
                  U = DA.RGBAfromWhiteIsZero(
                    y,
                    2 ** t.image.fileDirectory.BitsPerSample[0]
                  );
                  break;
                case W.BlackIsZero:
                  U = DA.RGBAfromBlackIsZero(
                    y,
                    2 ** t.image.fileDirectory.BitsPerSample[0]
                  );
                  break;
                case W.RGB:
                  U = DA.RGBAfromRGB(y);
                  break;
                case W.Palette:
                  U = DA.RGBAfromPalette(y, 2 ** t.image.fileDirectory.colorMap);
                  break;
                case W.CMYK:
                  U = DA.RGBAfromCMYK(y);
                  break;
                case W.YCbCr:
                  U = DA.RGBAfromYCbCr(y);
                  break;
                case W.CIELab:
                  U = DA.RGBAfromCIELab(y);
                  break;
              }
            const L = k.createImageData(u.width, u.height);
            L.data.set(U), k.putImageData(L, 0, 0);
            let x = u.toDataURL("image/jpeg", 0.8);
            return this.options.logLatency && (typeof this.options.logLatency == "function" ? this.options.logLatency : console.log)(
              "Tile latency (ms):",
              Date.now() - C
            ), x;
          });
      });
      B._osdReady || B.applyOSDPatch(g);
      let D = this;
      this.input = t, this.options = E, this.channel = (t == null ? void 0 : t.channel) ?? null, this._ready = !1, this._pool = B.sharedPool, this._tileSize = 256, this._tsCounter = I, I += 1, t.GeoTIFF && t.GeoTIFFImages ? (this.promises = {
        GeoTIFF: Promise.resolve(t.GeoTIFF),
        GeoTIFFImages: Promise.resolve(t.GeoTIFFImages),
        ready: new eI()
      }, this.GeoTIFF = t.GeoTIFF, this.imageCount = t.GeoTIFFImages.length, this.GeoTIFFImages = t.GeoTIFFImages, this.setupLevels()) : (this.promises = {
        GeoTIFF: t instanceof File ? ZI(t) : jI(t),
        GeoTIFFImages: new eI(),
        ready: new eI()
      }, this.promises.GeoTIFF.then((e) => (D.GeoTIFF = e, e.getImageCount())).then((e) => {
        D.imageCount = e;
        let C = [...Array(e).keys()].map((o) => D.GeoTIFF.getImage(o));
        return Promise.all(C);
      }).then((e) => {
        D.GeoTIFFImages = e, D.promises.GeoTIFFImages.resolve(e), this.setupLevels();
      }).catch((e) => {
        throw console.error("Re-throwing error with GeoTIFF:", e), e;
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
  z(B, "sharedPool", new QC()), z(B, "_osdReady", !1), // Apply ImageJob patch to OpenSeadragon. Can be extended for modular patches.
  z(B, "applyOSDPatch", (t) => {
    qC(t), B._osdReady = !0;
  }), z(B, "getAllTileSources", async (t, E) => {
    const D = t instanceof File ? t.name.split(".").pop() : t.split(".").pop();
    let e = t instanceof File ? ZI(t) : jI(t);
    return e.then((C) => (e = C, C.getImageCount())).then(
      (C) => Promise.all([...Array(C).keys()].map(async (o) => (await e).getImage(o)))
    ).then((C) => {
      C = C.filter(
        (r) => r.fileDirectory.photometricInterpretation !== W.TransparencyMask
      ), C.sort((r, c) => c.getWidth() - r.getWidth());
      const o = 0.015;
      return C.reduce((r, c) => {
        const n = c.getWidth() / c.getHeight();
        let h = "";
        c.fileDirectory.ImageDescription && (h = c.fileDirectory.ImageDescription.split(`
`)[1] ?? "");
        const l = r.filter(
          (G) => Math.abs(1 - G.aspectRatio / n) < o && !(h != null && h.includes("macro") || h != null && h.includes("label"))
          // Separate out macro thumbnails and labels
        );
        if (l.length === 0) {
          let G = {
            aspectRatio: n,
            images: [c]
          };
          r.push(G);
        } else
          l[0].images.push(c);
        return r;
      }, []).map((r) => r.images).map((r, c) => {
        if (c !== 0)
          return new g.GeoTIFFTileSource(
            {
              GeoTIFF: e,
              GeoTIFFImages: r
            },
            E
          );
        switch (D) {
          case "qptiff":
            const n = bC(r);
            return Array.from(n.values()).map((h, l) => new g.GeoTIFFTileSource(
              {
                GeoTIFF: e,
                GeoTIFFImages: h.images,
                channel: {
                  name: h.name,
                  color: h.color
                }
              },
              E
            ));
          default:
            return new g.GeoTIFFTileSource(
              {
                GeoTIFF: e,
                GeoTIFFImages: r
              },
              E
            );
        }
      });
    });
  });
  let A = B;
  g.GeoTIFFTileSource = A;
};
(function(g, I) {
  typeof exports > "u" || typeof g.OpenSeadragon < "u" && I(g.OpenSeadragon);
})(typeof window < "u" ? window : void 0, TC);
class OC extends nA {
  decodeBlock(I) {
    return I;
  }
}
const vC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: OC
}, Symbol.toStringTag, { value: "Module" })), PI = 9, iI = 256, SI = 257, jC = 12;
function ZC(g, I, A) {
  const B = I % 8, i = Math.floor(I / 8), Q = 8 - B, t = I + A - (i + 1) * 8;
  let E = 8 * (i + 2) - (I + A);
  const D = (i + 2) * 8 - I;
  if (E = Math.max(0, E), i >= g.length)
    return console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)"), SI;
  let e = g[i] & 2 ** (8 - B) - 1;
  e <<= A - Q;
  let C = e;
  if (i + 1 < g.length) {
    let o = g[i + 1] >>> E;
    o <<= Math.max(0, A - D), C += o;
  }
  if (t > 8 && i + 2 < g.length) {
    const o = (i + 3) * 8 - (I + A), a = g[i + 2] >>> o;
    C += a;
  }
  return C;
}
function EI(g, I) {
  for (let A = I.length - 1; A >= 0; A--)
    g.push(I[A]);
  return g;
}
function PC(g) {
  const I = new Uint16Array(4093), A = new Uint8Array(4093);
  for (let r = 0; r <= 257; r++)
    I[r] = 4096, A[r] = r;
  let B = 258, i = PI, Q = 0;
  function t() {
    B = 258, i = PI;
  }
  function E(r) {
    const c = ZC(r, Q, i);
    return Q += i, c;
  }
  function D(r, c) {
    return A[B] = c, I[B] = r, B++, B - 1;
  }
  function e(r) {
    const c = [];
    for (let n = r; n !== 4096; n = I[n])
      c.push(A[n]);
    return c;
  }
  const C = [];
  t();
  const o = new Uint8Array(g);
  let a = E(o), s;
  for (; a !== SI; ) {
    if (a === iI) {
      for (t(), a = E(o); a === iI; )
        a = E(o);
      if (a === SI)
        break;
      if (a > iI)
        throw new Error(`corrupted code at scanline ${a}`);
      {
        const r = e(a);
        EI(C, r), s = a;
      }
    } else if (a < B) {
      const r = e(a);
      EI(C, r), D(s, r[r.length - 1]), s = a;
    } else {
      const r = e(s);
      if (!r)
        throw new Error(`Bogus entry. Not in dictionary, ${s} / ${B}, position: ${Q}`);
      EI(C, r), C.push(r[r.length - 1]), D(s, r[r.length - 1]), s = a;
    }
    B + 1 >= 2 ** i && (i === jC ? s = void 0 : i++), a = E(o);
  }
  return new Uint8Array(C);
}
class VC extends nA {
  decodeBlock(I) {
    return PC(I).buffer;
  }
}
const WC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VC
}, Symbol.toStringTag, { value: "Module" })), UA = new Int32Array([
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
]), mA = 4017, pA = 799, xA = 3406, bA = 2276, qA = 1567, TA = 3784, yA = 5793, OA = 2896;
function VI(g, I) {
  let A = 0;
  const B = [];
  let i = 16;
  for (; i > 0 && !g[i - 1]; )
    --i;
  B.push({ children: [], index: 0 });
  let Q = B[0], t;
  for (let E = 0; E < i; E++) {
    for (let D = 0; D < g[E]; D++) {
      for (Q = B.pop(), Q.children[Q.index] = I[A]; Q.index > 0; )
        Q = B.pop();
      for (Q.index++, B.push(Q); B.length <= E; )
        B.push(t = { children: [], index: 0 }), Q.children[Q.index] = t.children, Q = t;
      A++;
    }
    E + 1 < i && (B.push(t = { children: [], index: 0 }), Q.children[Q.index] = t.children, Q = t);
  }
  return B[0].children;
}
function _C(g, I, A, B, i, Q, t, E, D) {
  const { mcusPerLine: e, progressive: C } = A, o = I;
  let a = I, s = 0, r = 0;
  function c() {
    if (r > 0)
      return r--, s >> r & 1;
    if (s = g[a++], s === 255) {
      const K = g[a++];
      if (K)
        throw new Error(`unexpected marker: ${(s << 8 | K).toString(16)}`);
    }
    return r = 7, s >>> 7;
  }
  function n(K) {
    let b = K, p;
    for (; (p = c()) !== null; ) {
      if (b = b[p], typeof b == "number")
        return b;
      if (typeof b != "object")
        throw new Error("invalid huffman sequence");
    }
    return null;
  }
  function h(K) {
    let b = K, p = 0;
    for (; b > 0; ) {
      const T = c();
      if (T === null)
        return;
      p = p << 1 | T, --b;
    }
    return p;
  }
  function l(K) {
    const b = h(K);
    return b >= 1 << K - 1 ? b : b + (-1 << K) + 1;
  }
  function G(K, b) {
    const p = n(K.huffmanTableDC), T = p === 0 ? 0 : l(p);
    K.pred += T, b[0] = K.pred;
    let v = 1;
    for (; v < 64; ) {
      const V = n(K.huffmanTableAC), _ = V & 15, $ = V >> 4;
      if (_ === 0) {
        if ($ < 15)
          break;
        v += 16;
      } else {
        v += $;
        const X = UA[v];
        b[X] = l(_), v++;
      }
    }
  }
  function f(K, b) {
    const p = n(K.huffmanTableDC), T = p === 0 ? 0 : l(p) << D;
    K.pred += T, b[0] = K.pred;
  }
  function d(K, b) {
    b[0] |= c() << D;
  }
  let w = 0;
  function S(K, b) {
    if (w > 0) {
      w--;
      return;
    }
    let p = Q;
    const T = t;
    for (; p <= T; ) {
      const v = n(K.huffmanTableAC), V = v & 15, _ = v >> 4;
      if (V === 0) {
        if (_ < 15) {
          w = h(_) + (1 << _) - 1;
          break;
        }
        p += 16;
      } else {
        p += _;
        const $ = UA[p];
        b[$] = l(V) * (1 << D), p++;
      }
    }
  }
  let y = 0, u;
  function k(K, b) {
    let p = Q;
    const T = t;
    let v = 0;
    for (; p <= T; ) {
      const V = UA[p], _ = b[V] < 0 ? -1 : 1;
      switch (y) {
        case 0: {
          const $ = n(K.huffmanTableAC), X = $ & 15;
          if (v = $ >> 4, X === 0)
            v < 15 ? (w = h(v) + (1 << v), y = 4) : (v = 16, y = 1);
          else {
            if (X !== 1)
              throw new Error("invalid ACn encoding");
            u = l(X), y = v ? 2 : 3;
          }
          continue;
        }
        case 1:
        case 2:
          b[V] ? b[V] += (c() << D) * _ : (v--, v === 0 && (y = y === 2 ? 3 : 0));
          break;
        case 3:
          b[V] ? b[V] += (c() << D) * _ : (b[V] = u << D, y = 0);
          break;
        case 4:
          b[V] && (b[V] += (c() << D) * _);
          break;
      }
      p++;
    }
    y === 4 && (w--, w === 0 && (y = 0));
  }
  function F(K, b, p, T, v) {
    const V = p / e | 0, _ = p % e, $ = V * K.v + T, X = _ * K.h + v;
    b(K, K.blocks[$][X]);
  }
  function U(K, b, p) {
    const T = p / K.blocksPerLine | 0, v = p % K.blocksPerLine;
    b(K, K.blocks[T][v]);
  }
  const L = B.length;
  let x, R, N, Y, M, J;
  C ? Q === 0 ? J = E === 0 ? f : d : J = E === 0 ? S : k : J = G;
  let m = 0, H, O;
  L === 1 ? O = B[0].blocksPerLine * B[0].blocksPerColumn : O = e * A.mcusPerColumn;
  const j = i || O;
  for (; m < O; ) {
    for (R = 0; R < L; R++)
      B[R].pred = 0;
    if (w = 0, L === 1)
      for (x = B[0], M = 0; M < j; M++)
        U(x, J, m), m++;
    else
      for (M = 0; M < j; M++) {
        for (R = 0; R < L; R++) {
          x = B[R];
          const { h: K, v: b } = x;
          for (N = 0; N < b; N++)
            for (Y = 0; Y < K; Y++)
              F(x, J, m, N, Y);
        }
        if (m++, m === O)
          break;
      }
    if (r = 0, H = g[a] << 8 | g[a + 1], H < 65280)
      throw new Error("marker was not found");
    if (H >= 65488 && H <= 65495)
      a += 2;
    else
      break;
  }
  return a - o;
}
function zC(g, I) {
  const A = [], { blocksPerLine: B, blocksPerColumn: i } = I, Q = B << 3, t = new Int32Array(64), E = new Uint8Array(64);
  function D(e, C, o) {
    const a = I.quantizationTable;
    let s, r, c, n, h, l, G, f, d;
    const w = o;
    let S;
    for (S = 0; S < 64; S++)
      w[S] = e[S] * a[S];
    for (S = 0; S < 8; ++S) {
      const y = 8 * S;
      if (w[1 + y] === 0 && w[2 + y] === 0 && w[3 + y] === 0 && w[4 + y] === 0 && w[5 + y] === 0 && w[6 + y] === 0 && w[7 + y] === 0) {
        d = yA * w[0 + y] + 512 >> 10, w[0 + y] = d, w[1 + y] = d, w[2 + y] = d, w[3 + y] = d, w[4 + y] = d, w[5 + y] = d, w[6 + y] = d, w[7 + y] = d;
        continue;
      }
      s = yA * w[0 + y] + 128 >> 8, r = yA * w[4 + y] + 128 >> 8, c = w[2 + y], n = w[6 + y], h = OA * (w[1 + y] - w[7 + y]) + 128 >> 8, f = OA * (w[1 + y] + w[7 + y]) + 128 >> 8, l = w[3 + y] << 4, G = w[5 + y] << 4, d = s - r + 1 >> 1, s = s + r + 1 >> 1, r = d, d = c * TA + n * qA + 128 >> 8, c = c * qA - n * TA + 128 >> 8, n = d, d = h - G + 1 >> 1, h = h + G + 1 >> 1, G = d, d = f + l + 1 >> 1, l = f - l + 1 >> 1, f = d, d = s - n + 1 >> 1, s = s + n + 1 >> 1, n = d, d = r - c + 1 >> 1, r = r + c + 1 >> 1, c = d, d = h * bA + f * xA + 2048 >> 12, h = h * xA - f * bA + 2048 >> 12, f = d, d = l * pA + G * mA + 2048 >> 12, l = l * mA - G * pA + 2048 >> 12, G = d, w[0 + y] = s + f, w[7 + y] = s - f, w[1 + y] = r + G, w[6 + y] = r - G, w[2 + y] = c + l, w[5 + y] = c - l, w[3 + y] = n + h, w[4 + y] = n - h;
    }
    for (S = 0; S < 8; ++S) {
      const y = S;
      if (w[1 * 8 + y] === 0 && w[2 * 8 + y] === 0 && w[3 * 8 + y] === 0 && w[4 * 8 + y] === 0 && w[5 * 8 + y] === 0 && w[6 * 8 + y] === 0 && w[7 * 8 + y] === 0) {
        d = yA * o[S + 0] + 8192 >> 14, w[0 * 8 + y] = d, w[1 * 8 + y] = d, w[2 * 8 + y] = d, w[3 * 8 + y] = d, w[4 * 8 + y] = d, w[5 * 8 + y] = d, w[6 * 8 + y] = d, w[7 * 8 + y] = d;
        continue;
      }
      s = yA * w[0 * 8 + y] + 2048 >> 12, r = yA * w[4 * 8 + y] + 2048 >> 12, c = w[2 * 8 + y], n = w[6 * 8 + y], h = OA * (w[1 * 8 + y] - w[7 * 8 + y]) + 2048 >> 12, f = OA * (w[1 * 8 + y] + w[7 * 8 + y]) + 2048 >> 12, l = w[3 * 8 + y], G = w[5 * 8 + y], d = s - r + 1 >> 1, s = s + r + 1 >> 1, r = d, d = c * TA + n * qA + 2048 >> 12, c = c * qA - n * TA + 2048 >> 12, n = d, d = h - G + 1 >> 1, h = h + G + 1 >> 1, G = d, d = f + l + 1 >> 1, l = f - l + 1 >> 1, f = d, d = s - n + 1 >> 1, s = s + n + 1 >> 1, n = d, d = r - c + 1 >> 1, r = r + c + 1 >> 1, c = d, d = h * bA + f * xA + 2048 >> 12, h = h * xA - f * bA + 2048 >> 12, f = d, d = l * pA + G * mA + 2048 >> 12, l = l * mA - G * pA + 2048 >> 12, G = d, w[0 * 8 + y] = s + f, w[7 * 8 + y] = s - f, w[1 * 8 + y] = r + G, w[6 * 8 + y] = r - G, w[2 * 8 + y] = c + l, w[5 * 8 + y] = c - l, w[3 * 8 + y] = n + h, w[4 * 8 + y] = n - h;
    }
    for (S = 0; S < 64; ++S) {
      const y = 128 + (w[S] + 8 >> 4);
      y < 0 ? C[S] = 0 : y > 255 ? C[S] = 255 : C[S] = y;
    }
  }
  for (let e = 0; e < i; e++) {
    const C = e << 3;
    for (let o = 0; o < 8; o++)
      A.push(new Uint8Array(Q));
    for (let o = 0; o < B; o++) {
      D(I.blocks[e][o], E, t);
      let a = 0;
      const s = o << 3;
      for (let r = 0; r < 8; r++) {
        const c = A[C + r];
        for (let n = 0; n < 8; n++)
          c[s + n] = E[a++];
      }
    }
  }
  return A;
}
class XC {
  constructor() {
    this.jfif = null, this.adobe = null, this.quantizationTables = [], this.huffmanTablesAC = [], this.huffmanTablesDC = [], this.resetFrames();
  }
  resetFrames() {
    this.frames = [];
  }
  parse(I) {
    let A = 0;
    function B() {
      const E = I[A] << 8 | I[A + 1];
      return A += 2, E;
    }
    function i() {
      const E = B(), D = I.subarray(A, A + E - 2);
      return A += D.length, D;
    }
    function Q(E) {
      let D = 0, e = 0, C, o;
      for (o in E.components)
        E.components.hasOwnProperty(o) && (C = E.components[o], D < C.h && (D = C.h), e < C.v && (e = C.v));
      const a = Math.ceil(E.samplesPerLine / 8 / D), s = Math.ceil(E.scanLines / 8 / e);
      for (o in E.components)
        if (E.components.hasOwnProperty(o)) {
          C = E.components[o];
          const r = Math.ceil(Math.ceil(E.samplesPerLine / 8) * C.h / D), c = Math.ceil(Math.ceil(E.scanLines / 8) * C.v / e), n = a * C.h, h = s * C.v, l = [];
          for (let G = 0; G < h; G++) {
            const f = [];
            for (let d = 0; d < n; d++)
              f.push(new Int32Array(64));
            l.push(f);
          }
          C.blocksPerLine = r, C.blocksPerColumn = c, C.blocks = l;
        }
      E.maxH = D, E.maxV = e, E.mcusPerLine = a, E.mcusPerColumn = s;
    }
    let t = B();
    if (t !== 65496)
      throw new Error("SOI not found");
    for (t = B(); t !== 65497; ) {
      switch (t) {
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
          const E = i();
          t === 65504 && E[0] === 74 && E[1] === 70 && E[2] === 73 && E[3] === 70 && E[4] === 0 && (this.jfif = {
            version: { major: E[5], minor: E[6] },
            densityUnits: E[7],
            xDensity: E[8] << 8 | E[9],
            yDensity: E[10] << 8 | E[11],
            thumbWidth: E[12],
            thumbHeight: E[13],
            thumbData: E.subarray(14, 14 + 3 * E[12] * E[13])
          }), t === 65518 && E[0] === 65 && E[1] === 100 && E[2] === 111 && E[3] === 98 && E[4] === 101 && E[5] === 0 && (this.adobe = {
            version: E[6],
            flags0: E[7] << 8 | E[8],
            flags1: E[9] << 8 | E[10],
            transformCode: E[11]
          });
          break;
        }
        case 65499: {
          const D = B() + A - 2;
          for (; A < D; ) {
            const e = I[A++], C = new Int32Array(64);
            if (e >> 4)
              if (e >> 4 === 1)
                for (let o = 0; o < 64; o++) {
                  const a = UA[o];
                  C[a] = B();
                }
              else
                throw new Error("DQT: invalid table spec");
            else for (let o = 0; o < 64; o++) {
              const a = UA[o];
              C[a] = I[A++];
            }
            this.quantizationTables[e & 15] = C;
          }
          break;
        }
        case 65472:
        case 65473:
        case 65474: {
          B();
          const E = {
            extended: t === 65473,
            progressive: t === 65474,
            precision: I[A++],
            scanLines: B(),
            samplesPerLine: B(),
            components: {},
            componentsOrder: []
          }, D = I[A++];
          let e;
          for (let C = 0; C < D; C++) {
            e = I[A];
            const o = I[A + 1] >> 4, a = I[A + 1] & 15, s = I[A + 2];
            E.componentsOrder.push(e), E.components[e] = {
              h: o,
              v: a,
              quantizationIdx: s
            }, A += 3;
          }
          Q(E), this.frames.push(E);
          break;
        }
        case 65476: {
          const E = B();
          for (let D = 2; D < E; ) {
            const e = I[A++], C = new Uint8Array(16);
            let o = 0;
            for (let s = 0; s < 16; s++, A++)
              C[s] = I[A], o += C[s];
            const a = new Uint8Array(o);
            for (let s = 0; s < o; s++, A++)
              a[s] = I[A];
            D += 17 + o, e >> 4 ? this.huffmanTablesAC[e & 15] = VI(
              C,
              a
            ) : this.huffmanTablesDC[e & 15] = VI(
              C,
              a
            );
          }
          break;
        }
        case 65501:
          B(), this.resetInterval = B();
          break;
        case 65498: {
          B();
          const E = I[A++], D = [], e = this.frames[0];
          for (let r = 0; r < E; r++) {
            const c = e.components[I[A++]], n = I[A++];
            c.huffmanTableDC = this.huffmanTablesDC[n >> 4], c.huffmanTableAC = this.huffmanTablesAC[n & 15], D.push(c);
          }
          const C = I[A++], o = I[A++], a = I[A++], s = _C(
            I,
            A,
            e,
            D,
            this.resetInterval,
            C,
            o,
            a >> 4,
            a & 15
          );
          A += s;
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
          throw new Error(`unknown JPEG marker ${t.toString(16)}`);
      }
      t = B();
    }
  }
  getResult() {
    const { frames: I } = this;
    if (this.frames.length === 0)
      throw new Error("no frames were decoded");
    this.frames.length > 1 && console.warn("more than one frame is not supported");
    for (let C = 0; C < this.frames.length; C++) {
      const o = this.frames[C].components;
      for (const a of Object.keys(o))
        o[a].quantizationTable = this.quantizationTables[o[a].quantizationIdx], delete o[a].quantizationIdx;
    }
    const A = I[0], { components: B, componentsOrder: i } = A, Q = [], t = A.samplesPerLine, E = A.scanLines;
    for (let C = 0; C < i.length; C++) {
      const o = B[i[C]];
      Q.push({
        lines: zC(A, o),
        scaleX: o.h / A.maxH,
        scaleY: o.v / A.maxV
      });
    }
    const D = new Uint8Array(t * E * Q.length);
    let e = 0;
    for (let C = 0; C < E; ++C)
      for (let o = 0; o < t; ++o)
        for (let a = 0; a < Q.length; ++a) {
          const s = Q[a];
          D[e] = s.lines[0 | C * s.scaleY][0 | o * s.scaleX], ++e;
        }
    return D;
  }
}
class $C extends nA {
  constructor(I) {
    super(), this.reader = new XC(), I.JPEGTables && this.reader.parse(I.JPEGTables);
  }
  decodeBlock(I) {
    try {
      return this.reader.resetFrames(), this.reader.parse(new Uint8Array(I)), this.reader.getResult().buffer;
    } catch (A) {
      if (A.message === "SOI not found") {
        console.warn("Suppressed JPEG decoding error: SOI not found");
        const B = new ArrayBuffer(4), i = new Uint8Array(B);
        return i[0] = 0, i[1] = 0, i[2] = 0, i[3] = 0, B;
      }
      throw A;
    }
  }
}
const AQ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $C
}, Symbol.toStringTag, { value: "Module" }));
function NA(g) {
  let I = g.length;
  for (; --I >= 0; )
    g[I] = 0;
}
const IQ = 3, gQ = 258, qg = 29, BQ = 256, CQ = BQ + 1 + qg, Tg = 30, QQ = 512, eQ = new Array((CQ + 2) * 2);
NA(eQ);
const iQ = new Array(Tg * 2);
NA(iQ);
const EQ = new Array(QQ);
NA(EQ);
const tQ = new Array(gQ - IQ + 1);
NA(tQ);
const oQ = new Array(qg);
NA(oQ);
const sQ = new Array(Tg);
NA(sQ);
const rQ = (g, I, A, B) => {
  let i = g & 65535 | 0, Q = g >>> 16 & 65535 | 0, t = 0;
  for (; A !== 0; ) {
    t = A > 2e3 ? 2e3 : A, A -= t;
    do
      i = i + I[B++] | 0, Q = Q + i | 0;
    while (--t);
    i %= 65521, Q %= 65521;
  }
  return i | Q << 16 | 0;
};
var GI = rQ;
const aQ = () => {
  let g, I = [];
  for (var A = 0; A < 256; A++) {
    g = A;
    for (var B = 0; B < 8; B++)
      g = g & 1 ? 3988292384 ^ g >>> 1 : g >>> 1;
    I[A] = g;
  }
  return I;
}, nQ = new Uint32Array(aQ()), hQ = (g, I, A, B) => {
  const i = nQ, Q = B + A;
  g ^= -1;
  for (let t = B; t < Q; t++)
    g = g >>> 8 ^ i[(g ^ I[t]) & 255];
  return g ^ -1;
};
var QA = hQ, dI = {
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
}, Og = {
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
const DQ = (g, I) => Object.prototype.hasOwnProperty.call(g, I);
var cQ = function(g) {
  const I = Array.prototype.slice.call(arguments, 1);
  for (; I.length; ) {
    const A = I.shift();
    if (A) {
      if (typeof A != "object")
        throw new TypeError(A + "must be non-object");
      for (const B in A)
        DQ(A, B) && (g[B] = A[B]);
    }
  }
  return g;
}, wQ = (g) => {
  let I = 0;
  for (let B = 0, i = g.length; B < i; B++)
    I += g[B].length;
  const A = new Uint8Array(I);
  for (let B = 0, i = 0, Q = g.length; B < Q; B++) {
    let t = g[B];
    A.set(t, i), i += t.length;
  }
  return A;
}, vg = {
  assign: cQ,
  flattenChunks: wQ
};
let jg = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  jg = !1;
}
const MA = new Uint8Array(256);
for (let g = 0; g < 256; g++)
  MA[g] = g >= 252 ? 6 : g >= 248 ? 5 : g >= 240 ? 4 : g >= 224 ? 3 : g >= 192 ? 2 : 1;
MA[254] = MA[254] = 1;
var lQ = (g) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(g);
  let I, A, B, i, Q, t = g.length, E = 0;
  for (i = 0; i < t; i++)
    A = g.charCodeAt(i), (A & 64512) === 55296 && i + 1 < t && (B = g.charCodeAt(i + 1), (B & 64512) === 56320 && (A = 65536 + (A - 55296 << 10) + (B - 56320), i++)), E += A < 128 ? 1 : A < 2048 ? 2 : A < 65536 ? 3 : 4;
  for (I = new Uint8Array(E), Q = 0, i = 0; Q < E; i++)
    A = g.charCodeAt(i), (A & 64512) === 55296 && i + 1 < t && (B = g.charCodeAt(i + 1), (B & 64512) === 56320 && (A = 65536 + (A - 55296 << 10) + (B - 56320), i++)), A < 128 ? I[Q++] = A : A < 2048 ? (I[Q++] = 192 | A >>> 6, I[Q++] = 128 | A & 63) : A < 65536 ? (I[Q++] = 224 | A >>> 12, I[Q++] = 128 | A >>> 6 & 63, I[Q++] = 128 | A & 63) : (I[Q++] = 240 | A >>> 18, I[Q++] = 128 | A >>> 12 & 63, I[Q++] = 128 | A >>> 6 & 63, I[Q++] = 128 | A & 63);
  return I;
};
const fQ = (g, I) => {
  if (I < 65534 && g.subarray && jg)
    return String.fromCharCode.apply(null, g.length === I ? g : g.subarray(0, I));
  let A = "";
  for (let B = 0; B < I; B++)
    A += String.fromCharCode(g[B]);
  return A;
};
var yQ = (g, I) => {
  const A = I || g.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(g.subarray(0, I));
  let B, i;
  const Q = new Array(A * 2);
  for (i = 0, B = 0; B < A; ) {
    let t = g[B++];
    if (t < 128) {
      Q[i++] = t;
      continue;
    }
    let E = MA[t];
    if (E > 4) {
      Q[i++] = 65533, B += E - 1;
      continue;
    }
    for (t &= E === 2 ? 31 : E === 3 ? 15 : 7; E > 1 && B < A; )
      t = t << 6 | g[B++] & 63, E--;
    if (E > 1) {
      Q[i++] = 65533;
      continue;
    }
    t < 65536 ? Q[i++] = t : (t -= 65536, Q[i++] = 55296 | t >> 10 & 1023, Q[i++] = 56320 | t & 1023);
  }
  return fQ(Q, i);
}, SQ = (g, I) => {
  I = I || g.length, I > g.length && (I = g.length);
  let A = I - 1;
  for (; A >= 0 && (g[A] & 192) === 128; )
    A--;
  return A < 0 || A === 0 ? I : A + MA[g[A]] > I ? A : I;
}, FI = {
  string2buf: lQ,
  buf2string: yQ,
  utf8border: SQ
};
function GQ() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var dQ = GQ;
const vA = 30, FQ = 12;
var NQ = function(I, A) {
  let B, i, Q, t, E, D, e, C, o, a, s, r, c, n, h, l, G, f, d, w, S, y, u, k;
  const F = I.state;
  B = I.next_in, u = I.input, i = B + (I.avail_in - 5), Q = I.next_out, k = I.output, t = Q - (A - I.avail_out), E = Q + (I.avail_out - 257), D = F.dmax, e = F.wsize, C = F.whave, o = F.wnext, a = F.window, s = F.hold, r = F.bits, c = F.lencode, n = F.distcode, h = (1 << F.lenbits) - 1, l = (1 << F.distbits) - 1;
  A:
    do {
      r < 15 && (s += u[B++] << r, r += 8, s += u[B++] << r, r += 8), G = c[s & h];
      I:
        for (; ; ) {
          if (f = G >>> 24, s >>>= f, r -= f, f = G >>> 16 & 255, f === 0)
            k[Q++] = G & 65535;
          else if (f & 16) {
            d = G & 65535, f &= 15, f && (r < f && (s += u[B++] << r, r += 8), d += s & (1 << f) - 1, s >>>= f, r -= f), r < 15 && (s += u[B++] << r, r += 8, s += u[B++] << r, r += 8), G = n[s & l];
            g:
              for (; ; ) {
                if (f = G >>> 24, s >>>= f, r -= f, f = G >>> 16 & 255, f & 16) {
                  if (w = G & 65535, f &= 15, r < f && (s += u[B++] << r, r += 8, r < f && (s += u[B++] << r, r += 8)), w += s & (1 << f) - 1, w > D) {
                    I.msg = "invalid distance too far back", F.mode = vA;
                    break A;
                  }
                  if (s >>>= f, r -= f, f = Q - t, w > f) {
                    if (f = w - f, f > C && F.sane) {
                      I.msg = "invalid distance too far back", F.mode = vA;
                      break A;
                    }
                    if (S = 0, y = a, o === 0) {
                      if (S += e - f, f < d) {
                        d -= f;
                        do
                          k[Q++] = a[S++];
                        while (--f);
                        S = Q - w, y = k;
                      }
                    } else if (o < f) {
                      if (S += e + o - f, f -= o, f < d) {
                        d -= f;
                        do
                          k[Q++] = a[S++];
                        while (--f);
                        if (S = 0, o < d) {
                          f = o, d -= f;
                          do
                            k[Q++] = a[S++];
                          while (--f);
                          S = Q - w, y = k;
                        }
                      }
                    } else if (S += o - f, f < d) {
                      d -= f;
                      do
                        k[Q++] = a[S++];
                      while (--f);
                      S = Q - w, y = k;
                    }
                    for (; d > 2; )
                      k[Q++] = y[S++], k[Q++] = y[S++], k[Q++] = y[S++], d -= 3;
                    d && (k[Q++] = y[S++], d > 1 && (k[Q++] = y[S++]));
                  } else {
                    S = Q - w;
                    do
                      k[Q++] = k[S++], k[Q++] = k[S++], k[Q++] = k[S++], d -= 3;
                    while (d > 2);
                    d && (k[Q++] = k[S++], d > 1 && (k[Q++] = k[S++]));
                  }
                } else if (f & 64) {
                  I.msg = "invalid distance code", F.mode = vA;
                  break A;
                } else {
                  G = n[(G & 65535) + (s & (1 << f) - 1)];
                  continue g;
                }
                break;
              }
          } else if (f & 64)
            if (f & 32) {
              F.mode = FQ;
              break A;
            } else {
              I.msg = "invalid literal/length code", F.mode = vA;
              break A;
            }
          else {
            G = c[(G & 65535) + (s & (1 << f) - 1)];
            continue I;
          }
          break;
        }
    } while (B < i && Q < E);
  d = r >> 3, B -= d, r -= d << 3, s &= (1 << r) - 1, I.next_in = B, I.next_out = Q, I.avail_in = B < i ? 5 + (i - B) : 5 - (B - i), I.avail_out = Q < E ? 257 + (E - Q) : 257 - (Q - E), F.hold = s, F.bits = r;
};
const SA = 15, WI = 852, _I = 592, zI = 0, tI = 1, XI = 2, uQ = new Uint16Array([
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
]), kQ = new Uint8Array([
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
]), RQ = new Uint16Array([
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
]), LQ = new Uint8Array([
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
]), UQ = (g, I, A, B, i, Q, t, E) => {
  const D = E.bits;
  let e = 0, C = 0, o = 0, a = 0, s = 0, r = 0, c = 0, n = 0, h = 0, l = 0, G, f, d, w, S, y = null, u = 0, k;
  const F = new Uint16Array(SA + 1), U = new Uint16Array(SA + 1);
  let L = null, x = 0, R, N, Y;
  for (e = 0; e <= SA; e++)
    F[e] = 0;
  for (C = 0; C < B; C++)
    F[I[A + C]]++;
  for (s = D, a = SA; a >= 1 && F[a] === 0; a--)
    ;
  if (s > a && (s = a), a === 0)
    return i[Q++] = 1 << 24 | 64 << 16 | 0, i[Q++] = 1 << 24 | 64 << 16 | 0, E.bits = 1, 0;
  for (o = 1; o < a && F[o] === 0; o++)
    ;
  for (s < o && (s = o), n = 1, e = 1; e <= SA; e++)
    if (n <<= 1, n -= F[e], n < 0)
      return -1;
  if (n > 0 && (g === zI || a !== 1))
    return -1;
  for (U[1] = 0, e = 1; e < SA; e++)
    U[e + 1] = U[e] + F[e];
  for (C = 0; C < B; C++)
    I[A + C] !== 0 && (t[U[I[A + C]]++] = C);
  if (g === zI ? (y = L = t, k = 19) : g === tI ? (y = uQ, u -= 257, L = kQ, x -= 257, k = 256) : (y = RQ, L = LQ, k = -1), l = 0, C = 0, e = o, S = Q, r = s, c = 0, d = -1, h = 1 << s, w = h - 1, g === tI && h > WI || g === XI && h > _I)
    return 1;
  for (; ; ) {
    R = e - c, t[C] < k ? (N = 0, Y = t[C]) : t[C] > k ? (N = L[x + t[C]], Y = y[u + t[C]]) : (N = 96, Y = 0), G = 1 << e - c, f = 1 << r, o = f;
    do
      f -= G, i[S + (l >> c) + f] = R << 24 | N << 16 | Y | 0;
    while (f !== 0);
    for (G = 1 << e - 1; l & G; )
      G >>= 1;
    if (G !== 0 ? (l &= G - 1, l += G) : l = 0, C++, --F[e] === 0) {
      if (e === a)
        break;
      e = I[A + t[C]];
    }
    if (e > s && (l & w) !== d) {
      for (c === 0 && (c = s), S += o, r = e - c, n = 1 << r; r + c < a && (n -= F[r + c], !(n <= 0)); )
        r++, n <<= 1;
      if (h += 1 << r, g === tI && h > WI || g === XI && h > _I)
        return 1;
      d = l & w, i[d] = s << 24 | r << 16 | S - Q | 0;
    }
  }
  return l !== 0 && (i[S + l] = e - c << 24 | 64 << 16 | 0), E.bits = s, 0;
};
var YA = UQ;
const YQ = 0, Zg = 1, Pg = 2, {
  Z_FINISH: $I,
  Z_BLOCK: MQ,
  Z_TREES: jA,
  Z_OK: wA,
  Z_STREAM_END: KQ,
  Z_NEED_DICT: JQ,
  Z_STREAM_ERROR: IA,
  Z_DATA_ERROR: Vg,
  Z_MEM_ERROR: Wg,
  Z_BUF_ERROR: HQ,
  Z_DEFLATED: Ag
} = Og, _g = 1, Ig = 2, gg = 3, Bg = 4, Cg = 5, Qg = 6, eg = 7, ig = 8, Eg = 9, tg = 10, _A = 11, EA = 12, oI = 13, og = 14, sI = 15, sg = 16, rg = 17, ag = 18, ng = 19, ZA = 20, PA = 21, hg = 22, Dg = 23, cg = 24, wg = 25, lg = 26, rI = 27, fg = 28, yg = 29, P = 30, zg = 31, mQ = 32, pQ = 852, xQ = 592, bQ = 15, qQ = bQ, Sg = (g) => (g >>> 24 & 255) + (g >>> 8 & 65280) + ((g & 65280) << 8) + ((g & 255) << 24);
function TQ() {
  this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const Xg = (g) => {
  if (!g || !g.state)
    return IA;
  const I = g.state;
  return g.total_in = g.total_out = I.total = 0, g.msg = "", I.wrap && (g.adler = I.wrap & 1), I.mode = _g, I.last = 0, I.havedict = 0, I.dmax = 32768, I.head = null, I.hold = 0, I.bits = 0, I.lencode = I.lendyn = new Int32Array(pQ), I.distcode = I.distdyn = new Int32Array(xQ), I.sane = 1, I.back = -1, wA;
}, $g = (g) => {
  if (!g || !g.state)
    return IA;
  const I = g.state;
  return I.wsize = 0, I.whave = 0, I.wnext = 0, Xg(g);
}, AB = (g, I) => {
  let A;
  if (!g || !g.state)
    return IA;
  const B = g.state;
  return I < 0 ? (A = 0, I = -I) : (A = (I >> 4) + 1, I < 48 && (I &= 15)), I && (I < 8 || I > 15) ? IA : (B.window !== null && B.wbits !== I && (B.window = null), B.wrap = A, B.wbits = I, $g(g));
}, IB = (g, I) => {
  if (!g)
    return IA;
  const A = new TQ();
  g.state = A, A.window = null;
  const B = AB(g, I);
  return B !== wA && (g.state = null), B;
}, OQ = (g) => IB(g, qQ);
let Gg = !0, aI, nI;
const vQ = (g) => {
  if (Gg) {
    aI = new Int32Array(512), nI = new Int32Array(32);
    let I = 0;
    for (; I < 144; )
      g.lens[I++] = 8;
    for (; I < 256; )
      g.lens[I++] = 9;
    for (; I < 280; )
      g.lens[I++] = 7;
    for (; I < 288; )
      g.lens[I++] = 8;
    for (YA(Zg, g.lens, 0, 288, aI, 0, g.work, { bits: 9 }), I = 0; I < 32; )
      g.lens[I++] = 5;
    YA(Pg, g.lens, 0, 32, nI, 0, g.work, { bits: 5 }), Gg = !1;
  }
  g.lencode = aI, g.lenbits = 9, g.distcode = nI, g.distbits = 5;
}, gB = (g, I, A, B) => {
  let i;
  const Q = g.state;
  return Q.window === null && (Q.wsize = 1 << Q.wbits, Q.wnext = 0, Q.whave = 0, Q.window = new Uint8Array(Q.wsize)), B >= Q.wsize ? (Q.window.set(I.subarray(A - Q.wsize, A), 0), Q.wnext = 0, Q.whave = Q.wsize) : (i = Q.wsize - Q.wnext, i > B && (i = B), Q.window.set(I.subarray(A - B, A - B + i), Q.wnext), B -= i, B ? (Q.window.set(I.subarray(A - B, A), 0), Q.wnext = B, Q.whave = Q.wsize) : (Q.wnext += i, Q.wnext === Q.wsize && (Q.wnext = 0), Q.whave < Q.wsize && (Q.whave += i))), 0;
}, jQ = (g, I) => {
  let A, B, i, Q, t, E, D, e, C, o, a, s, r, c, n = 0, h, l, G, f, d, w, S, y;
  const u = new Uint8Array(4);
  let k, F;
  const U = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (!g || !g.state || !g.output || !g.input && g.avail_in !== 0)
    return IA;
  A = g.state, A.mode === EA && (A.mode = oI), t = g.next_out, i = g.output, D = g.avail_out, Q = g.next_in, B = g.input, E = g.avail_in, e = A.hold, C = A.bits, o = E, a = D, y = wA;
  A:
    for (; ; )
      switch (A.mode) {
        case _g:
          if (A.wrap === 0) {
            A.mode = oI;
            break;
          }
          for (; C < 16; ) {
            if (E === 0)
              break A;
            E--, e += B[Q++] << C, C += 8;
          }
          if (A.wrap & 2 && e === 35615) {
            A.check = 0, u[0] = e & 255, u[1] = e >>> 8 & 255, A.check = QA(A.check, u, 2, 0), e = 0, C = 0, A.mode = Ig;
            break;
          }
          if (A.flags = 0, A.head && (A.head.done = !1), !(A.wrap & 1) || /* check if zlib header allowed */
          (((e & 255) << 8) + (e >> 8)) % 31) {
            g.msg = "incorrect header check", A.mode = P;
            break;
          }
          if ((e & 15) !== Ag) {
            g.msg = "unknown compression method", A.mode = P;
            break;
          }
          if (e >>>= 4, C -= 4, S = (e & 15) + 8, A.wbits === 0)
            A.wbits = S;
          else if (S > A.wbits) {
            g.msg = "invalid window size", A.mode = P;
            break;
          }
          A.dmax = 1 << A.wbits, g.adler = A.check = 1, A.mode = e & 512 ? tg : EA, e = 0, C = 0;
          break;
        case Ig:
          for (; C < 16; ) {
            if (E === 0)
              break A;
            E--, e += B[Q++] << C, C += 8;
          }
          if (A.flags = e, (A.flags & 255) !== Ag) {
            g.msg = "unknown compression method", A.mode = P;
            break;
          }
          if (A.flags & 57344) {
            g.msg = "unknown header flags set", A.mode = P;
            break;
          }
          A.head && (A.head.text = e >> 8 & 1), A.flags & 512 && (u[0] = e & 255, u[1] = e >>> 8 & 255, A.check = QA(A.check, u, 2, 0)), e = 0, C = 0, A.mode = gg;
        case gg:
          for (; C < 32; ) {
            if (E === 0)
              break A;
            E--, e += B[Q++] << C, C += 8;
          }
          A.head && (A.head.time = e), A.flags & 512 && (u[0] = e & 255, u[1] = e >>> 8 & 255, u[2] = e >>> 16 & 255, u[3] = e >>> 24 & 255, A.check = QA(A.check, u, 4, 0)), e = 0, C = 0, A.mode = Bg;
        case Bg:
          for (; C < 16; ) {
            if (E === 0)
              break A;
            E--, e += B[Q++] << C, C += 8;
          }
          A.head && (A.head.xflags = e & 255, A.head.os = e >> 8), A.flags & 512 && (u[0] = e & 255, u[1] = e >>> 8 & 255, A.check = QA(A.check, u, 2, 0)), e = 0, C = 0, A.mode = Cg;
        case Cg:
          if (A.flags & 1024) {
            for (; C < 16; ) {
              if (E === 0)
                break A;
              E--, e += B[Q++] << C, C += 8;
            }
            A.length = e, A.head && (A.head.extra_len = e), A.flags & 512 && (u[0] = e & 255, u[1] = e >>> 8 & 255, A.check = QA(A.check, u, 2, 0)), e = 0, C = 0;
          } else A.head && (A.head.extra = null);
          A.mode = Qg;
        case Qg:
          if (A.flags & 1024 && (s = A.length, s > E && (s = E), s && (A.head && (S = A.head.extra_len - A.length, A.head.extra || (A.head.extra = new Uint8Array(A.head.extra_len)), A.head.extra.set(
            B.subarray(
              Q,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              Q + s
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            S
          )), A.flags & 512 && (A.check = QA(A.check, B, s, Q)), E -= s, Q += s, A.length -= s), A.length))
            break A;
          A.length = 0, A.mode = eg;
        case eg:
          if (A.flags & 2048) {
            if (E === 0)
              break A;
            s = 0;
            do
              S = B[Q + s++], A.head && S && A.length < 65536 && (A.head.name += String.fromCharCode(S));
            while (S && s < E);
            if (A.flags & 512 && (A.check = QA(A.check, B, s, Q)), E -= s, Q += s, S)
              break A;
          } else A.head && (A.head.name = null);
          A.length = 0, A.mode = ig;
        case ig:
          if (A.flags & 4096) {
            if (E === 0)
              break A;
            s = 0;
            do
              S = B[Q + s++], A.head && S && A.length < 65536 && (A.head.comment += String.fromCharCode(S));
            while (S && s < E);
            if (A.flags & 512 && (A.check = QA(A.check, B, s, Q)), E -= s, Q += s, S)
              break A;
          } else A.head && (A.head.comment = null);
          A.mode = Eg;
        case Eg:
          if (A.flags & 512) {
            for (; C < 16; ) {
              if (E === 0)
                break A;
              E--, e += B[Q++] << C, C += 8;
            }
            if (e !== (A.check & 65535)) {
              g.msg = "header crc mismatch", A.mode = P;
              break;
            }
            e = 0, C = 0;
          }
          A.head && (A.head.hcrc = A.flags >> 9 & 1, A.head.done = !0), g.adler = A.check = 0, A.mode = EA;
          break;
        case tg:
          for (; C < 32; ) {
            if (E === 0)
              break A;
            E--, e += B[Q++] << C, C += 8;
          }
          g.adler = A.check = Sg(e), e = 0, C = 0, A.mode = _A;
        case _A:
          if (A.havedict === 0)
            return g.next_out = t, g.avail_out = D, g.next_in = Q, g.avail_in = E, A.hold = e, A.bits = C, JQ;
          g.adler = A.check = 1, A.mode = EA;
        case EA:
          if (I === MQ || I === jA)
            break A;
        case oI:
          if (A.last) {
            e >>>= C & 7, C -= C & 7, A.mode = rI;
            break;
          }
          for (; C < 3; ) {
            if (E === 0)
              break A;
            E--, e += B[Q++] << C, C += 8;
          }
          switch (A.last = e & 1, e >>>= 1, C -= 1, e & 3) {
            case 0:
              A.mode = og;
              break;
            case 1:
              if (vQ(A), A.mode = ZA, I === jA) {
                e >>>= 2, C -= 2;
                break A;
              }
              break;
            case 2:
              A.mode = rg;
              break;
            case 3:
              g.msg = "invalid block type", A.mode = P;
          }
          e >>>= 2, C -= 2;
          break;
        case og:
          for (e >>>= C & 7, C -= C & 7; C < 32; ) {
            if (E === 0)
              break A;
            E--, e += B[Q++] << C, C += 8;
          }
          if ((e & 65535) !== (e >>> 16 ^ 65535)) {
            g.msg = "invalid stored block lengths", A.mode = P;
            break;
          }
          if (A.length = e & 65535, e = 0, C = 0, A.mode = sI, I === jA)
            break A;
        case sI:
          A.mode = sg;
        case sg:
          if (s = A.length, s) {
            if (s > E && (s = E), s > D && (s = D), s === 0)
              break A;
            i.set(B.subarray(Q, Q + s), t), E -= s, Q += s, D -= s, t += s, A.length -= s;
            break;
          }
          A.mode = EA;
          break;
        case rg:
          for (; C < 14; ) {
            if (E === 0)
              break A;
            E--, e += B[Q++] << C, C += 8;
          }
          if (A.nlen = (e & 31) + 257, e >>>= 5, C -= 5, A.ndist = (e & 31) + 1, e >>>= 5, C -= 5, A.ncode = (e & 15) + 4, e >>>= 4, C -= 4, A.nlen > 286 || A.ndist > 30) {
            g.msg = "too many length or distance symbols", A.mode = P;
            break;
          }
          A.have = 0, A.mode = ag;
        case ag:
          for (; A.have < A.ncode; ) {
            for (; C < 3; ) {
              if (E === 0)
                break A;
              E--, e += B[Q++] << C, C += 8;
            }
            A.lens[U[A.have++]] = e & 7, e >>>= 3, C -= 3;
          }
          for (; A.have < 19; )
            A.lens[U[A.have++]] = 0;
          if (A.lencode = A.lendyn, A.lenbits = 7, k = { bits: A.lenbits }, y = YA(YQ, A.lens, 0, 19, A.lencode, 0, A.work, k), A.lenbits = k.bits, y) {
            g.msg = "invalid code lengths set", A.mode = P;
            break;
          }
          A.have = 0, A.mode = ng;
        case ng:
          for (; A.have < A.nlen + A.ndist; ) {
            for (; n = A.lencode[e & (1 << A.lenbits) - 1], h = n >>> 24, l = n >>> 16 & 255, G = n & 65535, !(h <= C); ) {
              if (E === 0)
                break A;
              E--, e += B[Q++] << C, C += 8;
            }
            if (G < 16)
              e >>>= h, C -= h, A.lens[A.have++] = G;
            else {
              if (G === 16) {
                for (F = h + 2; C < F; ) {
                  if (E === 0)
                    break A;
                  E--, e += B[Q++] << C, C += 8;
                }
                if (e >>>= h, C -= h, A.have === 0) {
                  g.msg = "invalid bit length repeat", A.mode = P;
                  break;
                }
                S = A.lens[A.have - 1], s = 3 + (e & 3), e >>>= 2, C -= 2;
              } else if (G === 17) {
                for (F = h + 3; C < F; ) {
                  if (E === 0)
                    break A;
                  E--, e += B[Q++] << C, C += 8;
                }
                e >>>= h, C -= h, S = 0, s = 3 + (e & 7), e >>>= 3, C -= 3;
              } else {
                for (F = h + 7; C < F; ) {
                  if (E === 0)
                    break A;
                  E--, e += B[Q++] << C, C += 8;
                }
                e >>>= h, C -= h, S = 0, s = 11 + (e & 127), e >>>= 7, C -= 7;
              }
              if (A.have + s > A.nlen + A.ndist) {
                g.msg = "invalid bit length repeat", A.mode = P;
                break;
              }
              for (; s--; )
                A.lens[A.have++] = S;
            }
          }
          if (A.mode === P)
            break;
          if (A.lens[256] === 0) {
            g.msg = "invalid code -- missing end-of-block", A.mode = P;
            break;
          }
          if (A.lenbits = 9, k = { bits: A.lenbits }, y = YA(Zg, A.lens, 0, A.nlen, A.lencode, 0, A.work, k), A.lenbits = k.bits, y) {
            g.msg = "invalid literal/lengths set", A.mode = P;
            break;
          }
          if (A.distbits = 6, A.distcode = A.distdyn, k = { bits: A.distbits }, y = YA(Pg, A.lens, A.nlen, A.ndist, A.distcode, 0, A.work, k), A.distbits = k.bits, y) {
            g.msg = "invalid distances set", A.mode = P;
            break;
          }
          if (A.mode = ZA, I === jA)
            break A;
        case ZA:
          A.mode = PA;
        case PA:
          if (E >= 6 && D >= 258) {
            g.next_out = t, g.avail_out = D, g.next_in = Q, g.avail_in = E, A.hold = e, A.bits = C, NQ(g, a), t = g.next_out, i = g.output, D = g.avail_out, Q = g.next_in, B = g.input, E = g.avail_in, e = A.hold, C = A.bits, A.mode === EA && (A.back = -1);
            break;
          }
          for (A.back = 0; n = A.lencode[e & (1 << A.lenbits) - 1], h = n >>> 24, l = n >>> 16 & 255, G = n & 65535, !(h <= C); ) {
            if (E === 0)
              break A;
            E--, e += B[Q++] << C, C += 8;
          }
          if (l && !(l & 240)) {
            for (f = h, d = l, w = G; n = A.lencode[w + ((e & (1 << f + d) - 1) >> f)], h = n >>> 24, l = n >>> 16 & 255, G = n & 65535, !(f + h <= C); ) {
              if (E === 0)
                break A;
              E--, e += B[Q++] << C, C += 8;
            }
            e >>>= f, C -= f, A.back += f;
          }
          if (e >>>= h, C -= h, A.back += h, A.length = G, l === 0) {
            A.mode = lg;
            break;
          }
          if (l & 32) {
            A.back = -1, A.mode = EA;
            break;
          }
          if (l & 64) {
            g.msg = "invalid literal/length code", A.mode = P;
            break;
          }
          A.extra = l & 15, A.mode = hg;
        case hg:
          if (A.extra) {
            for (F = A.extra; C < F; ) {
              if (E === 0)
                break A;
              E--, e += B[Q++] << C, C += 8;
            }
            A.length += e & (1 << A.extra) - 1, e >>>= A.extra, C -= A.extra, A.back += A.extra;
          }
          A.was = A.length, A.mode = Dg;
        case Dg:
          for (; n = A.distcode[e & (1 << A.distbits) - 1], h = n >>> 24, l = n >>> 16 & 255, G = n & 65535, !(h <= C); ) {
            if (E === 0)
              break A;
            E--, e += B[Q++] << C, C += 8;
          }
          if (!(l & 240)) {
            for (f = h, d = l, w = G; n = A.distcode[w + ((e & (1 << f + d) - 1) >> f)], h = n >>> 24, l = n >>> 16 & 255, G = n & 65535, !(f + h <= C); ) {
              if (E === 0)
                break A;
              E--, e += B[Q++] << C, C += 8;
            }
            e >>>= f, C -= f, A.back += f;
          }
          if (e >>>= h, C -= h, A.back += h, l & 64) {
            g.msg = "invalid distance code", A.mode = P;
            break;
          }
          A.offset = G, A.extra = l & 15, A.mode = cg;
        case cg:
          if (A.extra) {
            for (F = A.extra; C < F; ) {
              if (E === 0)
                break A;
              E--, e += B[Q++] << C, C += 8;
            }
            A.offset += e & (1 << A.extra) - 1, e >>>= A.extra, C -= A.extra, A.back += A.extra;
          }
          if (A.offset > A.dmax) {
            g.msg = "invalid distance too far back", A.mode = P;
            break;
          }
          A.mode = wg;
        case wg:
          if (D === 0)
            break A;
          if (s = a - D, A.offset > s) {
            if (s = A.offset - s, s > A.whave && A.sane) {
              g.msg = "invalid distance too far back", A.mode = P;
              break;
            }
            s > A.wnext ? (s -= A.wnext, r = A.wsize - s) : r = A.wnext - s, s > A.length && (s = A.length), c = A.window;
          } else
            c = i, r = t - A.offset, s = A.length;
          s > D && (s = D), D -= s, A.length -= s;
          do
            i[t++] = c[r++];
          while (--s);
          A.length === 0 && (A.mode = PA);
          break;
        case lg:
          if (D === 0)
            break A;
          i[t++] = A.length, D--, A.mode = PA;
          break;
        case rI:
          if (A.wrap) {
            for (; C < 32; ) {
              if (E === 0)
                break A;
              E--, e |= B[Q++] << C, C += 8;
            }
            if (a -= D, g.total_out += a, A.total += a, a && (g.adler = A.check = /*UPDATE(state.check, put - _out, _out);*/
            A.flags ? QA(A.check, i, a, t - a) : GI(A.check, i, a, t - a)), a = D, (A.flags ? e : Sg(e)) !== A.check) {
              g.msg = "incorrect data check", A.mode = P;
              break;
            }
            e = 0, C = 0;
          }
          A.mode = fg;
        case fg:
          if (A.wrap && A.flags) {
            for (; C < 32; ) {
              if (E === 0)
                break A;
              E--, e += B[Q++] << C, C += 8;
            }
            if (e !== (A.total & 4294967295)) {
              g.msg = "incorrect length check", A.mode = P;
              break;
            }
            e = 0, C = 0;
          }
          A.mode = yg;
        case yg:
          y = KQ;
          break A;
        case P:
          y = Vg;
          break A;
        case zg:
          return Wg;
        case mQ:
        default:
          return IA;
      }
  return g.next_out = t, g.avail_out = D, g.next_in = Q, g.avail_in = E, A.hold = e, A.bits = C, (A.wsize || a !== g.avail_out && A.mode < P && (A.mode < rI || I !== $I)) && gB(g, g.output, g.next_out, a - g.avail_out), o -= g.avail_in, a -= g.avail_out, g.total_in += o, g.total_out += a, A.total += a, A.wrap && a && (g.adler = A.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
  A.flags ? QA(A.check, i, a, g.next_out - a) : GI(A.check, i, a, g.next_out - a)), g.data_type = A.bits + (A.last ? 64 : 0) + (A.mode === EA ? 128 : 0) + (A.mode === ZA || A.mode === sI ? 256 : 0), (o === 0 && a === 0 || I === $I) && y === wA && (y = HQ), y;
}, ZQ = (g) => {
  if (!g || !g.state)
    return IA;
  let I = g.state;
  return I.window && (I.window = null), g.state = null, wA;
}, PQ = (g, I) => {
  if (!g || !g.state)
    return IA;
  const A = g.state;
  return A.wrap & 2 ? (A.head = I, I.done = !1, wA) : IA;
}, VQ = (g, I) => {
  const A = I.length;
  let B, i, Q;
  return !g || !g.state || (B = g.state, B.wrap !== 0 && B.mode !== _A) ? IA : B.mode === _A && (i = 1, i = GI(i, I, A, 0), i !== B.check) ? Vg : (Q = gB(g, I, A, A), Q ? (B.mode = zg, Wg) : (B.havedict = 1, wA));
};
var WQ = $g, _Q = AB, zQ = Xg, XQ = OQ, $Q = IB, Ae = jQ, Ie = ZQ, ge = PQ, Be = VQ, Ce = "pako inflate (from Nodeca project)", oA = {
  inflateReset: WQ,
  inflateReset2: _Q,
  inflateResetKeep: zQ,
  inflateInit: XQ,
  inflateInit2: $Q,
  inflate: Ae,
  inflateEnd: Ie,
  inflateGetHeader: ge,
  inflateSetDictionary: Be,
  inflateInfo: Ce
};
function Qe() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var ee = Qe;
const BB = Object.prototype.toString, {
  Z_NO_FLUSH: ie,
  Z_FINISH: Ee,
  Z_OK: KA,
  Z_STREAM_END: hI,
  Z_NEED_DICT: DI,
  Z_STREAM_ERROR: te,
  Z_DATA_ERROR: dg,
  Z_MEM_ERROR: oe
} = Og;
function AI(g) {
  this.options = vg.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, g || {});
  const I = this.options;
  I.raw && I.windowBits >= 0 && I.windowBits < 16 && (I.windowBits = -I.windowBits, I.windowBits === 0 && (I.windowBits = -15)), I.windowBits >= 0 && I.windowBits < 16 && !(g && g.windowBits) && (I.windowBits += 32), I.windowBits > 15 && I.windowBits < 48 && (I.windowBits & 15 || (I.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new dQ(), this.strm.avail_out = 0;
  let A = oA.inflateInit2(
    this.strm,
    I.windowBits
  );
  if (A !== KA)
    throw new Error(dI[A]);
  if (this.header = new ee(), oA.inflateGetHeader(this.strm, this.header), I.dictionary && (typeof I.dictionary == "string" ? I.dictionary = FI.string2buf(I.dictionary) : BB.call(I.dictionary) === "[object ArrayBuffer]" && (I.dictionary = new Uint8Array(I.dictionary)), I.raw && (A = oA.inflateSetDictionary(this.strm, I.dictionary), A !== KA)))
    throw new Error(dI[A]);
}
AI.prototype.push = function(g, I) {
  const A = this.strm, B = this.options.chunkSize, i = this.options.dictionary;
  let Q, t, E;
  if (this.ended) return !1;
  for (I === ~~I ? t = I : t = I === !0 ? Ee : ie, BB.call(g) === "[object ArrayBuffer]" ? A.input = new Uint8Array(g) : A.input = g, A.next_in = 0, A.avail_in = A.input.length; ; ) {
    for (A.avail_out === 0 && (A.output = new Uint8Array(B), A.next_out = 0, A.avail_out = B), Q = oA.inflate(A, t), Q === DI && i && (Q = oA.inflateSetDictionary(A, i), Q === KA ? Q = oA.inflate(A, t) : Q === dg && (Q = DI)); A.avail_in > 0 && Q === hI && A.state.wrap > 0 && g[A.next_in] !== 0; )
      oA.inflateReset(A), Q = oA.inflate(A, t);
    switch (Q) {
      case te:
      case dg:
      case DI:
      case oe:
        return this.onEnd(Q), this.ended = !0, !1;
    }
    if (E = A.avail_out, A.next_out && (A.avail_out === 0 || Q === hI))
      if (this.options.to === "string") {
        let D = FI.utf8border(A.output, A.next_out), e = A.next_out - D, C = FI.buf2string(A.output, D);
        A.next_out = e, A.avail_out = B - e, e && A.output.set(A.output.subarray(D, D + e), 0), this.onData(C);
      } else
        this.onData(A.output.length === A.next_out ? A.output : A.output.subarray(0, A.next_out));
    if (!(Q === KA && E === 0)) {
      if (Q === hI)
        return Q = oA.inflateEnd(this.strm), this.onEnd(Q), this.ended = !0, !0;
      if (A.avail_in === 0) break;
    }
  }
  return !0;
};
AI.prototype.onData = function(g) {
  this.chunks.push(g);
};
AI.prototype.onEnd = function(g) {
  g === KA && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = vg.flattenChunks(this.chunks)), this.chunks = [], this.err = g, this.msg = this.strm.msg;
};
function se(g, I) {
  const A = new AI(I);
  if (A.push(g), A.err) throw A.msg || dI[A.err];
  return A.result;
}
var re = se, ae = {
  inflate: re
};
const { inflate: ne } = ae;
var CB = ne;
class he extends nA {
  decodeBlock(I) {
    return CB(new Uint8Array(I)).buffer;
  }
}
const De = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: he
}, Symbol.toStringTag, { value: "Module" }));
class ce extends nA {
  decodeBlock(I) {
    const A = new DataView(I), B = [];
    for (let i = 0; i < I.byteLength; ++i) {
      let Q = A.getInt8(i);
      if (Q < 0) {
        const t = A.getUint8(i + 1);
        Q = -Q;
        for (let E = 0; E <= Q; ++E)
          B.push(t);
        i += 1;
      } else {
        for (let t = 0; t <= Q; ++t)
          B.push(A.getUint8(i + t + 1));
        i += Q + 1;
      }
    }
    return new Uint8Array(B).buffer;
  }
}
const we = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ce
}, Symbol.toStringTag, { value: "Module" }));
var QB = { exports: {} };
(function(g) {
  /* Copyright 2015-2021 Esri. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 @preserve */
  (function() {
    var I = function() {
      var Q = {};
      Q.defaultNoDataValue = -34027999387901484e22, Q.decode = function(o, a) {
        a = a || {};
        var s = a.encodedMaskData || a.encodedMaskData === null, r = e(o, a.inputOffset || 0, s), c = a.noDataValue !== null ? a.noDataValue : Q.defaultNoDataValue, n = t(
          r,
          a.pixelType || Float32Array,
          a.encodedMaskData,
          c,
          a.returnMask
        ), h = {
          width: r.width,
          height: r.height,
          pixelData: n.resultPixels,
          minValue: n.minValue,
          maxValue: r.pixels.maxValue,
          noDataValue: c
        };
        return n.resultMask && (h.maskData = n.resultMask), a.returnEncodedMask && r.mask && (h.encodedMaskData = r.mask.bitset ? r.mask.bitset : null), a.returnFileInfo && (h.fileInfo = E(r), a.computeUsedBitDepths && (h.fileInfo.bitDepths = D(r))), h;
      };
      var t = function(o, a, s, r, c) {
        var n = 0, h = o.pixels.numBlocksX, l = o.pixels.numBlocksY, G = Math.floor(o.width / h), f = Math.floor(o.height / l), d = 2 * o.maxZError, w = Number.MAX_VALUE, S;
        s = s || (o.mask ? o.mask.bitset : null);
        var y, u;
        y = new a(o.width * o.height), c && s && (u = new Uint8Array(o.width * o.height));
        for (var k = new Float32Array(G * f), F, U, L = 0; L <= l; L++) {
          var x = L !== l ? f : o.height % l;
          if (x !== 0)
            for (var R = 0; R <= h; R++) {
              var N = R !== h ? G : o.width % h;
              if (N !== 0) {
                var Y = L * o.width * f + R * G, M = o.width - N, J = o.pixels.blocks[n], m, H, O;
                J.encoding < 2 ? (J.encoding === 0 ? m = J.rawData : (C(J.stuffedData, J.bitsPerPixel, J.numValidPixels, J.offset, d, k, o.pixels.maxValue), m = k), H = 0) : J.encoding === 2 ? O = 0 : O = J.offset;
                var j;
                if (s)
                  for (U = 0; U < x; U++) {
                    for (Y & 7 && (j = s[Y >> 3], j <<= Y & 7), F = 0; F < N; F++)
                      Y & 7 || (j = s[Y >> 3]), j & 128 ? (u && (u[Y] = 1), S = J.encoding < 2 ? m[H++] : O, w = w > S ? S : w, y[Y++] = S) : (u && (u[Y] = 0), y[Y++] = r), j <<= 1;
                    Y += M;
                  }
                else if (J.encoding < 2)
                  for (U = 0; U < x; U++) {
                    for (F = 0; F < N; F++)
                      S = m[H++], w = w > S ? S : w, y[Y++] = S;
                    Y += M;
                  }
                else
                  for (w = w > O ? O : w, U = 0; U < x; U++) {
                    for (F = 0; F < N; F++)
                      y[Y++] = O;
                    Y += M;
                  }
                if (J.encoding === 1 && H !== J.numValidPixels)
                  throw "Block and Mask do not match";
                n++;
              }
            }
        }
        return {
          resultPixels: y,
          resultMask: u,
          minValue: w
        };
      }, E = function(o) {
        return {
          fileIdentifierString: o.fileIdentifierString,
          fileVersion: o.fileVersion,
          imageType: o.imageType,
          height: o.height,
          width: o.width,
          maxZError: o.maxZError,
          eofOffset: o.eofOffset,
          mask: o.mask ? {
            numBlocksX: o.mask.numBlocksX,
            numBlocksY: o.mask.numBlocksY,
            numBytes: o.mask.numBytes,
            maxValue: o.mask.maxValue
          } : null,
          pixels: {
            numBlocksX: o.pixels.numBlocksX,
            numBlocksY: o.pixels.numBlocksY,
            numBytes: o.pixels.numBytes,
            maxValue: o.pixels.maxValue,
            noDataValue: o.noDataValue
          }
        };
      }, D = function(o) {
        for (var a = o.pixels.numBlocksX * o.pixels.numBlocksY, s = {}, r = 0; r < a; r++) {
          var c = o.pixels.blocks[r];
          c.encoding === 0 ? s.float32 = !0 : c.encoding === 1 ? s[c.bitsPerPixel] = !0 : s[0] = !0;
        }
        return Object.keys(s);
      }, e = function(o, a, s) {
        var r = {}, c = new Uint8Array(o, a, 10);
        if (r.fileIdentifierString = String.fromCharCode.apply(null, c), r.fileIdentifierString.trim() !== "CntZImage")
          throw "Unexpected file identifier string: " + r.fileIdentifierString;
        a += 10;
        var n = new DataView(o, a, 24);
        if (r.fileVersion = n.getInt32(0, !0), r.imageType = n.getInt32(4, !0), r.height = n.getUint32(8, !0), r.width = n.getUint32(12, !0), r.maxZError = n.getFloat64(16, !0), a += 24, !s)
          if (n = new DataView(o, a, 16), r.mask = {}, r.mask.numBlocksY = n.getUint32(0, !0), r.mask.numBlocksX = n.getUint32(4, !0), r.mask.numBytes = n.getUint32(8, !0), r.mask.maxValue = n.getFloat32(12, !0), a += 16, r.mask.numBytes > 0) {
            var h = new Uint8Array(Math.ceil(r.width * r.height / 8));
            n = new DataView(o, a, r.mask.numBytes);
            var l = n.getInt16(0, !0), G = 2, f = 0;
            do {
              if (l > 0)
                for (; l--; )
                  h[f++] = n.getUint8(G++);
              else {
                var d = n.getUint8(G++);
                for (l = -l; l--; )
                  h[f++] = d;
              }
              l = n.getInt16(G, !0), G += 2;
            } while (G < r.mask.numBytes);
            if (l !== -32768 || f < h.length)
              throw "Unexpected end of mask RLE encoding";
            r.mask.bitset = h, a += r.mask.numBytes;
          } else r.mask.numBytes | r.mask.numBlocksY | r.mask.maxValue || (r.mask.bitset = new Uint8Array(Math.ceil(r.width * r.height / 8)));
        n = new DataView(o, a, 16), r.pixels = {}, r.pixels.numBlocksY = n.getUint32(0, !0), r.pixels.numBlocksX = n.getUint32(4, !0), r.pixels.numBytes = n.getUint32(8, !0), r.pixels.maxValue = n.getFloat32(12, !0), a += 16;
        var w = r.pixels.numBlocksX, S = r.pixels.numBlocksY, y = w + (r.width % w > 0 ? 1 : 0), u = S + (r.height % S > 0 ? 1 : 0);
        r.pixels.blocks = new Array(y * u);
        for (var k = 0, F = 0; F < u; F++)
          for (var U = 0; U < y; U++) {
            var L = 0, x = o.byteLength - a;
            n = new DataView(o, a, Math.min(10, x));
            var R = {};
            r.pixels.blocks[k++] = R;
            var N = n.getUint8(0);
            if (L++, R.encoding = N & 63, R.encoding > 3)
              throw "Invalid block encoding (" + R.encoding + ")";
            if (R.encoding === 2) {
              a++;
              continue;
            }
            if (N !== 0 && N !== 2) {
              if (N >>= 6, R.offsetType = N, N === 2)
                R.offset = n.getInt8(1), L++;
              else if (N === 1)
                R.offset = n.getInt16(1, !0), L += 2;
              else if (N === 0)
                R.offset = n.getFloat32(1, !0), L += 4;
              else
                throw "Invalid block offset type";
              if (R.encoding === 1)
                if (N = n.getUint8(L), L++, R.bitsPerPixel = N & 63, N >>= 6, R.numValidPixelsType = N, N === 2)
                  R.numValidPixels = n.getUint8(L), L++;
                else if (N === 1)
                  R.numValidPixels = n.getUint16(L, !0), L += 2;
                else if (N === 0)
                  R.numValidPixels = n.getUint32(L, !0), L += 4;
                else
                  throw "Invalid valid pixel count type";
            }
            if (a += L, R.encoding !== 3) {
              var Y, M;
              if (R.encoding === 0) {
                var J = (r.pixels.numBytes - 1) / 4;
                if (J !== Math.floor(J))
                  throw "uncompressed block has invalid length";
                Y = new ArrayBuffer(J * 4), M = new Uint8Array(Y), M.set(new Uint8Array(o, a, J * 4));
                var m = new Float32Array(Y);
                R.rawData = m, a += J * 4;
              } else if (R.encoding === 1) {
                var H = Math.ceil(R.numValidPixels * R.bitsPerPixel / 8), O = Math.ceil(H / 4);
                Y = new ArrayBuffer(O * 4), M = new Uint8Array(Y), M.set(new Uint8Array(o, a, H)), R.stuffedData = new Uint32Array(Y), a += H;
              }
            }
          }
        return r.eofOffset = a, r;
      }, C = function(o, a, s, r, c, n, h) {
        var l = (1 << a) - 1, G = 0, f, d = 0, w, S, y = Math.ceil((h - r) / c), u = o.length * 4 - Math.ceil(a * s / 8);
        for (o[o.length - 1] <<= 8 * u, f = 0; f < s; f++) {
          if (d === 0 && (S = o[G++], d = 32), d >= a)
            w = S >>> d - a & l, d -= a;
          else {
            var k = a - d;
            w = (S & l) << k & l, S = o[G++], d = 32 - k, w += S >>> d;
          }
          n[f] = w < y ? r + w * c : h;
        }
        return n;
      };
      return Q;
    }(), A = /* @__PURE__ */ function() {
      var Q = {
        //methods ending with 2 are for the new byte order used by Lerc2.3 and above.
        //originalUnstuff is used to unpack Huffman code table. code is duplicated to unstuffx for performance reasons.
        unstuff: function(e, C, o, a, s, r, c, n) {
          var h = (1 << o) - 1, l = 0, G, f = 0, d, w, S, y, u = e.length * 4 - Math.ceil(o * a / 8);
          if (e[e.length - 1] <<= 8 * u, s)
            for (G = 0; G < a; G++)
              f === 0 && (w = e[l++], f = 32), f >= o ? (d = w >>> f - o & h, f -= o) : (S = o - f, d = (w & h) << S & h, w = e[l++], f = 32 - S, d += w >>> f), C[G] = s[d];
          else
            for (y = Math.ceil((n - r) / c), G = 0; G < a; G++)
              f === 0 && (w = e[l++], f = 32), f >= o ? (d = w >>> f - o & h, f -= o) : (S = o - f, d = (w & h) << S & h, w = e[l++], f = 32 - S, d += w >>> f), C[G] = d < y ? r + d * c : n;
        },
        unstuffLUT: function(e, C, o, a, s, r) {
          var c = (1 << C) - 1, n = 0, h = 0, l = 0, G = 0, f = 0, d, w = [], S = e.length * 4 - Math.ceil(C * o / 8);
          e[e.length - 1] <<= 8 * S;
          var y = Math.ceil((r - a) / s);
          for (h = 0; h < o; h++)
            G === 0 && (d = e[n++], G = 32), G >= C ? (f = d >>> G - C & c, G -= C) : (l = C - G, f = (d & c) << l & c, d = e[n++], G = 32 - l, f += d >>> G), w[h] = f < y ? a + f * s : r;
          return w.unshift(a), w;
        },
        unstuff2: function(e, C, o, a, s, r, c, n) {
          var h = (1 << o) - 1, l = 0, G, f = 0, d = 0, w, S, y;
          if (s)
            for (G = 0; G < a; G++)
              f === 0 && (S = e[l++], f = 32, d = 0), f >= o ? (w = S >>> d & h, f -= o, d += o) : (y = o - f, w = S >>> d & h, S = e[l++], f = 32 - y, w |= (S & (1 << y) - 1) << o - y, d = y), C[G] = s[w];
          else {
            var u = Math.ceil((n - r) / c);
            for (G = 0; G < a; G++)
              f === 0 && (S = e[l++], f = 32, d = 0), f >= o ? (w = S >>> d & h, f -= o, d += o) : (y = o - f, w = S >>> d & h, S = e[l++], f = 32 - y, w |= (S & (1 << y) - 1) << o - y, d = y), C[G] = w < u ? r + w * c : n;
          }
          return C;
        },
        unstuffLUT2: function(e, C, o, a, s, r) {
          var c = (1 << C) - 1, n = 0, h = 0, l = 0, G = 0, f = 0, d = 0, w, S = [], y = Math.ceil((r - a) / s);
          for (h = 0; h < o; h++)
            G === 0 && (w = e[n++], G = 32, d = 0), G >= C ? (f = w >>> d & c, G -= C, d += C) : (l = C - G, f = w >>> d & c, w = e[n++], G = 32 - l, f |= (w & (1 << l) - 1) << C - l, d = l), S[h] = f < y ? a + f * s : r;
          return S.unshift(a), S;
        },
        originalUnstuff: function(e, C, o, a) {
          var s = (1 << o) - 1, r = 0, c, n = 0, h, l, G, f = e.length * 4 - Math.ceil(o * a / 8);
          for (e[e.length - 1] <<= 8 * f, c = 0; c < a; c++)
            n === 0 && (l = e[r++], n = 32), n >= o ? (h = l >>> n - o & s, n -= o) : (G = o - n, h = (l & s) << G & s, l = e[r++], n = 32 - G, h += l >>> n), C[c] = h;
          return C;
        },
        originalUnstuff2: function(e, C, o, a) {
          var s = (1 << o) - 1, r = 0, c, n = 0, h = 0, l, G, f;
          for (c = 0; c < a; c++)
            n === 0 && (G = e[r++], n = 32, h = 0), n >= o ? (l = G >>> h & s, n -= o, h += o) : (f = o - n, l = G >>> h & s, G = e[r++], n = 32 - f, l |= (G & (1 << f) - 1) << o - f, h = f), C[c] = l;
          return C;
        }
      }, t = {
        HUFFMAN_LUT_BITS_MAX: 12,
        //use 2^12 lut, treat it like constant
        computeChecksumFletcher32: function(e) {
          for (var C = 65535, o = 65535, a = e.length, s = Math.floor(a / 2), r = 0; s; ) {
            var c = s >= 359 ? 359 : s;
            s -= c;
            do
              C += e[r++] << 8, o += C += e[r++];
            while (--c);
            C = (C & 65535) + (C >>> 16), o = (o & 65535) + (o >>> 16);
          }
          return a & 1 && (o += C += e[r] << 8), C = (C & 65535) + (C >>> 16), o = (o & 65535) + (o >>> 16), (o << 16 | C) >>> 0;
        },
        readHeaderInfo: function(e, C) {
          var o = C.ptr, a = new Uint8Array(e, o, 6), s = {};
          if (s.fileIdentifierString = String.fromCharCode.apply(null, a), s.fileIdentifierString.lastIndexOf("Lerc2", 0) !== 0)
            throw "Unexpected file identifier string (expect Lerc2 ): " + s.fileIdentifierString;
          o += 6;
          var r = new DataView(e, o, 8), c = r.getInt32(0, !0);
          s.fileVersion = c, o += 4, c >= 3 && (s.checksum = r.getUint32(4, !0), o += 4), r = new DataView(e, o, 12), s.height = r.getUint32(0, !0), s.width = r.getUint32(4, !0), o += 8, c >= 4 ? (s.numDims = r.getUint32(8, !0), o += 4) : s.numDims = 1, r = new DataView(e, o, 40), s.numValidPixel = r.getUint32(0, !0), s.microBlockSize = r.getInt32(4, !0), s.blobSize = r.getInt32(8, !0), s.imageType = r.getInt32(12, !0), s.maxZError = r.getFloat64(16, !0), s.zMin = r.getFloat64(24, !0), s.zMax = r.getFloat64(32, !0), o += 40, C.headerInfo = s, C.ptr = o;
          var n, h;
          if (c >= 3 && (h = c >= 4 ? 52 : 48, n = this.computeChecksumFletcher32(new Uint8Array(e, o - h, s.blobSize - 14)), n !== s.checksum))
            throw "Checksum failed.";
          return !0;
        },
        checkMinMaxRanges: function(e, C) {
          var o = C.headerInfo, a = this.getDataTypeArray(o.imageType), s = o.numDims * this.getDataTypeSize(o.imageType), r = this.readSubArray(e, C.ptr, a, s), c = this.readSubArray(e, C.ptr + s, a, s);
          C.ptr += 2 * s;
          var n, h = !0;
          for (n = 0; n < o.numDims; n++)
            if (r[n] !== c[n]) {
              h = !1;
              break;
            }
          return o.minValues = r, o.maxValues = c, h;
        },
        readSubArray: function(e, C, o, a) {
          var s;
          if (o === Uint8Array)
            s = new Uint8Array(e, C, a);
          else {
            var r = new ArrayBuffer(a), c = new Uint8Array(r);
            c.set(new Uint8Array(e, C, a)), s = new o(r);
          }
          return s;
        },
        readMask: function(e, C) {
          var o = C.ptr, a = C.headerInfo, s = a.width * a.height, r = a.numValidPixel, c = new DataView(e, o, 4), n = {};
          if (n.numBytes = c.getUint32(0, !0), o += 4, (r === 0 || s === r) && n.numBytes !== 0)
            throw "invalid mask";
          var h, l;
          if (r === 0)
            h = new Uint8Array(Math.ceil(s / 8)), n.bitset = h, l = new Uint8Array(s), C.pixels.resultMask = l, o += n.numBytes;
          else if (n.numBytes > 0) {
            h = new Uint8Array(Math.ceil(s / 8)), c = new DataView(e, o, n.numBytes);
            var G = c.getInt16(0, !0), f = 2, d = 0, w = 0;
            do {
              if (G > 0)
                for (; G--; )
                  h[d++] = c.getUint8(f++);
              else
                for (w = c.getUint8(f++), G = -G; G--; )
                  h[d++] = w;
              G = c.getInt16(f, !0), f += 2;
            } while (f < n.numBytes);
            if (G !== -32768 || d < h.length)
              throw "Unexpected end of mask RLE encoding";
            l = new Uint8Array(s);
            var S = 0, y = 0;
            for (y = 0; y < s; y++)
              y & 7 ? (S = h[y >> 3], S <<= y & 7) : S = h[y >> 3], S & 128 && (l[y] = 1);
            C.pixels.resultMask = l, n.bitset = h, o += n.numBytes;
          }
          return C.ptr = o, C.mask = n, !0;
        },
        readDataOneSweep: function(e, C, o, a) {
          var s = C.ptr, r = C.headerInfo, c = r.numDims, n = r.width * r.height, h = r.imageType, l = r.numValidPixel * t.getDataTypeSize(h) * c, G, f = C.pixels.resultMask;
          if (o === Uint8Array)
            G = new Uint8Array(e, s, l);
          else {
            var d = new ArrayBuffer(l), w = new Uint8Array(d);
            w.set(new Uint8Array(e, s, l)), G = new o(d);
          }
          if (G.length === n * c)
            a ? C.pixels.resultPixels = t.swapDimensionOrder(G, n, c, o, !0) : C.pixels.resultPixels = G;
          else {
            C.pixels.resultPixels = new o(n * c);
            var S = 0, y = 0, u = 0, k = 0;
            if (c > 1) {
              if (a) {
                for (y = 0; y < n; y++)
                  if (f[y])
                    for (k = y, u = 0; u < c; u++, k += n)
                      C.pixels.resultPixels[k] = G[S++];
              } else
                for (y = 0; y < n; y++)
                  if (f[y])
                    for (k = y * c, u = 0; u < c; u++)
                      C.pixels.resultPixels[k + u] = G[S++];
            } else
              for (y = 0; y < n; y++)
                f[y] && (C.pixels.resultPixels[y] = G[S++]);
          }
          return s += l, C.ptr = s, !0;
        },
        readHuffmanTree: function(e, C) {
          var o = this.HUFFMAN_LUT_BITS_MAX, a = new DataView(e, C.ptr, 16);
          C.ptr += 16;
          var s = a.getInt32(0, !0);
          if (s < 2)
            throw "unsupported Huffman version";
          var r = a.getInt32(4, !0), c = a.getInt32(8, !0), n = a.getInt32(12, !0);
          if (c >= n)
            return !1;
          var h = new Uint32Array(n - c);
          t.decodeBits(e, C, h);
          var l = [], G, f, d, w;
          for (G = c; G < n; G++)
            f = G - (G < r ? 0 : r), l[f] = { first: h[G - c], second: null };
          var S = e.byteLength - C.ptr, y = Math.ceil(S / 4), u = new ArrayBuffer(y * 4), k = new Uint8Array(u);
          k.set(new Uint8Array(e, C.ptr, S));
          var F = new Uint32Array(u), U = 0, L, x = 0;
          for (L = F[0], G = c; G < n; G++)
            f = G - (G < r ? 0 : r), w = l[f].first, w > 0 && (l[f].second = L << U >>> 32 - w, 32 - U >= w ? (U += w, U === 32 && (U = 0, x++, L = F[x])) : (U += w - 32, x++, L = F[x], l[f].second |= L >>> 32 - U));
          var R = 0, N = 0, Y = new E();
          for (G = 0; G < l.length; G++)
            l[G] !== void 0 && (R = Math.max(R, l[G].first));
          R >= o ? N = o : N = R;
          var M = [], J, m, H, O, j, K;
          for (G = c; G < n; G++)
            if (f = G - (G < r ? 0 : r), w = l[f].first, w > 0)
              if (J = [w, f], w <= N)
                for (m = l[f].second << N - w, H = 1 << N - w, d = 0; d < H; d++)
                  M[m | d] = J;
              else
                for (m = l[f].second, K = Y, O = w - 1; O >= 0; O--)
                  j = m >>> O & 1, j ? (K.right || (K.right = new E()), K = K.right) : (K.left || (K.left = new E()), K = K.left), O === 0 && !K.val && (K.val = J[1]);
          return {
            decodeLut: M,
            numBitsLUTQick: N,
            numBitsLUT: R,
            tree: Y,
            stuffedData: F,
            srcPtr: x,
            bitPos: U
          };
        },
        readHuffman: function(e, C, o, a) {
          var s = C.headerInfo, r = s.numDims, c = C.headerInfo.height, n = C.headerInfo.width, h = n * c, l = this.readHuffmanTree(e, C), G = l.decodeLut, f = l.tree, d = l.stuffedData, w = l.srcPtr, S = l.bitPos, y = l.numBitsLUTQick, u = l.numBitsLUT, k = C.headerInfo.imageType === 0 ? 128 : 0, F, U, L, x = C.pixels.resultMask, R, N, Y, M, J, m, H, O = 0;
          S > 0 && (w++, S = 0);
          var j = d[w], K = C.encodeMode === 1, b = new o(h * r), p = b, T;
          if (r < 2 || K) {
            for (T = 0; T < r; T++)
              if (r > 1 && (p = new o(b.buffer, h * T, h), O = 0), C.headerInfo.numValidPixel === n * c)
                for (m = 0, M = 0; M < c; M++)
                  for (J = 0; J < n; J++, m++) {
                    if (U = 0, R = j << S >>> 32 - y, N = R, 32 - S < y && (R |= d[w + 1] >>> 64 - S - y, N = R), G[N])
                      U = G[N][1], S += G[N][0];
                    else
                      for (R = j << S >>> 32 - u, N = R, 32 - S < u && (R |= d[w + 1] >>> 64 - S - u, N = R), F = f, H = 0; H < u; H++)
                        if (Y = R >>> u - H - 1 & 1, F = Y ? F.right : F.left, !(F.left || F.right)) {
                          U = F.val, S = S + H + 1;
                          break;
                        }
                    S >= 32 && (S -= 32, w++, j = d[w]), L = U - k, K ? (J > 0 ? L += O : M > 0 ? L += p[m - n] : L += O, L &= 255, p[m] = L, O = L) : p[m] = L;
                  }
              else
                for (m = 0, M = 0; M < c; M++)
                  for (J = 0; J < n; J++, m++)
                    if (x[m]) {
                      if (U = 0, R = j << S >>> 32 - y, N = R, 32 - S < y && (R |= d[w + 1] >>> 64 - S - y, N = R), G[N])
                        U = G[N][1], S += G[N][0];
                      else
                        for (R = j << S >>> 32 - u, N = R, 32 - S < u && (R |= d[w + 1] >>> 64 - S - u, N = R), F = f, H = 0; H < u; H++)
                          if (Y = R >>> u - H - 1 & 1, F = Y ? F.right : F.left, !(F.left || F.right)) {
                            U = F.val, S = S + H + 1;
                            break;
                          }
                      S >= 32 && (S -= 32, w++, j = d[w]), L = U - k, K ? (J > 0 && x[m - 1] ? L += O : M > 0 && x[m - n] ? L += p[m - n] : L += O, L &= 255, p[m] = L, O = L) : p[m] = L;
                    }
          } else
            for (m = 0, M = 0; M < c; M++)
              for (J = 0; J < n; J++)
                if (m = M * n + J, !x || x[m])
                  for (T = 0; T < r; T++, m += h) {
                    if (U = 0, R = j << S >>> 32 - y, N = R, 32 - S < y && (R |= d[w + 1] >>> 64 - S - y, N = R), G[N])
                      U = G[N][1], S += G[N][0];
                    else
                      for (R = j << S >>> 32 - u, N = R, 32 - S < u && (R |= d[w + 1] >>> 64 - S - u, N = R), F = f, H = 0; H < u; H++)
                        if (Y = R >>> u - H - 1 & 1, F = Y ? F.right : F.left, !(F.left || F.right)) {
                          U = F.val, S = S + H + 1;
                          break;
                        }
                    S >= 32 && (S -= 32, w++, j = d[w]), L = U - k, p[m] = L;
                  }
          C.ptr = C.ptr + (w + 1) * 4 + (S > 0 ? 4 : 0), C.pixels.resultPixels = b, r > 1 && !a && (C.pixels.resultPixels = t.swapDimensionOrder(b, h, r, o));
        },
        decodeBits: function(e, C, o, a, s) {
          {
            var r = C.headerInfo, c = r.fileVersion, n = 0, h = e.byteLength - C.ptr >= 5 ? 5 : e.byteLength - C.ptr, l = new DataView(e, C.ptr, h), G = l.getUint8(0);
            n++;
            var f = G >> 6, d = f === 0 ? 4 : 3 - f, w = (G & 32) > 0, S = G & 31, y = 0;
            if (d === 1)
              y = l.getUint8(n), n++;
            else if (d === 2)
              y = l.getUint16(n, !0), n += 2;
            else if (d === 4)
              y = l.getUint32(n, !0), n += 4;
            else
              throw "Invalid valid pixel count type";
            var u = 2 * r.maxZError, k, F, U, L, x, R, N, Y, M, J = r.numDims > 1 ? r.maxValues[s] : r.zMax;
            if (w) {
              for (C.counter.lut++, Y = l.getUint8(n), n++, L = Math.ceil((Y - 1) * S / 8), x = Math.ceil(L / 4), F = new ArrayBuffer(x * 4), U = new Uint8Array(F), C.ptr += n, U.set(new Uint8Array(e, C.ptr, L)), N = new Uint32Array(F), C.ptr += L, M = 0; Y - 1 >>> M; )
                M++;
              L = Math.ceil(y * M / 8), x = Math.ceil(L / 4), F = new ArrayBuffer(x * 4), U = new Uint8Array(F), U.set(new Uint8Array(e, C.ptr, L)), k = new Uint32Array(F), C.ptr += L, c >= 3 ? R = Q.unstuffLUT2(N, S, Y - 1, a, u, J) : R = Q.unstuffLUT(N, S, Y - 1, a, u, J), c >= 3 ? Q.unstuff2(k, o, M, y, R) : Q.unstuff(k, o, M, y, R);
            } else
              C.counter.bitstuffer++, M = S, C.ptr += n, M > 0 && (L = Math.ceil(y * M / 8), x = Math.ceil(L / 4), F = new ArrayBuffer(x * 4), U = new Uint8Array(F), U.set(new Uint8Array(e, C.ptr, L)), k = new Uint32Array(F), C.ptr += L, c >= 3 ? a == null ? Q.originalUnstuff2(k, o, M, y) : Q.unstuff2(k, o, M, y, !1, a, u, J) : a == null ? Q.originalUnstuff(k, o, M, y) : Q.unstuff(k, o, M, y, !1, a, u, J));
          }
        },
        readTiles: function(e, C, o, a) {
          var s = C.headerInfo, r = s.width, c = s.height, n = r * c, h = s.microBlockSize, l = s.imageType, G = t.getDataTypeSize(l), f = Math.ceil(r / h), d = Math.ceil(c / h);
          C.pixels.numBlocksY = d, C.pixels.numBlocksX = f, C.pixels.ptr = 0;
          var w = 0, S = 0, y = 0, u = 0, k = 0, F = 0, U = 0, L = 0, x = 0, R = 0, N = 0, Y = 0, M = 0, J = 0, m = 0, H = 0, O, j, K, b, p, T, v = new o(h * h), V = c % h || h, _ = r % h || h, $, X, JA = s.numDims, hA, gA = C.pixels.resultMask, AA = C.pixels.resultPixels, EB = s.fileVersion, bI = EB >= 5 ? 14 : 15, rA, II = s.zMax, aA;
          for (y = 0; y < d; y++)
            for (k = y !== d - 1 ? h : V, u = 0; u < f; u++)
              for (F = u !== f - 1 ? h : _, N = y * r * h + u * h, Y = r - F, hA = 0; hA < JA; hA++) {
                if (JA > 1 ? (aA = AA, N = y * r * h + u * h, AA = new o(C.pixels.resultPixels.buffer, n * hA * G, n), II = s.maxValues[hA]) : aA = null, U = e.byteLength - C.ptr, O = new DataView(e, C.ptr, Math.min(10, U)), j = {}, H = 0, L = O.getUint8(0), H++, rA = s.fileVersion >= 5 ? L & 4 : 0, x = L >> 6 & 255, R = L >> 2 & bI, R !== (u * h >> 3 & bI) || rA && hA === 0)
                  throw "integrity issue";
                if (T = L & 3, T > 3)
                  throw C.ptr += H, "Invalid block encoding (" + T + ")";
                if (T === 2) {
                  if (rA)
                    if (gA)
                      for (w = 0; w < k; w++)
                        for (S = 0; S < F; S++)
                          gA[N] && (AA[N] = aA[N]), N++;
                    else
                      for (w = 0; w < k; w++)
                        for (S = 0; S < F; S++)
                          AA[N] = aA[N], N++;
                  C.counter.constant++, C.ptr += H;
                  continue;
                } else if (T === 0) {
                  if (rA)
                    throw "integrity issue";
                  if (C.counter.uncompressed++, C.ptr += H, M = k * F * G, J = e.byteLength - C.ptr, M = M < J ? M : J, K = new ArrayBuffer(M % G === 0 ? M : M + G - M % G), b = new Uint8Array(K), b.set(new Uint8Array(e, C.ptr, M)), p = new o(K), m = 0, gA)
                    for (w = 0; w < k; w++) {
                      for (S = 0; S < F; S++)
                        gA[N] && (AA[N] = p[m++]), N++;
                      N += Y;
                    }
                  else
                    for (w = 0; w < k; w++) {
                      for (S = 0; S < F; S++)
                        AA[N++] = p[m++];
                      N += Y;
                    }
                  C.ptr += m * G;
                } else if ($ = t.getDataTypeUsed(rA && l < 6 ? 4 : l, x), X = t.getOnePixel(j, H, $, O), H += t.getDataTypeSize($), T === 3)
                  if (C.ptr += H, C.counter.constantoffset++, gA)
                    for (w = 0; w < k; w++) {
                      for (S = 0; S < F; S++)
                        gA[N] && (AA[N] = rA ? Math.min(II, aA[N] + X) : X), N++;
                      N += Y;
                    }
                  else
                    for (w = 0; w < k; w++) {
                      for (S = 0; S < F; S++)
                        AA[N] = rA ? Math.min(II, aA[N] + X) : X, N++;
                      N += Y;
                    }
                else if (C.ptr += H, t.decodeBits(e, C, v, X, hA), H = 0, rA)
                  if (gA)
                    for (w = 0; w < k; w++) {
                      for (S = 0; S < F; S++)
                        gA[N] && (AA[N] = v[H++] + aA[N]), N++;
                      N += Y;
                    }
                  else
                    for (w = 0; w < k; w++) {
                      for (S = 0; S < F; S++)
                        AA[N] = v[H++] + aA[N], N++;
                      N += Y;
                    }
                else if (gA)
                  for (w = 0; w < k; w++) {
                    for (S = 0; S < F; S++)
                      gA[N] && (AA[N] = v[H++]), N++;
                    N += Y;
                  }
                else
                  for (w = 0; w < k; w++) {
                    for (S = 0; S < F; S++)
                      AA[N++] = v[H++];
                    N += Y;
                  }
              }
          JA > 1 && !a && (C.pixels.resultPixels = t.swapDimensionOrder(C.pixels.resultPixels, n, JA, o));
        },
        /*****************
        *  private methods (helper methods)
        *****************/
        formatFileInfo: function(e) {
          return {
            fileIdentifierString: e.headerInfo.fileIdentifierString,
            fileVersion: e.headerInfo.fileVersion,
            imageType: e.headerInfo.imageType,
            height: e.headerInfo.height,
            width: e.headerInfo.width,
            numValidPixel: e.headerInfo.numValidPixel,
            microBlockSize: e.headerInfo.microBlockSize,
            blobSize: e.headerInfo.blobSize,
            maxZError: e.headerInfo.maxZError,
            pixelType: t.getPixelType(e.headerInfo.imageType),
            eofOffset: e.eofOffset,
            mask: e.mask ? {
              numBytes: e.mask.numBytes
            } : null,
            pixels: {
              numBlocksX: e.pixels.numBlocksX,
              numBlocksY: e.pixels.numBlocksY,
              //"numBytes": data.pixels.numBytes,
              maxValue: e.headerInfo.zMax,
              minValue: e.headerInfo.zMin,
              noDataValue: e.noDataValue
            }
          };
        },
        constructConstantSurface: function(e, C) {
          var o = e.headerInfo.zMax, a = e.headerInfo.zMin, s = e.headerInfo.maxValues, r = e.headerInfo.numDims, c = e.headerInfo.height * e.headerInfo.width, n = 0, h = 0, l = 0, G = e.pixels.resultMask, f = e.pixels.resultPixels;
          if (G)
            if (r > 1) {
              if (C)
                for (n = 0; n < r; n++)
                  for (l = n * c, o = s[n], h = 0; h < c; h++)
                    G[h] && (f[l + h] = o);
              else
                for (h = 0; h < c; h++)
                  if (G[h])
                    for (l = h * r, n = 0; n < r; n++)
                      f[l + r] = s[n];
            } else
              for (h = 0; h < c; h++)
                G[h] && (f[h] = o);
          else if (r > 1 && a !== o)
            if (C)
              for (n = 0; n < r; n++)
                for (l = n * c, o = s[n], h = 0; h < c; h++)
                  f[l + h] = o;
            else
              for (h = 0; h < c; h++)
                for (l = h * r, n = 0; n < r; n++)
                  f[l + n] = s[n];
          else
            for (h = 0; h < c * r; h++)
              f[h] = o;
        },
        getDataTypeArray: function(e) {
          var C;
          switch (e) {
            case 0:
              C = Int8Array;
              break;
            case 1:
              C = Uint8Array;
              break;
            case 2:
              C = Int16Array;
              break;
            case 3:
              C = Uint16Array;
              break;
            case 4:
              C = Int32Array;
              break;
            case 5:
              C = Uint32Array;
              break;
            case 6:
              C = Float32Array;
              break;
            case 7:
              C = Float64Array;
              break;
            default:
              C = Float32Array;
          }
          return C;
        },
        getPixelType: function(e) {
          var C;
          switch (e) {
            case 0:
              C = "S8";
              break;
            case 1:
              C = "U8";
              break;
            case 2:
              C = "S16";
              break;
            case 3:
              C = "U16";
              break;
            case 4:
              C = "S32";
              break;
            case 5:
              C = "U32";
              break;
            case 6:
              C = "F32";
              break;
            case 7:
              C = "F64";
              break;
            default:
              C = "F32";
          }
          return C;
        },
        isValidPixelValue: function(e, C) {
          if (C == null)
            return !1;
          var o;
          switch (e) {
            case 0:
              o = C >= -128 && C <= 127;
              break;
            case 1:
              o = C >= 0 && C <= 255;
              break;
            case 2:
              o = C >= -32768 && C <= 32767;
              break;
            case 3:
              o = C >= 0 && C <= 65536;
              break;
            case 4:
              o = C >= -2147483648 && C <= 2147483647;
              break;
            case 5:
              o = C >= 0 && C <= 4294967296;
              break;
            case 6:
              o = C >= -34027999387901484e22 && C <= 34027999387901484e22;
              break;
            case 7:
              o = C >= -17976931348623157e292 && C <= 17976931348623157e292;
              break;
            default:
              o = !1;
          }
          return o;
        },
        getDataTypeSize: function(e) {
          var C = 0;
          switch (e) {
            case 0:
            case 1:
              C = 1;
              break;
            case 2:
            case 3:
              C = 2;
              break;
            case 4:
            case 5:
            case 6:
              C = 4;
              break;
            case 7:
              C = 8;
              break;
            default:
              C = e;
          }
          return C;
        },
        getDataTypeUsed: function(e, C) {
          var o = e;
          switch (e) {
            case 2:
            case 4:
              o = e - C;
              break;
            case 3:
            case 5:
              o = e - 2 * C;
              break;
            case 6:
              C === 0 ? o = e : C === 1 ? o = 2 : o = 1;
              break;
            case 7:
              C === 0 ? o = e : o = e - 2 * C + 1;
              break;
            default:
              o = e;
              break;
          }
          return o;
        },
        getOnePixel: function(e, C, o, a) {
          var s = 0;
          switch (o) {
            case 0:
              s = a.getInt8(C);
              break;
            case 1:
              s = a.getUint8(C);
              break;
            case 2:
              s = a.getInt16(C, !0);
              break;
            case 3:
              s = a.getUint16(C, !0);
              break;
            case 4:
              s = a.getInt32(C, !0);
              break;
            case 5:
              s = a.getUInt32(C, !0);
              break;
            case 6:
              s = a.getFloat32(C, !0);
              break;
            case 7:
              s = a.getFloat64(C, !0);
              break;
            default:
              throw "the decoder does not understand this pixel type";
          }
          return s;
        },
        swapDimensionOrder: function(e, C, o, a, s) {
          var r = 0, c = 0, n = 0, h = 0, l = e;
          if (o > 1)
            if (l = new a(C * o), s)
              for (r = 0; r < C; r++)
                for (h = r, n = 0; n < o; n++, h += C)
                  l[h] = e[c++];
            else
              for (r = 0; r < C; r++)
                for (h = r, n = 0; n < o; n++, h += C)
                  l[c++] = e[h];
          return l;
        }
      }, E = function(e, C, o) {
        this.val = e, this.left = C, this.right = o;
      }, D = {
        /*
        * ********removed options compared to LERC1. We can bring some of them back if needed.
         * removed pixel type. LERC2 is typed and doesn't require user to give pixel type
         * changed encodedMaskData to maskData. LERC2 's js version make it faster to use maskData directly.
         * removed returnMask. mask is used by LERC2 internally and is cost free. In case of user input mask, it's returned as well and has neglible cost.
         * removed nodatavalue. Because LERC2 pixels are typed, nodatavalue will sacrify a useful value for many types (8bit, 16bit) etc,
         *       user has to be knowledgable enough about raster and their data to avoid usability issues. so nodata value is simply removed now.
         *       We can add it back later if their's a clear requirement.
         * removed encodedMask. This option was not implemented in LercDecode. It can be done after decoding (less efficient)
         * removed computeUsedBitDepths.
         *
         *
         * response changes compared to LERC1
         * 1. encodedMaskData is not available
         * 2. noDataValue is optional (returns only if user's noDataValue is with in the valid data type range)
         * 3. maskData is always available
        */
        /*****************
        *  public properties
        ******************/
        //HUFFMAN_LUT_BITS_MAX: 12, //use 2^12 lut, not configurable
        /*****************
        *  public methods
        *****************/
        /**
         * Decode a LERC2 byte stream and return an object containing the pixel data and optional metadata.
         *
         * @param {ArrayBuffer} input The LERC input byte stream
         * @param {object} [options] options Decoding options
         * @param {number} [options.inputOffset] The number of bytes to skip in the input byte stream. A valid LERC file is expected at that position
         * @param {boolean} [options.returnFileInfo] If true, the return value will have a fileInfo property that contains metadata obtained from the LERC headers and the decoding process
         * @param {boolean} [options.returnPixelInterleavedDims]  If true, returned dimensions are pixel-interleaved, a.k.a [p1_dim0, p1_dim1, p1_dimn, p2_dim0...], default is [p1_dim0, p2_dim0, ..., p1_dim1, p2_dim1...]
         */
        decode: function(e, C) {
          C = C || {};
          var o = C.noDataValue, a = 0, s = {};
          if (s.ptr = C.inputOffset || 0, s.pixels = {}, !!t.readHeaderInfo(e, s)) {
            var r = s.headerInfo, c = r.fileVersion, n = t.getDataTypeArray(r.imageType);
            if (c > 5)
              throw "unsupported lerc version 2." + c;
            t.readMask(e, s), r.numValidPixel !== r.width * r.height && !s.pixels.resultMask && (s.pixels.resultMask = C.maskData);
            var h = r.width * r.height;
            s.pixels.resultPixels = new n(h * r.numDims), s.counter = {
              onesweep: 0,
              uncompressed: 0,
              lut: 0,
              bitstuffer: 0,
              constant: 0,
              constantoffset: 0
            };
            var l = !C.returnPixelInterleavedDims;
            if (r.numValidPixel !== 0)
              if (r.zMax === r.zMin)
                t.constructConstantSurface(s, l);
              else if (c >= 4 && t.checkMinMaxRanges(e, s))
                t.constructConstantSurface(s, l);
              else {
                var G = new DataView(e, s.ptr, 2), f = G.getUint8(0);
                if (s.ptr++, f)
                  t.readDataOneSweep(e, s, n, l);
                else if (c > 1 && r.imageType <= 1 && Math.abs(r.maxZError - 0.5) < 1e-5) {
                  var d = G.getUint8(1);
                  if (s.ptr++, s.encodeMode = d, d > 2 || c < 4 && d > 1)
                    throw "Invalid Huffman flag " + d;
                  d ? t.readHuffman(e, s, n, l) : t.readTiles(e, s, n, l);
                } else
                  t.readTiles(e, s, n, l);
              }
            s.eofOffset = s.ptr;
            var w;
            C.inputOffset ? (w = s.headerInfo.blobSize + C.inputOffset - s.ptr, Math.abs(w) >= 1 && (s.eofOffset = C.inputOffset + s.headerInfo.blobSize)) : (w = s.headerInfo.blobSize - s.ptr, Math.abs(w) >= 1 && (s.eofOffset = s.headerInfo.blobSize));
            var S = {
              width: r.width,
              height: r.height,
              pixelData: s.pixels.resultPixels,
              minValue: r.zMin,
              maxValue: r.zMax,
              validPixelCount: r.numValidPixel,
              dimCount: r.numDims,
              dimStats: {
                minValues: r.minValues,
                maxValues: r.maxValues
              },
              maskData: s.pixels.resultMask
              //noDataValue: noDataValue
            };
            if (s.pixels.resultMask && t.isValidPixelValue(r.imageType, o)) {
              var y = s.pixels.resultMask;
              for (a = 0; a < h; a++)
                y[a] || (S.pixelData[a] = o);
              S.noDataValue = o;
            }
            return s.noDataValue = o, C.returnFileInfo && (S.fileInfo = t.formatFileInfo(s)), S;
          }
        },
        getBandCount: function(e) {
          var C = 0, o = 0, a = {};
          for (a.ptr = 0, a.pixels = {}; o < e.byteLength - 58; )
            t.readHeaderInfo(e, a), o += a.headerInfo.blobSize, C++, a.ptr = o;
          return C;
        }
      };
      return D;
    }(), B = function() {
      var Q = new ArrayBuffer(4), t = new Uint8Array(Q), E = new Uint32Array(Q);
      return E[0] = 1, t[0] === 1;
    }(), i = {
      /************wrapper**********************************************/
      /**
       * A wrapper for decoding both LERC1 and LERC2 byte streams capable of handling multiband pixel blocks for various pixel types.
       *
       * @alias module:Lerc
       * @param {ArrayBuffer} input The LERC input byte stream
       * @param {object} [options] The decoding options below are optional.
       * @param {number} [options.inputOffset] The number of bytes to skip in the input byte stream. A valid Lerc file is expected at that position.
       * @param {string} [options.pixelType] (LERC1 only) Default value is F32. Valid pixel types for input are U8/S8/S16/U16/S32/U32/F32.
       * @param {number} [options.noDataValue] (LERC1 only). It is recommended to use the returned mask instead of setting this value.
       * @param {boolean} [options.returnPixelInterleavedDims] (nDim LERC2 only) If true, returned dimensions are pixel-interleaved, a.k.a [p1_dim0, p1_dim1, p1_dimn, p2_dim0...], default is [p1_dim0, p2_dim0, ..., p1_dim1, p2_dim1...]
       * @returns {{width, height, pixels, pixelType, mask, statistics}}
         * @property {number} width Width of decoded image.
         * @property {number} height Height of decoded image.
         * @property {array} pixels [band1, band2, …] Each band is a typed array of width*height.
         * @property {string} pixelType The type of pixels represented in the output.
         * @property {mask} mask Typed array with a size of width*height, or null if all pixels are valid.
         * @property {array} statistics [statistics_band1, statistics_band2, …] Each element is a statistics object representing min and max values
      **/
      decode: function(Q, t) {
        if (!B)
          throw "Big endian system is not supported.";
        t = t || {};
        var E = t.inputOffset || 0, D = new Uint8Array(Q, E, 10), e = String.fromCharCode.apply(null, D), C, o;
        if (e.trim() === "CntZImage")
          C = I, o = 1;
        else if (e.substring(0, 5) === "Lerc2")
          C = A, o = 2;
        else
          throw "Unexpected file identifier string: " + e;
        for (var a = 0, s = Q.byteLength - 10, r, c = [], n, h, l = {
          width: 0,
          height: 0,
          pixels: [],
          pixelType: t.pixelType,
          mask: null,
          statistics: []
        }, G = 0; E < s; ) {
          var f = C.decode(Q, {
            inputOffset: E,
            //for both lerc1 and lerc2
            encodedMaskData: r,
            //lerc1 only
            maskData: h,
            //lerc2 only
            returnMask: a === 0,
            //lerc1 only
            returnEncodedMask: a === 0,
            //lerc1 only
            returnFileInfo: !0,
            //for both lerc1 and lerc2
            returnPixelInterleavedDims: t.returnPixelInterleavedDims,
            //for ndim lerc2 only
            pixelType: t.pixelType || null,
            //lerc1 only
            noDataValue: t.noDataValue || null
            //lerc1 only
          });
          E = f.fileInfo.eofOffset, h = f.maskData, a === 0 && (r = f.encodedMaskData, l.width = f.width, l.height = f.height, l.dimCount = f.dimCount || 1, l.pixelType = f.pixelType || f.fileInfo.pixelType, l.mask = h), o > 1 && (h && c.push(h), f.fileInfo.mask && f.fileInfo.mask.numBytes > 0 && G++), a++, l.pixels.push(f.pixelData), l.statistics.push({
            minValue: f.minValue,
            maxValue: f.maxValue,
            noDataValue: f.noDataValue,
            dimStats: f.dimStats
          });
        }
        var d, w, S;
        if (o > 1 && G > 1) {
          for (S = l.width * l.height, l.bandMasks = c, h = new Uint8Array(S), h.set(c[0]), d = 1; d < c.length; d++)
            for (n = c[d], w = 0; w < S; w++)
              h[w] = h[w] & n[w];
          l.maskData = h;
        }
        return l;
      }
    };
    g.exports ? g.exports = i : this.Lerc = i;
  })();
})(QB);
var le = QB.exports;
const fe = /* @__PURE__ */ uI(le);
let uA, tA, NI;
const cI = {
  env: {
    emscripten_notify_memory_growth: (g) => {
      NI = new Uint8Array(tA.exports.memory.buffer);
    }
  }
};
let ye = class {
  init() {
    return uA || (typeof fetch < "u" ? uA = fetch(`data:application/wasm;base64,${Fg}`).then((I) => I.arrayBuffer()).then((I) => WebAssembly.instantiate(I, cI)).then(this._init) : uA = WebAssembly.instantiate(Buffer.from(Fg, "base64"), cI).then(this._init), uA);
  }
  _init(I) {
    tA = I.instance, cI.env.emscripten_notify_memory_growth(0);
  }
  decode(I, A = 0) {
    if (!tA) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const B = I.byteLength, i = tA.exports.malloc(B);
    NI.set(I, i), A = A || Number(tA.exports.ZSTD_findDecompressedSize(i, B));
    const Q = tA.exports.malloc(A), t = tA.exports.ZSTD_decompress(Q, A, i, B), E = NI.slice(Q, Q + t);
    return tA.exports.free(i), tA.exports.free(Q), E;
  }
};
const Fg = "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AikACDcACCAHIDo3AAAgEUEZSA0BIARBGGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgCkkNAAsMAQsCQAJAIAUoAswCIhEgBUHgAWogJUEHcUEMbGoiDygCACICaiIHIBxLDQAgCSAPKAIEIgogAmoiBmogG0sNACAGQSBqIBQgCWtNDQELIAUgDygCCDYCoAEgBSAPKQIANwOYASAJIBQgBUGYAWogBUHMAmogHCALIBcgIhAgIQYMAQsgAiAJaiEEIA8oAgghFSARKQAAITogCSARKQAINwAIIAkgOjcAAAJAIAJBEUkNACARKQAQITogCSARKQAYNwAYIAkgOjcAECACQRBrQRFIDQAgEUEQaiECIAlBIGohEgNAIAIpABAhOiASIAIpABg3AAggEiA6NwAAIAIpACAhOiASIAIpACg3ABggEiA6NwAQIAJBIGohAiASQSBqIhIgBEkNAAsLIAQgFWshAiAFIAc2AswCIAQgC2sgFUkEQCAVIAQgF2tLDQwgIiAiIAIgC2siD2oiByAKak8EQCAKRQ0CIAQgByAK/AoAAAwCC0EAIA9rIgIEQCAEIAcgAvwKAAALIAogD2ohCiAEIA9rIQQgCyECCyAVQRBPBEAgAikAACE6IAQgAikACDcACCAEIDo3AAAgCkERSA0BIAQgCmohByAEQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAELAkAgFUEHTQRAIAQgAi0AADoAACAEIAItAAE6AAEgBCACLQACOgACIAQgAi0AAzoAAyAEIAIgFUECdCIHQeAaaigCAGoiAigAADYABCACIAdBgBtqKAIAayECDAELIAQgAikAADcAAAsgCkEJSQ0AIAQgCmohDyAEQQhqIgcgAkEIaiICa0EPTARAA0AgByACKQAANwAAIAJBCGohAiAHQQhqIgcgD0kNAAwCCwALIAIpAAAhOiAHIAIpAAg3AAggByA6NwAAIApBGUgNACAEQRhqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIA9JDQALCyAGQYh/SwRAIAYhAwwLCyAFQeABaiAlQQdxQQxsaiICIA02AgggAiAMNgIEIAIgEDYCAAsgBiAJaiEJICVBAWohJSAQIC1qIAxqIS0MAQsLIAUoArABIAUoArQBRw0HIAUoAqwBQSBHDQcgDiAoayEQA0ACQCAOIBBMBEBBACECA0AgAkEDRg0CIDIgAkECdCIDaiADICZqKAIANgIAIAJBAWohAgwACwALIAVB4AFqIBBBB3FBDGxqIQoCfwJAIAgoAoTsAUECRgRAIAUoAswCIg8gCigCACIEaiIHIAgoAoDsASICSwRAIAIgD0cEQCACIA9rIgIgFCAJa0sNCyAJIA8gAhAfIAogBCACayIENgIAIAIgCWohCQsgBSAWNgLMAiAIQQA2AoTsAQJAAkACQCAEQYCABEoNACAJIAooAgQiDSAEaiIGaiAbSw0AIAZBIGogFCAJa00NAQsgBSAKKAIINgJQIAUgCikCADcDSCAJIBQgBUHIAGogBUHMAmogGSALIBcgIhAgIQYMAQsgBCAWaiEHIAQgCWohDCAKKAIIIQogFikAACE6IAkgFikACDcACCAJIDo3AAACQCAEQRFJDQAgHikAACE6IAkgHikACDcAGCAJIDo3ABAgBEEQa0ERSA0AIAlBIGohAiAeIQQDQCAEKQAQITogAiAEKQAYNwAIIAIgOjcAACAEKQAgITogAiAEKQAoNwAYIAIgOjcAECAEQSBqIQQgAkEgaiICIAxJDQALCyAMIAprIQIgBSAHNgLMAiAMIAtrIApJBEAgCiAMIBdrSw0PICIgIiACIAtrIgdqIgQgDWpPBEAgDUUNAiAMIAQgDfwKAAAMAgtBACAHayICBEAgDCAEIAL8CgAACyAHIA1qIQ0gDCAHayEMIAshAgsgCkEQTwRAIAIpAAAhOiAMIAIpAAg3AAggDCA6NwAAIA1BEUgNASAMIA1qIQcgDEEQaiEEA0AgAikAECE6IAQgAikAGDcACCAEIDo3AAAgAikAICE6IAQgAikAKDcAGCAEIDo3ABAgAkEgaiECIARBIGoiBCAHSQ0ACwwBCwJAIApBB00EQCAMIAItAAA6AAAgDCACLQABOgABIAwgAi0AAjoAAiAMIAItAAM6AAMgDCACIApBAnQiBEHgGmooAgBqIgIoAAA2AAQgAiAEQYAbaigCAGshAgwBCyAMIAIpAAA3AAALIA1BCUkNACAMIA1qIQcgDEEIaiIEIAJBCGoiAmtBD0wEQANAIAQgAikAADcAACACQQhqIQIgBEEIaiIEIAdJDQAMAgsACyACKQAAITogBCACKQAINwAIIAQgOjcAACANQRlIDQAgDEEYaiEEA0AgAikAECE6IAQgAikAGDcACCAEIDo3AAAgAikAICE6IAQgAikAKDcAGCAEIDo3ABAgAkEgaiECIARBIGoiBCAHSQ0ACwsgBkGJf08EQCAGIQMMDgsgGSEcIAYgCWoMAwsgB0EgayECAkACQCAHIBxLDQAgCSAKKAIEIhIgBGoiDGogAksNACAMQSBqIBQgCWtNDQELIAUgCigCCDYCYCAFIAopAgA3A1ggCSAUIAIgBUHYAGogBUHMAmogHCALIBcgIhAhIQwMAgsgBCAJaiEGIAooAgghCiAPKQAAITogCSAPKQAINwAIIAkgOjcAAAJAIARBEUkNACAPKQAQITogCSAPKQAYNwAYIAkgOjcAECAEQRBrQRFIDQAgD0EQaiECIAlBIGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgBkkNAAsLIAYgCmshAiAFIAc2AswCIAYgC2sgCkkEQCAKIAYgF2tLDQ0gIiAiIAIgC2siB2oiBCASak8EQCASRQ0DIAYgBCAS/AoAAAwDC0EAIAdrIgIEQCAGIAQgAvwKAAALIAcgEmohEiAGIAdrIQYgCyECCyAKQRBPBEAgAikAACE6IAYgAikACDcACCAGIDo3AAAgEkERSA0CIAYgEmohByAGQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAILAkAgCkEHTQRAIAYgAi0AADoAACAGIAItAAE6AAEgBiACLQACOgACIAYgAi0AAzoAAyAGIAIgCkECdCIEQeAaaigCAGoiAigAADYABCACIARBgBtqKAIAayECDAELIAYgAikAADcAAAsgEkEJSQ0BIAYgEmohByAGQQhqIgQgAkEIaiICa0EPTARAA0AgBCACKQAANwAAIAJBCGohAiAE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", eB = new ye();
class Se extends nA {
  constructor(I) {
    super(), this.planarConfiguration = typeof I.PlanarConfiguration < "u" ? I.PlanarConfiguration : 1, this.samplesPerPixel = typeof I.SamplesPerPixel < "u" ? I.SamplesPerPixel : 1, this.addCompression = I.LercParameters[LB.AddCompression];
  }
  decodeBlock(I) {
    switch (this.addCompression) {
      case CI.None:
        break;
      case CI.Deflate:
        I = CB(new Uint8Array(I)).buffer;
        break;
      case CI.Zstandard:
        I = eB.decode(new Uint8Array(I)).buffer;
        break;
      default:
        throw new Error(`Unsupported LERC additional compression method identifier: ${this.addCompression}`);
    }
    return fe.decode(I, { returnPixelInterleavedDims: this.planarConfiguration === 1 }).pixels[0].buffer;
  }
}
const Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Se,
  zstd: eB
}, Symbol.toStringTag, { value: "Module" }));
let kA, Z, GA, iA;
const wI = {
  env: {
    emscripten_notify_memory_growth: (g) => {
      GA = new Uint8Array(Z.exports.memory.buffer), iA = new DataView(GA.buffer);
    }
  }
};
class de {
  init() {
    return kA || (typeof fetch < "u" ? kA = fetch(`data:application/wasm;base64,${Ng}`).then((I) => I.arrayBuffer()).then((I) => WebAssembly.instantiate(I, wI)).then(this._init) : kA = WebAssembly.instantiate(Buffer.from(Ng, "base64"), wI).then(this._init), kA);
  }
  _init(I) {
    Z = I.instance, wI.env.emscripten_notify_memory_growth(0);
  }
  decode(I, A = 0) {
    if (!Z) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const B = I.byteLength, i = Z.exports.malloc(B);
    if (GA.set(I, i), A === 0 && (A = Number(Z.exports.ZSTD_findDecompressedSize(i, B))), A === -1) {
      Z.exports.free(i);
      const D = [];
      for (const a of this.decodeStreaming([I]))
        D.push(a);
      if (D.length === 1)
        return D[0];
      const e = D.reduce((a, s) => a + s.byteLength, 0), C = new Uint8Array(e);
      let o = 0;
      for (const a of D)
        C.set(a, o), o += a.byteLength;
      return C;
    }
    const Q = Z.exports.malloc(A), t = Z.exports.ZSTD_decompress(Q, A, i, B), E = GA.slice(Q, Q + t);
    return Z.exports.free(i), Z.exports.free(Q), E;
  }
  *decodeStreaming(I) {
    if (!Z) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const A = Z.exports.ZSTD_DStreamInSize(), B = Z.exports.malloc(A), i = Z.exports.ZSTD_DStreamOutSize(), Q = Z.exports.malloc(i), t = Z.exports.ZSTD_createDCtx(), E = 4, D = 4, e = Z.exports.malloc(E + D * 2), C = Z.exports.malloc(E + D * 2);
    for (const o of I) {
      const a = Z.exports.malloc(o.byteLength);
      for (GA.set(o, a), iA.setInt32(e, a, !0), iA.setInt32(e + E, o.byteLength, !0), iA.setInt32(e + E + D, 0, !0); iA.getUint32(e + E + D, !0) < iA.getUint32(e + E, !0); ) {
        iA.setInt32(C, Q, !0), iA.setInt32(C + E, i, !0), iA.setInt32(C + E + D, 0, !0), Z.exports.ZSTD_decompressStream(t, C, e);
        const s = iA.getUint32(C + E + D);
        yield GA.slice(Q, Q + s);
      }
      Z.exports.free(a);
    }
    Z.exports.ZSTD_freeDCtx(t), Z.exports.free(B), Z.exports.free(Q), Z.exports.free(e), Z.exports.free(C);
  }
}
const Ng = "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QQhyIQBBACEDA0AgACADTQ0DIANBQGshAwwACwALQWwhCiAOIA5B/ABqIA5B+ABqIAUgBhAGIgJBiH9LDQEgDigCeCIDIARLDQEgACAOIA4oAnwgByAIIAMgDRAlIAEgADYCACACIQoMAQtBbCEKCyAOQYABaiQAIAoLcAEEfyAAQgA3AgAgAgRAIAFBCmohBiABKAIEIQRBACECQQAhAQNAIAEgBHZFBEAgAiAGIAFBA3RqLQAAIgUgAiAFSxshAiABQQFqIQEgAyAFQRZLaiEDDAELCyAAIAI2AgQgACADQQggBGt0NgIACwuuAQEEfyABIAIoAgQiAyABKAIEaiIENgIEIAAgA0ECdEGwGWooAgAgASgCAEEAIARrdnE2AgACQCAEQSFPBEAgAUGwGjYCCAwBCyABKAIIIgMgASgCEE8EQCABEAwMAQsgAyABKAIMIgVGDQAgASADIAMgBWsgBEEDdiIGIAMgBmsgBUkbIgNrIgU2AgggASAEIANBA3RrNgIEIAEgBSgAADYCAAsgACACQQhqNgIEC40CAgN/AX4gACACaiEEAkACQCACQQhOBEAgACABayICQXlIDQELA0AgACAETw0CIAAgAS0AADoAACAAQQFqIQAgAUEBaiEBDAALAAsCQAJAIAJBb0sNACAAIARBIGsiAksNACABKQAAIQYgACABKQAINwAIIAAgBjcAACACIABrIgVBEU4EQCAAQRBqIQAgASEDA0AgAykAECEGIAAgAykAGDcACCAAIAY3AAAgAykAICEGIAAgAykAKDcAGCAAIAY3ABAgA0EgaiEDIABBIGoiACACSQ0ACwsgASAFaiEBDAELIAAhAgsDQCACIARPDQEgAiABLQAAOgAAIAJBAWohAiABQQFqIQEMAAsACwvfAQEGf0G6fyEKAkAgAigCBCIIIAIoAgAiCWoiDSABIABrSw0AQWwhCiAJIAQgAygCACILa0sNACAAIAlqIgQgAigCCCIMayECIAAgAUEgayIBIAsgCUEAEDMgAyAJIAtqNgIAAkACQCAEIAVrIAxPBEAgAiEFDAELIAwgBCAGa0sNAiAHIAcgAiAFayIDaiICIAhqTwRAIAhFDQIgBCACIAj8CgAADAILQQAgA2siAARAIAQgAiAA/AoAAAsgAyAIaiEIIAQgA2shBAsgBCABIAUgCEEBEDML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", iB = new de();
class Fe extends nA {
  decodeBlock(I) {
    return iB.decode(new Uint8Array(I)).buffer;
  }
}
const Ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fe,
  zstd: iB
}, Symbol.toStringTag, { value: "Module" }));
class ue extends nA {
  constructor() {
    if (super(), typeof createImageBitmap > "u")
      throw new Error("Cannot decode WebImage as `createImageBitmap` is not available");
    if (typeof document > "u" && typeof OffscreenCanvas > "u")
      throw new Error("Cannot decode WebImage as neither `document` nor `OffscreenCanvas` is not available");
  }
  async decode(I, A) {
    const B = new Blob([A]), i = await createImageBitmap(B);
    let Q;
    typeof document < "u" ? (Q = document.createElement("canvas"), Q.width = i.width, Q.height = i.height) : Q = new OffscreenCanvas(i.width, i.height);
    const t = Q.getContext("2d");
    return t.drawImage(i, 0, 0), t.getImageData(0, 0, i.width, i.height).data.buffer;
  }
}
const ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ue
}, Symbol.toStringTag, { value: "Module" }));
export {
  TC as enableGeoTIFFTileSource
};
//# sourceMappingURL=geotiff-tilesource.mjs.map
