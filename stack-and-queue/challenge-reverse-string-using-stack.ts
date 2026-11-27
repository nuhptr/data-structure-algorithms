import { IStringReverser } from "./interfaces"

/**
 * Stack String Reverser — membalik urutan karakter string
 * menggunakan prinsip LIFO pada stack.
 *
 * Setiap karakter dimasukkan ke stack dari kiri ke kanan, lalu
 * dikeluarkan kembali — karakter terakhir masuk keluar pertama.
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const reverser = new StackStringReverser()
 * reverser.reverse("hello world") // => "dlrow olleh"
 */
export class StackStringReverser implements IStringReverser {
    /**
     * Membalik urutan karakter pada string masukan menggunakan stack sementara.
     *
     * @param input String yang akan dibalik urutan karakternya.
     * @returns String hasil pembalikan.
     */
    reverse(input: string): string {
        const stack: string[] = []

        // Dorong seluruh karakter ke dalam stack dari kiri ke kanan.
        for (const character of input) {
            stack.push(character)
        }

        // Keluarkan karakter satu per satu dari puncak stack (urutan terbalik).
        let reversed = ""
        while (stack.length > 0) {
            reversed += stack.pop()
        }

        return reversed
    }
}
