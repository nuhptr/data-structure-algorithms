/**
 * Kontrak untuk struktur data hash table generik.
 *
 * @template T Tipe nilai yang disimpan pada setiap entri.
 */
export interface IHashTable<T> {
    /**
     * Menyimpan pasangan kunci-nilai. Jika kunci sudah ada,
     * nilainya diperbarui; jika belum, pasangan baru disisipkan.
     *
     * @param key Kunci unik bertipe string.
     * @param value Nilai yang ingin disimpan.
     * @returns Instans hash table saat ini untuk mendukung method chaining.
     */
    set(key: string, value: T): this

    /**
     * Mengambil nilai berdasarkan kunci, atau `undefined` jika tidak ada.
     *
     * @param key Kunci yang nilainya ingin diambil.
     * @returns Nilai yang terkait dengan kunci, atau `undefined` jika tidak ditemukan.
     */
    get(key: string): T | undefined

    /**
     * Mengembalikan semua kunci yang tersimpan.
     *
     * @returns Array berisi seluruh kunci yang tersimpan di dalam tabel.
     */
    getAllKeys(): string[]

    /**
     * Mengembalikan semua nilai yang tersimpan.
     *
     * @returns Array berisi seluruh nilai yang tersimpan di dalam tabel.
     */
    getAllValues(): T[]
}

/**
 * Kontrak untuk pengelompokan anagram.
 */
export interface IAnagramGrouper {
    /**
     * Mengelompokkan string berdasarkan karakter yang sama
     * tanpa memperhatikan urutan kemunculannya.
     *
     * @param strings Daftar string yang akan dikelompokkan.
     * @returns Peta dari kunci huruf terurut ke daftar string anagramnya.
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
     *
     * @param input Objek berisi daftar angka dan nilai target penjumlahan.
     * @returns Array berisi dua indeks `[i, j]`, atau array kosong jika tidak ditemukan.
     */
    findPair(input: TwoSumInput): number[]
}

/**
 * Parameter masukan untuk {@link ITwoSumSolver}.
 */
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
    /**
     * Mengembalikan peta kata (huruf kecil) ke jumlah kemunculannya.
     *
     * @param text Teks masukan yang akan dihitung frekuensi katanya.
     * @returns Objek pemetaan setiap kata ke jumlah kemunculannya.
     */
    count(text: string): Record<string, number>
}
