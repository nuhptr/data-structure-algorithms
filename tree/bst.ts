import { IBinarySearchTree } from "./interfaces"

/**
 * Simpul BST — menyimpan satu angka serta referensi ke anak kiri dan anak kanan.
 */
export class BSTNode {
    /** Nilai angka yang disimpan pada simpul ini. */
    value: number
    /** Anak kiri menyimpan nilai yang lebih kecil; `null` jika belum ada. */
    left: BSTNode | null = null
    /** Anak kanan menyimpan nilai yang lebih besar; `null` jika belum ada. */
    right: BSTNode | null = null

    /**
     * Membuat simpul BST baru tanpa anak kiri maupun kanan.
     *
     * @param value Nilai angka yang disimpan pada simpul.
     */
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
 * const tree = new BST()
 * tree.insert(5)?.insert(3)?.insert(8)
 * tree.includes(3) // => true
 */
export class BST implements IBinarySearchTree<number> {
    /** Simpul paling atas (akar); `null` berarti pohon masih kosong. */
    root: BSTNode | null = null

    /**
     * Menyisipkan nilai ke posisi yang sesuai pada pohon.
     * Nilai duplikat diabaikan dan tidak disisipkan.
     *
     * @param value Nilai angka yang akan disisipkan.
     * @returns Instans `BST` saat ini jika berhasil, atau `undefined` jika nilai sudah ada.
     */
    insert(value: number): this | undefined {
        // Jika pohon kosong, jadikan simpul baru sebagai akar.
        if (this.root === null) {
            this.root = new BSTNode(value)
            return this
        }

        let currentNode = this.root

        // Telusuri cabang kiri/kanan hingga menemukan slot kosong yang tepat.
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

    /**
     * Memeriksa apakah nilai ditemukan dengan mengikuti aturan urutan BST.
     *
     * @param value Nilai angka yang dicari di dalam pohon.
     * @returns `true` jika nilai ditemukan, selain itu `false`.
     */
    includes(value: number): boolean {
        let currentNode = this.root

        // Turun ke cabang kiri jika lebih kecil, atau ke kanan jika lebih besar.
        while (currentNode !== null) {
            if (value === currentNode.value) return true
            currentNode = value < currentNode.value ? currentNode.left : currentNode.right
        }

        return false
    }
}
