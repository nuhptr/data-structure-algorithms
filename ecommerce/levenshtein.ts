import { ILevenshtein } from "./interfaces";

/**
 * Levenshtein Distance — menghitung jumlah minimum operasi edit
 * (insert, delete, replace) untuk mengubah satu string menjadi string lain.
 *
 * Digunakan e-commerce untuk: koreksi typo di search bar
 * ("septu" → "sepatu"), fuzzy matching nama produk.
 *
 * Kompleksitas Waktu : O(m × n) — m, n panjang dua string
 * Kompleksitas Ruang : O(m × n) — bisa dioptimasi ke O(n) dengan rolling array
 *
 * @example
 * const lev = new Levenshtein();
 * lev.distance("septu", "sepatu");     // => 1
 * lev.distance("kitten", "sitting");   // => 3
 * lev.closestMatch("septu", ["sepatu", "sendal", "kaos"]); // => "sepatu"
 */
export class Levenshtein implements ILevenshtein {
  distance(wordA: string, wordB: string): number {
    const lengthA = wordA.length;
    const lengthB = wordB.length;

    // Tabel DP: distanceTable[i][j] = edit distance antara wordA[0..i] dan wordB[0..j]
    const distanceTable: number[][] = Array.from({ length: lengthA + 1 }, (_, row) =>
      Array.from({ length: lengthB + 1 }, (__, col) => {
        if (row === 0) return col; // insert semua karakter wordB
        if (col === 0) return row; // delete semua karakter wordA
        return 0;
      })
    );

    for (let row = 1; row <= lengthA; row++) {
      for (let col = 1; col <= lengthB; col++) {
        const charsMatch = wordA[row - 1] === wordB[col - 1];

        if (charsMatch) {
          distanceTable[row][col] = distanceTable[row - 1][col - 1];
        } else {
          const insertCost  = distanceTable[row][col - 1];
          const deleteCost  = distanceTable[row - 1][col];
          const replaceCost = distanceTable[row - 1][col - 1];
          distanceTable[row][col] = 1 + Math.min(insertCost, deleteCost, replaceCost);
        }
      }
    }

    return distanceTable[lengthA][lengthB];
  }

  closestMatch(query: string, candidates: string[]): string | null {
    if (candidates.length === 0) return null;

    let bestMatch = candidates[0];
    let lowestDistance = this.distance(query, candidates[0]);

    for (let index = 1; index < candidates.length; index++) {
      const currentDistance = this.distance(query, candidates[index]);
      if (currentDistance < lowestDistance) {
        lowestDistance = currentDistance;
        bestMatch = candidates[index];
      }
    }

    return bestMatch;
  }

  /**
   * Mengembalikan semua kandidat dengan edit distance <= maxDistance,
   * diurutkan dari yang paling mirip.
   */
  suggestions(query: string, candidates: string[], maxDistance: number = 2): string[] {
    return candidates
      .map((candidate) => ({ candidate, dist: this.distance(query, candidate) }))
      .filter(({ dist }) => dist <= maxDistance)
      .sort((a, b) => a.dist - b.dist)
      .map(({ candidate }) => candidate);
  }
}
