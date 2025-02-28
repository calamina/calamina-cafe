<script setup lang="ts">
const { name } = defineProps<{
  name: string
}>()
</script>

<template>
  <h1>{{ name }}</h1>
</template>

<style lang="scss" scoped>
h1 {
  text-transform: capitalize;
  font-size: 3rem;
  line-height: 3rem;
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