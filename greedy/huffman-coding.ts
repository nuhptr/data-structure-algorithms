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
    /**
     * Membangun tabel kode biner optimal untuk setiap karakter unik pada teks.
     *
     * @param text - Teks sumber yang akan dianalisis frekuensinya.
     * @returns Peta karakter ke string kode bit Huffman.
     */
    buildCodes(text: string): Map<string, string> {
        const freqMap = this.buildFrequencyMap(text)
        if (freqMap.size === 0) return new Map()

        const root = this.buildHuffmanTree(freqMap)
        const codes = new Map<string, string>()
        this.generateCodes(root, "", codes)
        return codes
    }

    /**
     * Mengodekan teks menjadi string bit Huffman beserta tabel kode yang dihasilkan.
     *
     * @param text - Teks yang akan dikompresi.
     * @returns Objek berisi string bit `encoded` dan peta `codes`.
     */
    encode(text: string): { encoded: string; codes: Map<string, string> } {
        const codes = this.buildCodes(text)
        // Ganti setiap karakter dengan kode biner Huffman-nya
        const encoded = [...text].map((char) => codes.get(char)!).join("")
        return { encoded, codes }
    }

    /**
     * Mendekode urutan bit Huffman kembali ke teks semula menggunakan tabel kode.
     *
     * @param encoded - String bit hasil encoding.
     * @param codes - Peta karakter ke kode bit yang digunakan saat encoding.
     * @returns Teks asli hasil dekode.
     */
    decode(encoded: string, codes: Map<string, string>): string {
        // Balik mapping: bit string → karakter agar prefix unik dapat dicocokkan langsung
        const reverseCodes = new Map<string, string>()
        for (const [char, code] of codes) {
            reverseCodes.set(code, char)
        }

        let decoded = ""
        let currentBits = ""

        for (const bit of encoded) {
            currentBits += bit
            // Karena kode Huffman bebas-prefix, kecocokan pertama selalu valid dan unik
            if (reverseCodes.has(currentBits)) {
                decoded += reverseCodes.get(currentBits)!
                currentBits = ""
            }
        }

        return decoded
    }

    /**
     * Menghitung frekuensi kemunculan setiap karakter dalam teks.
     *
     * @param text - Teks masukan.
     * @returns Peta karakter ke jumlah kemunculannya.
     */
    private buildFrequencyMap(text: string): Map<string, number> {
        const freqMap = new Map<string, number>()
        for (const char of text) {
            freqMap.set(char, (freqMap.get(char) ?? 0) + 1)
        }
        return freqMap
    }

    /**
     * Membangun Huffman Tree secara bottom-up dengan selalu menggabungkan dua node
     * berfrekuensi terkecil.
     *
     * @param freqMap - Peta frekuensi karakter.
     * @returns Node akar (root) dari Huffman Tree.
     */
    private buildHuffmanTree(freqMap: Map<string, number>): HuffmanNode {
        // Min-heap sederhana menggunakan array yang diurutkan pada setiap iterasi
        const nodes: HuffmanNode[] = [...freqMap.entries()].map(([char, freq]) => ({
            char,
            freq,
            left: null,
            right: null,
        }))

        while (nodes.length > 1) {
            nodes.sort((a, b) => a.freq - b.freq)

            // Ambil dua node dengan frekuensi paling kecil untuk digabungkan
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

    /**
     * Menelusuri Huffman Tree secara rekursif untuk menghasilkan kode bit setiap karakter daun.
     *
     * @param node - Node yang sedang dikunjungi.
     * @param currentCode - Prefix bit yang terkumpul dari root hingga node saat ini.
     * @param codes - Peta penampung hasil kode bit untuk setiap karakter.
     */
    private generateCodes(
        node: HuffmanNode | null,
        currentCode: string,
        codes: Map<string, string>,
    ): void {
        if (node === null) return

        if (node.char !== null) {
            // Karakter tunggal: gunakan kode "0" jika teks hanya terdiri dari satu karakter unik
            codes.set(node.char, currentCode || "0")
            return
        }

        // Cabang kiri menambahkan bit "0", cabang kanan menambahkan bit "1"
        this.generateCodes(node.left, currentCode + "0", codes)
        this.generateCodes(node.right, currentCode + "1", codes)
    }
}
