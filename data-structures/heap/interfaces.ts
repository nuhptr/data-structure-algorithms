/**
 * Kontrak umum untuk struktur data Binary Heap (MinHeap maupun MaxHeap).
 *
 * @typeParam T - Tipe elemen yang disimpan di dalam Heap
 */
export interface IHeap<T> {
    /**
     * Menyisipkan elemen baru ke dalam Heap sambil menjaga properti heap.
     *
     * @param value - Nilai elemen yang akan disisipkan
     */
    insert(value: T): void

    /**
     * Menghapus dan mengembalikan elemen puncak (minimum pada MinHeap atau maksimum pada MaxHeap).
     *
     * @returns Elemen puncak Heap
     */
    extract(): T

    /**
     * Mengembalikan jumlah elemen yang saat ini berada di dalam Heap.
     *
     * @returns Jumlah elemen
     */
    size(): number

    /**
     * Memeriksa apakah Heap sedang kosong.
     *
     * @returns `true` jika tidak ada elemen, `false` jika tidak kosong
     */
    isEmpty(): boolean
}
