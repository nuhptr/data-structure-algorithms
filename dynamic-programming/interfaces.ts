/**
 * Hasil dari algoritma Coin Change.
 */
export interface CoinChangeResult {
    /** Jumlah minimum koin yang dibutuhkan untuk mencapai target. */
    minCoins: number
    /** Daftar nilai koin yang dipilih untuk membentuk target. */
    coins: number[]
}

/**
 * Kontrak untuk solver Word Break.
 */
export interface IWordBreakSolver {
    /**
     * Memeriksa apakah string `s` dapat dipecah menjadi urutan kata yang ada di `wordDict`.
     *
     * @param s - String input yang akan diperiksa.
     * @param wordDict - Daftar kata yang tersedia di kamus.
     * @returns `true` jika `s` dapat dipecah sepenuhnya menggunakan kata-kata di kamus.
     */
    canBreak(s: string, wordDict: string[]): boolean

    /**
     * Menemukan semua kemungkinan pemecahan string `s` menjadi kalimat dari kata-kata di `wordDict`.
     *
     * @param s - String input yang akan dipecah.
     * @param wordDict - Daftar kata yang tersedia di kamus.
     * @returns Array berisi semua kalimat hasil pemecahan (kata dipisahkan spasi).
     */
    findAllBreaks(s: string, wordDict: string[]): string[]
}

/**
 * Kontrak untuk solver Palindrome Partitioning.
 */
export interface IPalindromePartitioningSolver {
    /**
     * Menghasilkan semua partisi string `s` di mana setiap substring merupakan palindrom.
     *
     * @param s - String input yang akan dipartisi.
     * @returns Daftar semua partisi palindrom yang mungkin.
     */
    partition(s: string): string[][]

    /**
     * Menghitung jumlah potongan minimum agar setiap bagian string `s` menjadi palindrom.
     *
     * @param s - String input yang akan dipotong.
     * @returns Jumlah potongan minimum.
     */
    minCuts(s: string): number
}

/**
 * Kontrak untuk solver Burst Balloons.
 */
export interface IBurstBalloonsSolver {
    /**
     * Menghitung jumlah koin maksimum yang diperoleh dari memecahkan semua balon secara optimal.
     *
     * @param nums - Array nilai angka pada setiap balon.
     * @returns Jumlah koin maksimum yang dapat dikumpulkan.
     */
    maxCoins(nums: number[]): number
}

/**
 * Kontrak untuk solver Regular Expression Matching (mendukung `.` dan `*`).
 */
export interface IRegexMatcher {
    /**
     * Memeriksa apakah seluruh string `s` cocok dengan pola `pattern`.
     *
     * @param s - String input yang diuji.
     * @param pattern - Pola ekspresi reguler yang mendukung `.` dan `*`.
     * @returns `true` jika `s` cocok sepenuhnya dengan `pattern`.
     */
    isMatch(s: string, pattern: string): boolean
}

/**
 * Kontrak untuk solver Unique Paths pada grid 2D.
 */
export interface IUniquePathsSolver {
    /**
     * Menghitung jumlah jalur unik dari sudut kiri atas ke kanan bawah pada grid `m × n`.
     *
     * @param m - Jumlah baris grid.
     * @param n - Jumlah kolom grid.
     * @returns Total jalur unik yang mungkin (hanya bergerak ke kanan atau bawah).
     */
    countPaths(m: number, n: number): number

    /**
     * Menghitung jumlah jalur unik pada grid yang memiliki rintangan (`1` = rintangan, `0` = bebas).
     *
     * @param grid - Matriks 2D berisi `0` (dapat dilewati) dan `1` (rintangan).
     * @returns Total jalur unik yang tidak melewati rintangan.
     */
    countPathsWithObstacles(grid: number[][]): number
}

/**
 * Kontrak untuk solver Coin Change.
 */
export interface ICoinChangeSolver {
    /**
     * Mencari jumlah minimum koin beserta daftar koinnya untuk mencapai `targetAmount`.
     *
     * @param targetAmount - Nilai total target yang ingin dibentuk.
     * @param availableCoins - Daftar denominasi koin yang tersedia.
     * @returns Objek `CoinChangeResult` berisi jumlah minimum dan daftar koin yang dipilih.
     */
    solve(targetAmount: number, availableCoins: number[]): CoinChangeResult
}

/**
 * Kontrak untuk solver Longest Common Subsequence (LCS).
 */
export interface ILCSSolver {
    /**
     * Menemukan subsequence terpanjang yang muncul pada kedua string input.
     *
     * @param text1 - String pertama.
     * @param text2 - String kedua.
     * @returns String hasil Longest Common Subsequence.
     */
    solve(text1: string, text2: string): string
}

/**
 * Kontrak untuk solver 0/1 Knapsack.
 */
export interface IKnapsackSolver {
    /**
     * Menghitung nilai maksimum yang dapat dimuat dalam tas berkapasitas `capacity`.
     *
     * @param capacity - Kapasitas berat maksimum tas.
     * @param weights - Array berat masing-masing barang.
     * @param values - Array nilai masing-masing barang.
     * @returns Total nilai maksimum yang dapat dicapai.
     */
    solve(capacity: number, weights: number[], values: number[]): number
}

/**
 * Kontrak untuk solver barisan Fibonacci.
 */
export interface IFibonacciSolver {
    /**
     * Menghasilkan `count` elemen pertama dari barisan Fibonacci.
     *
     * @param count - Jumlah elemen Fibonacci yang diinginkan.
     * @returns Array berisi barisan Fibonacci sepanjang `count`.
     */
    solve(count: number): number[]
}

/**
 * Kontrak untuk solver Edit Distance (Levenshtein Distance).
 */
export interface IEditDistanceSolver {
    /**
     * Menghitung Edit Distance antara `word1` dan `word2` menggunakan DP bottom-up (tabulasi).
     *
     * @param word1 - String sumber.
     * @param word2 - String tujuan.
     * @returns Jumlah minimum operasi (insert, delete, replace).
     */
    solveBottomUp(word1: string, word2: string): number

    /**
     * Menghitung Edit Distance antara `word1` dan `word2` menggunakan DP top-down (memoization).
     *
     * @param word1 - String sumber.
     * @param word2 - String tujuan.
     * @returns Jumlah minimum operasi (insert, delete, replace).
     */
    solveTopDown(word1: string, word2: string): number
}

/**
 * Kontrak untuk solver Longest Increasing Subsequence (LIS).
 */
export interface ILISSolver {
    /**
     * Menemukan subsequence menaik ketat terpanjang dari array bilangan.
     *
     * @param array - Array bilangan input.
     * @returns Array berisi elemen-elemen Longest Increasing Subsequence.
     */
    solve(array: number[]): number[]
}

/**
 * Kontrak untuk solver Maximum Subarray Sum (Kadane's Algorithm).
 */
export interface IMaxSubarraySolver {
    /**
     * Menghitung jumlah maksimum dari subarray kontinu di dalam `array`.
     *
     * @param array - Array bilangan input.
     * @param allowEmpty - Jika `true`, subarray kosong bernilai `0` diperbolehkan.
     * @returns Jumlah subarray kontinu terbesar.
     */
    solve(array: number[], allowEmpty?: boolean): number
}

/**
 * Kontrak untuk solver Matrix Chain Multiplication.
 */
export interface IMatrixChainSolver {
    /**
     * Menghitung jumlah minimum operasi perkalian skalar untuk mengalikan rantai matriks.
     *
     * @param dimensions - Array dimensi rantai matriks (`p[i-1] × p[i]` untuk matriks ke-i).
     * @returns Jumlah minimum operasi perkalian skalar.
     */
    solve(dimensions: number[]): number
}
