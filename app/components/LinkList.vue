<script setup lang='ts'>
const { links } = defineProps<{
    links: any[]
}>()
</script>

<template>
    <div class="tw-flex tw-items-baseline tw-gap-2 tw-py-2">
        <LinkIcon v-for="link in links" :url="link.url" :label="link.label" :icon="link.icon" />
    </div>
</template>

<style scoped lang='scss'></style>