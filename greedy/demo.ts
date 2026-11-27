import {
    ActivitySelector,
    FractionalKnapsack,
    HuffmanCoding,
    JumpGame,
    OptimalMergeSolver,
    TaskScheduler,
} from "./index"
import { show, section } from "../demo-utils"

/**
 * Menjalankan demonstrasi seluruh algoritma pada modul greedy.
 */
export function runDemo(): void {
    section("greedy — ActivitySelector")
    const activities: [number, number][] = [
        [1, 4],
        [3, 5],
        [0, 6],
        [5, 7],
        [8, 9],
        [5, 9],
    ]
    show("aktivitas terpilih", new ActivitySelector().select(activities))

    section("greedy — FractionalKnapsack")
    show("nilai maks", new FractionalKnapsack().solve([60, 100, 120], [10, 20, 30], 50))

    section("greedy — HuffmanCoding")
    const huffman = new HuffmanCoding()
    const { encoded, codes } = huffman.encode("hello")
    show("encoded", encoded)
    show("decoded", huffman.decode(encoded, codes))

    section("greedy — JumpGame")
    const jump = new JumpGame()
    show("canJump [2,3,1,1,4]", jump.canJump([2, 3, 1, 1, 4]))
    show("minJumps [2,3,1,1,4]", jump.minJumps([2, 3, 1, 1, 4]))

    section("greedy — OptimalMerge")
    show("biaya merge [5,2,4,7,1,3,8]", new OptimalMergeSolver().solve([5, 2, 4, 7, 1, 3, 8]))

    section("greedy — TaskScheduler")
    show("interval min A,A,A,B,B", new TaskScheduler().leastIntervals(["A", "A", "A", "B", "B"], 2))
}
