import { IQuadraticTimeExample } from "./interfaces"

/**
 * Quadratic Time O(n²) — menemukan semua pasangan unik dalam array.
 *
 * Perulangan bersarang membandingkan setiap elemen dengan semua
 * elemen setelahnya, menghasilkan n(n-1)/2 pasangan. Karena suku
 * O(n²) bertumbuh jauh lebih cepat, ia menjadi suku dominan.
 *
 * Kompleksitas Waktu : O(n²)
 * Kompleksitas Ruang : O(n²) — untuk menampung semua pasangan
 *
 * @example
 * const example = new QuadraticTimeExample();
 * example.findPairs([1, 2, 3]); // => [[1, 2], [1, 3], [2, 3]]
 */
export class QuadraticTimeExample implements IQuadraticTimeExample {
    findPairs(array: number[]): Array<[number, number]> {
        const pairs: Array<[number, number]> = []

        for (let i = 0; i < array.length; i++) {
            for (let j = i + 1; j < array.length; j++) {
                pairs.push([array[i], array[j]])
            }
        }

        return pairs
    }
}
