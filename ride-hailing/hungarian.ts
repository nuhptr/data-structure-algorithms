import { MatchingPair, IHungarianAlgorithm } from "./interfaces";

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
  match(costMatrix: number[][]): MatchingPair[] {
    const rowCount = costMatrix.length;
    const colCount = costMatrix[0]?.length ?? 0;

    if (rowCount === 0 || colCount === 0) return [];

    // Buat square matrix — padding dengan nilai besar jika tidak persegi
    const size = Math.max(rowCount, colCount);
    const matrix = this.buildSquareMatrix(costMatrix, size);

    // Step 1: Kurangi setiap baris dengan nilai minimum barisnya
    this.reduceRows(matrix, size);

    // Step 2: Kurangi setiap kolom dengan nilai minimum kolomnya
    this.reduceColumns(matrix, size);

    const rowCovered = Array(size).fill(false);
    const colCovered = Array(size).fill(false);
    const assignment = Array(size).fill(-1); // assignment[row] = col

    let coveredCount = this.findInitialAssignment(matrix, size, assignment, rowCovered, colCovered);

    while (coveredCount < size) {
      this.augmentMatrix(matrix, size, assignment, rowCovered, colCovered);
      rowCovered.fill(false);
      colCovered.fill(false);
      coveredCount = this.findInitialAssignment(matrix, size, assignment, rowCovered, colCovered);
    }

    // Susun hasil — hanya untuk baris dan kolom yang ada di matrix asli
    const result: MatchingPair[] = [];
    for (let passengerIndex = 0; passengerIndex < rowCount; passengerIndex++) {
      const driverIndex = assignment[passengerIndex];
      if (driverIndex < colCount) {
        result.push({
          passengerIndex,
          driverIndex,
          cost: costMatrix[passengerIndex][driverIndex],
        });
      }
    }

    return result;
  }

  private buildSquareMatrix(costMatrix: number[][], size: number): number[][] {
    const BIG_NUMBER = 1e9;
    return Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (__, col) =>
        row < costMatrix.length && col < (costMatrix[0]?.length ?? 0)
          ? costMatrix[row][col]
          : BIG_NUMBER
      )
    );
  }

  private reduceRows(matrix: number[][], size: number): void {
    for (let row = 0; row < size; row++) {
      const rowMin = Math.min(...matrix[row]);
      for (let col = 0; col < size; col++) {
        matrix[row][col] -= rowMin;
      }
    }
  }

  private reduceColumns(matrix: number[][], size: number): void {
    for (let col = 0; col < size; col++) {
      let colMin = Infinity;
      for (let row = 0; row < size; row++) colMin = Math.min(colMin, matrix[row][col]);
      for (let row = 0; row < size; row++) matrix[row][col] -= colMin;
    }
  }

  private findInitialAssignment(
    matrix: number[][],
    size: number,
    assignment: number[],
    rowCovered: boolean[],
    colCovered: boolean[]
  ): number {
    assignment.fill(-1);
    const colAssigned = Array(size).fill(-1);

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (matrix[row][col] === 0 && !colCovered[col] && assignment[row] === -1) {
          assignment[row] = col;
          colAssigned[col] = row;
          rowCovered[row] = true;
          colCovered[col] = true;
          break;
        }
      }
    }

    return rowCovered.filter(Boolean).length;
  }

  private augmentMatrix(
    matrix: number[][],
    size: number,
    assignment: number[],
    rowCovered: boolean[],
    colCovered: boolean[]
  ): void {
    // Temukan nilai minimum di sel yang tidak tertutup
    let minUncovered = Infinity;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!rowCovered[row] && !colCovered[col]) {
          minUncovered = Math.min(minUncovered, matrix[row][col]);
        }
      }
    }

    // Kurangi sel tidak tertutup, tambah sel yang tertutup dua kali
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!rowCovered[row] && !colCovered[col]) {
          matrix[row][col] -= minUncovered;
        } else if (rowCovered[row] && colCovered[col]) {
          matrix[row][col] += minUncovered;
        }
      }
    }
  }
}
