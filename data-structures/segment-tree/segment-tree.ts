import { ISegmentTree } from "./interfaces";

/**
 * Segment Tree — struktur data berbasis array untuk menjawab range query
 * dan mendukung range/point update secara efisien.
 *
 * Implementasi ini menyimpan nilai maksimum di setiap node.
 *
 * Kompleksitas build  : O(n)
 * Kompleksitas query  : O(log n)
 * Kompleksitas update : O(log n)
 * Kompleksitas Ruang  : O(4n)
 *
 * @example
 * const tree = new SegmentTree([1, 2, -4, 7, 3, -5, 6]);
 * tree.query(1, 3);     // => 7   (max dari index 1-3, 1-based)
 * tree.update(1, 2, 10);
 * tree.query(1, 7);     // => 10
 */
export class SegmentTree implements ISegmentTree {
  private sourceArray: number[];
  private treeNodes: number[];
  private arraySize: number;

  constructor(array: number[]) {
    this.sourceArray = array;
    this.arraySize = array.length;
    this.treeNodes = Array(4 * this.arraySize).fill(0);

    if (this.arraySize > 0) {
      this.buildTree(1, 0, this.arraySize - 1);
    }
  }

  /**
   * Query nilai maksimum pada range [left, right] (1-based, inklusif).
   */
  query(left: number, right: number): number {
    return this.queryNode(1, 0, this.arraySize - 1, left - 1, right - 1);
  }

  /**
   * Update semua elemen dalam range [left, right] menjadi value (1-based).
   */
  update(left: number, right: number, value: number): void {
    this.updateNode(1, 0, this.arraySize - 1, left - 1, right - 1, value);
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  private leftChildIndex(nodeIndex: number): number {
    return nodeIndex * 2;
  }

  private rightChildIndex(nodeIndex: number): number {
    return nodeIndex * 2 + 1;
  }

  private buildTree(nodeIndex: number, rangeLeft: number, rangeRight: number): void {
    if (rangeLeft === rangeRight) {
      this.treeNodes[nodeIndex] = this.sourceArray[rangeLeft];
      return;
    }

    const midpoint = Math.floor((rangeLeft + rangeRight) / 2);
    this.buildTree(this.leftChildIndex(nodeIndex), rangeLeft, midpoint);
    this.buildTree(this.rightChildIndex(nodeIndex), midpoint + 1, rangeRight);
    this.treeNodes[nodeIndex] = Math.max(
      this.treeNodes[this.leftChildIndex(nodeIndex)],
      this.treeNodes[this.rightChildIndex(nodeIndex)]
    );
  }

  private queryNode(
    nodeIndex: number,
    rangeLeft: number,
    rangeRight: number,
    queryLeft: number,
    queryRight: number
  ): number {
    const isOutOfRange = rangeRight < queryLeft || rangeLeft > queryRight;
    if (isOutOfRange) return -Infinity;

    const isFullyCovered = rangeLeft >= queryLeft && rangeRight <= queryRight;
    if (isFullyCovered) return this.treeNodes[nodeIndex];

    const midpoint = Math.floor((rangeLeft + rangeRight) / 2);
    const leftMax = this.queryNode(this.leftChildIndex(nodeIndex), rangeLeft, midpoint, queryLeft, queryRight);
    const rightMax = this.queryNode(this.rightChildIndex(nodeIndex), midpoint + 1, rangeRight, queryLeft, queryRight);
    return Math.max(leftMax, rightMax);
  }

  private updateNode(
    nodeIndex: number,
    rangeLeft: number,
    rangeRight: number,
    updateLeft: number,
    updateRight: number,
    value: number
  ): void {
    const isOutOfRange = rangeRight < updateLeft || rangeLeft > updateRight;
    if (isOutOfRange) return;

    if (rangeLeft === rangeRight) {
      this.treeNodes[nodeIndex] = value;
      return;
    }

    const midpoint = Math.floor((rangeLeft + rangeRight) / 2);
    this.updateNode(this.leftChildIndex(nodeIndex), rangeLeft, midpoint, updateLeft, updateRight, value);
    this.updateNode(this.rightChildIndex(nodeIndex), midpoint + 1, rangeRight, updateLeft, updateRight, value);
    this.treeNodes[nodeIndex] = Math.max(
      this.treeNodes[this.leftChildIndex(nodeIndex)],
      this.treeNodes[this.rightChildIndex(nodeIndex)]
    );
  }
}
