import { ISortedSearchAlgorithm } from "./interfaces";

/**
 * Jump Search — optimal untuk array terurut berukuran besar.
 * Melompat setiap √n langkah, lalu linear search di dalam blok yang ditemukan.
 *
 * Kompleksitas Waktu : O(√n)
 * Kompleksitas Ruang : O(1)
 * Prasyarat          : Array harus sudah terurut secara ascending
 *
 * @example
 * const searcher = new JumpSearch();
 * searcher.search([1, 3, 5, 7, 9, 11], 7); // => 3
 * searcher.search([1, 3, 5, 7, 9, 11], 4); // => -1
 */
export class JumpSearch implements ISortedSearchAlgorithm<number> {
  search(array: number[], target: number): number {
    if (array.length === 0) return -1;

    const jumpStep = Math.floor(Math.sqrt(array.length));
    let blockStart = 0;
    let blockEnd = jumpStep;

    // Lompat ke blok yang kemungkinan mengandung target
    while (array[blockEnd - 1] < target) {
      blockStart = blockEnd;
      blockEnd += jumpStep;

      if (blockEnd > array.length) {
        blockEnd = array.length;
        break;
      }
    }

    // Linear search dalam blok yang ditemukan
    for (let index = blockStart; index < blockEnd; index++) {
      if (array[index] === target) return index;
    }

    return -1;
  }
}
