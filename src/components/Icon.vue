<script setup lang='ts'>
import type { fill } from 'three/src/extras/TextureUtils.js';
import type { Component } from 'vue';

const { icon, size = "18px", color = "var(--color)" } = defineProps<{
  icon: Component | string | any
  size?: string
  color?: string
}>()
</script>


<template>
  <component class="icon" :is="icon"
    :style="{ 'height': size, 'width': size, 'color': color, 'stroke': color, 'fill': color }" />
</template>

<style scoped lang='scss'>
.icon {
  width: vbind(size);
  height: vbind(size);
  fill: var(--color);
  stroke: var(--color);
}
</style>