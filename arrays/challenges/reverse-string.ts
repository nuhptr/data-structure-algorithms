// 1. Convert string to array (split method)
// 2. Reverse the array (reverse method)
// 3. Convert array back to string (join method)

function reverseString(string: string) {
   const text = string.split("").reverse().join("")
   return text
}

console.log(reverseString("hello"))
