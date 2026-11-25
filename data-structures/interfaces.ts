/**
 * Kontrak untuk LRU Cache.
 */
export interface ILRUCache<K, V> {
  get(key: K): V | undefined;
  put(key: K, value: V): void;
  size(): number;
}

/**
 * Kontrak untuk Deque (Double-Ended Queue).
 */
export interface IDeque<T> {
  pushFront(value: T): void;
  pushBack(value: T): void;
  popFront(): T;
  popBack(): T;
  peekFront(): T;
  peekBack(): T;
  size(): number;
  isEmpty(): boolean;
}

/**
 * Kontrak untuk Monotonic Stack (non-decreasing/non-increasing).
 */
export interface IMonotonicStack {
  /**
   * Hitung jarak hujan yang dapat ditampung (Trapping Rain Water).
   */
  trapRainWater(heights: number[]): number;

  /**
   * Cari elemen berikutnya yang lebih besar untuk setiap elemen (Next Greater Element).
   */
  nextGreaterElement(nums: number[]): number[];

  /**
   * Hitung luas rectangle terbesar dalam histogram.
   */
  largestRectangleInHistogram(heights: number[]): number;
}

/**
 * Kontrak untuk Monotonic Deque: sliding window maximum.
 */
export interface IMonotonicDeque {
  slidingWindowMaximum(nums: number[], k: number): number[];
}
