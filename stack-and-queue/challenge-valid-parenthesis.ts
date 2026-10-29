// Memeriksa apakah setiap tanda kurung pada string memiliki pasangan dan urutan yang benar.
function isValidParenthesis(string: string): boolean {
   // Stack menyimpan tanda kurung buka yang belum menemukan pasangan.
   const stack: string[] = []

   // Memetakan setiap tanda kurung buka ke tanda kurung tutup pasangannya.
   const brackets: Record<string, string> = {
      "{": "}",
      "[": "]",
      "(": ")",
   }

   // Periksa karakter satu per satu dari kiri ke kanan.
   for (const char of string) {
      // Jika karakter adalah tanda kurung buka, simpan untuk dicocokkan nanti.
      if (Object.prototype.hasOwnProperty.call(brackets, char)) {
         stack.push(char)
      } else {
         // Karakter selain tanda kurung buka dianggap sebagai tanda kurung tutup.
         // Ambil tanda buka terakhir karena pasangan harus mengikuti urutan LIFO.
         const top = stack.pop()

         // Tidak ada tanda buka yang cocok atau jenis pasangannya berbeda.
         if (!top || brackets[top] !== char) {
            return false
         }
      }
   }

   // Valid hanya jika tidak ada tanda kurung buka yang tersisa tanpa pasangan.
   return stack.length === 0
}

// Contoh: semua pasangan berurutan dengan benar.
console.log(isValidParenthesis("(){}[]")) // true
// Contoh: urutan pasangan salah, jadi hasilnya false.
console.log(isValidParenthesis("([)]")) // false
// Contoh: satu pasangan lengkap.
console.log(isValidParenthesis("()")) // true
// Contoh: tanda kurung buka tidak memiliki pasangan penutup.
console.log(isValidParenthesis("(")) // false
