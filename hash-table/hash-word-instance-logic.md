# Alur `wordCounter`

`wordCounter` menerima teks dan mengembalikan objek yang mencatat berapa kali
setiap token muncul. Kapitalisasi disamakan, tetapi tanda baca tidak dihapus.

## Algoritma Berpikir

Bayangkan map sebagai buku catatan: setiap kata menjadi entri, dan nilainya
menyimpan berapa kali kata itu sudah ditemukan.

1. **Samakan bentuk teks.** Ubah semuanya menjadi lowercase supaya `"Hello"`
   dan `"hello"` dianggap kata yang sama.
2. **Ambil kata satu per satu.** Pisahkan berdasarkan spasi. Jangan hapus tanda
   baca, karena kode mempertahankannya sebagai bagian token.
3. **Perbarui penghitung.** Jika kata belum ada, mulai dari `0`; lalu tambah
   `1`. Jika sudah ada, tambah `1` ke hitungan sebelumnya.
4. **Ulangi sampai token terakhir.** Setelah selesai, map berisi frekuensi
   seluruh kata.

Contoh untuk token `"name"` yang muncul tiga kali:

```text
Pertama:  name belum ada -> (0 ?? 0) + 1 = 1
Kedua:    name sudah 1   -> (1 ?? 0) + 1 = 2
Ketiga:   name sudah 2   -> (2 ?? 0) + 1 = 3
```

Jadi, hasil akhirnya menyimpan `name: 3`. Kata lain pada contoh masing-masing
muncul sekali, sehingga nilainya `1`.

## Langkah pemrosesan

1. Buat `wordMap` dengan `Object.create(null)`. Objek tanpa prototype ini aman
   untuk token yang namanya sama dengan properti bawaan objek, misalnya
   `"__proto__"`.
2. Jalankan `text.toLowerCase()` agar `"Hello"` dan `"hello"` menjadi token
   yang sama.
3. Jalankan `.match(/\S+/g)` untuk mengambil semua rangkaian karakter non-spasi.
   Beberapa spasi berurutan hanya menjadi pemisah; tanda baca tetap menempel
   pada token.
4. Jika tidak ada token, `.match()` menghasilkan `null`; `?? []` menggantinya
   dengan array kosong.
5. Untuk setiap token, hitung `(wordMap[word] ?? 0) + 1`. Token baru mulai dari
   `0`, lalu langsung menjadi `1`; token yang sudah ada bertambah satu.
6. Kembalikan `wordMap`.

## Contoh sesuai kode

Input yang digunakan:

```text
Hello my name name name is anmastery
```

Setelah lowercase:

```text
hello my name name name is anmastery
```

Setelah `.match(/\S+/g)`:

```text
["hello", "my", "name", "name", "name", "is", "anmastery"]
```

`wordMap` awalnya `{}`. Loop lalu memperbaruinya satu token setiap iterasi:

| Iterasi | Token         | Hitungan sebelum → sesudah | `wordMap` setelah iterasi                           |
| ------: | ------------- | -------------------------: | --------------------------------------------------- |
|       1 | `"hello"`     |                    `0 → 1` | `{ hello: 1 }`                                      |
|       2 | `"my"`        |                    `0 → 1` | `{ hello: 1, my: 1 }`                               |
|       3 | `"name"`      |                    `0 → 1` | `{ hello: 1, my: 1, name: 1 }`                      |
|       4 | `"name"`      |                    `1 → 2` | `{ hello: 1, my: 1, name: 2 }`                      |
|       5 | `"name"`      |                    `2 → 3` | `{ hello: 1, my: 1, name: 3 }`                      |
|       6 | `"is"`        |                    `0 → 1` | `{ hello: 1, my: 1, name: 3, is: 1 }`               |
|       7 | `"anmastery"` |                    `0 → 1` | `{ hello: 1, my: 1, name: 3, is: 1, anmastery: 1 }` |

Hasil akhirnya:

```text
{
  hello: 1,
  my: 1,
  name: 3,
  is: 1,
  anmastery: 1
}
```

## Hasil `console.log`

Kode menjalankan `console.log(wordCounts)`. Isinya setara dengan:

```text
[Object: null prototype] {
  hello: 1,
  my: 1,
  name: 3,
  is: 1,
  anmastery: 1
}
```

Label dan format object dapat berbeda antar-console/runtime; nilai hitungannya
tetap sama.

## Contoh diagram dan tanda baca

Untuk input diagram:

```text
Halo nama saya anmastery, Halo!
```

Normalisasi dan ekstraksi token menghasilkan:

```text
"halo nama saya anmastery, halo!"
["halo", "nama", "saya", "anmastery,", "halo!"]
```

Hasil hitungannya:

```text
{
  halo: 1,
  nama: 1,
  saya: 1,
  "anmastery,": 1,
  "halo!": 1
}
```

`"Halo"` pada input akan dihitung sebagai `"halo"` setelah lowercase, tetapi
`"Halo!"` menjadi token `"halo!"` dan dihitung terpisah karena tanda baca tidak
dihapus.

## Kasus khusus dan kompleksitas

- Teks kosong atau hanya whitespace menghasilkan `{}`.
- Token `"__proto__"` dapat disimpan sebagai kata biasa karena `wordMap` tidak
  mewarisi prototype objek.
- **Waktu: O(n)** untuk teks sepanjang `n`, mencakup normalisasi, ekstraksi, dan
  penghitungan token.
- **Ruang: O(n)** untuk daftar token dan hasil hitungan.
