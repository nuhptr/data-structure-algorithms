/**
 * Kontrak untuk array dinamis buatan.
 * `T` adalah tipe elemen yang disimpan.
 */
export interface ICustomArray<T> {
    /** Jumlah elemen yang tersimpan. */
    readonly length: number

    /**
     * Menambahkan nilai ke akhir array dan mengembalikan panjang baru.
     *
     * @param item - Elemen yang akan ditambahkan.
     * @returns Panjang array setelah penambahan.
     */
    push(item: T): number

    /**
     * Mengambil nilai pada indeks tertentu, atau `undefined` jika tidak ada.
     *
     * @param index - Indeks elemen yang ingin diambil.
     * @returns Nilai pada posisi `index`, atau `undefined` jika tidak ditemukan.
     */
    get(index: number): T | undefined

    /**
     * Menghapus dan mengembalikan elemen terakhir, atau `undefined` jika kosong.
     *
     * @returns Elemen terakhir yang dihapus, atau `undefined` jika array kosong.
     */
    pop(): T | undefined

    /**
     * Menghapus dan mengembalikan elemen pertama, atau `undefined` jika kosong.
     *
     * @returns Elemen pertama yang dihapus, atau `undefined` jika array kosong.
     */
    shift(): T | undefined

    /**
     * Menghapus elemen pada indeks tertentu dan mengembalikannya, atau `undefined` jika tidak valid.
     *
     * @param index - Indeks elemen yang akan dihapus.
     * @returns Elemen yang dihapus, atau `undefined` jika indeks di luar rentang.
     */
    delete(index: number): T | undefined
}

/**
 * Kontrak untuk pembalik urutan string.
 */
export interface IStringReverser {
    /**
     * Mengembalikan string baru dengan urutan karakter terbalik.
     *
     * @param text - String masukan yang akan dibalik.
     * @returns String hasil pembalikan karakter.
     */
    reverse(text: string): string
}
