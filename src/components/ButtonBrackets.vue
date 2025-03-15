<script setup lang="ts">
const { type = null } = defineProps<{
    type: "alert" | "classic"
}>()
</script>

<template>
    <button :class="{ 'alert': type === 'alert' }">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
button {
    display: flex;
    background-color: var(--bg-darker);
    padding: 0.5rem 1.25rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    gap: 0.5rem;
    align-items: center;

    // &.alert {
    //     background-color: hsl(2, 50%, 77%);
    // }
}
</style>