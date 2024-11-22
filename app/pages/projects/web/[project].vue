<script setup lang="ts">
definePageMeta({
  middleware: 'routing',
  pageTransition: {
    name: 'appear',
    mode: 'out-in',
  }
})
// definePageMeta({
//   pageTransition: transitionConfig,
// });

const { project } = useRoute().params
const path = `/${WEB}/${project}`
const { data } = await useAsyncData(path, () => queryContent(path).findOne())

if (!data.value) {
  throw createError({
    statusCode: 404, message: 'Page not found'
  })
}

onMounted(() => document.scrollingElement!.scrollTop = 0)
</script>

<template>
  <div class="tw-w-full tw-relative">
    <ContentRenderer v-if="data" :value="data" />
  </div>
</template>

<style lang="scss" scoped></style>