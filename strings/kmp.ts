import { IStringMatcher } from "./interfaces"

/**
 * Knuth-Morris-Pratt (KMP) — pencarian pattern string yang efisien
 * menggunakan Partial Match Table (failure function) untuk menghindari
 * perbandingan berulang setelah mismatch.
 *
 * Kompleksitas Waktu : O(n + m) — n = panjang teks, m = panjang pattern
 * Kompleksitas Ruang : O(m)
 *
 * @example
 * const kmp = new KMP();
 * kmp.findAll("abababa", "aba"); // => [0, 2, 4]
 * kmp.findAll("aabaa", "aa");   // => [0, 3]
 */
export class KMP implements IStringMatcher {
    /**
     * Menemukan semua indeks kemunculan pola di dalam teks menggunakan algoritma KMP
     * tanpa pernah memundurkan pointer teks.
     *
     * @param text - Teks utama yang akan dicari.
     * @param pattern - Pola yang dicari.
     * @returns Daftar indeks awal setiap kemunculan pola.
     */
    findAll(text: string, pattern: string): number[] {
        const matchPositions: number[] = []

        if (!text || !pattern || pattern.length > text.length) return matchPositions

        // Bangun tabel LPS (Longest Prefix Suffix) sebelum pemindaian teks
        const partialMatchTable = this.buildPartialMatchTable(pattern)
        const textLength = text.length
        const patternLength = pattern.length

        let textPointer = 0
        let patternPointer = 0

        while (textPointer < textLength) {
            if (pattern[patternPointer] === text[textPointer]) {
                textPointer++
                patternPointer++
            }

            if (patternPointer === patternLength) {
                // Pola ditemukan penuh; geser pointer pola berdasarkan tabel LPS
                matchPositions.push(textPointer - patternPointer)
                patternPointer = partialMatchTable[patternPointer - 1]
            } else if (textPointer < textLength && pattern[patternPointer] !== text[textPointer]) {
                // Mismatch: manfaatkan prefix yang sudah cocok agar pointer teks tidak mundur
                if (patternPointer !== 0) {
                    patternPointer = partialMatchTable[patternPointer - 1]
                } else {
                    textPointer++
                }
            }
        }

        return matchPositions
    }

    /**
     * Membangun Partial Match Table (failure function / LPS array) di mana
     * `table[i]` adalah panjang proper prefix terpanjang dari `pattern[0..i]`
     * yang juga merupakan suffix.
     *
     * @param pattern - Pola yang akan dianalisis.
     * @returns Array LPS sepanjang pola.
     */
    private buildPartialMatchTable(pattern: string): number[] {
        const table = Array(pattern.length).fill(0)
        let prefixLength = 0
        let index = 1

        while (index < pattern.length) {
            if (pattern[index] === pattern[prefixLength]) {
                table[index] = ++prefixLength
                index++
            } else if (prefixLength !== 0) {
                // Mundurkan panjang prefix ke kandidat fallback sebelumnya
                prefixLength = table[prefixLength - 1]
            } else {
                table[index] = 0
                index++
            }
        }

        return table
    }
}
