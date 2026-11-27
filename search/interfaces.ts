/**
 * Kontrak umum untuk algoritma pencarian.
 *
 * @template T Tipe elemen array yang dicari.
 */
export interface ISearchAlgorithm<T> {
    /**
     * Mencari posisi elemen target di dalam array.
     *
     * @param array Array tempat pencarian dilakukan.
     * @param target Nilai yang dicari.
     * @returns Indeks elemen jika ditemukan, atau `-1` jika tidak ada.
     */
    search(array: T[], target: T): number
}

/**
 * Kontrak untuk pencarian pada array yang sudah terurut secara ascending.
 *
 * @template T Tipe elemen array yang dicari.
 */
export interface ISortedSearchAlgorithm<T> extends ISearchAlgorithm<T> {
    /**
     * Mencari posisi elemen target pada array terurut menaik.
     *
     * @param array Array yang sudah terurut secara ascending.
     * @param target Nilai yang dicari.
     * @returns Indeks elemen jika ditemukan, atau `-1` jika tidak ada.
     */
    search(array: T[], target: T): number
}

/**
 * Kontrak untuk pencarian pada array numerik terurut.
 * Interpolation Search mengasumsikan distribusi nilai seragam.
 */
export interface IInterpolationSearch {
    /**
     * Mencari nilai target menggunakan estimasi posisi secara interpolasi linear.
     *
     * @param array Array angka terurut menaik dengan distribusi seragam.
     * @param target Nilai angka yang dicari.
     * @returns Indeks elemen jika ditemukan, atau `-1` jika tidak ada.
     */
    search(array: number[], target: number): number
}

/**
 * Kontrak untuk Exponential Search: menemukan rentang secara eksponensial lalu melakukan binary search.
 */
export interface IExponentialSearch {
    /**
     * Mencari nilai target dengan menggandakan batas pencarian lalu binary search.
     *
     * @param array Array angka yang sudah terurut menaik.
     * @param target Nilai angka yang dicari.
     * @returns Indeks elemen jika ditemukan, atau `-1` jika tidak ada.
     */
    search(array: number[], target: number): number
}

/**
 * Kontrak untuk Ternary Search: mencari nilai minimum atau maksimum pada fungsi unimodal.
 */
export interface ITernarySearch {
    /**
     * Mencari nilai minimum pada rentang array unimodal berbentuk lembah (`∪`).
     *
     * @param array Array angka unimodal.
     * @param left Indeks batas kiri pencarian (inklusif).
     * @param right Indeks batas kanan pencarian (inklusif).
     * @returns Nilai minimum yang ditemukan dalam rentang `[left, right]`.
     */
    findMin(array: number[], left: number, right: number): number

    /**
     * Mencari nilai maksimum pada rentang array unimodal berbentuk puncak (`∩`).
     *
     * @param array Array angka unimodal.
     * @param left Indeks batas kiri pencarian (inklusif).
     * @param right Indeks batas kanan pencarian (inklusif).
     * @returns Nilai maksimum yang ditemukan dalam rentang `[left, right]`.
     */
    findMax(array: number[], left: number, right: number): number
}
