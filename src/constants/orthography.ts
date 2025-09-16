import { CONFIG } from "./config";

export const ORTHOGRAPHY_LAYOUT = [
  ["á", "š", "e", "r", "t", "y", "u", "i", "o", "p", "ŋ"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "đ", "ŧ"],
  ["ž", "z", "č", "c", "v", "b", "n", "m"],
];

if (CONFIG.normalization) {
  ORTHOGRAPHY_LAYOUT.forEach((array, i) =>
    array.forEach((val, j) => (ORTHOGRAPHY_LAYOUT[i][j] = val.normalize(CONFIG.normalization))),
  );
}

export const ORTHOGRAPHY = ORTHOGRAPHY_LAYOUT.flat();
