import p5 from "p5";
import apercu from "../assets/fonts/ApercuMonoPro-Medium.woff2";

interface Point { x: number, y: number }
interface MemoryPoint extends Point { age: number }

const container = document.querySelector("#container")

let isMobile = 'ontouchstart' in document.documentElement;
let SIZE = 22;
let timer = 0;
let interval = 250
let timer2 = 0;
let interval2 = 20
let state = 1
let clickTimer = 0
let mouseCol = 0
let mouseRow = 0
const clickAnimationDuration = 28
const history: MemoryPoint[] = []
const click: Point = { x: 0, y: 0 }

const logOptions = {
  START: "start logging",
  MOVE: "mouse moved",
  STOP: "mouse stopped",
  CLICK: "mouse clicked",
  LINK: "link hovered",
}
const logLength = 6
// TODO :: on load replace loading by logActive
let logActive: string = logOptions.START
const logList: string[] = [];

const script = (p5: p5) => {
  p5.setMoveThreshold(1)
  p5.setup = async () => {
    if (!container) return
    manageLogLinks()

    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent(container);
    const font = await p5.loadFont(apercu);
    p5.textSize(SIZE)
    p5.textFont(font);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.background(p5.color("#e1dede"));
  };

  p5.draw = () => {
    if (!container) return
    p5.frameRate(120);
    p5.noStroke();
    p5.clear();

    const activecolor: p5.Color = p5.color("oklch(80% 0.1 320)");
    const textcolor: p5.Color = p5.color("#a8a5a5");
    const discretecolor: p5.Color = p5.color("#bab2b2");
    discretecolor.setAlpha(150);
    p5.fill(textcolor);

    if (!isMobile) {
      const mouseX = p5.mouseX !== 0 ? p5.mouseX / SIZE : window.innerWidth / SIZE / 2
      const mouseY = p5.mouseY !== 0 ? p5.mouseY / SIZE : window.innerHeight / SIZE / 2
      mouseCol = p5.floor(mouseX)
      mouseRow = p5.floor(mouseY)
    } else {
      mouseRow = p5.floor((p5.rotationX) * SIZE + (window.innerWidth / SIZE / 4));
      mouseCol = p5.floor((p5.rotationY) * SIZE + (window.innerHeight / SIZE / 4));
      history.push({ x: mouseCol, y: mouseRow, age: 0 })
    }
    if (timer < 1000) {
      click.x = mouseCol
      click.y = mouseRow
    }

    activecolor.setAlpha(255)
    p5.fill(activecolor)

    const min = clickTimer - 10
    if (min < clickAnimationDuration) {
      const chars = "..:/|I::~+¤#@0+. .,:il|li:._ _.:*oO0Oo.:iI%Ii:."
      activecolor.setAlpha(255 - clickTimer * 5)
      p5.fill(activecolor)
      fillCircle(click, clickTimer, min < 0 ? 0 : min, chars)
    }

    if (p5.millis() - timer > interval) {
      state = state !== 3 ? state + 1 : 1
      p5.fill(discretecolor)
      history.forEach(moment => moment.age++)
      timer = p5.millis();
    }

    if (p5.millis() - timer2 > interval2) {
      clickTimer++
      timer2 = p5.millis();
    }

    const mouseMoved = p5.movedX || p5.movedY
    // todo :: Find a way to not activate STOP so eagerly 
    // if (!mouseMoved && logActive === logOptions.MOVE) logActive = logOptions.STOP
    if (history.length > 32 || (!isMobile && !mouseMoved)) history.shift()

    history.forEach(({ x, y, age }) => {
      activecolor.setAlpha(255 / age / 1.5);
      p5.fill(activecolor)
      if (age > 2) dot(x, y)
      if (age > 1) small(x, y)
      else if (p5.mouseIsPressed) {
        largehollow(x, y)
      } else {
        large(x, y)
      }
    })

    activecolor.setAlpha(255);
    p5.fill(activecolor)
    large(mouseCol, mouseRow)

    manageCoords(mouseCol, mouseRow)
    manageLog()
  };

  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
    p5.textSize(SIZE)
    isMobile = window.innerWidth < 600
  }

  p5.mouseMoved = () => {
    history.push({ x: mouseCol, y: mouseRow, age: 1 })
    logActive = logOptions.MOVE
  }

  p5.mousePressed = () => {
    if (isMobile) {
      mouseCol = p5.floor(p5.mouseX / SIZE)
      mouseRow = p5.floor(p5.mouseY / SIZE)
    }
    clickTimer = 0
    click.x = p5.floor(p5.mouseX / SIZE)
    click.y = p5.floor(p5.mouseY / SIZE)

    logActive = logOptions.CLICK
  }

  function dot(col: number, row: number) {
    p5.text("@", col * SIZE, row * SIZE);
  }

  function small(col: number, row: number) {
    p5.square((col * SIZE - SIZE / 2), (row * SIZE - SIZE / 2), SIZE);

    p5.text("@", col * SIZE, row * SIZE);
    p5.text("#", col * SIZE, row * SIZE + SIZE);
    p5.text("#", col * SIZE, row * SIZE - SIZE);
    p5.text("#", col * SIZE + SIZE, row * SIZE);
    p5.text("#", col * SIZE - SIZE, row * SIZE);
  }

  function large(col: number, row: number) {
    p5.square((col * SIZE - SIZE / 2), (row * SIZE - SIZE / 2), SIZE);

    p5.text("@", col * SIZE, row * SIZE);
    p5.text("#", col * SIZE, row * SIZE + SIZE);
    p5.text("#", col * SIZE, row * SIZE - SIZE);
    p5.text("#", col * SIZE + SIZE, row * SIZE);
    p5.text("#", col * SIZE - SIZE, row * SIZE);
    p5.text("o", col * SIZE + SIZE, row * SIZE + SIZE);
    p5.text("o", col * SIZE - SIZE, row * SIZE - SIZE);
    p5.text("o", col * SIZE + SIZE, row * SIZE - SIZE);
    p5.text("o", col * SIZE - SIZE, row * SIZE + SIZE);
    p5.text("*", col * SIZE, row * SIZE + SIZE * 2);
    p5.text("*", col * SIZE, row * SIZE - SIZE * 2);
    p5.text("*", col * SIZE + SIZE * 2, row * SIZE);
    p5.text("*", col * SIZE - SIZE * 2, row * SIZE);
  }

  function largehollow(col: number, row: number) {
    p5.text("o", col * SIZE, row * SIZE + SIZE);
    p5.text("o", col * SIZE, row * SIZE - SIZE);
    p5.text("o", col * SIZE + SIZE, row * SIZE);
    p5.text("o", col * SIZE - SIZE, row * SIZE);
    p5.text("*", col * SIZE + SIZE, row * SIZE + SIZE);
    p5.text("*", col * SIZE - SIZE, row * SIZE - SIZE);
    p5.text("*", col * SIZE + SIZE, row * SIZE - SIZE);
    p5.text("*", col * SIZE - SIZE, row * SIZE + SIZE);
    p5.text("·", col * SIZE, row * SIZE + SIZE * 2);
    p5.text("·", col * SIZE, row * SIZE - SIZE * 2);
    p5.text("·", col * SIZE + SIZE * 2, row * SIZE);
    p5.text("·", col * SIZE - SIZE * 2, row * SIZE);
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

  function manageLogLinks() {
    const links = document.querySelectorAll("a");
    links.forEach((link) => link.addEventListener("mouseenter", () => logActive = logOptions.LINK));
  }

  function manageLog() {
    const logElement = document.querySelector(".logList")
    if (!logElement) return

    if (!logActive.length || logActive === logList.at(-1)) return

    if (logList.length === logLength) logList.shift();

    logList.push(logActive)

    const log = logList.at(-1)
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, "0")
    const mins = date.getMinutes().toString().padStart(2, "0")
    const secs = date.getSeconds().toString().padStart(2, "0")
    const node = document.createElement("p")

    node.classList.add("log")
    node.textContent = `[${hours}:${mins}:${secs}] ${log}`

    if (logElement.childNodes.length > logLength && logElement.firstChild) {
      logElement.removeChild(logElement.firstChild)
    }
    logElement.appendChild(node)
  }

  function manageCoords(mouseCol: number, mouseRow: number) {
    const coordElement = document.querySelector(".coords")
    if (!coordElement) return

    const x = mouseCol.toString().padStart(2, "0")
    const y = mouseRow.toString().padStart(2, "0")
    const text = `[:${x}  ${y}:]`

    coordElement.textContent = text
  }
}

export const useAscii = () => new p5(script)

