<script setup lang='ts'>
const { name, icon } = defineProps<{
    name: string
    icon?: string
}>()
</script>

<template>
    <h2 class="tw-pb-6 tw-flex tw-items-center tw-gap-2">
        {{ name }}
        <Icon v-if="icon" :name="icon" />
    </h2>
</template>

<style scoped lang='scss'>
h2 {
    font-size: 1.5rem;
}
</style>