import { ITreeTraversable } from "./interfaces"

/**
 * Fungsi pembanding untuk menentukan urutan relatif dua nilai.
 * Mengembalikan negatif jika `firstValue < secondValue`, `0` jika sama,
 * atau positif jika `firstValue > secondValue`.
 *
 * @template T Tipe nilai yang dibandingkan.
 * @param firstValue Nilai pertama.
 * @param secondValue Nilai kedua.
 * @returns Angka negatif, nol, atau positif sebagai hasil perbandingan.
 */
export type ValueComparator<T> = (firstValue: T, secondValue: T) => number

/**
 * Membandingkan dua nilai bawaan bertipe `number` atau `string`.
 * Tipe lain memerlukan comparator khusus saat inisialisasi pohon.
 *
 * Kompleksitas Waktu : O(1) untuk `number` | O(k) untuk `string` sepanjang k
 * Kompleksitas Ruang : O(1)
 *
 * @param firstValue Nilai pertama yang dibandingkan.
 * @param secondValue Nilai kedua yang dibandingkan.
 * @returns Nilai negatif, nol, atau positif sesuai urutan ascending.
 * @throws {Error} Jika kedua nilai bukan pasangan `number` atau `string`.
 *
 * @example
 * compareDefaultValues(3, 5) // => -2
 * compareDefaultValues("a", "b") // => -1
 */
export function compareDefaultValues(firstValue: unknown, secondValue: unknown): number {
    if (typeof firstValue === "number" && typeof secondValue === "number") {
        return firstValue - secondValue
    }

    if (typeof firstValue === "string" && typeof secondValue === "string") {
        if (firstValue === secondValue) return 0
        return firstValue < secondValue ? -1 : 1
    }

    throw new Error("Provide a comparator when using values other than numbers or strings.")
}

/**
 * Simpul pohon generik — menyimpan nilai dan referensi ke anak kiri serta kanan.
 *
 * @template T Tipe nilai yang disimpan pada simpul.
 */
export class TreeNode<T> {
    /** Anak kiri dari simpul ini, atau `null` jika tidak ada. */
    left: TreeNode<T> | null = null
    /** Anak kanan dari simpul ini, atau `null` jika tidak ada. */
    right: TreeNode<T> | null = null

    /**
     * Menyimpan nilai pada simpul baru dengan kedua anak dimulai sebagai `null`.
     *
     * @param value Nilai yang disimpan pada simpul.
     */
    constructor(public value: T) {}
}

/**
 * Binary Search Tree generik dengan traversal breadth-first dan
 * depth-first (pre-order, post-order, in-order).
 *
 * Urutan nilai diatur oleh comparator yang dapat disuntikkan;
 * tanpa comparator, hanya `number` dan `string` yang didukung.
 *
 * Kompleksitas Waktu : O(log n) rata-rata, O(n) worst case untuk `insert` | O(n) untuk semua traversal
 * Kompleksitas Ruang : O(n)
 *
 * @template T Tipe nilai yang disimpan pada setiap simpul (default `number`).
 *
 * @example
 * const tree = new BinarySearchTree<number>()
 * tree.insert(5)?.insert(3)?.insert(8)
 * tree.dfsInOrder() // => [3, 5, 8]
 */
export class BinarySearchTree<T = number> implements ITreeTraversable<T> {
    /** Simpul akar; `null` menandakan pohon kosong. */
    root: TreeNode<T> | null = null
    /** Comparator yang menentukan posisi cabang nilai di dalam pohon. */
    private readonly compareValues: ValueComparator<T>

    /**
     * Membuat pohon baru dengan comparator khusus atau pembanding bawaan untuk angka dan string.
     *
     * @param compareValues Fungsi pembanding opsional untuk menentukan urutan nilai.
     */
    constructor(compareValues?: ValueComparator<T>) {
        this.compareValues = compareValues ?? compareDefaultValues
    }

    /**
     * Menyisipkan nilai ke posisi yang sesuai aturan BST.
     * Nilai duplikat diabaikan dan mengembalikan `undefined`.
     *
     * @param value Nilai yang akan disisipkan ke dalam pohon.
     * @returns Instans `BinarySearchTree` saat ini jika berhasil, atau `undefined` jika duplikat.
     */
    insert(value: T): this | undefined {
        const newNode = new TreeNode(value)

        // Jika pohon masih kosong, simpul baru menjadi akar.
        if (this.root === null) {
            this.root = newNode
            return this
        }

        let currentNode = this.root

        // Telusuri pohon menggunakan comparator hingga menemukan posisi kosong.
        while (true) {
            const comparison = this.compareValues(value, currentNode.value)
            if (comparison === 0) return undefined

            const branch = comparison < 0 ? "left" : "right"
            const nextNode = currentNode[branch]

            if (nextNode === null) {
                currentNode[branch] = newNode
                return this
            }

            currentNode = nextNode
        }
    }

    /**
     * Mengunjungi simpul per level dari kiri ke kanan menggunakan antrean (BFS).
     *
     * @returns Array nilai simpul berdasarkan urutan level-order.
     */
    breadthFirstSearch(): T[] {
        const visitedValues: T[] = []
        if (this.root === null) return visitedValues

        // Gunakan array dengan indeks maju agar tidak perlu operasi `shift()` yang O(n).
        const nodesToVisit: TreeNode<T>[] = [this.root]

        for (let nextIndex = 0; nextIndex < nodesToVisit.length; nextIndex++) {
            const currentNode = nodesToVisit[nextIndex]
            visitedValues.push(currentNode.value)

            if (currentNode.left !== null) nodesToVisit.push(currentNode.left)
            if (currentNode.right !== null) nodesToVisit.push(currentNode.right)
        }

        return visitedValues
    }

    /**
     * Alias lama untuk `breadthFirstSearch()`.
     *
     * @deprecated Nama ini membingungkan — method ini breadth-first,
     * bukan depth-first. Gunakan {@link breadthFirstSearch}.
     * @returns Array nilai simpul berdasarkan urutan breadth-first.
     */
    dfs(): T[] {
        return this.breadthFirstSearch()
    }

    /**
     * Mengunjungi simpul saat ini, anak kiri, lalu anak kanan (DFS pre-order).
     *
     * @returns Array nilai simpul dalam urutan pre-order.
     */
    dfsPreOrder(): T[] {
        return this.traversePreOrder(this.root, [])
    }

    /**
     * Pembantu rekursif untuk penelusuran DFS pre-order (akar → kiri → kanan).
     *
     * @param currentNode Simpul yang sedang dikunjungi, atau `null` pada basis rekursi.
     * @param visitedValues Array akumulator penampung nilai yang telah dikunjungi.
     * @returns Array akumulator yang sama setelah sub-pohon selesai ditelusuri.
     */
    private traversePreOrder(currentNode: TreeNode<T> | null, visitedValues: T[]): T[] {
        if (currentNode === null) return visitedValues

        // Catat nilai simpul saat ini sebelum mengunjungi kedua anaknya.
        visitedValues.push(currentNode.value)
        this.traversePreOrder(currentNode.left, visitedValues)
        this.traversePreOrder(currentNode.right, visitedValues)
        return visitedValues
    }

    /**
     * Mengunjungi anak kiri, anak kanan, lalu simpul saat ini (DFS post-order).
     *
     * @returns Array nilai simpul dalam urutan post-order.
     */
    dfsPostOrder(): T[] {
        return this.traversePostOrder(this.root, [])
    }

    /**
     * Pembantu rekursif untuk penelusuran DFS post-order (kiri → kanan → akar).
     *
     * @param currentNode Simpul yang sedang dikunjungi, atau `null` pada basis rekursi.
     * @param visitedValues Array akumulator penampung nilai yang telah dikunjungi.
     * @returns Array akumulator yang sama setelah sub-pohon selesai ditelusuri.
     */
    private traversePostOrder(currentNode: TreeNode<T> | null, visitedValues: T[]): T[] {
        if (currentNode === null) return visitedValues

        // Kunjungi seluruh sub-pohon anak terlebih dahulu, baru catat simpul saat ini.
        this.traversePostOrder(currentNode.left, visitedValues)
        this.traversePostOrder(currentNode.right, visitedValues)
        visitedValues.push(currentNode.value)
        return visitedValues
    }

    /**
     * Mengunjungi anak kiri, simpul saat ini, lalu anak kanan (DFS in-order).
     * Pada BST, urutan ini menghasilkan nilai yang terurut menaik.
     *
     * @returns Array nilai simpul dalam urutan in-order.
     */
    dfsInOrder(): T[] {
        return this.traverseInOrder(this.root, [])
    }

    /**
     * Pembantu rekursif untuk penelusuran DFS in-order (kiri → akar → kanan).
     *
     * @param currentNode Simpul yang sedang dikunjungi, atau `null` pada basis rekursi.
     * @param visitedValues Array akumulator penampung nilai yang telah dikunjungi.
     * @returns Array akumulator yang sama setelah sub-pohon selesai ditelusuri.
     */
    private traverseInOrder(currentNode: TreeNode<T> | null, visitedValues: T[]): T[] {
        if (currentNode === null) return visitedValues

        // Kunjungi cabang kiri, catat simpul saat ini, lalu lanjut ke cabang kanan.
        this.traverseInOrder(currentNode.left, visitedValues)
        visitedValues.push(currentNode.value)
        this.traverseInOrder(currentNode.right, visitedValues)
        return visitedValues
    }
}
