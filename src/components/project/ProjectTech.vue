<script setup lang="ts">
import type { Tech } from '../../../#old/app/models/ProjectTech';

const { tech } = defineProps<{
    tech: Tech,
}>()

const categs = Object.entries(tech).filter(entry => entry[0] !== "colors") 
</script>

<template>
    <div class="tech">
        <div class="category" v-for="category in categs">
            <slot />
            <p class="category-title">{{ category[0] }}</p>
            <div class="taggroup">
                <span class="tag" :class="category[0]" v-for="entry in category[1]">{{ entry }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.category {
    display: flex;
    align-items: baseline;
    padding-top: 0.25rem;
    padding-bottom: 0.5rem;
    transition: padding-left 0.2s;

    &:not(:last-of-type) {
        border-bottom: 1px solid var(--bg-darker);
    }

    &:hover {
        padding-left: 0.25rem;
    }
}

.category-title {
    text-transform: capitalize;
    width: 12ch;
}

.taggroup {
    display: flex;
    padding-top: 0.25rem;
    gap: 0.5rem;
}

.tag {
    background-color: var(--bg-darker);
    padding: 0 0.5rem;
    border-radius: 0.5rem;
}

html.dark .tag {
    color: var(--bg-darker);
}

.tools {
    background-color: hsl(50, 50%, 77%);
    background-color: #e2d8a7
}

.languages {
    background-color: hsl(144, 50%, 77%);
    background-color: #a7e2be
}

.colors {
    background-color: hsl(216, 50%, 77%);
    background-color: #a7bee2
}

.fonts {
    background-color: hsl(288, 50%, 77%);
    background-color: #d6a7e2;
}

.icons {
    background-color: hsl(2, 50%, 77%);
    background-color: #e2a9a7;
}

.tools {
    background-color: hsl(50, 50%, 77%);
    background-color: #e2d8a7
}
</style>