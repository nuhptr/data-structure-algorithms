import { IHashTable } from "./interfaces"

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
 * @example
 * const table = new HashTable<string>();
 * table.set("john", "555-333-444").set("jordan", "222-444-666");
 * table.get("jordan"); // => "222-444-666"
 * table.getAllKeys();  // => ["john", "jordan"]
 */
export class HashTable<T> implements IHashTable<T> {
    /** Setiap slot berisi satu pasangan [kunci, nilai], atau undefined jika kosong. */
    private readonly keymap: Array<HashEntry<T> | undefined>

    /** Membuat tabel dengan jumlah slot tertentu; ukuran default-nya 6. */
    constructor(size = 6) {
        if (!Number.isInteger(size) || size < 1) {
            throw new RangeError("Ukuran harus berupa bilangan bulat positif")
        }

        this.keymap = new Array(size)
    }

    /**
     * Mengubah kunci menjadi indeks awal slot.
     * Perkalian dengan 31 membuat urutan karakter berpengaruh pada hasil hash.
     */
    private hash(key: string): number {
        let sum = 0

        for (let i = 0; i < Math.min(key.length, 100); i++) {
            sum = (sum * 31 + key.charCodeAt(i) - 96) % this.keymap.length
        }

        return sum
    }

    /**
     * Menyimpan pasangan kunci dan nilai. Jika kunci sudah ada, nilainya
     * diperbarui. Jika slot hasil hash terisi, pencarian slot kosong
     * dilanjutkan secara berurutan (linear probing).
     * Melempar error jika seluruh slot sudah terisi.
     */
    set(key: string, value: T): this {
        const start = this.hash(key)

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

    /** Mengambil nilai berdasarkan kunci, atau undefined jika tidak ditemukan. */
    get(key: string): T | undefined {
        const start = this.hash(key)

        for (let i = 0; i < this.keymap.length; i++) {
            const entry = this.keymap[(start + i) % this.keymap.length]

            if (!entry) return undefined
            if (entry[0] === key) return entry[1]
        }

        return undefined
    }

    /** Mengembalikan semua kunci sesuai urutan slot di dalam array. */
    getAllKeys(): string[] {
        return this.keymap.flatMap((entry) => (entry ? [entry[0]] : []))
    }

    /** Mengembalikan semua nilai sesuai urutan slot di dalam array. */
    getAllValues(): T[] {
        return this.keymap.flatMap((entry) => (entry ? [entry[1]] : []))
    }
}
