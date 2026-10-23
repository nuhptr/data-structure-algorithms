const groceries = ["milk", "bread", "eggs", "cheese", "fruits", "vegetables"]

const searchItem = (item: string) => {
   for (let i = 0; i < groceries.length; i++) {
      if (groceries[i].toLowerCase().includes(item.toLowerCase().trim())) {
         return `Item ${item} found at index ${i}.`
      }
   }
   return `Item ${item} not found.`
}

// CALL FUNCTIONS
console.log(searchItem("eggs")) // Item eggs found at index 2.
console.log(searchItem("bread")) // Item bread found at index 1.
console.log(searchItem("chocolate")) // Item chocolate not found.

// SHOW TIMES FOR RUNNING
const startTime = performance.now().toFixed(2)
searchItem("milk")
searchItem("cheese")
searchItem("fruits")
const endTime = performance.now().toFixed(2)
console.log(
   `Time taken to run the searchItem function: ${(parseFloat(endTime) - parseFloat(startTime)).toFixed(2)} milliseconds.`,
) // Time taken to run the searchItem function: 0.00 milliseconds.

console.log("============================")

// OTHER FUNCTION (THIS ONES MUCH BETTER)
const searchItem2 = (item: string) => {
   const foundIndex = groceries.findIndex((grocery) =>
      grocery.toLowerCase().includes(item.toLowerCase().trim()),
   )

   if (foundIndex !== -1) {
      return `Item ${item} found at index ${foundIndex}.`
   }

   return `Item ${item} not found.`
}

// CALL FUNCTIONS
console.log(searchItem2("eggs")) // Item eggs found at index 2.
console.log(searchItem2("bread")) // Item bread found at index 1.
console.log(searchItem2("chocolate")) // Item chocolate not found.

// SHOW TIMES FOR RUNNING
const startTime2 = performance.now().toFixed(2)
searchItem2("milk")
searchItem2("cheese")
searchItem2("fruits")
const endTime2 = performance.now().toFixed(2)
console.log(
   `Time taken to run the searchItem2 function: ${(parseFloat(endTime2) - parseFloat(startTime2)).toFixed(2)} milliseconds.`,
) // Time taken to run the searchItem2 function: 0.00 milliseconds.
