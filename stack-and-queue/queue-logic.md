# Queue: Cara Kerjanya

Queue (antrian) adalah struktur data dengan aturan **FIFO** (_first in, first
out_): nilai yang masuk lebih dulu akan keluar lebih dulu. Implementasi ini
menggunakan linked list dengan penunjuk ke bagian depan (`first`) dan belakang
(`last`).

## Algoritma Berpikir

Bayangkan antrian orang:

- Orang baru masuk di belakang antrian.
- Orang paling depan dilayani dan keluar lebih dulu.
- Jika antrian kosong, bagian depan dan belakang sama-sama tidak menunjuk node.

Operasi queue bekerja seperti berikut:

1. **Membuat queue:** awali `first`, `last`, dan `length` sebagai `null`, `null`,
   dan `0`. Jika constructor menerima nilai awal, tambahkan lewat `enqueue`.
2. **Menambahkan (`enqueue`):** buat node baru. Jika queue kosong, jadikan node
   itu `first` dan `last`. Jika tidak, hubungkan `last.next` ke node baru, lalu
   perbarui `last` dan `length`.
3. **Mengeluarkan (`dequeue`):** jika queue kosong, kembalikan `undefined`.
   Jika ada isi, simpan node `first`, lalu majukan `first` ke node berikutnya.
4. Jika node yang dikeluarkan adalah satu-satunya node, kosongkan `first` dan
   `last`. Lepaskan tautan node yang dikeluarkan, kurangi `length`, lalu
   kembalikan node tersebut.

## Arti variabel

- `QueueNode<T>` menyimpan nilai bertipe `T` dan tautan `next` ke node
  berikutnya.
- `first` menunjuk node paling depan yang akan dikeluarkan berikutnya.
- `last` menunjuk node paling belakang tempat nilai baru ditambahkan.
- `length` mencatat jumlah node di dalam queue.
- `newNode` adalah node yang sedang ditambahkan melalui `enqueue`.
- `removedNode` adalah node yang dikeluarkan dan dikembalikan oleh `dequeue`.

## Kondisi awal dan data contoh

Constructor membuat queue dengan nilai awal `0`:

```ts
const myQueue = new Queue(0)
```

Setelah constructor berjalan:

```text
first  -> [0 | null]
last   -> [0 | null]
length = 1
```

Node pertama menjadi `first` sekaligus `last`, karena belum ada node lain.

## Proses `enqueue`

Contoh kode kemudian menjalankan:

```ts
myQueue.enqueue(1)
myQueue.enqueue(2)
myQueue.enqueue(5)
```

Setiap nilai baru disambungkan ke belakang queue:

| Operasi      | Perubahan tautan                                 | Urutan dari `first` ke `last` | `length` |
| ------------ | ------------------------------------------------ | ----------------------------- | -------: |
| Awal         | Node `0` menjadi `first` dan `last`              | `0`                           |        1 |
| `enqueue(1)` | `0.next` menunjuk node `1`; `last` pindah ke `1` | `0 -> 1`                      |        2 |
| `enqueue(2)` | `1.next` menunjuk node `2`; `last` pindah ke `2` | `0 -> 1 -> 2`                 |        3 |
| `enqueue(5)` | `2.next` menunjuk node `5`; `last` pindah ke `5` | `0 -> 1 -> 2 -> 5`            |        4 |

Bentuk queue sebelum `dequeue`:

```text
first                              last
  |                                  |
  v                                  v
[0 | next] -> [1 | next] -> [2 | next] -> [5 | null]
length = 4
```

Karena `last` selalu menunjuk node terakhir, `enqueue` tidak perlu menelusuri
seluruh linked list.

## Proses `dequeue`

Pemanggilan `myQueue.dequeue()` mengeluarkan node paling depan, yaitu node
bernilai `0`:

1. Simpan node `first` ke `removedNode`.
2. Karena `length` bukan `1`, majukan `first` dari node `0` ke node `1`.
3. Atur `removedNode.next` menjadi `null` agar node `0` terlepas dari antrian.
4. Kurangi `length` dari `4` menjadi `3`, lalu kembalikan node yang dikeluarkan.

Keadaan queue sesudah `dequeue`:

```text
first                   last
  |                       |
  v                       v
[1 | next] -> [2 | next] -> [5 | null]
length = 3
```

`last` tidak berubah karena node yang dikeluarkan bukan node terakhir.

## Kasus khusus

- **Queue kosong:** `enqueue` menjadikan node baru sebagai `first` dan `last`.
- **Dequeue pada queue kosong:** tidak mengubah queue dan mengembalikan
  `undefined`.
- **Dequeue node terakhir:** `first` dan `last` keduanya diatur menjadi `null`,
  dan `length` menjadi `0`.
- `enqueue` mengembalikan instance queue (`this`), sehingga pemanggilan dapat
  dirangkai. `dequeue` mengembalikan node yang dilepas, bukan hanya nilainya.

## Hasil kode

Setelah contoh menambahkan `0`, `1`, `2`, dan `5`, lalu mengeluarkan satu node,
queue berisi `1`, `2`, dan `5`:

```text
first -> 1 -> 2 -> 5 <- last
length = 3
```

`console.log(myQueue)` menampilkan instance queue dengan keadaan tersebut.

## Kompleksitas

- `enqueue`: **O(1)** karena node baru langsung ditautkan melalui `last`.
- `dequeue`: **O(1)** karena elemen depan langsung tersedia melalui `first`.
- Ruang tambahan per operasi: **O(1)** untuk node yang ditambahkan atau
  dilepaskan. Queue dengan `n` elemen menggunakan **O(n)** ruang.

---
