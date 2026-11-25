import { IBitOperations } from "./interfaces";

/**
 * Bit Operations — kumpulan operasi bitwise fundamental yang sering
 * muncul dalam algoritma dan interview coding.
 *
 * Semua operasi berjalan dalam O(1) kecuali countSetBits O(log n).
 *
 * @example
 * const bits = new BitOperations();
 * bits.countSetBits(25);     // => 3  (25 = 11001)
 * bits.isPowerOfTwo(16);     // => true
 * bits.getBit(10, 1);        // => 1  (10 = 1010, bit ke-1 = 1)
 */
export class BitOperations implements IBitOperations {
  /**
   * Hitung jumlah bit 1 menggunakan Brian Kernighan's Algorithm.
   * Setiap iterasi n &= (n-1) menghapus bit 1 paling kanan.
   */
  countSetBits(n: number): number {
    if (!Number.isInteger(n) || n < 0) {
      throw new Error("Input harus berupa bilangan bulat non-negatif");
    }

    let count = 0;
    let value = n;

    while (value !== 0) {
      value &= value - 1; // hapus bit 1 paling kanan
      count++;
    }

    return count;
  }

  /**
   * Cek apakah n adalah pangkat dari 2.
   * Bilangan pangkat 2 hanya memiliki tepat satu bit 1: n & (n-1) === 0.
   */
  isPowerOfTwo(n: number): boolean {
    return n > 0 && (n & (n - 1)) === 0;
  }

  /**
   * Cek apakah n adalah pangkat dari 4.
   * Harus pangkat 2 DAN bit 1-nya berada di posisi genap (0, 2, 4...).
   */
  isPowerOfFour(n: number): boolean {
    // 0x55555555 = 01010101...01 — bit 1 hanya di posisi genap
    return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;
  }

  /**
   * Ambil nilai bit pada posisi tertentu (0-indexed dari kanan).
   * @returns 1 atau 0
   */
  getBit(n: number, position: number): number {
    return (n >> position) & 1;
  }

  /**
   * Set bit pada posisi tertentu menjadi 1.
   */
  setBit(n: number, position: number): number {
    return n | (1 << position);
  }

  /**
   * Clear (set ke 0) bit pada posisi tertentu.
   */
  clearBit(n: number, position: number): number {
    return n & ~(1 << position);
  }

  /**
   * Toggle bit pada posisi tertentu (0 → 1, 1 → 0).
   */
  toggleBit(n: number, position: number): number {
    return n ^ (1 << position);
  }
}
