/**
 * Menghitung jumlah kemunculan setiap kata dalam teks.
 *
 * Teks diubah menjadi huruf kecil agar kata yang berbeda kapitalisasi,
 * seperti "Halo" dan "halo", dihitung sebagai kata yang sama. Kata dipisahkan
 * berdasarkan satu atau lebih karakter spasi. Tanda baca tidak dihapus, sehingga
 * "halo" dan "halo!" dihitung sebagai dua kata berbeda.
 *
 * Setiap kata menjadi kunci pada objek hasil, sedangkan nilainya adalah jumlah
 * kemunculan kata tersebut. Jika teks kosong atau hanya berisi spasi, hasilnya
 * adalah objek tanpa pasangan kata dan jumlah. Objek dibuat tanpa prototipe agar
 * kata khusus seperti "__proto__" dapat dihitung dengan aman.
 *
 * @param text Teks yang akan dihitung.
 * @returns Objek berisi kata dalam huruf kecil beserta jumlah kemunculannya.
 */
const wordCounter = (text: string): Record<string, number> => {
    const wordMap: Record<string, number> = Object.create(null)
    // Regex /\S+/g mencari rangkaian karakter yang bukan spasi:
    // \S berarti satu karakter non-spasi, + berarti satu atau lebih karakter
    // berurutan, dan g berarti mencari semua rangkaian, bukan hanya yang pertama.
    // Karena itu, "Halo   dunia!" menjadi ["halo", "dunia!"]; tanda baca tetap disertakan.
    // Jika teks kosong atau hanya berisi spasi, match() menghasilkan null;
    // operator ?? menggantinya dengan array kosong agar perulangan tetap aman.
    const words = text.toLowerCase().match(/\S+/g) ?? []

    // Periksa setiap kata satu per satu. Jika kata sudah ada di wordMap,
    // naikkan jumlahnya; jika belum ada, gunakan 0 sebagai nilai awal lalu tambah 1.
    // Contohnya, tiga kata "nama" akan menghasilkan wordMap.nama === 3.
    for (const word of words) {
        wordMap[word] = (wordMap[word] ?? 0) + 1
    }

    return wordMap
}

const text = "Hello my name name name is anmastery"
const wordCounts = wordCounter(text)

// Menampilkan jumlah setiap kata; "name" memiliki hitungan 3.
console.log(wordCounts)
