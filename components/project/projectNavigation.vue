<script setup lang="ts">
import type { ProjectModel } from '@/models/project';
import IconPrevious from '../icons/iconPrevious.vue';
import IconNext from '../icons/iconNext.vue';

const { previous, next, source } = defineProps<{
    previous: ProjectModel
    next: ProjectModel
    source: string
    small?: boolean
}>()

const webImages = useImageUtils().getImages('web')
</script>

<template>
    <div class="navigation">
        <RouterLink class="prev" v-if="previous" :to="{ params: { project: previous.name } }">
            <IconComponent>
                <IconPrevious />
            </IconComponent>
            <h2> {{ previous.name }}</h2>
            <img class="mini" :class="{ minismall: small }" :src="webImages[previous.name]" alt="project picture">
        </RouterLink>
        <RouterLink class="next" v-if="next" :to="{ params: { project: next.name } }">
            <img class="mini" :class="{ minismall: small }" :src="webImages[next.name]" alt="project picture">
            <h2>{{ next.name }}</h2>
            <IconComponent>
                <IconNext />
            </IconComponent>
        </RouterLink>
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
    background-color: #d5d5d5;
    padding: 1rem;
    justify-content: center;
    transition: padding 0.3s;

    &:hover {
        padding: 1rem 2rem;

        .mini {
            filter: none;
        }
    }
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