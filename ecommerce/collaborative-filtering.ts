import { UserItemMatrix, Recommendation, ICollaborativeFiltering } from "./interfaces"

/**
 * Collaborative Filtering (User-Based) — merekomendasikan item berdasarkan
 * preferensi user lain yang mirip. Prinsip: "user yang membeli item serupa
 * dengan kamu, juga membeli item X."
 *
 * Langkah:
 *  1. Hitung Cosine Similarity antara target user dan semua user lain
 *  2. Ambil K user paling mirip (neighbors)
 *  3. Prediksi skor item yang belum dibeli target user
 *     berdasarkan weighted average dari rating neighbors
 *
 * Digunakan e-commerce untuk: "Rekomendasi untuk Kamu", "User lain juga beli"
 *
 * Kompleksitas : O(U × I) — U = jumlah user, I = jumlah item
 *
 * @example
 * const cf = new CollaborativeFiltering();
 * const matrix = {
 *   "user1": { "itemA": 5, "itemB": 3, "itemC": 4 },
 *   "user2": { "itemA": 4, "itemB": 2, "itemD": 5 },
 *   "user3": { "itemB": 5, "itemC": 3, "itemD": 4 },
 * };
 * cf.recommend(matrix, "user1", 2);
 * // => [{ itemId: "itemD", predictedScore: 4.x }]
 */
export class CollaborativeFiltering implements ICollaborativeFiltering {
    private readonly DEFAULT_NEIGHBORS = 3

    recommend(matrix: UserItemMatrix, targetUserId: string, topK: number = 5): Recommendation[] {
        const targetRatings = matrix[targetUserId]
        if (!targetRatings) return []

        const allUserIds = Object.keys(matrix).filter((id) => id !== targetUserId)
        const allItemIds = this.getAllItemIds(matrix)

        // Langkah 1: Hitung similarity ke semua user lain
        const userSimilarities = allUserIds.map((userId) => ({
            userId,
            similarity: this.cosineSimilarity(targetRatings, matrix[userId], allItemIds),
        }))

        // Langkah 2: Ambil K neighbors paling mirip
        const neighbors = userSimilarities
            .filter(({ similarity }) => similarity > 0)
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, this.DEFAULT_NEIGHBORS)

        if (neighbors.length === 0) return []

        // Langkah 3: Prediksi skor untuk item yang belum dibeli target user
        const unseenItemIds = allItemIds.filter((itemId) => !(itemId in targetRatings))
        const predictions: Recommendation[] = []

        for (const itemId of unseenItemIds) {
            let weightedScoreSum = 0
            let similaritySum = 0

            for (const { userId, similarity } of neighbors) {
                const neighborRating = matrix[userId][itemId]
                if (neighborRating !== undefined) {
                    weightedScoreSum += similarity * neighborRating
                    similaritySum += similarity
                }
            }

            if (similaritySum > 0) {
                predictions.push({
                    itemId,
                    predictedScore: weightedScoreSum / similaritySum,
                })
            }
        }

        return predictions.sort((a, b) => b.predictedScore - a.predictedScore).slice(0, topK)
    }

    private cosineSimilarity(
        ratingsA: Record<string, number>,
        ratingsB: Record<string, number>,
        allItemIds: string[],
    ): number {
        let dotProduct = 0
        let magnitudeA = 0
        let magnitudeB = 0

        for (const itemId of allItemIds) {
            const ratingA = ratingsA[itemId] ?? 0
            const ratingB = ratingsB[itemId] ?? 0
            dotProduct += ratingA * ratingB
            magnitudeA += ratingA ** 2
            magnitudeB += ratingB ** 2
        }

        const denominator = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB)
        return denominator === 0 ? 0 : dotProduct / denominator
    }

    private getAllItemIds(matrix: UserItemMatrix): string[] {
        const allItems = new Set<string>()
        for (const userRatings of Object.values(matrix)) {
            for (const itemId of Object.keys(userRatings)) {
                allItems.add(itemId)
            }
        }
        return [...allItems]
    }
}
