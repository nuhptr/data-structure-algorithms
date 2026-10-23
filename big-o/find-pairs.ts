// FUNCTION 1
const findPairs = (arr: number[]) => {
   // O(n^2) time complexity
   for (let i of arr) {
      for (let j of arr) {
         if (i + j === 10) {
            console.log(`Pair found: (${i}, ${j})`)
         }
      }
   }
}

// FUNCTION 2 (OPTIMIZED)
const findPairsOptimized = (arr: number[]) => {
   for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
         if (arr[i] + arr[j] === 10) {
            console.log(`Pair found: (${arr[i]}, ${arr[j]})`)
         }
      }
   }
}

const arrayNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(findPairs(arrayNumber)) // Output: Pair found: (1, 9), Pair found: (2, 8), Pair found: (3, 7), Pair found: (4, 6), Pair found: (5, 5)
console.log(performance.now().toFixed(2)) // Output: Time taken to execute the function

console.log(findPairsOptimized(arrayNumber)) // Output: Pair found: (1, 9), Pair found: (2, 8), Pair found: (3, 7), Pair found: (4, 6), Pair found: (5, 5)
console.log(performance.now().toFixed(2)) // Output: Time taken to execute the function
