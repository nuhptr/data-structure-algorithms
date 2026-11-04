class MyArray<T> {
    /** Jumlah elemen yang saat ini tersimpan dalam array. */
    length: number
    /** Penyimpanan internal yang memetakan setiap indeks ke sebuah nilai. */
    data: Record<number, T>

    constructor() {
        this.length = 0
        this.data = {}
    }

    /**
     * Menambahkan nilai ke akhir array.
     *
     * @param item Nilai yang akan ditambahkan.
     * @returns Jumlah elemen array setelah diperbarui.
     */
    push(item: T): number {
        this.data[this.length] = item
        this.length++

        return this.length
    }

    /**
     * Mengambil nilai pada indeks yang ditentukan.
     *
     * @param index Indeks yang akan diakses.
     * @returns Elemen pada indeks tersebut, atau undefined jika tidak ada.
     */
    get(index: number): T | undefined {
        return this.data[index]
    }

    /**
     * Menghapus elemen terakhir dari array.
     *
     * @returns Elemen yang dihapus, atau undefined jika array kosong.
     */
    pop(): T | undefined {
        if (this.length === 0) return undefined

        const lastIndex = this.length - 1
        const lastItem = this.data[lastIndex]

        delete this.data[lastIndex]

        this.length = lastIndex

        return lastItem
    }

    /**
     * Menghapus elemen pertama dari array dan menggeser elemen lainnya ke kiri.
     *
     * @returns Elemen yang dihapus, atau undefined jika array kosong.
     */
    shift(): T | undefined {
        if (this.length === 0) return undefined

        return this.removeAt(0)
    }

    private removeAt(index: number): T | undefined {
        const item = this.data[index]

        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1]
        }

        delete this.data[--this.length]
        return item
    }

    /**
     * Menghapus elemen pada indeks tertentu dan menggeser elemen setelahnya ke kiri.
     *
     * @param index Indeks elemen yang akan dihapus.
     * @returns Elemen yang dihapus, atau undefined jika indeks tidak valid.
     */
    delete(index: number): T | undefined {
        if (!Number.isInteger(index) || index < 0 || index >= this.length) return undefined

        return this.removeAt(index)
    }
}

const myNewArray = new MyArray<string>()

myNewArray.push("one")
myNewArray.push("two")
myNewArray.push("three")
// myNewArray.pop()
// myNewArray.shift()

myNewArray.delete(1)

// console.log(myNewArray.get(0));
console.log(myNewArray)
console.log("===============")

console.log(myNewArray.get(0))
