/**
 * Kontrak untuk struktur data hash table generik.
 * T = tipe nilai yang disimpan.
 */
export interface IHashTable<T> {
    /**
     * Menyimpan pasangan kunci-nilai. Jika kunci sudah ada,
     * nilainya diperbarui; jika belum, pasangan baru disisipkan.
     */
    set(key: string, value: T): this

    /** Mengambil nilai berdasarkan kunci, atau undefined jika tidak ada. */
    get(key: string): T | undefined

    /** Mengembalikan semua kunci yang tersimpan. */
    getAllKeys(): string[]

    /** Mengembalikan semua nilai yang tersimpan. */
    getAllValues(): T[]
}

/**
 * Kontrak untuk pengelompokan anagram.
 */
export interface IAnagramGrouper {
    /**
     * Mengelompokkan string berdasarkan karakter yang sama
     * tanpa memperhatikan urutan kemunculannya.
     */
    group(strings: string[]): Record<string, string[]>
}

/**
 * Kontrak untuk pencarian pasangan angka yang berjumlah target.
 */
export interface ITwoSumSolver {
    /**
     * Mencari satu pasang indeks berbeda yang jumlah nilainya
     * sama dengan target. Mengembalikan array kosong jika tidak ada.
     */
    findPair(input: TwoSumInput): number[]
}

/** Parameter masukan untuk ITwoSumSolver. */
export interface TwoSumInput {
    /** Daftar angka yang akan diperiksa. */
    nums: number[]
    /** Jumlah yang harus dihasilkan oleh pasangan angka. */
    target: number
}

/**
 * Kontrak untuk penghitung kemunculan kata dalam teks.
 */
export interface IWordCounter {
    /** Mengembalikan peta kata (huruf kecil) ke jumlah kemunculannya. */
    count(text: string): Record<string, number>
}
