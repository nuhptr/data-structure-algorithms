import { ISortAlgorithm } from "./interfaces"

/**
 * Merge Sort — membagi array menjadi bagian-bagian kecil secara
 * rekursif (divide), lalu menggabungkan kembali bagian yang sudah
 * terurut (conquer).
 *
 * Kompleksitas Waktu : O(n log n)
 * Kompleksitas Ruang : O(n) — array hasil sementara
 *
 * @example
 * const sorter = new MergeSort();
 * sorter.sort([38, 27, 43, 3, 9, 82, 10]); // => [3, 9, 10, 27, 38, 43, 82]
 */
export class MergeSort implements ISortAlgorithm {
    /**
     * Mengurutkan salinan array secara menaik menggunakan Merge Sort.
     *
     * @param array - Array bilangan yang akan diurutkan
     * @returns Array baru yang sudah terurut secara menaik
     */
    sort(array: number[]): number[] {
        return this.mergeSort([...array])
    }

    /**
     * Membagi array menjadi dua bagian secara rekursif lalu menggabungkannya kembali.
     *
     * @param values - Sub-array bilangan yang akan diurutkan
     * @returns Sub-array baru yang sudah terurut
     */
    private mergeSort(values: number[]): number[] {
        // Basis rekursi: array dengan 0 atau 1 elemen sudah terurut
        if (values.length <= 1) return values

        const middleIndex = Math.floor(values.length / 2)

        // Urutkan bagian kiri dan kanan secara rekursif, lalu gabungkan
        return this.merge(
            this.mergeSort(values.slice(0, middleIndex)),
            this.mergeSort(values.slice(middleIndex)),
        )
    }

    /**
     * Menggabungkan dua array terurut menjadi satu array terurut.
     *
     * @param left - Sub-array kiri yang sudah terurut
     * @param right - Sub-array kanan yang sudah terurut
     * @returns Array hasil penggabungan yang terurut menaik
     */
    private merge(left: number[], right: number[]): number[] {
        const result: number[] = []
        let leftIndex = 0
        let rightIndex = 0

        // Bandingkan elemen terdepan dari kedua bagian dan ambil yang lebih kecil
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex])
                leftIndex++
            } else {
                result.push(right[rightIndex])
                rightIndex++
            }
        }

        // Tambahkan sisa elemen dari bagian kiri atau kanan yang belum habis
        return result.concat(left.slice(leftIndex), right.slice(rightIndex))
    }
}
