import { CoinChangeResult, ICoinChangeSolver } from "./interfaces"

/**
 * Coin Change — mencari kombinasi koin dengan jumlah minimum untuk mencapai target.
 *
 * Kompleksitas Waktu : O(targetAmount × coins.length)
 * Kompleksitas Ruang : O(targetAmount)
 *
 * @example
 * const solver = new CoinChangeSolver();
 * solver.solve(11, [1, 5, 6, 9]); // => { minCoins: 2, coins: [2, 9] }
 */
export class CoinChangeSolver implements ICoinChangeSolver {
    /**
     * Menghitung jumlah minimum koin yang dibutuhkan untuk mencapai `targetAmount`
     * sekaligus merekonstruksi daftar koin yang dipilih.
     *
     * @param targetAmount - Nilai total target yang ingin dibentuk.
     * @param availableCoins - Daftar denominasi koin yang dapat digunakan berulang kali.
     * @returns Objek `CoinChangeResult` berisi `minCoins` dan array `coins` yang dipilih.
     */
    solve(targetAmount: number, availableCoins: number[]): CoinChangeResult {
        // minCoinsNeeded[a] menyimpan jumlah minimum koin untuk membentuk nilai `a`
        const minCoinsNeeded: number[] = Array(targetAmount + 1).fill(Infinity)
        // lastUsedCoin[a] mencatat koin terakhir yang dipakai untuk rekonstruksi solusi
        const lastUsedCoin: number[] = Array(targetAmount + 1).fill(-1)

        // Base case: nilai 0 membutuhkan 0 koin
        minCoinsNeeded[0] = 0

        // Isi tabel DP secara bottom-up untuk setiap denominasi koin
        for (const coin of availableCoins) {
            for (let amount = 0; amount <= targetAmount; amount++) {
                const canUseCoin = amount >= coin
                const isFewerCoins = minCoinsNeeded[amount] > 1 + minCoinsNeeded[amount - coin]

                if (canUseCoin && isFewerCoins) {
                    minCoinsNeeded[amount] = 1 + minCoinsNeeded[amount - coin]
                    lastUsedCoin[amount] = coin
                }
            }
        }

        const result: CoinChangeResult = {
            minCoins: minCoinsNeeded[targetAmount],
            coins: [],
        }

        // Rekonstruksi koin-koin yang dipilih dengan menelusuri mundur dari `targetAmount`
        let remaining = targetAmount
        while (remaining > 0) {
            result.coins.push(lastUsedCoin[remaining])
            remaining -= lastUsedCoin[remaining]
        }

        return result
    }
}
