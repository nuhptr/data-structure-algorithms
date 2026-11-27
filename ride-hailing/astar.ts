import { RoadNode, AStarResult, IAStarSearch } from "./interfaces"

/**
 * A* Search — algoritma pathfinding yang digunakan untuk routing di
 * aplikasi ride-hailing. Lebih efisien dari Dijkstra karena menggunakan
 * heuristic function untuk mengarahkan pencarian ke tujuan.
 *
 * f(n) = g(n) + h(n)
 *   g(n) = biaya aktual dari start ke node n
 *   h(n) = estimasi biaya dari n ke tujuan (heuristic)
 *
 * Kompleksitas Waktu : O(E log V) dengan heuristic yang baik
 * Kompleksitas Ruang : O(V)
 *
 * @example
 * const graph = new Map([
 *   ["A", { id: "A", neighbors: [{ nodeId: "B", cost: 1 }, { nodeId: "C", cost: 4 }] }],
 *   ["B", { id: "B", neighbors: [{ nodeId: "C", cost: 2 }, { nodeId: "D", cost: 5 }] }],
 *   ["C", { id: "C", neighbors: [{ nodeId: "D", cost: 1 }] }],
 *   ["D", { id: "D", neighbors: [] }],
 * ]);
 * const heuristic = (node: string, end: string) => 0; // Dijkstra fallback
 * new AStarSearch().findPath(graph, "A", "D", heuristic);
 * // => { path: ["A", "B", "C", "D"], totalCost: 4 }
 */
export class AStarSearch implements IAStarSearch {
    /**
     * Menemukan jalur terpendek dari `startId` ke `endId` pada graf jalan berbobot
     * menggunakan fungsi heuristik untuk memprioritaskan eksplorasi node.
     *
     * @param graph - Peta ID node ke objek `RoadNode` beserta tetangganya.
     * @param startId - ID node asal.
     * @param endId - ID node tujuan.
     * @param heuristic - Fungsi estimasi biaya sisa dari suatu node ke `endId`.
     * @returns Objek `AStarResult` jika jalur ditemukan, atau `null` jika tidak terjangkau.
     */
    findPath(
        graph: Map<string, RoadNode>,
        startId: string,
        endId: string,
        heuristic: (nodeId: string, endId: string) => number,
    ): AStarResult | null {
        // gCost[node] = biaya aktual terpendek dari start ke node
        const gCost = new Map<string, number>()
        // fCost[node] = gCost + heuristic — prioritas evaluasi di open set
        const fCost = new Map<string, number>()
        // Menyimpan pendahulu terbaik setiap node untuk rekonstruksi jalur
        const cameFrom = new Map<string, string>()

        // Open set — kandidat node yang siap dievaluasi berikutnya
        const openSet = new Set<string>([startId])

        gCost.set(startId, 0)
        fCost.set(startId, heuristic(startId, endId))

        while (openSet.size > 0) {
            // Pilih node dengan estimasi total biaya f(n) terendah
            const currentNode = this.getLowestFCost(openSet, fCost)

            if (currentNode === endId) {
                return this.reconstructPath(cameFrom, currentNode, gCost.get(endId)!)
            }

            openSet.delete(currentNode)

            const roadNode = graph.get(currentNode)
            if (!roadNode) continue

            // Relaksasi semua edge menuju node tetangga
            for (const { nodeId: neighborId, cost: edgeCost } of roadNode.neighbors) {
                const tentativeGCost = gCost.get(currentNode)! + edgeCost
                const knownGCost = gCost.get(neighborId) ?? Infinity

                if (tentativeGCost < knownGCost) {
                    cameFrom.set(neighborId, currentNode)
                    gCost.set(neighborId, tentativeGCost)
                    fCost.set(neighborId, tentativeGCost + heuristic(neighborId, endId))
                    openSet.add(neighborId)
                }
            }
        }

        return null // tidak ada jalur menuju tujuan
    }

    /**
     * Memilih ID node dengan nilai `fCost` paling kecil dari himpunan `openSet`.
     *
     * @param openSet - Himpunan node kandidat yang belum selesai dievaluasi.
     * @param fCost - Peta skor `f(n) = g(n) + h(n)` tiap node.
     * @returns ID node dengan nilai `fCost` terendah.
     */
    private getLowestFCost(openSet: Set<string>, fCost: Map<string, number>): string {
        let lowestNode = ""
        let lowestCost = Infinity

        for (const nodeId of openSet) {
            const cost = fCost.get(nodeId) ?? Infinity
            if (cost < lowestCost) {
                lowestCost = cost
                lowestNode = nodeId
            }
        }

        return lowestNode
    }

    /**
     * Merekonstruksi urutan jalur dari titik awal ke `endNode` dengan menelusuri
     * balik peta `cameFrom`.
     *
     * @param cameFrom - Peta setiap node ke node pendahulunya di jalur terpendek.
     * @param endNode - ID node tujuan akhir.
     * @param totalCost - Total biaya aktual jalur yang ditemukan.
     * @returns Objek `AStarResult` berisi array `path` dan `totalCost`.
     */
    private reconstructPath(
        cameFrom: Map<string, string>,
        endNode: string,
        totalCost: number,
    ): AStarResult {
        const path: string[] = []
        let current = endNode

        while (cameFrom.has(current)) {
            path.unshift(current)
            current = cameFrom.get(current)!
        }

        path.unshift(current)
        return { path, totalCost }
    }
}
