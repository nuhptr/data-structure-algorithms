# Algoritma di Balik Ride-Hailing Apps (Uber, Gojek, Grab)

---

## 1. Routing & Navigation

Tugas: temukan rute terpendek dari titik A ke B di jaringan jalan nyata.

### Dijkstra

Algoritma klasik shortest path pada graf berbobot non-negatif. Dipakai sebagai fondasi, tapi terlalu lambat untuk road network skala kota besar karena harus mengeksplorasi terlalu banyak node.

### A\* (A-Star)

Pengembangan dari Dijkstra yang menambahkan **heuristic function** — estimasi jarak tersisa ke tujuan. Dengan heuristic yang baik (misal jarak Euclidean), A\* hanya mengeksplorasi node yang relevan sehingga jauh lebih cepat.

```
f(n) = g(n) + h(n)
g(n) = biaya dari start ke node n
h(n) = estimasi biaya dari n ke tujuan (heuristic)
```

### Contraction Hierarchies (CH)

Yang sebenarnya dipakai Uber di production. Ide: preprocessing road network dengan membuat "shortcut" antar node penting (highway, junction besar), sehingga query routing bisa ribuan kali lebih cepat dari Dijkstra. Uber open-source engine routing mereka di atas konsep ini.

---

## 2. Driver-Passenger Matching

Tugas: pasangkan ratusan penumpang dengan ratusan driver secara optimal dalam hitungan detik.

### Hungarian Algorithm

Solusi optimal untuk **Assignment Problem** — masalah matching bipartite berbobot yang meminimalkan total biaya (waktu tunggu, jarak, dll). Kompleksitas O(n³), cocok untuk batch matching.

```
Contoh:
- 3 penumpang: P1, P2, P3
- 3 driver:    D1, D2, D3
- Matriks biaya (menit):
       D1  D2  D3
  P1 [  2,  3,  7 ]
  P2 [  6,  4,  3 ]
  P3 [  8,  5,  2 ]

Matching optimal: P1→D1 (2), P2→D2 (4), P3→D3 (2) = total 8 menit
```

### Bipartite Graph Matching

Versi yang lebih scalable untuk real-time. Uber dan Grab membagi kota menjadi zona-zona kecil, lalu jalankan matching per zona secara paralel, sehingga problem size per matching jauh lebih kecil.

### H3 Hexagonal Grid (Uber)

Sebelum matching, Uber partisi seluruh permukaan bumi dengan hexagonal grid (H3). Setiap hexagon punya ID unik. Untuk cari driver terdekat, cukup lookup hexagon yang sama dan hexagon-hexagon tetangga — jauh lebih cepat dari brute-force radius search.

---

## 3. Dynamic Pricing (Surge Pricing)

Tugas: sesuaikan harga secara real-time berdasarkan supply (driver) dan demand (penumpang).

### Supply-Demand Equilibrium

Prinsip dasar: jika penumpang >> driver di suatu zona, harga naik agar:

1. Driver dari zona lain tertarik masuk
2. Sebagian penumpang menunda perjalanan (demand turun)

Surge multiplier dihitung per hexagon/geohash zone.

### Time-Series Forecasting

Prediksi demand 15-60 menit ke depan menggunakan:

- **ARIMA** — untuk pola musiman sederhana (jam sibuk pagi/sore)
- **LSTM (Long Short-Term Memory)** — untuk pola yang lebih kompleks

Dengan prediksi ini, driver bisa diarahkan ke zona yang akan ramai sebelum demand benar-benar melonjak.

### Reinforcement Learning

Uber dan Grab riset pricing menggunakan RL — agent belajar kebijakan pricing yang memaksimalkan revenue jangka panjang sekaligus menjaga driver utilization dan penumpang terlayani.

---

## 4. ETA (Estimated Time of Arrival)

Tugas: prediksi waktu tiba secara akurat, bukan sekadar hitung jarak/kecepatan.

### Routing-based baseline

ETA dasar = jarak rute / kecepatan rata-rata historis per segmen jalan.

### Machine Learning (Gradient Boosting)

Di atas baseline routing, Uber melatih model XGBoost/LightGBM dengan fitur:

- Waktu hari ini (jam, hari, hari libur)
- Kondisi cuaca
- Kepadatan traffic real-time
- Jumlah lampu merah di rute

Output model lebih akurat 20-40% dibanding baseline routing.

### Kalman Filter

Digunakan untuk **smoothing** data posisi GPS driver yang noisy (sinyal GPS bisa loncat-loncat). Kalman Filter memperkirakan posisi sebenarnya dengan menggabungkan pengukuran GPS dan prediksi pergerakan.

---

## 5. Geospatial — Cari Driver Terdekat

Tugas: dari posisi penumpang, temukan semua driver dalam radius X dalam waktu < 100ms.

### Haversine Formula

Menghitung jarak sebenarnya antara dua titik koordinat GPS di permukaan bumi (bukan jarak Euclidean datar).

```
a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlon/2)
c = 2 × atan2(√a, √(1−a))
d = R × c   (R = 6371 km)
```

### Geohash

Encode koordinat GPS (lat, lon) menjadi string pendek. Dua titik yang berdekatan akan memiliki Geohash prefix yang sama, sehingga proximity search bisa dilakukan dengan string prefix matching — bisa diindeks di database biasa.

```
Jakarta Selatan: -6.2615, 106.8106 → Geohash: "qqgud"
Titik terdekat akan share prefix "qqgu" atau "qqg"
```

### Quadtree / R-Tree

Struktur data tree yang membagi 2D space secara rekursif. Node daun menyimpan posisi driver. Query "semua driver dalam radius R" berjalan O(log n + k) di mana k = jumlah hasil.

---

## 6. Infrastruktur Real-time

### Consistent Hashing

Ratusan juta posisi GPS driver dikirim setiap detik. Consistent Hashing mendistribusikan driver ke server tracking berdasarkan driver ID, sehingga penambahan/pengurangan server tidak menyebabkan redistribusi masif.

### Pub/Sub (Apache Kafka)

Setiap update posisi GPS driver dipublikasikan ke Kafka topic. Berbagai consumer (matching engine, ETA service, surge pricing) berlangganan ke stream yang sama secara independen.

---

## Ringkasan: Algoritma → Masalah

| Masalah                   | Algoritma                                |
| ------------------------- | ---------------------------------------- |
| Rute terpendek            | Dijkstra → A\* → Contraction Hierarchies |
| Matching driver-penumpang | Hungarian Algorithm, Bipartite Matching  |
| Partisi zona              | H3 Hexagonal Grid, Geohash               |
| Cari driver terdekat      | Quadtree, R-Tree, Geohash prefix         |
| Hitung jarak GPS          | Haversine Formula                        |
| Prediksi demand           | ARIMA, LSTM                              |
| ETA akurat                | XGBoost + Kalman Filter                  |
| Surge pricing             | Supply-Demand + RL                       |
| Distribusi load           | Consistent Hashing                       |
| Stream GPS real-time      | Apache Kafka (Pub/Sub)                   |

---

## Yang Bisa Diimplementasikan (TypeScript)

Dari semua algoritma di atas, yang paling relevan untuk dipelajari dan diimplementasikan:

1. **A\* Search** — routing lebih cepat dari Dijkstra
2. **Hungarian Algorithm** — optimal driver-passenger matching
3. **Haversine Formula** — jarak dua koordinat GPS
4. **Geohash encode/decode** — proximity search berbasis string
5. **Quadtree** — spatial indexing 2D untuk nearest neighbor search
