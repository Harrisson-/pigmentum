import { expect, test } from 'vitest'
import { hextoRGB, rgbToHex, buildPalette } from '../index'

test('translate 6-digit hex color into array [R, G, B]', () => {
  expect(hextoRGB("#32a852")).toStrictEqual([50, 168, 82]);
})

test('translate 3-digit hex color into array [R, G, B]', () => {
    expect(hextoRGB("#b58")).toStrictEqual([187, 85, 136]);
})

test('translate color array [R, G, B] into 6-digit hex', () => {
    expect(rgbToHex([50, 168, 82])).toStrictEqual("#32a852");
})

test('build color gradiant with 2 colors and 3 steps between colors', () => {
    expect(buildPalette(['#bb5588', '#4ebf8c'], 3)).toStrictEqual([
        "#bb5588",
        "#977889",
        "#739b8a",
        "#4fbe8b",
        "#4ebf8c",
      ]);
})

test('build color gradiant with 5 colors and 9 steps between colors', () => {
    expect(buildPalette(['#722999','#bb5588', '#ffee03', '#4ebf8c', '#0e262b'], 9)).toStrictEqual([
        "#722999",
        "#7a2e97",
        "#823395",
        "#8a3893",
        "#923d91",
        "#9a428f",
        "#a2478d",
        "#aa4c8b",
        "#b25189",
        "#ba5687",
        "#bb5588",
        "#c36679",
        "#cb776a",
        "#d3885b",
        "#db994c",
        "#e3aa3d",
        "#ebbb2e",
        "#f3cc1f",
        "#fbdd10",
        "#103ee01",
        "#ffee03",
        "#ebe912",
        "#d7e421",
        "#c3df30",
        "#afda3f",
        "#9bd54e",
        "#87d05d",
        "#73cb6c",
        "#5fc67b",
        "#4bc18a",
        "#4ebf8c",
        "#47ae81",
        "#409d76",
        "#398c6b",
        "#327b60",
        "#2b6a55",
        "#24594a",
        "#1d483f",
        "#163734",
        "#0f2629",
        "#0e262b"
    ]);
})

test('build color gradiant with 1 color and 3 steps between colors', () => {
    expect(buildPalette(['#bb5588'], 3)).toStrictEqual([]);
})
