/** Cetak hitung mundur dengan memanggil fungsi kembali untuk angka berikutnya. */
const countDown = (number: number) => {
    /** Kondisi dasar menghentikan rekursi saat hitungan mencapai nol. */
    if (number === 0) {
        /** Tampilkan pesan terakhir sebelum fungsi berhenti. */
        console.log("And finally the stopping point! 🥂")
        return
    }

    /** Tampilkan angka saat ini sebelum melanjutkan hitung mundur. */
    console.log(number)
    /** Panggil fungsi dengan angka satu lebih kecil agar mendekati kondisi dasar. */
    countDown(number - 1)
}

/** Mulai hitung mundur dari angka 5. */
countDown(5)

/** Hitung faktorial dengan mengalikan angka saat ini dengan faktorial sebelumnya. */
const factorial = (number: number): number => {
    /** Faktorial 0 adalah 1 dan menjadi kondisi dasar rekursi. */
    if (number === 0) return 1

    /** Kurangi angka setiap pemanggilan hingga mencapai kondisi dasar. */
    return number * factorial(number - 1)
}

/** Tampilkan hasil faktorial 5, yaitu 120. */
console.log(factorial(5))
