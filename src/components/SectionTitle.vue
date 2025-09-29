<script setup lang='ts'>
import type { Component } from 'vue';
import Icon from './Icon.vue';

const { name, icon } = defineProps<{
    name: string
    icon?: Component
}>()
</script>

<template>
    <h2> {{ name }} </h2>
    <!-- <h2>
        {{ name }}
        <Icon v-if="icon" :icon="icon" size="1.5rem" />
    </h2> -->
</template>

<style scoped>
h2 {
    width: 100%;
    font-size: 4rem;
    line-height: 4rem;
    display: flex;
    margin-bottom: 2rem;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    text-transform: capitalize;
}
</style>
