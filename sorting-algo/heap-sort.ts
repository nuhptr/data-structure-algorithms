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
    /**
     * Mengurutkan salinan array secara menaik menggunakan Heap Sort.
     *
     * @param array - Array bilangan yang akan diurutkan
     * @returns Array baru yang sudah terurut secara menaik
     */
    sort(array: number[]): number[] {
        const cloned = [...array]

        // Bangun struktur max-heap dari seluruh elemen array
        this.buildMaxHeap(cloned)

        for (let sortedBoundary = cloned.length - 1; sortedBoundary > 0; sortedBoundary--) {
            // Pindahkan elemen terbesar (root) ke posisi terurut di akhir
            this.swap(cloned, 0, sortedBoundary)
            // Pulihkan properti max-heap pada sisa elemen yang belum terurut
            this.heapify(cloned, 0, sortedBoundary)
        }

        return cloned
    }

    /**
     * Mengubah array menjadi struktur max-heap secara bottom-up.
     *
     * @param array - Array yang akan dibentuk menjadi max-heap
     * @returns Tidak mengembalikan nilai (memodifikasi `array` secara in-place)
     */
    private buildMaxHeap(array: number[]): void {
        // Mulai dari node non-daun terakhir menuju root
        const lastNonLeafIndex = Math.floor(array.length / 2) - 1

        for (let nodeIndex = lastNonLeafIndex; nodeIndex >= 0; nodeIndex--) {
            this.heapify(array, nodeIndex, array.length)
        }
    }

    /**
     * Menjaga properti max-heap pada subtree yang berakar di `rootIndex`.
     *
     * @param array - Array representasi heap
     * @param rootIndex - Indeks akar subtree yang akan diperiksa
     * @param heapSize - Jumlah elemen aktif yang masih termasuk dalam heap
     * @returns Tidak mengembalikan nilai
     */
    private heapify(array: number[], rootIndex: number, heapSize: number): void {
        let largestIndex = rootIndex
        const leftChildIndex = 2 * rootIndex + 1
        const rightChildIndex = 2 * rootIndex + 2

        // Cek apakah anak kiri lebih besar dari kandidat terbesar saat ini
        if (leftChildIndex < heapSize && array[leftChildIndex] > array[largestIndex]) {
            largestIndex = leftChildIndex
        }

        // Cek apakah anak kanan lebih besar dari kandidat terbesar saat ini
        if (rightChildIndex < heapSize && array[rightChildIndex] > array[largestIndex]) {
            largestIndex = rightChildIndex
        }

        // Jika root bukan yang terbesar, tukar lalu lanjutkan heapify ke subtree terdampak
        if (largestIndex !== rootIndex) {
            this.swap(array, rootIndex, largestIndex)
            this.heapify(array, largestIndex, heapSize)
        }
    }

    /**
     * Menukar posisi dua elemen di dalam array.
     *
     * @param array - Array yang elemennya akan ditukar
     * @param indexA - Indeks elemen pertama
     * @param indexB - Indeks elemen kedua
     * @returns Tidak mengembalikan nilai
     */
    private swap(array: number[], indexA: number, indexB: number): void {
        ;[array[indexA], array[indexB]] = [array[indexB], array[indexA]]
    }
}
