import type { Colors, Gem, Point } from "@models/Ascii";
import p5 from "p5";
import { useAsciiClick } from "./ascii-click";
import { useAsciiUtils } from "./ascii-utils";

const gemMessages = [
  "",
  "Thanks. Wait, there is one more ?",
  "Again !?",
  "Oh, you grew larger !?",
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
  "Stop growing please !?",
  "Well, It's funny",
  "You became the mess we hated ...",
  "You are a big mess ...",
  "Thanks for trying though !",
  "Oh, you're not growing anymore",
  "Nothing will change now ...",
  "This is not some addictive mobile game !",
  "Hope you enjoyed this :)",
  "The reward here is ...",
  "You get endless cubes forever",
  "Maybe something happens at 999999 cubes ?",
  "(This is a lie) (do not try please)",
  "Well done !",
];

export const useAsciiGem = (p5: p5, SIZE: number) => {
  const gem: Gem = {
    position: { x: 0, y: 0 },
    history: [],
    count: 0,
    timer: 0,
    interval: 80,
    MARGIN: 4,
    MAX_AGE: 10,
  }

  function drawGem(color: p5.Color | null) {
    const { small } = useAsciiUtils(p5, SIZE)
    if (color) p5.fill(color)
    small(gem.position)
  }

  function updateGemExplosions(color: p5.Color) {
    const { hollow } = useAsciiUtils(p5, SIZE)

    gem.history = gem.history.filter(point => point.age < gem.MAX_AGE)
    gem.history.forEach(point => hollow(point, point.age, color))
  }

  function setGemPosition() {
    const x = p5.floor(p5.random(gem.MARGIN, window.innerWidth / SIZE - gem.MARGIN))
    const y = p5.floor(p5.random(gem.MARGIN, window.innerHeight / SIZE - gem.MARGIN))

    gem.position = { x, y }
  }

  function updateGemPosition() {
    if (p5.random() > 0.35) return

    let x = gem.position.x + p5.round(p5.random(2)) - 1
    let y = gem.position.y + p5.round(p5.random(2)) - 1

    if (window.innerWidth / SIZE - x <= 5) x = x - 3
    if (x <= 5) x = x + 3

    if (window.innerHeight / SIZE - y <= 5) y = y - 3
    if (y <= 5) y = y + 3

    gem.position = { x, y }
  }

  function checkGem(active: Point) {
    const { x, y } = gem.position
    const interval = {
      x: [x - 1, x, x + 1],
      y: [y - 1, y, y + 1]
    }

    const xMatch = interval.x.includes(active.x)
    const yMatch = interval.y.includes(active.y)

    if (xMatch && yMatch) {
      const { clicked } = useAsciiClick(p5)
      updateGem((point: Point) => clicked(point))
      return true
    }
  }

  function updateGem(successFn: (point: Point) => void) {
    const pos = gem.position
    gem.count++
    gem.history.push({ ...gem.position, age: 0 })
    setGemPosition()
    updateGemMessage()
    if (gem.count % 10 === 0) successFn(pos)
  }

  function updateGemMessage() {
    const element: HTMLParagraphElement | null = document.querySelector(".gem-message")
    if (!element || gem.count > 30) return

    element.textContent = gemMessages[gem.count] ?? "Well done !"
  }

  function manageGemTimer() {
    if (p5.millis() - gem.timer > gem.interval) {
      updateGems(p5.millis())
    }
  }

  function updateGems(time: number) {
    gem.history.forEach(gem => gem.age++)
    gem.timer = time;
  }

  function manageGem(active: Point, colors: Colors) {
    const gotGem = checkGem(active)

    manageGemTimer()
    drawGem(colors.discrete)
    updateGemExplosions(colors.active!)

    if (gotGem) return true
  }

  return {
    setGemPosition,
    updateGemPosition,
    manageGem
  }
}