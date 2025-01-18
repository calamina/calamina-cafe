<script setup lang="ts">
import * as THREE from 'three/webgpu'
import { uv, vec2, texture, attribute, uniform, color, pow, mix, step, floor, vec3 } from 'three/tsl'
import { Fn } from 'three/src/nodes/TSL.js';

const container = ref()
const ascii = ref(true)

// const pallete = [
//   '#16C47F',
//   '#FFD65A',
//   '#F93827',
//   '#FF9D23',
//   // '#FFFFFF',
// ]
const pallete = [
  '#242424',
  '#545454',
  '#848484',
  '#b4b4b4',
]

// const chars = " *o&8@#"
const chars = " `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@"
const length = chars.length

let object: THREE.Mesh | null = null

let time: number = 0
let isPlaying: boolean = true

let scene2: THREE.Scene | null = null
let camera2: THREE.OrthographicCamera | null = null
// let camera2: THREE.PerspectiveCamera | null = null
let renderTarget: THREE.RenderTarget | null = null
const size = 5;
const aspect = window.innerWidth / window.innerHeight;
var mouse = new THREE.Vector2();

const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
// camera.position.set(0, 0, 3.8)


const camera = new THREE.OrthographicCamera(size * aspect / - 2, size * aspect / 2, size / 2, size / - 2, -1000, 1000);

const renderer = new THREE.WebGPURenderer({
  // antialias: true,
  alpha: true
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff, 0)

function onWindowResize() {
  const newAspect = window.innerWidth / window.innerHeight;

  camera.left = (size * newAspect) / -2;
  camera.right = (size * newAspect) / 2;
  camera2!.left = (size * newAspect) / -2;
  camera2!.right = (size * newAspect) / 2;

  camera.updateProjectionMatrix();
  camera2?.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function onMouseMove(event: PointerEvent) {
  event.preventDefault();
  if (!camera2) return

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.01);
  vector.unproject(camera2);
  var dir = vector.sub(camera2.position).normalize();
  // var distance = - camera2.position.z / dir.z;
  var distance = 350;
  var pos = camera2.position.clone().add(dir.multiplyScalar(distance));
  const posFixed = new THREE.Vector3(pos.x, -pos.y, pos.z)
  object?.position.copy(posFixed);
  // object?.position.copy(pos);
}

function secondScene() {
  scene2 = new THREE.Scene()
  // camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
  camera2 = new THREE.OrthographicCamera(size * aspect / - 2, size * aspect / 2, size / 2, size / - 2, 0.1, 1000);
  camera2.position.set(0, 0, 1)

  renderTarget = new THREE.RenderTarget(window.innerWidth, window.innerHeight)

  object = new THREE.Mesh(
    new THREE.SphereGeometry(1, 2, 2),
    new THREE.MeshPhysicalMaterial({ color: 0xff88ff })
  )
  object.position.set(0, 0, 0)
  scene2.add(object)

  addLights(scene2)
}

function addObjects() {
  const rows = Math.floor(window.innerWidth / 16)
  const cols = Math.floor(window.innerHeight / 16)
  const instances = rows * cols
  const size = 0.135

  const material = asciiAndColorShader({
    asciiTexture: createAsciiTexture(),
    scene: renderTarget?.texture
  })

  // const geometry = new THREE.PlaneGeometry(0.1, 0.1, 1, 1)
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

function createAsciiTexture() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = length * 64
  canvas.height = 64

  if (ctx) {
    // ctx.fillStyle = "#c5c5c5"
    // ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.globalAlpha = 0.5
    ctx.fillStyle = "#fff"
    // ctx.font = "40px Apercu"
    ctx.font = "bold 40px Apercu"
    ctx.textAlign = "center"
    ctx.textRendering = "optimizeLegibility"

    for (let i = 0; i < length; i++) {
      ctx.fillText(chars[i], 32 + i * 64, 48)
    }
  }

  const asciiTexture = new THREE.Texture(canvas)
  asciiTexture.needsUpdate = true
  return asciiTexture
}

function asciiAndColorShader({
  asciiTexture,
  scene
}: {
  asciiTexture: THREE.Texture;
  scene: THREE.Texture | undefined
}) {
  const uColor1 = uniform(color(pallete[0]))
  const uColor2 = uniform(color(pallete[1]))
  const uColor3 = uniform(color(pallete[2]))
  const uColor4 = uniform(color(pallete[3]))
  const uColor5 = uniform(color(pallete[4]))

  const material = new THREE.NodeMaterial()
  material.transparent = true

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
    finalColor = mix(finalColor, uColor3, step(0.4, brigthness))
    finalColor = mix(finalColor, uColor4, step(0.6, brigthness))
    finalColor = mix(finalColor, uColor5, step(0.8, brigthness))

    return asciiCode.mul(finalColor)
  })

  material.colorNode = asciiCode()
  return material
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

  if (object) {
    const pow = 3
    object.rotation.x = Math.sin(time * pow)
    object.rotation.y = Math.sin(time * pow)
    object.rotation.z = Math.sin(time * pow)
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
  container?.value?.appendChild(renderer.domElement);
  secondScene()
  addObjects()
  window.addEventListener("resize", onWindowResize)
  window.addEventListener("pointermove", onMouseMove)
  render()
  window.addEventListener("pointerover", onMouseMove, { once: true })
}

function toggleAscii() {
  ascii.value = !ascii.value
  if (ascii.value) {
    setTimeout(() => init(), 200)
  }
}

onMounted(() => {
  setTimeout(() => init(), 200)
});

onUnmounted(() => {
  renderer.dispose()
})
</script>

<template>
  <div>
    <div class="ascii" v-if="ascii" ref="container" id="container"></div>
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
  position: fixed;
  top: calc(100vh - 4rem);
  left: 1rem;
  display: flex;
  gap: 2rem;
  z-index: 999;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  z-index: 999;
  background-color: #dedede;
}
</style>