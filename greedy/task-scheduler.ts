import { ITaskScheduler } from "./interfaces";

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
  leastIntervals(tasks: string[], cooldown: number): number {
    if (cooldown === 0) return tasks.length;

    // Hitung frekuensi setiap task
    const freq = new Array(26).fill(0);
    for (const task of tasks) {
      freq[task.charCodeAt(0) - 65]++;
    }

    freq.sort((a, b) => b - a);

    const maxFreq = freq[0];
    // Jumlah task yang memiliki frekuensi maksimum
    const maxFreqCount = freq.filter((f) => f === maxFreq).length;

    // Formula matematika:
    // Jumlah "idle slots" = (maxFreq - 1) × cooldown − (jumlah task dengan frekuensi = maxFreq - 1)
    const minimumSlots = (maxFreq - 1) * (cooldown + 1) + maxFreqCount;

    // Hasil adalah maksimum antara formula dan jumlah total task
    return Math.max(minimumSlots, tasks.length);
  }
}
