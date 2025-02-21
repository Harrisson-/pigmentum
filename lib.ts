
/**
 * Based on https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb/5624139#5624139
 * 
 * @param hexColor {string}
 * @returns 
 */
export function hextoRGB(hexColor: string): number[] {
  const colorArray = hexColor.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_m, r, g, b) => '#' + r + r + g + g + b + b)
  .substring(1).match(/.{2}/g) ?? [];
  return colorArray.map(color => parseInt(color, 16));
}

/**
 * Based on https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb/5624139#5624139
 * 
 * @param rgbColor {number[]}
 * @returns { string }
 */
export function rgbToHex(rgbColor: number[]): string {
  const r = rgbColor[0].toString(16);
  const g = rgbColor[1].toString(16);
  const b = rgbColor[2].toString(16);
  return "#" + (r.length == 1 ? "0" + r : r) + (g.length == 1 ? "0" + g : g) + (b.length == 1 ? "0" + b : b);
}


export function rgbToXyz(rgbColor: number[]): number[] {
  const [r, g, b] = rgbColor;

  // Xr = xr/yr
  // Yr = 1
  // Zr = (1-xr-yr)/yr

  // Xg = xg/yg
  // Yg = 1
  // Zg = (1-xg-yg)/yg

  // Xb = xb/yb
  // Yb = 1
  // Zb = (1-xb-yb)/yb

  return [];
}

/**
 * Based on https://bottosson.github.io/posts/oklab/
 * 
 * @param rgbColor {number[]}
 * @returns { number[] }
 */
export function linearSrgbToOklab(rgbColor: number[]) {
  const [r, g, b] = rgbColor;
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);

    return [
        0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
    ];
}

/**
 * Based on https://bottosson.github.io/posts/oklab/
 * 
 * @param oklabColor {number[]}
 * @returns { number[] }
 */
export function oklabToLinearSrgb(oklabColor: number[]) 
{
  const [L, a, b] = oklabColor;

    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

    const l = l_*l_*l_;
    const m = m_*m_*m_;
    const s = s_*s_*s_;

    return [
      +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
  		-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
    ];
}


/**
 * 
 * @param colorsArray {number[][]}
 * @param stepBetween {number}
 */
function createPalette(colorsArray: number[][], steps: number): number[][] {
  const palette: number[][] = [];
  let colorIndex = 0;
  for (let index = 0; index < colorsArray.length -1; index++) {
    const startColor = colorsArray[index];
    const endColor = colorsArray[index + 1];
    const rRatio = Math.round((endColor[0] - startColor[0]) / steps);
    const gRatio = Math.round((endColor[1] - startColor[1]) / steps);
    const bRatio = Math.round((endColor[2] - startColor[2]) / steps);

    for(let step = 0; step <= steps; step++) {
      palette[colorIndex] = [];
      const r = startColor[0] + (rRatio * step) <= 255 ? startColor[0] + (rRatio * step) : 255;
      const g = startColor[1] + (gRatio * step) <= 255 ? startColor[1] + (gRatio * step) : 255;
      const b = startColor[2] + (bRatio * step) <= 255 ? startColor[2] + (bRatio * step) : 255;
      palette[colorIndex].push(r, g, b);
      colorIndex += 1;
    }
    palette[colorIndex] = endColor;
  }
  return palette;
}

export function buildPalette(colorsArray: string[], steps: number): string[] {
  const rgbcolors = colorsArray.map(color => hextoRGB(color));
  const palette = createPalette(rgbcolors, steps);
  return palette.map(rgbcolor => rgbToHex(rgbcolor));
}