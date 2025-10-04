<script setup lang='ts'>
import { computed, ref, watch, type Ref } from 'vue';
import { ProjectType } from '../../utils/enum';
import type { ProjectFilters } from '../../models/Types';

const emit = defineEmits<{
    (e: 'update', value: ProjectFilters): ProjectFilters
}>()

const { length } = defineProps<{
    length: number
}>()

const filters: Ref<ProjectFilters> = ref({
    type: "ALL",
    // sort: "date",
    order: "ASC"
})

const webActive = computed(() => filters.value.type === ProjectType.WEB)
const phoneActive = computed(() => filters.value.type === ProjectType.PHONE)

watch(filters, () => {
    emit('update', filters.value)
}, { deep: true })
</script>

<template>
    <div class="wrapper">
        <div class="filters">
            <div class="filter">
                <h3>type</h3>
                <button @click="filters.type = 'ALL'" :class="{ 'inactive': phoneActive || webActive }">all</button>
                <button @click="filters.type = ProjectType.WEB" :class="{ 'inactive': !webActive }">web</button>
                <!-- <button v-if="webActive" @click="filters.weboffline = !filters.weboffline"                :class="{ 'inactive': !filters.weboffline }">offline</button> -->
                <button @click="filters.type = ProjectType.PHONE" :class="{ 'inactive': !phoneActive }">phone</button>
            </div>

            <!-- <div class="filter">
                <h3>sort</h3>
                <button @click="filters.sort = 'date'" :class="{ 'inactive': filters.sort !== 'date' }">Date</button>
                <button @click="filters.sort = 'alpha'" :class="{ 'inactive': filters.sort !== 'alpha' }">Alpha</button>
            </div> -->

            <div class="filter">
                <h3>order</h3>
                <button @click="filters.order = 'ASC'" :class="{ 'inactive': filters.order !== 'ASC' }">Asc</button>
                <button @click="filters.order = 'DESC'" :class="{ 'inactive': filters.order !== 'DESC' }">Desc</button>
            </div>
        </div>
        <div class="title">
            <h2>{{ filters.type.toLowerCase() }} projects</h2>
            <p class="count">{{ length }}</p>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    align-items: end;
    align-items: center;
    padding: 2rem 2rem 3.5rem;
    justify-content: space-between;
}

.filters {
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    width: fit-content;
}

.filter {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.title {
    display: flex;
    gap: 1rem;
    align-items: center;
}

h2 {
    font-size: 3rem;
    line-height: 3rem;
    text-transform: capitalize;
}

h3 {
    position: relative;
    width: 10ch;
    padding-right: 1rem;

    &::after {
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        content: ":";
        padding-right: 1rem;
    }
}

.count {
    padding: 0.1rem 1rem;
    border-radius: 0.5rem;
    background-color: var(--bg-darker0);
    width: fit-content;
}

button {
    padding: 0.1rem 1rem;
    border-radius: 0.5rem;
    background-color: var(--bg-darker0);
    width: fit-content;


    &.inactive {
        background-color: var(--bg);
    }

    &:hover {
        background-color: var(--highlight);
    }
}

@media (max-width: 1280px) {
    .wrapper {
        flex-flow: column-reverse;
        gap: 2rem;
        padding-top: 1rem;
    }
}
</style>