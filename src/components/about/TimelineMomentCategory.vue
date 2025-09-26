<script setup lang="ts">
const { name, items } = defineProps<{
    name: string
    items: string[]
}>()
</script>

<template>
    <div class="category">
        <div class="taglist">
            <p class="category-title">{{ name }}</p>
            <span class="tag" :class="name" v-for="item in items">{{ item }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.category {
    width: 100%;
    display: flex;
    align-items: baseline;
    padding-top: 0.25rem;
    gap: 0.5rem;

    &:not(:last-of-type) {
        padding-bottom: 0.5rem;
    }
}

.category-title {
    text-transform: capitalize;
    // width: 12ch;
    width: fit-content;
    flex-shrink: 0;
    padding: 0.25rem 0.5rem 0.1rem;
    border-radius: 0.5rem;
    background-color: var(--bg-darker0);
}

.taglist {
    display: flex;
    gap: 0.5rem;
    flex-flow: row wrap;
}

.tag {
    display: inline-block;
    position: relative;
    color: var(--color);
    padding: 0.25rem 0.5rem 0.1rem;
    border-radius: 0.5rem;
}

.tools {
    background-color: hsl(50, 50%, 77%);
}

.languages {
    background-color: hsl(144, 50%, 77%);
}
</style>