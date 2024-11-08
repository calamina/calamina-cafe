<script setup lang="ts">
const { size } = defineProps<{
    size?: number
}>()

const bracketsSize = computed(() => { return { '--size': size ?? 20 + 'px' } })
</script>

<template>
    <NuxtLink class="bracketWrap">
        <slot class="content"></slot>
        <div class="overlay" aria-hidden="true">
            <div class="select" :style="bracketsSize">
                <span class="corner"></span>
                <span class="corner"></span>
                <span class="corner"></span>
                <span class="corner"></span>
            </div>
            <div class="mask"></div>
        </div>
    </NuxtLink>
</template>
<style scoped lang="scss">
.bracketWrap {
    position: relative;
    border: 1px solid transparent;

    &:hover .overlay, &:focus .overlay {
        opacity: 1;
        transform: scale(1);
    }
}

.content:focus + .overlay {
    opacity: 1;
    transform: scale(1);
}

.overlay {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    transform: scale(1.05);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-delay: 0.025s;
}

.mask {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background-color: #dedede;
}

.select {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: var(--size) var(--size);
    grid-template-rows: var(--size) var(--size);
    gap: calc(100% - (var(--size) * 2));
    background-color: #ccc;

    span {
        display: block;
        width: var(--size);
        height: var(--size);
        background-color: #000;
    }
}
</style>