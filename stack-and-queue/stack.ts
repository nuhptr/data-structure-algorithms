import { IStack, IStackNode } from "./interfaces"

/** Node stack — menyimpan satu nilai dan tautan ke node di bawahnya. */
export class StackNode<T> implements IStackNode<T> {
    /** Nilai yang disimpan di dalam node. */
    value: T
    /** Node berikutnya di bawah node ini, atau null jika tidak ada. */
    next: StackNode<T> | null

    /** Buat node yang belum terhubung ke node lain. */
    constructor(value: T) {
        this.value = value
        this.next = null
    }
}

/**
 * Stack — struktur data LIFO (terakhir masuk, pertama keluar)
 * berbasis linked list.
 *
 * Kompleksitas Waktu : O(1) untuk push, pop, dan top
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const stack = new Stack<number>(8);
 * stack.push(1).push(2);
 * stack.top()?.value; // => 2
 * stack.pop()?.value; // => 2
 */
export class Stack<T> implements IStack<T> {
    /** Node paling atas stack, atau null jika stack kosong. */
    first: StackNode<T> | null
    /** Jumlah elemen yang tersimpan di stack. */
    length: number

    /** Buat stack kosong, atau masukkan nilai awal jika diberikan. */
    constructor(value?: T) {
        this.first = null
        this.length = 0
        if (value !== undefined) this.push(value)
    }

    /** Tambahkan nilai ke puncak stack; O(1). */
    push(value: T): this {
        const newNode = new StackNode(value)
        newNode.next = this.first
        this.first = newNode
        this.length++
        return this
    }

    /** Hapus dan kembalikan node teratas; O(1), undefined jika kosong. */
    pop(): StackNode<T> | undefined {
        if (!this.first) return undefined

        const temp = this.first
        this.first = temp.next
        temp.next = null
        this.length--

        return temp
    }

    /** Baca node teratas tanpa menghapusnya, atau undefined jika kosong. */
    top(): StackNode<T> | undefined {
        return this.first ?? undefined
    }
}
