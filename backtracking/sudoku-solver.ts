import { ISudokuSolver } from "./interfaces"

/**
 * Sudoku Solver — mengisi papan Sudoku 9×9 menggunakan backtracking.
 * 0 merepresentasikan sel kosong. Papan dimodifikasi in-place.
 *
 * Kompleksitas Waktu : O(9^M) — M = jumlah sel kosong (worst case)
 * Kompleksitas Ruang : O(M) — kedalaman rekursi
 *
 * @example
 * const solver = new SudokuSolver();
 * const board = [
 *   [5,3,0, 0,7,0, 0,0,0],
 *   [6,0,0, 1,9,5, 0,0,0],
 *   ...
 * ];
 * solver.solve(board); // => true, board diisi in-place
 */
export class SudokuSolver implements ISudokuSolver {
    private static readonly BOARD_SIZE = 9
    private static readonly BOX_SIZE = 3
    private static readonly EMPTY_CELL = 0

    solve(board: number[][]): boolean {
        const emptyCell = this.findEmptyCell(board)

        if (emptyCell === null) return true // papan sudah penuh dan valid

        const [row, col] = emptyCell

        for (let digit = 1; digit <= SudokuSolver.BOARD_SIZE; digit++) {
            if (this.isValidPlacement(board, row, col, digit)) {
                board[row][col] = digit

                if (this.solve(board)) return true

                board[row][col] = SudokuSolver.EMPTY_CELL // backtrack
            }
        }

        return false // tidak ada digit yang valid, trigger backtrack
    }

    private findEmptyCell(board: number[][]): [number, number] | null {
        for (let row = 0; row < SudokuSolver.BOARD_SIZE; row++) {
            for (let col = 0; col < SudokuSolver.BOARD_SIZE; col++) {
                if (board[row][col] === SudokuSolver.EMPTY_CELL) return [row, col]
            }
        }
        return null
    }

    private isValidPlacement(board: number[][], row: number, col: number, digit: number): boolean {
        return (
            !this.isInRow(board, row, digit) &&
            !this.isInCol(board, col, digit) &&
            !this.isInBox(board, row, col, digit)
        )
    }

    private isInRow(board: number[][], row: number, digit: number): boolean {
        return board[row].includes(digit)
    }

    private isInCol(board: number[][], col: number, digit: number): boolean {
        for (let row = 0; row < SudokuSolver.BOARD_SIZE; row++) {
            if (board[row][col] === digit) return true
        }
        return false
    }

    private isInBox(board: number[][], row: number, col: number, digit: number): boolean {
        const boxRowStart = Math.floor(row / SudokuSolver.BOX_SIZE) * SudokuSolver.BOX_SIZE
        const boxColStart = Math.floor(col / SudokuSolver.BOX_SIZE) * SudokuSolver.BOX_SIZE

        for (let r = boxRowStart; r < boxRowStart + SudokuSolver.BOX_SIZE; r++) {
            for (let c = boxColStart; c < boxColStart + SudokuSolver.BOX_SIZE; c++) {
                if (board[r][c] === digit) return true
            }
        }

        return false
    }
}
