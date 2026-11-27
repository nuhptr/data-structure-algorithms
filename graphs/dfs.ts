import { AdjacencyList, IGraphTraversal } from "./interfaces"

/**
 * Depth-First Search (DFS) iteratif — menelusuri graf sedalam mungkin
 * sebelum backtrack, menggunakan stack eksplisit (bukan rekursi).
 *
 * Kompleksitas Waktu : O(V + E)
 * Kompleksitas Ruang : O(V)
 *
 * @example
 * const dfs = new DFS();
 * const graph = { A: ["B", "C"], B: ["D", "E"], C: ["F"], D: [], E: [], F: [] };
 * dfs.traverse(graph, "A"); // => Set { "A", "B", "C", "D", "E", "F" }
 */
export class DFS implements IGraphTraversal {
    /**
     * Menelusuri graf secara mendalam menggunakan stack eksplisit mulai dari `startNode`.
     *
     * @param graph - Adjacency list graf tak berbobot
     * @param startNode - Node awal penelusuran
     * @returns Himpunan node yang dikunjungi sesuai urutan kunjungan DFS
     */
    traverse(graph: AdjacencyList, startNode: string): Set<string> {
        const visitedNodes = new Set<string>([startNode])
        const stack: string[] = [startNode]

        while (stack.length > 0) {
            const currentNode = stack.pop()!
            visitedNodes.add(currentNode)

            // Balik urutan tetangga agar tetangga pertama di adjacency list diproses lebih dulu (LIFO)
            const neighbors = ([...(graph[currentNode] ?? [])] as string[]).reverse()

            for (const neighbor of neighbors) {
                if (!visitedNodes.has(neighbor)) {
                    stack.push(neighbor)
                }
            }
        }

        return visitedNodes
    }
}
