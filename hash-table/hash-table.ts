import { IHashTable } from "./interfaces"

/** Pasangan tuple `[kunci, nilai]` yang disimpan di setiap slot hash table. */
type HashEntry<T> = [string, T]

/**
 * Hash Table — menyimpan pasangan kunci-nilai pada array slot tetap
 * dengan resolusi tabrakan linear probing.
 *
 * Fungsi hash mengalikan akumulator dengan 31 lalu menambahkan kode
 * karakter dikurangi 96, diambil modulo ukuran array sehingga hasilnya
 * selalu indeks slot yang valid.
 *
 * Kompleksitas Waktu : O(1) rata-rata | O(n) worst case saat tabel penuh
 * Kompleksitas Ruang : O(n)
 *
 * @template T Tipe nilai yang disimpan pada setiap entri.
 *
 * @example
 * const table = new HashTable<string>()
 * table.set("john", "555-333-444").set("jordan", "222-444-666")
 * table.get("jordan") // => "222-444-666"
 * table.getAllKeys()  // => ["john", "jordan"]
 */
export class HashTable<T> implements IHashTable<T> {
    /** Setiap slot berisi satu pasangan `[kunci, nilai]`, atau `undefined` jika kosong. */
    private readonly keymap: Array<HashEntry<T> | undefined>

    /**
     * Membuat hash table dengan jumlah slot tetap.
     *
     * @param size Jumlah slot array yang dialokasikan (default `6`).
     * @throws {RangeError} Jika `size` bukan bilangan bulat positif.
     */
    constructor(size = 6) {
        // Pastikan kapasitas tabel merupakan bilangan bulat positif.
        if (!Number.isInteger(size) || size < 1) {
            throw new RangeError("Ukuran harus berupa bilangan bulat positif")
        }

        this.keymap = new Array(size)
    }

    /**
     * Mengubah kunci string menjadi indeks awal slot.
     * Perkalian dengan bilangan prima 31 membuat urutan karakter berpengaruh pada hasil hash.
     *
     * @param key Kunci string yang akan di-hash.
     * @returns Indeks slot dalam rentang `0` hingga `keymap.length - 1`.
     */
    private hash(key: string): number {
        let sum = 0

        // Batasi pemrosesan hingga 100 karakter pertama agar waktu komputasi tetap konstan.
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            sum = (sum * 31 + key.charCodeAt(i) - 96) % this.keymap.length
        }

        return sum
    }

    /**
     * Menyimpan pasangan kunci dan nilai. Jika kunci sudah ada, nilainya
     * diperbarui. Jika slot hasil hash terisi, pencarian slot kosong
     * dilanjutkan secara berurutan (linear probing).
     *
     * @param key Kunci unik bertipe string.
     * @param value Nilai yang akan disimpan.
     * @returns Instans `HashTable` saat ini untuk mendukung method chaining.
     * @throws {Error} Jika seluruh slot pada tabel sudah terisi penuh.
     */
    set(key: string, value: T): this {
        const start = this.hash(key)

        // Telusuri slot secara melingkar hingga menemukan slot kosong atau kunci yang sama.
        for (let i = 0; i < this.keymap.length; i++) {
            const index = (start + i) % this.keymap.length
            const entry = this.keymap[index]

            if (!entry || entry[0] === key) {
                this.keymap[index] = [key, value]
                return this
            }
        }

        throw new Error("Hash table is full")
    }

    /**
     * Mengambil nilai berdasarkan kunci menggunakan linear probing.
     *
     * @param key Kunci yang nilainya ingin dicari.
     * @returns Nilai yang terkait dengan kunci, atau `undefined` jika tidak ditemukan.
     */
    get(key: string): T | undefined {
        const start = this.hash(key)

        // Lakukan probing berurutan; berhenti segera jika menemukan slot kosong.
        for (let i = 0; i < this.keymap.length; i++) {
            const entry = this.keymap[(start + i) % this.keymap.length]

            if (!entry) return undefined
            if (entry[0] === key) return entry[1]
        }

        return undefined
    }

    /**
     * Mengembalikan semua kunci sesuai urutan slot di dalam array.
     *
     * @returns Array berisi seluruh kunci yang tersimpan.
     */
    getAllKeys(): string[] {
        return this.keymap.flatMap((entry) => (entry ? [entry[0]] : []))
    }

    /**
     * Mengembalikan semua nilai sesuai urutan slot di dalam array.
     *
     * @returns Array berisi seluruh nilai yang tersimpan.
     */
    getAllValues(): T[] {
        return this.keymap.flatMap((entry) => (entry ? [entry[1]] : []))
    }
}
