import { IKnapsackSolver } from "./interfaces";

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
  solve(capacity: number, weights: number[], values: number[]): number {
    if (weights.length !== values.length) {
      throw new Error("Panjang array weights dan values harus sama");
    }

    const itemCount = weights.length;
    const maxValueTable: number[][] = Array.from({ length: itemCount + 1 }, () =>
      Array(capacity + 1).fill(0)
    );

    for (let itemIndex = 1; itemIndex <= itemCount; itemIndex++) {
      const currentWeight = weights[itemIndex - 1];
      const currentValue = values[itemIndex - 1];

      for (let currentCapacity = 1; currentCapacity <= capacity; currentCapacity++) {
        const itemFits = currentWeight <= currentCapacity;

        if (itemFits) {
          const valueIfTaken = currentValue + maxValueTable[itemIndex - 1][currentCapacity - currentWeight];
          const valueIfSkipped = maxValueTable[itemIndex - 1][currentCapacity];
          maxValueTable[itemIndex][currentCapacity] = Math.max(valueIfTaken, valueIfSkipped);
        } else {
          maxValueTable[itemIndex][currentCapacity] = maxValueTable[itemIndex - 1][currentCapacity];
        }
      }
    }

    return maxValueTable[itemCount][capacity];
  }
}
