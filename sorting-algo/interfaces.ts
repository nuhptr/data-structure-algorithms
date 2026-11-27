/**
 * Kontrak umum untuk algoritma pengurutan array bilangan.
 */
export interface ISortAlgorithm {
    /**
     * Mengurutkan array bilangan secara menaik tanpa memodifikasi array asal.
     *
     * @param array - Array bilangan yang akan diurutkan
     * @returns Array baru yang sudah terurut secara menaik
     */
    sort(array: number[]): number[]
}
