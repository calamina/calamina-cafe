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
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s 0.05s, transform 0.3s 0.05s;
}

@starting-style {
  .project-link {
    opacity: 0;
    transform: translateX(-0.5rem)
  }
}
</style>