import { IFenwickTree } from "./interfaces"

/**
 * Fenwick Tree / Binary Indexed Tree — struktur data untuk menghitung
 * prefix sum secara efisien dengan dukungan point update.
 *
 * Menggunakan indexing 1-based secara internal.
 * Semua operasi public menggunakan index 1-based.
 *
 * Kompleksitas update  : O(log n)
 * Kompleksitas query   : O(log n)
 * Kompleksitas build   : O(n)
 * Kompleksitas ruang   : O(n)
 *
 * @example
 * const tree = new FenwickTree(5)
 * tree.add(1, 3)
 * tree.add(2, 2)
 * tree.add(3, 5)
 * tree.rangeSum(1, 3) // => 10
 * tree.prefixSum(2)   // => 5
 */
export class FenwickTree implements IFenwickTree {
    /** Array internal 1-based yang menyimpan jumlah parsial tiap rentang bit. */
    private treeValues: number[]
    /** Jumlah elemen valid yang dikelola oleh Fenwick Tree. */
    private treeSize: number

    /**
     * Membuat Fenwick Tree kosong dengan kapasitas `size` elemen bernilai awal 0.
     *
     * @param size - Jumlah elemen yang dapat ditampung (harus >= 0)
     * @throws {Error} Jika `size` bernilai negatif
     */
    constructor(size: number) {
        if (size < 0) throw new Error("Ukuran tidak boleh negatif")
        this.treeSize = size
        // Alokasi size + 1 karena indeks 0 adalah dummy untuk pengindeksan 1-based
        this.treeValues = Array(size + 1).fill(0)
    }

    /**
     * Membangun Fenwick Tree dalam O(n) dari array nilai yang sudah ada.
     * Array menggunakan index 1-based (index 0 diabaikan).
     *
     * @param values - Array 1-based: `values[1..n]` berisi nilai awal
     * @returns Instance `FenwickTree` yang sudah terisi
     * @throws {Error} Jika `values` kosong
     */
    static fromArray(values: number[]): FenwickTree {
        if (values.length === 0) throw new Error("Array tidak boleh kosong")

        const size = values.length - 1
        const tree = new FenwickTree(size)
        tree.treeValues = [...values]

        // Propagasikan nilai setiap node langsung ke parent terdekatnya dalam satu lintasan O(n)
        for (let index = 1; index <= size; index++) {
            const parentIndex = index + FenwickTree.leastSignificantBit(index)
            if (parentIndex <= size) {
                tree.treeValues[parentIndex] += tree.treeValues[index]
            }
        }

        return tree
    }

    /**
     * Menambahkan nilai `delta` pada elemen di indeks `index` (1-based) dan memperbarui
     * seluruh node leluhur yang mencakup indeks tersebut.
     *
     * @param index - Posisi elemen (1-based)
     * @param delta - Nilai perubahan yang ditambahkan
     * @returns Tidak mengembalikan nilai (`void`)
     */
    add(index: number, delta: number): void {
        this.validateIndex(index)
        let currentIndex = index

        // Lompat ke parent berikutnya dengan menambahkan LSB hingga melewati batas ukuran pohon
        while (currentIndex <= this.treeSize) {
            this.treeValues[currentIndex] += delta
            currentIndex += FenwickTree.leastSignificantBit(currentIndex)
        }
    }

    /**
     * Menetapkan nilai elemen di indeks `index` (1-based) menjadi `value`.
     *
     * @param index - Posisi elemen (1-based)
     * @param value - Nilai baru yang akan ditetapkan
     * @returns Tidak mengembalikan nilai (`void`)
     */
    set(index: number, value: number): void {
        // Hitung selisih terhadap nilai lama lalu terapkan sebagai point update
        this.add(index, value - this.get(index))
    }

    /**
     * Menghitung jumlah kumulatif elemen dari indeks `1` sampai `index` (inklusif).
     *
     * @param index - Batas atas indeks (1-based)
     * @returns Hasil penjumlahan prefix `[1..index]`
     */
    prefixSum(index: number): number {
        this.validateIndex(index)
        let sum = 0
        let currentIndex = index

        // Akumulasikan blok-blok parsial dengan mengurangkan LSB hingga mencapai 0
        while (currentIndex > 0) {
            sum += this.treeValues[currentIndex]
            currentIndex -= FenwickTree.leastSignificantBit(currentIndex)
        }

        return sum
    }

    /**
     * Menghitung jumlah elemen pada rentang `[left, right]` secara inklusif (1-based).
     *
     * @param left - Batas bawah rentang (1-based)
     * @param right - Batas atas rentang (1-based)
     * @returns Total penjumlahan elemen dalam rentang `[left, right]`
     * @throws {Error} Jika `right < left`
     */
    rangeSum(left: number, right: number): number {
        if (right < left) throw new Error("right harus >= left")
        return this.prefixSum(right) - this.prefixSum(left - 1)
    }

    /**
     * Mengambil nilai tunggal elemen pada indeks `index` (1-based).
     *
     * @param index - Posisi elemen (1-based)
     * @returns Nilai elemen pada indeks tersebut
     */
    get(index: number): number {
        return this.rangeSum(index, index)
    }

    /**
     * Mengembalikan jumlah elemen yang dapat ditampung oleh Fenwick Tree.
     *
     * @returns Kapasitas elemen pohon
     */
    size(): number {
        return this.treeSize
    }

    /**
     * Mengisolasi bit paling kanan yang bernilai 1 (Least Significant Bit)
     * menggunakan operasi bitwise `index & -index`.
     *
     * @param index - Indeks bilangan bulat positif
     * @returns Nilai pangkat dua dari bit paling kanan yang aktif
     */
    private static leastSignificantBit(index: number): number {
        return index & -index
    }

    /**
     * Memvalidasi bahwa indeks berada di dalam rentang valid `[1, treeSize]`.
     *
     * @param index - Indeks 1-based yang akan diperiksa
     * @returns Tidak mengembalikan nilai (`void`)
     * @throws {RangeError} Jika indeks berada di luar rentang `[1, treeSize]`
     */
    private validateIndex(index: number): void {
        if (index < 1 || index > this.treeSize) {
            throw new RangeError(`Index ${index} di luar rentang [1, ${this.treeSize}]`)
        }
    }
}
