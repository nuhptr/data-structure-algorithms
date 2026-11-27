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
    /**
     * Menambahkan node di akhir list; O(1) berkat referensi tail.
     *
     * @param value - Nilai yang disimpan pada node baru.
     * @returns Instance list itu sendiri untuk method chaining.
     */
    push(value: T): this

    /**
     * Menghapus dan mengembalikan node terakhir; O(n).
     *
     * @returns Node terakhir yang dihapus, atau `undefined` jika list kosong.
     */
    pop(): ILinkedNode<T> | undefined

    /**
     * Menambahkan node di awal list; O(1).
     *
     * @param value - Nilai yang disimpan pada node baru.
     * @returns Instance list itu sendiri untuk method chaining.
     */
    unshift(value: T): this

    /**
     * Menghapus dan mengembalikan node pertama; O(1).
     *
     * @returns Node pertama yang dihapus, atau `undefined` jika list kosong.
     */
    shift(): ILinkedNode<T> | undefined

    /**
     * Mengembalikan node pertama, atau `null` jika list kosong.
     *
     * @returns Node `head` atau `null`.
     */
    getFirst(): ILinkedNode<T> | null

    /**
     * Mengembalikan node terakhir; O(1) berkat referensi tail.
     *
     * @returns Node `tail` atau `null` jika list kosong.
     */
    getLast(): ILinkedNode<T> | null

    /**
     * Mengembalikan node pada indeks berbasis nol; O(indeks).
     *
     * @param index - Indeks node yang ingin diambil.
     * @returns Node pada posisi `index`, atau `null` jika indeks tidak valid.
     */
    get(index: number): ILinkedNode<T> | null

    /**
     * Mengganti nilai node pada indeks tertentu.
     *
     * @param index - Indeks node yang akan diperbarui.
     * @param value - Nilai baru untuk node tersebut.
     * @returns `true` jika berhasil diperbarui, `false` jika indeks tidak valid.
     */
    set(index: number, value: T): boolean

    /**
     * Menyisipkan nilai pada indeks `0` sampai `length`.
     *
     * @param index - Posisi penyisipan node baru.
     * @param value - Nilai yang akan disisipkan.
     * @returns `true` jika berhasil disisipkan, `false` jika indeks tidak valid.
     */
    insert(index: number, value: T): boolean

    /**
     * Mengembalikan jumlah node dalam list; O(1).
     *
     * @returns Total node yang tersimpan.
     */
    size(): number

    /**
     * Mengosongkan seluruh list.
     *
     * @returns Tidak mengembalikan nilai.
     */
    clear(): void
}

/**
 * Kontrak untuk doubly linked list.
 */
export interface IDoublyLinkedList<T> {
    /**
     * Menambahkan node di akhir list; O(1).
     *
     * @param value - Nilai yang disimpan pada node baru.
     * @returns Instance list itu sendiri untuk method chaining.
     */
    push(value: T): this

    /**
     * Menghapus dan mengembalikan node terakhir; O(1).
     *
     * @returns Node terakhir yang dihapus, atau `undefined` jika list kosong.
     */
    pop(): IDoublyLinkedNode<T> | undefined

    /**
     * Menambahkan node di awal list; O(1).
     *
     * @param value - Nilai yang disimpan pada node baru.
     * @returns Instance list itu sendiri untuk method chaining.
     */
    unshift(value: T): this

    /**
     * Menghapus dan mengembalikan node pertama; O(1).
     *
     * @returns Node pertama yang dihapus, atau `undefined` jika list kosong.
     */
    shift(): IDoublyLinkedNode<T> | undefined
}

/**
 * Kontrak untuk list yang dapat membalik urutan node-nya.
 */
export interface IReversibleLinkedList<T> {
    /**
     * Menambahkan node di akhir list.
     *
     * @param value - Nilai yang disimpan pada node baru.
     * @returns Instance list itu sendiri untuk method chaining.
     */
    push(value: T): this

    /**
     * Membalik arah semua tautan `next`; O(n) waktu, O(1) ruang.
     *
     * @returns Instance list itu sendiri setelah urutan node dibalik.
     */
    reverse(): this
}
