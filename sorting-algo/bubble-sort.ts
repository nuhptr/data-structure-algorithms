import { ISortAlgorithm } from "./interfaces"

/**
 * Bubble Sort — mengurutkan array menaik dengan menukar pasangan
 * yang bersebelahan hingga tidak ada lagi yang tidak berurutan.
 *
 * Setiap putaran menempatkan satu nilai terbesar yang tersisa di ujung
 * kanan, sehingga batas `endIndex` terus bergerak ke kiri.
 *
 * Kompleksitas Waktu : O(n²)
 * Kompleksitas Ruang : O(1) — in-place pada salinan array
 *
 * @example
 * const sorter = new BubbleSort();
 * sorter.sort([4, 2, 6, 5, 1, 3]); // => [1, 2, 3, 4, 5, 6]
 */
export class BubbleSort implements ISortAlgorithm {
    /**
     * Mengurutkan salinan array secara menaik menggunakan Bubble Sort.
     *
     * @param array - Array bilangan yang akan diurutkan
     * @returns Array baru yang sudah terurut secara menaik
     */
    sort(array: number[]): number[] {
        // Salin array agar input asli tidak termutasi
        const sorted = [...array]

        // Setiap iterasi memindahkan elemen terbesar di bagian tak terurut ke `endIndex`
        for (let endIndex = sorted.length - 1; endIndex > 0; endIndex--) {
            for (let currentIndex = 0; currentIndex < endIndex; currentIndex++) {
                // Tukar elemen bersebelahan jika urutannya terbalik
                if (sorted[currentIndex] > sorted[currentIndex + 1]) {
                    ;[sorted[currentIndex], sorted[currentIndex + 1]] = [
                        sorted[currentIndex + 1],
                        sorted[currentIndex],
                    ]
                }
            }
        }

        return sorted
    }
}
