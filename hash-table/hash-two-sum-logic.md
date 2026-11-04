# Alur Kerja `twosSum`

Dokumen ini menjelaskan implementasi pada `hash-two-sum.ts` dan mengikuti
contoh pada diagram: mencari dua angka yang jumlahnya sama dengan target.

## Input dan hasil

Fungsi menerima objek dengan dua properti:

```ts
{
  nums: number[]
  target: number
}
```

Fungsi mengembalikan array berisi indeks dua angka yang jumlahnya sama dengan
`target`. Indeks dimulai dari `0`. Fungsi mengembalikan pasangan pertama yang
ditemukan, bukan semua pasangan. Jika tidak ada pasangan, hasilnya `[]`.

## Strategi penyimpanan

Di awal pemanggilan, fungsi membuat peta kosong:

```ts
const numMap: Record<number, number> = {}
```

Peta menyimpan angka yang sudah diperiksa sebagai kunci dan indeks angka
tersebut sebagai nilai. Pada setiap iterasi, fungsi menghitung angka pelengkap:

```ts
const complement = target - nums[i]
```

Jika pelengkap sudah ada di peta, pasangan ditemukan. Jika belum, angka saat ini
disimpan agar bisa menjadi pelengkap bagi angka berikutnya.

## Contoh input

```ts
const nums = [2, 7, 11, 13]
const target = 9
```

Kondisi awal:

```text
numMap = {}
```

### Iterasi pertama (`i = 0`)

Angka saat ini adalah `nums[0]`, yaitu `2`. Fungsi menghitung pelengkap:

```text
complement = target - nums[0]
           = 9 - 2
           = 7
```

Peta belum memiliki kunci `7`, jadi pasangan belum ditemukan. Fungsi
menyimpan angka saat ini beserta indeksnya:

```text
numMap[2] = 0
numMap = { 2: 0 }
```

### Iterasi kedua (`i = 1`)

Angka saat ini adalah `nums[1]`, yaitu `7`. Fungsi menghitung pelengkap:

```text
complement = target - nums[1]
           = 9 - 7
           = 2
```

Peta sudah memiliki kunci `2`, dengan indeks `0`. Karena itu, angka pada indeks
`0` dan indeks saat ini (`1`) membentuk pasangan:

```text
nums[0] + nums[1] = 2 + 7 = 9
```

Fungsi langsung mengembalikan:

```text
[numMap[2], 1]
-> [0, 1]
```

Fungsi berhenti pada iterasi ini. Angka `11` dan `13` tidak diperiksa, dan
`numMap[7]` tidak dibuat karena pemeriksaan pasangan berhasil sebelum angka
saat ini disimpan.

## Alur lengkap

```text
twosSum({ nums: [2, 7, 11, 13], target: 9 })
  -> numMap = {}

i = 0
  -> nums[0] = 2
  -> complement = 9 - 2 = 7
  -> 7 belum ada di numMap
  -> simpan numMap[2] = 0
  -> numMap = { 2: 0 }

i = 1
  -> nums[1] = 7
  -> complement = 9 - 7 = 2
  -> 2 ditemukan di numMap pada indeks 0
  -> kembalikan [0, 1] dan hentikan iterasi
```

## Hasil `console.log`

Kode contoh memanggil fungsi dan menyimpan hasilnya:

```ts
const result = twosSum({ nums: arrNum, target: target })
console.log(result)
```

Untuk input contoh, pemanggilan tersebut mencetak:

```text
[ 0, 1 ]
```

Format spasi dapat berbeda antar-console. Nilai hasilnya tetap `[0, 1]`, yang
menunjukkan indeks angka `2` dan `7`.

Fungsi tidak mencetak isi peta atau langkah iterasi ke console; satu-satunya
output dari `console.log` di file adalah array hasil.

## Jika pasangan tidak ditemukan

Jika perulangan selesai tanpa menemukan pelengkap, fungsi menjalankan
`return []`. Contohnya:

```ts
twosSum({ nums: [2, 4], target: 9 })
// []
```

## Kompleksitas

- **Waktu: O(n)** — setiap angka diperiksa paling banyak satu kali.
- **Ruang: O(n)** — peta dapat menyimpan angka-angka yang telah diperiksa.
