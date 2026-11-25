/**
 * Kontrak untuk struktur data Trie.
 */
export interface ITrie {
  add(word: string): this;
  find(word: string, prefixOnly?: boolean): boolean;
}
