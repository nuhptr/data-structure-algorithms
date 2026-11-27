import { GeoCoordinate, IHaversine } from "./interfaces"

/**
 * Haversine Formula — menghitung jarak sebenarnya antara dua titik koordinat
 * GPS di permukaan bumi (mempertimbangkan kelengkungan bumi).
 * Digunakan ride-hailing untuk menghitung jarak driver ke penumpang.
 *
 * Formula:
 *   a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlon/2)
 *   c = 2 × atan2(√a, √(1−a))
 *   d = R × c     (R = 6371 km)
 *
 * Kompleksitas : O(1) per perhitungan
 *
 * @example
 * const haversine = new Haversine();
 * haversine.distanceKm(
 *   { latitude: -6.2088, longitude: 106.8456 }, // Jakarta
 *   { latitude: -6.9175, longitude: 107.6191 }  // Bandung
 * ); // => ~120 km
 */
export class Haversine implements IHaversine {
    /** Rata-rata jari-jari bumi dalam satuan kilometer. */
    private readonly EARTH_RADIUS_KM = 6371

    /**
     * Menghitung jarak lingkaran besar (great-circle distance) antara dua koordinat GPS dalam kilometer.
     *
     * @param pointA - Koordinat titik pertama.
     * @param pointB - Koordinat titik kedua.
     * @returns Jarak permukaan bumi dalam kilometer.
     */
    distanceKm(pointA: GeoCoordinate, pointB: GeoCoordinate): number {
        return this.calculate(pointA, pointB)
    }

    /**
     * Menghitung jarak permukaan bumi antara dua koordinat GPS dalam satuan meter.
     *
     * @param pointA - Koordinat titik pertama.
     * @param pointB - Koordinat titik kedua.
     * @returns Jarak permukaan bumi dalam meter.
     */
    distanceM(pointA: GeoCoordinate, pointB: GeoCoordinate): number {
        return this.calculate(pointA, pointB) * 1000
    }

    /**
     * Mencari titik terdekat dari sekumpulan koordinat terhadap titik asal.
     *
     * @param origin - Koordinat titik acuan.
     * @param points - Daftar koordinat kandidat.
     * @returns Koordinat dengan jarak Haversine terpendek, atau `null` jika `points` kosong.
     */
    nearestPoint(origin: GeoCoordinate, points: GeoCoordinate[]): GeoCoordinate | null {
        if (points.length === 0) return null

        let nearestCoordinate = points[0]
        let shortestDistance = this.distanceKm(origin, points[0])

        for (let index = 1; index < points.length; index++) {
            const currentDistance = this.distanceKm(origin, points[index])
            if (currentDistance < shortestDistance) {
                shortestDistance = currentDistance
                nearestCoordinate = points[index]
            }
        }

        return nearestCoordinate
    }

    /**
     * Menerapkan formula Haversine untuk menghitung jarak antar dua titik dalam kilometer.
     *
     * @param pointA - Koordinat titik pertama.
     * @param pointB - Koordinat titik kedua.
     * @returns Jarak dalam kilometer.
     */
    private calculate(pointA: GeoCoordinate, pointB: GeoCoordinate): number {
        const latA = this.toRadians(pointA.latitude)
        const latB = this.toRadians(pointB.latitude)
        const deltaLat = this.toRadians(pointB.latitude - pointA.latitude)
        const deltaLon = this.toRadians(pointB.longitude - pointA.longitude)

        // Hitung setengah panjang tali busur kuadrat antar dua titik pada bola satuan
        const a =
            Math.sin(deltaLat / 2) ** 2 +
            Math.cos(latA) * Math.cos(latB) * Math.sin(deltaLon / 2) ** 2

        // Sudut pusat (radian) antara dua titik dari pusat bumi
        const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        return this.EARTH_RADIUS_KM * centralAngle
    }

    /**
     * Mengonversi sudut dari satuan derajat ke radian.
     *
     * @param degrees - Nilai sudut dalam derajat.
     * @returns Nilai sudut dalam radian.
     */
    private toRadians(degrees: number): number {
        return degrees * (Math.PI / 180)
    }
}
