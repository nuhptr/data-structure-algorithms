import { IMatrixChainSolver } from "./interfaces"

/**
 * Matrix Chain Multiplication — mencari urutan perkalian matriks yang
 * meminimalkan total jumlah operasi skalar menggunakan DP bottom-up.
 *
 * Input: array dimensions di mana matriks ke-i berukuran
 * dimensions[i-1] × dimensions[i].
 *
 * Kompleksitas Waktu : O(n³)
 * Kompleksitas Ruang : O(n²)
 *
 * @example
 * const solver = new MatrixChainSolver();
 * solver.solve([10, 30, 5, 60]);
 * // => 4500  (urutan optimal: (A1 × A2) × A3)
 */
export class MatrixChainSolver implements IMatrixChainSolver {
    solve(dimensions: number[]): number {
        const matrixCount = dimensions.length - 1

        if (matrixCount <= 0) return 0

        // costTable[i][j] = jumlah operasi minimum untuk mengalikan matriks i sampai j
        const costTable: number[][] = Array.from({ length: matrixCount + 1 }, () =>
            Array(matrixCount + 1).fill(0),
        )

        // chainLength = jumlah matriks dalam chain yang sedang dihitung
        for (let chainLength = 2; chainLength <= matrixCount; chainLength++) {
            for (let startMatrix = 1; startMatrix <= matrixCount - chainLength + 1; startMatrix++) {
                const endMatrix = startMatrix + chainLength - 1

                costTable[startMatrix][endMatrix] = Infinity

                // Coba semua posisi split k antara startMatrix dan endMatrix
                for (let splitPoint = startMatrix; splitPoint < endMatrix; splitPoint++) {
                    const operationCount =
                        costTable[startMatrix][splitPoint] +
                        costTable[splitPoint + 1][endMatrix] +
                        dimensions[startMatrix - 1] * dimensions[splitPoint] * dimensions[endMatrix]

                    if (operationCount < costTable[startMatrix][endMatrix]) {
                        costTable[startMatrix][endMatrix] = operationCount
                    }
                }
            }
        }

        return costTable[1][matrixCount]
    }
}
