import type { Click, Colors, FillOptions, Point } from "@models/Ascii";
import p5 from "p5";

export const useAsciiClick = (p5: p5) => {
  const click: Click = {
    position: { x: 0, y: 0 },
    INTERVAL: 20,
    timer: 0,
    ANIMATION_TIMER: 255,
    ANIMATION_DURATION: 28,
  }

  function clicked(point: Point) {
    click.ANIMATION_TIMER = 0
    click.position.x = p5.floor(point.x)
    click.position.y = p5.floor(point.y)
  }

  function clickAnimation(
    activecolor: p5.Color,
    draw: (options: FillOptions) => void
  ) {
    const threshold = click.ANIMATION_TIMER - 10
    if (threshold >= click.ANIMATION_DURATION) return

    const chars = "..:/|I::~+¤#@0+. .,:il|li:._ _.:*oO0Oo.:iI%Ii:."
    activecolor?.setAlpha(255 - click.ANIMATION_TIMER * 5)
    p5.fill(activecolor!)
    const min = threshold < 0 ? 0 : threshold

    draw({
      center: click.position,
      radius: click.ANIMATION_TIMER,
      min,
      chars
    })
  }

  function manageClickTimer() {
    if (p5.millis() - click.timer > click.INTERVAL) {
      click.ANIMATION_TIMER++
      click.timer = p5.millis();
    }
  }

  function manageClick(colors: Colors, fn: (options: FillOptions) => void) {
    manageClickTimer()
    clickAnimation(colors.active!, fn)
  }

  return {
    clicked,
    clickAnimation,
    manageClickTimer,
    manageClick,
  }
}