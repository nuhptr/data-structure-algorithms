import { ITrie } from "./interfaces"

/**
 * Satu node di dalam Trie.
 * Menyimpan referensi ke node anak per karakter dan
 * penanda apakah node ini merupakan akhir dari sebuah kata.
 */
class TrieNode {
    /** Peta karakter menuju node anak berikutnya. */
    children: Record<string, TrieNode> = {}
    /** Penanda bahwa jalur dari root hingga node ini membentuk sebuah kata lengkap. */
    isEndOfWord: boolean = false
}

/**
 * Trie (Prefix Tree) — struktur data untuk menyimpan dan mencari kata
 * dengan efisien berdasarkan prefix.
 *
 * Kompleksitas insert : O(L) — L = panjang kata
 * Kompleksitas search : O(L)
 * Kompleksitas ruang  : O(total karakter semua kata)
 *
 * @example
 * const trie = new Trie()
 * trie.add("apple").add("app")
 * trie.find("apple")      // => true  (exact match)
 * trie.find("app", true)  // => true  (prefix match)
 * trie.find("ap", true)   // => true  (prefix match)
 * trie.find("banana")     // => false
 */
export class Trie implements ITrie {
    /** Node akar (root) kosong yang menjadi titik awal semua kata di dalam Trie. */
    private root: TrieNode = new TrieNode()

    /**
     * Menambahkan kata ke dalam Trie karakter demi karakter.
     * Mengembalikan instance ini untuk memungkinkan method chaining.
     *
     * @param word - Kata yang akan dimasukkan ke dalam Trie
     * @returns Instance `Trie` saat ini (`this`)
     */
    add(word: string): this {
        let currentNode = this.root

        // Telusuri atau buat node anak untuk setiap karakter pada kata
        for (const char of word) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode()
            }
            currentNode = currentNode.children[char]
        }

        // Tandai node terakhir sebagai akhir dari kata yang valid
        currentNode.isEndOfWord = true
        return this
    }

    /**
     * Mencari kata atau prefix di dalam Trie.
     *
     * @param word - Kata atau prefix yang dicari
     * @param prefixOnly - Jika `true`, cukup mencocokkan prefix; default `false` (exact match)
     * @returns `true` jika kata/prefix ditemukan, `false` jika tidak
     */
    find(word: string, prefixOnly: boolean = false): boolean {
        let currentNode = this.root

        // Ikuti jalur karakter dari root; gagal segera jika ada karakter yang tidak ditemukan
        for (const char of word) {
            if (!currentNode.children[char]) return false
            currentNode = currentNode.children[char]
        }

        // Jika mode prefixOnly aktif, cukup jalur tersedia; jika tidak, harus akhir kata valid
        return prefixOnly || currentNode.isEndOfWord
    }
}
