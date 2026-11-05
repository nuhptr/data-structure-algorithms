# Rekursi: Cara Kerjanya

Rekursi adalah teknik ketika sebuah fungsi memanggil dirinya sendiri dengan
masalah yang lebih kecil. Setiap fungsi rekursif memerlukan **kondisi dasar**
(_base case_) untuk menghentikan pemanggilan, serta langkah rekursif yang
mendekati kondisi dasar tersebut.

File `recursion.ts` berisi dua contoh: menghitung mundur dengan `countDown` dan
menghitung faktorial dengan `factorial`.

## Algoritma Berpikir

Setiap pemanggilan rekursif dapat dipahami dalam tiga bagian:

1. Periksa apakah nilai saat ini sudah mencapai kondisi dasar.
2. Jika belum, lakukan pekerjaan untuk nilai saat ini.
3. Panggil fungsi kembali dengan nilai yang lebih dekat ke kondisi dasar.

Pada `countDown`, angka dikurangi satu sampai `0`. Pada `factorial`, angka
dikalikan dengan hasil faktorial angka sebelumnya, sampai mencapai `0`.

## Contoh kode

### Hitung mundur

```ts
const countDown = (number: number) => {
    if (number === 0) {
        console.log("And finally the stopping point! 🥂")
        return
    }

    console.log(number)
    countDown(number - 1)
}

countDown(5)
```

### Faktorial

```ts
const factorial = (number: number): number => {
    if (number === 0) return 1

    return number * factorial(number - 1)
}

console.log(factorial(5))
```

## Arti bagian penting

- `number` adalah nilai pada pemanggilan fungsi saat ini.
- **Kondisi dasar** menentukan kapan fungsi berhenti memanggil dirinya sendiri.
- **Pemanggilan rekursif** mengerjakan versi masalah yang lebih kecil.
- Setiap pemanggilan fungsi memiliki nilai `number` sendiri sampai pemanggilan
  selesai.
- Untuk input contoh, `countDown` menerima `5`, sedangkan `factorial`
  mengembalikan angka `120`.

## Telusuri `countDown(5)`

Kondisi dasar fungsi adalah `number === 0`. Jika belum tercapai, fungsi
mencetak angka saat ini lalu memanggil dirinya dengan `number - 1`.

|    Pemanggilan | Kondisi dasar tercapai? | Tindakan                            |
| -------------: | ----------------------- | ----------------------------------- |
| `countDown(5)` | Tidak                   | Cetak `5`, panggil `countDown(4)`   |
| `countDown(4)` | Tidak                   | Cetak `4`, panggil `countDown(3)`   |
| `countDown(3)` | Tidak                   | Cetak `3`, panggil `countDown(2)`   |
| `countDown(2)` | Tidak                   | Cetak `2`, panggil `countDown(1)`   |
| `countDown(1)` | Tidak                   | Cetak `1`, panggil `countDown(0)`   |
| `countDown(0)` | Ya                      | Cetak pesan terakhir, lalu `return` |

Urutan output dari fungsi tersebut:

```text
5
4
3
2
1
And finally the stopping point! 🥂
```

Pada setiap pemanggilan, angka semakin dekat ke `0`. Ketika mencapai `0`,
fungsi mencetak pesan dan `return` menghentikan rantai pemanggilan.

## Telusuri `factorial(5)`

Faktorial didefinisikan sebagai:

```text
0! = 1
n! = n * (n - 1)!
```

Kondisi dasar pada kode adalah `factorial(0)`, yang mengembalikan `1`.
Pemanggilan awal membentuk rangkaian berikut:

```text
factorial(5)
= 5 * factorial(4)
= 5 * 4 * factorial(3)
= 5 * 4 * 3 * factorial(2)
= 5 * 4 * 3 * 2 * factorial(1)
= 5 * 4 * 3 * 2 * 1 * factorial(0)
= 5 * 4 * 3 * 2 * 1 * 1
= 120
```

Pemanggilan berjalan sampai kondisi dasar, lalu hasilnya dikembalikan sambil
rantai perkalian diselesaikan dari pemanggilan terdalam:

|    Pemanggilan | Nilai yang dikembalikan |
| -------------: | ----------------------: |
| `factorial(0)` |                     `1` |
| `factorial(1)` |             `1 * 1 = 1` |
| `factorial(2)` |             `2 * 1 = 2` |
| `factorial(3)` |             `3 * 2 = 6` |
| `factorial(4)` |            `4 * 6 = 24` |
| `factorial(5)` |          `5 * 24 = 120` |

Karena itu, `console.log(factorial(5))` mencetak:

```text
120
```

## Urutan proses rekursi

Kedua contoh memiliki kondisi dasar, tetapi pekerjaan yang dilakukan sebelum
dan sesudah pemanggilan rekursif berbeda:

- `countDown` mencetak angka **sebelum** memanggil dirinya lagi. Angka muncul
  dari `5` ke `1`.
- `factorial` menunggu hasil pemanggilan rekursif untuk menyelesaikan
  perkalian. Hasilnya dihitung saat pemanggilan kembali satu per satu.

Pemanggilan fungsi disimpan sementara di call stack. Setelah kondisi dasar
tercapai, pemanggilan-pemanggilan tersebut selesai secara berurutan.

## Kondisi input

Contoh ini mengasumsikan input berupa bilangan bulat nonnegatif:

- `countDown` berhenti jika nilainya mencapai tepat `0`.
- `factorial` memakai definisi faktorial untuk bilangan bulat nonnegatif.
- Input negatif tidak mencapai kondisi dasar yang ada pada kode dan dapat
  menyebabkan pemanggilan rekursif terus berlanjut hingga batas call stack.

## Kompleksitas

Untuk input nonnegatif `n`:

- `countDown`: **O(n)** waktu dan **O(n)** ruang call stack karena membuat
  sekitar `n + 1` pemanggilan.
- `factorial`: **O(n)** waktu dan **O(n)** ruang call stack karena membuat
  `n + 1` pemanggilan sampai kondisi dasar.

---
