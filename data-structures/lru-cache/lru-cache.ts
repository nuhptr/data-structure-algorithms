import { ILRUCache } from "../interfaces";

/**
 * Node dalam doubly linked list untuk LRU Cache.
 */
class LRUNode<K, V> {
  constructor(
    public key: K,
    public value: V,
    public prev: LRUNode<K, V> | null = null,
    public next: LRUNode<K, V> | null = null
  ) {}
}

/**
 * LRU Cache — Least Recently Used Cache menggunakan kombinasi
 * HashMap + Doubly Linked List untuk operasi O(1) get dan put.
 *
 * Digunakan oleh: sistem operasi (page replacement), browser (cache),
 * database (buffer pool), CDN, Redis, dan hampir semua unicorn tech.
 *
 * Kompleksitas get  : O(1)
 * Kompleksitas put  : O(1)
 * Kompleksitas Ruang: O(capacity)
 *
 * @example
 * const cache = new LRUCache<number, string>(3);
 * cache.put(1, "a"); cache.put(2, "b"); cache.put(3, "c");
 * cache.get(1);       // => "a" — 1 kini paling baru diakses
 * cache.put(4, "d"); // evict 2 (paling lama tidak diakses)
 * cache.get(2);       // => undefined
 */
export class LRUCache<K, V> implements ILRUCache<K, V> {
  private readonly capacity: number;
  private readonly nodeMap: Map<K, LRUNode<K, V>>;

  // Sentinel nodes: head = paling jarang diakses, tail = paling baru diakses
  private readonly head: LRUNode<K, V>;
  private readonly tail: LRUNode<K, V>;

  constructor(capacity: number) {
    if (capacity <= 0) throw new Error("Kapasitas harus lebih dari 0");

    this.capacity = capacity;
    this.nodeMap = new Map();

    this.head = new LRUNode<K, V>(null as K, null as V);
    this.tail = new LRUNode<K, V>(null as K, null as V);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: K): V | undefined {
    const node = this.nodeMap.get(key);
    if (!node) return undefined;

    // Pindahkan ke posisi paling baru (sebelum tail)
    this.removeNode(node);
    this.insertBeforeTail(node);

    return node.value;
  }

  put(key: K, value: V): void {
    if (this.nodeMap.has(key)) {
      const existingNode = this.nodeMap.get(key)!;
      existingNode.value = value;
      this.removeNode(existingNode);
      this.insertBeforeTail(existingNode);
      return;
    }

    // Evict LRU node jika kapasitas penuh
    if (this.nodeMap.size >= this.capacity) {
      const lruNode = this.head.next!;
      this.removeNode(lruNode);
      this.nodeMap.delete(lruNode.key);
    }

    const newNode = new LRUNode(key, value);
    this.nodeMap.set(key, newNode);
    this.insertBeforeTail(newNode);
  }

  size(): number {
    return this.nodeMap.size;
  }

  private removeNode(node: LRUNode<K, V>): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private insertBeforeTail(node: LRUNode<K, V>): void {
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev!.next = node;
    this.tail.prev = node;
  }
}
