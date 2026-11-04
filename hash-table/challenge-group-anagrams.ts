/**
 * Mengelompokkan kata-kata yang merupakan anagram ke dalam array-array terpisah.
 * Untuk setiap kata, huruf-hurufnya diurutkan lalu digabungkan kembali sebagai
 * kunci. Kata dengan kunci yang sama dimasukkan ke kelompok yang sama.
 *
 * Contohnya, "eat", "tea", dan "ate" memiliki kunci "aet", sehingga berada
 * dalam satu kelompok. Urutan kelompok mengikuti kemunculan kunci pertama,
 * sedangkan urutan kata di dalam kelompok mengikuti urutan input.
 *
 * @typeParam T Jenis string yang digunakan pada daftar input.
 * @param arrStrings Daftar kata yang akan dikelompokkan; array kosong menghasilkan array kosong.
 */
const groupAnagrams = <T extends string>(arrStrings: T[]) => {
    const anagramMap: Record<string, T[]> = {}

    for (const str of arrStrings) {
        // Urutkan huruf agar anagram yang berbeda urutan memiliki kunci yang sama.
        const sortedStr = str.split("").sort().join("")
        console.log(sortedStr)

        // Tambahkan kata ke kelompok yang sudah ada atau buat kelompok baru.
        if (sortedStr in anagramMap) anagramMap[sortedStr].push(str)
        else anagramMap[sortedStr] = [str]
    }

    return Object.values(anagramMap)
}

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
const groups = groupAnagrams(strs)

// Hasil: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
console.log(groups)
