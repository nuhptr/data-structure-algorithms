/**
 * Node untuk stack — satu nilai dan tautan ke node di bawahnya.
 *
 * @template T Tipe nilai yang disimpan pada node.
 */
export interface IStackNode<T> {
    /** Nilai yang disimpan pada node. */
    value: T
    /** Node di bawah node ini, atau `null` jika tidak ada. */
    next: IStackNode<T> | null
}

/**
 * Kontrak untuk stack dengan aturan LIFO
 * (terakhir masuk, pertama keluar).
 *
 * @template T Tipe nilai yang disimpan pada stack.
 */
export interface IStack<T> {
    /** Jumlah elemen yang tersimpan. */
    readonly length: number

    /**
     * Menambahkan nilai ke puncak stack dalam waktu O(1).
     *
     * @param value Nilai yang ingin dimasukkan ke stack.
     * @returns Instans stack saat ini untuk mendukung method chaining.
     */
    push(value: T): this

    /**
     * Menghapus dan mengembalikan node teratas dalam waktu O(1).
     *
     * @returns Node teratas yang dihapus, atau `undefined` jika stack kosong.
     */
    pop(): IStackNode<T> | undefined

    /**
     * Membaca node teratas tanpa menghapusnya.
     *
     * @returns Node paling atas pada stack, atau `undefined` jika stack kosong.
     */
    top(): IStackNode<T> | undefined
}

/**
 * Stack dengan pelacakan nilai minimum — `min()` selalu O(1).
 *
 * @template T Tipe numerik yang disimpan pada stack.
 */
export interface IMinStack<T extends number> extends IStack<T> {
    /**
     * Mengembalikan nilai terkecil yang sedang tersimpan di dalam stack.
     *
     * @returns Nilai minimum saat ini, atau `undefined` jika stack kosong.
     */
    min(): T | undefined
}

/**
 * Node untuk queue — satu nilai dan tautan ke node berikutnya.
 *
 * @template T Tipe nilai yang disimpan pada node.
 */
export interface IQueueNode<T> {
    /** Nilai yang disimpan pada node. */
    value: T
    /** Node berikutnya dalam antrean, atau `null` jika node terakhir. */
    next: IQueueNode<T> | null
}

/**
 * Kontrak untuk queue dengan aturan FIFO
 * (pertama masuk, pertama keluar).
 *
 * @template T Tipe nilai yang disimpan pada queue.
 */
export interface IQueue<T> {
    /** Jumlah elemen yang tersimpan. */
    readonly length: number

    /**
     * Menambahkan nilai di belakang queue dalam waktu O(1).
     *
     * @param value Nilai yang ingin dimasukkan ke antrean.
     * @returns Instans queue saat ini untuk mendukung method chaining.
     */
    enqueue(value: T): this

    /**
     * Menghapus dan mengembalikan node paling depan dalam waktu O(1).
     *
     * @returns Node paling depan yang dihapus, atau `undefined` jika queue kosong.
     */
    dequeue(): IQueueNode<T> | undefined
}

/**
 * Kontrak untuk validator pasangan tanda kurung.
 */
export interface IParenthesisValidator {
    /**
     * Memeriksa apakah setiap tanda kurung memiliki pasangan dengan urutan benar.
     *
     * @param input String berisi tanda kurung yang akan divalidasi.
     * @returns `true` jika seluruh tanda kurung seimbang dan valid, selain itu `false`.
     */
    isValid(input: string): boolean
}

/**
 * Kontrak untuk pembalik string berbasis stack.
 */
export interface IStringReverser {
    /**
     * Mengembalikan string dengan urutan karakter terbalik.
     *
     * @param input String masukan yang akan dibalik.
     * @returns String baru dengan urutan karakter dari belakang ke depan.
     */
    reverse(input: string): string
}
