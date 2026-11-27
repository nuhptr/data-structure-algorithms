import { Activity, IActivitySelector } from "./interfaces"

/**
 * Activity Selection — memilih jumlah maksimum aktivitas yang tidak
 * saling tumpang tindih dari sekumpulan aktivitas berstart/end time.
 * Strategi greedy: selalu pilih aktivitas yang selesai paling awal.
 *
 * Kompleksitas Waktu : O(n log n) — dominasi sorting
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const selector = new ActivitySelector();
 * selector.select([(1,3),(2,5),(3,9),(6,8)]);
 * // => [(1,3),(6,8)]
 */
export class ActivitySelector implements IActivitySelector {
    /**
     * Memilih subset aktivitas maksimum yang tidak saling tumpang tindih dengan
     * mengurutkan berdasarkan waktu selesai paling awal.
     *
     * @param activities - Daftar aktivitas berupa pasangan `[startTime, endTime]`.
     * @returns Daftar aktivitas terpilih dalam urutan kronologis.
     */
    select(activities: Activity[]): Activity[] {
        if (!activities || activities.length === 0) return []

        // Urutkan salinan aktivitas berdasarkan waktu selesai terkecil lebih dulu
        const sortedByEndTime = [...activities].sort(([, endA], [, endB]) => endA - endB)

        // Aktivitas yang selesai paling awal selalu optimal sebagai pilihan pertama
        const selectedActivities: Activity[] = [sortedByEndTime[0]]

        for (let index = 1; index < sortedByEndTime.length; index++) {
            const currentActivity = sortedByEndTime[index]
            const lastSelectedActivity = selectedActivities[selectedActivities.length - 1]
            // Cek apakah aktivitas saat ini dimulai setelah atau tepat saat aktivitas terakhir selesai
            const doesNotOverlap = currentActivity[0] >= lastSelectedActivity[1]

            if (doesNotOverlap) {
                selectedActivities.push(currentActivity)
            }
        }

        return selectedActivities
    }
}
