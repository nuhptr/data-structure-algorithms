/** Node stack menyimpan satu nilai dan tautan ke node di bawahnya. */
class MinStackNode<T> {
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
 * Stack angka dengan operasi untuk melihat elemen teratas dan nilai minimum.
 * Linked list membuat penambahan dan penghapusan elemen teratas berjalan cepat.
 */
class Stack<T extends number> {
    /** Node paling atas stack, atau null jika stack kosong. */
    first: MinStackNode<T> | null
    /** Jumlah elemen yang ada di stack. */
    length: number
    /** Nilai terkecil yang saat ini tersimpan, atau undefined jika stack kosong. */
    private minValue: T | undefined

    /** Buat stack kosong, atau masukkan nilai awal jika diberikan. */
    constructor(value?: T) {
        /** Inisialisasi pointer, panjang, dan nilai minimum untuk stack kosong. */
        this.first = null
        this.length = 0
        this.minValue = undefined

        /** Gunakan push untuk memasukkan nilai awal sekaligus memperbarui minimum. */
        if (value !== undefined) this.push(value)
    }

    /** Tambahkan angka ke puncak stack dalam O(1), lalu kembalikan stack ini. */
    push(value: T): this {
        const newNode = new MinStackNode(value)

        /** Hubungkan node baru ke puncak stack yang lama. */
        newNode.next = this.first
        /** Jadikan node baru sebagai puncak stack. */
        this.first = newNode
        this.length++

        /** Perbarui minimum saat stack baru dimulai atau nilai baru lebih kecil. */
        if (this.minValue === undefined || value < this.minValue) {
            this.minValue = value
        }

        return this
    }

    /** Hapus dan kembalikan node teratas; kembalikan undefined jika stack kosong. */
    pop(): MinStackNode<T> | undefined {
        /** Tidak ada node yang dapat dihapus jika stack kosong. */
        if (!this.first) return undefined

        /** Simpan node teratas sebelum memindahkan puncak stack. */
        const temp = this.first
        /** Pindahkan puncak ke node berikutnya. */
        this.first = temp.next
        /** Lepaskan node yang dikeluarkan dari sisa stack. */
        temp.next = null
        this.length--

        /** Reset minimum jika node terakhir baru saja dikeluarkan. */
        if (this.length === 0) {
            this.minValue = undefined
            return temp
        }

        /**
         * Jika minimum dikeluarkan, telusuri node yang tersisa untuk mencari
         * minimum baru.
         */
        if (temp.value === this.minValue) {
            let current = this.first
            let newMin = current?.value

            /** Bandingkan nilai setiap node dengan minimum terkecil sejauh ini. */
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

    /** Baca node teratas tanpa menghapusnya; undefined jika stack kosong. */
    top(): MinStackNode<T> | undefined {
        return this.first ?? undefined
    }

    /** Kembalikan nilai terkecil saat ini, atau undefined jika stack kosong. */
    min(): T | undefined {
        return this.minValue
    }
}

/** Buat stack angka, lalu masukkan empat nilai. */
const myStack = new Stack<number>()
myStack.push(5)
myStack.push(2)
myStack.push(7)
myStack.push(1)

/** Tampilkan nilai teratas saat ini; hasilnya 1. */
console.log(myStack.top()?.value)

/** Tampilkan nilai minimum saat ini; hasilnya 1. */
console.log(myStack.min())

/** Hapus elemen teratas, yaitu 1. */
myStack.pop()

/** Tampilkan minimum baru setelah nilai 1 dikeluarkan; hasilnya 2. */
console.log(myStack.min())
