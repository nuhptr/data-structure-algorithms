import type { ISortAlgorithm } from "./interfaces"
import { BubbleSort } from "./bubble-sort"
import { CountingSort } from "./counting-sort"
import { HeapSort } from "./heap-sort"
import { InsertionSort } from "./insertion-sort"
import { MergeSort } from "./merge-sort"
import { QuickSort } from "./quick-sort"
import { RadixSort } from "./radix-sort"
import { SelectionSort } from "./selection-sort"
import { ShellSort } from "./shell-sort"
import { TimSort } from "./tim-sort"
import { section } from "../demo-utils"

const SORTERS: Array<[string, ISortAlgorithm]> = [
    ["BubbleSort", new BubbleSort()],
    ["InsertionSort", new InsertionSort()],
    ["SelectionSort", new SelectionSort()],
    ["MergeSort", new MergeSort()],
    ["QuickSort", new QuickSort()],
    ["HeapSort", new HeapSort()],
    ["CountingSort", new CountingSort()],
    ["RadixSort", new RadixSort()],
    ["ShellSort", new ShellSort()],
    ["TimSort", new TimSort()],
]

/**
 * Menjalankan demonstrasi seluruh algoritma pengurutan pada array contoh yang sama
 * untuk membandingkan hasilnya.
 *
 * @returns Tidak mengembalikan nilai (mencetak hasil ke konsol)
 */
export function runDemo(): void {
    const input = [38, 27, 43, 3, 9, 82, 10]

    section("sorting-algo — semua algoritma")
    console.log("input:", input)
    for (const [name, sorter] of SORTERS) {
        console.log(`${name.padEnd(15)} =>`, sorter.sort(input))
    }
}
