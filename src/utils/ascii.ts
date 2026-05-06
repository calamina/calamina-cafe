import p5 from "p5";
import apercu from "../assets/fonts/ApercuMonoPro-Medium.woff2";

interface Point { x: number, y: number }
interface MemoryPoint extends Point { age: number }

const coords = [
  [0, 2], [0, 3], [0, 4], [0, 10], [0, 11], [0, 12], [1, 1], [1, 5], [1, 9], [1, 13], [2, 1], [2, 5], [2, 9], [2, 13], [3, 2], [3, 5], [3, 10], [3, 13], [4, 4], [4, 12], [5, 1], [5, 3], [5, 5], [5, 9], [5, 11], [5, 13], [6, 1], [6, 3], [6, 5], [6, 9], [6, 11], [6, 13], [7, 2], [7, 3], [7, 4], [7, 10], [7, 11], [7, 12], [8, 5], [8, 13], [9, -1], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 8], [9, 9], [9, 10], [9, 11], [9, 12], [9, 13], [10, 5], [10, 7], [10, 10], [11, 5], [11, 7], [12, 4], [12, 8], [12, 10], [12, 11], [12, 12], [13, 1], [13, 3], [13, 5], [13, 9], [13, 11], [13, 13], [14, 1], [14, 3], [14, 5], [14, 9], [14, 11], [14, 13], [15, 2], [15, 3], [15, 4], [15, 10], [15, 13], [16, 5], [17, 2], [17, 3], [17, 4], [17, 5], [18, 1], [19, 1], [20, 2], [20, 3], [20, 4], [20, 5], [21, 1], [22, 1], [23, 2], [23, 3], [23, 4], [24, 5], [25, 0], [25, 2], [25, 3], [25, 4], [25, 5], [27, 2], [27, 3], [27, 4], [27, 5], [28, 1], [29, 1], [30, 2], [30, 3], [30, 4], [31, 5], [32, 4], [32, 5], [33, 1], [33, 3], [33, 5], [34, 1], [34, 3], [34, 5], [35, 2], [35, 3], [35, 4], [36, 5]
]

const container = document.querySelector("#container")
const isMobile = 'ontouchstart' in document.documentElement;
let SIZE = 22;
let AGEREF = 12;
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
// let noise: MemoryPoint[] = []
// let random: MemoryPoint[] = []

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





    // if (random.length > 6) random.shift()
    // random.forEach(({ x, y, age }) => {
    //   p5.fill(discretecolor)
    //   if (age === 1) dot(x, y)
    //   if (age === 2) small(x, y)
    //   if (age === 3) large(x, y)
    //   if (age === 4) largehollow(x, y)
    //   if (age === 5) largeempty(x, y)
    //   if (age === 6) largevoid(x, y)
    // })

    // p5.fill(activecolor)
    // noise.forEach(({ x, y, age }) => {
    //   if (age === 0) dot(x, y)
    //   if (age === 1) small(x, y)
    //   if (age > 1 && age < AGEREF) large(x, y)
    //   if (age === AGEREF) largehollow(x, y)
    //   if (age === AGEREF + 1) largeempty(x, y)
    //   if (age === AGEREF + 2) largevoid(x, y)
    // })
    active.forEach(elt => elt.age++)



    if (p5.millis() - timer > interval) {
      state = state !== 3 ? state + 1 : 1
      p5.fill(discretecolor)
      history.forEach(moment => moment.age++)
      timer = p5.millis();
      // const x = p5.random(window.innerWidth / SIZE)
      // const y = p5.random(window.innerHeight / SIZE)
      // large(x, y)
      // random.push({ x, y, age: 0 })
      // random.forEach(rando => rando.age++)
      // drawTitleNoise()
    }

    if (p5.millis() - timer2 > interval2) {
      clickTimer++
      timer2 = p5.millis();
    }

    drawTitle();


    active = active.filter(elt => elt.age < 50)

    active.forEach(({ x, y, age }) => {
      let ratio = 1;
      if (window.innerWidth < 700) ratio = .5
      else if (window.innerWidth < 1400) ratio = .75
      const s = SIZE * ratio
      const activecolor: p5.Color = p5.color("oklch(0.902 0.003 17.587)");
      activecolor.setAlpha(255 - age * 5);
      // if (age > 2) activecolor.setAlpha(255 - age * 60);

      p5.fill(activecolor)
      p5.square(((x + 1) * SIZE - SIZE / 2), (y * SIZE - SIZE / 2), s);
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

    // let ratio = 1;
    // if (window.innerWidth < 700) ratio = .5
    // else if (window.innerWidth < 1400) ratio = .75
    // const s = SIZE * ratio

    // p5.fill(activecolor)
    // if (active.length === coords.length) active.length = 0
    // active.forEach(({ x, y, age }) => {
    //   p5.square(((x + 1) * SIZE - SIZE / 2), (y * SIZE - SIZE / 2), s);
    // })
  };

  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
    p5.textSize(SIZE)
  }

  p5.mouseMoved = () => {
    history.push({ x: mouseCol, y: mouseRow, age: 1 })

    const x = p5.floor(window.innerWidth / SIZE / 2) - 18;
    const y = p5.floor(window.innerHeight / SIZE / 2) - 6;
    // const activecolor: p5.Color = p5.color("oklch(80% 0.1 320)");
    // const activecolor: p5.Color = p5.color("oklch(80% 0.1 320)");
    // p5.fill(activecolor)

    // if (coords.find(([px, py]) => px + x === mouseCol && py + y === mouseRow)) {
    // if (!active.some(elt => elt.x === mouseCol && elt.y === mouseRow))
    active.push({ x: mouseCol, y: mouseRow, age: 0 })
    // }
    // if (coords.find(([px, py]) => px + x === mouseCol + 1 && py + y === mouseRow)) {
    // if (!active.some(elt => elt.x === mouseCol + 1 && elt.y === mouseRow))
    active.push({ x: mouseCol + 1, y: mouseRow, age: 0 })
    // }
    // if (coords.find(([px, py]) => px + x === mouseCol - 1 && py + y === mouseRow)) {
    // if (!active.some(elt => elt.x === mouseCol - 1 && elt.y === mouseRow))
    active.push({ x: mouseCol - 1, y: mouseRow, age: 0 })
    // }
    // if (coords.find(([px, py]) => px + x === mouseCol && py + y === mouseRow + 1)) {
    // if (!active.some(elt => elt.x === mouseCol && elt.y === mouseRow + 1))
    active.push({ x: mouseCol, y: mouseRow + 1, age: 0 })
    // }
    // if (coords.find(([px, py]) => px + x === mouseCol && py + y === mouseRow - 1)) {
    // if (!active.some(elt => elt.x === mouseCol && elt.y === mouseRow - 1))
    active.push({ x: mouseCol, y: mouseRow - 1, age: 0 })
    // }
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
    const x = p5.floor(window.innerWidth / SIZE / 2) - 18;
    const y = p5.floor(window.innerHeight / SIZE / 2) - 6;
    // const activecolor: p5.Color = p5.color("oklch(80% 0.1 320)");
    const activecolor: p5.Color = p5.color("oklch(0.835 0.006 17.587)");
    // const activecolor: p5.Color = p5.color("oklch(0.169 0.004 17.587)");
    const discretecolor: p5.Color = p5.color("oklch(80% 0.1 320)");
    // const discretecolor: p5.Color = p5.color("#00000022");

    p5.fill(discretecolor)

    // discretecolor.setAlpha(255 / p5.floor(p5.random(1, 10)));
    for (const coord of coords) {
      p5.square(((x + 1) * SIZE - SIZE / 2) + (coord[0] * s), (y * SIZE - SIZE / 2) + (coord[1] * s), s);
    }

    const cat = [
      [17, 8], [17, 9], [17, 10], [17, 11], [17, 12], [18, 7], [18, 13], [19, 7], [19, 9], [19, 11], [19, 13], [20, 10], [22, 8], [22, 9], [22, 11], [23, 12], [24, 12], [25, 12], [26, 9], [26, 12], [27, 9], [27, 10], [27, 12], [28, 9], [28, 12], [29, 12], [30, 12], [31, 8], [31, 9], [31, 11], [33, 10], [34, 7], [34, 9], [34, 11], [34, 13], [35, 7], [35, 13], [36, 8], [36, 9], [36, 10], [36, 11], [36, 12]
    ]

    p5.fill(activecolor)
    for (const coord of cat) {
      p5.square(((x + 1) * SIZE - SIZE / 2) + (coord[0] * s), (y * SIZE - SIZE / 2) + (coord[1] * s), s);
    }
  }

  // function drawTitleNoise() {
  //   const x = p5.floor(window.innerWidth / SIZE / 2);
  //   const y = p5.floor(window.innerHeight / SIZE / 2);

  //   let ratio = 1;
  //   if (window.innerWidth < 700) ratio = .5
  //   else if (window.innerWidth < 1400) ratio = .75

  //   const coords = [
  //     [-18, -4], [-18, -3], [-18, -2], [-18, 4], [-18, 5], [-18, 6], [-17, -5], [-17, -1], [-17, 3], [-17, 7], [-16, -5], [-16, -1], [-16, 3], [-16, 7], [-15, -4], [-15, -1], [-15, 4], [-15, 7], [-14, -2], [-14, 6], [-13, -5], [-13, -3], [-13, -1], [-13, 3], [-13, 5], [-13, 7], [-12, -5], [-12, -3], [-12, -1], [-12, 3], [-12, 5], [-12, 7], [-11, -4], [-11, -3], [-11, -2], [-11, 4], [-11, 5], [-11, 6], [-10, -1], [-10, 7], [-9, -7], [-9, -6], [-9, -5], [-9, -4], [-9, -3], [-9, -2], [-9, 2], [-9, 3], [-9, 4], [-9, 5], [-9, 6], [-9, 7], [-8, -1], [-8, 1], [-8, 4], [-7, -1], [-7, 1], [-6, -2], [-6, 2], [-6, 4], [-6, 5], [-6, 6], [-5, -5], [-5, -3], [-5, -1], [-5, 3], [-5, 5], [-5, 7], [-4, -5], [-4, -3], [-4, -1], [-4, 3], [-4, 5], [-4, 7], [-3, -4], [-3, -3], [-3, -2], [-3, 4], [-3, 7], [-2, -1],
  //     [-1, -4], [-1, -3], [-1, -2], [-1, -1], [0, -5], [1, -5], [2, -4], [2, -3], [2, -2], [2, -1], [3, -5], [4, -5],
  //     [5, -4], [5, -3], [5, -2], [6, -1], [7, -6], [7, -4], [7, -3], [7, -2], [7, -1], [9, -4], [9, -3], [9, -2], [9, -1],
  //     [10, -5], [11, -5], [12, -4], [12, -3], [12, -2], [13, -1], [14, -2], [14, -1], [15, -5], [15, -3], [15, -1],
  //     [16, -5], [16, -3], [16, -1], [17, -4], [17, -3], [17, -2], [18, -1],
  //   ]

  //   if (ratio === 1) {
  //     noise.forEach(elt => elt.age++)
  //     noise = noise.filter(elt => elt.age < AGEREF + 2)
  //     if (noise.length > 8) return

  //     for (const coord of coords) {
  //       const randx = p5.floor(p5.random(-2, 2))
  //       const randy = p5.floor(p5.random(-2, 2))
  //       const rand = p5.random(0, 10);

  //       if (rand < 1.5) {
  //         noise.push({ x: x + 1 + randx + (coord[0] * ratio), y: y + randy + coord[1] * ratio, age: 0 })
  //       }
  //     }
  //   }
  // }
}

export const useAscii = () => new p5(script)