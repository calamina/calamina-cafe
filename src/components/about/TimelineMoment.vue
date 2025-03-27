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
    width: fit-content;
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

// DARK
html.dark .moment {

    span,
    .date p {
        color: var(--color);
        opacity: 0.8;
    }

    .date.actual p {
        opacity: 1;
    }
}

// MOBILE
@media (max-width: 1280px) {
    .moment {
        // flex-flow: column;
        // align-items: start;
        gap: 1.5rem;
        padding-top: 0;
    }

    // .moment {
    //     flex-flow: column;
    //     align-items: start;
    //     gap: 0;
    //     padding-top: 0;
    // }

    // .date {
    //     flex-flow: row;
    //     gap: 1rem;
    //     background-color: var(--bg-darker0);
    //     padding: 0.25rem 0.5rem;
    //     border-radius: 0.5rem;
    // }
}
</style>