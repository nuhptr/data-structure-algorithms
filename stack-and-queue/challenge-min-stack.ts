import { IMinStack, IStackNode } from "./interfaces"

/** Node untuk MinStack — nilai plus tautan ke node di bawahnya. */
export class MinStackNode<T> implements IStackNode<T> {
    /** Nilai data yang disimpan di node. */
    value: T
    /** Referensi ke node berikutnya di bawahnya dalam stack. */
    next: MinStackNode<T> | null

    /** Buat node yang belum terhubung ke node lain. */
    constructor(value: T) {
        this.value = value
        this.next = null
    }
}

/**
 * MinStack — stack angka yang dapat melacak nilai minimum
 * yang sedang tersimpan. `min()` selalu O(1).
 *
 * Jika nilai minimum dikeluarkan lewat `pop()`, minimum baru
 * dicari dengan menelusuri sisa node — O(n) pada kasus terburuk.
 *
 * @example
 * const stack = new MinStack<number>();
 * stack.push(5).push(2).push(7).push(1);
 * stack.min(); // => 1
 * stack.pop();
 * stack.min(); // => 2
 */
export class MinStack<T extends number> implements IMinStack<T> {
    /** Node paling atas stack, atau null jika stack kosong. */
    first: MinStackNode<T> | null
    /** Jumlah elemen yang tersimpan di stack. */
    length: number
    /** Nilai terkecil saat ini, atau undefined jika stack kosong. */
    private minValue: T | undefined

    /** Buat stack kosong, atau masukkan nilai awal jika diberikan. */
    constructor(value?: T) {
        this.first = null
        this.length = 0
        this.minValue = undefined
        if (value !== undefined) this.push(value)
    }

    /** Tambahkan angka ke puncak stack; O(1). */
    push(value: T): this {
        const newNode = new MinStackNode(value)
        newNode.next = this.first
        this.first = newNode
        this.length++

        if (this.minValue === undefined || value < this.minValue) {
            this.minValue = value
        }

        return this
    }

    /** Hapus dan kembalikan node teratas; undefined jika stack kosong. */
    pop(): MinStackNode<T> | undefined {
        if (!this.first) return undefined

        const temp = this.first
        this.first = temp.next
        temp.next = null
        this.length--

        if (this.length === 0) {
            this.minValue = undefined
            return temp
        }

        if (temp.value === this.minValue) {
            let current = this.first
            let newMin = current?.value

            while (current) {
                if (current.value < (newMin ?? current.value)) {
                    newMin = current.value
                }
                current = current.next
            }

            this.minValue = newMin
        }

        return temp
    }

    /** Baca node teratas tanpa menghapusnya; undefined jika kosong. */
    top(): MinStackNode<T> | undefined {
        return this.first ?? undefined
    }

    /** Kembalikan nilai terkecil saat ini, atau undefined jika kosong. */
    min(): T | undefined {
        return this.minValue
    }
}
