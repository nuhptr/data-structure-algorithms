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

| Topik           | Materi dan implementasi                                                                                                                                                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pengantar       | Gambaran masalah dan alasan mempelajari struktur data dan algoritma.                                                                                                                                                                                                |
| Big O           | Contoh kompleksitas waktu konstan, linear, dan kuadratik.                                                                                                                                                                                                           |
| Array           | Array dasar, implementasi array sederhana, serta membalik string.                                                                                                                                                                                                   |
| Hash table      | Implementasi hash table dengan linear probing ([alur](./hash-table/index-logic.md)); tantangan [word counter](./hash-table/hash-word-instance-logic.md), [two sum](./hash-table/hash-two-sum-logic.md), dan [group anagrams](./hash-table/group-anagrams-logic.md). |
| Graph           | Representasi adjacency list serta operasi simpul dan sisi pada graf tak berarah.                                                                                                                                                                                    |
| Linked list     | Implementasi single linked list, double linked list, dan latihan terkait.                                                                                                                                                                                           |
| Stack dan queue | Implementasi stack dan queue beserta beberapa latihan.                                                                                                                                                                                                              |
| Sorting         | [Bubble sort](./sorting-algo/bubble-sort-logic.md), [insertion sort](./sorting-algo/insertion-sort-logic.md), [merge sort](./sorting-algo/merge-sort-logic.md), dan [selection sort](./sorting-algo/selection-sort-logic.md).                                       |
| Tree            | [Binary search tree](./tree/bst-logic.md), [rekursi](./tree/recursion-logic.md), dan [traversal](./tree/tree-traversal-logic.md).                                                                                                                                   |

### Progres Terbaru

- Dokumentasi alur berbahasa Indonesia tersedia untuk custom array, graph,
  operasi hash table dan tantangannya, empat algoritma sorting, serta materi
  tree (BST, rekursi, dan traversal).
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
3. Telusuri contoh untuk memahami alur algoritmanya.
4. Ubah input atau implementasi, lalu amati perbedaan hasilnya.
5. Gunakan diagram yang tersedia di folder topik terkait sebagai pendamping.

Contoh kode bersifat edukatif dan dapat disesuaikan untuk latihan. Belum semua
implementasi dilengkapi pengujian otomatis.

## Kontribusi

Perbaikan dokumentasi, contoh, diagram, maupun implementasi dipersilakan. Usahakan
perubahan tetap fokus pada topik terkait dan sertakan contoh yang membantu pembaca
memahami perilaku kode.
