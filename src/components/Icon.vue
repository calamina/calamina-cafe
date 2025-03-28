<script setup lang='ts'>
const { icon, size = "18px", color = "var(--color)" } = defineProps<{
  icon: any
  size?: string
  color?: string
}>()
</script>

<template>
  <component class="icon" :is="icon"
    :style="{ 'height': size, 'width': size, 'min-width': size, 'color': color, 'stroke': color, 'fill': color }" />
</template>