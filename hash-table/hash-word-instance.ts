import { IWordCounter } from "./interfaces"

/**
 * Word Counter — menghitung jumlah kemunculan setiap kata dalam teks.
 *
 * Teks diubah menjadi huruf kecil agar kata yang berbeda kapitalisasi
 * dihitung sebagai kata yang sama. Kata dipisahkan berdasarkan satu atau
 * lebih spasi; tanda baca tidak dihapus. Objek hasil dibuat tanpa
 * prototipe agar kata khusus seperti "__proto__" aman dihitung.
 *
 * Kompleksitas Waktu : O(n) — n jumlah karakter teks
 * Kompleksitas Ruang : O(k) — k jumlah kata unik
 *
 * @example
 * const counter = new WordCounter();
 * counter.count("Hello my name name name is anmastery");
 * // => { hello: 1, my: 1, name: 3, is: 1, anmastery: 1 }
 */
export class WordCounter implements IWordCounter {
    count(text: string): Record<string, number> {
        const wordMap: Record<string, number> = Object.create(null)
        const words = text.toLowerCase().match(/\S+/g) ?? []

        for (const word of words) {
            wordMap[word] = (wordMap[word] ?? 0) + 1
        }

        return wordMap
    }
}
