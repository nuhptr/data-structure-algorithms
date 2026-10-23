const numbers = [1, 2, 3, 4, 5]

// FUNCTION 1
const getElement = (arr: number[], index: number): number => {
   return arr[index]
}

console.log(getElement(numbers, 2)) // Output: 3
console.log(performance.now().toFixed(2)) // Output: Time taken to execute the function in milliseconds
