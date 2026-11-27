import { IParenthesesGenerator } from "./interfaces"

/**
 * Generate Parentheses — menghasilkan semua kombinasi tanda kurung
 * yang valid untuk n pasang menggunakan backtracking.
 *
 * Kompleksitas Waktu : O(4^n / √n) — Catalan number
 * Kompleksitas Ruang : O(n) — kedalaman rekursi
 *
 * @example
 * const generator = new ParenthesesGenerator()
 * generator.generate(3)
 * => ["((()))", "(()())", "(())()", "()(())", "()()()"]
 */
export class ParenthesesGenerator implements IParenthesesGenerator {
    /**
     * Menghasilkan semua string tanda kurung seimbang untuk `pairCount` pasang.
     *
     * @param pairCount - Jumlah pasang tanda kurung buka dan tutup.
     * @returns Daftar semua kombinasi tanda kurung yang valid.
     */
    generate(pairCount: number): string[] {
        const results: string[] = []

        const buildParentheses = (current: string, openCount: number, closeCount: number): void => {
            // Basis rekursi: jumlah kurung buka dan tutup telah mencapai target
            const isComplete = openCount === pairCount && closeCount === pairCount

            if (isComplete) {
                results.push(current)
                return
            }

            // Kurung buka boleh ditambah selama belum mencapai batas; kurung tutup hanya jika ada kurung buka pasangannya
            const canAddOpen = openCount < pairCount
            const canAddClose = closeCount < openCount

            if (canAddOpen) {
                buildParentheses(current + "(", openCount + 1, closeCount)
            }

            if (canAddClose) {
                buildParentheses(current + ")", openCount, closeCount + 1)
            }
        }

        buildParentheses("", 0, 0)
        return results
    }
}
