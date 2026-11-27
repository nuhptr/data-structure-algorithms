import { WeightedAdjacencyList, HeuristicFn, IAStarSearch } from "./interfaces"

/**
 * A* Search — algoritma jalur terpendek yang menggabungkan g(n) (biaya aktual)
 * dan h(n) (heuristik estimasi) untuk mencari jalur lebih efisien dari Dijkstra.
 *
 * f(n) = g(n) + h(n) — node dengan f terkecil diproses lebih dulu.
 *
 * Kompleksitas Waktu : O((V + E) log V) — tergantung kualitas heuristik
 * Kompleksitas Ruang : O(V)
 *
 * Heuristik harus admissible (tidak overestimate) untuk menjamin optimalitas.
 *
 * @example
 * const aStar = new AStarSearch();
 * const graph = {
 *   A: [["B", 1], ["C", 4]],
 *   B: [["C", 2], ["D", 5]],
 *   C: [["D", 1]],
 *   D: []
 * };
 * const heuristic = (node: string, goal: string) => 0; // zero heuristic = Dijkstra
 * aStar.findShortestPath(graph, "A", "D", heuristic); // => 4
 */
export class AStarSearch implements IAStarSearch {
    /**
     * Mencari total biaya jalur terpendek dari `start` ke `end` menggunakan algoritma A*.
     *
     * @param graph - Adjacency list graf berbobot non-negatif
     * @param start - Node awal pencarian
     * @param end - Node tujuan pencarian
     * @param heuristic - Fungsi heuristik admissible `h(node, goal)`
     * @returns Total biaya aktual jalur terpendek, atau `-1` jika `end` tidak dapat dijangkau
     */
    findShortestPath(
        graph: WeightedAdjacencyList,
        start: string,
        end: string,
        heuristic: HeuristicFn,
    ): number {
        // [f(n), g(n), node]
        const openSet: [number, number, string][] = [[heuristic(start, end), 0, start]]
        const gScore: Record<string, number> = { [start]: 0 }
        const visitedNodes = new Set<string>()

        while (openSet.length > 0) {
            // Pilih kandidat dengan skor total f(n) = g(n) + h(n) terkecil
            openSet.sort((a, b) => a[0] - b[0])
            const [, currentG, currentNode] = openSet.shift()!

            // Abaikan entri duplikat jika node sudah pernah difinalisasi
            if (visitedNodes.has(currentNode)) continue
            visitedNodes.add(currentNode)

            // Kembalikan biaya aktual g(n) begitu tujuan tercapai
            if (currentNode === end) return currentG

            // Evaluasi setiap tetangga dan perbarui skor bila ditemukan jalur yang lebih murah
            for (const [neighbor, edgeCost] of graph[currentNode] ?? []) {
                if (visitedNodes.has(neighbor)) continue

                const tentativeG = currentG + edgeCost
                const knownG = gScore[neighbor] ?? Infinity

                if (tentativeG < knownG) {
                    gScore[neighbor] = tentativeG
                    const fScore = tentativeG + heuristic(neighbor, end)
                    openSet.push([fScore, tentativeG, neighbor])
                }
            }
        }

        return -1 // end tidak dapat dijangkau
    }
}
