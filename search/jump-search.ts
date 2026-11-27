import { ISortedSearchAlgorithm } from "./interfaces"

/**
 * Jump Search — optimal untuk array terurut berukuran besar.
 * Melompat setiap `√n` langkah, lalu melakukan linear search di dalam blok yang ditemukan.
 *
 * Kompleksitas Waktu : O(√n)
 * Kompleksitas Ruang : O(1)
 * Prasyarat          : Array harus sudah terurut secara ascending
 *
 * @example
 * const searcher = new JumpSearch()
 * searcher.search([1, 3, 5, 7, 9, 11], 7) // => 3
 * searcher.search([1, 3, 5, 7, 9, 11], 4) // => -1
 */
export class JumpSearch implements ISortedSearchAlgorithm<number> {
    /**
     * Mencari nilai target pada array terurut menaik dengan lompatan blok `√n`.
     *
     * @param array Array angka yang sudah terurut secara ascending.
     * @param target Nilai angka yang dicari.
     * @returns Indeks elemen jika ditemukan, atau `-1` jika tidak ada.
     */
    search(array: number[], target: number): number {
        if (array.length === 0) return -1

        // Ukuran langkah optimal adalah akar kuadrat dari panjang array.
        const jumpStep = Math.floor(Math.sqrt(array.length))
        let blockStart = 0
        let blockEnd = jumpStep

        // Lompat ke blok berikutnya selama elemen terakhir blok masih lebih kecil dari target.
        while (array[blockEnd - 1] < target) {
            blockStart = blockEnd
            blockEnd += jumpStep

            // Batasi ujung blok agar tidak melewati panjang array.
            if (blockEnd > array.length) {
                blockEnd = array.length
                break
            }
        }

        // Lakukan pencarian linear di dalam blok kandidat `[blockStart, blockEnd)`.
        for (let index = blockStart; index < blockEnd; index++) {
            if (array[index] === target) return index
        }

        return -1
    }
}
