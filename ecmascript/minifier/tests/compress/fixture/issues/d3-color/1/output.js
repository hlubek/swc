import define, { extend } from "./define.js";
import { Color, rgbConvert, Rgb, darker, brighter } from "./color.js";
import { deg2rad, rad2deg } from "./math.js";
var A = -0.14861, B = 1.78277, C = -0.29227, D = -0.90649, E = 1.97294, ED = E * D, EB = E * B, BC_DA = B * C - D * A;
function cubehelixConvert(o) {
    if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
    o instanceof Rgb || (o = rgbConvert(o));
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
    return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
export default function cubehelix(h, s, l, opacity) {
    return 1 === arguments.length ? cubehelixConvert(h) : new Cubehelix(h, s, l, null == opacity ? 1 : opacity);
};
export function Cubehelix(h, s, l, opacity) {
    this.h = +h, this.s = +s, this.l = +l, this.opacity = +opacity;
}
define(Cubehelix, cubehelix, extend(Color, {
    brighter: function(k) {
        return k = null == k ? brighter : Math.pow(brighter, k), new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
        return k = null == k ? darker : Math.pow(darker, k), new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
        var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
        return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
    }
}));
