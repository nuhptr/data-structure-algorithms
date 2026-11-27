import { WeightedAdjacencyList, IShortestPath } from "./interfaces"

/**
 * Dijkstra's Algorithm — mencari jalur terpendek dari satu sumber
 * ke semua node lain pada graf berbobot non-negatif.
 * Menggunakan min-heap sederhana berbasis array.
 *
 * Kompleksitas Waktu : O((V + E) log V)
 * Kompleksitas Ruang : O(V)
 *
 * @example
 * const dijkstra = new Dijkstra();
 * const graph = {
 *   A: [["B", 2], ["C", 5]],
 *   B: [["D", 3]],
 *   C: [["D", 1]],
 *   D: []
 * };
 * dijkstra.findShortestPath(graph, "A", "D"); // => 5
 */
export class Dijkstra implements IShortestPath {
    /**
     * Mencari total biaya jalur terpendek dari `start` ke `end` pada graf berbobot non-negatif.
     *
     * @param graph - Adjacency list graf berbobot non-negatif
     * @param start - Node awal pencarian
     * @param end - Node tujuan pencarian
     * @returns Total biaya jalur terpendek, atau `-1` jika `end` tidak dapat dijangkau
     */
    findShortestPath(graph: WeightedAdjacencyList, start: string, end: string): number {
        // [cost, node] — min-heap sederhana via sort
        const minHeap: [number, string][] = [[0, start]]
        const visitedNodes = new Set<string>()
        const lowestCostTo: Record<string, number> = { [start]: 0 }

        while (minHeap.length > 0) {
            // Ambil node dengan estimasi total biaya terkecil
            minHeap.sort((a, b) => a[0] - b[0])
            const [currentCost, currentNode] = minHeap.shift()!

            // Lewati entri lama (stale) jika node sudah diproses dengan biaya lebih kecil
            if (visitedNodes.has(currentNode)) continue
            visitedNodes.add(currentNode)

            // Hentikan lebih awal begitu node tujuan berhasil dikeluarkan dari heap
            if (currentNode === end) return currentCost

            // Relaksasi semua edge keluar menuju tetangga yang belum difinalisasi
            for (const [neighbor, edgeCost] of graph[currentNode] ?? []) {
                if (visitedNodes.has(neighbor)) continue

                const totalCost = currentCost + edgeCost
                const knownCost = lowestCostTo[neighbor] ?? Infinity

                if (totalCost < knownCost) {
                    lowestCostTo[neighbor] = totalCost
                    minHeap.push([totalCost, neighbor])
                }
            }
        }

        return -1 // end tidak dapat dijangkau
    }
}
