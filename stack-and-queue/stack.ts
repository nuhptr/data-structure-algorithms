import { IStack, IStackNode } from "./interfaces"

/**
 * Node stack — menyimpan satu nilai dan tautan ke node di bawahnya.
 *
 * @template T Tipe nilai yang disimpan pada node.
 */
export class StackNode<T> implements IStackNode<T> {
    /** Nilai yang disimpan di dalam node. */
    value: T
    /** Node berikutnya di bawah node ini, atau `null` jika tidak ada. */
    next: StackNode<T> | null

    /**
     * Membuat node stack baru yang belum terhubung ke node lain.
     *
     * @param value Nilai awal yang disimpan pada node.
     */
    constructor(value: T) {
        this.value = value
        this.next = null
    }
}

/**
 * Stack — struktur data LIFO (terakhir masuk, pertama keluar)
 * berbasis linked list.
 *
 * Kompleksitas Waktu : O(1) untuk `push`, `pop`, dan `top`
 * Kompleksitas Ruang : O(n)
 *
 * @template T Tipe nilai yang disimpan di dalam stack.
 *
 * @example
 * const stack = new Stack<number>(8)
 * stack.push(1).push(2)
 * stack.top()?.value // => 2
 * stack.pop()?.value // => 2
 */
export class Stack<T> implements IStack<T> {
    /** Node paling atas stack, atau `null` jika stack kosong. */
    first: StackNode<T> | null
    /** Jumlah elemen yang tersimpan di stack. */
    length: number

    /**
     * Membuat stack kosong, atau memasukkan nilai awal jika diberikan.
     *
     * @param value Nilai awal opsional untuk elemen pertama stack.
     */
    constructor(value?: T) {
        this.first = null
        this.length = 0
        if (value !== undefined) this.push(value)
    }

    /**
     * Menambahkan nilai ke puncak stack dalam waktu O(1).
     *
     * @param value Nilai yang akan dimasukkan ke puncak stack.
     * @returns Instans `Stack` saat ini untuk mendukung method chaining.
     */
    push(value: T): this {
        const newNode = new StackNode(value)
        // Arahkan node baru ke puncak lama lalu jadikan sebagai puncak baru.
        newNode.next = this.first
        this.first = newNode
        this.length++
        return this
    }

    /**
     * Menghapus dan mengembalikan node teratas dalam waktu O(1).
     *
     * @returns Node teratas yang dihapus, atau `undefined` jika stack kosong.
     */
    pop(): StackNode<T> | undefined {
        if (!this.first) return undefined

        // Geser penunjuk puncak ke node di bawahnya dan putus tautan node yang dihapus.
        const temp = this.first
        this.first = temp.next
        temp.next = null
        this.length--

        return temp
    }

    /**
     * Membaca node teratas tanpa menghapusnya.
     *
     * @returns Node paling atas pada stack, atau `undefined` jika stack kosong.
     */
    top(): StackNode<T> | undefined {
        return this.first ?? undefined
    }
}
