import {
    CombinationGenerator,
    NQueensSolver,
    ParenthesesGenerator,
    PermutationGenerator,
    SubsetSumSolver,
    WordSearch,
} from "./index"
import { show, section } from "../demo-utils"

export function runDemo(): void {
    section("backtracking — CombinationGenerator")
    show("C(4,2)", new CombinationGenerator().generate(4, 2))

    section("backtracking — ParenthesesGenerator")
    show("generate(3)", new ParenthesesGenerator().generate(3))

    section("backtracking — NQueensSolver")
    show("solve(4)", new NQueensSolver().solve(4))

    section("backtracking — PermutationGenerator")
    show("permute [1,2,3]", new PermutationGenerator().generate([1, 2, 3]))

    section("backtracking — SubsetSumSolver")
    show("subset sum 7 dari [2,3,5,7]", new SubsetSumSolver().findAll([2, 3, 5, 7], 7))

    section("backtracking — WordSearch")
    const board = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "H", "I"],
    ]
    show("cari 'ABFI'", new WordSearch().exists(board, "ABFI"))
}
