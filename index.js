"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hextoRGB = hextoRGB;
exports.rgbToHex = rgbToHex;
exports.buildPalette = buildPalette;
/**
 * Based on https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb/5624139#5624139
 *
 * @param hexColor {string}
 * @returns
 */
function hextoRGB(hexColor) {
    var _a;
    const colorArray = (_a = hexColor.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)) !== null && _a !== void 0 ? _a : [];
    return colorArray.map(color => parseInt(color, 16));
}
/**
 * Based on https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb/5624139#5624139
 *
 * @param rgbColor {number[]}
 * @returns { string }
 */
function rgbToHex(rgbColor) {
    const r = rgbColor[0].toString(16);
    const g = rgbColor[1].toString(16);
    const b = rgbColor[2].toString(16);
    return "#" + (r.length == 1 ? "0" + r : r) + (g.length == 1 ? "0" + g : g) + (b.length == 1 ? "0" + b : b);
}
/**
 *
 * @param colorsArray {number[][]}
 * @param stepBetween {number}
 */
function createPalette(colorsArray, steps) {
    const palette = [];
    let colorIndex = 0;
    for (let index = 0; index < colorsArray.length - 1; index++) {
        const startColor = colorsArray[index];
        const endColor = colorsArray[index + 1];
        const rRatio = Math.round((endColor[0] - startColor[0]) / steps);
        const gRatio = Math.round((endColor[1] - startColor[1]) / steps);
        const bRatio = Math.round((endColor[2] - startColor[2]) / steps);
        for (let step = 0; step <= steps; step++) {
            palette[colorIndex] = [];
            palette[colorIndex].push(startColor[0] + (rRatio * step), startColor[1] + (gRatio * step), startColor[2] + (bRatio * step));
            colorIndex += 1;
        }
        palette[colorIndex] = endColor;
    }
    return palette;
}
function buildPalette(colorsArray, steps) {
    const rgbcolors = colorsArray.map(color => hextoRGB(color));
    const palette = createPalette(rgbcolors, steps);
    return palette.map(rgbcolor => rgbToHex(rgbcolor));
}
