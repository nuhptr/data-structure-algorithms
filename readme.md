# Struktur Data dan Algoritma

Kumpulan materi dan implementasi TypeScript untuk mempelajari struktur data,
algoritma, serta dasar analisis kompleksitas. Setiap topik dilengkapi contoh kode
yang dapat dibaca dan dikembangkan sebagai latihan.

Implementasi mengikuti prinsip **SOLID**: setiap kelas punya satu tanggung jawab,
bergantung pada abstraksi (interface), dan terbuka untuk ekstensi tanpa modifikasi.

## Tujuan Pembelajaran

- Memahami cara kerja struktur data dan algoritma umum.
- Mempelajari dampak pilihan algoritma terhadap waktu dan penggunaan memori.
- Melatih pemecahan masalah melalui implementasi dan tantangan kode.
- Mengembangkan kemampuan membaca, menjelaskan, dan memodifikasi kode TypeScript.

## Progres Pembelajaran

| Topik                | Implementasi                                                                                                                                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Pengantar            | Gambaran masalah dan alasan mempelajari struktur data dan algoritma.                                                                                                                                                         |
| Big O                | Contoh kompleksitas waktu konstan, linear, dan kuadratik.                                                                                                                                                                    |
| Array                | Array dasar, implementasi array sederhana, serta membalik string.                                                                                                                                                            |
| Hash table           | Hash table dengan linear probing; tantangan word counter, two sum, dan group anagrams.                                                                                                                                       |
| Graph                | BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Topological Sort, Kruskal, Prim, **A\***, **Bidirectional BFS**.                                                                                                           |
| Linked list          | Single linked list, double linked list, dan latihan terkait.                                                                                                                                                                 |
| Stack dan queue      | Stack (push/pop/top), queue (enqueue/dequeue); tantangan min stack, reverse string, valid parenthesis.                                                                                                                       |
| Sorting              | Bubble, Insertion, Selection, Merge, Quick, Heap, Counting, Radix, **Shell Sort**, **Tim Sort**.                                                                                                                             |
| Search               | Linear, Binary, Jump, **Exponential**, **Interpolation**, **Ternary**.                                                                                                                                                       |
| Tree                 | Binary Search Tree, rekursi, BFS/DFS traversal (pre/post/in-order).                                                                                                                                                         |
| Backtracking         | Combinations, Generate Parentheses, **N-Queens**, **Permutations**, **Sudoku Solver**, **Subset Sum**, **Word Search**.                                                                                                       |
| Dynamic Programming  | Fibonacci, Coin Change, LCS, Knapsack, Edit Distance, LIS, Kadane, Matrix Chain, **Word Break**, **Palindrome Partitioning**, **Burst Balloons**, **Regex Matching**, **Unique Paths**.                                      |
| Greedy               | Activity Selection, Fractional Knapsack, Optimal Merge, **Huffman Coding**, **Task Scheduler**, **Jump Game**.                                                                                                               |
| String Matching      | KMP, Rabin-Karp, Boyer-Moore, **Z-Algorithm**, **Aho-Corasick**, **Suffix Array**.                                                                                                                                           |
| Bit Manipulation     | Bit Operations (get/set/clear/toggle, popcount), **XOR Algorithms** (single number, missing number, reverse bits, Hamming distance), **Bitmask DP** (TSP, min XOR sum).                                                     |
| Data Structures      | MinHeap/MaxHeap, Trie, AVL Tree, Disjoint Set/Union-Find, Fenwick Tree, Segment Tree, **LRU Cache**, **Deque**, **Monotonic Stack** (trapping rain water, next greater element, largest rectangle), **Monotonic Deque** (sliding window max). |

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

## Struktur Proyek

```text
.
├── arrays/              # Array dasar, custom array, dan manipulasi string
├── big-o/               # Contoh analisis kompleksitas
├── backtracking/        # Combinations, Parentheses, N-Queens, Permutations, Sudoku, Subset Sum, Word Search
├── bit-manipulation/    # Bit ops, XOR algorithms, Bitmask DP
├── data-structures/     # Heap, Trie, AVL, Disjoint Set, Fenwick/Segment Tree, LRU Cache, Deque, Monotonic
├── dynamic-programming/ # Fibonacci, Coin Change, LCS, Knapsack, Edit Distance, LIS, Kadane, Word Break, ...
├── graphs/              # BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal, Prim, A*, Bidirectional BFS
├── greedy/              # Activity Selection, Fractional Knapsack, Huffman, Task Scheduler, Jump Game
├── hash-table/          # Hash table dan tantangan terkait
├── introduction/        # Materi pengantar
├── linked-list/         # Single dan double linked list
├── search/              # Linear, Binary, Jump, Exponential, Interpolation, Ternary
├── sorting-algo/        # Bubble, Insertion, Selection, Merge, Quick, Heap, Counting, Radix, Shell, Tim
├── stack-and-queue/     # Stack, queue, dan tantangan
├── strings/             # KMP, Rabin-Karp, Boyer-Moore, Z-Algorithm, Aho-Corasick, Suffix Array
└── tree/                # BST, rekursi, dan traversal
```

## Prinsip SOLID dalam Implementasi

| Prinsip | Penerapan |
| ------- | --------- |
| **S**ingle Responsibility | Setiap kelas hanya mengimplementasikan satu algoritma/struktur data. |
| **O**pen/Closed | Kelas baru ditambahkan tanpa mengubah kelas yang sudah ada; Heap menggunakan comparator untuk ekstensi. |
| **L**iskov Substitution | Implementasi dapat ditukar selama mengikuti interface yang sama (misal: `ISearchAlgorithm`). |
| **I**nterface Segregation | Interface spesifik per algoritma (`ISortAlgorithm`, `IStringMatcher`, dll.) — tidak ada interface "dewa". |
| **D**ependency Inversion | Kode bergantung pada abstraksi (interface), bukan implementasi konkret. |

## Cara Menggunakan

1. Pilih topik dari folder yang sesuai.
2. Baca komentar dan dokumentasi pada file TypeScript.
3. Telusuri contoh untuk memahami alur algoritmanya.
4. Ubah input atau implementasi, lalu amati perbedaan hasilnya.
5. Gunakan diagram yang tersedia di folder topik terkait sebagai pendamping.

Contoh kode bersifat edukatif dan dapat disesuaikan untuk latihan. Belum semua
implementasi dilengkapi pengujian otomatis.

## Kontribusi

Perbaikan dokumentasi, contoh, diagram, maupun implementasi dipersilakan. Usahakan
perubahan tetap fokus pada topik terkait dan sertakan contoh yang membantu pembaca
memahami perilaku kode.
