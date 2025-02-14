<script setup lang="ts"></script>

<template>
    <div class="tw-flex tw-gap-8 tw-content-center">
        <div class="date tw-flex tw-flex-col tw-items-center">
            <slot name="date" />
        </div>
        <div class="tw-flex tw-flex-col tw-gap-0">
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
.date{
    color: var(--color-light);
}
</style>