import { ITernarySearch } from "./interfaces"

/**
 * Ternary Search — mencari minimum atau maksimum dari fungsi unimodal
 * (hanya memiliki satu puncak/lembah) dengan membagi rentang menjadi tiga bagian.
 *
 * Kompleksitas Waktu : O(log₃ n)
 * Kompleksitas Ruang : O(1)
 *
 * Berbeda dari binary search: bekerja pada fungsi/array unimodal,
 * bukan untuk mencari nilai spesifik.
 *
 * @example
 * const searcher = new TernarySearch()
 * // Array unimodal (naik lalu turun untuk findMax)
 * searcher.findMax([1, 3, 5, 7, 6, 4, 2], 0, 6) // => 7
 * // Array unimodal (turun lalu naik untuk findMin)
 * searcher.findMin([10, 8, 6, 4, 2, 4, 6], 0, 6) // => 2
 */
export class TernarySearch implements ITernarySearch {
    /**
     * Mencari nilai minimum dalam array unimodal berbentuk lembah (`∪`).
     *
     * @param array Array angka unimodal (turun lalu naik).
     * @param left Indeks batas kiri pencarian (inklusif).
     * @param right Indeks batas kanan pencarian (inklusif).
     * @returns Nilai minimum dalam rentang `[left, right]`.
     */
    findMin(array: number[], left: number, right: number): number {
        // Persempit rentang hingga tersisa maksimal 3 elemen.
        while (right - left > 2) {
            const mid1 = left + Math.floor((right - left) / 3)
            const mid2 = right - Math.floor((right - left) / 3)

            // Buang sepertiga rentang yang pasti tidak mengandung titik minimum.
            if (array[mid1] < array[mid2]) {
                right = mid2 - 1 // Minimum berada di sisi kiri.
            } else {
                left = mid1 + 1 // Minimum berada di sisi kanan.
            }
        }

        // Lakukan pemindaian akhir pada sisa elemen (maksimal 3 elemen).
        let minValue = array[left]
        for (let index = left + 1; index <= right; index++) {
            if (array[index] < minValue) minValue = array[index]
        }

        return minValue
    }

    /**
     * Mencari nilai maksimum dalam array unimodal berbentuk puncak (`∩`).
     *
     * @param array Array angka unimodal (naik lalu turun).
     * @param left Indeks batas kiri pencarian (inklusif).
     * @param right Indeks batas kanan pencarian (inklusif).
     * @returns Nilai maksimum dalam rentang `[left, right]`.
     */
    findMax(array: number[], left: number, right: number): number {
        // Persempit rentang hingga tersisa maksimal 3 elemen.
        while (right - left > 2) {
            const mid1 = left + Math.floor((right - left) / 3)
            const mid2 = right - Math.floor((right - left) / 3)

            // Buang sepertiga rentang yang pasti tidak mengandung titik maksimum.
            if (array[mid1] > array[mid2]) {
                right = mid2 - 1 // Maksimum berada di sisi kiri.
            } else {
                left = mid1 + 1 // Maksimum berada di sisi kanan.
            }
        }

        // Lakukan pemindaian akhir pada sisa elemen (maksimal 3 elemen).
        let maxValue = array[left]
        for (let index = left + 1; index <= right; index++) {
            if (array[index] > maxValue) maxValue = array[index]
        }

        return maxValue
    }
}
