import { IZAlgorithm } from "./interfaces";

/**
 * Z-Algorithm — membangun Z-array dalam O(n) di mana Z[i] adalah panjang
 * substring terpanjang mulai dari posisi i yang juga merupakan prefix dari string.
 *
 * Digunakan untuk pattern matching dengan menggabungkan pattern + "$" + text.
 *
 * Kompleksitas Waktu : O(n + m) — n = panjang teks, m = panjang pattern
 * Kompleksitas Ruang : O(n + m) — Z-array dari string gabungan
 *
 * @example
 * const zAlgo = new ZAlgorithm();
 * zAlgo.findAll("aabxaaabxaabxaab", "aabx"); // => [0, 5, 10]
 * zAlgo.buildZArray("aabxaa"); // => [6, 1, 0, 0, 2, 1]
 */
export class ZAlgorithm implements IZAlgorithm {
  buildZArray(s: string): number[] {
    const length = s.length;
    const zValues = Array(length).fill(0);
    zValues[0] = length; // Z[0] = panjang string itu sendiri (konvensi)

    let leftBound = 0;
    let rightBound = 0;

    for (let index = 1; index < length; index++) {
      if (index < rightBound) {
        // Gunakan hasil Z yang sudah dihitung (Z-box optimization)
        zValues[index] = Math.min(rightBound - index, zValues[index - leftBound]);
      }

      // Perluas window Z dari posisi saat ini
      while (
        index + zValues[index] < length &&
        s[zValues[index]] === s[index + zValues[index]]
      ) {
        zValues[index]++;
      }

      // Perbarui Z-box jika window saat ini lebih jauh ke kanan
      if (index + zValues[index] > rightBound) {
        leftBound = index;
        rightBound = index + zValues[index];
      }
    }

    return zValues;
  }

  findAll(text: string, pattern: string): number[] {
    const separator = "$"; // karakter yang tidak muncul di pattern/text
    const combined = pattern + separator + text;
    const zArray = this.buildZArray(combined);
    const patternLength = pattern.length;
    const separatorOffset = patternLength + 1;
    const matchIndices: number[] = [];

    for (let index = separatorOffset; index < combined.length; index++) {
      if (zArray[index] === patternLength) {
        matchIndices.push(index - separatorOffset);
      }
    }

    return matchIndices;
  }
}
