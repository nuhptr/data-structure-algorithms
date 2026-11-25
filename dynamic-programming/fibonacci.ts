import { IFibonacciSolver } from "./interfaces"

/**
 * Fibonacci — menghasilkan barisan Fibonacci sampai index ke-n
 * menggunakan memoization (bottom-up DP).
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const solver = new FibonacciSolver();
 * solver.solve(10); // => [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 * solver.solve(5);  // => [0, 1, 1, 2, 3]
 */
export class FibonacciSolver implements IFibonacciSolver {
    private cachedSequence: number[] = [0, 1]

    solve(count: number): number[] {
        const missingCount = count - (this.cachedSequence.length - 2)

        if (missingCount >= 1) {
            for (let step = 0; step < missingCount; step++) {
                const lastValue = this.cachedSequence[this.cachedSequence.length - 1]
                const secondLastValue = this.cachedSequence[this.cachedSequence.length - 2]
                this.cachedSequence.push(lastValue + secondLastValue)
            }
        }

        return this.cachedSequence.slice(0, count)
    }
}
