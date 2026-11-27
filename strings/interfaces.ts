/**
 * Kontrak untuk algoritma pencarian string (pattern matching).
 */
export interface IStringMatcher {
    /**
     * Mencari semua indeks kemunculan pola di dalam teks.
     *
     * @param text - Teks utama yang akan dicari.
     * @param pattern - Pola yang dicari di dalam teks.
     * @returns Daftar indeks awal setiap posisi tempat pola ditemukan.
     */
    findAll(text: string, pattern: string): number[]
}

/**
 * Kontrak untuk algoritma yang hanya memeriksa keberadaan pola di dalam teks.
 */
export interface IStringContains {
    /**
     * Memeriksa apakah pola muncul minimal sekali di dalam teks.
     *
     * @param text - Teks utama yang diperiksa.
     * @param pattern - Pola substring yang dicari.
     * @returns `true` jika pola ditemukan, `false` jika tidak.
     */
    contains(text: string, pattern: string): boolean
}

/**
 * Kontrak untuk Z-Algorithm: membangun Z-array dan pencarian pola berbasis Z-array.
 */
export interface IZAlgorithm {
    /**
     * Membangun Z-array dari sebuah string di mana `Z[i]` adalah panjang prefix terpanjang
     * yang cocok dimulai dari indeks `i`.
     *
     * @param s - String masukan.
     * @returns Array nilai Z untuk setiap posisi string.
     */
    buildZArray(s: string): number[]

    /**
     * Menemukan semua indeks kemunculan pola di dalam teks menggunakan Z-array.
     *
     * @param text - Teks utama yang dicari.
     * @param pattern - Pola yang dicari.
     * @returns Daftar indeks awal kemunculan pola dalam teks.
     */
    findAll(text: string, pattern: string): number[]
}

/**
 * Kontrak untuk Aho-Corasick: multi-pattern string matching dalam satu lintasan teks.
 */
export interface IAhoCorasick {
    /**
     * Menambahkan satu pola ke dalam struktur Trie sebelum tahap `build()`.
     *
     * @param pattern - Pola string yang akan didaftarkan.
     * @returns Instance ini sendiri untuk mendukung method chaining.
     */
    addPattern(pattern: string): this

    /**
     * Membangun failure link dan output link pada Trie menggunakan BFS.
     *
     * @returns Instance ini sendiri setelah automaton siap digunakan.
     */
    build(): this

    /**
     * Mencari semua pola yang telah didaftarkan di dalam teks masukan.
     *
     * @param text - Teks target pencarian.
     * @returns Peta dari setiap pola yang ditemukan ke daftar indeks awal kemunculannya.
     */
    search(text: string): Map<string, number[]>
}

/**
 * Kontrak untuk Suffix Array.
 */
export interface ISuffixArray {
    /**
     * Membangun suffix array yang berisi indeks awal semua suffix terurut leksikografis.
     *
     * @param s - String sumber.
     * @returns Array indeks awal suffix dalam urutan leksikografis.
     */
    build(s: string): number[]

    /**
     * Mencari semua kemunculan pola dalam string menggunakan binary search pada suffix array.
     *
     * @param s - String sumber.
     * @param pattern - Pola substring yang dicari.
     * @returns Daftar indeks awal kemunculan pola dalam urutan menaik.
     */
    search(s: string, pattern: string): number[]
}
