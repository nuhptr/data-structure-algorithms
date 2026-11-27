import { CustomArray, StringReverser, numArr, stringArr } from "./index"
import { show, section } from "../demo-utils"

/**
 * Menjalankan demonstrasi contoh array dasar, `CustomArray`, dan `StringReverser`.
 *
 * @returns Tidak mengembalikan nilai.
 */
export function runDemo(): void {
    section("arrays — intro")
    show("stringArr", stringArr)
    show("numArr", numArr)

    section("arrays — CustomArray")
    const array = new CustomArray<string>()
    array.push("one")
    array.push("two")
    array.push("three")
    show("setelah push x3 length", array.length)
    show("get(1)", array.get(1))
    show("delete(1)", array.delete(1))
    show("pop()", array.pop())

    section("arrays — StringReverser")
    const reverser = new StringReverser()
    show('reverse("hello")', reverser.reverse("hello"))
}
