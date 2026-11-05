/** Fungsi pembanding mengembalikan negatif, nol, atau positif sesuai urutan nilai. */
type ValueComparator<T> = (firstValue: T, secondValue: T) => number

/** Bandingkan angka atau string; tipe lain memerlukan comparator khusus. */
function compareDefaultValues(firstValue: unknown, secondValue: unknown): number {
    if (typeof firstValue === "number" && typeof secondValue === "number") {
        return firstValue - secondValue
    }

    if (typeof firstValue === "string" && typeof secondValue === "string") {
        if (firstValue === secondValue) return 0
        return firstValue < secondValue ? -1 : 1
    }

    throw new Error("Provide a comparator when using values other than numbers or strings.")
}

/** Simpul pohon menyimpan nilai dan referensi ke anak kiri serta kanan. */
class TreeNode<T> {
    /** Anak kiri berisi nilai yang lebih kecil menurut comparator. */
    left: TreeNode<T> | null = null
    /** Anak kanan berisi nilai yang lebih besar menurut comparator. */
    right: TreeNode<T> | null = null

    /** Simpan nilai pada simpul baru; kedua anak dimulai sebagai null. */
    constructor(public value: T) {}
}

/** Binary Search Tree generik dengan traversal breadth-first dan depth-first. */
class BinarySearchTree<T = number> {
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
        /** Siapkan simpul yang akan ditempatkan pada pohon. */
        const newNode = new TreeNode(value)

        /** Jika pohon kosong, simpul baru menjadi akar. */
        if (this.root === null) {
            this.root = newNode
            return this
        }

        /** Mulai mencari posisi sisip dari akar. */
        let currentNode = this.root

        /** Ikuti cabang sesuai hasil perbandingan hingga menemukan tempat kosong. */
        while (true) {
            const comparison = this.compareValues(value, currentNode.value)
            /** Nilai dengan urutan yang sama tidak disisipkan dua kali. */
            if (comparison === 0) return undefined

            /** Pilih kiri untuk nilai lebih kecil, kanan untuk nilai lebih besar. */
            const branch = comparison < 0 ? "left" : "right"
            const nextNode = currentNode[branch]

            /** Pasang simpul pada cabang kosong yang ditemukan. */
            if (nextNode === null) {
                currentNode[branch] = newNode
                return this
            }

            /** Lanjutkan pencarian dari anak pada cabang terpilih. */
            currentNode = nextNode
        }
    }

    /** Kunjungi simpul per level, dari kiri ke kanan, menggunakan antrean. */
    breadthFirstSearch(): T[] {
        /** Simpan nilai dalam urutan kunjungan. */
        const visitedValues: T[] = []
        /** Pohon kosong tidak memiliki nilai untuk dikunjungi. */
        if (this.root === null) return visitedValues

        /** Antrean dimulai dari akar; anak-anak ditambahkan setelah tiap kunjungan. */
        const nodesToVisit: TreeNode<T>[] = [this.root]

        /** Indeks bergerak sepanjang antrean agar urutan level tetap terjaga. */
        for (let nextIndex = 0; nextIndex < nodesToVisit.length; nextIndex++) {
            const currentNode = nodesToVisit[nextIndex]
            visitedValues.push(currentNode.value)

            /** Masukkan anak kiri lebih dulu agar dikunjungi sebelum anak kanan. */
            if (currentNode.left !== null) nodesToVisit.push(currentNode.left)
            if (currentNode.right !== null) nodesToVisit.push(currentNode.right)
        }

        /** Kembalikan semua nilai sesuai urutan breadth-first. */
        return visitedValues
    }

    /** Alias untuk breadthFirstSearch agar pemanggilan dengan nama lama tetap bekerja. */
    dfs(): T[] {
        return this.breadthFirstSearch()
    }

    /** Kunjungi simpul, anak kiri, lalu anak kanan (pre-order). */
    dfsPreOrder(currentNode: TreeNode<T> | null = this.root, visitedValues: T[] = []): T[] {
        /** Simpul kosong menjadi kondisi berhenti untuk rekursi. */
        if (currentNode === null) return visitedValues
        /** Catatan debug yang dipertahankan dari implementasi sebelumnya. */
        console.log("--------", visitedValues)

        /** Pre-order mencatat simpul saat ini sebelum menjelajahi anaknya. */
        visitedValues.push(currentNode.value)
        this.dfsPreOrder(currentNode.left, visitedValues)
        this.dfsPreOrder(currentNode.right, visitedValues)
        return visitedValues
    }

    /** Kunjungi anak kiri, anak kanan, lalu simpul saat ini (post-order). */
    dfsPostOrder(currentNode: TreeNode<T> | null = this.root, visitedValues: T[] = []): T[] {
        /** Simpul kosong tidak memiliki nilai atau anak untuk dikunjungi. */
        if (currentNode === null) return visitedValues

        this.dfsPostOrder(currentNode.left, visitedValues)
        this.dfsPostOrder(currentNode.right, visitedValues)
        /** Post-order mencatat simpul setelah kedua anak selesai dikunjungi. */
        visitedValues.push(currentNode.value)
        return visitedValues
    }

    /** Kunjungi anak kiri, simpul saat ini, lalu anak kanan (in-order). */
    dfsInOrder(currentNode: TreeNode<T> | null = this.root, visitedValues: T[] = []): T[] {
        /** Simpul kosong menjadi kondisi berhenti untuk rekursi. */
        if (currentNode === null) return visitedValues

        this.dfsInOrder(currentNode.left, visitedValues)
        /** In-order mencatat simpul di antara kunjungan kedua anaknya. */
        visitedValues.push(currentNode.value)
        this.dfsInOrder(currentNode.right, visitedValues)
        return visitedValues
    }
}

/** Buat BST angka untuk mencoba metode traversal. */
const tree = new BinarySearchTree<number>()

/** Sisipkan nilai-nilai; hasilnya membentuk akar 5 dengan anak kiri dan kanan. */
tree.insert(5)
tree.insert(8)
tree.insert(3)
tree.insert(1)
tree.insert(7)
tree.insert(9)

/** Cetak urutan kunjungan breadth-first dan tiga urutan depth-first. */
console.log(tree.breadthFirstSearch())
console.log(tree.dfsPreOrder()) // [ 5, 3, 1, 8, 7, 9 ]
console.log(tree.dfsPostOrder()) // [ 1, 3, 7, 9, 8, 5 ]
console.log(tree.dfsInOrder()) // [ 1, 3, 5, 7, 8, 9 ]

/**
 * Comparator harus mengembalikan nilai negatif untuk urutan sebelum,
 * nol untuk nilai setara, dan positif untuk urutan sesudah.
 * Tanpa comparator khusus, tipe yang didukung adalah number dan string.
 */
