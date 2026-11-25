import {
    BurstBalloonsSolver,
    CoinChangeSolver,
    EditDistanceSolver,
    FibonacciSolver,
    KadaneSolver,
    KnapsackSolver,
    LCSSolver,
    LISSolver,
    MatrixChainSolver,
    PalindromePartitioningSolver,
    RegexMatcher,
    UniquePathsSolver,
    WordBreakSolver,
} from "./index"
import { show, section } from "../demo-utils"

export function runDemo(): void {
    section("dp — FibonacciSolver")
    show("fibonacci(10)", new FibonacciSolver().solve(10))

    section("dp — CoinChangeSolver")
    show("koin 1,2,5 target 11", new CoinChangeSolver().solve(11, [1, 2, 5]))

    section("dp — KnapsackSolver")
    show("kapasitas 50", new KnapsackSolver().solve(50, [10, 20, 30], [60, 100, 120]))

    section("dp — LCSSolver")
    show("LCS 'ABCBDAB' vs 'BDCABA'", new LCSSolver().solve("ABCBDAB", "BDCABA"))

    section("dp — EditDistanceSolver")
    show(
        "bottomUp 'kitten' vs 'sitting'",
        new EditDistanceSolver().solveBottomUp("kitten", "sitting"),
    )

    section("dp — LISSolver")
    show("LIS [10,9,2,5,3,7,101,18]", new LISSolver().solve([10, 9, 2, 5, 3, 7, 101, 18]))

    section("dp — KadaneSolver")
    show("max subarray", new KadaneSolver().solve([-2, 1, -3, 4, -1, 2, 1, -5, 4]))

    section("dp — MatrixChainSolver")
    show("dims [10,20,30,40,30]", new MatrixChainSolver().solve([10, 20, 30, 40, 30]))

    section("dp — UniquePathsSolver")
    show("3x7 grid", new UniquePathsSolver().countPaths(3, 7))

    section("dp — WordBreakSolver")
    const wb = new WordBreakSolver()
    show("canBreak 'leetcode'", wb.canBreak("leetcode", ["leet", "code"]))

    section("dp — PalindromePartitioningSolver")
    show("minCuts 'aab'", new PalindromePartitioningSolver().minCuts("aab"))

    section("dp — BurstBalloonsSolver")
    show("maxCoins [3,1,5,8]", new BurstBalloonsSolver().maxCoins([3, 1, 5, 8]))

    section("dp — RegexMatcher")
    show("isMatch 'aa' vs 'a*'", new RegexMatcher().isMatch("aa", "a*"))
}
