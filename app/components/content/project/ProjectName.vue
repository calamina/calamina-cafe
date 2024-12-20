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
  }
</style>