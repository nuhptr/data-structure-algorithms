/**
 * Mengurutkan elemen array secara menaik menggunakan insertion sort.
 *
 * Array diubah langsung (in-place), lalu referensi array yang sama dikembalikan.
 *
 * @param arr Array yang akan diurutkan.
 * @returns Array yang sama setelah elemen-elemennya diurutkan secara menaik.
 */
const insertionSort = <T>(arr: T[]) => {
    /** Mulai dari elemen kedua; bagian sebelum currentIndex sudah terurut. */
    for (let currentIndex = 1; currentIndex < arr.length; currentIndex++) {
        /** Simpan elemen yang sedang disisipkan agar tidak tertimpa saat menggeser. */
        let currentValue = arr[currentIndex] // 2, 4, 6, 1, 3
        /** Mulai membandingkan dari elemen tepat di sebelah kiri currentValue. */
        let previousIndex = currentIndex - 1 // 5

        /**
         * Selama belum melewati awal array dan elemen sebelumnya lebih besar,
         * geser elemen itu ke kanan untuk membuka tempat bagi currentValue.
         */
        while (previousIndex >= 0 && arr[previousIndex] > currentValue) {
            /** Geser elemen yang lebih besar satu posisi ke kanan. */
            arr[previousIndex + 1] = arr[previousIndex]
            /** Periksa elemen berikutnya ke arah kiri. */
            previousIndex--
        }

        /** Sisipkan currentValue pada posisi kosong yang sudah ditemukan. */
        arr[previousIndex + 1] = currentValue
    }

    /** Kembalikan array yang sama setelah seluruh elemen selesai disisipkan. */
    return arr
}

/** Contoh array masukan sebelum diurutkan. */
const unsortedArray = [5, 2, 4, 6, 1, 3]

/** Hasil pengurutan; `unsortedArray` juga berubah karena diurutkan in-place. */
const sortedArray = insertionSort(unsortedArray)

/** Tampilkan array yang sudah terurut. */
console.log(sortedArray)
