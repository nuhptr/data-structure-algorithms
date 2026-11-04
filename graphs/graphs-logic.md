# Alur Kerja `Graph`

Dokumen ini menjelaskan alur pada `index.ts` sesuai contoh di diagram: membuat
graf kosong, menambahkan simpul A sampai D, menghubungkan beberapa simpul,
menampilkan graf, lalu menghapus semua sisi yang terhubung dengan D tanpa
menghapus simpul D.

## Struktur penyimpanan

`Graph<T>` menyimpan daftar tetangga pada properti `adjList`.

- Setiap kunci pada `adjList` mewakili satu simpul.
- Nilai untuk setiap kunci adalah array simpul-simpul yang bertetangga dengannya.
- Graf ini tidak berarah. Karena itu, setiap sisi dicatat pada kedua simpul yang
  terhubung.

Contohnya, sisi A-B dicatat sebagai `"B"` di daftar tetangga A dan `"A"` di
daftar tetangga B.

## 1. Membuat graf kosong

```ts
const graph = new Graph()
```

Constructor membuat objek dengan `adjList` kosong:

```text
adjList = {}
```

Belum ada simpul maupun sisi di dalam graf.

## 2. Menambahkan simpul

Contoh memanggil `addVertex` untuk simpul A, B, C, dan D:

```ts
graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")
```

Setiap pemanggilan membuat kunci simpul dengan array tetangga kosong. Setelah
keempat pemanggilan:

```text
adjList = {
  A: [],
  B: [],
  C: [],
  D: []
}
```

`addVertex` mengembalikan `true` jika simpul berhasil ditambahkan. Jika kunci
tersebut sudah ada, method mengembalikan `false` dan tidak mengubah graf.

## 3. Menambahkan sisi

Contoh berikut menambahkan lima sisi:

```ts
graph.addEdge("A", "B")
graph.addEdge("A", "C")
graph.addEdge("A", "D")
graph.addEdge("B", "D")
graph.addEdge("C", "D")
```

`addEdge` terlebih dahulu memastikan kedua simpul sudah ada. Jika ada yang
belum ditambahkan, method mengembalikan `false` tanpa menambahkan sisi.
Jika keduanya tersedia, simpul tujuan dimasukkan ke daftar tetangga masing-masing
simpul. Dengan demikian, setiap sisi menjadi hubungan dua arah.

Perubahan daftar tetangga setelah setiap sisi:

| Sisi yang ditambahkan | Daftar tetangga yang berubah |
| --------------------- | ---------------------------- |
| A-B                   | A: `[B]`, B: `[A]`           |
| A-C                   | A: `[B, C]`, C: `[A]`        |
| A-D                   | A: `[B, C, D]`, D: `[A]`     |
| B-D                   | B: `[A, D]`, D: `[A, B]`     |
| C-D                   | C: `[A, D]`, D: `[A, B, C]`  |

Setelah semua sisi ditambahkan, isi `adjList` adalah:

```text
adjList = {
  A: [B, C, D],
  B: [A, D],
  C: [A, D],
  D: [A, B, C]
}
```

## 4. Menampilkan status awal graf

```ts
console.log(graph)
```

Perintah ini berjalan sebelum penghapusan, sehingga objek yang ditampilkan
memuat empat simpul dan semua sisi yang telah ditambahkan. Bentuk tampilannya
secara logika adalah:

```text
Graph {
  adjList: {
    A: [B, C, D],
    B: [A, D],
    C: [A, D],
    D: [A, B, C]
  }
}
```

Format tepat yang ditampilkan console dapat berbeda, tetapi isi adjacency list
tetap sama.

## 5. Menghapus sisi-sisi D tanpa menghapus simpulnya

```ts
graph.clearEdges("D")
```

`clearEdges` mencari daftar tetangga D. Jika simpul tidak ditemukan, method
mengembalikan `false` dan tidak mengubah graf.

Karena D ada, method mengambil daftar tetangganya:

```text
neighbors = [A, B, C]
```

Kemudian, untuk setiap tetangga, method menghapus nilai D dari daftar tetangga
tersebut:

| Tetangga yang diproses | Daftar setelah D dihapus |
| ---------------------- | ------------------------ |
| A                      | A: `[B, C]`              |
| B                      | B: `[A]`                 |
| C                      | C: `[A]`                 |

Setelah semua hubungan ke D dibersihkan, daftar tetangga D dikosongkan. Kunci D
tetap ada di `adjList`, jadi simpulnya masih menjadi bagian dari graf:

```text
adjList = {
  A: [B, C],
  B: [A],
  C: [A],
  D: []
}
```

Sisi A-B dan A-C tetap ada karena keduanya tidak terhubung dengan D.

## 6. Menampilkan status akhir graf

```ts
console.log(graph)
```

Perintah kedua berjalan setelah `clearEdges("D")`, sehingga yang ditampilkan
adalah graf yang masih memiliki simpul D, tetapi tidak lagi memiliki sisi A-D,
B-D, maupun C-D:

```text
Graph {
  adjList: {
    A: [B, C],
    B: [A],
    C: [A],
    D: []
  }
}
```

## Alur lengkap

```text
new Graph()
  -> adjList = {}

addVertex("A"), addVertex("B"), addVertex("C"), addVertex("D")
  -> setiap simpul mendapat daftar tetangga kosong

addEdge("A", "B")
addEdge("A", "C")
addEdge("A", "D")
addEdge("B", "D")
addEdge("C", "D")
  -> setiap sisi dicatat pada kedua simpul yang terhubung
  -> A: [B, C, D], B: [A, D], C: [A, D], D: [A, B, C]

console.log(graph)
  -> menampilkan graf lengkap

clearEdges("D")
  -> hapus D dari daftar tetangga A, B, dan C
  -> kosongkan daftar tetangga D tanpa menghapus kunci D
  -> A: [B, C], B: [A], C: [A], D: []

console.log(graph)
  -> menampilkan graf dengan D tetap ada dan tanpa sisi-sisi D
```

## Method lain yang tersedia

- `removeVertex(vertex)` menghapus simpul beserta semua sisi yang terhubung
  dengannya. Gunakan `clearEdges(vertex)` jika simpul perlu dipertahankan.
- `removeEdge(vertex1, vertex2)` menghapus hubungan kedua arah antara dua
  simpul yang ada. Method mengembalikan `false` jika salah satu simpul tidak
  ditemukan, dan `true` jika keduanya ada.
- `addEdge` tidak memeriksa apakah sisi yang sama sudah pernah ditambahkan.
  Memanggilnya berulang kali untuk pasangan simpul yang sama akan menambahkan
  entri tetangga berulang.
- `keyOf` mengubah simpul menjadi string untuk dijadikan kunci `adjList`.
