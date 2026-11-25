import { IBinarySearchTree } from "./interfaces"

/** Simpul BST — menyimpan angka dan referensi ke anak kiri maupun kanan. */
export class BSTNode {
    /** Nilai angka yang disimpan pada simpul ini. */
    value: number
    /** Anak kiri menyimpan nilai yang lebih kecil; null jika belum ada. */
    left: BSTNode | null = null
    /** Anak kanan menyimpan nilai yang lebih besar; null jika belum ada. */
    right: BSTNode | null = null

    /** Buat simpul baru tanpa anak. */
    constructor(value: number) {
        this.value = value
    }
}

/**
 * Binary Search Tree — nilai lebih kecil disimpan di cabang kiri,
 * nilai lebih besar di cabang kanan.
 *
 * Kompleksitas Waktu : O(log n) rata-rata | O(n) worst case
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const tree = new BST();
 * tree.insert(5).insert(3).insert(8);
 * tree.includes(3); // => true
 */
export class BST implements IBinarySearchTree<number> {
    /** Simpul paling atas; null berarti pohon masih kosong. */
    root: BSTNode | null = null

    /**
     * Sisipkan nilai ke posisi yang sesuai pada pohon.
     * Nilai duplikat tidak disisipkan.
     */
    insert(value: number): this | undefined {
        if (this.root === null) {
            this.root = new BSTNode(value)
            return this
        }

        let currentNode = this.root

        while (true) {
            if (value === currentNode.value) return undefined

            if (value < currentNode.value) {
                if (currentNode.left === null) {
                    currentNode.left = new BSTNode(value)
                    return this
                }
                currentNode = currentNode.left
                continue
            }

            if (currentNode.right === null) {
                currentNode.right = new BSTNode(value)
                return this
            }
            currentNode = currentNode.right
        }
    }

    /** Periksa apakah nilai ditemukan dengan mengikuti aturan urutan BST. */
    includes(value: number): boolean {
        let currentNode = this.root

        while (currentNode !== null) {
            if (value === currentNode.value) return true
            currentNode = value < currentNode.value ? currentNode.left : currentNode.right
        }

        return false
    }
}
