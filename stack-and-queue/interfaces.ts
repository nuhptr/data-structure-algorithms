/**
 * Node untuk stack — satu nilai dan tautan ke node di bawahnya.
 * T = tipe nilai yang disimpan.
 */
export interface IStackNode<T> {
    /** Nilai yang disimpan pada node. */
    value: T
    /** Node di bawah node ini, atau null jika tidak ada. */
    next: IStackNode<T> | null
}

/**
 * Kontrak untuk stack dengan aturan LIFO
 * (terakhir masuk, pertama keluar).
 */
export interface IStack<T> {
    /** Jumlah elemen yang tersimpan. */
    readonly length: number

    /** Tambahkan nilai ke puncak stack; O(1). */
    push(value: T): this

    /** Hapus dan kembalikan node teratas; O(1), undefined jika kosong. */
    pop(): IStackNode<T> | undefined

    /** Baca node teratas tanpa menghapusnya. */
    top(): IStackNode<T> | undefined
}

/**
 * Stack dengan pelacakan nilai minimum — `min()` selalu O(1).
 */
export interface IMinStack<T extends number> extends IStack<T> {
    /** Kembalikan nilai terkecil yang tersimpan, atau undefined jika kosong. */
    min(): T | undefined
}

/**
 * Node untuk queue — satu nilai dan tautan ke node berikutnya.
 */
export interface IQueueNode<T> {
    /** Nilai yang disimpan pada node. */
    value: T
    /** Node berikutnya dalam antrian, atau null jika node terakhir. */
    next: IQueueNode<T> | null
}

/**
 * Kontrak untuk queue dengan aturan FIFO
 * (pertama masuk, pertama keluar).
 */
export interface IQueue<T> {
    /** Jumlah elemen yang tersimpan. */
    readonly length: number

    /** Tambahkan nilai di belakang queue; O(1). */
    enqueue(value: T): this

    /** Hapus dan kembalikan node paling depan; O(1). */
    dequeue(): IQueueNode<T> | undefined
}

/**
 * Kontrak untuk validator pasangan tanda kurung.
 */
export interface IParenthesisValidator {
    /** Periksa apakah setiap tanda kurung memiliki pasangan dengan urutan benar. */
    isValid(input: string): boolean
}

/**
 * Kontrak untuk pembalik string berbasis stack.
 */
export interface IStringReverser {
    /** Kembalikan string dengan urutan karakter terbalik. */
    reverse(input: string): string
}
