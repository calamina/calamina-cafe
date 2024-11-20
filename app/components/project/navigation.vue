<script setup lang="ts">
const { small } = defineProps<{
    small?: boolean
}>()

let previous: any = null
let next: any = null

const { project } = useRoute().params
const path = `/web/${project}`

await queryContent('web').findSurround(path).then(
    res => {
        previous = res[0]
        next = res[1]
    }
)
</script>

<template>
    <div class="navigation">
        <SelectBrackets class="prev" v-if="previous" :to="{ params: { project: previous.name } }">
            <div class="link-wrapper">
                <Icon name="tabler:arrow-left-bar" />
                <h2> {{ previous.name }}</h2>
                <img class="mini" :class="{ small: 'minismall' }" :src="previous.mini" alt="project picture">
            </div>
        </SelectBrackets>
        <SelectBrackets class="next" v-if="next" :to="{ params: { project: next.name } }">
            <div class="link-wrapper">
                <img class="mini" :class="{ small: 'minismall' }" :src="next.mini" alt="project picture">
                <h2>{{ next.name }}</h2>
                <Icon name="tabler:arrow-right-bar" />
            </div>
        </SelectBrackets>
    </div>
</template>

<style lang="scss" scoped>
.navigation {
    margin-top: auto;

    gap: 0.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    // display: flex;
    // flex-flow: column;    

    a {
        display: flex;
    }
}

.prev {
    justify-self: flex-start;

    .link-wrapper {
        padding-left: 1rem;
    }
}

.next {
    grid-column: 2;
    justify-self: flex-end;

    .link-wrapper {
        padding-right: 1rem;
    }
}

.prev,
.next {
    cursor: pointer;
    width: fit-content;
    // width: 100%;
    height: 100%;

    &:hover .mini {
        filter: none;
    }
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
    width: 150px;
    width: 300px;
    // width: 50px;
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