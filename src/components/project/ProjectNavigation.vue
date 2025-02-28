<script setup lang="ts">
import type { Project } from '../../models/Project';
import ButtonHighlight from '../ButtonHighlight.vue';
import IconImg from '../IconImg.vue';

const { path, next, prev, total } = defineProps<{
    path: string
    next: Project | null
    prev: Project | null
    total: number
}>()
</script>

<template>
    <div class="navigation">
        <div :key="prev?.url" class="prev">
            <!-- <ButtonHighlight class="button" :href="(path + prev?.name) ?? { name: 'projects' }"> -->
            <ButtonHighlight class="button" :href="prev ? path + prev?.name : '/projects'">
                <IconImg name="tabler:arrow-left-bar" />
                <h2>{{ prev?.name ?? 'back to projects' }}</h2>
            </ButtonHighlight>
        </div>

        <!-- todo count projects -->
        <p class="id">{{ prev ? prev?.num + 1 : 1 }} / {{ total }}</p>

        <div :key="next?.url" class="next">
            <ButtonHighlight class="button" :href="next ? path + next?.name : '/projects'">
                <h2>{{ next?.name ?? 'back to projects' }}</h2>
                <IconImg name="tabler:arrow-right-bar" />
            </ButtonHighlight>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navigation {
    margin-top: auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0px, 1fr));
    align-items: center;
    padding-bottom: 0.5rem;
    width: 100%;
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
    // padding: 0.5rem;
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
    justify-content: center;
    background-color: var(--bg-darker0);
}

.link-wrapper {
    // width: 100%;
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
    // max-width: 5rem;
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

    .next .button,
    .prev .button,
    .empty .button {
        display: flex;
        flex-flow: column-reverse;
        // max-width: 7rem;
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