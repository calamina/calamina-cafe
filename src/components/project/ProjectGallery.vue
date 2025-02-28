<script setup lang="ts">
import { onMounted, ref, Teleport, type Ref } from 'vue'
import ImageViewer from '../ImageViewer.vue';

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
    <div class="gallery">
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
}

.gallery {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  padding-top: 2rem;

  & *>:first-child {
    grid-column: span 2;
  }

  & *>button:nth-last-child(-n+2):first-child,
  & *>button:nth-last-child(-n+2):first-child~button {
    grid-column: span 2;
  }

}

@media (min-width: 1280px) {
  .wrapper {
    //  xl:tw-pb-2 xl:tw-col-start-5 xl:tw-col-end-11
    padding-bottom: 0.5rem;
    grid-column-start: 5;
    grid-column-end: 11;
  }

  .gallery {
    // xl:tw-pt-0 xl:tw-grid xl:tw-grid-cols-2
    padding-top: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
}
</style>