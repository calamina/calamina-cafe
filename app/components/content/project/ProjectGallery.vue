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
  <div class="gallery tw-grid tw-gap-4 tw-grid-cols-2 tw-max-w-6xl tw-w-full" v-if="$slots.default">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.gallery {
  &>:first-child {
    grid-column: span 2;
  } 
  // TODO : 1 col for small devices ?
}

</style>