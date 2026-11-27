import { ILISSolver } from "./interfaces"

/**
 * Longest Increasing Subsequence (LIS) — mencari subsequence terpanjang
 * yang nilainya selalu bertambah (tidak harus berurutan dalam array).
 *
 * Kompleksitas Waktu : O(n²)
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const solver = new LISSolver();
 * solver.solve([10, 22, 9, 33, 21, 50, 41, 60, 80]);
 * // => [10, 22, 33, 41, 60, 80]
 */
export class LISSolver implements ILISSolver {
    /**
     * Menemukan dan merekonstruksi Longest Increasing Subsequence dari `array`.
     *
     * @param array - Array bilangan input.
     * @returns Array berisi elemen-elemen subsequence menaik ketat terpanjang.
     */
    solve(array: number[]): number[] {
        if (array.length === 0) return []

        const arrayLength = array.length

        // lisLengthAt[i] = panjang LIS yang berakhir di index i
        const lisLengthAt: number[] = Array(arrayLength).fill(1)

        // previousIndex[i] = index elemen sebelumnya dalam LIS terbaik yang berakhir di i
        const previousIndex: number[] = Array(arrayLength).fill(-1)

        let longestEndIndex = 0

        // Evaluasi setiap elemen terhadap seluruh elemen sebelumnya untuk memperpanjang LIS
        for (let currentIndex = 1; currentIndex < arrayLength; currentIndex++) {
            for (let prevIndex = 0; prevIndex < currentIndex; prevIndex++) {
                const isIncreasing = array[prevIndex] < array[currentIndex]
                const extendsMakesLonger = lisLengthAt[prevIndex] + 1 > lisLengthAt[currentIndex]

                if (isIncreasing && extendsMakesLonger) {
                    lisLengthAt[currentIndex] = lisLengthAt[prevIndex] + 1
                    previousIndex[currentIndex] = prevIndex
                }
            }

            // Perbarui indeks ujung LIS terpanjang secara global
            if (lisLengthAt[currentIndex] > lisLengthAt[longestEndIndex]) {
                longestEndIndex = currentIndex
            }
        }

        // Rekonstruksi LIS dengan menelusuri previousIndex dari belakang
        const resultSequence: number[] = []
        let traceIndex = longestEndIndex

        while (traceIndex !== -1) {
            resultSequence.unshift(array[traceIndex])
            traceIndex = previousIndex[traceIndex]
        }

        return resultSequence
    }
}
