import { IExponentialSearch } from "./interfaces"

/**
 * Exponential Search — menemukan range yang mengandung target dengan
 * menggandakan batas secara eksponensial, lalu menerapkan binary search.
 * Sangat efisien untuk array tak terbatas atau sangat besar.
 *
 * Kompleksitas Waktu : O(log n)
 * Kompleksitas Ruang : O(1)
 *
 * Array harus sudah terurut secara ascending.
 *
 * @example
 * const searcher = new ExponentialSearch();
 * searcher.search([1, 2, 3, 4, 10, 40, 100], 10); // => 4
 * searcher.search([1, 2, 3, 4, 10, 40, 100], 50); // => -1
 */
export class ExponentialSearch implements IExponentialSearch {
    search(array: number[], target: number): number {
        if (array.length === 0) return -1
        if (array[0] === target) return 0

        // Cari range: gandakan bound sampai melampaui target atau akhir array
        let bound = 1
        while (bound < array.length && array[bound] <= target) {
            bound *= 2
        }

        return this.binarySearch(
            array,
            Math.floor(bound / 2),
            Math.min(bound, array.length - 1),
            target,
        )
    }

    private binarySearch(array: number[], left: number, right: number, target: number): number {
        while (left <= right) {
            const mid = Math.floor((left + right) / 2)

            if (array[mid] === target) return mid
            if (array[mid] < target) left = mid + 1
            else right = mid - 1
        }

        return -1
    }
}
