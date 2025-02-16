<script
        setup
        lang="ts">
        const { url, label, src, alt } = defineProps<{
            url: string,
            label: string,
            src: string,
            alt: string,
            date?: string
        }>()
</script>

<template>
    <!-- <NuxtLink :to="url" target="_blank" class="tw-flex tw-items-start tw-flex-row tw-w-full tw-max-w-80"> -->
    <NuxtLink :to="url" target="_blank" class="tw-flex tw-items-center tw-flex-row tw-w-full tw-h-12">
        <div
             class="tw-rounded-lg tw-overflow-hidden tw-h-full tw-w-10 tw-flex tw-justify-center tw-bg-[var(--bg-darker0)]">
            <img class="tw-object-cover" :src
                 :alt="alt + ' cover'">
        </div>
        <div>
            <!-- class="tw-rounded-lg tw-bg-[var(--bg-darker)] tw-px-1 tw-py-0 tw-w-fit tw-text-ellipsis tw-text-nowrap tw-overflow-hidden"> -->
            <div
                 class="tw-flex tw-flex-col tw-leading-[1.25rem] tw-w-fit tw-text-ellipsis tw-text-nowrap tw-overflow-hidden">
                <p>{{ label }}</p>
                <span class="tw-text-[var(--color-light)]">1988</span>
            </div>
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped>
a {
    background-color: var(--bg-darker0);
    border-radius: 0.5rem;
    padding-right: 0.5rem;

    &:hover p {
        background-color: var(--highlight);
    }
}
</style>