<script setup lang="ts">
import type { Moment } from '../../models/Moment';
import TimelineMoment from './TimelineMoment.vue';

const { moments } = defineProps<{
    moments: Moment[]
    title: string
}>()
</script>

<template>
    <h3>{{ title }}</h3>
    <div class="separator" inert />
    <div class="moments">
        <TimelineMoment v-for="moment in moments" :moment="moment" />
    </div>
</template>

<style lang="scss" scoped>
p,
div {
    line-height: 1.4rem;
}

h3 {
    padding: 0.25rem 0;
    width: fit-content;
}

.separator {
    height: 100%;
    background-color: var(--bg-darker0);
    width: 2px;
}

.moments {
    display: flex;
    flex-flow: column;
    gap: 1rem;
    width: 100%;
}
</style>