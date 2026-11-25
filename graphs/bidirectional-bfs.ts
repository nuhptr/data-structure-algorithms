import { AdjacencyList, IBidirectionalBFS } from "./interfaces"

/**
 * Bidirectional BFS — mencari jalur terpendek dengan menjalankan BFS
 * dari dua arah (start dan end) secara bergantian hingga bertemu di tengah.
 *
 * Dibanding BFS satu arah, ini mengurangi search space dari O(b^d) menjadi O(b^(d/2))
 * di mana b = branching factor, d = jarak terpendek.
 *
 * Kompleksitas Waktu : O(b^(d/2)) — jauh lebih cepat dari BFS O(b^d)
 * Kompleksitas Ruang : O(b^(d/2))
 *
 * @example
 * const biBFS = new BidirectionalBFS();
 * const graph = {
 *   "1": ["2", "3"],
 *   "2": ["1", "4"],
 *   "3": ["1", "4"],
 *   "4": ["2", "3", "5"],
 *   "5": ["4"]
 * };
 * biBFS.findShortestPath(graph, "1", "5"); // => 3
 */
export class BidirectionalBFS implements IBidirectionalBFS {
    findShortestPath(graph: AdjacencyList, start: string, end: string): number {
        if (start === end) return 0

        const frontVisited = new Map<string, number>([[start, 0]])
        const backVisited = new Map<string, number>([[end, 0]])
        let frontFrontier: string[] = [start]
        let backFrontier: string[] = [end]

        while (frontFrontier.length > 0 || backFrontier.length > 0) {
            const intersection = this.expandFrontier(
                graph,
                frontFrontier,
                frontVisited,
                backVisited,
            )
            if (intersection !== -1) return intersection

            frontFrontier = this.getNextFrontier(graph, frontFrontier, frontVisited)

            const intersection2 = this.expandFrontier(
                graph,
                backFrontier,
                backVisited,
                frontVisited,
            )
            if (intersection2 !== -1) return intersection2

            backFrontier = this.getNextFrontier(graph, backFrontier, backVisited)
        }

        return -1 // tidak ada jalur
    }

    private expandFrontier(
        graph: AdjacencyList,
        frontier: string[],
        ownVisited: Map<string, number>,
        otherVisited: Map<string, number>,
    ): number {
        for (const node of frontier) {
            if (otherVisited.has(node)) {
                return ownVisited.get(node)! + otherVisited.get(node)!
            }
        }
        return -1
    }

    private getNextFrontier(
        graph: AdjacencyList,
        frontier: string[],
        visited: Map<string, number>,
    ): string[] {
        const nextFrontier: string[] = []

        for (const node of frontier) {
            const currentDist = visited.get(node)!

            for (const neighbor of (graph[node] ?? []).map(String)) {
                if (!visited.has(neighbor)) {
                    visited.set(neighbor, currentDist + 1)
                    nextFrontier.push(neighbor)
                }
            }
        }

        return nextFrontier
    }
}
