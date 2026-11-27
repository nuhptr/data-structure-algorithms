import { Document, SearchResult, IInvertedIndex } from "./interfaces"

/**
 * Inverted Index — pondasi dari setiap search engine.
 * Memetakan setiap kata ke daftar dokumen yang mengandung kata tersebut,
 * sehingga pencarian bisa dilakukan dalam O(1) per kata alih-alih O(n×m).
 *
 * Digunakan e-commerce untuk: pencarian produk, autocomplete, filter keyword.
 *
 * Kompleksitas build  : O(n × L) — n dokumen, L rata-rata panjang dokumen
 * Kompleksitas search : O(k × D) — k kata query, D rata-rata dokumen per kata
 * Kompleksitas Ruang  : O(n × L)
 *
 * @example
 * const index = new InvertedIndex();
 * index.addDocument({ id: "P1", content: "sepatu lari nike merah" });
 * index.addDocument({ id: "P2", content: "sepatu casual putih" });
 * index.search("sepatu merah");
 * // => [{ documentId: "P1", score: 2 }, { documentId: "P2", score: 1 }]
 */
export class InvertedIndex implements IInvertedIndex {
    /** Posting list: memetakan setiap token ke himpunan ID dokumen yang mengandungnya. */
    private postingList: Map<string, Set<string>> = new Map()
    /** Penyimpanan dokumen asli berdasarkan ID dokumen. */
    private documentStore: Map<string, Document> = new Map()

    /**
     * Menambahkan dokumen ke penyimpanan dan memperbarui posting list untuk setiap tokennya.
     *
     * @param doc - Dokumen yang akan diindeks.
     */
    addDocument(doc: Document): void {
        this.documentStore.set(doc.id, doc)
        const tokens = this.tokenize(doc.content)

        // Daftarkan ID dokumen pada posting list untuk setiap token hasil tokenisasi
        for (const token of tokens) {
            if (!this.postingList.has(token)) {
                this.postingList.set(token, new Set())
            }
            this.postingList.get(token)!.add(doc.id)
        }
    }

    /**
     * Mencari dokumen yang mengandung kata kunci pada query dan memberi skor
     * berdasarkan jumlah token query yang cocok.
     *
     * @param query - String kata kunci pencarian.
     * @returns Daftar hasil pencarian terurut menurun berdasarkan jumlah kecocokan token.
     */
    search(query: string): SearchResult[] {
        const queryTokens = this.tokenize(query)
        const scoreMap = new Map<string, number>()

        // Akumulasi skor setiap dokumen yang muncul di posting list token query
        for (const token of queryTokens) {
            const matchingDocIds = this.postingList.get(token)
            if (!matchingDocIds) continue

            for (const docId of matchingDocIds) {
                scoreMap.set(docId, (scoreMap.get(docId) ?? 0) + 1)
            }
        }

        return [...scoreMap.entries()]
            .map(([documentId, score]) => ({ documentId, score }))
            .sort((a, b) => b.score - a.score)
    }

    /**
     * Menormalisasi teks menjadi huruf kecil, menghapus tanda baca, lalu memecahnya menjadi token.
     *
     * @param text - Teks mentah yang akan ditokenisasi.
     * @returns Array token alfanumerik non-kosong.
     */
    private tokenize(text: string): string[] {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .split(/\s+/)
            .filter((token) => token.length > 0)
    }
}
