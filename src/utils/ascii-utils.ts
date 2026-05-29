import type { FillOptions, Offset, Point } from "@models/Ascii";
import p5 from "p5";

export const useAsciiUtils = (p5: p5, SIZE: number) => {
  function small(point: Point) {
    drawSquare(point)
    const positions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    drawCharArray("¤", point, positions)
  }

  function large(point: Point) {
    drawSquare(point)

    const positions1 = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    drawCharArray("#", point, positions1)

    const positions2 = [[1, 1], [-1, -1], [1, -1], [-1, 1]]
    drawCharArray("o", point, positions2)

    const positions3 = [[0, 2], [0, -2], [2, 0], [-2, 0]]
    drawCharArray("*", point, positions3)
  }

  function drawSquare(center: Point, offset?: Offset) {
    const offsetX = offset?.x ? SIZE * offset?.x : 0
    const offsetY = offset?.y ? SIZE * offset?.y : 0

    p5.square(
      center.x * SIZE + offsetX - SIZE / 2,
      center.y * SIZE + offsetY - SIZE / 2,
      SIZE
    );
  }

  function drawChar(char: string, center: Point, offset?: Offset) {
    const offsetX = offset?.x ? SIZE * offset?.x : 0
    const offsetY = offset?.y ? SIZE * offset?.y : 0

    p5.text(
      char,
      center.x * SIZE + offsetX,
      center.y * SIZE + offsetY
    );
  }

  function drawCharArray(char: string, center: Point, offsets: number[][]) {
    offsets.forEach(([x, y]) => drawChar(char, center, { x, y }))
  }

  function hollow(center: Point, age: number, color: p5.Color) {
    p5.fill(color)
    const chars = "·*o~· *·"
    const min = age - 3
    fillCircle({ center, radius: age, min, chars })
  }

  function fillCircle(options: FillOptions) {
    const { center, radius, min, chars } = options;

    const top = p5.ceil(center.y - radius);
    const bottom = p5.floor(center.y + radius);
    const left = p5.ceil(center.x - radius);
    const right = p5.floor(center.x + radius);

    for (let y = top; y <= bottom; y++) {
      for (let x = left; x <= right; x++) {
        if (inside(center, { x, y }, radius)) {
          if (!inside(center, { x, y }, min)) {
            const char = getChar(center, { x, y }, chars)
            p5.text(char ?? ' ', x * SIZE, y * SIZE);
          }
        }
      }
    }
  }

  function inside(center: Point, tile: Point, radius: number) {
    const dx = center.x - tile.x;
    const dy = center.y - tile.y;
    const distance_squared = dx * dx + dy * dy;
    return distance_squared <= radius * radius;
  }

  function getChar(center: Point, point: Point, chars: string = "@#o*. ") {
    const diff = p5.floor(p5.max(p5.abs(center.x - point.x), p5.abs(center.y - point.y)))
    return chars[diff]
  }

  function setColors() {
    const colorActiveVar = getComputedStyle(document.body).getPropertyValue('--highlight');
    const colorDiscreteTheme = getComputedStyle(document.body).getPropertyValue('--bg-alt');
    const theme = document.querySelector("html")?.getAttribute("data-theme")
    const colorDiscreteVars = colorDiscreteTheme.slice(11).split(',')
    const colorDiscreteVar = theme === "light" ? colorDiscreteVars[0] : colorDiscreteVars[1]

    return {
      active: p5.color(colorActiveVar),
      discrete: p5.color(colorDiscreteVar)
    }
  }

  return {
    drawSquare,
    fillCircle,
    hollow,
    large,
    small,
    setColors,
  }
}