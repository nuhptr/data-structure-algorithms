# Alur `wordCounter`

`wordCounter` menghitung frekuensi kata. Alurnya mengikuti diagram: ubah teks
menjadi lowercase, ambil token non-spasi, lalu hitung setiap token di `wordMap`.

## Proses

1. `Object.create(null)` membuat map hasil tanpa prototype.
2. `text.toLowerCase().match(/\S+/g)` mengubah teks menjadi lowercase dan
   mengambil rangkaian karakter non-spasi. Tanda baca tetap menjadi bagian token.
3. Untuk setiap token, `(wordMap[word] ?? 0) + 1` menambahkan hitungannya.
4. Fungsi mengembalikan `wordMap`.

Jika input kosong atau hanya spasi, `match()` menghasilkan `null`; `?? []`
mengubahnya menjadi daftar kosong sehingga hasilnya tetap objek kosong.

## Pelacakan contoh dari kode

Input:

```text
Hello my name name name is anmastery
```

Hasil lowercase dan token:

```text
hello my name name name is anmastery
["hello", "my", "name", "name", "name", "is", "anmastery"]
```

Hitungan kata berulang:

| Token | Sebelum | Sesudah |
| ----- | ------: | ------: |
| `hello` | 0 | 1 |
| `my` | 0 | 1 |
| `name` | 0 | 1 |
| `name` | 1 | 2 |
| `name` | 2 | 3 |
| `is` | 0 | 1 |
| `anmastery` | 0 | 1 |

Map akhir secara logis:

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

Kode hanya mencetak `wordCounts`. Hasilnya setara dengan:

```text
[Object: null prototype] {
  hello: 1,
  my: 1,
  name: 3,
  is: 1,
  anmastery: 1
}
```

Label dan format object dapat berbeda di console/runtime lain.

## Hubungan dengan contoh diagram

Diagram menggunakan teks `"Halo nama saya anmastery, Halo!"`. Setelah lowercase
dan tokenisasi, hasilnya:

```text
["halo", "nama", "saya", "anmastery,", "halo!"]
```

Karena tanda baca tidak dihapus, `"anmastery,"` dan `"halo!"` menjadi token
tersendiri; `"halo"` dan `"halo!"` juga dihitung berbeda.

## Kompleksitas

- **Waktu: O(n)** untuk normalisasi, tokenisasi, dan penghitungan; `n` adalah
  panjang teks.
- **Ruang: O(n)** untuk daftar token dan map frekuensi.
