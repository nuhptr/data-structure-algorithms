import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { createInterface } from "node:readline/promises"

/**
 * Entry point interaktif — menampilkan daftar folder topik dan menjalankan demo pilihan pengguna.
 *
 * Setiap folder di root yang memiliki `index.ts` dianggap sebagai topik. Jika folder
 * memiliki `demo.ts` dengan export `runDemo()`, fungsi demo dijalankan; jika tidak,
 * daftar nama export dari `index.ts` ditampilkan sebagai fallback.
 *
 * Kompleksitas Waktu : O(t log t) untuk memindai dan mengurutkan daftar topik
 * Kompleksitas Ruang : O(t) untuk menyimpan daftar nama topik
 *
 * @returns Promise yang selesai ketika pengguna keluar dari prompt interaktif.
 *
 * @example
 * // Jalankan melalui terminal:
 * // npx tsx main.ts
 */
async function main(): Promise<void> {
    // Pindai direktori kerja untuk menemukan semua folder topik yang valid
    const topics = readdirSync(process.cwd(), { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .filter(
            (name) =>
                !name.startsWith(".") &&
                name !== "node_modules" &&
                existsSync(join(name, "index.ts")),
        )
        .sort()

    // Tampilkan menu topik bernomor ke terminal
    console.log("Data Structure & Algorithms — Demo Runner\n")
    topics.forEach((topic, index) => console.log(`  ${index + 1}. ${topic}`))
    console.log("\n  q. keluar")

    const rl = createInterface({ input: process.stdin, output: process.stdout })

    try {
        // Baca pilihan pengguna secara berulang hingga pengguna memilih keluar
        for await (const raw of rl) {
            const answer = raw.trim().toLowerCase()
            if (answer === "q" || answer === "quit" || answer === "exit") break
            if (!answer) continue

            // Izinkan pemilihan berdasarkan nomor urut maupun nama folder langsung
            const index = Number(answer) - 1
            const topic =
                Number.isInteger(index) && index >= 0 && index < topics.length
                    ? topics[index]
                    : topics.find((name) => name === answer)

            if (!topic) {
                console.log(`Topik "${answer}" tidak ditemukan.`)
                continue
            }

            await runTopic(topic)
        }
    } finally {
        // Pastikan stream readline selalu ditutup meskipun terjadi error
        rl.close()
    }
}

/**
 * Memuat dan menjalankan `runDemo()` dari folder topik tertentu, atau menampilkan
 * daftar export `index.ts` apabila file `demo.ts` tidak tersedia.
 *
 * @param topic - Nama folder topik yang akan dijalankan.
 * @returns Promise yang selesai setelah demo atau daftar export selesai ditampilkan.
 */
async function runTopic(topic: string): Promise<void> {
    try {
        // Coba muat modul demo.ts milik topik secara dinamis
        const demo = (await import(`./${topic}/demo.ts`)) as {
            runDemo?: () => void
        }
        if (typeof demo.runDemo === "function") {
            demo.runDemo()
            return
        }
    } catch {
        // demo.ts opsional — lanjut ke fallback exports
    }

    // Fallback: tampilkan semua simbol yang diekspor dari index.ts
    const mod = (await import(`./${topic}/index.ts`)) as Record<string, unknown>
    const exports = Object.keys(mod).sort()
    console.log(`\n${topic} — tidak ada demo.ts, exports yang tersedia:`)
    exports.forEach((name) => console.log(`  - ${name}`))
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
