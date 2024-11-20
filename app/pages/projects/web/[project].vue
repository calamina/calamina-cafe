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
const path = `web/${project}`

onMounted(() => document.scrollingElement!.scrollTop = 0)
</script>

<template>
  <div class="tw-w-full tw-relative">
    <ContentDoc :path class="mdcontent">
      <template #not-found>
      </template>
      </ContentDoc>
  </div>
</template>

<style lang="scss">
.mdcontent {
  display: flex;
  // flex-flow: column;
  // align-items: center;
  // gap: 3rem;
  // padding: 3rem 0 0 0;
}
</style>