# Algoritma di Balik E-Commerce (Tokopedia, Shopee, Amazon)

---

## Alur Lengkap dari Search sampai Pengiriman

```
User ketik "septu lari"
      ↓
Levenshtein → koreksi jadi "sepatu lari"
      ↓
Inverted Index → ambil semua produk yang mengandung "sepatu" atau "lari"
      ↓
TF-IDF → ranking produk dari yang paling relevan
      ↓
Cosine Similarity → tampilkan "Produk Serupa" di halaman produk
      ↓
Collaborative Filtering → tampilkan "Rekomendasi untuk Kamu"
      ↓
Bloom Filter → sebelum checkout, cek apakah akun terindikasi fraud
      ↓
Bin Packing → saat packing di gudang, minimasi jumlah kotak
```

---

## 1. Inverted Index

**Masalah:** Bagaimana search engine bisa menemukan produk yang relevan dari jutaan produk dalam milidetik?

**Solusi:** Alih-alih menelusuri semua produk satu per satu untuk setiap query (O(n)), bangun terlebih dahulu sebuah index yang memetakan setiap kata ke daftar produk yang mengandung kata itu.

```
Index:
  "sepatu" → [P1, P2, P5, P8]
  "lari"   → [P1, P3, P5]
  "nike"   → [P1, P2, P4]

Query "sepatu lari":
  lookup "sepatu" → [P1, P2, P5, P8]
  lookup "lari"   → [P1, P3, P5]
  score P1 = 2 (muncul di keduanya) ← ranking tertinggi
  score P2 = 1, P3 = 1, P5 = 2, P8 = 1
```

**Kompleksitas:**
- Build: O(n × L) — n produk, L rata-rata panjang deskripsi
- Search: O(k) per query — k kata dalam query, bukan n produk

**Di mana dipakai:** Elasticsearch (dipakai Tokopedia, Shopee) di bawahnya menggunakan struktur ini.

---

## 2. TF-IDF (Term Frequency - Inverse Document Frequency)

**Masalah:** Inverted Index hanya menghitung frekuensi kemunculan kata. Tapi kata "dan", "atau", "di" muncul di semua produk — mereka tidak seharusnya mendapat skor tinggi.

**Solusi:** TF-IDF memberi bobot tinggi pada kata yang sering muncul di SATU produk tapi jarang di produk lain.

```
TF(kata, produk)  = jumlah kemunculan kata di produk / total kata di produk
IDF(kata)         = log(total produk / jumlah produk yang mengandung kata)
TF-IDF            = TF × IDF
```

**Contoh:**

```
Produk A: "sepatu lari nike merah ukuran 42"
Produk B: "sepatu casual nike putih"
Produk C: "kaos lari adidas"

Kata "sepatu": muncul di A dan B → IDF rendah (kata umum di konteks ini)
Kata "nike":   muncul di A dan B → IDF sedang
Kata "merah":  hanya muncul di A → IDF tinggi (kata spesifik)

Query "sepatu merah":
  Produk A mendapat skor tinggi karena "merah" sangat spesifik ke A
  Produk B mendapat skor rendah walau punya "sepatu"
```

**Di mana dipakai:** Ranking awal hasil search sebelum ML ranking model diaplikasikan.

---

## 3. Levenshtein Distance

**Masalah:** User sering typo saat search. "septu", "niike", "adidass" — kalau dicari exact match, hasilnya kosong dan user frustrasi.

**Solusi:** Hitung jumlah minimum operasi edit (insert, delete, replace) untuk mengubah satu kata menjadi kata lain. Jarak kecil = kemungkinan typo dari kata yang dimaksud.

```
"septu" → "sepatu" : insert "a"           → distance = 1
"niike" → "nike"   : delete "i"           → distance = 1
"kitten" → "sitting":
  kitten → sitten  (replace k→s)
  sitten → sittin  (replace e→i)
  sittin → sitting (insert g)             → distance = 3
```

**Cara kerja (DP table):**

```
      ""  s  e  p  a  t  u
  ""  [0, 1, 2, 3, 4, 5, 6]
  s   [1, 0, 1, 2, 3, 4, 5]
  e   [2, 1, 0, 1, 2, 3, 4]
  p   [3, 2, 1, 0, 1, 2, 3]
  t   [4, 3, 2, 1, 1, 1, 2]
  u   [5, 4, 3, 2, 2, 2, 1]  ← jarak = 1
```

**Di mana dipakai:** Search bar autocorrect, "Mungkin maksud Anda: ...", fuzzy product name matching.

---

## 4. Cosine Similarity

**Masalah:** Bagaimana mengukur seberapa mirip dua produk atau dua user?

**Solusi:** Representasikan produk/user sebagai vektor angka, lalu ukur sudut antara dua vektor. Sudut kecil (cosine mendekati 1) = sangat mirip.

```
Produk sebagai vektor fitur:
  dimensi = [harga, rating, berat, stok]

  Sepatu Nike A = [500000, 4.8, 0.3, 100]
  Sepatu Nike B = [480000, 4.7, 0.3,  80]
  Sandal Jepit  = [ 15000, 3.2, 0.1, 500]

  similarity(Nike A, Nike B)   = 0.99  → sangat mirip ✓
  similarity(Nike A, Sandal)   = 0.21  → tidak mirip ✓
```

**Formula:**
```
similarity = (A · B) / (|A| × |B|)
           = (jumlah hasil kali elemen) / (panjang A × panjang B)
```

**Di mana dipakai:** "Produk Serupa", rekomendasi berbasis konten, clustering produk per kategori.

---

## 5. Collaborative Filtering (User-Based)

**Masalah:** Bagaimana merekomendasikan produk yang belum pernah dilihat user, tapi kemungkinan besar akan disukai?

**Solusi:** Cari user lain yang punya pola pembelian/rating mirip (neighbors), lalu rekomendasikan produk yang sudah mereka beli tapi belum dibeli target user.

```
Rating matrix (1-5):

           itemA  itemB  itemC  itemD
  user1  [  5,     3,     4,     ?  ]  ← yang mau diprediksi
  user2  [  4,     2,     ?,     5  ]
  user3  [  ?,     5,     3,     4  ]

Langkah:
  1. Hitung similarity user1 dengan user2 dan user3
     sim(user1, user2) = 0.95  → sangat mirip
     sim(user1, user3) = 0.60  → lumayan mirip

  2. Prediksi rating user1 untuk itemD:
     predicted = (0.95×5 + 0.60×4) / (0.95 + 0.60) = 4.61

  3. Rekomendasikan itemD dengan predicted score 4.61
```

**Di mana dipakai:** "Rekomendasi untuk Kamu", "User lain yang membeli ini juga membeli...", homepage personalisasi.

---

## 6. Bloom Filter

**Masalah:** Database fraud berisi ratusan juta email/device ID. Mengecek setiap transaksi ke database = lambat dan mahal. Tapi harus cepat — fraud check harus selesai < 50ms.

**Solusi:** Bloom Filter menyimpan representasi ringkas (bit array) dari semua data fraud. Check keanggotaan O(k) tanpa akses database, dengan trade-off: bisa false positive, tapi tidak pernah false negative.

```
Properti penting:
  "mightContain" = true  → MUNGKIN ada (perlu verifikasi ke DB)
  "mightContain" = false → PASTI tidak ada (skip DB, langsung lanjut)

Cara kerja:
  add("fraud@email.com"):
    hash1("fraud@email.com") % 100 = 23 → set bit 23
    hash2("fraud@email.com") % 100 = 67 → set bit 67
    hash3("fraud@email.com") % 100 = 11 → set bit 11

  check("clean@email.com"):
    hash1("clean@email.com") % 100 = 45 → bit 45 = 0 → PASTI tidak ada ✓

  check("fraud@email.com"):
    hash1 → bit 23 = 1
    hash2 → bit 67 = 1
    hash3 → bit 11 = 1 → MUNGKIN ada → verify ke DB
```

**Penghematan:** Set Python untuk 100 juta string ≈ 8 GB RAM. Bloom Filter dengan FPR 1% ≈ 114 MB RAM. **70× lebih hemat.**

**Di mana dipakai:** Fraud detection, duplicate order prevention, cache negative lookup (hindari DB query untuk key yang tidak ada).

---

## 7. Bin Packing (First Fit Decreasing)

**Masalah:** Customer memesan 10 item berbeda ukuran. Bagaimana mengemas semuanya ke dalam kotak sesedikit mungkin untuk meminimalkan biaya pengiriman?

**Solusi:** First Fit Decreasing (FFD) — urutkan item dari yang terbesar, lalu masukkan ke kotak pertama yang masih muat. Buka kotak baru jika tidak ada yang muat.

```
Kapasitas kotak = 10
Item (sudah diurutkan besar ke kecil): [7, 6, 4, 3, 2, 1]

Kotak 1: masukkan 7 → sisa 3
         coba 6 → tidak muat
         masukkan 3 → sisa 0  ✓

Kotak 2: masukkan 6 → sisa 4
         masukkan 4 → sisa 0  ✓

Kotak 3: masukkan 2 → sisa 8
         masukkan 1 → sisa 7  ✓

Hasil: 3 kotak (optimal!)
Tanpa sorting (First Fit biasa) bisa butuh 4 kotak.
```

**Jaminan FFD:** Jumlah kotak ≤ (11/9) × jumlah optimal + 1. Sangat mendekati optimal dalam praktik.

**Di mana dipakai:** Warehouse packing automation, optimasi kontainer pengiriman, cloud resource allocation (VM ke server).

---

## Ringkasan

| Algoritma | Masalah yang Diselesaikan | Kompleksitas |
|---|---|---|
| **Inverted Index** | Cari produk dari jutaan item dalam milidetik | O(k) per query |
| **TF-IDF** | Ranking relevansi hasil search | O(k × n) |
| **Levenshtein** | Koreksi typo di search bar | O(m × n) per pasang kata |
| **Cosine Similarity** | Ukur kemiripan produk / user | O(d) per pasang vektor |
| **Collaborative Filtering** | Rekomendasi personal "user lain juga beli" | O(U × I) |
| **Bloom Filter** | Fraud check cepat tanpa hit database | O(k) — hampir konstan |
| **Bin Packing** | Optimasi jumlah kotak pengiriman | O(n²) |
