import ndarray from "ndarray";
import ops from "ndarray-ops";
import * as zarr from "zarrita";
/**
 * @internal - For testing, don't use in production code.
 */
export const _internal_setter = {
    prepare: ndarray,
    set_scalar(dest, selection, value) {
        // @ts-ignore - ndarray-ops types are incorrect
        ops.assigns(view(dest, selection), value);
    },
    set_from_chunk(dest, src, mapping) {
        const s = unzip_selections(mapping);
        ops.assign(view(dest, s.to), view(src, s.from));
    },
};
/** @category Utility */
export async function get(arr, selection = null, opts = {}) {
    return zarr._zarrita_internal_get(arr, selection, opts, _internal_setter);
}
/** @category Utility */
export async function set(arr, selection, value, opts = {}) {
    return zarr._zarrita_internal_set(arr, selection, value, opts, _internal_setter);
}
function unzip_selections(mapping) {
    const to = [];
    const from = [];
    for (const m of mapping) {
        if (m.to !== null)
            to.push(m.to);
        if (m.from !== null)
            from.push(m.from);
    }
    return { to, from };
}
/** Convert zarrita selection to ndarray view. */
function view(arr, sel) {
    const lo = [];
    const hi = [];
    const step = [];
    const pick = [];
    sel.forEach((s, i) => {
        if (typeof s === "number") {
            lo.push(0);
            hi.push(arr.shape[i]);
            step.push(1);
            pick.push(s);
            return;
        }
        lo.push(s[0]);
        hi.push(s[1]);
        step.push(s[2]);
        pick.push(null);
    });
    return arr
        .hi(...hi)
        .lo(...lo)
        .step(...step)
        .pick(...pick);
}
//# sourceMappingURL=index.js.map