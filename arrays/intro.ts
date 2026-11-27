/**
 * Contoh-contoh dasar inisialisasi array dengan berbagai tipe elemen di TypeScript.
 *
 * Kompleksitas Waktu : O(1) untuk akses elemen berdasarkan indeks
 * Kompleksitas Ruang : O(n) sesuai jumlah elemen yang disimpan
 *
 * @example
 * stringArr[0] // => "a"
 * numArr.length // => 5
 */

/** Daftar teks yang berguna untuk menyimpan data berbentuk string. */
export const stringArr: string[] = ["a", "b", "c", "d"]

/** Daftar angka yang umum digunakan untuk perhitungan dan indeks. */
export const numArr: number[] = [1, 2, 3, 4, 5]

/** Daftar nilai boolean yang biasanya digunakan untuk menyatakan kondisi benar atau salah. */
export const boolArr: boolean[] = [true, false]

/** Array campuran menunjukkan bahwa array dapat menyimpan berbagai jenis nilai. */
export const mixedArr: unknown[] = ["a", 2, true, undefined, null, { a: "a" }, ["b"]]
