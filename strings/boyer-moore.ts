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
    /**
     * Menemukan semua indeks kemunculan pola di dalam teks menggunakan heuristik
     * Bad Character Boyer-Moore.
     *
     * @param text - Teks utama yang akan dicari.
     * @param pattern - Pola yang dicari.
     * @returns Daftar indeks awal setiap kemunculan pola.
     */
    findAll(text: string, pattern: string): number[] {
        const matchPositions: number[] = []
        const textLength = text.length
        const patternLength = pattern.length

        if (!text || !pattern || patternLength > textLength) return matchPositions

        let startIndex = 0

        while (startIndex <= textLength - patternLength) {
            const mismatchIndex = this.findMismatchFromRight(text, pattern, startIndex)

            if (mismatchIndex === -1) {
                // Seluruh pattern cocok pada posisi `startIndex`
                matchPositions.push(startIndex)
                startIndex++
            } else {
                // Terapkan bad character rule untuk menyejajarkan karakter mismatch
                const lastOccurrence = this.findLastOccurrenceInPattern(
                    pattern,
                    text[mismatchIndex],
                )
                // Geser sejauh mungkin ke kanan, minimal 1 langkah agar tidak mundur
                startIndex = Math.max(startIndex + 1, mismatchIndex - lastOccurrence)
            }
        }

        return matchPositions
    }

    /**
     * Membandingkan pattern dengan potongan teks mulai dari karakter paling kanan.
     *
     * @param text - Teks utama.
     * @param pattern - Pola yang dibandingkan.
     * @param offset - Indeks awal kesejajaran pola terhadap teks.
     * @returns Indeks posisi mismatch di dalam teks, atau `-1` jika seluruh pola cocok.
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
     * Mencari kemunculan paling kanan dari sebuah karakter di dalam pola.
     *
     * @param pattern - Pola yang diperiksa.
     * @param char - Karakter mismatch dari teks.
     * @returns Indeks kemunculan terakhir dalam pola, atau `-1` jika tidak ada.
     */
    private findLastOccurrenceInPattern(pattern: string, char: string): number {
        for (let pos = pattern.length - 1; pos >= 0; pos--) {
            if (pattern[pos] === char) return pos
        }
        return -1
    }
}
