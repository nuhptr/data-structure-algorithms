import { IAhoCorasick } from "./interfaces";

/**
 * Node dalam Trie Aho-Corasick.
 */
class AhoCorasickNode {
  children: Map<string, AhoCorasickNode> = new Map();
  failureLink: AhoCorasickNode | null = null;
  outputPatterns: string[] = [];
}

/**
 * Aho-Corasick — algoritma multi-pattern string matching yang menemukan
 * semua kemunculan dari banyak pattern sekaligus dalam satu kali traversal teks.
 * Digunakan oleh antivirus, grep, dan sistem intrusion detection.
 *
 * Fase build : O(total panjang semua pattern)
 * Fase search: O(n + jumlah kemunculan)
 * Total      : O(n + m + z) — n=teks, m=total pattern, z=kemunculan
 *
 * @example
 * const ac = new AhoCorasick();
 * ac.addPattern("he").addPattern("she").addPattern("his").addPattern("hers").build();
 * ac.search("ushers");
 * // Map { "she" => [1], "he" => [2], "hers" => [2] }
 */
export class AhoCorasick implements IAhoCorasick {
  private root: AhoCorasickNode = new AhoCorasickNode();
  private isBuilt = false;

  addPattern(pattern: string): this {
    if (this.isBuilt) {
      throw new Error("Tidak bisa menambah pattern setelah build() dipanggil");
    }

    let currentNode = this.root;

    for (const char of pattern) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new AhoCorasickNode());
      }
      currentNode = currentNode.children.get(char)!;
    }

    currentNode.outputPatterns.push(pattern);
    return this;
  }

  build(): this {
    // BFS untuk membangun failure links
    const queue: AhoCorasickNode[] = [];

    // Level 1: failure link semua anak root → root
    for (const child of this.root.children.values()) {
      child.failureLink = this.root;
      queue.push(child);
    }

    while (queue.length > 0) {
      const currentNode = queue.shift()!;

      for (const [char, childNode] of currentNode.children) {
        // Cari failure link untuk anak ini
        let failureNode = currentNode.failureLink;

        while (failureNode !== null && !failureNode.children.has(char)) {
          failureNode = failureNode.failureLink;
        }

        childNode.failureLink = failureNode?.children.get(char) ?? this.root;

        // Gabungkan output dari failure link (suffix patterns)
        childNode.outputPatterns = [
          ...childNode.outputPatterns,
          ...(childNode.failureLink?.outputPatterns ?? []),
        ];

        queue.push(childNode);
      }
    }

    this.isBuilt = true;
    return this;
  }

  search(text: string): Map<string, number[]> {
    if (!this.isBuilt) {
      throw new Error("Panggil build() sebelum search()");
    }

    const results = new Map<string, number[]>();
    let currentNode = this.root;

    for (let index = 0; index < text.length; index++) {
      const char = text[index];

      // Ikuti failure links sampai menemukan transisi atau kembali ke root
      while (currentNode !== this.root && !currentNode.children.has(char)) {
        currentNode = currentNode.failureLink!;
      }

      if (currentNode.children.has(char)) {
        currentNode = currentNode.children.get(char)!;
      }

      // Kumpulkan semua pattern yang cocok di posisi ini
      for (const pattern of currentNode.outputPatterns) {
        const startIndex = index - pattern.length + 1;
        if (!results.has(pattern)) results.set(pattern, []);
        results.get(pattern)!.push(startIndex);
      }
    }

    return results;
  }
}
