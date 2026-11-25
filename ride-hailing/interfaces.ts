// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

// ─── A* ───────────────────────────────────────────────────────────────────────

export interface RoadNode {
  id: string;
  neighbors: { nodeId: string; cost: number }[];
}

export interface AStarResult {
  path: string[];
  totalCost: number;
}

export interface IAStarSearch {
  findPath(
    graph: Map<string, RoadNode>,
    startId: string,
    endId: string,
    heuristic: (nodeId: string, endId: string) => number
  ): AStarResult | null;
}

// ─── Hungarian Algorithm ──────────────────────────────────────────────────────

export interface MatchingPair {
  passengerIndex: number;
  driverIndex: number;
  cost: number;
}

export interface IHungarianAlgorithm {
  match(costMatrix: number[][]): MatchingPair[];
}

// ─── Haversine ────────────────────────────────────────────────────────────────

export interface IHaversine {
  distanceKm(pointA: GeoCoordinate, pointB: GeoCoordinate): number;
  distanceM(pointA: GeoCoordinate, pointB: GeoCoordinate): number;
  nearestPoint(origin: GeoCoordinate, points: GeoCoordinate[]): GeoCoordinate | null;
}

// ─── Geohash ──────────────────────────────────────────────────────────────────

export interface GeohashBounds {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
}

export interface IGeohash {
  encode(coordinate: GeoCoordinate, precision?: number): string;
  decode(hash: string): GeoCoordinate;
  getBounds(hash: string): GeohashBounds;
  getNeighbors(hash: string): Record<string, string>;
}

// ─── Quadtree ─────────────────────────────────────────────────────────────────

export interface QuadtreeBoundary {
  centerX: number;
  centerY: number;
  halfWidth: number;
  halfHeight: number;
}

export interface QuadtreePoint {
  x: number;
  y: number;
  data?: unknown;
}

export interface IQuadtree {
  insert(point: QuadtreePoint): boolean;
  queryRadius(centerX: number, centerY: number, radius: number): QuadtreePoint[];
  queryRange(boundary: QuadtreeBoundary): QuadtreePoint[];
}
