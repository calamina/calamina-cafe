<script setup lang='ts'>
import type { Link } from "../models/Link";
import LinkIcon from "./LinkIcon.vue";

const { links } = defineProps<{
    links: Link[];
}>();
</script>

<template>
    <div>
        <LinkIcon v-for="link of links" :url="link.url" :label="link.label" :icon="link.icon" />
    </div>
</template>

<style scoped lang="scss">
div {
    width: fit-content;
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    padding: 0.5rem 0;
}
</style>
