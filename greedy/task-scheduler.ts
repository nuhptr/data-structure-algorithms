import { ITaskScheduler } from "./interfaces"

/**
 * Task Scheduler — menghitung interval minimum untuk menyelesaikan semua task
 * dengan aturan CPU harus menunggu cooldown interval antara task yang sama.
 *
 * Strategi greedy: selalu jadwalkan task paling sering yang belum dalam cooldown.
 *
 * Kompleksitas Waktu : O(n) — n = jumlah task
 * Kompleksitas Ruang : O(1) — hanya 26 huruf
 *
 * @example
 * const scheduler = new TaskScheduler();
 * scheduler.leastIntervals(["A","A","A","B","B","B"], 2); // => 8
 * // Urutan: A → B → idle → A → B → idle → A → B
 * scheduler.leastIntervals(["A","A","A","B","B","B"], 0); // => 6
 */
export class TaskScheduler implements ITaskScheduler {
    /**
     * Menghitung jumlah interval waktu minimum untuk menyelesaikan semua tugas
     * dengan memperhatikan jeda `cooldown` antara dua tugas identik.
     *
     * @param tasks - Daftar label tugas berupa huruf kapital (`A`–`Z`).
     * @param cooldown - Jumlah interval minimum antara dua eksekusi tugas yang sama.
     * @returns Total interval minimum yang dibutuhkan.
     */
    leastIntervals(tasks: string[], cooldown: number): number {
        if (cooldown === 0) return tasks.length

        // Hitung frekuensi setiap task berdasarkan kode ASCII huruf kapital A-Z
        const freq = new Array(26).fill(0)
        for (const task of tasks) {
            freq[task.charCodeAt(0) - 65]++
        }

        // Urutkan menurun agar frekuensi tertinggi berada di indeks pertama
        freq.sort((a, b) => b - a)

        const maxFreq = freq[0]
        // Jumlah task yang memiliki frekuensi maksimum (mengisi ekor blok terakhir)
        const maxFreqCount = freq.filter((f) => f === maxFreq).length

        // Formula matematika:
        // (maxFreq - 1) blok penuh berukuran (cooldown + 1) ditambah task berfrekuensi maksimum di akhir
        const minimumSlots = (maxFreq - 1) * (cooldown + 1) + maxFreqCount

        // Jika task lain cukup banyak untuk mengisi semua slot idle, hasilnya adalah tasks.length
        return Math.max(minimumSlots, tasks.length)
    }
}
