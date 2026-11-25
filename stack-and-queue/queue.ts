import { IQueue, IQueueNode } from "./interfaces"

/** Node queue — menyimpan nilai dan referensi ke node berikutnya. */
export class QueueNode<T> implements IQueueNode<T> {
    /** Nilai yang disimpan di dalam node. */
    value: T
    /** Node berikutnya dalam antrian, atau null jika node ini terakhir. */
    next: QueueNode<T> | null

    /** Buat node berisi value yang belum terhubung ke node lain. */
    constructor(value: T) {
        this.value = value
        this.next = null
    }
}

/**
 * Queue — struktur data FIFO (pertama masuk, pertama keluar)
 * berbasis linked list dengan penunjuk first dan last.
 *
 * Kompleksitas Waktu : O(1) untuk enqueue dan dequeue
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const queue = new Queue<number>(0);
 * queue.enqueue(1).enqueue(2);
 * queue.dequeue()?.value; // => 0
 */
export class Queue<T> implements IQueue<T> {
    /** Elemen paling depan yang akan dikeluarkan berikutnya. */
    first: QueueNode<T> | null
    /** Elemen paling belakang tempat nilai baru ditambahkan. */
    last: QueueNode<T> | null
    /** Jumlah node yang tersimpan dalam queue. */
    length: number

    /** Buat queue kosong, atau isi dengan value jika diberikan. */
    constructor(value?: T) {
        this.first = null
        this.last = null
        this.length = 0
        if (value !== undefined) this.enqueue(value)
    }

    /**
     * Tambahkan nilai di belakang queue; O(1).
     * Kembalikan instance ini agar operasi dapat dirangkai.
     */
    enqueue(value: T): this {
        const newNode = new QueueNode(value)

        if (!this.first) {
            this.first = newNode
            this.last = newNode
            this.length = 1
            return this
        }

        this.last!.next = newNode
        this.last = newNode
        this.length++

        return this
    }

    /**
     * Hapus dan kembalikan node paling depan; O(1).
     * Kembalikan undefined jika queue kosong.
     */
    dequeue(): QueueNode<T> | undefined {
        if (!this.first) return undefined

        const removedNode = this.first

        if (this.length === 1) {
            this.first = null
            this.last = null
        } else {
            this.first = this.first.next
        }

        removedNode.next = null
        this.length--

        return removedNode
    }
}
