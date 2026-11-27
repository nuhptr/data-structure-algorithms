import { ILRUCache } from "../interfaces"

/**
 * Node dalam doubly linked list internal untuk LRU Cache.
 *
 * @typeParam K - Tipe kunci (key) entri cache
 * @typeParam V - Tipe nilai (value) entri cache
 */
class LRUNode<K, V> {
    /**
     * Membuat node baru untuk doubly linked list LRU Cache.
     *
     * @param key - Kunci entri cache
     * @param value - Nilai entri cache
     * @param prev - Referensi ke node sebelumnya, default `null`
     * @param next - Referensi ke node berikutnya, default `null`
     */
    constructor(
        public key: K,
        public value: V,
        public prev: LRUNode<K, V> | null = null,
        public next: LRUNode<K, V> | null = null,
    ) {}
}

/**
 * LRU Cache — Least Recently Used Cache menggunakan kombinasi
 * HashMap + Doubly Linked List untuk operasi O(1) get dan put.
 *
 * Digunakan oleh: sistem operasi (page replacement), browser (cache),
 * database (buffer pool), CDN, Redis, dan hampir semua unicorn tech.
 *
 * Kompleksitas get  : O(1)
 * Kompleksitas put  : O(1)
 * Kompleksitas Ruang: O(capacity)
 *
 * @typeParam K - Tipe kunci (key) cache
 * @typeParam V - Tipe nilai (value) yang disimpan
 *
 * @example
 * const cache = new LRUCache<number, string>(3)
 * cache.put(1, "a")
 * cache.put(2, "b")
 * cache.put(3, "c")
 * cache.get(1)       // => "a" — 1 kini paling baru diakses
 * cache.put(4, "d")  // evict 2 (paling lama tidak diakses)
 * cache.get(2)       // => undefined
 */
export class LRUCache<K, V> implements ILRUCache<K, V> {
    /** Batas maksimum jumlah entri yang dapat disimpan di dalam cache. */
    private readonly capacity: number
    /** Peta kunci ke referensi node doubly linked list untuk akses O(1). */
    private readonly nodeMap: Map<K, LRUNode<K, V>>

    /** Node sentinel ujung kiri: node tepat setelah `head` adalah entri paling lama tidak diakses (LRU). */
    private readonly head: LRUNode<K, V>
    /** Node sentinel ujung kanan: node tepat sebelum `tail` adalah entri paling baru diakses (MRU). */
    private readonly tail: LRUNode<K, V>

    /**
     * Membuat instance LRU Cache dengan kapasitas maksimum tertentu.
     *
     * @param capacity - Jumlah maksimum entri cache (harus > 0)
     * @throws {Error} Jika `capacity <= 0`
     */
    constructor(capacity: number) {
        if (capacity <= 0) throw new Error("Kapasitas harus lebih dari 0")

        this.capacity = capacity
        this.nodeMap = new Map()

        // Hubungkan kedua sentinel node agar operasi sisip/hapus tidak perlu cek null
        this.head = new LRUNode<K, V>(null as K, null as V)
        this.tail = new LRUNode<K, V>(null as K, null as V)
        this.head.next = this.tail
        this.tail.prev = this.head
    }

    /**
     * Mengambil nilai berdasarkan kunci dan memindahkan node-nya ke posisi paling baru diakses (MRU).
     *
     * @param key - Kunci entri yang dicari
     * @returns Nilai yang tersimpan, atau `undefined` jika kunci tidak ada
     */
    get(key: K): V | undefined {
        const node = this.nodeMap.get(key)
        if (!node) return undefined

        // Pindahkan ke posisi paling baru (sebelum tail)
        this.removeNode(node)
        this.insertBeforeTail(node)

        return node.value
    }

    /**
     * Menyimpan atau memperbarui pasangan kunci-nilai di dalam cache.
     * Jika kunci baru dan kapasitas sudah penuh, entri paling lama tidak diakses (LRU) akan dihapus.
     *
     * @param key - Kunci entri
     * @param value - Nilai yang akan disimpan
     * @returns Tidak mengembalikan nilai (`void`)
     */
    put(key: K, value: V): void {
        if (this.nodeMap.has(key)) {
            // Kunci sudah ada: perbarui nilainya dan promosikan ke posisi MRU
            const existingNode = this.nodeMap.get(key)!
            existingNode.value = value
            this.removeNode(existingNode)
            this.insertBeforeTail(existingNode)
            return
        }

        // Evict LRU node (tepat setelah sentinel head) jika kapasitas sudah penuh
        if (this.nodeMap.size >= this.capacity) {
            const lruNode = this.head.next!
            this.removeNode(lruNode)
            this.nodeMap.delete(lruNode.key)
        }

        // Buat node baru dan sisipkan di posisi MRU (sebelum sentinel tail)
        const newNode = new LRUNode(key, value)
        this.nodeMap.set(key, newNode)
        this.insertBeforeTail(newNode)
    }

    /**
     * Mengembalikan jumlah entri yang saat ini berada di dalam cache.
     *
     * @returns Jumlah entri aktif
     */
    size(): number {
        return this.nodeMap.size
    }

    /**
     * Melepas sebuah node dari doubly linked list tanpa menghapusnya dari `nodeMap`.
     *
     * @param node - Node yang akan dilepas dari rantai
     * @returns Tidak mengembalikan nilai (`void`)
     */
    private removeNode(node: LRUNode<K, V>): void {
        node.prev!.next = node.next
        node.next!.prev = node.prev
    }

    /**
     * Menyisipkan sebuah node tepat sebelum sentinel `tail` (posisi paling baru diakses).
     *
     * @param node - Node yang akan disisipkan
     * @returns Tidak mengembalikan nilai (`void`)
     */
    private insertBeforeTail(node: LRUNode<K, V>): void {
        node.prev = this.tail.prev
        node.next = this.tail
        this.tail.prev!.next = node
        this.tail.prev = node
    }
}
