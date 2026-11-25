import { IJumpGame } from "./interfaces";

/**
 * Jump Game — masalah greedy klasik dari unicorn companies (Google, Uber, Airbnb).
 *
 * canJump:  apakah bisa mencapai ujung array? Setiap elemen = jumlah langkah maksimum.
 * minJumps: berapa lompatan minimum untuk mencapai ujung?
 *
 * Kompleksitas canJump  : O(n)
 * Kompleksitas minJumps : O(n)
 * Kompleksitas Ruang    : O(1)
 *
 * @example
 * const game = new JumpGame();
 * game.canJump([2, 3, 1, 1, 4]); // => true
 * game.canJump([3, 2, 1, 0, 4]); // => false (terjebak di index 3)
 * game.minJumps([2, 3, 1, 1, 4]); // => 2 (index 0→1→4)
 * game.minJumps([2, 3, 0, 1, 4]); // => 2
 */
export class JumpGame implements IJumpGame {
  /**
   * Greedy: lacak jangkauan maksimum yang bisa dicapai.
   * Jika posisi saat ini melebihi jangkauan → tidak bisa sampai.
   */
  canJump(nums: number[]): boolean {
    let maxReach = 0;

    for (let index = 0; index < nums.length; index++) {
      if (index > maxReach) return false; // posisi tidak terjangkau

      maxReach = Math.max(maxReach, index + nums[index]);

      if (maxReach >= nums.length - 1) return true;
    }

    return true;
  }

  /**
   * Greedy dengan sliding window: track currentEnd (batas window saat ini)
   * dan farthest (jangkauan terjauh dalam window).
   */
  minJumps(nums: number[]): number {
    if (nums.length <= 1) return 0;

    let jumps = 0;
    let currentEnd = 0;
    let farthest = 0;

    for (let index = 0; index < nums.length - 1; index++) {
      farthest = Math.max(farthest, index + nums[index]);

      if (index === currentEnd) {
        jumps++;
        currentEnd = farthest;

        if (currentEnd >= nums.length - 1) break;
      }
    }

    return jumps;
  }
}
