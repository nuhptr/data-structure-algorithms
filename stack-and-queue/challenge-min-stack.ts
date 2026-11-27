import { IMinStack, IStackNode } from "./interfaces"

/**
 * Node untuk `MinStack` — menyimpan nilai beserta tautan ke node di bawahnya.
 *
 * @template T Tipe nilai yang disimpan pada node.
 */
export class MinStackNode<T> implements IStackNode<T> {
    /** Nilai data yang disimpan di node. */
    value: T
    /** Referensi ke node berikutnya di bawahnya dalam stack, atau `null` jika terbawah. */
    next: MinStackNode<T> | null

    /**
     * Membuat node baru yang belum terhubung ke node lain.
     *
     * @param value Nilai awal yang disimpan pada node.
     */
    constructor(value: T) {
        this.value = value
        this.next = null
    }
}

/**
 * MinStack — stack angka yang dapat melacak nilai minimum
 * yang sedang tersimpan. `min()` selalu berjalan dalam waktu O(1).
 *
 * Jika nilai minimum dikeluarkan lewat `pop()`, minimum baru
 * dicari dengan menelusuri sisa node — O(n) pada kasus terburuk.
 *
 * Kompleksitas Waktu : O(1) untuk `push`, `top`, `min` | O(1) rata-rata, O(n) worst case untuk `pop`
 * Kompleksitas Ruang : O(n)
 *
 * @template T Tipe numerik yang disimpan pada stack.
 *
 * @example
 * const stack = new MinStack<number>()
 * stack.push(5).push(2).push(7).push(1)
 * stack.min() // => 1
 * stack.pop()
 * stack.min() // => 2
 */
export class MinStack<T extends number> implements IMinStack<T> {
    /** Node paling atas stack, atau `null` jika stack kosong. */
    first: MinStackNode<T> | null
    /** Jumlah elemen yang tersimpan di stack. */
    length: number
    /** Nilai terkecil saat ini, atau `undefined` jika stack kosong. */
    private minValue: T | undefined

    /**
     * Membuat `MinStack` kosong, atau memasukkan nilai awal jika diberikan.
     *
     * @param value Nilai angka awal opsional untuk elemen pertama.
     */
    constructor(value?: T) {
        this.first = null
        this.length = 0
        this.minValue = undefined
        if (value !== undefined) this.push(value)
    }

    /**
     * Menambahkan angka ke puncak stack dalam waktu O(1) dan memperbarui nilai minimum bila perlu.
     *
     * @param value Nilai angka yang ingin dimasukkan.
     * @returns Instans `MinStack` saat ini untuk mendukung method chaining.
     */
    push(value: T): this {
        const newNode = new MinStackNode(value)
        newNode.next = this.first
        this.first = newNode
        this.length++

        // Perbarui cache nilai minimum jika stack sebelumnya kosong atau nilai baru lebih kecil.
        if (this.minValue === undefined || value < this.minValue) {
            this.minValue = value
        }

        return this
    }

    /**
     * Menghapus dan mengembalikan node teratas.
     * Jika elemen yang dihapus merupakan nilai minimum saat ini, minimum baru dihitung ulang.
     *
     * @returns Node teratas yang dihapus, atau `undefined` jika stack kosong.
     */
    pop(): MinStackNode<T> | undefined {
        if (!this.first) return undefined

        const temp = this.first
        this.first = temp.next
        temp.next = null
        this.length--

        // Jika stack menjadi kosong, reset nilai minimum menjadi `undefined`.
        if (this.length === 0) {
            this.minValue = undefined
            return temp
        }

        // Hitung ulang nilai minimum hanya ketika elemen yang dikeluarkan adalah minimum saat ini.
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

    /**
     * Membaca node teratas tanpa menghapusnya.
     *
     * @returns Node paling atas pada stack, atau `undefined` jika kosong.
     */
    top(): MinStackNode<T> | undefined {
        return this.first ?? undefined
    }

    /**
     * Mengembalikan nilai terkecil saat ini dalam waktu O(1).
     *
     * @returns Nilai minimum yang tersimpan, atau `undefined` jika stack kosong.
     */
    min(): T | undefined {
        return this.minValue
    }
}
