/**
 * Hitung mundur dengan rekursi — menampilkan setiap angka dari
 * nilai awal hingga kondisi dasar `0`.
 *
 * Logger dapat disuntikkan untuk keperluan pengujian.
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(n) — call stack
 *
 * @param number Angka awal hitung mundur (bilangan bulat non-negatif).
 * @param onLog Fungsi penerima setiap pesan yang dicetak (default `console.log`).
 *
 * @example
 * countDown(3)
 * // Mencetak: 3, 2, 1, "And finally the stopping point!"
 */
export function countDown(
    number: number,
    onLog: (message: string | number) => void = console.log,
): void {
    // Kasus dasar (base case): hentikan rekursi saat mencapai 0.
    if (number === 0) {
        onLog("And finally the stopping point!")
        return
    }

    // Cetak angka saat ini lalu panggil ulang secara rekursif dengan nilai berkurang 1.
    onLog(number)
    countDown(number - 1, onLog)
}

/**
 * Menghitung faktorial (`n!`) secara rekursif.
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(n) — call stack
 *
 * @param number Bilangan non-negatif yang dihitung faktorialnya.
 * @returns Hasil `n!` — misalnya `factorial(5)` menghasilkan `120`.
 *
 * @example
 * factorial(5) // => 120
 * factorial(0) // => 1
 */
export function factorial(number: number): number {
    // Kasus dasar: 0! bernilai 1.
    if (number === 0) return 1
    // Langkah rekursif: n! = n × (n - 1)!.
    return number * factorial(number - 1)
}
