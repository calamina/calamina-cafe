<script setup lang="ts">
import { defineProps } from 'vue';

const { small } = defineProps({
    small: Boolean,
})
</script>

<template>
    <div :class="{ smallIcon: small }">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
div {
    width: 1.25rem;
    height: 1.25rem;
}

.smallIcon {
    width: 0.9rem;
    height: 0.9rem;
}
</style>