/** Adjacency list untuk graf tak berbobot: node → daftar tetangga */
export type AdjacencyList = Record<string | number, (string | number)[]>

/** Adjacency list untuk graf berbobot: node → daftar [tetangga, bobot] */
export type WeightedAdjacencyList = Record<string, [string, number][]>

/** Edge berbobot: [dari, ke, bobot] */
export type WeightedEdge = [number, number, number]

/**
 * Fungsi heuristik untuk algoritma A* yang mengestimasi jarak dari node saat ini ke tujuan.
 *
 * @param node - Identitas node yang sedang dievaluasi
 * @param goal - Identitas node tujuan
 * @returns Estimasi biaya jarak dari `node` ke `goal`
 */
export type HeuristicFn = (node: string, goal: string) => number

/**
 * Kontrak untuk algoritma penelusuran graf (traversal) seperti BFS dan DFS.
 */
export interface IGraphTraversal {
    /**
     * Menelusuri seluruh node yang dapat dijangkau dari `startNode`.
     *
     * @param graph - Representasi adjacency list graf tak berbobot
     * @param startNode - Node awal penelusuran
     * @returns Himpunan seluruh node yang berhasil dikunjungi
     */
    traverse(graph: AdjacencyList, startNode: string): Set<string>
}

/**
 * Kontrak untuk algoritma pencarian jalur terpendek pada graf berbobot.
 */
export interface IShortestPath {
    /**
     * Mencari total biaya jalur terpendek dari `start` ke `end`.
     *
     * @param graph - Representasi adjacency list graf berbobot
     * @param start - Node awal
     * @param end - Node tujuan
     * @returns Total biaya jalur terpendek, atau `-1` jika `end` tidak dapat dijangkau
     */
    findShortestPath(graph: WeightedAdjacencyList, start: string, end: string): number
}

/**
 * Kontrak untuk algoritma pengurutan topologi pada Directed Acyclic Graph (DAG).
 */
export interface ITopologicalSort {
    /**
     * Menghasilkan urutan topologi dari seluruh node dalam DAG.
     *
     * @param graph - Adjacency list graf berarah dengan kunci dan tetangga bertipe angka
     * @returns Array urutan topologi node, atau `null` jika graf mengandung siklus
     */
    sort(graph: Record<number, number[]>): number[] | null
}

/**
 * Kontrak untuk algoritma pembangunan Minimum Spanning Tree (MST).
 */
export interface IMinimumSpanningTree {
    /**
     * Membangun Minimum Spanning Tree dari daftar edge berbobot.
     *
     * @param nodeCount - Jumlah total vertex dalam graf (berindeks `0` hingga `nodeCount - 1`)
     * @param edges - Daftar seluruh edge berbobot dalam format `[dari, ke, bobot]`
     * @returns Daftar edge terpilih yang membentuk MST
     */
    build(nodeCount: number, edges: WeightedEdge[]): WeightedEdge[]
}

/**
 * Kontrak untuk algoritma Bellman-Ford (single-source shortest path dengan dukungan bobot negatif).
 */
export interface IBellmanFord {
    /**
     * Menghitung jarak terpendek dari `sourceVertex` ke seluruh vertex lainnya.
     *
     * @param edges - Daftar seluruh edge berbobot dalam format `[dari, ke, bobot]`
     * @param vertexCount - Jumlah total vertex dalam graf
     * @param sourceVertex - Indeks vertex sumber
     * @returns Array jarak terpendek ke masing-masing vertex
     */
    findShortestPaths(edges: WeightedEdge[], vertexCount: number, sourceVertex: number): number[]
}

/**
 * Kontrak untuk algoritma pencarian jalur terpendek A* menggunakan fungsi heuristik.
 */
export interface IAStarSearch {
    /**
     * Mencari total biaya jalur terpendek dari `start` ke `end` dengan panduan heuristik.
     *
     * @param graph - Representasi adjacency list graf berbobot
     * @param start - Node awal
     * @param end - Node tujuan
     * @param heuristic - Fungsi heuristik estimasi biaya dari suatu node ke tujuan
     * @returns Total biaya jalur terpendek, atau `-1` jika tujuan tidak dapat dijangkau
     */
    findShortestPath(
        graph: WeightedAdjacencyList,
        start: string,
        end: string,
        heuristic: HeuristicFn,
    ): number
}

/**
 * Kontrak untuk algoritma Bidirectional BFS pada graf tak berbobot.
 */
export interface IBidirectionalBFS {
    /**
     * Mencari jarak hop terpendek antara `start` dan `end` dengan pencarian dari dua arah.
     *
     * @param graph - Representasi adjacency list graf tak berbobot
     * @param start - Node awal
     * @param end - Node tujuan
     * @returns Jumlah hop terpendek, atau `-1` jika tidak ada jalur penghubung
     */
    findShortestPath(graph: AdjacencyList, start: string, end: string): number
}
