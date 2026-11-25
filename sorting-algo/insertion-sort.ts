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
    sort(array: number[]): number[] {
        const sorted = [...array]

        for (let currentIndex = 1; currentIndex < sorted.length; currentIndex++) {
            const currentValue = sorted[currentIndex]
            let previousIndex = currentIndex - 1

            while (previousIndex >= 0 && sorted[previousIndex] > currentValue) {
                sorted[previousIndex + 1] = sorted[previousIndex]
                previousIndex--
            }

            sorted[previousIndex + 1] = currentValue
        }

        return sorted
    }
}
