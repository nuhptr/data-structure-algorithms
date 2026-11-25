import { ITrie } from "./interfaces";

/**
 * Satu node di dalam Trie.
 * Menyimpan referensi ke node anak per karakter dan
 * penanda apakah node ini merupakan akhir dari sebuah kata.
 */
class TrieNode {
  children: Record<string, TrieNode> = {};
  isEndOfWord: boolean = false;
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
 * const trie = new Trie();
 * trie.add("apple").add("app");
 * trie.find("apple");        // => true  (exact match)
 * trie.find("app", true);    // => true  (prefix match)
 * trie.find("ap", true);     // => true  (prefix match)
 * trie.find("banana");       // => false
 */
export class Trie implements ITrie {
  private root: TrieNode = new TrieNode();

  /**
   * Menambahkan kata ke dalam Trie.
   * Mengembalikan instance ini untuk memungkinkan method chaining.
   */
  add(word: string): this {
    let currentNode = this.root;

    for (const char of word) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode();
      }
      currentNode = currentNode.children[char];
    }

    currentNode.isEndOfWord = true;
    return this;
  }

  /**
   * Mencari kata di dalam Trie.
   *
   * @param word        - Kata yang dicari
   * @param prefixOnly  - Jika true, cukup mencocokkan prefix; default false (exact match)
   */
  find(word: string, prefixOnly: boolean = false): boolean {
    let currentNode = this.root;

    for (const char of word) {
      if (!currentNode.children[char]) return false;
      currentNode = currentNode.children[char];
    }

    return prefixOnly || currentNode.isEndOfWord;
  }
}
