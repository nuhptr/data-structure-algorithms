import { Document, SearchResult, ITfIdf } from "./interfaces"

/**
 * TF-IDF (Term Frequency - Inverse Document Frequency) — algoritma
 * untuk mengukur seberapa relevan sebuah kata terhadap dokumen dalam
 * sebuah koleksi.
 *
 * TF(t,d)  = frekuensi kata t di dokumen d / total kata di d
 * IDF(t)   = log(total dokumen / jumlah dokumen yang mengandung t)
 * TF-IDF   = TF × IDF
 *
 * Kata yang sering muncul di SATU dokumen tapi jarang di dokumen lain
 * mendapat skor tinggi. Kata umum ("dan", "atau") mendapat skor rendah.
 *
 * Digunakan e-commerce untuk: ranking hasil search produk.
 *
 * Kompleksitas search : O(k × n) — k kata query, n dokumen
 * Kompleksitas Ruang  : O(n × V) — V = vocabulary size
 *
 * @example
 * const tfidf = new TfIdf();
 * tfidf.addDocument({ id: "P1", content: "sepatu lari nike merah ukuran 42" });
 * tfidf.addDocument({ id: "P2", content: "sepatu casual nike putih" });
 * tfidf.search("nike lari", 2);
 * // => [{ documentId: "P1", score: 0.xxx }, ...]
 */
export class TfIdf implements ITfIdf {
    /** Penyimpanan seluruh dokumen dalam korpus berdasarkan ID dokumen. */
    private documents: Map<string, Document> = new Map()
    /** Term frequency ternormalisasi: `termFrequency[docId][token] = TF(token, docId)`. */
    private termFrequency: Map<string, Map<string, number>> = new Map()
    /** Document frequency: `documentFrequency[token]` = jumlah dokumen yang mengandung token. */
    private documentFrequency: Map<string, number> = new Map()

    /**
     * Menambahkan dokumen ke korpus, menghitung TF setiap token, serta memperbarui DF korpus.
     *
     * @param doc - Dokumen yang akan diindeks.
     */
    addDocument(doc: Document): void {
        this.documents.set(doc.id, doc)
        const tokens = this.tokenize(doc.content)
        const tokenCount = tokens.length
        const tfMap = new Map<string, number>()

        // Hitung kemunculan mentah setiap token di dalam dokumen
        for (const token of tokens) {
            tfMap.set(token, (tfMap.get(token) ?? 0) + 1)
        }

        // Normalisasi TF dengan membagi terhadap total token dokumen
        for (const [token, count] of tfMap) {
            tfMap.set(token, count / tokenCount)
        }

        this.termFrequency.set(doc.id, tfMap)

        // Update document frequency menggunakan himpunan token unik agar dihitung sekali per dokumen
        for (const token of new Set(tokens)) {
            this.documentFrequency.set(token, (this.documentFrequency.get(token) ?? 0) + 1)
        }
    }

    /**
     * Menghitung total skor TF-IDF sebuah dokumen terhadap seluruh token pada query.
     *
     * @param documentId - ID dokumen yang dinilai.
     * @param query - String pencarian.
     * @returns Jumlah nilai `TF × IDF` untuk seluruh token query.
     */
    score(documentId: string, query: string): number {
        const tfMap = this.termFrequency.get(documentId)
        if (!tfMap) return 0

        const totalDocuments = this.documents.size
        const queryTokens = this.tokenize(query)
        let totalScore = 0

        for (const token of queryTokens) {
            const tf = tfMap.get(token) ?? 0
            const docsContainingToken = this.documentFrequency.get(token) ?? 0

            // Lewati token yang tidak pernah muncul di dokumen mana pun
            if (docsContainingToken === 0) continue

            const idf = Math.log(totalDocuments / docsContainingToken)
            totalScore += tf * idf
        }

        return totalScore
    }

    /**
     * Mencari hingga `topK` dokumen dengan skor TF-IDF positif tertinggi terhadap query.
     *
     * @param query - String pencarian.
     * @param topK - Jumlah maksimum hasil yang dikembalikan (default `10`).
     * @returns Daftar hasil pencarian terurut menurun berdasarkan skor TF-IDF.
     */
    search(query: string, topK: number = 10): SearchResult[] {
        const results: SearchResult[] = []

        for (const docId of this.documents.keys()) {
            const docScore = this.score(docId, query)
            if (docScore > 0) {
                results.push({ documentId: docId, score: docScore })
            }
        }

        return results.sort((a, b) => b.score - a.score).slice(0, topK)
    }

    /**
     * Menormalisasi teks menjadi huruf kecil, menghapus karakter non-alfanumerik, lalu memecah token.
     *
     * @param text - Teks mentah.
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
