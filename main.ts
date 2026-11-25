import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { createInterface } from "node:readline/promises"

/**
 * Entry point — pilih folder topik untuk menjalankan demo-nya.
 *
 * Setiap folder yang punya `index.ts` dianggap topik. Jika folder
 * memiliki `demo.ts` dengan export `runDemo()`, demo dijalankan;
 * jika tidak, daftar exports dari `index.ts` ditampilkan.
 *
 * Cara pakai:
 *   npx tsx main.ts
 */
async function main(): Promise<void> {
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

    console.log("Data Structure & Algorithms — Demo Runner\n")
    topics.forEach((topic, index) => console.log(`  ${index + 1}. ${topic}`))
    console.log("\n  q. keluar")

    const rl = createInterface({ input: process.stdin, output: process.stdout })

    try {
        for await (const raw of rl) {
            const answer = raw.trim().toLowerCase()
            if (answer === "q" || answer === "quit" || answer === "exit") break
            if (!answer) continue

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
        rl.close()
    }
}

async function runTopic(topic: string): Promise<void> {
    try {
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

    const mod = (await import(`./${topic}/index.ts`)) as Record<string, unknown>
    const exports = Object.keys(mod).sort()
    console.log(`\n${topic} — tidak ada demo.ts, exports yang tersedia:`)
    exports.forEach((name) => console.log(`  - ${name}`))
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
