<script setup lang="ts">
import type { ProjectDataModel } from '@/models/projectData';
import { defineProps } from 'vue';

const props = defineProps<{
    data: ProjectDataModel,
}>()
</script>

<template>
    <!-- <h2>Info</h2> -->
    <div class="category" v-for="category in Object.entries(data)">
        <p class="category-title">{{ category[0] }}</p>
        <div class="taglist">
            <span class="tag" :class="category[0]" v-for="entry in category[1]">{{ entry }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h2 {
    font-size: 1.5rem;
    padding: 1rem 0;
}

.category {
    display: flex;
    align-items: baseline;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    transition: padding-left 0.2s, background-color 0.2s;

    &:not(:last-of-type) {
        border-bottom: 1px solid #c5c5c5;
    }

    &:hover {
        padding-left: 0.25rem;
        background-color: #d5d5d5;
    }
}

.category-title {
    width: 12ch;
    text-transform: capitalize;
}

.taglist {
    padding-top: 0.25rem;
    display: flex;
    gap: 0.5rem;
}

.tag {
    background-color: #c5c5c5;
    padding: 0 0.5rem;
    // border-radius: 0.5rem;
}

.tools {
    background-color: hsl(50, 50%, 77%)
}

.languages {
    background-color: hsl(144, 50%, 77%)
}

.colors {
    background-color: hsl(216, 50%, 77%)
}

.fonts {
    background-color: hsl(288, 50%, 77%)
}

.icons {
    background-color: hsl(2, 50%, 77%)
}
</style>