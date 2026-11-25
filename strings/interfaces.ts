/**
 * Kontrak untuk algoritma pencarian string (pattern matching).
 */
export interface IStringMatcher {
    /**
     * @param text    - Teks utama yang akan dicari
     * @param pattern - Pola yang dicari di dalam teks
     * @returns Array of starting index positions where pattern is found
     */
    findAll(text: string, pattern: string): number[]
}

/**
 * Kontrak untuk algoritma yang hanya perlu tahu apakah pattern ada atau tidak.
 */
export interface IStringContains {
    contains(text: string, pattern: string): boolean
}

/**
 * Kontrak untuk Z-Algorithm: membangun Z-array dari sebuah string.
 */
export interface IZAlgorithm {
    buildZArray(s: string): number[]
    findAll(text: string, pattern: string): number[]
}

/**
 * Kontrak untuk Aho-Corasick: multi-pattern string matching.
 */
export interface IAhoCorasick {
    addPattern(pattern: string): this
    build(): this
    search(text: string): Map<string, number[]>
}

/**
 * Kontrak untuk Suffix Array.
 */
export interface ISuffixArray {
    build(s: string): number[]
    search(s: string, pattern: string): number[]
}
