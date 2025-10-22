<script setup lang="ts">
import BaseTag from './BaseTag.vue';

const { name, items, color } = defineProps<{
    items: string[]
    name?: string
    color?: string
}>()
</script>

<template>
    <div class="category">
        <div class="taglist">
            <BaseTag v-if="name" class="tag title">{{ name }}</Basetag>
            <BaseTag :color="color" v-for="item in items">{{ item }}</BaseTag>
        </div>
    </div>
</template>

<style scoped>
.category {
    width: 100%;
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
}

.taglist {
    display: flex;
    gap: 0.5rem;
    flex-flow: row wrap;
}

.tag {
    display: inline-block;
    position: relative;
    padding: 0.25rem 0.5rem 0.1rem;
    border-radius: 0.5rem;
    color: var(--color-hover);
    background-color: var(--bg-darker0);
}

.title {
    text-transform: capitalize;
}
</style>