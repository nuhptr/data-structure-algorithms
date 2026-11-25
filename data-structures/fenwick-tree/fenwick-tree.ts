import { IFenwickTree } from "./interfaces";

/**
 * Fenwick Tree / Binary Indexed Tree — struktur data untuk menghitung
 * prefix sum secara efisien dengan dukungan point update.
 *
 * Menggunakan indexing 1-based secara internal.
 * Semua operasi public menggunakan index 1-based.
 *
 * Kompleksitas update  : O(log n)
 * Kompleksitas query   : O(log n)
 * Kompleksitas build   : O(n)
 *
 * @example
 * const tree = new FenwickTree(5);
 * tree.add(1, 3); tree.add(2, 2); tree.add(3, 5);
 * tree.rangeSum(1, 3); // => 10
 * tree.prefixSum(2);   // => 5
 */
export class FenwickTree implements IFenwickTree {
  private treeValues: number[];
  private treeSize: number;

  /**
   * Membuat Fenwick Tree kosong dengan kapasitas `size` elemen.
   */
  constructor(size: number) {
    if (size < 0) throw new Error("Ukuran tidak boleh negatif");
    this.treeSize = size;
    this.treeValues = Array(size + 1).fill(0);
  }

  /**
   * Membangun Fenwick Tree dari array nilai yang sudah ada.
   * Array menggunakan index 1-based (index 0 diabaikan).
   *
   * @param values - Array 1-based: values[1..n] berisi nilai awal
   */
  static fromArray(values: number[]): FenwickTree {
    if (values.length === 0) throw new Error("Array tidak boleh kosong");

    const size = values.length - 1;
    const tree = new FenwickTree(size);
    tree.treeValues = [...values];

    for (let index = 1; index <= size; index++) {
      const parentIndex = index + FenwickTree.leastSignificantBit(index);
      if (parentIndex <= size) {
        tree.treeValues[parentIndex] += tree.treeValues[index];
      }
    }

    return tree;
  }

  add(index: number, delta: number): void {
    this.validateIndex(index);
    let currentIndex = index;

    while (currentIndex <= this.treeSize) {
      this.treeValues[currentIndex] += delta;
      currentIndex += FenwickTree.leastSignificantBit(currentIndex);
    }
  }

  set(index: number, value: number): void {
    this.add(index, value - this.get(index));
  }

  prefixSum(index: number): number {
    this.validateIndex(index);
    let sum = 0;
    let currentIndex = index;

    while (currentIndex > 0) {
      sum += this.treeValues[currentIndex];
      currentIndex -= FenwickTree.leastSignificantBit(currentIndex);
    }

    return sum;
  }

  rangeSum(left: number, right: number): number {
    if (right < left) throw new Error("right harus >= left");
    return this.prefixSum(right) - this.prefixSum(left - 1);
  }

  get(index: number): number {
    return this.rangeSum(index, index);
  }

  size(): number {
    return this.treeSize;
  }

  // Mengisolasi bit paling kanan yang bernilai 1: i & (-i)
  private static leastSignificantBit(index: number): number {
    return index & -index;
  }

  private validateIndex(index: number): void {
    if (index < 1 || index > this.treeSize) {
      throw new RangeError(`Index ${index} di luar rentang [1, ${this.treeSize}]`);
    }
  }
}
