/**
 * Finds all unique pairs of numbers in an array.
 *
 * This function uses nested loops, so it checks every element against every later element.
 * That creates quadratic time complexity: O(n^2).
 *
 * A smaller O(n) loop is also included for printing separators, but since O(n^2) grows
 * much faster, the dominant term determines the overall complexity.
 *
 * @param arr The array to analyze for pairs.
 */
function findPairs(arr: Array<number>) {
    // O(n^2)
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            console.log(`Pair: ${arr[i]}, ${arr[j]}`)
        }
    }

    // O(n)
    for (let q = 0; q < 5; q++) console.log("-------------", q)
}

const arrayNumber = [1, 2, 3, 4, 5]
findPairs(arrayNumber)
// ------------------------------------
