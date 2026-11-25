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
    sort(array: number[]): number[] {
        return this.mergeSort([...array])
    }

    private mergeSort(values: number[]): number[] {
        if (values.length <= 1) return values

        const middleIndex = Math.floor(values.length / 2)

        return this.merge(
            this.mergeSort(values.slice(0, middleIndex)),
            this.mergeSort(values.slice(middleIndex)),
        )
    }

    private merge(left: number[], right: number[]): number[] {
        const result: number[] = []
        let leftIndex = 0
        let rightIndex = 0

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex])
                leftIndex++
            } else {
                result.push(right[rightIndex])
                rightIndex++
            }
        }

        return result.concat(left.slice(leftIndex), right.slice(rightIndex))
    }
}
