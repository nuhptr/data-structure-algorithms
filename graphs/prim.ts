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
 * prim.build(6, []); // edges diabaikan, gunakan fromGraph()
 */
export class Prim {
    /**
     * Membangun MST dari weighted adjacency list.
     * @param graph  - Graf berbobot sebagai adjacency list
     * @param start  - Node awal (default "0")
     * @returns Daftar edge [dari, ke] yang membentuk MST
     */
    fromGraph(
        graph: WeightedAdjacencyList,
        start: string = Object.keys(graph)[0],
    ): [string, string][] {
        const inMST = new Set<string>()
        const mstEdges: [string, string][] = []

        // [bobot, dari, ke] — min-heap sederhana
        const edgeHeap: [number, string, string][] = []

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

        while (edgeHeap.length > 0) {
            const [, fromNode, toNode] = edgeHeap.shift()!

            if (inMST.has(toNode)) continue

            mstEdges.push([fromNode, toNode])
            addEdgesFrom(toNode)
        }

        return mstEdges
    }
}
