/**
 * Kontrak untuk struktur data Fenwick Tree (Binary Indexed Tree).
 */
export interface IFenwickTree {
  /** Tambahkan nilai delta ke index i (1-based) */
  add(index: number, delta: number): void;
  /** Set nilai di index i menjadi value (1-based) */
  set(index: number, value: number): void;
  /** Hitung prefix sum dari [1, index] */
  prefixSum(index: number): number;
  /** Hitung range sum dari [left, right] (1-based, inklusif) */
  rangeSum(left: number, right: number): number;
  /** Ambil nilai tunggal di index i */
  get(index: number): number;
  /** Jumlah elemen yang dapat ditampung */
  size(): number;
}
