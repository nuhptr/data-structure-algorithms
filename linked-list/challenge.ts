import { ILinkedNode, IReversibleLinkedList } from "./interfaces"

/** Node singly linked list untuk latihan pembalikan. */
export class ReverseNode<T> implements ILinkedNode<T> {
    value: T
    next: ReverseNode<T> | null = null

    constructor(value: T) {
        this.value = value
    }
}

/**
 * Reverse Linked List — tantangan membalik urutan node dengan
 * menukar arah seluruh tautan `next`.
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(1)
 *
 * @example
 * const list = new ReverseLinkedList(1);
 * list.push(2).push(3);
 * list.reverse(); // urutan menjadi 3 -> 2 -> 1
 */
export class ReverseLinkedList<T> implements IReversibleLinkedList<T> {
    head: ReverseNode<T>
    tail: ReverseNode<T>
    /** Jumlah node dalam list. */
    length: number

    constructor(value: T) {
        this.head = new ReverseNode(value)
        this.tail = this.head
        this.length = 1
    }

    /** Tambahkan node di akhir list; O(1) berkat referensi tail. */
    push(value: T): this {
        const newNode = new ReverseNode(value)
        this.tail.next = newNode
        this.tail = newNode
        this.length++
        return this
    }

    /**
     * Balik list dengan menukar head/tail lalu membalik tiap tautan
     * `next` satu per satu dari ujung lama ke ujung baru.
     */
    reverse(): this {
        const oldHead = this.head
        this.head = this.tail
        this.tail = oldHead

        let current: ReverseNode<T> | null = oldHead
        let previous: ReverseNode<T> | null = null

        for (let i = 0; i < this.length; i++) {
            const nextNode: ReverseNode<T> | null = current!.next
            current!.next = previous
            previous = current
            current = nextNode
        }

        return this
    }
}
