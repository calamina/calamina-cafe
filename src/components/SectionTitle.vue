<script setup lang='ts'>
import type { Component } from 'vue';
import Icon from './Icon.vue';

const { name, icon } = defineProps<{
    name: string
    icon?: Component
}>()
</script>

<template>
    <h2>
        {{ name }}
        <Icon v-if="icon" :icon="icon" size="1.5rem" />
    </h2>
</template>

<style scoped lang="scss">
h2 {
    font-size: 3rem;
    line-height: 3rem;
    display: flex;
    margin-bottom: 1rem;
    align-items: baseline;
    gap: 0.5rem;
    text-transform: capitalize;
}
</style>
