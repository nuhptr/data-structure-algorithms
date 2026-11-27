import { ILCSSolver } from "./interfaces"

/**
 * Longest Common Subsequence (LCS) — mencari subsequence terpanjang
 * yang menjadi bagian dari kedua string.
 *
 * Kompleksitas Waktu : O(m × n)
 * Kompleksitas Ruang : O(m × n)
 *
 * @example
 * const solver = new LCSSolver();
 * solver.solve("ABCBDAB", "BDCAB"); // => "BCAB"
 */
export class LCSSolver implements ILCSSolver {
    /**
     * Mencari dan merekonstruksi Longest Common Subsequence dari dua string input.
     *
     * @param text1 - String pertama.
     * @param text2 - String kedua.
     * @returns String hasil Longest Common Subsequence.
     */
    solve(text1: string, text2: string): string {
        const text1Length = text1.length
        const text2Length = text2.length

        // lengthTable[r][c] = panjang LCS antara prefix text1[0..r-1] dan text2[0..c-1]
        const lengthTable: number[][] = Array.from({ length: text1Length + 1 }, () =>
            Array(text2Length + 1).fill(0),
        )

        // Bangun tabel panjang LCS secara bottom-up
        for (let row = 1; row <= text1Length; row++) {
            for (let col = 1; col <= text2Length; col++) {
                const charsMatch = text1[row - 1] === text2[col - 1]

                if (charsMatch) {
                    // Karakter cocok: perpanjang LCS dari submasalah diagonal sebelumnya
                    lengthTable[row][col] = lengthTable[row - 1][col - 1] + 1
                } else {
                    // Karakter berbeda: ambil panjang maksimum dari menghilangkan salah satu karakter
                    lengthTable[row][col] = Math.max(
                        lengthTable[row - 1][col],
                        lengthTable[row][col - 1],
                    )
                }
            }
        }

        // Rekonstruksi LCS dengan backtracking dari sudut kanan bawah tabel
        let row = text1Length
        let col = text2Length
        const resultChars: string[] = []

        while (row > 0 && col > 0) {
            const charsMatch = text1[row - 1] === text2[col - 1]

            if (charsMatch) {
                resultChars.unshift(text1[row - 1])
                row--
                col--
            } else if (lengthTable[row - 1][col] > lengthTable[row][col - 1]) {
                // Bergerak ke atas karena nilai maksimum berasal dari baris sebelumnya
                row--
            } else {
                // Bergerak ke kiri karena nilai maksimum berasal dari kolom sebelumnya
                col--
            }
        }

        return resultChars.join("")
    }
}
