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
    <NuxtLink :to="url" target="_blank"
              class="tw-flex tw-items-center tw-flex-row tw-w-full tw-justify-start tw-shrink">
        <img class="tw-rounded-lg tw-object-cover tw-h-12 tw-w-12 tw-shrink-0" :src
             :alt="alt + ' cover'">
        <div
             class="tw-flex tw-flex-col tw-leading-[1.25rem] tw-w-fit tw-overflow-hidden tw-shrink">
            <p class="tw-text-ellipsis tw-text-nowrap tw-overflow-hidden">{{ label }}</p>
            <span class="tw-text-[var(--color-light)]">1988</span>
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped>
a {
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
</style>