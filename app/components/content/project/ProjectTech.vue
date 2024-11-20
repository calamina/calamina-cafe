<script setup lang="ts">
import type { ProjectTech } from '../../../models/ProjectTech';

const { tech } = defineProps<{
    tech: ProjectTech,
}>()
</script>

<template>
    <div class="tech">
        <div class="category tw-flex tw-items-baseline tw-py-1" v-for="category in Object.entries(tech ?? {})">
            <slot />
            <p class="category-title tw-capitalize">{{ category[0] }}</p>
            <div class="tw-flex tw-pt-1 tw-gap-2">
                <span class="tag" :class="category[0]" v-for="entry in category[1]">{{ entry }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.category {
    transition: padding-left 0.2s, background-color 0.2s;

    &:not(:last-of-type) {
        border-bottom: 1px solid var(--bg-darker);
    }

    &:hover {
        padding-left: 0.25rem;
        background-color: var(--bg);
    }
}

.category-title {
    width: 12ch;
}

.tag {
    background-color: var(--bg-darker);
    padding: 0 0.5rem;
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