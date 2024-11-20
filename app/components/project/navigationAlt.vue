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
                <Icon name="tabler:arrow-left-bar"  />
                <h2> {{ previous.name }}</h2>
                <img class="mini" :class="{ minismall: small }" :src="previous.mini" alt="project picture">
            </div>
        </SelectBrackets>
        <SelectBrackets class="next" v-if="next" :to="{ params: { project: next.name } }">
            <div class="link-wrapper">
                <img class="mini" :class="{ minismall: small }" :src="next.mini" alt="project picture">
                <h2>{{ next.name }}</h2>
                <Icon name="tabler:arrow-right-bar"  />
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
    cursor: pointer;
    width: fit-content;
    &:hover .mini {
        filter: none;
    }
}

.link-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: var(--bg-darker0);
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