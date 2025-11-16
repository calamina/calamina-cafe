<script setup lang="ts">
import BaseTag from '@components/atomic/TagBase.vue';

const { name, items, color } = defineProps<{
    items: string[]
    name?: string
    color?: string
}>()
</script>

<template>
    <div class="category">
        <div class="taglist">
            <BaseTag v-if="name" class="title">{{ name }}</Basetag>
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

.title {
    text-transform: capitalize;
}
</style>