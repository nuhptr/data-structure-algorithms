import { IKnapsackSolver } from "./interfaces"

/**
 * 0/1 Knapsack — memilih item dengan total nilai maksimum
 * tanpa melebihi kapasitas yang diberikan. Setiap item hanya bisa dipilih sekali.
 *
 * Kompleksitas Waktu : O(itemCount × capacity)
 * Kompleksitas Ruang : O(itemCount × capacity)
 *
 * @example
 * const solver = new KnapsackSolver();
 * solver.solve(3, [3, 4, 5], [30, 50, 60]); // => 90
 */
export class KnapsackSolver implements IKnapsackSolver {
    /**
     * Menghitung total nilai maksimum yang dapat dimuat dalam kapasitas tas tertentu
     * menggunakan tabel DP 2D bottom-up (0/1 Knapsack).
     *
     * @param capacity - Kapasitas berat maksimum tas.
     * @param weights - Array berat masing-masing barang.
     * @param values - Array nilai masing-masing barang.
     * @returns Total nilai maksimum yang dapat dicapai tanpa melebihi kapasitas.
     * @throws {Error} Jika panjang array `weights` dan `values` tidak sama.
     */
    solve(capacity: number, weights: number[], values: number[]): number {
        if (weights.length !== values.length) {
            throw new Error("Panjang array weights dan values harus sama")
        }

        const itemCount = weights.length
        // maxValueTable[i][c] = nilai maksimum menggunakan i barang pertama dengan kapasitas c
        const maxValueTable: number[][] = Array.from({ length: itemCount + 1 }, () =>
            Array(capacity + 1).fill(0),
        )

        for (let itemIndex = 1; itemIndex <= itemCount; itemIndex++) {
            const currentWeight = weights[itemIndex - 1]
            const currentValue = values[itemIndex - 1]

            for (let currentCapacity = 1; currentCapacity <= capacity; currentCapacity++) {
                const itemFits = currentWeight <= currentCapacity

                if (itemFits) {
                    // Bandingkan nilai jika barang diambil vs dilewati
                    const valueIfTaken =
                        currentValue + maxValueTable[itemIndex - 1][currentCapacity - currentWeight]
                    const valueIfSkipped = maxValueTable[itemIndex - 1][currentCapacity]
                    maxValueTable[itemIndex][currentCapacity] = Math.max(
                        valueIfTaken,
                        valueIfSkipped,
                    )
                } else {
                    // Barang terlalu berat untuk kapasitas saat ini: warisi nilai tanpa barang ini
                    maxValueTable[itemIndex][currentCapacity] =
                        maxValueTable[itemIndex - 1][currentCapacity]
                }
            }
        }

        return maxValueTable[itemCount][capacity]
    }
}
