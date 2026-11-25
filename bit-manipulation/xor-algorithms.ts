import { IXORAlgorithms } from "./interfaces";

/**
 * XOR Algorithms — kumpulan algoritma berbasis XOR yang sering digunakan
 * dalam interview unicorn companies (Google, Meta, Amazon, Stripe).
 *
 * Properti XOR yang dimanfaatkan:
 *  - a ^ a = 0        (elemen sama menghasilkan 0)
 *  - a ^ 0 = a        (XOR dengan 0 menghasilkan dirinya sendiri)
 *  - XOR bersifat komutatif dan asosiatif
 *
 * Semua operasi berjalan dalam O(n) waktu dan O(1) ruang.
 *
 * @example
 * const xor = new XORAlgorithms();
 * xor.singleNumber([2, 2, 1]);             // => 1
 * xor.findMissingNumber([3, 0, 1]);        // => 2
 * xor.reverseBits(0b00000010100101000001111010011100); // => 964176192
 * xor.hammingDistance(1, 4);              // => 2
 */
export class XORAlgorithms implements IXORAlgorithms {
  /**
   * Temukan satu-satunya angka yang tidak berpasangan.
   * Semua angka lain muncul tepat 2 kali.
   */
  singleNumber(nums: number[]): number {
    return nums.reduce((acc, num) => acc ^ num, 0);
  }

  /**
   * Temukan DUA angka yang tidak berpasangan (semua lain muncul 2 kali).
   * Gunakan properti XOR untuk memisahkan dua grup.
   */
  singleNumberIII(nums: number[]): [number, number] {
    // XOR semua elemen → xorAll = a ^ b (dua angka unik)
    const xorAll = nums.reduce((acc, num) => acc ^ num, 0);

    // Isolasi bit paling kanan yang berbeda antara a dan b
    const differBit = xorAll & -xorAll;

    let firstNumber = 0;
    for (const num of nums) {
      if ((num & differBit) !== 0) {
        firstNumber ^= num;
      }
    }

    return [firstNumber, xorAll ^ firstNumber];
  }

  /**
   * Temukan angka yang hilang dalam array [0..n].
   */
  findMissingNumber(nums: number[]): number {
    const n = nums.length;
    // XOR 0..n dengan semua elemen — duplikat akan saling meniadakan
    let missing = n;
    for (let i = 0; i < n; i++) {
      missing ^= i ^ nums[i];
    }
    return missing;
  }

  /**
   * Balik semua bit dari bilangan bulat 32-bit unsigned.
   */
  reverseBits(n: number): number {
    let result = 0;
    for (let bit = 0; bit < 32; bit++) {
      result = (result * 2 + (n & 1)) >>> 0; // >>> 0 untuk unsigned 32-bit
      n >>>= 1;
    }
    return result >>> 0;
  }

  /**
   * Hitung jarak Hamming: jumlah posisi bit yang berbeda antara x dan y.
   */
  hammingDistance(x: number, y: number): number {
    let xorResult = x ^ y;
    let count = 0;
    while (xorResult !== 0) {
      xorResult &= xorResult - 1; // Brian Kernighan: hapus bit 1 paling kanan
      count++;
    }
    return count;
  }
}
