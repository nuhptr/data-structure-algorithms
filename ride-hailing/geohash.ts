import { GeoCoordinate, GeohashBounds, IGeohash } from "./interfaces"

/**
 * Geohash — encode koordinat GPS (lat, lon) menjadi string pendek.
 * Dua titik yang berdekatan berbagi prefix yang sama, sehingga
 * proximity search bisa dilakukan dengan string prefix matching.
 *
 * Digunakan ride-hailing untuk partisi zona dan lookup driver terdekat
 * tanpa melakukan radius search pada semua driver.
 *
 * Kompleksitas encode/decode : O(precision)
 * Presisi karakter:
 *   1 = ±2500 km   |  5 = ±2.4 km   |  8 = ±19 m
 *   3 = ±78 km     |  6 = ±610 m    |  9 = ±2.4 m
 *   4 = ±20 km     |  7 = ±76 m     | 12 = ±3.7 cm
 *
 * @example
 * const geo = new Geohash();
 * geo.encode({ latitude: -6.2088, longitude: 106.8456 }, 6); // => "qqgud0"
 * geo.decode("qqgud0"); // => { latitude: -6.2109, longitude: 106.8457 }
 */
export class Geohash implements IGeohash {
    /** Alfabet Base32 khusus Geohash (tanpa huruf `a`, `i`, `l`, `o` untuk menghindari ambiguitas). */
    private readonly BASE32_CHARS = "0123456789bcdefghjkmnpqrstuvwxyz"

    /** Tabel pemetaan karakter tetangga per arah dan paritas panjang hash. */
    private readonly NEIGHBOR_TABLE: Record<string, Record<string, string>> = {
        right: {
            even: "bc01fg45telehelejk67lm89lmnopqrst",
            odd: "p0r21436x8zb9dcf5h7kjnmqesgutwvy",
        },
        left: {
            even: "238967debc01telehelejk45telehelemn0qrstuvhx",
            odd: "14365h7k9dcfesgujnmqp0r2twvyx8zb",
        },
        top: { even: "p0r21436x8zb9dcf5h7kjnmqesgutwvy", odd: "bc01fg45telehelejk67lm89lmnopqrst" },
        bottom: {
            even: "14365h7k9dcfesgujnmqp0r2twvyx8zb",
            odd: "238967debc01telehelejk45telehelemn0qrstuvhx",
        },
    }

    /** Tabel karakter batas tepi sel yang menandakan perpindahan tetangga melewati sel induk. */
    private readonly BORDER_TABLE: Record<string, Record<string, string>> = {
        right: { even: "bcfguvyz", odd: "prxz" },
        left: { even: "0145hjnp", odd: "028b" },
        top: { even: "prxz", odd: "bcfguvyz" },
        bottom: { even: "028b", odd: "0145hjnp" },
    }

    /**
     * Mengodekan koordinat GPS menjadi string Geohash dengan membagi rentang bujur dan
     * lintang secara bergantian (bit genap untuk longitude, bit ganjil untuk latitude).
     *
     * @param coordinate - Koordinat GPS masukan.
     * @param precision - Jumlah karakter Geohash yang dihasilkan (default `9`).
     * @returns String Geohash base32 sepanjang `precision`.
     */
    encode(coordinate: GeoCoordinate, precision: number = 9): string {
        let { latitude, longitude } = coordinate
        let minLat = -90,
            maxLat = 90
        let minLon = -180,
            maxLon = 180

        let hash = ""
        let bits = 0
        let bitCount = 0
        let isEvenBit = true

        while (hash.length < precision) {
            // Bagi rentang longitude pada bit genap, dan latitude pada bit ganjil
            if (isEvenBit) {
                const midLon = (minLon + maxLon) / 2
                if (longitude >= midLon) {
                    bits = (bits << 1) | 1
                    minLon = midLon
                } else {
                    bits = bits << 1
                    maxLon = midLon
                }
            } else {
                const midLat = (minLat + maxLat) / 2
                if (latitude >= midLat) {
                    bits = (bits << 1) | 1
                    minLat = midLat
                } else {
                    bits = bits << 1
                    maxLat = midLat
                }
            }

            isEvenBit = !isEvenBit
            bitCount++

            // Setiap 5 bit dikonversi menjadi 1 karakter Base32
            if (bitCount === 5) {
                hash += this.BASE32_CHARS[bits]
                bits = 0
                bitCount = 0
            }
        }

        return hash
    }

    /**
     * Mendekode string Geohash menjadi koordinat titik tengah dari bounding box selnya.
     *
     * @param hash - String Geohash.
     * @returns Koordinat GPS pusat sel.
     */
    decode(hash: string): GeoCoordinate {
        const bounds = this.getBounds(hash)
        return {
            latitude: (bounds.minLat + bounds.maxLat) / 2,
            longitude: (bounds.minLon + bounds.maxLon) / 2,
        }
    }

    /**
     * Menghitung batas bounding box (min/max latitude & longitude) dari string Geohash
     * dengan menyempitkan rentang sesuai urutan bit setiap karakter Base32.
     *
     * @param hash - String Geohash.
     * @returns Objek `GeohashBounds` dari sel tersebut.
     */
    getBounds(hash: string): GeohashBounds {
        let minLat = -90,
            maxLat = 90
        let minLon = -180,
            maxLon = 180
        let isEvenBit = true

        for (const char of hash) {
            const charIndex = this.BASE32_CHARS.indexOf(char)

            // Ekstrak 5 bit dari MSB ke LSB untuk mempersempit interval lon/lat
            for (let bitPos = 4; bitPos >= 0; bitPos--) {
                const bitValue = (charIndex >> bitPos) & 1

                if (isEvenBit) {
                    const midLon = (minLon + maxLon) / 2
                    if (bitValue === 1) minLon = midLon
                    else maxLon = midLon
                } else {
                    const midLat = (minLat + maxLat) / 2
                    if (bitValue === 1) minLat = midLat
                    else maxLat = midLat
                }

                isEvenBit = !isEvenBit
            }
        }

        return { minLat, maxLat, minLon, maxLon }
    }

    /**
     * Mendapatkan 8 geohash tetangga di sekeliling sel pusat (N, NE, E, SE, S, SW, W, NW).
     *
     * @param hash - String Geohash pusat.
     * @returns Peta arah mata angin ke string Geohash tetangganya.
     */
    getNeighbors(hash: string): Record<string, string> {
        return {
            north: this.getNeighbor(hash, "top"),
            northeast: this.getNeighbor(this.getNeighbor(hash, "right"), "top"),
            east: this.getNeighbor(hash, "right"),
            southeast: this.getNeighbor(this.getNeighbor(hash, "right"), "bottom"),
            south: this.getNeighbor(hash, "bottom"),
            southwest: this.getNeighbor(this.getNeighbor(hash, "left"), "bottom"),
            west: this.getNeighbor(hash, "left"),
            northwest: this.getNeighbor(this.getNeighbor(hash, "left"), "top"),
        }
    }

    /**
     * Menentukan satu sel Geohash tetangga pada arah kardinal (`top`, `bottom`, `left`, `right`).
     * Jika karakter terakhir berada di tepi sel induk, prefix induk digeser secara rekursif.
     *
     * @param hash - String Geohash acuan.
     * @param direction - Arah perpindahan (`"top"`, `"bottom"`, `"left"`, atau `"right"`).
     * @returns String Geohash tetangga pada arah yang diminta.
     */
    private getNeighbor(hash: string, direction: string): string {
        const lastChar = hash[hash.length - 1]
        const parentHash = hash.slice(0, -1)
        const isEven = hash.length % 2 === 0
        const parity = isEven ? "even" : "odd"

        // Jika karakter terakhir menyentuh batas border, rekursi ke prefix induk
        const isBorder = this.BORDER_TABLE[direction][parity].includes(lastChar)
        const parentNeighbor =
            isBorder && parentHash.length > 0 ? this.getNeighbor(parentHash, direction) : parentHash

        const neighborLastChar =
            this.BASE32_CHARS[this.NEIGHBOR_TABLE[direction][parity].indexOf(lastChar)]

        return parentNeighbor + (neighborLastChar ?? lastChar)
    }
}
