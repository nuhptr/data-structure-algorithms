/**
 * Kontrak untuk array dinamis buatan.
 * T = tipe elemen yang disimpan.
 */
export interface ICustomArray<T> {
    /** Jumlah elemen yang tersimpan. */
    readonly length: number

    /** Menambahkan nilai ke akhir array dan mengembalikan panjang baru. */
    push(item: T): number

    /** Mengambil nilai pada indeks, atau undefined jika tidak ada. */
    get(index: number): T | undefined

    /** Menghapus dan mengembalikan elemen terakhir, atau undefined jika kosong. */
    pop(): T | undefined

    /** Menghapus dan mengembalikan elemen pertama, atau undefined jika kosong. */
    shift(): T | undefined

    /** Menghapus elemen pada indeks dan mengembalikannya, atau undefined jika tidak valid. */
    delete(index: number): T | undefined
}

/**
 * Kontrak untuk pembalik urutan string.
 */
export interface IStringReverser {
    /** Mengembalikan string baru dengan urutan karakter terbalik. */
    reverse(text: string): string
}
