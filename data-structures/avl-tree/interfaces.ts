export interface IAVLTree<T> {
  insert(value: T): void;
  delete(value: T): void;
  contains(value: T): boolean;
  height(): number;
  inOrder(): T[];
}
