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
    findItems(list: string[], item: string): string[] {
        const matches: string[] = []

        for (let i = 0; i < list.length; i++) {
            if (list[i] === item) matches.push(list[i])
        }

        for (let j = 0; j < list.length; j++) {
            if (list[j] === item) matches.push(list[j])
        }

        return matches
    }
}
