import { PLAYER_1_PATH, PLAYER_2_PATH } from "../constants/boardPaths";

/**
 * Converts an array of path segments into a flat, ordered array of unique board indices.
 * 
 * This allows logical positioning along a path (e.g., "Piece is at index 5, Target is at index 8")
 * regardless of the underlying board geometry or direction changes.
 * 
 * @param pathSegment - An array of segments defining the path. Each segment has:
 *   - start: The starting board index of the segment.
 *   - end: The ending board index of the segment.
 *   - step: The increment/decrement between indices (positive for forward, negative for backward).
 * 
 * @returns A flat array of unique board indices representing the complete path in order.
 * 
 * @example
 * // If PLAYER_1_PATH is [{ start: 0, end: 5, step: 1 }, { start: 5, end: 10, step: 1 }]
 * // PATH_1_INDICES will be [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * // Distance between index 2 and 5 is simply 5 - 2 = 3 steps.
 */
export function getPathIndices(
    pathSegment: { start: number; end: number; step: number }[],
  ) {
    const indices: number[] = [];
    
    pathSegment.forEach((segment) => {
        const { start, end, step } = segment;
        if (step > 0) {
            for (let idx = start; idx <= end; idx += step) indices.push(idx);
      } else {
            for (let idx = start; idx >= end; idx += step) indices.push(idx);
      }
    });
    const indices_without_duplicates = [...new Set(indices)];
    return indices_without_duplicates;
  }

export const PATH_1_INDICES = getPathIndices(PLAYER_1_PATH);
export const PATH_2_INDICES = getPathIndices(PLAYER_2_PATH);