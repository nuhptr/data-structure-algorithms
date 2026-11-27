/**
 * Kontrak untuk kumpulan operasi bitwise fundamental.
 */
export interface IBitOperations {
    /**
     * Menghitung jumlah bit bernilai `1` (set bits) pada bilangan bulat non-negatif.
     *
     * @param n - Bilangan bulat non-negatif yang akan dihitung bit aktifnya.
     * @returns Jumlah bit `1` pada representasi biner `n`.
     */
    countSetBits(n: number): number

    /**
     * Memeriksa apakah `n` merupakan bilangan pangkat dua (`2^k`).
     *
     * @param n - Bilangan yang akan diperiksa.
     * @returns `true` jika `n` adalah pangkat dua, selain itu `false`.
     */
    isPowerOfTwo(n: number): boolean

    /**
     * Memeriksa apakah `n` merupakan bilangan pangkat empat (`4^k`).
     *
     * @param n - Bilangan yang akan diperiksa.
     * @returns `true` jika `n` adalah pangkat empat, selain itu `false`.
     */
    isPowerOfFour(n: number): boolean

    /**
     * Mengambil nilai bit pada posisi tertentu (berbasis nol dari kanan).
     *
     * @param n - Bilangan sumber.
     * @param position - Posisi bit berbasis nol dari LSB (kanan).
     * @returns Nilai bit `0` atau `1`.
     */
    getBit(n: number, position: number): number

    /**
     * Mengubah bit pada posisi tertentu menjadi `1`.
     *
     * @param n - Bilangan sumber.
     * @param position - Posisi bit berbasis nol dari kanan.
     * @returns Bilangan baru dengan bit pada `position` bernilai `1`.
     */
    setBit(n: number, position: number): number

    /**
     * Mengubah bit pada posisi tertentu menjadi `0`.
     *
     * @param n - Bilangan sumber.
     * @param position - Posisi bit berbasis nol dari kanan.
     * @returns Bilangan baru dengan bit pada `position` bernilai `0`.
     */
    clearBit(n: number, position: number): number

    /**
     * Membalik nilai bit pada posisi tertentu (`0` menjadi `1`, `1` menjadi `0`).
     *
     * @param n - Bilangan sumber.
     * @param position - Posisi bit berbasis nol dari kanan.
     * @returns Bilangan baru dengan bit pada `position` terbalik.
     */
    toggleBit(n: number, position: number): number
}

/**
 * Kontrak untuk algoritma berbasis operator XOR.
 */
export interface IXORAlgorithms {
    /**
     * Menemukan satu angka unik ketika semua angka lain muncul tepat dua kali.
     *
     * @param nums - Array angka dengan satu elemen unik.
     * @returns Satu-satunya angka yang muncul sekali.
     */
    singleNumber(nums: number[]): number

    /**
     * Menemukan dua angka unik ketika semua angka lain muncul tepat dua kali.
     *
     * @param nums - Array angka dengan dua elemen unik.
     * @returns Tuple berisi dua angka yang muncul sekali.
     */
    singleNumberIII(nums: number[]): [number, number]

    /**
     * Menemukan satu angka yang hilang pada rentang `[0..n]`.
     *
     * @param nums - Array sepanjang `n` berisi angka unik dari `0` hingga `n` kecuali satu.
     * @returns Angka yang hilang dari rentang tersebut.
     */
    findMissingNumber(nums: number[]): number

    /**
     * Membalik seluruh 32 bit dari bilangan bulat unsigned 32-bit.
     *
     * @param n - Bilangan unsigned 32-bit yang bit-nya akan dibalik.
     * @returns Hasil bilangan unsigned 32-bit dengan urutan bit terbalik.
     */
    reverseBits(n: number): number

    /**
     * Menghitung jarak Hamming (jumlah posisi bit yang berbeda) antara `x` dan `y`.
     *
     * @param x - Bilangan pertama.
     * @param y - Bilangan kedua.
     * @returns Jumlah posisi bit yang berbeda antara `x` dan `y`.
     */
    hammingDistance(x: number, y: number): number
}

/**
 * Kontrak untuk algoritma Bitmask Dynamic Programming.
 */
export interface IBitmaskDP {
    /**
     * Traveling Salesman Problem: mencari biaya jalur minimum mengunjungi semua kota
     * tepat sekali lalu kembali ke kota asal.
     *
     * @param distMatrix - Matriks jarak antar kota berukuran `n x n`.
     * @returns Biaya jalur minimum untuk tur lengkap.
     */
    tsp(distMatrix: number[][]): number

    /**
     * Minimum XOR Sum: memasangkan setiap elemen `nums1` ke elemen unik `nums2`
     * untuk meminimalkan jumlah total XOR.
     *
     * @param nums1 - Array angka pertama.
     * @param nums2 - Array angka kedua dengan panjang sama dengan `nums1`.
     * @returns Total nilai XOR minimum dari semua kemungkinan pemasangan.
     */
    minimumXORSum(nums1: number[], nums2: number[]): number
}
