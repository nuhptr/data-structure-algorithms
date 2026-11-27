import { IAhoCorasick } from "./interfaces"

/**
 * Node dalam Trie Aho-Corasick beserta failure link dan daftar pola keluaran.
 */
class AhoCorasickNode {
    /** Transisi karakter ke node anak berikutnya dalam Trie. */
    children: Map<string, AhoCorasickNode> = new Map()
    /** Pointer fallback ke suffix terpanjang yang valid saat transisi gagal. */
    failureLink: AhoCorasickNode | null = null
    /** Daftar pola yang berakhir pada node ini (termasuk pola dari failure link). */
    outputPatterns: string[] = []
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
    /** Node akar (root) dari automaton Trie Aho-Corasick. */
    private root: AhoCorasickNode = new AhoCorasickNode()
    /** Penanda apakah failure link automaton sudah selesai dibangun. */
    private isBuilt = false

    /**
     * Memasukkan sebuah pola baru ke dalam Trie sebelum automaton dibangun.
     *
     * @param pattern - Pola string yang akan dicari nantinya.
     * @returns Instance ini sendiri untuk chaining.
     */
    addPattern(pattern: string): this {
        if (this.isBuilt) {
            throw new Error("Tidak bisa menambah pattern setelah build() dipanggil")
        }

        let currentNode = this.root

        // Buat jalur node karakter demi karakter di dalam Trie
        for (const char of pattern) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new AhoCorasickNode())
            }
            currentNode = currentNode.children.get(char)!
        }

        // Tandai node akhir sebagai pemilik pola ini
        currentNode.outputPatterns.push(pattern)
        return this
    }

    /**
     * Membangun failure link pada seluruh node Trie menggunakan BFS dan menggabungkan
     * daftar pola keluaran dari suffix yang cocok.
     *
     * @returns Instance ini sendiri setelah automaton siap melakukan pencarian.
     */
    build(): this {
        // BFS untuk membangun failure links level demi level
        const queue: AhoCorasickNode[] = []

        // Level 1: failure link semua anak root selalu mengarah kembali ke root
        for (const child of this.root.children.values()) {
            child.failureLink = this.root
            queue.push(child)
        }

        while (queue.length > 0) {
            const currentNode = queue.shift()!

            for (const [char, childNode] of currentNode.children) {
                // Telusuri failure link induk hingga menemukan node yang punya transisi `char`
                let failureNode = currentNode.failureLink

                while (failureNode !== null && !failureNode.children.has(char)) {
                    failureNode = failureNode.failureLink
                }

                childNode.failureLink = failureNode?.children.get(char) ?? this.root

                // Gabungkan output dari failure link agar suffix pattern ikut dilaporkan
                childNode.outputPatterns = [
                    ...childNode.outputPatterns,
                    ...(childNode.failureLink?.outputPatterns ?? []),
                ]

                queue.push(childNode)
            }
        }

        this.isBuilt = true
        return this
    }

    /**
     * Memindai teks dalam satu kali lintasan untuk menemukan semua kemunculan
     * seluruh pola yang terdaftar.
     *
     * @param text - Teks sumber yang akan dipindai.
     * @returns Peta dari tiap pola yang cocok ke array indeks awal kemunculannya.
     */
    search(text: string): Map<string, number[]> {
        if (!this.isBuilt) {
            throw new Error("Panggil build() sebelum search()")
        }

        const results = new Map<string, number[]>()
        let currentNode = this.root

        for (let index = 0; index < text.length; index++) {
            const char = text[index]

            // Ikuti failure links sampai menemukan transisi valid atau kembali ke root
            while (currentNode !== this.root && !currentNode.children.has(char)) {
                currentNode = currentNode.failureLink!
            }

            if (currentNode.children.has(char)) {
                currentNode = currentNode.children.get(char)!
            }

            // Kumpulkan semua pattern yang berakhir pada posisi indeks saat ini
            for (const pattern of currentNode.outputPatterns) {
                const startIndex = index - pattern.length + 1
                if (!results.has(pattern)) results.set(pattern, [])
                results.get(pattern)!.push(startIndex)
            }
        }

        return results
    }
}
