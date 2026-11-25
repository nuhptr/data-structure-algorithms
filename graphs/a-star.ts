import { WeightedAdjacencyList, HeuristicFn, IAStarSearch } from "./interfaces";

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
  findShortestPath(
    graph: WeightedAdjacencyList,
    start: string,
    end: string,
    heuristic: HeuristicFn
  ): number {
    // [f(n), g(n), node]
    const openSet: [number, number, string][] = [[heuristic(start, end), 0, start]];
    const gScore: Record<string, number> = { [start]: 0 };
    const visitedNodes = new Set<string>();

    while (openSet.length > 0) {
      openSet.sort((a, b) => a[0] - b[0]);
      const [, currentG, currentNode] = openSet.shift()!;

      if (visitedNodes.has(currentNode)) continue;
      visitedNodes.add(currentNode);

      if (currentNode === end) return currentG;

      for (const [neighbor, edgeCost] of graph[currentNode] ?? []) {
        if (visitedNodes.has(neighbor)) continue;

        const tentativeG = currentG + edgeCost;
        const knownG = gScore[neighbor] ?? Infinity;

        if (tentativeG < knownG) {
          gScore[neighbor] = tentativeG;
          const fScore = tentativeG + heuristic(neighbor, end);
          openSet.push([fScore, tentativeG, neighbor]);
        }
      }
    }

    return -1; // end tidak dapat dijangkau
  }
}
