/**
 * Transportation Record
 */
export default interface TransportationRecord {
  /**
   * user id
   */
  id: number;
  increments: DistanceIncrementDTO[];
  timestamp: number;
}

/**
 * Distance Increment
 */
export interface DistanceIncrementDTO {
  increment: number;
  method: string;
}
