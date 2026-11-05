/** Urutkan array dengan membaginya menjadi bagian-bagian kecil, lalu gabungkan kembali. */
const mergeSort = <T>(values: T[]): T[] => {
    /** Array dengan nol atau satu elemen sudah terurut. */
    if (values.length <= 1) return values

    /** Tentukan titik tengah untuk membagi array menjadi dua bagian. */
    const middleIndex = Math.floor(values.length / 2)

    /** Urutkan kedua bagian secara rekursif, lalu gabungkan hasilnya. */
    return merge(mergeSort(values.slice(0, middleIndex)), mergeSort(values.slice(middleIndex)))
}

/** Gabungkan dua array yang sudah terurut menjadi satu array terurut. */
const merge = <T>(left: T[], right: T[]) => {
    /** Simpan elemen hasil penggabungan secara berurutan. */
    const result: T[] = []
    /** Tunjuk elemen berikutnya yang belum diperiksa di masing-masing array. */
    let leftIndex = 0
    let rightIndex = 0

    /** Bandingkan elemen terdepan selama kedua array masih punya elemen. */
    while (leftIndex < left.length && rightIndex < right.length) {
        /** Ambil elemen yang lebih kecil agar urutan hasil tetap menaik. */
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex])
            leftIndex++
        } else {
            result.push(right[rightIndex])
            rightIndex++
        }
    }

    /** Tambahkan semua sisa elemen; sisa tiap array sudah terurut. */
    return result.concat(left.slice(leftIndex), right.slice(rightIndex))
}

/** Siapkan contoh input, jalankan pengurutan, lalu tampilkan hasilnya. */
const unsortedArray = [38, 27, 43, 3, 9, 82, 10]
const sortedArray = mergeSort(unsortedArray)
console.log(sortedArray)
