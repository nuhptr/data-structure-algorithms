import { ITernarySearch } from "./interfaces";

/**
 * Ternary Search — mencari minimum atau maksimum dari fungsi unimodal
 * (hanya memiliki satu puncak/lembah) dengan membagi range menjadi tiga bagian.
 *
 * Kompleksitas Waktu : O(log₃ n)
 * Kompleksitas Ruang : O(1)
 *
 * Berbeda dari binary search: bekerja pada fungsi/array unimodal,
 * bukan untuk mencari nilai spesifik.
 *
 * @example
 * const searcher = new TernarySearch();
 * // Array unimodal (naik lalu turun untuk findMax)
 * searcher.findMax([1, 3, 5, 7, 6, 4, 2], 0, 6); // => 7
 * // Array unimodal (turun lalu naik untuk findMin)
 * searcher.findMin([10, 8, 6, 4, 2, 4, 6], 0, 6); // => 2
 */
export class TernarySearch implements ITernarySearch {
  /**
   * Mencari nilai minimum dalam array unimodal yang bentuknya ∪.
   */
  findMin(array: number[], left: number, right: number): number {
    while (right - left > 2) {
      const mid1 = left + Math.floor((right - left) / 3);
      const mid2 = right - Math.floor((right - left) / 3);

      if (array[mid1] < array[mid2]) {
        right = mid2 - 1; // minimum ada di kiri
      } else {
        left = mid1 + 1; // minimum ada di kanan
      }
    }

    let minValue = array[left];
    for (let index = left + 1; index <= right; index++) {
      if (array[index] < minValue) minValue = array[index];
    }

    return minValue;
  }

  /**
   * Mencari nilai maksimum dalam array unimodal yang bentuknya ∩.
   */
  findMax(array: number[], left: number, right: number): number {
    while (right - left > 2) {
      const mid1 = left + Math.floor((right - left) / 3);
      const mid2 = right - Math.floor((right - left) / 3);

      if (array[mid1] > array[mid2]) {
        right = mid2 - 1; // maximum ada di kiri
      } else {
        left = mid1 + 1; // maximum ada di kanan
      }
    }

    let maxValue = array[left];
    for (let index = left + 1; index <= right; index++) {
      if (array[index] > maxValue) maxValue = array[index];
    }

    return maxValue;
  }
}
