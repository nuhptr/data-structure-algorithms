import { IStringReverser } from "./interfaces"

/**
 * String Reverser — membalik urutan karakter string dengan mengubahnya
 * menjadi array, membalik urutan array, lalu menggabungkannya kembali.
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const reverser = new StringReverser();
 * reverser.reverse("hello"); // => "olleh"
 */
export class StringReverser implements IStringReverser {
    /**
     * Membalik urutan karakter dari string masukan.
     *
     * @param text - String yang ingin dibalik urutannya.
     * @returns String baru dengan urutan karakter terbalik.
     */
    reverse(text: string): string {
        // Pecah menjadi array karakter, balik urutannya, lalu gabungkan kembali
        return text.split("").reverse().join("")
    }
}
