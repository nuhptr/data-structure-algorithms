# Stack: Cara Kerjanya

Stack adalah struktur data dengan aturan **LIFO** (_last in, first out_): nilai
yang terakhir dimasukkan akan menjadi nilai pertama yang dikeluarkan. Implementasi
ini memakai linked list dan menyimpan node paling atas pada `first`.

## Algoritma Berpikir

Bayangkan tumpukan piring:

- Piring baru diletakkan di bagian paling atas.
- Piring yang diambil juga berasal dari bagian paling atas.
- Piring yang berada lebih bawah tidak dapat diambil sebelum piring di atasnya.

Operasi stack berjalan seperti berikut:

1. **Membuat stack:** awali `first` dengan `null` dan `length` dengan `0`.
   Jika constructor menerima nilai awal, tambahkan nilai itu menggunakan
   `push`.
2. **Menambahkan (`push`):** buat node baru, sambungkan node tersebut ke node
   teratas lama, lalu jadikan node baru sebagai `first` dan tambah `length`.
3. **Mengeluarkan (`pop`):** jika stack kosong, kembalikan `undefined`.
   Jika tidak, simpan node `first`, majukan `first` ke node berikutnya,
   lepaskan tautan node yang dikeluarkan, kurangi `length`, lalu kembalikan
   node itu.
4. **Melihat teratas (`top`):** kembalikan `first` tanpa menghapusnya. Jika
   stack kosong, kembalikan `undefined`.

## Arti variabel

- `StackNode<T>` menyimpan nilai bertipe `T` dan tautan ke node di bawahnya.
- `first` menunjuk node paling atas stack.
- `length` mencatat jumlah node di dalam stack.
- `newNode` adalah node yang sedang ditambahkan melalui `push`.
- `temp` menyimpan node teratas yang akan dikeluarkan melalui `pop`.
- `value` adalah nilai yang dimasukkan ke stack atau disimpan dalam node.

## Kondisi awal dan data contoh

Contoh kode membuat stack dengan nilai awal `0`:

```ts
const theStack = new StackValue(0)
```

Constructor menginisialisasi stack kosong lalu menambahkan nilai tersebut
dengan `push`. Setelahnya:

```text
first -> [0 | null]
length = 1
```

## Proses `push`

Kode menambahkan dua nilai:

```ts
theStack.push(1)
theStack.push(2)
```

Setiap node baru diletakkan di atas node sebelumnya:

| Operasi   | Perubahan tautan                                     | Urutan dari `first` ke bawah | `length` |
| --------- | ---------------------------------------------------- | ---------------------------- | -------: |
| Awal      | Node `0` menjadi `first`                             | `0`                          |        1 |
| `push(1)` | Node `1` menunjuk ke node `0`; `first` pindah ke `1` | `1 -> 0`                     |        2 |
| `push(2)` | Node `2` menunjuk ke node `1`; `first` pindah ke `2` | `2 -> 1 -> 0`                |        3 |

Setelah kedua operasi:

```text
first
  |
  v
[2 | next] -> [1 | next] -> [0 | null]
length = 3
```

`push` selalu menyisipkan node di depan linked list, jadi tidak perlu
menelusuri node yang sudah ada.

## Proses `pop`

Jika `theStack.pop()` dijalankan, node paling atas, yaitu `2`, dikeluarkan:

1. Simpan node `first` (`2`) ke `temp`.
2. Pindahkan `first` ke `temp.next`, yaitu node `1`.
3. Atur `temp.next` menjadi `null` agar node `2` terlepas dari stack.
4. Kurangi `length` dari `3` menjadi `2`, lalu kembalikan node `2`.

Keadaan stack setelah `pop`:

```text
first
  |
  v
[1 | next] -> [0 | null]
length = 2
```

Node `2` yang dikembalikan tidak lagi tertaut ke node `1`.

## Proses `top`

Pemanggilan `top()` hanya membaca node yang ditunjuk `first`:

```ts
const topNode = theStack.top()
```

Dalam contoh sebelum `pop`, `topNode` adalah node bernilai `2`. Operasi ini
tidak mengubah `first`, tautan node, maupun `length`.

## Kasus khusus

- **Stack kosong:** `top()` dan `pop()` mengembalikan `undefined`.
- **Stack berisi satu node:** `pop()` menjadikan `first` kembali `null` dan
  `length` menjadi `0`.
- `push` mengembalikan instance stack (`this`), sehingga operasi dapat
  dirangkai.
- `pop` mengembalikan node yang dilepas, bukan hanya nilainya. Nilai dapat
  dibaca melalui properti `value` pada node tersebut.

## Hasil kode

Contoh kode membuat stack berisi `0`, lalu menambahkan `1` dan `2`. Pemanggilan
`pop()` hanya ditampilkan sebagai contoh komentar dan tidak dijalankan, sehingga
`console.log(theStack)` menampilkan stack dengan keadaan:

```text
first -> 2 -> 1 -> 0
length = 3
```

Node `2` berada di puncak dan akan menjadi nilai pertama yang keluar jika
`pop()` dipanggil.

## Kompleksitas

- `push`: **O(1)** karena node baru langsung ditautkan sebagai `first`.
- `pop`: **O(1)** karena node teratas langsung tersedia di `first`.
- `top`: **O(1)** karena hanya membaca `first`.
- Ruang tambahan per `push`: **O(1)** untuk node baru. Stack dengan `n` elemen
  menggunakan **O(n)** ruang.

---
