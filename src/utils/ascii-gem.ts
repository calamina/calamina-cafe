import type { Gem, Point } from "@models/Ascii";
import p5 from "p5";

const gem: Gem = {
  position: { x: 0, y: 0 },
  history: [],
  count: 0,
  timer: 0,
  interval: 80,
  MARGIN: 4,
  MAX_AGE: 10,
}

export const useGem = (p5: p5) => {

  function updateGems(time: number) {
    gem.history.forEach(gem => gem.age++)
    gem.timer = time;
  }

  function drawGem(color: p5.Color | null, drawGem: (point: Point) => void) {
    if (color) p5.fill(color)
    drawGem(gem.position)
  }

  function updateGemHistory(drawHistory: (point: Point, age: number) => void) {
    gem.history = gem.history.filter(point => point.age < gem.MAX_AGE)
    gem.history.forEach(point => drawHistory(point, point.age))
  }

  function setGemPosition(SIZE: number) {
    const x = p5.floor(p5.random(gem.MARGIN, window.innerWidth / SIZE - gem.MARGIN))
    const y = p5.floor(p5.random(gem.MARGIN, window.innerHeight / SIZE - gem.MARGIN))

    gem.position = { x, y }
  }

  function updateGemPosition() {
    // TODO :: prevent gem from going out of bounds
    if (p5.random() > 0.35) return

    const x = gem.position.x + p5.round(p5.random(2)) - 1
    const y = gem.position.y + p5.round(p5.random(2)) - 1

    gem.position = { x, y }
  }

  function checkGem(active: Point, successFn: (point: Point) => void, SIZE: number) {
    const { x, y } = gem.position
    const interval = {
      x: [x - 1, x, x + 1],
      y: [y - 1, y, y + 1]
    }

    const xMatch = interval.x.includes(active.x)
    const yMatch = interval.y.includes(active.y)

    if (xMatch && yMatch) updateGem((point: Point) => successFn(point), SIZE)
  }

  function updateGem(successFn: (point: Point) => void, SIZE: number) {
    const pos = gem.position
    gem.count++
    gem.history.push({ ...gem.position, age: 0 })
    setGemPosition(SIZE)
    manageGemElement()
    if (gem.count % 10 === 0) successFn(pos)
  }


  function manageGemElement() {
    const gemElement = document.querySelector(".gems")
    if (!gemElement) return

    const res = gem.count.toString().padStart(3, "0")
    const text = `[${res}]`

    gemElement.textContent = text
  }

  return {
    gem,
    checkGem,
    drawGem,
    setGemPosition,
    updateGemHistory,
    updateGemPosition,
    updateGems,
  }
}