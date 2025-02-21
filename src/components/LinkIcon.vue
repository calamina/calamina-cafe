<script setup lang="ts">
const { url, label } = defineProps<{
  url: string
  label?: string
  icon?: string
}>()
</script>

<template>
  <a class="tw-flex tw-content-center tw-rounded-lg tw-items-center tw-w-fit tw-px-3 tw-pt-1 tw-pb-[0.15rem]"
     :href="url" target="_blank">
    {{ label ?? 'visit' }}
    <Icon :name="icon ?? 'tabler:link'" />
  </a>
</template>

<style lang="scss" scoped>
a {
  background-color: var(--bg-darker0);
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s 0.05s, transform 0.3s 0.05s;

  &:hover {
    background-color: var(--highlight);
  }
}

.dark-mode a:hover {
  background-color: var(--bg-darker0);
  color: var(--highlight);
}

@starting-style {
  a {
    opacity: 0;
    transform: translateX(-0.5rem)
  }
}
</style>