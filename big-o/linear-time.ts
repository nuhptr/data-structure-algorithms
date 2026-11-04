/**
 * Searches the grocery list for a specific item.
 *
 * This example demonstrates linear time complexity: the function checks each element
 * in the array one by one, so the work grows in proportion to the list size.
 *
 * The loop runs twice, which is still O(n) because constants are ignored in Big O notation.
 *
 * @param item The item to look for in the grocery list.
 */
const groceries: Array<string> = ["milk", "bread", "eggs", "flour", "cheese", "sugar"]

const searchForItem = (item: string) => {
    for (let i = 0; i < groceries.length; i++) {
        if (groceries[i] === item) console.log(`Found ${item}`)
    }

    for (let j = 0; j < groceries.length; j++) {
        if (groceries[j] === item) console.log(`Found ${item} 2`)
    }

    // n + n = 2n -> O(2n)
    // Drop the constant so it becomes O(n)
}

searchForItem("eggs")
