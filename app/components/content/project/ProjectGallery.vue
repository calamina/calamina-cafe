<script setup lang="ts">
const imgView: Ref<HTMLImageElement | null> = ref(null)
const gallery: Ref<HTMLImageElement[]> = ref([])
const buttons: Ref<HTMLButtonElement[]> = ref([])

onMounted(() => {
  buttons.value = Array.from(document.querySelector('.gallery')?.querySelectorAll('button') ?? [])
  buttons.value.forEach(button => {
    button.addEventListener('click', (e: MouseEvent) => focusImage(e))
  });
  gallery.value = Array.from(document.querySelector('.gallery')?.querySelectorAll('img') ?? [])
})

function focusImage(e: MouseEvent) {
  imgView.value = e.target as HTMLImageElement
}
</script>

<template>
  <Teleport to="body">
    <transition name="appear">
      <ImageViewer v-if="imgView" :selected="imgView" :images="gallery" @unfocus="imgView = null" />
    </transition>
  </Teleport>
  <div class="tw-flex tw-flex-col xl:tw-w-2/3 xl:tw-ml-auto tw-gap-2 tw-pb-6">
    <div class="gallery tw-grid tw-gap-2 tw-grid-cols-2" v-if="$slots.default">
      <slot />
    </div>
    <ProjectNavigation />
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