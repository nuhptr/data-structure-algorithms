/**
 * Hasil dari algoritma Coin Change.
 */
export interface CoinChangeResult {
  /** Jumlah minimum koin yang dibutuhkan */
  minCoins: number;
  /** Koin-koin yang dipilih */
  coins: number[];
}

/**
 * Kontrak untuk solver Word Break.
 */
export interface IWordBreakSolver {
  canBreak(s: string, wordDict: string[]): boolean;
  findAllBreaks(s: string, wordDict: string[]): string[];
}

/**
 * Kontrak untuk solver Palindrome Partitioning.
 */
export interface IPalindromePartitioningSolver {
  partition(s: string): string[][];
  minCuts(s: string): number;
}

/**
 * Kontrak untuk solver Burst Balloons.
 */
export interface IBurstBalloonsSolver {
  maxCoins(nums: number[]): number;
}

/**
 * Kontrak untuk solver Regular Expression Matching.
 */
export interface IRegexMatcher {
  isMatch(s: string, pattern: string): boolean;
}

/**
 * Kontrak untuk solver Unique Paths.
 */
export interface IUniquePathsSolver {
  countPaths(m: number, n: number): number;
  countPathsWithObstacles(grid: number[][]): number;
}

/**
 * Kontrak untuk solver Coin Change.
 */
export interface ICoinChangeSolver {
  solve(targetAmount: number, availableCoins: number[]): CoinChangeResult;
}

/**
 * Kontrak untuk solver Longest Common Subsequence.
 */
export interface ILCSSolver {
  solve(text1: string, text2: string): string;
}

/**
 * Kontrak untuk solver 0/1 Knapsack.
 */
export interface IKnapsackSolver {
  solve(capacity: number, weights: number[], values: number[]): number;
}

/**
 * Kontrak untuk solver Fibonacci.
 */
export interface IFibonacciSolver {
  solve(count: number): number[];
}

/**
 * Kontrak untuk solver Edit Distance.
 */
export interface IEditDistanceSolver {
  solveBottomUp(word1: string, word2: string): number;
  solveTopDown(word1: string, word2: string): number;
}

/**
 * Kontrak untuk solver Longest Increasing Subsequence.
 */
export interface ILISSolver {
  solve(array: number[]): number[];
}

/**
 * Kontrak untuk solver Maximum Subarray Sum (Kadane's Algorithm).
 */
export interface IMaxSubarraySolver {
  solve(array: number[], allowEmpty?: boolean): number;
}

/**
 * Kontrak untuk solver Matrix Chain Multiplication.
 */
export interface IMatrixChainSolver {
  solve(dimensions: number[]): number;
}
