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

const gemMessages = [
  "Catch that pesky cuboid please ...",
  "Thanks. Wait, there is one more ?",
  "Again !?",
  "Did you grow larger ??",
  "Wow another one ...",
  "You are getting BIG !",
  "Still more cubes ...",
  "Where are they coming from ???",
  "What is that dragging behind you?",
  "You're making a mess ...",
  "Is that a tail?",
  "Are you EATING them !?",
  "Just catch the cubes please ...",
  "I HATE THEM !",
  "WHERE ARE THEY COMING FROM ?",
  "And Will you stop growing please !?",
  "Well, It's funny ...",
  "You became the mess we hated ...",
  "A big mass of cubes",
  "Very creepy, but thanks for trying !",
  "Ok we are DONE !",
  "Hope you enjoyed this :)",
  "Nothing will change anymore ...",
  "This is not some addictive mobile game",
  "The reward here is ...",
  "You get endless cubes forever !",
  "Well done !",
  "Maybe something happens at 999999 cubes ?",
  "(This is a lie) (do not try please)",
];

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

  function updateGemPosition(SIZE: number) {
    if (p5.random() > 0.35) return

    let x = gem.position.x + p5.round(p5.random(2)) - 1
    let y = gem.position.y + p5.round(p5.random(2)) - 1

    if (window.innerWidth / SIZE - x <= 5) x = x - 3
    if (x <= 5) x = x + 3

    if (window.innerHeight / SIZE - y <= 5) y = y - 3
    if (y <= 5) y = y + 3

    gem.position = { x, y }
  }

  function checkGem(active: Point, history: number, successFn: (point: Point) => void, SIZE: number) {
    const { x, y } = gem.position
    const interval = {
      x: [x - 1, x, x + 1],
      y: [y - 1, y, y + 1]
    }

    const xMatch = interval.x.includes(active.x)
    const yMatch = interval.y.includes(active.y)

    if (xMatch && yMatch) {
      updateGem((point: Point) => successFn(point), SIZE)
      return history + 1
    }
  }

  function updateGem(successFn: (point: Point) => void, SIZE: number) {
    const pos = gem.position
    gem.count++
    gem.history.push({ ...gem.position, age: 0 })
    setGemPosition(SIZE)
    updateGemMessage()
    if (gem.count % 10 === 0) successFn(pos)
  }

  function updateGemMessage() {
    const element: HTMLParagraphElement | null = document.querySelector(".gem-message")
    if (!element || gem.count > 30) return

    element.textContent = gemMessages[gem.count] ?? "Well done !"
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