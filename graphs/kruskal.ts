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
    build(nodeCount: number, edges: WeightedEdge[]): WeightedEdge[] {
        const sortedEdges = [...edges].sort(([, , weightA], [, , weightB]) => weightA - weightB)

        const parent = Array.from({ length: nodeCount }, (_, index) => index)

        const findRoot = (node: number): number => {
            if (node !== parent[node]) {
                parent[node] = findRoot(parent[node]) // path compression
            }
            return parent[node]
        }

        const union = (nodeA: number, nodeB: number): boolean => {
            const rootA = findRoot(nodeA)
            const rootB = findRoot(nodeB)

            if (rootA === rootB) return false // sudah satu komponen

            parent[rootA] = rootB
            return true
        }

        const mstEdges: WeightedEdge[] = []

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
