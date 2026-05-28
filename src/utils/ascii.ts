import type { MemoryPoint, Offset, Point } from "@models/Ascii";
import p5 from "p5";
import apercu from "../assets/fonts/ApercuMonoPro-Medium.woff2";
import { useGem } from "./ascii-gem";

const container = document.querySelector("#container")

let isMobile = 'ontouchstart' in document.documentElement;
let SIZE = 22;
let timer = 0;
let interval = 250
const active: Point = { x: 0, y: 0 }
const history: MemoryPoint[] = []
let length = 0

let clickInterval = 20
let clickTimer = 0;
let clickAnimationTimer = 255
const clickAnimationDuration = 28
const click: Point = { x: 0, y: 0 }

let activecolor: p5.Color | null = null;
let discretecolor: p5.Color | null = null;

const script = (p5: p5) => {
  const {
    gem,
    checkGem,
    drawGem,
    setGemPosition,
    updateGems,
    updateGemHistory,
    updateGemPosition
  } = useGem(p5);

  p5.setMoveThreshold(1)

  p5.setup = async () => {
    if (!container) return
    setColors()
    ManageThemeSwitch()
    setGemPosition(SIZE)
    if (isMobile) length++

    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent(container);
    const font = await p5.loadFont(apercu);
    p5.textSize(SIZE - 2)
    p5.textFont(font);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.background(p5.color("#e1dede"));
  };

  p5.draw = () => {
    if (!container) return
    p5.frameRate(120);
    p5.noStroke();
    p5.clear();

    if (!isMobile) {
      const mouseX = p5.mouseX !== 0 ? p5.mouseX / SIZE : window.innerWidth / SIZE / 2
      const mouseY = p5.mouseY !== 0 ? p5.mouseY / SIZE : window.innerHeight / SIZE / 2
      active.x = p5.floor(mouseX)
      active.y = p5.floor(mouseY)
    } else {
      active.y = p5.floor((p5.rotationX) * SIZE + (window.innerWidth / SIZE / 4));
      active.x = p5.floor((p5.rotationY) * SIZE + (window.innerHeight / SIZE / 4));
    }

    if (length > 3) history.push({ x: active.x, y: active.y, age: 1 })
    const res = checkGem(active, length, (point: Point) => clickAnimation(point), SIZE)
    if (res && length < 30) length++

    function clickAnimation(point: Point) {
      clickAnimationTimer = 0
      click.x = p5.floor(point.x)
      click.y = p5.floor(point.y)
    }

    const min = clickAnimationTimer - 10
    if (min < clickAnimationDuration) {
      const chars = "..:/|I::~+¤#@0+. .,:il|li:._ _.:*oO0Oo.:iI%Ii:."
      activecolor?.setAlpha(255 - clickAnimationTimer * 5)
      p5.fill(activecolor!)
      fillCircle(click, clickAnimationTimer, min < 0 ? 0 : min, chars)
    }

    if (p5.millis() - timer > interval) {
      p5.fill(discretecolor!)
      history.forEach(moment => moment.age++)
      timer = p5.millis();
      updateGemPosition(SIZE)
    }

    if (p5.millis() - clickTimer > clickInterval) {
      clickAnimationTimer++
      clickTimer = p5.millis();
    }

    if (p5.millis() - gem.timer > gem.interval) {
      updateGems(p5.millis())
    }

    drawGem(discretecolor, small)

    const mouseMoved = p5.movedX || p5.movedY
    if (history.length > length || (!mouseMoved && !isMobile)) history.shift()

    history.forEach(point => {
      const age = point.age
      activecolor!.setAlpha(255 / age / 1.5);
      p5.fill(activecolor!)
      if (age > 2) dot(point)
      if (age > 1) small(point)
      else large(point)
    })

    updateGemHistory((point: Point, age: number) => hollow(point, age))

    if (length > 0) {
      activecolor?.setAlpha(255);
      p5.fill(activecolor!)
      if (length === 1) dot(active)
      if (length === 2) small(active)
      if (length > 2) large(active)
    }
  };

  p5.windowResized = () => {
    setGemPosition(SIZE)
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
    p5.textSize(SIZE)
    isMobile = window.innerWidth < 600
  }

  p5.mousePressed = () => {
    clickAnimationTimer = 0
    click.x = p5.floor(p5.mouseX / SIZE)
    click.y = p5.floor(p5.mouseY / SIZE)
  }

  function dot(point: Point) {
    drawSquare(point)
  }

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

  function hollow(center: Point, age: number) {
    p5.fill(activecolor!)
    const chars = "·*o~· *·"
    const min = age - 3
    fillCircle(center, age, min, chars)
  }

  function fillCircle(center: Point, radius: number, min: number = 0, chars: string) {
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

  function ManageThemeSwitch() {
    const buttons = document.querySelectorAll("button[data-theme]");
    buttons.forEach(button => button.addEventListener("click", () => setColors()));
  }

  function setColors() {
    const colorActiveVar = getComputedStyle(document.body).getPropertyValue('--highlight');
    const colorDiscreteTheme = getComputedStyle(document.body).getPropertyValue('--bg-alt');
    const theme = document.querySelector("html")?.getAttribute("data-theme")
    const colorDiscreteVars = colorDiscreteTheme.slice(11).split(',')
    const colorDiscreteVar = theme === "light" ? colorDiscreteVars[0] : colorDiscreteVars[1]

    activecolor = p5.color(colorActiveVar);
    discretecolor = p5.color(colorDiscreteVar);
  }
}

export const useAscii = () => new p5(script)