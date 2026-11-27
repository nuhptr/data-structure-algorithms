/**
 * Floyd-Warshall — All Pairs Shortest Path (APSP).
 * Menghitung jarak terpendek antara semua pasangan node dalam satu kali eksekusi.
 * Mendukung deteksi negative cycle dan rekonstruksi jalur.
 *
 * Kompleksitas Waktu : O(V³)
 * Kompleksitas Ruang : O(V²)
 *
 * @example
 * const fw = new FloydWarshall(4);
 * fw.addEdge(0, 1, 1); fw.addEdge(1, 2, 3); fw.addEdge(2, 3, 2);
 * fw.solve();
 * fw.getDistance(0, 3); // => 6
 * fw.getPath(0, 3);     // => [0, 1, 2, 3]
 */
export class FloydWarshall {
    /** Penanda khusus pada tabel `nextNode` bila jalur terdampak negative cycle. */
    private readonly NEGATIVE_CYCLE_MARKER = -1

    /** Matriks jarak terpendek antar semua pasangan node. */
    private distanceMatrix: number[][]

    /** Matriks node berikutnya pada jalur terpendek untuk rekonstruksi lintasan. */
    private nextNode: (number | null)[][]

    /** Jumlah total node dalam graf. */
    private nodeCount: number

    /** Penanda apakah matriks jarak sudah dihitung sejak perubahan edge terakhir. */
    private isSolved = false

    /**
     * Menginisialisasi graf kosong berukuran `nodeCount × nodeCount`.
     * Jarak ke diri sendiri di-set `0`, sedangkan pasangan lain di-set `Infinity`.
     *
     * @param nodeCount - Jumlah total node dalam graf
     */
    constructor(nodeCount: number) {
        this.nodeCount = nodeCount
        this.distanceMatrix = Array.from({ length: nodeCount }, (_, row) =>
            Array.from({ length: nodeCount }, (__, col) => (row === col ? 0 : Infinity)),
        )
        this.nextNode = Array.from({ length: nodeCount }, () => Array(nodeCount).fill(null))
    }

    /**
     * Membuat instance `FloydWarshall` dari matriks ketetanggaan (adjacency matrix) yang sudah ada.
     *
     * @param matrix - Matriks bobot berukuran `n × n` (`Infinity` menandakan tidak ada edge)
     * @returns Instance `FloydWarshall` yang sudah terisi bobot awal dari matriks
     */
    static fromMatrix(matrix: number[][]): FloydWarshall {
        const nodeCount = matrix.length
        const fw = new FloydWarshall(nodeCount)

        for (let from = 0; from < nodeCount; from++) {
            for (let to = 0; to < nodeCount; to++) {
                fw.distanceMatrix[from][to] = matrix[from][to]
                if (matrix[from][to] !== Infinity) {
                    fw.nextNode[from][to] = to
                }
            }
        }

        return fw
    }

    /**
     * Menambahkan atau memperbarui edge berarah dari `from` ke `to` dengan bobot tertentu.
     *
     * @param from - Indeks node asal
     * @param to - Indeks node tujuan
     * @param weight - Bobot edge
     * @returns Tidak mengembalikan nilai
     */
    addEdge(from: number, to: number, weight: number): void {
        this.distanceMatrix[from][to] = weight
        this.nextNode[from][to] = to
        // Tandai perlu hitung ulang karena graf berubah
        this.isSolved = false
    }

    /**
     * Menjalankan algoritma Floyd-Warshall untuk menghitung jarak terpendek semua pasangan node
     * sekaligus menandai pasangan yang terdampak negative cycle.
     *
     * @returns Tidak mengembalikan nilai
     */
    solve(): void {
        if (this.isSolved) return

        // Hitung semua pasangan jarak terpendek melalui setiap node perantara `via`
        for (let via = 0; via < this.nodeCount; via++) {
            for (let from = 0; from < this.nodeCount; from++) {
                for (let to = 0; to < this.nodeCount; to++) {
                    const shortcutExists =
                        this.distanceMatrix[from][via] !== Infinity &&
                        this.distanceMatrix[via][to] !== Infinity

                    if (shortcutExists) {
                        const shortcutDistance =
                            this.distanceMatrix[from][via] + this.distanceMatrix[via][to]
                        if (shortcutDistance < this.distanceMatrix[from][to]) {
                            this.distanceMatrix[from][to] = shortcutDistance
                            this.nextNode[from][to] = this.nextNode[from][via]
                        }
                    }
                }
            }
        }

        // Tandai semua node yang terdampak negative cycle (diagonal negatif `dist[via][via] < 0`)
        for (let via = 0; via < this.nodeCount; via++) {
            for (let from = 0; from < this.nodeCount; from++) {
                for (let to = 0; to < this.nodeCount; to++) {
                    const viaIsOnNegativeCycle =
                        this.distanceMatrix[from][via] !== Infinity &&
                        this.distanceMatrix[via][to] !== Infinity &&
                        this.distanceMatrix[via][via] < 0

                    if (viaIsOnNegativeCycle) {
                        this.distanceMatrix[from][to] = -Infinity
                        this.nextNode[from][to] = this.NEGATIVE_CYCLE_MARKER
                    }
                }
            }
        }

        this.isSolved = true
    }

    /**
     * Mengambil jarak terpendek dari node `from` ke node `to`.
     * Otomatis menjalankan `solve()` terlebih dahulu jika belum dihitung.
     *
     * @param from - Indeks node asal
     * @param to - Indeks node tujuan
     * @returns Jarak terpendek (`Infinity` jika tak terhubung, `-Infinity` jika terdampak negative cycle)
     */
    getDistance(from: number, to: number): number {
        this.solve()
        return this.distanceMatrix[from][to]
    }

    /**
     * Rekonstruksi jalur terpendek dari `from` ke `to`.
     *
     * @param from - Indeks node asal
     * @param to - Indeks node tujuan
     * @returns Array node penyusun jalur, `null` jika melewati negative cycle, atau `[]` jika tidak terhubung
     */
    getPath(from: number, to: number): number[] | null {
        this.solve()

        if (this.distanceMatrix[from][to] === Infinity) return []

        const path: number[] = []
        let current = from

        // Ikuti penunjuk `nextNode` dari `from` sampai mencapai `to`
        while (current !== to) {
            if (current === this.NEGATIVE_CYCLE_MARKER) return null
            path.push(current)
            current = this.nextNode[current][to] as number
        }

        if (this.nextNode[current][to] === this.NEGATIVE_CYCLE_MARKER) return null

        path.push(to)
        return path
    }
}
