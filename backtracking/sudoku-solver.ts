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
    /** Dimensi standar papan Sudoku (9×9). */
    private static readonly BOARD_SIZE = 9
    /** Ukuran sisi setiap sub-kotak (3×3). */
    private static readonly BOX_SIZE = 3
    /** Nilai penanda sel yang belum diisi. */
    private static readonly EMPTY_CELL = 0

    /**
     * Menyelesaikan papan Sudoku secara in-place menggunakan backtracking.
     *
     * @param board - Matriks 9×9 papan Sudoku dengan `0` sebagai sel kosong.
     * @returns `true` jika solusi valid ditemukan, atau `false` jika tidak ada solusi.
     */
    solve(board: number[][]): boolean {
        const emptyCell = this.findEmptyCell(board)

        if (emptyCell === null) return true // papan sudah penuh dan valid

        const [row, col] = emptyCell

        // Coba setiap digit 1..9 pada sel kosong pertama yang ditemukan
        for (let digit = 1; digit <= SudokuSolver.BOARD_SIZE; digit++) {
            if (this.isValidPlacement(board, row, col, digit)) {
                board[row][col] = digit

                if (this.solve(board)) return true

                board[row][col] = SudokuSolver.EMPTY_CELL // backtrack
            }
        }

        return false // tidak ada digit yang valid, trigger backtrack
    }

    /**
     * Mencari koordinat sel kosong pertama secara berurutan dari kiri atas ke kanan bawah.
     *
     * @param board - Matriks 9×9 papan Sudoku.
     * @returns Tuple `[row, col]` sel kosong pertama, atau `null` jika papan sudah penuh.
     */
    private findEmptyCell(board: number[][]): [number, number] | null {
        for (let row = 0; row < SudokuSolver.BOARD_SIZE; row++) {
            for (let col = 0; col < SudokuSolver.BOARD_SIZE; col++) {
                if (board[row][col] === SudokuSolver.EMPTY_CELL) return [row, col]
            }
        }
        return null
    }

    /**
     * Memeriksa apakah penempatan `digit` pada `(row, col)` memenuhi aturan baris, kolom, dan kotak 3×3.
     *
     * @param board - Matriks 9×9 papan Sudoku.
     * @param row - Indeks baris sel target.
     * @param col - Indeks kolom sel target.
     * @param digit - Digit kandidat (1..9).
     * @returns `true` jika digit valid ditempatkan pada sel tersebut.
     */
    private isValidPlacement(board: number[][], row: number, col: number, digit: number): boolean {
        return (
            !this.isInRow(board, row, digit) &&
            !this.isInCol(board, col, digit) &&
            !this.isInBox(board, row, col, digit)
        )
    }

    /**
     * Memeriksa apakah `digit` sudah ada pada baris tertentu.
     *
     * @param board - Matriks 9×9 papan Sudoku.
     * @param row - Indeks baris yang diperiksa.
     * @param digit - Digit yang dicari.
     * @returns `true` jika `digit` sudah muncul di baris tersebut.
     */
    private isInRow(board: number[][], row: number, digit: number): boolean {
        return board[row].includes(digit)
    }

    /**
     * Memeriksa apakah `digit` sudah ada pada kolom tertentu.
     *
     * @param board - Matriks 9×9 papan Sudoku.
     * @param col - Indeks kolom yang diperiksa.
     * @param digit - Digit yang dicari.
     * @returns `true` jika `digit` sudah muncul di kolom tersebut.
     */
    private isInCol(board: number[][], col: number, digit: number): boolean {
        for (let row = 0; row < SudokuSolver.BOARD_SIZE; row++) {
            if (board[row][col] === digit) return true
        }
        return false
    }

    /**
     * Memeriksa apakah `digit` sudah ada di dalam sub-kotak 3×3 yang memuat `(row, col)`.
     *
     * @param board - Matriks 9×9 papan Sudoku.
     * @param row - Indeks baris sel acuan.
     * @param col - Indeks kolom sel acuan.
     * @param digit - Digit yang dicari.
     * @returns `true` jika `digit` sudah muncul di sub-kotak 3×3 tersebut.
     */
    private isInBox(board: number[][], row: number, col: number, digit: number): boolean {
        // Hitung koordinat sudut kiri atas dari sub-kotak 3×3
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
