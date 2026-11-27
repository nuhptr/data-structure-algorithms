import { ILevenshtein } from "./interfaces"

/**
 * Levenshtein Distance — menghitung jumlah minimum operasi edit
 * (insert, delete, replace) untuk mengubah satu string menjadi string lain.
 *
 * Digunakan e-commerce untuk: koreksi typo di search bar
 * ("septu" → "sepatu"), fuzzy matching nama produk.
 *
 * Kompleksitas Waktu : O(m × n) — m, n panjang dua string
 * Kompleksitas Ruang : O(m × n) — bisa dioptimasi ke O(n) dengan rolling array
 *
 * @example
 * const lev = new Levenshtein();
 * lev.distance("septu", "sepatu");     // => 1
 * lev.distance("kitten", "sitting");   // => 3
 * lev.closestMatch("septu", ["sepatu", "sendal", "kaos"]); // => "sepatu"
 */
export class Levenshtein implements ILevenshtein {
    /**
     * Menghitung jarak edit Levenshtein antara dua string menggunakan Dynamic Programming.
     *
     * @param wordA - String sumber.
     * @param wordB - String target.
     * @returns Jumlah minimum operasi insert, delete, atau replace.
     */
    distance(wordA: string, wordB: string): number {
        const lengthA = wordA.length
        const lengthB = wordB.length

        // Tabel DP: distanceTable[i][j] = edit distance antara wordA[0..i] dan wordB[0..j]
        const distanceTable: number[][] = Array.from({ length: lengthA + 1 }, (_, row) =>
            Array.from({ length: lengthB + 1 }, (__, col) => {
                if (row === 0) return col // insert semua karakter wordB
                if (col === 0) return row // delete semua karakter wordA
                return 0
            }),
        )

        for (let row = 1; row <= lengthA; row++) {
            for (let col = 1; col <= lengthB; col++) {
                const charsMatch = wordA[row - 1] === wordB[col - 1]

                if (charsMatch) {
                    // Karakter sama: tidak butuh operasi tambahan
                    distanceTable[row][col] = distanceTable[row - 1][col - 1]
                } else {
                    // Pilih biaya terkecil di antara insert, delete, dan replace
                    const insertCost = distanceTable[row][col - 1]
                    const deleteCost = distanceTable[row - 1][col]
                    const replaceCost = distanceTable[row - 1][col - 1]
                    distanceTable[row][col] = 1 + Math.min(insertCost, deleteCost, replaceCost)
                }
            }
        }

        return distanceTable[lengthA][lengthB]
    }

    /**
     * Mencari satu kandidat kata dengan jarak edit terkecil terhadap query.
     *
     * @param query - Kata masukan yang mungkin mengandung typo.
     * @param candidates - Daftar kandidat kata pembanding.
     * @returns Kandidat terdekat, atau `null` jika `candidates` kosong.
     */
    closestMatch(query: string, candidates: string[]): string | null {
        if (candidates.length === 0) return null

        let bestMatch = candidates[0]
        let lowestDistance = this.distance(query, candidates[0])

        for (let index = 1; index < candidates.length; index++) {
            const currentDistance = this.distance(query, candidates[index])
            if (currentDistance < lowestDistance) {
                lowestDistance = currentDistance
                bestMatch = candidates[index]
            }
        }

        return bestMatch
    }

    /**
     * Mengembalikan semua kandidat dengan edit distance `<= maxDistance`,
     * diurutkan dari yang paling mirip.
     *
     * @param query - Kata masukan yang dicari sarannya.
     * @param candidates - Daftar kandidat kata.
     * @param maxDistance - Batas maksimum jarak edit yang diterima (default `2`).
     * @returns Daftar saran kata terurut berdasarkan jarak edit terkecil.
     */
    suggestions(query: string, candidates: string[], maxDistance: number = 2): string[] {
        return candidates
            .map((candidate) => ({ candidate, dist: this.distance(query, candidate) }))
            .filter(({ dist }) => dist <= maxDistance)
            .sort((a, b) => a.dist - b.dist)
            .map(({ candidate }) => candidate)
    }
}
