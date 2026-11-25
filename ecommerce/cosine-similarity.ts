import { ICosineSimilarity } from "./interfaces";

/**
 * Cosine Similarity — mengukur sudut antara dua vektor dalam ruang
 * multi-dimensi. Nilai 1 = identik, 0 = tidak berkaitan, -1 = berlawanan.
 *
 * Digunakan e-commerce untuk:
 * - "Produk serupa" — bandingkan vektor fitur produk (harga, kategori, rating)
 * - Rekomendasi berbasis konten — bandingkan vektor TF-IDF deskripsi produk
 * - User similarity — bandingkan vektor rating user
 *
 * similarity = (A · B) / (|A| × |B|)
 *
 * Kompleksitas : O(d) — d = dimensi vektor
 *
 * @example
 * const cs = new CosineSimilarity();
 * cs.similarity([1, 2, 3], [1, 2, 3]); // => 1.0 (identik)
 * cs.similarity([1, 0, 0], [0, 1, 0]); // => 0.0 (tegak lurus)
 * cs.mostSimilar([1, 2, 3], [[1,2,2],[4,5,6],[0,0,1]]); // => 0 (index kandidat terdekat)
 */
export class CosineSimilarity implements ICosineSimilarity {
  similarity(vectorA: number[], vectorB: number[]): number {
    if (vectorA.length !== vectorB.length) {
      throw new Error("Kedua vektor harus memiliki dimensi yang sama");
    }

    const dotProduct = this.dotProduct(vectorA, vectorB);
    const magnitudeA = this.magnitude(vectorA);
    const magnitudeB = this.magnitude(vectorB);

    if (magnitudeA === 0 || magnitudeB === 0) return 0;

    return dotProduct / (magnitudeA * magnitudeB);
  }

  /**
   * Mencari index kandidat yang paling mirip dengan target.
   * @returns Index dari kandidat dengan cosine similarity tertinggi
   */
  mostSimilar(target: number[], candidates: number[][]): number {
    let highestSimilarity = -Infinity;
    let bestIndex = 0;

    for (let index = 0; index < candidates.length; index++) {
      const currentSimilarity = this.similarity(target, candidates[index]);
      if (currentSimilarity > highestSimilarity) {
        highestSimilarity = currentSimilarity;
        bestIndex = index;
      }
    }

    return bestIndex;
  }

  /**
   * Mengembalikan semua kandidat diurutkan dari paling mirip.
   */
  rankBySimilarity(
    target: number[],
    candidates: number[][]
  ): { index: number; score: number }[] {
    return candidates
      .map((candidate, index) => ({
        index,
        score: this.similarity(target, candidate),
      }))
      .sort((a, b) => b.score - a.score);
  }

  private dotProduct(vectorA: number[], vectorB: number[]): number {
    return vectorA.reduce((sum, value, index) => sum + value * vectorB[index], 0);
  }

  private magnitude(vector: number[]): number {
    return Math.sqrt(vector.reduce((sum, value) => sum + value ** 2, 0));
  }
}
