import { ICombinationGenerator } from "./interfaces";

/**
 * All Combinations of Size K — menghasilkan semua kombinasi unik
 * berukuran k dari angka 1 sampai n menggunakan backtracking.
 *
 * Kompleksitas Waktu : O(C(n, k)) — jumlah kombinasi yang mungkin
 * Kompleksitas Ruang : O(k) — kedalaman rekursi
 *
 * @example
 * const generator = new CombinationGenerator();
 * generator.generate(4, 2);
 * // => [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]
 */
export class CombinationGenerator implements ICombinationGenerator {
  generate(n: number, k: number): number[][] {
    const allCombinations: number[][] = [];
    const currentCombination: number[] = [];

    const buildCombinations = (startNumber: number, remaining: number): void => {
      if (remaining === 0) {
        if (currentCombination.length > 0) {
          allCombinations.push([...currentCombination]);
        }
        return;
      }

      const lastPossibleStart = n - remaining + 2;

      for (let number = startNumber; number < lastPossibleStart; number++) {
        currentCombination.push(number);
        buildCombinations(number + 1, remaining - 1);
        currentCombination.pop();
      }
    };

    buildCombinations(1, k);
    return allCombinations;
  }
}
