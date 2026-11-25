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
    traverse(graph: AdjacencyList, startNode: string): Set<string> {
        const visitedNodes = new Set<string>()
        const queue: string[] = [startNode]

        visitedNodes.add(startNode)

        while (queue.length > 0) {
            const currentNode = queue.shift()!
            const neighbors = (graph[currentNode] ?? []) as string[]

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
