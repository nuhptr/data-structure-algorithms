import { IDoublyLinkedList, IDoublyLinkedNode } from "./interfaces"

/**
 * Node doubly linked list — terhubung dua arah ke node sebelum (`prev`) dan sesudahnya (`next`).
 *
 * Kompleksitas Waktu : O(1) untuk pembuatan node
 * Kompleksitas Ruang : O(1) per node
 *
 * @example
 * const node = new DoublyLinkedListNode(0)
 */
export class DoublyLinkedListNode<T> implements IDoublyLinkedNode<T> {
    /** Nilai data yang disimpan pada node. */
    value: T
    /** Referensi ke node berikutnya, atau `null` jika ini node terakhir. */
    next: DoublyLinkedListNode<T> | null = null
    /** Referensi ke node sebelumnya, atau `null` jika ini node pertama. */
    prev: DoublyLinkedListNode<T> | null = null

    /**
     * Membuat instance `DoublyLinkedListNode` baru.
     *
     * @param value - Nilai awal yang disimpan pada node.
     */
    constructor(value: T) {
        this.value = value
    }
}

/**
 * Doubly Linked List — dapat ditelusuri ke depan (`next`) maupun
 * ke belakang (`prev`). Semua operasi ujung berjalan O(1).
 *
 * Kompleksitas Waktu : O(1) untuk `push`, `pop`, `unshift`, dan `shift`
 * Kompleksitas Ruang : O(n) untuk menyimpan `n` node
 *
 * @example
 * const list = new DoublyLinkedList<number>(0)
 * list.push(1)
 * list.pop()?.value // => 1
 */
export class DoublyLinkedList<T> implements IDoublyLinkedList<T> {
    /** Referensi ke node pertama dalam list, atau `null` jika kosong. */
    head: DoublyLinkedListNode<T> | null
    /** Referensi ke node terakhir dalam list, atau `null` jika kosong. */
    tail: DoublyLinkedListNode<T> | null
    /** Jumlah node disimpan agar panjang list selalu diketahui. */
    length: number

    /**
     * Membuat instance `DoublyLinkedList` baru dengan satu node awal.
     *
     * @param value - Nilai untuk node pertama (`head` sekaligus `tail`).
     */
    constructor(value: T) {
        const newNode = new DoublyLinkedListNode(value)
        this.head = newNode
        this.tail = newNode
        this.length = 1
    }

    /**
     * Menambahkan node di akhir list; O(1).
     *
     * @param value - Nilai yang akan ditambahkan di akhir list.
     * @returns Instance list itu sendiri untuk method chaining.
     */
    push(value: T): this {
        const newNode = new DoublyLinkedListNode(value)

        // Hubungkan dua arah dengan tail lama, atau jadikan head jika list kosong
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

    /**
     * Menghapus dan mengembalikan node terakhir; O(1).
     *
     * @returns Node terakhir yang dihapus, atau `undefined` jika list kosong.
     */
    pop(): DoublyLinkedListNode<T> | undefined {
        const removed = this.tail
        if (!removed) return undefined

        // Mundurkan tail ke node sebelumnya; jika kosong, reset head juga
        this.tail = removed.prev
        if (this.tail) {
            this.tail.next = null
        } else {
            this.head = null
        }

        // Bersihkan tautan node yang dilepas agar tidak menahan referensi list
        removed.prev = null
        removed.next = null
        this.length--

        return removed
    }

    /**
     * Menambahkan node di awal list; O(1).
     *
     * @param value - Nilai yang akan ditambahkan di awal list.
     * @returns Instance list itu sendiri untuk method chaining.
     */
    unshift(value: T): this {
        const newNode = new DoublyLinkedListNode(value)

        // Hubungkan dua arah dengan head lama, atau jadikan tail jika list kosong
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

    /**
     * Menghapus dan mengembalikan node pertama; O(1).
     *
     * @returns Node pertama yang dihapus, atau `undefined` jika list kosong.
     */
    shift(): DoublyLinkedListNode<T> | undefined {
        const removed = this.head
        if (!removed) return undefined

        // Majukan head ke node berikutnya; jika kosong, reset tail juga
        this.head = removed.next
        if (this.head) {
            this.head.prev = null
        } else {
            this.tail = null
        }

        // Bersihkan tautan node yang dilepas agar tidak menahan referensi list
        removed.next = null
        removed.prev = null
        this.length--

        return removed
    }
}
