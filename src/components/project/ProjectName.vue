<script setup lang="ts">
const { name } = defineProps<{
  name: string
}>()
</script>

<template>
  <h1 class="tw-capitalize tw-text-5xl">{{ name }}</h1>
</template>

<style lang="scss" scoped>
h1 {
  white-space: nowrap;
  letter-spacing: -3px;
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s, transform 0.3s;
}

@starting-style {
  h1 {
    opacity: 0;
    transform: translateX(-0.5rem)
  }
}
</style>