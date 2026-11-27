import { IXORAlgorithms } from "./interfaces"

/**
 * XOR Algorithms — kumpulan algoritma berbasis XOR yang sering digunakan
 * dalam interview unicorn companies (Google, Meta, Amazon, Stripe).
 *
 * Properti XOR yang dimanfaatkan:
 *  - `a ^ a = 0` (elemen sama saling meniadakan)
 *  - `a ^ 0 = a` (XOR dengan 0 menghasilkan dirinya sendiri)
 *  - XOR bersifat komutatif dan asosiatif
 *
 * Kompleksitas Waktu : O(n) untuk operasi array; O(1) untuk operasi 32-bit tetap
 * Kompleksitas Ruang : O(1)
 *
 * @example
 * const xor = new XORAlgorithms()
 * xor.singleNumber([2, 2, 1])                          // => 1
 * xor.findMissingNumber([3, 0, 1])                     // => 2
 * xor.reverseBits(0b00000010100101000001111010011100)  // => 964176192
 * xor.hammingDistance(1, 4)                            // => 2
 */
export class XORAlgorithms implements IXORAlgorithms {
    /**
     * Menemukan satu-satunya angka yang tidak berpasangan ketika semua angka lain muncul tepat 2 kali.
     *
     * @param nums - Array angka dengan satu elemen unik.
     * @returns Angka tunggal yang tidak memiliki pasangan.
     */
    singleNumber(nums: number[]): number {
        // Semua pasangan duplikat saling meniadakan menjadi 0, menyisakan elemen unik
        return nums.reduce((acc, num) => acc ^ num, 0)
    }

    /**
     * Menemukan dua angka yang tidak berpasangan (semua angka lain muncul tepat 2 kali)
     * dengan memisahkan elemen ke dalam dua grup berdasarkan satu bit pembeda.
     *
     * @param nums - Array angka dengan tepat dua elemen unik.
     * @returns Tuple `[a, b]` berisi dua angka yang muncul sekali.
     */
    singleNumberIII(nums: number[]): [number, number] {
        // XOR semua elemen → xorAll = a ^ b (dua angka unik)
        const xorAll = nums.reduce((acc, num) => acc ^ num, 0)

        // Isolasi bit paling kanan yang berbeda antara a dan b
        const differBit = xorAll & -xorAll

        // XOR hanya elemen yang memiliki bit pembeda aktif untuk mengisolasi angka pertama
        let firstNumber = 0
        for (const num of nums) {
            if ((num & differBit) !== 0) {
                firstNumber ^= num
            }
        }

        // Angka kedua diperoleh dari xorAll ^ firstNumber
        return [firstNumber, xorAll ^ firstNumber]
    }

    /**
     * Menemukan satu angka yang hilang dalam array yang berisi angka pada rentang `[0..n]`.
     *
     * @param nums - Array sepanjang `n` berisi bilangan unik dalam rentang `0..n`.
     * @returns Angka yang hilang dari rentang `[0..n]`.
     */
    findMissingNumber(nums: number[]): number {
        const n = nums.length
        // XOR 0..n dengan semua elemen — duplikat akan saling meniadakan
        let missing = n
        for (let i = 0; i < n; i++) {
            missing ^= i ^ nums[i]
        }
        return missing
    }

    /**
     * Membalik seluruh 32 bit dari bilangan bulat unsigned 32-bit.
     *
     * @param n - Bilangan unsigned 32-bit yang akan dibalik urutan bit-nya.
     * @returns Bilangan unsigned 32-bit dengan seluruh bit terbalik.
     */
    reverseBits(n: number): number {
        let result = 0
        // Geser hasil ke kiri (kali 2) lalu masukkan LSB dari n sebanyak 32 iterasi
        for (let bit = 0; bit < 32; bit++) {
            result = (result * 2 + (n & 1)) >>> 0 // >>> 0 untuk unsigned 32-bit
            n >>>= 1
        }
        return result >>> 0
    }

    /**
     * Menghitung jarak Hamming: jumlah posisi bit yang berbeda antara `x` dan `y`.
     *
     * @param x - Bilangan pertama.
     * @param y - Bilangan kedua.
     * @returns Jumlah bit yang berbeda antara `x` dan `y`.
     */
    hammingDistance(x: number, y: number): number {
        // XOR menandai posisi bit yang berbeda dengan nilai 1
        let xorResult = x ^ y
        let count = 0
        while (xorResult !== 0) {
            xorResult &= xorResult - 1 // Brian Kernighan: hapus bit 1 paling kanan
            count++
        }
        return count
    }
}
