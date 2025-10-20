<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import type { Moment } from '../models/Moment';
import TimelineMomentCategory from './about/TimelineMomentCategory.vue';
import TimelineListCategory from './about/TimelineListCategory.vue';

const { moments } = defineProps<{ moments: Moment[] }>()
const active: Ref<Moment> = ref(moments[0])

const duration = computed(() => {
  const end = active.value.end ?? new Date()
  const duration = new Date(end.getTime() - active.value.start.getTime());
  const years = duration.getFullYear() === 1970 ? "" : duration.getFullYear() - 1970;
  const months = duration.getMonth() === 0 ? "" : duration.getMonth();
  const yearString = years ? `${years} year${years > 1 ? "s" : ""}` : "";
  const monthString = months ? `${months} month${months > 1 ? "s" : ""}` : "";

  return `${yearString} ${monthString}`
})

const selectMoment = (index: number) => active.value = moments[index];
</script>

<template>
  <div class="moments">
    <div class="timeline">
      <button class="moment moment-dim" inert>
        <div class="time">???</div>
        <div class="dot"></div>
        <div class="role">???</div>
      </button>
      <button v-for="(moment, index) in moments" :key="index" @click="selectMoment(index)" @focus="selectMoment(index)"
        class="moment"
        :class="{ 'active': moment.start === active?.start, 'moment-first': index === 0, 'moment-last': index === moments.length - 1 }">
        <div class="time">{{ moment.start?.getFullYear() }}</div>
        <div class="dot"></div>
        <div class="role">{{ moment.company }}</div>
        <div class="link"></div>
      </button>
      <button class="moment moment-dim" inert>
        <div class="time">1994</div>
        <div class="dot"></div>
        <div class="role">baby</div>
      </button>
    </div>

    <Transition mode="out-in">
      <div v-if="active" :key="active.start.getTime()" class="details">
        <div class="description">
          <div class="header">
            <div class="job">
              <p class="header-block"> {{ active.role }} </p>
              <span> {{ duration }} </span>
            </div>
            <div class="job">
              <span>@</span>
              <p class="header-block">{{ active.company }} </p>
            </div>
          </div>
          <p class="header-text">{{ active.desc }}</p>
        </div>
        <TimelineListCategory class="skills" :items="active.skills ?? []" />
        <TimelineMomentCategory class="tools" name="tools" :items="active.tools ?? []" />
        <TimelineMomentCategory class="languages" name="languages" :items="active.languages ?? []" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.moments {
  display: grid;
  grid-template-columns: repeat(10, minmax(0px, 1fr));
  width: 100%;
  height: fit-content;
}

.timeline {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  height: fit-content;
  grid-column-start: 2;
  grid-column-end: 4;
}

.moment {
  display: grid;
  grid-template-columns: 6ch auto auto 1fr;
  width: 100%;
  padding: 0;
  /* gap: calc(1rem + 4px); */

  &.moment-dim {
    opacity: 0.4;
    z-index: -1;
  }

  &:hover {
    .time {
      background-color: var(--bg-darker);
      border-color: var(--bg-darker);
    }

    &:not(.active) .dot {
      background-color: var(--bg-darker0x);
    }
  }
}

.time {
  position: relative;
  justify-self: flex-end;
  border: 2px solid var(--bg-darker0);
  background-color: var(--bg-darker0);
  border-radius: 0.5rem;
  padding: 0.15rem 0.4rem 0;
  color: var(--color-dim);
  transition: background-color 0.1s ease-out, border-color 0.1s ease-out;

  &:after {
    right: -1rem;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    display: block;
    content: "";
    height: 2px;
    width: 1rem;
    background-color: var(--bg-darker);
  }
}

.active .time {
  background-color: var(--bg-darker);
  border-color: var(--bg-darker);
}

.active .role {
  outline: 2px solid var(--bg-darker0);
  box-shadow: rgba(100, 100, 111, 0.08) 0px 0px 20px 0px;
}

.role {
  outline-offset: 4px;
  position: relative;
  border: 2px solid var(--bg-darker);
  box-shadow: rgba(100, 100, 111, 0) 0px 0px 20px 0px;
  color: var(--color-dim);
  border-radius: 0.5rem;
  padding: 0.15rem 0.6rem 0;
  justify-self: flex-start;
  display: flex;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  outline: 2px solid transparent;
  transition: outline .2s, box-shadow .2s;
  /* overflow: hidden; */

  &:before {
    left: -1rem;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    display: block;
    content: "";
    height: 2px;
    width: 1rem;
    background-color: var(--bg-darker);
    z-index: 4;
  }
}

/* .active .role {
  color: var(--color);
} */

.dot {
  position: relative;
  height: 1rem;
  width: 1rem;
  /* todo :: test diamond */
  border-radius: 50%;
  background-color: var(--bg-darker);
  outline: 2px solid var(--bg-darker);
  outline-offset: 4px;
  margin: 0 calc(1rem + 4px);
  transition: background-color 0.1s ease-out;


  &:after,
  &:before {
    position: absolute;
    display: block;
    content: "";
    height: 1rem;
    width: 2px;
    background-color: var(--bg-darker);
  }

  &:before {
    top: calc(-1rem - 4px);
    left: 50%;
    transform: translateX(-50%);
  }

  &:after {
    bottom: calc(-1rem - 4px);
    left: 50%;
    transform: translateX(-50%);
  }


  /* &:last-of-type::after{} */
}

/* .moment:not(.moment-dim):first-of-type .dot:before { */
.moment-first .dot:before {
  background: linear-gradient(var(--bg-darker0), var(--bg-darker));
}

.moment-last .dot:after {
  background: linear-gradient(var(--bg-darker), var(--bg-darker0));
}

.moment:first-of-type .dot::before,
.moment:last-of-type .dot::after {
  display: none;
}

.active .dot {
  background-color: var(--highlight);
}

.link {
  /* display: none; */
  opacity: 0;
  flex-shrink: 0;
  display: flex;
  height: 2px;
  width: 100%;
  background-color: var(--bg-darker);
  transition: opacity .2s;
  z-index: 4;
}

.active .link {
  transition-delay: 0.1s;
  opacity: 1;
}

.details {
  /* TODO ::: change color */
  /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
  place-self: center;
  border: 2px solid var(--bg-darker);
  outline: 2px solid var(--bg-darker0);
  outline-offset: 4px;
  box-shadow: rgba(100, 100, 111, 0.08) 0px 0px 29px 0px;
  display: grid;
  transform-origin: 00% 50%;
  grid-template-rows: auto auto auto;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 1.5rem;
  grid-column-start: 4;
  grid-column-end: 9;
  width: 100%;
  max-height: 20rem;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-y: scroll;
  /* scrollbar-width: thin; */
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.header-block {
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

.description {
  p {
    text-wrap: balance;
    max-width: 60ch;
  }

  .header-text {
    padding: 0.75rem 0.5rem;
  }
}

.description,
.skills {
  grid-column: span 2;
}

.items {
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;

  p {
    background-color: var(--bg);
    border-radius: 0.25rem;
    padding: 0.15rem 0.5rem;
  }
}

.title {
  font-size: 1.5rem;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.15s ease-out;
}

.v-enter-from {
  opacity: 0.4;
  transform: translateY(-0.25rem);
}

.v-leave-to {
  opacity: 0.2;
  transform: translateY(0.25rem);
}


@media (max-width: 1280px) {
  .content {
    padding: 0 1rem;
  }
}
</style>