import { IDisjointSet } from "./interfaces";

/**
 * Disjoint Set / Union-Find — struktur data untuk mengelola kumpulan
 * elemen yang terbagi dalam subset tidak saling tumpang tindih.
 *
 * Menggunakan dua optimasi:
 *  - Union by Rank  : selalu pasang pohon lebih pendek di bawah pohon lebih tinggi
 *  - Path Compression: saat find(), langsung hubungkan node ke root
 *
 * Kompleksitas find/union : O(α(n)) — hampir konstan (inverse Ackermann)
 * Kompleksitas Ruang      : O(n)
 *
 * @example
 * const ds = new DisjointSet();
 * [0, 1, 2, 3].forEach(n => ds.makeSet(n));
 * ds.union(0, 1); ds.union(1, 2);
 * ds.connected(0, 2); // => true
 * ds.connected(0, 3); // => false
 */
export class DisjointSet implements IDisjointSet {
  private parent: Map<number, number> = new Map();
  private rank: Map<number, number> = new Map();

  makeSet(node: number): void {
    this.parent.set(node, node);
    this.rank.set(node, 0);
  }

  find(node: number): number {
    if (this.parent.get(node) !== node) {
      // Path compression
      this.parent.set(node, this.find(this.parent.get(node)!));
    }
    return this.parent.get(node)!;
  }

  union(nodeA: number, nodeB: number): void {
    const rootA = this.find(nodeA);
    const rootB = this.find(nodeB);

    if (rootA === rootB) return;

    const rankA = this.rank.get(rootA)!;
    const rankB = this.rank.get(rootB)!;

    // Union by rank — pohon pendek di bawah pohon tinggi
    if (rankA > rankB) {
      this.parent.set(rootB, rootA);
    } else if (rankA < rankB) {
      this.parent.set(rootA, rootB);
    } else {
      this.parent.set(rootB, rootA);
      this.rank.set(rootA, rankA + 1);
    }
  }

  connected(nodeA: number, nodeB: number): boolean {
    return this.find(nodeA) === this.find(nodeB);
  }
}
