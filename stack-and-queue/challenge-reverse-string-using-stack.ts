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
 * const reverser = new StackStringReverser();
 * reverser.reverse("hello world"); // => "dlrow olleh"
 */
export class StackStringReverser implements IStringReverser {
    reverse(input: string): string {
        const stack: string[] = []

        for (const character of input) {
            stack.push(character)
        }

        let reversed = ""
        while (stack.length > 0) {
            reversed += stack.pop()
        }

        return reversed
    }
}
