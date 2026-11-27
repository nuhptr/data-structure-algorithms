import { IHeap } from "./interfaces"

/**
 * Abstract Heap — implementasi dasar Binary Heap berbasis array.
 *
 * Subclass menentukan apakah ini MinHeap atau MaxHeap lewat
 * fungsi comparator yang diberikan ke constructor.
 *
 * Kompleksitas insert  : O(log n)
 * Kompleksitas extract : O(log n)
 * Kompleksitas peek    : O(1)
 * Kompleksitas ruang   : O(n)
 *
 * @typeParam T - Tipe elemen yang disimpan di dalam Heap
 *
 * @example
 * const minHeap = new MinHeap<number>()
 * minHeap.insert(5)
 * minHeap.insert(2)
 * minHeap.extract() // => 2
 */
export abstract class Heap<T> implements IHeap<T> {
    /** Array internal yang merepresentasikan complete binary tree secara level-order. */
    protected items: T[]
    /** Fungsi pembanding: mengembalikan `true` jika `parent` sudah berada di posisi yang benar di atas `child`. */
    protected comparator: (parent: T, child: T) => boolean

    /**
     * Menginisialisasi Heap kosong dengan fungsi pembanding tertentu.
     *
     * @param comparator - Fungsi yang menentukan urutan prioritas antara parent dan child
     */
    constructor(comparator: (parent: T, child: T) => boolean) {
        this.items = []
        this.comparator = comparator
    }

    /**
     * Menyisipkan elemen baru ke akhir array lalu menaikkannya (`bubbleUp`) hingga properti heap terpenuhi.
     *
     * @param value - Nilai elemen yang akan disisipkan
     * @returns Tidak mengembalikan nilai (`void`)
     */
    insert(value: T): void {
        this.items.push(value)
        this.bubbleUp()
    }

    /**
     * Menghapus dan mengembalikan elemen puncak (indeks 0), lalu memindahkan elemen terakhir ke puncak
     * dan menurunkannya (`sinkDown`) untuk memulihkan properti heap.
     *
     * @returns Elemen puncak Heap
     */
    extract(): T {
        const topValue = this.items[0]
        const lastValue = this.items.pop()!

        // Jika masih ada elemen tersisa, tempatkan elemen terakhir di puncak lalu sinkDown
        if (this.items.length > 0) {
            this.items[0] = lastValue
            this.sinkDown()
        }

        return topValue
    }

    /**
     * Mengembalikan jumlah elemen di dalam Heap.
     *
     * @returns Jumlah elemen
     */
    size(): number {
        return this.items.length
    }

    /**
     * Memeriksa apakah Heap kosong.
     *
     * @returns `true` jika tidak ada elemen, `false` jika berisi minimal satu elemen
     */
    isEmpty(): boolean {
        return this.items.length === 0
    }

    /**
     * Menukar posisi dua elemen di dalam array internal `items`.
     *
     * @param indexA - Indeks elemen pertama
     * @param indexB - Indeks elemen kedua
     * @returns Tidak mengembalikan nilai (`void`)
     */
    protected swap(indexA: number, indexB: number): void {
        ;[this.items[indexA], this.items[indexB]] = [this.items[indexB], this.items[indexA]]
    }

    /**
     * Menghitung indeks node induk (parent) dari indeks anak tertentu.
     *
     * @param childIndex - Indeks node anak
     * @returns Indeks node induk
     */
    private getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2)
    }

    /**
     * Menghitung indeks anak kiri dari indeks induk tertentu.
     *
     * @param parentIndex - Indeks node induk
     * @returns Indeks anak kiri (`2 * parentIndex + 1`)
     */
    private getLeftChildIndex(parentIndex: number): number {
        return parentIndex * 2 + 1
    }

    /**
     * Menghitung indeks anak kanan dari indeks induk tertentu.
     *
     * @param parentIndex - Indeks node induk
     * @returns Indeks anak kanan (`2 * parentIndex + 2`)
     */
    private getRightChildIndex(parentIndex: number): number {
        return parentIndex * 2 + 2
    }

    /**
     * Memeriksa apakah pasangan induk dan anak sudah memenuhi aturan comparator Heap.
     *
     * @param childIndex - Indeks node anak
     * @param parentIndex - Indeks node induk
     * @returns `true` jika posisi sudah valid, `false` jika perlu ditukar
     */
    private isCorrectlyPlaced(childIndex: number, parentIndex: number): boolean {
        return this.comparator(this.items[parentIndex], this.items[childIndex])
    }

    /**
     * Memilih indeks anak yang memiliki prioritas lebih tinggi antara anak kiri dan anak kanan.
     *
     * @param leftIndex - Indeks anak kiri
     * @param rightIndex - Indeks anak kanan
     * @returns Indeks anak yang lebih diprioritaskan sesuai comparator
     */
    private getBetterChildIndex(leftIndex: number, rightIndex: number): number {
        const rightExists = rightIndex < this.size()

        if (!rightExists) return leftIndex

        return this.comparator(this.items[leftIndex], this.items[rightIndex])
            ? leftIndex
            : rightIndex
    }

    /**
     * Memulihkan properti heap ke arah atas (heapify-up) mulai dari `startIndex` hingga root.
     *
     * @param startIndex - Indeks awal proses bubble-up (default: elemen terakhir)
     * @returns Tidak mengembalikan nilai (`void`)
     */
    private bubbleUp(startIndex: number = this.size() - 1): void {
        let currentIndex = startIndex

        while (currentIndex > 0) {
            const parentIndex = this.getParentIndex(currentIndex)

            // Berhenti jika node sudah memenuhi properti heap terhadap parent-nya
            if (this.isCorrectlyPlaced(currentIndex, parentIndex)) break

            this.swap(parentIndex, currentIndex)
            currentIndex = parentIndex
        }
    }

    /**
     * Memulihkan properti heap ke arah bawah (heapify-down) mulai dari root (indeks 0).
     *
     * @returns Tidak mengembalikan nilai (`void`)
     */
    private sinkDown(): void {
        let currentIndex = 0

        while (true) {
            const leftChildIndex = this.getLeftChildIndex(currentIndex)
            const rightChildIndex = this.getRightChildIndex(currentIndex)
            const leftExists = leftChildIndex < this.size()

            // Jika tidak punya anak kiri, node sudah menjadi daun
            if (!leftExists) break

            const betterChildIndex = this.getBetterChildIndex(leftChildIndex, rightChildIndex)

            // Berhenti jika node sudah lebih prioritas dibanding anak terbaiknya
            if (this.isCorrectlyPlaced(betterChildIndex, currentIndex)) break

            this.swap(betterChildIndex, currentIndex)
            currentIndex = betterChildIndex
        }
    }
}

// ─── MinHeap ──────────────────────────────────────────────────────────────────

/**
 * Min Heap — elemen terkecil selalu berada di puncak.
 *
 * Kompleksitas insert  : O(log n)
 * Kompleksitas extract : O(log n)
 * Kompleksitas ruang   : O(n)
 *
 * @typeParam T - Tipe elemen yang disimpan di dalam MinHeap
 *
 * @example
 * const heap = new MinHeap<number>()
 * heap.insert(5)
 * heap.insert(2)
 * heap.insert(8)
 * heap.extract() // => 2
 */
export class MinHeap<T> extends Heap<T> {
    /**
     * Membuat instance MinHeap dengan comparator default `a < b`.
     *
     * @param comparator - Fungsi pembanding opsional; default `(a, b) => a < b`
     */
    constructor(comparator: (a: T, b: T) => boolean = (a, b) => a < b) {
        super(comparator)
    }
}

// ─── MaxHeap ──────────────────────────────────────────────────────────────────

/**
 * Max Heap — elemen terbesar selalu berada di puncak.
 *
 * Kompleksitas insert  : O(log n)
 * Kompleksitas extract : O(log n)
 * Kompleksitas ruang   : O(n)
 *
 * @typeParam T - Tipe elemen yang disimpan di dalam MaxHeap
 *
 * @example
 * const heap = new MaxHeap<number>()
 * heap.insert(5)
 * heap.insert(2)
 * heap.insert(8)
 * heap.extract() // => 8
 */
export class MaxHeap<T> extends Heap<T> {
    /**
     * Membuat instance MaxHeap dengan comparator default `a > b`.
     *
     * @param comparator - Fungsi pembanding opsional; default `(a, b) => a > b`
     */
    constructor(comparator: (a: T, b: T) => boolean = (a, b) => a > b) {
        super(comparator)
    }
}
