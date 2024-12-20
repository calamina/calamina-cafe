<script setup lang="ts">
definePageMeta({
  middleware: 'routing',
  pageTransition: transitionConfig,
 })

const { project } = useRoute().params
const path = `/${WEB}/${project}`
const { data } = await useAsyncData(path, () => queryContent(path).findOne())

if (!data.value) {
  throw createError({
    statusCode: 404, message: 'Page not found'
  })
}
</script>

<template>
  <div class="tw-w-full">
    <ContentRenderer v-if="data" :value="data" class="xl:tw-grid xl:tw-grid-cols-10 xl:tw-gap-4"/>
  </div>
</template>

<style lang="scss" scoped></style>