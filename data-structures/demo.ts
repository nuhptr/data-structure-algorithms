import { AVLTree } from "./avl-tree"
import { Deque } from "./deque"
import { DisjointSet } from "./disjoint-set"
import { FenwickTree } from "./fenwick-tree"
import { MinHeap } from "./heap"
import { LRUCache } from "./lru-cache"
import { MonotonicDeque, MonotonicStack } from "./monotonic"
import { SegmentTree } from "./segment-tree"
import { Trie } from "./trie"
import { show, section } from "../demo-utils"

/**
 * Menjalankan demonstrasi interaktif untuk seluruh struktur data pada direktori `data-structures/`
 * (LRUCache, Deque, MinHeap, Trie, DisjointSet, FenwickTree, SegmentTree, AVLTree,
 * MonotonicStack, dan MonotonicDeque) serta mencetak hasilnya ke konsol.
 *
 * @returns Tidak mengembalikan nilai (`void`)
 */
export function runDemo(): void {
    section("data-structures — LRUCache")
    const cache = new LRUCache<string, number>(2)
    cache.put("a", 1)
    cache.put("b", 2)
    show("get('a')", cache.get("a"))
    cache.put("c", 3) // 'b' ter-evict karena paling lama tidak diakses
    show("get('b') setelah evict", cache.get("b"))
    show("size()", cache.size())

    section("data-structures — Deque")
    const deque = new Deque<number>()
    deque.pushBack(1)
    deque.pushBack(2)
    deque.pushFront(0)
    show("popFront()", deque.popFront())
    show("popBack()", deque.popBack())
    show("size()", deque.size())

    section("data-structures — MinHeap")
    const heap = new MinHeap<number>()
    heap.insert(5)
    heap.insert(1)
    heap.insert(3)
    show("extract()", heap.extract())
    show("extract()", heap.extract())

    section("data-structures — Trie")
    const trie = new Trie()
    trie.add("apple").add("app")
    show("find('app')", trie.find("app"))
    show("find('application', prefixOnly)", trie.find("application", true))

    section("data-structures — DisjointSet")
    const ds = new DisjointSet()
    ;[1, 2, 3, 4].forEach((n) => ds.makeSet(n))
    ds.union(1, 2)
    ds.union(3, 4)
    show("connected(1,2)", ds.connected(1, 2))
    show("connected(1,3)", ds.connected(1, 3))

    section("data-structures — FenwickTree")
    const fenwick = FenwickTree.fromArray([0, 1, 2, 3, 4, 5])
    show("rangeSum(1,3)", fenwick.rangeSum(1, 3))
    fenwick.add(2, 10)
    show("rangeSum(1,3) setelah add", fenwick.rangeSum(1, 3))

    section("data-structures — SegmentTree (range max)")
    const seg = new SegmentTree([1, 2, -4, 7, 3, -5, 6])
    show("query(1,3)", seg.query(1, 3))
    seg.update(1, 2, 10)
    show("query(1,7) setelah update", seg.query(1, 7))

    section("data-structures — AVLTree")
    const avl = new AVLTree<number>()
    ;[10, 20, 30, 40, 50, 25].forEach((v) => avl.insert(v))
    show("height()", avl.height())
    show("inOrder()", avl.inOrder())
    show("contains(25)", avl.contains(25))

    section("data-structures — MonotonicStack")
    const mono = new MonotonicStack()
    show("nextGreaterElement", mono.nextGreaterElement([2, 1, 2, 4, 3]))
    show("trapRainWater", mono.trapRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))

    section("data-structures — MonotonicDeque")
    const mdeque = new MonotonicDeque()
    show("slidingWindowMaximum k=3", mdeque.slidingWindowMaximum([1, 3, -1, -3, 5, 3, 6, 7], 3))
}
