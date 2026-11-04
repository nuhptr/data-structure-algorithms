/**
 * Mengelompokkan string berdasarkan karakter yang sudah diurutkan.
 * Mengembalikan objek dengan kunci karakter terurut dan nilai berupa kelompok
 * string yang memiliki kunci tersebut.
 *
 * Contohnya, "eat", "tea", dan "ate" memiliki kunci "aet", sehingga berada
 * dalam satu kelompok. Urutan kunci mengikuti kemunculan pertamanya, sedangkan
 * urutan string di dalam kelompok mengikuti urutan input.
 *
 * @typeParam T Jenis string yang digunakan pada daftar input.
 * @param arrStrings Daftar string yang akan dikelompokkan; array kosong menghasilkan objek kosong.
 * @returns Map dengan kunci karakter terurut dan kelompok string sebagai nilainya.
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

    return anagramMap
}

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// Mengelompokkan kata-kata dari array.
const groupsValues = groupAnagrams(Object.values(strs))
// Object.keys pada array menghasilkan indeks string, bukan isi kata.
const groupsKey = groupAnagrams(Object.keys(strs))

// Hasil console.log(groupsValues):
// { aet: ["eat", "tea", "ate"], ant: ["tan", "nat"], abt: ["bat"] }
console.log(groupsValues)
// Separator antara hasil pengelompokan kata dan hasil pengelompokan indeks.
console.log("==========")
// Hasil console.log(groupsKey):
// { "0": ["0"], "1": ["1"], "2": ["2"], "3": ["3"], "4": ["4"], "5": ["5"] }
console.log(groupsKey)
