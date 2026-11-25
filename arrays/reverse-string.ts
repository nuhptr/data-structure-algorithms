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
    reverse(text: string): string {
        return text.split("").reverse().join("")
    }
}
