import { IOptimalMerge } from "./interfaces"

/**
 * Optimal Merge Pattern — menghitung biaya minimum untuk menggabungkan
 * sejumlah file/array terurut menjadi satu. Setiap merge dua file berukuran
 * m dan n membutuhkan m+n operasi. Strategi greedy: selalu merge dua terkecil.
 *
 * Kompleksitas Waktu : O(n² ) — naive | O(n log n) dengan min-heap
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const solver = new OptimalMergeSolver();
 * solver.solve([2, 3, 4]);       // => 14
 * solver.solve([5,10,20,30,30]); // => 205
 */
export class OptimalMergeSolver implements IOptimalMerge {
    solve(fileSizes: number[]): number {
        if (fileSizes.length <= 1) return 0

        const sizes = [...fileSizes]
        let totalCost = 0

        while (sizes.length > 1) {
            // Ambil dua file terkecil
            let firstMinIndex = sizes.indexOf(Math.min(...sizes))
            const firstMinSize = sizes.splice(firstMinIndex, 1)[0]

            let secondMinIndex = sizes.indexOf(Math.min(...sizes))
            const secondMinSize = sizes.splice(secondMinIndex, 1)[0]

            const mergeCost = firstMinSize + secondMinSize
            totalCost += mergeCost

            // Hasil merge dimasukkan kembali
            sizes.push(mergeCost)
        }

        return totalCost
    }
}
