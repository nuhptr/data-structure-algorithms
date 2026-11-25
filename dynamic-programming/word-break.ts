import { IWordBreakSolver } from "./interfaces";

/**
 * Word Break — menentukan apakah string dapat disegmentasi menjadi
 * satu atau lebih kata yang ada di kamus menggunakan Dynamic Programming.
 *
 * Kompleksitas canBreak    : O(n² × m) — n=panjang string, m=ukuran kamus
 * Kompleksitas findAllBreaks : O(2^n) — worst case semua segmentasi valid
 * Kompleksitas Ruang      : O(n)
 *
 * Digunakan oleh: Google, Meta, Amazon dalam proses tokenisasi.
 *
 * @example
 * const solver = new WordBreakSolver();
 * solver.canBreak("leetcode", ["leet", "code"]); // => true
 * solver.findAllBreaks("catsanddog", ["cat","cats","and","sand","dog"]);
 * // => ["cat sand dog", "cats and dog"]
 */
export class WordBreakSolver implements IWordBreakSolver {
  canBreak(s: string, wordDict: string[]): boolean {
    const wordSet = new Set(wordDict);
    const length = s.length;
    // dp[i] = true jika s[0..i-1] dapat dibentuk dari kamus
    const dp = Array(length + 1).fill(false);
    dp[0] = true;

    for (let endIndex = 1; endIndex <= length; endIndex++) {
      for (let startIndex = 0; startIndex < endIndex; startIndex++) {
        if (dp[startIndex] && wordSet.has(s.slice(startIndex, endIndex))) {
          dp[endIndex] = true;
          break;
        }
      }
    }

    return dp[length];
  }

  findAllBreaks(s: string, wordDict: string[]): string[] {
    const wordSet = new Set(wordDict);
    const memo = new Map<number, string[]>();

    const backtrack = (startIndex: number): string[] => {
      if (memo.has(startIndex)) return memo.get(startIndex)!;
      if (startIndex === s.length) return [""];

      const results: string[] = [];

      for (let endIndex = startIndex + 1; endIndex <= s.length; endIndex++) {
        const word = s.slice(startIndex, endIndex);

        if (wordSet.has(word)) {
          const remainingBreaks = backtrack(endIndex);

          for (const remaining of remainingBreaks) {
            results.push(remaining.length === 0 ? word : `${word} ${remaining}`);
          }
        }
      }

      memo.set(startIndex, results);
      return results;
    };

    return backtrack(0);
  }
}
