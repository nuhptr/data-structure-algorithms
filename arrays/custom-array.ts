import { ICustomArray } from "./interfaces"

/**
 * Custom Array — implementasi array dinamis di atas object sebagai
 * media pembelajaran struktur data.
 *
 * Operasi `push` dan `get` berjalan O(1); `shift`, `delete`, dan `pop`
 * perlu menggeser elemen sehingga O(n).
 *
 * @example
 * const array = new CustomArray<string>();
 * array.push("one");
 * array.push("two"); // length => 2
 * array.get(0);  // => "one"
 * array.pop();   // => "two"
 */
export class CustomArray<T> implements ICustomArray<T> {
    /** Jumlah elemen yang saat ini tersimpan dalam array. */
    length = 0
    /** Penyimpanan internal yang memetakan setiap indeks ke sebuah nilai. */
    private readonly data: Record<number, T> = {}

    /** Menambahkan nilai ke akhir array. */
    push(item: T): number {
        this.data[this.length] = item
        this.length++

        return this.length
    }

    /** Mengambil nilai pada indeks yang ditentukan. */
    get(index: number): T | undefined {
        return this.data[index]
    }

    /** Menghapus elemen terakhir dari array. */
    pop(): T | undefined {
        if (this.length === 0) return undefined

        const lastIndex = this.length - 1
        const lastItem = this.data[lastIndex]

        delete this.data[lastIndex]
        this.length = lastIndex

        return lastItem
    }

    /** Menghapus elemen pertama dari array dan menggeser elemen lainnya ke kiri. */
    shift(): T | undefined {
        if (this.length === 0) return undefined

        return this.removeAt(0)
    }

    /** Menghapus elemen pada indeks tertentu dan menggeser elemen setelahnya ke kiri. */
    delete(index: number): T | undefined {
        if (!Number.isInteger(index) || index < 0 || index >= this.length) {
            return undefined
        }

        return this.removeAt(index)
    }

    /** Geser semua elemen setelah index satu posisi ke kiri, lalu perbarui length. */
    private removeAt(index: number): T | undefined {
        const item = this.data[index]

        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1]
        }

        delete this.data[--this.length]
        return item
    }
}
