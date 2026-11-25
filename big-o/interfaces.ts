/**
 * Kontrak untuk demonstrasi kompleksitas waktu konstan O(1).
 */
export interface IConstantTimeExample {
    /** Mengembalikan elemen pada indeks tertentu dalam array. */
    getElement<T>(array: T[], index: number): T
}

/**
 * Kontrak untuk demonstrasi kompleksitas waktu linear O(n).
 */
export interface ILinearTimeExample {
    /** Mengembalikan semua kecocokan item dalam daftar, dua kali pemindaian. */
    findItems(list: string[], item: string): string[]
}

/**
 * Kontrak untuk demonstrasi kompleksitas waktu kuadratik O(n²).
 */
export interface IQuadraticTimeExample {
    /** Mengembalikan semua pasangan unik (i < j) dari array. */
    findPairs(array: number[]): Array<[number, number]>
}
