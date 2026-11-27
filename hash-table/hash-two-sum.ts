import { ITwoSumSolver, TwoSumInput } from "./interfaces"

/**
 * Two Sum — mencari satu pasangan indeks berbeda yang nilai angkanya
 * jika dijumlahkan sama dengan target.
 *
 * Peta `numMap` menyimpan angka yang sudah diperiksa sebagai kunci dan
 * indeksnya sebagai nilai. Saat memeriksa angka, fungsi menghitung
 * angka pelengkap `target - nums[i]`; jika pelengkap sudah ada di peta,
 * kedua indeks dikembalikan.
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const solver = new TwoSumSolver()
 * solver.findPair({ nums: [2, 7, 11, 13], target: 9 }) // => [0, 1]
 */
export class TwoSumSolver implements ITwoSumSolver {
    /**
     * Mencari satu pasang indeks berbeda yang penjumlahan elemennya sama dengan target.
     *
     * @param input Objek berisi array angka (`nums`) dan nilai target (`target`).
     * @returns Pasangan indeks `[i, j]` jika ditemukan, atau array kosong `[]` jika tidak ada.
     */
    findPair({ nums, target }: TwoSumInput): number[] {
        // Peta nilai angka ke indeks pertamanya agar pencarian komplemen berjalan dalam O(1).
        const numMap: Record<number, number> = {}

        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i]

            // Jika angka pelengkap sudah pernah dilihat di indeks berbeda, langsung kembalikan.
            if (complement in numMap && numMap[complement] !== i) {
                return [numMap[complement], i]
            }

            // Catat angka saat ini beserta indeksnya untuk iterasi berikutnya.
            numMap[nums[i]] = i
        }

        return []
    }
}
