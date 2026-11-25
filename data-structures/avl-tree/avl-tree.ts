import { IAVLTree } from "./interfaces";

class AVLNode<T> {
  value: T;
  left: AVLNode<T> | null = null;
  right: AVLNode<T> | null = null;
  height: number = 1;

  constructor(value: T) {
    this.value = value;
  }
}

/**
 * AVL Tree — Binary Search Tree yang menyeimbangkan diri sendiri.
 * Setiap node menjaga balance factor (perbedaan tinggi kiri dan kanan)
 * dalam rentang [-1, 0, 1] dengan rotasi otomatis.
 *
 * Kompleksitas insert  : O(log n)
 * Kompleksitas delete  : O(log n)
 * Kompleksitas search  : O(log n)
 *
 * @example
 * const tree = new AVLTree<number>();
 * tree.insert(10); tree.insert(20); tree.insert(5);
 * tree.inOrder(); // => [5, 10, 20]
 * tree.height();  // => 2
 */
export class AVLTree<T> implements IAVLTree<T> {
  private root: AVLNode<T> | null = null;

  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  contains(value: T): boolean {
    return this.searchNode(this.root, value);
  }

  height(): number {
    return this.getHeight(this.root);
  }

  inOrder(): T[] {
    const result: T[] = [];
    this.inOrderTraversal(this.root, result);
    return result;
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  private getHeight(node: AVLNode<T> | null): number {
    return node?.height ?? 0;
  }

  private getBalanceFactor(node: AVLNode<T> | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  private updateHeight(node: AVLNode<T>): void {
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  // ─── Rotations ────────────────────────────────────────────────────────────

  private rotateRight(unbalancedNode: AVLNode<T>): AVLNode<T> {
    const newRoot = unbalancedNode.left!;
    unbalancedNode.left = newRoot.right;
    newRoot.right = unbalancedNode;
    this.updateHeight(unbalancedNode);
    this.updateHeight(newRoot);
    return newRoot;
  }

  private rotateLeft(unbalancedNode: AVLNode<T>): AVLNode<T> {
    const newRoot = unbalancedNode.right!;
    unbalancedNode.right = newRoot.left;
    newRoot.left = unbalancedNode;
    this.updateHeight(unbalancedNode);
    this.updateHeight(newRoot);
    return newRoot;
  }

  private rebalance(node: AVLNode<T>): AVLNode<T> {
    this.updateHeight(node);
    const balanceFactor = this.getBalanceFactor(node);

    // Kiri-Kiri
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rotateRight(node);
    }
    // Kiri-Kanan
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }
    // Kanan-Kanan
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.rotateLeft(node);
    }
    // Kanan-Kiri
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  private insertNode(node: AVLNode<T> | null, value: T): AVLNode<T> {
    if (node === null) return new AVLNode(value);

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node; // duplikat diabaikan
    }

    return this.rebalance(node);
  }

  private getMinNode(node: AVLNode<T>): AVLNode<T> {
    let current = node;
    while (current.left !== null) current = current.left;
    return current;
  }

  private deleteNode(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
    if (node === null) return null;

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Node ditemukan
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // Node punya dua anak — ganti dengan successor terkecil dari kanan
      const successor = this.getMinNode(node.right);
      node.value = successor.value;
      node.right = this.deleteNode(node.right, successor.value);
    }

    return this.rebalance(node);
  }

  private searchNode(node: AVLNode<T> | null, value: T): boolean {
    if (node === null) return false;
    if (value === node.value) return true;
    return value < node.value
      ? this.searchNode(node.left, value)
      : this.searchNode(node.right, value);
  }

  private inOrderTraversal(node: AVLNode<T> | null, result: T[]): void {
    if (node === null) return;
    this.inOrderTraversal(node.left, result);
    result.push(node.value);
    this.inOrderTraversal(node.right, result);
  }
}
