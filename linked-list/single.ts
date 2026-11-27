import { ILinkedNode, ISinglyLinkedList } from "./interfaces"

/**
 * Node untuk singly linked list — menyimpan satu nilai dan satu tautan ke node berikutnya.
 *
 * Kompleksitas Waktu : O(1) untuk pembuatan node
 * Kompleksitas Ruang : O(1) per node
 *
 * @example
 * const node = new LinkedNode(10)
 */
export class LinkedNode<T> implements ILinkedNode<T> {
    /** Nilai data yang disimpan pada node. */
    value: T
    /** Referensi ke node berikutnya, atau `null` jika ini node terakhir. */
    next: LinkedNode<T> | null = null

    /**
     * Membuat instance `LinkedNode` baru.
     *
     * @param value - Nilai awal yang disimpan pada node.
     */
    constructor(value: T) {
        this.value = value
    }
}

/**
 * Singly Linked List — node terhubung satu arah: `head -> ... -> tail`.
 * Referensi `tail` membuat `push` dan `getLast` berjalan O(1).
 *
 * Kompleksitas Waktu : O(1) untuk `push`/`unshift`/`shift`/`getFirst`/`getLast`/`size`; O(n) untuk `pop`/`get`/`set`/`insert`
 * Kompleksitas Ruang : O(n) untuk menyimpan `n` node
 *
 * @example
 * const list = new LinkedList<number>(1)
 * list.push(2).push(3)
 * list.size()        // => 3
 * list.get(1)?.value // => 2
 */
export class LinkedList<T> implements ISinglyLinkedList<T> {
    /** Referensi ke node pertama dalam list, atau `null` jika kosong. */
    head: LinkedNode<T> | null
    /** Referensi ke node terakhir dalam list, atau `null` jika kosong. */
    tail: LinkedNode<T> | null
    /** Jumlah node disimpan agar `size()` berjalan dalam O(1). */
    length: number

    /**
     * Membuat instance `LinkedList` baru dengan satu node awal.
     *
     * @param value - Nilai untuk node pertama (`head` sekaligus `tail`).
     */
    constructor(value: T) {
        const node = new LinkedNode(value)
        this.head = node
        this.tail = node
        this.length = 1
    }

    /**
     * Menambahkan node baru di akhir list; O(1) berkat referensi `tail`.
     *
     * @param value - Nilai yang akan ditambahkan di akhir list.
     * @returns Instance list itu sendiri untuk method chaining.
     */
    push(value: T): this {
        const node = new LinkedNode(value)

        // Jika list sudah berisi node, sambungkan setelah tail; jika kosong, jadikan head
        if (this.tail) {
            this.tail.next = node
        } else {
            this.head = node
        }

        this.tail = node
        this.length++

        return this
    }

    /**
     * Menghapus dan mengembalikan node terakhir; O(n) karena perlu mencari node sebelumnya.
     *
     * @returns Node terakhir yang dihapus, atau `undefined` jika list kosong.
     */
    pop(): LinkedNode<T> | undefined {
        if (!this.head) return undefined

        let current = this.head
        let previous: LinkedNode<T> | null = null

        // Telusuri hingga `current` berada di tail dan `previous` di node sebelumnya
        while (current.next) {
            previous = current
            current = current.next
        }

        // Putuskan tautan ke node terakhir, atau kosongkan head jika hanya ada 1 node
        if (previous) previous.next = null
        else this.head = null

        this.tail = previous
        this.length--
        current.next = null
        return current
    }

    /**
     * Menambahkan node baru di awal list; O(1).
     *
     * @param value - Nilai yang akan ditambahkan di awal list.
     * @returns Instance list itu sendiri untuk method chaining.
     */
    unshift(value: T): this {
        const node = new LinkedNode(value)
        node.next = this.head
        this.head = node

        // Jika list sebelumnya kosong, node baru juga menjadi tail
        if (!this.tail) this.tail = node

        this.length++
        return this
    }

    /**
     * Menghapus dan mengembalikan node pertama; O(1).
     *
     * @returns Node pertama yang dihapus, atau `undefined` jika list kosong.
     */
    shift(): LinkedNode<T> | undefined {
        const removed = this.head
        if (!removed) return undefined

        // Geser head ke node berikutnya dan putuskan tautan node yang dihapus
        this.head = removed.next
        removed.next = null
        this.length--

        // Jika list menjadi kosong, pastikan tail ikut direset ke null
        if (!this.head) this.tail = null

        return removed
    }

    /**
     * Mengembalikan node pertama, atau `null` jika list kosong.
     *
     * @returns Node `head` atau `null`.
     */
    getFirst(): LinkedNode<T> | null {
        return this.head
    }

    /**
     * Mengembalikan node terakhir; O(1) berkat referensi `tail`.
     *
     * @returns Node `tail` atau `null` jika list kosong.
     */
    getLast(): LinkedNode<T> | null {
        return this.tail
    }

    /**
     * Mengembalikan node pada indeks berbasis nol; O(indeks).
     *
     * @param index - Indeks node yang ingin dicari.
     * @returns Node pada posisi `index`, atau `null` jika indeks tidak valid.
     */
    get(index: number): LinkedNode<T> | null {
        if (!Number.isInteger(index) || index < 0 || index >= this.length) {
            return null
        }

        // Langkahkan pointer dari head sebanyak `index` kali
        let node = this.head
        for (let currentIndex = 0; currentIndex < index && node; currentIndex++) {
            node = node.next
        }

        return node
    }

    /**
     * Mengganti nilai node pada indeks tertentu.
     *
     * @param index - Indeks node yang akan diubah nilainya.
     * @param value - Nilai baru untuk node tersebut.
     * @returns `true` jika berhasil, `false` jika indeks tidak valid.
     */
    set(index: number, value: T): boolean {
        const node = this.get(index)
        if (!node) return false

        node.value = value
        return true
    }

    /**
     * Menyisipkan nilai pada indeks `0` sampai `length`.
     *
     * @param index - Posisi indeks untuk menyisipkan node baru.
     * @param value - Nilai yang akan disisipkan.
     * @returns `true` jika penyisipan berhasil, `false` jika indeks tidak valid.
     */
    insert(index: number, value: T): boolean {
        if (!Number.isInteger(index) || index < 0 || index > this.length) {
            return false
        }

        // Tangani penyisipan di awal dan di akhir secara O(1)
        if (index === 0) {
            this.unshift(value)
            return true
        }

        if (index === this.length) {
            this.push(value)
            return true
        }

        // Cari node tepat sebelum posisi penyisipan lalu sambungkan node baru di antaranya
        const previous = this.get(index - 1)
        if (!previous) return false

        const node = new LinkedNode(value)
        node.next = previous.next
        previous.next = node
        this.length++
        return true
    }

    /**
     * Mengembalikan jumlah node saat ini; O(1).
     *
     * @returns Total node dalam list.
     */
    size(): number {
        return this.length
    }

    /**
     * Mengosongkan seluruh list dengan mereset `head`, `tail`, dan `length`.
     *
     * @returns Tidak mengembalikan nilai.
     */
    clear(): void {
        this.head = null
        this.tail = null
        this.length = 0
    }
}
