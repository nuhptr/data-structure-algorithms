import { ISortAlgorithm } from "./interfaces"

/**
 * Counting Sort — menghitung frekuensi setiap nilai lalu merekonstruksi
 * array yang terurut. Tidak melakukan perbandingan antar elemen.
 *
 * Kompleksitas Waktu : O(n + k) — k = rentang nilai (max - min)
 * Kompleksitas Ruang : O(k)
 *
 * @example
 * const sorter = new CountingSort();
 * sorter.sort([0, 5, 3, 2, 2]); // => [0, 2, 2, 3, 5]
 * sorter.sort([-2, -5, -45]);    // => [-45, -5, -2]
 */
export class CountingSort implements ISortAlgorithm {
    sort(array: number[]): number[] {
        if (array.length === 0) return []

        const minValue = Math.min(...array)
        const maxValue = Math.max(...array)
        const rangeSize = maxValue - minValue + 1

        // Hitung frekuensi kemunculan setiap nilai
        const frequencyTable: number[] = Array(rangeSize).fill(0)
        for (const value of array) {
            frequencyTable[value - minValue]++
        }

        // Akumulasi frekuensi — frequencyTable[i] menjadi jumlah elemen <= i
        for (let index = 1; index < rangeSize; index++) {
            frequencyTable[index] += frequencyTable[index - 1]
        }

        // Susun output dari kanan ke kiri agar sort bersifat stabil
        const sortedArray: number[] = Array(array.length).fill(0)
        for (let index = array.length - 1; index >= 0; index--) {
            const value = array[index]
            const outputPosition = frequencyTable[value - minValue] - 1
            sortedArray[outputPosition] = value
            frequencyTable[value - minValue]--
        }

        return sortedArray
    }
}
