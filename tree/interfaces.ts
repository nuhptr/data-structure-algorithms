/**
 * Kontrak untuk Binary Search Tree yang mendukung penyisipan
 * dan pengecekan keberadaan nilai.
 *
 * @template T Tipe nilai yang disimpan pada setiap simpul pohon.
 */
export interface IBinarySearchTree<T> {
    /**
     * Menyisipkan nilai ke posisi yang sesuai aturan BST.
     * Nilai duplikat tidak disisipkan.
     *
     * @param value Nilai yang akan disisipkan ke dalam pohon.
     * @returns Instans pohon saat ini jika berhasil, atau `undefined` jika nilai duplikat.
     */
    insert(value: T): this | undefined

    /**
     * Memeriksa apakah suatu nilai ada di dalam pohon.
     *
     * @param value Nilai yang dicari di dalam pohon.
     * @returns `true` jika nilai ditemukan, selain itu `false`.
     */
    includes(value: T): boolean
}

/**
 * Kontrak untuk tree traversal — mengunjungi simpul dalam
 * berbagai urutan penelusuran.
 *
 * @template T Tipe nilai yang disimpan pada setiap simpul pohon.
 */
export interface ITreeTraversable<T> {
    /**
     * Mengunjungi simpul per level dari kiri ke kanan (Breadth-First Search).
     *
     * @returns Array nilai simpul sesuai urutan kunjungan per level.
     */
    breadthFirstSearch(): T[]

    /**
     * Mengunjungi simpul saat ini, anak kiri, lalu anak kanan (DFS pre-order).
     *
     * @returns Array nilai simpul sesuai urutan pre-order.
     */
    dfsPreOrder(): T[]

    /**
     * Mengunjungi anak kiri, anak kanan, lalu simpul saat ini (DFS post-order).
     *
     * @returns Array nilai simpul sesuai urutan post-order.
     */
    dfsPostOrder(): T[]

    /**
     * Mengunjungi anak kiri, simpul saat ini, lalu anak kanan (DFS in-order).
     *
     * @returns Array nilai simpul sesuai urutan in-order.
     */
    dfsInOrder(): T[]
}
