// Mengurutkan angka dari nilai terkecil ke terbesar dengan Bubble Sort.
// Array arr diubah langsung, jadi pemanggil juga akan melihat hasil yang terurut.
const bubbleSort = (arr: number[]) => {
    // Setiap putaran menempatkan satu angka terbesar yang tersisa di ujung kanan.
    // Karena bagian kanan sudah terurut, batas index1 terus bergerak ke kiri.
    // Contoh: untuk 6 angka, index1 dimulai dari 5 dan berakhir di 1.
    for (let index1 = arr.length - 1; index1 > 0; index1--) {
        // Mulai dari kiri dan bandingkan pasangan yang bersebelahan.
        // index2 + 1 tidak melewati batas index1 karena index2 < index1.
        for (let index2 = 0; index2 < index1; index2++) {
            // Jika angka kiri lebih besar, pasangan belum berurutan menaik
            // dan harus ditukar. Jika tidak, biarkan pasangan tetap di tempat.
            if (arr[index2] > arr[index2 + 1]) {
                // Simpan angka kiri sementara sebelum posisinya ditimpa.
                let temp = arr[index2]

                // Geser angka kanan yang lebih kecil ke posisi kiri.
                arr[index2] = arr[index2 + 1]

                // Letakkan angka kiri yang disimpan ke posisi kanan.
                // Contoh: [4, 2] menjadi [2, 4].
                arr[index2 + 1] = temp
            }
        }
    }

    // Kembalikan referensi array yang sama setelah seluruh putaran selesai.
    return arr
}

// Contoh data masukan untuk dicoba.
const sortArr = [4, 2, 6, 5, 1, 3]
// Urutkan data; sortArr sendiri sekarang berisi [1, 2, 3, 4, 5, 6].
const response = bubbleSort(sortArr)

// Tampilkan hasil pengurutan di konsol.
console.log(response) // [ 1, 2, 3, 4, 5, 6 ]
