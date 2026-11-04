/**
 * Menemukan semua pasangan angka unik dalam array.
 *
 * Fungsi ini menggunakan perulangan bersarang untuk membandingkan setiap elemen
 * dengan semua elemen setelahnya. Hal ini menghasilkan kompleksitas waktu kuadratik: O(n^2).
 *
 * Perulangan O(n) yang lebih kecil juga digunakan untuk mencetak pemisah. Namun, karena
 * O(n^2) bertumbuh jauh lebih cepat, suku dominan menentukan kompleksitas keseluruhan.
 *
 * @param arr Array yang akan diperiksa untuk mencari pasangan angka.
 */
function findPairs(arr: Array<number>) {
    // O(n^2)
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            console.log(`Pair: ${arr[i]}, ${arr[j]}`)
        }
    }

    // O(n)
    for (let q = 0; q < 5; q++) console.log("-------------", q)
}

const arrayNumber = [1, 2, 3, 4, 5]
findPairs(arrayNumber)
// ------------------------------------
