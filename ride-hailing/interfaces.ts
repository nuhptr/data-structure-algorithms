// ─── Shared Types ─────────────────────────────────────────────────────────────

/** Koordinat geografis GPS dalam satuan derajat desimal. */
export interface GeoCoordinate {
    /** Garis lintang (latitude) dalam derajat (`-90` hingga `90`). */
    latitude: number
    /** Garis bujur (longitude) dalam derajat (`-180` hingga `180`). */
    longitude: number
}

// ─── A* ───────────────────────────────────────────────────────────────────────

/** Node jalan pada graf berbobot yang merepresentasikan persimpangan atau lokasi. */
export interface RoadNode {
    /** Pengenal unik node jalan. */
    id: string
    /** Daftar node tetangga yang terhubung langsung beserta bobot/biaya perpindahannya. */
    neighbors: { nodeId: string; cost: number }[]
}

/** Hasil pencarian rute terpendek dari algoritma A* Search. */
export interface AStarResult {
    /** Urutan ID node dari titik awal hingga titik tujuan. */
    path: string[]
    /** Total biaya kumulatif jalur yang ditemukan. */
    totalCost: number
}

/** Kontrak untuk algoritma pencarian rute A* Search. */
export interface IAStarSearch {
    /**
     * Mencari jalur berbiaya minimum dari `startId` menuju `endId` menggunakan heuristik.
     *
     * @param graph - Peta graf jalan dari ID node ke objek `RoadNode`.
     * @param startId - ID node awal.
     * @param endId - ID node tujuan.
     * @param heuristic - Fungsi estimasi biaya dari suatu node ke node tujuan.
     * @returns Objek `AStarResult` berisi jalur dan total biaya, atau `null` jika tidak ada jalur.
     */
    findPath(
        graph: Map<string, RoadNode>,
        startId: string,
        endId: string,
        heuristic: (nodeId: string, endId: string) => number,
    ): AStarResult | null
}

// ─── Hungarian Algorithm ──────────────────────────────────────────────────────

/** Pasangan optimal hasil penugasan penumpang dan driver beserta biayanya. */
export interface MatchingPair {
    /** Indeks penumpang (baris pada matriks biaya). */
    passengerIndex: number
    /** Indeks driver (kolom pada matriks biaya). */
    driverIndex: number
    /** Biaya penugasan untuk pasangan ini. */
    cost: number
}

/** Kontrak untuk algoritma penugasan optimal Hungarian Algorithm. */
export interface IHungarianAlgorithm {
    /**
     * Menentukan pasangan penumpang-driver dengan total biaya minimum.
     *
     * @param costMatrix - Matriks biaya 2D di mana `costMatrix[i][j]` adalah biaya penumpang `i` ke driver `j`.
     * @returns Daftar pasangan optimal `MatchingPair`.
     */
    match(costMatrix: number[][]): MatchingPair[]
}

// ─── Haversine ────────────────────────────────────────────────────────────────

/** Kontrak untuk kalkulasi jarak geografis menggunakan rumus Haversine. */
export interface IHaversine {
    /**
     * Menghitung jarak permukaan bumi antara dua koordinat dalam kilometer.
     *
     * @param pointA - Koordinat titik pertama.
     * @param pointB - Koordinat titik kedua.
     * @returns Jarak dalam satuan kilometer (km).
     */
    distanceKm(pointA: GeoCoordinate, pointB: GeoCoordinate): number

    /**
     * Menghitung jarak permukaan bumi antara dua koordinat dalam meter.
     *
     * @param pointA - Koordinat titik pertama.
     * @param pointB - Koordinat titik kedua.
     * @returns Jarak dalam satuan meter (m).
     */
    distanceM(pointA: GeoCoordinate, pointB: GeoCoordinate): number

    /**
     * Mencari koordinat terdekat terhadap titik asal dari sekumpulan kandidat titik.
     *
     * @param origin - Titik asal acuan.
     * @param points - Daftar titik kandidat.
     * @returns Koordinat terdekat, atau `null` jika daftar kandidat kosong.
     */
    nearestPoint(origin: GeoCoordinate, points: GeoCoordinate[]): GeoCoordinate | null
}

// ─── Geohash ──────────────────────────────────────────────────────────────────

/** Batas kotak geografis (bounding box) yang diwakili oleh sebuah sel Geohash. */
export interface GeohashBounds {
    /** Batas bawah lintang (latitude minimum). */
    minLat: number
    /** Batas atas lintang (latitude maksimum). */
    maxLat: number
    /** Batas kiri bujur (longitude minimum). */
    minLon: number
    /** Batas kanan bujur (longitude maksimum). */
    maxLon: number
}

/** Kontrak untuk pengkodean dan pencarian spasial berbasis Geohash. */
export interface IGeohash {
    /**
     * Mengodekan koordinat GPS menjadi string Geohash base32.
     *
     * @param coordinate - Koordinat lintang dan bujur.
     * @param precision - Panjang karakter Geohash yang diinginkan.
     * @returns String Geohash hasil pengkodean.
     */
    encode(coordinate: GeoCoordinate, precision?: number): string

    /**
     * Mendekode string Geohash menjadi titik tengah koordinat GPS-nya.
     *
     * @param hash - String Geohash.
     * @returns Koordinat tengah dari sel Geohash tersebut.
     */
    decode(hash: string): GeoCoordinate

    /**
     * Menghitung batas bounding box (min/max latitude & longitude) dari sebuah Geohash.
     *
     * @param hash - String Geohash.
     * @returns Objek `GeohashBounds` berisi rentang lintang dan bujur.
     */
    getBounds(hash: string): GeohashBounds

    /**
     * Mengambil 8 sel Geohash tetangga di sekeliling sel masukan.
     *
     * @param hash - String Geohash pusat.
     * @returns Peta arah mata angin (`north`, `northeast`, dst.) ke string Geohash tetangganya.
     */
    getNeighbors(hash: string): Record<string, string>
}

// ─── Quadtree ─────────────────────────────────────────────────────────────────

/** Batas persegi panjang 2D berbasis titik pusat dan setengah lebar/tinggi. */
export interface QuadtreeBoundary {
    /** Koordinat X titik pusat kotak. */
    centerX: number
    /** Koordinat Y titik pusat kotak. */
    centerY: number
    /** Setengah lebar kotak dari pusat ke tepi horizontal. */
    halfWidth: number
    /** Setengah tinggi kotak dari pusat ke tepi vertikal. */
    halfHeight: number
}

/** Titik spasial 2D yang disimpan di dalam Quadtree beserta payload opsionalnya. */
export interface QuadtreePoint {
    /** Koordinat horizontal X. */
    x: number
    /** Koordinat vertikal Y. */
    y: number
    /** Data tambahan opsional yang melekat pada titik (misalnya metadata driver). */
    data?: unknown
}

/** Kontrak untuk struktur data indeks spasial 2D Quadtree. */
export interface IQuadtree {
    /**
     * Menyisipkan satu titik ke dalam Quadtree jika berada di dalam batas area.
     *
     * @param point - Titik 2D yang akan disisipkan.
     * @returns `true` jika berhasil disisipkan, `false` jika di luar batas.
     */
    insert(point: QuadtreePoint): boolean

    /**
     * Mencari semua titik yang berada dalam jarak radius lingkaran dari titik pusat.
     *
     * @param centerX - Koordinat X pusat pencarian.
     * @param centerY - Koordinat Y pusat pencarian.
     * @param radius - Radius pencarian Euclidean.
     * @returns Daftar titik yang berada di dalam lingkaran radius.
     */
    queryRadius(centerX: number, centerY: number, radius: number): QuadtreePoint[]

    /**
     * Mencari semua titik yang berada di dalam batas persegi panjang `boundary`.
     *
     * @param boundary - Area persegi panjang target pencarian.
     * @returns Daftar titik yang tercakup dalam area tersebut.
     */
    queryRange(boundary: QuadtreeBoundary): QuadtreePoint[]
}
