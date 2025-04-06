<script setup lang="ts">
import type { Moment } from '../../models/Moment';
import LinkIcon from '../LinkIcon.vue';

const { moment } = defineProps<{
    moment: Moment
}>()

const categs = Object.entries(moment.tools ?? {}) 
</script>

<template>
    <div class="moment">
        <div class="date" :class="{ 'actual': moment.actual }">
            <p>{{ moment.date }}</p>
            <template v-if="moment.start">
                <p>↑</p>
                <p>{{ moment.start }}</p>
            </template>
        </div>
        <div class="info">
            <div class="header">
                <p class="name"> {{ moment.name }} </p>
                <LinkIcon v-if="moment.url" :url="moment.url" />
            </div>
            <p class="desc">{{ moment.desc }}</p>
            <div v-if="categs.length" class="categories">
                <div class="category" v-for="category in categs">
                    <slot />
                    <p class="category-title">{{ category?.[0] }}</p>
                    <div class="taglist">
                        <span class="tag" :class="category?.[0]" v-for="entry in category?.[1]">{{ entry }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
p,
div {
    line-height: 1.4rem;
}

.moment {
    display: flex;
    gap: 3rem;
    justify-content: start;
    width: 100%;
    border-radius: 0.5rem;
    padding: 0.5rem;
    line-height: 1.4rem;
    // background-color: var(--bg-darker0);

    &:hover {
        background-color: var(--bg-darker0);

        a {
            background-color: var(--bg-darker);
        }
    }
}

.date {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: end;
    height: 100%;
    // border-right: 2px solid var(--bg-darker0);
    // padding-right: 2rem;

    & p {
        color: var(--color-light);
    }

    &.actual {
        & p {
            color: var(--color);
        }
    }
}

.info {
    display: flex;
    flex-flow: column;
    gap: 0.75em;
}

.header {
    display: flex;
    gap: 1rem;
}

span {
    color: var(--color-light)
}

.name {
    font-size: 2rem;
    line-height: 2rem;
}

.categories {
    display: flex;
    flex-flow: column;
    gap: 0.25rem;
}

.category {
    width: 100%;
    display: flex;
    align-items: baseline;
    padding-top: 0.25rem;
    gap: 0.5rem;

    &:not(:last-of-type) {
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--bg-darker);
    }
}

.category-title {
    text-transform: capitalize;
    width: 10ch;
}

.taglist {
    display: flex;
    gap: 0.5rem;

}

.tag {
    display: inline-block;
    background-color: var(--bg-darker);
    color: var(--color);
    padding: 0 0.5rem;
    border-radius: 0.5rem;
}

.tools {
    background-color: hsl(50, 50%, 77%);
}

.languages {
    background-color: hsl(144, 50%, 77%);
}

// DARK
html.dark .moment {

    span,
    .date p {
        color: var(--color);
        opacity: 0.8;
    }

    .date.actual p {
        opacity: 1;
    }
}

// MOBILE
@media (max-width: 1280px) {
    .moment {
        // flex-flow: column;
        // align-items: start;
        gap: 1.5rem;
        padding-top: 0;
    }

    // .moment {
    //     flex-flow: column;
    //     align-items: start;
    //     gap: 0;
    //     padding-top: 0;
    // }

    // .date {
    //     flex-flow: row;
    //     gap: 1rem;
    //     background-color: var(--bg-darker0);
    //     padding: 0.25rem 0.5rem;
    //     border-radius: 0.5rem;
    // }
}
</style>