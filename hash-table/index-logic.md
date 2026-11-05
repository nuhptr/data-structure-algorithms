# Alur Kerja `HashTable`

Dokumen ini menjelaskan implementasi `HashTable` dan contoh phone book pada
`index.ts`. Tabel menyimpan pasangan nama dan nomor telepon di dalam array
dengan ukuran tetap, menggunakan hash untuk menentukan slot awal, dan linear
probing untuk mencari slot lain jika terjadi collision.

## Algoritma Berpikir

1. **Ubah key menjadi slot awal** dengan fungsi hash agar pencarian tidak perlu
   memeriksa seluruh tabel dari awal.
2. **Tangani collision dengan linear probing:** periksa slot berikutnya secara
   melingkar sampai menemukan slot kosong atau key yang sama.
3. **Saat set, bedakan dua kondisi:** slot kosong berarti simpan pasangan; key
   yang sama berarti perbarui nilainya.
4. **Saat get, ikuti urutan probe yang sama.** Key cocok berarti kembalikan
   nilainya; slot kosong atau seluruh slot telah diperiksa berarti key tidak
   ditemukan.
5. Untuk mengambil semua key atau value, telusuri slot dari indeks terkecil ke
   terbesar dan lewati slot kosong.

## 1. Membuat tabel

Kode membuat tabel tanpa memberikan ukuran:

```ts
const phoneBook = new HashTable()
```

Constructor menggunakan ukuran default `6` dan membuat array dengan enam slot
kosong:

```text
keymap = [_, _, _, _, _, _]
```

Setiap slot nantinya menyimpan pasangan `[key, value]`. Jika constructor diberi
ukuran yang bukan bilangan bulat positif, constructor melempar `RangeError`.

## 2. Menghitung slot awal dengan `_hashFunction`

Fungsi hash membaca maksimal 100 karakter pertama pada key. Untuk tiap karakter,
fungsi mengalikan nilai sebelumnya dengan `31`, menambahkan `charCodeAt(i) -
96`, lalu mengambil sisa pembagian dengan ukuran array:

```ts
sum = (sum * 31 + key.charCodeAt(i) - 96) % this.keymap.length
```

Pada contoh, panjang `keymap` adalah `6`. Perhitungan slot awal untuk nama-nama
yang dimasukkan:

| Key        | Perhitungan modulo 6 per karakter              | Slot awal |
| ---------- | ---------------------------------------------- | --------: |
| `"john"`   | `j: 4 -> o: 1 -> h: 3 -> n: 5`                 |         5 |
| `"jordan"` | `j: 4 -> o: 1 -> r: 1 -> d: 5 -> a: 0 -> n: 2` |         2 |
| `"michel"` | `m: 1 -> i: 4 -> c: 1 -> h: 3 -> e: 2 -> l: 2` |         2 |

Angka di tengah menunjukkan hasil modulo setelah karakter tersebut diproses.
Sebagai contoh, karakter pertama `"j"` memiliki kode `106`, sehingga
`(0 * 31 + 106 - 96) % 6 = 4`.

## 3. Menyimpan pasangan dengan `set`

### Menyimpan `"john"`

```ts
phoneBook.set("john", "555-333-444")
```

Hash `"john"` menunjuk ke slot `5`, yang masih kosong. Pasangan disimpan di
slot itu:

```text
index  0  1  2  3  4  5
       _  _  _  _  _  ["john", "555-333-444"]
```

### Menyimpan `"jordan"`

```ts
phoneBook.set("jordan", "222-444-666")
```

Hash `"jordan"` menunjuk ke slot `2`, yang masih kosong, sehingga pasangan
disimpan di sana:

```text
index  0  1  2                         3  4  5
       _  _  ["jordan", "222-444-666"] _  _  ["john", "555-333-444"]
```

### Menyimpan `"michel"` dan menangani collision

```ts
phoneBook.set("michel", "111-666-222")
```

Hash `"michel"` juga menunjuk ke slot `2`. Slot tersebut sudah berisi key yang
berbeda, yaitu `"jordan"`, sehingga terjadi collision. `set` mencoba slot
berikutnya secara berurutan menggunakan rumus `(start + i) % keymap.length`:

| Percobaan | Slot | Isi slot   | Tindakan                             |
| --------: | ---: | ---------- | ------------------------------------ |
|         1 |    2 | `"jordan"` | Collision; lanjut ke slot berikutnya |
|         2 |    3 | kosong     | Simpan pasangan `"michel"` di sini   |

Setelah semua pemanggilan `set`, isi tabel secara logis adalah:

```text
index  0  1  2                         3                         4  5
       _  _  ["jordan", "222-444-666"] ["michel", "111-666-222"] _  ["john", "555-333-444"]
```

Jika key yang sama dimasukkan lagi, `set` memperbarui pasangan pada slot key
tersebut, bukan membuat entri duplikat. Jika seluruh slot terisi dan key baru
tidak ditemukan, `set` melempar `Error("Hash table is full")`.

## 4. Mengambil nilai dengan `get`

Kode memanggil:

```ts
phoneBook.get("jordan")
```

Hash `"jordan"` menunjuk ke slot `2`. Key di slot tersebut cocok, sehingga
`get` mengembalikan nilainya:

```text
"222-444-666"
```

Jika key tidak ditemukan, `get` mengembalikan `undefined`. Saat mencari, `get`
mengikuti urutan linear probing yang sama. Karena tabel ini tidak menyediakan
operasi penghapusan, slot kosong menjadi penanda bahwa key tersebut tidak
ditemukan pada rangkaian probe itu.

## 5. Mengambil semua nilai dan key

`getAllValues()` dan `getAllKeys()` menelusuri `keymap` dari slot indeks
terendah ke tertinggi. Keduanya melewati slot kosong dan mempertahankan urutan
slot, bukan urutan pasangan dimasukkan.

Maka hasilnya:

```text
phoneBook.getAllValues()
-> ["222-444-666", "111-666-222", "555-333-444"]

phoneBook.getAllKeys()
-> ["jordan", "michel", "john"]
```

## 6. Hasil `console.log`

Kode mencetak tabel, nomor Jordan, semua nilai, lalu semua key:

```ts
console.log(phoneBook)
console.log(phoneBook.get("jordan"))
console.log(phoneBook.getAllValues())
console.log(phoneBook.getAllKeys())
```

Secara logis, hasilnya:

```text
HashTable {
  keymap: [
    <2 empty items>,
    ["jordan", "222-444-666"],
    ["michel", "111-666-222"],
    <1 empty item>,
    ["john", "555-333-444"]
  ]
}
222-444-666
["222-444-666", "111-666-222", "555-333-444"]
["jordan", "michel", "john"]
```

Baris pertama adalah objek `phoneBook`. Format persis untuk menampilkan slot
array kosong dan array di dalam console dapat berbeda menurut runtime, tetapi
indeks dan urutan datanya tetap seperti di atas.

## Alur lengkap

```text
new HashTable()
  -> membuat keymap dengan 6 slot kosong

set("john", "555-333-444")
  -> hash awal 5
  -> simpan di slot 5

set("jordan", "222-444-666")
  -> hash awal 2
  -> simpan di slot 2

set("michel", "111-666-222")
  -> hash awal 2
  -> slot 2 ditempati jordan
  -> linear probing menemukan slot kosong 3
  -> simpan di slot 3

get("jordan")
  -> membaca slot 2
  -> mengembalikan "222-444-666"

getAllValues()
  -> membaca nilai berdasarkan urutan slot

getAllKeys()
  -> membaca key berdasarkan urutan slot
```

## Kompleksitas

- **Hashing:** O(min(k, 100)), dengan `k` sebagai panjang key karena fungsi
  hash memproses maksimal 100 karakter.
- **Set/get:** rata-rata O(1) saat slot tersebar baik; dapat mencapai O(n)
  ketika banyak collision atau tabel hampir penuh.
- **getAllKeys/getAllValues:** O(n), karena semua slot tabel ditelusuri.
