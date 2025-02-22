<script setup lang='ts'>
import type { Media } from '../models/Media';
import LinkLabelImage from './LinkLabelImage.vue';

const { medias, title } = defineProps<{
    medias: Media[]
    title?: string
}>()
</script>

<template>
    <article class="wrapper">
        <!-- <p v-if="title" class="title">{{ title }} :</p> -->
        <!-- <div class="wrapper"> -->
            <div v-for="media in medias" class="media">
                <p class="type">{{ media.type }}</p>
                <LinkLabelImage :url="media.url"
                                :label="media.label"
                                :src=media.src
                                :alt="media.alt" />
            </div>
        <!-- </div> -->
    </article>
</template>

<style scoped lang='scss'>
.title {
    padding-bottom: 0.5rem;
}

.wrapper {
    display: flex;
    flex-wrap: 1;
    width: fit-content;
    gap: 0.5rem;
}

.media {
    display: flex ;
    flex-direction: column;
}

.type {
    padding: 2px 0;
}
</style>