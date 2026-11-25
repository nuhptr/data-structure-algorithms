import { ISearchAlgorithm } from "./interfaces"

/**
 * Linear Search — mencari elemen secara sekuensial dari kiri ke kanan.
 * Bekerja pada array tidak terurut maupun terurut.
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(1)
 *
 * @example
 * const searcher = new LinearSearch<number>();
 * searcher.search([3, 1, 4, 1, 5], 4); // => 2
 * searcher.search([3, 1, 4, 1, 5], 9); // => -1
 */
export class LinearSearch<T> implements ISearchAlgorithm<T> {
    /**
     * @param array  - Array sembarang (tidak harus terurut)
     * @param target - Nilai yang dicari
     * @returns Index pertama elemen yang cocok, atau -1 jika tidak ada
     */
    search(array: T[], target: T): number {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === target) return i
        }
        return -1
    }
}
