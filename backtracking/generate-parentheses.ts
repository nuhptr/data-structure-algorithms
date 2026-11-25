import { IParenthesesGenerator } from "./interfaces";

/**
 * Generate Parentheses — menghasilkan semua kombinasi tanda kurung
 * yang valid untuk n pasang menggunakan backtracking.
 *
 * Kompleksitas Waktu : O(4^n / √n) — Catalan number
 * Kompleksitas Ruang : O(n) — kedalaman rekursi
 *
 * @example
 * const generator = new ParenthesesGenerator();
 * generator.generate(3);
 * // => ["((()))", "(()())", "(())()", "()(())", "()()()"]
 */
export class ParenthesesGenerator implements IParenthesesGenerator {
  generate(pairCount: number): string[] {
    const results: string[] = [];

    const buildParentheses = (
      current: string,
      openCount: number,
      closeCount: number
    ): void => {
      const isComplete = openCount === pairCount && closeCount === pairCount;

      if (isComplete) {
        results.push(current);
        return;
      }

      const canAddOpen = openCount < pairCount;
      const canAddClose = closeCount < openCount;

      if (canAddOpen) {
        buildParentheses(current + "(", openCount + 1, closeCount);
      }

      if (canAddClose) {
        buildParentheses(current + ")", openCount, closeCount + 1);
      }
    };

    buildParentheses("", 0, 0);
    return results;
  }
}
