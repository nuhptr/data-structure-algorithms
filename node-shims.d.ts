/**
 * Deklarasi minimal untuk API Node.js yang dipakai main.ts.
 * Repo ini belum memiliki package.json/@types/node, jadi shim
 * ini menjaga `tsc --strict` tetap bersih tanpa dependency tambahan.
 */
declare module "node:fs" {
    export function readdirSync(
        path: string,
        options?: { withFileTypes?: boolean },
    ): Array<{ name: string; isDirectory(): boolean }>
    export function existsSync(path: string): boolean
}

declare module "node:path" {
    export function join(...parts: string[]): string
}

declare module "node:readline/promises" {
    export interface ReadLine {
        question(query: string): Promise<string>
        close(): void
        [Symbol.asyncIterator](): AsyncIterator<string>
    }
    export function createInterface(options: {
        input: NodeJS.ReadableStream
        output: NodeJS.WritableStream
    }): ReadLine
}

declare const process: {
    cwd(): string
    stdin: NodeJS.ReadableStream
    stdout: NodeJS.WritableStream
    exitCode?: number
}

declare namespace NodeJS {
    interface ReadableStream {}
    interface WritableStream {}
}
