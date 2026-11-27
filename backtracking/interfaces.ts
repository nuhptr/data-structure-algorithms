/**
 * Kontrak untuk generator kombinasi angka.
 */
export interface ICombinationGenerator {
    /**
     * Menghasilkan semua kombinasi unik berukuran `k` dari bilangan 1 sampai `n`.
     *
     * @param n - Batas atas bilangan (inklusif, mulai dari 1).
     * @param k - Jumlah elemen pada setiap kombinasi.
     * @returns Daftar semua kombinasi unik berukuran `k`.
     */
    generate(n: number, k: number): number[][]
}

/**
 * Kontrak untuk generator tanda kurung (parentheses) yang valid.
 */
export interface IParenthesesGenerator {
    /**
     * Menghasilkan semua kombinasi tanda kurung yang valid untuk jumlah pasang tertentu.
     *
     * @param pairCount - Jumlah pasang tanda kurung yang diinginkan.
     * @returns Array string berisi semua kombinasi tanda kurung yang valid.
     */
    generate(pairCount: number): string[]
}

/**
 * Kontrak untuk solver masalah N-Queens.
 */
export interface INQueensSolver {
    /**
     * Mencari semua konfigurasi penempatan ratu pada papan berukuran `boardSize × boardSize`
     * sehingga tidak ada dua ratu yang saling menyerang.
     *
     * @param boardSize - Ukuran papan catur sekaligus jumlah ratu (N).
     * @returns Daftar solusi; setiap solusi berupa array indeks kolom untuk tiap baris.
     */
    solve(boardSize: number): number[][]
}

/**
 * Kontrak untuk generator permutasi.
 */
export interface IPermutationGenerator {
    /**
     * Menghasilkan semua permutasi yang mungkin dari array bilangan.
     *
     * @param nums - Array bilangan yang akan dipermutasikan.
     * @returns Daftar semua permutasi dalam bentuk array 2D.
     */
    generate(nums: number[]): number[][]
}

/**
 * Kontrak untuk solver Sudoku 9×9.
 */
export interface ISudokuSolver {
    /**
     * Menyelesaikan papan Sudoku secara in-place (angka `0` menandakan sel kosong).
     *
     * @param board - Matriks 9×9 papan Sudoku yang akan diisi langsung.
     * @returns `true` jika solusi ditemukan, atau `false` jika papan tidak dapat diselesaikan.
     */
    solve(board: number[][]): boolean
}

/**
 * Kontrak untuk solver Subset Sum.
 */
export interface ISubsetSumSolver {
    /**
     * Menemukan semua subset unik dari array bilangan yang jumlah elemennya sama dengan target.
     *
     * @param nums - Array bilangan kandidat.
     * @param target - Nilai jumlah target yang ingin dicapai.
     * @returns Daftar semua subset unik yang jumlahnya sama dengan `target`.
     */
    findAll(nums: number[], target: number): number[][]
}

/**
 * Kontrak untuk pencarian kata (Word Search) pada grid karakter 2D.
 */
export interface IWordSearch {
    /**
     * Memeriksa apakah sebuah kata dapat dibentuk dari sel-sel yang saling bertetangga pada grid.
     *
     * @param board - Grid karakter 2D tempat pencarian dilakukan.
     * @param word - Kata yang dicari di dalam grid.
     * @returns `true` jika kata ditemukan di dalam grid, `false` jika tidak.
     */
    exists(board: string[][], word: string): boolean
}
