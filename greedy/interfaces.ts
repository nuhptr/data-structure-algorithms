export type Activity = [startTime: number, endTime: number];

export interface IActivitySelector {
  select(activities: Activity[]): Activity[];
}

export interface IFractionalKnapsack {
  solve(values: number[], weights: number[], capacity: number): number;
}

export interface IOptimalMerge {
  solve(fileSizes: number[]): number;
}

/** Node dalam Huffman Tree */
export interface HuffmanNode {
  char: string | null;
  freq: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
}

/**
 * Kontrak untuk Huffman Coding.
 */
export interface IHuffmanCoding {
  buildCodes(text: string): Map<string, string>;
  encode(text: string): { encoded: string; codes: Map<string, string> };
  decode(encoded: string, codes: Map<string, string>): string;
}

/**
 * Kontrak untuk Task Scheduler.
 */
export interface ITaskScheduler {
  leastIntervals(tasks: string[], cooldown: number): number;
}

/**
 * Kontrak untuk Jump Game.
 */
export interface IJumpGame {
  canJump(nums: number[]): boolean;
  minJumps(nums: number[]): number;
}
