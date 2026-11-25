import { ISortAlgorithm } from "./interfaces"

/**
 * Heap Sort — membangun max-heap dari array, lalu secara berulang
 * mengekstrak elemen terbesar ke posisi akhir.
 *
 * Kompleksitas Waktu : O(n log n) — best, average, worst case
 * Kompleksitas Ruang : O(1) — in-place
 *
 * @example
 * const sorter = new HeapSort();
 * sorter.sort([7, 3, 5, 1, 4, 2]); // => [1, 2, 3, 4, 5, 7]
 */
export class HeapSort implements ISortAlgorithm {
    sort(array: number[]): number[] {
        const cloned = [...array]

        this.buildMaxHeap(cloned)

        for (let sortedBoundary = cloned.length - 1; sortedBoundary > 0; sortedBoundary--) {
            // Pindahkan elemen terbesar (root) ke posisi terurut di akhir
            this.swap(cloned, 0, sortedBoundary)
            this.heapify(cloned, 0, sortedBoundary)
        }

        return cloned
    }

    private buildMaxHeap(array: number[]): void {
        const lastNonLeafIndex = Math.floor(array.length / 2) - 1

        for (let nodeIndex = lastNonLeafIndex; nodeIndex >= 0; nodeIndex--) {
            this.heapify(array, nodeIndex, array.length)
        }
    }

    private heapify(array: number[], rootIndex: number, heapSize: number): void {
        let largestIndex = rootIndex
        const leftChildIndex = 2 * rootIndex + 1
        const rightChildIndex = 2 * rootIndex + 2

        if (leftChildIndex < heapSize && array[leftChildIndex] > array[largestIndex]) {
            largestIndex = leftChildIndex
        }

        if (rightChildIndex < heapSize && array[rightChildIndex] > array[largestIndex]) {
            largestIndex = rightChildIndex
        }

        if (largestIndex !== rootIndex) {
            this.swap(array, rootIndex, largestIndex)
            this.heapify(array, largestIndex, heapSize)
        }
    }

    private swap(array: number[], indexA: number, indexB: number): void {
        ;[array[indexA], array[indexB]] = [array[indexB], array[indexA]]
    }
}
