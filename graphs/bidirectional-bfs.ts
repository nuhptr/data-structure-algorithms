import { AdjacencyList, IBidirectionalBFS } from "./interfaces"

/**
 * Bidirectional BFS — mencari jalur terpendek dengan menjalankan BFS
 * dari dua arah (start dan end) secara bergantian hingga bertemu di tengah.
 *
 * Dibanding BFS satu arah, ini mengurangi search space dari O(b^d) menjadi O(b^(d/2))
 * di mana b = branching factor, d = jarak terpendek.
 *
 * Kompleksitas Waktu : O(b^(d/2)) — jauh lebih cepat dari BFS O(b^d)
 * Kompleksitas Ruang : O(b^(d/2))
 *
 * @example
 * const biBFS = new BidirectionalBFS();
 * const graph = {
 *   "1": ["2", "3"],
 *   "2": ["1", "4"],
 *   "3": ["1", "4"],
 *   "4": ["2", "3", "5"],
 *   "5": ["4"]
 * };
 * biBFS.findShortestPath(graph, "1", "5"); // => 3
 */
export class BidirectionalBFS implements IBidirectionalBFS {
    /**
     * Mencari jarak hop terpendek antara `start` dan `end` dengan mengekspansi
     * frontier secara bergantian dari kedua ujung.
     *
     * @param graph - Adjacency list graf tak berbobot
     * @param start - Node awal pencarian
     * @param end - Node tujuan pencarian
     * @returns Jumlah hop terpendek, atau `-1` jika tidak ada jalur yang menghubungkan
     */
    findShortestPath(graph: AdjacencyList, start: string, end: string): number {
        if (start === end) return 0

        // Simpan jarak masing-masing node dari sisi depan (`start`) dan sisi belakang (`end`)
        const frontVisited = new Map<string, number>([[start, 0]])
        const backVisited = new Map<string, number>([[end, 0]])
        let frontFrontier: string[] = [start]
        let backFrontier: string[] = [end]

        while (frontFrontier.length > 0 || backFrontier.length > 0) {
            // Cek pertemuan dari frontier depan lalu perluas satu level ke depan
            const intersection = this.expandFrontier(
                graph,
                frontFrontier,
                frontVisited,
                backVisited,
            )
            if (intersection !== -1) return intersection

            frontFrontier = this.getNextFrontier(graph, frontFrontier, frontVisited)

            // Cek pertemuan dari frontier belakang lalu perluas satu level ke belakang
            const intersection2 = this.expandFrontier(
                graph,
                backFrontier,
                backVisited,
                frontVisited,
            )
            if (intersection2 !== -1) return intersection2

            backFrontier = this.getNextFrontier(graph, backFrontier, backVisited)
        }

        return -1 // tidak ada jalur
    }

    /**
     * Memeriksa apakah ada node pada `frontier` saat ini yang sudah dikunjungi
     * oleh pencarian dari arah berlawanan.
     *
     * @param graph - Adjacency list graf tak berbobot
     * @param frontier - Daftar node pada level frontier aktif
     * @param ownVisited - Peta jarak node yang dikunjungi dari arah saat ini
     * @param otherVisited - Peta jarak node yang dikunjungi dari arah berlawanan
     * @returns Total jarak terpendek jika bertemu, atau `-1` jika belum beririsan
     */
    private expandFrontier(
        graph: AdjacencyList,
        frontier: string[],
        ownVisited: Map<string, number>,
        otherVisited: Map<string, number>,
    ): number {
        for (const node of frontier) {
            if (otherVisited.has(node)) {
                return ownVisited.get(node)! + otherVisited.get(node)!
            }
        }
        return -1
    }

    /**
     * Menghasilkan frontier level berikutnya dengan mengunjungi seluruh tetangga
     * yang belum pernah dicatat pada `visited`.
     *
     * @param graph - Adjacency list graf tak berbobot
     * @param frontier - Daftar node pada level saat ini
     * @param visited - Peta jarak node yang sudah dikunjungi pada arah ini
     * @returns Daftar node baru untuk frontier level berikutnya
     */
    private getNextFrontier(
        graph: AdjacencyList,
        frontier: string[],
        visited: Map<string, number>,
    ): string[] {
        const nextFrontier: string[] = []

        for (const node of frontier) {
            const currentDist = visited.get(node)!

            // Catat setiap tetangga baru dengan jarak bertambah 1 hop
            for (const neighbor of (graph[node] ?? []).map(String)) {
                if (!visited.has(neighbor)) {
                    visited.set(neighbor, currentDist + 1)
                    nextFrontier.push(neighbor)
                }
            }
        }

        return nextFrontier
    }
}
