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
    /** Penyimpanan bit terkompresi dalam bentuk array byte. */
    private bitArray: Uint8Array
    /** Total jumlah bit (`m`) yang dialokasikan pada filter. */
    private bitArraySize: number
    /** Jumlah fungsi hash independen (`k`) yang digunakan per elemen. */
    private hashFunctionCount: number
    /** Jumlah item yang telah dimasukkan (`n`) untuk menghitung estimasi FPR. */
    private insertedCount: number = 0

    /**
     * Membuat instance Bloom Filter dengan ukuran bit array dan jumlah fungsi hash optimal.
     *
     * @param expectedItems - Perkiraan jumlah item yang akan dimasukkan.
     * @param falsePositiveRate - Target false positive rate (misalnya `0.01` untuk 1%).
     */
    constructor(expectedItems: number = 1000, falsePositiveRate: number = 0.01) {
        this.bitArraySize = this.calculateOptimalSize(expectedItems, falsePositiveRate)
        this.hashFunctionCount = this.calculateOptimalHashCount(this.bitArraySize, expectedItems)
        this.bitArray = new Uint8Array(Math.ceil(this.bitArraySize / 8))
    }

    /**
     * Menambahkan item ke dalam Bloom Filter dengan menyalakan `k` posisi bit hasil hashing.
     *
     * @param item - String item yang akan dimasukkan.
     */
    add(item: string): void {
        for (let seed = 0; seed < this.hashFunctionCount; seed++) {
            const bitPosition = this.hash(item, seed) % this.bitArraySize
            this.setBit(bitPosition)
        }
        this.insertedCount++
    }

    /**
     * Memeriksa apakah item kemungkinan merupakan anggota Bloom Filter.
     *
     * @param item - String item yang diperiksa.
     * @returns `false` jika pasti belum pernah dimasukkan, `true` jika kemungkinan ada.
     */
    mightContain(item: string): boolean {
        for (let seed = 0; seed < this.hashFunctionCount; seed++) {
            const bitPosition = this.hash(item, seed) % this.bitArraySize
            // Satu bit bernilai 0 saja sudah menjamin item pasti tidak ada
            if (!this.getBit(bitPosition)) return false
        }
        return true
    }

    /**
     * Estimasi false positive rate berdasarkan jumlah item yang sudah dimasukkan.
     * Rumus: `FPR = (1 - e^(-k×n/m))^k`.
     *
     * @returns Nilai estimasi false positive rate dalam rentang `[0, 1]`.
     */
    getFalsePositiveRate(): number {
        const exponent = -(this.hashFunctionCount * this.insertedCount) / this.bitArraySize
        return Math.pow(1 - Math.exp(exponent), this.hashFunctionCount)
    }

    // ─── Private helpers ──────────────────────────────────────────────────────

    /**
     * Fungsi hash non-kriptografis (variasi djb2 dengan seed berbeda per slot).
     * Seed yang berbeda menghasilkan distribusi indeks bit yang berbeda.
     *
     * @param item - String yang di-hash.
     * @param seed - Nilai seed untuk mensimulasikan fungsi hash ke-`seed`.
     * @returns Nilai hash integer 32-bit tak bertanda.
     */
    private hash(item: string, seed: number): number {
        let hashValue = 5381 + seed * 31

        for (let charIndex = 0; charIndex < item.length; charIndex++) {
            hashValue = ((hashValue << 5) + hashValue) ^ item.charCodeAt(charIndex)
            hashValue = hashValue >>> 0 // konversi ke unsigned 32-bit
        }

        return hashValue
    }

    /**
     * Menyalakan bit pada posisi indeks tertentu di dalam `bitArray`.
     *
     * @param position - Indeks bit target.
     */
    private setBit(position: number): void {
        const byteIndex = Math.floor(position / 8)
        const bitIndex = position % 8
        this.bitArray[byteIndex] |= 1 << bitIndex
    }

    /**
     * Membaca status bit pada posisi indeks tertentu di dalam `bitArray`.
     *
     * @param position - Indeks bit yang diperiksa.
     * @returns `true` jika bit bernilai 1, `false` jika 0.
     */
    private getBit(position: number): boolean {
        const byteIndex = Math.floor(position / 8)
        const bitIndex = position % 8
        return (this.bitArray[byteIndex] & (1 << bitIndex)) !== 0
    }

    /**
     * Menghitung ukuran bit array optimal: `m = -(n × ln(p)) / (ln(2))²`.
     *
     * @param expectedItems - Perkiraan jumlah item (`n`).
     * @param falsePositiveRate - Target false positive rate (`p`).
     * @returns Jumlah bit optimal (`m`).
     */
    private calculateOptimalSize(expectedItems: number, falsePositiveRate: number): number {
        return Math.ceil(-(expectedItems * Math.log(falsePositiveRate)) / Math.log(2) ** 2)
    }

    /**
     * Menghitung jumlah fungsi hash optimal: `k = (m/n) × ln(2)`.
     *
     * @param bitArraySize - Ukuran bit array (`m`).
     * @param expectedItems - Perkiraan jumlah item (`n`).
     * @returns Jumlah fungsi hash optimal minimal 1 (`k`).
     */
    private calculateOptimalHashCount(bitArraySize: number, expectedItems: number): number {
        return Math.max(1, Math.round((bitArraySize / expectedItems) * Math.log(2)))
    }
}
