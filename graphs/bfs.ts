import { AdjacencyList, IGraphTraversal } from "./interfaces"

/**
 * Breadth-First Search (BFS) — menelusuri graf level per level
 * menggunakan queue. Cocok untuk mencari jalur terpendek (hop count)
 * pada graf tak berbobot.
 *
 * Kompleksitas Waktu : O(V + E)
 * Kompleksitas Ruang : O(V)
 *
 * @example
 * const bfs = new BFS();
 * const graph = { A: ["B", "C"], B: ["D"], C: ["D"], D: [] };
 * bfs.traverse(graph, "A"); // => Set { "A", "B", "C", "D" }
 */
export class BFS implements IGraphTraversal {
    /**
     * Menelusuri graf secara melebar (level demi level) mulai dari `startNode`.
     *
     * @param graph - Adjacency list graf tak berbobot
     * @param startNode - Node awal penelusuran
     * @returns Himpunan node yang dikunjungi sesuai urutan kunjungan BFS
     */
    traverse(graph: AdjacencyList, startNode: string): Set<string> {
        const visitedNodes = new Set<string>()
        const queue: string[] = [startNode]

        // Tandai node awal sudah dikunjungi sebelum diproses agar tidak masuk antrean dua kali
        visitedNodes.add(startNode)

        while (queue.length > 0) {
            const currentNode = queue.shift()!
            const neighbors = (graph[currentNode] ?? []) as string[]

            // Masukkan semua tetangga yang belum dikunjungi ke belakang antrean
            for (const neighbor of neighbors) {
                if (!visitedNodes.has(neighbor)) {
                    visitedNodes.add(neighbor)
                    queue.push(neighbor)
                }
            }
        }

        return visitedNodes
    }
}
