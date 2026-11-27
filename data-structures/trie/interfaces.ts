/**
 * Kontrak untuk struktur data Trie (Prefix Tree).
 */
export interface ITrie {
    /**
     * Menambahkan sebuah kata ke dalam Trie.
     *
     * @param word - Kata yang akan disimpan
     * @returns Instance Trie yang sama untuk mendukung method chaining
     */
    add(word: string): this

    /**
     * Mencari kata atau prefix di dalam Trie.
     *
     * @param word - Kata atau prefix yang dicari
     * @param prefixOnly - Jika `true`, mencocokkan berdasarkan prefix saja; default `false` (exact match)
     * @returns `true` jika kata/prefix ditemukan, `false` jika tidak
     */
    find(word: string, prefixOnly?: boolean): boolean
}
