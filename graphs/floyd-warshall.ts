/**
 * Floyd-Warshall — All Pairs Shortest Path (APSP).
 * Menghitung jarak terpendek antara semua pasangan node dalam satu kali eksekusi.
 * Mendukung deteksi negative cycle dan rekonstruksi jalur.
 *
 * Kompleksitas Waktu : O(V³)
 * Kompleksitas Ruang : O(V²)
 *
 * @example
 * const fw = new FloydWarshall(4);
 * fw.addEdge(0, 1, 1); fw.addEdge(1, 2, 3); fw.addEdge(2, 3, 2);
 * fw.solve();
 * fw.getDistance(0, 3); // => 6
 * fw.getPath(0, 3);     // => [0, 1, 2, 3]
 */
export class FloydWarshall {
  private readonly NEGATIVE_CYCLE_MARKER = -1;
  private distanceMatrix: number[][];
  private nextNode: (number | null)[][];
  private nodeCount: number;
  private isSolved = false;

  constructor(nodeCount: number) {
    this.nodeCount = nodeCount;
    this.distanceMatrix = Array.from({ length: nodeCount }, (_, row) =>
      Array.from({ length: nodeCount }, (__, col) =>
        row === col ? 0 : Infinity
      )
    );
    this.nextNode = Array.from({ length: nodeCount }, () =>
      Array(nodeCount).fill(null)
    );
  }

  static fromMatrix(matrix: number[][]): FloydWarshall {
    const nodeCount = matrix.length;
    const fw = new FloydWarshall(nodeCount);

    for (let from = 0; from < nodeCount; from++) {
      for (let to = 0; to < nodeCount; to++) {
        fw.distanceMatrix[from][to] = matrix[from][to];
        if (matrix[from][to] !== Infinity) {
          fw.nextNode[from][to] = to;
        }
      }
    }

    return fw;
  }

  addEdge(from: number, to: number, weight: number): void {
    this.distanceMatrix[from][to] = weight;
    this.nextNode[from][to] = to;
    this.isSolved = false;
  }

  solve(): void {
    if (this.isSolved) return;

    // Hitung semua pasangan jarak terpendek
    for (let via = 0; via < this.nodeCount; via++) {
      for (let from = 0; from < this.nodeCount; from++) {
        for (let to = 0; to < this.nodeCount; to++) {
          const shortcutExists =
            this.distanceMatrix[from][via] !== Infinity &&
            this.distanceMatrix[via][to] !== Infinity;

          if (shortcutExists) {
            const shortcutDistance = this.distanceMatrix[from][via] + this.distanceMatrix[via][to];
            if (shortcutDistance < this.distanceMatrix[from][to]) {
              this.distanceMatrix[from][to] = shortcutDistance;
              this.nextNode[from][to] = this.nextNode[from][via];
            }
          }
        }
      }
    }

    // Tandai semua node yang terdampak negative cycle
    for (let via = 0; via < this.nodeCount; via++) {
      for (let from = 0; from < this.nodeCount; from++) {
        for (let to = 0; to < this.nodeCount; to++) {
          const viaIsOnNegativeCycle =
            this.distanceMatrix[from][via] !== Infinity &&
            this.distanceMatrix[via][to] !== Infinity &&
            this.distanceMatrix[via][via] < 0;

          if (viaIsOnNegativeCycle) {
            this.distanceMatrix[from][to] = -Infinity;
            this.nextNode[from][to] = this.NEGATIVE_CYCLE_MARKER;
          }
        }
      }
    }

    this.isSolved = true;
  }

  getDistance(from: number, to: number): number {
    this.solve();
    return this.distanceMatrix[from][to];
  }

  /**
   * Rekonstruksi jalur terpendek dari `from` ke `to`.
   * @returns Array node, null jika melewati negative cycle, [] jika tidak terhubung.
   */
  getPath(from: number, to: number): number[] | null {
    this.solve();

    if (this.distanceMatrix[from][to] === Infinity) return [];

    const path: number[] = [];
    let current = from;

    while (current !== to) {
      if (current === this.NEGATIVE_CYCLE_MARKER) return null;
      path.push(current);
      current = this.nextNode[current][to] as number;
    }

    if (this.nextNode[current][to] === this.NEGATIVE_CYCLE_MARKER) return null;

    path.push(to);
    return path;
  }
}
