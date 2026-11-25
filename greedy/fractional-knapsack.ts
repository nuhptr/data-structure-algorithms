import { IFractionalKnapsack } from "./interfaces";

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
  solve(values: number[], weights: number[], capacity: number): number {
    if (capacity <= 0) return 0;

    const itemCount = Math.min(values.length, weights.length);

    // Buat pasangan [nilai, berat] lalu urutkan berdasarkan value/weight tertinggi
    const items = Array.from({ length: itemCount }, (_, index) => ({
      value: values[index],
      weight: weights[index],
      valuePerWeight: values[index] / weights[index],
    }));

    items.sort((a, b) => b.valuePerWeight - a.valuePerWeight);

    let totalValue = 0;
    let remainingCapacity = capacity;

    for (const item of items) {
      if (remainingCapacity <= 0) break;

      const canTakeAll = item.weight <= remainingCapacity;

      if (canTakeAll) {
        totalValue += item.value;
        remainingCapacity -= item.weight;
      } else {
        // Ambil sebagian sesuai sisa kapasitas
        totalValue += item.valuePerWeight * remainingCapacity;
        remainingCapacity = 0;
      }
    }

    return totalValue;
  }
}
