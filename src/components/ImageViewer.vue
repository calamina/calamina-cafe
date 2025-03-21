<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { onKeyStroke } from '@vueuse/core'
import IconEyeOff from './Icons/IconEyeOff.vue';
import IconArrowLeft from './Icons/IconArrowLeft.vue';
import IconArrowRight from './Icons/IconArrowRight.vue';
import Icon from './Icon.vue';

const { selected, images } = defineProps<{
  selected: HTMLImageElement | null
  images: HTMLImageElement[]
}>()
const emits = defineEmits(['unfocus'])

const image: Ref<HTMLImageElement | null> = ref(selected)

onMounted(() => {
  document.documentElement.style.overflow = "hidden"
})

onKeyStroke('ArrowLeft', () => prevImg())
onKeyStroke('ArrowRight', () => nextImg())
onKeyStroke('Escape', () => exit())

function prevImg() {
  if (image.value) {
    image.value = images[images.indexOf(image.value) - 1] ?? images[images.length - 1] ?? ''
  }
}

function nextImg() {
  if (image.value) {
    image.value = images[images.indexOf(image.value) + 1] ?? images[0] ?? ''
  }
}

function exit() {
  document.documentElement.style.overflow = "visible"
  emits('unfocus')
}
</script>

<template>
  <div v-if="image" class="overlay">
    <div class="imageView">
      <div class="options">
        <div class="actions">
          <button @click="prevImg()" v-if="images.length > 1">
            <Icon :icon="IconArrowLeft" size="1.25rem" />
          </button>
          <button @click="nextImg()" v-if="images.length > 1">
            <Icon :icon="IconArrowRight" size="1.25rem" />
          </button>
        </div>
        <button @click="exit()">
          <Icon :icon="IconEyeOff" size="1.25rem" />
        </button>
      </div>
      <img class="image" :src="image.src" :alt="image.alt" :key="image.src">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: var(--bg-darker);
  padding: 0.5rem;
}

.imageView {
  background-color: var(--bg);
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.options {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  padding: 1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.image {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

button {
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--bg-darker0);
}
</style>