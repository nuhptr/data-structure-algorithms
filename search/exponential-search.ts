import { IExponentialSearch } from "./interfaces"

/**
 * Exponential Search — menemukan rentang yang mengandung target dengan
 * menggandakan batas secara eksponensial, lalu menerapkan binary search.
 * Sangat efisien untuk array tak terbatas atau sangat besar.
 *
 * Kompleksitas Waktu : O(log n)
 * Kompleksitas Ruang : O(1)
 *
 * Array harus sudah terurut secara ascending.
 *
 * @example
 * const searcher = new ExponentialSearch()
 * searcher.search([1, 2, 3, 4, 10, 40, 100], 10) // => 4
 * searcher.search([1, 2, 3, 4, 10, 40, 100], 50) // => -1
 */
export class ExponentialSearch implements IExponentialSearch {
    /**
     * Mencari nilai target pada array terurut menaik dengan memperluas batas secara eksponensial.
     *
     * @param array Array angka yang sudah terurut secara ascending.
     * @param target Nilai angka yang dicari.
     * @returns Indeks elemen jika ditemukan, atau `-1` jika tidak ada.
     */
    search(array: number[], target: number): number {
        if (array.length === 0) return -1
        // Periksa elemen pertama terlebih dahulu agar batas awal `bound = 1` valid.
        if (array[0] === target) return 0

        // Cari rentang: gandakan `bound` (1, 2, 4, 8, ...) sampai melampaui target atau akhir array.
        let bound = 1
        while (bound < array.length && array[bound] <= target) {
            bound *= 2
        }

        // Lakukan binary search pada sub-rentang `[bound / 2, min(bound, array.length - 1)]`.
        return this.binarySearch(
            array,
            Math.floor(bound / 2),
            Math.min(bound, array.length - 1),
            target,
        )
    }

    /**
     * Menjalankan binary search iteratif pada sub-rentang `[left, right]`.
     *
     * @param array Array angka terurut menaik.
     * @param left Indeks batas kiri pencarian (inklusif).
     * @param right Indeks batas kanan pencarian (inklusif).
     * @param target Nilai angka yang dicari.
     * @returns Indeks elemen jika ditemukan, atau `-1` jika tidak ada.
     */
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
