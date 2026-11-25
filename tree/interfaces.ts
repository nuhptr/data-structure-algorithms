/**
 * Kontrak untuk Binary Search Tree yang mendukung sisipan
 * dan pengecekan keberadaan nilai.
 * T = tipe nilai yang disimpan.
 */
export interface IBinarySearchTree<T> {
    /**
     * Sisipkan nilai ke posisi yang sesuai aturan BST.
     * Duplikat tidak disisipkan; kembalikan pohon jika berhasil.
     */
    insert(value: T): this | undefined

    /** Periksa apakah nilai ada di dalam pohon. */
    includes(value: T): boolean
}

/**
 * Kontrak untuk tree traversal — mengunjungi simpul dalam
 * berbagai urutan.
 * T = tipe nilai yang disimpan.
 */
export interface ITreeTraversable<T> {
    /** Kunjungi simpul per level dari kiri ke kanan (BFS). */
    breadthFirstSearch(): T[]

    /** Kunjungi simpul, anak kiri, lalu anak kanan (pre-order). */
    dfsPreOrder(): T[]

    /** Kunjungi anak kiri, anak kanan, lalu simpul (post-order). */
    dfsPostOrder(): T[]

    /** Kunjungi anak kiri, simpul, lalu anak kanan (in-order). */
    dfsInOrder(): T[]
}
