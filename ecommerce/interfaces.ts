// ─── Inverted Index ───────────────────────────────────────────────────────────

/** Representasi dokumen teks yang dapat diindeks oleh mesin pencari. */
export interface Document {
    /** Pengenal unik dokumen. */
    id: string
    /** Isi teks dokumen yang akan diindeks. */
    content: string
}

/** Hasil pencarian berisi pengenal dokumen dan skor relevansinya. */
export interface SearchResult {
    /** ID dokumen yang cocok dengan query. */
    documentId: string
    /** Skor relevansi dokumen terhadap query. */
    score: number
}

/** Kontrak untuk struktur data Inverted Index. */
export interface IInvertedIndex {
    /**
     * Menambahkan dan mengindeks sebuah dokumen ke dalam posting list.
     *
     * @param doc - Dokumen yang akan ditambahkan.
     */
    addDocument(doc: Document): void

    /**
     * Mencari dokumen yang cocok dengan kata kunci pada query.
     *
     * @param query - String pencarian.
     * @returns Daftar hasil pencarian terurut berdasarkan skor tertinggi.
     */
    search(query: string): SearchResult[]
}

// ─── TF-IDF ───────────────────────────────────────────────────────────────────

/** Kontrak untuk mesin pencari berbasis pembobotan TF-IDF. */
export interface ITfIdf {
    /**
     * Menambahkan dokumen ke korpus serta memperbarui statistik TF dan DF.
     *
     * @param doc - Dokumen yang akan diindeks.
     */
    addDocument(doc: Document): void

    /**
     * Menghitung total skor TF-IDF suatu dokumen terhadap query tertentu.
     *
     * @param documentId - ID dokumen target.
     * @param query - String pencarian.
     * @returns Total skor relevansi TF-IDF dokumen.
     */
    score(documentId: string, query: string): number

    /**
     * Mencari hingga `topK` dokumen paling relevan terhadap query.
     *
     * @param query - String pencarian.
     * @param topK - Jumlah maksimum hasil yang dikembalikan.
     * @returns Daftar hasil pencarian terurut dari skor tertinggi.
     */
    search(query: string, topK?: number): SearchResult[]
}

// ─── Levenshtein ──────────────────────────────────────────────────────────────

/** Kontrak untuk penghitungan jarak edit Levenshtein dan saran ejaan. */
export interface ILevenshtein {
    /**
     * Menghitung jumlah minimum operasi edit (insert, delete, replace) antara dua kata.
     *
     * @param wordA - Kata pertama.
     * @param wordB - Kata kedua.
     * @returns Jarak edit Levenshtein antara kedua kata.
     */
    distance(wordA: string, wordB: string): number

    /**
     * Menemukan satu kandidat dengan jarak edit terkecil terhadap query.
     *
     * @param query - Kata masukan pengguna.
     * @param candidates - Daftar kandidat kata yang dibandingkan.
     * @returns Kandidat paling mirip, atau `null` jika daftar kandidat kosong.
     */
    closestMatch(query: string, candidates: string[]): string | null

    /**
     * Mengembalikan daftar kandidat dalam batas jarak edit maksimum tertentu.
     *
     * @param query - Kata masukan pengguna.
     * @param candidates - Daftar kandidat kata.
     * @param maxDistance - Batas maksimum jarak edit yang ditoleransi.
     * @returns Daftar saran kata terurut dari yang paling mirip.
     */
    suggestions(query: string, candidates: string[], maxDistance?: number): string[]
}

// ─── Cosine Similarity ────────────────────────────────────────────────────────

/** Kontrak untuk pengukuran kemiripan sudut antar vektor (Cosine Similarity). */
export interface ICosineSimilarity {
    /**
     * Menghitung nilai cosine similarity antara dua vektor berdimensi sama.
     *
     * @param vectorA - Vektor pertama.
     * @param vectorB - Vektor kedua.
     * @returns Nilai kemiripan dalam rentang `[-1, 1]`.
     */
    similarity(vectorA: number[], vectorB: number[]): number

    /**
     * Mencari indeks vektor kandidat yang paling mirip dengan vektor target.
     *
     * @param target - Vektor acuan.
     * @param candidates - Daftar vektor kandidat.
     * @returns Indeks kandidat dengan cosine similarity tertinggi.
     */
    mostSimilar(target: number[], candidates: number[][]): number
}

// ─── Collaborative Filtering ──────────────────────────────────────────────────

/** Matriks interaksi user-item yang memetakan `userId` ke peta `itemId -> rating`. */
export interface UserItemMatrix {
    /** Peta rating item milik setiap pengguna. */
    [userId: string]: { [itemId: string]: number }
}

/** Item rekomendasi beserta skor rating hasil prediksi. */
export interface Recommendation {
    /** ID item yang direkomendasikan. */
    itemId: string
    /** Prediksi skor preferensi pengguna terhadap item. */
    predictedScore: number
}

/** Kontrak untuk sistem rekomendasi berbasis User-Based Collaborative Filtering. */
export interface ICollaborativeFiltering {
    /**
     * Menghasilkan daftar rekomendasi item bagi pengguna target berdasarkan matriks rating.
     *
     * @param matrix - Matriks rating user-item.
     * @param targetUserId - ID pengguna yang akan diberi rekomendasi.
     * @param topK - Jumlah maksimum item rekomendasi yang dikembalikan.
     * @returns Daftar rekomendasi terurut dari skor prediksi tertinggi.
     */
    recommend(matrix: UserItemMatrix, targetUserId: string, topK?: number): Recommendation[]
}

// ─── Bloom Filter ─────────────────────────────────────────────────────────────

/** Kontrak untuk struktur data probabilistik Bloom Filter. */
export interface IBloomFilter {
    /**
     * Menambahkan elemen ke dalam Bloom Filter.
     *
     * @param item - Nilai string yang akan didaftarkan.
     */
    add(item: string): void

    /**
     * Memeriksa apakah elemen kemungkinan ada di dalam Bloom Filter.
     *
     * @param item - Nilai string yang diperiksa.
     * @returns `false` jika pasti tidak ada; `true` jika kemungkinan ada.
     */
    mightContain(item: string): boolean

    /**
     * Menghitung estimasi probabilitas false positive saat ini.
     *
     * @returns Nilai probabilitas false positive dalam rentang `[0, 1]`.
     */
    getFalsePositiveRate(): number
}

// ─── Bin Packing ──────────────────────────────────────────────────────────────

/** Representasi item yang akan dikemas ke dalam bin/kotak. */
export interface Item {
    /** Pengenal unik item. */
    id: string
    /** Ukuran atau kapasitas yang dibutuhkan item. */
    size: number
}

/** Representasi satu bin/kotak beserta daftar item dan sisa ruangnya. */
export interface Bin {
    /** Daftar item yang ditempatkan di dalam bin ini. */
    items: Item[]
    /** Total ruang yang sudah terpakai. */
    usedSpace: number
    /** Sisa kapasitas yang masih tersedia di dalam bin. */
    remainingSpace: number
}

/** Kontrak untuk algoritma pengemasan Bin Packing. */
export interface IBinPacking {
    /**
     * Mengemas daftar item ke dalam jumlah bin seminimal mungkin sesuai kapasitas bin.
     *
     * @param items - Daftar item yang akan dikemas.
     * @param binCapacity - Kapasitas maksimum tiap bin.
     * @returns Daftar bin hasil pengemasan.
     */
    pack(items: Item[], binCapacity: number): Bin[]
}
