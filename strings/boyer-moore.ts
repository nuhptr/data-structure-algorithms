import { IStringMatcher } from "./interfaces"

/**
 * Boyer-Moore (Bad Character Heuristic) — pencarian pattern dari kanan ke kiri.
 * Saat terjadi mismatch, geser pattern berdasarkan posisi karakter yang salah
 * di dalam pattern. Sangat cepat pada praktiknya.
 *
 * Kompleksitas Waktu : O(n/m) rata-rata | O(nm) worst case
 * Kompleksitas Ruang : O(m)
 *
 * @example
 * const bm = new BoyerMoore();
 * bm.findAll("ABAABA", "AB"); // => [0, 3]
 * bm.findAll("ABABAB", "ABA"); // => [0, 2]
 */
export class BoyerMoore implements IStringMatcher {
    findAll(text: string, pattern: string): number[] {
        const matchPositions: number[] = []
        const textLength = text.length
        const patternLength = pattern.length

        if (!text || !pattern || patternLength > textLength) return matchPositions

        let startIndex = 0

        while (startIndex <= textLength - patternLength) {
            const mismatchIndex = this.findMismatchFromRight(text, pattern, startIndex)

            if (mismatchIndex === -1) {
                // Seluruh pattern cocok
                matchPositions.push(startIndex)
                startIndex++
            } else {
                const lastOccurrence = this.findLastOccurrenceInPattern(
                    pattern,
                    text[mismatchIndex],
                )
                // Geser sejauh mungkin ke kanan, minimal 1
                startIndex = Math.max(startIndex + 1, mismatchIndex - lastOccurrence)
            }
        }

        return matchPositions
    }

    /**
     * Membandingkan pattern dengan teks mulai dari kanan.
     * @returns Index mismatch di teks, atau -1 jika seluruh pattern cocok.
     */
    private findMismatchFromRight(text: string, pattern: string, offset: number): number {
        for (let pos = pattern.length - 1; pos >= 0; pos--) {
            if (pattern[pos] !== text[offset + pos]) {
                return offset + pos
            }
        }
        return -1
    }

    /**
     * Mencari kemunculan terakhir sebuah karakter di dalam pattern (dari kanan).
     * @returns Index kemunculan terakhir, atau -1 jika tidak ada.
     */
    private findLastOccurrenceInPattern(pattern: string, char: string): number {
        for (let pos = pattern.length - 1; pos >= 0; pos--) {
            if (pattern[pos] === char) return pos
        }
        return -1
    }
}
