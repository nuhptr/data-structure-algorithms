import { ISortAlgorithm } from "./interfaces"

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
    /**
     * Mengurutkan salinan array secara menaik menggunakan Quick Sort.
     *
     * @param array - Array bilangan yang akan diurutkan
     * @returns Array baru yang sudah terurut secara menaik
     */
    sort(array: number[]): number[] {
        const cloned = [...array]
        this.quickSort(cloned, 0, cloned.length - 1)
        return cloned
    }

    /**
     * Mengurutkan sub-array pada rentang `[left, right]` secara rekursif in-place.
     *
     * @param array - Array target yang sedang diurutkan
     * @param left - Batas indeks kiri sub-array
     * @param right - Batas indeks kanan sub-array
     * @returns Tidak mengembalikan nilai (memodifikasi `array` secara in-place)
     */
    private quickSort(array: number[], left: number, right: number): void {
        // Basis rekursi: rentang kosong atau hanya memiliki 1 elemen
        if (left >= right) return

        const pivotIndex = this.partition(array, left, right)

        // Urutkan partisi kiri dan kanan di sekitar posisi akhir pivot
        this.quickSort(array, left, pivotIndex - 1)
        this.quickSort(array, pivotIndex + 1, right)
    }

    /**
     * Memilih pivot acak lalu mempartisi elemen di rentang `[left, right]`
     * sehingga elemen lebih kecil berada di kiri pivot dan elemen lebih besar di kanan.
     *
     * @param array - Array target yang sedang dipartisi
     * @param left - Batas indeks kiri partisi
     * @param right - Batas indeks kanan partisi
     * @returns Indeks akhir tempat pivot diletakkan
     */
    private partition(array: number[], left: number, right: number): number {
        // Pilih pivot secara acak untuk menghindari worst-case pada data terurut
        const randomPivotIndex = Math.floor(Math.random() * (right - left + 1)) + left
        const pivotValue = array[randomPivotIndex]

        // Pindahkan pivot ke ujung kanan sementara
        this.swap(array, randomPivotIndex, right)

        let smallerElementPointer = left - 1
        let scanPointer = right - 1

        // Gerakkan kedua pointer saling mendekat dan tukar pasangan yang salah sisi
        while (smallerElementPointer < scanPointer) {
            while (array[++smallerElementPointer] < pivotValue);
            while (array[--scanPointer] > pivotValue);

            if (smallerElementPointer < scanPointer) {
                this.swap(array, smallerElementPointer, scanPointer)
            }
        }

        // Kembalikan pivot ke posisi yang benar
        this.swap(array, right, smallerElementPointer)
        return smallerElementPointer
    }

    /**
     * Menukar posisi dua elemen di dalam array.
     *
     * @param array - Array yang elemennya akan ditukar
     * @param indexA - Indeks elemen pertama
     * @param indexB - Indeks elemen kedua
     * @returns Tidak mengembalikan nilai
     */
    private swap(array: number[], indexA: number, indexB: number): void {
        ;[array[indexA], array[indexB]] = [array[indexB], array[indexA]]
    }
}
