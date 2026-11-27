import { ISortAlgorithm } from "./interfaces"

/**
 * Shell Sort — generalisasi dari insertion sort yang membandingkan elemen
 * yang terpisah jauh, lalu mengurangi jarak (gap) secara bertahap.
 * Menggunakan urutan gap Knuth: 1, 4, 13, 40, ...
 *
 * Kompleksitas Waktu : O(n log² n) dengan gap sequence Knuth
 * Kompleksitas Ruang : O(1) — in-place
 *
 * @example
 * const sorter = new ShellSort();
 * sorter.sort([64, 25, 12, 22, 11]); // => [11, 12, 22, 25, 64]
 */
export class ShellSort implements ISortAlgorithm {
    /**
     * Mengurutkan salinan array secara menaik menggunakan Shell Sort dengan urutan gap Knuth.
     *
     * @param array - Array bilangan yang akan diurutkan
     * @returns Array baru yang sudah terurut secara menaik
     */
    sort(array: number[]): number[] {
        const cloned = [...array]
        const length = cloned.length

        // Hitung gap awal menggunakan urutan Knuth: (3^k - 1) / 2
        let gap = 1
        while (gap < Math.floor(length / 3)) {
            gap = gap * 3 + 1
        }

        while (gap >= 1) {
            // Insertion sort dengan jarak gap
            for (let startIndex = gap; startIndex < length; startIndex++) {
                const currentValue = cloned[startIndex]
                let shiftIndex = startIndex

                // Geser elemen yang lebih besar sejauh `gap` ke kanan
                while (shiftIndex >= gap && cloned[shiftIndex - gap] > currentValue) {
                    cloned[shiftIndex] = cloned[shiftIndex - gap]
                    shiftIndex -= gap
                }

                cloned[shiftIndex] = currentValue
            }

            gap = Math.floor(gap / 3) // perkecil gap
        }

        return cloned
    }
}
