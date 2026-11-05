# Proses Pengurutan Bubble Sort

## Algoritma Berpikir

Tujuannya adalah mengurutkan angka dari kecil ke besar dengan membandingkan
pasangan yang berdampingan. Bayangkan ada batas antara bagian yang belum
terurut di kiri dan bagian yang sudah terurut di kanan.

1. **Mulai dari kiri.** Bandingkan `numbers[currentIndex]` dengan tetangga
   kanannya, `numbers[currentIndex + 1]`.
2. **Tentukan apakah perlu ditukar.** Jika angka kiri lebih besar, tukar agar
   pasangan menjadi urut menaik. Jika angka kiri lebih kecil atau sama,
   biarkan.
3. **Teruskan ke kanan.** Setelah setiap perbandingan, lanjutkan satu posisi.
   Angka besar yang ditemukan akan bergerak ke kanan setiap kali ditukar.
4. **Selesaikan satu putaran.** Angka terbesar di bagian yang belum terurut
   akhirnya sampai di batas kanan, sehingga posisinya sudah benar.
5. **Perkecil area pemeriksaan.** Geser batas kanan satu posisi ke kiri karena
   elemen di kanannya sudah terurut. Mulai lagi dari kiri.
6. **Berhenti saat batas mencapai posisi pertama.** Semua pasangan yang perlu
   diperiksa sudah diproses.

Contoh satu perbandingan:

```text
[4, 2] -> 4 > 2, tukar -> [2, 4]
[2, 4] -> 2 > 4 salah, biarkan -> [2, 4]
```

```text
Dengan demikian, nilai besar bergerak ke kanan, sementara nilai kecil dapat
bergerak ke kiri melalui beberapa pertukaran.
```

## Data awal

```text
numbers = [4, 2, 6, 5, 1, 3]
numbers.length = 6
```

Pada setiap putaran, bandingkan pasangan angka yang bersebelahan. Jika angka di
kiri lebih besar, tukar posisinya. Angka terbesar yang belum terurut akan
berpindah ke ujung kanan.

## Cara kerja dua perulangan

Kode menggunakan dua perulangan:

```ts
for (let endIndex = numbers.length - 1; endIndex > 0; endIndex--) {
    for (let currentIndex = 0; currentIndex < endIndex; currentIndex++) {
        // Bandingkan numbers[currentIndex] dengan numbers[currentIndex + 1]
    }
}
```

- **Perulangan luar (`endIndex`)** menentukan batas kanan untuk putaran
  saat ini.
  Karena panjang array adalah `6`, nilai awalnya `numbers.length - 1`, yaitu `5`.
  Nilai `endIndex` berkurang satu setiap putaran: `5, 4, 3, 2, 1`.
- **Perulangan dalam (`currentIndex`)** selalu dimulai lagi dari `0`. Perulangan ini
  bergerak dari kiri ke kanan untuk membandingkan pasangan elemen yang
  bersebelahan: `numbers[currentIndex]` dan `numbers[currentIndex + 1]`.
- Kondisi `currentIndex < endIndex` membuat perulangan dalam berhenti sebelum
  melewati batas putaran. Karena itu, nilai `currentIndex` terakhir adalah
  `endIndex - 1`. Elemen pada posisi `endIndex` tetap dapat dibandingkan
  sebagai elemen kanan pasangan terakhir.
- Setelah satu putaran selesai, angka terbesar yang belum terurut sudah berada
  di posisi `endIndex`. Putaran berikutnya tidak perlu memeriksa bagian kanan
  yang sudah terurut, sehingga perulangan dalam menjadi semakin pendek.

Nilai kedua indeks pada setiap putaran adalah:

| Putaran | `endIndex` | Nilai `currentIndex` | Posisi pasangan yang dibandingkan   |
| ------- | ---------: | -------------------- | ----------------------------------- |
| 1       |          5 | `0, 1, 2, 3, 4`      | `(0,1), (1,2), (2,3), (3,4), (4,5)` |
| 2       |          4 | `0, 1, 2, 3`         | `(0,1), (1,2), (2,3), (3,4)`        |
| 3       |          3 | `0, 1, 2`            | `(0,1), (1,2), (2,3)`               |
| 4       |          2 | `0, 1`               | `(0,1), (1,2)`                      |
| 5       |          1 | `0`                  | `(0,1)`                             |

Sebagai contoh, pada putaran kedua `endIndex` bernilai `4`. `currentIndex`
berjalan dari `0` sampai `3`, jadi ada empat perbandingan. Perbandingan terakhir
memakai posisi `3` dan `4`. Posisi `5` tidak disentuh karena angka `6` di sana
sudah ditempatkan dengan benar pada putaran pertama.

## Putaran 1 (`endIndex = 5`)

```text
currentIndex = 0, posisi (0, 1): [4, 2] -> 4 > 2, tukar  -> [2, 4, 6, 5, 1, 3]
currentIndex = 1, posisi (1, 2): [4, 6] -> 4 > 6, tidak  -> [2, 4, 6, 5, 1, 3]
currentIndex = 2, posisi (2, 3): [6, 5] -> 6 > 5, tukar  -> [2, 4, 5, 6, 1, 3]
currentIndex = 3, posisi (3, 4): [6, 1] -> 6 > 1, tukar  -> [2, 4, 5, 1, 6, 3]
currentIndex = 4, posisi (4, 5): [6, 3] -> 6 > 3, tukar  -> [2, 4, 5, 1, 3, 6]
```

Pada putaran ini `currentIndex` mengambil nilai `0, 1, 2, 3, 4`. Angka `6` terus
bergerak satu posisi ke kanan setiap kali ditukar, sampai mencapai posisi `5`.
Angka terbesar, `6`, kini sudah berada di posisi paling akhir.

## Putaran 2 (`endIndex = 4`)

Perulangan luar menurunkan batas dari `5` menjadi `4`. Perulangan dalam
**dimulai kembali dari `currentIndex = 0`**, tetapi sekarang hanya berjalan
sampai `currentIndex = 3`, karena syaratnya `currentIndex < endIndex` atau
`currentIndex < 4`.

```text
currentIndex = 0, posisi (0, 1): [2, 4] -> 2 > 4, tidak  -> [2, 4, 5, 1, 3, 6]
currentIndex = 1, posisi (1, 2): [4, 5] -> 4 > 5, tidak  -> [2, 4, 5, 1, 3, 6]
currentIndex = 2, posisi (2, 3): [5, 1] -> 5 > 1, tukar  -> [2, 4, 1, 5, 3, 6]
currentIndex = 3, posisi (3, 4): [5, 3] -> 5 > 3, tukar  -> [2, 4, 1, 3, 5, 6]
```

Pada perbandingan terakhir, `currentIndex` bernilai `3`, sehingga yang
dibandingkan adalah `numbers[3]` dan `numbers[4]` (angka `5` dan `3`). Setelah
ditukar, angka `5` berada pada posisi `4`, tepat sebelum `6`. Posisi `5` tidak
diperiksa lagi karena sudah terurut.

## Putaran 3 (`endIndex = 3`)

```text
Bandingkan [2, 4]: tidak tukar        -> [2, 4, 1, 3, 5, 6]
Bandingkan [4, 1]: 4 > 1 (ya, tukar) -> [2, 1, 4, 3, 5, 6]
Bandingkan [4, 3]: 4 > 3 (ya, tukar) -> [2, 1, 3, 4, 5, 6]
```

Angka `4` kini berada pada posisi yang benar.

## Putaran 4 (`endIndex = 2`)

```text
Bandingkan [2, 1]: 2 > 1 (ya, tukar) -> [1, 2, 3, 4, 5, 6]
Bandingkan [2, 3]: tidak tukar        -> [1, 2, 3, 4, 5, 6]
```

## Putaran 5 (`endIndex = 1`)

```text
Bandingkan [1, 2]: tidak tukar -> [1, 2, 3, 4, 5, 6]
```

## Hasil akhir

```text
[1, 2, 3, 4, 5, 6]
```
