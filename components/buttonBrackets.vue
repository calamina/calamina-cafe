<script setup lang="ts">
</script>

<template>
    <button>
        [
        <slot />
        ]
    </button>
</template>

<style lang="scss" scoped>
button {
    display: flex;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding-top: 0.5rem;
    gap: 0.25rem;
    align-items: center;
}
</style>