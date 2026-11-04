interface ISum {
    /** Daftar angka yang akan diperiksa. */
    nums: number[]
    /** Jumlah yang harus dihasilkan oleh pasangan angka. */
    target: number
}

/**
 * Mencari satu pasangan indeks berbeda di dalam `nums` yang nilai angkanya
 * jika dijumlahkan sama dengan `target`.
 *
 * Peta `numMap` menyimpan angka yang sudah diperiksa sebagai kunci dan indeksnya
 * sebagai nilai. Saat memeriksa angka pada indeks `i`, fungsi menghitung angka
 * pelengkap dengan rumus `target - nums[i]`. Jika angka pelengkap sudah ada di peta,
 * berarti kedua angka tersebut memenuhi target. Fungsi lalu mengembalikan indeks
 * pelengkap terlebih dahulu, diikuti indeks saat ini.
 *
 * Fungsi berhenti pada pasangan pertama yang ditemukan; fungsi tidak mengumpulkan
 * semua pasangan. Indeks yang dikembalikan dimulai dari 0. Jika tidak ada pasangan
 * yang jumlahnya sama dengan target, fungsi mengembalikan array kosong (`[]`).
 *
 * Contoh proses untuk `nums = [2, 7, 11, 13]` dan `target = 9`:
 * - Indeks 0: angka 2 membutuhkan pelengkap 7. Belum ada di peta, jadi simpan `2: 0`.
 * - Indeks 1: angka 7 membutuhkan pelengkap 2. Peta berisi `2: 0`, jadi hasilnya `[0, 1]`.
 *
 * @param input Objek berisi daftar angka (`nums`) dan jumlah yang dicari (`target`).
 * @returns Array berisi dua indeks yang jumlah nilainya sama dengan target,
 *          atau array kosong jika pasangan tidak ditemukan.
 */
const twosSum = ({ nums, target }: ISum) => {
    const numMap: Record<number, number> = {}

    for (let i = 0; i < nums.length; i++) {
        // Cari nilai yang jika dijumlahkan dengan angka saat ini menghasilkan target.
        const complement = target - nums[i]

        // Jika pelengkap sudah pernah ditemukan, kembalikan kedua indeksnya.
        if (complement in numMap && numMap[complement] !== i) {
            return [numMap[complement], i]
        }

        // Simpan angka saat ini agar dapat menjadi pelengkap bagi angka berikutnya.
        numMap[nums[i]] = i
    }

    return []
}

// Contoh: angka pada indeks 0 dan 1 (2 dan 7) berjumlah 9.
const arrNum = [2, 7, 11, 13]
const target = 9
const result = twosSum({ nums: arrNum, target: target })
console.log(result) // Hasil: [0, 1]
