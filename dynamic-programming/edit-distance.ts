import { IEditDistanceSolver } from "./interfaces";

/**
 * Edit Distance (Levenshtein Distance) — menghitung jumlah minimum operasi
 * (insert, delete, replace) untuk mengubah word1 menjadi word2.
 *
 * Tersedia dua pendekatan:
 *  - Bottom-up (iteratif): lebih efisien, O(m × n) waktu dan ruang
 *  - Top-down  (rekursif + memoization): lebih intuitif secara logika
 *
 * @example
 * const solver = new EditDistanceSolver();
 * solver.solveBottomUp("intention", "execution"); // => 5
 * solver.solveTopDown("horse", "ros");            // => 3
 */
export class EditDistanceSolver implements IEditDistanceSolver {
  private memoTable: number[][] = [];
  private word1: string = "";
  private word2: string = "";

  solveBottomUp(word1: string, word2: string): number {
    const word1Length = word1.length;
    const word2Length = word2.length;

    const distanceTable: number[][] = Array.from({ length: word1Length + 1 }, () =>
      Array(word2Length + 1).fill(0)
    );

    // Base case: mengubah string kosong = jumlah karakter string lainnya
    for (let row = 0; row <= word1Length; row++) distanceTable[row][0] = row;
    for (let col = 0; col <= word2Length; col++) distanceTable[0][col] = col;

    for (let row = 1; row <= word1Length; row++) {
      for (let col = 1; col <= word2Length; col++) {
        const charsMatch = word1[row - 1] === word2[col - 1];

        if (charsMatch) {
          distanceTable[row][col] = distanceTable[row - 1][col - 1];
        } else {
          const insertCost = distanceTable[row][col - 1];
          const deleteCost = distanceTable[row - 1][col];
          const replaceCost = distanceTable[row - 1][col - 1];
          distanceTable[row][col] = 1 + Math.min(insertCost, deleteCost, replaceCost);
        }
      }
    }

    return distanceTable[word1Length][word2Length];
  }

  solveTopDown(word1: string, word2: string): number {
    this.word1 = word1;
    this.word2 = word2;
    this.memoTable = Array.from({ length: word1.length }, () =>
      Array(word2.length).fill(-1)
    );

    return this.recurse(word1.length - 1, word2.length - 1);
  }

  private recurse(index1: number, index2: number): number {
    // Base case: salah satu string habis
    if (index1 === -1) return index2 + 1;
    if (index2 === -1) return index1 + 1;

    if (this.memoTable[index1][index2] !== -1) {
      return this.memoTable[index1][index2];
    }

    const charsMatch = this.word1[index1] === this.word2[index2];

    if (charsMatch) {
      this.memoTable[index1][index2] = this.recurse(index1 - 1, index2 - 1);
    } else {
      const insertCost = this.recurse(index1, index2 - 1);
      const deleteCost = this.recurse(index1 - 1, index2);
      const replaceCost = this.recurse(index1 - 1, index2 - 1);
      this.memoTable[index1][index2] = 1 + Math.min(insertCost, deleteCost, replaceCost);
    }

    return this.memoTable[index1][index2];
  }
}
