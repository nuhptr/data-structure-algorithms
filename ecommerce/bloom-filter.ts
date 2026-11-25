import { IBloomFilter } from "./interfaces"

/**
 * Bloom Filter — struktur data probabilistik untuk mengecek keanggotaan
 * dengan sangat cepat dan hemat memori. Mungkin menghasilkan false positive
 * (bilang "ada" padahal tidak ada), tapi TIDAK PERNAH false negative
 * (kalau bilang "tidak ada", pasti tidak ada).
 *
 * Digunakan e-commerce untuk:
 * - Fraud detection: cek cepat apakah email/device pernah fraud
 * - Duplikat order: cek apakah order ID sudah diproses
 * - Cache layer: hindari query database untuk data yang jelas tidak ada
 *
 * Kompleksitas add/check : O(k) — k = jumlah hash function
 * Kompleksitas Ruang     : O(m) — m = ukuran bit array (jauh lebih kecil dari Set)
 *
 * @example
 * const bloom = new BloomFilter(1000, 3);
 * bloom.add("fraud@email.com");
 * bloom.mightContain("fraud@email.com"); // => true (pasti ada)
 * bloom.mightContain("clean@email.com"); // => false (pasti tidak ada)
 */
export class BloomFilter implements IBloomFilter {
    private bitArray: Uint8Array
    private bitArraySize: number
    private hashFunctionCount: number
    private insertedCount: number = 0

    /**
     * @param expectedItems    - Perkiraan jumlah item yang akan dimasukkan
     * @param falsePositiveRate - Target false positive rate (0.01 = 1%)
     */
    constructor(expectedItems: number = 1000, falsePositiveRate: number = 0.01) {
        this.bitArraySize = this.calculateOptimalSize(expectedItems, falsePositiveRate)
        this.hashFunctionCount = this.calculateOptimalHashCount(this.bitArraySize, expectedItems)
        this.bitArray = new Uint8Array(Math.ceil(this.bitArraySize / 8))
    }

    add(item: string): void {
        for (let seed = 0; seed < this.hashFunctionCount; seed++) {
            const bitPosition = this.hash(item, seed) % this.bitArraySize
            this.setBit(bitPosition)
        }
        this.insertedCount++
    }

    mightContain(item: string): boolean {
        for (let seed = 0; seed < this.hashFunctionCount; seed++) {
            const bitPosition = this.hash(item, seed) % this.bitArraySize
            if (!this.getBit(bitPosition)) return false
        }
        return true
    }

    /**
     * Estimasi false positive rate berdasarkan jumlah item yang sudah dimasukkan.
     * FPR = (1 - e^(-k×n/m))^k
     */
    getFalsePositiveRate(): number {
        const exponent = -(this.hashFunctionCount * this.insertedCount) / this.bitArraySize
        return Math.pow(1 - Math.exp(exponent), this.hashFunctionCount)
    }

    // ─── Private helpers ──────────────────────────────────────────────────────

    /**
     * Fungsi hash non-kriptografis (djb2 dengan seed berbeda per slot).
     * Seed yang berbeda menghasilkan distribusi bit yang berbeda.
     */
    private hash(item: string, seed: number): number {
        let hashValue = 5381 + seed * 31

        for (let charIndex = 0; charIndex < item.length; charIndex++) {
            hashValue = ((hashValue << 5) + hashValue) ^ item.charCodeAt(charIndex)
            hashValue = hashValue >>> 0 // konversi ke unsigned 32-bit
        }

        return hashValue
    }

    private setBit(position: number): void {
        const byteIndex = Math.floor(position / 8)
        const bitIndex = position % 8
        this.bitArray[byteIndex] |= 1 << bitIndex
    }

    private getBit(position: number): boolean {
        const byteIndex = Math.floor(position / 8)
        const bitIndex = position % 8
        return (this.bitArray[byteIndex] & (1 << bitIndex)) !== 0
    }

    /**
     * Ukuran bit array optimal: m = -(n × ln(p)) / (ln(2))²
     */
    private calculateOptimalSize(expectedItems: number, falsePositiveRate: number): number {
        return Math.ceil(-(expectedItems * Math.log(falsePositiveRate)) / Math.log(2) ** 2)
    }

    /**
     * Jumlah hash function optimal: k = (m/n) × ln(2)
     */
    private calculateOptimalHashCount(bitArraySize: number, expectedItems: number): number {
        return Math.max(1, Math.round((bitArraySize / expectedItems) * Math.log(2)))
    }
}
