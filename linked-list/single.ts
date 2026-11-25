import { ILinkedNode, ISinglyLinkedList } from "./interfaces"

/** Node untuk singly linked list — satu nilai dan satu tautan ke depan. */
export class LinkedNode<T> implements ILinkedNode<T> {
    value: T
    next: LinkedNode<T> | null = null

    constructor(value: T) {
        this.value = value
    }
}

/**
 * Singly Linked List — node terhubung satu arah: head -> ... -> tail.
 * Referensi `tail` membuat `push` dan `getLast` berjalan O(1).
 *
 * @example
 * const list = new LinkedList<number>(1);
 * list.push(2).push(3);
 * list.size();        // => 3
 * list.get(1)?.value; // => 2
 */
export class LinkedList<T> implements ISinglyLinkedList<T> {
    head: LinkedNode<T> | null
    tail: LinkedNode<T> | null
    /** Jumlah node disimpan agar size() berjalan dalam O(1). */
    length: number

    constructor(value: T) {
        const node = new LinkedNode(value)
        this.head = node
        this.tail = node
        this.length = 1
    }

    /** Tambahkan node di akhir list; O(1) berkat referensi tail. */
    push(value: T): this {
        const node = new LinkedNode(value)

        if (this.tail) {
            this.tail.next = node
        } else {
            this.head = node
        }

        this.tail = node
        this.length++

        return this
    }

    /** Hapus dan kembalikan node terakhir; O(n) karena perlu mencari node sebelumnya. */
    pop(): LinkedNode<T> | undefined {
        if (!this.head) return undefined

        let current = this.head
        let previous: LinkedNode<T> | null = null

        while (current.next) {
            previous = current
            current = current.next
        }

        if (previous) previous.next = null
        else this.head = null

        this.tail = previous
        this.length--
        current.next = null
        return current
    }

    /** Tambahkan node di awal list; O(1). */
    unshift(value: T): this {
        const node = new LinkedNode(value)
        node.next = this.head
        this.head = node

        if (!this.tail) this.tail = node

        this.length++
        return this
    }

    /** Hapus dan kembalikan node pertama; O(1). */
    shift(): LinkedNode<T> | undefined {
        const removed = this.head
        if (!removed) return undefined

        this.head = removed.next
        removed.next = null
        this.length--

        if (!this.head) this.tail = null

        return removed
    }

    /** Kembalikan node pertama, atau null jika list kosong. */
    getFirst(): LinkedNode<T> | null {
        return this.head
    }

    /** Kembalikan node terakhir; O(1) berkat referensi tail. */
    getLast(): LinkedNode<T> | null {
        return this.tail
    }

    /** Kembalikan node pada indeks berbasis nol; O(indeks). */
    get(index: number): LinkedNode<T> | null {
        if (!Number.isInteger(index) || index < 0 || index >= this.length) {
            return null
        }

        let node = this.head
        for (let currentIndex = 0; currentIndex < index && node; currentIndex++) {
            node = node.next
        }

        return node
    }

    /** Ganti nilai node pada indeks; false jika indeks tidak valid. */
    set(index: number, value: T): boolean {
        const node = this.get(index)
        if (!node) return false

        node.value = value
        return true
    }

    /** Sisipkan nilai pada indeks 0 sampai length; false jika tidak valid. */
    insert(index: number, value: T): boolean {
        if (!Number.isInteger(index) || index < 0 || index > this.length) {
            return false
        }

        if (index === 0) {
            this.unshift(value)
            return true
        }

        if (index === this.length) {
            this.push(value)
            return true
        }

        const previous = this.get(index - 1)
        if (!previous) return false

        const node = new LinkedNode(value)
        node.next = previous.next
        previous.next = node
        this.length++
        return true
    }

    /** Kembalikan jumlah node; O(1). */
    size(): number {
        return this.length
    }

    /** Kosongkan seluruh list. */
    clear(): void {
        this.head = null
        this.tail = null
        this.length = 0
    }
}
