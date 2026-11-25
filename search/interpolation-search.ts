import { IInterpolationSearch } from "./interfaces";

/**
 * Interpolation Search — seperti binary search tetapi menghitung posisi probe
 * menggunakan interpolasi linear, cocok untuk data yang terdistribusi seragam.
 *
 * Kompleksitas Waktu : O(log log n) rata-rata untuk distribusi seragam | O(n) worst case
 * Kompleksitas Ruang : O(1)
 *
 * Array harus sudah terurut secara ascending dan berisi nilai integer.
 *
 * @example
 * const searcher = new InterpolationSearch();
 * searcher.search([10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33], 18); // => 4
 * searcher.search([10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33], 25); // => -1
 */
export class InterpolationSearch implements IInterpolationSearch {
  search(array: number[], target: number): number {
    let low = 0;
    let high = array.length - 1;

    while (
      low <= high &&
      target >= array[low] &&
      target <= array[high]
    ) {
      if (low === high) {
        return array[low] === target ? low : -1;
      }

      // Formula interpolasi: estimasi posisi berdasarkan nilai
      const range = array[high] - array[low];
      const positionRatio = (target - array[low]) / range;
      const probeIndex = low + Math.floor(positionRatio * (high - low));

      if (array[probeIndex] === target) return probeIndex;
      if (array[probeIndex] < target) low = probeIndex + 1;
      else high = probeIndex - 1;
    }

    return -1;
  }
}
