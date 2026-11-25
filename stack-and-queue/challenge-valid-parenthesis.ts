import { IParenthesisValidator } from "./interfaces"

/**
 * Parenthesis Validator — memeriksa apakah setiap tanda kurung
 * ((), [], {}) memiliki pasangan dengan urutan yang benar.
 *
 * Stack menyimpan tanda buka; tanda tutup harus cocok dengan
 * tanda buka paling terakhir (aturan LIFO).
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const validator = new ParenthesisValidator();
 * validator.isValid("(){}[]"); // => true
 * validator.isValid("([)]");   // => false
 */
export class ParenthesisValidator implements IParenthesisValidator {
    /** Petakan setiap tanda buka ke pasangan penutupnya. */
    private static readonly BRACKETS: Record<string, string> = {
        "{": "}",
        "[": "]",
        "(": ")",
    }

    isValid(input: string): boolean {
        const stack: string[] = []
        const brackets = ParenthesisValidator.BRACKETS

        for (const char of input) {
            if (Object.prototype.hasOwnProperty.call(brackets, char)) {
                stack.push(char)
            } else {
                const top = stack.pop()
                if (!top || brackets[top] !== char) return false
            }
        }

        return stack.length === 0
    }
}
