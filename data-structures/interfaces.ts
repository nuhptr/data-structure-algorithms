/**
 * Kontrak untuk struktur data LRU (Least Recently Used) Cache.
 *
 * @typeParam K - Tipe kunci (key) cache
 * @typeParam V - Tipe nilai (value) yang disimpan
 */
export interface ILRUCache<K, V> {
    /**
     * Mengambil nilai berdasarkan kunci dan menandainya sebagai paling baru diakses.
     *
     * @param key - Kunci entri yang dicari
     * @returns Nilai yang tersimpan, atau `undefined` jika kunci tidak ditemukan
     */
    get(key: K): V | undefined

    /**
     * Menyimpan atau memperbarui pasangan kunci-nilai dalam cache.
     * Jika kapasitas penuh, entri yang paling lama tidak diakses akan dihapus (evict).
     *
     * @param key - Kunci entri
     * @param value - Nilai yang akan disimpan
     */
    put(key: K, value: V): void

    /**
     * Mengembalikan jumlah entri yang saat ini tersimpan di dalam cache.
     *
     * @returns Jumlah elemen dalam cache
     */
    size(): number
}

/**
 * Kontrak untuk struktur data Deque (Double-Ended Queue) yang mendukung
 * penyisipan dan penghapusan dari ujung depan maupun belakang.
 *
 * @typeParam T - Tipe elemen yang disimpan di dalam Deque
 */
export interface IDeque<T> {
    /**
     * Menambahkan elemen baru ke ujung depan (front) Deque.
     *
     * @param value - Nilai elemen yang akan ditambahkan
     */
    pushFront(value: T): void

    /**
     * Menambahkan elemen baru ke ujung belakang (back) Deque.
     *
     * @param value - Nilai elemen yang akan ditambahkan
     */
    pushBack(value: T): void

    /**
     * Menghapus dan mengembalikan elemen di ujung depan (front) Deque.
     *
     * @returns Nilai elemen paling depan
     */
    popFront(): T

    /**
     * Menghapus dan mengembalikan elemen di ujung belakang (back) Deque.
     *
     * @returns Nilai elemen paling belakang
     */
    popBack(): T

    /**
     * Melihat elemen di ujung depan (front) tanpa menghapusnya.
     *
     * @returns Nilai elemen paling depan
     */
    peekFront(): T

    /**
     * Melihat elemen di ujung belakang (back) tanpa menghapusnya.
     *
     * @returns Nilai elemen paling belakang
     */
    peekBack(): T

    /**
     * Mengembalikan jumlah elemen yang saat ini berada di dalam Deque.
     *
     * @returns Jumlah elemen dalam Deque
     */
    size(): number

    /**
     * Memeriksa apakah Deque sedang kosong.
     *
     * @returns `true` jika tidak ada elemen, `false` jika berisi minimal satu elemen
     */
    isEmpty(): boolean
}

/**
 * Kontrak untuk algoritma berbasis Monotonic Stack (stack monoton naik/turun).
 */
export interface IMonotonicStack {
    /**
     * Menghitung total volume air hujan yang dapat ditampung di antara batang elevasi
     * (masalah Trapping Rain Water).
     *
     * @param heights - Array ketinggian masing-masing batang elevasi
     * @returns Total satuan air hujan yang dapat tertampung
     */
    trapRainWater(heights: number[]): number

    /**
     * Mencari elemen pertama yang lebih besar di sebelah kanan untuk setiap elemen
     * (masalah Next Greater Element).
     *
     * @param nums - Array bilangan masukan
     * @returns Array hasil di mana indeks `i` berisi elemen lebih besar pertama di kanan `nums[i]`, atau `-1` jika tidak ada
     */
    nextGreaterElement(nums: number[]): number[]

    /**
     * Menghitung luas persegi panjang terbesar yang dapat dibentuk di dalam histogram.
     *
     * @param heights - Array ketinggian batang histogram (lebar tiap batang = 1)
     * @returns Luas persegi panjang maksimum
     */
    largestRectangleInHistogram(heights: number[]): number
}

/**
 * Kontrak untuk algoritma berbasis Monotonic Deque (sliding window maximum).
 */
export interface IMonotonicDeque {
    /**
     * Mencari nilai maksimum pada setiap jendela geser (sliding window) berukuran `k`.
     *
     * @param nums - Array bilangan masukan
     * @param k - Ukuran jendela geser
     * @returns Array berisi nilai maksimum untuk setiap posisi jendela
     */
    slidingWindowMaximum(nums: number[], k: number): number[]
}
