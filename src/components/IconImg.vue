<script setup lang="ts">
const { name, disabled } = defineProps<{
    name: string
    disabled?: boolean
}>()

const src = `https://api.iconify.design/${name}.svg`
</script>

<template>
    <img :src :class="{ 'disabled': disabled }" :alt="name + 'icon'" />
</template>

<style scoped lang="scss">
img {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--color);

    &.disabled {
        opacity: 0.25;
    }
}
</style>