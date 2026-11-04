/**
 * Reverses the characters in a string by converting it into an array,
 * reversing the array order, and then joining it back into a string.
 *
 * @param string - The input text to reverse.
 * @returns A new string with the characters in reverse order.
 */
function reverseString(string: string) {
   const text = string.split("").reverse().join("")
   return text
}

// Example usage: reverses "hello" to "olleh".
console.log(reverseString("hello"))
