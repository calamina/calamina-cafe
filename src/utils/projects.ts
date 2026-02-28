import p5 from "p5";

interface Position { x: number, y: number }

const container = document.querySelector("#projects")
const SIZE = 200;
let SIZE_X = 0;
let SIZE_Y = 0;
let MARGIN_X = 0;
let MARGIN_Y = 0;
let CENTER_X = (SIZE - 158) / 2;
let CENTER_Y = (SIZE - 185) / 2;


const script = (p5: p5) => {
  if (!container) return
  p5.setup = async () => {
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent(container);
    p5.textSize(22)
    p5.background(p5.color("#e1dede"));
    setSizeAndMargin()
    setProjects()
  };

  const setProjects = () => {
    const projects = p5.selectAll(".project")
    const positions: Position[] = []
    projects.forEach((project) => {
      const { x, y } = setCoords(positions);
      project.position(x + MARGIN_X + CENTER_X, y + MARGIN_Y + CENTER_Y)
    })
  }

  const setSizeAndMargin = () => {
    SIZE_X = p5.floor(container.clientWidth / SIZE)
    SIZE_Y = p5.floor(container.clientHeight / SIZE)

    MARGIN_X = (container.clientWidth - SIZE_X * SIZE) / 2
    MARGIN_Y = (container.clientHeight - SIZE_Y * SIZE) / 2
  }

  const setCoords = (positions: Position[]) => {
    const x = p5.floor(p5.random(0, SIZE_X))
    const y = p5.floor(p5.random(0, SIZE_Y))
    if (positions.find(position => position.x === x && position.y === y)) {
      return setCoords(positions)
    } else {
      positions.push({ x, y })
      return { x: x * SIZE, y: y * SIZE }
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(container.clientWidth, container.clientHeight)
    setSizeAndMargin()
    setProjects()
  }
}

export const useProjects = () => new p5(script)