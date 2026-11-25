/**
 * Hitung mundur dengan rekursi — menampilkan setiap angka dari
 * nilai awal hingga kondisi dasar 0.
 *
 * Logger dapat disuntikkan untuk keperluan pengujian.
 *
 * @param number Angka awal hitung mundur.
 * @param onLog  Fungsi penerima setiap pesan yang dicetak.
 */
export function countDown(
    number: number,
    onLog: (message: string | number) => void = console.log,
): void {
    if (number === 0) {
        onLog("And finally the stopping point!")
        return
    }

    onLog(number)
    countDown(number - 1, onLog)
}

/**
 * Hitung faktorial dengan rekursi.
 *
 * Kompleksitas Waktu : O(n)
 * Kompleksitas Ruang : O(n) — call stack
 *
 * @param number Bilangan non-negatif yang dihitung faktorialnya.
 * @returns Hasil n! — factorial(5) = 120.
 */
export function factorial(number: number): number {
    if (number === 0) return 1
    return number * factorial(number - 1)
}
