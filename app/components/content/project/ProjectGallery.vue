<script setup lang="ts">
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
    <!-- TODO : test gsap flip -->
    <!-- <transition name="appear"> -->
      <ImageViewer v-if="imgView" :selected="imgView" :images="gallery" @unfocus="imgView = null" />
    <!-- </transition> -->
  </Teleport>
  <!-- <div class="tw-flex tw-flex-col xl:tw-w-2/3 xl:tw-ml-auto tw-gap-2 tw-pb-2"> -->
  <div class="tw-flex tw-flex-col tw-gap-2 tw-pb-4 xl:tw-col-start-5 xl:tw-col-end-11">
    <div class="gallery tw-flex tw-flex-col tw-gap-2 tw-grid-cols-1 xl:tw-grid xl:tw-grid-cols-2" v-if="$slots.default">
      <slot />
    </div>
    <ProjectNavigation class="!tw-grid xl:!tw-hidden" />
  </div>
</template>

<style lang="scss">
.gallery {
  &>:first-child {
    grid-column: span 2;
  }

  &>button:nth-last-child(-n+2):first-child,
  &>button:nth-last-child(-n+2):first-child~button {
    grid-column: span 2;
  }

  // &>button {
  //   grid-column: span 2;
  // }
}
</style>