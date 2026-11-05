# Alur Kerja `MyArray`

Dokumen ini menjelaskan alur pada `custom-array.ts` menggunakan contoh yang
sama dengan diagram: membuat array string, menambahkan tiga elemen, menghapus
elemen pada indeks `1`, lalu membaca elemen pada indeks `0`.

## Struktur penyimpanan

`MyArray<T>` menyimpan dua properti:

- `length` mencatat jumlah elemen yang tersimpan.
- `data` menyimpan nilai berdasarkan indeks. Indeks dimulai dari `0`.

Pada contoh ini, `T` adalah `string`, sehingga nilai yang dimasukkan harus
berupa teks.

## Algoritma Berpikir

1. **Tambahkan di posisi kosong berikutnya:** gunakan `length` sebagai indeks,
   simpan nilai di sana, lalu naikkan `length`.
2. **Periksa indeks sebelum menghapus:** indeks harus integer, tidak negatif,
   dan lebih kecil dari `length`.
3. **Jaga urutan setelah penghapusan:** simpan nilai yang dihapus, geser elemen
   di kanannya satu posisi ke kiri, kemudian hapus slot terakhir dan kurangi
   `length`.
4. **Baca tanpa mengubah:** `get(index)` hanya mengambil nilai dari `data`.

## 1. Membuat array

```ts
const myNewArray = new MyArray<string>()
```

Pemanggilan `new MyArray<string>()` menjalankan `constructor`. Constructor
menyiapkan array kosong:

```text
length = 0
data = {}
```

Belum ada indeks atau nilai di dalam `data`.

## 2. Menambahkan elemen dengan `push`

Method `push` menyimpan nilai pada indeks yang sama dengan `length`, lalu
menaikkan `length` satu angka. Dengan demikian, nilai baru selalu diletakkan
di posisi berikutnya yang kosong.

### Menambahkan `"one"`

```ts
myNewArray.push("one")
```

Sebelum penambahan, `length` bernilai `0`. Nilai `"one"` disimpan pada
`data[0]`, kemudian `length` bertambah menjadi `1`.

```text
length = 1
data = {
  0: "one"
}
```

`push` mengembalikan nilai `length` setelah diperbarui, yaitu `1`. Pada contoh
ini nilai baliknya tidak disimpan.

### Menambahkan `"two"`

```ts
myNewArray.push("two")
```

Karena `length` saat ini `1`, `"two"` disimpan pada `data[1]`. Setelah itu,
`length` menjadi `2`.

```text
length = 2
data = {
  0: "one",
  1: "two"
}
```

### Menambahkan `"three"`

```ts
myNewArray.push("three")
```

`length` saat ini `2`, jadi `"three"` disimpan pada `data[2]`. `length`
kemudian bertambah menjadi `3`.

```text
length = 3
data = {
  0: "one",
  1: "two",
  2: "three"
}
```

Sampai tahap ini, posisi elemen adalah:

| Indeks | Nilai     |
| -----: | --------- |
|      0 | `"one"`   |
|      1 | `"two"`   |
|      2 | `"three"` |

## 3. Menghapus elemen pada indeks `1`

```ts
myNewArray.delete(1)
```

Method `delete` lebih dahulu memeriksa apakah indeks valid. Indeks harus
berupa bilangan bulat, tidak boleh negatif, dan harus lebih kecil daripada
`length`.

Untuk pemanggilan `delete(1)`:

```text
Number.isInteger(1) -> true
1 < 0                -> false
1 >= length (3)      -> false
```

Semua pemeriksaan lolos, sehingga method memanggil `removeAt(1)`.

### Mengambil nilai yang akan dihapus

`removeAt` mengambil nilai pada indeks tersebut sebelum menggeser data:

```text
item = data[1] = "two"
```

Nilai ini disimpan agar dapat dikembalikan setelah penghapusan selesai.

### Menggeser elemen di sebelah kanan ke kiri

Perulangan dimulai dari `i = index`, yaitu `1`, dan berjalan selama
`i < length - 1`. Karena `length` masih `3`, batasnya adalah `2`.

| Nilai `i` | Pemeriksaan   | Tindakan                                           | Isi `data` setelah tindakan            |
| --------: | ------------- | -------------------------------------------------- | -------------------------------------- |
|         1 | `1 < 2` benar | `data[1] = data[2]`, salin `"three"` ke indeks `1` | `{ 0: "one", 1: "three", 2: "three" }` |
|         2 | `2 < 2` salah | Perulangan berhenti                                | Tidak berubah                          |

Nilai pada indeks `1` sekarang `"three"`. Untuk sesaat, `"three"` juga masih
ada di indeks `2`; langkah berikutnya menghapus posisi terakhir tersebut.

### Menghapus posisi terakhir dan memperbarui panjang

Setelah perulangan, baris berikut mengurangi `length` terlebih dahulu, lalu
menghapus nilai pada indeks yang baru menjadi indeks terakhir:

```ts
delete this.data[--this.length]
```

Urutan efeknya:

1. `length` berubah dari `3` menjadi `2`.
2. `data[2]` dihapus.

Isi array sekarang menjadi:

```text
length = 2
data = {
  0: "one",
  1: "three"
}
```

`removeAt` mengembalikan `item`, yaitu `"two"`. Karena hasil pemanggilan
`delete(1)` tidak disimpan di kode contoh, nilai tersebut tidak ditampilkan.

## 4. Menampilkan array

```ts
console.log(myNewArray)
```

Objek yang ditampilkan memiliki `length` `2` dan dua nilai tersisa:

```text
MyArray {
  length: 2,
  data: {
    '0': 'one',
    '1': 'three'
  }
}
```

Tampilan indeks sebagai `'0'` dan `'1'` merupakan format properti objek
JavaScript. Secara logika, keduanya adalah indeks elemen array.

## 5. Membaca elemen dengan `get`

```ts
console.log(myNewArray.get(0))
```

`get(0)` membaca dan mengembalikan `data[0]`. Karena indeks `0` berisi
`"one"`, keluaran baris ini adalah:

```text
one
```

`get` hanya membaca nilai; method ini tidak mengubah `length` maupun `data`.
Jika indeks yang diminta tidak memiliki nilai, hasilnya `undefined`.

## Alur lengkap dan hasil

```text
Konstruktor
  -> length = 0, data = {}

push("one")
  -> length = 1, data = { 0: "one" }

push("two")
  -> length = 2, data = { 0: "one", 1: "two" }

push("three")
  -> length = 3, data = { 0: "one", 1: "two", 2: "three" }

delete(1)
  -> simpan "two"
  -> geser "three" dari indeks 2 ke indeks 1
  -> hapus indeks terakhir dan kurangi length
  -> length = 2, data = { 0: "one", 1: "three" }

get(0)
  -> mengembalikan "one"
```

Keluaran dari dua perintah `console.log` aktif adalah objek dengan elemen
`"one"` dan `"three"`, lalu teks `"one"`.

## Method lain yang tersedia

`pop` dan `shift` tersedia di class, tetapi pemanggilannya dikomentari pada
contoh sehingga keduanya tidak berjalan dalam alur di atas.

- `pop()` menghapus dan mengembalikan elemen terakhir. Jika array kosong,
  hasilnya `undefined`.
- `shift()` menghapus elemen pertama dengan memanggil `removeAt(0)`. Elemen
  setelahnya bergeser ke kiri. Jika array kosong, hasilnya `undefined`.
- `delete(index)` menghapus elemen pada indeks tertentu. Jika indeks bukan
  bilangan bulat atau berada di luar rentang, method mengembalikan
  `undefined` tanpa mengubah array.

---
