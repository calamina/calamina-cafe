<script setup lang="ts">
const { url } = defineProps<{
  url: string
}>()
</script>

<template>
  <a class="project-link tw-flex tw-content-center tw-rounded-lg tw-items-center tw-w-fit tw-px-3 tw-py-1"
    :href="url" target="_blank">
    visit
    <Icon name="tabler:link" />
  </a>
</template>

<style lang="scss" scoped>
.project-link {
  background-color: var(--bg-darker);
}
</style>