<script setup lang="ts">
const { url, label, src } = defineProps<{
    url: string,
    label: string,
    src: string,
    date?: string
}>()
</script>

<template>
    <a :href="url" target="_blank">
        <img :src :alt="label + ' cover'">
        <div>
            <p>{{ label }}</p>
            <span>1988</span>
        </div>
    </a>
</template>

<style lang="scss" scoped>
a {
    display: flex;
    flex-flow: row;
    align-items: center;
    width: 100%;
    justify-content: start;
    flex-shrink: 1;
    background-color: var(--bg-darker0);
    border-radius: 0.5rem;
    padding-right: 0.5rem;

    &:hover {
        background-color: var(--highlight);

        span {
            color: var(--color);
            opacity: 0.4;
        }
    }
}

img {
    border-radius: 0.5rem;
    object-fit: cover;
    height: 3rem;
    width: 3rem;
    flex-shrink: 0;
}

div {
    display: flex;
    flex-flow: column;
    line-height: 1.25rem;
    width: fit-content;
    overflow: hidden;
    flex-shrink: 1;
}

p {
    text-overflow: ellipsis;
    text-wrap: nowrap;
    overflow: hidden;
}

span {
    color: var(--color-light)
}

.dark-mode a:hover {
    background-color: var(--bg-darker0);

    p {
        color: var(--highlight);
    }
}
</style>