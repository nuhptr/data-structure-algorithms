import { IFractionalKnapsack } from "./interfaces"

/**
 * Fractional Knapsack — memaksimalkan nilai dengan kapasitas terbatas.
 * Berbeda dengan 0/1 Knapsack, item boleh diambil sebagian (fraksional).
 * Strategi greedy: urutkan item berdasarkan rasio nilai/berat tertinggi.
 *
 * Kompleksitas Waktu : O(n log n) — dominasi sorting
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const solver = new FractionalKnapsack();
 * solver.solve([60,100,120], [10,20,30], 50); // => 240
 */
export class FractionalKnapsack implements IFractionalKnapsack {
    /**
     * Menghitung nilai maksimum yang bisa dibawa dalam knapsack dengan mengambil item
     * secara penuh atau sebagian berdasarkan rasio nilai per berat tertinggi.
     *
     * @param values - Daftar nilai masing-masing item.
     * @param weights - Daftar berat masing-masing item.
     * @param capacity - Kapasitas maksimum knapsack.
     * @returns Total nilai maksimum yang berhasil dikumpulkan.
     */
    solve(values: number[], weights: number[], capacity: number): number {
        if (capacity <= 0) return 0

        const itemCount = Math.min(values.length, weights.length)

        // Buat pasangan [nilai, berat] beserta rasio value/weight tiap item
        const items = Array.from({ length: itemCount }, (_, index) => ({
            value: values[index],
            weight: weights[index],
            valuePerWeight: values[index] / weights[index],
        }))

        // Urutkan menurun berdasarkan rasio nilai per satuan berat
        items.sort((a, b) => b.valuePerWeight - a.valuePerWeight)

        let totalValue = 0
        let remainingCapacity = capacity

        for (const item of items) {
            if (remainingCapacity <= 0) break

            // Ambil seluruh item jika muat; jika tidak, ambil fraksi sesuai sisa kapasitas
            const canTakeAll = item.weight <= remainingCapacity

            if (canTakeAll) {
                totalValue += item.value
                remainingCapacity -= item.weight
            } else {
                // Ambil sebagian sesuai sisa kapasitas
                totalValue += item.valuePerWeight * remainingCapacity
                remainingCapacity = 0
            }
        }

        return totalValue
    }
}
