/**
 * Kontrak untuk struktur data Disjoint Set (Union-Find) yang mengelola
 * himpunan-himpunan saling lepas (disjoint subsets).
 */
export interface IDisjointSet {
    /**
     * Membuat himpunan baru yang hanya berisi satu elemen `node`.
     *
     * @param node - Identitas numerik elemen yang akan dibuatkan himpunan
     */
    makeSet(node: number): void

    /**
     * Mencari perwakilan (root) dari himpunan yang memuat `node`.
     *
     * @param node - Elemen yang dicari root himpunannya
     * @returns Identitas root dari himpunan tersebut
     */
    find(node: number): number

    /**
     * Menggabungkan himpunan yang memuat `nodeA` dengan himpunan yang memuat `nodeB`.
     *
     * @param nodeA - Elemen pertama
     * @param nodeB - Elemen kedua
     */
    union(nodeA: number, nodeB: number): void

    /**
     * Memeriksa apakah `nodeA` dan `nodeB` berada di dalam himpunan yang sama.
     *
     * @param nodeA - Elemen pertama
     * @param nodeB - Elemen kedua
     * @returns `true` jika keduanya terhubung dalam satu himpunan, `false` jika tidak
     */
    connected(nodeA: number, nodeB: number): boolean
}
