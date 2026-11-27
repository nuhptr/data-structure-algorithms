import { IBitOperations } from "./interfaces"

/**
 * Bit Operations — kumpulan operasi bitwise fundamental yang sering
 * muncul dalam algoritma dan interview coding.
 *
 * Kompleksitas Waktu : O(1) untuk semua operasi, kecuali `countSetBits` O(k) dengan k = jumlah bit 1 (maks O(log n))
 * Kompleksitas Ruang : O(1)
 *
 * @example
 * const bits = new BitOperations()
 * bits.countSetBits(25)  // => 3  (25 = 11001)
 * bits.isPowerOfTwo(16)  // => true
 * bits.getBit(10, 1)     // => 1  (10 = 1010, bit ke-1 = 1)
 */
export class BitOperations implements IBitOperations {
    /**
     * Menghitung jumlah bit `1` menggunakan Brian Kernighan's Algorithm.
     * Setiap iterasi `value &= value - 1` menghapus bit `1` paling kanan.
     *
     * @param n - Bilangan bulat non-negatif yang akan dihitung jumlah bit `1`-nya.
     * @returns Jumlah bit bernilai `1` pada `n`.
     */
    countSetBits(n: number): number {
        // Validasi agar input selalu bilangan bulat non-negatif sebelum loop bitwise
        if (!Number.isInteger(n) || n < 0) {
            throw new Error("Input harus berupa bilangan bulat non-negatif")
        }

        let count = 0
        let value = n

        while (value !== 0) {
            value &= value - 1 // hapus bit 1 paling kanan
            count++
        }

        return count
    }

    /**
     * Memeriksa apakah `n` adalah pangkat dari 2.
     * Bilangan pangkat 2 hanya memiliki tepat satu bit `1`, sehingga `n & (n - 1) === 0`.
     *
     * @param n - Bilangan yang akan diperiksa.
     * @returns `true` jika `n` adalah pangkat 2 positif, selain itu `false`.
     */
    isPowerOfTwo(n: number): boolean {
        return n > 0 && (n & (n - 1)) === 0
    }

    /**
     * Memeriksa apakah `n` adalah pangkat dari 4.
     * Harus berupa pangkat 2 sekaligus memiliki bit `1` pada posisi genap (`0, 2, 4, ...`).
     *
     * @param n - Bilangan yang akan diperiksa.
     * @returns `true` jika `n` adalah pangkat 4 positif, selain itu `false`.
     */
    isPowerOfFour(n: number): boolean {
        // 0x55555555 = 01010101...01 — bit 1 hanya di posisi genap
        return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0
    }

    /**
     * Mengambil nilai bit pada posisi tertentu (0-indexed dari kanan).
     *
     * @param n - Bilangan sumber.
     * @param position - Posisi bit berbasis nol dari kanan.
     * @returns Nilai bit `1` atau `0`.
     */
    getBit(n: number, position: number): number {
        // Geser bit target ke posisi LSB lalu mask dengan 1
        return (n >> position) & 1
    }

    /**
     * Mengatur bit pada posisi tertentu menjadi `1`.
     *
     * @param n - Bilangan sumber.
     * @param position - Posisi bit berbasis nol dari kanan.
     * @returns Bilangan hasil setelah bit pada `position` diset ke `1`.
     */
    setBit(n: number, position: number): number {
        // OR dengan mask yang hanya memiliki bit 1 pada `position`
        return n | (1 << position)
    }

    /**
     * Menghapus (mengatur ke `0`) bit pada posisi tertentu.
     *
     * @param n - Bilangan sumber.
     * @param position - Posisi bit berbasis nol dari kanan.
     * @returns Bilangan hasil setelah bit pada `position` diset ke `0`.
     */
    clearBit(n: number, position: number): number {
        // AND dengan komplemen mask agar hanya bit pada `position` yang dinolkan
        return n & ~(1 << position)
    }

    /**
     * Membalik nilai bit pada posisi tertentu (`0 -> 1`, `1 -> 0`).
     *
     * @param n - Bilangan sumber.
     * @param position - Posisi bit berbasis nol dari kanan.
     * @returns Bilangan hasil setelah bit pada `position` dibalik.
     */
    toggleBit(n: number, position: number): number {
        // XOR dengan mask untuk membalik hanya bit pada `position`
        return n ^ (1 << position)
    }
}
