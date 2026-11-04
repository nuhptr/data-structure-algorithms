class ReverseNode<T> {
    // The value stored in this node.
    head: T
    // The next node, or null if this is the last node in the list.
    next: ReverseNode<T> | null

    constructor(value: T) {
        // Store the value and start without a connection to another node.
        this.head = value
        this.next = null
    }
}

class ReverseLinkedList<T> {
    // The first node in the list.
    head: ReverseNode<T>
    // The last node in the list.
    tail: ReverseNode<T>
    // The number of nodes in the list.
    length: number

    /**
     * Creates a list with one initial node.
     *
     * @param value The value for the first node.
     */
    constructor(value: T) {
        // Create the first node; it serves as both the head and the tail.
        this.head = new ReverseNode(value)
        this.tail = this.head
        this.length = 1
    }

    /**
     * Appends a new node to the end of the list.
     *
     * Time complexity: O(1), since a tail reference is maintained.
     *
     * @param value The value to append.
     */
    push(value: T) {
        // Create a new node that is not connected to another node yet.
        let newNode = new ReverseNode(value)

        // This branch handles an empty list.
        // The current constructor always creates an initial node, so this
        // condition does not occur during normal use.
        if (!this.head) {
            this.head = newNode
            this.tail = newNode
        }

        // Link the previous last node to the new node.
        this.tail.next = newNode
        // Update the tail to point to the newly appended node.
        this.tail = newNode
        // Update the node count after appending.
        this.length++
    }

    /**
     * Reverses the list by reversing the links between its nodes.
     *
     * Time complexity: O(n), where n is the number of nodes.
     * Additional space complexity: O(1).
     *
     * @returns The same list with its order reversed.
     */
    reverse() {
        // Save the old head, which will become the tail.
        let temp = this.head
        // The old tail becomes the new head.
        this.head = this.tail
        // The old head becomes the new tail.
        this.tail = temp

        // `next` stores the next node before its link is reversed.
        let next = temp
        // `prev` is the previous node in the order being reversed.
        let prev = null

        // Process each node once, based on the list's length.
        for (let i = 0; i < this.length; i++) {
            // Save the next node so it remains reachable after changing the link.
            next = temp.next!
            // Reverse the current node's link to point to the previous node.
            temp.next = prev

            // Move `prev` to the current node.
            prev = temp
            // Continue with the previously saved next node.
            temp = next
        }

        // Return the same list after reversing all links.
        return this
    }
}

// Create the initial list: 1 -> 2 -> 3 -> 4.
const myLinkedList = new ReverseLinkedList(1)
myLinkedList.push(2)
myLinkedList.push(3)
myLinkedList.push(4)
// Reverse the list; its order becomes 4 -> 3 -> 2 -> 1.
console.log(myLinkedList.reverse())
