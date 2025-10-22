<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import type { Moment } from '../../models/Moment';
import TagList from '../atomic/tag/TagList.vue';
import BaseTag from '../atomic/tag/BaseTag.vue';

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
      </button>
      <button class="moment moment-dim" inert>
        <div class="time">1994</div>
        <div class="dot"></div>
        <div class="role">baby</div>
      </button>
    </div>

    <Transition mode="out-in">
      <div v-if="active" :key="active.start.getTime()" class="details">
        <div class="header">
          <div class="header-section">
            <BaseTag>{{ active.role }}</BaseTag>
            <span> {{ duration }} </span>
          </div>
          <div class="header-section">
            <span>@</span>
            <BaseTag>{{ active.company }} </BaseTag>
          </div>
        </div>
        <div class="description">
          <p>{{ active.desc }}</p>
        </div>
        <div class="details-content">
          <TagList class="skills" :items="active.skills ?? []" />
          <TagList class="tools" name="tools" color="hsl(50, 50%, 77%)" :items="active.tools ?? []" />
          <TagList class="languages" name="languages" color="hsl(144, 50%, 77%)" :items="active.languages ?? []" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.moments {
  display: grid;
  grid-template-columns: auto auto;
  gap: 2.5rem;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.timeline {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  height: fit-content;
  width: fit-content;
  justify-self: flex-end;
}

.moment {
  display: grid;
  grid-template-columns: 6ch auto auto 1fr;
  width: 100%;
  padding: 0;
  grid-column: 1;

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

.dot {
  position: relative;
  height: 1rem;
  width: 1rem;
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
}

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

.details {
  container-type: inline-size;
  border: 2px solid var(--bg-darker);
  outline: 2px solid var(--bg-darker0);
  outline-offset: 4px;
  box-shadow: rgba(100, 100, 111, 0.08) 0px 0px 29px 0px;
  display: flex;
  flex-flow: column;
  gap: 0 1.5rem;
  width: 50vw;
  max-height: 20rem;
  max-width: 50rem;
  border-radius: 0.5rem;
  overflow-y: scroll;
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
  border-bottom: 1px solid var(--bg-darker);
  padding: 0.75rem;
  gap: 0.5rem;
}

.header-section {
  display: flex;
  gap: 0.5rem;
  align-items: center;

  span {
    color: var(--color-light)
  }
}

.description {
  padding: 0 1rem 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--bg-darker);

  p {
    text-wrap: balance;
    max-width: 60ch;
  }
}

.details-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0.75rem;
  gap: 1.5rem;
}

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