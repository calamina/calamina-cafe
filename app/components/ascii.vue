<script setup lang="ts">
import * as THREE from 'three/webgpu'
import { float, uv, vec2, vec3, vec4, texture, attribute, uniform, color, pow, mix, step, floor } from 'three/tsl'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Fn } from 'three/src/nodes/TSL.js';
import img from '../public/img/ascii/photo-1595390524211-e94e83d1ce64.jpg'

let time = 0

const pallete = [
  '#212121',
  '#A35C7A',
  '#C890A7',
  '#FBF5E5',
  '#FFFFFF',
]

const chars = "*o&8@#"
// const chars = "`.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@"
const length = chars.length


const container = ref()
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.set(0, 0, 4)

const renderer = new THREE.WebGPURenderer()
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 1)

const controls = new OrbitControls(camera, renderer.domElement)


const scene2 = new THREE.Scene()
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera2.position.set(0, 0, 4)
const renderTarget = new THREE.RenderTarget(window.innerWidth, window.innerHeight)

const meshtop = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshPhysicalMaterial({ color: 0xffffff })
)
meshtop.position.set(0.5, 0.5, 0.5)
meshtop.rotation.set(25, 45, 1.1)
meshtop.rotation.x = 1.5
console.debug(renderTarget, renderer, scene)
scene2.add(meshtop)
addLights(scene2)


function addObjects() {
  const rows = 120
  const cols = Math.floor(rows / camera2.aspect)
  const instances = rows * cols
  const size = 0.1

  // const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
  const material = getMaterial({
    asciiTexture: createAsciiTexture(),
    length,
    scene: renderTarget.textures[0]
    // scene: renderTarget.texture
  })
  const geometry = new THREE.PlaneGeometry(size, size, 1, 1)

  const positions = new Float32Array(instances * 3)
  // const colors = new Float32Array(instances * 3)
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

  const light2 = new THREE.DirectionalLight(0xffffff, 0.5)
  light2.position.set(0.5, 0.5, 0.866)
  scene.add(light)
}

function getMaterial({ asciiTexture, length, scene }: { asciiTexture: THREE.Texture; length: number; scene: THREE.Texture }) {
  const uColor1 = uniform(color(pallete[0]))
  const uColor2 = uniform(color(pallete[1]))
  const uColor3 = uniform(color(pallete[2]))
  const uColor4 = uniform(color(pallete[3]))
  const uColor5 = uniform(color(pallete[4]))

  const material = new THREE.NodeMaterial()
  const text = new THREE.TextureLoader().load(img)

  const asciiCode = Fn(() => {
    // const textureColor = texture(scene, attribute('pixelUv'))
    const textureColor = texture(scene, attribute('pixelUv'))

    const brigthness = pow(textureColor.r, 1.6)

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

function createAsciiTexture() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = length * 64
  canvas.height = 64

  if (ctx) {
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 40px Apercu"
    ctx.textAlign = "center"
    // ctx.textBaseline = "middle"

    for (let i = 0; i < length; i++) {
      ctx.fillText(chars[i], 32 + i * 64, 46)
    }
  }

  const asciiTexture = new THREE.Texture(canvas)
  asciiTexture.needsUpdate = true
  return asciiTexture
}

function animate() {
  time += 0.01
  meshtop.rotation.x = Math.sin(time * meshtop.position.x)
  meshtop.rotation.y = Math.sin(time * meshtop.position.y)
  meshtop.rotation.z = Math.sin(time * meshtop.position.z)

  renderer.setRenderTarget(renderTarget)
  requestAnimationFrame(animate)
  renderer.renderAsync(scene2, camera2)
  renderer.setRenderTarget(null)
  renderer.renderAsync(scene, camera)
  // renderer.render(scene, camera)
}

onMounted(() => {
  container.value.appendChild(renderer.domElement);
  // addLights()
  console.debug(renderTarget)
  addObjects()
  animate()
});
</script>

<template>
  <div ref="container"></div>
</template>

<style lang="scss" scoped>
div {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100vw - 1rem);
  height: calc(100% - 1rem);
}
</style>