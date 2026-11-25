import { IRegexMatcher } from "./interfaces"

/**
 * Regex Matching — mencocokkan string s dengan pattern p yang mendukung:
 *  - '.' : cocok dengan karakter apa pun
 *  - '*' : cocok dengan nol atau lebih karakter sebelumnya
 *
 * Menggunakan DP bottom-up untuk menghindari overhead rekursi.
 *
 * Kompleksitas Waktu : O(n × m) — n=panjang s, m=panjang p
 * Kompleksitas Ruang : O(n × m)
 *
 * @example
 * const matcher = new RegexMatcher();
 * matcher.isMatch("aa", "a*");     // => true
 * matcher.isMatch("ab", ".*");     // => true
 * matcher.isMatch("aab", "c*a*b"); // => true
 * matcher.isMatch("mississippi", "mis*is*p*."); // => false
 */
export class RegexMatcher implements IRegexMatcher {
    isMatch(s: string, pattern: string): boolean {
        const sLen = s.length
        const pLen = pattern.length

        // dp[i][j] = true jika s[0..i-1] cocok dengan p[0..j-1]
        const dp: boolean[][] = Array.from({ length: sLen + 1 }, () => Array(pLen + 1).fill(false))

        dp[0][0] = true // string kosong cocok dengan pattern kosong

        // Pattern "a*b*c*..." bisa cocok dengan string kosong
        for (let pIndex = 2; pIndex <= pLen; pIndex++) {
            if (pattern[pIndex - 1] === "*") {
                dp[0][pIndex] = dp[0][pIndex - 2]
            }
        }

        for (let sIndex = 1; sIndex <= sLen; sIndex++) {
            for (let pIndex = 1; pIndex <= pLen; pIndex++) {
                const pChar = pattern[pIndex - 1]
                const sChar = s[sIndex - 1]

                if (pChar === "*") {
                    // Gunakan '*' sebagai nol kemunculan (abaikan x*)
                    const zeroOccurrence = dp[sIndex][pIndex - 2]

                    // Gunakan '*' sebagai satu atau lebih kemunculan
                    const prevPatternChar = pattern[pIndex - 2]
                    const charMatches = prevPatternChar === "." || prevPatternChar === sChar
                    const oneOrMore = charMatches ? dp[sIndex - 1][pIndex] : false

                    dp[sIndex][pIndex] = zeroOccurrence || oneOrMore
                } else if (pChar === "." || pChar === sChar) {
                    dp[sIndex][pIndex] = dp[sIndex - 1][pIndex - 1]
                }
            }
        }

        return dp[sLen][pLen]
    }
}
