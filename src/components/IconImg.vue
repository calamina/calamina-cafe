<script setup lang="ts">
const { name } = defineProps < {
    name: string
} > ()

const src = `https://api.iconify.design/${name}.svg`
</script>

<template>
    <img :src />
</template>

<style>
img {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--color);
}
</style>