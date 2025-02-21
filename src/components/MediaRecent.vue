<script setup lang='ts'>
const { medias, title } = defineProps<{
    medias: any[]
    title?: string
}>()
</script>

<template>
    <article>
        <p v-if="title" class="tw-pb-2">{{ title }} :</p>
        <div class="tw-flex tw-flex-wrap tw-w-fit tw-gap-y-0 tw-gap-x-2">
            <div v-for="media in medias" class="tw-flex tw-flex-col">
                <p class="tw-py-[2px]">{{ media.type }}</p>
                <LinkLabelImage :url="media.url"
                                :label="media.label"
                                :src=media.src
                                :alt="media.alt" />
            </div>
        </div>
    </article>
</template>

<style scoped lang='scss'></style>