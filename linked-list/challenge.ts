import { ILinkedNode, IReversibleLinkedList } from "./interfaces"

/**
 * Node singly linked list untuk latihan pembalikan urutan list.
 *
 * Kompleksitas Waktu : O(1) untuk pembuatan node
 * Kompleksitas Ruang : O(1) per node
 *
 * @example
 * const node = new ReverseNode(1)
 */
export class ReverseNode<T> implements ILinkedNode<T> {
    /** Nilai data yang disimpan pada node. */
    value: T
    /** Referensi ke node berikutnya, atau `null` jika ini node terakhir. */
    next: ReverseNode<T> | null = null

    /**
     * Membuat instance `ReverseNode` baru.
     *
     * @param value - Nilai awal yang disimpan pada node.
     */
    constructor(value: T) {
        this.value = value
    }
}

/**
 * Reverse Linked List — tantangan membalik urutan node dengan
 * menukar arah seluruh tautan `next` secara in-place.
 *
 * Kompleksitas Waktu : O(n) untuk `reverse()`; O(1) untuk `push()`
 * Kompleksitas Ruang : O(1) ruang tambahan pada `reverse()`
 *
 * @example
 * const list = new ReverseLinkedList(1)
 * list.push(2).push(3)
 * list.reverse() // urutan menjadi 3 -> 2 -> 1
 */
export class ReverseLinkedList<T> implements IReversibleLinkedList<T> {
    /** Referensi ke node pertama dalam list. */
    head: ReverseNode<T>
    /** Referensi ke node terakhir dalam list. */
    tail: ReverseNode<T>
    /** Jumlah node dalam list. */
    length: number

    /**
     * Membuat instance `ReverseLinkedList` dengan satu node awal.
     *
     * @param value - Nilai untuk node pertama (`head` sekaligus `tail`).
     */
    constructor(value: T) {
        this.head = new ReverseNode(value)
        this.tail = this.head
        this.length = 1
    }

    /**
     * Menambahkan node di akhir list; O(1) berkat referensi `tail`.
     *
     * @param value - Nilai yang akan ditambahkan di akhir list.
     * @returns Instance list itu sendiri untuk method chaining.
     */
    push(value: T): this {
        const newNode = new ReverseNode(value)
        this.tail.next = newNode
        this.tail = newNode
        this.length++
        return this
    }

    /**
     * Membalik list secara in-place dengan menukar `head`/`tail`, lalu membalik
     * arah setiap tautan `next` satu per satu dari ujung lama ke ujung baru.
     *
     * @returns Instance list itu sendiri setelah dibalik.
     */
    reverse(): this {
        // Tukar posisi head dan tail sebelum membalik pointer next
        const oldHead = this.head
        this.head = this.tail
        this.tail = oldHead

        let current: ReverseNode<T> | null = oldHead
        let previous: ReverseNode<T> | null = null

        // Balik arah setiap tautan: current.next menunjuk ke previous
        for (let i = 0; i < this.length; i++) {
            const nextNode: ReverseNode<T> | null = current!.next
            current!.next = previous
            previous = current
            current = nextNode
        }

        return this
    }
}
