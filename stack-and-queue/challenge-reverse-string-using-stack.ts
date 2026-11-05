/** Balik urutan karakter string menggunakan prinsip LIFO pada stack. */
function reverseString(inputString: string): string {
    /** Stack menyimpan karakter sementara; karakter terakhir masuk akan keluar lebih dulu. */
    const stack: string[] = []

    /** Masukkan setiap karakter ke stack dari kiri ke kanan. */
    for (const character of inputString) {
        /** push menambahkan karakter ke stack dan mengembalikan jumlah elemennya. */
        const stackSize = stack.push(character)
        /** Tampilkan ukuran stack setelah karakter ditambahkan. */
        console.log(stackSize)
    }

    /** Tampung karakter yang dikeluarkan dari stack dalam urutan terbalik. */
    let reversedString = ""

    /** Keluarkan karakter satu per satu; urutan LIFO membalik string. */
    while (stack.length > 0) {
        reversedString += stack.pop()
    }

    /** Kembalikan string yang sudah dibalik. */
    return reversedString
}

/** String awal yang akan dibalik. */
const originalString = "hello world"

/** Simpan hasil pembalikan string. */
const reversedString = reverseString(originalString)

/** Tampilkan hasil, yaitu "dlrow olleh". */
console.log(reversedString) // Output: dlrow olleh
