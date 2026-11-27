import { GroupAnagrams, HashTable, TwoSumSolver, WordCounter } from "./index"
import { show, section } from "../demo-utils"

/**
 * Menjalankan demo interaktif untuk seluruh implementasi di modul `hash-table`,
 * meliputi `HashTable`, `GroupAnagrams`, `TwoSumSolver`, dan `WordCounter`.
 */
export function runDemo(): void {
    section("hash-table — HashTable")
    const table = new HashTable<string>(10)
    table.set("john", "555-333-444")
    table.set("jordan", "222-444-666")
    show("get('jordan')", table.get("jordan"))
    show("getAllKeys()", table.getAllKeys())

    section("hash-table — GroupAnagrams")
    show("anagrams", new GroupAnagrams().group(["eat", "tea", "tan", "ate", "nat", "bat"]))

    section("hash-table — TwoSumSolver")
    show("two sum target 9", new TwoSumSolver().findPair({ nums: [2, 7, 11, 13], target: 9 }))

    section("hash-table — WordCounter")
    show("word count", new WordCounter().count("Hello my name name name is anmastery"))
}
