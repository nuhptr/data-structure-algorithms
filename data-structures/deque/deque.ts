import { IDeque } from "../interfaces";

/**
 * Node untuk doubly linked list internal Deque.
 */
class DequeNode<T> {
  constructor(
    public value: T,
    public prev: DequeNode<T> | null = null,
    public next: DequeNode<T> | null = null
  ) {}
}

/**
 * Deque (Double-Ended Queue) — struktur data yang mendukung
 * insert dan delete di kedua ujung dalam O(1).
 *
 * Digunakan sebagai dasar sliding window, BFS, stack, dan queue.
 * Juga digunakan dalam implementasi Monotonic Deque.
 *
 * Kompleksitas pushFront/pushBack : O(1)
 * Kompleksitas popFront/popBack   : O(1)
 * Kompleksitas peekFront/peekBack : O(1)
 * Kompleksitas Ruang              : O(n)
 *
 * @example
 * const deque = new Deque<number>();
 * deque.pushBack(1); deque.pushBack(2); deque.pushFront(0);
 * deque.popFront(); // => 0
 * deque.popBack();  // => 2
 */
export class Deque<T> implements IDeque<T> {
  private head: DequeNode<T> | null = null;
  private tail: DequeNode<T> | null = null;
  private count = 0;

  pushFront(value: T): void {
    const newNode = new DequeNode(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.count++;
  }

  pushBack(value: T): void {
    const newNode = new DequeNode(value);

    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.count++;
  }

  popFront(): T {
    if (this.head === null) throw new Error("Deque kosong");

    const value = this.head.value;
    this.head = this.head.next;

    if (this.head === null) {
      this.tail = null;
    } else {
      this.head.prev = null;
    }

    this.count--;
    return value;
  }

  popBack(): T {
    if (this.tail === null) throw new Error("Deque kosong");

    const value = this.tail.value;
    this.tail = this.tail.prev;

    if (this.tail === null) {
      this.head = null;
    } else {
      this.tail.next = null;
    }

    this.count--;
    return value;
  }

  peekFront(): T {
    if (this.head === null) throw new Error("Deque kosong");
    return this.head.value;
  }

  peekBack(): T {
    if (this.tail === null) throw new Error("Deque kosong");
    return this.tail.value;
  }

  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }
}
