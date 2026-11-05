# Insertion Sort: Cara Kerjanya

Insertion sort mengurutkan array dari kiri ke kanan. Di setiap langkah, algoritma
mengambil satu nilai dari bagian yang belum diproses, lalu menyisipkannya pada
posisi yang tepat di bagian kiri yang sudah terurut.

## Algoritma Berpikir

Bayangkan array terbagi menjadi dua bagian:

- **Bagian kiri:** elemen yang sudah terurut.
- **Bagian kanan:** elemen yang belum diproses.

Pada setiap langkah:

1. Mulai dari elemen kedua. Elemen pertama dianggap sudah terurut.
2. Simpan nilai yang akan disisipkan di `currentValue`.
3. Periksa elemen di sebelah kirinya menggunakan `previousIndex`.
4. Selama elemen sebelumnya lebih besar dari `currentValue`, geser elemen itu
   satu posisi ke kanan.
5. Setelah menemukan posisi yang tepat, tempatkan `currentValue` pada satu
   posisi setelah `previousIndex`.
6. Ulangi sampai semua elemen diproses.

Contoh menyisipkan `2` ke bagian terurut `[5]`:

```text
Simpan 2:             [5, 2, 4, 6, 1, 3]
Geser 5 ke kanan:     [5, 5, 4, 6, 1, 3]
Sisipkan 2 di indeks 0:
                      [2, 5, 4, 6, 1, 3]
```

Setelah langkah ini, bagian kiri `[2, 5]` sudah terurut. Selanjutnya algoritma
mengambil `4` dan menyisipkannya ke bagian yang sudah terurut itu.

## Data awal

Contoh kode menggunakan array berikut:

```text
Indeks:  0  1  2  3  4  5
Nilai:  [5, 2, 4, 6, 1, 3]
```

Indeks dimulai dari `0`. Jadi `arr[0]` adalah `5`, `arr[1]` adalah `2`, dan
seterusnya.

## Arti variabel

- `arr` adalah array yang sedang diurutkan. Perubahannya dilakukan langsung
  pada array yang sama.
- `currentIndex` menunjukkan elemen yang akan dimasukkan ke bagian kiri yang
  sudah terurut. Perulangan dimulai dari `1`, karena elemen pada indeks `0`
  dianggap sudah terurut.
- `currentValue` menyimpan nilai yang sedang disisipkan agar nilainya tidak
  hilang saat elemen lain digeser.
- `previousIndex` bergerak ke kiri untuk membandingkan elemen terurut dengan
  `currentValue`.

## Telusuri penyisipan pertama

Pada awalnya `currentIndex = 1`, sehingga `currentValue = arr[1]`, yaitu `2`.
`previousIndex` dimulai dari `0` dan menunjuk ke angka `5`.

| `previousIndex` | Nilai yang diperiksa | Perbandingan dengan `2`   | Tindakan                 |
| --------------: | -------------------- | ------------------------- | ------------------------ |
|               0 | `5`                  | `5 > 2`                   | Geser `5` ke indeks 1    |
|              -1 | Tidak ada            | Batas awal array tercapai | Sisipkan `2` di indeks 0 |

Setelah penyisipan:

```text
Sebelum:  [5, 2, 4, 6, 1, 3]
Sesudah:  [2, 5, 4, 6, 1, 3]
```

Ketika `previousIndex` menjadi `-1`, kondisi `previousIndex >= 0` menghentikan
perulangan `while`. Nilai disisipkan pada `arr[previousIndex + 1]`, yaitu
`arr[0]`.

## Proses setiap langkah

| `currentIndex` | `currentValue` | Bagian terurut sebelum penyisipan | Tindakan                                               | Array setelah penyisipan |
| -------------: | -------------: | --------------------------------- | ------------------------------------------------------ | ------------------------ |
|              1 |            `2` | `[5]`                             | Geser `5`; sisipkan `2` di indeks 0                    | `[2, 5, 4, 6, 1, 3]`     |
|              2 |            `4` | `[2, 5]`                          | Geser `5`; sisipkan `4` di indeks 1                    | `[2, 4, 5, 6, 1, 3]`     |
|              3 |            `6` | `[2, 4, 5]`                       | Tidak ada elemen yang perlu digeser                    | `[2, 4, 5, 6, 1, 3]`     |
|              4 |            `1` | `[2, 4, 5, 6]`                    | Geser `6`, `5`, `4`, dan `2`; sisipkan `1` di indeks 0 | `[1, 2, 4, 5, 6, 3]`     |
|              5 |            `3` | `[1, 2, 4, 5, 6]`                 | Geser `6`, `5`, dan `4`; sisipkan `3` di indeks 2      | `[1, 2, 3, 4, 5, 6]`     |

Setiap kali satu langkah selesai, bagian dari indeks `0` sampai
`currentIndex` sudah terurut. Karena itu, langkah berikutnya hanya perlu
menyisipkan nilai berikutnya ke bagian kiri tersebut.

## Cara kerja pergeseran

Misalnya, saat `currentValue` bernilai `3`, bagian terurutnya adalah
`[1, 2, 4, 5, 6]`. Perulangan `while` memeriksa dari kanan ke kiri:

```text
6 > 3 -> geser 6 ke kanan
5 > 3 -> geser 5 ke kanan
4 > 3 -> geser 4 ke kanan
2 > 3 salah -> berhenti
```

Setelah `previousIndex` berhenti di indeks `1`, nilai disisipkan ke
`arr[previousIndex + 1]`, yaitu indeks `2`:

```text
Sebelum: [1, 2, 4, 5, 6, 3]
Sesudah: [1, 2, 3, 4, 5, 6]
```

Nilai `currentValue` disimpan sebelum pergeseran karena beberapa posisi array
akan ditimpa ketika elemen yang lebih besar digeser ke kanan.

## Hasil kode

Fungsi mengubah array masukan secara langsung (_in-place_), lalu mengembalikan
referensi array yang sama. Untuk contoh ini, hasilnya:

```text
[1, 2, 3, 4, 5, 6]
```

`console.log(sortedArray)` menampilkan array yang sudah terurut tersebut.

## Kompleksitas

- Waktu terbaik: **O(n)** jika array sudah terurut, karena setiap nilai hanya
  perlu satu perbandingan.
- Waktu rata-rata dan terburuk: **O(n²)**, karena satu nilai dapat dibandingkan
  dan digeser melewati banyak elemen sebelumnya.
- Ruang tambahan: **O(1)**, karena pengurutan dilakukan pada array yang sama.

---
