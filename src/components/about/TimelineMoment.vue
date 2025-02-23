<script setup lang="ts">
import type { Moment } from '../../models/Moment';

const { moment } = defineProps<{
    moment: Moment
}>()
</script>

<template>
    <div class="moment">
        <div class="date" :class="{ 'actual': moment.actual }">
            <p>{{ moment.date }}</p>
            <template v-if="moment.start">
                <p>↑</p>
                <p>{{ moment.start }}</p>
            </template>
        </div>
        <div class="info">
            <p>
                <span>@ </span>
                {{ moment.name }}
            </p>
            <p>{{ moment.desc }}</p>
            <p> {{ moment.info }} </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
p,
div {
    line-height: 1.4rem;
}

.moment {
    display: flex;
    gap: 2.5rem;
    justify-content: start;
    width: 100%;
    border-radius: 0.5rem;
    padding: 0.5rem;
    line-height: 1.4rem;

    &:hover {
        background-color: var(--bg-darker0);
    }
}

.date {
    display: flex;
    flex-flow: column;
    align-items: center;

    & p {
        color: var(--color-light);
    }

    &.actual {
        & p {
            color: var(--color);
        }
    }
}

span {
    color: var(--color-light)
}
</style>