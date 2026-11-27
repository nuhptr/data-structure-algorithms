import { IMaxSubarraySolver } from "./interfaces"

/**
 * Kadane's Algorithm — mencari jumlah subarray kontinu terbesar
 * dalam array angka. Efisien dengan satu kali traversal.
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(1)
 *
 * @example
 * const solver = new KadaneSolver();
 * solver.solve([-2, 1, -3, 4, -1, 2, 1, -5, 4]); // => 6  (subarray [4,-1,2,1])
 * solver.solve([-2, -3, -1, -4]);                 // => -1 (elemen terbesar)
 * solver.solve([-2, -3, -1, -4], true);           // => 0  (izinkan subarray kosong)
 */
export class KadaneSolver implements IMaxSubarraySolver {
    /**
     * Mencari jumlah maksimum dari subarray kontinu menggunakan Algoritma Kadane.
     *
     * @param array - Array bilangan input.
     * @param allowEmpty - Jika `true`, mengizinkan subarray kosong dengan nilai `0` (default: `false`).
     * @returns Jumlah subarray kontinu terbesar.
     */
    solve(array: number[], allowEmpty: boolean = false): number {
        if (array.length === 0) return 0

        // Jika subarray kosong tidak diizinkan, inisialisasi ke -Infinity agar array bernilai negatif tetap valid
        let maxSum = allowEmpty ? 0 : -Infinity
        let currentSum = 0

        for (const value of array) {
            // Putuskan apakah melanjutkan subarray berjalan atau memulai ulang dari elemen saat ini
            currentSum = Math.max(allowEmpty ? 0 : value, currentSum + value)
            maxSum = Math.max(maxSum, currentSum)
        }

        return maxSum
    }
}
