import { ISortAlgorithm } from "./interfaces"

/**
 * Tim Sort — algoritma sorting hybrid yang digunakan oleh Python dan Java.
 * Memadukan Insertion Sort untuk run kecil dan Merge Sort untuk menggabungkannya.
 * Sangat efisien pada data nyata yang sering memiliki urutan parsial.
 *
 * Kompleksitas Waktu : O(n log n) — best, average, worst case
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const sorter = new TimSort();
 * sorter.sort([5, 2, 1, 8, 4, 3, 7, 6]); // => [1, 2, 3, 4, 5, 6, 7, 8]
 */
export class TimSort implements ISortAlgorithm {
    /** Ukuran minimum tiap blok (run) yang diurutkan terlebih dahulu dengan Insertion Sort. */
    private static readonly MIN_RUN = 32

    /**
     * Mengurutkan salinan array secara menaik menggunakan Tim Sort.
     *
     * @param array - Array bilangan yang akan diurutkan
     * @returns Array baru yang sudah terurut secara menaik
     */
    sort(array: number[]): number[] {
        const cloned = [...array]
        const length = cloned.length

        // Langkah 1: sort setiap run kecil menggunakan insertion sort
        for (let start = 0; start < length; start += TimSort.MIN_RUN) {
            const end = Math.min(start + TimSort.MIN_RUN - 1, length - 1)
            this.insertionSort(cloned, start, end)
        }

        // Langkah 2: gabungkan run-run yang sudah terurut secara bertahap
        for (let size = TimSort.MIN_RUN; size < length; size *= 2) {
            for (let left = 0; left < length; left += 2 * size) {
                const mid = Math.min(left + size - 1, length - 1)
                const right = Math.min(left + 2 * size - 1, length - 1)

                if (mid < right) {
                    this.merge(cloned, left, mid, right)
                }
            }
        }

        return cloned
    }

    /**
     * Mengurutkan sub-array pada rentang `[left, right]` secara in-place menggunakan Insertion Sort.
     *
     * @param array - Array target yang dimodifikasi in-place
     * @param left - Batas indeks kiri run
     * @param right - Batas indeks kanan run
     * @returns Tidak mengembalikan nilai
     */
    private insertionSort(array: number[], left: number, right: number): void {
        for (let startIndex = left + 1; startIndex <= right; startIndex++) {
            const currentValue = array[startIndex]
            let shiftIndex = startIndex - 1

            // Geser elemen yang lebih besar di dalam batas `[left, right]` ke kanan
            while (shiftIndex >= left && array[shiftIndex] > currentValue) {
                array[shiftIndex + 1] = array[shiftIndex]
                shiftIndex--
            }

            array[shiftIndex + 1] = currentValue
        }
    }

    /**
     * Menggabungkan dua run terurut bersebelahan `[left..mid]` dan `[mid + 1..right]` ke dalam `array`.
     *
     * @param array - Array target tempat hasil penggabungan ditulis
     * @param left - Indeks awal run kiri
     * @param mid - Indeks akhir run kiri
     * @param right - Indeks akhir run kanan
     * @returns Tidak mengembalikan nilai
     */
    private merge(array: number[], left: number, mid: number, right: number): void {
        const leftPart = array.slice(left, mid + 1)
        const rightPart = array.slice(mid + 1, right + 1)

        let leftIndex = 0
        let rightIndex = 0
        let mergeIndex = left

        // Bandingkan elemen dari kedua run dan salin yang lebih kecil (<= menjaga stabilitas)
        while (leftIndex < leftPart.length && rightIndex < rightPart.length) {
            if (leftPart[leftIndex] <= rightPart[rightIndex]) {
                array[mergeIndex++] = leftPart[leftIndex++]
            } else {
                array[mergeIndex++] = rightPart[rightIndex++]
            }
        }

        // Salin sisa elemen dari run kiri jika masih ada
        while (leftIndex < leftPart.length) {
            array[mergeIndex++] = leftPart[leftIndex++]
        }

        // Salin sisa elemen dari run kanan jika masih ada
        while (rightIndex < rightPart.length) {
            array[mergeIndex++] = rightPart[rightIndex++]
        }
    }
}
