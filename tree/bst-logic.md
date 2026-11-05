# Binary Search Tree: Cara Kerjanya

Binary Search Tree (BST) adalah struktur data berbentuk pohon yang menyimpan
nilai dengan aturan: nilai yang lebih kecil dari sebuah simpul berada di
cabang kiri, sedangkan nilai yang lebih besar berada di cabang kanan. Aturan
ini membantu proses penyisipan dan pencarian menentukan cabang yang perlu
diperiksa.

Implementasi ini menyimpan angka dan tidak menerima nilai duplikat.

## Algoritma Berpikir

Bayangkan setiap simpul sebagai persimpangan dengan dua arah:

- **Kiri:** lanjut ke nilai yang lebih kecil.
- **Kanan:** lanjut ke nilai yang lebih besar.

Untuk menyisipkan nilai:

1. Jika pohon kosong, jadikan nilai baru sebagai `root`.
2. Jika tidak kosong, mulai dari `root` dan bandingkan nilai baru dengan
   `currentNode.value`.
3. Jika nilainya sama, hentikan proses tanpa menambahkan simpul duplikat.
4. Jika nilainya lebih kecil, lanjut ke anak kiri; jika lebih besar, lanjut ke
   anak kanan.
5. Jika cabang yang dituju kosong, letakkan simpul baru di sana. Jika tidak,
   ulangi perbandingan dari simpul anak tersebut.

Untuk mencari nilai:

1. Mulai dari `root`.
2. Jika nilainya sama dengan nilai pada simpul sekarang, kembalikan `true`.
3. Jika nilainya lebih kecil, cari di anak kiri; jika lebih besar, cari di anak
   kanan.
4. Jika cabang yang dibutuhkan kosong sebelum nilai ditemukan, kembalikan
   `false`.

## Arti variabel

- `BSTNode` merepresentasikan satu simpul berisi `value` serta referensi `left`
  dan `right`.
- `root` adalah simpul paling atas. Nilainya `null` saat pohon masih kosong.
- `currentNode` adalah simpul yang sedang diperiksa saat menyisipkan atau
  mencari nilai.
- `value` adalah angka yang akan disisipkan atau dicari.
- `left` menyimpan anak dengan nilai lebih kecil; `right` menyimpan anak dengan
  nilai lebih besar. Keduanya bernilai `null` jika belum memiliki anak.

## Data contoh

Kode memasukkan nilai berikut secara berurutan:

```text
5, 8, 3, 1, 7, 9
```

Urutan penyisipan penting karena menentukan bentuk pohonnya.

## Proses penyisipan

| Nilai | Jalur perbandingan    | Posisi hasil   |
| ----: | --------------------- | -------------- |
|   `5` | Pohon kosong          | Menjadi `root` |
|   `8` | `8 > 5`               | Anak kanan `5` |
|   `3` | `3 < 5`               | Anak kiri `5`  |
|   `1` | `1 < 5`, lalu `1 < 3` | Anak kiri `3`  |
|   `7` | `7 > 5`, lalu `7 < 8` | Anak kiri `8`  |
|   `9` | `9 > 5`, lalu `9 > 8` | Anak kanan `8` |

Setelah semua nilai dimasukkan, bentuk pohonnya:

```text
        5
       / \
      3   8
     /   / \
    1   7   9
```

Contohnya, untuk menyisipkan `7`, algoritma mulai dari `5`. Karena `7` lebih
besar, algoritma bergerak ke kanan menuju `8`. Karena `7` lebih kecil dari
`8`, algoritma bergerak ke kiri. Anak kiri `8` masih kosong, jadi `7`
ditempatkan di sana.

## Penelusuran `insert`

Penyisipan angka `1` menunjukkan bagaimana `currentNode` bergerak melalui
pohon:

| `currentNode.value` | Perbandingan | Langkah berikutnya               |
| ------------------: | ------------ | -------------------------------- |
|                 `5` | `1 < 5`      | Bergerak ke kiri, ke simpul `3`  |
|                 `3` | `1 < 3`      | Cabang kiri kosong; sisipkan `1` |

Setelah simpul berhasil ditambahkan, `insert` mengembalikan instance BST
(`this`), sehingga pemanggil menerima pohon yang sama. Jika nilai sudah ada,
metode mengembalikan `undefined` dan pohon tidak berubah.

## Penelusuran `includes(9)`

Pencarian angka `9` hanya mengikuti satu cabang pada setiap perbandingan:

| `currentNode.value` | Perbandingan dengan `9` | Langkah berikutnya                 |
| ------------------: | ----------------------- | ---------------------------------- |
|                 `5` | `9 > 5`                 | Bergerak ke kanan, ke simpul `8`   |
|                 `8` | `9 > 8`                 | Bergerak ke kanan, ke simpul `9`   |
|                 `9` | `9 === 9`               | Nilai ditemukan; kembalikan `true` |

Karena itu, pemanggilan:

```ts
tree.includes(9)
```

menghasilkan `true`, dan `console.log` terakhir menampilkan:

```text
true
```

Sebelum pencarian, `console.log(tree)` menampilkan objek BST yang sudah berisi
akar `5` beserta simpul-simpul anaknya. Bentuk format objek yang ditampilkan
dapat berbeda antar-console, tetapi relasi simpulnya mengikuti diagram pohon
di atas.

Jika pencarian mencapai cabang `null` sebelum menemukan nilai, loop berakhir
dan `includes` mengembalikan `false`. Contohnya, `tree.includes(6)` bergerak
dari `5` ke `8`, ke `7`, lalu ke anak kiri `7` yang kosong.

## Kompleksitas

Misalkan `h` adalah tinggi pohon:

- `insert`: **O(h)** karena mengikuti satu jalur dari akar ke posisi kosong.
- `includes`: **O(h)** karena mengikuti satu jalur dari akar sampai nilai
  ditemukan atau cabang habis.
- Pada pohon yang relatif seimbang, tinggi sekitar **O(log n)**, sehingga
  operasi tersebut rata-rata dapat berjalan **O(log n)**.
- Jika nilai yang dimasukkan menghasilkan pohon yang miring, tinggi dapat
  menjadi **O(n)** dan operasi terburuk juga **O(n)**.
- Ruang tambahan per operasi: **O(1)**; implementasi menggunakan loop, bukan
  rekursi. Penyimpanan seluruh simpul pohon sendiri adalah **O(n)**.

---
