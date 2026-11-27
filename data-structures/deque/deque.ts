import { IDeque } from "../interfaces"

/**
 * Node untuk doubly linked list internal Deque.
 *
 * @typeParam T - Tipe nilai yang disimpan pada node
 */
class DequeNode<T> {
    /**
     * Membuat node baru untuk doubly linked list Deque.
     *
     * @param value - Nilai elemen yang disimpan
     * @param prev - Referensi ke node sebelumnya, default `null`
     * @param next - Referensi ke node berikutnya, default `null`
     */
    constructor(
        public value: T,
        public prev: DequeNode<T> | null = null,
        public next: DequeNode<T> | null = null,
    ) {}
}

/**
 * Deque (Double-Ended Queue) — struktur data yang mendukung
 * insert dan delete di kedua ujung dalam O(1).
 *
 * Digunakan sebagai dasar sliding window, BFS, stack, dan queue.
 * Juga digunakan dalam implementasi Monotonic Deque.
 *
 * Kompleksitas pushFront/pushBack : O(1)
 * Kompleksitas popFront/popBack   : O(1)
 * Kompleksitas peekFront/peekBack : O(1)
 * Kompleksitas Ruang              : O(n)
 *
 * @typeParam T - Tipe elemen yang disimpan di dalam Deque
 *
 * @example
 * const deque = new Deque<number>()
 * deque.pushBack(1)
 * deque.pushBack(2)
 * deque.pushFront(0)
 * deque.popFront() // => 0
 * deque.popBack()  // => 2
 */
export class Deque<T> implements IDeque<T> {
    /** Pointer ke node paling depan (front), atau `null` jika kosong. */
    private head: DequeNode<T> | null = null
    /** Pointer ke node paling belakang (back), atau `null` jika kosong. */
    private tail: DequeNode<T> | null = null
    /** Jumlah elemen yang saat ini berada di dalam Deque. */
    private count = 0

    /**
     * Menambahkan elemen baru ke ujung depan (front) Deque dalam O(1).
     *
     * @param value - Nilai elemen yang akan ditambahkan
     * @returns Tidak mengembalikan nilai (`void`)
     */
    pushFront(value: T): void {
        const newNode = new DequeNode(value)

        if (this.head === null) {
            // Deque kosong: head dan tail menunjuk ke node baru yang sama
            this.head = newNode
            this.tail = newNode
        } else {
            // Sambungkan node baru di depan head lama lalu geser head
            newNode.next = this.head
            this.head.prev = newNode
            this.head = newNode
        }

        this.count++
    }

    /**
     * Menambahkan elemen baru ke ujung belakang (back) Deque dalam O(1).
     *
     * @param value - Nilai elemen yang akan ditambahkan
     * @returns Tidak mengembalikan nilai (`void`)
     */
    pushBack(value: T): void {
        const newNode = new DequeNode(value)

        if (this.tail === null) {
            // Deque kosong: head dan tail menunjuk ke node baru yang sama
            this.head = newNode
            this.tail = newNode
        } else {
            // Sambungkan node baru di belakang tail lama lalu geser tail
            newNode.prev = this.tail
            this.tail.next = newNode
            this.tail = newNode
        }

        this.count++
    }

    /**
     * Menghapus dan mengembalikan elemen di ujung depan (front) Deque dalam O(1).
     *
     * @returns Nilai elemen paling depan
     * @throws {Error} Jika Deque kosong
     */
    popFront(): T {
        if (this.head === null) throw new Error("Deque kosong")

        const value = this.head.value
        this.head = this.head.next

        if (this.head === null) {
            // Elemen terakhir baru saja dihapus; reset tail agar konsisten
            this.tail = null
        } else {
            this.head.prev = null
        }

        this.count--
        return value
    }

    /**
     * Menghapus dan mengembalikan elemen di ujung belakang (back) Deque dalam O(1).
     *
     * @returns Nilai elemen paling belakang
     * @throws {Error} Jika Deque kosong
     */
    popBack(): T {
        if (this.tail === null) throw new Error("Deque kosong")

        const value = this.tail.value
        this.tail = this.tail.prev

        if (this.tail === null) {
            // Elemen terakhir baru saja dihapus; reset head agar konsisten
            this.head = null
        } else {
            this.tail.next = null
        }

        this.count--
        return value
    }

    /**
     * Melihat elemen di ujung depan (front) tanpa menghapusnya.
     *
     * @returns Nilai elemen paling depan
     * @throws {Error} Jika Deque kosong
     */
    peekFront(): T {
        if (this.head === null) throw new Error("Deque kosong")
        return this.head.value
    }

    /**
     * Melihat elemen di ujung belakang (back) tanpa menghapusnya.
     *
     * @returns Nilai elemen paling belakang
     * @throws {Error} Jika Deque kosong
     */
    peekBack(): T {
        if (this.tail === null) throw new Error("Deque kosong")
        return this.tail.value
    }

    /**
     * Mengembalikan jumlah elemen yang saat ini berada di dalam Deque.
     *
     * @returns Jumlah elemen
     */
    size(): number {
        return this.count
    }

    /**
     * Memeriksa apakah Deque sedang kosong.
     *
     * @returns `true` jika Deque kosong, `false` jika tidak
     */
    isEmpty(): boolean {
        return this.count === 0
    }
}
