<script setup lang="ts">
import * as THREE from 'three/webgpu'
import { uv, vec2, texture, attribute, uniform, color, pow, mix, step, floor, vec3 } from 'three/tsl'
// import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Fn } from 'three/src/nodes/TSL.js';

const container = ref()
const ascii = ref(false)

const pallete = [
  '#dedede',
  '#16C47F',
  '#FFD65A',
  '#F93827',
  '#FF9D23',
  '#FFFFFF',
]
// const pallete = [
//   '#212121',
//   '#A35C7A',
//   '#C890A7',
//   '#FBF5E5',
//   '#FFFFFF',
// ]

// const chars = " *o&8@#"
const chars = " `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@"

const length = chars.length
let cube: THREE.Mesh | null = null

let time: number = 0
let isPlaying: boolean = true

let scene2: THREE.Scene | null = null
let meshtop: THREE.Mesh | null = null
let camera2: THREE.PerspectiveCamera | null = null
let renderTarget: THREE.RenderTarget | null = null
var mouse = new THREE.Vector2();

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.set(0, 0, 3.8)
// const camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 )
const renderer = new THREE.WebGPURenderer({
  // antialias: true,
  alpha: true
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff, 0)
// renderer.setClearColor(0x000000, 1)
// const controls = new OrbitControls(camera, renderer.domElement)

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  init()
}

function onMouseMove(event: MouseEvent) {
  if (!camera2) return
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject(camera2);
  var dir = vector.sub(camera2.position).normalize();
  var distance = - camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar(distance));
  cube?.position.copy(new THREE.Vector3(pos.x, -pos.y, pos.z));
}

function secondScene() {
  scene2 = new THREE.Scene()
  camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
  camera2.position.set(0, 0, 3.8)
  renderTarget = new THREE.RenderTarget(window.innerWidth, window.innerHeight)

  cube = new THREE.Mesh(
    // new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(1, 1),
    new THREE.MeshPhysicalMaterial({ color: 0xff88ff })
  )
  cube.position.set(0, 0, 0)
  cube.position.y = 1000;
  scene2.add(cube)

  addLights(scene2)
}

function addObjects() {
  const rows = Math.floor(window.innerWidth / 16)
  const cols = Math.floor(window.innerHeight / 16)
  const instances = rows * cols
  const size = 0.1

  const material = getMaterial({
    asciiTexture: createAsciiTexture(),
    length,
    scene: renderTarget?.texture
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

  scene.add(mesh)
}

function addLights(scene: THREE.Scene) {
  const light = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(light)

  const light2 = new THREE.DirectionalLight(0xffffff, 1.2)
  light2.position.set(1, 1, 0.866)
  scene.add(light2)
}

function getMaterial({
  asciiTexture,
  length,
  scene
}: {
  asciiTexture: THREE.Texture;
  length: number;
  scene: THREE.Texture | undefined
}) {
  const uColor1 = uniform(color(pallete[0]))
  const uColor2 = uniform(color(pallete[1]))
  const uColor3 = uniform(color(pallete[2]))
  const uColor4 = uniform(color(pallete[3]))
  const uColor5 = uniform(color(pallete[4]))

  const material = new THREE.NodeMaterial()

  const asciiCode = Fn(() => {
    if (!scene) return
    const textureColor = texture(scene, attribute('pixelUv'))

    const brigthness = pow(textureColor.r, 1.2)

    const asciiUv = vec2(
      uv().x.div(length).add(floor(brigthness.mul(length)).div(length)),
      uv().y
    )
    const asciiCode = texture(asciiTexture, asciiUv)

    let finalColor: any = uColor1
    finalColor = mix(finalColor, uColor2, step(0.2, brigthness))
    finalColor = mix(finalColor, uColor3, step(0.35, brigthness))
    finalColor = mix(finalColor, uColor4, step(0.7, brigthness))
    finalColor = mix(finalColor, uColor5, step(0.9, brigthness))

    return asciiCode.mul(finalColor)
  })

  material.colorNode = asciiCode()
  return material
}

function createAsciiTexture() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = length * 48
  canvas.height = 48
  // canvas.style.backgroundColor = "rgba(0, 0, 0, 0)"

  if (ctx) {
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#000000"
    ctx.font = "bold 40px Apercu"
    ctx.textAlign = "center"
    // ctx.textBaseline = "middle"

    for (let i = 0; i < length; i++) {
      ctx.fillText(chars[i], 16 + i * 48, 32)
    }
  }

  const asciiTexture = new THREE.Texture(canvas)
  asciiTexture.needsUpdate = true
  return asciiTexture
}

function stop() {
  isPlaying = false
  console.debug("paused")
}

function play() {
  console.debug("playin")
  if (!isPlaying) {
    isPlaying = true
    render()
  }
}

function render() {
  if (!isPlaying) return

  time += 0.01
  if (cube) {
    cube.rotation.x = Math.sin(time)
    cube.rotation.y = Math.sin(time)
    cube.rotation.z = Math.sin(time)
  }

  requestAnimationFrame(render)
  if (renderTarget && scene2 && camera2) {
    renderer.setRenderTarget(renderTarget)
    renderer.renderAsync(scene2, camera2)
  }

  renderer.setRenderTarget(null)
  renderer.renderAsync(scene, camera)
}


function init() {
  container.value.appendChild(renderer.domElement);
  secondScene()
  addObjects()
  window.addEventListener("resize", onWindowResize)
  window.addEventListener("mousemove", onMouseMove, false)
  render()
}

function toggleAscii() {
  ascii.value = !ascii.value
  if (ascii.value) {
    setTimeout(() => init(), 200)
  }
}

onMounted(() => {
  init()
});
</script>

<template>
  <div>
    <div class="ascii" v-if="ascii" ref="container"></div>
    <div class="buttons">
      <button v-if="ascii" @click="isPlaying ? stop() : play()">PLAY / PAUSE</button>
      <button @click="toggleAscii">{{ ascii ? 'HIDE ASCII' : 'SHOW ASCII' }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ascii {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw);
  height: calc(100vh);
  z-index: -1;
}

.buttons {
  height: 4rem;
  position: fixed;
  top: calc(100vh - 4rem);
  left: 1rem;
  display: flex;
  gap: 2rem;
  z-index: 999;
}

button {
  z-index: 999;
  background-color: #dedede;
}
</style>