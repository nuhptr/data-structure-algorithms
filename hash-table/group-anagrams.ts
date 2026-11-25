import { IAnagramGrouper } from "./interfaces"

/**
 * Group Anagrams — mengelompokkan string berdasarkan karakter yang
 * sama tanpa memperhatikan urutan hurufnya.
 *
 * Setiap string diurutkan ulang menjadi kunci; string dengan kunci
 * yang sama berada dalam satu kelompok.
 *
 * Kompleksitas Waktu : O(n × k log k) — n string, k panjang string
 * Kompleksitas Ruang : O(n × k)
 *
 * @example
 * const grouper = new GroupAnagrams();
 * grouper.group(["eat", "tea", "tan", "ate", "nat", "bat"]);
 * // => { aet: ["eat", "tea", "ate"], ant: ["tan", "nat"], abt: ["bat"] }
 */
export class GroupAnagrams implements IAnagramGrouper {
    group(strings: string[]): Record<string, string[]> {
        const anagramMap: Record<string, string[]> = {}

        for (const str of strings) {
            // Urutkan huruf agar anagram yang berbeda urutan memiliki kunci yang sama.
            const sortedKey = str.split("").sort().join("")

            if (sortedKey in anagramMap) anagramMap[sortedKey].push(str)
            else anagramMap[sortedKey] = [str]
        }

        return anagramMap
    }
}
