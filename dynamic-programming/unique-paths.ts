import { IUniquePathsSolver } from "./interfaces"

/**
 * Unique Paths — menghitung jumlah cara robot bergerak dari sudut kiri-atas
 * ke sudut kanan-bawah sebuah grid m×n, hanya boleh bergerak kanan atau bawah.
 *
 * Kompleksitas countPaths               : O(m × n)
 * Kompleksitas countPathsWithObstacles  : O(m × n)
 * Kompleksitas Ruang                    : O(n) — optimasi 1 baris
 *
 * @example
 * const solver = new UniquePathsSolver();
 * solver.countPaths(3, 7);  // => 28
 * solver.countPathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]]); // => 2
 */
export class UniquePathsSolver implements IUniquePathsSolver {
    countPaths(m: number, n: number): number {
        // Optimasi ruang: hanya simpan satu baris
        const dp = Array(n).fill(1)

        for (let row = 1; row < m; row++) {
            for (let col = 1; col < n; col++) {
                dp[col] += dp[col - 1]
            }
        }

        return dp[n - 1]
    }

    countPathsWithObstacles(grid: number[][]): number {
        const rows = grid.length
        const cols = grid[0].length

        if (grid[0][0] === 1 || grid[rows - 1][cols - 1] === 1) return 0

        const dp = Array(cols).fill(0)
        dp[0] = 1

        // Inisialisasi baris pertama
        for (let col = 1; col < cols; col++) {
            dp[col] = grid[0][col] === 1 ? 0 : dp[col - 1]
        }

        for (let row = 1; row < rows; row++) {
            // Update kolom pertama
            if (grid[row][0] === 1) dp[0] = 0

            for (let col = 1; col < cols; col++) {
                dp[col] = grid[row][col] === 1 ? 0 : dp[col] + dp[col - 1]
            }
        }

        return dp[cols - 1]
    }
}
