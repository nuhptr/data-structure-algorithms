import { ISortAlgorithm } from "./interfaces";

/**
 * Radix Sort — mengurutkan bilangan bulat non-negatif digit per digit
 * dari digit paling kanan (least significant) ke paling kiri.
 *
 * Kompleksitas Waktu : O(d × n) — d = jumlah digit terpanjang
 * Kompleksitas Ruang : O(n + 10)
 *
 * @example
 * const sorter = new RadixSort();
 * sorter.sort([0, 5, 3, 2, 2]);         // => [0, 2, 2, 3, 5]
 * sorter.sort([1, 100, 10, 1000]);       // => [1, 10, 100, 1000]
 */
export class RadixSort implements ISortAlgorithm {
  sort(array: number[]): number[] {
    if (array.length === 0) return [];

    if (array.some((value) => value < 0)) {
      throw new Error("RadixSort hanya mendukung bilangan bulat non-negatif");
    }

    const cloned = [...array];
    const maxValue = Math.max(...cloned);
    const BASE = 10;

    let digitPlace = 1;

    while (digitPlace <= maxValue) {
      this.sortByDigit(cloned, digitPlace, BASE);
      digitPlace *= BASE;
    }

    return cloned;
  }

  private sortByDigit(array: number[], digitPlace: number, base: number): void {
    const buckets: number[][] = Array.from({ length: base }, () => []);

    // Masukkan setiap elemen ke bucket sesuai digit yang sedang diproses
    for (const value of array) {
      const digitIndex = Math.floor(value / digitPlace) % base;
      buckets[digitIndex].push(value);
    }

    // Gabungkan kembali semua bucket ke array
    let writePosition = 0;
    for (const bucket of buckets) {
      for (const value of bucket) {
        array[writePosition++] = value;
      }
    }
  }
}
