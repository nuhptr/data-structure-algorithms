/** Node stack menyimpan satu nilai dan tautan ke node di bawahnya. */
class StackNode<T> {
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

/** Stack berbasis linked list dengan aturan LIFO (terakhir masuk, pertama keluar). */
class StackValue<T> {
    /** Node paling atas stack, atau null jika stack kosong. */
    first: StackNode<T> | null
    /** Jumlah elemen yang saat ini tersimpan di stack. */
    length: number

    /** Buat stack kosong, atau tambahkan nilai awal jika diberikan. */
    constructor(value?: T) {
        /** Awali stack dengan pointer kosong dan panjang nol. */
        this.first = null
        this.length = 0

        /** Masukkan nilai awal melalui push agar aturan stack tetap diterapkan. */
        if (value !== undefined) this.push(value)
    }

    /** Tambahkan nilai ke puncak stack dalam O(1), lalu kembalikan stack ini. */
    push(value: T): this {
        const newNode = new StackNode(value)
        /** Hubungkan node baru ke puncak lama. */
        newNode.next = this.first
        /** Perbarui puncak agar menunjuk ke node baru. */
        this.first = newNode
        this.length++

        return this
    }

    /** Hapus dan kembalikan node teratas dalam O(1), atau undefined jika kosong. */
    pop(): StackNode<T> | undefined {
        /** Stack kosong tidak memiliki node yang dapat dikeluarkan. */
        if (!this.first) return undefined

        /** Simpan puncak yang akan dikeluarkan sebelum memperbarui pointer. */
        const temp = this.first
        /** Jadikan node di bawahnya sebagai puncak baru. */
        this.first = temp.next
        /** Lepaskan node yang dikeluarkan dari sisa stack. */
        temp.next = null
        this.length--

        return temp
    }

    /** Baca node teratas tanpa menghapusnya, atau undefined jika stack kosong. */
    top(): StackNode<T> | undefined {
        return this.first ?? undefined
    }
}

/** Contoh penggunaan: isi stack dengan nilai awal dan dua nilai tambahan. */
let theStack = new StackValue(8)
theStack.push(1)
theStack.push(2)
/** Contoh operasi untuk mengeluarkan elemen teratas: theStack.pop() */
theStack.pop()

/** Tampilkan stack; nilai 2 berada di puncak. */
console.log(theStack)
