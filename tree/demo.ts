import { BST } from "./bst"
import { countDown, factorial } from "./recursion"
import { BinarySearchTree } from "./tree-traversal"
import { show, section } from "../demo-utils"

/**
 * Menjalankan demo untuk seluruh implementasi di modul `tree`,
 * meliputi `BST`, `BinarySearchTree` (BFS & DFS traversal), serta fungsi rekursif.
 */
export function runDemo(): void {
    section("tree — BST")
    const bst = new BST()
    ;[5, 8, 3, 1, 7, 9].forEach((v) => bst.insert(v))
    show("includes(9)", bst.includes(9))
    show("includes(4)", bst.includes(4))

    section("tree — BinarySearchTree (traversal)")
    const tree = new BinarySearchTree<number>()
    ;[5, 8, 3, 1, 7, 9].forEach((v) => tree.insert(v))
    show("breadthFirstSearch", tree.breadthFirstSearch())
    show("dfsPreOrder", tree.dfsPreOrder())
    show("dfsInOrder", tree.dfsInOrder())
    show("dfsPostOrder", tree.dfsPostOrder())

    section("tree — recursion")
    const logs: string[] = []
    countDown(3, (msg) => logs.push(String(msg)))
    show("countDown(3)", logs)
    show("factorial(5)", factorial(5))
}
