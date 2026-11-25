import { IBurstBalloonsSolver } from "./interfaces"

/**
 * Burst Balloons — memilih urutan memecahkan balon untuk memaksimalkan koin.
 * Koin dari memecahkan balon i = nums[left] × nums[i] × nums[right]
 * di mana left dan right adalah tetangga terdekat yang belum pecah.
 *
 * Strategi: alih-alih memikirkan balon mana yang dipecah pertama (top-down sulit),
 * pikirkan balon mana yang dipecah TERAKHIR dalam rentang [left, right].
 *
 * Kompleksitas Waktu : O(n³)
 * Kompleksitas Ruang : O(n²)
 *
 * @example
 * const solver = new BurstBalloonsSolver();
 * solver.maxCoins([3, 1, 5, 8]); // => 167
 * // Urutan optimal: 1→5→3→8 → 3×1×5 + 3×5×8 + 1×3×8 + 1×8×1 = 15+120+24+8 = 167
 */
export class BurstBalloonsSolver implements IBurstBalloonsSolver {
    maxCoins(nums: number[]): number {
        // Tambahkan balon sentinel bernilai 1 di kedua ujung
        const balloons = [1, ...nums, 1]
        const n = balloons.length

        // dp[left][right] = koin maksimum dari memecahkan semua balon di (left, right)
        const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0))

        // Iterasi berdasarkan panjang interval
        for (let length = 2; length < n; length++) {
            for (let left = 0; left < n - length; left++) {
                const right = left + length

                // Coba setiap balon sebagai yang terakhir dipecah dalam interval (left, right)
                for (let last = left + 1; last < right; last++) {
                    const coinsFromLast = balloons[left] * balloons[last] * balloons[right]
                    const coinsFromLeft = dp[left][last]
                    const coinsFromRight = dp[last][right]
                    dp[left][right] = Math.max(
                        dp[left][right],
                        coinsFromLeft + coinsFromLast + coinsFromRight,
                    )
                }
            }
        }

        return dp[0][n - 1]
    }
}
