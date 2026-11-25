import { IMonotonicStack, IMonotonicDeque } from "../interfaces";

/**
 * Monotonic Stack — stack yang selalu terjaga dalam urutan monoton
 * (meningkat atau menurun). Pola ini menyelesaikan masalah "next greater element"
 * dan sejenisnya dalam O(n) alih-alih O(n²).
 *
 * Digunakan oleh: sistem rekomendasi saham, analisis data stream,
 * pemrosesan histogram, dan berbagai masalah LeetCode hard.
 *
 * Kompleksitas semua operasi: O(n)
 *
 * @example
 * const mono = new MonotonicStack();
 * mono.nextGreaterElement([4, 1, 2]); // => [−1, 2, −1]
 * mono.largestRectangleInHistogram([2,1,5,6,2,3]); // => 10
 * mono.trapRainWater([0,1,0,2,1,0,1,3,2,1,2,1]);   // => 6
 */
export class MonotonicStack implements IMonotonicStack {
  /**
   * Hitung total air hujan yang dapat ditampung antara batang-batang.
   * Gunakan stack untuk melacak batang yang belum punya batang kanan lebih tinggi.
   */
  trapRainWater(heights: number[]): number {
    const stack: number[] = []; // stack berisi index
    let totalWater = 0;

    for (let rightIndex = 0; rightIndex < heights.length; rightIndex++) {
      while (stack.length > 0 && heights[rightIndex] > heights[stack[stack.length - 1]]) {
        const bottomIndex = stack.pop()!;

        if (stack.length === 0) break;

        const leftIndex = stack[stack.length - 1];
        const width = rightIndex - leftIndex - 1;
        const boundedHeight = Math.min(heights[leftIndex], heights[rightIndex]) - heights[bottomIndex];
        totalWater += width * boundedHeight;
      }

      stack.push(rightIndex);
    }

    return totalWater;
  }

  /**
   * Untuk setiap elemen, cari elemen pertama yang lebih besar di sebelah kanan.
   * Kembalikan -1 jika tidak ada.
   */
  nextGreaterElement(nums: number[]): number[] {
    const result = Array(nums.length).fill(-1);
    const stack: number[] = []; // stack berisi index

    for (let index = 0; index < nums.length; index++) {
      while (stack.length > 0 && nums[index] > nums[stack[stack.length - 1]]) {
        const prevIndex = stack.pop()!;
        result[prevIndex] = nums[index];
      }
      stack.push(index);
    }

    return result;
  }

  /**
   * Hitung luas rectangle terbesar dalam histogram.
   * Untuk setiap batang, ekspansi kiri dan kanan selama tinggi ≥ batang saat ini.
   */
  largestRectangleInHistogram(heights: number[]): number {
    const stack: number[] = []; // stack berisi index (monoton meningkat)
    let maxArea = 0;

    for (let index = 0; index <= heights.length; index++) {
      const currentHeight = index < heights.length ? heights[index] : 0;

      while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
        const height = heights[stack.pop()!];
        const width = stack.length === 0 ? index : index - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, height * width);
      }

      stack.push(index);
    }

    return maxArea;
  }
}

/**
 * Monotonic Deque — deque yang terjaga dalam urutan menurun untuk
 * menjawab sliding window maximum dalam O(n).
 *
 * Digunakan dalam: stream processing, time-series analysis, game engines.
 *
 * Kompleksitas: O(n) total — setiap elemen masuk dan keluar deque tepat sekali.
 *
 * @example
 * const mono = new MonotonicDeque();
 * mono.slidingWindowMaximum([1,3,-1,-3,5,3,6,7], 3); // => [3,3,5,5,6,7]
 */
export class MonotonicDeque implements IMonotonicDeque {
  slidingWindowMaximum(nums: number[], k: number): number[] {
    const result: number[] = [];
    const deque: number[] = []; // berisi index, menurun berdasarkan nilai

    for (let rightIndex = 0; rightIndex < nums.length; rightIndex++) {
      // Hapus elemen yang sudah keluar dari window
      while (deque.length > 0 && deque[0] <= rightIndex - k) {
        deque.shift();
      }

      // Pertahankan monoton menurun: hapus elemen yang lebih kecil dari nums saat ini
      while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[rightIndex]) {
        deque.pop();
      }

      deque.push(rightIndex);

      // Mulai rekam hasil setelah window pertama terbentuk
      if (rightIndex >= k - 1) {
        result.push(nums[deque[0]]);
      }
    }

    return result;
  }
}
