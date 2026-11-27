import { ICustomArray } from "./interfaces"

/**
 * Custom Array — implementasi array dinamis di atas object sebagai
 * media pembelajaran struktur data.
 *
 * Operasi `push`, `get`, dan `pop` berjalan O(1); `shift` dan `delete`
 * perlu menggeser elemen setelahnya sehingga berjalan O(n).
 *
 * Kompleksitas Waktu : O(1) untuk `push`/`get`/`pop`; O(n) untuk `shift`/`delete`
 * Kompleksitas Ruang : O(n) untuk menyimpan seluruh elemen pada `data`
 *
 * @example
 * const array = new CustomArray<string>()
 * array.push("one")
 * array.push("two") // length => 2
 * array.get(0)      // => "one"
 * array.pop()       // => "two"
 */
export class CustomArray<T> implements ICustomArray<T> {
    /** Jumlah elemen yang saat ini tersimpan dalam array. */
    length = 0
    /** Penyimpanan internal yang memetakan setiap indeks ke sebuah nilai. */
    private readonly data: Record<number, T> = {}

    /**
     * Menambahkan nilai ke akhir array dalam waktu O(1).
     *
     * @param item - Elemen baru yang akan ditambahkan.
     * @returns Panjang array terbaru setelah penambahan.
     */
    push(item: T): number {
        this.data[this.length] = item
        this.length++

        return this.length
    }

    /**
     * Mengambil nilai pada indeks yang ditentukan dalam waktu O(1).
     *
     * @param index - Indeks elemen yang ingin diakses.
     * @returns Nilai pada posisi `index`, atau `undefined` jika tidak ada.
     */
    get(index: number): T | undefined {
        return this.data[index]
    }

    /**
     * Menghapus dan mengembalikan elemen terakhir dari array dalam waktu O(1).
     *
     * @returns Elemen terakhir yang dihapus, atau `undefined` jika array kosong.
     */
    pop(): T | undefined {
        if (this.length === 0) return undefined

        // Simpan referensi elemen terakhir sebelum menghapus propertinya
        const lastIndex = this.length - 1
        const lastItem = this.data[lastIndex]

        delete this.data[lastIndex]
        this.length = lastIndex

        return lastItem
    }

    /**
     * Menghapus elemen pertama dari array dan menggeser elemen lainnya ke kiri dalam waktu O(n).
     *
     * @returns Elemen pertama yang dihapus, atau `undefined` jika array kosong.
     */
    shift(): T | undefined {
        if (this.length === 0) return undefined

        return this.removeAt(0)
    }

    /**
     * Menghapus elemen pada indeks tertentu dan menggeser elemen setelahnya ke kiri dalam waktu O(n).
     *
     * @param index - Indeks bilangan bulat dari elemen yang akan dihapus.
     * @returns Elemen yang dihapus, atau `undefined` jika indeks tidak valid.
     */
    delete(index: number): T | undefined {
        // Tolak indeks non-integer atau yang berada di luar batas array
        if (!Number.isInteger(index) || index < 0 || index >= this.length) {
            return undefined
        }

        return this.removeAt(index)
    }

    /**
     * Menggeser semua elemen setelah `index` satu posisi ke kiri, lalu menghapus slot terakhir
     * dan memperbarui `length`.
     *
     * @param index - Indeks valid dari elemen yang akan dihapus.
     * @returns Nilai elemen yang sebelumnya berada pada posisi `index`.
     */
    private removeAt(index: number): T | undefined {
        const item = this.data[index]

        // Geser setiap elemen di sebelah kanan `index` satu langkah ke kiri
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1]
        }

        // Hapus slot duplikat di ujung belakang sekaligus kurangi panjang array
        delete this.data[--this.length]
        return item
    }
}
