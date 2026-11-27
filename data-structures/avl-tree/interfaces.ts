/**
 * Kontrak untuk struktur data AVL Tree (Binary Search Tree yang menyeimbangkan diri sendiri).
 *
 * @typeParam T - Tipe nilai elemen yang disimpan dan dapat dibandingkan
 */
export interface IAVLTree<T> {
    /**
     * Menyisipkan nilai baru ke dalam AVL Tree dan menjaga keseimbangan pohon.
     *
     * @param value - Nilai yang akan disisipkan
     */
    insert(value: T): void

    /**
     * Menghapus nilai dari AVL Tree jika ada, lalu menyeimbangkan ulang pohon.
     *
     * @param value - Nilai yang akan dihapus
     */
    delete(value: T): void

    /**
     * Memeriksa apakah nilai tertentu terdapat di dalam AVL Tree.
     *
     * @param value - Nilai yang dicari
     * @returns `true` jika nilai ditemukan, `false` jika tidak
     */
    contains(value: T): boolean

    /**
     * Mengembalikan tinggi total pohon (0 jika pohon kosong).
     *
     * @returns Tinggi AVL Tree saat ini
     */
    height(): number

    /**
     * Melakukan traversal in-order untuk menghasilkan seluruh elemen dalam urutan menaik.
     *
     * @returns Array berisi seluruh nilai dalam urutan terurut
     */
    inOrder(): T[]
}
