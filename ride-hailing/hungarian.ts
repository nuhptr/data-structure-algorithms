import { MatchingPair, IHungarianAlgorithm } from "./interfaces"

/**
 * Hungarian Algorithm — menyelesaikan Assignment Problem secara optimal.
 * Digunakan ride-hailing untuk memasangkan penumpang dengan driver
 * dengan total biaya (waktu tunggu, jarak) minimum.
 *
 * Kompleksitas Waktu : O(n³)
 * Kompleksitas Ruang : O(n²)
 *
 * @example
 * const hungarian = new HungarianAlgorithm();
 * const costMatrix = [
 *   [2, 3, 7],  // penumpang 0 ke driver 0,1,2
 *   [6, 4, 3],  // penumpang 1 ke driver 0,1,2
 *   [8, 5, 2],  // penumpang 2 ke driver 0,1,2
 * ];
 * hungarian.match(costMatrix);
 * // => [{ passengerIndex:0, driverIndex:0, cost:2 }, ...]  total = 8
 */
export class HungarianAlgorithm implements IHungarianAlgorithm {
    /**
     * Menentukan pasangan optimal antara penumpang (baris) dan driver (kolom)
     * untuk meminimalkan total biaya penugasan.
     *
     * @param costMatrix - Matriks biaya 2D berukuran `rowCount × colCount`.
     * @returns Daftar pasangan `MatchingPair` optimal untuk matriks asli.
     */
    match(costMatrix: number[][]): MatchingPair[] {
        const rowCount = costMatrix.length
        const colCount = costMatrix[0]?.length ?? 0

        if (rowCount === 0 || colCount === 0) return []

        // Buat square matrix — padding dengan nilai besar jika tidak persegi
        const size = Math.max(rowCount, colCount)
        const matrix = this.buildSquareMatrix(costMatrix, size)

        // Step 1: Kurangi setiap baris dengan nilai minimum barisnya
        this.reduceRows(matrix, size)

        // Step 2: Kurangi setiap kolom dengan nilai minimum kolomnya
        this.reduceColumns(matrix, size)

        const rowCovered = Array(size).fill(false)
        const colCovered = Array(size).fill(false)
        const assignment = Array(size).fill(-1) // assignment[row] = col

        let coveredCount = this.findInitialAssignment(
            matrix,
            size,
            assignment,
            rowCovered,
            colCovered,
        )

        // Ulangi augmentasi matriks hingga jumlah penugasan independen mencapai `size`
        while (coveredCount < size) {
            this.augmentMatrix(matrix, size, assignment, rowCovered, colCovered)
            rowCovered.fill(false)
            colCovered.fill(false)
            coveredCount = this.findInitialAssignment(
                matrix,
                size,
                assignment,
                rowCovered,
                colCovered,
            )
        }

        // Susun hasil — hanya untuk baris dan kolom yang ada di matrix asli (abaikan padding)
        const result: MatchingPair[] = []
        for (let passengerIndex = 0; passengerIndex < rowCount; passengerIndex++) {
            const driverIndex = assignment[passengerIndex]
            if (driverIndex < colCount) {
                result.push({
                    passengerIndex,
                    driverIndex,
                    cost: costMatrix[passengerIndex][driverIndex],
                })
            }
        }

        return result
    }

    /**
     * Membangun salinan matriks biaya berbentuk persegi berukuran `size × size`
     * dengan mengisi sel tambahan menggunakan nilai penalti besar (`1e9`).
     *
     * @param costMatrix - Matriks biaya asli.
     * @param size - Dimensi sisi matriks persegi (`max(rows, cols)`).
     * @returns Matriks persegi siap olah.
     */
    private buildSquareMatrix(costMatrix: number[][], size: number): number[][] {
        const BIG_NUMBER = 1e9
        return Array.from({ length: size }, (_, row) =>
            Array.from({ length: size }, (__, col) =>
                row < costMatrix.length && col < (costMatrix[0]?.length ?? 0)
                    ? costMatrix[row][col]
                    : BIG_NUMBER,
            ),
        )
    }

    /**
     * Mengurangi setiap elemen pada masing-masing baris dengan nilai minimum baris tersebut.
     *
     * @param matrix - Matriks biaya persegi yang dimutasi di tempat.
     * @param size - Dimensi matriks.
     */
    private reduceRows(matrix: number[][], size: number): void {
        for (let row = 0; row < size; row++) {
            const rowMin = Math.min(...matrix[row])
            for (let col = 0; col < size; col++) {
                matrix[row][col] -= rowMin
            }
        }
    }

    /**
     * Mengurangi setiap elemen pada masing-masing kolom dengan nilai minimum kolom tersebut.
     *
     * @param matrix - Matriks biaya persegi yang dimutasi di tempat.
     * @param size - Dimensi matriks.
     */
    private reduceColumns(matrix: number[][], size: number): void {
        for (let col = 0; col < size; col++) {
            let colMin = Infinity
            for (let row = 0; row < size; row++) colMin = Math.min(colMin, matrix[row][col])
            for (let row = 0; row < size; row++) matrix[row][col] -= colMin
        }
    }

    /**
     * Mencari penugasan nol independen secara greedy dan menandai baris serta kolom yang tertutup.
     *
     * @param matrix - Matriks biaya tereduksi.
     * @param size - Dimensi matriks.
     * @param assignment - Array penugasan `assignment[row] = col`.
     * @param rowCovered - Penanda baris yang sudah tertutup.
     * @param colCovered - Penanda kolom yang sudah tertutup.
     * @returns Jumlah baris/pasangan nol independen yang berhasil ditugaskan.
     */
    private findInitialAssignment(
        matrix: number[][],
        size: number,
        assignment: number[],
        rowCovered: boolean[],
        colCovered: boolean[],
    ): number {
        assignment.fill(-1)
        const colAssigned = Array(size).fill(-1)

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (matrix[row][col] === 0 && !colCovered[col] && assignment[row] === -1) {
                    assignment[row] = col
                    colAssigned[col] = row
                    rowCovered[row] = true
                    colCovered[col] = true
                    break
                }
            }
        }

        return rowCovered.filter(Boolean).length
    }

    /**
     * Memodifikasi matriks untuk memunculkan nol baru dengan mengurangi sel yang tidak
     * tertutup dan menambahkan nilai minimum tersebut ke sel perpotongan yang tertutup dua kali.
     *
     * @param matrix - Matriks biaya yang sedang diproses.
     * @param size - Dimensi matriks.
     * @param assignment - Array penugasan saat ini.
     * @param rowCovered - Status penutupan baris.
     * @param colCovered - Status penutupan kolom.
     */
    private augmentMatrix(
        matrix: number[][],
        size: number,
        assignment: number[],
        rowCovered: boolean[],
        colCovered: boolean[],
    ): void {
        // Temukan nilai minimum di sel yang tidak tertutup oleh garis baris maupun kolom
        let minUncovered = Infinity
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (!rowCovered[row] && !colCovered[col]) {
                    minUncovered = Math.min(minUncovered, matrix[row][col])
                }
            }
        }

        // Kurangi sel tidak tertutup, tambah sel yang tertutup dua kali
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (!rowCovered[row] && !colCovered[col]) {
                    matrix[row][col] -= minUncovered
                } else if (rowCovered[row] && colCovered[col]) {
                    matrix[row][col] += minUncovered
                }
            }
        }
    }
}
