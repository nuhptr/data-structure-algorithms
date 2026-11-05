# Alur Kerja `groupAnagrams`

Dokumen ini menjelaskan implementasi terkini pada `group-anagrams.ts`.
Fungsi mengelompokkan string berdasarkan karakter yang sudah diurutkan dan
mengembalikan objek map, bukan array kelompok.

## Algoritma Berpikir

Tujuannya adalah memberi kunci yang sama pada kata-kata dengan huruf yang sama.
Urutan huruf asli boleh berbeda.

1. Urutkan huruf setiap kata untuk membuat kuncinya:

   ```text
   "eat" -> "aet"
   "tea" -> "aet"
   "tan" -> "ant"
   ```

2. Gunakan kunci itu untuk mencari kelompok di `anagramMap`.
3. Jika kunci belum ada, buat kelompok baru dan masukkan kata asli:

   ```text
   "eat" -> anagramMap["aet"] = ["eat"]
   ```

4. Jika kunci sudah ada, tambahkan kata asli ke kelompok itu:

   ```text
   "tea" -> anagramMap["aet"] = ["eat", "tea"]
   ```

5. Ulangi sampai semua input diproses, lalu kembalikan map.

Untuk contoh kode, `Object.values(strs)` memberikan kata-kata yang akan
dikelompokkan. Sebaliknya, `Object.keys(strs)` memberikan indeks array
(`"0"`, `"1"`, dan seterusnya), bukan kata-katanya.

## Logika fungsi

Fungsi menerima array string dan menyiapkan objek untuk menyimpan kelompok:

```ts
const anagramMap: Record<string, T[]> = {}
```

Untuk setiap string, fungsi:

1. Memecah string menjadi karakter.
2. Mengurutkan karakter dan menggabungkannya kembali menjadi `sortedStr`.
3. Mencetak `sortedStr` ke console.
4. Menambahkan string asli ke kelompok dengan kunci `sortedStr`. Jika kuncinya
   belum ada, fungsi membuat kelompok baru.

Contoh pembentukan kunci:

```text
"eat".split("") -> ["e", "a", "t"]
["e", "a", "t"].sort() -> ["a", "e", "t"]
["a", "e", "t"].join("") -> "aet"
```

Karena `"eat"`, `"tea"`, dan `"ate"` memiliki kunci `"aet"`, ketiganya masuk ke
kelompok yang sama.

Sesudah seluruh input diproses, fungsi mengembalikan `anagramMap` secara
langsung. Kunci map adalah string terurut, sedangkan nilainya adalah array
string asli:

```ts
return anagramMap
```

Tipe hasilnya adalah `Record<string, T[]>`. Jika input kosong, hasilnya `{}`.
Fungsi tidak mengubah huruf menjadi lowercase atau menormalisasi karakter;
pengelompokan mengikuti hasil pengurutan karakter string JavaScript.

## Contoh input

```ts
const strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
```

### Perubahan map untuk `Object.values(strs)`

`Object.values(strs)` menghasilkan nilai array sesuai urutannya. Pada contoh
ini, hasilnya sama dengan `strs`:

```text
["eat", "tea", "tan", "ate", "nat", "bat"]
```

Fungsi memproses setiap nilai sebagai berikut:

| Input   | Kunci terurut | Perubahan kelompok                  |
| ------- | ------------- | ----------------------------------- |
| `"eat"` | `"aet"`       | Buat `aet: ["eat"]`                 |
| `"tea"` | `"aet"`       | Tambahkan `"tea"` ke kelompok `aet` |
| `"tan"` | `"ant"`       | Buat `ant: ["tan"]`                 |
| `"ate"` | `"aet"`       | Tambahkan `"ate"` ke kelompok `aet` |
| `"nat"` | `"ant"`       | Tambahkan `"nat"` ke kelompok `ant` |
| `"bat"` | `"abt"`       | Buat `abt: ["bat"]`                 |

Map yang dikembalikan oleh pemanggilan ini:

```text
{
  aet: ["eat", "tea", "ate"],
  ant: ["tan", "nat"],
  abt: ["bat"]
}
```

## Pemanggilan pada kode

Kode menjalankan fungsi dua kali:

```ts
const groupsValues = groupAnagrams(Object.values(strs))
const groupsKey = groupAnagrams(Object.keys(strs))
```

### `groupsValues`

`Object.values(strs)` berisi kata-kata di dalam array. Maka `groupsValues`
adalah map anagram seperti contoh di atas:

```text
{
  aet: ["eat", "tea", "ate"],
  ant: ["tan", "nat"],
  abt: ["bat"]
}
```

### `groupsKey`

`Object.keys(strs)` tidak mengambil kata-katanya. Untuk array tersebut, method
ini menghasilkan indeks elemen sebagai string:

```text
["0", "1", "2", "3", "4", "5"]
```

Setiap nilai hanya berisi satu karakter, sehingga pengurutan tidak mengubah
nilainya. Tidak ada indeks berulang, jadi setiap indeks membentuk kelompoknya
sendiri:

```text
{
  "0": ["0"],
  "1": ["1"],
  "2": ["2"],
  "3": ["3"],
  "4": ["4"],
  "5": ["5"]
}
```
