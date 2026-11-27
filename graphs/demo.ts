import {
    AStarSearch,
    BellmanFord,
    BFS,
    BidirectionalBFS,
    DFS,
    Dijkstra,
    FloydWarshall,
    Kruskal,
    Prim,
    TopologicalSort,
    type AdjacencyList,
    type WeightedAdjacencyList,
    type WeightedEdge,
} from "./index"
import { show, section } from "../demo-utils"

const unweighted: AdjacencyList = {
    A: ["B", "C"],
    B: ["D"],
    C: ["D", "E"],
    D: ["F"],
    E: ["F"],
    F: [],
}

const weighted: WeightedAdjacencyList = {
    A: [
        ["B", 4],
        ["C", 2],
    ],
    B: [
        ["C", 1],
        ["D", 5],
    ],
    C: [
        ["D", 8],
        ["E", 10],
    ],
    D: [
        ["E", 2],
        ["F", 6],
    ],
    E: [["F", 3]],
    F: [],
}

/**
 * Menjalankan demonstrasi seluruh algoritma graf pada graf contoh tak berbobot,
 * graf berbobot, dan DAG lalu menampilkan hasilnya ke konsol.
 *
 * @returns Tidak mengembalikan nilai (mencetak hasil ke konsol)
 */
export function runDemo(): void {
    section("graphs — BFS")
    show("traverse dari A", [...new BFS().traverse(unweighted, "A")])

    section("graphs — DFS")
    show("traverse dari A", [...new DFS().traverse(unweighted, "A")])

    section("graphs — Dijkstra")
    show("A -> F", new Dijkstra().findShortestPath(weighted, "A", "F"))

    section("graphs — AStarSearch (heuristic = 0)")
    show(
        "A -> F",
        new AStarSearch().findShortestPath(weighted, "A", "F", () => 0),
    )

    section("graphs — BidirectionalBFS")
    show("A -> F (unweighted)", new BidirectionalBFS().findShortestPath(unweighted, "A", "F"))

    section("graphs — BellmanFord")
    const edges: WeightedEdge[] = [
        [0, 1, 4],
        [0, 2, 1],
        [1, 2, 2],
        [1, 3, 5],
        [2, 3, 8],
        [3, 4, 2],
    ]
    show("jarak dari 0", new BellmanFord().findShortestPaths(edges, 5, 0))

    section("graphs — FloydWarshall")
    const floyd = new FloydWarshall(4)
    floyd.addEdge(0, 1, 3)
    floyd.addEdge(1, 2, 4)
    floyd.addEdge(0, 2, 8)
    floyd.addEdge(2, 3, 2)
    floyd.solve()
    show("distance 0 -> 3", floyd.getDistance(0, 3))
    show("path 0 -> 3", floyd.getPath(0, 3))

    section("graphs — Kruskal MST")
    const mstEdges: WeightedEdge[] = [
        [0, 1, 10],
        [0, 2, 6],
        [0, 3, 5],
        [1, 3, 15],
        [2, 3, 4],
    ]
    show("MST edges", new Kruskal().build(4, mstEdges))

    section("graphs — Prim MST")
    show("MST edges", new Prim().fromGraph(weighted, "A"))

    section("graphs — TopologicalSort")
    const dag: Record<number, number[]> = { 0: [1, 2], 1: [3], 2: [3], 3: [] }
    show("urutan topo", new TopologicalSort().sort(dag))
}
