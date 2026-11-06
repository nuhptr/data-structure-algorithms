# Struktur Data dan Algoritma

Kumpulan materi dan implementasi TypeScript untuk mempelajari struktur data,
algoritma, serta dasar analisis kompleksitas. Setiap topik dilengkapi contoh kode
yang dapat dibaca dan dikembangkan sebagai latihan.

## Tujuan Pembelajaran

- Memahami cara kerja struktur data dan algoritma umum.
- Mempelajari dampak pilihan algoritma terhadap waktu dan penggunaan memori.
- Melatih pemecahan masalah melalui implementasi dan tantangan kode.
- Mengembangkan kemampuan membaca, menjelaskan, dan memodifikasi kode TypeScript.

## Progres Pembelajaran

| Topik           | Materi dan implementasi                                                                                                                                                                                                                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pengantar       | Gambaran masalah dan alasan mempelajari struktur data dan algoritma.                                                                                                                                                                                                                                                                                                                       |
| Big O           | Contoh kompleksitas waktu konstan, linear, dan kuadratik.                                                                                                                                                                                                                                                                                                                                  |
| Array           | Array dasar, implementasi array sederhana, serta membalik string.                                                                                                                                                                                                                                                                                                                          |
| Hash table      | Implementasi hash table dengan linear probing ([alur](./hash-table/index-logic.md)); tantangan [word counter](./hash-table/hash-word-instance-logic.md), [two sum](./hash-table/hash-two-sum-logic.md), dan [group anagrams](./hash-table/group-anagrams-logic.md).                                                                                                                        |
| Graph           | Representasi adjacency list serta operasi simpul dan sisi pada graf tak berarah.                                                                                                                                                                                                                                                                                                           |
| Linked list     | Implementasi single linked list, double linked list, dan latihan terkait.                                                                                                                                                                                                                                                                                                                  |
| Stack dan queue | [Stack](./stack-and-queue/stack-logic.md) dengan operasi `push`, `pop`, dan `top`; [queue](./stack-and-queue/queue-logic.md) dengan `enqueue` dan `dequeue`; serta latihan [min stack](./stack-and-queue/challenge-min-stack.ts), [membalik string](./stack-and-queue/challenge-reverse-string-using-stack.ts), dan [valid parenthesis](./stack-and-queue/challenge-valid-parenthesis.ts). |
| Sorting         | [Bubble sort](./sorting-algo/bubble-sort-logic.md), [insertion sort](./sorting-algo/insertion-sort-logic.md), [merge sort](./sorting-algo/merge-sort-logic.md), dan [selection sort](./sorting-algo/selection-sort-logic.md).                                                                                                                                                              |
| Tree            | [Binary search tree](./tree/bst-logic.md), [rekursi](./tree/recursion-logic.md), dan [traversal](./tree/tree-traversal-logic.md).                                                                                                                                                                                                                                                          |

## Contoh Gambaran Algoritma

Contoh berikut menunjukkan alur singkat dari input hingga hasil untuk setiap
materi. Buka dokumentasi yang ditautkan pada tabel di atas untuk penelusuran
langkah yang lebih terperinci.

### Pengantar

Mencari nama `"Alice"` dalam daftar dilakukan dengan memeriksa nama satu per
satu sampai ditemukan:

```text
["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"]
 -> periksa John Doe -> periksa Jane Smith -> cocok dengan Alice Johnson
 -> hasil: ditemukan pada indeks 2
```

### Big O

```text
O(1):   ambil array[0]              -> satu akses, berapa pun ukuran array
O(n):   cari "eggs" dalam daftar    -> periksa elemen satu per satu
O(n^2): bandingkan semua pasangan  -> [1, 2, 3] menghasilkan (1,2), (1,3), (2,3)
```

### Array

Array mengakses data lewat indeks. Pada custom array, menghapus indeks `1`
memerlukan pergeseran agar urutan tetap terjaga; membalik string mengubah
urutan karakter:

```text
push("one"), push("two"), push("three")
 -> [one, two, three]
delete(1) -> simpan "two", geser "three" ke kiri -> [one, three]
reverseString("hello") -> "olleh"
```

### Hash table

Hash table menghitung slot awal dari key. Jika slot sudah terisi, linear
probing memeriksa slot berikutnya:

```text
set("jordan", ...) -> slot 2
set("michel", ...) -> slot 2 terisi -> slot 3 kosong -> simpan di slot 3
get("jordan")      -> temukan key di slot 2
```

Contoh latihan terkait:

```text
word counter: "name name" -> { name: 2 }
two sum: [2, 7, 11], target 9 -> pelengkap 7 ditemukan -> indeks [0, 1]
anagram: "eat", "tea" -> kunci "aet" -> satu kelompok ["eat", "tea"]
```

### Graph

Pada graf tak berarah, setiap sisi dicatat di daftar tetangga kedua simpul.
Mengosongkan sisi sebuah simpul menghapus hubungan, tetapi tetap menyimpan
simpulnya:

```text
addEdge("A", "B") -> A: [B], B: [A]
addEdge("B", "C") -> B: [A, C], C: [B]
clearEdges("B")   -> A: [], B: [], C: []
```

### Linked list

Setiap simpul menyimpan nilai dan tautan ke simpul berikutnya. Menambahkan
simpul ke belakang memakai `tail`; membalik list mengubah arah tautan:

```text
push(1), push(2), push(3) -> 1 -> 2 -> 3
reverse()                  -> 3 -> 2 -> 1
```

Pada doubly linked list, setiap pasangan simpul juga memiliki tautan balik:
`1 <-> 2 <-> 3`.

### Stack dan queue

Stack memakai aturan LIFO, sedangkan queue memakai FIFO:

```text
Stack: push(1), push(2), pop()       -> keluar 2, tersisa 1
Queue: enqueue(1), enqueue(2), dequeue() -> keluar 1, tersisa 2
```

Contoh latihan:

```text
Min stack: push(5), push(2), push(7), push(1) -> min 1
           pop() -> min 2
Balik string: push h,e,l,l,o lalu pop -> "olleh"
Validasi kurung: "([])" -> pasangan cocok dalam urutan LIFO -> valid
```

### Sorting

Empat algoritma berikut mengurutkan input contoh yang sama dengan cara berbeda:

```text
Bubble sort:    [4, 2, 3] -> tukar pasangan bersebelahan -> [2, 3, 4]
Insertion sort: [4, 2, 3] -> sisipkan 2, lalu 3 ke bagian terurut -> [2, 3, 4]
Selection sort: [4, 2, 3] -> pilih minimum 2, lalu 3 -> [2, 3, 4]
Merge sort:     [4, 2, 3] -> bagi [4] dan [2, 3], urutkan, gabungkan -> [2, 3, 4]
```

### Tree

BST mengarahkan nilai lebih kecil ke kiri dan lebih besar ke kanan. Rekursi
memecah masalah sampai kondisi dasar; traversal mengunjungi simpul dengan
urutan tertentu:

```text
Insert 5, 3, 8, 1 ke BST:
      5
     / \
    3   8
   /
  1
includes(8): 5 -> kanan ke 8 -> ditemukan

factorial(3): 3 * factorial(2) -> 3 * 2 * 1 -> 6
Traversal pohon 5 dengan anak kiri 3 dan kanan 8:
  BFS       -> [5, 3, 8]
  pre-order -> [5, 3, 8]
  in-order  -> [3, 5, 8]
  post-order -> [3, 8, 5]
```

### Progres Terbaru

- Dokumentasi alur berbahasa Indonesia tersedia untuk custom array, graph,
  operasi hash table dan tantangannya, empat algoritma sorting, serta materi
  tree (BST, rekursi, dan traversal).
- Pembelajaran terbaru mendalami insertion sort: implementasi mengurutkan
  elemen secara in-place, sementara dokumentasinya menelusuri pergeseran dan
  penyisipan nilai pada setiap langkah.
- Stack dan queue dipelajari menggunakan linked list, termasuk urutan LIFO/FIFO,
  operasi dasarnya, dan kompleksitasnya. Latihan stack mencakup min stack,
  membalik string, serta validasi pasangan tanda kurung.
- Materi tree mencakup penyisipan dan pencarian pada binary search tree, serta
  rekursi melalui contoh hitung mundur dan faktorial; dokumentasi langkah demi
  langkah tersedia untuk keduanya. Traversal pohon mencakup BFS dan DFS
  pre-order, post-order, serta in-order, berikut urutan kunjungan dan
  penggunaan comparator.
- Contoh hash table mendokumentasikan collision dan linear probing, hitung kata,
  pencarian pasangan two sum, serta pengelompokan anagram beserta outputnya.
- Diagram tersedia untuk sejumlah topik, termasuk array, graph, hash table,
  linked list, dan stack/queue.

Status di atas menunjukkan materi dan contoh yang tersedia di repositori; status
tersebut bukan hasil pengujian otomatis. Repositori ini belum memiliki konfigurasi
test atau skrip build terpusat.

## Struktur Proyek

```text
.
├── arrays/          # Array dasar, custom array, dan manipulasi string
├── big-o/           # Contoh analisis kompleksitas
├── graphs/          # Graf dan adjacency list
├── hash-table/      # Hash table dan tantangan terkait
├── introduction/    # Materi pengantar
├── linked-list/     # Single dan double linked list
├── sorting-algo/    # Algoritma pengurutan
├── stack-and-queue/ # Stack, queue, dan tantangan
└── tree/            # Tree, rekursi, dan traversal
```

## Cara Menggunakan

1. Pilih topik dari folder yang sesuai.
2. Baca komentar dan dokumentasi pada file TypeScript.
3. Telusuri contoh gambaran algoritma di README dan dokumentasi topik untuk
   memahami alurnya.
4. Ubah input atau implementasi, lalu amati perbedaan hasilnya.
5. Gunakan diagram yang tersedia di folder topik terkait sebagai pendamping.

Contoh kode bersifat edukatif dan dapat disesuaikan untuk latihan. Belum semua
implementasi dilengkapi pengujian otomatis.

## Kontribusi

Perbaikan dokumentasi, contoh, diagram, maupun implementasi dipersilakan. Usahakan
perubahan tetap fokus pada topik terkait dan sertakan contoh yang membantu pembaca
memahami perilaku kode.
