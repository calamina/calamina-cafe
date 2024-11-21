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
const path = `${WEB}/${project}`

onMounted(() => document.scrollingElement!.scrollTop = 0)
</script>

<template>
  <div class="tw-w-full tw-relative">
    <ContentDoc :path class="tw-flex tw-flex-col xl:tw-flex-row">
      <template #not-found>
        <p>AEUGHHHHHHHHH what are you doing heerrreeee !</p>
      </template>
      </ContentDoc>
  </div>
</template>

<style lang="scss" scoped></style>