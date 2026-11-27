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
    /** Kapasitas default jumlah titik per node sebelum dibagi menjadi 4 kuadran. */
    private static readonly DEFAULT_CAPACITY = 4

    /** Batas area persegi panjang 2D yang dicakup node ini. */
    private boundary: QuadtreeBoundary
    /** Kapasitas maksimum titik yang dapat disimpan langsung pada node daun ini. */
    private capacity: number
    /** Daftar titik yang tersimpan di node ini (kosong setelah `subdivide()`). */
    private points: QuadtreePoint[] = []
    /** Penanda apakah node ini sudah dibagi menjadi empat sub-kuadran. */
    private isDivided = false

    /** Sub-kuadran kiri atas (barat laut). */
    private northWest: Quadtree | null = null
    /** Sub-kuadran kanan atas (timur laut). */
    private northEast: Quadtree | null = null
    /** Sub-kuadran kiri bawah (barat daya). */
    private southWest: Quadtree | null = null
    /** Sub-kuadran kanan bawah (tenggara). */
    private southEast: Quadtree | null = null

    /**
     * Membuat node Quadtree baru untuk batas area 2D tertentu.
     *
     * @param boundary - Batas persegi panjang area yang dikelola node ini.
     * @param capacity - Jumlah maksimum titik sebelum node melakukan subdivisi (default `4`).
     */
    constructor(boundary: QuadtreeBoundary, capacity: number = Quadtree.DEFAULT_CAPACITY) {
        this.boundary = boundary
        this.capacity = capacity
    }

    /**
     * Menyisipkan sebuah titik ke dalam Quadtree, membagi node secara rekursif jika penuh.
     *
     * @param point - Titik 2D yang akan disisipkan.
     * @returns `true` jika titik berada dalam batas dan berhasil disimpan, `false` jika tidak.
     */
    insert(point: QuadtreePoint): boolean {
        if (!this.containsPoint(point)) return false

        // Simpan langsung di node ini bila masih muat dan belum terbagi
        if (this.points.length < this.capacity && !this.isDivided) {
            this.points.push(point)
            return true
        }

        if (!this.isDivided) this.subdivide()

        // Teruskan penyisipan ke salah satu dari 4 kuadran anak yang mencakup titik
        return (
            this.northWest!.insert(point) ||
            this.northEast!.insert(point) ||
            this.southWest!.insert(point) ||
            this.southEast!.insert(point)
        )
    }

    /**
     * Mencari semua titik dalam radius dari pusat `(centerX, centerY)`.
     * Menggunakan bounding box sebagai pre-filter sebelum cek jarak Euclidean.
     *
     * @param centerX - Koordinat X titik pusat pencarian.
     * @param centerY - Koordinat Y titik pusat pencarian.
     * @param radius - Radius lingkaran pencarian.
     * @returns Daftar titik yang berada dalam jarak `<= radius`.
     */
    queryRadius(centerX: number, centerY: number, radius: number): QuadtreePoint[] {
        const searchBoundary: QuadtreeBoundary = {
            centerX,
            centerY,
            halfWidth: radius,
            halfHeight: radius,
        }

        const candidates = this.queryRange(searchBoundary)

        // Filter ketat: hanya titik dalam radius Euclidean sesungguhnya (tanpa sqrt)
        return candidates.filter((point) => {
            const distanceSquared = (point.x - centerX) ** 2 + (point.y - centerY) ** 2
            return distanceSquared <= radius ** 2
        })
    }

    /**
     * Mencari seluruh titik yang berada di dalam batas persegi panjang `boundary`.
     *
     * @param boundary - Area pencarian persegi panjang.
     * @returns Daftar titik yang tercakup di dalam `boundary`.
     */
    queryRange(boundary: QuadtreeBoundary): QuadtreePoint[] {
        const foundPoints: QuadtreePoint[] = []

        // Pangkas cabang jika batas node ini tidak beririsan dengan area pencarian
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

    /**
     * Membagi area node saat ini menjadi empat sub-kuadran sama besar (NW, NE, SW, SE)
     * lalu mendistribusikan ulang titik yang ada ke kuadran anak yang sesuai.
     */
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

        // Distribusikan titik yang sudah ada ke sub-node agar titik hanya disimpan di daun
        for (const existingPoint of this.points) {
            this.northWest.insert(existingPoint) ||
                this.northEast.insert(existingPoint) ||
                this.southWest.insert(existingPoint) ||
                this.southEast.insert(existingPoint)
        }
        this.points = []
    }

    /**
     * Memeriksa apakah titik berada di dalam batas area node ini.
     *
     * @param point - Titik yang diperiksa.
     * @returns `true` jika titik berada di dalam `this.boundary`.
     */
    private containsPoint(point: QuadtreePoint): boolean {
        return this.pointInBoundary(point, this.boundary)
    }

    /**
     * Memeriksa apakah suatu titik berada di dalam batas persegi panjang tertentu.
     *
     * @param point - Titik 2D yang diperiksa.
     * @param boundary - Batas persegi panjang acuan.
     * @returns `true` jika titik berada di dalam atau tepat di tepi batas.
     */
    private pointInBoundary(point: QuadtreePoint, boundary: QuadtreeBoundary): boolean {
        return (
            point.x >= boundary.centerX - boundary.halfWidth &&
            point.x <= boundary.centerX + boundary.halfWidth &&
            point.y >= boundary.centerY - boundary.halfHeight &&
            point.y <= boundary.centerY + boundary.halfHeight
        )
    }

    /**
     * Memeriksa apakah batas node ini beririsan (overlap) dengan batas persegi panjang lain.
     *
     * @param other - Batas persegi panjang pembanding.
     * @returns `true` jika kedua area saling beririsan, `false` jika terpisah sepenuhnya.
     */
    private intersects(other: QuadtreeBoundary): boolean {
        return !(
            other.centerX - other.halfWidth > this.boundary.centerX + this.boundary.halfWidth ||
            other.centerX + other.halfWidth < this.boundary.centerX - this.boundary.halfWidth ||
            other.centerY - other.halfHeight > this.boundary.centerY + this.boundary.halfHeight ||
            other.centerY + other.halfHeight < this.boundary.centerY - this.boundary.halfHeight
        )
    }
}
