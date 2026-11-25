import { ITreeTraversable } from "./interfaces"

/**
 * Fungsi pembanding untuk menentukan urutan dua nilai.
 * Mengembalikan negatif, nol, atau positif.
 */
export type ValueComparator<T> = (firstValue: T, secondValue: T) => number

/**
 * Bandingkan angka atau string; tipe lain memerlukan comparator khusus.
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

/** Simpul pohon — menyimpan nilai dan referensi ke anak kiri serta kanan. */
export class TreeNode<T> {
    left: TreeNode<T> | null = null
    right: TreeNode<T> | null = null

    /** Simpan nilai pada simpul baru; kedua anak dimulai sebagai null. */
    constructor(public value: T) {}
}

/**
 * Binary Search Tree generik dengan traversal breadth-first dan
 * depth-first (pre-order, post-order, in-order).
 *
 * Urutan nilai diatur oleh comparator yang dapat disuntikkan;
 * tanpa comparator, hanya number dan string yang didukung.
 *
 * @example
 * const tree = new BinarySearchTree<number>();
 * tree.insert(5).insert(3).insert(8);
 * tree.dfsInOrder(); // => [3, 5, 8]
 */
export class BinarySearchTree<T = number> implements ITreeTraversable<T> {
    /** Simpul akar; null menandakan pohon kosong. */
    root: TreeNode<T> | null = null
    /** Comparator yang menentukan posisi nilai di pohon. */
    private readonly compareValues: ValueComparator<T>

    /** Gunakan comparator khusus atau pembanding bawaan untuk angka dan string. */
    constructor(compareValues?: ValueComparator<T>) {
        this.compareValues = compareValues ?? compareDefaultValues
    }

    /** Sisipkan nilai; duplikat diabaikan dan pohon dikembalikan jika berhasil. */
    insert(value: T): this | undefined {
        const newNode = new TreeNode(value)

        if (this.root === null) {
            this.root = newNode
            return this
        }

        let currentNode = this.root

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

    /** Kunjungi simpul per level, dari kiri ke kanan, menggunakan antrean. */
    breadthFirstSearch(): T[] {
        const visitedValues: T[] = []
        if (this.root === null) return visitedValues

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
     * @deprecated Nama ini membingungkan — method ini breadth-first,
     * bukan depth-first. Gunakan breadthFirstSearch().
     */
    dfs(): T[] {
        return this.breadthFirstSearch()
    }

    /** Kunjungi simpul, anak kiri, lalu anak kanan (pre-order). */
    dfsPreOrder(): T[] {
        return this.traversePreOrder(this.root, [])
    }

    private traversePreOrder(currentNode: TreeNode<T> | null, visitedValues: T[]): T[] {
        if (currentNode === null) return visitedValues

        visitedValues.push(currentNode.value)
        this.traversePreOrder(currentNode.left, visitedValues)
        this.traversePreOrder(currentNode.right, visitedValues)
        return visitedValues
    }

    /** Kunjungi anak kiri, anak kanan, lalu simpul saat ini (post-order). */
    dfsPostOrder(): T[] {
        return this.traversePostOrder(this.root, [])
    }

    private traversePostOrder(currentNode: TreeNode<T> | null, visitedValues: T[]): T[] {
        if (currentNode === null) return visitedValues

        this.traversePostOrder(currentNode.left, visitedValues)
        this.traversePostOrder(currentNode.right, visitedValues)
        visitedValues.push(currentNode.value)
        return visitedValues
    }

    /** Kunjungi anak kiri, simpul saat ini, lalu anak kanan (in-order). */
    dfsInOrder(): T[] {
        return this.traverseInOrder(this.root, [])
    }

    private traverseInOrder(currentNode: TreeNode<T> | null, visitedValues: T[]): T[] {
        if (currentNode === null) return visitedValues

        this.traverseInOrder(currentNode.left, visitedValues)
        visitedValues.push(currentNode.value)
        this.traverseInOrder(currentNode.right, visitedValues)
        return visitedValues
    }
}
