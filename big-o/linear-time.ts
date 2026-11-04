/**
 * Mencari barang tertentu di dalam daftar belanja.
 *
 * Contoh ini menunjukkan kompleksitas waktu linear: fungsi memeriksa setiap elemen
 * dalam array satu per satu, sehingga jumlah pekerjaan bertambah seiring ukuran daftar.
 *
 * Perulangan berjalan dua kali, tetapi kompleksitasnya tetap O(n) karena konstanta
 * diabaikan dalam notasi Big O.
 *
 * @param item Barang yang dicari di dalam daftar belanja.
 */
const groceries: Array<string> = ["milk", "bread", "eggs", "flour", "cheese", "sugar"]

const searchForItem = (item: string) => {
    for (let i = 0; i < groceries.length; i++) {
        if (groceries[i] === item) console.log(`Found ${item}`)
    }

    for (let j = 0; j < groceries.length; j++) {
        if (groceries[j] === item) console.log(`Found ${item} 2`)
    }

    // n + n = 2n -> O(2n)
    // Abaikan konstanta sehingga menjadi O(n)
}

searchForItem("eggs")
