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
    private readonly ALPHABET_SIZE = 256
    private readonly MODULUS = 1_000_003

    contains(text: string, pattern: string): boolean {
        const patternLength = pattern.length
        const textLength = text.length

        if (patternLength > textLength) return false

        let patternHash = 0
        let windowHash = 0
        let highestPlaceValue = 1

        // highestPlaceValue = ALPHABET_SIZE^(patternLength-1) % MODULUS
        for (let position = 0; position < patternLength - 1; position++) {
            highestPlaceValue = (highestPlaceValue * this.ALPHABET_SIZE) % this.MODULUS
        }

        // Hash awal untuk pattern dan window pertama
        for (let position = 0; position < patternLength; position++) {
            patternHash =
                (this.ALPHABET_SIZE * patternHash + pattern.charCodeAt(position)) % this.MODULUS
            windowHash =
                (this.ALPHABET_SIZE * windowHash + text.charCodeAt(position)) % this.MODULUS
        }

        for (let startIndex = 0; startIndex <= textLength - patternLength; startIndex++) {
            const hashesMatch = windowHash === patternHash

            if (hashesMatch) {
                const exactMatch = text.slice(startIndex, startIndex + patternLength) === pattern
                if (exactMatch) return true
            }

            // Geser window dengan rolling hash
            if (startIndex < textLength - patternLength) {
                windowHash =
                    (this.ALPHABET_SIZE *
                        (windowHash - text.charCodeAt(startIndex) * highestPlaceValue) +
                        text.charCodeAt(startIndex + patternLength)) %
                    this.MODULUS

                if (windowHash < 0) windowHash += this.MODULUS
            }
        }

        return false
    }
}
