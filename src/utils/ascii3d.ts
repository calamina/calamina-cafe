import * as THREE from 'three/webgpu'
import { uv, vec2, texture, attribute, uniform, color, pow, mix, step, floor } from 'three/tsl'
import { Fn } from 'three/src/nodes/TSL.js';

// const highlight = window.getComputedStyle(document.body).getPropertyValue('--highlight');
// console.debug(highlight)
// Data
const pallete = [
  // highlight,
  '#484848',
  '#848484',
  '#b4b4b4',
  '#d0d0d0',
]

// const chars = " .:;!lH8@#"
const chars = " `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@"
const length = chars.length
const size = 5;
const aspect = 1;
let time = 0

// THREE Data
const asciiScene = new THREE.Scene()
const shapeScene = new THREE.Scene()

const camera = new THREE.OrthographicCamera(size * aspect / - 2, size * aspect / 2, size / 2, size / - 2, -10, 1000);
const camera2 = new THREE.OrthographicCamera(size * aspect / - 2, size * aspect / 2, size / 2, size / - 2, -10, 1000);

const object = new THREE.Mesh(
  new THREE.SphereGeometry(0.6, 2, 2),
  new THREE.MeshPhysicalMaterial({ color: 0xffffff })
)
shapeScene.add(object)
addLights(shapeScene)

const renderTarget = new THREE.RenderTarget(510, 510)
const renderer = new THREE.WebGPURenderer({ alpha: true })
renderer.setPixelRatio(1)
renderer.setSize(510, 510)
renderer.setClearColor(0xffffff, 0)

function onMouseMove(event: PointerEvent) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (event.clientY / window.innerHeight) * 2 - 1;

  const vector = new THREE.Vector3(mouse.x, - mouse.y, 0.2);
  draw(vector, 100)
}

function onDeviceRotate(event: DeviceOrientationEvent) {
  const position = new THREE.Vector2();
  position.x = event.gamma ?? 0
  position.y = event.beta ?? 0

  const vector = new THREE.Vector3(position.x, - position.y + 40, 0.01);
  draw(vector, 10)
}

function onWindowResize() {
  camera.updateProjectionMatrix()
  camera2.updateProjectionMatrix()
}

function draw(vector: THREE.Vector3, distance: number) {
  vector.unproject(camera2);

  const dir = vector.sub(camera2.position).normalize();
  const pos = camera2.position.clone().add(dir.multiplyScalar(distance));

  const posFixed = new THREE.Vector3(pos.x, -pos.y, pos.z)
  const object2 = object.clone()
  object2.userData = { time }
  shapeScene.add(object2)
  object.position.copy(posFixed)
}

function addObjects() {
  const rows = Math.floor(510 / 8)
  const cols = Math.floor(510 / 8)
  const instances = rows * cols
  const size = 0.135

  const material = asciiAndColorShader({
    asciiTexture: asciiTexture(),
    scene: renderTarget.texture
  })

  const geometry = new THREE.PlaneGeometry(size, size, 1, 1)
  const positions = new Float32Array(instances * 3)
  const uv = new Float32Array(instances * 2)
  const mesh = new THREE.InstancedMesh(geometry, material, instances)

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let index = (i * cols) + j;
      uv[index * 2] = i / (rows - 1)
      uv[index * 2 + 1] = j / (cols - 1)
      positions[index * 3] = i * size - (rows - 1) / 2 * size
      positions[index * 3 + 1] = j * size - (cols - 1) / 2 * size
      positions[index * 3 + 2] = 0
      let matrix = new THREE.Matrix4()
      matrix.setPosition(
        positions[index * 3],
        positions[index * 3 + 1],
        positions[index * 3 + 2]
      )
      mesh.setMatrixAt(index, matrix)
      index++
    }
  }

  mesh.instanceMatrix.needsUpdate = true
  geometry.setAttribute('pixelUv', new THREE.InstancedBufferAttribute(uv, 2))
  asciiScene.add(mesh)
}

function addLights(scene: THREE.Scene) {
  const light = new THREE.AmbientLight(0xffffff, 0.4)
  const light2 = new THREE.DirectionalLight(0xffffff, 1.5)

  scene.add(light)
  scene.add(light2)
  light2.position.set(1, 1, 0.866)
}

const asciiTexture = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = length * 64
  canvas.height = 64

  if (ctx) {
    ctx.fillStyle = "#fff"
    ctx.font = "60px Apercu"
    ctx.textAlign = "center"
    for (let i = 0; i < length; i++) {
      ctx.fillText(chars[i], 32 + i * 64, 48)
    }
  }

  const asciiTexture = new THREE.Texture(canvas)
  asciiTexture.needsUpdate = true
  return asciiTexture
}

function asciiAndColorShader({ asciiTexture, scene }: { asciiTexture: THREE.Texture; scene: THREE.Texture }) {
  const uColor1 = uniform(color(pallete[0]))
  const uColor2 = uniform(color(pallete[1]))
  const uColor3 = uniform(color(pallete[2]))
  const uColor4 = uniform(color(pallete[3]))
  const uColor5 = uniform(color(pallete[4]))

  const material = new THREE.NodeMaterial()
  material.transparent = true

  const asciiCode = Fn(() => {
    const textureColor = texture(scene, attribute('pixelUv'))
    const brigthness = pow(textureColor.r, 1.2)
    const asciiUv = vec2(
      uv().x.div(length).add(floor(brigthness.mul(length)).div(length)),
      uv().y
    )
    const asciiCode = texture(asciiTexture, asciiUv)

    let finalColor: any = uColor1
    finalColor = mix(finalColor, uColor2, step(0.1, brigthness))
    finalColor = mix(finalColor, uColor3, step(0.3, brigthness))
    finalColor = mix(finalColor, uColor4, step(0.6, brigthness))
    finalColor = mix(finalColor, uColor5, step(0.8, brigthness))

    return asciiCode.mul(finalColor)
  })

  material.colorNode = asciiCode()
  return material
}

function render() {
  time += 0.01

  const objectsToRemove = shapeScene?.children?.filter(
    child => time - child.userData?.time > 0.25)
  objectsToRemove.forEach(object => shapeScene.remove(object))

  const pow = 2
  object.rotation.x = Math.sin(time * pow)
  object.rotation.y = Math.sin(time * pow)
  object.rotation.z = Math.sin(time * pow)

  shapeScene.children.filter(child => child?.userData?.time).forEach(child => {
    child.rotation.x = Math.sin(time * pow)
    child.rotation.y = Math.sin(time * pow)
    child.rotation.z = Math.sin(time * pow)
  });

  requestAnimationFrame(render)

  renderer.setRenderTarget(renderTarget)
  renderer.renderAsync(shapeScene, camera2)

  renderer.setRenderTarget(null)
  renderer.renderAsync(asciiScene, camera)
}

function setDevice() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    window.addEventListener("deviceorientation", onDeviceRotate)
  } else {
    window.addEventListener("pointermove", onMouseMove)
  }
}

function init() {
  document.getElementById('container')?.appendChild(renderer.domElement);
  onresize = () => onWindowResize
  setDevice()
  addObjects()
  render()
  onWindowResize()
  renderer.clearAsync()
}

init();

onbeforeunload = () => {
  asciiScene.clear().remove()
  shapeScene.clear().remove()
  renderer?.dispose()
  if (renderer?.domElement) renderer.domElement.style.display = "none"
}
