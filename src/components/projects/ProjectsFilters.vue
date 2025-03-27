<script setup lang='ts'>
import { computed, ref, watch, type Ref } from 'vue';
import { ProjectType } from '../../utils/enum';
import type { ProjectFilters } from '../../models/Types';

const emit = defineEmits<{
    (e: 'update', value: ProjectFilters): ProjectFilters
}>()

const filters: Ref<ProjectFilters> = ref({
    sort: "alpha",
    order: "asc",
    type: "ALL",
    weboffline: true,
})

const webActive = computed(() => filters.value.type === ProjectType.WEB)
const phoneActive = computed(() => filters.value.type === ProjectType.PHONE)

watch(filters, () => {
    emit('update', filters.value)
    console.debug("hello")
}, { deep: true })
</script>

<template>
    <div class="filters">
        <!-- <h2>Filters</h2> -->
        <div class="filter">
            <h3>type</h3>
            <button @click="filters.type = 'ALL'" :class="{ 'inactive': phoneActive || webActive }">all</button>
            <button @click="filters.type = ProjectType.WEB" :class="{ 'inactive': !webActive }">web</button>
            <!-- <button v-if="webActive" @click="filters.weboffline = !filters.weboffline"                :class="{ 'inactive': !filters.weboffline }">offline</button> -->
            <button @click="filters.type = ProjectType.PHONE" :class="{ 'inactive': !phoneActive }">phone</button>
        </div>
        <div class="filter">
            <h3>order</h3>
            <button @click="filters.sort = 'alpha'" :class="{ 'inactive': filters.sort !== 'alpha' }">Alpha</button>
            <!-- <button @click="filters.sort = 'date'" :class="{ 'inactive': filters.sort !== 'date' }">Date</button> -->
        </div>

        <div class="filter">
            <h3>direction</h3>
            <button @click="filters.order = 'asc'" :class="{ 'inactive': filters.order !== 'asc' }">Asc</button>
            <button @click="filters.order = 'desc'" :class="{ 'inactive': filters.order !== 'desc' }">Desc</button>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.filters {
    display: flex;
    flex-flow: column;
    gap: 0.25rem;
    padding: 2rem 2rem 4rem;
}

.filter {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

// h2 {
//     font-size: 1rem;
//     text-transform: capitalize;
// }

h3 {
    position: relative;
    width: 14ch;
    padding-right: 1rem;

    &::after {
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        content: ":";
        padding-right: 1rem;
        // background-color: red;
    }
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
</style>