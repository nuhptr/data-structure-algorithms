import { DoublyLinkedList } from "./double"
import { LinkedList } from "./single"
import { ReverseLinkedList, ReverseNode } from "./challenge"
import { show, section } from "../demo-utils"

/**
 * Menjalankan demonstrasi `LinkedList` (singly), `DoublyLinkedList`, dan `ReverseLinkedList`.
 *
 * @returns Tidak mengembalikan nilai.
 */
export function runDemo(): void {
    section("linked-list — LinkedList (singly)")
    const list = new LinkedList<number>(1)
    list.push(2).push(3)
    show("size()", list.size())
    show("get(1)?.value", list.get(1)?.value)
    show("getLast()?.value", list.getLast()?.value)
    list.set(0, 10)
    show("set(0,10) lalu get(0)", list.get(0)?.value)
    show("insert(1, 99)", list.insert(1, 99))
    show("pop()?.value", list.pop()?.value)
    show("shift()?.value", list.shift()?.value)

    section("linked-list — DoublyLinkedList")
    const dll = new DoublyLinkedList<number>(0)
    dll.push(1).push(2)
    show("pop()?.value", dll.pop()?.value)
    dll.unshift(9)
    show("unshift(9) lalu head", dll.head?.value)
    show("shift()?.value", dll.shift()?.value)

    section("linked-list — ReverseLinkedList")
    const rev = new ReverseLinkedList(1)
    rev.push(2).push(3).push(4)
    rev.reverse()
    const values: number[] = []
    let node: ReverseNode<number> | null = rev.head
    for (let i = 0; i < rev.length && node; i++) {
        values.push(node.value)
        node = node.next
    }
    show("setelah reverse", values)
}
