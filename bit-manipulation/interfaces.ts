export interface IBitOperations {
  countSetBits(n: number): number;
  isPowerOfTwo(n: number): boolean;
  isPowerOfFour(n: number): boolean;
  getBit(n: number, position: number): number;
  setBit(n: number, position: number): number;
  clearBit(n: number, position: number): number;
  toggleBit(n: number, position: number): number;
}

/**
 * Kontrak untuk algoritma berbasis XOR.
 */
export interface IXORAlgorithms {
  singleNumber(nums: number[]): number;
  singleNumberIII(nums: number[]): [number, number];
  findMissingNumber(nums: number[]): number;
  reverseBits(n: number): number;
  hammingDistance(x: number, y: number): number;
}

/**
 * Kontrak untuk Bitmask DP.
 */
export interface IBitmaskDP {
  /**
   * Traveling Salesman Problem: jalur minimum mengunjungi semua kota tepat sekali.
   * @param distMatrix - Matriks jarak antar kota (n×n)
   */
  tsp(distMatrix: number[][]): number;

  /**
   * Minimum XOR Sum: assign array ke array lain untuk meminimalkan total XOR.
   */
  minimumXORSum(nums1: number[], nums2: number[]): number;
}
