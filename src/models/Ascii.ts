import type p5 from "p5";

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

export interface Click {
  position: Point,
  INTERVAL: number,
  timer: number,
  ANIMATION_TIMER: number,
  ANIMATION_DURATION: number,
}

export interface FillOptions {
  center: Point, radius: number, min: number, chars: string
}

export interface Colors {
  active: p5.Color | null, discrete: p5.Color | null
}