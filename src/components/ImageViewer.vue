<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { onKeyStroke } from '@vueuse/core'
import ButtonBrackets from './ButtonBrackets.vue';
import TextBrackets from './TextBrackets.vue';
import IconEye from './Icons/IconEye.vue';
import IconEyeOff from './Icons/IconEyeOff.vue';
import IconArrowLeft from './Icons/IconArrowLeft.vue';
import IconHandClick from './Icons/IconHandClick.vue';
import IconArrowRight from './Icons/IconArrowRight.vue';
import Icon from './Icon.vue';

const { selected, images } = defineProps<{
  selected: HTMLImageElement | null
  images: HTMLImageElement[]
}>()
const emits = defineEmits(['unfocus'])

const image: Ref<HTMLImageElement | null> = ref(selected)
const imgSwipeTransition: Ref<string> = ref('slideToLeft');

onMounted(() => {
  document.documentElement.style.overflow = "hidden"
})

onKeyStroke('ArrowLeft', () => prevImg())
onKeyStroke('ArrowRight', () => nextImg())
onKeyStroke('Escape', () => exit())

function prevImg() {
  if (image.value) {
    imgSwipeTransition.value = "slideToLeft"
    image.value = images[images.indexOf(image.value) - 1] ?? images[images.length - 1] ?? ''
  }
}

function nextImg() {
  if (image.value) {
    imgSwipeTransition.value = "slideToRight"
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
        <TextBrackets>
          <Icon :icon="IconEye" size="1.25rem" />
          Fullscreen mode
        </TextBrackets>
        <TextBrackets>{{ images.indexOf(image) + 1 }} / {{ images.length }}</TextBrackets>
        <ButtonBrackets :type="'alert'" @click="exit()">
          close
          <Icon :icon="IconEyeOff" size="1.25rem" />
        </ButtonBrackets>
      </div>
      <Transition :name="imgSwipeTransition" mode="out-in">
        <img class="image lookout" @click="exit()" :src="image.src" :alt="image.alt" :key="image.src">
      </Transition>
      <div class="options">
        <ButtonBrackets :type="'classic'" @click="prevImg()" v-if="images.length > 1">
          <Icon :icon="IconArrowLeft" size="1.25rem" />
          previous
        </ButtonBrackets>
        <div class="tw-flex tw-gap-8">
          <TextBrackets>
            <Icon :icon="IconHandClick" size="1.25rem" />
            or Escape to exit
          </TextBrackets>
          <TextBrackets>
            <Icon :icon="IconArrowLeft" size="1.25rem" />
            <Icon :icon="IconArrowRight" size="1.25rem" />
            to navigate
          </TextBrackets>
        </div>
        <ButtonBrackets :type="'classic'" @click="nextImg()" v-if="images.length > 1">
          next
          <Icon :icon="IconArrowRight" size="1.25rem" />
        </ButtonBrackets>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--bg);
}

.imageView {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
  }

}

.image {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>