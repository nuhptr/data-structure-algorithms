// ─── Inverted Index ───────────────────────────────────────────────────────────

export interface Document {
    id: string
    content: string
}

export interface SearchResult {
    documentId: string
    score: number
}

export interface IInvertedIndex {
    addDocument(doc: Document): void
    search(query: string): SearchResult[]
}

// ─── TF-IDF ───────────────────────────────────────────────────────────────────

export interface ITfIdf {
    addDocument(doc: Document): void
    score(documentId: string, query: string): number
    search(query: string, topK?: number): SearchResult[]
}

// ─── Levenshtein ──────────────────────────────────────────────────────────────

export interface ILevenshtein {
    distance(wordA: string, wordB: string): number
    closestMatch(query: string, candidates: string[]): string | null
    suggestions(query: string, candidates: string[], maxDistance?: number): string[]
}

// ─── Cosine Similarity ────────────────────────────────────────────────────────

export interface ICosineSimilarity {
    similarity(vectorA: number[], vectorB: number[]): number
    mostSimilar(target: number[], candidates: number[][]): number
}

// ─── Collaborative Filtering ──────────────────────────────────────────────────

export interface UserItemMatrix {
    [userId: string]: { [itemId: string]: number }
}

export interface Recommendation {
    itemId: string
    predictedScore: number
}

export interface ICollaborativeFiltering {
    recommend(matrix: UserItemMatrix, targetUserId: string, topK?: number): Recommendation[]
}

// ─── Bloom Filter ─────────────────────────────────────────────────────────────

export interface IBloomFilter {
    add(item: string): void
    mightContain(item: string): boolean
    getFalsePositiveRate(): number
}

// ─── Bin Packing ──────────────────────────────────────────────────────────────

export interface Item {
    id: string
    size: number
}

export interface Bin {
    items: Item[]
    usedSpace: number
    remainingSpace: number
}

export interface IBinPacking {
    pack(items: Item[], binCapacity: number): Bin[]
}
