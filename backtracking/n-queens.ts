import { INQueensSolver } from "./interfaces"

/**
 * N-Queens — menempatkan N ratu di papan N×N sehingga tidak ada dua ratu
 * yang saling menyerang (baris, kolom, dan diagonal berbeda).
 *
 * Kompleksitas Waktu : O(N!) — pruning signifikan dalam praktik
 * Kompleksitas Ruang : O(N) — tiga Set untuk tracking + call stack
 *
 * Setiap solusi dikembalikan sebagai array kolom per baris:
 * result[row] = kolom tempat ratu ditempatkan pada baris tersebut.
 *
 * @example
 * const solver = new NQueensSolver();
 * solver.solve(4);
 * => [[1,3,0,2], [2,0,3,1]]
 */
export class NQueensSolver implements INQueensSolver {
    /**
     * Mencari semua solusi penempatan ratu pada papan berukuran `boardSize × boardSize`.
     *
     * @param boardSize - Ukuran papan catur sekaligus jumlah ratu yang ditempatkan.
     * @returns Daftar semua konfigurasi valid; tiap elemen berisi kolom ratu per baris.
     */
    solve(boardSize: number): number[][] {
        const solutions: number[][] = []
        const queenColumns: number[] = []

        // Set pelacak ancaman kolom dan kedua arah diagonal dalam O(1)
        const occupiedColumns = new Set<number>()
        const occupiedDiagonals = new Set<number>() // row - col
        const occupiedAntiDiagonals = new Set<number>() // row + col

        const placeQueens = (row: number): void => {
            // Basis rekursi: seluruh baris telah terisi ratu tanpa konflik
            if (row === boardSize) {
                solutions.push([...queenColumns])
                return
            }

            for (let col = 0; col < boardSize; col++) {
                const diagonal = row - col
                const antiDiagonal = row + col

                // Lewati kolom yang sedang berada dalam jalur serang ratu sebelumnya
                const isAttacked =
                    occupiedColumns.has(col) ||
                    occupiedDiagonals.has(diagonal) ||
                    occupiedAntiDiagonals.has(antiDiagonal)

                if (isAttacked) continue

                // Tempatkan ratu
                occupiedColumns.add(col)
                occupiedDiagonals.add(diagonal)
                occupiedAntiDiagonals.add(antiDiagonal)
                queenColumns.push(col)

                placeQueens(row + 1)

                // Cabut penempatan (backtrack)
                occupiedColumns.delete(col)
                occupiedDiagonals.delete(diagonal)
                occupiedAntiDiagonals.delete(antiDiagonal)
                queenColumns.pop()
            }
        }

        placeQueens(0)
        return solutions
    }
}
