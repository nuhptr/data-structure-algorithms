import { ILCSSolver } from "./interfaces";

/**
 * Longest Common Subsequence (LCS) — mencari subsequence terpanjang
 * yang menjadi bagian dari kedua string.
 *
 * Kompleksitas Waktu : O(m × n)
 * Kompleksitas Ruang : O(m × n)
 *
 * @example
 * const solver = new LCSSolver();
 * solver.solve("ABCBDAB", "BDCAB"); // => "BCAB"
 */
export class LCSSolver implements ILCSSolver {
  solve(text1: string, text2: string): string {
    const text1Length = text1.length;
    const text2Length = text2.length;

    const lengthTable: number[][] = Array.from({ length: text1Length + 1 }, () =>
      Array(text2Length + 1).fill(0)
    );

    for (let row = 1; row <= text1Length; row++) {
      for (let col = 1; col <= text2Length; col++) {
        const charsMatch = text1[row - 1] === text2[col - 1];

        if (charsMatch) {
          lengthTable[row][col] = lengthTable[row - 1][col - 1] + 1;
        } else {
          lengthTable[row][col] = Math.max(
            lengthTable[row - 1][col],
            lengthTable[row][col - 1]
          );
        }
      }
    }

    // Rekonstruksi LCS dari tabel
    let row = text1Length;
    let col = text2Length;
    const resultChars: string[] = [];

    while (row > 0 && col > 0) {
      const charsMatch = text1[row - 1] === text2[col - 1];

      if (charsMatch) {
        resultChars.unshift(text1[row - 1]);
        row--;
        col--;
      } else if (lengthTable[row - 1][col] > lengthTable[row][col - 1]) {
        row--;
      } else {
        col--;
      }
    }

    return resultChars.join("");
  }
}
