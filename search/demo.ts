import {
    BinarySearchIterative,
    BinarySearchRecursive,
    ExponentialSearch,
    InterpolationSearch,
    JumpSearch,
    LinearSearch,
    TernarySearch,
} from "./index"
import { show, section } from "../demo-utils"

const sorted = [1, 3, 5, 7, 9, 11, 13, 15]

/**
 * Menjalankan demo untuk seluruh algoritma pencarian di modul `search`,
 * meliputi Linear, Binary (iteratif & rekursif), Jump, Exponential, Interpolation, dan Ternary Search.
 */
export function runDemo(): void {
    section("search — LinearSearch")
    show("cari 7", new LinearSearch<number>().search([3, 1, 4, 1, 5, 9, 2, 6], 6))

    section("search — BinarySearch (iterative & recursive)")
    show("iterative cari 9", new BinarySearchIterative().search(sorted, 9))
    show("recursive cari 9", new BinarySearchRecursive().search(sorted, 9))
    show("iterative cari 4", new BinarySearchIterative().search(sorted, 4))

    section("search — JumpSearch")
    show("cari 7", new JumpSearch().search(sorted, 7))

    section("search — ExponentialSearch")
    show("cari 40", new ExponentialSearch().search([1, 2, 3, 4, 10, 40, 100], 40))

    section("search — InterpolationSearch")
    show("cari 40", new InterpolationSearch().search([10, 20, 30, 40, 50, 60], 40))

    section("search — TernarySearch")
    show("findMin [3,1,4,1,5]", new TernarySearch().findMin([3, 1, 4, 1, 5], 0, 4))
    show("findMax [3,1,4,1,5]", new TernarySearch().findMax([3, 1, 4, 1, 5], 0, 4))
}
