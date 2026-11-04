const numbers: Array<number> = [1, 2, 3, 4, 5]

/**
 * Mengembalikan elemen pada indeks tertentu dalam array.
 * Operasi ini memiliki waktu konstan karena langsung mengakses lokasi memori
 * tanpa memeriksa elemen lain dalam array.
 *
 * @param arr Array yang akan dibaca.
 * @param index Indeks elemen yang diinginkan, dimulai dari 0.
 * @returns Nilai yang tersimpan pada indeks tersebut.
 */
function getElement(arr: Array<number>, index: number) {
    return arr[index]
}

console.log(getElement(numbers, 0))
