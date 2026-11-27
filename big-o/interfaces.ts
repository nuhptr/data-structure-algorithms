/**
 * Kontrak untuk demonstrasi kompleksitas waktu konstan O(1).
 */
export interface IConstantTimeExample {
    /**
     * Mengembalikan elemen pada indeks tertentu dalam array.
     *
     * @param array - Array sumber yang akan diakses.
     * @param index - Indeks elemen yang ingin diambil.
     * @returns Elemen array pada posisi `index`.
     */
    getElement<T>(array: T[], index: number): T
}

/**
 * Kontrak untuk demonstrasi kompleksitas waktu linear O(n).
 */
export interface ILinearTimeExample {
    /**
     * Mengembalikan semua kecocokan item dalam daftar melalui dua kali pemindaian linear.
     *
     * @param list - Daftar string yang akan dipindai.
     * @param item - Nilai string yang dicari kecocokannya.
     * @returns Array berisi semua kemunculan `item` dari kedua pemindaian.
     */
    findItems(list: string[], item: string): string[]
}

/**
 * Kontrak untuk demonstrasi kompleksitas waktu kuadratik O(n²).
 */
export interface IQuadraticTimeExample {
    /**
     * Mengembalikan semua pasangan unik `(i < j)` dari array.
     *
     * @param array - Array angka yang akan dipasangkan.
     * @returns Array berisi tuple pasangan `[array[i], array[j]]`.
     */
    findPairs(array: number[]): Array<[number, number]>
}
