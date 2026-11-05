/** Simpul BST menyimpan angka dan referensi ke anak kiri maupun kanan. */
class BSTNode {
    /** Nilai angka yang disimpan pada simpul ini. */
    value: number
    /** Anak kiri menyimpan nilai yang lebih kecil; null jika belum ada. */
    left: BSTNode | null = null
    /** Anak kanan menyimpan nilai yang lebih besar; null jika belum ada. */
    right: BSTNode | null = null

    /** Buat simpul baru tanpa anak. */
    constructor(value: number) {
        this.value = value
        this.left = null
        this.right = null
    }
}

/** Binary Search Tree yang menjaga nilai lebih kecil di kiri dan lebih besar di kanan. */
class BST {
    /** Simpul paling atas; null berarti pohon masih kosong. */
    root: BSTNode | null = null

    /**
     * Sisipkan nilai ke posisi yang sesuai pada pohon.
     * Nilai duplikat tidak disisipkan; jika berhasil, kembalikan pohon ini.
     */
    insert(value: number): this | undefined {
        /** Jadikan nilai pertama sebagai akar pohon. */
        if (this.root === null) {
            this.root = new BSTNode(value)
            return this
        }

        /** Mulai pencarian posisi dari akar. */
        let currentNode = this.root

        /** Ikuti cabang kiri atau kanan sampai menemukan posisi kosong. */
        while (true) {
            /** BST ini tidak menyimpan nilai duplikat. */
            if (value === currentNode.value) return undefined

            /** Nilai lebih kecil ditempatkan pada cabang kiri. */
            if (value < currentNode.value) {
                /** Jika cabang kiri kosong, sisipkan nilai di sana. */
                if (currentNode.left === null) {
                    currentNode.left = new BSTNode(value)
                    return this
                }

                /** Lanjutkan pencarian pada anak kiri yang sudah ada. */
                currentNode = currentNode.left
                continue
            }

            /** Nilai lebih besar ditempatkan pada cabang kanan. */
            if (currentNode.right === null) {
                currentNode.right = new BSTNode(value)
                return this
            }

            /** Lanjutkan pencarian pada anak kanan yang sudah ada. */
            currentNode = currentNode.right
        }
    }

    /** Periksa apakah nilai ditemukan dengan mengikuti aturan urutan BST. */
    includes(value: number): boolean {
        /** Mulai pencarian dari akar; akar null berarti pohon kosong. */
        let currentNode = this.root

        /** Berhenti jika nilai ditemukan atau cabang yang dibutuhkan kosong. */
        while (currentNode !== null) {
            /** Nilai cocok dengan simpul saat ini. */
            if (value === currentNode.value) return true

            /** Pilih kiri untuk nilai lebih kecil, atau kanan untuk nilai lebih besar. */
            currentNode = value < currentNode.value ? currentNode.left : currentNode.right
        }

        /** Tidak ada simpul tersisa pada cabang pencarian, jadi nilai tidak ditemukan. */
        return false
    }
}

/** Buat pohon dan isi dengan contoh nilai. */
const tree = new BST()

/** Nilai-nilai ini membentuk cabang kiri dan kanan dari akar 5. */
tree.insert(5)
tree.insert(8)
tree.insert(3)
tree.insert(1)
tree.insert(7)
tree.insert(9)

console.log(tree)

/** Tampilkan apakah angka 9 ada di dalam pohon. */
console.log(tree.includes(9))
