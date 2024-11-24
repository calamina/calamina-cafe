<script setup lang="ts">
definePageMeta({
  middleware: 'routing',
  pageTransition: transitionConfig,
})
// definePageMeta({
// pageTransition: {
//   name: 'appear',
//   mode: 'out-in',
// }
// });

const { project } = useRoute().params
const path = `/${PHONE}/${project}`
const { data } = await useAsyncData(path, () => queryContent(path).findOne())

onMounted(() => document.scrollingElement!.scrollTop = 0)
</script>

<template>
  <div class="tw-w-full tw-relative">
    <ContentRenderer v-if="data" :value="data" />
  </div>
</template>

<style lang="scss" scoped></style>