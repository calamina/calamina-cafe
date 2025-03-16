<script setup lang='ts'>
import { ProjectsFilters } from '../../stores/projectsFilters';
import { useStore } from '@nanostores/vue'

const filters = useStore(ProjectsFilters)

function toggleActive(key: 'webActive' | 'phoneActive' | 'offline', value?: string) {
    const activeValue = filters.value[key]
    ProjectsFilters.setKey(key, !activeValue)
}
</script>

<template>
    <aside>
        <h2>Filters</h2>
        <h3>toggle</h3>
        <button @click="toggleActive('webActive')" :class="{ 'inactive': !filters.webActive }">web</button>
        <div v-if="filters.webActive">
            <button @click="toggleActive('offline')" :class="{ 'inactive': !filters.offline }">offline</button>
        </div>
        <button @click="toggleActive('phoneActive')" :class="{ 'inactive': !filters.phoneActive }">phone</button>
        <!-- <div v-if="filters.phoneActive">
            <button @click="toggleActive('offline')" :class="{ 'inactive': !filters.offline }">todo?</button>
        </div> -->

        <h3>order</h3>
        <button @click="ProjectsFilters.setKey('sort', 'date')"
            :class="{ 'inactive': filters.sort !== 'date' }">Date</button>
        <button @click="ProjectsFilters.setKey('sort', 'alpha')"
            :class="{ 'inactive': filters.sort !== 'alpha' }">Alpha</button>

        <h3>direction</h3>
        <button @click="ProjectsFilters.setKey('order', 'asc')"
            :class="{ 'inactive': filters.order !== 'asc' }">Asc</button>
        <button @click="ProjectsFilters.setKey('order', 'desc')"
            :class="{ 'inactive': filters.order !== 'desc' }">Desc</button>
    </aside>
</template>

<style scoped lang='scss'>
aside {
    display: flex;
    flex-flow: column;
    gap: 0.25rem;
    grid-column: 1;
    position: sticky;
    top: 4rem;
    left: 0;
    height: calc(100vh - 6rem);
}

h2 {
    font-size: 3rem;
    line-height: 3rem;
    text-transform: capitalize;
}

button {
    padding: 0.25rem 1rem;
    border-radius: 0.5rem;
    background-color: var(--highlight);
    width: fit-content;

    &.inactive {
        background-color: var(--bg-darker0);
    }
}

div {
    padding-left: 1rem;
}
</style>