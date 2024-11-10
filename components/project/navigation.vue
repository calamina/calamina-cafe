<script setup lang="ts">
import type { Project } from '@/models/project';

const { previous, next, small } = defineProps<{
    previous: Project | null
    next: Project | null
    small?: boolean
}>()

const images = []
</script>

<template>
    <div class="navigation">
        <SelectBrackets class="prev" v-if="previous" :to="{ params: { project: previous.name } }">
            <div class="link-wrapper">
                <Icon name="tabler:arrow-left-bar" style="color: black" />
                <h2> {{ previous.name }}</h2>
                <img class="mini" :class="{ minismall: small }" :src="previous.img" alt="project picture">
            </div>
        </SelectBrackets>
        <SelectBrackets class="next" v-if="next" :to="{ params: { project: next.name } }">
            <div class="link-wrapper">
                <img class="mini" :class="{ minismall: small }" :src="next.img" alt="project picture">
                <h2>{{ next.name }}</h2>
                <Icon name="tabler:arrow-right-bar" style="color: black" />
            </div>
        </SelectBrackets>
    </div>
</template>

<style lang="scss" scoped>
.navigation {
    gap: 1rem;
    display: grid;
    grid-template-columns: repeat(2, auto);
    // width: 50rem;

    a {
        display: flex;
    }
}

.prev {
    justify-self: flex-start;
}

.next {
    grid-column: 2;
    justify-self: flex-end;
}

.prev,
.next {
    &:hover .mini {
        filter: none;
    }
}

.link-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #d5d5d5;
    padding: 1rem;
    justify-content: center;
}

.mini {
    width: 150px;
    height: auto;
    filter: grayscale(1);
    transition: filter 0.3s;
}

.minismall {
    max-height: 10rem;
    width: auto;
    object-fit: contain;
}
</style>