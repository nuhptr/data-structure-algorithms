import { ISearchAlgorithm } from "./interfaces"

/**
 * Linear Search — mencari elemen secara sekuensial dari kiri ke kanan.
 * Bekerja pada array tidak terurut maupun terurut.
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(1)
 *
 * @template T Tipe elemen yang disimpan di dalam array.
 *
 * @example
 * const searcher = new LinearSearch<number>()
 * searcher.search([3, 1, 4, 1, 5], 4) // => 2
 * searcher.search([3, 1, 4, 1, 5], 9) // => -1
 */
export class LinearSearch<T> implements ISearchAlgorithm<T> {
    /**
     * Menelusuri seluruh elemen array satu per satu untuk menemukan target.
     *
     * @param array Array sembarang (tidak harus terurut).
     * @param target Nilai yang dicari.
     * @returns Indeks pertama elemen yang cocok, atau `-1` jika tidak ditemukan.
     */
    search(array: T[], target: T): number {
        // Periksa setiap elemen secara berurutan dari indeks 0.
        for (let i = 0; i < array.length; i++) {
            if (array[i] === target) return i
        }
        return -1
    }
}
