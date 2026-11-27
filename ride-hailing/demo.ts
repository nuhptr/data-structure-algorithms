import {
    AStarSearch,
    Geohash,
    Haversine,
    HungarianAlgorithm,
    Quadtree,
    type RoadNode,
} from "./index"
import { show, section } from "../demo-utils"

/**
 * Menjalankan demonstrasi seluruh algoritma pada modul ride-hailing.
 */
export function runDemo(): void {
    section("ride-hailing — Haversine")
    const jakarta = { latitude: -6.2088, longitude: 106.8456 }
    const bandung = { latitude: -6.9175, longitude: 107.6191 }
    show("jakarta -> bandung (km)", new Haversine().distanceKm(jakarta, bandung))

    section("ride-hailing — Geohash")
    const geohash = new Geohash()
    const hash = geohash.encode(jakarta)
    show("encode jakarta", hash)
    show("decode", geohash.decode(hash))
    show("neighbors", geohash.getNeighbors(hash))

    section("ride-hailing — AStarSearch")
    const nodes = new Map<string, RoadNode>([
        [
            "A",
            {
                id: "A",
                neighbors: [
                    { nodeId: "B", cost: 4 },
                    { nodeId: "C", cost: 2 },
                ],
            },
        ],
        ["B", { id: "B", neighbors: [{ nodeId: "D", cost: 5 }] }],
        [
            "C",
            {
                id: "C",
                neighbors: [
                    { nodeId: "D", cost: 1 },
                    { nodeId: "E", cost: 7 },
                ],
            },
        ],
        ["D", { id: "D", neighbors: [{ nodeId: "F", cost: 3 }] }],
        ["E", { id: "E", neighbors: [{ nodeId: "F", cost: 2 }] }],
        ["F", { id: "F", neighbors: [] }],
    ])
    const astar = new AStarSearch()
    show(
        "path A -> F",
        astar.findPath(nodes, "A", "F", () => 0),
    )

    section("ride-hailing — HungarianAlgorithm")
    const costMatrix = [
        [9, 2, 7],
        [6, 4, 3],
        [5, 8, 1],
    ]
    show("matching optimal", new HungarianAlgorithm().match(costMatrix))

    section("ride-hailing — Quadtree")
    const tree = new Quadtree({ centerX: 0, centerY: 0, halfWidth: 100, halfHeight: 100 })
    tree.insert({ x: 10, y: 10, data: "titik A" })
    tree.insert({ x: -20, y: 30, data: "titik B" })
    tree.insert({ x: 80, y: -40, data: "titik C" })
    show("queryRadius(0,0,50)", tree.queryRadius(0, 0, 50))
}
