import { RoadNode, AStarResult, IAStarSearch } from "./interfaces";

/**
 * A* Search — algoritma pathfinding yang digunakan untuk routing di
 * aplikasi ride-hailing. Lebih efisien dari Dijkstra karena menggunakan
 * heuristic function untuk mengarahkan pencarian ke tujuan.
 *
 * f(n) = g(n) + h(n)
 *   g(n) = biaya aktual dari start ke node n
 *   h(n) = estimasi biaya dari n ke tujuan (heuristic)
 *
 * Kompleksitas Waktu : O(E log V) dengan heuristic yang baik
 * Kompleksitas Ruang : O(V)
 *
 * @example
 * const graph = new Map([
 *   ["A", { id: "A", neighbors: [{ nodeId: "B", cost: 1 }, { nodeId: "C", cost: 4 }] }],
 *   ["B", { id: "B", neighbors: [{ nodeId: "C", cost: 2 }, { nodeId: "D", cost: 5 }] }],
 *   ["C", { id: "C", neighbors: [{ nodeId: "D", cost: 1 }] }],
 *   ["D", { id: "D", neighbors: [] }],
 * ]);
 * const heuristic = (node: string, end: string) => 0; // Dijkstra fallback
 * new AStarSearch().findPath(graph, "A", "D", heuristic);
 * // => { path: ["A", "B", "C", "D"], totalCost: 4 }
 */
export class AStarSearch implements IAStarSearch {
  findPath(
    graph: Map<string, RoadNode>,
    startId: string,
    endId: string,
    heuristic: (nodeId: string, endId: string) => number
  ): AStarResult | null {
    // gCost[node] = biaya aktual terpendek dari start ke node
    const gCost = new Map<string, number>();
    // fCost[node] = gCost + heuristic — prioritas di open set
    const fCost = new Map<string, number>();
    // Untuk rekonstruksi jalur
    const cameFrom = new Map<string, string>();

    // Open set — node yang belum dievaluasi (min-heap sederhana)
    const openSet = new Set<string>([startId]);

    gCost.set(startId, 0);
    fCost.set(startId, heuristic(startId, endId));

    while (openSet.size > 0) {
      const currentNode = this.getLowestFCost(openSet, fCost);

      if (currentNode === endId) {
        return this.reconstructPath(cameFrom, currentNode, gCost.get(endId)!);
      }

      openSet.delete(currentNode);

      const roadNode = graph.get(currentNode);
      if (!roadNode) continue;

      for (const { nodeId: neighborId, cost: edgeCost } of roadNode.neighbors) {
        const tentativeGCost = gCost.get(currentNode)! + edgeCost;
        const knownGCost = gCost.get(neighborId) ?? Infinity;

        if (tentativeGCost < knownGCost) {
          cameFrom.set(neighborId, currentNode);
          gCost.set(neighborId, tentativeGCost);
          fCost.set(neighborId, tentativeGCost + heuristic(neighborId, endId));
          openSet.add(neighborId);
        }
      }
    }

    return null; // tidak ada jalur
  }

  private getLowestFCost(openSet: Set<string>, fCost: Map<string, number>): string {
    let lowestNode = "";
    let lowestCost = Infinity;

    for (const nodeId of openSet) {
      const cost = fCost.get(nodeId) ?? Infinity;
      if (cost < lowestCost) {
        lowestCost = cost;
        lowestNode = nodeId;
      }
    }

    return lowestNode;
  }

  private reconstructPath(
    cameFrom: Map<string, string>,
    endNode: string,
    totalCost: number
  ): AStarResult {
    const path: string[] = [];
    let current = endNode;

    while (cameFrom.has(current)) {
      path.unshift(current);
      current = cameFrom.get(current)!;
    }

    path.unshift(current);
    return { path, totalCost };
  }
}
