<script setup lang='ts'>
import IconImg from './IconImg.vue';

const { name, icon } = defineProps<{
    name: string
    icon?: string
}>()
</script>

<template>
    <h2>
        {{ name }}
        <IconImg v-if="icon" :name="icon" />
    </h2>
</template>

<style scoped lang='scss'>
h2 {
    font-size: 3rem;
    line-height: 3rem;
    display: flex;
    margin-bottom: 1rem;
    // align-items: center;
    align-items: baseline;
    gap: 0.5rem;
    text-transform: capitalize;
}
</style>