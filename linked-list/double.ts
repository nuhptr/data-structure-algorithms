import { IDoublyLinkedList, IDoublyLinkedNode } from "./interfaces"

/** Node doubly linked list — terhubung ke node sebelum dan sesudahnya. */
export class DoublyLinkedListNode<T> implements IDoublyLinkedNode<T> {
    value: T
    next: DoublyLinkedListNode<T> | null = null
    prev: DoublyLinkedListNode<T> | null = null

    constructor(value: T) {
        this.value = value
    }
}

/**
 * Doubly Linked List — dapat ditelusuri ke depan (next) maupun
 * ke belakang (prev). Semua operasi ujung berjalan O(1).
 *
 * @example
 * const list = new DoublyLinkedList<number>(0);
 * list.push(1);
 * list.pop()?.value; // => 1
 */
export class DoublyLinkedList<T> implements IDoublyLinkedList<T> {
    head: DoublyLinkedListNode<T> | null
    tail: DoublyLinkedListNode<T> | null
    /** Jumlah node disimpan agar panjang list selalu diketahui. */
    length: number

    constructor(value: T) {
        const newNode = new DoublyLinkedListNode(value)
        this.head = newNode
        this.tail = newNode
        this.length = 1
    }

    /** Tambahkan node di akhir list; O(1). */
    push(value: T): this {
        const newNode = new DoublyLinkedListNode(value)

        if (this.tail) {
            newNode.prev = this.tail
            this.tail.next = newNode
        } else {
            this.head = newNode
        }

        this.tail = newNode
        this.length++
        return this
    }

    /** Hapus dan kembalikan node terakhir; O(1). */
    pop(): DoublyLinkedListNode<T> | undefined {
        const removed = this.tail
        if (!removed) return undefined

        this.tail = removed.prev
        if (this.tail) {
            this.tail.next = null
        } else {
            this.head = null
        }

        removed.prev = null
        removed.next = null
        this.length--

        return removed
    }

    /** Tambahkan node di awal list; O(1). */
    unshift(value: T): this {
        const newNode = new DoublyLinkedListNode(value)

        if (this.head) {
            newNode.next = this.head
            this.head.prev = newNode
        } else {
            this.tail = newNode
        }

        this.head = newNode
        this.length++
        return this
    }

    /** Hapus dan kembalikan node pertama; O(1). */
    shift(): DoublyLinkedListNode<T> | undefined {
        const removed = this.head
        if (!removed) return undefined

        this.head = removed.next
        if (this.head) {
            this.head.prev = null
        } else {
            this.tail = null
        }

        removed.next = null
        removed.prev = null
        this.length--

        return removed
    }
}
