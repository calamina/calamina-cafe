export interface Point { x: number, y: number }

export interface Offset { x?: number, y?: number }

export interface MemoryPoint extends Point { age: number }

export interface Gem {
  position: Point,
  history: MemoryPoint[],
  count: number,
  timer: number,
  interval: number,
  MARGIN: number,
  MAX_AGE: number,
}