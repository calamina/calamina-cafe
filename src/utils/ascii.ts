import p5 from "p5";

interface Point { x: number, y: number }
interface MemoryPoint extends Point { age: number }

const container = document.querySelector("#container")
let SIZE = 24;
let timer = 0;
let interval = 250
let timer2 = 0;
let interval2 = 20
let state = 1
let clickTimer = 0
let mouseCol = 0
let mouseRow = 0
const history: MemoryPoint[] = []
const random: MemoryPoint[] = []
const click: Point = { x: 0, y: 0 }
const chars = "..:/|I::~+¤#@0+. .,:il|li:._ _.:*oO0Oo.:iI%Ii:."

export const script = (p5: p5) => {
  p5.setup = async () => {
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("#container");
    const font = await p5.loadFont("https://fonts.cdnfonts.com/s/66606/ApercuMonoProMedium.woff");
    p5.textSize(22)
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
    const discretecolor: p5.Color = p5.color("#c8c5c5");
    discretecolor.setAlpha(150);
    p5.fill(textcolor);

    const mouseX = p5.mouseX !== 0 ? p5.mouseX / SIZE : window.innerWidth / SIZE / 2
    const mouseY = p5.mouseY !== 0 ? p5.mouseY / SIZE : window.innerHeight / SIZE / 2
    mouseCol = p5.floor(mouseX)
    mouseRow = p5.floor(mouseY)
    if (timer < 1000) {
      click.x = mouseCol
      click.y = mouseRow
    }
    const mouseMoved = p5.movedX || p5.movedY

    activecolor.setAlpha(255)
    p5.fill(activecolor)

    const min = clickTimer - 10
    if (min < 28) {
      activecolor.setAlpha(255 - clickTimer * 5)
      p5.fill(activecolor)
      fillCircle(click, clickTimer, min < 0 ? 0 : min, chars)
    }


    if (history.length > 32 || !mouseMoved) history.shift()

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
      if (age === 6) largeevoid(x, y)
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
  };

  p5.mouseClicked = () => {
    if (clickTimer < 28) return
    clickTimer = 0
    click.x = p5.mouseX / SIZE
    click.y = p5.mouseY / SIZE
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
    p5.text(".", col * SIZE, row * SIZE + SIZE * 2);
    p5.text(".", col * SIZE, row * SIZE - SIZE * 2);
    p5.text(".", col * SIZE + SIZE * 2, row * SIZE);
    p5.text(".", col * SIZE - SIZE * 2, row * SIZE);
  }
  function largeempty(col: number, row: number) {
    p5.text("*", col * SIZE + SIZE, row * SIZE + SIZE);
    p5.text("*", col * SIZE - SIZE, row * SIZE - SIZE);
    p5.text("*", col * SIZE + SIZE, row * SIZE - SIZE);
    p5.text("*", col * SIZE - SIZE, row * SIZE + SIZE);
    p5.text(".", col * SIZE, row * SIZE + SIZE * 2);
    p5.text(".", col * SIZE, row * SIZE - SIZE * 2);
    p5.text(".", col * SIZE + SIZE * 2, row * SIZE);
    p5.text(".", col * SIZE - SIZE * 2, row * SIZE);
  }
  function largeevoid(col: number, row: number) {
    p5.text(".", col * SIZE, row * SIZE + SIZE * 2);
    p5.text(".", col * SIZE, row * SIZE - SIZE * 2);
    p5.text(".", col * SIZE + SIZE * 2, row * SIZE);
    p5.text(".", col * SIZE - SIZE * 2, row * SIZE);
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

  p5.windowResized = () => p5.resizeCanvas(window.innerWidth, window.innerHeight)
  p5.mouseMoved = () => history.push({ x: mouseCol, y: mouseRow, age: 1 })
}

window.onload = () => new p5(script)
