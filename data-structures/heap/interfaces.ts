/**
 * Kontrak umum untuk struktur data Heap.
 */
export interface IHeap<T> {
  insert(value: T): void;
  extract(): T;
  size(): number;
  isEmpty(): boolean;
}
