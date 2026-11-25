import { CoinChangeResult, ICoinChangeSolver } from "./interfaces";

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
  solve(targetAmount: number, availableCoins: number[]): CoinChangeResult {
    const minCoinsNeeded: number[] = Array(targetAmount + 1).fill(Infinity);
    const lastUsedCoin: number[] = Array(targetAmount + 1).fill(-1);

    minCoinsNeeded[0] = 0;

    for (const coin of availableCoins) {
      for (let amount = 0; amount <= targetAmount; amount++) {
        const canUseCoin = amount >= coin;
        const isFewerCoins = minCoinsNeeded[amount] > 1 + minCoinsNeeded[amount - coin];

        if (canUseCoin && isFewerCoins) {
          minCoinsNeeded[amount] = 1 + minCoinsNeeded[amount - coin];
          lastUsedCoin[amount] = coin;
        }
      }
    }

    const result: CoinChangeResult = {
      minCoins: minCoinsNeeded[targetAmount],
      coins: [],
    };

    let remaining = targetAmount;
    while (remaining > 0) {
      result.coins.push(lastUsedCoin[remaining]);
      remaining -= lastUsedCoin[remaining];
    }

    return result;
  }
}
