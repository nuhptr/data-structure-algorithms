# Tree Traversal: Cara Kerjanya

Tree traversal adalah proses mengunjungi simpul-simpul pada pohon dalam urutan
tertentu. File `tree-traversal.ts` membangun Binary Search Tree (BST), lalu
menyediakan Breadth-First Search (BFS) serta tiga variasi Depth-First Search
(DFS): pre-order, post-order, dan in-order.

## Algoritma Berpikir

Traversal yang tersedia dibagi menjadi dua kelompok:

- **BFS (breadth-first):** kunjungi pohon per level, dari kiri ke kanan.
  Simpan simpul yang akan dikunjungi di antrean.
- **DFS (depth-first):** telusuri satu cabang sampai selesai sebelum berpindah
  ke cabang lain. Variasi traversal menentukan kapan nilai simpul dicatat:
    - **Pre-order:** simpul, kiri, kanan.
    - **Post-order:** kiri, kanan, simpul.
    - **In-order:** kiri, simpul, kanan.

Untuk membangun pohon, `insert` membandingkan nilai baru dengan simpul saat ini:
nilai yang lebih kecil berjalan ke kiri, sedangkan nilai yang lebih besar
berjalan ke kanan. Nilai yang dianggap sama oleh comparator tidak dimasukkan
lagi.

## Data awal

Contoh memasukkan angka berikut secara berurutan:

```text
5, 8, 3, 1, 7, 9
```

Karena nilai pertama menjadi akar dan nilai berikutnya mengikuti aturan BST,
bentuk pohonnya adalah:

```text
        5
       / \
      3   8
     /   / \
    1   7   9
```

## Arti tipe dan variabel

- `ValueComparator<T>` membandingkan dua nilai. Hasil negatif berarti nilai
  pertama lebih kecil, `0` berarti setara, dan hasil positif berarti lebih
  besar.
- `TreeNode<T>` menyimpan `value`, `left`, dan `right`.
- `BinarySearchTree<T>` menyimpan `root` dan comparator yang digunakan untuk
  penyisipan.
- `currentNode` menunjuk simpul yang sedang diperiksa.
- `nodesToVisit` adalah antrean BFS; `nextIndex` menunjuk simpul berikutnya
  yang harus dikunjungi.
- `visitedValues` menampung nilai sesuai urutan traversal.
- `branch` menunjukkan cabang kiri atau kanan yang dipilih saat menyisipkan.

## Comparator dan penyisipan

Tanpa comparator khusus, fungsi pembanding bawaan mendukung angka dan string.
Untuk tipe lain, berikan comparator pada constructor. Contoh:

```ts
const words = new BinarySearchTree<string>()
words.insert("mango")
words.insert("apple")
```

Untuk data objek atau tipe lain, comparator harus menentukan urutan secara
konsisten:

```ts
type Person = { age: number }

const people = new BinarySearchTree<Person>((first, second) => first.age - second.age)
```

Jika comparator mengembalikan `0`, nilai baru dianggap duplikat. `insert`
mengembalikan `this` saat berhasil dan `undefined` saat nilai duplikat
ditemukan.

## Breadth-First Search

`breadthFirstSearch()` memulai antrean dengan akar. Setiap langkah mengunjungi
simpul di depan antrean, mencatat nilainya, lalu menambahkan anak kiri dan anak
kanan jika tersedia. `nextIndex` bergerak maju di array antrean sehingga
simpul-simpul diproses sesuai urutan masuk.

Urutan kunjungan pada pohon contoh:

| Level | Simpul yang dikunjungi |
| ----: | ---------------------- |
|     0 | `5`                    |
|     1 | `3`, `8`               |
|     2 | `1`, `7`, `9`          |

Maka hasilnya:

```text
[5, 3, 8, 1, 7, 9]
```

Pohon kosong menghasilkan array kosong `[]`. Method `dfs()` tetap tersedia
sebagai alias kompatibilitas untuk `breadthFirstSearch()`; meskipun namanya
`dfs`, method tersebut tetap melakukan traversal per level (BFS).

## Depth-First Search

DFS memakai rekursi. Ketika mencapai `null`, pemanggilan berhenti. Untuk pohon
contoh, urutan setiap variasi adalah sebagai berikut.

### Pre-order: simpul, kiri, kanan

Catat simpul sebelum menjelajahi anak-anaknya:

```text
5 -> 3 -> 1 -> 8 -> 7 -> 9
```

Hasil traversal:

```text
[5, 3, 1, 8, 7, 9]
```

`dfsPreOrder` juga mencetak `"--------"` beserta nilai yang sudah dikunjungi
pada setiap simpul. Output debug ini merupakan tambahan selain array hasil
yang dikembalikan.

### Post-order: kiri, kanan, simpul

Jelajahi kedua anak sebelum mencatat simpul induknya:

```text
1 -> 3 -> 7 -> 9 -> 8 -> 5
```

Hasil traversal:

```text
[1, 3, 7, 9, 8, 5]
```

### In-order: kiri, simpul, kanan

Jelajahi cabang kiri, catat simpul, lalu jelajahi cabang kanan:

```text
1 -> 3 -> 5 -> 7 -> 8 -> 9
```

Hasil traversal:

```text
[1, 3, 5, 7, 8, 9]
```

Untuk BST angka dengan comparator menaik, in-order menghasilkan nilai dalam
urutan menaik.

## Hasil kode

Empat pemanggilan di akhir file menghasilkan urutan berikut:

```text
breadthFirstSearch(): [5, 3, 8, 1, 7, 9]
dfsPreOrder():        [5, 3, 1, 8, 7, 9]
dfsPostOrder():       [1, 3, 7, 9, 8, 5]
dfsInOrder():         [1, 3, 5, 7, 8, 9]
```

Pemanggilan pre-order juga mencetak baris debug selama traversal.

## Kasus khusus dan kompleksitas

- Traversal pada pohon kosong menghasilkan `[]`.
- Penyisipan nilai yang setara menurut comparator tidak mengubah pohon.
- BFS mengunjungi setiap simpul satu kali: **O(n)** waktu dan **O(n)** ruang
  untuk antrean serta hasil.
- Setiap variasi DFS mengunjungi setiap simpul satu kali: **O(n)** waktu.
  Rekursi menggunakan **O(h)** ruang call stack, dengan `h` sebagai tinggi
  pohon; array hasil menggunakan **O(n)** ruang.
- Penyisipan BST memerlukan **O(h)** waktu: sekitar **O(log n)** untuk pohon
  seimbang dan dapat menjadi **O(n)** jika pohon miring.

---
