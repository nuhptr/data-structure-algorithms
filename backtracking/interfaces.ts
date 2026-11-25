/**
 * Kontrak untuk generator kombinasi angka.
 */
export interface ICombinationGenerator {
  generate(n: number, k: number): number[][];
}

/**
 * Kontrak untuk generator parentheses.
 */
export interface IParenthesesGenerator {
  generate(pairCount: number): string[];
}

/**
 * Kontrak untuk solver N-Queens.
 */
export interface INQueensSolver {
  solve(boardSize: number): number[][];
}

/**
 * Kontrak untuk generator permutasi.
 */
export interface IPermutationGenerator {
  generate(nums: number[]): number[][];
}

/**
 * Kontrak untuk solver Sudoku.
 */
export interface ISudokuSolver {
  solve(board: number[][]): boolean;
}

/**
 * Kontrak untuk solver Subset Sum.
 */
export interface ISubsetSumSolver {
  findAll(nums: number[], target: number): number[][];
}

/**
 * Kontrak untuk Word Search pada grid.
 */
export interface IWordSearch {
  exists(board: string[][], word: string): boolean;
}
