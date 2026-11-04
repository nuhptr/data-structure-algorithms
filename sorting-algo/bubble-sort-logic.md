# Proses Pengurutan Bubble Sort

## Data awal

```text
arr = [4, 2, 6, 5, 1, 3]
arr.length = 6
```

Pada setiap putaran, bandingkan pasangan angka yang bersebelahan. Jika angka di
kiri lebih besar, tukar posisinya. Angka terbesar yang belum terurut akan
berpindah ke ujung kanan.

## Cara kerja dua perulangan

Kode menggunakan dua perulangan:

```ts
for (let index1 = arr.length - 1; index1 > 0; index1--) {
    for (let index2 = 0; index2 < index1; index2++) {
        // Bandingkan arr[index2] dengan arr[index2 + 1]
    }
}
```

- **Perulangan luar (`index1`)** menentukan batas kanan untuk putaran saat ini.
  Karena panjang array adalah `6`, nilai awalnya `arr.length - 1`, yaitu `5`.
  Nilai `index1` berkurang satu setiap putaran: `5, 4, 3, 2, 1`.
- **Perulangan dalam (`index2`)** selalu dimulai lagi dari `0`. Perulangan ini
  bergerak dari kiri ke kanan untuk membandingkan pasangan elemen yang
  bersebelahan: `arr[index2]` dan `arr[index2 + 1]`.
- Kondisi `index2 < index1` membuat perulangan dalam berhenti sebelum melewati
  batas putaran. Karena itu, nilai `index2` terakhir adalah `index1 - 1`.
  Elemen pada posisi `index1` tetap dapat dibandingkan sebagai elemen kanan
  pasangan terakhir.
- Setelah satu putaran selesai, angka terbesar yang belum terurut sudah berada
  di posisi `index1`. Putaran berikutnya tidak perlu memeriksa bagian kanan
  yang sudah terurut, sehingga perulangan dalam menjadi semakin pendek.

Nilai kedua indeks pada setiap putaran adalah:

| Putaran | `index1` | Nilai `index2`  | Posisi pasangan yang dibandingkan   |
| ------- | -------: | --------------- | ----------------------------------- |
| 1       |        5 | `0, 1, 2, 3, 4` | `(0,1), (1,2), (2,3), (3,4), (4,5)` |
| 2       |        4 | `0, 1, 2, 3`    | `(0,1), (1,2), (2,3), (3,4)`        |
| 3       |        3 | `0, 1, 2`       | `(0,1), (1,2), (2,3)`               |
| 4       |        2 | `0, 1`          | `(0,1), (1,2)`                      |
| 5       |        1 | `0`             | `(0,1)`                             |

Sebagai contoh, pada putaran kedua `index1` bernilai `4`. `index2` berjalan
dari `0` sampai `3`, jadi ada empat perbandingan. Perbandingan terakhir memakai
posisi `3` dan `4`. Posisi `5` tidak disentuh karena angka `6` di sana sudah
ditempatkan dengan benar pada putaran pertama.

## Putaran 1 (`index1 = 5`)

```text
index2 = 0, posisi (0, 1): [4, 2] -> 4 > 2, tukar  -> [2, 4, 6, 5, 1, 3]
index2 = 1, posisi (1, 2): [4, 6] -> 4 > 6, tidak  -> [2, 4, 6, 5, 1, 3]
index2 = 2, posisi (2, 3): [6, 5] -> 6 > 5, tukar  -> [2, 4, 5, 6, 1, 3]
index2 = 3, posisi (3, 4): [6, 1] -> 6 > 1, tukar  -> [2, 4, 5, 1, 6, 3]
index2 = 4, posisi (4, 5): [6, 3] -> 6 > 3, tukar  -> [2, 4, 5, 1, 3, 6]
```

Pada putaran ini `index2` mengambil nilai `0, 1, 2, 3, 4`. Angka `6` terus
bergerak satu posisi ke kanan setiap kali ditukar, sampai mencapai posisi `5`.
Angka terbesar, `6`, kini sudah berada di posisi paling akhir.

## Putaran 2 (`index1 = 4`)

Perulangan luar menurunkan batas dari `5` menjadi `4`. Perulangan dalam
**dimulai kembali dari `index2 = 0`**, tetapi sekarang hanya berjalan sampai
`index2 = 3`, karena syaratnya `index2 < index1` atau `index2 < 4`.

```text
index2 = 0, posisi (0, 1): [2, 4] -> 2 > 4, tidak  -> [2, 4, 5, 1, 3, 6]
index2 = 1, posisi (1, 2): [4, 5] -> 4 > 5, tidak  -> [2, 4, 5, 1, 3, 6]
index2 = 2, posisi (2, 3): [5, 1] -> 5 > 1, tukar  -> [2, 4, 1, 5, 3, 6]
index2 = 3, posisi (3, 4): [5, 3] -> 5 > 3, tukar  -> [2, 4, 1, 3, 5, 6]
```

Pada perbandingan terakhir, `index2` bernilai `3`, sehingga yang dibandingkan
adalah `arr[3]` dan `arr[4]` (angka `5` dan `3`). Setelah ditukar, angka `5`
berada pada posisi `4`, tepat sebelum `6`. Posisi `5` tidak diperiksa lagi
karena sudah terurut.

## Putaran 3 (`index1 = 3`)

```text
Bandingkan [2, 4]: tidak tukar        -> [2, 4, 1, 3, 5, 6]
Bandingkan [4, 1]: 4 > 1 (ya, tukar) -> [2, 1, 4, 3, 5, 6]
Bandingkan [4, 3]: 4 > 3 (ya, tukar) -> [2, 1, 3, 4, 5, 6]
```

Angka `4` kini berada pada posisi yang benar.

## Putaran 4 (`index1 = 2`)

```text
Bandingkan [2, 1]: 2 > 1 (ya, tukar) -> [1, 2, 3, 4, 5, 6]
Bandingkan [2, 3]: tidak tukar        -> [1, 2, 3, 4, 5, 6]
```

## Putaran 5 (`index1 = 1`)

```text
Bandingkan [1, 2]: tidak tukar -> [1, 2, 3, 4, 5, 6]
```

## Hasil akhir

```text
[1, 2, 3, 4, 5, 6]
```
