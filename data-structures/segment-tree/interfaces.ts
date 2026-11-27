/**
 * Kontrak untuk struktur data Segment Tree yang mendukung range query dan range update (1-based).
 */
export interface ISegmentTree {
    /**
     * Melakukan query nilai agregasi (maksimum) pada rentang `[left, right]` (1-based, inklusif).
     *
     * @param left - Batas bawah rentang (1-based)
     * @param right - Batas atas rentang (1-based)
     * @returns Nilai maksimum dalam rentang `[left, right]`
     */
    query(left: number, right: number): number

    /**
     * Memperbarui seluruh elemen pada rentang `[left, right]` (1-based, inklusif) menjadi `value`.
     *
     * @param left - Batas bawah rentang (1-based)
     * @param right - Batas atas rentang (1-based)
     * @param value - Nilai baru yang diterapkan ke setiap elemen dalam rentang
     */
    update(left: number, right: number, value: number): void
}
