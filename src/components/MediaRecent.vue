<script setup lang='ts'>
import type { CollectionEntry } from 'astro:content';
import LinkLabelImage from './LinkLabelImage.vue';

const { medias } = defineProps<{
    medias: (CollectionEntry<"aboutMedia">["data"])[]
    title?: string
}>()
</script>

<template>
    <article class="medias">
        <div v-for="media in medias" class="media">
            <p class="type">{{ media.type }}</p>
            <LinkLabelImage :url="media.url" :label="media.label" :src=media.src :alt="media.label + 'cover'" />
        </div>
    </article>
</template>

<style scoped lang='scss'>
.title {
    padding-bottom: 0.5rem;
}

.medias {
    display: flex;
    flex-wrap: 1;
    width: fit-content;
    gap: 0.5rem;
}

.media {
    display: flex;
    flex-direction: column;
}

.type {
    padding: 2px 0;
}
</style>