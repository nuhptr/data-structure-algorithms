import { ISegmentTree } from "./interfaces"

/**
 * Segment Tree — struktur data berbasis array untuk menjawab range query
 * dan mendukung range/point update secara efisien.
 *
 * Implementasi ini menyimpan nilai maksimum di setiap node.
 *
 * Kompleksitas build  : O(n)
 * Kompleksitas query  : O(log n)
 * Kompleksitas update : O(log n) untuk point update (O(n) pada range update penuh tanpa lazy propagation)
 * Kompleksitas Ruang  : O(4n)
 *
 * @example
 * const tree = new SegmentTree([1, 2, -4, 7, 3, -5, 6])
 * tree.query(1, 3)     // => 7   (max dari index 1-3, 1-based)
 * tree.update(1, 2, 10)
 * tree.query(1, 7)     // => 10
 */
export class SegmentTree implements ISegmentTree {
    /** Array sumber awal yang digunakan saat membangun Segment Tree. */
    private sourceArray: number[]
    /** Array representasi pohon biner 1-based yang menyimpan nilai maksimum tiap segmen. */
    private treeNodes: number[]
    /** Jumlah elemen pada array sumber. */
    private arraySize: number

    /**
     * Membangun Segment Tree dari array bilangan awal dalam waktu O(n).
     *
     * @param array - Array bilangan sumber (0-based)
     */
    constructor(array: number[]) {
        this.sourceArray = array
        this.arraySize = array.length
        // Alokasi 4 * n cukup untuk menampung seluruh node complete binary tree
        this.treeNodes = Array(4 * this.arraySize).fill(0)

        if (this.arraySize > 0) {
            this.buildTree(1, 0, this.arraySize - 1)
        }
    }

    /**
     * Mengambil nilai maksimum pada rentang `[left, right]` (1-based, inklusif).
     *
     * @param left - Batas bawah rentang (1-based)
     * @param right - Batas atas rentang (1-based)
     * @returns Nilai maksimum pada rentang tersebut
     */
    query(left: number, right: number): number {
        // Konversi indeks 1-based dari pemanggil ke 0-based internal
        return this.queryNode(1, 0, this.arraySize - 1, left - 1, right - 1)
    }

    /**
     * Memperbarui seluruh elemen pada rentang `[left, right]` (1-based, inklusif) menjadi `value`.
     *
     * @param left - Batas bawah rentang (1-based)
     * @param right - Batas atas rentang (1-based)
     * @param value - Nilai baru yang diterapkan
     * @returns Tidak mengembalikan nilai (`void`)
     */
    update(left: number, right: number, value: number): void {
        // Konversi indeks 1-based dari pemanggil ke 0-based internal
        this.updateNode(1, 0, this.arraySize - 1, left - 1, right - 1, value)
    }

    // ─── Private helpers ──────────────────────────────────────────────────────

    /**
     * Menghitung indeks node anak kiri pada representasi array 1-based (`2 * nodeIndex`).
     *
     * @param nodeIndex - Indeks node induk
     * @returns Indeks node anak kiri
     */
    private leftChildIndex(nodeIndex: number): number {
        return nodeIndex * 2
    }

    /**
     * Menghitung indeks node anak kanan pada representasi array 1-based (`2 * nodeIndex + 1`).
     *
     * @param nodeIndex - Indeks node induk
     * @returns Indeks node anak kanan
     */
    private rightChildIndex(nodeIndex: number): number {
        return nodeIndex * 2 + 1
    }

    /**
     * Membangun subtree Segment Tree secara rekursif untuk segmen `[rangeLeft, rangeRight]`.
     *
     * @param nodeIndex - Indeks node saat ini pada `treeNodes`
     * @param rangeLeft - Batas kiri segmen (0-based)
     * @param rangeRight - Batas kanan segmen (0-based)
     * @returns Tidak mengembalikan nilai (`void`)
     */
    private buildTree(nodeIndex: number, rangeLeft: number, rangeRight: number): void {
        // Basis rekursi: node daun menyimpan elemen tunggal dari array sumber
        if (rangeLeft === rangeRight) {
            this.treeNodes[nodeIndex] = this.sourceArray[rangeLeft]
            return
        }

        // Bagi segmen menjadi dua, bangun kedua anak, lalu gabungkan dengan operasi max
        const midpoint = Math.floor((rangeLeft + rangeRight) / 2)
        this.buildTree(this.leftChildIndex(nodeIndex), rangeLeft, midpoint)
        this.buildTree(this.rightChildIndex(nodeIndex), midpoint + 1, rangeRight)
        this.treeNodes[nodeIndex] = Math.max(
            this.treeNodes[this.leftChildIndex(nodeIndex)],
            this.treeNodes[this.rightChildIndex(nodeIndex)],
        )
    }

    /**
     * Melakukan query maksimum secara rekursif pada segmen `[rangeLeft, rangeRight]`
     * terhadap rentang target `[queryLeft, queryRight]`.
     *
     * @param nodeIndex - Indeks node saat ini pada `treeNodes`
     * @param rangeLeft - Batas kiri segmen node saat ini (0-based)
     * @param rangeRight - Batas kanan segmen node saat ini (0-based)
     * @param queryLeft - Batas kiri rentang query (0-based)
     * @param queryRight - Batas kanan rentang query (0-based)
     * @returns Nilai maksimum pada irisan segmen, atau `-Infinity` jika di luar rentang
     */
    private queryNode(
        nodeIndex: number,
        rangeLeft: number,
        rangeRight: number,
        queryLeft: number,
        queryRight: number,
    ): number {
        // Kasus 1: segmen tidak beririsan sama sekali -> kembalikan elemen identitas max
        const isOutOfRange = rangeRight < queryLeft || rangeLeft > queryRight
        if (isOutOfRange) return -Infinity

        // Kasus 2: segmen sepenuhnya berada di dalam rentang query -> langsung kembalikan nilai node
        const isFullyCovered = rangeLeft >= queryLeft && rangeRight <= queryRight
        if (isFullyCovered) return this.treeNodes[nodeIndex]

        // Kasus 3: irisan parsial -> pecah query ke anak kiri dan anak kanan
        const midpoint = Math.floor((rangeLeft + rangeRight) / 2)
        const leftMax = this.queryNode(
            this.leftChildIndex(nodeIndex),
            rangeLeft,
            midpoint,
            queryLeft,
            queryRight,
        )
        const rightMax = this.queryNode(
            this.rightChildIndex(nodeIndex),
            midpoint + 1,
            rangeRight,
            queryLeft,
            queryRight,
        )
        return Math.max(leftMax, rightMax)
    }

    /**
     * Memperbarui nilai secara rekursif pada seluruh daun dalam irisan segmen `[rangeLeft, rangeRight]`
     * dan rentang pembaruan `[updateLeft, updateRight]`, lalu memperbarui node induk ke atas.
     *
     * @param nodeIndex - Indeks node saat ini pada `treeNodes`
     * @param rangeLeft - Batas kiri segmen node saat ini (0-based)
     * @param rangeRight - Batas kanan segmen node saat ini (0-based)
     * @param updateLeft - Batas kiri rentang update (0-based)
     * @param updateRight - Batas kanan rentang update (0-based)
     * @param value - Nilai baru yang diterapkan
     * @returns Tidak mengembalikan nilai (`void`)
     */
    private updateNode(
        nodeIndex: number,
        rangeLeft: number,
        rangeRight: number,
        updateLeft: number,
        updateRight: number,
        value: number,
    ): void {
        // Lewati cabang yang tidak beririsan dengan rentang update
        const isOutOfRange = rangeRight < updateLeft || rangeLeft > updateRight
        if (isOutOfRange) return

        // Basis rekursi: perbarui nilai pada node daun
        if (rangeLeft === rangeRight) {
            this.treeNodes[nodeIndex] = value
            return
        }

        // Propagasikan pembaruan ke kedua anak lalu hitung ulang nilai maksimum node induk
        const midpoint = Math.floor((rangeLeft + rangeRight) / 2)
        this.updateNode(
            this.leftChildIndex(nodeIndex),
            rangeLeft,
            midpoint,
            updateLeft,
            updateRight,
            value,
        )
        this.updateNode(
            this.rightChildIndex(nodeIndex),
            midpoint + 1,
            rangeRight,
            updateLeft,
            updateRight,
            value,
        )
        this.treeNodes[nodeIndex] = Math.max(
            this.treeNodes[this.leftChildIndex(nodeIndex)],
            this.treeNodes[this.rightChildIndex(nodeIndex)],
        )
    }
}
