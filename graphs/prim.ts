import { WeightedAdjacencyList, IMinimumSpanningTree, WeightedEdge } from "./interfaces"

/**
 * Prim's Algorithm — membangun Minimum Spanning Tree (MST)
 * dengan selalu memilih edge berbobot terkecil yang menghubungkan
 * node yang sudah ada di tree dengan node yang belum.
 *
 * Kompleksitas Waktu : O(E log V)
 * Kompleksitas Ruang : O(V)
 *
 * @example
 * const prim = new Prim();
 * const graph: WeightedAdjacencyList = {
 *   "0": [["1", 1], ["3", 3]],
 *   "1": [["0", 1], ["2", 6], ["3", 5], ["4", 1]],
 *   "2": [["1", 6], ["4", 5], ["5", 2]],
 *   "3": [["0", 3], ["1", 5], ["4", 1]],
 *   "4": [["1", 1], ["2", 5], ["3", 1], ["5", 4]],
 *   "5": [["2", 2], ["4", 4]],
 * };
 * prim.fromGraph(graph, "0");
 */
export class Prim {
    /**
     * Membangun MST dari weighted adjacency list menggunakan algoritma Prim.
     *
     * @param graph - Graf berbobot sebagai adjacency list
     * @param start - Node awal ekspansi tree (default node pertama pada `graph`)
     * @returns Daftar edge `[dari, ke]` yang membentuk MST
     */
    fromGraph(
        graph: WeightedAdjacencyList,
        start: string = Object.keys(graph)[0],
    ): [string, string][] {
        const inMST = new Set<string>()
        const mstEdges: [string, string][] = []

        // [bobot, dari, ke] — min-heap sederhana
        const edgeHeap: [number, string, string][] = []

        // Tandai node masuk ke MST lalu tambahkan semua edge keluar ke kandidat heap
        const addEdgesFrom = (node: string): void => {
            inMST.add(node)
            for (const [neighbor, weight] of graph[node] ?? []) {
                if (!inMST.has(neighbor)) {
                    edgeHeap.push([weight, node, neighbor])
                }
            }
            edgeHeap.sort((a, b) => a[0] - b[0])
        }

        addEdgesFrom(start)

        // Ambil edge berbobot terkecil menuju node yang belum masuk MST hingga heap kosong
        while (edgeHeap.length > 0) {
            const [, fromNode, toNode] = edgeHeap.shift()!

            // Lewati jika node tujuan sudah terhubung ke MST oleh edge yang lebih murah
            if (inMST.has(toNode)) continue

            mstEdges.push([fromNode, toNode])
            addEdgesFrom(toNode)
        }

        return mstEdges
    }
}
