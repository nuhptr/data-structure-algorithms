import { IJumpGame } from "./interfaces"

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
     * Memeriksa apakah ujung array dapat dicapai menggunakan pendekatan greedy
     * dengan melacak jangkauan maksimum (`maxReach`) sejauh ini.
     *
     * @param nums - Array panjang lompatan maksimum pada setiap indeks.
     * @returns `true` jika indeks terakhir dapat dicapai, `false` jika terjebak.
     */
    canJump(nums: number[]): boolean {
        let maxReach = 0

        for (let index = 0; index < nums.length; index++) {
            if (index > maxReach) return false // posisi tidak terjangkau

            // Perbarui indeks terjauh yang bisa dicapai dari posisi saat ini
            maxReach = Math.max(maxReach, index + nums[index])

            // Berhenti lebih awal jika ujung array sudah masuk jangkauan
            if (maxReach >= nums.length - 1) return true
        }

        return true
    }

    /**
     * Menghitung jumlah lompatan minimum untuk mencapai indeks terakhir menggunakan
     * greedy sliding window yang melacak batas jangkauan lompatan saat ini (`currentEnd`)
     * dan jangkauan terjauh berikutnya (`farthest`).
     *
     * @param nums - Array panjang lompatan maksimum pada setiap indeks.
     * @returns Jumlah lompatan minimum menuju indeks terakhir.
     */
    minJumps(nums: number[]): number {
        if (nums.length <= 1) return 0

        let jumps = 0
        let currentEnd = 0
        let farthest = 0

        for (let index = 0; index < nums.length - 1; index++) {
            farthest = Math.max(farthest, index + nums[index])

            // Saat mencapai batas lompatan saat ini, lakukan lompatan baru ke jangkauan terjauh
            if (index === currentEnd) {
                jumps++
                currentEnd = farthest

                if (currentEnd >= nums.length - 1) break
            }
        }

        return jumps
    }
}
