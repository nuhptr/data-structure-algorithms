import { QuadtreeBoundary, QuadtreePoint, IQuadtree } from "./interfaces"

/**
 * Quadtree — struktur data tree yang membagi 2D space secara rekursif
 * menjadi empat kuadran. Digunakan ride-hailing untuk spatial indexing:
 * mencari semua driver dalam radius tertentu dari posisi penumpang.
 *
 * Setiap node menampung maksimal `capacity` titik sebelum dibagi (subdivide).
 *
 * Kompleksitas insert       : O(log n) rata-rata
 * Kompleksitas radius query : O(log n + k) — k = jumlah hasil
 * Kompleksitas Ruang        : O(n)
 *
 * @example
 * const boundary = { centerX: 0, centerY: 0, halfWidth: 100, halfHeight: 100 };
 * const tree = new Quadtree(boundary);
 * tree.insert({ x: 10, y: 20, data: { driverId: "D1" } });
 * tree.insert({ x: -5, y: 15, data: { driverId: "D2" } });
 * tree.queryRadius(0, 0, 25); // => semua driver dalam radius 25 unit
 */
export class Quadtree implements IQuadtree {
    private static readonly DEFAULT_CAPACITY = 4

    private boundary: QuadtreeBoundary
    private capacity: number
    private points: QuadtreePoint[] = []
    private isDivided = false

    private northWest: Quadtree | null = null
    private northEast: Quadtree | null = null
    private southWest: Quadtree | null = null
    private southEast: Quadtree | null = null

    constructor(boundary: QuadtreeBoundary, capacity: number = Quadtree.DEFAULT_CAPACITY) {
        this.boundary = boundary
        this.capacity = capacity
    }

    insert(point: QuadtreePoint): boolean {
        if (!this.containsPoint(point)) return false

        if (this.points.length < this.capacity && !this.isDivided) {
            this.points.push(point)
            return true
        }

        if (!this.isDivided) this.subdivide()

        return (
            this.northWest!.insert(point) ||
            this.northEast!.insert(point) ||
            this.southWest!.insert(point) ||
            this.southEast!.insert(point)
        )
    }

    /**
     * Mencari semua titik dalam radius dari pusat (cx, cy).
     * Menggunakan bounding box sebagai pre-filter sebelum cek jarak Euclidean.
     */
    queryRadius(centerX: number, centerY: number, radius: number): QuadtreePoint[] {
        const searchBoundary: QuadtreeBoundary = {
            centerX,
            centerY,
            halfWidth: radius,
            halfHeight: radius,
        }

        const candidates = this.queryRange(searchBoundary)

        // Filter ketat: hanya titik dalam radius Euclidean sesungguhnya
        return candidates.filter((point) => {
            const distanceSquared = (point.x - centerX) ** 2 + (point.y - centerY) ** 2
            return distanceSquared <= radius ** 2
        })
    }

    queryRange(boundary: QuadtreeBoundary): QuadtreePoint[] {
        const foundPoints: QuadtreePoint[] = []

        if (!this.intersects(boundary)) return foundPoints

        for (const point of this.points) {
            if (this.pointInBoundary(point, boundary)) {
                foundPoints.push(point)
            }
        }

        if (this.isDivided) {
            foundPoints.push(...this.northWest!.queryRange(boundary))
            foundPoints.push(...this.northEast!.queryRange(boundary))
            foundPoints.push(...this.southWest!.queryRange(boundary))
            foundPoints.push(...this.southEast!.queryRange(boundary))
        }

        return foundPoints
    }

    // ─── Private helpers ──────────────────────────────────────────────────────

    private subdivide(): void {
        const { centerX, centerY, halfWidth, halfHeight } = this.boundary
        const quarterWidth = halfWidth / 2
        const quarterHeight = halfHeight / 2

        this.northWest = new Quadtree(
            {
                centerX: centerX - quarterWidth,
                centerY: centerY + quarterHeight,
                halfWidth: quarterWidth,
                halfHeight: quarterHeight,
            },
            this.capacity,
        )
        this.northEast = new Quadtree(
            {
                centerX: centerX + quarterWidth,
                centerY: centerY + quarterHeight,
                halfWidth: quarterWidth,
                halfHeight: quarterHeight,
            },
            this.capacity,
        )
        this.southWest = new Quadtree(
            {
                centerX: centerX - quarterWidth,
                centerY: centerY - quarterHeight,
                halfWidth: quarterWidth,
                halfHeight: quarterHeight,
            },
            this.capacity,
        )
        this.southEast = new Quadtree(
            {
                centerX: centerX + quarterWidth,
                centerY: centerY - quarterHeight,
                halfWidth: quarterWidth,
                halfHeight: quarterHeight,
            },
            this.capacity,
        )

        this.isDivided = true

        // Distribusikan titik yang sudah ada ke sub-node
        for (const existingPoint of this.points) {
            this.northWest.insert(existingPoint) ||
                this.northEast.insert(existingPoint) ||
                this.southWest.insert(existingPoint) ||
                this.southEast.insert(existingPoint)
        }
        this.points = []
    }

    private containsPoint(point: QuadtreePoint): boolean {
        return this.pointInBoundary(point, this.boundary)
    }

    private pointInBoundary(point: QuadtreePoint, boundary: QuadtreeBoundary): boolean {
        return (
            point.x >= boundary.centerX - boundary.halfWidth &&
            point.x <= boundary.centerX + boundary.halfWidth &&
            point.y >= boundary.centerY - boundary.halfHeight &&
            point.y <= boundary.centerY + boundary.halfHeight
        )
    }

    private intersects(other: QuadtreeBoundary): boolean {
        return !(
            other.centerX - other.halfWidth > this.boundary.centerX + this.boundary.halfWidth ||
            other.centerX + other.halfWidth < this.boundary.centerX - this.boundary.halfWidth ||
            other.centerY - other.halfHeight > this.boundary.centerY + this.boundary.halfHeight ||
            other.centerY + other.halfHeight < this.boundary.centerY - this.boundary.halfHeight
        )
    }
}
