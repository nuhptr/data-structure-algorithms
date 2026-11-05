/** Node queue menyimpan nilai dan referensi ke node berikutnya seperti linked list. */
class QueueNode<T> {
    /** Nilai yang disimpan di dalam node. */
    value: T
    /** Node berikutnya dalam antrian, atau null jika node ini yang terakhir. */
    next: QueueNode<T> | null

    /** Buat node berisi value yang belum terhubung ke node lain. */
    constructor(value: T) {
        this.value = value
        this.next = null
    }
}

/**
 * Queue berbasis linked list dengan urutan FIFO:
 * nilai pertama yang masuk akan menjadi nilai pertama yang keluar.
 */
class Queue<T> {
    /** Elemen paling depan yang akan dikeluarkan berikutnya. */
    first: QueueNode<T> | null
    /** Elemen paling belakang tempat nilai baru ditambahkan. */
    last: QueueNode<T> | null
    /** Jumlah node yang saat ini tersimpan dalam queue. */
    length: number

    /** Buat queue kosong, atau isi dengan value jika diberikan. */
    constructor(value?: T) {
        /** Awali queue dalam keadaan kosong. */
        this.first = null
        this.last = null
        this.length = 0

        /** Gunakan enqueue agar nilai awal mengikuti aturan penambahan biasa. */
        if (value !== undefined) this.enqueue(value)
    }

    /**
     * Tambahkan nilai di belakang queue dalam O(1).
     * Kembalikan instance ini agar operasi dapat dirangkai.
     */
    enqueue(value: T): this {
        const newNode = new QueueNode(value)

        /** Pada queue kosong, node baru menjadi elemen pertama dan terakhir. */
        if (!this.first) {
            this.first = newNode
            this.last = newNode
            this.length = 1

            return this
        }

        /** Sambungkan node terakhir ke node baru, lalu perbarui penunjuk last. */
        this.last!.next = newNode
        this.last = newNode
        this.length++

        return this
    }

    /**
     * Hapus dan kembalikan node paling depan dalam O(1).
     * Kembalikan undefined jika queue kosong.
     */
    dequeue(): QueueNode<T> | undefined {
        /** Tidak ada node yang dapat dikeluarkan dari queue kosong. */
        if (!this.first) return undefined

        /** Simpan node yang dikeluarkan agar dapat dikembalikan setelah pembaruan. */
        const removedNode = this.first

        /** Jika hanya tersisa satu node, kosongkan kedua ujung queue. */
        if (this.length === 1) {
            this.first = null
            this.last = null
        } else {
            /** Majukan first ke node berikutnya dalam antrian. */
            this.first = this.first.next
        }

        /** Lepaskan node yang dikeluarkan dari sisa linked list. */
        removedNode.next = null
        this.length--

        return removedNode
    }
}

/** Contoh penggunaan: tambahkan beberapa nilai, lalu keluarkan nilai paling awal. */
let myQueue = new Queue(0)
myQueue.enqueue(1)
myQueue.enqueue(2)
myQueue.enqueue(5)
myQueue.dequeue()

/** Tampilkan queue setelah operasi penambahan dan pengeluaran. */
console.log(myQueue)
