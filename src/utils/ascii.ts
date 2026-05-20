import p5 from "p5";
import apercu from "../assets/fonts/ApercuMonoPro-Medium.woff2";

interface Point { x: number, y: number }
interface MemoryPoint extends Point { age: number }

const coords = [
  [0, 2], [0, 3], [0, 4], [0, 10], [0, 11], [0, 12], [1, 1], [1, 5], [1, 9], [1, 13], [2, 1], [2, 5], [2, 9], [2, 13], [3, 2], [3, 5], [3, 10], [3, 13], [4, 4], [4, 12], [5, 1], [5, 3], [5, 5], [5, 9], [5, 11], [5, 13], [6, 1], [6, 3], [6, 5], [6, 9], [6, 11], [6, 13], [7, 2], [7, 3], [7, 4], [7, 10], [7, 11], [7, 12], [8, 5], [8, 13], [9, -1], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 8], [9, 9], [9, 10], [9, 11], [9, 12], [9, 13], [10, 5], [10, 7], [10, 10], [11, 5], [11, 7], [12, 4], [12, 8], [12, 10], [12, 11], [12, 12], [13, 1], [13, 3], [13, 5], [13, 9], [13, 11], [13, 13], [14, 1], [14, 3], [14, 5], [14, 9], [14, 11], [14, 13], [15, 2], [15, 3], [15, 4], [15, 10], [15, 13], [16, 5], [17, 2], [17, 3], [17, 4], [17, 5], [18, 1], [19, 1], [20, 2], [20, 3], [20, 4], [20, 5], [21, 1], [22, 1], [23, 2], [23, 3], [23, 4], [24, 5], [25, 0], [25, 2], [25, 3], [25, 4], [25, 5], [27, 2], [27, 3], [27, 4], [27, 5], [28, 1], [29, 1], [30, 2], [30, 3], [30, 4], [31, 5], [32, 4], [32, 5], [33, 1], [33, 3], [33, 5], [34, 1], [34, 3], [34, 5], [35, 2], [35, 3], [35, 4], [36, 5]
]

const cat = [
  [17, 8], [17, 9], [17, 10], [17, 11], [17, 12], [18, 7], [18, 13], [19, 7], [19, 9], [19, 11], [19, 13], [20, 10], [22, 8], [22, 9], [22, 11], [23, 12], [24, 12], [25, 12], [26, 9], [26, 12], [27, 9], [27, 10], [27, 12], [28, 9], [28, 12], [29, 12], [30, 12], [31, 8], [31, 9], [31, 11], [33, 10], [34, 7], [34, 9], [34, 11], [34, 13], [35, 7], [35, 13], [36, 8], [36, 9], [36, 10], [36, 11], [36, 12]
]
const catPhone = [
  [-10.0, -2.0], [-10.0, -1.0], [-10.0, 0.0], [-10.0, 1.0], [-10.0, 2.0], [-9.0, -3.0], [-9.0, 3.0], [-8.0, -3.0], [-8.0, -1.0], [-8.0, 1.0], [-8.0, 3.0], [-7.0, 0.0], [-5.0, -2.0], [-5.0, -1.0], [-5.0, 1.0], [-4.0, 2.0], [-3.0, 2.0], [-2.0, 2.0], [-1.0, -1.0], [-1.0, 2.0], [0.0, -1.0], [0.0, 0.0], [0.0, 2.0], [1.0, -1.0], [1.0, 2.0], [2.0, 2.0], [3.0, 2.0], [4.0, -2.0], [4.0, -1.0], [4.0, 1.0], [6.0, 0.0], [7.0, -3.0], [7.0, -1.0], [7.0, 1.0], [7.0, 3.0], [8.0, -3.0], [8.0, 3.0], [9.0, -2.0], [9.0, -1.0], [9.0, 0.0], [9.0, 1.0], [9.0, 2.0]
]

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
let active: MemoryPoint[] = []

const script = (p5: p5) => {
  p5.setMoveThreshold(1)
  p5.setup = async () => {
    if (!container) return
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

      active.push({ x: mouseCol, y: mouseRow, age: 0 })
      active.push({ x: mouseCol + 1, y: mouseRow, age: 0 })
      active.push({ x: mouseCol - 1, y: mouseRow, age: 0 })
      active.push({ x: mouseCol, y: mouseRow + 1, age: 0 })
      active.push({ x: mouseCol, y: mouseRow - 1, age: 0 })
    }
    if (timer < 1000) {
      click.x = mouseCol
      click.y = mouseRow
    }
    const mouseMoved = p5.movedX || p5.movedY

    activecolor.setAlpha(255)
    p5.fill(activecolor)

    const min = clickTimer - 10
    if (min < clickAnimationDuration) {
      const chars = "..:/|I::~+¤#@0+. .,:il|li:._ _.:*oO0Oo.:iI%Ii:."
      activecolor.setAlpha(255 - clickTimer * 5)
      p5.fill(activecolor)
      fillCircle(click, clickTimer, min < 0 ? 0 : min, chars)
    }

    active.forEach(elt => elt.age++)

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

    drawTitle();

    active = active.filter(elt => elt.age < 50)

    active.forEach(({ x, y, age }) => {
      const activecolor: p5.Color = p5.color("oklch(0.902 0.003 17.587)");
      activecolor.setAlpha(255 - age * 5);

      p5.fill(activecolor)
      p5.square(((x + 1) * SIZE - SIZE / 2), (y * SIZE - SIZE / 2), SIZE);
    })

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
  };

  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
    p5.textSize(SIZE)
    isMobile = window.innerWidth < 600
  }

  p5.mouseMoved = () => {
    history.push({ x: mouseCol, y: mouseRow, age: 1 })

    active.push({ x: mouseCol, y: mouseRow, age: 0 })
    active.push({ x: mouseCol + 1, y: mouseRow, age: 0 })
    active.push({ x: mouseCol - 1, y: mouseRow, age: 0 })
    active.push({ x: mouseCol, y: mouseRow + 1, age: 0 })
    active.push({ x: mouseCol, y: mouseRow - 1, age: 0 })
  }

  p5.mouseClicked = () => {
    if (clickTimer < clickAnimationDuration) return
    if (isMobile) {
      mouseCol = p5.floor(p5.mouseX / SIZE)
      mouseRow = p5.floor(p5.mouseY / SIZE)
    }
    clickTimer = 0
    click.x = p5.floor(p5.mouseX / SIZE)
    click.y = p5.floor(p5.mouseY / SIZE)
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

  function drawTitle() {
    if (isMobile) return drawMobileTitle();

    const x = p5.floor(window.innerWidth / SIZE / 2) - 18;
    const y = p5.floor(window.innerHeight / SIZE / 2) - 6;
    const activecolor: p5.Color = p5.color("oklch(0.835 0.006 17.587)");
    const discretecolor: p5.Color = p5.color("oklch(80% 0.1 320)");

    p5.fill(discretecolor)

    for (const coord of coords) {
      p5.square(((x + 1) * SIZE - SIZE / 2) + (coord[0] * SIZE), (y * SIZE - SIZE / 2) + (coord[1] * SIZE), SIZE);
    }

    p5.fill(activecolor)
    for (const coord of cat) {
      p5.square(((x + 1) * SIZE - SIZE / 2) + (coord[0] * SIZE), (y * SIZE - SIZE / 2) + (coord[1] * SIZE), SIZE);
    }
  }

  function drawMobileTitle() {
    const activecolor: p5.Color = p5.color("oklch(0.835 0.006 17.587)");
    const x = p5.floor(window.innerWidth / SIZE / 2);
    const y = p5.floor(window.innerHeight / SIZE / 2);

    p5.fill(activecolor)
    for (const coord of catPhone) {
      p5.square(((x + 1) * SIZE - SIZE / 2) + (coord[0] * SIZE), (y * SIZE - SIZE / 2) + (coord[1] * SIZE), SIZE);
    }
  }
}

export const useAscii = () => new p5(script)