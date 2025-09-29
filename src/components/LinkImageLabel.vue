<script setup lang='ts'>
const { url, label, src, date } = defineProps<{
    url: string;
    label: string;
    src: string;
    date?: string;
}>()
</script>

<template>
    <a :href=url target="_blank">
        <slot />
        <div>
            <p>{{ label }}</p>
        </div>
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

        span {
            color: var(--color);
            opacity: 0.4;
        }
    }
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
    color: var(--color-light);
}

.dark a:hover {
    background-color: var(--bg-darker0);

    p {
        color: var(--highlight);
    }
}
</style>
