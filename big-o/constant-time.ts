import { IConstantTimeExample } from "./interfaces"

/**
 * Constant Time O(1) — mengakses elemen array berdasarkan indeks.
 *
 * Array menyediakan akses langsung ke memori berdasarkan indeks, jadi
 * waktu akses tidak bergantung pada ukuran array.
 *
 * Kompleksitas Waktu : O(1)
 * Kompleksitas Ruang : O(1)
 *
 * @example
 * const example = new ConstantTimeExample();
 * example.getElement([1, 2, 3, 4, 5], 0); // => 1
 */
export class ConstantTimeExample implements IConstantTimeExample {
    getElement<T>(array: T[], index: number): T {
        return array[index]
    }
}
