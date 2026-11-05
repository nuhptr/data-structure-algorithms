/**
 * Mengurutkan array secara menaik dengan memilih nilai terkecil pada setiap
 * putaran. Array input diubah langsung dan dikembalikan.
 */
const selectionSort = <T>(arr: T[]) => {
    /** `index` adalah posisi berikutnya yang akan diisi dengan nilai terkecil. */
    for (let index = 0; index < arr.length; index++) {
        /** Anggap nilai di posisi `index` sebagai nilai terkecil sementara. */
        let minIndex = index

        /** Cari nilai terkecil dari posisi `index` sampai akhir array. */
        for (let index2 = index; index2 < arr.length; index2++) {
            if (arr[index2] < arr[minIndex]) {
                /** Simpan posisi nilai terkecil yang ditemukan sejauh ini. */
                minIndex = index2
            }
        }

        /** Letakkan nilai terkecil di posisi `index` jika berada di posisi lain. */
        if (index !== minIndex) {
            /** Gunakan `temp` agar nilai di `index` tidak hilang saat ditukar. */
            let temp = arr[index]
            arr[index] = arr[minIndex]
            arr[minIndex] = temp
        }
    }

    /** Semua posisi sudah terurut; kembalikan array yang sama. */
    return arr
}

/** Setiap putaran memilih nilai terkecil yang belum terurut. */
const myArr = [4, 2, 6, 5, 1, 3]
const res = selectionSort(myArr)
console.log(res) /** [1, 2, 3, 4, 5, 6] */
