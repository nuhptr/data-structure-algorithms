# Struktur Data dan Algoritma

Kumpulan materi dan implementasi TypeScript untuk mempelajari struktur data,
algoritma, serta dasar analisis kompleksitas. Setiap topik dilengkapi contoh kode
yang dapat dibaca dan dikembangkan sebagai latihan.

Implementasi mengikuti prinsip **SOLID**: setiap kelas punya satu tanggung jawab,
bergantung pada abstraksi (interface), dan terbuka untuk ekstensi tanpa modifikasi.

Jalankan demo interaktif untuk semua topik:

```bash
npm install
npm run demo        # atau: npx tsx main.ts
```

Menu akan menampilkan daftar topik yang tersedia; pilih nomor atau nama topik untuk
menjalankan contohnya, atau `q` untuk keluar.

## Tujuan Pembelajaran

- Memahami cara kerja struktur data dan algoritma umum.
- Mempelajari dampak pilihan algoritma terhadap waktu dan penggunaan memori.
- Melatih pemecahan masalah melalui implementasi dan tantangan kode.
- Mengembangkan kemampuan membaca, menjelaskan, dan memodifikasi kode TypeScript.

## Progres Pembelajaran

| Topik               | Implementasi                                                                                                                                                                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pengantar           | Gambaran masalah dan alasan mempelajari struktur data dan algoritma.                                                                                                                                                                          |
| Big O               | Contoh kompleksitas waktu konstan, linear, dan kuadratik.                                                                                                                                                                                     |
| Array               | Array dasar, implementasi array sederhana, serta membalik string.                                                                                                                                                                             |
| Hash table          | Hash table dengan linear probing; tantangan word counter, two sum, dan group anagrams.                                                                                                                                                        |
| Graph               | BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Topological Sort, Kruskal, Prim, **A\***, **Bidirectional BFS**.                                                                                                                            |
| Linked list         | Single linked list, double linked list, dan latihan terkait.                                                                                                                                                                                  |
| Stack dan queue     | Stack (push/pop/top), queue (enqueue/dequeue); tantangan min stack, reverse string, valid parenthesis.                                                                                                                                        |
| Sorting             | Bubble, Insertion, Selection, Merge, Quick, Heap, Counting, Radix, **Shell Sort**, **Tim Sort**.                                                                                                                                              |
| Search              | Linear, Binary, Jump, **Exponential**, **Interpolation**, **Ternary**.                                                                                                                                                                        |
| Tree                | Binary Search Tree, rekursi, BFS/DFS traversal (pre/post/in-order).                                                                                                                                                                           |
| Backtracking        | Combinations, Generate Parentheses, **N-Queens**, **Permutations**, **Sudoku Solver**, **Subset Sum**, **Word Search**.                                                                                                                       |
| Dynamic Programming | Fibonacci, Coin Change, LCS, Knapsack, Edit Distance, LIS, Kadane, Matrix Chain, **Word Break**, **Palindrome Partitioning**, **Burst Balloons**, **Regex Matching**, **Unique Paths**.                                                       |
| Greedy              | Activity Selection, Fractional Knapsack, Optimal Merge, **Huffman Coding**, **Task Scheduler**, **Jump Game**.                                                                                                                                |
| String Matching     | KMP, Rabin-Karp, Boyer-Moore, **Z-Algorithm**, **Aho-Corasick**, **Suffix Array**.                                                                                                                                                            |
| Bit Manipulation    | Bit Operations (get/set/clear/toggle, popcount), **XOR Algorithms** (single number, missing number, reverse bits, Hamming distance), **Bitmask DP** (TSP, min XOR sum).                                                                       |
| Data Structures     | MinHeap/MaxHeap, Trie, AVL Tree, Disjoint Set/Union-Find, Fenwick Tree, Segment Tree, **LRU Cache**, **Deque**, **Monotonic Stack** (trapping rain water, next greater element, largest rectangle), **Monotonic Deque** (sliding window max). |

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

- **Algoritma baru (batch update)** mencakup semua pola yang sering muncul di
  interview unicorn companies (Google, Meta, Amazon, Stripe, Airbnb, Uber):
    - Backtracking: N-Queens, Sudoku Solver, Permutations, Word Search, Subset Sum.
    - Graph: A* Search dan Bidirectional BFS.
    - Search: Exponential, Interpolation, Ternary Search.
    - Sorting: Shell Sort dan Tim Sort (digunakan Python & Java).
    - String: Z-Algorithm, Aho-Corasick, Suffix Array.
    - Data structures: LRU Cache, Deque, Monotonic Stack/Deque.
    - DP: Word Break, Palindrome Partitioning, Burst Balloons, Regex Matching, Unique Paths.
    - Greedy: Huffman Coding, Task Scheduler, Jump Game.
    - Bit: XOR Algorithms, Bitmask DP (TSP, Minimum XOR Sum).
- Semua implementasi baru mengikuti pola yang sama: interface (kontrak) →
  kelas implementasi → JSDoc + contoh + kompleksitas.
- Barrel exports (`index.ts`) diperbarui di setiap folder.
- **Refactor SOLID & demo runner**: seluruh kode bergaya skrip (fungsi +
  `console.log` inline) diubah menjadi kelas yang `implements` interface
  per-topik; ditambah `main.ts` sebagai entry point interaktif, `demo.ts`
  per topik, dan formatting Prettier (`.prettierrc.json`).

## Struktur Proyek

```text
.
├── main.ts               # Entry point demo interaktif (npx tsx main.ts)
├── demo-utils.ts         # Helper output demo (section/show)
├── node-shims.d.ts       # Deklarasi minimal Node API untuk tsc --strict
├── .prettierrc.json      # Konfigurasi Prettier
├── arrays/               # Array dasar, custom array, dan manipulasi string
├── big-o/               # Contoh analisis kompleksitas
├── backtracking/        # Combinations, Parentheses, N-Queens, Permutations, Sudoku, Subset Sum, Word Search
├── bit-manipulation/    # Bit ops, XOR algorithms, Bitmask DP
├── data-structures/     # Heap, Trie, AVL, Disjoint Set, Fenwick/Segment Tree, LRU Cache, Deque, Monotonic
├── dynamic-programming/ # Fibonacci, Coin Change, LCS, Knapsack, Edit Distance, LIS, Kadane, Word Break, ...
├── ecommerce/           # Kasus ecommerce: TF-IDF, cosine similarity, collaborative filtering, dst.
├── graphs/              # BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal, Prim, A*, Bidirectional BFS
├── greedy/              # Activity Selection, Fractional Knapsack, Huffman, Task Scheduler, Jump Game
├── hash-table/          # Hash table dan tantangan terkait
├── introduction/        # Materi pengantar
├── linked-list/         # Single dan double linked list
├── ride-hailing/        # Kasus ride-hailing: Haversine, Quadtree, A*, Hungarian, dst.
├── search/              # Linear, Binary, Jump, Exponential, Interpolation, Ternary
├── sorting-algo/        # Bubble, Insertion, Selection, Merge, Quick, Heap, Counting, Radix, Shell, Tim
├── stack-and-queue/     # Stack, queue, dan tantangan
├── strings/             # KMP, Rabin-Karp, Boyer-Moore, Z-Algorithm, Aho-Corasick, Suffix Array
└── tree/                # BST, rekursi, dan traversal
```

## Prinsip SOLID dalam Implementasi

| Prinsip                   | Penerapan                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| **S**ingle Responsibility | Setiap kelas hanya mengimplementasikan satu algoritma/struktur data.                                      |
| **O**pen/Closed           | Kelas baru ditambahkan tanpa mengubah kelas yang sudah ada; Heap menggunakan comparator untuk ekstensi.   |
| **L**iskov Substitution   | Implementasi dapat ditukar selama mengikuti interface yang sama (misal: `ISearchAlgorithm`).              |
| **I**nterface Segregation | Interface spesifik per algoritma (`ISortAlgorithm`, `IStringMatcher`, dll.) — tidak ada interface "dewa". |
| **D**ependency Inversion  | Kode bergantung pada abstraksi (interface), bukan implementasi konkret.                                   |

## Cara Menggunakan

1. Jalankan `npm run demo` (atau `npx tsx main.ts`) untuk memilih topik secara
   interaktif, atau pilih topik dari folder yang sesuai.
2. Baca komentar dan dokumentasi pada file TypeScript.
3. Telusuri contoh gambaran algoritma di README dan dokumentasi topik untuk
   memahami alurnya.
4. Ubah input atau implementasi, lalu amati perbedaan hasilnya.
5. Gunakan diagram yang tersedia di folder topik terkait sebagai pendamping.

Setiap folder topik memiliki `index.ts` (barrel export), `interfaces.ts`
(kontrak), file implementasi, dan `demo.ts` berisi `runDemo()` yang bisa
dijalankan lewat entry point `main.ts`.

Contoh kode bersifat edukatif dan dapat disesuaikan untuk latihan. Belum semua
implementasi dilengkapi pengujian otomatis.

## Kontribusi

Perbaikan dokumentasi, contoh, diagram, maupun implementasi dipersilakan. Usahakan
perubahan tetap fokus pada topik terkait dan sertakan contoh yang membantu pembaca
memahami perilaku kode.
