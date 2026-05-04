import p5 from "p5";
import apercu from "../assets/fonts/ApercuMonoPro-Medium.woff2";

interface Point { x: number, y: number }
interface MemoryPoint extends Point { age: number }

const container = document.querySelector("#container")
const isMobile = 'ontouchstart' in document.documentElement;
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
const random: MemoryPoint[] = []
const click: Point = { x: 0, y: 0 }

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

    if (random.length > 6) random.shift()
    random.forEach(({ x, y, age }) => {
      p5.fill(discretecolor)
      if (age === 1) dot(x, y)
      if (age === 2) small(x, y)
      if (age === 3) large(x, y)
      if (age === 4) largehollow(x, y)
      if (age === 5) largeempty(x, y)
      if (age === 6) largevoid(x, y)
    })


    if (p5.millis() - timer > interval) {
      state = state !== 3 ? state + 1 : 1
      p5.fill(discretecolor)
      const x = p5.random(window.innerWidth / SIZE)
      const y = p5.random(window.innerHeight / SIZE)
      large(x, y)
      random.push({ x, y, age: 0 })
      random.forEach(rando => rando.age++)
      history.forEach(moment => moment.age++)
      timer = p5.millis();
    }
    if (p5.millis() - timer2 > interval2) {
      clickTimer++
      timer2 = p5.millis();
    }

    drawTitle();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
    p5.textSize(SIZE)
  }

  p5.mouseMoved = () => {
    history.push({ x: mouseCol, y: mouseRow, age: 1 })
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
    p5.text("@", col * SIZE, row * SIZE);
    p5.text("#", col * SIZE, row * SIZE + SIZE);
    p5.text("#", col * SIZE, row * SIZE - SIZE);
    p5.text("#", col * SIZE + SIZE, row * SIZE);
    p5.text("#", col * SIZE - SIZE, row * SIZE);
  }

  function large(col: number, row: number) {
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

  function largeempty(col: number, row: number) {
    p5.text("*", col * SIZE + SIZE, row * SIZE + SIZE);
    p5.text("*", col * SIZE - SIZE, row * SIZE - SIZE);
    p5.text("*", col * SIZE + SIZE, row * SIZE - SIZE);
    p5.text("*", col * SIZE - SIZE, row * SIZE + SIZE);
    p5.text("·", col * SIZE, row * SIZE + SIZE * 2);
    p5.text("·", col * SIZE, row * SIZE - SIZE * 2);
    p5.text("·", col * SIZE + SIZE * 2, row * SIZE);
    p5.text("·", col * SIZE - SIZE * 2, row * SIZE);
  }

  function largevoid(col: number, row: number) {
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
    let ratio = 1;
    if (window.innerWidth < 700) ratio = .5
    else if (window.innerWidth < 1400) ratio = .75
    window.innerWidth < 700 ? .5 : 1
    const s = SIZE * ratio
    const x = p5.floor(window.innerWidth / SIZE / 2);
    const y = p5.floor(window.innerHeight / SIZE / 2);
    const activecolor: p5.Color = p5.color("oklch(80% 0.1 320 / .9)");
    const discretecolor: p5.Color = p5.color("#00000022");

    const coords = [
      [-18, -4], [-18, -3], [-18, -2], [-18, 4], [-18, 5], [-18, 6], [-17, -5], [-17, -1], [-17, 3], [-17, 7], [-16, -5], [-16, -1], [-16, 3], [-16, 7], [-15, -4], [-15, -1], [-15, 4], [-15, 7], [-14, -2], [-14, 6], [-13, -5], [-13, -3], [-13, -1], [-13, 3], [-13, 5], [-13, 7], [-12, -5], [-12, -3], [-12, -1], [-12, 3], [-12, 5], [-12, 7], [-11, -4], [-11, -3], [-11, -2], [-11, 4], [-11, 5], [-11, 6], [-10, -1], [-10, 7], [-9, -7], [-9, -6], [-9, -5], [-9, -4], [-9, -3], [-9, -2], [-9, 2], [-9, 3], [-9, 4], [-9, 5], [-9, 6], [-9, 7], [-8, -1], [-8, 1], [-8, 4], [-7, -1], [-7, 1], [-6, -2], [-6, 2], [-6, 4], [-6, 5], [-6, 6], [-5, -5], [-5, -3], [-5, -1], [-5, 3], [-5, 5], [-5, 7], [-4, -5], [-4, -3], [-4, -1], [-4, 3], [-4, 5], [-4, 7], [-3, -4], [-3, -3], [-3, -2], [-3, 4], [-3, 7], [-2, -1],
      [-1, -4], [-1, -3], [-1, -2], [-1, -1], [0, -5], [1, -5], [2, -4], [2, -3], [2, -2], [2, -1], [3, -5], [4, -5],
      [5, -4], [5, -3], [5, -2], [6, -1], [7, -6], [7, -4], [7, -3], [7, -2], [7, -1], [9, -4], [9, -3], [9, -2], [9, -1],
      [10, -5], [11, -5], [12, -4], [12, -3], [12, -2], [13, -1], [14, -2], [14, -1], [15, -5], [15, -3], [15, -1],
      [16, -5], [16, -3], [16, -1], [17, -4], [17, -3], [17, -2], [18, -1],
    ]

    p5.fill(activecolor)
    for (const coord of coords) {
      p5.square(((x + 1) * SIZE - SIZE / 2) + (coord[0] * s), (y * SIZE - SIZE / 2) + (coord[1] * s), s);
    }

    const cat = [
      [-1, 2], [-1, 3], [-1, 4], [-1, 5], [-1, 6], [0, 1], [0, 7], [1, 1], [1, 3], [1, 5], [1, 7], [2, 4], [4, 2], [4, 3], [4, 5], [5, 6], [6, 6], [7, 6], [8, 3], [8, 6], [9, 3], [9, 4], [9, 6], [10, 3], [10, 6], [11, 6], [12, 6], [13, 2], [13, 3], [13, 5], [15, 4], [16, 1], [16, 3], [16, 5], [16, 7], [17, 1], [17, 7], [18, 2], [18, 3], [18, 4], [18, 5], [18, 6]
    ]

    p5.fill(discretecolor)
    for (const coord of cat) {
      p5.square(((x + 1) * SIZE - SIZE / 2) + (coord[0] * s), (y * SIZE - SIZE / 2) + (coord[1] * s), s);
    }
  }
}

export const useAscii = () => new p5(script)