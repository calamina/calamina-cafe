<script setup lang="ts">
import type { TypedMoment } from '../../models/Types';
import LinkIcon from '../LinkIcon.vue';
import TimelineListCategory from './TimelineListCategory.vue';
import TimelineMomentCategory from './TimelineMomentCategory.vue';

const { moment } = defineProps<{
    moment: TypedMoment
}>()
</script>

<template>
    <div class="moment">
        <div class="dateline" inert></div>
        <div class="date" :class="{ 'now': moment.now }">
            <p>{{ moment.now ? "now" : moment.date.getFullYear() }}</p>
            <template v-if="moment.start">
                <p>↑</p>
                <p>{{ moment.start }}</p>
            </template>
        </div>
        <div class="momentlink" inert></div>
        <div class="info">
            <div class="header">
                <!-- <div class="job"> -->
                <p class="role"> {{ moment.role }} </p>
                <!-- </div> -->
                <div class="job">
                    <span>@</span>
                    <p class="company">{{ moment.company }} </p>
                </div>
                <!-- <LinkIcon label="Akuiteo" v-if="moment.url" :url="moment.url" /> -->
            </div>
            <p class="desc">{{ moment.desc }}</p>
            <TimelineListCategory v-if="moment.skills" :items="moment.skills" />
            <div class="categories">
                <TimelineMomentCategory v-if="moment.languages" name="languages" :items="moment.languages" />
                <TimelineMomentCategory v-if="moment.tools" name="tools" :items="moment.tools" />
            </div>
        </div>
        <!-- <div class="momentlink"></div>
        <p class="date">{{ moment.type }}</p> -->
    </div>
</template>

<style scoped>
p,
div {
    line-height: 1.4rem;
}

.moment {
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    width: fit-content;
    max-width: 42rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    display: grid;
    gap: 0;
    grid-template-columns: 6ch 1.5rem auto;

    &:has(.date.now) {
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
    }

    &:last-of-type .dateline {
        top: 0;
        height: 50%;
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
    width: 6ch;

    & p {
        color: var(--color-light);
    }

    &.now {
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
    left: 2.4rem;
    z-index: 0;
}

.momentlink {
    height: 1px;
    width: 3rem;
    min-width: 3rem;
    width: 1.5rem;
    min-width: 1.5rem;
    background-color: var(--bg-darker);
    flex-shrink: 0;
}

.info {
    display: flex;
    flex-flow: column;
    width: 100%;
    border: 1px solid var(--bg-darker);
    border-radius: 0.5rem;
    background-color: var(--bg);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1px solid var(--bg-darker);
    padding: 0.75rem;
}


.role {
    background-color: var(--bg-darker0);
    padding: 0.25rem 0.5rem 0.1rem;
    border-radius: 0.5rem;
}

.job {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    span {
        color: var(--color-light)
    }
}

.company {
    background-color: var(--bg-darker0);
    padding: 0.25rem 0.5rem 0.1rem;
    border-radius: 0.5rem;
}

.desc {
    padding: 1.25rem 1.25rem;
    text-wrap: balance;
}

.categories {
    padding: 0.5rem 0.75rem 0.75rem;
    display: flex;
    flex-flow: column;
    gap: 0rem;
}

/* DARK */
html.dark .moment {

    span,
    .date p {
        color: var(--color);
        opacity: 0.8;
    }

    .date.now p {
        opacity: 1;
    }
}
</style>