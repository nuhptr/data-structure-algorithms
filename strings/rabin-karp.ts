import { IStringContains } from "./interfaces"

/**
 * Rabin-Karp — pencarian pattern menggunakan rolling hash.
 * Hanya membandingkan karakter saat hash cocok (menghindari false positives).
 * Sangat efisien untuk mencari banyak pattern sekaligus.
 *
 * Kompleksitas Waktu : O(n + m) rata-rata | O(nm) worst case (hash collision)
 * Kompleksitas Ruang : O(1)
 *
 * @example
 * const rk = new RabinKarp();
 * rk.contains("abcxabcdabcy", "abcdabcy"); // => true
 * rk.contains("hello world", "xyz");       // => false
 */
export class RabinKarp implements IStringContains {
    /** Basis alfabet (ASCII 256 karakter) untuk polynomial rolling hash. */
    private readonly ALPHABET_SIZE = 256
    /** Bilangan prima besar sebagai modulus guna meminimalkan hash collision. */
    private readonly MODULUS = 1_000_003

    /**
     * Memeriksa apakah pola muncul di dalam teks menggunakan polynomial rolling hash.
     *
     * @param text - Teks utama yang diperiksa.
     * @param pattern - Pola substring yang dicari.
     * @returns `true` jika pola ditemukan dalam teks, `false` jika tidak.
     */
    contains(text: string, pattern: string): boolean {
        const patternLength = pattern.length
        const textLength = text.length

        if (patternLength > textLength) return false

        let patternHash = 0
        let windowHash = 0
        let highestPlaceValue = 1

        // Hitung bobot digit paling kiri: ALPHABET_SIZE^(patternLength-1) % MODULUS
        for (let position = 0; position < patternLength - 1; position++) {
            highestPlaceValue = (highestPlaceValue * this.ALPHABET_SIZE) % this.MODULUS
        }

        // Hitung hash awal untuk pattern dan jendela pertama pada teks
        for (let position = 0; position < patternLength; position++) {
            patternHash =
                (this.ALPHABET_SIZE * patternHash + pattern.charCodeAt(position)) % this.MODULUS
            windowHash =
                (this.ALPHABET_SIZE * windowHash + text.charCodeAt(position)) % this.MODULUS
        }

        for (let startIndex = 0; startIndex <= textLength - patternLength; startIndex++) {
            const hashesMatch = windowHash === patternHash

            if (hashesMatch) {
                // Verifikasi kecocokan karakter langsung untuk menghindari false positive collision
                const exactMatch = text.slice(startIndex, startIndex + patternLength) === pattern
                if (exactMatch) return true
            }

            // Geser jendela satu karakter ke kanan dengan rolling hash dalam O(1)
            if (startIndex < textLength - patternLength) {
                windowHash =
                    (this.ALPHABET_SIZE *
                        (windowHash - text.charCodeAt(startIndex) * highestPlaceValue) +
                        text.charCodeAt(startIndex + patternLength)) %
                    this.MODULUS

                // Pastikan nilai hash tetap non-negatif setelah operasi modulo
                if (windowHash < 0) windowHash += this.MODULUS
            }
        }

        return false
    }
}
