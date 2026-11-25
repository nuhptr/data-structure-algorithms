import { ISortedSearchAlgorithm } from "./interfaces"

// ─── Iterative ───────────────────────────────────────────────────────────────

/**
 * Binary Search Iteratif.
 * Menggunakan dua pointer (left & right) yang menyempit setiap iterasi.
 *
 * Kompleksitas Waktu : O(log n)
 * Kompleksitas Ruang : O(1)
 * Prasyarat          : Array harus sudah terurut secara ascending
 *
 * @example
 * const searcher = new BinarySearchIterative();
 * searcher.search([1, 3, 5, 7, 9], 5); // => 2
 * searcher.search([1, 3, 5, 7, 9], 4); // => -1
 */
export class BinarySearchIterative implements ISortedSearchAlgorithm<number> {
    search(
        array: number[],
        target: number,
        left: number = 0,
        right: number = array.length - 1,
    ): number {
        if (array.length === 0) return -1
        if (target < array[left] || target > array[right]) return -1

        let middle = (left + right) >> 1

        while (array[middle] !== target && left <= right) {
            if (target < array[middle]) {
                right = middle - 1
            } else {
                left = middle + 1
            }
            middle = (left + right) >> 1
        }

        return array[middle] === target ? middle : -1
    }
}

// ─── Recursive ───────────────────────────────────────────────────────────────

/**
 * Binary Search Rekursif.
 * Setiap pemanggilan membagi array menjadi setengah sampai target ditemukan.
 *
 * Kompleksitas Waktu : O(log n)
 * Kompleksitas Ruang : O(log n) — call stack
 * Prasyarat          : Array harus sudah terurut secara ascending
 *
 * @example
 * const searcher = new BinarySearchRecursive();
 * searcher.search([2, 4, 6, 8, 10], 8); // => 3
 * searcher.search([2, 4, 6, 8, 10], 5); // => -1
 */
export class BinarySearchRecursive implements ISortedSearchAlgorithm<number> {
    search(
        array: number[],
        target: number,
        left: number = 0,
        right: number = array.length - 1,
    ): number {
        if (array.length === 0) return -1
        if (target < array[left] || target > array[right]) return -1

        const middle = (left + right) >> 1

        if (array[middle] === target) return middle
        if (left > right) return -1

        return target < array[middle]
            ? this.search(array, target, left, middle - 1)
            : this.search(array, target, middle + 1, right)
    }
}
