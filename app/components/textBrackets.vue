<script setup lang="ts">
</script>

<template>
    <p>
        [
        <slot />
        ]
    </p>
</template>

<style lang="scss" scoped>
p {
    display: flex;
    gap: 0.25rem;
    align-items: center;
}
</style>