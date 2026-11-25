import { IHeap } from "./interfaces"

/**
 * Abstract Heap — implementasi dasar Binary Heap berbasis array.
 *
 * Subclass menentukan apakah ini MinHeap atau MaxHeap lewat
 * fungsi comparator yang diberikan ke constructor.
 *
 * Kompleksitas insert  : O(log n)
 * Kompleksitas extract : O(log n)
 * Kompleksitas peek    : O(1)
 */
export abstract class Heap<T> implements IHeap<T> {
    protected items: T[]
    protected comparator: (parent: T, child: T) => boolean

    constructor(comparator: (parent: T, child: T) => boolean) {
        this.items = []
        this.comparator = comparator
    }

    insert(value: T): void {
        this.items.push(value)
        this.bubbleUp()
    }

    extract(): T {
        const topValue = this.items[0]
        const lastValue = this.items.pop()!

        if (this.items.length > 0) {
            this.items[0] = lastValue
            this.sinkDown()
        }

        return topValue
    }

    size(): number {
        return this.items.length
    }

    isEmpty(): boolean {
        return this.items.length === 0
    }

    protected swap(indexA: number, indexB: number): void {
        ;[this.items[indexA], this.items[indexB]] = [this.items[indexB], this.items[indexA]]
    }

    private getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2)
    }

    private getLeftChildIndex(parentIndex: number): number {
        return parentIndex * 2 + 1
    }

    private getRightChildIndex(parentIndex: number): number {
        return parentIndex * 2 + 2
    }

    private isCorrectlyPlaced(childIndex: number, parentIndex: number): boolean {
        return this.comparator(this.items[parentIndex], this.items[childIndex])
    }

    private getBetterChildIndex(leftIndex: number, rightIndex: number): number {
        const rightExists = rightIndex < this.size()

        if (!rightExists) return leftIndex

        return this.comparator(this.items[leftIndex], this.items[rightIndex])
            ? leftIndex
            : rightIndex
    }

    private bubbleUp(startIndex: number = this.size() - 1): void {
        let currentIndex = startIndex

        while (currentIndex > 0) {
            const parentIndex = this.getParentIndex(currentIndex)

            if (this.isCorrectlyPlaced(currentIndex, parentIndex)) break

            this.swap(parentIndex, currentIndex)
            currentIndex = parentIndex
        }
    }

    private sinkDown(): void {
        let currentIndex = 0

        while (true) {
            const leftChildIndex = this.getLeftChildIndex(currentIndex)
            const rightChildIndex = this.getRightChildIndex(currentIndex)
            const leftExists = leftChildIndex < this.size()

            if (!leftExists) break

            const betterChildIndex = this.getBetterChildIndex(leftChildIndex, rightChildIndex)

            if (this.isCorrectlyPlaced(betterChildIndex, currentIndex)) break

            this.swap(betterChildIndex, currentIndex)
            currentIndex = betterChildIndex
        }
    }
}

// ─── MinHeap ──────────────────────────────────────────────────────────────────

/**
 * Min Heap — elemen terkecil selalu berada di puncak.
 *
 * @example
 * const heap = new MinHeap<number>();
 * heap.insert(5); heap.insert(2); heap.insert(8);
 * heap.extract(); // => 2
 */
export class MinHeap<T> extends Heap<T> {
    constructor(comparator: (a: T, b: T) => boolean = (a, b) => a < b) {
        super(comparator)
    }
}

// ─── MaxHeap ──────────────────────────────────────────────────────────────────

/**
 * Max Heap — elemen terbesar selalu berada di puncak.
 *
 * @example
 * const heap = new MaxHeap<number>();
 * heap.insert(5); heap.insert(2); heap.insert(8);
 * heap.extract(); // => 8
 */
export class MaxHeap<T> extends Heap<T> {
    constructor(comparator: (a: T, b: T) => boolean = (a, b) => a > b) {
        super(comparator)
    }
}
