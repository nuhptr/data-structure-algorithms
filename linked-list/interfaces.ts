/**
 * Node untuk singly linked list.
 * T = tipe nilai yang disimpan.
 */
export interface ILinkedNode<T> {
    /** Nilai yang disimpan pada node. */
    value: T
    /** Node berikutnya, atau null jika ini node terakhir. */
    next: ILinkedNode<T> | null
}

/**
 * Node untuk doubly linked list — dapat ditelusuri dua arah.
 */
export interface IDoublyLinkedNode<T> {
    /** Nilai yang disimpan pada node. */
    value: T
    /** Node berikutnya, atau null jika ini node terakhir. */
    next: IDoublyLinkedNode<T> | null
    /** Node sebelumnya, atau null jika ini node pertama. */
    prev: IDoublyLinkedNode<T> | null
}

/**
 * Kontrak untuk singly linked list.
 */
export interface ISinglyLinkedList<T> {
    /** Tambahkan node di akhir list; O(1) berkat referensi tail. */
    push(value: T): this

    /** Hapus dan kembalikan node terakhir; O(n). */
    pop(): ILinkedNode<T> | undefined

    /** Tambahkan node di awal list; O(1). */
    unshift(value: T): this

    /** Hapus dan kembalikan node pertama; O(1). */
    shift(): ILinkedNode<T> | undefined

    /** Kembalikan node pertama, atau null jika list kosong. */
    getFirst(): ILinkedNode<T> | null

    /** Kembalikan node terakhir; O(1) berkat referensi tail. */
    getLast(): ILinkedNode<T> | null

    /** Kembalikan node pada indeks berbasis nol; O(indeks). */
    get(index: number): ILinkedNode<T> | null

    /** Ganti nilai node pada indeks; false jika indeks tidak valid. */
    set(index: number, value: T): boolean

    /** Sisipkan nilai pada indeks 0 sampai length; false jika tidak valid. */
    insert(index: number, value: T): boolean

    /** Kembalikan jumlah node; O(1). */
    size(): number

    /** Kosongkan seluruh list. */
    clear(): void
}

/**
 * Kontrak untuk doubly linked list.
 */
export interface IDoublyLinkedList<T> {
    /** Tambahkan node di akhir list; O(1). */
    push(value: T): this

    /** Hapus dan kembalikan node terakhir; O(1). */
    pop(): IDoublyLinkedNode<T> | undefined

    /** Tambahkan node di awal list; O(1). */
    unshift(value: T): this

    /** Hapus dan kembalikan node pertama; O(1). */
    shift(): IDoublyLinkedNode<T> | undefined
}

/**
 * Kontrak untuk list yang dapat membalik urutan node-nya.
 */
export interface IReversibleLinkedList<T> {
    /** Tambahkan node di akhir list. */
    push(value: T): this

    /** Balik arah semua tautan next; O(n) waktu, O(1) ruang. */
    reverse(): this
}
