import { ISortAlgorithm } from "./interfaces"

/**
 * Selection Sort — pada setiap putaran, mencari nilai terkecil yang
 * belum terurut lalu menempatkannya di posisi berikutnya.
 *
 * Kompleksitas Waktu : O(n²)
 * Kompleksitas Ruang : O(1) — in-place pada salinan array
 *
 * @example
 * const sorter = new SelectionSort();
 * sorter.sort([4, 2, 6, 5, 1, 3]); // => [1, 2, 3, 4, 5, 6]
 */
export class SelectionSort implements ISortAlgorithm {
    /**
     * Mengurutkan salinan array secara menaik menggunakan Selection Sort.
     *
     * @param array - Array bilangan yang akan diurutkan
     * @returns Array baru yang sudah terurut secara menaik
     */
    sort(array: number[]): number[] {
        // Salin array agar input asli tidak termutasi
        const sorted = [...array]

        for (let index = 0; index < sorted.length; index++) {
            let minIndex = index

            // Cari indeks elemen terkecil pada sisa array yang belum terurut
            for (let scanIndex = index; scanIndex < sorted.length; scanIndex++) {
                if (sorted[scanIndex] < sorted[minIndex]) {
                    minIndex = scanIndex
                }
            }

            // Tukar elemen terkecil ke posisi `index` jika berbeda
            if (index !== minIndex) {
                ;[sorted[index], sorted[minIndex]] = [sorted[minIndex], sorted[index]]
            }
        }

        return sorted
    }
}
