const numbers = [1, 2, 3, 4, 5]

/**
 * Returns the element at a specific index in an array.
 * This operation is constant time because it directly accesses a memory location
 * without scanning the rest of the array.
 *
 * @param arr The array to read from.
 * @param index The zero-based index of the desired element.
 * @returns The value stored at the specified index.
 */
function getElement(arr: Array<number>, index: number) {
    return arr[index]
}

console.log(getElement(numbers, 0))
