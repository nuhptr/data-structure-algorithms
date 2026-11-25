export interface ISegmentTree {
    query(left: number, right: number): number
    update(left: number, right: number, value: number): void
}
