import { IWordSearch } from "./interfaces"

/**
 * Word Search — mencari apakah sebuah kata ada di dalam grid karakter 2D.
 * Kata dapat dibentuk dari huruf-huruf yang berdekatan (atas, bawah, kiri, kanan).
 * Setiap sel hanya boleh digunakan sekali per pencarian.
 *
 * Kompleksitas Waktu : O(M × N × 4^L) — M×N ukuran grid, L panjang kata
 * Kompleksitas Ruang : O(L) — kedalaman rekursi (panjang kata)
 *
 * @example
 * const searcher = new WordSearch();
 * const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
 * searcher.exists(board, "ABCCED"); // => true
 * searcher.exists(board, "SEE");    // => true
 * searcher.exists(board, "ABCB");   // => false
 */
export class WordSearch implements IWordSearch {
    /** Empat arah pergerakan bertetangga: atas, bawah, kiri, kanan. */
    private static readonly DIRECTIONS = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ] as const
    /** Penanda sementara untuk sel yang sedang digunakan pada jalur DFS aktif. */
    private static readonly VISITED_MARKER = "#"

    /**
     * Memeriksa apakah `word` dapat ditemukan pada grid karakter 2D.
     *
     * @param board - Grid karakter 2D.
     * @param word - Kata yang dicari.
     * @returns `true` jika kata ditemukan, atau `false` jika tidak ada jalur yang cocok.
     */
    exists(board: string[][], word: string): boolean {
        const rows = board.length
        const cols = board[0].length

        // Mulai DFS dari setiap sel yang cocok dengan karakter pertama kata
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (board[row][col] === word[0]) {
                    if (this.dfs(board, row, col, word, 0)) return true
                }
            }
        }

        return false
    }

    /**
     * Menelusuri jalur DFS secara rekursif untuk mencocokkan karakter kata mulai dari `charIndex`.
     *
     * @param board - Grid karakter 2D (dimodifikasi sementara lalu dipulihkan).
     * @param row - Indeks baris sel saat ini.
     * @param col - Indeks kolom sel saat ini.
     * @param word - Kata target yang dicari.
     * @param charIndex - Indeks karakter yang sedang dicocokkan.
     * @returns `true` jika sisa karakter kata berhasil dicocokkan dari posisi ini.
     */
    private dfs(
        board: string[][],
        row: number,
        col: number,
        word: string,
        charIndex: number,
    ): boolean {
        // Basis rekursi: seluruh karakter kata telah cocok
        if (charIndex === word.length) return true

        const rows = board.length
        const cols = board[0].length
        const isOutOfBounds = row < 0 || row >= rows || col < 0 || col >= cols

        // Hentikan cabang jika keluar batas grid atau karakter tidak sesuai
        if (isOutOfBounds || board[row][col] !== word[charIndex]) return false

        // Tandai sel sebagai sudah dikunjungi
        const originalChar = board[row][col]
        board[row][col] = WordSearch.VISITED_MARKER

        // Eksplorasi keempat sel tetangga untuk karakter berikutnya
        for (const [deltaRow, deltaCol] of WordSearch.DIRECTIONS) {
            if (this.dfs(board, row + deltaRow, col + deltaCol, word, charIndex + 1)) {
                board[row][col] = originalChar // restore sebelum return
                return true
            }
        }

        board[row][col] = originalChar // backtrack
        return false
    }
}
