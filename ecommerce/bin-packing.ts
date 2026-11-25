import { Item, Bin, IBinPacking } from "./interfaces";

/**
 * Bin Packing (First Fit Decreasing) — mengemas item ke dalam bin/kotak
 * dengan jumlah bin sesedikit mungkin.
 *
 * Strategi FFD (First Fit Decreasing):
 *  1. Urutkan item dari yang terbesar
 *  2. Untuk setiap item, masukkan ke bin pertama yang masih muat
 *  3. Jika tidak ada bin yang muat, buka bin baru
 *
 * FFD menghasilkan solusi ≤ (11/9) × OPT + 6/9 (mendekati optimal).
 *
 * Digunakan e-commerce untuk: optimasi packaging logistik, minimasi
 * jumlah kotak pengiriman, penghematan biaya packaging.
 *
 * Kompleksitas Waktu : O(n²) — n = jumlah item
 * Kompleksitas Ruang : O(n)
 *
 * @example
 * const packer = new BinPacking();
 * const items = [
 *   { id: "A", size: 4 }, { id: "B", size: 7 },
 *   { id: "C", size: 3 }, { id: "D", size: 6 },
 *   { id: "E", size: 2 }, { id: "F", size: 1 },
 * ];
 * packer.pack(items, 10);
 * // => 2 bins: Bin1[B(7),C(3)], Bin2[D(6),A(4)]  — F,E ke Bin1 atau Bin2
 */
export class BinPacking implements IBinPacking {
  pack(items: Item[], binCapacity: number): Bin[] {
    if (items.length === 0) return [];

    const oversizedItems = items.filter((item) => item.size > binCapacity);
    if (oversizedItems.length > 0) {
      throw new Error(
        `Item berikut melebihi kapasitas bin (${binCapacity}): ${oversizedItems.map((i) => i.id).join(", ")}`
      );
    }

    // Langkah 1: Urutkan item dari yang terbesar (Decreasing)
    const sortedItems = [...items].sort((a, b) => b.size - a.size);

    const bins: Bin[] = [];

    for (const currentItem of sortedItems) {
      let wasPlaced = false;

      // Langkah 2: Cari bin pertama yang masih muat (First Fit)
      for (const bin of bins) {
        const itemFitsInBin = bin.remainingSpace >= currentItem.size;

        if (itemFitsInBin) {
          bin.items.push(currentItem);
          bin.usedSpace += currentItem.size;
          bin.remainingSpace -= currentItem.size;
          wasPlaced = true;
          break;
        }
      }

      // Langkah 3: Tidak ada bin yang muat — buka bin baru
      if (!wasPlaced) {
        const newBin: Bin = {
          items: [currentItem],
          usedSpace: currentItem.size,
          remainingSpace: binCapacity - currentItem.size,
        };
        bins.push(newBin);
      }
    }

    return bins;
  }
}
