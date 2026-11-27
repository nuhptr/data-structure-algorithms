import { ILinearTimeExample } from "./interfaces"

/**
 * Linear Time O(n) — mencari item dalam daftar dengan memeriksa
 * setiap elemen satu per satu.
 *
 * Fungsi memindai daftar dua kali; dua konstanta diabaikan sehingga
 * kompleksitasnya tetap O(n) — jumlah pekerjaan bertambah seiring
 * ukuran daftar.
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(1)
 *
 * @example
 * const example = new LinearTimeExample();
 * example.findItems(["milk", "bread", "eggs"], "eggs"); // => ["eggs", "eggs"]
 */
export class LinearTimeExample implements ILinearTimeExample {
    /**
     * Memindai daftar dua kali secara berurutan untuk mengumpulkan semua kemunculan `item`.
     *
     * @param list - Daftar string yang dipindai.
     * @param item - String target yang dicari.
     * @returns Array berisi semua kecocokan dari pemindaian pertama dan kedua.
     */
    findItems(list: string[], item: string): string[] {
        const matches: string[] = []

        // Pemindaian pertama: O(n)
        for (let i = 0; i < list.length; i++) {
            if (list[i] === item) matches.push(list[i])
        }

        // Pemindaian kedua: O(n), total O(2n) yang disederhanakan menjadi O(n)
        for (let j = 0; j < list.length; j++) {
            if (list[j] === item) matches.push(list[j])
        }

        return matches
    }
}
