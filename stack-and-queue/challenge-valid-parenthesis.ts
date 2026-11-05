/** Periksa apakah setiap tanda kurung memiliki pasangan dengan urutan yang benar. */
function isValidParenthesis(string: string): boolean {
    /** Simpan tanda kurung buka sampai pasangan penutupnya ditemukan. */
    const stack: string[] = []

    /** Petakan setiap tanda kurung buka ke pasangan penutupnya. */
    const brackets: Record<string, string> = {
        "{": "}",
        "[": "]",
        "(": ")",
    }

    /** Periksa setiap karakter sesuai urutannya di dalam string. */
    for (const char of string) {
        /** Tanda kurung buka disimpan untuk dicocokkan dengan penutup berikutnya. */
        if (Object.prototype.hasOwnProperty.call(brackets, char)) {
            stack.push(char)
        } else {
            /** Ambil tanda buka terakhir karena pasangan harus mengikuti urutan LIFO. */
            const top = stack.pop()
            /** Gagal jika tidak ada pembuka atau jenis pasangannya tidak cocok. */
            if (!top || brackets[top] !== char) return false
        }
    }

    /** Valid jika semua tanda buka sudah memiliki pasangan penutup. */
    return stack.length === 0
}

/** Contoh valid: setiap pasangan tersusun dengan benar. */
console.log(isValidParenthesis("(){}[]"))
/** Contoh tidak valid: urutan pasangan saling menyilang. */
console.log(isValidParenthesis("([)]"))
/** Contoh valid dengan satu pasangan lengkap. */
console.log(isValidParenthesis("()"))
/** Contoh tidak valid: tanda kurung buka tidak memiliki penutup. */
console.log(isValidParenthesis("("))
