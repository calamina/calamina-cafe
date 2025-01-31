<script setup lang="ts">
// definePageMeta({
//   middleware: 'routing',
//   pageTransition: transitionConfig,
// })

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryCollection(WEB).path(route.path).first())

if (!page) {
  throw createError({
    statusCode: 404, message: 'Page not found'
  })
}

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})
</script>

<template>
  <div :key="route.fullPath" class="tw-w-full tw-gap-2 tw-flex tw-flex-col">
    <ContentRenderer v-if="page" :key="route.fullPath" :value="page"
      class="xl:tw-grid xl:tw-grid-cols-10 xl:tw-gap-4" />
    <ProjectNavigation v-if="page" :key="route.fullPath" class=" xl:tw-fixed xl:tw-left-2 xl:tw-pr-2 xl:tw-bottom-0 xl:tw-w-2/5" />
  </div>
</template>

<style lang="scss" scoped></style>