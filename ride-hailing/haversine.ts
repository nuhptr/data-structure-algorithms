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
    private readonly EARTH_RADIUS_KM = 6371

    distanceKm(pointA: GeoCoordinate, pointB: GeoCoordinate): number {
        return this.calculate(pointA, pointB)
    }

    distanceM(pointA: GeoCoordinate, pointB: GeoCoordinate): number {
        return this.calculate(pointA, pointB) * 1000
    }

    /**
     * Mencari titik terdekat dari sekumpulan koordinat ke titik asal.
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

    private calculate(pointA: GeoCoordinate, pointB: GeoCoordinate): number {
        const latA = this.toRadians(pointA.latitude)
        const latB = this.toRadians(pointB.latitude)
        const deltaLat = this.toRadians(pointB.latitude - pointA.latitude)
        const deltaLon = this.toRadians(pointB.longitude - pointA.longitude)

        const a =
            Math.sin(deltaLat / 2) ** 2 +
            Math.cos(latA) * Math.cos(latB) * Math.sin(deltaLon / 2) ** 2

        const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        return this.EARTH_RADIUS_KM * centralAngle
    }

    private toRadians(degrees: number): number {
        return degrees * (Math.PI / 180)
    }
}
