<script setup lang="ts">
let previous: any = null
let next: any = null

const { fullPath } = useRoute()
const type = fullPath.includes(WEB) ? WEB : PHONE

const { project } = useRoute().params
const path = `/${type}/${project}`

await queryContent(type)
    .findSurround(path)
    .then(res => {
        previous = res[0]
        next = res[1]
    })
</script>

<template>
    <div class="navigation">
        <div v-if="previous" class="prev">
            <SelectBrackets class="button" :to="{ params: { project: previous.name } }">
                <Icon name="tabler:arrow-left-bar" />
                <h2>{{ previous.name }}</h2>
            </SelectBrackets>
        </div>
        <div v-else class="prev">
            <SelectBrackets class="button" :to="{ name: 'projects' }">
                <Icon name="tabler:arrow-left-bar" />
                <h2>back to projects</h2>
            </SelectBrackets>
        </div>
        <div v-if="next" class="next">
            <SelectBrackets class="button" :to="{ params: { project: next.name } }">
                <h2>{{ next.name }}</h2>
                <Icon name="tabler:arrow-right-bar" />
            </SelectBrackets>
        </div>
        <div v-else class="next">
            <SelectBrackets class="button" :to="{ name: 'projects' }">
                <h2>back to projects</h2>
                <Icon name="tabler:arrow-right-bar" />
            </SelectBrackets>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navigation {
    padding: 0 0.5rem;
    gap: 0.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
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
    padding: 0.5rem;
    width: fit-content;
    height: 100%;

    &:hover .mini {
        filter: none;
    }
}

.button {
    // border-radius: 0.5rem;
    padding: 1.5rem;
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
    height: 100%;
    filter: grayscale(1);
    transition: filter 0.3s;
}

.minismall {
    max-height: 10rem;
    width: auto;
    object-fit: contain;
}
</style>