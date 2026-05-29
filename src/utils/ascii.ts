import type { Colors, MemoryPoint, Point } from "@models/Ascii";
import p5 from "p5";
import apercu from "../assets/fonts/ApercuMonoPro-Medium.woff2";
import { useAsciiClick } from "./ascii-click";
import { useAsciiGem } from "./ascii-gem";
import { useAsciiUtils } from "./ascii-utils";

let isMobile = 'ontouchstart' in document.documentElement;
let SIZE = 22;
let timer = 0;
let interval = 250
const active: Point = { x: 0, y: 0 }
const history: MemoryPoint[] = []
let colors: Colors = { active: null, discrete: null }
let length = 0

const script = (p5: p5) => {
  const container = document.querySelector("#container")
  if (!container) return

  const { setGemPosition, manageGem, updateGemPosition } = useAsciiGem(p5, SIZE);
  const { clicked, manageClick } = useAsciiClick(p5)
  const { drawSquare, fillCircle, large, small, setColors } = useAsciiUtils(p5, SIZE)

  p5.setup = async () => setup(container);

  p5.draw = () => {
    p5.frameRate(120);
    p5.noStroke();
    p5.clear();

    manageHistory()
    manageActive()
    manageClick(colors, fillCircle)

    const gotGem = manageGem(active, colors)
    if (gotGem) length++
  };

  p5.windowResized = () => {
    setGemPosition()
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
    isMobile = window.innerWidth < 600
  }

  p5.mousePressed = () => clicked(active)

  async function setup(container: Element) {
    colors = setColors()
    ManageThemeSwitch()
    setGemPosition()
    if (isMobile) length++
    // else cursor is invisible on mobile

    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent(container);
    p5.background(p5.color("#e1dede"));

    const font = await p5.loadFont(apercu);
    p5.textSize(SIZE - 2)
    p5.textFont(font);
    p5.textAlign(p5.CENTER, p5.CENTER);

    p5.setMoveThreshold(1)
    // better movement detection ratio 
  }

  function ManageThemeSwitch() {
    const buttons = document.querySelectorAll("button[data-theme]");
    buttons.forEach(button => button.addEventListener("click", () => colors = setColors()));
  }

  function manageActive() {
    setActive()
    drawActive()
  }

  function setActive() {
    if (!isMobile) {
      active.x = p5.floor(p5.mouseX / SIZE)
      active.y = p5.floor(p5.mouseY / SIZE)
    } else {
      active.y = p5.floor((p5.rotationX) * SIZE + (window.innerWidth / SIZE / 4));
      active.x = p5.floor((p5.rotationY) * SIZE + (window.innerHeight / SIZE / 4));
    }
  }

  function drawActive() {
    if (length > 0) {
      colors.active?.setAlpha(255);
      p5.fill(colors.active!)
      if (length === 1) drawSquare(active)
      if (length === 2) small(active)
      if (length > 2) large(active)
    }
  }

  function manageHistoryTimer() {
    if (p5.millis() - timer > interval) {
      p5.fill(colors.discrete!)
      history.forEach(moment => moment.age++)
      timer = p5.millis();
      updateGemPosition()
    }
  }

  function updateHistory() {
    if (length > 3) history.push({ x: active.x, y: active.y, age: 1 })

    history.forEach(point => {
      const age = point.age
      colors.active?.setAlpha(255 / age / 1.5);
      p5.fill(colors.active!)
      if (age > 2) drawSquare(point)
      if (age > 1) small(point)
      else large(point)
    })
  }

  function drawHistory() {
    const mouseMoved = p5.movedX || p5.movedY
    if (history.length > length || (!mouseMoved && !isMobile)) history.shift()
  }

  function manageHistory() {
    manageHistoryTimer()
    drawHistory()
    updateHistory()
  }
}

export const useAscii = () => new p5(script)