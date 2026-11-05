# Selection Sort: Cara Kerjanya

Selection sort mengurutkan array dari kiri ke kanan. Di setiap putaran, algoritma
mencari angka terkecil di bagian yang belum terurut, lalu menaruhnya di posisi
kiri berikutnya.

## Algoritma Berpikir

Bayangkan array terbagi menjadi dua bagian:

- **Bagian kiri:** angka yang sudah ditempatkan pada posisi benar.
- **Bagian kanan:** angka yang masih harus diperiksa.

Pada setiap putaran:

1. Ambil posisi pertama dari bagian kanan. Posisi ini disebut `index`.
2. Anggap nilai di posisi `index` sebagai yang terkecil sementara. Posisi
   minimum ini disimpan di `minIndex`.
3. Periksa semua nilai setelahnya satu per satu menggunakan `index2`.
4. Jika ditemukan nilai yang lebih kecil dari `arr[minIndex]`, pindahkan
   penunjuk `minIndex` ke posisi nilai tersebut.
5. Setelah semua nilai di bagian kanan diperiksa, tukar nilai minimum ke posisi
   `index`. Jika minimum sudah berada di `index`, tidak perlu menukar.
6. Geser batas bagian kiri satu posisi ke kanan dan ulangi. Berhenti setelah
   setiap posisi mendapat nilai terkecil berikutnya.

Contoh putaran pertama pada `[4, 2, 6, 5, 1, 3]`:

```text
Mulai:             [4, 2, 6, 5, 1, 3]
Minimum sementara: **4**
Bandingkan 2:      2 lebih kecil dari 4 -> minimum menjadi 2
Bandingkan 6, 5:   tidak lebih kecil dari 2
Bandingkan 1:      1 lebih kecil dari 2 -> minimum menjadi 1
Bandingkan 3:      tidak lebih kecil dari 1
Tukar 4 dengan 1:  [1, 2, 6, 5, 4, 3]
```

Setelah putaran pertama, posisi `0` sudah benar dan tidak diperiksa lagi.
Putaran kedua mencari minimum mulai dari posisi `1`, lalu proses berlanjut
sampai array terurut.

Contoh input:

```text
Indeks:  0  1  2  3  4  5
Nilai:  [4, 2, 6, 5, 1, 3]
```

Indeks dimulai dari `0`. Jadi `arr[0]` adalah `4`, `arr[1]` adalah `2`, dan
seterusnya.

## Arti variabel indeks

- `index` adalah posisi yang sedang diisi dengan angka terkecil berikutnya.
- `minIndex` adalah posisi angka terkecil yang ditemukan sejauh ini.
- `index2` memeriksa angka-angka di bagian yang belum terurut.

Contoh: ketika `index = 0`, seluruh array belum terurut. Ketika `index = 1`,
posisi `0` sudah benar dan pencarian dimulai dari posisi `1`.

## Telusuri putaran pertama

Awalnya `index = 0`. Kode menetapkan `minIndex = 0`, jadi angka terkecil
sementara adalah `arr[0]`, yaitu `4`.

Perulangan dalam lalu memeriksa angka satu per satu:

| `index2` | Angka yang diperiksa | Dibandingkan dengan minimum | Hasil                     |
| -------: | -------------------- | --------------------------- | ------------------------- |
|        0 | `4`                  | `4 < 4`                     | Tidak; `minIndex` tetap 0 |
|        1 | `2`                  | `2 < 4`                     | Ya; `minIndex` menjadi 1  |
|        2 | `6`                  | `6 < 2`                     | Tidak; tetap 1            |
|        3 | `5`                  | `5 < 2`                     | Tidak; tetap 1            |
|        4 | `1`                  | `1 < 2`                     | Ya; `minIndex` menjadi 4  |
|        5 | `3`                  | `3 < 1`                     | Tidak; tetap 4            |

Pencarian selesai. Angka terkecil adalah `1` di indeks `4`. Karena `index`
(`0`) berbeda dari `minIndex` (`4`), keduanya ditukar:

```text
Sebelum: [4, 2, 6, 5, 1, 3]
Tukar indeks 0 dan 4
Sesudah: [1, 2, 6, 5, 4, 3]
```

Pertukaran memakai `temp` agar angka `4` tidak hilang:

```text
temp = 4
arr[0] = 1
arr[4] = temp  // 4
```

Sekarang angka terkecil sudah berada di posisi yang benar.

## Putaran berikutnya

`index` bergerak satu posisi ke kanan. Bagian di kiri `index` tidak perlu
diperiksa lagi karena sudah terurut.

| `index` | Bagian yang diperiksa | Minimum dan posisinya | Tindakan                                          | Array setelah putaran |
| ------: | --------------------- | --------------------- | ------------------------------------------------- | --------------------- |
|       0 | `[4, 2, 6, 5, 1, 3]`  | `1`, indeks 4         | Tukar indeks 0 dan 4                              | `[1, 2, 6, 5, 4, 3]`  |
|       1 | `[2, 6, 5, 4, 3]`     | `2`, indeks 1         | Tidak perlu menukar                               | `[1, 2, 6, 5, 4, 3]`  |
|       2 | `[6, 5, 4, 3]`        | `3`, indeks 5         | Tukar indeks 2 dan 5                              | `[1, 2, 3, 5, 4, 6]`  |
|       3 | `[5, 4, 6]`           | `4`, indeks 4         | Tukar indeks 3 dan 4                              | `[1, 2, 3, 4, 5, 6]`  |
|       4 | `[5, 6]`              | `5`, indeks 4         | Tidak perlu menukar                               | `[1, 2, 3, 4, 5, 6]`  |
|       5 | `[6]`                 | `6`, indeks 5         | Membandingkan nilai dengan dirinya; tidak menukar | `[1, 2, 3, 4, 5, 6]`  |

Setelah setiap putaran, bagian kiri array bertambah satu posisi dan sudah
terurut. Putaran terakhir tidak mengubah array karena tersisa satu elemen.

## Hasil kode

Fungsi menukar nilai langsung di array `myArr` (in-place), lalu
mengembalikan array tersebut. Karena itu:

```text
res = [1, 2, 3, 4, 5, 6]
```

`console.log(res)` menampilkan:

```text
[1, 2, 3, 4, 5, 6]
```

## Kompleksitas

- Waktu: **O(n²)**, karena setiap putaran memeriksa bagian array yang tersisa.
- Ruang tambahan: **O(1)**, karena pengurutan dilakukan pada array yang sama.

---
