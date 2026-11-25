import { ISubsetSumSolver } from "./interfaces"

/**
 * Subset Sum — menemukan semua subset dari array yang jumlahnya sama dengan target.
 * Menggunakan backtracking dengan pruning berbasis sorting.
 *
 * Kompleksitas Waktu : O(2^N) — worst case semua subset
 * Kompleksitas Ruang : O(N) — kedalaman rekursi
 *
 * @example
 * const solver = new SubsetSumSolver();
 * solver.findAll([2, 3, 6, 7], 7);
 * // => [[7], [2, 2, 3]] — tidak ada duplikat di input ini
 *
 * solver.findAll([10, 1, 2, 7, 6, 1, 5], 8);
 * // => [[1,1,6],[1,2,5],[1,7],[2,6]]
 */
export class SubsetSumSolver implements ISubsetSumSolver {
    findAll(nums: number[], target: number): number[][] {
        const results: number[][] = []
        const sortedNums = [...nums].sort((a, b) => a - b)

        const buildSubsets = (
            startIndex: number,
            remaining: number,
            currentSubset: number[],
        ): void => {
            if (remaining === 0) {
                results.push([...currentSubset])
                return
            }

            for (let index = startIndex; index < sortedNums.length; index++) {
                const currentNumber = sortedNums[index]

                // Prune: angka sudah melebihi sisa target
                if (currentNumber > remaining) break

                // Lewati duplikat pada level rekursi yang sama
                if (index > startIndex && sortedNums[index] === sortedNums[index - 1]) {
                    continue
                }

                currentSubset.push(currentNumber)
                buildSubsets(index + 1, remaining - currentNumber, currentSubset)
                currentSubset.pop() // backtrack
            }
        }

        buildSubsets(0, target, [])
        return results
    }
}
