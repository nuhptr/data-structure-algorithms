import { WeightedEdge, IMinimumSpanningTree } from "./interfaces"

/**
 * Kruskal's Algorithm — membangun Minimum Spanning Tree (MST)
 * dengan memilih edge terkecil yang tidak membentuk cycle,
 * menggunakan Union-Find untuk deteksi cycle.
 *
 * Kompleksitas Waktu : O(E log E)
 * Kompleksitas Ruang : O(V)
 *
 * @example
 * const kruskal = new Kruskal();
 * kruskal.build(4, [[0,1,3],[1,2,5],[2,3,1],[0,2,1],[0,3,2]]);
 * // => [[2,3,1],[0,2,1],[0,1,3]]  (MST)
 */
export class Kruskal implements IMinimumSpanningTree {
    /**
     * Membangun Minimum Spanning Tree (MST) dari daftar edge berbobot menggunakan Kruskal.
     *
     * @param nodeCount - Jumlah total node dalam graf (`0` hingga `nodeCount - 1`)
     * @param edges - Daftar edge berbobot dalam format `[dari, ke, bobot]`
     * @returns Daftar edge terpilih yang membentuk MST
     */
    build(nodeCount: number, edges: WeightedEdge[]): WeightedEdge[] {
        // Urutkan salinan edge dari bobot terkecil ke terbesar
        const sortedEdges = [...edges].sort(([, , weightA], [, , weightB]) => weightA - weightB)

        // Inisialisasi struktur Union-Find: setiap node awalnya adalah root dirinya sendiri
        const parent = Array.from({ length: nodeCount }, (_, index) => index)

        // Cari root komponen sekaligus lakukan path compression
        const findRoot = (node: number): number => {
            if (node !== parent[node]) {
                parent[node] = findRoot(parent[node]) // path compression
            }
            return parent[node]
        }

        // Gabungkan dua komponen jika berbeda; kembalikan false jika akan membentuk cycle
        const union = (nodeA: number, nodeB: number): boolean => {
            const rootA = findRoot(nodeA)
            const rootB = findRoot(nodeB)

            if (rootA === rootB) return false // sudah satu komponen

            parent[rootA] = rootB
            return true
        }

        const mstEdges: WeightedEdge[] = []

        // Pilih edge secara greedy selama menghubungkan dua komponen yang belum terhubung
        for (const edge of sortedEdges) {
            const [from, to] = edge
            const edgeConnectsNewComponents = union(from, to)

            if (edgeConnectsNewComponents) {
                mstEdges.push(edge)
            }
        }

        return mstEdges
    }
}
