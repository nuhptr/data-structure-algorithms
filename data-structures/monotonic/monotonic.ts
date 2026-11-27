import { IMonotonicStack, IMonotonicDeque } from "../interfaces"

/**
 * Monotonic Stack — stack yang selalu terjaga dalam urutan monoton
 * (meningkat atau menurun). Pola ini menyelesaikan masalah "next greater element"
 * dan sejenisnya dalam O(n) alih-alih O(n²).
 *
 * Digunakan oleh: sistem rekomendasi saham, analisis data stream,
 * pemrosesan histogram, dan berbagai masalah LeetCode hard.
 *
 * Kompleksitas waktu semua operasi : O(n)
 * Kompleksitas ruang semua operasi : O(n)
 *
 * @example
 * const mono = new MonotonicStack()
 * mono.nextGreaterElement([4, 1, 2]) // => [-1, 2, -1]
 * mono.largestRectangleInHistogram([2, 1, 5, 6, 2, 3]) // => 10
 * mono.trapRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) // => 6
 */
export class MonotonicStack implements IMonotonicStack {
    /**
     * Menghitung total air hujan yang dapat ditampung di antara batang-batang elevasi.
     * Menggunakan monotonic decreasing stack untuk melacak batas kiri setiap cekungan.
     *
     * @param heights - Array ketinggian batang elevasi
     * @returns Total satuan air hujan yang dapat tertampung
     */
    trapRainWater(heights: number[]): number {
        const stack: number[] = [] // stack berisi indeks dengan tinggi monoton menurun
        let totalWater = 0

        for (let rightIndex = 0; rightIndex < heights.length; rightIndex++) {
            // Batang saat ini lebih tinggi dari puncak stack -> terbentuk cekungan penampung air
            while (stack.length > 0 && heights[rightIndex] > heights[stack[stack.length - 1]]) {
                const bottomIndex = stack.pop()!

                // Tidak ada dinding kiri jika stack menjadi kosong
                if (stack.length === 0) break

                const leftIndex = stack[stack.length - 1]
                const width = rightIndex - leftIndex - 1
                const boundedHeight =
                    Math.min(heights[leftIndex], heights[rightIndex]) - heights[bottomIndex]
                totalWater += width * boundedHeight
            }

            stack.push(rightIndex)
        }

        return totalWater
    }

    /**
     * Mencari elemen pertama yang lebih besar di sebelah kanan untuk setiap elemen.
     * Mengembalikan `-1` pada posisi yang tidak memiliki elemen lebih besar di kanannya.
     *
     * @param nums - Array bilangan masukan
     * @returns Array hasil Next Greater Element untuk setiap indeks
     */
    nextGreaterElement(nums: number[]): number[] {
        const result = Array(nums.length).fill(-1)
        const stack: number[] = [] // stack berisi indeks elemen yang belum menemukan jawaban

        for (let index = 0; index < nums.length; index++) {
            // Setiap elemen di puncak stack yang lebih kecil terjawab oleh nums[index]
            while (stack.length > 0 && nums[index] > nums[stack[stack.length - 1]]) {
                const prevIndex = stack.pop()!
                result[prevIndex] = nums[index]
            }
            stack.push(index)
        }

        return result
    }

    /**
     * Menghitung luas persegi panjang terbesar yang dapat dibentuk di dalam histogram.
     * Menggunakan monotonic increasing stack untuk menentukan batas kiri dan kanan tiap batang.
     *
     * @param heights - Array ketinggian batang histogram
     * @returns Luas persegi panjang maksimum
     */
    largestRectangleInHistogram(heights: number[]): number {
        const stack: number[] = [] // stack berisi indeks dengan tinggi monoton meningkat
        let maxArea = 0

        // Iterasi hingga heights.length dengan sentinel tinggi 0 untuk mengosongkan sisa stack
        for (let index = 0; index <= heights.length; index++) {
            const currentHeight = index < heights.length ? heights[index] : 0

            // Saat tinggi turun, hitung luas maksimal dengan batang puncak stack sebagai tinggi terkecil
            while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
                const height = heights[stack.pop()!]
                const width = stack.length === 0 ? index : index - stack[stack.length - 1] - 1
                maxArea = Math.max(maxArea, height * width)
            }

            stack.push(index)
        }

        return maxArea
    }
}

/**
 * Monotonic Deque — deque yang terjaga dalam urutan menurun untuk
 * menjawab sliding window maximum dalam O(n).
 *
 * Digunakan dalam: stream processing, time-series analysis, game engines.
 *
 * Kompleksitas waktu : O(n) total — setiap elemen masuk dan keluar deque tepat sekali
 * Kompleksitas ruang : O(k) untuk deque (O(n) termasuk array hasil)
 *
 * @example
 * const mono = new MonotonicDeque()
 * mono.slidingWindowMaximum([1, 3, -1, -3, 5, 3, 6, 7], 3) // => [3, 3, 5, 5, 6, 7]
 */
export class MonotonicDeque implements IMonotonicDeque {
    /**
     * Mencari nilai maksimum pada setiap jendela geser (sliding window) berukuran `k`.
     *
     * @param nums - Array bilangan masukan
     * @param k - Ukuran jendela geser
     * @returns Array nilai maksimum untuk setiap posisi jendela berukuran `k`
     */
    slidingWindowMaximum(nums: number[], k: number): number[] {
        const result: number[] = []
        const deque: number[] = [] // berisi indeks dengan nilai monoton menurun (depan = terbesar)

        for (let rightIndex = 0; rightIndex < nums.length; rightIndex++) {
            // Hapus elemen di depan yang sudah keluar dari batas kiri window
            while (deque.length > 0 && deque[0] <= rightIndex - k) {
                deque.shift()
            }

            // Pertahankan urutan monoton menurun: buang elemen belakang yang lebih kecil dari nums[rightIndex]
            while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[rightIndex]) {
                deque.pop()
            }

            deque.push(rightIndex)

            // Mulai rekam nilai maksimum (elemen depan deque) setelah window pertama penuh
            if (rightIndex >= k - 1) {
                result.push(nums[deque[0]])
            }
        }

        return result
    }
}
