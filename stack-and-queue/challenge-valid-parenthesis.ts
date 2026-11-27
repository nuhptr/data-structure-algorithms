import { IParenthesisValidator } from "./interfaces"

/**
 * Parenthesis Validator — memeriksa apakah setiap tanda kurung
 * (`()`, `[]`, `{}`) memiliki pasangan dengan urutan yang benar.
 *
 * Stack menyimpan tanda buka; tanda tutup harus cocok dengan
 * tanda buka paling terakhir (aturan LIFO).
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const validator = new ParenthesisValidator()
 * validator.isValid("(){}[]") // => true
 * validator.isValid("([)]")   // => false
 */
export class ParenthesisValidator implements IParenthesisValidator {
    /** Peta setiap tanda kurung buka ke pasangan tanda kurung tutupnya. */
    private static readonly BRACKETS: Record<string, string> = {
        "{": "}",
        "[": "]",
        "(": ")",
    }

    /**
     * Memvalidasi keseimbangan dan urutan pasangan tanda kurung dalam string.
     *
     * @param input String yang hanya berisi karakter tanda kurung untuk diperiksa.
     * @returns `true` jika semua tanda kurung tertutup dengan benar, selain itu `false`.
     */
    isValid(input: string): boolean {
        const stack: string[] = []
        const brackets = ParenthesisValidator.BRACKETS

        for (const char of input) {
            // Jika karakter adalah tanda buka, simpan di stack.
            if (Object.prototype.hasOwnProperty.call(brackets, char)) {
                stack.push(char)
            } else {
                // Jika tanda tutup, pastikan cocok dengan tanda buka teratas di stack.
                const top = stack.pop()
                if (!top || brackets[top] !== char) return false
            }
        }

        // Valid hanya jika tidak ada tanda buka yang tersisa tanpa pasangan.
        return stack.length === 0
    }
}
