<script setup lang="ts">
const { url, label } = defineProps<{
  url: string
  label?: string
  icon?: string
}>()
</script>

<template>
  <a class="project-link tw-flex tw-content-center tw-rounded-lg tw-items-center tw-w-fit tw-px-3 tw-py-1"
     :href="url" target="_blank">
    {{ label ?? 'visit' }}
    <Icon :name="icon ?? 'tabler:link'" />
  </a>
</template>

<style lang="scss" scoped>
.project-link {
  background-color: var(--bg-darker0);
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s 0.05s, transform 0.3s 0.05s;

  &:hover {
    background-color: var(--highlight);
  }
}

.dark-mode .project-link:hover {
  background-color: var(--bg-darker0);
  color: var(--highlight);
}

@starting-style {
  .project-link {
    opacity: 0;
    transform: translateX(-0.5rem)
  }
}
</style>