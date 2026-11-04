/** Menyimpan pasangan kunci dan nilai dalam array dengan ukuran tetap. */
class HashTable<T> {
    /** Setiap slot berisi satu pasangan [kunci, nilai], atau undefined jika kosong. */
    keymap: Array<[string, T] | undefined>

    /** Membuat tabel dengan jumlah slot tertentu; ukuran default-nya 6. */
    constructor(size = 6) {
        if (!Number.isInteger(size) || size < 1) {
            throw new RangeError("Ukuran harus berupa bilangan bulat positif")
        }

        this.keymap = new Array(size)
    }

    /**
     * Mengubah kunci menjadi indeks awal pada array dengan langkah berikut:
     * 1. Mulai dari nilai 0.
     * 2. Untuk maksimal 100 karakter pertama, kalikan nilai sebelumnya dengan
     *    31, tambahkan kode karakter dikurangi 96, lalu ambil sisanya dari
     *    ukuran array (modulo). Modulo membatasi hasil ke rentang 0 sampai
     *    ukuran array dikurangi 1, sehingga hasilnya selalu indeks slot yang valid.
     * 3. Kembalikan nilai akhir sebagai indeks awal.
     *
     * Perkalian dengan 31 membuat urutan karakter berpengaruh pada hasil hash.
     */
    _hashFunction(key: string) {
        let sum = 0

        for (let i = 0; i < Math.min(key.length, 100); i++) {
            sum = (sum * 31 + key.charCodeAt(i) - 96) % this.keymap.length
        }

        return sum
    }

    /**
     * Menyimpan pasangan kunci dan nilai.
     * Jika kunci sudah ada, nilainya diperbarui. Jika slot hasil hash terisi,
     * pencarian slot kosong dilanjutkan secara berurutan (linear probing).
     * Melempar error jika seluruh slot sudah terisi.
     * Mengembalikan tabel agar pemanggilan metode bisa dirangkai.
     */
    set(key: string, value: T): this {
        const start = this._hashFunction(key)

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

    /** Mengambil nilai berdasarkan kunci, atau undefined jika kunci tidak ditemukan. */
    get(key: string) {
        const start = this._hashFunction(key)

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

const phoneBook = new HashTable()

// Menambahkan tiga nama beserta nomor telepon ke tabel.
phoneBook.set("john", "555-333-444")
phoneBook.set("jordan", "222-444-666")
phoneBook.set("michel", "111-666-222")

// Menampilkan isi tabel, nomor Jordan, semua nomor, lalu semua nama.
console.log(phoneBook)
console.log(phoneBook.get("jordan"))
console.log(phoneBook.getAllValues())
console.log(phoneBook.getAllKeys())
