<script
        setup
        lang="ts">
        const { url, label, src, alt } = defineProps<{
            url: string,
            label: string,
            src: string,
            alt: string,
        }>()
</script>

<template>
    <NuxtLink :to="url" target="_blank" class="tw-flex tw-items-start tw-flex-col tw-w-fit">
        <p class="tw-rounded-lg tw-bg-[var(--bg-darker0)] tw-px-3 tw-py-1 tw-w-full">
            {{ label }}
        </p>
        <!-- <img class="tw-object-cover tw-w-full tw-rounded-lg" :src
             :alt="alt + ' cover'"> -->
        <div
             class="tw-rounded-lg tw-overflow-hidden tw-w-full tw-flex tw-justify-center tw-bg-[var(--bg-darker0)]  tw-h-60">
            <img class="tw-object-cover" :src
                 :alt="alt + ' cover'">
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped>
a:hover {
    background-color: transparent;

    p {
        background-color: var(--highlight);
    }
}
</style>