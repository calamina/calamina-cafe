<script setup lang="ts">
import type { TypedProject } from '../../models/Types';
import Icon from '../Icon.vue';
import IconArrowLeft from '../Icons/IconArrowLeft.vue';
import IconArrowRight from '../Icons/IconArrowRight.vue';

const { index, path, next, prev, total, mobile } = defineProps<{
    index: number
    path: string
    next: TypedProject | null
    prev: TypedProject | null
    total: number
    mobile?: boolean
}>()
</script>

<template>
    <div class="navigation" :class="{ 'mobile': mobile }">
        <div :key="prev?.homepage" class="prev">
            <a class="button" :href="prev ? path + prev?.name : '/projects'">
                <Icon :icon="IconArrowLeft" size="1.5rem" />
                <h2>{{ prev?.name ?? 'back to projects' }}</h2>
            </a>
        </div>

        <p class="id">{{ index + 1 }} / {{ total }}</p>

        <div :key="next?.homepage" class="next">
            <a class="button" :href="next ? path + next?.name : '/projects'">
                <h2>{{ next?.name ?? 'back to projects' }}</h2>
                <Icon :icon="IconArrowRight" size="1.5rem" />
            </a>
        </div>
    </div>
</template>

<style scoped>
.navigation {
    margin-top: auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0px, 1fr));
    align-items: center;
    padding-bottom: 0.5rem;
    width: 100%;

    &.mobile {
        display: none;
    }
}

.prev {
    justify-self: flex-start;

    .mini {
        padding-left: 0.5rem;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
}

.id {
    grid-column: 2;
    height: fit-content;
    text-align: center;
    width: 100%;
}

.next {
    grid-column: 3;
    justify-self: flex-end;

    .mini {
        padding-right: 0.5rem;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
    }
}

.prev,
.next,
.empty {
    width: fit-content;
    width: 100%;
    height: 100%;
    overflow: hidden;

    h2 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &:hover .mini {
        filter: none;
    }
}

.empty .button {
    padding: 0.5rem 1rem;
    background-color: transparent;
}

.button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    justify-content: space-evenly;
    width: 100%;
    background-color: var(--bg-darker0);
}

.link-wrapper {
    border-radius: 0.5rem;
    overflow: hidden;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: var(--bg-darker0);
    justify-content: center;
}

.mini {
    max-width: 14rem;
    height: 100%;
    filter: grayscale(1);
    transition: filter 0.3s;
}

.minismall {
    max-height: 10rem;
    width: auto;
    object-fit: contain;
}

@media (max-width: 1280px) {
    .navigation:not(.mobile) {
        display: none;
    }

    .navigation.mobile {
        display: flex;
        padding-bottom: 3rem;
        padding-top: 3rem;
    }

    .next .button,
    .prev .button,
    .empty .button {
        display: flex;
        flex-flow: column-reverse;
        width: 100%;
        padding: 0;
        padding-bottom: 0.5rem
    }

    .next .button {
        flex-flow: column;
    }

    .prev,
    .next {
        width: 100%;
    }

    .next .mini,
    .prev .mini {
        max-width: 100%;
        padding: 0;
        border-top-right-radius: 0.5rem;
        border-bottom-left-radius: 0;
    }

    .minismall {
        max-height: unset;
    }
}
</style>