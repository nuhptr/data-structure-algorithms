/**
 * Membalik urutan karakter dalam string dengan mengubahnya menjadi array,
 * membalik urutan array, lalu menggabungkannya kembali menjadi string.
 *
 * @param string - Teks yang akan dibalik.
 * @returns String baru dengan urutan karakter yang terbalik.
 */
function reverseString(string: string) {
    const text = string.split("").reverse().join("")
    return text
}

// Contoh penggunaan: membalik "hello" menjadi "olleh".
console.log(reverseString("hello"))
