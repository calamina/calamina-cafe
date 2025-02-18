<script setup lang="ts">

</script>

<template>
    <div class="tw-flex tw-gap-8 tw-content-center hover:tw-bg-[var(--bg-darker0)] tw-rounded-lg tw-p-2">
        <div class="tw-text-[var(--color-light)] tw-flex tw-flex-col tw-items-center">
            <slot name="date" />
        </div>
        <div class="tw-flex tw-flex-col tw-gap-0 tw-leading-[1.4rem]">
            <p>
                <span class=" tw-text-[var(--color-light)]">@ </span>
                <slot name="name" />
            </p>
            <p>
                <slot name="desc" />
            <p>
            </p>
            <slot name="tech" />
            </p>
            <p>
                <slot name="lang" />
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
p,
div {
    line-height: 1.4rem;
}
</style>