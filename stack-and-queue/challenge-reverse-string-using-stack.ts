function reverseString(string: string): string {
   // Buat array kosong
   const stack: string[] = []

   // masukan setiap karakter ke array
   for (let char of string) {
      const everyChar = stack.push(char)
      console.log(everyChar)
   }

   // init string kosong buat nampung nilai pembalikan
   let reversedStr: string = ""

   // keluarkan karakter dari array dan buat string terbalik
   while (stack.length > 0) {
      reversedStr += stack.pop()
   }

   return reversedStr
}

const originalString = "hello world"
const reversedString = reverseString(originalString)
console.log(reversedString) // Output: dlrow olleh
