<script setup lang="ts">
definePageMeta({ pageTransition: { name: 'fade', mode: 'out-in' } })
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryCollection(PHONE).path(route.path).first())

if (!page) {
  throw createError({
    statusCode: 404, message: 'Page not found'
  })
}

useSeoMeta({
  title: 'calamina ~ ' + page.value?.title,
  description: page.value?.description
})
</script>

<template>
  <div class="tw-w-full tw-gap-2 tw-flex tw-flex-col">
    <ContentRenderer v-if="page" :value="page" class="xl:tw-grid xl:tw-grid-cols-10 xl:tw-gap-4" />
    <ClientOnly>
      <ProjectNavigation v-if="page" class=" xl:tw-fixed xl:tw-left-2 xl:tw-pr-2 xl:tw-bottom-0 xl:tw-w-2/5" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped></style>