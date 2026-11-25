import { WeightedEdge, IBellmanFord } from "./interfaces";

/**
 * Bellman-Ford Algorithm — mencari jarak terpendek dari satu sumber
 * ke semua vertex. Mendukung edge berbobot negatif dan mendeteksi
 * negative cycle.
 *
 * Kompleksitas Waktu : O(V × E)
 * Kompleksitas Ruang : O(V)
 *
 * @example
 * const bf = new BellmanFord();
 * const edges: WeightedEdge[] = [[2,1,-10],[3,2,3],[0,3,5],[0,1,4]];
 * bf.findShortestPaths(edges, 4, 0); // => [0, -2, 8, 5]
 */
export class BellmanFord implements IBellmanFord {
  findShortestPaths(
    edges: WeightedEdge[],
    vertexCount: number,
    sourceVertex: number
  ): number[] {
    const distanceTo: number[] = Array(vertexCount).fill(Infinity);
    distanceTo[sourceVertex] = 0;

    // Relax semua edge sebanyak (vertexCount - 1) kali
    for (let iteration = 0; iteration < vertexCount - 1; iteration++) {
      for (const [from, to, weight] of edges) {
        const canRelax = distanceTo[from] !== Infinity;
        const foundShorter = distanceTo[from] + weight < distanceTo[to];

        if (canRelax && foundShorter) {
          distanceTo[to] = distanceTo[from] + weight;
        }
      }
    }

    // Deteksi negative cycle — jika masih bisa direlax, ada siklus negatif
    for (const [from, to, weight] of edges) {
      const stillRelaxable =
        distanceTo[from] !== Infinity &&
        distanceTo[from] + weight < distanceTo[to];

      if (stillRelaxable) {
        throw new Error("Negative cycle ditemukan dalam graf");
      }
    }

    return distanceTo;
  }
}
