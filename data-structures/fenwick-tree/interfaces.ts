/**
 * Kontrak untuk struktur data Fenwick Tree (Binary Indexed Tree) dengan pengindeksan 1-based.
 */
export interface IFenwickTree {
    /**
     * Menambahkan nilai `delta` ke elemen pada indeks `index` (1-based).
     *
     * @param index - Posisi elemen (1-based)
     * @param delta - Selisih nilai yang akan ditambahkan
     */
    add(index: number, delta: number): void

    /**
     * Mengubah nilai elemen pada indeks `index` (1-based) menjadi `value`.
     *
     * @param index - Posisi elemen (1-based)
     * @param value - Nilai baru yang diinginkan
     */
    set(index: number, value: number): void

    /**
     * Menghitung jumlah kumulatif (prefix sum) pada rentang `[1, index]` secara inklusif.
     *
     * @param index - Batas atas indeks (1-based)
     * @returns Total penjumlahan elemen dari indeks 1 hingga `index`
     */
    prefixSum(index: number): number

    /**
     * Menghitung jumlah elemen pada rentang `[left, right]` (1-based, inklusif).
     *
     * @param left - Batas bawah rentang (1-based)
     * @param right - Batas atas rentang (1-based)
     * @returns Total penjumlahan elemen dalam rentang `[left, right]`
     */
    rangeSum(left: number, right: number): number

    /**
     * Mengambil nilai tunggal elemen pada indeks `index` (1-based).
     *
     * @param index - Posisi elemen (1-based)
     * @returns Nilai elemen pada indeks tersebut
     */
    get(index: number): number

    /**
     * Mengembalikan kapasitas jumlah elemen yang dapat ditampung Fenwick Tree.
     *
     * @returns Jumlah elemen
     */
    size(): number
}
