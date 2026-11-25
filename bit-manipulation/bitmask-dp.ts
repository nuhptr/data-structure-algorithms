import { IBitmaskDP } from "./interfaces";

/**
 * Bitmask DP — teknik Dynamic Programming menggunakan bitmask sebagai state.
 * Efisien untuk masalah dengan subset kecil (n ≤ 20).
 *
 * Digunakan oleh unicorn companies untuk optimasi routing, assignment,
 * scheduling, dan masalah NP-hard dalam skala kecil.
 */
export class BitmaskDP implements IBitmaskDP {
  /**
   * Traveling Salesman Problem (TSP) — jalur terpendek mengunjungi semua kota.
   *
   * dp[mask][i] = biaya minimum untuk mengunjungi semua kota dalam mask,
   * berakhir di kota i.
   *
   * Kompleksitas Waktu : O(2^n × n²)
   * Kompleksitas Ruang : O(2^n × n)
   *
   * @param distMatrix - Matriks jarak simetris n×n, distMatrix[i][j] = jarak i→j
   * @returns Biaya jalur minimum
   *
   * @example
   * const dp = new BitmaskDP();
   * dp.tsp([[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]]); // => 80
   */
  tsp(distMatrix: number[][]): number {
    const n = distMatrix.length;
    if (n === 0) return 0;
    if (n === 1) return 0;

    const totalMasks = 1 << n;
    // dp[mask][city] = biaya minimum mengunjungi semua kota di mask, berakhir di city
    const dp: number[][] = Array.from(
      { length: totalMasks },
      () => Array(n).fill(Infinity)
    );

    dp[1][0] = 0; // Mulai dari kota 0, hanya kota 0 dikunjungi

    for (let mask = 1; mask < totalMasks; mask++) {
      for (let lastCity = 0; lastCity < n; lastCity++) {
        if (dp[mask][lastCity] === Infinity) continue;
        if ((mask & (1 << lastCity)) === 0) continue;

        for (let nextCity = 0; nextCity < n; nextCity++) {
          if ((mask & (1 << nextCity)) !== 0) continue; // sudah dikunjungi

          const newMask = mask | (1 << nextCity);
          const newCost = dp[mask][lastCity] + distMatrix[lastCity][nextCity];

          if (newCost < dp[newMask][nextCity]) {
            dp[newMask][nextCity] = newCost;
          }
        }
      }
    }

    // Cari biaya minimum untuk kembali ke kota 0 setelah mengunjungi semua kota
    const fullMask = totalMasks - 1;
    let minCost = Infinity;

    for (let lastCity = 1; lastCity < n; lastCity++) {
      const cost = dp[fullMask][lastCity] + distMatrix[lastCity][0];
      minCost = Math.min(minCost, cost);
    }

    return minCost;
  }

  /**
   * Minimum XOR Sum — assign setiap elemen nums1[i] ke nums2[j] (bijection)
   * untuk meminimalkan total nums1[i] XOR nums2[assigned[i]].
   *
   * Kompleksitas Waktu : O(2^n × n)
   * Kompleksitas Ruang : O(2^n)
   *
   * @example
   * const dp = new BitmaskDP();
   * dp.minimumXORSum([1, 2], [2, 3]); // => 2  (1^2 + 2^3 = 3+1 = 4 vs 1^3 + 2^2 = 2+0 = 2)
   */
  minimumXORSum(nums1: number[], nums2: number[]): number {
    const n = nums1.length;
    const totalMasks = 1 << n;

    // dp[mask] = XOR sum minimum menggunakan elemen nums2 dalam mask
    const dp = Array(totalMasks).fill(Infinity);
    dp[0] = 0;

    for (let mask = 0; mask < totalMasks; mask++) {
      if (dp[mask] === Infinity) continue;

      // Index nums1 yang akan diassign berikutnya = jumlah bit dalam mask
      const nums1Index = this.countBits(mask);
      if (nums1Index >= n) continue;

      for (let nums2Index = 0; nums2Index < n; nums2Index++) {
        if ((mask & (1 << nums2Index)) !== 0) continue; // sudah diassign

        const newMask = mask | (1 << nums2Index);
        const newCost = dp[mask] + (nums1[nums1Index] ^ nums2[nums2Index]);

        dp[newMask] = Math.min(dp[newMask], newCost);
      }
    }

    return dp[totalMasks - 1];
  }

  private countBits(n: number): number {
    let count = 0;
    let value = n;
    while (value !== 0) {
      value &= value - 1;
      count++;
    }
    return count;
  }
}
