/** Adjacency list untuk graf tak berbobot: node → daftar tetangga */
export type AdjacencyList = Record<string | number, (string | number)[]>

/** Adjacency list untuk graf berbobot: node → daftar [tetangga, bobot] */
export type WeightedAdjacencyList = Record<string, [string, number][]>

/** Edge berbobot: [dari, ke, bobot] */
export type WeightedEdge = [number, number, number]

/** Fungsi heuristik untuk A* (estimasi jarak dari node ke tujuan) */
export type HeuristicFn = (node: string, goal: string) => number

export interface IGraphTraversal {
    traverse(graph: AdjacencyList, startNode: string): Set<string>
}

export interface IShortestPath {
    findShortestPath(graph: WeightedAdjacencyList, start: string, end: string): number
}

export interface ITopologicalSort {
    sort(graph: Record<number, number[]>): number[] | null
}

export interface IMinimumSpanningTree {
    build(nodeCount: number, edges: WeightedEdge[]): WeightedEdge[]
}

export interface IBellmanFord {
    findShortestPaths(edges: WeightedEdge[], vertexCount: number, sourceVertex: number): number[]
}

export interface IAStarSearch {
    findShortestPath(
        graph: WeightedAdjacencyList,
        start: string,
        end: string,
        heuristic: HeuristicFn,
    ): number
}

export interface IBidirectionalBFS {
    findShortestPath(graph: AdjacencyList, start: string, end: string): number
}
