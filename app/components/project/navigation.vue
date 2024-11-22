<script setup lang="ts">
let previous: any = null
let next: any = null

const {fullPath} = useRoute()
const type = fullPath.includes(WEB) ? WEB : PHONE

const { project } = useRoute().params
const path = `/${type}/${project}`

await queryContent(type).findSurround(path).then(
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
                <!-- <img class="mini tw-w-1/2 xl:tw-w-72" :class="{ 'minismall': type === PHONE }" :src="previous.mini" loading="lazy" alt="project picture"> -->
                <NuxtImg class="mini tw-w-1/2 xl:tw-w-72" :class="{ 'minismall': type === PHONE }" :src="previous.mini" loading="lazy" alt="project picture" />
            </div>
        </SelectBrackets>
        <SelectBrackets class="next" v-if="next" :to="{ params: { project: next.name } }">
            <div class="link-wrapper">
                <NuxtImg class="mini tw-w-1/2 xl:tw-w-72" :class="{ 'minismall': type === PHONE }" :src="next.mini" loading="lazy" alt="project picture" />
                <!-- <img class="mini tw-w-1/2 xl:tw-w-72" :class="{ 'minismall': type === PHONE }" :src="next.mini" loading="lazy" alt="project picture"> -->
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