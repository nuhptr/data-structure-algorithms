import { IQueue, IQueueNode } from "./interfaces"

/**
 * Node queue — menyimpan satu nilai dan referensi ke node berikutnya.
 *
 * @template T Tipe nilai yang disimpan pada node.
 */
export class QueueNode<T> implements IQueueNode<T> {
    /** Nilai yang disimpan di dalam node. */
    value: T
    /** Node berikutnya dalam antrean, atau `null` jika node ini terakhir. */
    next: QueueNode<T> | null

    /**
     * Membuat node queue berisi `value` yang belum terhubung ke node lain.
     *
     * @param value Nilai awal yang disimpan pada node.
     */
    constructor(value: T) {
        this.value = value
        this.next = null
    }
}

/**
 * Queue — struktur data FIFO (pertama masuk, pertama keluar)
 * berbasis linked list dengan penunjuk `first` dan `last`.
 *
 * Kompleksitas Waktu : O(1) untuk `enqueue` dan `dequeue`
 * Kompleksitas Ruang : O(n)
 *
 * @template T Tipe nilai yang disimpan di dalam queue.
 *
 * @example
 * const queue = new Queue<number>(0)
 * queue.enqueue(1).enqueue(2)
 * queue.dequeue()?.value // => 0
 */
export class Queue<T> implements IQueue<T> {
    /** Elemen paling depan yang akan dikeluarkan berikutnya. */
    first: QueueNode<T> | null
    /** Elemen paling belakang tempat nilai baru ditambahkan. */
    last: QueueNode<T> | null
    /** Jumlah node yang tersimpan dalam queue. */
    length: number

    /**
     * Membuat queue kosong, atau mengisinya dengan `value` jika diberikan.
     *
     * @param value Nilai awal opsional untuk elemen pertama queue.
     */
    constructor(value?: T) {
        this.first = null
        this.last = null
        this.length = 0
        if (value !== undefined) this.enqueue(value)
    }

    /**
     * Menambahkan nilai di bagian belakang queue dalam waktu O(1).
     *
     * @param value Nilai yang ingin dimasukkan ke antrean.
     * @returns Instans `Queue` saat ini agar operasi dapat dirangkai.
     */
    enqueue(value: T): this {
        const newNode = new QueueNode(value)

        // Jika antrean kosong, node baru menjadi elemen pertama sekaligus terakhir.
        if (!this.first) {
            this.first = newNode
            this.last = newNode
            this.length = 1
            return this
        }

        // Sambungkan node baru di belakang `last` lalu perbarui penunjuk `last`.
        this.last!.next = newNode
        this.last = newNode
        this.length++

        return this
    }

    /**
     * Menghapus dan mengembalikan node paling depan dalam waktu O(1).
     *
     * @returns Node paling depan yang dihapus, atau `undefined` jika queue kosong.
     */
    dequeue(): QueueNode<T> | undefined {
        if (!this.first) return undefined

        const removedNode = this.first

        // Jika hanya tersisa satu elemen, kosongkan penunjuk `first` dan `last`.
        if (this.length === 1) {
            this.first = null
            this.last = null
        } else {
            this.first = this.first.next
        }

        // Putus referensi `next` agar node yang dilepas berdiri sendiri.
        removedNode.next = null
        this.length--

        return removedNode
    }
}
