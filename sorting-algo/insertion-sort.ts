import { ISortAlgorithm } from "./interfaces"

/**
 * Insertion Sort — menyisipkan setiap elemen ke posisi yang tepat
 * pada bagian array yang sudah terurut.
 *
 * Kompleksitas Waktu : O(n²)
 * Kompleksitas Ruang : O(1) — in-place pada salinan array
 *
 * @example
 * const sorter = new InsertionSort();
 * sorter.sort([5, 2, 4, 6, 1, 3]); // => [1, 2, 3, 4, 5, 6]
 */
export class InsertionSort implements ISortAlgorithm {
    /**
     * Mengurutkan salinan array secara menaik menggunakan Insertion Sort.
     *
     * @param array - Array bilangan yang akan diurutkan
     * @returns Array baru yang sudah terurut secara menaik
     */
    sort(array: number[]): number[] {
        // Salin array agar input asli tidak termutasi
        const sorted = [...array]

        for (let currentIndex = 1; currentIndex < sorted.length; currentIndex++) {
            const currentValue = sorted[currentIndex]
            let previousIndex = currentIndex - 1

            // Geser elemen yang lebih besar dari `currentValue` satu posisi ke kanan
            while (previousIndex >= 0 && sorted[previousIndex] > currentValue) {
                sorted[previousIndex + 1] = sorted[previousIndex]
                previousIndex--
            }

            // Sisipkan `currentValue` ke posisi yang tepat
            sorted[previousIndex + 1] = currentValue
        }

        return sorted
    }
}
