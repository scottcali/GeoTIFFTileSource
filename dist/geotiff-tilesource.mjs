var pl = Object.defineProperty;
var WA = (r) => {
  throw TypeError(r);
};
var Il = (r, e, t) => e in r ? pl(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var qe = (r, e, t) => Il(r, typeof e != "symbol" ? e + "" : e, t), Mn = (r, e, t) => e.has(r) || WA("Cannot " + t);
var ae = (r, e, t) => (Mn(r, e, "read from private field"), t ? t.call(r) : e.get(r)), yt = (r, e, t) => e.has(r) ? WA("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), Ue = (r, e, t, n) => (Mn(r, e, "write to private field"), n ? n.call(r, t) : e.set(r, t), t), Se = (r, e, t) => (Mn(r, e, "access private method"), t);
var Un = (r, e, t, n) => ({
  set _(i) {
    Ue(r, e, i, t);
  },
  get _() {
    return ae(r, e, n);
  }
});
function Oe(r) {
  return (e, ...t) => yl(r, e, t);
}
function ir(r, e) {
  return Oe(
    Ka(
      r,
      e
    ).get
  );
}
const {
  apply: yl,
  getOwnPropertyDescriptor: Ka,
  getPrototypeOf: cA,
  ownKeys: El
} = Reflect, {
  iterator: mr,
  toStringTag: Bl
} = Symbol, Cl = Object, {
  create: uA,
  defineProperty: wl
} = Cl, Ql = Array, ml = Ql.prototype, Wa = ml[mr], bl = Oe(Wa), Va = ArrayBuffer, vl = Va.prototype;
ir(vl, "byteLength");
const VA = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : null;
VA && ir(VA.prototype, "byteLength");
const $a = cA(Uint8Array);
$a.from;
const He = $a.prototype;
He[mr];
Oe(He.keys);
Oe(
  He.values
);
Oe(
  He.entries
);
Oe(He.set);
Oe(
  He.reverse
);
Oe(He.fill);
Oe(
  He.copyWithin
);
Oe(He.sort);
Oe(He.slice);
Oe(
  He.subarray
);
ir(
  He,
  "buffer"
);
ir(
  He,
  "byteOffset"
);
ir(
  He,
  "length"
);
ir(
  He,
  Bl
);
const Sl = Uint8Array, za = Uint16Array, hA = Uint32Array, xl = Float32Array, Er = cA([][mr]()), Xa = Oe(Er.next), Dl = Oe(function* () {
}().next), Fl = cA(Er), Rl = DataView.prototype, _l = Oe(
  Rl.getUint16
), gA = WeakMap, Za = gA.prototype, es = Oe(Za.get), Tl = Oe(Za.set), ts = new gA(), kl = uA(null, {
  next: {
    value: function() {
      const e = es(ts, this);
      return Xa(e);
    }
  },
  [mr]: {
    value: function() {
      return this;
    }
  }
});
function Ll(r) {
  if (r[mr] === Wa && Er.next === Xa)
    return r;
  const e = uA(kl);
  return Tl(ts, e, bl(r)), e;
}
const Ml = new gA(), Ul = uA(Fl, {
  next: {
    value: function() {
      const e = es(Ml, this);
      return Dl(e);
    },
    writable: !0,
    configurable: !0
  }
});
for (const r of El(Er))
  r !== "next" && wl(Ul, r, Ka(Er, r));
const rs = new Va(4), Nl = new xl(rs), Gl = new hA(rs), ze = new za(512), Xe = new Sl(512);
for (let r = 0; r < 256; ++r) {
  const e = r - 127;
  e < -24 ? (ze[r] = 0, ze[r | 256] = 32768, Xe[r] = 24, Xe[r | 256] = 24) : e < -14 ? (ze[r] = 1024 >> -e - 14, ze[r | 256] = 1024 >> -e - 14 | 32768, Xe[r] = -e - 1, Xe[r | 256] = -e - 1) : e <= 15 ? (ze[r] = e + 15 << 10, ze[r | 256] = e + 15 << 10 | 32768, Xe[r] = 13, Xe[r | 256] = 13) : e < 128 ? (ze[r] = 31744, ze[r | 256] = 64512, Xe[r] = 24, Xe[r | 256] = 24) : (ze[r] = 31744, ze[r | 256] = 64512, Xe[r] = 13, Xe[r | 256] = 13);
}
const dA = new hA(2048);
for (let r = 1; r < 1024; ++r) {
  let e = r << 13, t = 0;
  for (; !(e & 8388608); )
    e <<= 1, t -= 8388608;
  e &= -8388609, t += 947912704, dA[r] = e | t;
}
for (let r = 1024; r < 2048; ++r)
  dA[r] = 939524096 + (r - 1024 << 13);
const Ar = new hA(64);
for (let r = 1; r < 31; ++r)
  Ar[r] = r << 23;
Ar[31] = 1199570944;
Ar[32] = 2147483648;
for (let r = 33; r < 63; ++r)
  Ar[r] = 2147483648 + (r - 32 << 23);
Ar[63] = 3347054592;
const ns = new za(64);
for (let r = 1; r < 64; ++r)
  r !== 32 && (ns[r] = 1024);
function Ol(r) {
  const e = r >> 10;
  return Gl[0] = dA[ns[e] + (r & 1023)] + Ar[e], Nl[0];
}
function is(r, e, ...t) {
  return Ol(
    _l(r, e, ...Ll(t))
  );
}
var we = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function or(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function As(r) {
  if (r.__esModule) return r;
  var e = r.default;
  if (typeof e == "function") {
    var t = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(r).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(r, n);
    Object.defineProperty(t, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return r[n];
      }
    });
  }), t;
}
var pA = { exports: {} };
function os(r, e, t) {
  const n = t && t.debug || !1;
  n && console.log("[xml-utils] getting " + e + " in " + r);
  const i = typeof r == "object" ? r.outer : r, A = i.slice(0, i.indexOf(">") + 1), a = ['"', "'"];
  for (let o = 0; o < a.length; o++) {
    const c = a[o], l = e + "\\=" + c + "([^" + c + "]*)" + c;
    n && console.log("[xml-utils] pattern:", l);
    const p = new RegExp(l).exec(A);
    if (n && console.log("[xml-utils] match:", p), p) return p[1];
  }
}
pA.exports = os;
pA.exports.default = os;
var Pl = pA.exports;
const Nn = /* @__PURE__ */ or(Pl);
var IA = { exports: {} }, yA = { exports: {} }, EA = { exports: {} };
function as(r, e, t) {
  const i = new RegExp(e).exec(r.slice(t));
  return i ? t + i.index : -1;
}
EA.exports = as;
EA.exports.default = as;
var ql = EA.exports, BA = { exports: {} };
function ss(r, e, t) {
  const i = new RegExp(e).exec(r.slice(t));
  return i ? t + i.index + i[0].length - 1 : -1;
}
BA.exports = ss;
BA.exports.default = ss;
var Hl = BA.exports, CA = { exports: {} };
function fs(r, e) {
  const t = new RegExp(e, "g"), n = r.match(t);
  return n ? n.length : 0;
}
CA.exports = fs;
CA.exports.default = fs;
var jl = CA.exports;
const Jl = ql, Gn = Hl, $A = jl;
function ls(r, e, t) {
  const n = t && t.debug || !1, i = !(t && typeof t.nested === !1), A = t && t.startIndex || 0;
  n && console.log("[xml-utils] starting findTagByName with", e, " and ", t);
  const a = Jl(r, `<${e}[ 
>/]`, A);
  if (n && console.log("[xml-utils] start:", a), a === -1) return;
  const o = r.slice(a + e.length);
  let c = Gn(o, "^[^<]*[ /]>", 0);
  const l = c !== -1 && o[c - 1] === "/";
  if (n && console.log("[xml-utils] selfClosing:", l), l === !1)
    if (i) {
      let I = 0, E = 1, x = 0;
      for (; (c = Gn(o, "[ /]" + e + ">", I)) !== -1; ) {
        const v = o.substring(I, c + 1);
        if (E += $A(v, "<" + e + `[ 
	>]`), x += $A(v, "</" + e + ">"), x >= E) break;
        I = c;
      }
    } else
      c = Gn(o, "[ /]" + e + ">", 0);
  const s = a + e.length + c + 1;
  if (n && console.log("[xml-utils] end:", s), s === -1) return;
  const p = r.slice(a, s);
  let d;
  return l ? d = null : d = p.slice(p.indexOf(">") + 1, p.lastIndexOf("<")), { inner: d, outer: p, start: a, end: s };
}
yA.exports = ls;
yA.exports.default = ls;
var Yl = yA.exports;
const Kl = Yl;
function cs(r, e, t) {
  const n = [], i = t && t.debug || !1, A = t && typeof t.nested == "boolean" ? t.nested : !0;
  let a = t && t.startIndex || 0, o;
  for (; o = Kl(r, e, { debug: i, startIndex: a }); )
    A ? a = o.start + 1 + e.length : a = o.end, n.push(o);
  return i && console.log("findTagsByName found", n.length, "tags"), n;
}
IA.exports = cs;
IA.exports.default = cs;
var Wl = IA.exports;
const Vl = /* @__PURE__ */ or(Wl), Rt = {
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
}, tt = {};
for (const r in Rt)
  Rt.hasOwnProperty(r) && (tt[Rt[r]] = parseInt(r, 10));
const $l = [
  tt.BitsPerSample,
  tt.ExtraSamples,
  tt.SampleFormat,
  tt.StripByteCounts,
  tt.StripOffsets,
  tt.StripRowCounts,
  tt.TileByteCounts,
  tt.TileOffsets,
  tt.SubIFDs
], Vr = {
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
}, fe = {};
for (const r in Vr)
  Vr.hasOwnProperty(r) && (fe[Vr[r]] = parseInt(r, 10));
const ke = {
  WhiteIsZero: 0,
  BlackIsZero: 1,
  RGB: 2,
  Palette: 3,
  TransparencyMask: 4,
  CMYK: 5,
  YCbCr: 6,
  CIELab: 8
}, zl = {
  Unspecified: 0
}, Xl = {
  AddCompression: 1
}, On = {
  None: 0,
  Deflate: 1,
  Zstandard: 2
}, cr = {
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
}, Zl = {};
for (const r in cr)
  cr.hasOwnProperty(r) && (Zl[cr[r]] = parseInt(r, 10));
function ec(r, e) {
  const { width: t, height: n } = r, i = new Uint8Array(t * n * 3);
  let A;
  for (let a = 0, o = 0; a < r.length; ++a, o += 3)
    A = 256 - r[a] / e * 256, i[o] = A, i[o + 1] = A, i[o + 2] = A;
  return i;
}
function tc(r, e) {
  const { width: t, height: n } = r, i = new Uint8Array(t * n * 3);
  let A;
  for (let a = 0, o = 0; a < r.length; ++a, o += 3)
    A = r[a] / e * 256, i[o] = A, i[o + 1] = A, i[o + 2] = A;
  return i;
}
function rc(r, e) {
  const { width: t, height: n } = r, i = new Uint8Array(t * n * 3), A = e.length / 3, a = e.length / 3 * 2;
  for (let o = 0, c = 0; o < r.length; ++o, c += 3) {
    const l = r[o];
    i[c] = e[l] / 65536 * 256, i[c + 1] = e[l + A] / 65536 * 256, i[c + 2] = e[l + a] / 65536 * 256;
  }
  return i;
}
function nc(r) {
  const { width: e, height: t } = r, n = new Uint8Array(e * t * 3);
  for (let i = 0, A = 0; i < r.length; i += 4, A += 3) {
    const a = r[i], o = r[i + 1], c = r[i + 2], l = r[i + 3];
    n[A] = 255 * ((255 - a) / 256) * ((255 - l) / 256), n[A + 1] = 255 * ((255 - o) / 256) * ((255 - l) / 256), n[A + 2] = 255 * ((255 - c) / 256) * ((255 - l) / 256);
  }
  return n;
}
function ic(r) {
  const { width: e, height: t } = r, n = new Uint8ClampedArray(e * t * 3);
  for (let i = 0, A = 0; i < r.length; i += 3, A += 3) {
    const a = r[i], o = r[i + 1], c = r[i + 2];
    n[A] = a + 1.402 * (c - 128), n[A + 1] = a - 0.34414 * (o - 128) - 0.71414 * (c - 128), n[A + 2] = a + 1.772 * (o - 128);
  }
  return n;
}
const Ac = 0.95047, oc = 1, ac = 1.08883;
function sc(r) {
  const { width: e, height: t } = r, n = new Uint8Array(e * t * 3);
  for (let i = 0, A = 0; i < r.length; i += 3, A += 3) {
    const a = r[i + 0], o = r[i + 1] << 24 >> 24, c = r[i + 2] << 24 >> 24;
    let l = (a + 16) / 116, s = o / 500 + l, p = l - c / 200, d, I, E;
    s = Ac * (s * s * s > 8856e-6 ? s * s * s : (s - 16 / 116) / 7.787), l = oc * (l * l * l > 8856e-6 ? l * l * l : (l - 16 / 116) / 7.787), p = ac * (p * p * p > 8856e-6 ? p * p * p : (p - 16 / 116) / 7.787), d = s * 3.2406 + l * -1.5372 + p * -0.4986, I = s * -0.9689 + l * 1.8758 + p * 0.0415, E = s * 0.0557 + l * -0.204 + p * 1.057, d = d > 31308e-7 ? 1.055 * d ** (1 / 2.4) - 0.055 : 12.92 * d, I = I > 31308e-7 ? 1.055 * I ** (1 / 2.4) - 0.055 : 12.92 * I, E = E > 31308e-7 ? 1.055 * E ** (1 / 2.4) - 0.055 : 12.92 * E, n[A] = Math.max(0, Math.min(1, d)) * 255, n[A + 1] = Math.max(0, Math.min(1, I)) * 255, n[A + 2] = Math.max(0, Math.min(1, E)) * 255;
  }
  return n;
}
const us = /* @__PURE__ */ new Map(), hs = /* @__PURE__ */ new Map();
function dt(r, e, t = !0) {
  Array.isArray(r) || (r = [r]), r.forEach((n) => {
    us.set(n, e), hs.set(n, t);
  });
}
async function gs(r) {
  const e = us.get(r.Compression);
  if (!e)
    throw new Error(`Unknown compression method identifier: ${r.Compression}`);
  const t = await e();
  return new t(r);
}
function fc(r) {
  return hs.get(r.Compression);
}
dt([void 0, 1], () => Promise.resolve().then(() => uI).then((r) => r.default));
dt(5, () => Promise.resolve().then(() => II).then((r) => r.default));
dt(6, () => {
  throw new Error("old style JPEG compression is not supported.");
});
dt(7, () => Promise.resolve().then(() => wI).then((r) => r.default));
dt([8, 32946], () => Promise.resolve().then(() => Uy).then((r) => r.default));
dt(32773, () => Promise.resolve().then(() => Gy).then((r) => r.default));
dt(
  34887,
  () => Promise.resolve().then(() => jy).then(async (r) => (await r.zstd.init(), r)).then((r) => r.default)
);
dt(
  5e4,
  () => Promise.resolve().then(() => Yy).then(async (r) => (await r.zstd.init(), r)).then((r) => r.default)
);
dt(50001, () => Promise.resolve().then(() => Wy).then((r) => r.default));
function yn(r, e, t, n = 1) {
  return new (Object.getPrototypeOf(r)).constructor(e * t * n);
}
function lc(r, e, t, n, i) {
  const A = e / n, a = t / i;
  return r.map((o) => {
    const c = yn(o, n, i);
    for (let l = 0; l < i; ++l) {
      const s = Math.min(Math.round(a * l), t - 1);
      for (let p = 0; p < n; ++p) {
        const d = Math.min(Math.round(A * p), e - 1), I = o[s * e + d];
        c[l * n + p] = I;
      }
    }
    return c;
  });
}
function Wt(r, e, t) {
  return (1 - t) * r + t * e;
}
function cc(r, e, t, n, i) {
  const A = e / n, a = t / i;
  return r.map((o) => {
    const c = yn(o, n, i);
    for (let l = 0; l < i; ++l) {
      const s = a * l, p = Math.floor(s), d = Math.min(Math.ceil(s), t - 1);
      for (let I = 0; I < n; ++I) {
        const E = A * I, x = E % 1, v = Math.floor(E), w = Math.min(Math.ceil(E), e - 1), b = o[p * e + v], D = o[p * e + w], F = o[d * e + v], R = o[d * e + w], L = Wt(
          Wt(b, D, x),
          Wt(F, R, x),
          s % 1
        );
        c[l * n + I] = L;
      }
    }
    return c;
  });
}
function uc(r, e, t, n, i, A = "nearest") {
  switch (A.toLowerCase()) {
    case "nearest":
      return lc(r, e, t, n, i);
    case "bilinear":
    case "linear":
      return cc(r, e, t, n, i);
    default:
      throw new Error(`Unsupported resampling method: '${A}'`);
  }
}
function hc(r, e, t, n, i, A) {
  const a = e / n, o = t / i, c = yn(r, n, i, A);
  for (let l = 0; l < i; ++l) {
    const s = Math.min(Math.round(o * l), t - 1);
    for (let p = 0; p < n; ++p) {
      const d = Math.min(Math.round(a * p), e - 1);
      for (let I = 0; I < A; ++I) {
        const E = r[s * e * A + d * A + I];
        c[l * n * A + p * A + I] = E;
      }
    }
  }
  return c;
}
function gc(r, e, t, n, i, A) {
  const a = e / n, o = t / i, c = yn(r, n, i, A);
  for (let l = 0; l < i; ++l) {
    const s = o * l, p = Math.floor(s), d = Math.min(Math.ceil(s), t - 1);
    for (let I = 0; I < n; ++I) {
      const E = a * I, x = E % 1, v = Math.floor(E), w = Math.min(Math.ceil(E), e - 1);
      for (let b = 0; b < A; ++b) {
        const D = r[p * e * A + v * A + b], F = r[p * e * A + w * A + b], R = r[d * e * A + v * A + b], L = r[d * e * A + w * A + b], q = Wt(
          Wt(D, F, x),
          Wt(R, L, x),
          s % 1
        );
        c[l * n * A + I * A + b] = q;
      }
    }
  }
  return c;
}
function dc(r, e, t, n, i, A, a = "nearest") {
  switch (a.toLowerCase()) {
    case "nearest":
      return hc(
        r,
        e,
        t,
        n,
        i,
        A
      );
    case "bilinear":
    case "linear":
      return gc(
        r,
        e,
        t,
        n,
        i,
        A
      );
    default:
      throw new Error(`Unsupported resampling method: '${a}'`);
  }
}
function pc(r, e, t) {
  let n = 0;
  for (let i = e; i < t; ++i)
    n += r[i];
  return n;
}
function Ti(r, e, t) {
  switch (r) {
    case 1:
      if (e <= 8)
        return new Uint8Array(t);
      if (e <= 16)
        return new Uint16Array(t);
      if (e <= 32)
        return new Uint32Array(t);
      break;
    case 2:
      if (e === 8)
        return new Int8Array(t);
      if (e === 16)
        return new Int16Array(t);
      if (e === 32)
        return new Int32Array(t);
      break;
    case 3:
      switch (e) {
        case 16:
        case 32:
          return new Float32Array(t);
        case 64:
          return new Float64Array(t);
      }
      break;
  }
  throw Error("Unsupported data format/bitsPerSample");
}
function Ic(r, e) {
  return (r === 1 || r === 2) && e <= 32 && e % 8 === 0 ? !1 : !(r === 3 && (e === 16 || e === 32 || e === 64));
}
function yc(r, e, t, n, i, A, a) {
  const o = new DataView(r), c = t === 2 ? a * A : a * A * n, l = t === 2 ? 1 : n, s = Ti(e, i, c), p = parseInt("1".repeat(i), 2);
  if (e === 1) {
    let d;
    t === 1 ? d = n * i : d = i;
    let I = A * d;
    I & 7 && (I = I + 7 & -8);
    for (let E = 0; E < a; ++E) {
      const x = E * I;
      for (let v = 0; v < A; ++v) {
        const w = x + v * l * i;
        for (let b = 0; b < l; ++b) {
          const D = w + b * i, F = (E * A + v) * l + b, R = Math.floor(D / 8), L = D % 8;
          if (L + i <= 8)
            s[F] = o.getUint8(R) >> 8 - i - L & p;
          else if (L + i <= 16)
            s[F] = o.getUint16(R) >> 16 - i - L & p;
          else if (L + i <= 24) {
            const q = o.getUint16(R) << 8 | o.getUint8(R + 2);
            s[F] = q >> 24 - i - L & p;
          } else
            s[F] = o.getUint32(R) >> 32 - i - L & p;
        }
      }
    }
  }
  return s.buffer;
}
class Ec {
  /**
   * @constructor
   * @param {Object} fileDirectory The parsed file directory
   * @param {Object} geoKeys The parsed geo-keys
   * @param {DataView} dataView The DataView for the underlying file.
   * @param {Boolean} littleEndian Whether the file is encoded in little or big endian
   * @param {Boolean} cache Whether or not decoded tiles shall be cached
   * @param {import('./source/basesource').BaseSource} source The datasource to read from
   */
  constructor(e, t, n, i, A, a) {
    this.fileDirectory = e, this.geoKeys = t, this.dataView = n, this.littleEndian = i, this.tiles = A ? {} : null, this.isTiled = !e.StripOffsets;
    const o = e.PlanarConfiguration;
    if (this.planarConfiguration = typeof o > "u" ? 1 : o, this.planarConfiguration !== 1 && this.planarConfiguration !== 2)
      throw new Error("Invalid planar configuration.");
    this.source = a;
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
  getBlockHeight(e) {
    return this.isTiled || (e + 1) * this.getTileHeight() <= this.getHeight() ? this.getTileHeight() : this.getHeight() - e * this.getTileHeight();
  }
  /**
   * Calculates the number of bytes for each pixel across all samples. Only full
   * bytes are supported, an exception is thrown when this is not the case.
   * @returns {Number} the bytes per pixel
   */
  getBytesPerPixel() {
    let e = 0;
    for (let t = 0; t < this.fileDirectory.BitsPerSample.length; ++t)
      e += this.getSampleByteSize(t);
    return e;
  }
  getSampleByteSize(e) {
    if (e >= this.fileDirectory.BitsPerSample.length)
      throw new RangeError(`Sample index ${e} is out of range.`);
    return Math.ceil(this.fileDirectory.BitsPerSample[e] / 8);
  }
  getReaderForSample(e) {
    const t = this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[e] : 1, n = this.fileDirectory.BitsPerSample[e];
    switch (t) {
      case 1:
        if (n <= 8)
          return DataView.prototype.getUint8;
        if (n <= 16)
          return DataView.prototype.getUint16;
        if (n <= 32)
          return DataView.prototype.getUint32;
        break;
      case 2:
        if (n <= 8)
          return DataView.prototype.getInt8;
        if (n <= 16)
          return DataView.prototype.getInt16;
        if (n <= 32)
          return DataView.prototype.getInt32;
        break;
      case 3:
        switch (n) {
          case 16:
            return function(i, A) {
              return is(this, i, A);
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
  getSampleFormat(e = 0) {
    return this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[e] : 1;
  }
  getBitsPerSample(e = 0) {
    return this.fileDirectory.BitsPerSample[e];
  }
  getArrayForSample(e, t) {
    const n = this.getSampleFormat(e), i = this.getBitsPerSample(e);
    return Ti(n, i, t);
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
  async getTileOrStrip(e, t, n, i, A) {
    const a = Math.ceil(this.getWidth() / this.getTileWidth()), o = Math.ceil(this.getHeight() / this.getTileHeight());
    let c;
    const { tiles: l } = this;
    this.planarConfiguration === 1 ? c = t * a + e : this.planarConfiguration === 2 && (c = n * a * o + t * a + e);
    let s, p;
    if (this.isTiled ? (s = this.fileDirectory.TileOffsets[c], p = this.fileDirectory.TileByteCounts[c]) : (s = this.fileDirectory.StripOffsets[c], p = this.fileDirectory.StripByteCounts[c]), p === 0) {
      const E = this.getBlockHeight(t) * this.getTileWidth(), x = this.planarConfiguration === 2 ? this.getSampleByteSize(n) : this.getBytesPerPixel(), v = new ArrayBuffer(E * x);
      return this.getArrayForSample(n, v).fill(this.getGDALNoData() || 0), { x: e, y: t, sample: n, data: v };
    }
    const d = (await this.source.fetch([{ offset: s, length: p }], A))[0];
    let I;
    return l === null || !l[c] ? (I = (async () => {
      let E = await i.decode(this.fileDirectory, d);
      const x = this.getSampleFormat(), v = this.getBitsPerSample();
      return Ic(x, v) && (E = yc(
        E,
        x,
        this.planarConfiguration,
        this.getSamplesPerPixel(),
        v,
        this.getTileWidth(),
        this.getBlockHeight(t)
      )), E;
    })(), l !== null && (l[c] = I)) : I = l[c], { x: e, y: t, sample: n, data: await I };
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
  async _readRaster(e, t, n, i, A, a, o, c, l) {
    const s = this.getTileWidth(), p = this.getTileHeight(), d = this.getWidth(), I = this.getHeight(), E = Math.max(Math.floor(e[0] / s), 0), x = Math.min(
      Math.ceil(e[2] / s),
      Math.ceil(d / s)
    ), v = Math.max(Math.floor(e[1] / p), 0), w = Math.min(
      Math.ceil(e[3] / p),
      Math.ceil(I / p)
    ), b = e[2] - e[0];
    let D = this.getBytesPerPixel();
    const F = [], R = [];
    for (let T = 0; T < t.length; ++T)
      this.planarConfiguration === 1 ? F.push(pc(this.fileDirectory.BitsPerSample, 0, t[T]) / 8) : F.push(0), R.push(this.getReaderForSample(t[T]));
    const L = [], { littleEndian: q } = this;
    for (let T = v; T < w; ++T)
      for (let j = E; j < x; ++j) {
        let $;
        this.planarConfiguration === 1 && ($ = this.getTileOrStrip(j, T, 0, A, l));
        for (let te = 0; te < t.length; ++te) {
          const oe = te, ne = t[te];
          this.planarConfiguration === 2 && (D = this.getSampleByteSize(ne), $ = this.getTileOrStrip(j, T, ne, A, l));
          const Ae = $.then((ie) => {
            const se = ie.data, ye = new DataView(se), Be = this.getBlockHeight(ie.y), ge = ie.y * p, Z = ie.x * s, re = ge + Be, M = (ie.x + 1) * s, P = R[oe], N = Math.min(Be, Be - (re - e[3]), I - ge), Y = Math.min(s, s - (M - e[2]), d - Z);
            for (let _ = Math.max(0, e[1] - ge); _ < N; ++_)
              for (let k = Math.max(0, e[0] - Z); k < Y; ++k) {
                const O = (_ * s + k) * D, K = P.call(
                  ye,
                  O + F[oe],
                  q
                );
                let z;
                i ? (z = (_ + ge - e[1]) * b * t.length + (k + Z - e[0]) * t.length + oe, n[z] = K) : (z = (_ + ge - e[1]) * b + k + Z - e[0], n[oe][z] = K);
              }
          });
          L.push(Ae);
        }
      }
    if (await Promise.all(L), a && e[2] - e[0] !== a || o && e[3] - e[1] !== o) {
      let T;
      return i ? T = dc(
        n,
        e[2] - e[0],
        e[3] - e[1],
        a,
        o,
        t.length,
        c
      ) : T = uc(
        n,
        e[2] - e[0],
        e[3] - e[1],
        a,
        o,
        c
      ), T.width = a, T.height = o, T;
    }
    return n.width = a || e[2] - e[0], n.height = o || e[3] - e[1], n;
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
    window: e,
    samples: t = [],
    interleave: n,
    pool: i = null,
    width: A,
    height: a,
    resampleMethod: o,
    fillValue: c,
    signal: l
  } = {}) {
    const s = e || [0, 0, this.getWidth(), this.getHeight()];
    if (s[0] > s[2] || s[1] > s[3])
      throw new Error("Invalid subsets");
    const p = s[2] - s[0], d = s[3] - s[1], I = p * d, E = this.getSamplesPerPixel();
    if (!t || !t.length)
      for (let b = 0; b < E; ++b)
        t.push(b);
    else
      for (let b = 0; b < t.length; ++b)
        if (t[b] >= E)
          return Promise.reject(new RangeError(`Invalid sample index '${t[b]}'.`));
    let x;
    if (n) {
      const b = this.fileDirectory.SampleFormat ? Math.max.apply(null, this.fileDirectory.SampleFormat) : 1, D = Math.max.apply(null, this.fileDirectory.BitsPerSample);
      x = Ti(b, D, I * t.length), c && x.fill(c);
    } else {
      x = [];
      for (let b = 0; b < t.length; ++b) {
        const D = this.getArrayForSample(t[b], I);
        Array.isArray(c) && b < c.length ? D.fill(c[b]) : c && !Array.isArray(c) && D.fill(c), x.push(D);
      }
    }
    const v = i || await gs(this.fileDirectory);
    return await this._readRaster(
      s,
      t,
      x,
      n,
      v,
      A,
      a,
      o,
      l
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
    window: e,
    interleave: t = !0,
    pool: n = null,
    width: i,
    height: A,
    resampleMethod: a,
    enableAlpha: o = !1,
    signal: c
  } = {}) {
    const l = e || [0, 0, this.getWidth(), this.getHeight()];
    if (l[0] > l[2] || l[1] > l[3])
      throw new Error("Invalid subsets");
    const s = this.fileDirectory.PhotometricInterpretation;
    if (s === ke.RGB) {
      let w = [0, 1, 2];
      if (this.fileDirectory.ExtraSamples !== zl.Unspecified && o) {
        w = [];
        for (let b = 0; b < this.fileDirectory.BitsPerSample.length; b += 1)
          w.push(b);
      }
      return this.readRasters({
        window: e,
        interleave: t,
        samples: w,
        pool: n,
        width: i,
        height: A,
        resampleMethod: a,
        signal: c
      });
    }
    let p;
    switch (s) {
      case ke.WhiteIsZero:
      case ke.BlackIsZero:
      case ke.Palette:
        p = [0];
        break;
      case ke.CMYK:
        p = [0, 1, 2, 3];
        break;
      case ke.YCbCr:
      case ke.CIELab:
        p = [0, 1, 2];
        break;
      default:
        throw new Error("Invalid or unsupported photometric interpretation.");
    }
    const d = {
      window: l,
      interleave: !0,
      samples: p,
      pool: n,
      width: i,
      height: A,
      resampleMethod: a,
      signal: c
    }, { fileDirectory: I } = this, E = await this.readRasters(d), x = 2 ** this.fileDirectory.BitsPerSample[0];
    let v;
    switch (s) {
      case ke.WhiteIsZero:
        v = ec(E, x);
        break;
      case ke.BlackIsZero:
        v = tc(E, x);
        break;
      case ke.Palette:
        v = rc(E, I.ColorMap);
        break;
      case ke.CMYK:
        v = nc(E);
        break;
      case ke.YCbCr:
        v = ic(E);
        break;
      case ke.CIELab:
        v = sc(E);
        break;
      default:
        throw new Error("Unsupported photometric interpretation.");
    }
    if (!t) {
      const w = new Uint8Array(v.length / 3), b = new Uint8Array(v.length / 3), D = new Uint8Array(v.length / 3);
      for (let F = 0, R = 0; F < v.length; F += 3, ++R)
        w[R] = v[F], b[R] = v[F + 1], D[R] = v[F + 2];
      v = [w, b, D];
    }
    return v.width = E.width, v.height = E.height, v;
  }
  /**
   * Returns an array of tiepoints.
   * @returns {Object[]}
   */
  getTiePoints() {
    if (!this.fileDirectory.ModelTiepoint)
      return [];
    const e = [];
    for (let t = 0; t < this.fileDirectory.ModelTiepoint.length; t += 6)
      e.push({
        i: this.fileDirectory.ModelTiepoint[t],
        j: this.fileDirectory.ModelTiepoint[t + 1],
        k: this.fileDirectory.ModelTiepoint[t + 2],
        x: this.fileDirectory.ModelTiepoint[t + 3],
        y: this.fileDirectory.ModelTiepoint[t + 4],
        z: this.fileDirectory.ModelTiepoint[t + 5]
      });
    return e;
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
  getGDALMetadata(e = null) {
    const t = {};
    if (!this.fileDirectory.GDAL_METADATA)
      return null;
    const n = this.fileDirectory.GDAL_METADATA;
    let i = Vl(n, "Item");
    e === null ? i = i.filter((A) => Nn(A, "sample") === void 0) : i = i.filter((A) => Number(Nn(A, "sample")) === e);
    for (let A = 0; A < i.length; ++A) {
      const a = i[A];
      t[Nn(a, "name")] = a.inner;
    }
    return t;
  }
  /**
   * Returns the GDAL nodata value
   * @returns {number|null}
   */
  getGDALNoData() {
    if (!this.fileDirectory.GDAL_NODATA)
      return null;
    const e = this.fileDirectory.GDAL_NODATA;
    return Number(e.substring(0, e.length - 1));
  }
  /**
   * Returns the image origin as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @returns {Array<number>} The origin as a vector
   */
  getOrigin() {
    const e = this.fileDirectory.ModelTiepoint, t = this.fileDirectory.ModelTransformation;
    if (e && e.length === 6)
      return [
        e[3],
        e[4],
        e[5]
      ];
    if (t)
      return [
        t[3],
        t[7],
        t[11]
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
  getResolution(e = null) {
    const t = this.fileDirectory.ModelPixelScale, n = this.fileDirectory.ModelTransformation;
    if (t)
      return [
        t[0],
        -t[1],
        t[2]
      ];
    if (n)
      return n[1] === 0 && n[4] === 0 ? [
        n[0],
        -n[5],
        n[10]
      ] : [
        Math.sqrt(n[0] * n[0] + n[4] * n[4]),
        -Math.sqrt(n[1] * n[1] + n[5] * n[5]),
        n[10]
      ];
    if (e) {
      const [i, A, a] = e.getResolution();
      return [
        i * e.getWidth() / this.getWidth(),
        A * e.getHeight() / this.getHeight(),
        a * e.getWidth() / this.getWidth()
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
  getBoundingBox(e = !1) {
    const t = this.getHeight(), n = this.getWidth();
    if (this.fileDirectory.ModelTransformation && !e) {
      const [i, A, a, o, c, l, s, p] = this.fileDirectory.ModelTransformation, I = [
        [0, 0],
        [0, t],
        [n, 0],
        [n, t]
      ].map(([v, w]) => [
        o + i * v + A * w,
        p + c * v + l * w
      ]), E = I.map((v) => v[0]), x = I.map((v) => v[1]);
      return [
        Math.min(...E),
        Math.min(...x),
        Math.max(...E),
        Math.max(...x)
      ];
    } else {
      const i = this.getOrigin(), A = this.getResolution(), a = i[0], o = i[1], c = a + A[0] * n, l = o + A[1] * t;
      return [
        Math.min(a, c),
        Math.min(o, l),
        Math.max(a, c),
        Math.max(o, l)
      ];
    }
  }
}
class Bc {
  constructor(e) {
    this._dataView = new DataView(e);
  }
  get buffer() {
    return this._dataView.buffer;
  }
  getUint64(e, t) {
    const n = this.getUint32(e, t), i = this.getUint32(e + 4, t);
    let A;
    if (t) {
      if (A = n + 2 ** 32 * i, !Number.isSafeInteger(A))
        throw new Error(
          `${A} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/scottcali//geotiff.js/issues`
        );
      return A;
    }
    if (A = 2 ** 32 * n + i, !Number.isSafeInteger(A))
      throw new Error(
        `${A} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/scottcali//geotiff.js/issues`
      );
    return A;
  }
  // adapted from https://stackoverflow.com/a/55338384/8060591
  getInt64(e, t) {
    let n = 0;
    const i = (this._dataView.getUint8(e + (t ? 7 : 0)) & 128) > 0;
    let A = !0;
    for (let a = 0; a < 8; a++) {
      let o = this._dataView.getUint8(e + (t ? a : 7 - a));
      i && (A ? o !== 0 && (o = ~(o - 1) & 255, A = !1) : o = ~o & 255), n += o * 256 ** a;
    }
    return i && (n = -n), n;
  }
  getUint8(e, t) {
    return this._dataView.getUint8(e, t);
  }
  getInt8(e, t) {
    return this._dataView.getInt8(e, t);
  }
  getUint16(e, t) {
    return this._dataView.getUint16(e, t);
  }
  getInt16(e, t) {
    return this._dataView.getInt16(e, t);
  }
  getUint32(e, t) {
    return this._dataView.getUint32(e, t);
  }
  getInt32(e, t) {
    return this._dataView.getInt32(e, t);
  }
  getFloat16(e, t) {
    return is(this._dataView, e, t);
  }
  getFloat32(e, t) {
    return this._dataView.getFloat32(e, t);
  }
  getFloat64(e, t) {
    return this._dataView.getFloat64(e, t);
  }
}
class Cc {
  constructor(e, t, n, i) {
    this._dataView = new DataView(e), this._sliceOffset = t, this._littleEndian = n, this._bigTiff = i;
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
  covers(e, t) {
    return this.sliceOffset <= e && this.sliceTop >= e + t;
  }
  readUint8(e) {
    return this._dataView.getUint8(
      e - this._sliceOffset,
      this._littleEndian
    );
  }
  readInt8(e) {
    return this._dataView.getInt8(
      e - this._sliceOffset,
      this._littleEndian
    );
  }
  readUint16(e) {
    return this._dataView.getUint16(
      e - this._sliceOffset,
      this._littleEndian
    );
  }
  readInt16(e) {
    return this._dataView.getInt16(
      e - this._sliceOffset,
      this._littleEndian
    );
  }
  readUint32(e) {
    return this._dataView.getUint32(
      e - this._sliceOffset,
      this._littleEndian
    );
  }
  readInt32(e) {
    return this._dataView.getInt32(
      e - this._sliceOffset,
      this._littleEndian
    );
  }
  readFloat32(e) {
    return this._dataView.getFloat32(
      e - this._sliceOffset,
      this._littleEndian
    );
  }
  readFloat64(e) {
    return this._dataView.getFloat64(
      e - this._sliceOffset,
      this._littleEndian
    );
  }
  readUint64(e) {
    const t = this.readUint32(e), n = this.readUint32(e + 4);
    let i;
    if (this._littleEndian) {
      if (i = t + 2 ** 32 * n, !Number.isSafeInteger(i))
        throw new Error(
          `${i} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/scottcali//geotiff.js/issues`
        );
      return i;
    }
    if (i = 2 ** 32 * t + n, !Number.isSafeInteger(i))
      throw new Error(
        `${i} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/scottcali//geotiff.js/issues`
      );
    return i;
  }
  // adapted from https://stackoverflow.com/a/55338384/8060591
  readInt64(e) {
    let t = 0;
    const n = (this._dataView.getUint8(e + (this._littleEndian ? 7 : 0)) & 128) > 0;
    let i = !0;
    for (let A = 0; A < 8; A++) {
      let a = this._dataView.getUint8(
        e + (this._littleEndian ? A : 7 - A)
      );
      n && (i ? a !== 0 && (a = ~(a - 1) & 255, i = !1) : a = ~a & 255), t += a * 256 ** A;
    }
    return n && (t = -t), t;
  }
  readOffset(e) {
    return this._bigTiff ? this.readUint64(e) : this.readUint32(e);
  }
}
const wc = typeof Worker < "u" ? Worker : void 0;
function Qc() {
  return new wc(new URL(
    /* @vite-ignore */
    "assets/decoder-t7Liz-Cd.js",
    import.meta.url
  ), {
    type: "module"
  });
}
const mc = typeof navigator < "u" && navigator.hardwareConcurrency || 2;
class bc {
  /**
   * @param {Worker} worker the worker to wrap
   */
  constructor(e) {
    this.worker = e, this.worker.addEventListener("message", (t) => this._onWorkerMessage(t)), this.jobIdCounter = 0, this.jobs = /* @__PURE__ */ new Map();
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
  _onWorkerMessage(e) {
    const { jobId: t, error: n, ...i } = e.data, A = this.jobs.get(t);
    this.jobs.delete(t), n ? A.reject(new Error(n)) : A.resolve(i);
  }
  /**
   * Submit a job to the worker
   * @param {Object} message the message to send to the worker. A "jobId" property will be added to this object.
   * @param {Object[]} [transferables] an optional array of transferable objects to transfer to the worker.
   * @returns {Promise} a promise that gets resolved/rejected when a message with the same jobId is received from the worker.
   */
  submitJob(e, t = void 0) {
    const n = this.newJobId();
    let i, A;
    const a = new Promise((o, c) => {
      i = o, A = c;
    });
    return this.jobs.set(n, { resolve: i, reject: A }), this.worker.postMessage({ ...e, jobId: n }, t), a;
  }
  terminate() {
    this.worker.terminate();
  }
}
const vc = new FinalizationRegistry((r) => {
  r.terminate();
});
class Sc {
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
  constructor(e = mc, t = Qc) {
    this.workerWrappers = null, e && (this.workerWrappers = (async () => {
      const n = [];
      for (let i = 0; i < e; i++) {
        const A = t(), a = new bc(A);
        n.push(a), vc.register(a, A, a);
      }
      return n;
    })());
  }
  /**
   * Decode the given block of bytes with the set compression method.
   * @param {ArrayBuffer} buffer the array buffer of bytes to decode.
   * @returns {Promise<ArrayBuffer>} the decoded result as a `Promise`
   */
  async decode(e, t) {
    if (fc(e) && this.workerWrappers) {
      const n = (await this.workerWrappers).reduce((A, a) => A.getJobCount() < a.getJobCount() ? A : a), { decoded: i } = await n.submitJob({ fileDirectory: e, buffer: t }, [t]);
      return i;
    } else
      return gs(e).then((n) => n.decode(e, t));
  }
  async destroy() {
    this.workerWrappers && ((await this.workerWrappers).forEach((e) => {
      e.terminate();
    }), this.workerWrappers = null);
  }
}
const zA = `\r
\r
`;
function ds(r) {
  if (typeof Object.fromEntries < "u")
    return Object.fromEntries(r);
  const e = {};
  for (const [t, n] of r)
    e[t.toLowerCase()] = n;
  return e;
}
function xc(r) {
  const e = r.split(`\r
`).map((t) => {
    const n = t.split(":").map((i) => i.trim());
    return n[0] = n[0].toLowerCase(), n;
  });
  return ds(e);
}
function Dc(r) {
  const [e, ...t] = r.split(";").map((i) => i.trim()), n = t.map((i) => i.split("="));
  return { type: e, params: ds(n) };
}
function ki(r) {
  let e, t, n;
  return r && ([, e, t, n] = r.match(/bytes (\d+)-(\d+)\/(\d+)/), e = parseInt(e, 10), t = parseInt(t, 10), n = parseInt(n, 10)), { start: e, end: t, total: n };
}
function Fc(r, e) {
  let t = null;
  const n = new TextDecoder("ascii"), i = [], A = `--${e}`, a = `${A}--`;
  for (let o = 0; o < 10; ++o)
    n.decode(
      new Uint8Array(r, o, A.length)
    ) === A && (t = o);
  if (t === null)
    throw new Error("Could not find initial boundary");
  for (; t < r.byteLength; ) {
    const o = n.decode(
      new Uint8Array(
        r,
        t,
        Math.min(A.length + 1024, r.byteLength - t)
      )
    );
    if (o.length === 0 || o.startsWith(a))
      break;
    if (!o.startsWith(A))
      throw new Error("Part does not start with boundary");
    const c = o.substr(A.length + 2);
    if (c.length === 0)
      break;
    const l = c.indexOf(zA), s = xc(c.substr(0, l)), { start: p, end: d, total: I } = ki(s["content-range"]), E = t + A.length + l + zA.length, x = parseInt(d, 10) + 1 - parseInt(p, 10);
    i.push({
      headers: s,
      data: r.slice(E, E + x),
      offset: p,
      length: x,
      fileSize: I
    }), t = E + x + 4;
  }
  return i;
}
class wA {
  /**
   *
   * @param {Slice[]} slices
   * @returns {ArrayBuffer[]}
   */
  async fetch(e, t = void 0) {
    return Promise.all(
      e.map((n) => this.fetchSlice(n, t))
    );
  }
  /**
   *
   * @param {Slice} slice
   * @returns {ArrayBuffer}
   */
  async fetchSlice(e) {
    throw new Error(`fetching of slice ${e} not possible, not implemented`);
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
var je, be, Fe, Et, Zt, Bt, Ee, $r, $e, ps, Li, Mi, Ui, Is, zr;
class Rc extends Map {
  constructor(t = {}) {
    super();
    yt(this, Ee);
    yt(this, je, 0);
    yt(this, be, /* @__PURE__ */ new Map());
    yt(this, Fe, /* @__PURE__ */ new Map());
    yt(this, Et);
    yt(this, Zt);
    yt(this, Bt);
    if (!(t.maxSize && t.maxSize > 0))
      throw new TypeError("`maxSize` must be a number greater than 0");
    if (typeof t.maxAge == "number" && t.maxAge === 0)
      throw new TypeError("`maxAge` must be a number greater than 0");
    Ue(this, Et, t.maxSize), Ue(this, Zt, t.maxAge || Number.POSITIVE_INFINITY), Ue(this, Bt, t.onEviction);
  }
  // For tests.
  get __oldCache() {
    return ae(this, Fe);
  }
  get(t) {
    if (ae(this, be).has(t)) {
      const n = ae(this, be).get(t);
      return Se(this, Ee, Li).call(this, t, n);
    }
    if (ae(this, Fe).has(t)) {
      const n = ae(this, Fe).get(t);
      if (Se(this, Ee, $e).call(this, t, n) === !1)
        return Se(this, Ee, Is).call(this, t, n), n.value;
    }
  }
  set(t, n, { maxAge: i = ae(this, Zt) } = {}) {
    const A = typeof i == "number" && i !== Number.POSITIVE_INFINITY ? Date.now() + i : void 0;
    return ae(this, be).has(t) ? ae(this, be).set(t, {
      value: n,
      expiry: A
    }) : Se(this, Ee, Ui).call(this, t, { value: n, expiry: A }), this;
  }
  has(t) {
    return ae(this, be).has(t) ? !Se(this, Ee, $e).call(this, t, ae(this, be).get(t)) : ae(this, Fe).has(t) ? !Se(this, Ee, $e).call(this, t, ae(this, Fe).get(t)) : !1;
  }
  peek(t) {
    if (ae(this, be).has(t))
      return Se(this, Ee, Mi).call(this, t, ae(this, be));
    if (ae(this, Fe).has(t))
      return Se(this, Ee, Mi).call(this, t, ae(this, Fe));
  }
  expiresIn(t) {
    const n = ae(this, be).get(t) ?? ae(this, Fe).get(t);
    if (n)
      return n.expiry ? n.expiry - Date.now() : Number.POSITIVE_INFINITY;
  }
  delete(t) {
    const n = ae(this, be).delete(t);
    return n && Un(this, je)._--, ae(this, Fe).delete(t) || n;
  }
  clear() {
    ae(this, be).clear(), ae(this, Fe).clear(), Ue(this, je, 0);
  }
  resize(t) {
    if (!(t && t > 0))
      throw new TypeError("`maxSize` must be a number greater than 0");
    const n = [...Se(this, Ee, zr).call(this)], i = n.length - t;
    i < 0 ? (Ue(this, be, new Map(n)), Ue(this, Fe, /* @__PURE__ */ new Map()), Ue(this, je, n.length)) : (i > 0 && Se(this, Ee, $r).call(this, n.slice(0, i)), Ue(this, Fe, new Map(n.slice(i))), Ue(this, be, /* @__PURE__ */ new Map()), Ue(this, je, 0)), Ue(this, Et, t);
  }
  evict(t = 1) {
    const n = Number(t);
    if (!n || n <= 0)
      return;
    const i = [...Se(this, Ee, zr).call(this)], A = Math.trunc(Math.min(n, Math.max(i.length - 1, 0)));
    A <= 0 || (Se(this, Ee, $r).call(this, i.slice(0, A)), Ue(this, Fe, new Map(i.slice(A))), Ue(this, be, /* @__PURE__ */ new Map()), Ue(this, je, 0));
  }
  *keys() {
    for (const [t] of this)
      yield t;
  }
  *values() {
    for (const [, t] of this)
      yield t;
  }
  *[Symbol.iterator]() {
    for (const t of ae(this, be)) {
      const [n, i] = t;
      Se(this, Ee, $e).call(this, n, i) === !1 && (yield [n, i.value]);
    }
    for (const t of ae(this, Fe)) {
      const [n, i] = t;
      ae(this, be).has(n) || Se(this, Ee, $e).call(this, n, i) === !1 && (yield [n, i.value]);
    }
  }
  *entriesDescending() {
    let t = [...ae(this, be)];
    for (let n = t.length - 1; n >= 0; --n) {
      const i = t[n], [A, a] = i;
      Se(this, Ee, $e).call(this, A, a) === !1 && (yield [A, a.value]);
    }
    t = [...ae(this, Fe)];
    for (let n = t.length - 1; n >= 0; --n) {
      const i = t[n], [A, a] = i;
      ae(this, be).has(A) || Se(this, Ee, $e).call(this, A, a) === !1 && (yield [A, a.value]);
    }
  }
  *entriesAscending() {
    for (const [t, n] of Se(this, Ee, zr).call(this))
      yield [t, n.value];
  }
  get size() {
    if (!ae(this, je))
      return ae(this, Fe).size;
    let t = 0;
    for (const n of ae(this, Fe).keys())
      ae(this, be).has(n) || t++;
    return Math.min(ae(this, je) + t, ae(this, Et));
  }
  get maxSize() {
    return ae(this, Et);
  }
  get maxAge() {
    return ae(this, Zt);
  }
  entries() {
    return this.entriesAscending();
  }
  forEach(t, n = this) {
    for (const [i, A] of this.entriesAscending())
      t.call(n, A, i, this);
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
je = new WeakMap(), be = new WeakMap(), Fe = new WeakMap(), Et = new WeakMap(), Zt = new WeakMap(), Bt = new WeakMap(), Ee = new WeakSet(), $r = function(t) {
  if (typeof ae(this, Bt) == "function")
    for (const [n, i] of t)
      ae(this, Bt).call(this, n, i.value);
}, $e = function(t, n) {
  return typeof n.expiry == "number" && n.expiry <= Date.now() ? (typeof ae(this, Bt) == "function" && ae(this, Bt).call(this, t, n.value), this.delete(t)) : !1;
}, ps = function(t, n) {
  if (Se(this, Ee, $e).call(this, t, n) === !1)
    return n.value;
}, Li = function(t, n) {
  return n.expiry ? Se(this, Ee, ps).call(this, t, n) : n.value;
}, Mi = function(t, n) {
  const i = n.get(t);
  return Se(this, Ee, Li).call(this, t, i);
}, Ui = function(t, n) {
  ae(this, be).set(t, n), Un(this, je)._++, ae(this, je) >= ae(this, Et) && (Ue(this, je, 0), Se(this, Ee, $r).call(this, ae(this, Fe)), Ue(this, Fe, ae(this, be)), Ue(this, be, /* @__PURE__ */ new Map()));
}, Is = function(t, n) {
  ae(this, Fe).delete(t), Se(this, Ee, Ui).call(this, t, n);
}, zr = function* () {
  for (const t of ae(this, Fe)) {
    const [n, i] = t;
    ae(this, be).has(n) || Se(this, Ee, $e).call(this, n, i) === !1 && (yield t);
  }
  for (const t of ae(this, be)) {
    const [n, i] = t;
    Se(this, Ee, $e).call(this, n, i) === !1 && (yield t);
  }
};
function ys(r, e) {
  for (const t in e)
    e.hasOwnProperty(t) && (r[t] = e[t]);
}
function QA(r) {
  const e = {};
  for (const t in r)
    if (r.hasOwnProperty(t)) {
      const n = r[t];
      e[n] = t;
    }
  return e;
}
function _c(r, e) {
  const t = [];
  for (let n = 0; n < r; n++)
    t.push(e(n));
  return t;
}
async function Tc(r) {
  return new Promise((e) => setTimeout(e, r));
}
function kc(r, e) {
  const t = Array.isArray(r) ? r : Array.from(r), n = Array.isArray(e) ? e : Array.from(e);
  return t.map((i, A) => [i, n[A]]);
}
class er extends Error {
  constructor(e) {
    super(e), Error.captureStackTrace && Error.captureStackTrace(this, er), this.name = "AbortError";
  }
}
class Lc extends Error {
  constructor(e, t) {
    super(t), this.errors = e, this.message = t, this.name = "AggregateError";
  }
}
const Mc = Lc;
class Uc {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {ArrayBuffer} [data]
   */
  constructor(e, t, n = null) {
    this.offset = e, this.length = t, this.data = n;
  }
  /**
   * @returns {number} the top byte border
   */
  get top() {
    return this.offset + this.length;
  }
}
class XA {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {number[]} blockIds
   */
  constructor(e, t, n) {
    this.offset = e, this.length = t, this.blockIds = n;
  }
}
class Nc extends wA {
  /**
   *
   * @param {BaseSource} source The underlying source that shall be blocked and cached
   * @param {object} options
   * @param {number} [options.blockSize]
   * @param {number} [options.cacheSize]
   */
  constructor(e, { blockSize: t = 65536, cacheSize: n = 100 } = {}) {
    super(), this.source = e, this.blockSize = t, this.blockCache = new Rc({
      maxSize: n,
      onEviction: (i, A) => {
        this.evictedBlocks.set(i, A);
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
  async fetch(e, t) {
    const n = [], i = [], A = [];
    this.evictedBlocks.clear();
    for (const { offset: d, length: I } of e) {
      let E = d + I;
      const { fileSize: x } = this;
      x !== null && (E = Math.min(E, x));
      const v = Math.floor(d / this.blockSize) * this.blockSize;
      for (let w = v; w < E; w += this.blockSize) {
        const b = Math.floor(w / this.blockSize);
        !this.blockCache.has(b) && !this.blockRequests.has(b) && (this.blockIdsToFetch.add(b), i.push(b)), this.blockRequests.has(b) && n.push(this.blockRequests.get(b)), A.push(b);
      }
    }
    await Tc(), this.fetchBlocks(t);
    const a = [];
    for (const d of i)
      this.blockRequests.has(d) && a.push(this.blockRequests.get(d));
    await Promise.allSettled(n), await Promise.allSettled(a);
    const o = [], c = A.filter((d) => this.abortedBlockIds.has(d) || !this.blockCache.has(d));
    if (c.forEach((d) => this.blockIdsToFetch.add(d)), c.length > 0 && t && !t.aborted) {
      this.fetchBlocks(null);
      for (const d of c) {
        const I = this.blockRequests.get(d);
        if (!I)
          throw new Error(`Block ${d} is not in the block requests`);
        o.push(I);
      }
      await Promise.allSettled(o);
    }
    if (t && t.aborted)
      throw new er("Request was aborted");
    const l = A.map((d) => this.blockCache.get(d) || this.evictedBlocks.get(d)), s = l.filter((d) => !d);
    if (s.length)
      throw new Mc(s, "Request failed");
    const p = new Map(kc(A, l));
    return this.readSliceData(e, p);
  }
  /**
   *
   * @param {AbortSignal} signal
   */
  fetchBlocks(e) {
    if (this.blockIdsToFetch.size > 0) {
      const t = this.groupBlocks(this.blockIdsToFetch), n = this.source.fetch(t, e);
      for (let i = 0; i < t.length; ++i) {
        const A = t[i];
        for (const a of A.blockIds)
          this.blockRequests.set(a, (async () => {
            try {
              const o = (await n)[i], c = a * this.blockSize, l = c - o.offset, s = Math.min(l + this.blockSize, o.data.byteLength), p = o.data.slice(l, s), d = new Uc(
                c,
                p.byteLength,
                p,
                a
              );
              this.blockCache.set(a, d), this.abortedBlockIds.delete(a);
            } catch (o) {
              if (o.name === "AbortError")
                o.signal = e, this.blockCache.delete(a), this.abortedBlockIds.add(a);
              else
                throw o;
            } finally {
              this.blockRequests.delete(a);
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
  groupBlocks(e) {
    const t = Array.from(e).sort((a, o) => a - o);
    if (t.length === 0)
      return [];
    let n = [], i = null;
    const A = [];
    for (const a of t)
      i === null || i + 1 === a ? (n.push(a), i = a) : (A.push(new XA(
        n[0] * this.blockSize,
        n.length * this.blockSize,
        n
      )), n = [a], i = a);
    return A.push(new XA(
      n[0] * this.blockSize,
      n.length * this.blockSize,
      n
    )), A;
  }
  /**
   *
   * @param {import("./basesource").Slice[]} slices
   * @param {Map} blocks
   */
  readSliceData(e, t) {
    return e.map((n) => {
      let i = n.offset + n.length;
      this.fileSize !== null && (i = Math.min(this.fileSize, i));
      const A = Math.floor(n.offset / this.blockSize), a = Math.floor((i - 1) / this.blockSize), o = new ArrayBuffer(n.length), c = new Uint8Array(o);
      for (let l = A; l <= a; ++l) {
        const s = t.get(l), p = s.offset - n.offset, d = s.top - i;
        let I = 0, E = 0, x;
        p < 0 ? I = -p : p > 0 && (E = p), d < 0 ? x = s.length - I : x = i - s.offset - I;
        const v = new Uint8Array(s.data, I, x);
        c.set(v, E);
      }
      return o;
    });
  }
}
class mA {
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
  getHeader(e) {
    throw new Error("not implemented");
  }
  /**
   * @returns {ArrayBuffer} the response data of the request
   */
  async getData() {
    throw new Error("not implemented");
  }
}
class bA {
  constructor(e) {
    this.url = e;
  }
  /**
   * Send a request with the options
   * @param {{headers: HeadersInit, signal: AbortSignal}} [options={}]
   * @returns {Promise<BaseResponse>}
   */
  async request({ headers: e, signal: t } = {}) {
    throw new Error("request is not implemented");
  }
}
class Gc extends mA {
  /**
   * BaseResponse facade for fetch API Response
   * @param {Response} response
   */
  constructor(e) {
    super(), this.response = e;
  }
  get status() {
    return this.response.status;
  }
  getHeader(e) {
    return this.response.headers.get(e);
  }
  async getData() {
    return this.response.arrayBuffer ? await this.response.arrayBuffer() : (await this.response.buffer()).buffer;
  }
}
class Oc extends bA {
  constructor(e, t) {
    super(e), this.credentials = t;
  }
  /**
   * @param {{headers: HeadersInit, signal: AbortSignal}} [options={}]
   * @returns {Promise<FetchResponse>}
   */
  async request({ headers: e, signal: t } = {}) {
    const n = await fetch(this.url, {
      headers: e,
      credentials: this.credentials,
      signal: t
    });
    return new Gc(n);
  }
}
class Pc extends mA {
  /**
   * BaseResponse facade for XMLHttpRequest
   * @param {XMLHttpRequest} xhr
   * @param {ArrayBuffer} data
   */
  constructor(e, t) {
    super(), this.xhr = e, this.data = t;
  }
  get status() {
    return this.xhr.status;
  }
  getHeader(e) {
    return this.xhr.getResponseHeader(e);
  }
  async getData() {
    return this.data;
  }
}
class qc extends bA {
  constructRequest(e, t) {
    return new Promise((n, i) => {
      const A = new XMLHttpRequest();
      A.open("GET", this.url), A.responseType = "arraybuffer";
      for (const [a, o] of Object.entries(e))
        A.setRequestHeader(a, o);
      A.onload = () => {
        const a = A.response;
        n(new Pc(A, a));
      }, A.onerror = i, A.onabort = () => i(new er("Request aborted")), A.send(), t && (t.aborted && A.abort(), t.addEventListener("abort", () => A.abort()));
    });
  }
  async request({ headers: e, signal: t } = {}) {
    return await this.constructRequest(e, t);
  }
}
var Es = {}, En = {};
En.byteLength = Jc;
En.toByteArray = Kc;
En.fromByteArray = $c;
var ot = [], Je = [], Hc = typeof Uint8Array < "u" ? Uint8Array : Array, Pn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Nt = 0, jc = Pn.length; Nt < jc; ++Nt)
  ot[Nt] = Pn[Nt], Je[Pn.charCodeAt(Nt)] = Nt;
Je[45] = 62;
Je[95] = 63;
function Bs(r) {
  var e = r.length;
  if (e % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var t = r.indexOf("=");
  t === -1 && (t = e);
  var n = t === e ? 0 : 4 - t % 4;
  return [t, n];
}
function Jc(r) {
  var e = Bs(r), t = e[0], n = e[1];
  return (t + n) * 3 / 4 - n;
}
function Yc(r, e, t) {
  return (e + t) * 3 / 4 - t;
}
function Kc(r) {
  var e, t = Bs(r), n = t[0], i = t[1], A = new Hc(Yc(r, n, i)), a = 0, o = i > 0 ? n - 4 : n, c;
  for (c = 0; c < o; c += 4)
    e = Je[r.charCodeAt(c)] << 18 | Je[r.charCodeAt(c + 1)] << 12 | Je[r.charCodeAt(c + 2)] << 6 | Je[r.charCodeAt(c + 3)], A[a++] = e >> 16 & 255, A[a++] = e >> 8 & 255, A[a++] = e & 255;
  return i === 2 && (e = Je[r.charCodeAt(c)] << 2 | Je[r.charCodeAt(c + 1)] >> 4, A[a++] = e & 255), i === 1 && (e = Je[r.charCodeAt(c)] << 10 | Je[r.charCodeAt(c + 1)] << 4 | Je[r.charCodeAt(c + 2)] >> 2, A[a++] = e >> 8 & 255, A[a++] = e & 255), A;
}
function Wc(r) {
  return ot[r >> 18 & 63] + ot[r >> 12 & 63] + ot[r >> 6 & 63] + ot[r & 63];
}
function Vc(r, e, t) {
  for (var n, i = [], A = e; A < t; A += 3)
    n = (r[A] << 16 & 16711680) + (r[A + 1] << 8 & 65280) + (r[A + 2] & 255), i.push(Wc(n));
  return i.join("");
}
function $c(r) {
  for (var e, t = r.length, n = t % 3, i = [], A = 16383, a = 0, o = t - n; a < o; a += A)
    i.push(Vc(r, a, a + A > o ? o : a + A));
  return n === 1 ? (e = r[t - 1], i.push(
    ot[e >> 2] + ot[e << 4 & 63] + "=="
  )) : n === 2 && (e = (r[t - 2] << 8) + r[t - 1], i.push(
    ot[e >> 10] + ot[e >> 4 & 63] + ot[e << 2 & 63] + "="
  )), i.join("");
}
var vA = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
vA.read = function(r, e, t, n, i) {
  var A, a, o = i * 8 - n - 1, c = (1 << o) - 1, l = c >> 1, s = -7, p = t ? i - 1 : 0, d = t ? -1 : 1, I = r[e + p];
  for (p += d, A = I & (1 << -s) - 1, I >>= -s, s += o; s > 0; A = A * 256 + r[e + p], p += d, s -= 8)
    ;
  for (a = A & (1 << -s) - 1, A >>= -s, s += n; s > 0; a = a * 256 + r[e + p], p += d, s -= 8)
    ;
  if (A === 0)
    A = 1 - l;
  else {
    if (A === c)
      return a ? NaN : (I ? -1 : 1) * (1 / 0);
    a = a + Math.pow(2, n), A = A - l;
  }
  return (I ? -1 : 1) * a * Math.pow(2, A - n);
};
vA.write = function(r, e, t, n, i, A) {
  var a, o, c, l = A * 8 - i - 1, s = (1 << l) - 1, p = s >> 1, d = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, I = n ? 0 : A - 1, E = n ? 1 : -1, x = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (o = isNaN(e) ? 1 : 0, a = s) : (a = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -a)) < 1 && (a--, c *= 2), a + p >= 1 ? e += d / c : e += d * Math.pow(2, 1 - p), e * c >= 2 && (a++, c /= 2), a + p >= s ? (o = 0, a = s) : a + p >= 1 ? (o = (e * c - 1) * Math.pow(2, i), a = a + p) : (o = e * Math.pow(2, p - 1) * Math.pow(2, i), a = 0)); i >= 8; r[t + I] = o & 255, I += E, o /= 256, i -= 8)
    ;
  for (a = a << i | o, l += i; l > 0; r[t + I] = a & 255, I += E, a /= 256, l -= 8)
    ;
  r[t + I - E] |= x * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(r) {
  const e = En, t = vA, n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  r.Buffer = s, r.SlowBuffer = R, r.INSPECT_MAX_BYTES = 50;
  const i = 2147483647;
  r.kMaxLength = i;
  const { Uint8Array: A, ArrayBuffer: a, SharedArrayBuffer: o } = globalThis;
  s.TYPED_ARRAY_SUPPORT = c(), !s.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function c() {
    try {
      const B = new A(1), f = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(f, A.prototype), Object.setPrototypeOf(B, f), B.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(s.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (s.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(s.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (s.isBuffer(this))
        return this.byteOffset;
    }
  });
  function l(B) {
    if (B > i)
      throw new RangeError('The value "' + B + '" is invalid for option "size"');
    const f = new A(B);
    return Object.setPrototypeOf(f, s.prototype), f;
  }
  function s(B, f, u) {
    if (typeof B == "number") {
      if (typeof f == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return E(B);
    }
    return p(B, f, u);
  }
  s.poolSize = 8192;
  function p(B, f, u) {
    if (typeof B == "string")
      return x(B, f);
    if (a.isView(B))
      return w(B);
    if (B == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof B
      );
    if (he(B, a) || B && he(B.buffer, a) || typeof o < "u" && (he(B, o) || B && he(B.buffer, o)))
      return b(B, f, u);
    if (typeof B == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const S = B.valueOf && B.valueOf();
    if (S != null && S !== B)
      return s.from(S, f, u);
    const U = D(B);
    if (U) return U;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof B[Symbol.toPrimitive] == "function")
      return s.from(B[Symbol.toPrimitive]("string"), f, u);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof B
    );
  }
  s.from = function(B, f, u) {
    return p(B, f, u);
  }, Object.setPrototypeOf(s.prototype, A.prototype), Object.setPrototypeOf(s, A);
  function d(B) {
    if (typeof B != "number")
      throw new TypeError('"size" argument must be of type number');
    if (B < 0)
      throw new RangeError('The value "' + B + '" is invalid for option "size"');
  }
  function I(B, f, u) {
    return d(B), B <= 0 ? l(B) : f !== void 0 ? typeof u == "string" ? l(B).fill(f, u) : l(B).fill(f) : l(B);
  }
  s.alloc = function(B, f, u) {
    return I(B, f, u);
  };
  function E(B) {
    return d(B), l(B < 0 ? 0 : F(B) | 0);
  }
  s.allocUnsafe = function(B) {
    return E(B);
  }, s.allocUnsafeSlow = function(B) {
    return E(B);
  };
  function x(B, f) {
    if ((typeof f != "string" || f === "") && (f = "utf8"), !s.isEncoding(f))
      throw new TypeError("Unknown encoding: " + f);
    const u = L(B, f) | 0;
    let S = l(u);
    const U = S.write(B, f);
    return U !== u && (S = S.slice(0, U)), S;
  }
  function v(B) {
    const f = B.length < 0 ? 0 : F(B.length) | 0, u = l(f);
    for (let S = 0; S < f; S += 1)
      u[S] = B[S] & 255;
    return u;
  }
  function w(B) {
    if (he(B, A)) {
      const f = new A(B);
      return b(f.buffer, f.byteOffset, f.byteLength);
    }
    return v(B);
  }
  function b(B, f, u) {
    if (f < 0 || B.byteLength < f)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (B.byteLength < f + (u || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let S;
    return f === void 0 && u === void 0 ? S = new A(B) : u === void 0 ? S = new A(B, f) : S = new A(B, f, u), Object.setPrototypeOf(S, s.prototype), S;
  }
  function D(B) {
    if (s.isBuffer(B)) {
      const f = F(B.length) | 0, u = l(f);
      return u.length === 0 || B.copy(u, 0, 0, f), u;
    }
    if (B.length !== void 0)
      return typeof B.length != "number" || ve(B.length) ? l(0) : v(B);
    if (B.type === "Buffer" && Array.isArray(B.data))
      return v(B.data);
  }
  function F(B) {
    if (B >= i)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
    return B | 0;
  }
  function R(B) {
    return +B != B && (B = 0), s.alloc(+B);
  }
  s.isBuffer = function(f) {
    return f != null && f._isBuffer === !0 && f !== s.prototype;
  }, s.compare = function(f, u) {
    if (he(f, A) && (f = s.from(f, f.offset, f.byteLength)), he(u, A) && (u = s.from(u, u.offset, u.byteLength)), !s.isBuffer(f) || !s.isBuffer(u))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (f === u) return 0;
    let S = f.length, U = u.length;
    for (let H = 0, W = Math.min(S, U); H < W; ++H)
      if (f[H] !== u[H]) {
        S = f[H], U = u[H];
        break;
      }
    return S < U ? -1 : U < S ? 1 : 0;
  }, s.isEncoding = function(f) {
    switch (String(f).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, s.concat = function(f, u) {
    if (!Array.isArray(f))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (f.length === 0)
      return s.alloc(0);
    let S;
    if (u === void 0)
      for (u = 0, S = 0; S < f.length; ++S)
        u += f[S].length;
    const U = s.allocUnsafe(u);
    let H = 0;
    for (S = 0; S < f.length; ++S) {
      let W = f[S];
      if (he(W, A))
        H + W.length > U.length ? (s.isBuffer(W) || (W = s.from(W)), W.copy(U, H)) : A.prototype.set.call(
          U,
          W,
          H
        );
      else if (s.isBuffer(W))
        W.copy(U, H);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      H += W.length;
    }
    return U;
  };
  function L(B, f) {
    if (s.isBuffer(B))
      return B.length;
    if (a.isView(B) || he(B, a))
      return B.byteLength;
    if (typeof B != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof B
      );
    const u = B.length, S = arguments.length > 2 && arguments[2] === !0;
    if (!S && u === 0) return 0;
    let U = !1;
    for (; ; )
      switch (f) {
        case "ascii":
        case "latin1":
        case "binary":
          return u;
        case "utf8":
        case "utf-8":
          return G(B).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return u * 2;
        case "hex":
          return u >>> 1;
        case "base64":
          return ce(B).length;
        default:
          if (U)
            return S ? -1 : G(B).length;
          f = ("" + f).toLowerCase(), U = !0;
      }
  }
  s.byteLength = L;
  function q(B, f, u) {
    let S = !1;
    if ((f === void 0 || f < 0) && (f = 0), f > this.length || ((u === void 0 || u > this.length) && (u = this.length), u <= 0) || (u >>>= 0, f >>>= 0, u <= f))
      return "";
    for (B || (B = "utf8"); ; )
      switch (B) {
        case "hex":
          return M(this, f, u);
        case "utf8":
        case "utf-8":
          return ye(this, f, u);
        case "ascii":
          return Z(this, f, u);
        case "latin1":
        case "binary":
          return re(this, f, u);
        case "base64":
          return se(this, f, u);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return P(this, f, u);
        default:
          if (S) throw new TypeError("Unknown encoding: " + B);
          B = (B + "").toLowerCase(), S = !0;
      }
  }
  s.prototype._isBuffer = !0;
  function T(B, f, u) {
    const S = B[f];
    B[f] = B[u], B[u] = S;
  }
  s.prototype.swap16 = function() {
    const f = this.length;
    if (f % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let u = 0; u < f; u += 2)
      T(this, u, u + 1);
    return this;
  }, s.prototype.swap32 = function() {
    const f = this.length;
    if (f % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let u = 0; u < f; u += 4)
      T(this, u, u + 3), T(this, u + 1, u + 2);
    return this;
  }, s.prototype.swap64 = function() {
    const f = this.length;
    if (f % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let u = 0; u < f; u += 8)
      T(this, u, u + 7), T(this, u + 1, u + 6), T(this, u + 2, u + 5), T(this, u + 3, u + 4);
    return this;
  }, s.prototype.toString = function() {
    const f = this.length;
    return f === 0 ? "" : arguments.length === 0 ? ye(this, 0, f) : q.apply(this, arguments);
  }, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function(f) {
    if (!s.isBuffer(f)) throw new TypeError("Argument must be a Buffer");
    return this === f ? !0 : s.compare(this, f) === 0;
  }, s.prototype.inspect = function() {
    let f = "";
    const u = r.INSPECT_MAX_BYTES;
    return f = this.toString("hex", 0, u).replace(/(.{2})/g, "$1 ").trim(), this.length > u && (f += " ... "), "<Buffer " + f + ">";
  }, n && (s.prototype[n] = s.prototype.inspect), s.prototype.compare = function(f, u, S, U, H) {
    if (he(f, A) && (f = s.from(f, f.offset, f.byteLength)), !s.isBuffer(f))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof f
      );
    if (u === void 0 && (u = 0), S === void 0 && (S = f ? f.length : 0), U === void 0 && (U = 0), H === void 0 && (H = this.length), u < 0 || S > f.length || U < 0 || H > this.length)
      throw new RangeError("out of range index");
    if (U >= H && u >= S)
      return 0;
    if (U >= H)
      return -1;
    if (u >= S)
      return 1;
    if (u >>>= 0, S >>>= 0, U >>>= 0, H >>>= 0, this === f) return 0;
    let W = H - U, de = S - u;
    const Re = Math.min(W, de), xe = this.slice(U, H), _e = f.slice(u, S);
    for (let me = 0; me < Re; ++me)
      if (xe[me] !== _e[me]) {
        W = xe[me], de = _e[me];
        break;
      }
    return W < de ? -1 : de < W ? 1 : 0;
  };
  function j(B, f, u, S, U) {
    if (B.length === 0) return -1;
    if (typeof u == "string" ? (S = u, u = 0) : u > 2147483647 ? u = 2147483647 : u < -2147483648 && (u = -2147483648), u = +u, ve(u) && (u = U ? 0 : B.length - 1), u < 0 && (u = B.length + u), u >= B.length) {
      if (U) return -1;
      u = B.length - 1;
    } else if (u < 0)
      if (U) u = 0;
      else return -1;
    if (typeof f == "string" && (f = s.from(f, S)), s.isBuffer(f))
      return f.length === 0 ? -1 : $(B, f, u, S, U);
    if (typeof f == "number")
      return f = f & 255, typeof A.prototype.indexOf == "function" ? U ? A.prototype.indexOf.call(B, f, u) : A.prototype.lastIndexOf.call(B, f, u) : $(B, [f], u, S, U);
    throw new TypeError("val must be string, number or Buffer");
  }
  function $(B, f, u, S, U) {
    let H = 1, W = B.length, de = f.length;
    if (S !== void 0 && (S = String(S).toLowerCase(), S === "ucs2" || S === "ucs-2" || S === "utf16le" || S === "utf-16le")) {
      if (B.length < 2 || f.length < 2)
        return -1;
      H = 2, W /= 2, de /= 2, u /= 2;
    }
    function Re(_e, me) {
      return H === 1 ? _e[me] : _e.readUInt16BE(me * H);
    }
    let xe;
    if (U) {
      let _e = -1;
      for (xe = u; xe < W; xe++)
        if (Re(B, xe) === Re(f, _e === -1 ? 0 : xe - _e)) {
          if (_e === -1 && (_e = xe), xe - _e + 1 === de) return _e * H;
        } else
          _e !== -1 && (xe -= xe - _e), _e = -1;
    } else
      for (u + de > W && (u = W - de), xe = u; xe >= 0; xe--) {
        let _e = !0;
        for (let me = 0; me < de; me++)
          if (Re(B, xe + me) !== Re(f, me)) {
            _e = !1;
            break;
          }
        if (_e) return xe;
      }
    return -1;
  }
  s.prototype.includes = function(f, u, S) {
    return this.indexOf(f, u, S) !== -1;
  }, s.prototype.indexOf = function(f, u, S) {
    return j(this, f, u, S, !0);
  }, s.prototype.lastIndexOf = function(f, u, S) {
    return j(this, f, u, S, !1);
  };
  function te(B, f, u, S) {
    u = Number(u) || 0;
    const U = B.length - u;
    S ? (S = Number(S), S > U && (S = U)) : S = U;
    const H = f.length;
    S > H / 2 && (S = H / 2);
    let W;
    for (W = 0; W < S; ++W) {
      const de = parseInt(f.substr(W * 2, 2), 16);
      if (ve(de)) return W;
      B[u + W] = de;
    }
    return W;
  }
  function oe(B, f, u, S) {
    return Ie(G(f, B.length - u), B, u, S);
  }
  function ne(B, f, u, S) {
    return Ie(V(f), B, u, S);
  }
  function Ae(B, f, u, S) {
    return Ie(ce(f), B, u, S);
  }
  function ie(B, f, u, S) {
    return Ie(X(f, B.length - u), B, u, S);
  }
  s.prototype.write = function(f, u, S, U) {
    if (u === void 0)
      U = "utf8", S = this.length, u = 0;
    else if (S === void 0 && typeof u == "string")
      U = u, S = this.length, u = 0;
    else if (isFinite(u))
      u = u >>> 0, isFinite(S) ? (S = S >>> 0, U === void 0 && (U = "utf8")) : (U = S, S = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const H = this.length - u;
    if ((S === void 0 || S > H) && (S = H), f.length > 0 && (S < 0 || u < 0) || u > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    U || (U = "utf8");
    let W = !1;
    for (; ; )
      switch (U) {
        case "hex":
          return te(this, f, u, S);
        case "utf8":
        case "utf-8":
          return oe(this, f, u, S);
        case "ascii":
        case "latin1":
        case "binary":
          return ne(this, f, u, S);
        case "base64":
          return Ae(this, f, u, S);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ie(this, f, u, S);
        default:
          if (W) throw new TypeError("Unknown encoding: " + U);
          U = ("" + U).toLowerCase(), W = !0;
      }
  }, s.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function se(B, f, u) {
    return f === 0 && u === B.length ? e.fromByteArray(B) : e.fromByteArray(B.slice(f, u));
  }
  function ye(B, f, u) {
    u = Math.min(B.length, u);
    const S = [];
    let U = f;
    for (; U < u; ) {
      const H = B[U];
      let W = null, de = H > 239 ? 4 : H > 223 ? 3 : H > 191 ? 2 : 1;
      if (U + de <= u) {
        let Re, xe, _e, me;
        switch (de) {
          case 1:
            H < 128 && (W = H);
            break;
          case 2:
            Re = B[U + 1], (Re & 192) === 128 && (me = (H & 31) << 6 | Re & 63, me > 127 && (W = me));
            break;
          case 3:
            Re = B[U + 1], xe = B[U + 2], (Re & 192) === 128 && (xe & 192) === 128 && (me = (H & 15) << 12 | (Re & 63) << 6 | xe & 63, me > 2047 && (me < 55296 || me > 57343) && (W = me));
            break;
          case 4:
            Re = B[U + 1], xe = B[U + 2], _e = B[U + 3], (Re & 192) === 128 && (xe & 192) === 128 && (_e & 192) === 128 && (me = (H & 15) << 18 | (Re & 63) << 12 | (xe & 63) << 6 | _e & 63, me > 65535 && me < 1114112 && (W = me));
        }
      }
      W === null ? (W = 65533, de = 1) : W > 65535 && (W -= 65536, S.push(W >>> 10 & 1023 | 55296), W = 56320 | W & 1023), S.push(W), U += de;
    }
    return ge(S);
  }
  const Be = 4096;
  function ge(B) {
    const f = B.length;
    if (f <= Be)
      return String.fromCharCode.apply(String, B);
    let u = "", S = 0;
    for (; S < f; )
      u += String.fromCharCode.apply(
        String,
        B.slice(S, S += Be)
      );
    return u;
  }
  function Z(B, f, u) {
    let S = "";
    u = Math.min(B.length, u);
    for (let U = f; U < u; ++U)
      S += String.fromCharCode(B[U] & 127);
    return S;
  }
  function re(B, f, u) {
    let S = "";
    u = Math.min(B.length, u);
    for (let U = f; U < u; ++U)
      S += String.fromCharCode(B[U]);
    return S;
  }
  function M(B, f, u) {
    const S = B.length;
    (!f || f < 0) && (f = 0), (!u || u < 0 || u > S) && (u = S);
    let U = "";
    for (let H = f; H < u; ++H)
      U += Ce[B[H]];
    return U;
  }
  function P(B, f, u) {
    const S = B.slice(f, u);
    let U = "";
    for (let H = 0; H < S.length - 1; H += 2)
      U += String.fromCharCode(S[H] + S[H + 1] * 256);
    return U;
  }
  s.prototype.slice = function(f, u) {
    const S = this.length;
    f = ~~f, u = u === void 0 ? S : ~~u, f < 0 ? (f += S, f < 0 && (f = 0)) : f > S && (f = S), u < 0 ? (u += S, u < 0 && (u = 0)) : u > S && (u = S), u < f && (u = f);
    const U = this.subarray(f, u);
    return Object.setPrototypeOf(U, s.prototype), U;
  };
  function N(B, f, u) {
    if (B % 1 !== 0 || B < 0) throw new RangeError("offset is not uint");
    if (B + f > u) throw new RangeError("Trying to access beyond buffer length");
  }
  s.prototype.readUintLE = s.prototype.readUIntLE = function(f, u, S) {
    f = f >>> 0, u = u >>> 0, S || N(f, u, this.length);
    let U = this[f], H = 1, W = 0;
    for (; ++W < u && (H *= 256); )
      U += this[f + W] * H;
    return U;
  }, s.prototype.readUintBE = s.prototype.readUIntBE = function(f, u, S) {
    f = f >>> 0, u = u >>> 0, S || N(f, u, this.length);
    let U = this[f + --u], H = 1;
    for (; u > 0 && (H *= 256); )
      U += this[f + --u] * H;
    return U;
  }, s.prototype.readUint8 = s.prototype.readUInt8 = function(f, u) {
    return f = f >>> 0, u || N(f, 1, this.length), this[f];
  }, s.prototype.readUint16LE = s.prototype.readUInt16LE = function(f, u) {
    return f = f >>> 0, u || N(f, 2, this.length), this[f] | this[f + 1] << 8;
  }, s.prototype.readUint16BE = s.prototype.readUInt16BE = function(f, u) {
    return f = f >>> 0, u || N(f, 2, this.length), this[f] << 8 | this[f + 1];
  }, s.prototype.readUint32LE = s.prototype.readUInt32LE = function(f, u) {
    return f = f >>> 0, u || N(f, 4, this.length), (this[f] | this[f + 1] << 8 | this[f + 2] << 16) + this[f + 3] * 16777216;
  }, s.prototype.readUint32BE = s.prototype.readUInt32BE = function(f, u) {
    return f = f >>> 0, u || N(f, 4, this.length), this[f] * 16777216 + (this[f + 1] << 16 | this[f + 2] << 8 | this[f + 3]);
  }, s.prototype.readBigUInt64LE = Me(function(f) {
    f = f >>> 0, C(f, "offset");
    const u = this[f], S = this[f + 7];
    (u === void 0 || S === void 0) && h(f, this.length - 8);
    const U = u + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + this[++f] * 2 ** 24, H = this[++f] + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + S * 2 ** 24;
    return BigInt(U) + (BigInt(H) << BigInt(32));
  }), s.prototype.readBigUInt64BE = Me(function(f) {
    f = f >>> 0, C(f, "offset");
    const u = this[f], S = this[f + 7];
    (u === void 0 || S === void 0) && h(f, this.length - 8);
    const U = u * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + this[++f], H = this[++f] * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + S;
    return (BigInt(U) << BigInt(32)) + BigInt(H);
  }), s.prototype.readIntLE = function(f, u, S) {
    f = f >>> 0, u = u >>> 0, S || N(f, u, this.length);
    let U = this[f], H = 1, W = 0;
    for (; ++W < u && (H *= 256); )
      U += this[f + W] * H;
    return H *= 128, U >= H && (U -= Math.pow(2, 8 * u)), U;
  }, s.prototype.readIntBE = function(f, u, S) {
    f = f >>> 0, u = u >>> 0, S || N(f, u, this.length);
    let U = u, H = 1, W = this[f + --U];
    for (; U > 0 && (H *= 256); )
      W += this[f + --U] * H;
    return H *= 128, W >= H && (W -= Math.pow(2, 8 * u)), W;
  }, s.prototype.readInt8 = function(f, u) {
    return f = f >>> 0, u || N(f, 1, this.length), this[f] & 128 ? (255 - this[f] + 1) * -1 : this[f];
  }, s.prototype.readInt16LE = function(f, u) {
    f = f >>> 0, u || N(f, 2, this.length);
    const S = this[f] | this[f + 1] << 8;
    return S & 32768 ? S | 4294901760 : S;
  }, s.prototype.readInt16BE = function(f, u) {
    f = f >>> 0, u || N(f, 2, this.length);
    const S = this[f + 1] | this[f] << 8;
    return S & 32768 ? S | 4294901760 : S;
  }, s.prototype.readInt32LE = function(f, u) {
    return f = f >>> 0, u || N(f, 4, this.length), this[f] | this[f + 1] << 8 | this[f + 2] << 16 | this[f + 3] << 24;
  }, s.prototype.readInt32BE = function(f, u) {
    return f = f >>> 0, u || N(f, 4, this.length), this[f] << 24 | this[f + 1] << 16 | this[f + 2] << 8 | this[f + 3];
  }, s.prototype.readBigInt64LE = Me(function(f) {
    f = f >>> 0, C(f, "offset");
    const u = this[f], S = this[f + 7];
    (u === void 0 || S === void 0) && h(f, this.length - 8);
    const U = this[f + 4] + this[f + 5] * 2 ** 8 + this[f + 6] * 2 ** 16 + (S << 24);
    return (BigInt(U) << BigInt(32)) + BigInt(u + this[++f] * 2 ** 8 + this[++f] * 2 ** 16 + this[++f] * 2 ** 24);
  }), s.prototype.readBigInt64BE = Me(function(f) {
    f = f >>> 0, C(f, "offset");
    const u = this[f], S = this[f + 7];
    (u === void 0 || S === void 0) && h(f, this.length - 8);
    const U = (u << 24) + // Overflow
    this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + this[++f];
    return (BigInt(U) << BigInt(32)) + BigInt(this[++f] * 2 ** 24 + this[++f] * 2 ** 16 + this[++f] * 2 ** 8 + S);
  }), s.prototype.readFloatLE = function(f, u) {
    return f = f >>> 0, u || N(f, 4, this.length), t.read(this, f, !0, 23, 4);
  }, s.prototype.readFloatBE = function(f, u) {
    return f = f >>> 0, u || N(f, 4, this.length), t.read(this, f, !1, 23, 4);
  }, s.prototype.readDoubleLE = function(f, u) {
    return f = f >>> 0, u || N(f, 8, this.length), t.read(this, f, !0, 52, 8);
  }, s.prototype.readDoubleBE = function(f, u) {
    return f = f >>> 0, u || N(f, 8, this.length), t.read(this, f, !1, 52, 8);
  };
  function Y(B, f, u, S, U, H) {
    if (!s.isBuffer(B)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (f > U || f < H) throw new RangeError('"value" argument is out of bounds');
    if (u + S > B.length) throw new RangeError("Index out of range");
  }
  s.prototype.writeUintLE = s.prototype.writeUIntLE = function(f, u, S, U) {
    if (f = +f, u = u >>> 0, S = S >>> 0, !U) {
      const de = Math.pow(2, 8 * S) - 1;
      Y(this, f, u, S, de, 0);
    }
    let H = 1, W = 0;
    for (this[u] = f & 255; ++W < S && (H *= 256); )
      this[u + W] = f / H & 255;
    return u + S;
  }, s.prototype.writeUintBE = s.prototype.writeUIntBE = function(f, u, S, U) {
    if (f = +f, u = u >>> 0, S = S >>> 0, !U) {
      const de = Math.pow(2, 8 * S) - 1;
      Y(this, f, u, S, de, 0);
    }
    let H = S - 1, W = 1;
    for (this[u + H] = f & 255; --H >= 0 && (W *= 256); )
      this[u + H] = f / W & 255;
    return u + S;
  }, s.prototype.writeUint8 = s.prototype.writeUInt8 = function(f, u, S) {
    return f = +f, u = u >>> 0, S || Y(this, f, u, 1, 255, 0), this[u] = f & 255, u + 1;
  }, s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function(f, u, S) {
    return f = +f, u = u >>> 0, S || Y(this, f, u, 2, 65535, 0), this[u] = f & 255, this[u + 1] = f >>> 8, u + 2;
  }, s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function(f, u, S) {
    return f = +f, u = u >>> 0, S || Y(this, f, u, 2, 65535, 0), this[u] = f >>> 8, this[u + 1] = f & 255, u + 2;
  }, s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function(f, u, S) {
    return f = +f, u = u >>> 0, S || Y(this, f, u, 4, 4294967295, 0), this[u + 3] = f >>> 24, this[u + 2] = f >>> 16, this[u + 1] = f >>> 8, this[u] = f & 255, u + 4;
  }, s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function(f, u, S) {
    return f = +f, u = u >>> 0, S || Y(this, f, u, 4, 4294967295, 0), this[u] = f >>> 24, this[u + 1] = f >>> 16, this[u + 2] = f >>> 8, this[u + 3] = f & 255, u + 4;
  };
  function _(B, f, u, S, U) {
    le(f, S, U, B, u, 7);
    let H = Number(f & BigInt(4294967295));
    B[u++] = H, H = H >> 8, B[u++] = H, H = H >> 8, B[u++] = H, H = H >> 8, B[u++] = H;
    let W = Number(f >> BigInt(32) & BigInt(4294967295));
    return B[u++] = W, W = W >> 8, B[u++] = W, W = W >> 8, B[u++] = W, W = W >> 8, B[u++] = W, u;
  }
  function k(B, f, u, S, U) {
    le(f, S, U, B, u, 7);
    let H = Number(f & BigInt(4294967295));
    B[u + 7] = H, H = H >> 8, B[u + 6] = H, H = H >> 8, B[u + 5] = H, H = H >> 8, B[u + 4] = H;
    let W = Number(f >> BigInt(32) & BigInt(4294967295));
    return B[u + 3] = W, W = W >> 8, B[u + 2] = W, W = W >> 8, B[u + 1] = W, W = W >> 8, B[u] = W, u + 8;
  }
  s.prototype.writeBigUInt64LE = Me(function(f, u = 0) {
    return _(this, f, u, BigInt(0), BigInt("0xffffffffffffffff"));
  }), s.prototype.writeBigUInt64BE = Me(function(f, u = 0) {
    return k(this, f, u, BigInt(0), BigInt("0xffffffffffffffff"));
  }), s.prototype.writeIntLE = function(f, u, S, U) {
    if (f = +f, u = u >>> 0, !U) {
      const Re = Math.pow(2, 8 * S - 1);
      Y(this, f, u, S, Re - 1, -Re);
    }
    let H = 0, W = 1, de = 0;
    for (this[u] = f & 255; ++H < S && (W *= 256); )
      f < 0 && de === 0 && this[u + H - 1] !== 0 && (de = 1), this[u + H] = (f / W >> 0) - de & 255;
    return u + S;
  }, s.prototype.writeIntBE = function(f, u, S, U) {
    if (f = +f, u = u >>> 0, !U) {
      const Re = Math.pow(2, 8 * S - 1);
      Y(this, f, u, S, Re - 1, -Re);
    }
    let H = S - 1, W = 1, de = 0;
    for (this[u + H] = f & 255; --H >= 0 && (W *= 256); )
      f < 0 && de === 0 && this[u + H + 1] !== 0 && (de = 1), this[u + H] = (f / W >> 0) - de & 255;
    return u + S;
  }, s.prototype.writeInt8 = function(f, u, S) {
    return f = +f, u = u >>> 0, S || Y(this, f, u, 1, 127, -128), f < 0 && (f = 255 + f + 1), this[u] = f & 255, u + 1;
  }, s.prototype.writeInt16LE = function(f, u, S) {
    return f = +f, u = u >>> 0, S || Y(this, f, u, 2, 32767, -32768), this[u] = f & 255, this[u + 1] = f >>> 8, u + 2;
  }, s.prototype.writeInt16BE = function(f, u, S) {
    return f = +f, u = u >>> 0, S || Y(this, f, u, 2, 32767, -32768), this[u] = f >>> 8, this[u + 1] = f & 255, u + 2;
  }, s.prototype.writeInt32LE = function(f, u, S) {
    return f = +f, u = u >>> 0, S || Y(this, f, u, 4, 2147483647, -2147483648), this[u] = f & 255, this[u + 1] = f >>> 8, this[u + 2] = f >>> 16, this[u + 3] = f >>> 24, u + 4;
  }, s.prototype.writeInt32BE = function(f, u, S) {
    return f = +f, u = u >>> 0, S || Y(this, f, u, 4, 2147483647, -2147483648), f < 0 && (f = 4294967295 + f + 1), this[u] = f >>> 24, this[u + 1] = f >>> 16, this[u + 2] = f >>> 8, this[u + 3] = f & 255, u + 4;
  }, s.prototype.writeBigInt64LE = Me(function(f, u = 0) {
    return _(this, f, u, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), s.prototype.writeBigInt64BE = Me(function(f, u = 0) {
    return k(this, f, u, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function O(B, f, u, S, U, H) {
    if (u + S > B.length) throw new RangeError("Index out of range");
    if (u < 0) throw new RangeError("Index out of range");
  }
  function K(B, f, u, S, U) {
    return f = +f, u = u >>> 0, U || O(B, f, u, 4), t.write(B, f, u, S, 23, 4), u + 4;
  }
  s.prototype.writeFloatLE = function(f, u, S) {
    return K(this, f, u, !0, S);
  }, s.prototype.writeFloatBE = function(f, u, S) {
    return K(this, f, u, !1, S);
  };
  function z(B, f, u, S, U) {
    return f = +f, u = u >>> 0, U || O(B, f, u, 8), t.write(B, f, u, S, 52, 8), u + 8;
  }
  s.prototype.writeDoubleLE = function(f, u, S) {
    return z(this, f, u, !0, S);
  }, s.prototype.writeDoubleBE = function(f, u, S) {
    return z(this, f, u, !1, S);
  }, s.prototype.copy = function(f, u, S, U) {
    if (!s.isBuffer(f)) throw new TypeError("argument should be a Buffer");
    if (S || (S = 0), !U && U !== 0 && (U = this.length), u >= f.length && (u = f.length), u || (u = 0), U > 0 && U < S && (U = S), U === S || f.length === 0 || this.length === 0) return 0;
    if (u < 0)
      throw new RangeError("targetStart out of bounds");
    if (S < 0 || S >= this.length) throw new RangeError("Index out of range");
    if (U < 0) throw new RangeError("sourceEnd out of bounds");
    U > this.length && (U = this.length), f.length - u < U - S && (U = f.length - u + S);
    const H = U - S;
    return this === f && typeof A.prototype.copyWithin == "function" ? this.copyWithin(u, S, U) : A.prototype.set.call(
      f,
      this.subarray(S, U),
      u
    ), H;
  }, s.prototype.fill = function(f, u, S, U) {
    if (typeof f == "string") {
      if (typeof u == "string" ? (U = u, u = 0, S = this.length) : typeof S == "string" && (U = S, S = this.length), U !== void 0 && typeof U != "string")
        throw new TypeError("encoding must be a string");
      if (typeof U == "string" && !s.isEncoding(U))
        throw new TypeError("Unknown encoding: " + U);
      if (f.length === 1) {
        const W = f.charCodeAt(0);
        (U === "utf8" && W < 128 || U === "latin1") && (f = W);
      }
    } else typeof f == "number" ? f = f & 255 : typeof f == "boolean" && (f = Number(f));
    if (u < 0 || this.length < u || this.length < S)
      throw new RangeError("Out of range index");
    if (S <= u)
      return this;
    u = u >>> 0, S = S === void 0 ? this.length : S >>> 0, f || (f = 0);
    let H;
    if (typeof f == "number")
      for (H = u; H < S; ++H)
        this[H] = f;
    else {
      const W = s.isBuffer(f) ? f : s.from(f, U), de = W.length;
      if (de === 0)
        throw new TypeError('The value "' + f + '" is invalid for argument "value"');
      for (H = 0; H < S - u; ++H)
        this[H + u] = W[H % de];
    }
    return this;
  };
  const Q = {};
  function m(B, f, u) {
    Q[B] = class extends u {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: f.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${B}]`, this.stack, delete this.name;
      }
      get code() {
        return B;
      }
      set code(U) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: U,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${B}]: ${this.message}`;
      }
    };
  }
  m(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(B) {
      return B ? `${B} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), m(
    "ERR_INVALID_ARG_TYPE",
    function(B, f) {
      return `The "${B}" argument must be of type number. Received type ${typeof f}`;
    },
    TypeError
  ), m(
    "ERR_OUT_OF_RANGE",
    function(B, f, u) {
      let S = `The value of "${B}" is out of range.`, U = u;
      return Number.isInteger(u) && Math.abs(u) > 2 ** 32 ? U = J(String(u)) : typeof u == "bigint" && (U = String(u), (u > BigInt(2) ** BigInt(32) || u < -(BigInt(2) ** BigInt(32))) && (U = J(U)), U += "n"), S += ` It must be ${f}. Received ${U}`, S;
    },
    RangeError
  );
  function J(B) {
    let f = "", u = B.length;
    const S = B[0] === "-" ? 1 : 0;
    for (; u >= S + 4; u -= 3)
      f = `_${B.slice(u - 3, u)}${f}`;
    return `${B.slice(0, u)}${f}`;
  }
  function ee(B, f, u) {
    C(f, "offset"), (B[f] === void 0 || B[f + u] === void 0) && h(f, B.length - (u + 1));
  }
  function le(B, f, u, S, U, H) {
    if (B > u || B < f) {
      const W = typeof f == "bigint" ? "n" : "";
      let de;
      throw f === 0 || f === BigInt(0) ? de = `>= 0${W} and < 2${W} ** ${(H + 1) * 8}${W}` : de = `>= -(2${W} ** ${(H + 1) * 8 - 1}${W}) and < 2 ** ${(H + 1) * 8 - 1}${W}`, new Q.ERR_OUT_OF_RANGE("value", de, B);
    }
    ee(S, U, H);
  }
  function C(B, f) {
    if (typeof B != "number")
      throw new Q.ERR_INVALID_ARG_TYPE(f, "number", B);
  }
  function h(B, f, u) {
    throw Math.floor(B) !== B ? (C(B, u), new Q.ERR_OUT_OF_RANGE("offset", "an integer", B)) : f < 0 ? new Q.ERR_BUFFER_OUT_OF_BOUNDS() : new Q.ERR_OUT_OF_RANGE(
      "offset",
      `>= 0 and <= ${f}`,
      B
    );
  }
  const g = /[^+/0-9A-Za-z-_]/g;
  function y(B) {
    if (B = B.split("=")[0], B = B.trim().replace(g, ""), B.length < 2) return "";
    for (; B.length % 4 !== 0; )
      B = B + "=";
    return B;
  }
  function G(B, f) {
    f = f || 1 / 0;
    let u;
    const S = B.length;
    let U = null;
    const H = [];
    for (let W = 0; W < S; ++W) {
      if (u = B.charCodeAt(W), u > 55295 && u < 57344) {
        if (!U) {
          if (u > 56319) {
            (f -= 3) > -1 && H.push(239, 191, 189);
            continue;
          } else if (W + 1 === S) {
            (f -= 3) > -1 && H.push(239, 191, 189);
            continue;
          }
          U = u;
          continue;
        }
        if (u < 56320) {
          (f -= 3) > -1 && H.push(239, 191, 189), U = u;
          continue;
        }
        u = (U - 55296 << 10 | u - 56320) + 65536;
      } else U && (f -= 3) > -1 && H.push(239, 191, 189);
      if (U = null, u < 128) {
        if ((f -= 1) < 0) break;
        H.push(u);
      } else if (u < 2048) {
        if ((f -= 2) < 0) break;
        H.push(
          u >> 6 | 192,
          u & 63 | 128
        );
      } else if (u < 65536) {
        if ((f -= 3) < 0) break;
        H.push(
          u >> 12 | 224,
          u >> 6 & 63 | 128,
          u & 63 | 128
        );
      } else if (u < 1114112) {
        if ((f -= 4) < 0) break;
        H.push(
          u >> 18 | 240,
          u >> 12 & 63 | 128,
          u >> 6 & 63 | 128,
          u & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return H;
  }
  function V(B) {
    const f = [];
    for (let u = 0; u < B.length; ++u)
      f.push(B.charCodeAt(u) & 255);
    return f;
  }
  function X(B, f) {
    let u, S, U;
    const H = [];
    for (let W = 0; W < B.length && !((f -= 2) < 0); ++W)
      u = B.charCodeAt(W), S = u >> 8, U = u % 256, H.push(U), H.push(S);
    return H;
  }
  function ce(B) {
    return e.toByteArray(y(B));
  }
  function Ie(B, f, u, S) {
    let U;
    for (U = 0; U < S && !(U + u >= f.length || U >= B.length); ++U)
      f[U + u] = B[U];
    return U;
  }
  function he(B, f) {
    return B instanceof f || B != null && B.constructor != null && B.constructor.name != null && B.constructor.name === f.name;
  }
  function ve(B) {
    return B !== B;
  }
  const Ce = function() {
    const B = "0123456789abcdef", f = new Array(256);
    for (let u = 0; u < 16; ++u) {
      const S = u * 16;
      for (let U = 0; U < 16; ++U)
        f[S + U] = B[u] + B[U];
    }
    return f;
  }();
  function Me(B) {
    return typeof BigInt > "u" ? Rr : B;
  }
  function Rr() {
    throw new Error("BigInt not supported");
  }
})(Es);
const ut = Es.Buffer;
var SA = {};
function zc(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Cs = { exports: {} }, Le = Cs.exports = {}, rt, nt;
function Ni() {
  throw new Error("setTimeout has not been defined");
}
function Gi() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? rt = setTimeout : rt = Ni;
  } catch {
    rt = Ni;
  }
  try {
    typeof clearTimeout == "function" ? nt = clearTimeout : nt = Gi;
  } catch {
    nt = Gi;
  }
})();
function ws(r) {
  if (rt === setTimeout)
    return setTimeout(r, 0);
  if ((rt === Ni || !rt) && setTimeout)
    return rt = setTimeout, setTimeout(r, 0);
  try {
    return rt(r, 0);
  } catch {
    try {
      return rt.call(null, r, 0);
    } catch {
      return rt.call(this, r, 0);
    }
  }
}
function Xc(r) {
  if (nt === clearTimeout)
    return clearTimeout(r);
  if ((nt === Gi || !nt) && clearTimeout)
    return nt = clearTimeout, clearTimeout(r);
  try {
    return nt(r);
  } catch {
    try {
      return nt.call(null, r);
    } catch {
      return nt.call(this, r);
    }
  }
}
var ht = [], Vt = !1, Dt, Xr = -1;
function Zc() {
  !Vt || !Dt || (Vt = !1, Dt.length ? ht = Dt.concat(ht) : Xr = -1, ht.length && Qs());
}
function Qs() {
  if (!Vt) {
    var r = ws(Zc);
    Vt = !0;
    for (var e = ht.length; e; ) {
      for (Dt = ht, ht = []; ++Xr < e; )
        Dt && Dt[Xr].run();
      Xr = -1, e = ht.length;
    }
    Dt = null, Vt = !1, Xc(r);
  }
}
Le.nextTick = function(r) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var t = 1; t < arguments.length; t++)
      e[t - 1] = arguments[t];
  ht.push(new ms(r, e)), ht.length === 1 && !Vt && ws(Qs);
};
function ms(r, e) {
  this.fun = r, this.array = e;
}
ms.prototype.run = function() {
  this.fun.apply(null, this.array);
};
Le.title = "browser";
Le.browser = !0;
Le.env = {};
Le.argv = [];
Le.version = "";
Le.versions = {};
function pt() {
}
Le.on = pt;
Le.addListener = pt;
Le.once = pt;
Le.off = pt;
Le.removeListener = pt;
Le.removeAllListeners = pt;
Le.emit = pt;
Le.prependListener = pt;
Le.prependOnceListener = pt;
Le.listeners = function(r) {
  return [];
};
Le.binding = function(r) {
  throw new Error("process.binding is not supported");
};
Le.cwd = function() {
  return "/";
};
Le.chdir = function(r) {
  throw new Error("process.chdir is not supported");
};
Le.umask = function() {
  return 0;
};
var eu = Cs.exports;
const ue = /* @__PURE__ */ zc(eu);
var bs = { exports: {} }, xA = {};
(function(r) {
  r.fetch = i(we.fetch) && i(we.ReadableStream), r.writableStream = i(we.WritableStream), r.abortController = i(we.AbortController);
  var e;
  function t() {
    if (e !== void 0) return e;
    if (we.XMLHttpRequest) {
      e = new we.XMLHttpRequest();
      try {
        e.open("GET", we.XDomainRequest ? "/" : "https://example.com");
      } catch {
        e = null;
      }
    } else
      e = null;
    return e;
  }
  function n(A) {
    var a = t();
    if (!a) return !1;
    try {
      return a.responseType = A, a.responseType === A;
    } catch {
    }
    return !1;
  }
  r.arraybuffer = r.fetch || n("arraybuffer"), r.msstream = !r.fetch && n("ms-stream"), r.mozchunkedarraybuffer = !r.fetch && n("moz-chunked-arraybuffer"), r.overrideMimeType = r.fetch || (t() ? i(t().overrideMimeType) : !1);
  function i(A) {
    return typeof A == "function";
  }
  e = null;
})(xA);
var Oi = { exports: {} };
typeof Object.create == "function" ? Oi.exports = function(e, t) {
  t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : Oi.exports = function(e, t) {
  if (t) {
    e.super_ = t;
    var n = function() {
    };
    n.prototype = t.prototype, e.prototype = new n(), e.prototype.constructor = e;
  }
};
var mt = Oi.exports, Bn = {}, Pi = { exports: {} }, DA = { exports: {} }, $t = typeof Reflect == "object" ? Reflect : null, ZA = $t && typeof $t.apply == "function" ? $t.apply : function(e, t, n) {
  return Function.prototype.apply.call(e, t, n);
}, Zr;
$t && typeof $t.ownKeys == "function" ? Zr = $t.ownKeys : Object.getOwnPropertySymbols ? Zr = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : Zr = function(e) {
  return Object.getOwnPropertyNames(e);
};
function tu(r) {
  console && console.warn && console.warn(r);
}
var vs = Number.isNaN || function(e) {
  return e !== e;
};
function Qe() {
  Qe.init.call(this);
}
DA.exports = Qe;
DA.exports.once = Au;
Qe.EventEmitter = Qe;
Qe.prototype._events = void 0;
Qe.prototype._eventsCount = 0;
Qe.prototype._maxListeners = void 0;
var eo = 10;
function Cn(r) {
  if (typeof r != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r);
}
Object.defineProperty(Qe, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return eo;
  },
  set: function(r) {
    if (typeof r != "number" || r < 0 || vs(r))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r + ".");
    eo = r;
  }
});
Qe.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Qe.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || vs(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function Ss(r) {
  return r._maxListeners === void 0 ? Qe.defaultMaxListeners : r._maxListeners;
}
Qe.prototype.getMaxListeners = function() {
  return Ss(this);
};
Qe.prototype.emit = function(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
  var i = e === "error", A = this._events;
  if (A !== void 0)
    i = i && A.error === void 0;
  else if (!i)
    return !1;
  if (i) {
    var a;
    if (t.length > 0 && (a = t[0]), a instanceof Error)
      throw a;
    var o = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
    throw o.context = a, o;
  }
  var c = A[e];
  if (c === void 0)
    return !1;
  if (typeof c == "function")
    ZA(c, this, t);
  else
    for (var l = c.length, s = _s(c, l), n = 0; n < l; ++n)
      ZA(s[n], this, t);
  return !0;
};
function xs(r, e, t, n) {
  var i, A, a;
  if (Cn(t), A = r._events, A === void 0 ? (A = r._events = /* @__PURE__ */ Object.create(null), r._eventsCount = 0) : (A.newListener !== void 0 && (r.emit(
    "newListener",
    e,
    t.listener ? t.listener : t
  ), A = r._events), a = A[e]), a === void 0)
    a = A[e] = t, ++r._eventsCount;
  else if (typeof a == "function" ? a = A[e] = n ? [t, a] : [a, t] : n ? a.unshift(t) : a.push(t), i = Ss(r), i > 0 && a.length > i && !a.warned) {
    a.warned = !0;
    var o = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    o.name = "MaxListenersExceededWarning", o.emitter = r, o.type = e, o.count = a.length, tu(o);
  }
  return r;
}
Qe.prototype.addListener = function(e, t) {
  return xs(this, e, t, !1);
};
Qe.prototype.on = Qe.prototype.addListener;
Qe.prototype.prependListener = function(e, t) {
  return xs(this, e, t, !0);
};
function ru() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Ds(r, e, t) {
  var n = { fired: !1, wrapFn: void 0, target: r, type: e, listener: t }, i = ru.bind(n);
  return i.listener = t, n.wrapFn = i, i;
}
Qe.prototype.once = function(e, t) {
  return Cn(t), this.on(e, Ds(this, e, t)), this;
};
Qe.prototype.prependOnceListener = function(e, t) {
  return Cn(t), this.prependListener(e, Ds(this, e, t)), this;
};
Qe.prototype.removeListener = function(e, t) {
  var n, i, A, a, o;
  if (Cn(t), i = this._events, i === void 0)
    return this;
  if (n = i[e], n === void 0)
    return this;
  if (n === t || n.listener === t)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t));
  else if (typeof n != "function") {
    for (A = -1, a = n.length - 1; a >= 0; a--)
      if (n[a] === t || n[a].listener === t) {
        o = n[a].listener, A = a;
        break;
      }
    if (A < 0)
      return this;
    A === 0 ? n.shift() : nu(n, A), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit("removeListener", e, o || t);
  }
  return this;
};
Qe.prototype.off = Qe.prototype.removeListener;
Qe.prototype.removeAllListeners = function(e) {
  var t, n, i;
  if (n = this._events, n === void 0)
    return this;
  if (n.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[e]), this;
  if (arguments.length === 0) {
    var A = Object.keys(n), a;
    for (i = 0; i < A.length; ++i)
      a = A[i], a !== "removeListener" && this.removeAllListeners(a);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (t = n[e], typeof t == "function")
    this.removeListener(e, t);
  else if (t !== void 0)
    for (i = t.length - 1; i >= 0; i--)
      this.removeListener(e, t[i]);
  return this;
};
function Fs(r, e, t) {
  var n = r._events;
  if (n === void 0)
    return [];
  var i = n[e];
  return i === void 0 ? [] : typeof i == "function" ? t ? [i.listener || i] : [i] : t ? iu(i) : _s(i, i.length);
}
Qe.prototype.listeners = function(e) {
  return Fs(this, e, !0);
};
Qe.prototype.rawListeners = function(e) {
  return Fs(this, e, !1);
};
Qe.listenerCount = function(r, e) {
  return typeof r.listenerCount == "function" ? r.listenerCount(e) : Rs.call(r, e);
};
Qe.prototype.listenerCount = Rs;
function Rs(r) {
  var e = this._events;
  if (e !== void 0) {
    var t = e[r];
    if (typeof t == "function")
      return 1;
    if (t !== void 0)
      return t.length;
  }
  return 0;
}
Qe.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Zr(this._events) : [];
};
function _s(r, e) {
  for (var t = new Array(e), n = 0; n < e; ++n)
    t[n] = r[n];
  return t;
}
function nu(r, e) {
  for (; e + 1 < r.length; e++)
    r[e] = r[e + 1];
  r.pop();
}
function iu(r) {
  for (var e = new Array(r.length), t = 0; t < e.length; ++t)
    e[t] = r[t].listener || r[t];
  return e;
}
function Au(r, e) {
  return new Promise(function(t, n) {
    function i(a) {
      r.removeListener(e, A), n(a);
    }
    function A() {
      typeof r.removeListener == "function" && r.removeListener("error", i), t([].slice.call(arguments));
    }
    Ts(r, e, A, { once: !0 }), e !== "error" && ou(r, i, { once: !0 });
  });
}
function ou(r, e, t) {
  typeof r.on == "function" && Ts(r, "error", e, t);
}
function Ts(r, e, t, n) {
  if (typeof r.on == "function")
    n.once ? r.once(e, t) : r.on(e, t);
  else if (typeof r.addEventListener == "function")
    r.addEventListener(e, function i(A) {
      n.once && r.removeEventListener(e, i), t(A);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r);
}
var ks = DA.exports, Ls = ks.EventEmitter, br = {}, wn = {};
wn.byteLength = fu;
wn.toByteArray = cu;
wn.fromByteArray = gu;
var at = [], Ye = [], au = typeof Uint8Array < "u" ? Uint8Array : Array, qn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Gt = 0, su = qn.length; Gt < su; ++Gt)
  at[Gt] = qn[Gt], Ye[qn.charCodeAt(Gt)] = Gt;
Ye[45] = 62;
Ye[95] = 63;
function Ms(r) {
  var e = r.length;
  if (e % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var t = r.indexOf("=");
  t === -1 && (t = e);
  var n = t === e ? 0 : 4 - t % 4;
  return [t, n];
}
function fu(r) {
  var e = Ms(r), t = e[0], n = e[1];
  return (t + n) * 3 / 4 - n;
}
function lu(r, e, t) {
  return (e + t) * 3 / 4 - t;
}
function cu(r) {
  var e, t = Ms(r), n = t[0], i = t[1], A = new au(lu(r, n, i)), a = 0, o = i > 0 ? n - 4 : n, c;
  for (c = 0; c < o; c += 4)
    e = Ye[r.charCodeAt(c)] << 18 | Ye[r.charCodeAt(c + 1)] << 12 | Ye[r.charCodeAt(c + 2)] << 6 | Ye[r.charCodeAt(c + 3)], A[a++] = e >> 16 & 255, A[a++] = e >> 8 & 255, A[a++] = e & 255;
  return i === 2 && (e = Ye[r.charCodeAt(c)] << 2 | Ye[r.charCodeAt(c + 1)] >> 4, A[a++] = e & 255), i === 1 && (e = Ye[r.charCodeAt(c)] << 10 | Ye[r.charCodeAt(c + 1)] << 4 | Ye[r.charCodeAt(c + 2)] >> 2, A[a++] = e >> 8 & 255, A[a++] = e & 255), A;
}
function uu(r) {
  return at[r >> 18 & 63] + at[r >> 12 & 63] + at[r >> 6 & 63] + at[r & 63];
}
function hu(r, e, t) {
  for (var n, i = [], A = e; A < t; A += 3)
    n = (r[A] << 16 & 16711680) + (r[A + 1] << 8 & 65280) + (r[A + 2] & 255), i.push(uu(n));
  return i.join("");
}
function gu(r) {
  for (var e, t = r.length, n = t % 3, i = [], A = 16383, a = 0, o = t - n; a < o; a += A)
    i.push(hu(r, a, a + A > o ? o : a + A));
  return n === 1 ? (e = r[t - 1], i.push(
    at[e >> 2] + at[e << 4 & 63] + "=="
  )) : n === 2 && (e = (r[t - 2] << 8) + r[t - 1], i.push(
    at[e >> 10] + at[e >> 4 & 63] + at[e << 2 & 63] + "="
  )), i.join("");
}
var FA = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
FA.read = function(r, e, t, n, i) {
  var A, a, o = i * 8 - n - 1, c = (1 << o) - 1, l = c >> 1, s = -7, p = t ? i - 1 : 0, d = t ? -1 : 1, I = r[e + p];
  for (p += d, A = I & (1 << -s) - 1, I >>= -s, s += o; s > 0; A = A * 256 + r[e + p], p += d, s -= 8)
    ;
  for (a = A & (1 << -s) - 1, A >>= -s, s += n; s > 0; a = a * 256 + r[e + p], p += d, s -= 8)
    ;
  if (A === 0)
    A = 1 - l;
  else {
    if (A === c)
      return a ? NaN : (I ? -1 : 1) * (1 / 0);
    a = a + Math.pow(2, n), A = A - l;
  }
  return (I ? -1 : 1) * a * Math.pow(2, A - n);
};
FA.write = function(r, e, t, n, i, A) {
  var a, o, c, l = A * 8 - i - 1, s = (1 << l) - 1, p = s >> 1, d = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, I = n ? 0 : A - 1, E = n ? 1 : -1, x = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (o = isNaN(e) ? 1 : 0, a = s) : (a = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -a)) < 1 && (a--, c *= 2), a + p >= 1 ? e += d / c : e += d * Math.pow(2, 1 - p), e * c >= 2 && (a++, c /= 2), a + p >= s ? (o = 0, a = s) : a + p >= 1 ? (o = (e * c - 1) * Math.pow(2, i), a = a + p) : (o = e * Math.pow(2, p - 1) * Math.pow(2, i), a = 0)); i >= 8; r[t + I] = o & 255, I += E, o /= 256, i -= 8)
    ;
  for (a = a << i | o, l += i; l > 0; r[t + I] = a & 255, I += E, a /= 256, l -= 8)
    ;
  r[t + I - E] |= x * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(r) {
  var e = wn, t = FA, n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  r.Buffer = o, r.SlowBuffer = b, r.INSPECT_MAX_BYTES = 50;
  var i = 2147483647;
  r.kMaxLength = i, o.TYPED_ARRAY_SUPPORT = A(), !o.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function A() {
    try {
      var C = new Uint8Array(1), h = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(h, Uint8Array.prototype), Object.setPrototypeOf(C, h), C.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(o.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (o.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(o.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (o.isBuffer(this))
        return this.byteOffset;
    }
  });
  function a(C) {
    if (C > i)
      throw new RangeError('The value "' + C + '" is invalid for option "size"');
    var h = new Uint8Array(C);
    return Object.setPrototypeOf(h, o.prototype), h;
  }
  function o(C, h, g) {
    if (typeof C == "number") {
      if (typeof h == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return p(C);
    }
    return c(C, h, g);
  }
  o.poolSize = 8192;
  function c(C, h, g) {
    if (typeof C == "string")
      return d(C, h);
    if (ArrayBuffer.isView(C))
      return E(C);
    if (C == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof C
      );
    if (J(C, ArrayBuffer) || C && J(C.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (J(C, SharedArrayBuffer) || C && J(C.buffer, SharedArrayBuffer)))
      return x(C, h, g);
    if (typeof C == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var y = C.valueOf && C.valueOf();
    if (y != null && y !== C)
      return o.from(y, h, g);
    var G = v(C);
    if (G) return G;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof C[Symbol.toPrimitive] == "function")
      return o.from(
        C[Symbol.toPrimitive]("string"),
        h,
        g
      );
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof C
    );
  }
  o.from = function(C, h, g) {
    return c(C, h, g);
  }, Object.setPrototypeOf(o.prototype, Uint8Array.prototype), Object.setPrototypeOf(o, Uint8Array);
  function l(C) {
    if (typeof C != "number")
      throw new TypeError('"size" argument must be of type number');
    if (C < 0)
      throw new RangeError('The value "' + C + '" is invalid for option "size"');
  }
  function s(C, h, g) {
    return l(C), C <= 0 ? a(C) : h !== void 0 ? typeof g == "string" ? a(C).fill(h, g) : a(C).fill(h) : a(C);
  }
  o.alloc = function(C, h, g) {
    return s(C, h, g);
  };
  function p(C) {
    return l(C), a(C < 0 ? 0 : w(C) | 0);
  }
  o.allocUnsafe = function(C) {
    return p(C);
  }, o.allocUnsafeSlow = function(C) {
    return p(C);
  };
  function d(C, h) {
    if ((typeof h != "string" || h === "") && (h = "utf8"), !o.isEncoding(h))
      throw new TypeError("Unknown encoding: " + h);
    var g = D(C, h) | 0, y = a(g), G = y.write(C, h);
    return G !== g && (y = y.slice(0, G)), y;
  }
  function I(C) {
    for (var h = C.length < 0 ? 0 : w(C.length) | 0, g = a(h), y = 0; y < h; y += 1)
      g[y] = C[y] & 255;
    return g;
  }
  function E(C) {
    if (J(C, Uint8Array)) {
      var h = new Uint8Array(C);
      return x(h.buffer, h.byteOffset, h.byteLength);
    }
    return I(C);
  }
  function x(C, h, g) {
    if (h < 0 || C.byteLength < h)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (C.byteLength < h + (g || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var y;
    return h === void 0 && g === void 0 ? y = new Uint8Array(C) : g === void 0 ? y = new Uint8Array(C, h) : y = new Uint8Array(C, h, g), Object.setPrototypeOf(y, o.prototype), y;
  }
  function v(C) {
    if (o.isBuffer(C)) {
      var h = w(C.length) | 0, g = a(h);
      return g.length === 0 || C.copy(g, 0, 0, h), g;
    }
    if (C.length !== void 0)
      return typeof C.length != "number" || ee(C.length) ? a(0) : I(C);
    if (C.type === "Buffer" && Array.isArray(C.data))
      return I(C.data);
  }
  function w(C) {
    if (C >= i)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
    return C | 0;
  }
  function b(C) {
    return +C != C && (C = 0), o.alloc(+C);
  }
  o.isBuffer = function(h) {
    return h != null && h._isBuffer === !0 && h !== o.prototype;
  }, o.compare = function(h, g) {
    if (J(h, Uint8Array) && (h = o.from(h, h.offset, h.byteLength)), J(g, Uint8Array) && (g = o.from(g, g.offset, g.byteLength)), !o.isBuffer(h) || !o.isBuffer(g))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (h === g) return 0;
    for (var y = h.length, G = g.length, V = 0, X = Math.min(y, G); V < X; ++V)
      if (h[V] !== g[V]) {
        y = h[V], G = g[V];
        break;
      }
    return y < G ? -1 : G < y ? 1 : 0;
  }, o.isEncoding = function(h) {
    switch (String(h).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, o.concat = function(h, g) {
    if (!Array.isArray(h))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (h.length === 0)
      return o.alloc(0);
    var y;
    if (g === void 0)
      for (g = 0, y = 0; y < h.length; ++y)
        g += h[y].length;
    var G = o.allocUnsafe(g), V = 0;
    for (y = 0; y < h.length; ++y) {
      var X = h[y];
      if (J(X, Uint8Array))
        V + X.length > G.length ? o.from(X).copy(G, V) : Uint8Array.prototype.set.call(
          G,
          X,
          V
        );
      else if (o.isBuffer(X))
        X.copy(G, V);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      V += X.length;
    }
    return G;
  };
  function D(C, h) {
    if (o.isBuffer(C))
      return C.length;
    if (ArrayBuffer.isView(C) || J(C, ArrayBuffer))
      return C.byteLength;
    if (typeof C != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof C
      );
    var g = C.length, y = arguments.length > 2 && arguments[2] === !0;
    if (!y && g === 0) return 0;
    for (var G = !1; ; )
      switch (h) {
        case "ascii":
        case "latin1":
        case "binary":
          return g;
        case "utf8":
        case "utf-8":
          return O(C).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return g * 2;
        case "hex":
          return g >>> 1;
        case "base64":
          return Q(C).length;
        default:
          if (G)
            return y ? -1 : O(C).length;
          h = ("" + h).toLowerCase(), G = !0;
      }
  }
  o.byteLength = D;
  function F(C, h, g) {
    var y = !1;
    if ((h === void 0 || h < 0) && (h = 0), h > this.length || ((g === void 0 || g > this.length) && (g = this.length), g <= 0) || (g >>>= 0, h >>>= 0, g <= h))
      return "";
    for (C || (C = "utf8"); ; )
      switch (C) {
        case "hex":
          return ge(this, h, g);
        case "utf8":
        case "utf-8":
          return Ae(this, h, g);
        case "ascii":
          return ye(this, h, g);
        case "latin1":
        case "binary":
          return Be(this, h, g);
        case "base64":
          return ne(this, h, g);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Z(this, h, g);
        default:
          if (y) throw new TypeError("Unknown encoding: " + C);
          C = (C + "").toLowerCase(), y = !0;
      }
  }
  o.prototype._isBuffer = !0;
  function R(C, h, g) {
    var y = C[h];
    C[h] = C[g], C[g] = y;
  }
  o.prototype.swap16 = function() {
    var h = this.length;
    if (h % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var g = 0; g < h; g += 2)
      R(this, g, g + 1);
    return this;
  }, o.prototype.swap32 = function() {
    var h = this.length;
    if (h % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var g = 0; g < h; g += 4)
      R(this, g, g + 3), R(this, g + 1, g + 2);
    return this;
  }, o.prototype.swap64 = function() {
    var h = this.length;
    if (h % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var g = 0; g < h; g += 8)
      R(this, g, g + 7), R(this, g + 1, g + 6), R(this, g + 2, g + 5), R(this, g + 3, g + 4);
    return this;
  }, o.prototype.toString = function() {
    var h = this.length;
    return h === 0 ? "" : arguments.length === 0 ? Ae(this, 0, h) : F.apply(this, arguments);
  }, o.prototype.toLocaleString = o.prototype.toString, o.prototype.equals = function(h) {
    if (!o.isBuffer(h)) throw new TypeError("Argument must be a Buffer");
    return this === h ? !0 : o.compare(this, h) === 0;
  }, o.prototype.inspect = function() {
    var h = "", g = r.INSPECT_MAX_BYTES;
    return h = this.toString("hex", 0, g).replace(/(.{2})/g, "$1 ").trim(), this.length > g && (h += " ... "), "<Buffer " + h + ">";
  }, n && (o.prototype[n] = o.prototype.inspect), o.prototype.compare = function(h, g, y, G, V) {
    if (J(h, Uint8Array) && (h = o.from(h, h.offset, h.byteLength)), !o.isBuffer(h))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof h
      );
    if (g === void 0 && (g = 0), y === void 0 && (y = h ? h.length : 0), G === void 0 && (G = 0), V === void 0 && (V = this.length), g < 0 || y > h.length || G < 0 || V > this.length)
      throw new RangeError("out of range index");
    if (G >= V && g >= y)
      return 0;
    if (G >= V)
      return -1;
    if (g >= y)
      return 1;
    if (g >>>= 0, y >>>= 0, G >>>= 0, V >>>= 0, this === h) return 0;
    for (var X = V - G, ce = y - g, Ie = Math.min(X, ce), he = this.slice(G, V), ve = h.slice(g, y), Ce = 0; Ce < Ie; ++Ce)
      if (he[Ce] !== ve[Ce]) {
        X = he[Ce], ce = ve[Ce];
        break;
      }
    return X < ce ? -1 : ce < X ? 1 : 0;
  };
  function L(C, h, g, y, G) {
    if (C.length === 0) return -1;
    if (typeof g == "string" ? (y = g, g = 0) : g > 2147483647 ? g = 2147483647 : g < -2147483648 && (g = -2147483648), g = +g, ee(g) && (g = G ? 0 : C.length - 1), g < 0 && (g = C.length + g), g >= C.length) {
      if (G) return -1;
      g = C.length - 1;
    } else if (g < 0)
      if (G) g = 0;
      else return -1;
    if (typeof h == "string" && (h = o.from(h, y)), o.isBuffer(h))
      return h.length === 0 ? -1 : q(C, h, g, y, G);
    if (typeof h == "number")
      return h = h & 255, typeof Uint8Array.prototype.indexOf == "function" ? G ? Uint8Array.prototype.indexOf.call(C, h, g) : Uint8Array.prototype.lastIndexOf.call(C, h, g) : q(C, [h], g, y, G);
    throw new TypeError("val must be string, number or Buffer");
  }
  function q(C, h, g, y, G) {
    var V = 1, X = C.length, ce = h.length;
    if (y !== void 0 && (y = String(y).toLowerCase(), y === "ucs2" || y === "ucs-2" || y === "utf16le" || y === "utf-16le")) {
      if (C.length < 2 || h.length < 2)
        return -1;
      V = 2, X /= 2, ce /= 2, g /= 2;
    }
    function Ie(Rr, B) {
      return V === 1 ? Rr[B] : Rr.readUInt16BE(B * V);
    }
    var he;
    if (G) {
      var ve = -1;
      for (he = g; he < X; he++)
        if (Ie(C, he) === Ie(h, ve === -1 ? 0 : he - ve)) {
          if (ve === -1 && (ve = he), he - ve + 1 === ce) return ve * V;
        } else
          ve !== -1 && (he -= he - ve), ve = -1;
    } else
      for (g + ce > X && (g = X - ce), he = g; he >= 0; he--) {
        for (var Ce = !0, Me = 0; Me < ce; Me++)
          if (Ie(C, he + Me) !== Ie(h, Me)) {
            Ce = !1;
            break;
          }
        if (Ce) return he;
      }
    return -1;
  }
  o.prototype.includes = function(h, g, y) {
    return this.indexOf(h, g, y) !== -1;
  }, o.prototype.indexOf = function(h, g, y) {
    return L(this, h, g, y, !0);
  }, o.prototype.lastIndexOf = function(h, g, y) {
    return L(this, h, g, y, !1);
  };
  function T(C, h, g, y) {
    g = Number(g) || 0;
    var G = C.length - g;
    y ? (y = Number(y), y > G && (y = G)) : y = G;
    var V = h.length;
    y > V / 2 && (y = V / 2);
    for (var X = 0; X < y; ++X) {
      var ce = parseInt(h.substr(X * 2, 2), 16);
      if (ee(ce)) return X;
      C[g + X] = ce;
    }
    return X;
  }
  function j(C, h, g, y) {
    return m(O(h, C.length - g), C, g, y);
  }
  function $(C, h, g, y) {
    return m(K(h), C, g, y);
  }
  function te(C, h, g, y) {
    return m(Q(h), C, g, y);
  }
  function oe(C, h, g, y) {
    return m(z(h, C.length - g), C, g, y);
  }
  o.prototype.write = function(h, g, y, G) {
    if (g === void 0)
      G = "utf8", y = this.length, g = 0;
    else if (y === void 0 && typeof g == "string")
      G = g, y = this.length, g = 0;
    else if (isFinite(g))
      g = g >>> 0, isFinite(y) ? (y = y >>> 0, G === void 0 && (G = "utf8")) : (G = y, y = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    var V = this.length - g;
    if ((y === void 0 || y > V) && (y = V), h.length > 0 && (y < 0 || g < 0) || g > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    G || (G = "utf8");
    for (var X = !1; ; )
      switch (G) {
        case "hex":
          return T(this, h, g, y);
        case "utf8":
        case "utf-8":
          return j(this, h, g, y);
        case "ascii":
        case "latin1":
        case "binary":
          return $(this, h, g, y);
        case "base64":
          return te(this, h, g, y);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return oe(this, h, g, y);
        default:
          if (X) throw new TypeError("Unknown encoding: " + G);
          G = ("" + G).toLowerCase(), X = !0;
      }
  }, o.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function ne(C, h, g) {
    return h === 0 && g === C.length ? e.fromByteArray(C) : e.fromByteArray(C.slice(h, g));
  }
  function Ae(C, h, g) {
    g = Math.min(C.length, g);
    for (var y = [], G = h; G < g; ) {
      var V = C[G], X = null, ce = V > 239 ? 4 : V > 223 ? 3 : V > 191 ? 2 : 1;
      if (G + ce <= g) {
        var Ie, he, ve, Ce;
        switch (ce) {
          case 1:
            V < 128 && (X = V);
            break;
          case 2:
            Ie = C[G + 1], (Ie & 192) === 128 && (Ce = (V & 31) << 6 | Ie & 63, Ce > 127 && (X = Ce));
            break;
          case 3:
            Ie = C[G + 1], he = C[G + 2], (Ie & 192) === 128 && (he & 192) === 128 && (Ce = (V & 15) << 12 | (Ie & 63) << 6 | he & 63, Ce > 2047 && (Ce < 55296 || Ce > 57343) && (X = Ce));
            break;
          case 4:
            Ie = C[G + 1], he = C[G + 2], ve = C[G + 3], (Ie & 192) === 128 && (he & 192) === 128 && (ve & 192) === 128 && (Ce = (V & 15) << 18 | (Ie & 63) << 12 | (he & 63) << 6 | ve & 63, Ce > 65535 && Ce < 1114112 && (X = Ce));
        }
      }
      X === null ? (X = 65533, ce = 1) : X > 65535 && (X -= 65536, y.push(X >>> 10 & 1023 | 55296), X = 56320 | X & 1023), y.push(X), G += ce;
    }
    return se(y);
  }
  var ie = 4096;
  function se(C) {
    var h = C.length;
    if (h <= ie)
      return String.fromCharCode.apply(String, C);
    for (var g = "", y = 0; y < h; )
      g += String.fromCharCode.apply(
        String,
        C.slice(y, y += ie)
      );
    return g;
  }
  function ye(C, h, g) {
    var y = "";
    g = Math.min(C.length, g);
    for (var G = h; G < g; ++G)
      y += String.fromCharCode(C[G] & 127);
    return y;
  }
  function Be(C, h, g) {
    var y = "";
    g = Math.min(C.length, g);
    for (var G = h; G < g; ++G)
      y += String.fromCharCode(C[G]);
    return y;
  }
  function ge(C, h, g) {
    var y = C.length;
    (!h || h < 0) && (h = 0), (!g || g < 0 || g > y) && (g = y);
    for (var G = "", V = h; V < g; ++V)
      G += le[C[V]];
    return G;
  }
  function Z(C, h, g) {
    for (var y = C.slice(h, g), G = "", V = 0; V < y.length - 1; V += 2)
      G += String.fromCharCode(y[V] + y[V + 1] * 256);
    return G;
  }
  o.prototype.slice = function(h, g) {
    var y = this.length;
    h = ~~h, g = g === void 0 ? y : ~~g, h < 0 ? (h += y, h < 0 && (h = 0)) : h > y && (h = y), g < 0 ? (g += y, g < 0 && (g = 0)) : g > y && (g = y), g < h && (g = h);
    var G = this.subarray(h, g);
    return Object.setPrototypeOf(G, o.prototype), G;
  };
  function re(C, h, g) {
    if (C % 1 !== 0 || C < 0) throw new RangeError("offset is not uint");
    if (C + h > g) throw new RangeError("Trying to access beyond buffer length");
  }
  o.prototype.readUintLE = o.prototype.readUIntLE = function(h, g, y) {
    h = h >>> 0, g = g >>> 0, y || re(h, g, this.length);
    for (var G = this[h], V = 1, X = 0; ++X < g && (V *= 256); )
      G += this[h + X] * V;
    return G;
  }, o.prototype.readUintBE = o.prototype.readUIntBE = function(h, g, y) {
    h = h >>> 0, g = g >>> 0, y || re(h, g, this.length);
    for (var G = this[h + --g], V = 1; g > 0 && (V *= 256); )
      G += this[h + --g] * V;
    return G;
  }, o.prototype.readUint8 = o.prototype.readUInt8 = function(h, g) {
    return h = h >>> 0, g || re(h, 1, this.length), this[h];
  }, o.prototype.readUint16LE = o.prototype.readUInt16LE = function(h, g) {
    return h = h >>> 0, g || re(h, 2, this.length), this[h] | this[h + 1] << 8;
  }, o.prototype.readUint16BE = o.prototype.readUInt16BE = function(h, g) {
    return h = h >>> 0, g || re(h, 2, this.length), this[h] << 8 | this[h + 1];
  }, o.prototype.readUint32LE = o.prototype.readUInt32LE = function(h, g) {
    return h = h >>> 0, g || re(h, 4, this.length), (this[h] | this[h + 1] << 8 | this[h + 2] << 16) + this[h + 3] * 16777216;
  }, o.prototype.readUint32BE = o.prototype.readUInt32BE = function(h, g) {
    return h = h >>> 0, g || re(h, 4, this.length), this[h] * 16777216 + (this[h + 1] << 16 | this[h + 2] << 8 | this[h + 3]);
  }, o.prototype.readIntLE = function(h, g, y) {
    h = h >>> 0, g = g >>> 0, y || re(h, g, this.length);
    for (var G = this[h], V = 1, X = 0; ++X < g && (V *= 256); )
      G += this[h + X] * V;
    return V *= 128, G >= V && (G -= Math.pow(2, 8 * g)), G;
  }, o.prototype.readIntBE = function(h, g, y) {
    h = h >>> 0, g = g >>> 0, y || re(h, g, this.length);
    for (var G = g, V = 1, X = this[h + --G]; G > 0 && (V *= 256); )
      X += this[h + --G] * V;
    return V *= 128, X >= V && (X -= Math.pow(2, 8 * g)), X;
  }, o.prototype.readInt8 = function(h, g) {
    return h = h >>> 0, g || re(h, 1, this.length), this[h] & 128 ? (255 - this[h] + 1) * -1 : this[h];
  }, o.prototype.readInt16LE = function(h, g) {
    h = h >>> 0, g || re(h, 2, this.length);
    var y = this[h] | this[h + 1] << 8;
    return y & 32768 ? y | 4294901760 : y;
  }, o.prototype.readInt16BE = function(h, g) {
    h = h >>> 0, g || re(h, 2, this.length);
    var y = this[h + 1] | this[h] << 8;
    return y & 32768 ? y | 4294901760 : y;
  }, o.prototype.readInt32LE = function(h, g) {
    return h = h >>> 0, g || re(h, 4, this.length), this[h] | this[h + 1] << 8 | this[h + 2] << 16 | this[h + 3] << 24;
  }, o.prototype.readInt32BE = function(h, g) {
    return h = h >>> 0, g || re(h, 4, this.length), this[h] << 24 | this[h + 1] << 16 | this[h + 2] << 8 | this[h + 3];
  }, o.prototype.readFloatLE = function(h, g) {
    return h = h >>> 0, g || re(h, 4, this.length), t.read(this, h, !0, 23, 4);
  }, o.prototype.readFloatBE = function(h, g) {
    return h = h >>> 0, g || re(h, 4, this.length), t.read(this, h, !1, 23, 4);
  }, o.prototype.readDoubleLE = function(h, g) {
    return h = h >>> 0, g || re(h, 8, this.length), t.read(this, h, !0, 52, 8);
  }, o.prototype.readDoubleBE = function(h, g) {
    return h = h >>> 0, g || re(h, 8, this.length), t.read(this, h, !1, 52, 8);
  };
  function M(C, h, g, y, G, V) {
    if (!o.isBuffer(C)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (h > G || h < V) throw new RangeError('"value" argument is out of bounds');
    if (g + y > C.length) throw new RangeError("Index out of range");
  }
  o.prototype.writeUintLE = o.prototype.writeUIntLE = function(h, g, y, G) {
    if (h = +h, g = g >>> 0, y = y >>> 0, !G) {
      var V = Math.pow(2, 8 * y) - 1;
      M(this, h, g, y, V, 0);
    }
    var X = 1, ce = 0;
    for (this[g] = h & 255; ++ce < y && (X *= 256); )
      this[g + ce] = h / X & 255;
    return g + y;
  }, o.prototype.writeUintBE = o.prototype.writeUIntBE = function(h, g, y, G) {
    if (h = +h, g = g >>> 0, y = y >>> 0, !G) {
      var V = Math.pow(2, 8 * y) - 1;
      M(this, h, g, y, V, 0);
    }
    var X = y - 1, ce = 1;
    for (this[g + X] = h & 255; --X >= 0 && (ce *= 256); )
      this[g + X] = h / ce & 255;
    return g + y;
  }, o.prototype.writeUint8 = o.prototype.writeUInt8 = function(h, g, y) {
    return h = +h, g = g >>> 0, y || M(this, h, g, 1, 255, 0), this[g] = h & 255, g + 1;
  }, o.prototype.writeUint16LE = o.prototype.writeUInt16LE = function(h, g, y) {
    return h = +h, g = g >>> 0, y || M(this, h, g, 2, 65535, 0), this[g] = h & 255, this[g + 1] = h >>> 8, g + 2;
  }, o.prototype.writeUint16BE = o.prototype.writeUInt16BE = function(h, g, y) {
    return h = +h, g = g >>> 0, y || M(this, h, g, 2, 65535, 0), this[g] = h >>> 8, this[g + 1] = h & 255, g + 2;
  }, o.prototype.writeUint32LE = o.prototype.writeUInt32LE = function(h, g, y) {
    return h = +h, g = g >>> 0, y || M(this, h, g, 4, 4294967295, 0), this[g + 3] = h >>> 24, this[g + 2] = h >>> 16, this[g + 1] = h >>> 8, this[g] = h & 255, g + 4;
  }, o.prototype.writeUint32BE = o.prototype.writeUInt32BE = function(h, g, y) {
    return h = +h, g = g >>> 0, y || M(this, h, g, 4, 4294967295, 0), this[g] = h >>> 24, this[g + 1] = h >>> 16, this[g + 2] = h >>> 8, this[g + 3] = h & 255, g + 4;
  }, o.prototype.writeIntLE = function(h, g, y, G) {
    if (h = +h, g = g >>> 0, !G) {
      var V = Math.pow(2, 8 * y - 1);
      M(this, h, g, y, V - 1, -V);
    }
    var X = 0, ce = 1, Ie = 0;
    for (this[g] = h & 255; ++X < y && (ce *= 256); )
      h < 0 && Ie === 0 && this[g + X - 1] !== 0 && (Ie = 1), this[g + X] = (h / ce >> 0) - Ie & 255;
    return g + y;
  }, o.prototype.writeIntBE = function(h, g, y, G) {
    if (h = +h, g = g >>> 0, !G) {
      var V = Math.pow(2, 8 * y - 1);
      M(this, h, g, y, V - 1, -V);
    }
    var X = y - 1, ce = 1, Ie = 0;
    for (this[g + X] = h & 255; --X >= 0 && (ce *= 256); )
      h < 0 && Ie === 0 && this[g + X + 1] !== 0 && (Ie = 1), this[g + X] = (h / ce >> 0) - Ie & 255;
    return g + y;
  }, o.prototype.writeInt8 = function(h, g, y) {
    return h = +h, g = g >>> 0, y || M(this, h, g, 1, 127, -128), h < 0 && (h = 255 + h + 1), this[g] = h & 255, g + 1;
  }, o.prototype.writeInt16LE = function(h, g, y) {
    return h = +h, g = g >>> 0, y || M(this, h, g, 2, 32767, -32768), this[g] = h & 255, this[g + 1] = h >>> 8, g + 2;
  }, o.prototype.writeInt16BE = function(h, g, y) {
    return h = +h, g = g >>> 0, y || M(this, h, g, 2, 32767, -32768), this[g] = h >>> 8, this[g + 1] = h & 255, g + 2;
  }, o.prototype.writeInt32LE = function(h, g, y) {
    return h = +h, g = g >>> 0, y || M(this, h, g, 4, 2147483647, -2147483648), this[g] = h & 255, this[g + 1] = h >>> 8, this[g + 2] = h >>> 16, this[g + 3] = h >>> 24, g + 4;
  }, o.prototype.writeInt32BE = function(h, g, y) {
    return h = +h, g = g >>> 0, y || M(this, h, g, 4, 2147483647, -2147483648), h < 0 && (h = 4294967295 + h + 1), this[g] = h >>> 24, this[g + 1] = h >>> 16, this[g + 2] = h >>> 8, this[g + 3] = h & 255, g + 4;
  };
  function P(C, h, g, y, G, V) {
    if (g + y > C.length) throw new RangeError("Index out of range");
    if (g < 0) throw new RangeError("Index out of range");
  }
  function N(C, h, g, y, G) {
    return h = +h, g = g >>> 0, G || P(C, h, g, 4), t.write(C, h, g, y, 23, 4), g + 4;
  }
  o.prototype.writeFloatLE = function(h, g, y) {
    return N(this, h, g, !0, y);
  }, o.prototype.writeFloatBE = function(h, g, y) {
    return N(this, h, g, !1, y);
  };
  function Y(C, h, g, y, G) {
    return h = +h, g = g >>> 0, G || P(C, h, g, 8), t.write(C, h, g, y, 52, 8), g + 8;
  }
  o.prototype.writeDoubleLE = function(h, g, y) {
    return Y(this, h, g, !0, y);
  }, o.prototype.writeDoubleBE = function(h, g, y) {
    return Y(this, h, g, !1, y);
  }, o.prototype.copy = function(h, g, y, G) {
    if (!o.isBuffer(h)) throw new TypeError("argument should be a Buffer");
    if (y || (y = 0), !G && G !== 0 && (G = this.length), g >= h.length && (g = h.length), g || (g = 0), G > 0 && G < y && (G = y), G === y || h.length === 0 || this.length === 0) return 0;
    if (g < 0)
      throw new RangeError("targetStart out of bounds");
    if (y < 0 || y >= this.length) throw new RangeError("Index out of range");
    if (G < 0) throw new RangeError("sourceEnd out of bounds");
    G > this.length && (G = this.length), h.length - g < G - y && (G = h.length - g + y);
    var V = G - y;
    return this === h && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(g, y, G) : Uint8Array.prototype.set.call(
      h,
      this.subarray(y, G),
      g
    ), V;
  }, o.prototype.fill = function(h, g, y, G) {
    if (typeof h == "string") {
      if (typeof g == "string" ? (G = g, g = 0, y = this.length) : typeof y == "string" && (G = y, y = this.length), G !== void 0 && typeof G != "string")
        throw new TypeError("encoding must be a string");
      if (typeof G == "string" && !o.isEncoding(G))
        throw new TypeError("Unknown encoding: " + G);
      if (h.length === 1) {
        var V = h.charCodeAt(0);
        (G === "utf8" && V < 128 || G === "latin1") && (h = V);
      }
    } else typeof h == "number" ? h = h & 255 : typeof h == "boolean" && (h = Number(h));
    if (g < 0 || this.length < g || this.length < y)
      throw new RangeError("Out of range index");
    if (y <= g)
      return this;
    g = g >>> 0, y = y === void 0 ? this.length : y >>> 0, h || (h = 0);
    var X;
    if (typeof h == "number")
      for (X = g; X < y; ++X)
        this[X] = h;
    else {
      var ce = o.isBuffer(h) ? h : o.from(h, G), Ie = ce.length;
      if (Ie === 0)
        throw new TypeError('The value "' + h + '" is invalid for argument "value"');
      for (X = 0; X < y - g; ++X)
        this[X + g] = ce[X % Ie];
    }
    return this;
  };
  var _ = /[^+/0-9A-Za-z-_]/g;
  function k(C) {
    if (C = C.split("=")[0], C = C.trim().replace(_, ""), C.length < 2) return "";
    for (; C.length % 4 !== 0; )
      C = C + "=";
    return C;
  }
  function O(C, h) {
    h = h || 1 / 0;
    for (var g, y = C.length, G = null, V = [], X = 0; X < y; ++X) {
      if (g = C.charCodeAt(X), g > 55295 && g < 57344) {
        if (!G) {
          if (g > 56319) {
            (h -= 3) > -1 && V.push(239, 191, 189);
            continue;
          } else if (X + 1 === y) {
            (h -= 3) > -1 && V.push(239, 191, 189);
            continue;
          }
          G = g;
          continue;
        }
        if (g < 56320) {
          (h -= 3) > -1 && V.push(239, 191, 189), G = g;
          continue;
        }
        g = (G - 55296 << 10 | g - 56320) + 65536;
      } else G && (h -= 3) > -1 && V.push(239, 191, 189);
      if (G = null, g < 128) {
        if ((h -= 1) < 0) break;
        V.push(g);
      } else if (g < 2048) {
        if ((h -= 2) < 0) break;
        V.push(
          g >> 6 | 192,
          g & 63 | 128
        );
      } else if (g < 65536) {
        if ((h -= 3) < 0) break;
        V.push(
          g >> 12 | 224,
          g >> 6 & 63 | 128,
          g & 63 | 128
        );
      } else if (g < 1114112) {
        if ((h -= 4) < 0) break;
        V.push(
          g >> 18 | 240,
          g >> 12 & 63 | 128,
          g >> 6 & 63 | 128,
          g & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return V;
  }
  function K(C) {
    for (var h = [], g = 0; g < C.length; ++g)
      h.push(C.charCodeAt(g) & 255);
    return h;
  }
  function z(C, h) {
    for (var g, y, G, V = [], X = 0; X < C.length && !((h -= 2) < 0); ++X)
      g = C.charCodeAt(X), y = g >> 8, G = g % 256, V.push(G), V.push(y);
    return V;
  }
  function Q(C) {
    return e.toByteArray(k(C));
  }
  function m(C, h, g, y) {
    for (var G = 0; G < y && !(G + g >= h.length || G >= C.length); ++G)
      h[G + g] = C[G];
    return G;
  }
  function J(C, h) {
    return C instanceof h || C != null && C.constructor != null && C.constructor.name != null && C.constructor.name === h.name;
  }
  function ee(C) {
    return C !== C;
  }
  var le = function() {
    for (var C = "0123456789abcdef", h = new Array(256), g = 0; g < 16; ++g)
      for (var y = g * 16, G = 0; G < 16; ++G)
        h[y + G] = C[g] + C[G];
    return h;
  }();
})(br);
var RA = {}, Us = {}, Ns = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var e = {}, t = Symbol("test"), n = Object(t);
  if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
    return !1;
  var i = 42;
  e[t] = i;
  for (var A in e)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
    return !1;
  var a = Object.getOwnPropertySymbols(e);
  if (a.length !== 1 || a[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var o = (
      /** @type {PropertyDescriptor} */
      Object.getOwnPropertyDescriptor(e, t)
    );
    if (o.value !== i || o.enumerable !== !0)
      return !1;
  }
  return !0;
}, du = Ns, Qn = function() {
  return du() && !!Symbol.toStringTag;
}, Gs = Object, pu = Error, Iu = EvalError, yu = RangeError, Eu = ReferenceError, Os = SyntaxError, It = TypeError, Bu = URIError, Cu = Math.abs, wu = Math.floor, Qu = Math.max, mu = Math.min, bu = Math.pow, vu = Math.round, Su = Number.isNaN || function(e) {
  return e !== e;
}, xu = Su, Du = function(e) {
  return xu(e) || e === 0 ? e : e < 0 ? -1 : 1;
}, Fu = Object.getOwnPropertyDescriptor, en = Fu;
if (en)
  try {
    en([], "length");
  } catch {
    en = null;
  }
var ar = en, tn = Object.defineProperty || !1;
if (tn)
  try {
    tn({}, "a", { value: 1 });
  } catch {
    tn = !1;
  }
var mn = tn, Hn, to;
function Ru() {
  if (to) return Hn;
  to = 1;
  var r = typeof Symbol < "u" && Symbol, e = Ns;
  return Hn = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : e();
  }, Hn;
}
var jn, ro;
function Ps() {
  return ro || (ro = 1, jn = typeof Reflect < "u" && Reflect.getPrototypeOf || null), jn;
}
var Jn, no;
function qs() {
  if (no) return Jn;
  no = 1;
  var r = Gs;
  return Jn = r.getPrototypeOf || null, Jn;
}
var Yn, io;
function _u() {
  if (io) return Yn;
  io = 1;
  var r = "Function.prototype.bind called on incompatible ", e = Object.prototype.toString, t = Math.max, n = "[object Function]", i = function(c, l) {
    for (var s = [], p = 0; p < c.length; p += 1)
      s[p] = c[p];
    for (var d = 0; d < l.length; d += 1)
      s[d + c.length] = l[d];
    return s;
  }, A = function(c, l) {
    for (var s = [], p = l, d = 0; p < c.length; p += 1, d += 1)
      s[d] = c[p];
    return s;
  }, a = function(o, c) {
    for (var l = "", s = 0; s < o.length; s += 1)
      l += o[s], s + 1 < o.length && (l += c);
    return l;
  };
  return Yn = function(c) {
    var l = this;
    if (typeof l != "function" || e.apply(l) !== n)
      throw new TypeError(r + l);
    for (var s = A(arguments, 1), p, d = function() {
      if (this instanceof p) {
        var w = l.apply(
          this,
          i(s, arguments)
        );
        return Object(w) === w ? w : this;
      }
      return l.apply(
        c,
        i(s, arguments)
      );
    }, I = t(0, l.length - s.length), E = [], x = 0; x < I; x++)
      E[x] = "$" + x;
    if (p = Function("binder", "return function (" + a(E, ",") + "){ return binder.apply(this,arguments); }")(d), l.prototype) {
      var v = function() {
      };
      v.prototype = l.prototype, p.prototype = new v(), v.prototype = null;
    }
    return p;
  }, Yn;
}
var Kn, Ao;
function vr() {
  if (Ao) return Kn;
  Ao = 1;
  var r = _u();
  return Kn = Function.prototype.bind || r, Kn;
}
var Wn, oo;
function _A() {
  return oo || (oo = 1, Wn = Function.prototype.call), Wn;
}
var Vn, ao;
function TA() {
  return ao || (ao = 1, Vn = Function.prototype.apply), Vn;
}
var Tu = typeof Reflect < "u" && Reflect && Reflect.apply, ku = vr(), Lu = TA(), Mu = _A(), Uu = Tu, Hs = Uu || ku.call(Mu, Lu), Nu = vr(), Gu = It, Ou = _A(), Pu = Hs, kA = function(e) {
  if (e.length < 1 || typeof e[0] != "function")
    throw new Gu("a function is required");
  return Pu(Nu, Ou, e);
}, qu = kA, so = ar, js;
try {
  js = /** @type {{ __proto__?: typeof Array.prototype }} */
  [].__proto__ === Array.prototype;
} catch (r) {
  if (!r || typeof r != "object" || !("code" in r) || r.code !== "ERR_PROTO_ACCESS")
    throw r;
}
var $n = !!js && so && so(
  Object.prototype,
  /** @type {keyof typeof Object.prototype} */
  "__proto__"
), Js = Object, fo = Js.getPrototypeOf, Hu = $n && typeof $n.get == "function" ? qu([$n.get]) : typeof fo == "function" ? (
  /** @type {import('./get')} */
  function(e) {
    return fo(e == null ? e : Js(e));
  }
) : !1, lo = Ps(), co = qs(), uo = Hu, LA = lo ? function(e) {
  return lo(e);
} : co ? function(e) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new TypeError("getProto: not an object");
  return co(e);
} : uo ? function(e) {
  return uo(e);
} : null, zn, ho;
function Ys() {
  if (ho) return zn;
  ho = 1;
  var r = Function.prototype.call, e = Object.prototype.hasOwnProperty, t = vr();
  return zn = t.call(r, e), zn;
}
var pe, ju = Gs, Ju = pu, Yu = Iu, Ku = yu, Wu = Eu, tr = Os, zt = It, Vu = Bu, $u = Cu, zu = wu, Xu = Qu, Zu = mu, eh = bu, th = vu, rh = Du, Ks = Function, Xn = function(r) {
  try {
    return Ks('"use strict"; return (' + r + ").constructor;")();
  } catch {
  }
}, Br = ar, nh = mn, Zn = function() {
  throw new zt();
}, ih = Br ? function() {
  try {
    return arguments.callee, Zn;
  } catch {
    try {
      return Br(arguments, "callee").get;
    } catch {
      return Zn;
    }
  }
}() : Zn, Ot = Ru()(), Ge = LA, Ah = qs(), oh = Ps(), Ws = TA(), Sr = _A(), Yt = {}, ah = typeof Uint8Array > "u" || !Ge ? pe : Ge(Uint8Array), _t = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? pe : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? pe : ArrayBuffer,
  "%ArrayIteratorPrototype%": Ot && Ge ? Ge([][Symbol.iterator]()) : pe,
  "%AsyncFromSyncIteratorPrototype%": pe,
  "%AsyncFunction%": Yt,
  "%AsyncGenerator%": Yt,
  "%AsyncGeneratorFunction%": Yt,
  "%AsyncIteratorPrototype%": Yt,
  "%Atomics%": typeof Atomics > "u" ? pe : Atomics,
  "%BigInt%": typeof BigInt > "u" ? pe : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? pe : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? pe : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? pe : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Ju,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Yu,
  "%Float16Array%": typeof Float16Array > "u" ? pe : Float16Array,
  "%Float32Array%": typeof Float32Array > "u" ? pe : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? pe : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? pe : FinalizationRegistry,
  "%Function%": Ks,
  "%GeneratorFunction%": Yt,
  "%Int8Array%": typeof Int8Array > "u" ? pe : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? pe : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? pe : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": Ot && Ge ? Ge(Ge([][Symbol.iterator]())) : pe,
  "%JSON%": typeof JSON == "object" ? JSON : pe,
  "%Map%": typeof Map > "u" ? pe : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !Ot || !Ge ? pe : Ge((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": ju,
  "%Object.getOwnPropertyDescriptor%": Br,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? pe : Promise,
  "%Proxy%": typeof Proxy > "u" ? pe : Proxy,
  "%RangeError%": Ku,
  "%ReferenceError%": Wu,
  "%Reflect%": typeof Reflect > "u" ? pe : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? pe : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !Ot || !Ge ? pe : Ge((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? pe : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": Ot && Ge ? Ge(""[Symbol.iterator]()) : pe,
  "%Symbol%": Ot ? Symbol : pe,
  "%SyntaxError%": tr,
  "%ThrowTypeError%": ih,
  "%TypedArray%": ah,
  "%TypeError%": zt,
  "%Uint8Array%": typeof Uint8Array > "u" ? pe : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? pe : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? pe : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? pe : Uint32Array,
  "%URIError%": Vu,
  "%WeakMap%": typeof WeakMap > "u" ? pe : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? pe : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? pe : WeakSet,
  "%Function.prototype.call%": Sr,
  "%Function.prototype.apply%": Ws,
  "%Object.defineProperty%": nh,
  "%Object.getPrototypeOf%": Ah,
  "%Math.abs%": $u,
  "%Math.floor%": zu,
  "%Math.max%": Xu,
  "%Math.min%": Zu,
  "%Math.pow%": eh,
  "%Math.round%": th,
  "%Math.sign%": rh,
  "%Reflect.getPrototypeOf%": oh
};
if (Ge)
  try {
    null.error;
  } catch (r) {
    var sh = Ge(Ge(r));
    _t["%Error.prototype%"] = sh;
  }
var fh = function r(e) {
  var t;
  if (e === "%AsyncFunction%")
    t = Xn("async function () {}");
  else if (e === "%GeneratorFunction%")
    t = Xn("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    t = Xn("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var n = r("%AsyncGeneratorFunction%");
    n && (t = n.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var i = r("%AsyncGenerator%");
    i && Ge && (t = Ge(i.prototype));
  }
  return _t[e] = t, t;
}, go = {
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
}, xr = vr(), fn = Ys(), lh = xr.call(Sr, Array.prototype.concat), ch = xr.call(Ws, Array.prototype.splice), po = xr.call(Sr, String.prototype.replace), ln = xr.call(Sr, String.prototype.slice), uh = xr.call(Sr, RegExp.prototype.exec), hh = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, gh = /\\(\\)?/g, dh = function(e) {
  var t = ln(e, 0, 1), n = ln(e, -1);
  if (t === "%" && n !== "%")
    throw new tr("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && t !== "%")
    throw new tr("invalid intrinsic syntax, expected opening `%`");
  var i = [];
  return po(e, hh, function(A, a, o, c) {
    i[i.length] = o ? po(c, gh, "$1") : a || A;
  }), i;
}, ph = function(e, t) {
  var n = e, i;
  if (fn(go, n) && (i = go[n], n = "%" + i[0] + "%"), fn(_t, n)) {
    var A = _t[n];
    if (A === Yt && (A = fh(n)), typeof A > "u" && !t)
      throw new zt("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: i,
      name: n,
      value: A
    };
  }
  throw new tr("intrinsic " + e + " does not exist!");
}, bn = function(e, t) {
  if (typeof e != "string" || e.length === 0)
    throw new zt("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof t != "boolean")
    throw new zt('"allowMissing" argument must be a boolean');
  if (uh(/^%?[^%]*%?$/, e) === null)
    throw new tr("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = dh(e), i = n.length > 0 ? n[0] : "", A = ph("%" + i + "%", t), a = A.name, o = A.value, c = !1, l = A.alias;
  l && (i = l[0], ch(n, lh([0, 1], l)));
  for (var s = 1, p = !0; s < n.length; s += 1) {
    var d = n[s], I = ln(d, 0, 1), E = ln(d, -1);
    if ((I === '"' || I === "'" || I === "`" || E === '"' || E === "'" || E === "`") && I !== E)
      throw new tr("property names with quotes must have matching quotes");
    if ((d === "constructor" || !p) && (c = !0), i += "." + d, a = "%" + i + "%", fn(_t, a))
      o = _t[a];
    else if (o != null) {
      if (!(d in o)) {
        if (!t)
          throw new zt("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (Br && s + 1 >= n.length) {
        var x = Br(o, d);
        p = !!x, p && "get" in x && !("originalValue" in x.get) ? o = x.get : o = o[d];
      } else
        p = fn(o, d), o = o[d];
      p && !c && (_t[a] = o);
    }
  }
  return o;
}, Vs = bn, $s = kA, Ih = $s([Vs("%String.prototype.indexOf%")]), kt = function(e, t) {
  var n = (
    /** @type {(this: unknown, ...args: unknown[]) => unknown} */
    Vs(e, !!t)
  );
  return typeof n == "function" && Ih(e, ".prototype.") > -1 ? $s(
    /** @type {const} */
    [n]
  ) : n;
}, yh = Qn(), Eh = kt, qi = Eh("Object.prototype.toString"), vn = function(e) {
  return yh && e && typeof e == "object" && Symbol.toStringTag in e ? !1 : qi(e) === "[object Arguments]";
}, zs = function(e) {
  return vn(e) ? !0 : e !== null && typeof e == "object" && "length" in e && typeof e.length == "number" && e.length >= 0 && qi(e) !== "[object Array]" && "callee" in e && qi(e.callee) === "[object Function]";
}, Bh = function() {
  return vn(arguments);
}();
vn.isLegacyArguments = zs;
var Ch = Bh ? vn : zs, Io = kt, wh = Qn(), Qh = Ys(), mh = ar, Hi;
if (wh) {
  var bh = Io("RegExp.prototype.exec"), yo = {}, ei = function() {
    throw yo;
  }, Eo = {
    toString: ei,
    valueOf: ei
  };
  typeof Symbol.toPrimitive == "symbol" && (Eo[Symbol.toPrimitive] = ei), Hi = function(e) {
    if (!e || typeof e != "object")
      return !1;
    var t = (
      /** @type {NonNullable<typeof gOPD>} */
      mh(
        /** @type {{ lastIndex?: unknown }} */
        e,
        "lastIndex"
      )
    ), n = t && Qh(t, "value");
    if (!n)
      return !1;
    try {
      bh(
        e,
        /** @type {string} */
        /** @type {unknown} */
        Eo
      );
    } catch (i) {
      return i === yo;
    }
  };
} else {
  var vh = Io("Object.prototype.toString"), Sh = "[object RegExp]";
  Hi = function(e) {
    return !e || typeof e != "object" && typeof e != "function" ? !1 : vh(e) === Sh;
  };
}
var xh = Hi, Dh = kt, Fh = xh, Rh = Dh("RegExp.prototype.exec"), _h = It, Th = function(e) {
  if (!Fh(e))
    throw new _h("`regex` must be a RegExp");
  return function(n) {
    return Rh(e, n) !== null;
  };
}, ti, Bo;
function kh() {
  if (Bo) return ti;
  Bo = 1;
  const r = (
    /** @type {GeneratorFunctionConstructor} */
    (function* () {
    }).constructor
  );
  return ti = () => r, ti;
}
var Xs = kt, Lh = Th, Mh = Lh(/^\s*(?:function)?\*/), Uh = Qn(), Co = LA, Nh = Xs("Object.prototype.toString"), Gh = Xs("Function.prototype.toString"), Oh = kh(), Ph = function(e) {
  if (typeof e != "function")
    return !1;
  if (Mh(Gh(e)))
    return !0;
  if (!Uh) {
    var t = Nh(e);
    return t === "[object GeneratorFunction]";
  }
  if (!Co)
    return !1;
  var n = Oh();
  return n && Co(e) === n.prototype;
}, Zs = Function.prototype.toString, Kt = typeof Reflect == "object" && Reflect !== null && Reflect.apply, ji, rn;
if (typeof Kt == "function" && typeof Object.defineProperty == "function")
  try {
    ji = Object.defineProperty({}, "length", {
      get: function() {
        throw rn;
      }
    }), rn = {}, Kt(function() {
      throw 42;
    }, null, ji);
  } catch (r) {
    r !== rn && (Kt = null);
  }
else
  Kt = null;
var qh = /^\s*class\b/, Ji = function(e) {
  try {
    var t = Zs.call(e);
    return qh.test(t);
  } catch {
    return !1;
  }
}, ri = function(e) {
  try {
    return Ji(e) ? !1 : (Zs.call(e), !0);
  } catch {
    return !1;
  }
}, nn = Object.prototype.toString, Hh = "[object Object]", jh = "[object Function]", Jh = "[object GeneratorFunction]", Yh = "[object HTMLAllCollection]", Kh = "[object HTML document.all class]", Wh = "[object HTMLCollection]", Vh = typeof Symbol == "function" && !!Symbol.toStringTag, $h = !(0 in [,]), Yi = function() {
  return !1;
};
if (typeof document == "object") {
  var zh = document.all;
  nn.call(zh) === nn.call(document.all) && (Yi = function(e) {
    if (($h || !e) && (typeof e > "u" || typeof e == "object"))
      try {
        var t = nn.call(e);
        return (t === Yh || t === Kh || t === Wh || t === Hh) && e("") == null;
      } catch {
      }
    return !1;
  });
}
var Xh = Kt ? function(e) {
  if (Yi(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  try {
    Kt(e, null, ji);
  } catch (t) {
    if (t !== rn)
      return !1;
  }
  return !Ji(e) && ri(e);
} : function(e) {
  if (Yi(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  if (Vh)
    return ri(e);
  if (Ji(e))
    return !1;
  var t = nn.call(e);
  return t !== jh && t !== Jh && !/^\[object HTML/.test(t) ? !1 : ri(e);
}, Zh = Xh, eg = Object.prototype.toString, ef = Object.prototype.hasOwnProperty, tg = function(e, t, n) {
  for (var i = 0, A = e.length; i < A; i++)
    ef.call(e, i) && (n == null ? t(e[i], i, e) : t.call(n, e[i], i, e));
}, rg = function(e, t, n) {
  for (var i = 0, A = e.length; i < A; i++)
    n == null ? t(e.charAt(i), i, e) : t.call(n, e.charAt(i), i, e);
}, ng = function(e, t, n) {
  for (var i in e)
    ef.call(e, i) && (n == null ? t(e[i], i, e) : t.call(n, e[i], i, e));
};
function ig(r) {
  return eg.call(r) === "[object Array]";
}
var Ag = function(e, t, n) {
  if (!Zh(t))
    throw new TypeError("iterator must be a function");
  var i;
  arguments.length >= 3 && (i = n), ig(e) ? tg(e, t, i) : typeof e == "string" ? rg(e, t, i) : ng(e, t, i);
}, og = [
  "Float16Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array"
], ni = og, ag = typeof globalThis > "u" ? we : globalThis, sg = function() {
  for (var e = [], t = 0; t < ni.length; t++)
    typeof ag[ni[t]] == "function" && (e[e.length] = ni[t]);
  return e;
}, tf = { exports: {} }, wo = mn, fg = Os, Pt = It, Qo = ar, lg = function(e, t, n) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new Pt("`obj` must be an object or a function`");
  if (typeof t != "string" && typeof t != "symbol")
    throw new Pt("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new Pt("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new Pt("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new Pt("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new Pt("`loose`, if provided, must be a boolean");
  var i = arguments.length > 3 ? arguments[3] : null, A = arguments.length > 4 ? arguments[4] : null, a = arguments.length > 5 ? arguments[5] : null, o = arguments.length > 6 ? arguments[6] : !1, c = !!Qo && Qo(e, t);
  if (wo)
    wo(e, t, {
      configurable: a === null && c ? c.configurable : !a,
      enumerable: i === null && c ? c.enumerable : !i,
      value: n,
      writable: A === null && c ? c.writable : !A
    });
  else if (o || !i && !A && !a)
    e[t] = n;
  else
    throw new fg("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, Ki = mn, rf = function() {
  return !!Ki;
};
rf.hasArrayLengthDefineBug = function() {
  if (!Ki)
    return null;
  try {
    return Ki([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var cg = rf, ug = bn, mo = lg, hg = cg(), bo = ar, vo = It, gg = ug("%Math.floor%"), dg = function(e, t) {
  if (typeof e != "function")
    throw new vo("`fn` is not a function");
  if (typeof t != "number" || t < 0 || t > 4294967295 || gg(t) !== t)
    throw new vo("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], i = !0, A = !0;
  if ("length" in e && bo) {
    var a = bo(e, "length");
    a && !a.configurable && (i = !1), a && !a.writable && (A = !1);
  }
  return (i || A || !n) && (hg ? mo(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    t,
    !0,
    !0
  ) : mo(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    t
  )), e;
}, pg = vr(), Ig = TA(), yg = Hs, Eg = function() {
  return yg(pg, Ig, arguments);
};
(function(r) {
  var e = dg, t = mn, n = kA, i = Eg;
  r.exports = function(a) {
    var o = n(arguments), c = a.length - (arguments.length - 1);
    return e(
      o,
      1 + (c > 0 ? c : 0),
      !0
    );
  }, t ? t(r.exports, "apply", { value: i }) : r.exports.apply = i;
})(tf);
var Bg = tf.exports, cn = Ag, Cg = sg, So = Bg, MA = kt, An = ar, _r = LA, wg = MA("Object.prototype.toString"), nf = Qn(), xo = typeof globalThis > "u" ? we : globalThis, Wi = Cg(), UA = MA("String.prototype.slice"), Qg = MA("Array.prototype.indexOf", !0) || function(e, t) {
  for (var n = 0; n < e.length; n += 1)
    if (e[n] === t)
      return n;
  return -1;
}, un = { __proto__: null };
nf && An && _r ? cn(Wi, function(r) {
  var e = new xo[r]();
  if (Symbol.toStringTag in e && _r) {
    var t = _r(e), n = An(t, Symbol.toStringTag);
    if (!n && t) {
      var i = _r(t);
      n = An(i, Symbol.toStringTag);
    }
    un["$" + r] = So(n.get);
  }
}) : cn(Wi, function(r) {
  var e = new xo[r](), t = e.slice || e.set;
  t && (un[
    /** @type {`$${import('.').TypedArrayName}`} */
    "$" + r
  ] = /** @type {import('./types').BoundSlice | import('./types').BoundSet} */
  // @ts-expect-error TODO FIXME
  So(t));
});
var mg = function(e) {
  var t = !1;
  return cn(
    /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
    un,
    /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
    function(n, i) {
      if (!t)
        try {
          "$" + n(e) === i && (t = /** @type {import('.').TypedArrayName} */
          UA(i, 1));
        } catch {
        }
    }
  ), t;
}, bg = function(e) {
  var t = !1;
  return cn(
    /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
    un,
    /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
    function(n, i) {
      if (!t)
        try {
          n(e), t = /** @type {import('.').TypedArrayName} */
          UA(i, 1);
        } catch {
        }
    }
  ), t;
}, Af = function(e) {
  if (!e || typeof e != "object")
    return !1;
  if (!nf) {
    var t = UA(wg(e), 8, -1);
    return Qg(Wi, t) > -1 ? t : t !== "Object" ? !1 : bg(e);
  }
  return An ? mg(e) : null;
}, vg = Af, Sg = function(e) {
  return !!vg(e);
};
(function(r) {
  var e = Ch, t = Ph, n = Af, i = Sg;
  function A(y) {
    return y.call.bind(y);
  }
  var a = typeof BigInt < "u", o = typeof Symbol < "u", c = A(Object.prototype.toString), l = A(Number.prototype.valueOf), s = A(String.prototype.valueOf), p = A(Boolean.prototype.valueOf);
  if (a)
    var d = A(BigInt.prototype.valueOf);
  if (o)
    var I = A(Symbol.prototype.valueOf);
  function E(y, G) {
    if (typeof y != "object")
      return !1;
    try {
      return G(y), !0;
    } catch {
      return !1;
    }
  }
  r.isArgumentsObject = e, r.isGeneratorFunction = t, r.isTypedArray = i;
  function x(y) {
    return typeof Promise < "u" && y instanceof Promise || y !== null && typeof y == "object" && typeof y.then == "function" && typeof y.catch == "function";
  }
  r.isPromise = x;
  function v(y) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(y) : i(y) || P(y);
  }
  r.isArrayBufferView = v;
  function w(y) {
    return n(y) === "Uint8Array";
  }
  r.isUint8Array = w;
  function b(y) {
    return n(y) === "Uint8ClampedArray";
  }
  r.isUint8ClampedArray = b;
  function D(y) {
    return n(y) === "Uint16Array";
  }
  r.isUint16Array = D;
  function F(y) {
    return n(y) === "Uint32Array";
  }
  r.isUint32Array = F;
  function R(y) {
    return n(y) === "Int8Array";
  }
  r.isInt8Array = R;
  function L(y) {
    return n(y) === "Int16Array";
  }
  r.isInt16Array = L;
  function q(y) {
    return n(y) === "Int32Array";
  }
  r.isInt32Array = q;
  function T(y) {
    return n(y) === "Float32Array";
  }
  r.isFloat32Array = T;
  function j(y) {
    return n(y) === "Float64Array";
  }
  r.isFloat64Array = j;
  function $(y) {
    return n(y) === "BigInt64Array";
  }
  r.isBigInt64Array = $;
  function te(y) {
    return n(y) === "BigUint64Array";
  }
  r.isBigUint64Array = te;
  function oe(y) {
    return c(y) === "[object Map]";
  }
  oe.working = typeof Map < "u" && oe(/* @__PURE__ */ new Map());
  function ne(y) {
    return typeof Map > "u" ? !1 : oe.working ? oe(y) : y instanceof Map;
  }
  r.isMap = ne;
  function Ae(y) {
    return c(y) === "[object Set]";
  }
  Ae.working = typeof Set < "u" && Ae(/* @__PURE__ */ new Set());
  function ie(y) {
    return typeof Set > "u" ? !1 : Ae.working ? Ae(y) : y instanceof Set;
  }
  r.isSet = ie;
  function se(y) {
    return c(y) === "[object WeakMap]";
  }
  se.working = typeof WeakMap < "u" && se(/* @__PURE__ */ new WeakMap());
  function ye(y) {
    return typeof WeakMap > "u" ? !1 : se.working ? se(y) : y instanceof WeakMap;
  }
  r.isWeakMap = ye;
  function Be(y) {
    return c(y) === "[object WeakSet]";
  }
  Be.working = typeof WeakSet < "u" && Be(/* @__PURE__ */ new WeakSet());
  function ge(y) {
    return Be(y);
  }
  r.isWeakSet = ge;
  function Z(y) {
    return c(y) === "[object ArrayBuffer]";
  }
  Z.working = typeof ArrayBuffer < "u" && Z(new ArrayBuffer());
  function re(y) {
    return typeof ArrayBuffer > "u" ? !1 : Z.working ? Z(y) : y instanceof ArrayBuffer;
  }
  r.isArrayBuffer = re;
  function M(y) {
    return c(y) === "[object DataView]";
  }
  M.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && M(new DataView(new ArrayBuffer(1), 0, 1));
  function P(y) {
    return typeof DataView > "u" ? !1 : M.working ? M(y) : y instanceof DataView;
  }
  r.isDataView = P;
  var N = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function Y(y) {
    return c(y) === "[object SharedArrayBuffer]";
  }
  function _(y) {
    return typeof N > "u" ? !1 : (typeof Y.working > "u" && (Y.working = Y(new N())), Y.working ? Y(y) : y instanceof N);
  }
  r.isSharedArrayBuffer = _;
  function k(y) {
    return c(y) === "[object AsyncFunction]";
  }
  r.isAsyncFunction = k;
  function O(y) {
    return c(y) === "[object Map Iterator]";
  }
  r.isMapIterator = O;
  function K(y) {
    return c(y) === "[object Set Iterator]";
  }
  r.isSetIterator = K;
  function z(y) {
    return c(y) === "[object Generator]";
  }
  r.isGeneratorObject = z;
  function Q(y) {
    return c(y) === "[object WebAssembly.Module]";
  }
  r.isWebAssemblyCompiledModule = Q;
  function m(y) {
    return E(y, l);
  }
  r.isNumberObject = m;
  function J(y) {
    return E(y, s);
  }
  r.isStringObject = J;
  function ee(y) {
    return E(y, p);
  }
  r.isBooleanObject = ee;
  function le(y) {
    return a && E(y, d);
  }
  r.isBigIntObject = le;
  function C(y) {
    return o && E(y, I);
  }
  r.isSymbolObject = C;
  function h(y) {
    return m(y) || J(y) || ee(y) || le(y) || C(y);
  }
  r.isBoxedPrimitive = h;
  function g(y) {
    return typeof Uint8Array < "u" && (re(y) || _(y));
  }
  r.isAnyArrayBuffer = g, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(y) {
    Object.defineProperty(r, y, {
      enumerable: !1,
      value: function() {
        throw new Error(y + " is not supported in userland");
      }
    });
  });
})(Us);
var xg = function(e) {
  return e && typeof e == "object" && typeof e.copy == "function" && typeof e.fill == "function" && typeof e.readUInt8 == "function";
};
(function(r) {
  var e = Object.getOwnPropertyDescriptors || function(P) {
    for (var N = Object.keys(P), Y = {}, _ = 0; _ < N.length; _++)
      Y[N[_]] = Object.getOwnPropertyDescriptor(P, N[_]);
    return Y;
  }, t = /%[sdj%]/g;
  r.format = function(M) {
    if (!R(M)) {
      for (var P = [], N = 0; N < arguments.length; N++)
        P.push(a(arguments[N]));
      return P.join(" ");
    }
    for (var N = 1, Y = arguments, _ = Y.length, k = String(M).replace(t, function(K) {
      if (K === "%%") return "%";
      if (N >= _) return K;
      switch (K) {
        case "%s":
          return String(Y[N++]);
        case "%d":
          return Number(Y[N++]);
        case "%j":
          try {
            return JSON.stringify(Y[N++]);
          } catch {
            return "[Circular]";
          }
        default:
          return K;
      }
    }), O = Y[N]; N < _; O = Y[++N])
      b(O) || !j(O) ? k += " " + O : k += " " + a(O);
    return k;
  }, r.deprecate = function(M, P) {
    if (typeof ue < "u" && ue.noDeprecation === !0)
      return M;
    if (typeof ue > "u")
      return function() {
        return r.deprecate(M, P).apply(this, arguments);
      };
    var N = !1;
    function Y() {
      if (!N) {
        if (ue.throwDeprecation)
          throw new Error(P);
        ue.traceDeprecation ? console.trace(P) : console.error(P), N = !0;
      }
      return M.apply(this, arguments);
    }
    return Y;
  };
  var n = {}, i = /^$/;
  if (ue.env.NODE_DEBUG) {
    var A = ue.env.NODE_DEBUG;
    A = A.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), i = new RegExp("^" + A + "$", "i");
  }
  r.debuglog = function(M) {
    if (M = M.toUpperCase(), !n[M])
      if (i.test(M)) {
        var P = ue.pid;
        n[M] = function() {
          var N = r.format.apply(r, arguments);
          console.error("%s %d: %s", M, P, N);
        };
      } else
        n[M] = function() {
        };
    return n[M];
  };
  function a(M, P) {
    var N = {
      seen: [],
      stylize: c
    };
    return arguments.length >= 3 && (N.depth = arguments[2]), arguments.length >= 4 && (N.colors = arguments[3]), w(P) ? N.showHidden = P : P && r._extend(N, P), q(N.showHidden) && (N.showHidden = !1), q(N.depth) && (N.depth = 2), q(N.colors) && (N.colors = !1), q(N.customInspect) && (N.customInspect = !0), N.colors && (N.stylize = o), s(N, M, N.depth);
  }
  r.inspect = a, a.colors = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39]
  }, a.styles = {
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    date: "magenta",
    // "name": intentionally not styling
    regexp: "red"
  };
  function o(M, P) {
    var N = a.styles[P];
    return N ? "\x1B[" + a.colors[N][0] + "m" + M + "\x1B[" + a.colors[N][1] + "m" : M;
  }
  function c(M, P) {
    return M;
  }
  function l(M) {
    var P = {};
    return M.forEach(function(N, Y) {
      P[N] = !0;
    }), P;
  }
  function s(M, P, N) {
    if (M.customInspect && P && oe(P.inspect) && // Filter out the util module, it's inspect function is special
    P.inspect !== r.inspect && // Also filter out any prototype objects using the circular check.
    !(P.constructor && P.constructor.prototype === P)) {
      var Y = P.inspect(N, M);
      return R(Y) || (Y = s(M, Y, N)), Y;
    }
    var _ = p(M, P);
    if (_)
      return _;
    var k = Object.keys(P), O = l(k);
    if (M.showHidden && (k = Object.getOwnPropertyNames(P)), te(P) && (k.indexOf("message") >= 0 || k.indexOf("description") >= 0))
      return d(P);
    if (k.length === 0) {
      if (oe(P)) {
        var K = P.name ? ": " + P.name : "";
        return M.stylize("[Function" + K + "]", "special");
      }
      if (T(P))
        return M.stylize(RegExp.prototype.toString.call(P), "regexp");
      if ($(P))
        return M.stylize(Date.prototype.toString.call(P), "date");
      if (te(P))
        return d(P);
    }
    var z = "", Q = !1, m = ["{", "}"];
    if (v(P) && (Q = !0, m = ["[", "]"]), oe(P)) {
      var J = P.name ? ": " + P.name : "";
      z = " [Function" + J + "]";
    }
    if (T(P) && (z = " " + RegExp.prototype.toString.call(P)), $(P) && (z = " " + Date.prototype.toUTCString.call(P)), te(P) && (z = " " + d(P)), k.length === 0 && (!Q || P.length == 0))
      return m[0] + z + m[1];
    if (N < 0)
      return T(P) ? M.stylize(RegExp.prototype.toString.call(P), "regexp") : M.stylize("[Object]", "special");
    M.seen.push(P);
    var ee;
    return Q ? ee = I(M, P, N, O, k) : ee = k.map(function(le) {
      return E(M, P, N, O, le, Q);
    }), M.seen.pop(), x(ee, z, m);
  }
  function p(M, P) {
    if (q(P))
      return M.stylize("undefined", "undefined");
    if (R(P)) {
      var N = "'" + JSON.stringify(P).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return M.stylize(N, "string");
    }
    if (F(P))
      return M.stylize("" + P, "number");
    if (w(P))
      return M.stylize("" + P, "boolean");
    if (b(P))
      return M.stylize("null", "null");
  }
  function d(M) {
    return "[" + Error.prototype.toString.call(M) + "]";
  }
  function I(M, P, N, Y, _) {
    for (var k = [], O = 0, K = P.length; O < K; ++O)
      Be(P, String(O)) ? k.push(E(
        M,
        P,
        N,
        Y,
        String(O),
        !0
      )) : k.push("");
    return _.forEach(function(z) {
      z.match(/^\d+$/) || k.push(E(
        M,
        P,
        N,
        Y,
        z,
        !0
      ));
    }), k;
  }
  function E(M, P, N, Y, _, k) {
    var O, K, z;
    if (z = Object.getOwnPropertyDescriptor(P, _) || { value: P[_] }, z.get ? z.set ? K = M.stylize("[Getter/Setter]", "special") : K = M.stylize("[Getter]", "special") : z.set && (K = M.stylize("[Setter]", "special")), Be(Y, _) || (O = "[" + _ + "]"), K || (M.seen.indexOf(z.value) < 0 ? (b(N) ? K = s(M, z.value, null) : K = s(M, z.value, N - 1), K.indexOf(`
`) > -1 && (k ? K = K.split(`
`).map(function(Q) {
      return "  " + Q;
    }).join(`
`).slice(2) : K = `
` + K.split(`
`).map(function(Q) {
      return "   " + Q;
    }).join(`
`))) : K = M.stylize("[Circular]", "special")), q(O)) {
      if (k && _.match(/^\d+$/))
        return K;
      O = JSON.stringify("" + _), O.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (O = O.slice(1, -1), O = M.stylize(O, "name")) : (O = O.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), O = M.stylize(O, "string"));
    }
    return O + ": " + K;
  }
  function x(M, P, N) {
    var Y = M.reduce(function(_, k) {
      return k.indexOf(`
`) >= 0, _ + k.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    return Y > 60 ? N[0] + (P === "" ? "" : P + `
 `) + " " + M.join(`,
  `) + " " + N[1] : N[0] + P + " " + M.join(", ") + " " + N[1];
  }
  r.types = Us;
  function v(M) {
    return Array.isArray(M);
  }
  r.isArray = v;
  function w(M) {
    return typeof M == "boolean";
  }
  r.isBoolean = w;
  function b(M) {
    return M === null;
  }
  r.isNull = b;
  function D(M) {
    return M == null;
  }
  r.isNullOrUndefined = D;
  function F(M) {
    return typeof M == "number";
  }
  r.isNumber = F;
  function R(M) {
    return typeof M == "string";
  }
  r.isString = R;
  function L(M) {
    return typeof M == "symbol";
  }
  r.isSymbol = L;
  function q(M) {
    return M === void 0;
  }
  r.isUndefined = q;
  function T(M) {
    return j(M) && Ae(M) === "[object RegExp]";
  }
  r.isRegExp = T, r.types.isRegExp = T;
  function j(M) {
    return typeof M == "object" && M !== null;
  }
  r.isObject = j;
  function $(M) {
    return j(M) && Ae(M) === "[object Date]";
  }
  r.isDate = $, r.types.isDate = $;
  function te(M) {
    return j(M) && (Ae(M) === "[object Error]" || M instanceof Error);
  }
  r.isError = te, r.types.isNativeError = te;
  function oe(M) {
    return typeof M == "function";
  }
  r.isFunction = oe;
  function ne(M) {
    return M === null || typeof M == "boolean" || typeof M == "number" || typeof M == "string" || typeof M == "symbol" || // ES6 symbol
    typeof M > "u";
  }
  r.isPrimitive = ne, r.isBuffer = xg;
  function Ae(M) {
    return Object.prototype.toString.call(M);
  }
  function ie(M) {
    return M < 10 ? "0" + M.toString(10) : M.toString(10);
  }
  var se = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  function ye() {
    var M = /* @__PURE__ */ new Date(), P = [
      ie(M.getHours()),
      ie(M.getMinutes()),
      ie(M.getSeconds())
    ].join(":");
    return [M.getDate(), se[M.getMonth()], P].join(" ");
  }
  r.log = function() {
    console.log("%s - %s", ye(), r.format.apply(r, arguments));
  }, r.inherits = mt, r._extend = function(M, P) {
    if (!P || !j(P)) return M;
    for (var N = Object.keys(P), Y = N.length; Y--; )
      M[N[Y]] = P[N[Y]];
    return M;
  };
  function Be(M, P) {
    return Object.prototype.hasOwnProperty.call(M, P);
  }
  var ge = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
  r.promisify = function(P) {
    if (typeof P != "function")
      throw new TypeError('The "original" argument must be of type Function');
    if (ge && P[ge]) {
      var N = P[ge];
      if (typeof N != "function")
        throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      return Object.defineProperty(N, ge, {
        value: N,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), N;
    }
    function N() {
      for (var Y, _, k = new Promise(function(z, Q) {
        Y = z, _ = Q;
      }), O = [], K = 0; K < arguments.length; K++)
        O.push(arguments[K]);
      O.push(function(z, Q) {
        z ? _(z) : Y(Q);
      });
      try {
        P.apply(this, O);
      } catch (z) {
        _(z);
      }
      return k;
    }
    return Object.setPrototypeOf(N, Object.getPrototypeOf(P)), ge && Object.defineProperty(N, ge, {
      value: N,
      enumerable: !1,
      writable: !1,
      configurable: !0
    }), Object.defineProperties(
      N,
      e(P)
    );
  }, r.promisify.custom = ge;
  function Z(M, P) {
    if (!M) {
      var N = new Error("Promise was rejected with a falsy value");
      N.reason = M, M = N;
    }
    return P(M);
  }
  function re(M) {
    if (typeof M != "function")
      throw new TypeError('The "original" argument must be of type Function');
    function P() {
      for (var N = [], Y = 0; Y < arguments.length; Y++)
        N.push(arguments[Y]);
      var _ = N.pop();
      if (typeof _ != "function")
        throw new TypeError("The last argument must be of type Function");
      var k = this, O = function() {
        return _.apply(k, arguments);
      };
      M.apply(this, N).then(
        function(K) {
          ue.nextTick(O.bind(null, null, K));
        },
        function(K) {
          ue.nextTick(Z.bind(null, K, O));
        }
      );
    }
    return Object.setPrototypeOf(P, Object.getPrototypeOf(M)), Object.defineProperties(
      P,
      e(M)
    ), P;
  }
  r.callbackify = re;
})(RA);
var ii, Do;
function Dg() {
  if (Do) return ii;
  Do = 1;
  function r(E, x) {
    var v = Object.keys(E);
    if (Object.getOwnPropertySymbols) {
      var w = Object.getOwnPropertySymbols(E);
      x && (w = w.filter(function(b) {
        return Object.getOwnPropertyDescriptor(E, b).enumerable;
      })), v.push.apply(v, w);
    }
    return v;
  }
  function e(E) {
    for (var x = 1; x < arguments.length; x++) {
      var v = arguments[x] != null ? arguments[x] : {};
      x % 2 ? r(Object(v), !0).forEach(function(w) {
        t(E, w, v[w]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(E, Object.getOwnPropertyDescriptors(v)) : r(Object(v)).forEach(function(w) {
        Object.defineProperty(E, w, Object.getOwnPropertyDescriptor(v, w));
      });
    }
    return E;
  }
  function t(E, x, v) {
    return x = a(x), x in E ? Object.defineProperty(E, x, { value: v, enumerable: !0, configurable: !0, writable: !0 }) : E[x] = v, E;
  }
  function n(E, x) {
    if (!(E instanceof x))
      throw new TypeError("Cannot call a class as a function");
  }
  function i(E, x) {
    for (var v = 0; v < x.length; v++) {
      var w = x[v];
      w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(E, a(w.key), w);
    }
  }
  function A(E, x, v) {
    return x && i(E.prototype, x), Object.defineProperty(E, "prototype", { writable: !1 }), E;
  }
  function a(E) {
    var x = o(E, "string");
    return typeof x == "symbol" ? x : String(x);
  }
  function o(E, x) {
    if (typeof E != "object" || E === null) return E;
    var v = E[Symbol.toPrimitive];
    if (v !== void 0) {
      var w = v.call(E, x);
      if (typeof w != "object") return w;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(E);
  }
  var c = br, l = c.Buffer, s = RA, p = s.inspect, d = p && p.custom || "inspect";
  function I(E, x, v) {
    l.prototype.copy.call(E, x, v);
  }
  return ii = /* @__PURE__ */ function() {
    function E() {
      n(this, E), this.head = null, this.tail = null, this.length = 0;
    }
    return A(E, [{
      key: "push",
      value: function(v) {
        var w = {
          data: v,
          next: null
        };
        this.length > 0 ? this.tail.next = w : this.head = w, this.tail = w, ++this.length;
      }
    }, {
      key: "unshift",
      value: function(v) {
        var w = {
          data: v,
          next: this.head
        };
        this.length === 0 && (this.tail = w), this.head = w, ++this.length;
      }
    }, {
      key: "shift",
      value: function() {
        if (this.length !== 0) {
          var v = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, v;
        }
      }
    }, {
      key: "clear",
      value: function() {
        this.head = this.tail = null, this.length = 0;
      }
    }, {
      key: "join",
      value: function(v) {
        if (this.length === 0) return "";
        for (var w = this.head, b = "" + w.data; w = w.next; ) b += v + w.data;
        return b;
      }
    }, {
      key: "concat",
      value: function(v) {
        if (this.length === 0) return l.alloc(0);
        for (var w = l.allocUnsafe(v >>> 0), b = this.head, D = 0; b; )
          I(b.data, w, D), D += b.data.length, b = b.next;
        return w;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function(v, w) {
        var b;
        return v < this.head.data.length ? (b = this.head.data.slice(0, v), this.head.data = this.head.data.slice(v)) : v === this.head.data.length ? b = this.shift() : b = w ? this._getString(v) : this._getBuffer(v), b;
      }
    }, {
      key: "first",
      value: function() {
        return this.head.data;
      }
      // Consumes a specified amount of characters from the buffered data.
    }, {
      key: "_getString",
      value: function(v) {
        var w = this.head, b = 1, D = w.data;
        for (v -= D.length; w = w.next; ) {
          var F = w.data, R = v > F.length ? F.length : v;
          if (R === F.length ? D += F : D += F.slice(0, v), v -= R, v === 0) {
            R === F.length ? (++b, w.next ? this.head = w.next : this.head = this.tail = null) : (this.head = w, w.data = F.slice(R));
            break;
          }
          ++b;
        }
        return this.length -= b, D;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function(v) {
        var w = l.allocUnsafe(v), b = this.head, D = 1;
        for (b.data.copy(w), v -= b.data.length; b = b.next; ) {
          var F = b.data, R = v > F.length ? F.length : v;
          if (F.copy(w, w.length - v, 0, R), v -= R, v === 0) {
            R === F.length ? (++D, b.next ? this.head = b.next : this.head = this.tail = null) : (this.head = b, b.data = F.slice(R));
            break;
          }
          ++D;
        }
        return this.length -= D, w;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: d,
      value: function(v, w) {
        return p(this, e(e({}, w), {}, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: !1
        }));
      }
    }]), E;
  }(), ii;
}
function Fg(r, e) {
  var t = this, n = this._readableState && this._readableState.destroyed, i = this._writableState && this._writableState.destroyed;
  return n || i ? (e ? e(r) : r && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, ue.nextTick(Vi, this, r)) : ue.nextTick(Vi, this, r)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(r || null, function(A) {
    !e && A ? t._writableState ? t._writableState.errorEmitted ? ue.nextTick(on, t) : (t._writableState.errorEmitted = !0, ue.nextTick(Fo, t, A)) : ue.nextTick(Fo, t, A) : e ? (ue.nextTick(on, t), e(A)) : ue.nextTick(on, t);
  }), this);
}
function Fo(r, e) {
  Vi(r, e), on(r);
}
function on(r) {
  r._writableState && !r._writableState.emitClose || r._readableState && !r._readableState.emitClose || r.emit("close");
}
function Rg() {
  this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
}
function Vi(r, e) {
  r.emit("error", e);
}
function _g(r, e) {
  var t = r._readableState, n = r._writableState;
  t && t.autoDestroy || n && n.autoDestroy ? r.destroy(e) : r.emit("error", e);
}
var of = {
  destroy: Fg,
  undestroy: Rg,
  errorOrDestroy: _g
}, Lt = {};
function Tg(r, e) {
  r.prototype = Object.create(e.prototype), r.prototype.constructor = r, r.__proto__ = e;
}
var af = {};
function Ve(r, e, t) {
  t || (t = Error);
  function n(A, a, o) {
    return typeof e == "string" ? e : e(A, a, o);
  }
  var i = /* @__PURE__ */ function(A) {
    Tg(a, A);
    function a(o, c, l) {
      return A.call(this, n(o, c, l)) || this;
    }
    return a;
  }(t);
  i.prototype.name = t.name, i.prototype.code = r, af[r] = i;
}
function Ro(r, e) {
  if (Array.isArray(r)) {
    var t = r.length;
    return r = r.map(function(n) {
      return String(n);
    }), t > 2 ? "one of ".concat(e, " ").concat(r.slice(0, t - 1).join(", "), ", or ") + r[t - 1] : t === 2 ? "one of ".concat(e, " ").concat(r[0], " or ").concat(r[1]) : "of ".concat(e, " ").concat(r[0]);
  } else
    return "of ".concat(e, " ").concat(String(r));
}
function kg(r, e, t) {
  return r.substr(0, e.length) === e;
}
function Lg(r, e, t) {
  return (t === void 0 || t > r.length) && (t = r.length), r.substring(t - e.length, t) === e;
}
function Mg(r, e, t) {
  return typeof t != "number" && (t = 0), t + e.length > r.length ? !1 : r.indexOf(e, t) !== -1;
}
Ve("ERR_INVALID_OPT_VALUE", function(r, e) {
  return 'The value "' + e + '" is invalid for option "' + r + '"';
}, TypeError);
Ve("ERR_INVALID_ARG_TYPE", function(r, e, t) {
  var n;
  typeof e == "string" && kg(e, "not ") ? (n = "must not be", e = e.replace(/^not /, "")) : n = "must be";
  var i;
  if (Lg(r, " argument"))
    i = "The ".concat(r, " ").concat(n, " ").concat(Ro(e, "type"));
  else {
    var A = Mg(r, ".") ? "property" : "argument";
    i = 'The "'.concat(r, '" ').concat(A, " ").concat(n, " ").concat(Ro(e, "type"));
  }
  return i += ". Received type ".concat(typeof t), i;
}, TypeError);
Ve("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
Ve("ERR_METHOD_NOT_IMPLEMENTED", function(r) {
  return "The " + r + " method is not implemented";
});
Ve("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
Ve("ERR_STREAM_DESTROYED", function(r) {
  return "Cannot call " + r + " after a stream was destroyed";
});
Ve("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
Ve("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
Ve("ERR_STREAM_WRITE_AFTER_END", "write after end");
Ve("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
Ve("ERR_UNKNOWN_ENCODING", function(r) {
  return "Unknown encoding: " + r;
}, TypeError);
Ve("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
Lt.codes = af;
var Ug = Lt.codes.ERR_INVALID_OPT_VALUE;
function Ng(r, e, t) {
  return r.highWaterMark != null ? r.highWaterMark : e ? r[t] : null;
}
function Gg(r, e, t, n) {
  var i = Ng(e, n, t);
  if (i != null) {
    if (!(isFinite(i) && Math.floor(i) === i) || i < 0) {
      var A = n ? t : "highWaterMark";
      throw new Ug(A, i);
    }
    return Math.floor(i);
  }
  return r.objectMode ? 16 : 16 * 1024;
}
var sf = {
  getHighWaterMark: Gg
}, Og = Pg;
function Pg(r, e) {
  if (Ai("noDeprecation"))
    return r;
  var t = !1;
  function n() {
    if (!t) {
      if (Ai("throwDeprecation"))
        throw new Error(e);
      Ai("traceDeprecation") ? console.trace(e) : console.warn(e), t = !0;
    }
    return r.apply(this, arguments);
  }
  return n;
}
function Ai(r) {
  try {
    if (!we.localStorage) return !1;
  } catch {
    return !1;
  }
  var e = we.localStorage[r];
  return e == null ? !1 : String(e).toLowerCase() === "true";
}
var oi, _o;
function ff() {
  if (_o) return oi;
  _o = 1, oi = T;
  function r(_) {
    var k = this;
    this.next = null, this.entry = null, this.finish = function() {
      Y(k, _);
    };
  }
  var e;
  T.WritableState = L;
  var t = {
    deprecate: Og
  }, n = Ls, i = br.Buffer, A = (typeof we < "u" ? we : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function a(_) {
    return i.from(_);
  }
  function o(_) {
    return i.isBuffer(_) || _ instanceof A;
  }
  var c = of, l = sf, s = l.getHighWaterMark, p = Lt.codes, d = p.ERR_INVALID_ARG_TYPE, I = p.ERR_METHOD_NOT_IMPLEMENTED, E = p.ERR_MULTIPLE_CALLBACK, x = p.ERR_STREAM_CANNOT_PIPE, v = p.ERR_STREAM_DESTROYED, w = p.ERR_STREAM_NULL_VALUES, b = p.ERR_STREAM_WRITE_AFTER_END, D = p.ERR_UNKNOWN_ENCODING, F = c.errorOrDestroy;
  mt(T, n);
  function R() {
  }
  function L(_, k, O) {
    e = e || rr(), _ = _ || {}, typeof O != "boolean" && (O = k instanceof e), this.objectMode = !!_.objectMode, O && (this.objectMode = this.objectMode || !!_.writableObjectMode), this.highWaterMark = s(this, _, "writableHighWaterMark", O), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var K = _.decodeStrings === !1;
    this.decodeStrings = !K, this.defaultEncoding = _.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(z) {
      se(k, z);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = _.emitClose !== !1, this.autoDestroy = !!_.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new r(this);
  }
  L.prototype.getBuffer = function() {
    for (var k = this.bufferedRequest, O = []; k; )
      O.push(k), k = k.next;
    return O;
  }, function() {
    try {
      Object.defineProperty(L.prototype, "buffer", {
        get: t.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var q;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (q = Function.prototype[Symbol.hasInstance], Object.defineProperty(T, Symbol.hasInstance, {
    value: function(k) {
      return q.call(this, k) ? !0 : this !== T ? !1 : k && k._writableState instanceof L;
    }
  })) : q = function(k) {
    return k instanceof this;
  };
  function T(_) {
    e = e || rr();
    var k = this instanceof e;
    if (!k && !q.call(T, this)) return new T(_);
    this._writableState = new L(_, this, k), this.writable = !0, _ && (typeof _.write == "function" && (this._write = _.write), typeof _.writev == "function" && (this._writev = _.writev), typeof _.destroy == "function" && (this._destroy = _.destroy), typeof _.final == "function" && (this._final = _.final)), n.call(this);
  }
  T.prototype.pipe = function() {
    F(this, new x());
  };
  function j(_, k) {
    var O = new b();
    F(_, O), ue.nextTick(k, O);
  }
  function $(_, k, O, K) {
    var z;
    return O === null ? z = new w() : typeof O != "string" && !k.objectMode && (z = new d("chunk", ["string", "Buffer"], O)), z ? (F(_, z), ue.nextTick(K, z), !1) : !0;
  }
  T.prototype.write = function(_, k, O) {
    var K = this._writableState, z = !1, Q = !K.objectMode && o(_);
    return Q && !i.isBuffer(_) && (_ = a(_)), typeof k == "function" && (O = k, k = null), Q ? k = "buffer" : k || (k = K.defaultEncoding), typeof O != "function" && (O = R), K.ending ? j(this, O) : (Q || $(this, K, _, O)) && (K.pendingcb++, z = oe(this, K, Q, _, k, O)), z;
  }, T.prototype.cork = function() {
    this._writableState.corked++;
  }, T.prototype.uncork = function() {
    var _ = this._writableState;
    _.corked && (_.corked--, !_.writing && !_.corked && !_.bufferProcessing && _.bufferedRequest && ge(this, _));
  }, T.prototype.setDefaultEncoding = function(k) {
    if (typeof k == "string" && (k = k.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((k + "").toLowerCase()) > -1)) throw new D(k);
    return this._writableState.defaultEncoding = k, this;
  }, Object.defineProperty(T.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function te(_, k, O) {
    return !_.objectMode && _.decodeStrings !== !1 && typeof k == "string" && (k = i.from(k, O)), k;
  }
  Object.defineProperty(T.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function oe(_, k, O, K, z, Q) {
    if (!O) {
      var m = te(k, K, z);
      K !== m && (O = !0, z = "buffer", K = m);
    }
    var J = k.objectMode ? 1 : K.length;
    k.length += J;
    var ee = k.length < k.highWaterMark;
    if (ee || (k.needDrain = !0), k.writing || k.corked) {
      var le = k.lastBufferedRequest;
      k.lastBufferedRequest = {
        chunk: K,
        encoding: z,
        isBuf: O,
        callback: Q,
        next: null
      }, le ? le.next = k.lastBufferedRequest : k.bufferedRequest = k.lastBufferedRequest, k.bufferedRequestCount += 1;
    } else
      ne(_, k, !1, J, K, z, Q);
    return ee;
  }
  function ne(_, k, O, K, z, Q, m) {
    k.writelen = K, k.writecb = m, k.writing = !0, k.sync = !0, k.destroyed ? k.onwrite(new v("write")) : O ? _._writev(z, k.onwrite) : _._write(z, Q, k.onwrite), k.sync = !1;
  }
  function Ae(_, k, O, K, z) {
    --k.pendingcb, O ? (ue.nextTick(z, K), ue.nextTick(P, _, k), _._writableState.errorEmitted = !0, F(_, K)) : (z(K), _._writableState.errorEmitted = !0, F(_, K), P(_, k));
  }
  function ie(_) {
    _.writing = !1, _.writecb = null, _.length -= _.writelen, _.writelen = 0;
  }
  function se(_, k) {
    var O = _._writableState, K = O.sync, z = O.writecb;
    if (typeof z != "function") throw new E();
    if (ie(O), k) Ae(_, O, K, k, z);
    else {
      var Q = Z(O) || _.destroyed;
      !Q && !O.corked && !O.bufferProcessing && O.bufferedRequest && ge(_, O), K ? ue.nextTick(ye, _, O, Q, z) : ye(_, O, Q, z);
    }
  }
  function ye(_, k, O, K) {
    O || Be(_, k), k.pendingcb--, K(), P(_, k);
  }
  function Be(_, k) {
    k.length === 0 && k.needDrain && (k.needDrain = !1, _.emit("drain"));
  }
  function ge(_, k) {
    k.bufferProcessing = !0;
    var O = k.bufferedRequest;
    if (_._writev && O && O.next) {
      var K = k.bufferedRequestCount, z = new Array(K), Q = k.corkedRequestsFree;
      Q.entry = O;
      for (var m = 0, J = !0; O; )
        z[m] = O, O.isBuf || (J = !1), O = O.next, m += 1;
      z.allBuffers = J, ne(_, k, !0, k.length, z, "", Q.finish), k.pendingcb++, k.lastBufferedRequest = null, Q.next ? (k.corkedRequestsFree = Q.next, Q.next = null) : k.corkedRequestsFree = new r(k), k.bufferedRequestCount = 0;
    } else {
      for (; O; ) {
        var ee = O.chunk, le = O.encoding, C = O.callback, h = k.objectMode ? 1 : ee.length;
        if (ne(_, k, !1, h, ee, le, C), O = O.next, k.bufferedRequestCount--, k.writing)
          break;
      }
      O === null && (k.lastBufferedRequest = null);
    }
    k.bufferedRequest = O, k.bufferProcessing = !1;
  }
  T.prototype._write = function(_, k, O) {
    O(new I("_write()"));
  }, T.prototype._writev = null, T.prototype.end = function(_, k, O) {
    var K = this._writableState;
    return typeof _ == "function" ? (O = _, _ = null, k = null) : typeof k == "function" && (O = k, k = null), _ != null && this.write(_, k), K.corked && (K.corked = 1, this.uncork()), K.ending || N(this, K, O), this;
  }, Object.defineProperty(T.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function Z(_) {
    return _.ending && _.length === 0 && _.bufferedRequest === null && !_.finished && !_.writing;
  }
  function re(_, k) {
    _._final(function(O) {
      k.pendingcb--, O && F(_, O), k.prefinished = !0, _.emit("prefinish"), P(_, k);
    });
  }
  function M(_, k) {
    !k.prefinished && !k.finalCalled && (typeof _._final == "function" && !k.destroyed ? (k.pendingcb++, k.finalCalled = !0, ue.nextTick(re, _, k)) : (k.prefinished = !0, _.emit("prefinish")));
  }
  function P(_, k) {
    var O = Z(k);
    if (O && (M(_, k), k.pendingcb === 0 && (k.finished = !0, _.emit("finish"), k.autoDestroy))) {
      var K = _._readableState;
      (!K || K.autoDestroy && K.endEmitted) && _.destroy();
    }
    return O;
  }
  function N(_, k, O) {
    k.ending = !0, P(_, k), O && (k.finished ? ue.nextTick(O) : _.once("finish", O)), k.ended = !0, _.writable = !1;
  }
  function Y(_, k, O) {
    var K = _.entry;
    for (_.entry = null; K; ) {
      var z = K.callback;
      k.pendingcb--, z(O), K = K.next;
    }
    k.corkedRequestsFree.next = _;
  }
  return Object.defineProperty(T.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(k) {
      this._writableState && (this._writableState.destroyed = k);
    }
  }), T.prototype.destroy = c.destroy, T.prototype._undestroy = c.undestroy, T.prototype._destroy = function(_, k) {
    k(_);
  }, oi;
}
var ai, To;
function rr() {
  if (To) return ai;
  To = 1;
  var r = Object.keys || function(l) {
    var s = [];
    for (var p in l) s.push(p);
    return s;
  };
  ai = a;
  var e = cf(), t = ff();
  mt(a, e);
  for (var n = r(t.prototype), i = 0; i < n.length; i++) {
    var A = n[i];
    a.prototype[A] || (a.prototype[A] = t.prototype[A]);
  }
  function a(l) {
    if (!(this instanceof a)) return new a(l);
    e.call(this, l), t.call(this, l), this.allowHalfOpen = !0, l && (l.readable === !1 && (this.readable = !1), l.writable === !1 && (this.writable = !1), l.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", o)));
  }
  Object.defineProperty(a.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(a.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  }), Object.defineProperty(a.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function o() {
    this._writableState.ended || ue.nextTick(c, this);
  }
  function c(l) {
    l.end();
  }
  return Object.defineProperty(a.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(s) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = s, this._writableState.destroyed = s);
    }
  }), ai;
}
var si = {}, Tr = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var ko;
function qg() {
  return ko || (ko = 1, function(r, e) {
    var t = br, n = t.Buffer;
    function i(a, o) {
      for (var c in a)
        o[c] = a[c];
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? r.exports = t : (i(t, e), e.Buffer = A);
    function A(a, o, c) {
      return n(a, o, c);
    }
    A.prototype = Object.create(n.prototype), i(n, A), A.from = function(a, o, c) {
      if (typeof a == "number")
        throw new TypeError("Argument must not be a number");
      return n(a, o, c);
    }, A.alloc = function(a, o, c) {
      if (typeof a != "number")
        throw new TypeError("Argument must be a number");
      var l = n(a);
      return o !== void 0 ? typeof c == "string" ? l.fill(o, c) : l.fill(o) : l.fill(0), l;
    }, A.allocUnsafe = function(a) {
      if (typeof a != "number")
        throw new TypeError("Argument must be a number");
      return n(a);
    }, A.allocUnsafeSlow = function(a) {
      if (typeof a != "number")
        throw new TypeError("Argument must be a number");
      return t.SlowBuffer(a);
    };
  }(Tr, Tr.exports)), Tr.exports;
}
var Lo;
function Mo() {
  if (Lo) return si;
  Lo = 1;
  var r = qg().Buffer, e = r.isEncoding || function(w) {
    switch (w = "" + w, w && w.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function t(w) {
    if (!w) return "utf8";
    for (var b; ; )
      switch (w) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return w;
        default:
          if (b) return;
          w = ("" + w).toLowerCase(), b = !0;
      }
  }
  function n(w) {
    var b = t(w);
    if (typeof b != "string" && (r.isEncoding === e || !e(w))) throw new Error("Unknown encoding: " + w);
    return b || w;
  }
  si.StringDecoder = i;
  function i(w) {
    this.encoding = n(w);
    var b;
    switch (this.encoding) {
      case "utf16le":
        this.text = p, this.end = d, b = 4;
        break;
      case "utf8":
        this.fillLast = c, b = 4;
        break;
      case "base64":
        this.text = I, this.end = E, b = 3;
        break;
      default:
        this.write = x, this.end = v;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = r.allocUnsafe(b);
  }
  i.prototype.write = function(w) {
    if (w.length === 0) return "";
    var b, D;
    if (this.lastNeed) {
      if (b = this.fillLast(w), b === void 0) return "";
      D = this.lastNeed, this.lastNeed = 0;
    } else
      D = 0;
    return D < w.length ? b ? b + this.text(w, D) : this.text(w, D) : b || "";
  }, i.prototype.end = s, i.prototype.text = l, i.prototype.fillLast = function(w) {
    if (this.lastNeed <= w.length)
      return w.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    w.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, w.length), this.lastNeed -= w.length;
  };
  function A(w) {
    return w <= 127 ? 0 : w >> 5 === 6 ? 2 : w >> 4 === 14 ? 3 : w >> 3 === 30 ? 4 : w >> 6 === 2 ? -1 : -2;
  }
  function a(w, b, D) {
    var F = b.length - 1;
    if (F < D) return 0;
    var R = A(b[F]);
    return R >= 0 ? (R > 0 && (w.lastNeed = R - 1), R) : --F < D || R === -2 ? 0 : (R = A(b[F]), R >= 0 ? (R > 0 && (w.lastNeed = R - 2), R) : --F < D || R === -2 ? 0 : (R = A(b[F]), R >= 0 ? (R > 0 && (R === 2 ? R = 0 : w.lastNeed = R - 3), R) : 0));
  }
  function o(w, b, D) {
    if ((b[0] & 192) !== 128)
      return w.lastNeed = 0, "�";
    if (w.lastNeed > 1 && b.length > 1) {
      if ((b[1] & 192) !== 128)
        return w.lastNeed = 1, "�";
      if (w.lastNeed > 2 && b.length > 2 && (b[2] & 192) !== 128)
        return w.lastNeed = 2, "�";
    }
  }
  function c(w) {
    var b = this.lastTotal - this.lastNeed, D = o(this, w);
    if (D !== void 0) return D;
    if (this.lastNeed <= w.length)
      return w.copy(this.lastChar, b, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    w.copy(this.lastChar, b, 0, w.length), this.lastNeed -= w.length;
  }
  function l(w, b) {
    var D = a(this, w, b);
    if (!this.lastNeed) return w.toString("utf8", b);
    this.lastTotal = D;
    var F = w.length - (D - this.lastNeed);
    return w.copy(this.lastChar, 0, F), w.toString("utf8", b, F);
  }
  function s(w) {
    var b = w && w.length ? this.write(w) : "";
    return this.lastNeed ? b + "�" : b;
  }
  function p(w, b) {
    if ((w.length - b) % 2 === 0) {
      var D = w.toString("utf16le", b);
      if (D) {
        var F = D.charCodeAt(D.length - 1);
        if (F >= 55296 && F <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = w[w.length - 2], this.lastChar[1] = w[w.length - 1], D.slice(0, -1);
      }
      return D;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = w[w.length - 1], w.toString("utf16le", b, w.length - 1);
  }
  function d(w) {
    var b = w && w.length ? this.write(w) : "";
    if (this.lastNeed) {
      var D = this.lastTotal - this.lastNeed;
      return b + this.lastChar.toString("utf16le", 0, D);
    }
    return b;
  }
  function I(w, b) {
    var D = (w.length - b) % 3;
    return D === 0 ? w.toString("base64", b) : (this.lastNeed = 3 - D, this.lastTotal = 3, D === 1 ? this.lastChar[0] = w[w.length - 1] : (this.lastChar[0] = w[w.length - 2], this.lastChar[1] = w[w.length - 1]), w.toString("base64", b, w.length - D));
  }
  function E(w) {
    var b = w && w.length ? this.write(w) : "";
    return this.lastNeed ? b + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : b;
  }
  function x(w) {
    return w.toString(this.encoding);
  }
  function v(w) {
    return w && w.length ? this.write(w) : "";
  }
  return si;
}
var Uo = Lt.codes.ERR_STREAM_PREMATURE_CLOSE;
function Hg(r) {
  var e = !1;
  return function() {
    if (!e) {
      e = !0;
      for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++)
        n[i] = arguments[i];
      r.apply(this, n);
    }
  };
}
function jg() {
}
function Jg(r) {
  return r.setHeader && typeof r.abort == "function";
}
function lf(r, e, t) {
  if (typeof e == "function") return lf(r, null, e);
  e || (e = {}), t = Hg(t || jg);
  var n = e.readable || e.readable !== !1 && r.readable, i = e.writable || e.writable !== !1 && r.writable, A = function() {
    r.writable || o();
  }, a = r._writableState && r._writableState.finished, o = function() {
    i = !1, a = !0, n || t.call(r);
  }, c = r._readableState && r._readableState.endEmitted, l = function() {
    n = !1, c = !0, i || t.call(r);
  }, s = function(E) {
    t.call(r, E);
  }, p = function() {
    var E;
    if (n && !c)
      return (!r._readableState || !r._readableState.ended) && (E = new Uo()), t.call(r, E);
    if (i && !a)
      return (!r._writableState || !r._writableState.ended) && (E = new Uo()), t.call(r, E);
  }, d = function() {
    r.req.on("finish", o);
  };
  return Jg(r) ? (r.on("complete", o), r.on("abort", p), r.req ? d() : r.on("request", d)) : i && !r._writableState && (r.on("end", A), r.on("close", A)), r.on("end", l), r.on("finish", o), e.error !== !1 && r.on("error", s), r.on("close", p), function() {
    r.removeListener("complete", o), r.removeListener("abort", p), r.removeListener("request", d), r.req && r.req.removeListener("finish", o), r.removeListener("end", A), r.removeListener("close", A), r.removeListener("finish", o), r.removeListener("end", l), r.removeListener("error", s), r.removeListener("close", p);
  };
}
var NA = lf, fi, No;
function Yg() {
  if (No) return fi;
  No = 1;
  var r;
  function e(D, F, R) {
    return F = t(F), F in D ? Object.defineProperty(D, F, { value: R, enumerable: !0, configurable: !0, writable: !0 }) : D[F] = R, D;
  }
  function t(D) {
    var F = n(D, "string");
    return typeof F == "symbol" ? F : String(F);
  }
  function n(D, F) {
    if (typeof D != "object" || D === null) return D;
    var R = D[Symbol.toPrimitive];
    if (R !== void 0) {
      var L = R.call(D, F);
      if (typeof L != "object") return L;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (F === "string" ? String : Number)(D);
  }
  var i = NA, A = Symbol("lastResolve"), a = Symbol("lastReject"), o = Symbol("error"), c = Symbol("ended"), l = Symbol("lastPromise"), s = Symbol("handlePromise"), p = Symbol("stream");
  function d(D, F) {
    return {
      value: D,
      done: F
    };
  }
  function I(D) {
    var F = D[A];
    if (F !== null) {
      var R = D[p].read();
      R !== null && (D[l] = null, D[A] = null, D[a] = null, F(d(R, !1)));
    }
  }
  function E(D) {
    ue.nextTick(I, D);
  }
  function x(D, F) {
    return function(R, L) {
      D.then(function() {
        if (F[c]) {
          R(d(void 0, !0));
          return;
        }
        F[s](R, L);
      }, L);
    };
  }
  var v = Object.getPrototypeOf(function() {
  }), w = Object.setPrototypeOf((r = {
    get stream() {
      return this[p];
    },
    next: function() {
      var F = this, R = this[o];
      if (R !== null)
        return Promise.reject(R);
      if (this[c])
        return Promise.resolve(d(void 0, !0));
      if (this[p].destroyed)
        return new Promise(function(j, $) {
          ue.nextTick(function() {
            F[o] ? $(F[o]) : j(d(void 0, !0));
          });
        });
      var L = this[l], q;
      if (L)
        q = new Promise(x(L, this));
      else {
        var T = this[p].read();
        if (T !== null)
          return Promise.resolve(d(T, !1));
        q = new Promise(this[s]);
      }
      return this[l] = q, q;
    }
  }, e(r, Symbol.asyncIterator, function() {
    return this;
  }), e(r, "return", function() {
    var F = this;
    return new Promise(function(R, L) {
      F[p].destroy(null, function(q) {
        if (q) {
          L(q);
          return;
        }
        R(d(void 0, !0));
      });
    });
  }), r), v), b = function(F) {
    var R, L = Object.create(w, (R = {}, e(R, p, {
      value: F,
      writable: !0
    }), e(R, A, {
      value: null,
      writable: !0
    }), e(R, a, {
      value: null,
      writable: !0
    }), e(R, o, {
      value: null,
      writable: !0
    }), e(R, c, {
      value: F._readableState.endEmitted,
      writable: !0
    }), e(R, s, {
      value: function(T, j) {
        var $ = L[p].read();
        $ ? (L[l] = null, L[A] = null, L[a] = null, T(d($, !1))) : (L[A] = T, L[a] = j);
      },
      writable: !0
    }), R));
    return L[l] = null, i(F, function(q) {
      if (q && q.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var T = L[a];
        T !== null && (L[l] = null, L[A] = null, L[a] = null, T(q)), L[o] = q;
        return;
      }
      var j = L[A];
      j !== null && (L[l] = null, L[A] = null, L[a] = null, j(d(void 0, !0))), L[c] = !0;
    }), F.on("readable", E.bind(null, L)), L;
  };
  return fi = b, fi;
}
var li, Go;
function Kg() {
  return Go || (Go = 1, li = function() {
    throw new Error("Readable.from is not available in the browser");
  }), li;
}
var ci, Oo;
function cf() {
  if (Oo) return ci;
  Oo = 1, ci = j;
  var r;
  j.ReadableState = T, ks.EventEmitter;
  var e = function(m, J) {
    return m.listeners(J).length;
  }, t = Ls, n = br.Buffer, i = (typeof we < "u" ? we : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function A(Q) {
    return n.from(Q);
  }
  function a(Q) {
    return n.isBuffer(Q) || Q instanceof i;
  }
  var o = RA, c;
  o && o.debuglog ? c = o.debuglog("stream") : c = function() {
  };
  var l = Dg(), s = of, p = sf, d = p.getHighWaterMark, I = Lt.codes, E = I.ERR_INVALID_ARG_TYPE, x = I.ERR_STREAM_PUSH_AFTER_EOF, v = I.ERR_METHOD_NOT_IMPLEMENTED, w = I.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, b, D, F;
  mt(j, t);
  var R = s.errorOrDestroy, L = ["error", "close", "destroy", "pause", "resume"];
  function q(Q, m, J) {
    if (typeof Q.prependListener == "function") return Q.prependListener(m, J);
    !Q._events || !Q._events[m] ? Q.on(m, J) : Array.isArray(Q._events[m]) ? Q._events[m].unshift(J) : Q._events[m] = [J, Q._events[m]];
  }
  function T(Q, m, J) {
    r = r || rr(), Q = Q || {}, typeof J != "boolean" && (J = m instanceof r), this.objectMode = !!Q.objectMode, J && (this.objectMode = this.objectMode || !!Q.readableObjectMode), this.highWaterMark = d(this, Q, "readableHighWaterMark", J), this.buffer = new l(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = Q.emitClose !== !1, this.autoDestroy = !!Q.autoDestroy, this.destroyed = !1, this.defaultEncoding = Q.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, Q.encoding && (b || (b = Mo().StringDecoder), this.decoder = new b(Q.encoding), this.encoding = Q.encoding);
  }
  function j(Q) {
    if (r = r || rr(), !(this instanceof j)) return new j(Q);
    var m = this instanceof r;
    this._readableState = new T(Q, this, m), this.readable = !0, Q && (typeof Q.read == "function" && (this._read = Q.read), typeof Q.destroy == "function" && (this._destroy = Q.destroy)), t.call(this);
  }
  Object.defineProperty(j.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(m) {
      this._readableState && (this._readableState.destroyed = m);
    }
  }), j.prototype.destroy = s.destroy, j.prototype._undestroy = s.undestroy, j.prototype._destroy = function(Q, m) {
    m(Q);
  }, j.prototype.push = function(Q, m) {
    var J = this._readableState, ee;
    return J.objectMode ? ee = !0 : typeof Q == "string" && (m = m || J.defaultEncoding, m !== J.encoding && (Q = n.from(Q, m), m = ""), ee = !0), $(this, Q, m, !1, ee);
  }, j.prototype.unshift = function(Q) {
    return $(this, Q, null, !0, !1);
  };
  function $(Q, m, J, ee, le) {
    c("readableAddChunk", m);
    var C = Q._readableState;
    if (m === null)
      C.reading = !1, se(Q, C);
    else {
      var h;
      if (le || (h = oe(C, m)), h)
        R(Q, h);
      else if (C.objectMode || m && m.length > 0)
        if (typeof m != "string" && !C.objectMode && Object.getPrototypeOf(m) !== n.prototype && (m = A(m)), ee)
          C.endEmitted ? R(Q, new w()) : te(Q, C, m, !0);
        else if (C.ended)
          R(Q, new x());
        else {
          if (C.destroyed)
            return !1;
          C.reading = !1, C.decoder && !J ? (m = C.decoder.write(m), C.objectMode || m.length !== 0 ? te(Q, C, m, !1) : ge(Q, C)) : te(Q, C, m, !1);
        }
      else ee || (C.reading = !1, ge(Q, C));
    }
    return !C.ended && (C.length < C.highWaterMark || C.length === 0);
  }
  function te(Q, m, J, ee) {
    m.flowing && m.length === 0 && !m.sync ? (m.awaitDrain = 0, Q.emit("data", J)) : (m.length += m.objectMode ? 1 : J.length, ee ? m.buffer.unshift(J) : m.buffer.push(J), m.needReadable && ye(Q)), ge(Q, m);
  }
  function oe(Q, m) {
    var J;
    return !a(m) && typeof m != "string" && m !== void 0 && !Q.objectMode && (J = new E("chunk", ["string", "Buffer", "Uint8Array"], m)), J;
  }
  j.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, j.prototype.setEncoding = function(Q) {
    b || (b = Mo().StringDecoder);
    var m = new b(Q);
    this._readableState.decoder = m, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var J = this._readableState.buffer.head, ee = ""; J !== null; )
      ee += m.write(J.data), J = J.next;
    return this._readableState.buffer.clear(), ee !== "" && this._readableState.buffer.push(ee), this._readableState.length = ee.length, this;
  };
  var ne = 1073741824;
  function Ae(Q) {
    return Q >= ne ? Q = ne : (Q--, Q |= Q >>> 1, Q |= Q >>> 2, Q |= Q >>> 4, Q |= Q >>> 8, Q |= Q >>> 16, Q++), Q;
  }
  function ie(Q, m) {
    return Q <= 0 || m.length === 0 && m.ended ? 0 : m.objectMode ? 1 : Q !== Q ? m.flowing && m.length ? m.buffer.head.data.length : m.length : (Q > m.highWaterMark && (m.highWaterMark = Ae(Q)), Q <= m.length ? Q : m.ended ? m.length : (m.needReadable = !0, 0));
  }
  j.prototype.read = function(Q) {
    c("read", Q), Q = parseInt(Q, 10);
    var m = this._readableState, J = Q;
    if (Q !== 0 && (m.emittedReadable = !1), Q === 0 && m.needReadable && ((m.highWaterMark !== 0 ? m.length >= m.highWaterMark : m.length > 0) || m.ended))
      return c("read: emitReadable", m.length, m.ended), m.length === 0 && m.ended ? O(this) : ye(this), null;
    if (Q = ie(Q, m), Q === 0 && m.ended)
      return m.length === 0 && O(this), null;
    var ee = m.needReadable;
    c("need readable", ee), (m.length === 0 || m.length - Q < m.highWaterMark) && (ee = !0, c("length less than watermark", ee)), m.ended || m.reading ? (ee = !1, c("reading or ended", ee)) : ee && (c("do read"), m.reading = !0, m.sync = !0, m.length === 0 && (m.needReadable = !0), this._read(m.highWaterMark), m.sync = !1, m.reading || (Q = ie(J, m)));
    var le;
    return Q > 0 ? le = k(Q, m) : le = null, le === null ? (m.needReadable = m.length <= m.highWaterMark, Q = 0) : (m.length -= Q, m.awaitDrain = 0), m.length === 0 && (m.ended || (m.needReadable = !0), J !== Q && m.ended && O(this)), le !== null && this.emit("data", le), le;
  };
  function se(Q, m) {
    if (c("onEofChunk"), !m.ended) {
      if (m.decoder) {
        var J = m.decoder.end();
        J && J.length && (m.buffer.push(J), m.length += m.objectMode ? 1 : J.length);
      }
      m.ended = !0, m.sync ? ye(Q) : (m.needReadable = !1, m.emittedReadable || (m.emittedReadable = !0, Be(Q)));
    }
  }
  function ye(Q) {
    var m = Q._readableState;
    c("emitReadable", m.needReadable, m.emittedReadable), m.needReadable = !1, m.emittedReadable || (c("emitReadable", m.flowing), m.emittedReadable = !0, ue.nextTick(Be, Q));
  }
  function Be(Q) {
    var m = Q._readableState;
    c("emitReadable_", m.destroyed, m.length, m.ended), !m.destroyed && (m.length || m.ended) && (Q.emit("readable"), m.emittedReadable = !1), m.needReadable = !m.flowing && !m.ended && m.length <= m.highWaterMark, _(Q);
  }
  function ge(Q, m) {
    m.readingMore || (m.readingMore = !0, ue.nextTick(Z, Q, m));
  }
  function Z(Q, m) {
    for (; !m.reading && !m.ended && (m.length < m.highWaterMark || m.flowing && m.length === 0); ) {
      var J = m.length;
      if (c("maybeReadMore read 0"), Q.read(0), J === m.length)
        break;
    }
    m.readingMore = !1;
  }
  j.prototype._read = function(Q) {
    R(this, new v("_read()"));
  }, j.prototype.pipe = function(Q, m) {
    var J = this, ee = this._readableState;
    switch (ee.pipesCount) {
      case 0:
        ee.pipes = Q;
        break;
      case 1:
        ee.pipes = [ee.pipes, Q];
        break;
      default:
        ee.pipes.push(Q);
        break;
    }
    ee.pipesCount += 1, c("pipe count=%d opts=%j", ee.pipesCount, m);
    var le = (!m || m.end !== !1) && Q !== ue.stdout && Q !== ue.stderr, C = le ? g : ve;
    ee.endEmitted ? ue.nextTick(C) : J.once("end", C), Q.on("unpipe", h);
    function h(Ce, Me) {
      c("onunpipe"), Ce === J && Me && Me.hasUnpiped === !1 && (Me.hasUnpiped = !0, V());
    }
    function g() {
      c("onend"), Q.end();
    }
    var y = re(J);
    Q.on("drain", y);
    var G = !1;
    function V() {
      c("cleanup"), Q.removeListener("close", Ie), Q.removeListener("finish", he), Q.removeListener("drain", y), Q.removeListener("error", ce), Q.removeListener("unpipe", h), J.removeListener("end", g), J.removeListener("end", ve), J.removeListener("data", X), G = !0, ee.awaitDrain && (!Q._writableState || Q._writableState.needDrain) && y();
    }
    J.on("data", X);
    function X(Ce) {
      c("ondata");
      var Me = Q.write(Ce);
      c("dest.write", Me), Me === !1 && ((ee.pipesCount === 1 && ee.pipes === Q || ee.pipesCount > 1 && z(ee.pipes, Q) !== -1) && !G && (c("false write response, pause", ee.awaitDrain), ee.awaitDrain++), J.pause());
    }
    function ce(Ce) {
      c("onerror", Ce), ve(), Q.removeListener("error", ce), e(Q, "error") === 0 && R(Q, Ce);
    }
    q(Q, "error", ce);
    function Ie() {
      Q.removeListener("finish", he), ve();
    }
    Q.once("close", Ie);
    function he() {
      c("onfinish"), Q.removeListener("close", Ie), ve();
    }
    Q.once("finish", he);
    function ve() {
      c("unpipe"), J.unpipe(Q);
    }
    return Q.emit("pipe", J), ee.flowing || (c("pipe resume"), J.resume()), Q;
  };
  function re(Q) {
    return function() {
      var J = Q._readableState;
      c("pipeOnDrain", J.awaitDrain), J.awaitDrain && J.awaitDrain--, J.awaitDrain === 0 && e(Q, "data") && (J.flowing = !0, _(Q));
    };
  }
  j.prototype.unpipe = function(Q) {
    var m = this._readableState, J = {
      hasUnpiped: !1
    };
    if (m.pipesCount === 0) return this;
    if (m.pipesCount === 1)
      return Q && Q !== m.pipes ? this : (Q || (Q = m.pipes), m.pipes = null, m.pipesCount = 0, m.flowing = !1, Q && Q.emit("unpipe", this, J), this);
    if (!Q) {
      var ee = m.pipes, le = m.pipesCount;
      m.pipes = null, m.pipesCount = 0, m.flowing = !1;
      for (var C = 0; C < le; C++) ee[C].emit("unpipe", this, {
        hasUnpiped: !1
      });
      return this;
    }
    var h = z(m.pipes, Q);
    return h === -1 ? this : (m.pipes.splice(h, 1), m.pipesCount -= 1, m.pipesCount === 1 && (m.pipes = m.pipes[0]), Q.emit("unpipe", this, J), this);
  }, j.prototype.on = function(Q, m) {
    var J = t.prototype.on.call(this, Q, m), ee = this._readableState;
    return Q === "data" ? (ee.readableListening = this.listenerCount("readable") > 0, ee.flowing !== !1 && this.resume()) : Q === "readable" && !ee.endEmitted && !ee.readableListening && (ee.readableListening = ee.needReadable = !0, ee.flowing = !1, ee.emittedReadable = !1, c("on readable", ee.length, ee.reading), ee.length ? ye(this) : ee.reading || ue.nextTick(P, this)), J;
  }, j.prototype.addListener = j.prototype.on, j.prototype.removeListener = function(Q, m) {
    var J = t.prototype.removeListener.call(this, Q, m);
    return Q === "readable" && ue.nextTick(M, this), J;
  }, j.prototype.removeAllListeners = function(Q) {
    var m = t.prototype.removeAllListeners.apply(this, arguments);
    return (Q === "readable" || Q === void 0) && ue.nextTick(M, this), m;
  };
  function M(Q) {
    var m = Q._readableState;
    m.readableListening = Q.listenerCount("readable") > 0, m.resumeScheduled && !m.paused ? m.flowing = !0 : Q.listenerCount("data") > 0 && Q.resume();
  }
  function P(Q) {
    c("readable nexttick read 0"), Q.read(0);
  }
  j.prototype.resume = function() {
    var Q = this._readableState;
    return Q.flowing || (c("resume"), Q.flowing = !Q.readableListening, N(this, Q)), Q.paused = !1, this;
  };
  function N(Q, m) {
    m.resumeScheduled || (m.resumeScheduled = !0, ue.nextTick(Y, Q, m));
  }
  function Y(Q, m) {
    c("resume", m.reading), m.reading || Q.read(0), m.resumeScheduled = !1, Q.emit("resume"), _(Q), m.flowing && !m.reading && Q.read(0);
  }
  j.prototype.pause = function() {
    return c("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (c("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function _(Q) {
    var m = Q._readableState;
    for (c("flow", m.flowing); m.flowing && Q.read() !== null; ) ;
  }
  j.prototype.wrap = function(Q) {
    var m = this, J = this._readableState, ee = !1;
    Q.on("end", function() {
      if (c("wrapped end"), J.decoder && !J.ended) {
        var h = J.decoder.end();
        h && h.length && m.push(h);
      }
      m.push(null);
    }), Q.on("data", function(h) {
      if (c("wrapped data"), J.decoder && (h = J.decoder.write(h)), !(J.objectMode && h == null) && !(!J.objectMode && (!h || !h.length))) {
        var g = m.push(h);
        g || (ee = !0, Q.pause());
      }
    });
    for (var le in Q)
      this[le] === void 0 && typeof Q[le] == "function" && (this[le] = /* @__PURE__ */ function(g) {
        return function() {
          return Q[g].apply(Q, arguments);
        };
      }(le));
    for (var C = 0; C < L.length; C++)
      Q.on(L[C], this.emit.bind(this, L[C]));
    return this._read = function(h) {
      c("wrapped _read", h), ee && (ee = !1, Q.resume());
    }, this;
  }, typeof Symbol == "function" && (j.prototype[Symbol.asyncIterator] = function() {
    return D === void 0 && (D = Yg()), D(this);
  }), Object.defineProperty(j.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(j.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(j.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(m) {
      this._readableState && (this._readableState.flowing = m);
    }
  }), j._fromList = k, Object.defineProperty(j.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function k(Q, m) {
    if (m.length === 0) return null;
    var J;
    return m.objectMode ? J = m.buffer.shift() : !Q || Q >= m.length ? (m.decoder ? J = m.buffer.join("") : m.buffer.length === 1 ? J = m.buffer.first() : J = m.buffer.concat(m.length), m.buffer.clear()) : J = m.buffer.consume(Q, m.decoder), J;
  }
  function O(Q) {
    var m = Q._readableState;
    c("endReadable", m.endEmitted), m.endEmitted || (m.ended = !0, ue.nextTick(K, m, Q));
  }
  function K(Q, m) {
    if (c("endReadableNT", Q.endEmitted, Q.length), !Q.endEmitted && Q.length === 0 && (Q.endEmitted = !0, m.readable = !1, m.emit("end"), Q.autoDestroy)) {
      var J = m._writableState;
      (!J || J.autoDestroy && J.finished) && m.destroy();
    }
  }
  typeof Symbol == "function" && (j.from = function(Q, m) {
    return F === void 0 && (F = Kg()), F(j, Q, m);
  });
  function z(Q, m) {
    for (var J = 0, ee = Q.length; J < ee; J++)
      if (Q[J] === m) return J;
    return -1;
  }
  return ci;
}
var uf = gt, Sn = Lt.codes, Wg = Sn.ERR_METHOD_NOT_IMPLEMENTED, Vg = Sn.ERR_MULTIPLE_CALLBACK, $g = Sn.ERR_TRANSFORM_ALREADY_TRANSFORMING, zg = Sn.ERR_TRANSFORM_WITH_LENGTH_0, xn = rr();
mt(gt, xn);
function Xg(r, e) {
  var t = this._transformState;
  t.transforming = !1;
  var n = t.writecb;
  if (n === null)
    return this.emit("error", new Vg());
  t.writechunk = null, t.writecb = null, e != null && this.push(e), n(r);
  var i = this._readableState;
  i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
}
function gt(r) {
  if (!(this instanceof gt)) return new gt(r);
  xn.call(this, r), this._transformState = {
    afterTransform: Xg.bind(this),
    needTransform: !1,
    transforming: !1,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }, this._readableState.needReadable = !0, this._readableState.sync = !1, r && (typeof r.transform == "function" && (this._transform = r.transform), typeof r.flush == "function" && (this._flush = r.flush)), this.on("prefinish", Zg);
}
function Zg() {
  var r = this;
  typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(e, t) {
    Po(r, e, t);
  }) : Po(this, null, null);
}
gt.prototype.push = function(r, e) {
  return this._transformState.needTransform = !1, xn.prototype.push.call(this, r, e);
};
gt.prototype._transform = function(r, e, t) {
  t(new Wg("_transform()"));
};
gt.prototype._write = function(r, e, t) {
  var n = this._transformState;
  if (n.writecb = t, n.writechunk = r, n.writeencoding = e, !n.transforming) {
    var i = this._readableState;
    (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
  }
};
gt.prototype._read = function(r) {
  var e = this._transformState;
  e.writechunk !== null && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0;
};
gt.prototype._destroy = function(r, e) {
  xn.prototype._destroy.call(this, r, function(t) {
    e(t);
  });
};
function Po(r, e, t) {
  if (e) return r.emit("error", e);
  if (t != null && r.push(t), r._writableState.length) throw new zg();
  if (r._transformState.transforming) throw new $g();
  return r.push(null);
}
var e0 = Cr, hf = uf;
mt(Cr, hf);
function Cr(r) {
  if (!(this instanceof Cr)) return new Cr(r);
  hf.call(this, r);
}
Cr.prototype._transform = function(r, e, t) {
  t(null, r);
};
var ui;
function t0(r) {
  var e = !1;
  return function() {
    e || (e = !0, r.apply(void 0, arguments));
  };
}
var gf = Lt.codes, r0 = gf.ERR_MISSING_ARGS, n0 = gf.ERR_STREAM_DESTROYED;
function qo(r) {
  if (r) throw r;
}
function i0(r) {
  return r.setHeader && typeof r.abort == "function";
}
function A0(r, e, t, n) {
  n = t0(n);
  var i = !1;
  r.on("close", function() {
    i = !0;
  }), ui === void 0 && (ui = NA), ui(r, {
    readable: e,
    writable: t
  }, function(a) {
    if (a) return n(a);
    i = !0, n();
  });
  var A = !1;
  return function(a) {
    if (!i && !A) {
      if (A = !0, i0(r)) return r.abort();
      if (typeof r.destroy == "function") return r.destroy();
      n(a || new n0("pipe"));
    }
  };
}
function Ho(r) {
  r();
}
function o0(r, e) {
  return r.pipe(e);
}
function a0(r) {
  return !r.length || typeof r[r.length - 1] != "function" ? qo : r.pop();
}
function s0() {
  for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++)
    e[t] = arguments[t];
  var n = a0(e);
  if (Array.isArray(e[0]) && (e = e[0]), e.length < 2)
    throw new r0("streams");
  var i, A = e.map(function(a, o) {
    var c = o < e.length - 1, l = o > 0;
    return A0(a, c, l, function(s) {
      i || (i = s), s && A.forEach(Ho), !c && (A.forEach(Ho), n(i));
    });
  });
  return e.reduce(o0);
}
var f0 = s0;
(function(r, e) {
  e = r.exports = cf(), e.Stream = e, e.Readable = e, e.Writable = ff(), e.Duplex = rr(), e.Transform = uf, e.PassThrough = e0, e.finished = NA, e.pipeline = f0;
})(Pi, Pi.exports);
var df = Pi.exports, jo = xA, l0 = mt, pf = df, kr = Bn.readyStates = {
  UNSENT: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4
}, GA = Bn.IncomingMessage = function(r, e, t, n) {
  var i = this;
  if (pf.Readable.call(i), i._mode = t, i.headers = {}, i.rawHeaders = [], i.trailers = {}, i.rawTrailers = [], i.on("end", function() {
    ue.nextTick(function() {
      i.emit("close");
    });
  }), t === "fetch") {
    let s = function() {
      a.read().then(function(p) {
        if (!i._destroyed) {
          if (n(p.done), p.done) {
            i.push(null);
            return;
          }
          i.push(ut.from(p.value)), s();
        }
      }).catch(function(p) {
        n(!0), i._destroyed || i.emit("error", p);
      });
    };
    if (i._fetchResponse = e, i.url = e.url, i.statusCode = e.status, i.statusMessage = e.statusText, e.headers.forEach(function(p, d) {
      i.headers[d.toLowerCase()] = p, i.rawHeaders.push(d, p);
    }), jo.writableStream) {
      var A = new WritableStream({
        write: function(p) {
          return n(!1), new Promise(function(d, I) {
            i._destroyed ? I() : i.push(ut.from(p)) ? d() : i._resumeFetch = d;
          });
        },
        close: function() {
          n(!0), i._destroyed || i.push(null);
        },
        abort: function(p) {
          n(!0), i._destroyed || i.emit("error", p);
        }
      });
      try {
        e.body.pipeTo(A).catch(function(p) {
          n(!0), i._destroyed || i.emit("error", p);
        });
        return;
      } catch {
      }
    }
    var a = e.body.getReader();
    s();
  } else {
    i._xhr = r, i._pos = 0, i.url = r.responseURL, i.statusCode = r.status, i.statusMessage = r.statusText;
    var o = r.getAllResponseHeaders().split(/\r?\n/);
    if (o.forEach(function(s) {
      var p = s.match(/^([^:]+):\s*(.*)/);
      if (p) {
        var d = p[1].toLowerCase();
        d === "set-cookie" ? (i.headers[d] === void 0 && (i.headers[d] = []), i.headers[d].push(p[2])) : i.headers[d] !== void 0 ? i.headers[d] += ", " + p[2] : i.headers[d] = p[2], i.rawHeaders.push(p[1], p[2]);
      }
    }), i._charset = "x-user-defined", !jo.overrideMimeType) {
      var c = i.rawHeaders["mime-type"];
      if (c) {
        var l = c.match(/;\s*charset=([^;])(;|$)/);
        l && (i._charset = l[1].toLowerCase());
      }
      i._charset || (i._charset = "utf-8");
    }
  }
};
l0(GA, pf.Readable);
GA.prototype._read = function() {
  var r = this, e = r._resumeFetch;
  e && (r._resumeFetch = null, e());
};
GA.prototype._onXHRProgress = function(r) {
  var e = this, t = e._xhr, n = null;
  switch (e._mode) {
    case "text":
      if (n = t.responseText, n.length > e._pos) {
        var i = n.substr(e._pos);
        if (e._charset === "x-user-defined") {
          for (var A = ut.alloc(i.length), a = 0; a < i.length; a++)
            A[a] = i.charCodeAt(a) & 255;
          e.push(A);
        } else
          e.push(i, e._charset);
        e._pos = n.length;
      }
      break;
    case "arraybuffer":
      if (t.readyState !== kr.DONE || !t.response)
        break;
      n = t.response, e.push(ut.from(new Uint8Array(n)));
      break;
    case "moz-chunked-arraybuffer":
      if (n = t.response, t.readyState !== kr.LOADING || !n)
        break;
      e.push(ut.from(new Uint8Array(n)));
      break;
    case "ms-stream":
      if (n = t.response, t.readyState !== kr.LOADING)
        break;
      var o = new we.MSStreamReader();
      o.onprogress = function() {
        o.result.byteLength > e._pos && (e.push(ut.from(new Uint8Array(o.result.slice(e._pos)))), e._pos = o.result.byteLength);
      }, o.onload = function() {
        r(!0), e.push(null);
      }, o.readAsArrayBuffer(n);
      break;
  }
  e._xhr.readyState === kr.DONE && e._mode !== "ms-stream" && (r(!0), e.push(null));
};
var Ft = xA, c0 = mt, If = Bn, OA = df, u0 = If.IncomingMessage, Jo = If.readyStates;
function h0(r, e) {
  return Ft.fetch && e ? "fetch" : Ft.mozchunkedarraybuffer ? "moz-chunked-arraybuffer" : Ft.msstream ? "ms-stream" : Ft.arraybuffer && r ? "arraybuffer" : "text";
}
var Pe = bs.exports = function(r) {
  var e = this;
  OA.Writable.call(e), e._opts = r, e._body = [], e._headers = {}, r.auth && e.setHeader("Authorization", "Basic " + ut.from(r.auth).toString("base64")), Object.keys(r.headers).forEach(function(i) {
    e.setHeader(i, r.headers[i]);
  });
  var t, n = !0;
  if (r.mode === "disable-fetch" || "requestTimeout" in r && !Ft.abortController)
    n = !1, t = !0;
  else if (r.mode === "prefer-streaming")
    t = !1;
  else if (r.mode === "allow-wrong-content-type")
    t = !Ft.overrideMimeType;
  else if (!r.mode || r.mode === "default" || r.mode === "prefer-fast")
    t = !0;
  else
    throw new Error("Invalid value for opts.mode");
  e._mode = h0(t, n), e._fetchTimer = null, e._socketTimeout = null, e._socketTimer = null, e.on("finish", function() {
    e._onFinish();
  });
};
c0(Pe, OA.Writable);
Pe.prototype.setHeader = function(r, e) {
  var t = this, n = r.toLowerCase();
  d0.indexOf(n) === -1 && (t._headers[n] = {
    name: r,
    value: e
  });
};
Pe.prototype.getHeader = function(r) {
  var e = this._headers[r.toLowerCase()];
  return e ? e.value : null;
};
Pe.prototype.removeHeader = function(r) {
  var e = this;
  delete e._headers[r.toLowerCase()];
};
Pe.prototype._onFinish = function() {
  var r = this;
  if (!r._destroyed) {
    var e = r._opts;
    "timeout" in e && e.timeout !== 0 && r.setTimeout(e.timeout);
    var t = r._headers, n = null;
    e.method !== "GET" && e.method !== "HEAD" && (n = new Blob(r._body, {
      type: (t["content-type"] || {}).value || ""
    }));
    var i = [];
    if (Object.keys(t).forEach(function(c) {
      var l = t[c].name, s = t[c].value;
      Array.isArray(s) ? s.forEach(function(p) {
        i.push([l, p]);
      }) : i.push([l, s]);
    }), r._mode === "fetch") {
      var A = null;
      if (Ft.abortController) {
        var a = new AbortController();
        A = a.signal, r._fetchAbortController = a, "requestTimeout" in e && e.requestTimeout !== 0 && (r._fetchTimer = we.setTimeout(function() {
          r.emit("requestTimeout"), r._fetchAbortController && r._fetchAbortController.abort();
        }, e.requestTimeout));
      }
      we.fetch(r._opts.url, {
        method: r._opts.method,
        headers: i,
        body: n || void 0,
        mode: "cors",
        credentials: e.withCredentials ? "include" : "same-origin",
        signal: A
      }).then(function(c) {
        r._fetchResponse = c, r._resetTimers(!1), r._connect();
      }, function(c) {
        r._resetTimers(!0), r._destroyed || r.emit("error", c);
      });
    } else {
      var o = r._xhr = new we.XMLHttpRequest();
      try {
        o.open(r._opts.method, r._opts.url, !0);
      } catch (c) {
        ue.nextTick(function() {
          r.emit("error", c);
        });
        return;
      }
      "responseType" in o && (o.responseType = r._mode), "withCredentials" in o && (o.withCredentials = !!e.withCredentials), r._mode === "text" && "overrideMimeType" in o && o.overrideMimeType("text/plain; charset=x-user-defined"), "requestTimeout" in e && (o.timeout = e.requestTimeout, o.ontimeout = function() {
        r.emit("requestTimeout");
      }), i.forEach(function(c) {
        o.setRequestHeader(c[0], c[1]);
      }), r._response = null, o.onreadystatechange = function() {
        switch (o.readyState) {
          case Jo.LOADING:
          case Jo.DONE:
            r._onXHRProgress();
            break;
        }
      }, r._mode === "moz-chunked-arraybuffer" && (o.onprogress = function() {
        r._onXHRProgress();
      }), o.onerror = function() {
        r._destroyed || (r._resetTimers(!0), r.emit("error", new Error("XHR error")));
      };
      try {
        o.send(n);
      } catch (c) {
        ue.nextTick(function() {
          r.emit("error", c);
        });
        return;
      }
    }
  }
};
function g0(r) {
  try {
    var e = r.status;
    return e !== null && e !== 0;
  } catch {
    return !1;
  }
}
Pe.prototype._onXHRProgress = function() {
  var r = this;
  r._resetTimers(!1), !(!g0(r._xhr) || r._destroyed) && (r._response || r._connect(), r._response._onXHRProgress(r._resetTimers.bind(r)));
};
Pe.prototype._connect = function() {
  var r = this;
  r._destroyed || (r._response = new u0(r._xhr, r._fetchResponse, r._mode, r._resetTimers.bind(r)), r._response.on("error", function(e) {
    r.emit("error", e);
  }), r.emit("response", r._response));
};
Pe.prototype._write = function(r, e, t) {
  var n = this;
  n._body.push(r), t();
};
Pe.prototype._resetTimers = function(r) {
  var e = this;
  we.clearTimeout(e._socketTimer), e._socketTimer = null, r ? (we.clearTimeout(e._fetchTimer), e._fetchTimer = null) : e._socketTimeout && (e._socketTimer = we.setTimeout(function() {
    e.emit("timeout");
  }, e._socketTimeout));
};
Pe.prototype.abort = Pe.prototype.destroy = function(r) {
  var e = this;
  e._destroyed = !0, e._resetTimers(!0), e._response && (e._response._destroyed = !0), e._xhr ? e._xhr.abort() : e._fetchAbortController && e._fetchAbortController.abort(), r && e.emit("error", r);
};
Pe.prototype.end = function(r, e, t) {
  var n = this;
  typeof r == "function" && (t = r, r = void 0), OA.Writable.prototype.end.call(n, r, e, t);
};
Pe.prototype.setTimeout = function(r, e) {
  var t = this;
  e && t.once("timeout", e), t._socketTimeout = r, t._resetTimers(!1);
};
Pe.prototype.flushHeaders = function() {
};
Pe.prototype.setNoDelay = function() {
};
Pe.prototype.setSocketKeepAlive = function() {
};
var d0 = [
  "accept-charset",
  "accept-encoding",
  "access-control-request-headers",
  "access-control-request-method",
  "connection",
  "content-length",
  "cookie",
  "cookie2",
  "date",
  "dnt",
  "expect",
  "host",
  "keep-alive",
  "origin",
  "referer",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "via"
], p0 = bs.exports, I0 = E0, y0 = Object.prototype.hasOwnProperty;
function E0() {
  for (var r = {}, e = 0; e < arguments.length; e++) {
    var t = arguments[e];
    for (var n in t)
      y0.call(t, n) && (r[n] = t[n]);
  }
  return r;
}
var B0 = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Unordered Collection",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  509: "Bandwidth Limit Exceeded",
  510: "Not Extended",
  511: "Network Authentication Required"
}, hn = { exports: {} };
/*! https://mths.be/punycode v1.4.1 by @mathias */
hn.exports;
(function(r, e) {
  (function(t) {
    var n = e && !e.nodeType && e, i = r && !r.nodeType && r, A = typeof we == "object" && we;
    (A.global === A || A.window === A || A.self === A) && (t = A);
    var a, o = 2147483647, c = 36, l = 1, s = 26, p = 38, d = 700, I = 72, E = 128, x = "-", v = /^xn--/, w = /[^\x20-\x7E]/, b = /[\x2E\u3002\uFF0E\uFF61]/g, D = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, F = c - l, R = Math.floor, L = String.fromCharCode, q;
    function T(Z) {
      throw new RangeError(D[Z]);
    }
    function j(Z, re) {
      for (var M = Z.length, P = []; M--; )
        P[M] = re(Z[M]);
      return P;
    }
    function $(Z, re) {
      var M = Z.split("@"), P = "";
      M.length > 1 && (P = M[0] + "@", Z = M[1]), Z = Z.replace(b, ".");
      var N = Z.split("."), Y = j(N, re).join(".");
      return P + Y;
    }
    function te(Z) {
      for (var re = [], M = 0, P = Z.length, N, Y; M < P; )
        N = Z.charCodeAt(M++), N >= 55296 && N <= 56319 && M < P ? (Y = Z.charCodeAt(M++), (Y & 64512) == 56320 ? re.push(((N & 1023) << 10) + (Y & 1023) + 65536) : (re.push(N), M--)) : re.push(N);
      return re;
    }
    function oe(Z) {
      return j(Z, function(re) {
        var M = "";
        return re > 65535 && (re -= 65536, M += L(re >>> 10 & 1023 | 55296), re = 56320 | re & 1023), M += L(re), M;
      }).join("");
    }
    function ne(Z) {
      return Z - 48 < 10 ? Z - 22 : Z - 65 < 26 ? Z - 65 : Z - 97 < 26 ? Z - 97 : c;
    }
    function Ae(Z, re) {
      return Z + 22 + 75 * (Z < 26) - ((re != 0) << 5);
    }
    function ie(Z, re, M) {
      var P = 0;
      for (Z = M ? R(Z / d) : Z >> 1, Z += R(Z / re); Z > F * s >> 1; P += c)
        Z = R(Z / F);
      return R(P + (F + 1) * Z / (Z + p));
    }
    function se(Z) {
      var re = [], M = Z.length, P, N = 0, Y = E, _ = I, k, O, K, z, Q, m, J, ee, le;
      for (k = Z.lastIndexOf(x), k < 0 && (k = 0), O = 0; O < k; ++O)
        Z.charCodeAt(O) >= 128 && T("not-basic"), re.push(Z.charCodeAt(O));
      for (K = k > 0 ? k + 1 : 0; K < M; ) {
        for (z = N, Q = 1, m = c; K >= M && T("invalid-input"), J = ne(Z.charCodeAt(K++)), (J >= c || J > R((o - N) / Q)) && T("overflow"), N += J * Q, ee = m <= _ ? l : m >= _ + s ? s : m - _, !(J < ee); m += c)
          le = c - ee, Q > R(o / le) && T("overflow"), Q *= le;
        P = re.length + 1, _ = ie(N - z, P, z == 0), R(N / P) > o - Y && T("overflow"), Y += R(N / P), N %= P, re.splice(N++, 0, Y);
      }
      return oe(re);
    }
    function ye(Z) {
      var re, M, P, N, Y, _, k, O, K, z, Q, m = [], J, ee, le, C;
      for (Z = te(Z), J = Z.length, re = E, M = 0, Y = I, _ = 0; _ < J; ++_)
        Q = Z[_], Q < 128 && m.push(L(Q));
      for (P = N = m.length, N && m.push(x); P < J; ) {
        for (k = o, _ = 0; _ < J; ++_)
          Q = Z[_], Q >= re && Q < k && (k = Q);
        for (ee = P + 1, k - re > R((o - M) / ee) && T("overflow"), M += (k - re) * ee, re = k, _ = 0; _ < J; ++_)
          if (Q = Z[_], Q < re && ++M > o && T("overflow"), Q == re) {
            for (O = M, K = c; z = K <= Y ? l : K >= Y + s ? s : K - Y, !(O < z); K += c)
              C = O - z, le = c - z, m.push(
                L(Ae(z + C % le, 0))
              ), O = R(C / le);
            m.push(L(Ae(O, 0))), Y = ie(M, ee, P == N), M = 0, ++P;
          }
        ++M, ++re;
      }
      return m.join("");
    }
    function Be(Z) {
      return $(Z, function(re) {
        return v.test(re) ? se(re.slice(4).toLowerCase()) : re;
      });
    }
    function ge(Z) {
      return $(Z, function(re) {
        return w.test(re) ? "xn--" + ye(re) : re;
      });
    }
    if (a = {
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
        decode: te,
        encode: oe
      },
      decode: se,
      encode: ye,
      toASCII: ge,
      toUnicode: Be
    }, n && i)
      if (r.exports == n)
        i.exports = a;
      else
        for (q in a)
          a.hasOwnProperty(q) && (n[q] = a[q]);
    else
      t.punycode = a;
  })(we);
})(hn, hn.exports);
var C0 = hn.exports;
const w0 = /* @__PURE__ */ or(C0), Q0 = {}, m0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Q0
}, Symbol.toStringTag, { value: "Module" })), b0 = /* @__PURE__ */ As(m0);
var PA = typeof Map == "function" && Map.prototype, hi = Object.getOwnPropertyDescriptor && PA ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, gn = PA && hi && typeof hi.get == "function" ? hi.get : null, Yo = PA && Map.prototype.forEach, qA = typeof Set == "function" && Set.prototype, gi = Object.getOwnPropertyDescriptor && qA ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, dn = qA && gi && typeof gi.get == "function" ? gi.get : null, Ko = qA && Set.prototype.forEach, v0 = typeof WeakMap == "function" && WeakMap.prototype, ur = v0 ? WeakMap.prototype.has : null, S0 = typeof WeakSet == "function" && WeakSet.prototype, hr = S0 ? WeakSet.prototype.has : null, x0 = typeof WeakRef == "function" && WeakRef.prototype, Wo = x0 ? WeakRef.prototype.deref : null, D0 = Boolean.prototype.valueOf, F0 = Object.prototype.toString, R0 = Function.prototype.toString, _0 = String.prototype.match, HA = String.prototype.slice, Ct = String.prototype.replace, T0 = String.prototype.toUpperCase, Vo = String.prototype.toLowerCase, yf = RegExp.prototype.test, $o = Array.prototype.concat, At = Array.prototype.join, k0 = Array.prototype.slice, zo = Math.floor, $i = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, di = Object.getOwnPropertySymbols, zi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, nr = typeof Symbol == "function" && typeof Symbol.iterator == "object", gr = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === nr || !0) ? Symbol.toStringTag : null, Ef = Object.prototype.propertyIsEnumerable, Xo = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(r) {
  return r.__proto__;
} : null);
function Zo(r, e) {
  if (r === 1 / 0 || r === -1 / 0 || r !== r || r && r > -1e3 && r < 1e3 || yf.call(/e/, e))
    return e;
  var t = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof r == "number") {
    var n = r < 0 ? -zo(-r) : zo(r);
    if (n !== r) {
      var i = String(n), A = HA.call(e, i.length + 1);
      return Ct.call(i, t, "$&_") + "." + Ct.call(Ct.call(A, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return Ct.call(e, t, "$&_");
}
var Xi = b0, ea = Xi.custom, ta = wf(ea) ? ea : null, Bf = {
  __proto__: null,
  double: '"',
  single: "'"
}, L0 = {
  __proto__: null,
  double: /(["\\])/g,
  single: /(['\\])/g
}, Dn = function r(e, t, n, i) {
  var A = t || {};
  if (lt(A, "quoteStyle") && !lt(Bf, A.quoteStyle))
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (lt(A, "maxStringLength") && (typeof A.maxStringLength == "number" ? A.maxStringLength < 0 && A.maxStringLength !== 1 / 0 : A.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var a = lt(A, "customInspect") ? A.customInspect : !0;
  if (typeof a != "boolean" && a !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (lt(A, "indent") && A.indent !== null && A.indent !== "	" && !(parseInt(A.indent, 10) === A.indent && A.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (lt(A, "numericSeparator") && typeof A.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var o = A.numericSeparator;
  if (typeof e > "u")
    return "undefined";
  if (e === null)
    return "null";
  if (typeof e == "boolean")
    return e ? "true" : "false";
  if (typeof e == "string")
    return mf(e, A);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var c = String(e);
    return o ? Zo(e, c) : c;
  }
  if (typeof e == "bigint") {
    var l = String(e) + "n";
    return o ? Zo(e, l) : l;
  }
  var s = typeof A.depth > "u" ? 5 : A.depth;
  if (typeof n > "u" && (n = 0), n >= s && s > 0 && typeof e == "object")
    return Zi(e) ? "[Array]" : "[Object]";
  var p = Z0(A, n);
  if (typeof i > "u")
    i = [];
  else if (Qf(i, e) >= 0)
    return "[Circular]";
  function d(ne, Ae, ie) {
    if (Ae && (i = k0.call(i), i.push(Ae)), ie) {
      var se = {
        depth: A.depth
      };
      return lt(A, "quoteStyle") && (se.quoteStyle = A.quoteStyle), r(ne, se, n + 1, i);
    }
    return r(ne, A, n + 1, i);
  }
  if (typeof e == "function" && !ra(e)) {
    var I = j0(e), E = Lr(e, d);
    return "[Function" + (I ? ": " + I : " (anonymous)") + "]" + (E.length > 0 ? " { " + At.call(E, ", ") + " }" : "");
  }
  if (wf(e)) {
    var x = nr ? Ct.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : zi.call(e);
    return typeof e == "object" && !nr ? fr(x) : x;
  }
  if ($0(e)) {
    for (var v = "<" + Vo.call(String(e.nodeName)), w = e.attributes || [], b = 0; b < w.length; b++)
      v += " " + w[b].name + "=" + Cf(M0(w[b].value), "double", A);
    return v += ">", e.childNodes && e.childNodes.length && (v += "..."), v += "</" + Vo.call(String(e.nodeName)) + ">", v;
  }
  if (Zi(e)) {
    if (e.length === 0)
      return "[]";
    var D = Lr(e, d);
    return p && !X0(D) ? "[" + eA(D, p) + "]" : "[ " + At.call(D, ", ") + " ]";
  }
  if (N0(e)) {
    var F = Lr(e, d);
    return !("cause" in Error.prototype) && "cause" in e && !Ef.call(e, "cause") ? "{ [" + String(e) + "] " + At.call($o.call("[cause]: " + d(e.cause), F), ", ") + " }" : F.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + At.call(F, ", ") + " }";
  }
  if (typeof e == "object" && a) {
    if (ta && typeof e[ta] == "function" && Xi)
      return Xi(e, { depth: s - n });
    if (a !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (J0(e)) {
    var R = [];
    return Yo && Yo.call(e, function(ne, Ae) {
      R.push(d(Ae, e, !0) + " => " + d(ne, e));
    }), na("Map", gn.call(e), R, p);
  }
  if (W0(e)) {
    var L = [];
    return Ko && Ko.call(e, function(ne) {
      L.push(d(ne, e));
    }), na("Set", dn.call(e), L, p);
  }
  if (Y0(e))
    return pi("WeakMap");
  if (V0(e))
    return pi("WeakSet");
  if (K0(e))
    return pi("WeakRef");
  if (O0(e))
    return fr(d(Number(e)));
  if (q0(e))
    return fr(d($i.call(e)));
  if (P0(e))
    return fr(D0.call(e));
  if (G0(e))
    return fr(d(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (typeof globalThis < "u" && e === globalThis || typeof we < "u" && e === we)
    return "{ [object globalThis] }";
  if (!U0(e) && !ra(e)) {
    var q = Lr(e, d), T = Xo ? Xo(e) === Object.prototype : e instanceof Object || e.constructor === Object, j = e instanceof Object ? "" : "null prototype", $ = !T && gr && Object(e) === e && gr in e ? HA.call(bt(e), 8, -1) : j ? "Object" : "", te = T || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", oe = te + ($ || j ? "[" + At.call($o.call([], $ || [], j || []), ": ") + "] " : "");
    return q.length === 0 ? oe + "{}" : p ? oe + "{" + eA(q, p) + "}" : oe + "{ " + At.call(q, ", ") + " }";
  }
  return String(e);
};
function Cf(r, e, t) {
  var n = t.quoteStyle || e, i = Bf[n];
  return i + r + i;
}
function M0(r) {
  return Ct.call(String(r), /"/g, "&quot;");
}
function Mt(r) {
  return !gr || !(typeof r == "object" && (gr in r || typeof r[gr] < "u"));
}
function Zi(r) {
  return bt(r) === "[object Array]" && Mt(r);
}
function U0(r) {
  return bt(r) === "[object Date]" && Mt(r);
}
function ra(r) {
  return bt(r) === "[object RegExp]" && Mt(r);
}
function N0(r) {
  return bt(r) === "[object Error]" && Mt(r);
}
function G0(r) {
  return bt(r) === "[object String]" && Mt(r);
}
function O0(r) {
  return bt(r) === "[object Number]" && Mt(r);
}
function P0(r) {
  return bt(r) === "[object Boolean]" && Mt(r);
}
function wf(r) {
  if (nr)
    return r && typeof r == "object" && r instanceof Symbol;
  if (typeof r == "symbol")
    return !0;
  if (!r || typeof r != "object" || !zi)
    return !1;
  try {
    return zi.call(r), !0;
  } catch {
  }
  return !1;
}
function q0(r) {
  if (!r || typeof r != "object" || !$i)
    return !1;
  try {
    return $i.call(r), !0;
  } catch {
  }
  return !1;
}
var H0 = Object.prototype.hasOwnProperty || function(r) {
  return r in this;
};
function lt(r, e) {
  return H0.call(r, e);
}
function bt(r) {
  return F0.call(r);
}
function j0(r) {
  if (r.name)
    return r.name;
  var e = _0.call(R0.call(r), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function Qf(r, e) {
  if (r.indexOf)
    return r.indexOf(e);
  for (var t = 0, n = r.length; t < n; t++)
    if (r[t] === e)
      return t;
  return -1;
}
function J0(r) {
  if (!gn || !r || typeof r != "object")
    return !1;
  try {
    gn.call(r);
    try {
      dn.call(r);
    } catch {
      return !0;
    }
    return r instanceof Map;
  } catch {
  }
  return !1;
}
function Y0(r) {
  if (!ur || !r || typeof r != "object")
    return !1;
  try {
    ur.call(r, ur);
    try {
      hr.call(r, hr);
    } catch {
      return !0;
    }
    return r instanceof WeakMap;
  } catch {
  }
  return !1;
}
function K0(r) {
  if (!Wo || !r || typeof r != "object")
    return !1;
  try {
    return Wo.call(r), !0;
  } catch {
  }
  return !1;
}
function W0(r) {
  if (!dn || !r || typeof r != "object")
    return !1;
  try {
    dn.call(r);
    try {
      gn.call(r);
    } catch {
      return !0;
    }
    return r instanceof Set;
  } catch {
  }
  return !1;
}
function V0(r) {
  if (!hr || !r || typeof r != "object")
    return !1;
  try {
    hr.call(r, hr);
    try {
      ur.call(r, ur);
    } catch {
      return !0;
    }
    return r instanceof WeakSet;
  } catch {
  }
  return !1;
}
function $0(r) {
  return !r || typeof r != "object" ? !1 : typeof HTMLElement < "u" && r instanceof HTMLElement ? !0 : typeof r.nodeName == "string" && typeof r.getAttribute == "function";
}
function mf(r, e) {
  if (r.length > e.maxStringLength) {
    var t = r.length - e.maxStringLength, n = "... " + t + " more character" + (t > 1 ? "s" : "");
    return mf(HA.call(r, 0, e.maxStringLength), e) + n;
  }
  var i = L0[e.quoteStyle || "single"];
  i.lastIndex = 0;
  var A = Ct.call(Ct.call(r, i, "\\$1"), /[\x00-\x1f]/g, z0);
  return Cf(A, "single", e);
}
function z0(r) {
  var e = r.charCodeAt(0), t = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return t ? "\\" + t : "\\x" + (e < 16 ? "0" : "") + T0.call(e.toString(16));
}
function fr(r) {
  return "Object(" + r + ")";
}
function pi(r) {
  return r + " { ? }";
}
function na(r, e, t, n) {
  var i = n ? eA(t, n) : At.call(t, ", ");
  return r + " (" + e + ") {" + i + "}";
}
function X0(r) {
  for (var e = 0; e < r.length; e++)
    if (Qf(r[e], `
`) >= 0)
      return !1;
  return !0;
}
function Z0(r, e) {
  var t;
  if (r.indent === "	")
    t = "	";
  else if (typeof r.indent == "number" && r.indent > 0)
    t = At.call(Array(r.indent + 1), " ");
  else
    return null;
  return {
    base: t,
    prev: At.call(Array(e + 1), t)
  };
}
function eA(r, e) {
  if (r.length === 0)
    return "";
  var t = `
` + e.prev + e.base;
  return t + At.call(r, "," + t) + `
` + e.prev;
}
function Lr(r, e) {
  var t = Zi(r), n = [];
  if (t) {
    n.length = r.length;
    for (var i = 0; i < r.length; i++)
      n[i] = lt(r, i) ? e(r[i], r) : "";
  }
  var A = typeof di == "function" ? di(r) : [], a;
  if (nr) {
    a = {};
    for (var o = 0; o < A.length; o++)
      a["$" + A[o]] = A[o];
  }
  for (var c in r)
    lt(r, c) && (t && String(Number(c)) === c && c < r.length || nr && a["$" + c] instanceof Symbol || (yf.call(/[^\w$]/, c) ? n.push(e(c, r) + ": " + e(r[c], r)) : n.push(c + ": " + e(r[c], r))));
  if (typeof di == "function")
    for (var l = 0; l < A.length; l++)
      Ef.call(r, A[l]) && n.push("[" + e(A[l]) + "]: " + e(r[A[l]], r));
  return n;
}
var ed = Dn, td = It, Fn = function(r, e, t) {
  for (var n = r, i; (i = n.next) != null; n = i)
    if (i.key === e)
      return n.next = i.next, t || (i.next = /** @type {NonNullable<typeof list.next>} */
      r.next, r.next = i), i;
}, rd = function(r, e) {
  if (r) {
    var t = Fn(r, e);
    return t && t.value;
  }
}, nd = function(r, e, t) {
  var n = Fn(r, e);
  n ? n.value = t : r.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: e,
    next: r.next,
    value: t
  };
}, id = function(r, e) {
  return r ? !!Fn(r, e) : !1;
}, Ad = function(r, e) {
  if (r)
    return Fn(r, e, !0);
}, od = function() {
  var e, t = {
    assert: function(n) {
      if (!t.has(n))
        throw new td("Side channel does not contain " + ed(n));
    },
    delete: function(n) {
      var i = e && e.next, A = Ad(e, n);
      return A && i && i === A && (e = void 0), !!A;
    },
    get: function(n) {
      return rd(e, n);
    },
    has: function(n) {
      return id(e, n);
    },
    set: function(n, i) {
      e || (e = {
        next: void 0
      }), nd(
        /** @type {NonNullable<typeof $o>} */
        e,
        n,
        i
      );
    }
  };
  return t;
}, ad = bn, Dr = kt, sd = Dn, fd = It, ia = ad("%Map%", !0), ld = Dr("Map.prototype.get", !0), cd = Dr("Map.prototype.set", !0), ud = Dr("Map.prototype.has", !0), hd = Dr("Map.prototype.delete", !0), gd = Dr("Map.prototype.size", !0), bf = !!ia && /** @type {Exclude<import('.'), false>} */
function() {
  var e, t = {
    assert: function(n) {
      if (!t.has(n))
        throw new fd("Side channel does not contain " + sd(n));
    },
    delete: function(n) {
      if (e) {
        var i = hd(e, n);
        return gd(e) === 0 && (e = void 0), i;
      }
      return !1;
    },
    get: function(n) {
      if (e)
        return ld(e, n);
    },
    has: function(n) {
      return e ? ud(e, n) : !1;
    },
    set: function(n, i) {
      e || (e = new ia()), cd(e, n, i);
    }
  };
  return t;
}, dd = bn, Rn = kt, pd = Dn, Mr = bf, Id = It, qt = dd("%WeakMap%", !0), yd = Rn("WeakMap.prototype.get", !0), Ed = Rn("WeakMap.prototype.set", !0), Bd = Rn("WeakMap.prototype.has", !0), Cd = Rn("WeakMap.prototype.delete", !0), wd = qt ? (
  /** @type {Exclude<import('.'), false>} */
  function() {
    var e, t, n = {
      assert: function(i) {
        if (!n.has(i))
          throw new Id("Side channel does not contain " + pd(i));
      },
      delete: function(i) {
        if (qt && i && (typeof i == "object" || typeof i == "function")) {
          if (e)
            return Cd(e, i);
        } else if (Mr && t)
          return t.delete(i);
        return !1;
      },
      get: function(i) {
        return qt && i && (typeof i == "object" || typeof i == "function") && e ? yd(e, i) : t && t.get(i);
      },
      has: function(i) {
        return qt && i && (typeof i == "object" || typeof i == "function") && e ? Bd(e, i) : !!t && t.has(i);
      },
      set: function(i, A) {
        qt && i && (typeof i == "object" || typeof i == "function") ? (e || (e = new qt()), Ed(e, i, A)) : Mr && (t || (t = Mr()), t.set(i, A));
      }
    };
    return n;
  }
) : Mr, Qd = It, md = Dn, bd = od, vd = bf, Sd = wd, xd = Sd || vd || bd, vf = function() {
  var e, t = {
    assert: function(n) {
      if (!t.has(n))
        throw new Qd("Side channel does not contain " + md(n));
    },
    delete: function(n) {
      return !!e && e.delete(n);
    },
    get: function(n) {
      return e && e.get(n);
    },
    has: function(n) {
      return !!e && e.has(n);
    },
    set: function(n, i) {
      e || (e = xd()), e.set(n, i);
    }
  };
  return t;
}, Dd = String.prototype.replace, Fd = /%20/g, Ii = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, jA = {
  default: Ii.RFC3986,
  formatters: {
    RFC1738: function(r) {
      return Dd.call(r, Fd, "+");
    },
    RFC3986: function(r) {
      return String(r);
    }
  },
  RFC1738: Ii.RFC1738,
  RFC3986: Ii.RFC3986
}, Rd = jA, _d = vf, yi = Object.prototype.hasOwnProperty, xt = Array.isArray, _n = _d(), Sf = function(e, t) {
  return _n.set(e, t), e;
}, pn = function(e) {
  return _n.has(e);
}, tA = function(e) {
  return _n.get(e);
}, xf = function(e, t) {
  _n.set(e, t);
}, Ze = function() {
  for (var r = [], e = 0; e < 256; ++e)
    r.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return r;
}(), Td = function(e) {
  for (; e.length > 1; ) {
    var t = e.pop(), n = t.obj[t.prop];
    if (xt(n)) {
      for (var i = [], A = 0; A < n.length; ++A)
        typeof n[A] < "u" && i.push(n[A]);
      t.obj[t.prop] = i;
    }
  }
}, JA = function(e, t) {
  for (var n = t && t.plainObjects ? { __proto__: null } : {}, i = 0; i < e.length; ++i)
    typeof e[i] < "u" && (n[i] = e[i]);
  return n;
}, kd = function r(e, t, n) {
  if (!t)
    return e;
  if (typeof t != "object" && typeof t != "function") {
    if (xt(e))
      e.push(t);
    else if (e && typeof e == "object")
      if (pn(e)) {
        var i = tA(e) + 1;
        e[i] = t, xf(e, i);
      } else (n && (n.plainObjects || n.allowPrototypes) || !yi.call(Object.prototype, t)) && (e[t] = !0);
    else
      return [e, t];
    return e;
  }
  if (!e || typeof e != "object") {
    if (pn(t)) {
      for (var A = Object.keys(t), a = n && n.plainObjects ? { __proto__: null, 0: e } : { 0: e }, o = 0; o < A.length; o++) {
        var c = parseInt(A[o], 10);
        a[c + 1] = t[A[o]];
      }
      return Sf(a, tA(t) + 1);
    }
    return [e].concat(t);
  }
  var l = e;
  return xt(e) && !xt(t) && (l = JA(e, n)), xt(e) && xt(t) ? (t.forEach(function(s, p) {
    if (yi.call(e, p)) {
      var d = e[p];
      d && typeof d == "object" && s && typeof s == "object" ? e[p] = r(d, s, n) : e.push(s);
    } else
      e[p] = s;
  }), e) : Object.keys(t).reduce(function(s, p) {
    var d = t[p];
    return yi.call(s, p) ? s[p] = r(s[p], d, n) : s[p] = d, s;
  }, l);
}, Ld = function(e, t) {
  return Object.keys(t).reduce(function(n, i) {
    return n[i] = t[i], n;
  }, e);
}, Md = function(r, e, t) {
  var n = r.replace(/\+/g, " ");
  if (t === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, Ei = 1024, Ud = function(e, t, n, i, A) {
  if (e.length === 0)
    return e;
  var a = e;
  if (typeof e == "symbol" ? a = Symbol.prototype.toString.call(e) : typeof e != "string" && (a = String(e)), n === "iso-8859-1")
    return escape(a).replace(/%u[0-9a-f]{4}/gi, function(I) {
      return "%26%23" + parseInt(I.slice(2), 16) + "%3B";
    });
  for (var o = "", c = 0; c < a.length; c += Ei) {
    for (var l = a.length >= Ei ? a.slice(c, c + Ei) : a, s = [], p = 0; p < l.length; ++p) {
      var d = l.charCodeAt(p);
      if (d === 45 || d === 46 || d === 95 || d === 126 || d >= 48 && d <= 57 || d >= 65 && d <= 90 || d >= 97 && d <= 122 || A === Rd.RFC1738 && (d === 40 || d === 41)) {
        s[s.length] = l.charAt(p);
        continue;
      }
      if (d < 128) {
        s[s.length] = Ze[d];
        continue;
      }
      if (d < 2048) {
        s[s.length] = Ze[192 | d >> 6] + Ze[128 | d & 63];
        continue;
      }
      if (d < 55296 || d >= 57344) {
        s[s.length] = Ze[224 | d >> 12] + Ze[128 | d >> 6 & 63] + Ze[128 | d & 63];
        continue;
      }
      p += 1, d = 65536 + ((d & 1023) << 10 | l.charCodeAt(p) & 1023), s[s.length] = Ze[240 | d >> 18] + Ze[128 | d >> 12 & 63] + Ze[128 | d >> 6 & 63] + Ze[128 | d & 63];
    }
    o += s.join("");
  }
  return o;
}, Nd = function(e) {
  for (var t = [{ obj: { o: e }, prop: "o" }], n = [], i = 0; i < t.length; ++i)
    for (var A = t[i], a = A.obj[A.prop], o = Object.keys(a), c = 0; c < o.length; ++c) {
      var l = o[c], s = a[l];
      typeof s == "object" && s !== null && n.indexOf(s) === -1 && (t.push({ obj: a, prop: l }), n.push(s));
    }
  return Td(t), e;
}, Gd = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, Od = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, Pd = function(e, t, n, i) {
  if (pn(e)) {
    var A = tA(e) + 1;
    return e[A] = t, xf(e, A), e;
  }
  var a = [].concat(e, t);
  return a.length > n ? Sf(JA(a, { plainObjects: i }), a.length - 1) : a;
}, qd = function(e, t) {
  if (xt(e)) {
    for (var n = [], i = 0; i < e.length; i += 1)
      n.push(t(e[i]));
    return n;
  }
  return t(e);
}, Df = {
  arrayToObject: JA,
  assign: Ld,
  combine: Pd,
  compact: Nd,
  decode: Md,
  encode: Ud,
  isBuffer: Od,
  isOverflow: pn,
  isRegExp: Gd,
  maybeMap: qd,
  merge: kd
}, Ff = vf, an = Df, dr = jA, Hd = Object.prototype.hasOwnProperty, Rf = {
  brackets: function(e) {
    return e + "[]";
  },
  comma: "comma",
  indices: function(e, t) {
    return e + "[" + t + "]";
  },
  repeat: function(e) {
    return e;
  }
}, it = Array.isArray, jd = Array.prototype.push, _f = function(r, e) {
  jd.apply(r, it(e) ? e : [e]);
}, Jd = Date.prototype.toISOString, Aa = dr.default, Ne = {
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
  encoder: an.encode,
  encodeValuesOnly: !1,
  filter: void 0,
  format: Aa,
  formatter: dr.formatters[Aa],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return Jd.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, Yd = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, Bi = {}, Kd = function r(e, t, n, i, A, a, o, c, l, s, p, d, I, E, x, v, w, b) {
  for (var D = e, F = b, R = 0, L = !1; (F = F.get(Bi)) !== void 0 && !L; ) {
    var q = F.get(e);
    if (R += 1, typeof q < "u") {
      if (q === R)
        throw new RangeError("Cyclic object value");
      L = !0;
    }
    typeof F.get(Bi) > "u" && (R = 0);
  }
  if (typeof s == "function" ? D = s(t, D) : D instanceof Date ? D = I(D) : n === "comma" && it(D) && (D = an.maybeMap(D, function(Z) {
    return Z instanceof Date ? I(Z) : Z;
  })), D === null) {
    if (a)
      return l && !v ? l(t, Ne.encoder, w, "key", E) : t;
    D = "";
  }
  if (Yd(D) || an.isBuffer(D)) {
    if (l) {
      var T = v ? t : l(t, Ne.encoder, w, "key", E);
      return [x(T) + "=" + x(l(D, Ne.encoder, w, "value", E))];
    }
    return [x(t) + "=" + x(String(D))];
  }
  var j = [];
  if (typeof D > "u")
    return j;
  var $;
  if (n === "comma" && it(D))
    v && l && (D = an.maybeMap(D, l)), $ = [{ value: D.length > 0 ? D.join(",") || null : void 0 }];
  else if (it(s))
    $ = s;
  else {
    var te = Object.keys(D);
    $ = p ? te.sort(p) : te;
  }
  var oe = c ? String(t).replace(/\./g, "%2E") : String(t), ne = i && it(D) && D.length === 1 ? oe + "[]" : oe;
  if (A && it(D) && D.length === 0)
    return ne + "[]";
  for (var Ae = 0; Ae < $.length; ++Ae) {
    var ie = $[Ae], se = typeof ie == "object" && ie && typeof ie.value < "u" ? ie.value : D[ie];
    if (!(o && se === null)) {
      var ye = d && c ? String(ie).replace(/\./g, "%2E") : String(ie), Be = it(D) ? typeof n == "function" ? n(ne, ye) : ne : ne + (d ? "." + ye : "[" + ye + "]");
      b.set(e, R);
      var ge = Ff();
      ge.set(Bi, b), _f(j, r(
        se,
        Be,
        n,
        i,
        A,
        a,
        o,
        c,
        n === "comma" && v && it(D) ? null : l,
        s,
        p,
        d,
        I,
        E,
        x,
        v,
        w,
        ge
      ));
    }
  }
  return j;
}, Wd = function(e) {
  if (!e)
    return Ne;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.encodeDotInKeys < "u" && typeof e.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var t = e.charset || Ne.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = dr.default;
  if (typeof e.format < "u") {
    if (!Hd.call(dr.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var i = dr.formatters[n], A = Ne.filter;
  (typeof e.filter == "function" || it(e.filter)) && (A = e.filter);
  var a;
  if (e.arrayFormat in Rf ? a = e.arrayFormat : "indices" in e ? a = e.indices ? "indices" : "repeat" : a = Ne.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var o = typeof e.allowDots > "u" ? e.encodeDotInKeys === !0 ? !0 : Ne.allowDots : !!e.allowDots;
  return {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : Ne.addQueryPrefix,
    allowDots: o,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : Ne.allowEmptyArrays,
    arrayFormat: a,
    charset: t,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : Ne.charsetSentinel,
    commaRoundTrip: !!e.commaRoundTrip,
    delimiter: typeof e.delimiter > "u" ? Ne.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : Ne.encode,
    encodeDotInKeys: typeof e.encodeDotInKeys == "boolean" ? e.encodeDotInKeys : Ne.encodeDotInKeys,
    encoder: typeof e.encoder == "function" ? e.encoder : Ne.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : Ne.encodeValuesOnly,
    filter: A,
    format: n,
    formatter: i,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : Ne.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : Ne.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : Ne.strictNullHandling
  };
}, Vd = function(r, e) {
  var t = r, n = Wd(e), i, A;
  typeof n.filter == "function" ? (A = n.filter, t = A("", t)) : it(n.filter) && (A = n.filter, i = A);
  var a = [];
  if (typeof t != "object" || t === null)
    return "";
  var o = Rf[n.arrayFormat], c = o === "comma" && n.commaRoundTrip;
  i || (i = Object.keys(t)), n.sort && i.sort(n.sort);
  for (var l = Ff(), s = 0; s < i.length; ++s) {
    var p = i[s], d = t[p];
    n.skipNulls && d === null || _f(a, Kd(
      d,
      p,
      o,
      c,
      n.allowEmptyArrays,
      n.strictNullHandling,
      n.skipNulls,
      n.encodeDotInKeys,
      n.encode ? n.encoder : null,
      n.filter,
      n.sort,
      n.allowDots,
      n.serializeDate,
      n.format,
      n.formatter,
      n.encodeValuesOnly,
      n.charset,
      l
    ));
  }
  var I = a.join(n.delimiter), E = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? E += "utf8=%26%2310003%3B&" : E += "utf8=%E2%9C%93&"), I.length > 0 ? E + I : "";
}, wt = Df, sn = Object.prototype.hasOwnProperty, oa = Array.isArray, Te = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: wt.decode,
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
}, $d = function(r) {
  return r.replace(/&#(\d+);/g, function(e, t) {
    return String.fromCharCode(parseInt(t, 10));
  });
}, Tf = function(r, e, t) {
  if (r && typeof r == "string" && e.comma && r.indexOf(",") > -1)
    return r.split(",");
  if (e.throwOnLimitExceeded && t >= e.arrayLimit)
    throw new RangeError("Array limit exceeded. Only " + e.arrayLimit + " element" + (e.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
  return r;
}, zd = "utf8=%26%2310003%3B", Xd = "utf8=%E2%9C%93", Zd = function(e, t) {
  var n = { __proto__: null }, i = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e;
  i = i.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  var A = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit, a = i.split(
    t.delimiter,
    t.throwOnLimitExceeded ? A + 1 : A
  );
  if (t.throwOnLimitExceeded && a.length > A)
    throw new RangeError("Parameter limit exceeded. Only " + A + " parameter" + (A === 1 ? "" : "s") + " allowed.");
  var o = -1, c, l = t.charset;
  if (t.charsetSentinel)
    for (c = 0; c < a.length; ++c)
      a[c].indexOf("utf8=") === 0 && (a[c] === Xd ? l = "utf-8" : a[c] === zd && (l = "iso-8859-1"), o = c, c = a.length);
  for (c = 0; c < a.length; ++c)
    if (c !== o) {
      var s = a[c], p = s.indexOf("]="), d = p === -1 ? s.indexOf("=") : p + 1, I, E;
      if (d === -1 ? (I = t.decoder(s, Te.decoder, l, "key"), E = t.strictNullHandling ? null : "") : (I = t.decoder(s.slice(0, d), Te.decoder, l, "key"), I !== null && (E = wt.maybeMap(
        Tf(
          s.slice(d + 1),
          t,
          oa(n[I]) ? n[I].length : 0
        ),
        function(v) {
          return t.decoder(v, Te.decoder, l, "value");
        }
      ))), E && t.interpretNumericEntities && l === "iso-8859-1" && (E = $d(String(E))), s.indexOf("[]=") > -1 && (E = oa(E) ? [E] : E), I !== null) {
        var x = sn.call(n, I);
        x && t.duplicates === "combine" ? n[I] = wt.combine(
          n[I],
          E,
          t.arrayLimit,
          t.plainObjects
        ) : (!x || t.duplicates === "last") && (n[I] = E);
      }
    }
  return n;
}, ep = function(r, e, t, n) {
  var i = 0;
  if (r.length > 0 && r[r.length - 1] === "[]") {
    var A = r.slice(0, -1).join("");
    i = Array.isArray(e) && e[A] ? e[A].length : 0;
  }
  for (var a = n ? e : Tf(e, t, i), o = r.length - 1; o >= 0; --o) {
    var c, l = r[o];
    if (l === "[]" && t.parseArrays)
      wt.isOverflow(a) ? c = a : c = t.allowEmptyArrays && (a === "" || t.strictNullHandling && a === null) ? [] : wt.combine(
        [],
        a,
        t.arrayLimit,
        t.plainObjects
      );
    else {
      c = t.plainObjects ? { __proto__: null } : {};
      var s = l.charAt(0) === "[" && l.charAt(l.length - 1) === "]" ? l.slice(1, -1) : l, p = t.decodeDotInKeys ? s.replace(/%2E/g, ".") : s, d = parseInt(p, 10);
      !t.parseArrays && p === "" ? c = { 0: a } : !isNaN(d) && l !== p && String(d) === p && d >= 0 && t.parseArrays && d <= t.arrayLimit ? (c = [], c[d] = a) : p !== "__proto__" && (c[p] = a);
    }
    a = c;
  }
  return a;
}, tp = function(e, t) {
  var n = t.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e;
  if (t.depth <= 0)
    return !t.plainObjects && sn.call(Object.prototype, n) && !t.allowPrototypes ? void 0 : [n];
  var i = /(\[[^[\]]*])/, A = /(\[[^[\]]*])/g, a = i.exec(n), o = a ? n.slice(0, a.index) : n, c = [];
  if (o) {
    if (!t.plainObjects && sn.call(Object.prototype, o) && !t.allowPrototypes)
      return;
    c.push(o);
  }
  for (var l = 0; (a = A.exec(n)) !== null && l < t.depth; ) {
    l += 1;
    var s = a[1].slice(1, -1);
    if (!t.plainObjects && sn.call(Object.prototype, s) && !t.allowPrototypes)
      return;
    c.push(a[1]);
  }
  if (a) {
    if (t.strictDepth === !0)
      throw new RangeError("Input depth exceeded depth option of " + t.depth + " and strictDepth is true");
    c.push("[" + n.slice(a.index) + "]");
  }
  return c;
}, rp = function(e, t, n, i) {
  if (e) {
    var A = tp(e, n);
    if (A)
      return ep(A, t, n, i);
  }
}, np = function(e) {
  if (!e)
    return Te;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.decodeDotInKeys < "u" && typeof e.decodeDotInKeys != "boolean")
    throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.decoder !== null && typeof e.decoder < "u" && typeof e.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  if (typeof e.throwOnLimitExceeded < "u" && typeof e.throwOnLimitExceeded != "boolean")
    throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
  var t = typeof e.charset > "u" ? Te.charset : e.charset, n = typeof e.duplicates > "u" ? Te.duplicates : e.duplicates;
  if (n !== "combine" && n !== "first" && n !== "last")
    throw new TypeError("The duplicates option must be either combine, first, or last");
  var i = typeof e.allowDots > "u" ? e.decodeDotInKeys === !0 ? !0 : Te.allowDots : !!e.allowDots;
  return {
    allowDots: i,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : Te.allowEmptyArrays,
    allowPrototypes: typeof e.allowPrototypes == "boolean" ? e.allowPrototypes : Te.allowPrototypes,
    allowSparse: typeof e.allowSparse == "boolean" ? e.allowSparse : Te.allowSparse,
    arrayLimit: typeof e.arrayLimit == "number" ? e.arrayLimit : Te.arrayLimit,
    charset: t,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : Te.charsetSentinel,
    comma: typeof e.comma == "boolean" ? e.comma : Te.comma,
    decodeDotInKeys: typeof e.decodeDotInKeys == "boolean" ? e.decodeDotInKeys : Te.decodeDotInKeys,
    decoder: typeof e.decoder == "function" ? e.decoder : Te.decoder,
    delimiter: typeof e.delimiter == "string" || wt.isRegExp(e.delimiter) ? e.delimiter : Te.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof e.depth == "number" || e.depth === !1 ? +e.depth : Te.depth,
    duplicates: n,
    ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof e.interpretNumericEntities == "boolean" ? e.interpretNumericEntities : Te.interpretNumericEntities,
    parameterLimit: typeof e.parameterLimit == "number" ? e.parameterLimit : Te.parameterLimit,
    parseArrays: e.parseArrays !== !1,
    plainObjects: typeof e.plainObjects == "boolean" ? e.plainObjects : Te.plainObjects,
    strictDepth: typeof e.strictDepth == "boolean" ? !!e.strictDepth : Te.strictDepth,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : Te.strictNullHandling,
    throwOnLimitExceeded: typeof e.throwOnLimitExceeded == "boolean" ? e.throwOnLimitExceeded : !1
  };
}, ip = function(r, e) {
  var t = np(e);
  if (r === "" || r === null || typeof r > "u")
    return t.plainObjects ? { __proto__: null } : {};
  for (var n = typeof r == "string" ? Zd(r, t) : r, i = t.plainObjects ? { __proto__: null } : {}, A = Object.keys(n), a = 0; a < A.length; ++a) {
    var o = A[a], c = rp(o, n[o], t, typeof r == "string");
    i = wt.merge(i, c, t);
  }
  return t.allowSparse === !0 ? i : wt.compact(i);
}, Ap = Vd, op = ip, ap = jA, sp = {
  formats: ap,
  parse: op,
  stringify: Ap
};
const fp = /* @__PURE__ */ or(sp);
var lp = w0;
function Ke() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
}
var cp = /^([a-z0-9.+-]+:)/i, up = /:[0-9]*$/, hp = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, gp = [
  "<",
  ">",
  '"',
  "`",
  " ",
  "\r",
  `
`,
  "	"
], dp = [
  "{",
  "}",
  "|",
  "\\",
  "^",
  "`"
].concat(gp), rA = ["'"].concat(dp), aa = [
  "%",
  "/",
  "?",
  ";",
  "#"
].concat(rA), sa = [
  "/",
  "?",
  "#"
], pp = 255, fa = /^[+a-z0-9A-Z_-]{0,63}$/, Ip = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, yp = {
  javascript: !0,
  "javascript:": !0
}, nA = {
  javascript: !0,
  "javascript:": !0
}, Xt = {
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
}, iA = fp;
function Fr(r, e, t) {
  if (r && typeof r == "object" && r instanceof Ke)
    return r;
  var n = new Ke();
  return n.parse(r, e, t), n;
}
Ke.prototype.parse = function(r, e, t) {
  if (typeof r != "string")
    throw new TypeError("Parameter 'url' must be a string, not " + typeof r);
  var n = r.indexOf("?"), i = n !== -1 && n < r.indexOf("#") ? "?" : "#", A = r.split(i), a = /\\/g;
  A[0] = A[0].replace(a, "/"), r = A.join(i);
  var o = r;
  if (o = o.trim(), !t && r.split("#").length === 1) {
    var c = hp.exec(o);
    if (c)
      return this.path = o, this.href = o, this.pathname = c[1], c[2] ? (this.search = c[2], e ? this.query = iA.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : e && (this.search = "", this.query = {}), this;
  }
  var l = cp.exec(o);
  if (l) {
    l = l[0];
    var s = l.toLowerCase();
    this.protocol = s, o = o.substr(l.length);
  }
  if (t || l || o.match(/^\/\/[^@/]+@[^@/]+/)) {
    var p = o.substr(0, 2) === "//";
    p && !(l && nA[l]) && (o = o.substr(2), this.slashes = !0);
  }
  if (!nA[l] && (p || l && !Xt[l])) {
    for (var d = -1, I = 0; I < sa.length; I++) {
      var E = o.indexOf(sa[I]);
      E !== -1 && (d === -1 || E < d) && (d = E);
    }
    var x, v;
    d === -1 ? v = o.lastIndexOf("@") : v = o.lastIndexOf("@", d), v !== -1 && (x = o.slice(0, v), o = o.slice(v + 1), this.auth = decodeURIComponent(x)), d = -1;
    for (var I = 0; I < aa.length; I++) {
      var E = o.indexOf(aa[I]);
      E !== -1 && (d === -1 || E < d) && (d = E);
    }
    d === -1 && (d = o.length), this.host = o.slice(0, d), o = o.slice(d), this.parseHost(), this.hostname = this.hostname || "";
    var w = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!w)
      for (var b = this.hostname.split(/\./), I = 0, D = b.length; I < D; I++) {
        var F = b[I];
        if (F && !F.match(fa)) {
          for (var R = "", L = 0, q = F.length; L < q; L++)
            F.charCodeAt(L) > 127 ? R += "x" : R += F[L];
          if (!R.match(fa)) {
            var T = b.slice(0, I), j = b.slice(I + 1), $ = F.match(Ip);
            $ && (T.push($[1]), j.unshift($[2])), j.length && (o = "/" + j.join(".") + o), this.hostname = T.join(".");
            break;
          }
        }
      }
    this.hostname.length > pp ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), w || (this.hostname = lp.toASCII(this.hostname));
    var te = this.port ? ":" + this.port : "", oe = this.hostname || "";
    this.host = oe + te, this.href += this.host, w && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), o[0] !== "/" && (o = "/" + o));
  }
  if (!yp[s])
    for (var I = 0, D = rA.length; I < D; I++) {
      var ne = rA[I];
      if (o.indexOf(ne) !== -1) {
        var Ae = encodeURIComponent(ne);
        Ae === ne && (Ae = escape(ne)), o = o.split(ne).join(Ae);
      }
    }
  var ie = o.indexOf("#");
  ie !== -1 && (this.hash = o.substr(ie), o = o.slice(0, ie));
  var se = o.indexOf("?");
  if (se !== -1 ? (this.search = o.substr(se), this.query = o.substr(se + 1), e && (this.query = iA.parse(this.query)), o = o.slice(0, se)) : e && (this.search = "", this.query = {}), o && (this.pathname = o), Xt[s] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
    var te = this.pathname || "", ye = this.search || "";
    this.path = te + ye;
  }
  return this.href = this.format(), this;
};
function Ep(r) {
  return typeof r == "string" && (r = Fr(r)), r instanceof Ke ? r.format() : Ke.prototype.format.call(r);
}
Ke.prototype.format = function() {
  var r = this.auth || "";
  r && (r = encodeURIComponent(r), r = r.replace(/%3A/i, ":"), r += "@");
  var e = this.protocol || "", t = this.pathname || "", n = this.hash || "", i = !1, A = "";
  this.host ? i = r + this.host : this.hostname && (i = r + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (i += ":" + this.port)), this.query && typeof this.query == "object" && Object.keys(this.query).length && (A = iA.stringify(this.query, {
    arrayFormat: "repeat",
    addQueryPrefix: !1
  }));
  var a = this.search || A && "?" + A || "";
  return e && e.substr(-1) !== ":" && (e += ":"), this.slashes || (!e || Xt[e]) && i !== !1 ? (i = "//" + (i || ""), t && t.charAt(0) !== "/" && (t = "/" + t)) : i || (i = ""), n && n.charAt(0) !== "#" && (n = "#" + n), a && a.charAt(0) !== "?" && (a = "?" + a), t = t.replace(/[?#]/g, function(o) {
    return encodeURIComponent(o);
  }), a = a.replace("#", "%23"), e + i + t + a + n;
};
function Bp(r, e) {
  return Fr(r, !1, !0).resolve(e);
}
Ke.prototype.resolve = function(r) {
  return this.resolveObject(Fr(r, !1, !0)).format();
};
function Cp(r, e) {
  return r ? Fr(r, !1, !0).resolveObject(e) : e;
}
Ke.prototype.resolveObject = function(r) {
  if (typeof r == "string") {
    var e = new Ke();
    e.parse(r, !1, !0), r = e;
  }
  for (var t = new Ke(), n = Object.keys(this), i = 0; i < n.length; i++) {
    var A = n[i];
    t[A] = this[A];
  }
  if (t.hash = r.hash, r.href === "")
    return t.href = t.format(), t;
  if (r.slashes && !r.protocol) {
    for (var a = Object.keys(r), o = 0; o < a.length; o++) {
      var c = a[o];
      c !== "protocol" && (t[c] = r[c]);
    }
    return Xt[t.protocol] && t.hostname && !t.pathname && (t.pathname = "/", t.path = t.pathname), t.href = t.format(), t;
  }
  if (r.protocol && r.protocol !== t.protocol) {
    if (!Xt[r.protocol]) {
      for (var l = Object.keys(r), s = 0; s < l.length; s++) {
        var p = l[s];
        t[p] = r[p];
      }
      return t.href = t.format(), t;
    }
    if (t.protocol = r.protocol, !r.host && !nA[r.protocol]) {
      for (var D = (r.pathname || "").split("/"); D.length && !(r.host = D.shift()); )
        ;
      r.host || (r.host = ""), r.hostname || (r.hostname = ""), D[0] !== "" && D.unshift(""), D.length < 2 && D.unshift(""), t.pathname = D.join("/");
    } else
      t.pathname = r.pathname;
    if (t.search = r.search, t.query = r.query, t.host = r.host || "", t.auth = r.auth, t.hostname = r.hostname || r.host, t.port = r.port, t.pathname || t.search) {
      var d = t.pathname || "", I = t.search || "";
      t.path = d + I;
    }
    return t.slashes = t.slashes || r.slashes, t.href = t.format(), t;
  }
  var E = t.pathname && t.pathname.charAt(0) === "/", x = r.host || r.pathname && r.pathname.charAt(0) === "/", v = x || E || t.host && r.pathname, w = v, b = t.pathname && t.pathname.split("/") || [], D = r.pathname && r.pathname.split("/") || [], F = t.protocol && !Xt[t.protocol];
  if (F && (t.hostname = "", t.port = null, t.host && (b[0] === "" ? b[0] = t.host : b.unshift(t.host)), t.host = "", r.protocol && (r.hostname = null, r.port = null, r.host && (D[0] === "" ? D[0] = r.host : D.unshift(r.host)), r.host = null), v = v && (D[0] === "" || b[0] === "")), x)
    t.host = r.host || r.host === "" ? r.host : t.host, t.hostname = r.hostname || r.hostname === "" ? r.hostname : t.hostname, t.search = r.search, t.query = r.query, b = D;
  else if (D.length)
    b || (b = []), b.pop(), b = b.concat(D), t.search = r.search, t.query = r.query;
  else if (r.search != null) {
    if (F) {
      t.host = b.shift(), t.hostname = t.host;
      var R = t.host && t.host.indexOf("@") > 0 ? t.host.split("@") : !1;
      R && (t.auth = R.shift(), t.hostname = R.shift(), t.host = t.hostname);
    }
    return t.search = r.search, t.query = r.query, (t.pathname !== null || t.search !== null) && (t.path = (t.pathname ? t.pathname : "") + (t.search ? t.search : "")), t.href = t.format(), t;
  }
  if (!b.length)
    return t.pathname = null, t.search ? t.path = "/" + t.search : t.path = null, t.href = t.format(), t;
  for (var L = b.slice(-1)[0], q = (t.host || r.host || b.length > 1) && (L === "." || L === "..") || L === "", T = 0, j = b.length; j >= 0; j--)
    L = b[j], L === "." ? b.splice(j, 1) : L === ".." ? (b.splice(j, 1), T++) : T && (b.splice(j, 1), T--);
  if (!v && !w)
    for (; T--; T)
      b.unshift("..");
  v && b[0] !== "" && (!b[0] || b[0].charAt(0) !== "/") && b.unshift(""), q && b.join("/").substr(-1) !== "/" && b.push("");
  var $ = b[0] === "" || b[0] && b[0].charAt(0) === "/";
  if (F) {
    t.hostname = $ ? "" : b.length ? b.shift() : "", t.host = t.hostname;
    var R = t.host && t.host.indexOf("@") > 0 ? t.host.split("@") : !1;
    R && (t.auth = R.shift(), t.hostname = R.shift(), t.host = t.hostname);
  }
  return v = v || t.host && b.length, v && !$ && b.unshift(""), b.length > 0 ? t.pathname = b.join("/") : (t.pathname = null, t.path = null), (t.pathname !== null || t.search !== null) && (t.path = (t.pathname ? t.pathname : "") + (t.search ? t.search : "")), t.auth = r.auth || t.auth, t.slashes = t.slashes || r.slashes, t.href = t.format(), t;
};
Ke.prototype.parseHost = function() {
  var r = this.host, e = up.exec(r);
  e && (e = e[0], e !== ":" && (this.port = e.substr(1)), r = r.substr(0, r.length - e.length)), r && (this.hostname = r);
};
var wp = Fr, Qp = Bp, kf = Cp, mp = Ep, bp = Ke;
function vp(r, e) {
  for (var t = 0, n = r.length - 1; n >= 0; n--) {
    var i = r[n];
    i === "." ? r.splice(n, 1) : i === ".." ? (r.splice(n, 1), t++) : t && (r.splice(n, 1), t--);
  }
  if (e)
    for (; t--; t)
      r.unshift("..");
  return r;
}
function Sp() {
  for (var r = "", e = !1, t = arguments.length - 1; t >= -1 && !e; t--) {
    var n = t >= 0 ? arguments[t] : "/";
    if (typeof n != "string")
      throw new TypeError("Arguments to path.resolve must be strings");
    if (!n)
      continue;
    r = n + "/" + r, e = n.charAt(0) === "/";
  }
  return r = vp(xp(r.split("/"), function(i) {
    return !!i;
  }), !e).join("/"), (e ? "/" : "") + r || ".";
}
function xp(r, e) {
  if (r.filter) return r.filter(e);
  for (var t = [], n = 0; n < r.length; n++)
    e(r[n], n, r) && t.push(r[n]);
  return t;
}
var Lf = function(r) {
  function e() {
    var n = this || self;
    return delete r.prototype.__magic__, n;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return e();
  r.defineProperty(r.prototype, "__magic__", {
    configurable: !0,
    get: e
  });
  var t = __magic__;
  return t;
}(Object), Dp = (
  /** @type {formatImport}*/
  mp
), Mf = (
  /** @type {parseImport}*/
  wp
), Uf = (
  /** @type {resolveImport}*/
  Qp
), Nf = (
  /** @type {UrlImport}*/
  bp
), Qt = Lf.URL, Gf = Lf.URLSearchParams, Fp = /%/g, Rp = /\\/g, _p = /\n/g, Tp = /\r/g, kp = /\t/g, Lp = 47;
function Mp(r) {
  var e = (
    /** @type {URL|null} */
    r ?? null
  );
  return !!(e !== null && (e != null && e.href) && (e != null && e.origin));
}
function Up(r) {
  if (r.hostname !== "")
    throw new TypeError('File URL host must be "localhost" or empty on browser');
  for (var e = r.pathname, t = 0; t < e.length; t++)
    if (e[t] === "%") {
      var n = e.codePointAt(t + 2) | 32;
      if (e[t + 1] === "2" && n === 102)
        throw new TypeError("File URL path must not include encoded / characters");
    }
  return decodeURIComponent(e);
}
function Np(r) {
  return r.includes("%") && (r = r.replace(Fp, "%25")), r.includes("\\") && (r = r.replace(Rp, "%5C")), r.includes(`
`) && (r = r.replace(_p, "%0A")), r.includes("\r") && (r = r.replace(Tp, "%0D")), r.includes("	") && (r = r.replace(kp, "%09")), r;
}
var Of = (
  /**
   * @type {domainToASCII}
   */
  function(e) {
    if (typeof e > "u")
      throw new TypeError('The "domain" argument must be specified');
    return new Qt("http://" + e).hostname;
  }
), Pf = (
  /**
   * @type {domainToUnicode}
   */
  function(e) {
    if (typeof e > "u")
      throw new TypeError('The "domain" argument must be specified');
    return new Qt("http://" + e).hostname;
  }
), qf = (
  /**
   * @type {(url: string) => URL}
   */
  function(e) {
    var t = new Qt("file://"), n = Sp(e), i = e.charCodeAt(e.length - 1);
    return i === Lp && n[n.length - 1] !== "/" && (n += "/"), t.pathname = Np(n), t;
  }
), Hf = (
  /**
   * @type {fileURLToPath & ((path: string | URL) => string)}
   */
  function(e) {
    if (!Mp(e) && typeof e != "string")
      throw new TypeError('The "path" argument must be of type string or an instance of URL. Received type ' + typeof e + " (" + e + ")");
    var t = new Qt(e);
    if (t.protocol !== "file:")
      throw new TypeError("The URL must be of scheme file");
    return Up(t);
  }
), jf = (
  /**
   * @type {(
   *   ((urlObject: URL, options?: URLFormatOptions) => string) &
   *   ((urlObject: UrlObject | string, options?: never) => string)
   * )}
   */
  function(e, t) {
    var n, i, A, a;
    if (t === void 0 && (t = {}), !(e instanceof Qt))
      return Dp(e);
    if (typeof t != "object" || t === null)
      throw new TypeError('The "options" argument must be of type object.');
    var o = (n = t.auth) != null ? n : !0, c = (i = t.fragment) != null ? i : !0, l = (A = t.search) != null ? A : !0;
    (a = t.unicode) != null;
    var s = new Qt(e.toString());
    return o || (s.username = "", s.password = ""), c || (s.hash = ""), l || (s.search = ""), s.toString();
  }
), Jf = {
  format: jf,
  parse: Mf,
  resolve: Uf,
  resolveObject: kf,
  Url: Nf,
  URL: Qt,
  URLSearchParams: Gf,
  domainToASCII: Of,
  domainToUnicode: Pf,
  pathToFileURL: qf,
  fileURLToPath: Hf
};
const Gp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  URL: Qt,
  URLSearchParams: Gf,
  Url: Nf,
  default: Jf,
  domainToASCII: Of,
  domainToUnicode: Pf,
  fileURLToPath: Hf,
  format: jf,
  parse: Mf,
  pathToFileURL: qf,
  resolve: Uf,
  resolveObject: kf
}, Symbol.toStringTag, { value: "Module" })), Yf = /* @__PURE__ */ As(Gp);
(function(r) {
  var e = p0, t = Bn, n = I0, i = B0, A = Yf, a = r;
  a.request = function(o, c) {
    typeof o == "string" ? o = A.parse(o) : o = n(o);
    var l = we.location.protocol.search(/^https?:$/) === -1 ? "http:" : "", s = o.protocol || l, p = o.hostname || o.host, d = o.port, I = o.path || "/";
    p && p.indexOf(":") !== -1 && (p = "[" + p + "]"), o.url = (p ? s + "//" + p : "") + (d ? ":" + d : "") + I, o.method = (o.method || "GET").toUpperCase(), o.headers = o.headers || {};
    var E = new e(o);
    return c && E.on("response", c), E;
  }, a.get = function(c, l) {
    var s = a.request(c, l);
    return s.end(), s;
  }, a.ClientRequest = e, a.IncomingMessage = t.IncomingMessage, a.Agent = function() {
  }, a.Agent.defaultMaxSockets = 4, a.globalAgent = new a.Agent(), a.STATUS_CODES = i, a.METHODS = [
    "CHECKOUT",
    "CONNECT",
    "COPY",
    "DELETE",
    "GET",
    "HEAD",
    "LOCK",
    "M-SEARCH",
    "MERGE",
    "MKACTIVITY",
    "MKCOL",
    "MOVE",
    "NOTIFY",
    "OPTIONS",
    "PATCH",
    "POST",
    "PROPFIND",
    "PROPPATCH",
    "PURGE",
    "PUT",
    "REPORT",
    "SEARCH",
    "SUBSCRIBE",
    "TRACE",
    "UNLOCK",
    "UNSUBSCRIBE"
  ];
})(SA);
const Op = /* @__PURE__ */ or(SA);
var Kf = { exports: {} };
(function(r) {
  var e = SA, t = Yf, n = r.exports;
  for (var i in e)
    e.hasOwnProperty(i) && (n[i] = e[i]);
  n.request = function(a, o) {
    return a = A(a), e.request.call(this, a, o);
  }, n.get = function(a, o) {
    return a = A(a), e.get.call(this, a, o);
  };
  function A(a) {
    if (typeof a == "string" && (a = t.parse(a)), a.protocol || (a.protocol = "https:"), a.protocol !== "https:")
      throw new Error('Protocol "' + a.protocol + '" not supported. Expected "https:"');
    return a;
  }
})(Kf);
var Pp = Kf.exports;
const qp = /* @__PURE__ */ or(Pp);
class Hp extends mA {
  /**
   * BaseResponse facade for node HTTP/HTTPS API Response
   * @param {http.ServerResponse} response
   */
  constructor(e, t) {
    super(), this.response = e, this.dataPromise = t;
  }
  get status() {
    return this.response.statusCode;
  }
  getHeader(e) {
    return this.response.headers[e];
  }
  async getData() {
    return await this.dataPromise;
  }
}
class jp extends bA {
  constructor(e) {
    super(e), this.parsedUrl = Jf.parse(this.url), this.httpApi = this.parsedUrl.protocol === "http:" ? Op : qp;
  }
  constructRequest(e, t) {
    return new Promise((n, i) => {
      const A = this.httpApi.get(
        {
          ...this.parsedUrl,
          headers: e
        },
        (a) => {
          const o = new Promise((c) => {
            const l = [];
            a.on("data", (s) => {
              l.push(s);
            }), a.on("end", () => {
              const s = ut.concat(l).buffer;
              c(s);
            }), a.on("error", i);
          });
          n(new Hp(a, o));
        }
      );
      A.on("error", i), t && (t.aborted && A.destroy(new er("Request aborted")), t.addEventListener("abort", () => A.destroy(new er("Request aborted"))));
    });
  }
  async request({ headers: e, signal: t } = {}) {
    return await this.constructRequest(e, t);
  }
}
class YA extends wA {
  /**
   *
   * @param {BaseClient} client
   * @param {object} headers
   * @param {numbers} maxRanges
   * @param {boolean} allowFullFile
   */
  constructor(e, t, n, i) {
    super(), this.client = e, this.headers = t, this.maxRanges = n, this.allowFullFile = i, this._fileSize = null;
  }
  /**
   *
   * @param {Slice[]} slices
   */
  async fetch(e, t) {
    return this.maxRanges >= e.length ? this.fetchSlices(e, t) : (this.maxRanges > 0 && e.length > 1, Promise.all(
      e.map((n) => this.fetchSlice(n, t))
    ));
  }
  async fetchSlices(e, t) {
    const n = await this.client.request({
      headers: {
        ...this.headers,
        Range: `bytes=${e.map(({ offset: i, length: A }) => `${i}-${i + A}`).join(",")}`
      },
      signal: t
    });
    if (n.ok)
      if (n.status === 206) {
        const { type: i, params: A } = Dc(n.getHeader("content-type"));
        if (i === "multipart/byteranges") {
          const p = Fc(await n.getData(), A.boundary);
          return this._fileSize = p[0].fileSize || null, p;
        }
        const a = await n.getData(), { start: o, end: c, total: l } = ki(n.getHeader("content-range"));
        this._fileSize = l || null;
        const s = [{
          data: a,
          offset: o,
          length: c - o
        }];
        if (e.length > 1) {
          const p = await Promise.all(e.slice(1).map((d) => this.fetchSlice(d, t)));
          return s.concat(p);
        }
        return s;
      } else {
        if (!this.allowFullFile)
          throw new Error("Server responded with full file");
        const i = await n.getData();
        return this._fileSize = i.byteLength, [{
          data: i,
          offset: 0,
          length: i.byteLength
        }];
      }
    else throw new Error("Error fetching data.");
  }
  async fetchSlice(e, t) {
    const { offset: n, length: i } = e, A = await this.client.request({
      headers: {
        ...this.headers,
        Range: `bytes=${n}-${n + i}`
      },
      signal: t
    });
    if (A.ok)
      if (A.status === 206) {
        const a = await A.getData(), { total: o } = ki(A.getHeader("content-range"));
        return this._fileSize = o || null, {
          data: a,
          offset: n,
          length: i
        };
      } else {
        if (!this.allowFullFile)
          throw new Error("Server responded with full file");
        const a = await A.getData();
        return this._fileSize = a.byteLength, {
          data: a,
          offset: 0,
          length: a.byteLength
        };
      }
    else throw new Error("Error fetching data.");
  }
  get fileSize() {
    return this._fileSize;
  }
}
function KA(r, { blockSize: e, cacheSize: t }) {
  return e === null ? r : new Nc(r, { blockSize: e, cacheSize: t });
}
function Jp(r, { headers: e = {}, credentials: t, maxRanges: n = 0, allowFullFile: i = !1, ...A } = {}) {
  const a = new Oc(r, t), o = new YA(a, e, n, i);
  return KA(o, A);
}
function Yp(r, { headers: e = {}, maxRanges: t = 0, allowFullFile: n = !1, ...i } = {}) {
  const A = new qc(r), a = new YA(A, e, t, n);
  return KA(a, i);
}
function Kp(r, { headers: e = {}, maxRanges: t = 0, allowFullFile: n = !1, ...i } = {}) {
  const A = new jp(r), a = new YA(A, e, t, n);
  return KA(a, i);
}
function Wp(r, { forceXHR: e = !1, ...t } = {}) {
  return typeof fetch == "function" && !e ? Jp(r, t) : typeof XMLHttpRequest < "u" ? Yp(r, t) : Kp(r, t);
}
class Vp extends wA {
  constructor(e) {
    super(), this.file = e;
  }
  async fetchSlice(e, t) {
    return new Promise((n, i) => {
      const A = this.file.slice(e.offset, e.offset + e.length), a = new FileReader();
      a.onload = (o) => n(o.target.result), a.onerror = i, a.onabort = i, a.readAsArrayBuffer(A), t && t.addEventListener("abort", () => a.abort());
    });
  }
}
function $p(r) {
  return new Vp(r);
}
const zp = QA(Rt), Xp = QA(cr), Wf = {};
ys(Wf, zp);
ys(Wf, Xp);
QA(Vr);
const pr = {
  ui8: new Uint8Array(8)
};
pr.fl64 = new Float64Array(pr.ui8.buffer);
pr.writeDouble = (r, e, t) => {
  pr.fl64[0] = t, _c(8, (n) => {
    r[e + n] = pr.ui8[7 - n];
  });
};
class Zp {
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
let eI = new Zp();
function tI(...r) {
  return eI.debug(...r);
}
function rI(r, e) {
  let t = r.length - e, n = 0;
  do {
    for (let i = e; i > 0; i--)
      r[n + e] += r[n], n++;
    t -= e;
  } while (t > 0);
}
function nI(r, e, t) {
  let n = 0, i = r.length;
  const A = i / t;
  for (; i > e; ) {
    for (let o = e; o > 0; --o)
      r[n + e] += r[n], ++n;
    i -= e;
  }
  const a = r.slice();
  for (let o = 0; o < A; ++o)
    for (let c = 0; c < t; ++c)
      r[t * o + c] = a[(t - c - 1) * A + o];
}
function iI(r, e, t, n, i, A) {
  if (e === 1)
    return r;
  for (let c = 0; c < i.length; ++c) {
    if (i[c] % 8 !== 0)
      throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");
    if (i[c] !== i[0])
      throw new Error("When decoding with predictor, all samples must have the same size.");
  }
  const a = i[0] / 8, o = A === 2 ? 1 : i.length;
  for (let c = 0; c < n && !(c * o * t * a >= r.byteLength); ++c) {
    let l;
    if (e === 2) {
      switch (i[0]) {
        case 8:
          l = new Uint8Array(
            r,
            c * o * t * a,
            o * t * a
          );
          break;
        case 16:
          l = new Uint16Array(
            r,
            c * o * t * a,
            o * t * a / 2
          );
          break;
        case 32:
          l = new Uint32Array(
            r,
            c * o * t * a,
            o * t * a / 4
          );
          break;
        default:
          throw new Error(`Predictor 2 not allowed with ${i[0]} bits per sample.`);
      }
      rI(l, o);
    } else e === 3 && (l = new Uint8Array(
      r,
      c * o * t * a,
      o * t * a
    ), nI(l, o, a));
  }
  return r;
}
class vt {
  async decode(e, t) {
    const n = await this.decodeBlock(t), i = e.Predictor || 1;
    if (i !== 1) {
      const A = !e.StripOffsets, a = A ? e.TileWidth : e.ImageWidth, o = A ? e.TileLength : e.RowsPerStrip || e.ImageLength;
      return iI(
        n,
        i,
        a,
        o,
        e.BitsPerSample,
        e.PlanarConfiguration
      );
    }
    return n;
  }
}
console.log("Loading GeoTiff Reader 2025.10.09 Version 2.1.4-beta.0");
const la = new Uint8Array([
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
function AA(r) {
  switch (r) {
    case fe.BYTE:
    case fe.ASCII:
    case fe.SBYTE:
    case fe.UNDEFINED:
      return 1;
    case fe.SHORT:
    case fe.SSHORT:
      return 2;
    case fe.LONG:
    case fe.SLONG:
    case fe.FLOAT:
    case fe.IFD:
      return 4;
    case fe.RATIONAL:
    case fe.SRATIONAL:
    case fe.DOUBLE:
    case fe.LONG8:
    case fe.SLONG8:
    case fe.IFD8:
      return 8;
    default:
      throw new RangeError(`Invalid field type: ${r}`);
  }
}
function AI(r) {
  const e = r.GeoKeyDirectory;
  if (!e)
    return null;
  const t = {};
  for (let n = 4; n <= e[3] * 4; n += 4) {
    const i = cr[e[n]], A = e[n + 1] ? Rt[e[n + 1]] : null, a = e[n + 2], o = e[n + 3];
    let c = null;
    if (!A)
      c = o;
    else {
      if (c = r[A], typeof c > "u" || c === null)
        throw new Error(`Could not get value of geoKey '${i}'.`);
      typeof c == "string" ? c = c.substring(o, o + a - 1) : c.subarray && (c = c.subarray(o, o + a), a === 1 && (c = c[0]));
    }
    t[i] = c;
  }
  return t;
}
function Ht(r, e, t, n) {
  let i = null, A = null;
  const a = AA(e);
  switch (e) {
    case fe.BYTE:
    case fe.ASCII:
    case fe.UNDEFINED:
      i = new Uint8Array(t), A = r.readUint8;
      break;
    case fe.SBYTE:
      i = new Int8Array(t), A = r.readInt8;
      break;
    case fe.SHORT:
      i = new Uint16Array(t), A = r.readUint16;
      break;
    case fe.SSHORT:
      i = new Int16Array(t), A = r.readInt16;
      break;
    case fe.LONG:
    case fe.IFD:
      i = new Uint32Array(t), A = r.readUint32;
      break;
    case fe.SLONG:
      i = new Int32Array(t), A = r.readInt32;
      break;
    case fe.LONG8:
    case fe.IFD8:
      i = new Array(t), A = r.readUint64;
      break;
    case fe.SLONG8:
      i = new Array(t), A = r.readInt64;
      break;
    case fe.RATIONAL:
      i = new Uint32Array(t * 2), A = r.readUint32;
      break;
    case fe.SRATIONAL:
      i = new Int32Array(t * 2), A = r.readInt32;
      break;
    case fe.FLOAT:
      i = new Float32Array(t), A = r.readFloat32;
      break;
    case fe.DOUBLE:
      i = new Float64Array(t), A = r.readFloat64;
      break;
    default:
      throw new RangeError(`Invalid field type: ${e}`);
  }
  if (e === fe.RATIONAL || e === fe.SRATIONAL)
    for (let o = 0; o < t; o += 2)
      i[o] = A.call(
        r,
        n + o * a
      ), i[o + 1] = A.call(
        r,
        n + (o * a + 4)
      );
  else
    for (let o = 0; o < t; ++o)
      i[o] = A.call(
        r,
        n + o * a
      );
  return e === fe.ASCII ? new TextDecoder("utf-8").decode(i) : i;
}
class oI {
  /**
   * Create an ImageFileDirectory.
   * @param {object} fileDirectory the file directory, mapping tag names to values
   * @param {Map} rawFileDirectory the raw file directory, mapping tag IDs to values
   * @param {object} geoKeyDirectory the geo key directory, mapping geo key names to values
   * @param {number} nextIFDByteOffset the byte offset to the next IFD
   */
  constructor(e, t, n, i) {
    this.fileDirectory = e, this.rawFileDirectory = t, this.geoKeyDirectory = n, this.nextIFDByteOffset = i;
  }
}
class Ur extends Error {
  constructor(e) {
    super(`No image at index ${e}`), this.index = e;
  }
}
class aI {
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
  async readRasters(e = {}) {
    const { window: t, width: n, height: i } = e;
    let { resX: A, resY: a, bbox: o } = e;
    const c = await this.getImage();
    let l = c;
    const s = await this.getImageCount(), p = c.getBoundingBox();
    if (t && o)
      throw new Error('Both "bbox" and "window" passed.');
    if (n || i) {
      if (t) {
        const [E, x] = c.getOrigin(), [v, w] = c.getResolution();
        o = [
          E + t[0] * v,
          x + t[1] * w,
          E + t[2] * v,
          x + t[3] * w
        ];
      }
      const I = o || p;
      if (n) {
        if (A)
          throw new Error("Both width and resX passed");
        A = (I[2] - I[0]) / n;
      }
      if (i) {
        if (a)
          throw new Error("Both width and resY passed");
        a = (I[3] - I[1]) / i;
      }
    }
    if (A || a) {
      const I = [];
      for (let E = 0; E < s; ++E) {
        const x = await this.getImage(E), { SubfileType: v, NewSubfileType: w } = x.fileDirectory;
        (E === 0 || v === 2 || w & 1) && I.push(x);
      }
      I.sort((E, x) => E.getWidth() - x.getWidth());
      for (let E = 0; E < I.length; ++E) {
        const x = I[E], v = (p[2] - p[0]) / x.getWidth(), w = (p[3] - p[1]) / x.getHeight();
        if (l = x, A && A > v || a && a > w)
          break;
      }
    }
    let d = t;
    if (o) {
      const [I, E] = c.getOrigin(), [x, v] = l.getResolution(c);
      d = [
        Math.round((o[0] - I) / x),
        Math.round((o[1] - E) / v),
        Math.round((o[2] - I) / x),
        Math.round((o[3] - E) / v)
      ], d = [
        Math.min(d[0], d[2]),
        Math.min(d[1], d[3]),
        Math.max(d[0], d[2]),
        Math.max(d[1], d[3])
      ];
    }
    return l.readRasters({ ...e, window: d });
  }
}
class Tn extends aI {
  /**
   * @constructor
   * @param {(source.ArrayBufferSource|source.Remote|source.Custom|source.DataView)} source The data source from where to read the TIFF file.
   * @param {boolean} littleEndian Whether the TIFF file is in little endian format.
   * @param {boolean} bigTiff Whether the TIFF file is a BigTIFF file.
   * @param {number} firstIFDOffset The numeric byte-offset from the start of the file to the first IFD.
   * @param {object} [options] Further options.
   * @param {boolean} [options.cache=true] Enable caching for higher performance.
   */
  constructor(e, t, n, i, A = {}) {
    super(), this.source = e, this.littleEndian = t, this.bigTiff = n, this.firstIFDOffset = i, this.cache = A.cache !== !1, this.ifdRequests = [], this.ghostValues = null, this.iccProfileCache = /* @__PURE__ */ new Map(), this.iccProfileCache.set("generic", la);
  }
  async getSlice(e, t) {
    const n = this.bigTiff ? 4048 : 1024;
    return new Cc(
      (await this.source.fetch([{
        offset: e,
        length: typeof t < "u" ? t : n
      }]))[0],
      e,
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
  async parseFileDirectoryAt(e) {
    const t = this.bigTiff ? 20 : 12, n = this.bigTiff ? 8 : 2;
    let i = await this.getSlice(e);
    const A = this.bigTiff ? i.readUint64(e) : i.readUint16(e), a = A * t + (this.bigTiff ? 16 : 6);
    i.covers(e, a) || (i = await this.getSlice(e, a));
    const o = {}, c = /* @__PURE__ */ new Map();
    let l = e + (this.bigTiff ? 8 : 2);
    for (let d = 0; d < A; l += t, ++d) {
      const I = i.readUint16(l), E = i.readUint16(l + 2), x = this.bigTiff ? i.readUint64(l + 4) : i.readUint32(l + 4);
      let v, w;
      const b = AA(E), D = l + (this.bigTiff ? 12 : 8);
      if (I === 34675) {
        tI("Using generic ICC profile instead of embedded one"), w = la;
        const L = Rt[I];
        L && (o[L] = w), c.set(I, w);
        continue;
      }
      if (b * x <= (this.bigTiff ? 8 : 4))
        v = Ht(i, E, x, D);
      else {
        const L = i.readOffset(D), q = AA(E) * x;
        if (i.covers(L, q))
          v = Ht(i, E, x, L);
        else {
          const T = await this.getSlice(L, q);
          v = Ht(T, E, x, L);
        }
      }
      x === 1 && $l.indexOf(I) === -1 && !(E === fe.RATIONAL || E === fe.SRATIONAL) ? w = v[0] : w = v;
      const R = Rt[I];
      R && (o[R] = w), c.set(I, w);
    }
    const s = AI(o), p = i.readOffset(
      e + n + t * A
    );
    return new oI(
      o,
      c,
      s,
      p
    );
  }
  async requestIFD(e) {
    if (this.ifdRequests[e])
      return this.ifdRequests[e];
    if (e === 0)
      return this.ifdRequests[e] = this.parseFileDirectoryAt(this.firstIFDOffset), this.ifdRequests[e];
    if (!this.ifdRequests[e - 1])
      try {
        this.ifdRequests[e - 1] = this.requestIFD(e - 1);
      } catch (t) {
        throw t instanceof Ur ? new Ur(e) : t;
      }
    return this.ifdRequests[e] = (async () => {
      const t = await this.ifdRequests[e - 1];
      if (t.nextIFDByteOffset === 0)
        throw new Ur(e);
      return this.parseFileDirectoryAt(t.nextIFDByteOffset);
    })(), this.ifdRequests[e];
  }
  /**
   * Get the n-th internal subfile of an image. By default, the first is returned.
   *
   * @param {number} [index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  async getImage(e = 0) {
    const t = await this.requestIFD(e);
    return new Ec(
      t.fileDirectory,
      t.geoKeyDirectory,
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
    let e = 0, t = !0;
    for (; t; )
      try {
        await this.requestIFD(e), ++e;
      } catch (n) {
        if (n instanceof Ur)
          t = !1;
        else
          throw n;
      }
    return e;
  }
  /**
   * Get the values of the COG ghost area as a parsed map.
   * See https://gdal.org/drivers/raster/cog.html#header-ghost-area for reference
   * @returns {Promise<Object>} the parsed ghost area or null, if no such area was found
   */
  async getGhostValues() {
    const e = this.bigTiff ? 16 : 8;
    if (this.ghostValues)
      return this.ghostValues;
    const t = "GDAL_STRUCTURAL_METADATA_SIZE=", n = t.length + 100;
    let i = await this.getSlice(e, n);
    if (t === Ht(i, fe.ASCII, t.length, e)) {
      const a = Ht(i, fe.ASCII, n, e).split(`
`)[0], o = Number(a.split("=")[1].split(" ")[0]) + a.length;
      o > n && (i = await this.getSlice(e, o));
      const c = Ht(i, fe.ASCII, o, e);
      this.ghostValues = {}, c.split(`
`).filter((l) => l.length > 0).map((l) => l.split("=")).forEach(([l, s]) => {
        this.ghostValues[l] = s;
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
  static async fromSource(e, t, n) {
    const i = (await e.fetch([{ offset: 0, length: 1024 }], n))[0], A = new Bc(i), a = A.getUint16(0, 0);
    let o;
    if (a === 18761)
      o = !0;
    else if (a === 19789)
      o = !1;
    else
      throw new TypeError("Invalid byte order value.");
    const c = A.getUint16(2, o);
    let l;
    if (c === 42)
      l = !1;
    else if (c === 43) {
      if (l = !0, A.getUint16(4, o) !== 8)
        throw new Error("Unsupported offset byte-size.");
    } else
      throw new TypeError("Invalid magic number.");
    const s = l ? A.getUint64(8, o) : A.getUint32(4, o);
    return new Tn(e, o, l, s, t);
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
async function ca(r, e = {}, t) {
  return Tn.fromSource(Wp(r, e), e, t);
}
async function ua(r, e = {}, t) {
  return Tn.fromSource($p(r), e, t);
}
class Ci {
  constructor() {
    this.promise = new Promise((e, t) => {
      this.reject = t, this.resolve = e;
    });
  }
}
const sI = (r) => {
  var t, n, i;
  const e = /* @__PURE__ */ new Map();
  for (const A of r) {
    const a = new DOMParser().parseFromString(
      (t = A.fileDirectory) == null ? void 0 : t.ImageDescription,
      "text/xml"
    ), o = (n = a == null ? void 0 : a.querySelector("Name")) == null ? void 0 : n.textContent, c = (i = a == null ? void 0 : a.querySelector("Color")) == null ? void 0 : i.textContent;
    if (!o)
      continue;
    const l = c ? c.split(",").map((s) => parseInt(s)) : [255, 255, 255];
    e.has(o) || e.set(o, {
      name: o,
      color: l,
      images: []
    }), e.get(o).images.push(A);
  }
  return e;
};
class St {
  static RGBAfromYCbCr(e) {
    const t = new Uint8ClampedArray(e.length * 4 / 3);
    let n, i;
    for (n = 0, i = 0; n < e.length; n += 3, i += 4) {
      const A = e[n], a = e[n + 1], o = e[n + 2];
      t[i] = A + 1.402 * (o - 128), t[i + 1] = A - 0.34414 * (a - 128) - 0.71414 * (o - 128), t[i + 2] = A + 1.772 * (a - 128), t[i + 3] = 255;
    }
    return t;
  }
  static RGBAfromRGB(e) {
    const t = new Uint8ClampedArray(e.length * 4 / 3);
    let n, i;
    for (n = 0, i = 0; n < e.length; n += 3, i += 4)
      t[i] = e[n], t[i + 1] = e[n + 1], t[i + 2] = e[n + 2], t[i + 3] = 255;
    return t;
  }
  static RGBAfromWhiteIsZero(e, t) {
    const n = new Uint8ClampedArray(e.length * 4);
    let i;
    for (let A = 0, a = 0; A < e.length; ++A, a += 4)
      i = 256 - e[A] / t * 256, n[a] = i, n[a + 1] = i, n[a + 2] = i, n[a + 3] = 255;
    return n;
  }
  static RGBAfromBlackIsZero(e, t) {
    const n = new Uint8ClampedArray(e.length * 4);
    let i;
    for (let A = 0, a = 0; A < e.length; ++A, a += 4)
      i = e[A] / t * 256, n[a] = i, n[a + 1] = i, n[a + 2] = i, n[a + 3] = 255;
    return n;
  }
  static RGBAfromPalette(e, t) {
    const n = new Uint8ClampedArray(e.length * 4), i = t.length / 3, A = t.length / 3 * 2;
    for (let a = 0, o = 0; a < e.length; ++a, o += 4) {
      const c = e[a];
      n[o] = t[c] / 65536 * 256, n[o + 1] = t[c + i] / 65536 * 256, n[o + 2] = t[c + A] / 65536 * 256, n[o + 3] = 255;
    }
    return n;
  }
  static RGBAfromCMYK(e) {
    const t = new Uint8ClampedArray(e.length);
    for (let n = 0, i = 0; n < e.length; n += 4, i += 4) {
      const A = e[n], a = e[n + 1], o = e[n + 2], c = e[n + 3];
      t[i] = 255 * ((255 - A) / 256) * ((255 - c) / 256), t[i + 1] = 255 * ((255 - a) / 256) * ((255 - c) / 256), t[i + 2] = 255 * ((255 - o) / 256) * ((255 - c) / 256), t[i + 3] = 255;
    }
    return t;
  }
  static RGBAfromCIELab(e) {
    const A = new Uint8ClampedArray(e.length * 4 / 3);
    for (let a = 0, o = 0; a < e.length; a += 3, o += 4) {
      const c = e[a + 0], l = e[a + 1] << 24 >> 24, s = e[a + 2] << 24 >> 24;
      let p = (c + 16) / 116, d = l / 500 + p, I = p - s / 200, E, x, v;
      d = 0.95047 * (d * d * d > 8856e-6 ? d * d * d : (d - 16 / 116) / 7.787), p = 1 * (p * p * p > 8856e-6 ? p * p * p : (p - 16 / 116) / 7.787), I = 1.08883 * (I * I * I > 8856e-6 ? I * I * I : (I - 16 / 116) / 7.787), E = d * 3.2406 + p * -1.5372 + I * -0.4986, x = d * -0.9689 + p * 1.8758 + I * 0.0415, v = d * 0.0557 + p * -0.204 + I * 1.057, E = E > 31308e-7 ? 1.055 * E ** (1 / 2.4) - 0.055 : 12.92 * E, x = x > 31308e-7 ? 1.055 * x ** (1 / 2.4) - 0.055 : 12.92 * x, v = v > 31308e-7 ? 1.055 * v ** (1 / 2.4) - 0.055 : 12.92 * v, A[o] = Math.max(0, Math.min(1, E)) * 255, A[o + 1] = Math.max(0, Math.min(1, x)) * 255, A[o + 2] = Math.max(0, Math.min(1, v)) * 255, A[o + 3] = 255;
    }
    return A;
  }
}
function fI(r) {
  if (!r.version || r.version.major < 2 || r.version.major == 2 && r.version.minor < 3) {
    console.error("This version of OpenSeadragon is too old to support this monkey patch");
    return;
  }
  if (r.ImageJob)
    return;
  function e(n) {
    r.extend(
      !0,
      this,
      {
        timeout: r.DEFAULT_SETTINGS.timeout,
        jobId: null
      },
      n
    ), this.image = null;
  }
  e.prototype = {
    errorMsg: null,
    /**
     * Starts the image job.
     * @method
     */
    start: function() {
      var n = this, i = this.abort;
      this.image = new Image(), this.image.onload = function() {
        n.finish(!0);
      }, this.image.onabort = this.image.onerror = function() {
        n.errorMsg = "Image load aborted", n.finish(!1);
      }, this.jobId = window.setTimeout(function() {
        n.errorMsg = "Image load exceeded timeout (" + n.timeout + " ms)", n.finish(!1);
      }, this.timeout), this.loadWithAjax ? (this.request = r.makeAjaxRequest({
        url: this.src,
        withCredentials: this.ajaxWithCredentials,
        headers: this.ajaxHeaders,
        responseType: "arraybuffer",
        postData: this.postData,
        success: function(A) {
          var a;
          try {
            a = new window.Blob([A.response]);
          } catch (s) {
            var o = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            if (s.name === "TypeError" && o) {
              var c = new o();
              c.append(A.response), a = c.getBlob();
            }
          }
          a.size === 0 && (n.errorMsg = "Empty image response.", n.finish(!1));
          var l = (window.URL || window.webkitURL).createObjectURL(a);
          n.image.src = l;
        },
        error: function(A) {
          n.errorMsg = "Image load aborted - XHR error: Ajax returned " + A.status, n.finish(!1);
        }
      }), this.abort = function() {
        n.request.abort(), typeof i == "function" && i();
      }) : (this.crossOriginPolicy !== !1 && (this.image.crossOrigin = this.crossOriginPolicy), this.src.fetch ? this.src.fetch().then((A) => this.image.src = A) : this.image.src = this.src);
    },
    finish: function(n) {
      this.image.onload = this.image.onerror = this.image.onabort = null, n || (this.image = null), this.jobId && window.clearTimeout(this.jobId), this.callback(this);
    }
  };
  function t(n, i, A) {
    var a;
    n.jobsInProgress--, (!n.jobLimit || n.jobsInProgress < n.jobLimit) && n.jobQueue.length > 0 && (a = n.jobQueue.shift(), a.start(), n.jobsInProgress++), A(i.image, i.errorMsg, i.request);
  }
  r.ImageLoader.prototype.addJob = function(n) {
    var i = this, A = function(c) {
      t(i, c, n.callback);
    }, a = {
      src: n.src,
      loadWithAjax: n.loadWithAjax,
      ajaxHeaders: n.loadWithAjax ? n.ajaxHeaders : null,
      crossOriginPolicy: n.crossOriginPolicy,
      ajaxWithCredentials: n.ajaxWithCredentials,
      postData: n.postData,
      callback: A,
      abort: n.abort,
      timeout: this.timeout
    }, o = new e(a);
    !this.jobLimit || this.jobsInProgress < this.jobLimit ? (o.start(), this.jobsInProgress++) : this.jobQueue.push(o);
  }, r.Tile.prototype._hasTransparencyChannel = function() {
    return !1;
  };
}
console.log("Loading GeoTIFF Tile Source from 2025.10.09  ...");
const lI = (r) => {
  let e = 0;
  const n = class n extends r.TileSource {
    constructor(a, o = { logLatency: !1 }) {
      super();
      /**
       * Return the tileWidth for a given level.
       * @function
       * @param {Number} level
       */
      qe(this, "getTileWidth", (a) => {
        if (this.levels.length > a)
          return this.levels[a].tileWidth;
      });
      /**
       * Return the tileHeight for a given level.
       * @function
       * @param {Number} level
       */
      qe(this, "getTileHeight", (a) => {
        if (this.levels.length > a)
          return this.levels[a].tileHeight;
      });
      /**
       * @function
       * @param {Number} level
       */
      qe(this, "getLevelScale", (a) => {
        let o = NaN;
        return this.levels.length > 0 && a >= this.minLevel && a <= this.maxLevel && (o = this.levels[a].width / this.levels[this.maxLevel].width), o;
      });
      /**
       * Handle maintaining unique caches per channel in multi-channel images
       */
      qe(this, "getTileHashKey", (a, o, c) => {
        var l;
        return `geotiffTileSource${this._tsCounter}_${((l = this == null ? void 0 : this.channel) == null ? void 0 : l.name) ?? ""}_${a}_${o}_${c}`;
      });
      /**
       * Implement function here instead of as custom tile source in client code
       * @function
       * @param {Number} levelnum
       * @param {Number} x
       * @param {Number} y
       */
      qe(this, "getTileUrl", (a, o, c) => {
        let l = this.levels[a], s = new String(`${a}/${o}_${c}`);
        return s.fetch = /* @__PURE__ */ ((p, d, I, E, x) => () => this.regionToDataUrl.call(p, d, I, E, x))(this, l, o, c, s), s;
      });
      qe(this, "downloadTileStart", (a) => {
        a.src.fetch().then((o) => {
          let c = new Image(), l = "" + a.src;
          c.onload = function() {
            a.finish(c);
          }, c.onerror = c.onabort = function() {
            a.finish(null, l, "Request aborted");
          }, c.src = o;
        });
      });
      qe(this, "downloadTileAbort", (a) => {
        a.src.abortController && a.src.abortController.abort();
      });
      qe(this, "setupComplete", () => {
        this._ready = !0, this.promises.ready.resolve(), this.raiseEvent("ready", { tileSource: this });
      });
      qe(this, "setupLevels", () => {
        if (this._ready)
          return;
        let a = this.GeoTIFFImages.sort((d, I) => I.getWidth() - d.getWidth()), o = this._tileSize, c = this._tileSize, l = a[0].getWidth();
        this.width = l;
        let s = a[0].getHeight();
        if (this.height = s, this.tileOverlap = 0, this.minLevel = 0, this.aspectRatio = this.width / this.height, this.dimensions = new r.Point(this.width, this.height), a.reduce(
          (d, I) => (d.width !== -1 && (d.valid = d.valid && I.getWidth() < d.width), d.width = I.getWidth(), d),
          { valid: !0, width: -1 }
        ).valid)
          this.levels = a.map((d) => {
            let I = d.getWidth(), E = d.getHeight();
            return {
              width: I,
              height: E,
              tileWidth: this.options.tileWidth || d.getTileWidth() || o,
              tileHeight: this.options.tileHeight || d.getTileHeight() || c,
              image: d,
              scaleFactor: 1
            };
          }), this.maxLevel = this.levels.length - 1;
        else {
          let d = Math.ceil(
            Math.log2(Math.max(l / o, s / c))
          ), I = [...Array(d).keys()].filter((E) => E % 2 == 0);
          this.levels = I.map((E) => {
            let x = Math.pow(2, E);
            const v = a.filter((b) => {
              const D = Math.pow(2, E - 1);
              return D >= 0 ? b.getWidth() * D < l && b.getWidth() * x >= l : b.getWidth() * x >= l;
            });
            if (v.length === 0)
              return null;
            const w = v[0];
            return {
              width: l / x,
              height: s / x,
              tileWidth: this.options.tileWidth || w.getTileWidth() || o,
              tileHeight: this.options.tileHeight || w.getTileHeight() || c,
              image: w,
              scaleFactor: x * w.getWidth() / l
            };
          }).filter((E) => E !== null), this.maxLevel = this.levels.length - 1;
        }
        this.levels = this.levels.sort((d, I) => d.width - I.width), this._tileWidth = this.levels[0].tileWidth, this._tileHeight = this.levels[0].tileHeight, this.setupComplete();
      });
      qe(this, "regionToDataUrl", (a, o, c, l) => {
        var b, D, F, R, L;
        let s = this.options.logLatency && Date.now(), d = (l.abortController = new AbortController()).signal;
        const I = a.tileWidth, E = a.tileHeight, x = [o * I, c * E, (o + 1) * I, (c + 1) * E].map(
          (q) => q * a.scaleFactor
        ), v = a.image;
        if ((D = (b = v.fileDirectory) == null ? void 0 : b.Software) == null ? void 0 : D.startsWith("PerkinElmer-QPI")) {
          const q = new DOMParser().parseFromString(
            (F = v.fileDirectory) == null ? void 0 : F.ImageDescription,
            "text/xml"
          );
          (R = q.querySelector("Name")) == null || R.textContent;
          const T = (L = q.querySelector("Color")) == null ? void 0 : L.textContent, j = T ? T.split(",").map(($) => parseInt($)) : [255, 255, 255];
          return a.image.readRGB({
            interleave: !0,
            window: x,
            pool: this._pool,
            width: a.tileWidth,
            height: a.tileHeight,
            signal: d
          }).then(($) => {
            let te = document.createElement("canvas");
            te.width = a.tileWidth, te.height = a.tileHeight;
            let oe = te.getContext("2d"), ne = new Uint8ClampedArray(4 * te.width * te.height), Ae = new Uint8ClampedArray($), ie, se;
            for (ie = 0, se = 0; ie < Ae.length; ie += 3, se += 4)
              ne[se] = Ae[ie] * j[0] / 255, ne[se + 1] = Ae[ie + 1] * j[1] / 255, ne[se + 2] = Ae[ie + 2] * j[2] / 255, ne[se + 3] = 255;
            const ye = oe.createImageData(te.width, te.height);
            ye.data.set(ne), oe.putImageData(ye, 0, 0);
            let Be = te.toDataURL("image/jpeg", 0.8);
            return this.options.logLatency && (typeof this.options.logLatency == "function" ? this.options.logLatency : console.log)("Tile latency (ms):", Date.now() - s), Be;
          });
        } else
          return a.image.getTileOrStrip(o, c, null, this._pool, d).then((q) => {
            let T = new Uint8ClampedArray(q.data), j = document.createElement("canvas");
            j.width = a.tileWidth, j.height = a.tileHeight;
            let $ = j.getContext("2d"), te = a.image.fileDirectory.PhotometricInterpretation, oe;
            if (T.length / (j.width * j.height) % 4 === 0)
              oe = T;
            else
              switch (te) {
                case ke.WhiteIsZero:
                  oe = St.RGBAfromWhiteIsZero(
                    T,
                    2 ** a.image.fileDirectory.BitsPerSample[0]
                  );
                  break;
                case ke.BlackIsZero:
                  oe = St.RGBAfromBlackIsZero(
                    T,
                    2 ** a.image.fileDirectory.BitsPerSample[0]
                  );
                  break;
                case ke.RGB:
                  oe = St.RGBAfromRGB(T);
                  break;
                case ke.Palette:
                  oe = St.RGBAfromPalette(T, 2 ** a.image.fileDirectory.colorMap);
                  break;
                case ke.CMYK:
                  oe = St.RGBAfromCMYK(T);
                  break;
                case ke.YCbCr:
                  oe = St.RGBAfromYCbCr(T);
                  break;
                case ke.CIELab:
                  oe = St.RGBAfromCIELab(T);
                  break;
              }
            const ne = $.createImageData(j.width, j.height);
            ne.data.set(oe), $.putImageData(ne, 0, 0);
            let Ae = j.toDataURL("image/jpeg", 0.8);
            return this.options.logLatency && (typeof this.options.logLatency == "function" ? this.options.logLatency : console.log)(
              "Tile latency (ms):",
              Date.now() - s
            ), Ae;
          });
      });
      n._osdReady || n.applyOSDPatch(r);
      let c = this;
      this.input = a, this.options = o, this.channel = (a == null ? void 0 : a.channel) ?? null, this._ready = !1, this._pool = n.sharedPool, this._tileSize = 256, this._tsCounter = e, e += 1, a.GeoTIFF && a.GeoTIFFImages ? (this.promises = {
        GeoTIFF: Promise.resolve(a.GeoTIFF),
        GeoTIFFImages: Promise.resolve(a.GeoTIFFImages),
        ready: new Ci()
      }, this.GeoTIFF = a.GeoTIFF, this.imageCount = a.GeoTIFFImages.length, this.GeoTIFFImages = a.GeoTIFFImages, this.setupLevels()) : (this.promises = {
        GeoTIFF: a instanceof File ? ua(a) : ca(a),
        GeoTIFFImages: new Ci(),
        ready: new Ci()
      }, this.promises.GeoTIFF.then((l) => (c.GeoTIFF = l, l.getImageCount())).then((l) => {
        c.imageCount = l;
        let s = [...Array(l).keys()].map((p) => c.GeoTIFF.getImage(p));
        return Promise.all(s);
      }).then((l) => {
        c.GeoTIFFImages = l, c.promises.GeoTIFFImages.resolve(l), this.setupLevels();
      }).catch((l) => {
        throw console.error("Re-throwing error with GeoTIFF:", l), l;
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
  qe(n, "sharedPool", new Sc()), qe(n, "_osdReady", !1), // Apply ImageJob patch to OpenSeadragon. Can be extended for modular patches.
  qe(n, "applyOSDPatch", (a) => {
    fI(a), n._osdReady = !0;
  }), qe(n, "getAllTileSources", async (a, o) => {
    const c = a instanceof File ? a.name.split(".").pop() : a.split(".").pop();
    let l = a instanceof File ? ua(a) : ca(a);
    return l.then((s) => (l = s, s.getImageCount())).then(
      (s) => Promise.all([...Array(s).keys()].map(async (p) => (await l).getImage(p)))
    ).then((s) => {
      s = s.filter(
        (E) => E.fileDirectory.photometricInterpretation !== ke.TransparencyMask
      ), s.sort((E, x) => x.getWidth() - E.getWidth());
      const p = 0.015;
      return s.reduce((E, x) => {
        const v = x.getWidth() / x.getHeight();
        let w = "";
        x.fileDirectory.ImageDescription && (w = x.fileDirectory.ImageDescription.split(`
`)[1] ?? "");
        const b = E.filter(
          (D) => Math.abs(1 - D.aspectRatio / v) < p && !(w != null && w.includes("macro") || w != null && w.includes("label"))
          // Separate out macro thumbnails and labels
        );
        if (b.length === 0) {
          let D = {
            aspectRatio: v,
            images: [x]
          };
          E.push(D);
        } else
          b[0].images.push(x);
        return E;
      }, []).map((E) => E.images).map((E, x) => {
        if (x !== 0)
          return new r.GeoTIFFTileSource(
            {
              GeoTIFF: l,
              GeoTIFFImages: E
            },
            o
          );
        switch (c) {
          case "qptiff":
            const v = sI(E);
            return Array.from(v.values()).map((w, b) => new r.GeoTIFFTileSource(
              {
                GeoTIFF: l,
                GeoTIFFImages: w.images,
                channel: {
                  name: w.name,
                  color: w.color
                }
              },
              o
            ));
          default:
            return new r.GeoTIFFTileSource(
              {
                GeoTIFF: l,
                GeoTIFFImages: E
              },
              o
            );
        }
      });
    });
  });
  let t = n;
  r.GeoTIFFTileSource = t;
};
(function(r, e) {
  typeof exports > "u" || typeof r.OpenSeadragon < "u" && e(r.OpenSeadragon);
})(typeof window < "u" ? window : void 0, lI);
class cI extends vt {
  decodeBlock(e) {
    return e;
  }
}
const uI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cI
}, Symbol.toStringTag, { value: "Module" })), ha = 9, wi = 256, oA = 257, hI = 12;
function gI(r, e, t) {
  const n = e % 8, i = Math.floor(e / 8), A = 8 - n, a = e + t - (i + 1) * 8;
  let o = 8 * (i + 2) - (e + t);
  const c = (i + 2) * 8 - e;
  if (o = Math.max(0, o), i >= r.length)
    return console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)"), oA;
  let l = r[i] & 2 ** (8 - n) - 1;
  l <<= t - A;
  let s = l;
  if (i + 1 < r.length) {
    let p = r[i + 1] >>> o;
    p <<= Math.max(0, t - c), s += p;
  }
  if (a > 8 && i + 2 < r.length) {
    const p = (i + 3) * 8 - (e + t), d = r[i + 2] >>> p;
    s += d;
  }
  return s;
}
function Qi(r, e) {
  for (let t = e.length - 1; t >= 0; t--)
    r.push(e[t]);
  return r;
}
function dI(r) {
  const e = new Uint16Array(4093), t = new Uint8Array(4093);
  for (let E = 0; E <= 257; E++)
    e[E] = 4096, t[E] = E;
  let n = 258, i = ha, A = 0;
  function a() {
    n = 258, i = ha;
  }
  function o(E) {
    const x = gI(E, A, i);
    return A += i, x;
  }
  function c(E, x) {
    return t[n] = x, e[n] = E, n++, n - 1;
  }
  function l(E) {
    const x = [];
    for (let v = E; v !== 4096; v = e[v])
      x.push(t[v]);
    return x;
  }
  const s = [];
  a();
  const p = new Uint8Array(r);
  let d = o(p), I;
  for (; d !== oA; ) {
    if (d === wi) {
      for (a(), d = o(p); d === wi; )
        d = o(p);
      if (d === oA)
        break;
      if (d > wi)
        throw new Error(`corrupted code at scanline ${d}`);
      {
        const E = l(d);
        Qi(s, E), I = d;
      }
    } else if (d < n) {
      const E = l(d);
      Qi(s, E), c(I, E[E.length - 1]), I = d;
    } else {
      const E = l(I);
      if (!E)
        throw new Error(`Bogus entry. Not in dictionary, ${I} / ${n}, position: ${A}`);
      Qi(s, E), s.push(E[E.length - 1]), c(I, E[E.length - 1]), I = d;
    }
    n + 1 >= 2 ** i && (i === hI ? I = void 0 : i++), d = o(p);
  }
  return new Uint8Array(s);
}
class pI extends vt {
  decodeBlock(e) {
    return dI(e).buffer;
  }
}
const II = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pI
}, Symbol.toStringTag, { value: "Module" })), Ir = new Int32Array([
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
]), Nr = 4017, Gr = 799, Or = 3406, Pr = 2276, qr = 1567, Hr = 3784, jt = 5793, jr = 2896;
function ga(r, e) {
  let t = 0;
  const n = [];
  let i = 16;
  for (; i > 0 && !r[i - 1]; )
    --i;
  n.push({ children: [], index: 0 });
  let A = n[0], a;
  for (let o = 0; o < i; o++) {
    for (let c = 0; c < r[o]; c++) {
      for (A = n.pop(), A.children[A.index] = e[t]; A.index > 0; )
        A = n.pop();
      for (A.index++, n.push(A); n.length <= o; )
        n.push(a = { children: [], index: 0 }), A.children[A.index] = a.children, A = a;
      t++;
    }
    o + 1 < i && (n.push(a = { children: [], index: 0 }), A.children[A.index] = a.children, A = a);
  }
  return n[0].children;
}
function yI(r, e, t, n, i, A, a, o, c) {
  const { mcusPerLine: l, progressive: s } = t, p = e;
  let d = e, I = 0, E = 0;
  function x() {
    if (E > 0)
      return E--, I >> E & 1;
    if (I = r[d++], I === 255) {
      const N = r[d++];
      if (N)
        throw new Error(`unexpected marker: ${(I << 8 | N).toString(16)}`);
    }
    return E = 7, I >>> 7;
  }
  function v(N) {
    let Y = N, _;
    for (; (_ = x()) !== null; ) {
      if (Y = Y[_], typeof Y == "number")
        return Y;
      if (typeof Y != "object")
        throw new Error("invalid huffman sequence");
    }
    return null;
  }
  function w(N) {
    let Y = N, _ = 0;
    for (; Y > 0; ) {
      const k = x();
      if (k === null)
        return;
      _ = _ << 1 | k, --Y;
    }
    return _;
  }
  function b(N) {
    const Y = w(N);
    return Y >= 1 << N - 1 ? Y : Y + (-1 << N) + 1;
  }
  function D(N, Y) {
    const _ = v(N.huffmanTableDC), k = _ === 0 ? 0 : b(_);
    N.pred += k, Y[0] = N.pred;
    let O = 1;
    for (; O < 64; ) {
      const K = v(N.huffmanTableAC), z = K & 15, Q = K >> 4;
      if (z === 0) {
        if (Q < 15)
          break;
        O += 16;
      } else {
        O += Q;
        const m = Ir[O];
        Y[m] = b(z), O++;
      }
    }
  }
  function F(N, Y) {
    const _ = v(N.huffmanTableDC), k = _ === 0 ? 0 : b(_) << c;
    N.pred += k, Y[0] = N.pred;
  }
  function R(N, Y) {
    Y[0] |= x() << c;
  }
  let L = 0;
  function q(N, Y) {
    if (L > 0) {
      L--;
      return;
    }
    let _ = A;
    const k = a;
    for (; _ <= k; ) {
      const O = v(N.huffmanTableAC), K = O & 15, z = O >> 4;
      if (K === 0) {
        if (z < 15) {
          L = w(z) + (1 << z) - 1;
          break;
        }
        _ += 16;
      } else {
        _ += z;
        const Q = Ir[_];
        Y[Q] = b(K) * (1 << c), _++;
      }
    }
  }
  let T = 0, j;
  function $(N, Y) {
    let _ = A;
    const k = a;
    let O = 0;
    for (; _ <= k; ) {
      const K = Ir[_], z = Y[K] < 0 ? -1 : 1;
      switch (T) {
        case 0: {
          const Q = v(N.huffmanTableAC), m = Q & 15;
          if (O = Q >> 4, m === 0)
            O < 15 ? (L = w(O) + (1 << O), T = 4) : (O = 16, T = 1);
          else {
            if (m !== 1)
              throw new Error("invalid ACn encoding");
            j = b(m), T = O ? 2 : 3;
          }
          continue;
        }
        case 1:
        case 2:
          Y[K] ? Y[K] += (x() << c) * z : (O--, O === 0 && (T = T === 2 ? 3 : 0));
          break;
        case 3:
          Y[K] ? Y[K] += (x() << c) * z : (Y[K] = j << c, T = 0);
          break;
        case 4:
          Y[K] && (Y[K] += (x() << c) * z);
          break;
      }
      _++;
    }
    T === 4 && (L--, L === 0 && (T = 0));
  }
  function te(N, Y, _, k, O) {
    const K = _ / l | 0, z = _ % l, Q = K * N.v + k, m = z * N.h + O;
    Y(N, N.blocks[Q][m]);
  }
  function oe(N, Y, _) {
    const k = _ / N.blocksPerLine | 0, O = _ % N.blocksPerLine;
    Y(N, N.blocks[k][O]);
  }
  const ne = n.length;
  let Ae, ie, se, ye, Be, ge;
  s ? A === 0 ? ge = o === 0 ? F : R : ge = o === 0 ? q : $ : ge = D;
  let Z = 0, re, M;
  ne === 1 ? M = n[0].blocksPerLine * n[0].blocksPerColumn : M = l * t.mcusPerColumn;
  const P = i || M;
  for (; Z < M; ) {
    for (ie = 0; ie < ne; ie++)
      n[ie].pred = 0;
    if (L = 0, ne === 1)
      for (Ae = n[0], Be = 0; Be < P; Be++)
        oe(Ae, ge, Z), Z++;
    else
      for (Be = 0; Be < P; Be++) {
        for (ie = 0; ie < ne; ie++) {
          Ae = n[ie];
          const { h: N, v: Y } = Ae;
          for (se = 0; se < Y; se++)
            for (ye = 0; ye < N; ye++)
              te(Ae, ge, Z, se, ye);
        }
        if (Z++, Z === M)
          break;
      }
    if (E = 0, re = r[d] << 8 | r[d + 1], re < 65280)
      throw new Error("marker was not found");
    if (re >= 65488 && re <= 65495)
      d += 2;
    else
      break;
  }
  return d - p;
}
function EI(r, e) {
  const t = [], { blocksPerLine: n, blocksPerColumn: i } = e, A = n << 3, a = new Int32Array(64), o = new Uint8Array(64);
  function c(l, s, p) {
    const d = e.quantizationTable;
    let I, E, x, v, w, b, D, F, R;
    const L = p;
    let q;
    for (q = 0; q < 64; q++)
      L[q] = l[q] * d[q];
    for (q = 0; q < 8; ++q) {
      const T = 8 * q;
      if (L[1 + T] === 0 && L[2 + T] === 0 && L[3 + T] === 0 && L[4 + T] === 0 && L[5 + T] === 0 && L[6 + T] === 0 && L[7 + T] === 0) {
        R = jt * L[0 + T] + 512 >> 10, L[0 + T] = R, L[1 + T] = R, L[2 + T] = R, L[3 + T] = R, L[4 + T] = R, L[5 + T] = R, L[6 + T] = R, L[7 + T] = R;
        continue;
      }
      I = jt * L[0 + T] + 128 >> 8, E = jt * L[4 + T] + 128 >> 8, x = L[2 + T], v = L[6 + T], w = jr * (L[1 + T] - L[7 + T]) + 128 >> 8, F = jr * (L[1 + T] + L[7 + T]) + 128 >> 8, b = L[3 + T] << 4, D = L[5 + T] << 4, R = I - E + 1 >> 1, I = I + E + 1 >> 1, E = R, R = x * Hr + v * qr + 128 >> 8, x = x * qr - v * Hr + 128 >> 8, v = R, R = w - D + 1 >> 1, w = w + D + 1 >> 1, D = R, R = F + b + 1 >> 1, b = F - b + 1 >> 1, F = R, R = I - v + 1 >> 1, I = I + v + 1 >> 1, v = R, R = E - x + 1 >> 1, E = E + x + 1 >> 1, x = R, R = w * Pr + F * Or + 2048 >> 12, w = w * Or - F * Pr + 2048 >> 12, F = R, R = b * Gr + D * Nr + 2048 >> 12, b = b * Nr - D * Gr + 2048 >> 12, D = R, L[0 + T] = I + F, L[7 + T] = I - F, L[1 + T] = E + D, L[6 + T] = E - D, L[2 + T] = x + b, L[5 + T] = x - b, L[3 + T] = v + w, L[4 + T] = v - w;
    }
    for (q = 0; q < 8; ++q) {
      const T = q;
      if (L[1 * 8 + T] === 0 && L[2 * 8 + T] === 0 && L[3 * 8 + T] === 0 && L[4 * 8 + T] === 0 && L[5 * 8 + T] === 0 && L[6 * 8 + T] === 0 && L[7 * 8 + T] === 0) {
        R = jt * p[q + 0] + 8192 >> 14, L[0 * 8 + T] = R, L[1 * 8 + T] = R, L[2 * 8 + T] = R, L[3 * 8 + T] = R, L[4 * 8 + T] = R, L[5 * 8 + T] = R, L[6 * 8 + T] = R, L[7 * 8 + T] = R;
        continue;
      }
      I = jt * L[0 * 8 + T] + 2048 >> 12, E = jt * L[4 * 8 + T] + 2048 >> 12, x = L[2 * 8 + T], v = L[6 * 8 + T], w = jr * (L[1 * 8 + T] - L[7 * 8 + T]) + 2048 >> 12, F = jr * (L[1 * 8 + T] + L[7 * 8 + T]) + 2048 >> 12, b = L[3 * 8 + T], D = L[5 * 8 + T], R = I - E + 1 >> 1, I = I + E + 1 >> 1, E = R, R = x * Hr + v * qr + 2048 >> 12, x = x * qr - v * Hr + 2048 >> 12, v = R, R = w - D + 1 >> 1, w = w + D + 1 >> 1, D = R, R = F + b + 1 >> 1, b = F - b + 1 >> 1, F = R, R = I - v + 1 >> 1, I = I + v + 1 >> 1, v = R, R = E - x + 1 >> 1, E = E + x + 1 >> 1, x = R, R = w * Pr + F * Or + 2048 >> 12, w = w * Or - F * Pr + 2048 >> 12, F = R, R = b * Gr + D * Nr + 2048 >> 12, b = b * Nr - D * Gr + 2048 >> 12, D = R, L[0 * 8 + T] = I + F, L[7 * 8 + T] = I - F, L[1 * 8 + T] = E + D, L[6 * 8 + T] = E - D, L[2 * 8 + T] = x + b, L[5 * 8 + T] = x - b, L[3 * 8 + T] = v + w, L[4 * 8 + T] = v - w;
    }
    for (q = 0; q < 64; ++q) {
      const T = 128 + (L[q] + 8 >> 4);
      T < 0 ? s[q] = 0 : T > 255 ? s[q] = 255 : s[q] = T;
    }
  }
  for (let l = 0; l < i; l++) {
    const s = l << 3;
    for (let p = 0; p < 8; p++)
      t.push(new Uint8Array(A));
    for (let p = 0; p < n; p++) {
      c(e.blocks[l][p], o, a);
      let d = 0;
      const I = p << 3;
      for (let E = 0; E < 8; E++) {
        const x = t[s + E];
        for (let v = 0; v < 8; v++)
          x[I + v] = o[d++];
      }
    }
  }
  return t;
}
class BI {
  constructor() {
    this.jfif = null, this.adobe = null, this.quantizationTables = [], this.huffmanTablesAC = [], this.huffmanTablesDC = [], this.resetFrames();
  }
  resetFrames() {
    this.frames = [];
  }
  parse(e) {
    let t = 0;
    function n() {
      const o = e[t] << 8 | e[t + 1];
      return t += 2, o;
    }
    function i() {
      const o = n(), c = e.subarray(t, t + o - 2);
      return t += c.length, c;
    }
    function A(o) {
      let c = 0, l = 0, s, p;
      for (p in o.components)
        o.components.hasOwnProperty(p) && (s = o.components[p], c < s.h && (c = s.h), l < s.v && (l = s.v));
      const d = Math.ceil(o.samplesPerLine / 8 / c), I = Math.ceil(o.scanLines / 8 / l);
      for (p in o.components)
        if (o.components.hasOwnProperty(p)) {
          s = o.components[p];
          const E = Math.ceil(Math.ceil(o.samplesPerLine / 8) * s.h / c), x = Math.ceil(Math.ceil(o.scanLines / 8) * s.v / l), v = d * s.h, w = I * s.v, b = [];
          for (let D = 0; D < w; D++) {
            const F = [];
            for (let R = 0; R < v; R++)
              F.push(new Int32Array(64));
            b.push(F);
          }
          s.blocksPerLine = E, s.blocksPerColumn = x, s.blocks = b;
        }
      o.maxH = c, o.maxV = l, o.mcusPerLine = d, o.mcusPerColumn = I;
    }
    let a = n();
    if (a !== 65496)
      throw new Error("SOI not found");
    for (a = n(); a !== 65497; ) {
      switch (a) {
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
          const o = i();
          a === 65504 && o[0] === 74 && o[1] === 70 && o[2] === 73 && o[3] === 70 && o[4] === 0 && (this.jfif = {
            version: { major: o[5], minor: o[6] },
            densityUnits: o[7],
            xDensity: o[8] << 8 | o[9],
            yDensity: o[10] << 8 | o[11],
            thumbWidth: o[12],
            thumbHeight: o[13],
            thumbData: o.subarray(14, 14 + 3 * o[12] * o[13])
          }), a === 65518 && o[0] === 65 && o[1] === 100 && o[2] === 111 && o[3] === 98 && o[4] === 101 && o[5] === 0 && (this.adobe = {
            version: o[6],
            flags0: o[7] << 8 | o[8],
            flags1: o[9] << 8 | o[10],
            transformCode: o[11]
          });
          break;
        }
        case 65499: {
          const c = n() + t - 2;
          for (; t < c; ) {
            const l = e[t++], s = new Int32Array(64);
            if (l >> 4)
              if (l >> 4 === 1)
                for (let p = 0; p < 64; p++) {
                  const d = Ir[p];
                  s[d] = n();
                }
              else
                throw new Error("DQT: invalid table spec");
            else for (let p = 0; p < 64; p++) {
              const d = Ir[p];
              s[d] = e[t++];
            }
            this.quantizationTables[l & 15] = s;
          }
          break;
        }
        case 65472:
        case 65473:
        case 65474: {
          n();
          const o = {
            extended: a === 65473,
            progressive: a === 65474,
            precision: e[t++],
            scanLines: n(),
            samplesPerLine: n(),
            components: {},
            componentsOrder: []
          }, c = e[t++];
          let l;
          for (let s = 0; s < c; s++) {
            l = e[t];
            const p = e[t + 1] >> 4, d = e[t + 1] & 15, I = e[t + 2];
            o.componentsOrder.push(l), o.components[l] = {
              h: p,
              v: d,
              quantizationIdx: I
            }, t += 3;
          }
          A(o), this.frames.push(o);
          break;
        }
        case 65476: {
          const o = n();
          for (let c = 2; c < o; ) {
            const l = e[t++], s = new Uint8Array(16);
            let p = 0;
            for (let I = 0; I < 16; I++, t++)
              s[I] = e[t], p += s[I];
            const d = new Uint8Array(p);
            for (let I = 0; I < p; I++, t++)
              d[I] = e[t];
            c += 17 + p, l >> 4 ? this.huffmanTablesAC[l & 15] = ga(
              s,
              d
            ) : this.huffmanTablesDC[l & 15] = ga(
              s,
              d
            );
          }
          break;
        }
        case 65501:
          n(), this.resetInterval = n();
          break;
        case 65498: {
          n();
          const o = e[t++], c = [], l = this.frames[0];
          for (let E = 0; E < o; E++) {
            const x = l.components[e[t++]], v = e[t++];
            x.huffmanTableDC = this.huffmanTablesDC[v >> 4], x.huffmanTableAC = this.huffmanTablesAC[v & 15], c.push(x);
          }
          const s = e[t++], p = e[t++], d = e[t++], I = yI(
            e,
            t,
            l,
            c,
            this.resetInterval,
            s,
            p,
            d >> 4,
            d & 15
          );
          t += I;
          break;
        }
        case 65535:
          e[t] !== 255 && t--;
          break;
        default:
          if (e[t - 3] === 255 && e[t - 2] >= 192 && e[t - 2] <= 254) {
            t -= 3;
            break;
          }
          throw new Error(`unknown JPEG marker ${a.toString(16)}`);
      }
      a = n();
    }
  }
  getResult() {
    const { frames: e } = this;
    if (this.frames.length === 0)
      throw new Error("no frames were decoded");
    this.frames.length > 1 && console.warn("more than one frame is not supported");
    for (let s = 0; s < this.frames.length; s++) {
      const p = this.frames[s].components;
      for (const d of Object.keys(p))
        p[d].quantizationTable = this.quantizationTables[p[d].quantizationIdx], delete p[d].quantizationIdx;
    }
    const t = e[0], { components: n, componentsOrder: i } = t, A = [], a = t.samplesPerLine, o = t.scanLines;
    for (let s = 0; s < i.length; s++) {
      const p = n[i[s]];
      A.push({
        lines: EI(t, p),
        scaleX: p.h / t.maxH,
        scaleY: p.v / t.maxV
      });
    }
    const c = new Uint8Array(a * o * A.length);
    let l = 0;
    for (let s = 0; s < o; ++s)
      for (let p = 0; p < a; ++p)
        for (let d = 0; d < A.length; ++d) {
          const I = A[d];
          c[l] = I.lines[0 | s * I.scaleY][0 | p * I.scaleX], ++l;
        }
    return c;
  }
}
class CI extends vt {
  constructor(e) {
    super(), this.reader = new BI(), e.JPEGTables && this.reader.parse(e.JPEGTables);
  }
  decodeBlock(e) {
    try {
      return this.reader.resetFrames(), this.reader.parse(new Uint8Array(e)), this.reader.getResult().buffer;
    } catch (t) {
      if (t.message === "SOI not found") {
        console.warn("Suppressed JPEG decoding error: SOI not found");
        const n = new ArrayBuffer(4), i = new Uint8Array(n);
        return i[0] = 0, i[1] = 0, i[2] = 0, i[3] = 0, n;
      }
      throw t;
    }
  }
}
const wI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CI
}, Symbol.toStringTag, { value: "Module" }));
function sr(r) {
  let e = r.length;
  for (; --e >= 0; )
    r[e] = 0;
}
const QI = 3, mI = 258, Vf = 29, bI = 256, vI = bI + 1 + Vf, $f = 30, SI = 512, xI = new Array((vI + 2) * 2);
sr(xI);
const DI = new Array($f * 2);
sr(DI);
const FI = new Array(SI);
sr(FI);
const RI = new Array(mI - QI + 1);
sr(RI);
const _I = new Array(Vf);
sr(_I);
const TI = new Array($f);
sr(TI);
const kI = (r, e, t, n) => {
  let i = r & 65535 | 0, A = r >>> 16 & 65535 | 0, a = 0;
  for (; t !== 0; ) {
    a = t > 2e3 ? 2e3 : t, t -= a;
    do
      i = i + e[n++] | 0, A = A + i | 0;
    while (--a);
    i %= 65521, A %= 65521;
  }
  return i | A << 16 | 0;
};
var aA = kI;
const LI = () => {
  let r, e = [];
  for (var t = 0; t < 256; t++) {
    r = t;
    for (var n = 0; n < 8; n++)
      r = r & 1 ? 3988292384 ^ r >>> 1 : r >>> 1;
    e[t] = r;
  }
  return e;
}, MI = new Uint32Array(LI()), UI = (r, e, t, n) => {
  const i = MI, A = n + t;
  r ^= -1;
  for (let a = n; a < A; a++)
    r = r >>> 8 ^ i[(r ^ e[a]) & 255];
  return r ^ -1;
};
var et = UI, sA = {
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
}, zf = {
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
const NI = (r, e) => Object.prototype.hasOwnProperty.call(r, e);
var GI = function(r) {
  const e = Array.prototype.slice.call(arguments, 1);
  for (; e.length; ) {
    const t = e.shift();
    if (t) {
      if (typeof t != "object")
        throw new TypeError(t + "must be non-object");
      for (const n in t)
        NI(t, n) && (r[n] = t[n]);
    }
  }
  return r;
}, OI = (r) => {
  let e = 0;
  for (let n = 0, i = r.length; n < i; n++)
    e += r[n].length;
  const t = new Uint8Array(e);
  for (let n = 0, i = 0, A = r.length; n < A; n++) {
    let a = r[n];
    t.set(a, i), i += a.length;
  }
  return t;
}, Xf = {
  assign: GI,
  flattenChunks: OI
};
let Zf = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  Zf = !1;
}
const wr = new Uint8Array(256);
for (let r = 0; r < 256; r++)
  wr[r] = r >= 252 ? 6 : r >= 248 ? 5 : r >= 240 ? 4 : r >= 224 ? 3 : r >= 192 ? 2 : 1;
wr[254] = wr[254] = 1;
var PI = (r) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(r);
  let e, t, n, i, A, a = r.length, o = 0;
  for (i = 0; i < a; i++)
    t = r.charCodeAt(i), (t & 64512) === 55296 && i + 1 < a && (n = r.charCodeAt(i + 1), (n & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (n - 56320), i++)), o += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4;
  for (e = new Uint8Array(o), A = 0, i = 0; A < o; i++)
    t = r.charCodeAt(i), (t & 64512) === 55296 && i + 1 < a && (n = r.charCodeAt(i + 1), (n & 64512) === 56320 && (t = 65536 + (t - 55296 << 10) + (n - 56320), i++)), t < 128 ? e[A++] = t : t < 2048 ? (e[A++] = 192 | t >>> 6, e[A++] = 128 | t & 63) : t < 65536 ? (e[A++] = 224 | t >>> 12, e[A++] = 128 | t >>> 6 & 63, e[A++] = 128 | t & 63) : (e[A++] = 240 | t >>> 18, e[A++] = 128 | t >>> 12 & 63, e[A++] = 128 | t >>> 6 & 63, e[A++] = 128 | t & 63);
  return e;
};
const qI = (r, e) => {
  if (e < 65534 && r.subarray && Zf)
    return String.fromCharCode.apply(null, r.length === e ? r : r.subarray(0, e));
  let t = "";
  for (let n = 0; n < e; n++)
    t += String.fromCharCode(r[n]);
  return t;
};
var HI = (r, e) => {
  const t = e || r.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(r.subarray(0, e));
  let n, i;
  const A = new Array(t * 2);
  for (i = 0, n = 0; n < t; ) {
    let a = r[n++];
    if (a < 128) {
      A[i++] = a;
      continue;
    }
    let o = wr[a];
    if (o > 4) {
      A[i++] = 65533, n += o - 1;
      continue;
    }
    for (a &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && n < t; )
      a = a << 6 | r[n++] & 63, o--;
    if (o > 1) {
      A[i++] = 65533;
      continue;
    }
    a < 65536 ? A[i++] = a : (a -= 65536, A[i++] = 55296 | a >> 10 & 1023, A[i++] = 56320 | a & 1023);
  }
  return qI(A, i);
}, jI = (r, e) => {
  e = e || r.length, e > r.length && (e = r.length);
  let t = e - 1;
  for (; t >= 0 && (r[t] & 192) === 128; )
    t--;
  return t < 0 || t === 0 ? e : t + wr[r[t]] > e ? t : e;
}, fA = {
  string2buf: PI,
  buf2string: HI,
  utf8border: jI
};
function JI() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var YI = JI;
const Jr = 16209, KI = 16191;
var WI = function(e, t) {
  let n, i, A, a, o, c, l, s, p, d, I, E, x, v, w, b, D, F, R, L, q, T, j, $;
  const te = e.state;
  n = e.next_in, j = e.input, i = n + (e.avail_in - 5), A = e.next_out, $ = e.output, a = A - (t - e.avail_out), o = A + (e.avail_out - 257), c = te.dmax, l = te.wsize, s = te.whave, p = te.wnext, d = te.window, I = te.hold, E = te.bits, x = te.lencode, v = te.distcode, w = (1 << te.lenbits) - 1, b = (1 << te.distbits) - 1;
  e:
    do {
      E < 15 && (I += j[n++] << E, E += 8, I += j[n++] << E, E += 8), D = x[I & w];
      t:
        for (; ; ) {
          if (F = D >>> 24, I >>>= F, E -= F, F = D >>> 16 & 255, F === 0)
            $[A++] = D & 65535;
          else if (F & 16) {
            R = D & 65535, F &= 15, F && (E < F && (I += j[n++] << E, E += 8), R += I & (1 << F) - 1, I >>>= F, E -= F), E < 15 && (I += j[n++] << E, E += 8, I += j[n++] << E, E += 8), D = v[I & b];
            r:
              for (; ; ) {
                if (F = D >>> 24, I >>>= F, E -= F, F = D >>> 16 & 255, F & 16) {
                  if (L = D & 65535, F &= 15, E < F && (I += j[n++] << E, E += 8, E < F && (I += j[n++] << E, E += 8)), L += I & (1 << F) - 1, L > c) {
                    e.msg = "invalid distance too far back", te.mode = Jr;
                    break e;
                  }
                  if (I >>>= F, E -= F, F = A - a, L > F) {
                    if (F = L - F, F > s && te.sane) {
                      e.msg = "invalid distance too far back", te.mode = Jr;
                      break e;
                    }
                    if (q = 0, T = d, p === 0) {
                      if (q += l - F, F < R) {
                        R -= F;
                        do
                          $[A++] = d[q++];
                        while (--F);
                        q = A - L, T = $;
                      }
                    } else if (p < F) {
                      if (q += l + p - F, F -= p, F < R) {
                        R -= F;
                        do
                          $[A++] = d[q++];
                        while (--F);
                        if (q = 0, p < R) {
                          F = p, R -= F;
                          do
                            $[A++] = d[q++];
                          while (--F);
                          q = A - L, T = $;
                        }
                      }
                    } else if (q += p - F, F < R) {
                      R -= F;
                      do
                        $[A++] = d[q++];
                      while (--F);
                      q = A - L, T = $;
                    }
                    for (; R > 2; )
                      $[A++] = T[q++], $[A++] = T[q++], $[A++] = T[q++], R -= 3;
                    R && ($[A++] = T[q++], R > 1 && ($[A++] = T[q++]));
                  } else {
                    q = A - L;
                    do
                      $[A++] = $[q++], $[A++] = $[q++], $[A++] = $[q++], R -= 3;
                    while (R > 2);
                    R && ($[A++] = $[q++], R > 1 && ($[A++] = $[q++]));
                  }
                } else if (F & 64) {
                  e.msg = "invalid distance code", te.mode = Jr;
                  break e;
                } else {
                  D = v[(D & 65535) + (I & (1 << F) - 1)];
                  continue r;
                }
                break;
              }
          } else if (F & 64)
            if (F & 32) {
              te.mode = KI;
              break e;
            } else {
              e.msg = "invalid literal/length code", te.mode = Jr;
              break e;
            }
          else {
            D = x[(D & 65535) + (I & (1 << F) - 1)];
            continue t;
          }
          break;
        }
    } while (n < i && A < o);
  R = E >> 3, n -= R, E -= R << 3, I &= (1 << E) - 1, e.next_in = n, e.next_out = A, e.avail_in = n < i ? 5 + (i - n) : 5 - (n - i), e.avail_out = A < o ? 257 + (o - A) : 257 - (A - o), te.hold = I, te.bits = E;
};
const Jt = 15, da = 852, pa = 592, Ia = 0, mi = 1, ya = 2, VI = new Uint16Array([
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
]), $I = new Uint8Array([
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
]), zI = new Uint16Array([
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
]), XI = new Uint8Array([
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
]), ZI = (r, e, t, n, i, A, a, o) => {
  const c = o.bits;
  let l = 0, s = 0, p = 0, d = 0, I = 0, E = 0, x = 0, v = 0, w = 0, b = 0, D, F, R, L, q, T = null, j;
  const $ = new Uint16Array(Jt + 1), te = new Uint16Array(Jt + 1);
  let oe = null, ne, Ae, ie;
  for (l = 0; l <= Jt; l++)
    $[l] = 0;
  for (s = 0; s < n; s++)
    $[e[t + s]]++;
  for (I = c, d = Jt; d >= 1 && $[d] === 0; d--)
    ;
  if (I > d && (I = d), d === 0)
    return i[A++] = 1 << 24 | 64 << 16 | 0, i[A++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (p = 1; p < d && $[p] === 0; p++)
    ;
  for (I < p && (I = p), v = 1, l = 1; l <= Jt; l++)
    if (v <<= 1, v -= $[l], v < 0)
      return -1;
  if (v > 0 && (r === Ia || d !== 1))
    return -1;
  for (te[1] = 0, l = 1; l < Jt; l++)
    te[l + 1] = te[l] + $[l];
  for (s = 0; s < n; s++)
    e[t + s] !== 0 && (a[te[e[t + s]]++] = s);
  if (r === Ia ? (T = oe = a, j = 20) : r === mi ? (T = VI, oe = $I, j = 257) : (T = zI, oe = XI, j = 0), b = 0, s = 0, l = p, q = A, E = I, x = 0, R = -1, w = 1 << I, L = w - 1, r === mi && w > da || r === ya && w > pa)
    return 1;
  for (; ; ) {
    ne = l - x, a[s] + 1 < j ? (Ae = 0, ie = a[s]) : a[s] >= j ? (Ae = oe[a[s] - j], ie = T[a[s] - j]) : (Ae = 96, ie = 0), D = 1 << l - x, F = 1 << E, p = F;
    do
      F -= D, i[q + (b >> x) + F] = ne << 24 | Ae << 16 | ie | 0;
    while (F !== 0);
    for (D = 1 << l - 1; b & D; )
      D >>= 1;
    if (D !== 0 ? (b &= D - 1, b += D) : b = 0, s++, --$[l] === 0) {
      if (l === d)
        break;
      l = e[t + a[s]];
    }
    if (l > I && (b & L) !== R) {
      for (x === 0 && (x = I), q += p, E = l - x, v = 1 << E; E + x < d && (v -= $[E + x], !(v <= 0)); )
        E++, v <<= 1;
      if (w += 1 << E, r === mi && w > da || r === ya && w > pa)
        return 1;
      R = b & L, i[R] = I << 24 | E << 16 | q - A | 0;
    }
  }
  return b !== 0 && (i[q + b] = l - x << 24 | 64 << 16 | 0), o.bits = I, 0;
};
var yr = ZI;
const ey = 0, el = 1, tl = 2, {
  Z_FINISH: Ea,
  Z_BLOCK: ty,
  Z_TREES: Yr,
  Z_OK: Tt,
  Z_STREAM_END: ry,
  Z_NEED_DICT: ny,
  Z_STREAM_ERROR: We,
  Z_DATA_ERROR: rl,
  Z_MEM_ERROR: nl,
  Z_BUF_ERROR: iy,
  Z_DEFLATED: Ba
} = zf, kn = 16180, Ca = 16181, wa = 16182, Qa = 16183, ma = 16184, ba = 16185, va = 16186, Sa = 16187, xa = 16188, Da = 16189, In = 16190, st = 16191, bi = 16192, Fa = 16193, vi = 16194, Ra = 16195, _a = 16196, Ta = 16197, ka = 16198, Kr = 16199, Wr = 16200, La = 16201, Ma = 16202, Ua = 16203, Na = 16204, Ga = 16205, Si = 16206, Oa = 16207, Pa = 16208, De = 16209, il = 16210, Al = 16211, Ay = 852, oy = 592, ay = 15, sy = ay, qa = (r) => (r >>> 24 & 255) + (r >>> 8 & 65280) + ((r & 65280) << 8) + ((r & 255) << 24);
function fy() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const Ut = (r) => {
  if (!r)
    return 1;
  const e = r.state;
  return !e || e.strm !== r || e.mode < kn || e.mode > Al ? 1 : 0;
}, ol = (r) => {
  if (Ut(r))
    return We;
  const e = r.state;
  return r.total_in = r.total_out = e.total = 0, r.msg = "", e.wrap && (r.adler = e.wrap & 1), e.mode = kn, e.last = 0, e.havedict = 0, e.flags = -1, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(Ay), e.distcode = e.distdyn = new Int32Array(oy), e.sane = 1, e.back = -1, Tt;
}, al = (r) => {
  if (Ut(r))
    return We;
  const e = r.state;
  return e.wsize = 0, e.whave = 0, e.wnext = 0, ol(r);
}, sl = (r, e) => {
  let t;
  if (Ut(r))
    return We;
  const n = r.state;
  return e < 0 ? (t = 0, e = -e) : (t = (e >> 4) + 5, e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? We : (n.window !== null && n.wbits !== e && (n.window = null), n.wrap = t, n.wbits = e, al(r));
}, fl = (r, e) => {
  if (!r)
    return We;
  const t = new fy();
  r.state = t, t.strm = r, t.window = null, t.mode = kn;
  const n = sl(r, e);
  return n !== Tt && (r.state = null), n;
}, ly = (r) => fl(r, sy);
let Ha = !0, xi, Di;
const cy = (r) => {
  if (Ha) {
    xi = new Int32Array(512), Di = new Int32Array(32);
    let e = 0;
    for (; e < 144; )
      r.lens[e++] = 8;
    for (; e < 256; )
      r.lens[e++] = 9;
    for (; e < 280; )
      r.lens[e++] = 7;
    for (; e < 288; )
      r.lens[e++] = 8;
    for (yr(el, r.lens, 0, 288, xi, 0, r.work, { bits: 9 }), e = 0; e < 32; )
      r.lens[e++] = 5;
    yr(tl, r.lens, 0, 32, Di, 0, r.work, { bits: 5 }), Ha = !1;
  }
  r.lencode = xi, r.lenbits = 9, r.distcode = Di, r.distbits = 5;
}, ll = (r, e, t, n) => {
  let i;
  const A = r.state;
  return A.window === null && (A.wsize = 1 << A.wbits, A.wnext = 0, A.whave = 0, A.window = new Uint8Array(A.wsize)), n >= A.wsize ? (A.window.set(e.subarray(t - A.wsize, t), 0), A.wnext = 0, A.whave = A.wsize) : (i = A.wsize - A.wnext, i > n && (i = n), A.window.set(e.subarray(t - n, t - n + i), A.wnext), n -= i, n ? (A.window.set(e.subarray(t - n, t), 0), A.wnext = n, A.whave = A.wsize) : (A.wnext += i, A.wnext === A.wsize && (A.wnext = 0), A.whave < A.wsize && (A.whave += i))), 0;
}, uy = (r, e) => {
  let t, n, i, A, a, o, c, l, s, p, d, I, E, x, v = 0, w, b, D, F, R, L, q, T;
  const j = new Uint8Array(4);
  let $, te;
  const oe = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (Ut(r) || !r.output || !r.input && r.avail_in !== 0)
    return We;
  t = r.state, t.mode === st && (t.mode = bi), a = r.next_out, i = r.output, c = r.avail_out, A = r.next_in, n = r.input, o = r.avail_in, l = t.hold, s = t.bits, p = o, d = c, T = Tt;
  e:
    for (; ; )
      switch (t.mode) {
        case kn:
          if (t.wrap === 0) {
            t.mode = bi;
            break;
          }
          for (; s < 16; ) {
            if (o === 0)
              break e;
            o--, l += n[A++] << s, s += 8;
          }
          if (t.wrap & 2 && l === 35615) {
            t.wbits === 0 && (t.wbits = 15), t.check = 0, j[0] = l & 255, j[1] = l >>> 8 & 255, t.check = et(t.check, j, 2, 0), l = 0, s = 0, t.mode = Ca;
            break;
          }
          if (t.head && (t.head.done = !1), !(t.wrap & 1) || /* check if zlib header allowed */
          (((l & 255) << 8) + (l >> 8)) % 31) {
            r.msg = "incorrect header check", t.mode = De;
            break;
          }
          if ((l & 15) !== Ba) {
            r.msg = "unknown compression method", t.mode = De;
            break;
          }
          if (l >>>= 4, s -= 4, q = (l & 15) + 8, t.wbits === 0 && (t.wbits = q), q > 15 || q > t.wbits) {
            r.msg = "invalid window size", t.mode = De;
            break;
          }
          t.dmax = 1 << t.wbits, t.flags = 0, r.adler = t.check = 1, t.mode = l & 512 ? Da : st, l = 0, s = 0;
          break;
        case Ca:
          for (; s < 16; ) {
            if (o === 0)
              break e;
            o--, l += n[A++] << s, s += 8;
          }
          if (t.flags = l, (t.flags & 255) !== Ba) {
            r.msg = "unknown compression method", t.mode = De;
            break;
          }
          if (t.flags & 57344) {
            r.msg = "unknown header flags set", t.mode = De;
            break;
          }
          t.head && (t.head.text = l >> 8 & 1), t.flags & 512 && t.wrap & 4 && (j[0] = l & 255, j[1] = l >>> 8 & 255, t.check = et(t.check, j, 2, 0)), l = 0, s = 0, t.mode = wa;
        case wa:
          for (; s < 32; ) {
            if (o === 0)
              break e;
            o--, l += n[A++] << s, s += 8;
          }
          t.head && (t.head.time = l), t.flags & 512 && t.wrap & 4 && (j[0] = l & 255, j[1] = l >>> 8 & 255, j[2] = l >>> 16 & 255, j[3] = l >>> 24 & 255, t.check = et(t.check, j, 4, 0)), l = 0, s = 0, t.mode = Qa;
        case Qa:
          for (; s < 16; ) {
            if (o === 0)
              break e;
            o--, l += n[A++] << s, s += 8;
          }
          t.head && (t.head.xflags = l & 255, t.head.os = l >> 8), t.flags & 512 && t.wrap & 4 && (j[0] = l & 255, j[1] = l >>> 8 & 255, t.check = et(t.check, j, 2, 0)), l = 0, s = 0, t.mode = ma;
        case ma:
          if (t.flags & 1024) {
            for (; s < 16; ) {
              if (o === 0)
                break e;
              o--, l += n[A++] << s, s += 8;
            }
            t.length = l, t.head && (t.head.extra_len = l), t.flags & 512 && t.wrap & 4 && (j[0] = l & 255, j[1] = l >>> 8 & 255, t.check = et(t.check, j, 2, 0)), l = 0, s = 0;
          } else t.head && (t.head.extra = null);
          t.mode = ba;
        case ba:
          if (t.flags & 1024 && (I = t.length, I > o && (I = o), I && (t.head && (q = t.head.extra_len - t.length, t.head.extra || (t.head.extra = new Uint8Array(t.head.extra_len)), t.head.extra.set(
            n.subarray(
              A,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              A + I
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            q
          )), t.flags & 512 && t.wrap & 4 && (t.check = et(t.check, n, I, A)), o -= I, A += I, t.length -= I), t.length))
            break e;
          t.length = 0, t.mode = va;
        case va:
          if (t.flags & 2048) {
            if (o === 0)
              break e;
            I = 0;
            do
              q = n[A + I++], t.head && q && t.length < 65536 && (t.head.name += String.fromCharCode(q));
            while (q && I < o);
            if (t.flags & 512 && t.wrap & 4 && (t.check = et(t.check, n, I, A)), o -= I, A += I, q)
              break e;
          } else t.head && (t.head.name = null);
          t.length = 0, t.mode = Sa;
        case Sa:
          if (t.flags & 4096) {
            if (o === 0)
              break e;
            I = 0;
            do
              q = n[A + I++], t.head && q && t.length < 65536 && (t.head.comment += String.fromCharCode(q));
            while (q && I < o);
            if (t.flags & 512 && t.wrap & 4 && (t.check = et(t.check, n, I, A)), o -= I, A += I, q)
              break e;
          } else t.head && (t.head.comment = null);
          t.mode = xa;
        case xa:
          if (t.flags & 512) {
            for (; s < 16; ) {
              if (o === 0)
                break e;
              o--, l += n[A++] << s, s += 8;
            }
            if (t.wrap & 4 && l !== (t.check & 65535)) {
              r.msg = "header crc mismatch", t.mode = De;
              break;
            }
            l = 0, s = 0;
          }
          t.head && (t.head.hcrc = t.flags >> 9 & 1, t.head.done = !0), r.adler = t.check = 0, t.mode = st;
          break;
        case Da:
          for (; s < 32; ) {
            if (o === 0)
              break e;
            o--, l += n[A++] << s, s += 8;
          }
          r.adler = t.check = qa(l), l = 0, s = 0, t.mode = In;
        case In:
          if (t.havedict === 0)
            return r.next_out = a, r.avail_out = c, r.next_in = A, r.avail_in = o, t.hold = l, t.bits = s, ny;
          r.adler = t.check = 1, t.mode = st;
        case st:
          if (e === ty || e === Yr)
            break e;
        case bi:
          if (t.last) {
            l >>>= s & 7, s -= s & 7, t.mode = Si;
            break;
          }
          for (; s < 3; ) {
            if (o === 0)
              break e;
            o--, l += n[A++] << s, s += 8;
          }
          switch (t.last = l & 1, l >>>= 1, s -= 1, l & 3) {
            case 0:
              t.mode = Fa;
              break;
            case 1:
              if (cy(t), t.mode = Kr, e === Yr) {
                l >>>= 2, s -= 2;
                break e;
              }
              break;
            case 2:
              t.mode = _a;
              break;
            case 3:
              r.msg = "invalid block type", t.mode = De;
          }
          l >>>= 2, s -= 2;
          break;
        case Fa:
          for (l >>>= s & 7, s -= s & 7; s < 32; ) {
            if (o === 0)
              break e;
            o--, l += n[A++] << s, s += 8;
          }
          if ((l & 65535) !== (l >>> 16 ^ 65535)) {
            r.msg = "invalid stored block lengths", t.mode = De;
            break;
          }
          if (t.length = l & 65535, l = 0, s = 0, t.mode = vi, e === Yr)
            break e;
        case vi:
          t.mode = Ra;
        case Ra:
          if (I = t.length, I) {
            if (I > o && (I = o), I > c && (I = c), I === 0)
              break e;
            i.set(n.subarray(A, A + I), a), o -= I, A += I, c -= I, a += I, t.length -= I;
            break;
          }
          t.mode = st;
          break;
        case _a:
          for (; s < 14; ) {
            if (o === 0)
              break e;
            o--, l += n[A++] << s, s += 8;
          }
          if (t.nlen = (l & 31) + 257, l >>>= 5, s -= 5, t.ndist = (l & 31) + 1, l >>>= 5, s -= 5, t.ncode = (l & 15) + 4, l >>>= 4, s -= 4, t.nlen > 286 || t.ndist > 30) {
            r.msg = "too many length or distance symbols", t.mode = De;
            break;
          }
          t.have = 0, t.mode = Ta;
        case Ta:
          for (; t.have < t.ncode; ) {
            for (; s < 3; ) {
              if (o === 0)
                break e;
              o--, l += n[A++] << s, s += 8;
            }
            t.lens[oe[t.have++]] = l & 7, l >>>= 3, s -= 3;
          }
          for (; t.have < 19; )
            t.lens[oe[t.have++]] = 0;
          if (t.lencode = t.lendyn, t.lenbits = 7, $ = { bits: t.lenbits }, T = yr(ey, t.lens, 0, 19, t.lencode, 0, t.work, $), t.lenbits = $.bits, T) {
            r.msg = "invalid code lengths set", t.mode = De;
            break;
          }
          t.have = 0, t.mode = ka;
        case ka:
          for (; t.have < t.nlen + t.ndist; ) {
            for (; v = t.lencode[l & (1 << t.lenbits) - 1], w = v >>> 24, b = v >>> 16 & 255, D = v & 65535, !(w <= s); ) {
              if (o === 0)
                break e;
              o--, l += n[A++] << s, s += 8;
            }
            if (D < 16)
              l >>>= w, s -= w, t.lens[t.have++] = D;
            else {
              if (D === 16) {
                for (te = w + 2; s < te; ) {
                  if (o === 0)
                    break e;
                  o--, l += n[A++] << s, s += 8;
                }
                if (l >>>= w, s -= w, t.have === 0) {
                  r.msg = "invalid bit length repeat", t.mode = De;
                  break;
                }
                q = t.lens[t.have - 1], I = 3 + (l & 3), l >>>= 2, s -= 2;
              } else if (D === 17) {
                for (te = w + 3; s < te; ) {
                  if (o === 0)
                    break e;
                  o--, l += n[A++] << s, s += 8;
                }
                l >>>= w, s -= w, q = 0, I = 3 + (l & 7), l >>>= 3, s -= 3;
              } else {
                for (te = w + 7; s < te; ) {
                  if (o === 0)
                    break e;
                  o--, l += n[A++] << s, s += 8;
                }
                l >>>= w, s -= w, q = 0, I = 11 + (l & 127), l >>>= 7, s -= 7;
              }
              if (t.have + I > t.nlen + t.ndist) {
                r.msg = "invalid bit length repeat", t.mode = De;
                break;
              }
              for (; I--; )
                t.lens[t.have++] = q;
            }
          }
          if (t.mode === De)
            break;
          if (t.lens[256] === 0) {
            r.msg = "invalid code -- missing end-of-block", t.mode = De;
            break;
          }
          if (t.lenbits = 9, $ = { bits: t.lenbits }, T = yr(el, t.lens, 0, t.nlen, t.lencode, 0, t.work, $), t.lenbits = $.bits, T) {
            r.msg = "invalid literal/lengths set", t.mode = De;
            break;
          }
          if (t.distbits = 6, t.distcode = t.distdyn, $ = { bits: t.distbits }, T = yr(tl, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, $), t.distbits = $.bits, T) {
            r.msg = "invalid distances set", t.mode = De;
            break;
          }
          if (t.mode = Kr, e === Yr)
            break e;
        case Kr:
          t.mode = Wr;
        case Wr:
          if (o >= 6 && c >= 258) {
            r.next_out = a, r.avail_out = c, r.next_in = A, r.avail_in = o, t.hold = l, t.bits = s, WI(r, d), a = r.next_out, i = r.output, c = r.avail_out, A = r.next_in, n = r.input, o = r.avail_in, l = t.hold, s = t.bits, t.mode === st && (t.back = -1);
            break;
          }
          for (t.back = 0; v = t.lencode[l & (1 << t.lenbits) - 1], w = v >>> 24, b = v >>> 16 & 255, D = v & 65535, !(w <= s); ) {
            if (o === 0)
              break e;
            o--, l += n[A++] << s, s += 8;
          }
          if (b && !(b & 240)) {
            for (F = w, R = b, L = D; v = t.lencode[L + ((l & (1 << F + R) - 1) >> F)], w = v >>> 24, b = v >>> 16 & 255, D = v & 65535, !(F + w <= s); ) {
              if (o === 0)
                break e;
              o--, l += n[A++] << s, s += 8;
            }
            l >>>= F, s -= F, t.back += F;
          }
          if (l >>>= w, s -= w, t.back += w, t.length = D, b === 0) {
            t.mode = Ga;
            break;
          }
          if (b & 32) {
            t.back = -1, t.mode = st;
            break;
          }
          if (b & 64) {
            r.msg = "invalid literal/length code", t.mode = De;
            break;
          }
          t.extra = b & 15, t.mode = La;
        case La:
          if (t.extra) {
            for (te = t.extra; s < te; ) {
              if (o === 0)
                break e;
              o--, l += n[A++] << s, s += 8;
            }
            t.length += l & (1 << t.extra) - 1, l >>>= t.extra, s -= t.extra, t.back += t.extra;
          }
          t.was = t.length, t.mode = Ma;
        case Ma:
          for (; v = t.distcode[l & (1 << t.distbits) - 1], w = v >>> 24, b = v >>> 16 & 255, D = v & 65535, !(w <= s); ) {
            if (o === 0)
              break e;
            o--, l += n[A++] << s, s += 8;
          }
          if (!(b & 240)) {
            for (F = w, R = b, L = D; v = t.distcode[L + ((l & (1 << F + R) - 1) >> F)], w = v >>> 24, b = v >>> 16 & 255, D = v & 65535, !(F + w <= s); ) {
              if (o === 0)
                break e;
              o--, l += n[A++] << s, s += 8;
            }
            l >>>= F, s -= F, t.back += F;
          }
          if (l >>>= w, s -= w, t.back += w, b & 64) {
            r.msg = "invalid distance code", t.mode = De;
            break;
          }
          t.offset = D, t.extra = b & 15, t.mode = Ua;
        case Ua:
          if (t.extra) {
            for (te = t.extra; s < te; ) {
              if (o === 0)
                break e;
              o--, l += n[A++] << s, s += 8;
            }
            t.offset += l & (1 << t.extra) - 1, l >>>= t.extra, s -= t.extra, t.back += t.extra;
          }
          if (t.offset > t.dmax) {
            r.msg = "invalid distance too far back", t.mode = De;
            break;
          }
          t.mode = Na;
        case Na:
          if (c === 0)
            break e;
          if (I = d - c, t.offset > I) {
            if (I = t.offset - I, I > t.whave && t.sane) {
              r.msg = "invalid distance too far back", t.mode = De;
              break;
            }
            I > t.wnext ? (I -= t.wnext, E = t.wsize - I) : E = t.wnext - I, I > t.length && (I = t.length), x = t.window;
          } else
            x = i, E = a - t.offset, I = t.length;
          I > c && (I = c), c -= I, t.length -= I;
          do
            i[a++] = x[E++];
          while (--I);
          t.length === 0 && (t.mode = Wr);
          break;
        case Ga:
          if (c === 0)
            break e;
          i[a++] = t.length, c--, t.mode = Wr;
          break;
        case Si:
          if (t.wrap) {
            for (; s < 32; ) {
              if (o === 0)
                break e;
              o--, l |= n[A++] << s, s += 8;
            }
            if (d -= c, r.total_out += d, t.total += d, t.wrap & 4 && d && (r.adler = t.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            t.flags ? et(t.check, i, d, a - d) : aA(t.check, i, d, a - d)), d = c, t.wrap & 4 && (t.flags ? l : qa(l)) !== t.check) {
              r.msg = "incorrect data check", t.mode = De;
              break;
            }
            l = 0, s = 0;
          }
          t.mode = Oa;
        case Oa:
          if (t.wrap && t.flags) {
            for (; s < 32; ) {
              if (o === 0)
                break e;
              o--, l += n[A++] << s, s += 8;
            }
            if (t.wrap & 4 && l !== (t.total & 4294967295)) {
              r.msg = "incorrect length check", t.mode = De;
              break;
            }
            l = 0, s = 0;
          }
          t.mode = Pa;
        case Pa:
          T = ry;
          break e;
        case De:
          T = rl;
          break e;
        case il:
          return nl;
        case Al:
        default:
          return We;
      }
  return r.next_out = a, r.avail_out = c, r.next_in = A, r.avail_in = o, t.hold = l, t.bits = s, (t.wsize || d !== r.avail_out && t.mode < De && (t.mode < Si || e !== Ea)) && ll(r, r.output, r.next_out, d - r.avail_out), p -= r.avail_in, d -= r.avail_out, r.total_in += p, r.total_out += d, t.total += d, t.wrap & 4 && d && (r.adler = t.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  t.flags ? et(t.check, i, d, r.next_out - d) : aA(t.check, i, d, r.next_out - d)), r.data_type = t.bits + (t.last ? 64 : 0) + (t.mode === st ? 128 : 0) + (t.mode === Kr || t.mode === vi ? 256 : 0), (p === 0 && d === 0 || e === Ea) && T === Tt && (T = iy), T;
}, hy = (r) => {
  if (Ut(r))
    return We;
  let e = r.state;
  return e.window && (e.window = null), r.state = null, Tt;
}, gy = (r, e) => {
  if (Ut(r))
    return We;
  const t = r.state;
  return t.wrap & 2 ? (t.head = e, e.done = !1, Tt) : We;
}, dy = (r, e) => {
  const t = e.length;
  let n, i, A;
  return Ut(r) || (n = r.state, n.wrap !== 0 && n.mode !== In) ? We : n.mode === In && (i = 1, i = aA(i, e, t, 0), i !== n.check) ? rl : (A = ll(r, e, t, t), A ? (n.mode = il, nl) : (n.havedict = 1, Tt));
};
var py = al, Iy = sl, yy = ol, Ey = ly, By = fl, Cy = uy, wy = hy, Qy = gy, my = dy, by = "pako inflate (from Nodeca project)", ct = {
  inflateReset: py,
  inflateReset2: Iy,
  inflateResetKeep: yy,
  inflateInit: Ey,
  inflateInit2: By,
  inflate: Cy,
  inflateEnd: wy,
  inflateGetHeader: Qy,
  inflateSetDictionary: my,
  inflateInfo: by
};
function vy() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var Sy = vy;
const cl = Object.prototype.toString, {
  Z_NO_FLUSH: xy,
  Z_FINISH: Dy,
  Z_OK: Qr,
  Z_STREAM_END: Fi,
  Z_NEED_DICT: Ri,
  Z_STREAM_ERROR: Fy,
  Z_DATA_ERROR: ja,
  Z_MEM_ERROR: Ry
} = zf;
function Ln(r) {
  this.options = Xf.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, r || {});
  const e = this.options;
  e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, e.windowBits === 0 && (e.windowBits = -15)), e.windowBits >= 0 && e.windowBits < 16 && !(r && r.windowBits) && (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && (e.windowBits & 15 || (e.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new YI(), this.strm.avail_out = 0;
  let t = ct.inflateInit2(
    this.strm,
    e.windowBits
  );
  if (t !== Qr)
    throw new Error(sA[t]);
  if (this.header = new Sy(), ct.inflateGetHeader(this.strm, this.header), e.dictionary && (typeof e.dictionary == "string" ? e.dictionary = fA.string2buf(e.dictionary) : cl.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (t = ct.inflateSetDictionary(this.strm, e.dictionary), t !== Qr)))
    throw new Error(sA[t]);
}
Ln.prototype.push = function(r, e) {
  const t = this.strm, n = this.options.chunkSize, i = this.options.dictionary;
  let A, a, o;
  if (this.ended) return !1;
  for (e === ~~e ? a = e : a = e === !0 ? Dy : xy, cl.call(r) === "[object ArrayBuffer]" ? t.input = new Uint8Array(r) : t.input = r, t.next_in = 0, t.avail_in = t.input.length; ; ) {
    for (t.avail_out === 0 && (t.output = new Uint8Array(n), t.next_out = 0, t.avail_out = n), A = ct.inflate(t, a), A === Ri && i && (A = ct.inflateSetDictionary(t, i), A === Qr ? A = ct.inflate(t, a) : A === ja && (A = Ri)); t.avail_in > 0 && A === Fi && t.state.wrap > 0 && r[t.next_in] !== 0; )
      ct.inflateReset(t), A = ct.inflate(t, a);
    switch (A) {
      case Fy:
      case ja:
      case Ri:
      case Ry:
        return this.onEnd(A), this.ended = !0, !1;
    }
    if (o = t.avail_out, t.next_out && (t.avail_out === 0 || A === Fi))
      if (this.options.to === "string") {
        let c = fA.utf8border(t.output, t.next_out), l = t.next_out - c, s = fA.buf2string(t.output, c);
        t.next_out = l, t.avail_out = n - l, l && t.output.set(t.output.subarray(c, c + l), 0), this.onData(s);
      } else
        this.onData(t.output.length === t.next_out ? t.output : t.output.subarray(0, t.next_out));
    if (!(A === Qr && o === 0)) {
      if (A === Fi)
        return A = ct.inflateEnd(this.strm), this.onEnd(A), this.ended = !0, !0;
      if (t.avail_in === 0) break;
    }
  }
  return !0;
};
Ln.prototype.onData = function(r) {
  this.chunks.push(r);
};
Ln.prototype.onEnd = function(r) {
  r === Qr && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Xf.flattenChunks(this.chunks)), this.chunks = [], this.err = r, this.msg = this.strm.msg;
};
function _y(r, e) {
  const t = new Ln(e);
  if (t.push(r), t.err) throw t.msg || sA[t.err];
  return t.result;
}
var Ty = _y, ky = {
  inflate: Ty
};
const { inflate: Ly } = ky;
var ul = Ly;
class My extends vt {
  decodeBlock(e) {
    return ul(new Uint8Array(e)).buffer;
  }
}
const Uy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: My
}, Symbol.toStringTag, { value: "Module" }));
class Ny extends vt {
  decodeBlock(e) {
    const t = new DataView(e), n = [];
    for (let i = 0; i < e.byteLength; ++i) {
      let A = t.getInt8(i);
      if (A < 0) {
        const a = t.getUint8(i + 1);
        A = -A;
        for (let o = 0; o <= A; ++o)
          n.push(a);
        i += 1;
      } else {
        for (let a = 0; a <= A; ++a)
          n.push(t.getUint8(i + a + 1));
        i += A + 1;
      }
    }
    return new Uint8Array(n).buffer;
  }
}
const Gy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ny
}, Symbol.toStringTag, { value: "Module" })), Oy = [
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
], Ja = {
  getBlobInfo: null,
  decode: null
};
function Py(r, e, t, n, i) {
  if (t < 2)
    return r;
  const A = new n(e * t);
  for (let a = 0, o = 0; a < e; a++)
    for (let c = 0, l = a; c < t; c++, l += e)
      A[l] = r[o++];
  return A;
}
function qy(r, e = {}) {
  var t, n;
  const i = (t = e.inputOffset) !== null && t !== void 0 ? t : 0, A = r instanceof Uint8Array ? r.subarray(i) : new Uint8Array(r, i), a = Ja.getBlobInfo(A), { data: o, maskData: c } = Ja.decode(A, a), { width: l, height: s, bandCount: p, dimCount: d, depthCount: I, dataType: E, maskCount: x, statistics: v } = a, w = Oy[E], b = new w.ctor(o.buffer), D = [], F = [], R = l * s, L = R * I, q = (n = e.returnInterleaved) !== null && n !== void 0 ? n : e.returnPixelInterleavedDims;
  for (let ne = 0; ne < p; ne++) {
    const Ae = b.subarray(ne * L, (ne + 1) * L);
    if (q)
      D.push(Ae);
    else {
      const ie = Py(Ae, R, I, w.ctor);
      D.push(ie);
    }
    F.push(c.subarray(ne * L, (ne + 1) * L));
  }
  const T = x === 0 ? null : x === 1 ? F[0] : new Uint8Array(R);
  if (x > 1) {
    T.set(F[0]);
    for (let ne = 1; ne < F.length; ne++) {
      const Ae = F[ne];
      for (let ie = 0; ie < R; ie++)
        T[ie] = T[ie] & Ae[ie];
    }
  }
  const { noDataValue: j } = e, $ = j != null && w.range[0] <= j && w.range[1] >= j;
  if (x > 0 && $)
    for (let ne = 0; ne < p; ne++) {
      const Ae = D[ne], ie = F[ne] || T;
      for (let se = 0; se < R; se++)
        ie[se] === 0 && (Ae[se] = j);
    }
  const te = x === p && p > 1 ? F : null, { pixelType: oe } = w;
  return {
    width: l,
    height: s,
    pixelType: oe,
    statistics: v,
    pixels: D,
    mask: T,
    dimCount: d,
    depthCount: I,
    bandMasks: te
  };
}
let lr, ft, lA;
const _i = {
  env: {
    emscripten_notify_memory_growth: function(r) {
      lA = new Uint8Array(ft.exports.memory.buffer);
    }
  }
};
class hl {
  init() {
    return lr || (typeof fetch < "u" ? lr = fetch("data:application/wasm;base64," + Ya).then((e) => e.arrayBuffer()).then((e) => WebAssembly.instantiate(e, _i)).then(this._init) : lr = WebAssembly.instantiate(ut.from(Ya, "base64"), _i).then(this._init), lr);
  }
  _init(e) {
    ft = e.instance, _i.env.emscripten_notify_memory_growth(0);
  }
  decode(e, t = 0) {
    if (!ft) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const n = e.byteLength, i = ft.exports.malloc(n);
    lA.set(e, i), t = t || Number(ft.exports.ZSTD_findDecompressedSize(i, n));
    const A = ft.exports.malloc(t), a = ft.exports.ZSTD_decompress(A, t, i, n), o = lA.slice(A, A + a);
    return ft.exports.free(i), ft.exports.free(A), o;
  }
}
const Ya = "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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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", gl = new hl();
class Hy extends vt {
  constructor(e) {
    super(), this.planarConfiguration = typeof e.PlanarConfiguration < "u" ? e.PlanarConfiguration : 1, this.samplesPerPixel = typeof e.SamplesPerPixel < "u" ? e.SamplesPerPixel : 1, this.addCompression = e.LercParameters[Xl.AddCompression];
  }
  decodeBlock(e) {
    switch (this.addCompression) {
      case On.None:
        break;
      case On.Deflate:
        e = ul(new Uint8Array(e)).buffer;
        break;
      case On.Zstandard:
        e = gl.decode(new Uint8Array(e)).buffer;
        break;
      default:
        throw new Error(`Unsupported LERC additional compression method identifier: ${this.addCompression}`);
    }
    return qy(e, { returnPixelInterleavedDims: this.planarConfiguration === 1 }).pixels[0].buffer;
  }
}
const jy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hy,
  zstd: gl
}, Symbol.toStringTag, { value: "Module" })), dl = new hl();
class Jy extends vt {
  decodeBlock(e) {
    return dl.decode(new Uint8Array(e)).buffer;
  }
}
const Yy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jy,
  zstd: dl
}, Symbol.toStringTag, { value: "Module" }));
class Ky extends vt {
  constructor() {
    if (super(), typeof createImageBitmap > "u")
      throw new Error("Cannot decode WebImage as `createImageBitmap` is not available");
    if (typeof document > "u" && typeof OffscreenCanvas > "u")
      throw new Error("Cannot decode WebImage as neither `document` nor `OffscreenCanvas` is not available");
  }
  async decode(e, t) {
    const n = new Blob([t]), i = await createImageBitmap(n);
    let A;
    typeof document < "u" ? (A = document.createElement("canvas"), A.width = i.width, A.height = i.height) : A = new OffscreenCanvas(i.width, i.height);
    const a = A.getContext("2d");
    return a.drawImage(i, 0, 0), a.getImageData(0, 0, i.width, i.height).data.buffer;
  }
}
const Wy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ky
}, Symbol.toStringTag, { value: "Module" }));
export {
  lI as enableGeoTIFFTileSource
};
//# sourceMappingURL=geotiff-tilesource.mjs.map
