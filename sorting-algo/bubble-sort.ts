// Mengurutkan angka dari nilai terkecil ke terbesar dengan Bubble Sort.
// Array numbers diubah langsung, jadi pemanggil juga akan melihat hasil yang terurut.
const bubbleSort = (numbers: number[]) => {
    // Setiap putaran menempatkan satu angka terbesar yang tersisa di ujung kanan.
    // Karena bagian kanan sudah terurut, batas endIndex terus bergerak ke kiri.
    // Contoh: untuk 6 angka, endIndex dimulai dari 5 dan berakhir di 1.
    for (let endIndex = numbers.length - 1; endIndex > 0; endIndex--) {
        // Mulai dari kiri dan bandingkan pasangan yang bersebelahan.
        // currentIndex + 1 tidak melewati endIndex karena currentIndex < endIndex.
        for (let currentIndex = 0; currentIndex < endIndex; currentIndex++) {
            // Jika angka kiri lebih besar, pasangan belum berurutan menaik
            // dan harus ditukar. Jika tidak, biarkan pasangan tetap di tempat.
            if (numbers[currentIndex] > numbers[currentIndex + 1]) {
                // Simpan angka kiri sementara sebelum posisinya ditimpa.
                let temporaryNumber = numbers[currentIndex]

                // Geser angka kanan yang lebih kecil ke posisi kiri.
                numbers[currentIndex] = numbers[currentIndex + 1]

                // Letakkan angka kiri yang disimpan ke posisi kanan.
                // Contoh: [4, 2] menjadi [2, 4].
                numbers[currentIndex + 1] = temporaryNumber
            }
        }
    }

    // Kembalikan referensi array yang sama setelah seluruh putaran selesai.
    return numbers
}

// Contoh data masukan untuk dicoba.
const numbersToSort = [4, 2, 6, 5, 1, 3]
// Urutkan data; numbersToSort sendiri sekarang berisi [1, 2, 3, 4, 5, 6].
const sortedNumbers = bubbleSort(numbersToSort)

// Tampilkan hasil pengurutan di konsol.
console.log(sortedNumbers) // [ 1, 2, 3, 4, 5, 6 ]
