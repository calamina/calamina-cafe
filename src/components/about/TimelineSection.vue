<script setup lang="ts">
import type { Moment } from '../../models/Moment';
import TimelineMoment from './TimelineMoment.vue';

const { moments } = defineProps<{
    moments: Moment[]
    title: string
}>()
</script>

<template>
    <div class="grid">
        <h3>{{ title }}</h3>
        <!-- <div class="separator" inert /> -->
        <div class="momentslink" inert></div>
        <div class="moments">
            <TimelineMoment v-for="moment in moments" :moment="moment" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.grid {
    width: fit-content;
}

.momentslink {
    width: 1px;
    height: 1rem;
    min-height: 1rem;
    background-color: var(--bg-darker);
    margin-left: 3.25rem;
}

p,
div {
    line-height: 1.4rem;
}

h3 {
    padding: 1rem 1.5rem;
    padding: 1rem;
    width: fit-content;
    width: 100%;
    font-size: 2rem;
    line-height: 2rem;
    border: 1px solid var(--bg-darker);
    border-radius: 0.5rem;
    // background-color: var(--bg-darker0);
    // background-color: var(--bg-light);
}

.separator {
    height: 100%;
    background-color: var(--bg-darker0);
    width: 2px;
}

.moments {
    display: flex;
    flex-flow: column;
    // gap: 3.5rem;
    width: fit-content;
}

@media (max-width: 1280px) {
    .grid {
        display: flex;
        flex-flow: column;
        gap: 1rem;
    }

    h3 {
        width: 100%;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--bg-darker0);
    }

    .separator {
        display: none;
    }
}
</style>