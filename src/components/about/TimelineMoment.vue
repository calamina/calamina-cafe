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
        <div class="dateline" inert></div>
        <div class="date" :class="{ 'actual': moment.actual }">
            <p>{{ moment.date }}</p>
            <template v-if="moment.start">
                <p>↑</p>
                <p>{{ moment.start }}</p>
            </template>
        </div>
        <div class="momentlink" inert></div>
        <div class="info">
            <div class="header">
                <p class="name"> {{ moment.name }} </p>
                <LinkIcon label="website" v-if="moment.url" :url="moment.url" />
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
    position: relative;
    display: flex;
    // gap: 3rem;
    justify-content: start;
    align-items: center;
    width: fit-content;
    border-radius: 0.5rem;
    padding: 1rem;
    line-height: 1.4rem;

    &:has(.date.actual) {
        background-color: var(--bg-darker0);

        .info {
            border-color: var(--bg-darker0);
        }

        .date {
            background-color: var(--highlight);
            border: 1px solid var(--bg-highlight);

            p {
                color: var(--text);
            }
        }

        // .dateline,
        // .momentlink {
        //     background-color: var(--bg-light);
        // }
    }

    &:last-of-type .dateline {
        top: 0;
        height: 60%;
    }
}

.date {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: end;
    height: fit-content;
    padding: 0.5rem 1rem;
    border: 1px solid var(--bg-darker);
    border-radius: 0.5rem;
    background-color: var(--bg);
    background-color: var(--bg-darker0);

    z-index: 1;
    width: 5rem;

    & p {
        color: var(--color-light);
    }

    &.actual {
        background-color: var(--bg-darker0);

        & p {
            color: var(--color);
        }
    }
}

.dateline {
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: var(--bg-darker);
    left: 3.25rem;
    z-index: 0;
}

.momentlink {
    height: 1px;
    width: 3rem;
    min-width: 3rem;
    width: 1.5rem;
    min-width: 1.5rem;
    background-color: var(--bg-darker);
}

.info {
    display: flex;
    flex-flow: column;
    width: 100%;
    gap: 0.75em;
    padding: 1.5rem 1.5rem 1rem;
    border: 1px solid var(--bg-darker);
    border-radius: 0.5rem;
    background-color: var(--bg);
    // background-color: var(--bg-light);

}

.header {
    display: flex;
    justify-content: space-between;
    // flex-flow: column;
    gap: 0.5rem;
}

span {
    color: var(--color-light)
}

.name {
    font-size: 2rem;
    line-height: 2rem;
}

.desc {
    padding: 0.5rem 0;
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
    padding: 0.25rem 0.5rem 0.1rem;
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