# Merge Sort: Cara Kerjanya

Merge sort mengurutkan array dengan pendekatan **bagi dan taklukkan**: array
dibagi menjadi bagian yang lebih kecil sampai tiap bagian hanya memiliki satu
elemen, lalu bagian-bagian tersebut digabungkan kembali dalam urutan menaik.

## Algoritma Berpikir

Bayangkan prosesnya sebagai dua tahap:

- **Membagi:** pecah array menjadi dua bagian, lalu lakukan hal yang sama pada
  setiap bagian. Array dengan nol atau satu elemen sudah terurut.
- **Menggabungkan:** bandingkan elemen terdepan dari dua bagian yang sudah
  terurut. Pindahkan nilai yang lebih kecil ke hasil, lalu lanjutkan sampai
  semua nilai tergabung.

Langkah-langkahnya:

1. Jika panjang array `values` paling banyak `1`, kembalikan array itu karena
   sudah terurut.
2. Hitung `middleIndex`, lalu bagi array dengan `slice` menjadi bagian kiri dan
   kanan.
3. Urutkan masing-masing bagian dengan memanggil `mergeSort` kembali.
4. Gabungkan kedua bagian terurut tersebut menggunakan `merge`.
5. Di dalam `merge`, gunakan `leftIndex` dan `rightIndex` untuk melacak nilai
   berikutnya yang belum diambil dari setiap bagian.
6. Masukkan nilai yang lebih kecil ke `result`, lalu majukan indeks bagian
   tersebut.
7. Setelah salah satu bagian habis, tambahkan sisa elemen dari kedua bagian ke
   hasil. Sisa itu sudah terurut.

## Data awal

Contoh kode mengurutkan angka berikut:

```text
Indeks:  0   1   2  3  4   5   6
Nilai:  [38, 27, 43, 3, 9, 82, 10]
```

`mergeSort` menggunakan `slice`, sehingga pembagian tidak mengubah array input.
Setiap tahap penggabungan menghasilkan array baru.

## Arti variabel

- `values` adalah bagian array yang sedang diurutkan.
- `middleIndex` adalah posisi tengah yang memisahkan `values` menjadi dua.
- `left` dan `right` adalah dua bagian yang sudah diurutkan dan akan digabung.
- `result` menampung elemen hasil penggabungan.
- `leftIndex` menunjuk elemen berikutnya yang belum diambil dari `left`.
- `rightIndex` menunjuk elemen berikutnya yang belum diambil dari `right`.

## Proses pembagian

Untuk input contoh, pemanggilan rekursif membagi array sebagai berikut:

```text
[38, 27, 43, 3, 9, 82, 10]
├── [38, 27, 43]
│   ├── [38]
│   └── [27, 43]
│       ├── [27]
│       └── [43]
└── [3, 9, 82, 10]
    ├── [3, 9]
    │   ├── [3]
    │   └── [9]
    └── [82, 10]
        ├── [82]
        └── [10]
```

Pembagian berhenti ketika setiap bagian memiliki satu elemen. Elemen tunggal
dianggap sudah terurut, lalu proses berbalik untuk menggabungkan bagian-bagian.

## Contoh penggabungan

Pertama, bagian `[27]` dan `[43]` digabungkan menjadi `[27, 43]`. Berikutnya,
`[38]` digabungkan dengan `[27, 43]`:

| Nilai yang dibandingkan | Nilai yang dimasukkan ke `result`  | `result`       |
| ----------------------- | ---------------------------------- | -------------- |
| `38` dan `27`           | `27` dari `right`                  | `[27]`         |
| `38` dan `43`           | `38` dari `left`                   | `[27, 38]`     |
| `left` habis            | Tambahkan sisa `right`, yaitu `43` | `[27, 38, 43]` |

Bagian kanan input juga digabungkan secara rekursif:

```text
[3] dan [9]   -> [3, 9]
[82] dan [10] -> [10, 82]
[3, 9] dan [10, 82] -> [3, 9, 10, 82]
```

## Penggabungan terakhir

Pada tahap terakhir, `merge` menerima dua bagian terurut:

```text
left  = [27, 38, 43]
right = [3, 9, 10, 82]
```

Perbandingan dilakukan dari elemen terdepan yang belum dipakai:

| Perbandingan  | Nilai yang dipilih                 | `result` setelah ditambahkan |
| ------------- | ---------------------------------- | ---------------------------- |
| `27` dan `3`  | `3` dari `right`                   | `[3]`                        |
| `27` dan `9`  | `9` dari `right`                   | `[3, 9]`                     |
| `27` dan `10` | `10` dari `right`                  | `[3, 9, 10]`                 |
| `27` dan `82` | `27` dari `left`                   | `[3, 9, 10, 27]`             |
| `38` dan `82` | `38` dari `left`                   | `[3, 9, 10, 27, 38]`         |
| `43` dan `82` | `43` dari `left`                   | `[3, 9, 10, 27, 38, 43]`     |
| `left` habis  | Tambahkan sisa `right`, yaitu `82` | `[3, 9, 10, 27, 38, 43, 82]` |

Ketika `left` habis, nilai `82` tidak perlu dibandingkan lagi. Sisa dari tiap
bagian sudah terurut, sehingga `concat` menambahkan sisa `left` dan `right`
langsung ke `result`.

## Hasil kode

Fungsi menghasilkan array baru dan tidak mengubah `unsortedArray`. Untuk contoh
input, `sortedArray` berisi:

```text
[3, 9, 10, 27, 38, 43, 82]
```

`console.log(sortedArray)` menampilkan array terurut tersebut.

## Kompleksitas

- Waktu: **O(n log n)**, karena array dibagi sekitar `log n` tingkat dan setiap
  tingkat menggabungkan total `n` elemen.
- Ruang tambahan: **O(n)** untuk array-array hasil pembagian dan penggabungan,
  serta **O(log n)** ruang stack untuk pemanggilan rekursif.

---
