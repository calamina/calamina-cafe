<script setup lang="ts">
const route = useRoute()
const type = route.path.includes(WEB) ? WEB : PHONE

const { data: nav } = await useAsyncData(() =>
    queryCollectionItemSurroundings(type, route.path, { fields: ['title', 'num'] }).order('num', 'ASC')
)
</script>

<template>
    <div class="navigation tw-grid tw-grid-cols-3 tw-items-center tw-pb-2">
        <div :key="nav?.[0]?.path" class="prev">
            <highlightButton class="button" :to="nav?.[0]?.path ?? { name: 'projects' }">
                <Icon name="tabler:arrow-left-bar" />
                <h2>{{ nav?.[0]?.title ?? 'back to projects'}}</h2>
            </highlightButton>
        </div>

        <p class="id">{{ nav?.[0] ? nav?.[0]?.num + 1 : 1 }} / 19</p>

        <div :key="nav?.[1].path" class="next">
            <highlightButton class="button" :to="nav?.[1]?.path ?? { name: 'projects' }">
                <h2>{{ nav?.[1]?.title ?? 'back to projects' }}</h2>
                <Icon name="tabler:arrow-right-bar" />
            </highlightButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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