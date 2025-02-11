<script setup lang="ts">
import * as THREE from 'three/webgpu'
import { uv, vec2, texture, attribute, uniform, color, pow, mix, step, floor } from 'three/tsl'
import { Fn } from 'three/src/nodes/TSL.js';

// let container: HTMLElement = document.querySelector('#container') as HTMLElement;

// Data
// const pallete = [
//   '#484848',
//   '#848484',
//   '#b4b4b4',
//   '#d0d0d0',
// ]
let pallete = [
  '#a7bee2',
  '#d6a7e2',
  '#e2a9a7',
  '#e2d8a7',
  '#a7e2be',
]
// const pallete = [
//   '#6c86ac',
//   '#a06cac',
//   '#ac6e6c',
//   '#aca26c',
//   '#6cac86',
// ]
// const chars = " .*o&8@#"
const chars = " `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@"
const length = chars.length
const size = 5;
const aspect = 1;
// const aspect = container?.clientWidth / container?.clientHeight;
// const aspect = document.innerWidth / document.innerHeight;
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
// const renderTarget = new THREE.RenderTarget(window.innerWidth, window.innerHeight)
const renderer = new THREE.WebGPURenderer({ alpha: true })
renderer.setPixelRatio(1)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
console.debug(window.devicePixelRatio)
renderer.setSize(510, 510)
// renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff, 0)

// function onWindowResize() {
//   // const newAspect = container?.clientWidth / container?.clientHeight;
//   // const newAspect = window.innerWidth / window.innerHeight;

//   camera.left = (size * newAspect) / -2;
//   camera.right = (size * newAspect) / 2;
//   camera.updateProjectionMatrix();

//   camera2.left = (size * newAspect) / -2;
//   camera2.right = (size * newAspect) / 2;
//   camera2.updateProjectionMatrix();

//   renderer.setSize(container?.clientWidth, container?.clientHeight)
//   // renderer.setSize(window.innerWidth, window.innerHeight)
// }

function onMouseMove(event: PointerEvent) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  const vector = new THREE.Vector3(mouse.x, mouse.y, 0.01);
  vector.unproject(camera2);

  const dir = vector.sub(camera2.position).normalize();
  const distance = 300;
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
  // const rows = Math.floor(window.innerWidth / 16)
  // const cols = Math.floor(window.innerHeight / 16)
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

  shapeScene.children = shapeScene.children.filter(child =>
    !child?.userData?.time || (time - child.userData?.time < 0.25)
  )

  const pow = 2
  object.rotation.x = Math.sin(time * pow)
  object.rotation.y = Math.sin(time * pow)
  object.rotation.z = Math.sin(time * pow)
  requestAnimationFrame(render)

  renderer.setRenderTarget(renderTarget)
  renderer.renderAsync(shapeScene, camera2)

  renderer.setRenderTarget(null)
  renderer.renderAsync(asciiScene, camera)
}

function init() {
  document.getElementById('container')?.appendChild(renderer.domElement);
  window.addEventListener("pointermove", onMouseMove)
  addObjects()
  render()
  // container = document.querySelector('#container') as HTMLElement
  // window.addEventListener("resize", onWindowResize)
}

// onMounted(() => init());
onMounted(() => {
  init()
  const links = document.querySelectorAll('a')
  links.forEach(link => {
    link.addEventListener("mouseover", () => {
      object.geometry.scale(1.4, 1.4, 1.4)
      setTimeout(() => {
        object.geometry.scale(1 / 1.4, 1 / 1.4, 1 / 1.4)
      }, 400);
    });
    // link.addEventListener("mouseout", () => {
    //   object.geometry.scale(1 / 1.4, 1 / 1.4, 1 / 1.4)
    // });
  })
});

onBeforeUnmount(() => {
  if (renderer?.domElement) renderer.domElement.style.display = "none"
  renderer?.dispose()
})
</script>

<template>
  <div class="ascii" id="container">
    <!-- todo :: state click play/pause ? and center rotate -->
    <div class="state tw-absolute tw-top-2 tw-left-2 tw-w-2 tw-h-2 tw-rounded-lg"></div>
  </div>
</template>

<style lang="scss" scoped>
.ascii {
  position: relative;
  border: 2px solid var(--bg-darker0);
  border-radius: 0.5rem;
  height: 80%;
  width: 30rem;
  height: 30rem;
  position: relative;
  z-index: -1;
}

.state {
  background-color: hsl(288, 50%, 77%);
}
</style>