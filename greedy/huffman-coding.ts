import { HuffmanNode, IHuffmanCoding } from "./interfaces"

/**
 * Huffman Coding — algoritma kompresi lossless yang memberikan kode
 * bit lebih pendek untuk karakter yang lebih sering muncul.
 * Digunakan dalam JPEG, MP3, ZIP, dan berbagai format kompresi.
 *
 * Kompleksitas build  : O(n log n) — n = jumlah karakter unik
 * Kompleksitas encode : O(L) — L = panjang teks
 * Kompleksitas Ruang  : O(n)
 *
 * @example
 * const huffman = new HuffmanCoding();
 * const result = huffman.encode("abracadabra");
 * // codes: { a: "0", b: "111", r: "110", c: "101", d: "100" }
 * huffman.decode(result.encoded, result.codes); // => "abracadabra"
 */
export class HuffmanCoding implements IHuffmanCoding {
    buildCodes(text: string): Map<string, string> {
        const freqMap = this.buildFrequencyMap(text)
        if (freqMap.size === 0) return new Map()

        const root = this.buildHuffmanTree(freqMap)
        const codes = new Map<string, string>()
        this.generateCodes(root, "", codes)
        return codes
    }

    encode(text: string): { encoded: string; codes: Map<string, string> } {
        const codes = this.buildCodes(text)
        const encoded = [...text].map((char) => codes.get(char)!).join("")
        return { encoded, codes }
    }

    decode(encoded: string, codes: Map<string, string>): string {
        // Balik mapping: bit string → karakter
        const reverseCodes = new Map<string, string>()
        for (const [char, code] of codes) {
            reverseCodes.set(code, char)
        }

        let decoded = ""
        let currentBits = ""

        for (const bit of encoded) {
            currentBits += bit
            if (reverseCodes.has(currentBits)) {
                decoded += reverseCodes.get(currentBits)!
                currentBits = ""
            }
        }

        return decoded
    }

    private buildFrequencyMap(text: string): Map<string, number> {
        const freqMap = new Map<string, number>()
        for (const char of text) {
            freqMap.set(char, (freqMap.get(char) ?? 0) + 1)
        }
        return freqMap
    }

    private buildHuffmanTree(freqMap: Map<string, number>): HuffmanNode {
        // Min-heap sederhana menggunakan array yang diurutkan
        const nodes: HuffmanNode[] = [...freqMap.entries()].map(([char, freq]) => ({
            char,
            freq,
            left: null,
            right: null,
        }))

        while (nodes.length > 1) {
            nodes.sort((a, b) => a.freq - b.freq)

            const left = nodes.shift()!
            const right = nodes.shift()!

            nodes.push({
                char: null,
                freq: left.freq + right.freq,
                left,
                right,
            })
        }

        return nodes[0]
    }

    private generateCodes(
        node: HuffmanNode | null,
        currentCode: string,
        codes: Map<string, string>,
    ): void {
        if (node === null) return

        if (node.char !== null) {
            // Karakter tunggal: kode "0" jika hanya ada satu karakter unik
            codes.set(node.char, currentCode || "0")
            return
        }

        this.generateCodes(node.left, currentCode + "0", codes)
        this.generateCodes(node.right, currentCode + "1", codes)
    }
}
