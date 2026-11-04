/**
 * Graf tak berarah yang menyimpan setiap simpul beserta daftar tetangganya.
 * Karena graf tak berarah, setiap sisi tercatat pada kedua simpul yang terhubung.
 */
class Graph<T> {
    /** Daftar tetangga untuk setiap simpul, diindeks menggunakan string kunci simpul. */
    adjList: Record<string, T[]>

    constructor() {
        this.adjList = {}
    }

    /** Mengubah simpul menjadi kunci string untuk digunakan pada daftar tetangga. */
    private keyOf(vertex: T): string {
        return String(vertex)
    }

    /** Menambahkan simpul jika belum ada; mengembalikan false jika sudah ada. */
    addVertex(vertex: T): boolean {
        const key = this.keyOf(vertex)

        if (this.adjList[key]) return false

        this.adjList[key] = []
        return true
    }

    /**
     * Menghapus simpul beserta semua sisi yang terhubung dengannya.
     * Mengembalikan false jika simpul tidak ditemukan.
     */
    removeVertex(vertex: T): boolean {
        const key = this.keyOf(vertex)
        const neighbors = this.adjList[key]

        if (!neighbors) return false

        for (const neighbor of neighbors) {
            const neighborKey = this.keyOf(neighbor)

            this.adjList[neighborKey] = this.adjList[neighborKey].filter(
                (value) => this.keyOf(value) !== key,
            )
        }

        delete this.adjList[key]
        return true
    }

    /**
     * Menghubungkan dua simpul yang sudah ada.
     * Mengembalikan false jika salah satu simpul belum ditambahkan.
     */
    addEdge(vertex1: T, vertex2: T): boolean {
        const key1 = this.keyOf(vertex1)
        const key2 = this.keyOf(vertex2)

        if (this.adjList[key1] && this.adjList[key2]) {
            this.adjList[key1].push(vertex2)
            this.adjList[key2].push(vertex1)
            return true
        }

        return false
    }

    /**
     * Menghapus hubungan antara dua simpul.
     * Mengembalikan false jika salah satu simpul tidak ditemukan.
     */
    removeEdge(vertex1: T, vertex2: T): boolean {
        const key1 = this.keyOf(vertex1)
        const key2 = this.keyOf(vertex2)

        if (this.adjList[key1] && this.adjList[key2]) {
            this.adjList[key1] = this.adjList[key1].filter(
                (neighbor) => this.keyOf(neighbor) !== key2,
            )

            this.adjList[key2] = this.adjList[key2].filter(
                (neighbor) => this.keyOf(neighbor) !== key1,
            )

            return true
        }

        return false
    }
}

const graph = new Graph()

// Tambahkan simpul sebelum menghubungkannya dengan sisi.
graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")

// Buat hubungan dua arah antarsimpul.
graph.addEdge("A", "B")
graph.addEdge("A", "C")
graph.addEdge("A", "D")
graph.addEdge("B", "D")
graph.addEdge("C", "D")

// Tampilkan graf, hapus simpul D beserta sisi-sisinya, lalu tampilkan hasilnya.
console.log(graph)
graph.removeVertex("D")
console.log(graph)
