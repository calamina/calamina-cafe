<script setup lang='ts'>
const { url, label } = defineProps<{
    url: string;
    label: string;
}>()
</script>

<template>
    <a :href=url target="_blank">
        <slot />
        <p>{{ label }}</p>
    </a>
</template>

<style scoped>
a {
    display: flex;
    flex-flow: row;
    align-items: center;
    width: 100%;
    justify-content: start;
    flex-shrink: 1;
    border-radius: 0.5rem;
    padding-right: 0.5rem;

    &:hover {
        background-color: var(--highlight);

        p {
            color: var(--color-hover);
        }
    }
}

p {
    text-overflow: ellipsis;
    text-wrap: nowrap;
    overflow: hidden;
}
</style>
