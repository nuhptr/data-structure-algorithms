/** Pasangan `[waktuMulai, waktuSelesai]` yang merepresentasikan sebuah aktivitas. */
export type Activity = [startTime: number, endTime: number]

/** Kontrak untuk pemilih aktivitas non-tumpang-tindih menggunakan strategi greedy. */
export interface IActivitySelector {
    /**
     * Memilih jumlah maksimum aktivitas yang tidak saling tumpang tindih.
     *
     * @param activities - Daftar aktivitas berupa pasangan `[startTime, endTime]`.
     * @returns Daftar aktivitas terpilih yang tidak saling bertabrakan.
     */
    select(activities: Activity[]): Activity[]
}

/** Kontrak untuk penyelesaian masalah Fractional Knapsack. */
export interface IFractionalKnapsack {
    /**
     * Menghitung nilai maksimum yang dapat dimuat ke dalam knapsack dengan item yang boleh dipecah.
     *
     * @param values - Daftar nilai masing-masing item.
     * @param weights - Daftar berat masing-masing item.
     * @param capacity - Kapasitas maksimum knapsack.
     * @returns Total nilai maksimum yang bisa diperoleh.
     */
    solve(values: number[], weights: number[], capacity: number): number
}

/** Kontrak untuk penyelesaian Optimal Merge Pattern. */
export interface IOptimalMerge {
    /**
     * Menghitung total biaya minimum untuk menggabungkan seluruh ukuran file menjadi satu.
     *
     * @param fileSizes - Daftar ukuran masing-masing file.
     * @returns Total biaya penggabungan minimum.
     */
    solve(fileSizes: number[]): number
}

/** Node dalam Huffman Tree untuk representasi karakter dan frekuensinya. */
export interface HuffmanNode {
    /** Karakter pada node daun, atau `null` untuk node internal. */
    char: string | null
    /** Frekuensi kemunculan karakter atau jumlah frekuensi subtree. */
    freq: number
    /** Pointer ke anak kiri (bit `"0"`). */
    left: HuffmanNode | null
    /** Pointer ke anak kanan (bit `"1"`). */
    right: HuffmanNode | null
}

/**
 * Kontrak untuk algoritma kompresi Huffman Coding.
 */
export interface IHuffmanCoding {
    /**
     * Membangun tabel kode biner Huffman dari teks masukan.
     *
     * @param text - Teks sumber untuk menghitung frekuensi karakter.
     * @returns Peta dari setiap karakter ke string kode bit-nya.
     */
    buildCodes(text: string): Map<string, string>

    /**
     * Mengodekan teks menjadi urutan bit menggunakan kode Huffman.
     *
     * @param text - Teks yang akan dikompresi.
     * @returns Objek berisi string bit `encoded` dan peta `codes`.
     */
    encode(text: string): { encoded: string; codes: Map<string, string> }

    /**
     * Mendekode urutan bit Huffman kembali menjadi teks asli.
     *
     * @param encoded - String bit hasil encoding.
     * @param codes - Peta kode karakter ke bit yang digunakan saat encoding.
     * @returns Teks asli hasil dekode.
     */
    decode(encoded: string, codes: Map<string, string>): string
}

/**
 * Kontrak untuk algoritma penjadwalan tugas dengan cooldown (Task Scheduler).
 */
export interface ITaskScheduler {
    /**
     * Menghitung jumlah interval waktu minimum untuk menyelesaikan semua tugas.
     *
     * @param tasks - Daftar label tugas (huruf kapital `A`–`Z`).
     * @param cooldown - Jumlah interval jeda minimum antara dua tugas yang sama.
     * @returns Jumlah total interval minimum termasuk slot idle jika diperlukan.
     */
    leastIntervals(tasks: string[], cooldown: number): number
}

/**
 * Kontrak untuk variasi masalah Jump Game.
 */
export interface IJumpGame {
    /**
     * Memeriksa apakah indeks terakhir array dapat dicapai dari indeks pertama.
     *
     * @param nums - Array yang setiap elemennya menyatakan panjang lompatan maksimum dari indeks tersebut.
     * @returns `true` jika indeks terakhir dapat dicapai, `false` jika tidak.
     */
    canJump(nums: number[]): boolean

    /**
     * Menghitung jumlah lompatan minimum untuk mencapai indeks terakhir array.
     *
     * @param nums - Array panjang lompatan maksimum pada setiap indeks.
     * @returns Jumlah lompatan minimum yang diperlukan.
     */
    minJumps(nums: number[]): number
}
