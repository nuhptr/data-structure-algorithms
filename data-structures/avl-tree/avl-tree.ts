import { IAVLTree } from "./interfaces"

/**
 * Node internal pada AVL Tree yang menyimpan nilai, referensi anak kiri/kanan,
 * serta tinggi subtree yang berakar pada node ini.
 *
 * @typeParam T - Tipe nilai yang disimpan pada node
 */
class AVLNode<T> {
    /** Nilai yang disimpan pada node. */
    value: T
    /** Referensi ke anak kiri (nilai lebih kecil), atau `null` jika tidak ada. */
    left: AVLNode<T> | null = null
    /** Referensi ke anak kanan (nilai lebih besar), atau `null` jika tidak ada. */
    right: AVLNode<T> | null = null
    /** Tinggi subtree yang berakar pada node ini (node daun bernilai 1). */
    height: number = 1

    /**
     * Membuat node AVL baru dengan tinggi awal 1.
     *
     * @param value - Nilai yang akan disimpan di dalam node
     */
    constructor(value: T) {
        this.value = value
    }
}

/**
 * AVL Tree — Binary Search Tree yang menyeimbangkan diri sendiri.
 * Setiap node menjaga balance factor (perbedaan tinggi kiri dan kanan)
 * dalam rentang [-1, 0, 1] dengan rotasi otomatis.
 *
 * Kompleksitas insert  : O(log n)
 * Kompleksitas delete  : O(log n)
 * Kompleksitas search  : O(log n)
 * Kompleksitas ruang   : O(n)
 *
 * @typeParam T - Tipe nilai elemen yang disimpan di dalam pohon
 *
 * @example
 * const tree = new AVLTree<number>()
 * tree.insert(10)
 * tree.insert(20)
 * tree.insert(5)
 * tree.inOrder() // => [5, 10, 20]
 * tree.height()  // => 2
 */
export class AVLTree<T> implements IAVLTree<T> {
    /** Node akar (root) AVL Tree, atau `null` jika pohon kosong. */
    private root: AVLNode<T> | null = null

    /**
     * Menyisipkan nilai baru ke dalam AVL Tree. Nilai duplikat akan diabaikan.
     *
     * @param value - Nilai yang akan disisipkan
     * @returns Tidak mengembalikan nilai (`void`)
     */
    insert(value: T): void {
        this.root = this.insertNode(this.root, value)
    }

    /**
     * Menghapus nilai tertentu dari AVL Tree dan melakukan penyeimbangan ulang jika diperlukan.
     *
     * @param value - Nilai yang akan dihapus
     * @returns Tidak mengembalikan nilai (`void`)
     */
    delete(value: T): void {
        this.root = this.deleteNode(this.root, value)
    }

    /**
     * Memeriksa apakah suatu nilai ada di dalam AVL Tree.
     *
     * @param value - Nilai yang dicari
     * @returns `true` jika nilai ditemukan, `false` jika tidak
     */
    contains(value: T): boolean {
        return this.searchNode(this.root, value)
    }

    /**
     * Mengembalikan tinggi total AVL Tree.
     *
     * @returns Tinggi pohon saat ini (0 jika pohon kosong)
     */
    height(): number {
        return this.getHeight(this.root)
    }

    /**
     * Mengembalikan seluruh elemen pohon dalam urutan menaik menggunakan traversal in-order.
     *
     * @returns Array berisi semua nilai secara terurut
     */
    inOrder(): T[] {
        const result: T[] = []
        this.inOrderTraversal(this.root, result)
        return result
    }

    // ─── Private helpers ──────────────────────────────────────────────────────

    /**
     * Mengambil tinggi sebuah node dengan aman (0 jika `null`).
     *
     * @param node - Node target atau `null`
     * @returns Tinggi node atau 0
     */
    private getHeight(node: AVLNode<T> | null): number {
        return node?.height ?? 0
    }

    /**
     * Menghitung balance factor sebuah node: `tinggi(kiri) - tinggi(kanan)`.
     * Nilai > 1 berarti berat ke kiri, nilai < -1 berarti berat ke kanan.
     *
     * @param node - Node yang akan dihitung balance factor-nya
     * @returns Selisih tinggi subtree kiri dan kanan
     */
    private getBalanceFactor(node: AVLNode<T> | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0
    }

    /**
     * Memperbarui properti `height` node berdasarkan tinggi maksimum kedua anaknya.
     *
     * @param node - Node yang tingginya akan dihitung ulang
     * @returns Tidak mengembalikan nilai (`void`)
     */
    private updateHeight(node: AVLNode<T>): void {
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right))
    }

    // ─── Rotations ────────────────────────────────────────────────────────────

    /**
     * Melakukan rotasi kanan (Right Rotation) untuk menyeimbangkan subtree yang berat ke kiri.
     *
     * @param unbalancedNode - Node akar subtree yang tidak seimbang
     * @returns Node akar baru setelah rotasi kanan
     */
    private rotateRight(unbalancedNode: AVLNode<T>): AVLNode<T> {
        // Anak kiri naik menjadi akar baru, anak kanannya dipindahkan ke kiri node lama
        const newRoot = unbalancedNode.left!
        unbalancedNode.left = newRoot.right
        newRoot.right = unbalancedNode

        // Perbarui tinggi mulai dari node yang lebih bawah terlebih dahulu
        this.updateHeight(unbalancedNode)
        this.updateHeight(newRoot)
        return newRoot
    }

    /**
     * Melakukan rotasi kiri (Left Rotation) untuk menyeimbangkan subtree yang berat ke kanan.
     *
     * @param unbalancedNode - Node akar subtree yang tidak seimbang
     * @returns Node akar baru setelah rotasi kiri
     */
    private rotateLeft(unbalancedNode: AVLNode<T>): AVLNode<T> {
        // Anak kanan naik menjadi akar baru, anak kirinya dipindahkan ke kanan node lama
        const newRoot = unbalancedNode.right!
        unbalancedNode.right = newRoot.left
        newRoot.left = unbalancedNode

        // Perbarui tinggi mulai dari node yang lebih bawah terlebih dahulu
        this.updateHeight(unbalancedNode)
        this.updateHeight(newRoot)
        return newRoot
    }

    /**
     * Memperbarui tinggi node lalu menyeimbangkan subtree dengan rotasi tunggal/ganda
     * sesuai empat kasus ketidakseimbangan AVL (LL, LR, RR, RL).
     *
     * @param node - Node akar subtree yang diperiksa keseimbangannya
     * @returns Node akar subtree yang sudah seimbang
     */
    private rebalance(node: AVLNode<T>): AVLNode<T> {
        this.updateHeight(node)
        const balanceFactor = this.getBalanceFactor(node)

        // Kasus Kiri-Kiri (LL): cukup satu rotasi kanan
        if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
            return this.rotateRight(node)
        }
        // Kasus Kiri-Kanan (LR): rotasi kiri pada anak kiri, lalu rotasi kanan pada node
        if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
            node.left = this.rotateLeft(node.left!)
            return this.rotateRight(node)
        }
        // Kasus Kanan-Kanan (RR): cukup satu rotasi kiri
        if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
            return this.rotateLeft(node)
        }
        // Kasus Kanan-Kiri (RL): rotasi kanan pada anak kanan, lalu rotasi kiri pada node
        if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
            node.right = this.rotateRight(node.right!)
            return this.rotateLeft(node)
        }

        return node
    }

    /**
     * Menyisipkan nilai secara rekursif ke dalam subtree lalu menyeimbangkan ulang jalur pulang.
     *
     * @param node - Akar subtree saat ini
     * @param value - Nilai yang akan disisipkan
     * @returns Akar subtree setelah penyisipan dan penyeimbangan
     */
    private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
        if (node === null) return new AVLNode(value)

        if (value < node.value) {
            node.left = this.insertNode(node.left, value)
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value)
        } else {
            return node // duplikat diabaikan
        }

        return this.rebalance(node)
    }

    /**
     * Mencari node dengan nilai terkecil di dalam sebuah subtree (node paling kiri).
     *
     * @param node - Akar subtree tempat pencarian dimulai
     * @returns Node dengan nilai minimum
     */
    private getMinNode(node: AVLNode<T>): AVLNode<T> {
        let current = node
        while (current.left !== null) current = current.left
        return current
    }

    /**
     * Menghapus nilai secara rekursif dari subtree lalu menyeimbangkan ulang jalur pulang.
     *
     * @param node - Akar subtree saat ini
     * @param value - Nilai yang akan dihapus
     * @returns Akar subtree setelah penghapusan dan penyeimbangan, atau `null` jika subtree kosong
     */
    private deleteNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
        if (node === null) return null

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value)
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value)
        } else {
            // Node ditemukan — tangani kasus 0 atau 1 anak
            if (node.left === null) return node.right
            if (node.right === null) return node.left

            // Node punya dua anak — ganti dengan in-order successor terkecil dari subtree kanan
            const successor = this.getMinNode(node.right)
            node.value = successor.value
            node.right = this.deleteNode(node.right, successor.value)
        }

        return this.rebalance(node)
    }

    /**
     * Mencari nilai secara rekursif mengikuti sifat Binary Search Tree.
     *
     * @param node - Akar subtree saat ini
     * @param value - Nilai yang dicari
     * @returns `true` jika nilai ditemukan, `false` jika mencapai `null`
     */
    private searchNode(node: AVLNode<T> | null, value: T): boolean {
        if (node === null) return false
        if (value === node.value) return true
        return value < node.value
            ? this.searchNode(node.left, value)
            : this.searchNode(node.right, value)
    }

    /**
     * Menelusuri subtree secara in-order (kiri → akar → kanan) dan mengumpulkan nilainya.
     *
     * @param node - Akar subtree saat ini
     * @param result - Array penampung hasil traversal
     * @returns Tidak mengembalikan nilai (`void`)
     */
    private inOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
        if (node === null) return
        this.inOrderTraversal(node.left, result)
        result.push(node.value)
        this.inOrderTraversal(node.right, result)
    }
}
