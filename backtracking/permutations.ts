import { IPermutationGenerator } from "./interfaces"

/**
 * Permutations — menghasilkan semua permutasi unik dari array angka
 * menggunakan backtracking dengan swap in-place.
 *
 * Kompleksitas Waktu : O(N × N!) — N! permutasi, masing-masing O(N) untuk disalin
 * Kompleksitas Ruang : O(N) — kedalaman rekursi
 *
 * @example
 * const generator = new PermutationGenerator();
 * generator.generate([1, 2, 3]);
 * // => [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */
export class PermutationGenerator implements IPermutationGenerator {
    generate(nums: number[]): number[][] {
        const results: number[][] = []
        const workingArray = [...nums]

        const permute = (startIndex: number): void => {
            if (startIndex === workingArray.length) {
                results.push([...workingArray])
                return
            }

            for (
                let currentIndex = startIndex;
                currentIndex < workingArray.length;
                currentIndex++
            ) {
                this.swap(workingArray, startIndex, currentIndex)
                permute(startIndex + 1)
                this.swap(workingArray, startIndex, currentIndex) // backtrack
            }
        }

        permute(0)
        return results
    }

    private swap(array: number[], indexA: number, indexB: number): void {
        ;[array[indexA], array[indexB]] = [array[indexB], array[indexA]]
    }
}
