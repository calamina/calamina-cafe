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

<style scoped lang="scss">
h2 {
    width: 100%;
    font-size: 4rem;
    line-height: 4rem;
    // font-size: 7rem;
    // line-height: 7rem;
    display: flex;
    margin-bottom: 2rem;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    text-transform: capitalize;

    // &::before {
    //     content: counter(section);
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     height: 2rem;
    //     width: 2rem;
    //     margin-bottom: 0.75rem;
    //     border-radius: 0.5rem;
    //     background-color: var(--bg-darker0);
    // }

}
</style>
