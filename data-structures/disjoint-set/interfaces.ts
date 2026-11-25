export interface IDisjointSet {
  makeSet(node: number): void;
  find(node: number): number;
  union(nodeA: number, nodeB: number): void;
  connected(nodeA: number, nodeB: number): boolean;
}
