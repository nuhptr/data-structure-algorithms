import { IPalindromePartitioningSolver } from "./interfaces"

/**
 * Palindrome Partitioning — mempartisi string sehingga setiap bagian adalah palindrom.
 *
 * partition: menghasilkan semua partisi palindrom menggunakan backtracking + DP precompute.
 * minCuts: hitung jumlah potongan minimum agar setiap bagian palindrom.
 *
 * Kompleksitas partition  : O(n × 2^n)
 * Kompleksitas minCuts    : O(n²) dengan DP
 * Kompleksitas Ruang      : O(n²) untuk tabel palindrom
 *
 * @example
 * const solver = new PalindromePartitioningSolver();
 * solver.partition("aab");   // => [["a","a","b"],["aa","b"]]
 * solver.minCuts("aab");     // => 1
 * solver.minCuts("ababbbabbababa"); // => 3
 */
export class PalindromePartitioningSolver implements IPalindromePartitioningSolver {
    /**
     * Menghasilkan semua kemungkinan partisi string `s` sehingga setiap substring merupakan palindrom.
     *
     * @param s - String input yang akan dipartisi.
     * @returns Daftar semua partisi palindrom yang valid.
     */
    partition(s: string): string[][] {
        const length = s.length
        const isPalin = this.buildPalindromTable(s)
        const results: string[][] = []
        const currentPartition: string[] = []

        const backtrack = (startIndex: number): void => {
            // Basis rekursi: seluruh karakter string telah terpartisi
            if (startIndex === length) {
                results.push([...currentPartition])
                return
            }

            // Coba semua potongan substring yang valid sebagai palindrom mulai dari `startIndex`
            for (let endIndex = startIndex; endIndex < length; endIndex++) {
                if (isPalin[startIndex][endIndex]) {
                    currentPartition.push(s.slice(startIndex, endIndex + 1))
                    backtrack(endIndex + 1)
                    currentPartition.pop()
                }
            }
        }

        backtrack(0)
        return results
    }

    /**
     * Menghitung jumlah potongan minimum agar seluruh bagian string `s` merupakan palindrom.
     *
     * @param s - String input yang akan dipotong.
     * @returns Jumlah potongan minimum yang diperlukan.
     */
    minCuts(s: string): number {
        const length = s.length
        const isPalin = this.buildPalindromTable(s)

        // dp[i] = jumlah minimum potongan untuk s[0..i]
        const dp = Array(length).fill(Infinity)

        for (let endIndex = 0; endIndex < length; endIndex++) {
            if (isPalin[0][endIndex]) {
                dp[endIndex] = 0 // seluruh s[0..endIndex] adalah palindrom
                continue
            }

            // Coba setiap titik potong yang menghasilkan akhiran palindrom s[splitIndex..endIndex]
            for (let splitIndex = 1; splitIndex <= endIndex; splitIndex++) {
                if (isPalin[splitIndex][endIndex]) {
                    dp[endIndex] = Math.min(dp[endIndex], dp[splitIndex - 1] + 1)
                }
            }
        }

        return dp[length - 1]
    }

    /**
     * Membangun tabel DP 2D yang menandakan apakah substring `s[i..j]` adalah palindrom dalam O(1) lookup.
     *
     * @param s - String input sumber.
     * @returns Matriks boolean `table` dengan `table[i][j] === true` jika `s[i..j]` palindrom.
     */
    private buildPalindromTable(s: string): boolean[][] {
        const n = s.length
        const table = Array.from({ length: n }, () => Array(n).fill(false))

        // Semua substring panjang 1 adalah palindrom
        for (let i = 0; i < n; i++) table[i][i] = true

        // Periksa substring panjang 2
        for (let i = 0; i < n - 1; i++) {
            table[i][i + 1] = s[i] === s[i + 1]
        }

        // Periksa substring panjang 3+
        for (let len = 3; len <= n; len++) {
            for (let start = 0; start <= n - len; start++) {
                const end = start + len - 1
                table[start][end] = s[start] === s[end] && table[start + 1][end - 1]
            }
        }

        return table
    }
}
