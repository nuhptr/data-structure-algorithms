import { ISortAlgorithm } from "./interfaces";

/**
 * Quick Sort — membagi array di sekitar pivot, lalu rekursif mengurutkan
 * sub-array kiri dan kanan.
 *
 * Kompleksitas Waktu : O(n log n) rata-rata | O(n²) worst case
 * Kompleksitas Ruang : O(log n) — call stack
 *
 * @example
 * const sorter = new QuickSort();
 * sorter.sort([8, 3, 5, 1, 4, 2]); // => [1, 2, 3, 4, 5, 8]
 */
export class QuickSort implements ISortAlgorithm {
  sort(array: number[]): number[] {
    const cloned = [...array];
    this.quickSort(cloned, 0, cloned.length - 1);
    return cloned;
  }

  private quickSort(array: number[], left: number, right: number): void {
    if (left >= right) return;

    const pivotIndex = this.partition(array, left, right);

    this.quickSort(array, left, pivotIndex - 1);
    this.quickSort(array, pivotIndex + 1, right);
  }

  private partition(array: number[], left: number, right: number): number {
    const randomPivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;
    const pivotValue = array[randomPivotIndex];

    // Pindahkan pivot ke ujung kanan sementara
    this.swap(array, randomPivotIndex, right);

    let smallerElementPointer = left - 1;
    let scanPointer = right - 1;

    while (smallerElementPointer < scanPointer) {
      while (array[++smallerElementPointer] < pivotValue);
      while (array[--scanPointer] > pivotValue);

      if (smallerElementPointer < scanPointer) {
        this.swap(array, smallerElementPointer, scanPointer);
      }
    }

    // Kembalikan pivot ke posisi yang benar
    this.swap(array, right, smallerElementPointer);
    return smallerElementPointer;
  }

  private swap(array: number[], indexA: number, indexB: number): void {
    [array[indexA], array[indexB]] = [array[indexB], array[indexA]];
  }
}
