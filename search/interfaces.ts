/**
 * Kontrak umum untuk algoritma pencarian.
 * T = tipe elemen array yang dicari.
 */
export interface ISearchAlgorithm<T> {
    search(array: T[], target: T): number
}

/**
 * Kontrak untuk pencarian pada array yang sudah terurut secara ascending.
 */
export interface ISortedSearchAlgorithm<T> extends ISearchAlgorithm<T> {
    /**
     * @param array  - Array yang sudah terurut secara ascending
     * @param target - Nilai yang dicari
     * @returns index elemen jika ditemukan, -1 jika tidak
     */
    search(array: T[], target: T): number
}

/**
 * Kontrak untuk pencarian pada array integer terurut.
 * Interpolation Search mengasumsikan distribusi nilai seragam.
 */
export interface IInterpolationSearch {
    search(array: number[], target: number): number
}

/**
 * Kontrak untuk Exponential Search: menemukan range lalu binary search.
 */
export interface IExponentialSearch {
    search(array: number[], target: number): number
}

/**
 * Kontrak untuk Ternary Search: mencari minimum/maksimum pada fungsi unimodal.
 */
export interface ITernarySearch {
    findMin(array: number[], left: number, right: number): number
    findMax(array: number[], left: number, right: number): number
}
