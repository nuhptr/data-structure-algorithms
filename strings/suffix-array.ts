import { ISuffixArray } from "./interfaces"

/**
 * Suffix Array — array dari semua suffix sebuah string yang diurutkan secara leksikografis.
 * Digunakan untuk berbagai operasi string yang efisien: pencarian, LCP, dll.
 *
 * Implementasi ini menggunakan prefix doubling (SA-IS concept simplified):
 * - Fase 1: urutkan berdasarkan karakter tunggal
 * - Fase 2: doubling — urutkan pasangan suffix hingga urutan stabil
 *
 * Kompleksitas build  : O(n log n)
 * Kompleksitas search : O(m log n) — m = panjang pattern
 * Kompleksitas Ruang  : O(n)
 *
 * @example
 * const sa = new SuffixArray();
 * sa.build("banana"); // => [5, 3, 1, 0, 4, 2]
 * sa.search("banana", "an");   // => [1, 3]
 * sa.search("banana", "xyz");  // => []
 */
export class SuffixArray implements ISuffixArray {
    /**
     * Membangun suffix array dari string menggunakan metode prefix doubling.
     *
     * @param s - String sumber.
     * @returns Array indeks awal suffix yang terurut secara leksikografis.
     */
    build(s: string): number[] {
        const n = s.length
        if (n === 0) return []

        // Buat array suffix awal berdasarkan index
        let suffixes = Array.from({ length: n }, (_, i) => i)

        // Urutkan menggunakan prefix doubling dengan rank awal berupa kode ASCII karakter
        let gap = 1
        const rank = Array.from(s, (char) => char.charCodeAt(0))

        while (gap < n) {
            const rankSnapshot = [...rank]

            suffixes.sort((a, b) => {
                // Bandingkan rank pada posisi saat ini
                if (rankSnapshot[a] !== rankSnapshot[b]) {
                    return rankSnapshot[a] - rankSnapshot[b]
                }
                // Jika sama, bandingkan rank pada posisi + gap (-1 jika melewati ujung string)
                const rankA = a + gap < n ? rankSnapshot[a + gap] : -1
                const rankB = b + gap < n ? rankSnapshot[b + gap] : -1
                return rankA - rankB
            })

            // Hitung ulang rank terkompresi berdasarkan urutan baru
            rank[suffixes[0]] = 0
            for (let i = 1; i < n; i++) {
                const prev = suffixes[i - 1]
                const curr = suffixes[i]
                const samePrimary = rankSnapshot[prev] === rankSnapshot[curr]
                const prevSecondary = prev + gap < n ? rankSnapshot[prev + gap] : -1
                const currSecondary = curr + gap < n ? rankSnapshot[curr + gap] : -1
                const sameSecondary = prevSecondary === currSecondary

                rank[curr] = samePrimary && sameSecondary ? rank[prev] : rank[prev] + 1
            }

            if (rank[suffixes[n - 1]] === n - 1) break // semua rank unik, selesai
            gap *= 2
        }

        return suffixes
    }

    /**
     * Mencari semua kemunculan pola di dalam string menggunakan dua kali binary search
     * (lower bound dan upper bound) pada suffix array.
     *
     * @param s - String sumber.
     * @param pattern - Pola substring yang dicari.
     * @returns Daftar indeks awal kemunculan pola yang terurut menaik.
     */
    search(s: string, pattern: string): number[] {
        const suffixArray = this.build(s)
        const n = s.length
        const m = pattern.length
        const results: number[] = []

        // Binary search untuk batas kiri (suffix pertama >= pattern)
        let left = 0
        let right = n

        while (left < right) {
            const mid = Math.floor((left + right) / 2)
            const suffix = s.substring(suffixArray[mid])
            if (suffix.substring(0, m) < pattern) left = mid + 1
            else right = mid
        }

        const lowerBound = left

        // Binary search untuk batas kanan (suffix pertama > pattern)
        right = n
        while (left < right) {
            const mid = Math.floor((left + right) / 2)
            const suffix = s.substring(suffixArray[mid])
            if (suffix.substring(0, m) <= pattern) left = mid + 1
            else right = mid
        }

        // Kumpulkan semua kemunculan dalam rentang [lowerBound, left)
        for (let i = lowerBound; i < left; i++) {
            const startIndex = suffixArray[i]
            if (s.substring(startIndex, startIndex + m) === pattern) {
                results.push(startIndex)
            }
        }

        return results.sort((a, b) => a - b)
    }
}
