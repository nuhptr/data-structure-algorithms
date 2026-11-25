import { IWordSearch } from "./interfaces";

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
  private static readonly DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]] as const;
  private static readonly VISITED_MARKER = "#";

  exists(board: string[][], word: string): boolean {
    const rows = board.length;
    const cols = board[0].length;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (board[row][col] === word[0]) {
          if (this.dfs(board, row, col, word, 0)) return true;
        }
      }
    }

    return false;
  }

  private dfs(
    board: string[][],
    row: number,
    col: number,
    word: string,
    charIndex: number
  ): boolean {
    if (charIndex === word.length) return true;

    const rows = board.length;
    const cols = board[0].length;
    const isOutOfBounds = row < 0 || row >= rows || col < 0 || col >= cols;

    if (isOutOfBounds || board[row][col] !== word[charIndex]) return false;

    // Tandai sel sebagai sudah dikunjungi
    const originalChar = board[row][col];
    board[row][col] = WordSearch.VISITED_MARKER;

    for (const [deltaRow, deltaCol] of WordSearch.DIRECTIONS) {
      if (this.dfs(board, row + deltaRow, col + deltaCol, word, charIndex + 1)) {
        board[row][col] = originalChar; // restore sebelum return
        return true;
      }
    }

    board[row][col] = originalChar; // backtrack
    return false;
  }
}
