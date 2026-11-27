import { StudentSearcher } from "./index"
import { show, section } from "../demo-utils"

/**
 * Menjalankan demonstrasi pencarian siswa menggunakan `StudentSearcher`
 * dengan data bawaan maupun data yang disuntikkan.
 *
 * @returns Tidak mengembalikan nilai.
 */
export function runDemo(): void {
    section("introduction — StudentSearcher")
    const searcher = new StudentSearcher()
    show('search("Alice")', searcher.search("Alice"))
    show('search("John")', searcher.search("John"))
    show('search("Zoe")', searcher.search("Zoe"))

    section("introduction — StudentSearcher (data suntik)")
    const custom = new StudentSearcher(["Budi Santoso", "Siti Aminah"])
    show('search("budi")', custom.search("budi"))
}
