<script setup lang="ts">
import type { StyleValue } from 'vue';

const { color, pad0 } = defineProps<{
    color?: string
    pad0?: boolean
}>()

const style: StyleValue = {}
if (color) style.backgroundColor = color
if (pad0) style.paddingBottom = 0
if (pad0) style.paddingTop = "0.05rem"
</script>

<template>
    <p class="tag" :style>
        <slot></slot>
    </p>
</template>

<style scoped>
.tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    padding: 0.25rem 0.5rem 0.1rem;
    border-radius: 0.5rem;
    color: var(--color-hover);
    background-color: var(--bg-darker0);
}
</style>