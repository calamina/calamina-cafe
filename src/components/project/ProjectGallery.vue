<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import ImageViewer from '../ImageViewer.vue';

const { type } = defineProps<{
  type: "phone" | "web"
}>()

const imgView: Ref<HTMLImageElement | null> = ref(null)
const gallery: Ref<HTMLImageElement[]> = ref([])
const buttons: Ref<HTMLButtonElement[]> = ref([])

onMounted(() => {
  buttons.value = Array.from(document.querySelector('.gallery')?.querySelectorAll('button') ?? [])
  buttons.value.forEach(button => {
    button.addEventListener('click', (e: MouseEvent) => {
      const imgEvent = (e.target instanceof HTMLButtonElement ? e.target.children[0] : e.target) as HTMLImageElement | null
      focusImage(imgEvent)
    })
  });
  gallery.value = Array.from(document.querySelector('.gallery')?.querySelectorAll('img') ?? [])
})

function focusImage(e: HTMLImageElement | null) {
  imgView.value = e
}
</script>

<template>
  <Teleport to="body">
    <ImageViewer v-if="imgView" :selected="imgView" :images="gallery" @unfocus="imgView = null" />
  </Teleport>
  <div class="wrapper">
    <div class="gallery" :class="{ 'mobile': type === 'phone' }">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  width: 100%;
  padding-bottom: 0.5rem;
  grid-column-start: 5;
  grid-column-end: 11;
}

.gallery {
  display: grid;
  gap: 0.5rem;
  padding-top: 0;
  // grid-template-columns: minmax(0px, 1fr);
  grid-template-columns: repeat(2, minmax(0px, 1fr));

  // &:not(.mobile) *>:first-child {
  & *>:first-child {
    grid-column: span 2;
  }

  // TODO:: fix second element not taking full space
  & *>button:nth-last-child(-n+2):first-child,
  & *>button:nth-last-child(-n+2):first-child~button {
    grid-column: span 2;
  }
}

@media (max-width: 1280px) {
  .wrapper {
    padding-bottom: 0;
  }

  .gallery {
    display: flex;
    flex-flow: column;
    padding-top: 0rem;
  }
}
</style>