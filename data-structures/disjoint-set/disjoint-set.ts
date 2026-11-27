import { IDisjointSet } from "./interfaces"

/**
 * Disjoint Set / Union-Find — struktur data untuk mengelola kumpulan
 * elemen yang terbagi dalam subset tidak saling tumpang tindih.
 *
 * Menggunakan dua optimasi:
 *  - Union by Rank   : selalu pasang pohon lebih pendek di bawah pohon lebih tinggi
 *  - Path Compression: saat find(), langsung hubungkan node ke root
 *
 * Kompleksitas find/union : O(α(n)) — hampir konstan (inverse Ackermann)
 * Kompleksitas Ruang      : O(n)
 *
 * @example
 * const ds = new DisjointSet()
 * ;[0, 1, 2, 3].forEach((n) => ds.makeSet(n))
 * ds.union(0, 1)
 * ds.union(1, 2)
 * ds.connected(0, 2) // => true
 * ds.connected(0, 3) // => false
 */
export class DisjointSet implements IDisjointSet {
    /** Peta yang menyimpan referensi parent dari setiap node (root menunjuk ke dirinya sendiri). */
    private parent: Map<number, number> = new Map()
    /** Peta yang menyimpan estimasi kedalaman (rank) pohon pada setiap node root. */
    private rank: Map<number, number> = new Map()

    /**
     * Mendaftarkan elemen baru sebagai himpunan tunggal dengan dirinya sendiri sebagai root
     * dan rank awal bernilai 0.
     *
     * @param node - Identitas elemen baru
     * @returns Tidak mengembalikan nilai (`void`)
     */
    makeSet(node: number): void {
        this.parent.set(node, node)
        this.rank.set(node, 0)
    }

    /**
     * Mencari root dari himpunan yang memuat `node` sekaligus menerapkan path compression
     * agar pencarian berikutnya lebih cepat.
     *
     * @param node - Elemen yang dicari root-nya
     * @returns Identitas node root
     */
    find(node: number): number {
        if (this.parent.get(node) !== node) {
            // Path compression: langsung arahkan parent node ke root
            this.parent.set(node, this.find(this.parent.get(node)!))
        }
        return this.parent.get(node)!
    }

    /**
     * Menggabungkan dua himpunan yang memuat `nodeA` dan `nodeB` menggunakan strategi
     * union by rank untuk menjaga pohon tetap dangkal.
     *
     * @param nodeA - Elemen dari himpunan pertama
     * @param nodeB - Elemen dari himpunan kedua
     * @returns Tidak mengembalikan nilai (`void`)
     */
    union(nodeA: number, nodeB: number): void {
        const rootA = this.find(nodeA)
        const rootB = this.find(nodeB)

        // Jika sudah memiliki root yang sama, keduanya sudah berada di himpunan yang sama
        if (rootA === rootB) return

        const rankA = this.rank.get(rootA)!
        const rankB = this.rank.get(rootB)!

        // Union by rank — pasang pohon lebih pendek di bawah pohon lebih tinggi
        if (rankA > rankB) {
            this.parent.set(rootB, rootA)
        } else if (rankA < rankB) {
            this.parent.set(rootA, rootB)
        } else {
            // Jika rank sama, jadikan rootA sebagai induk dan naikkan rank-nya sebesar 1
            this.parent.set(rootB, rootA)
            this.rank.set(rootA, rankA + 1)
        }
    }

    /**
     * Memeriksa apakah dua elemen berada dalam himpunan (komponen) yang sama.
     *
     * @param nodeA - Elemen pertama
     * @param nodeB - Elemen kedua
     * @returns `true` jika memiliki root yang sama, `false` jika berbeda
     */
    connected(nodeA: number, nodeB: number): boolean {
        return this.find(nodeA) === this.find(nodeB)
    }
}
