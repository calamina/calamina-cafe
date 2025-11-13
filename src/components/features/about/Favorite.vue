<script setup lang="ts">
import { ref, type Ref } from 'vue';

const { medias } = defineProps<{
  medias: any
}>();

const sections = medias.map((media: any) => Object.keys(media)[0]);
const active: Ref<string> = ref(sections[0]);
const select = (index: number) => active.value = sections[index];
console.debug(medias)
</script>

<template>
  <div class="favorites">
    <div class="timeline">
      <button v-for="(section, index) in sections" :key="index" @click="select(index)" @focus="select(index)"
        class="moment"
        :class="{ 'active': active === sections[index], 'moment-first': index === 0, 'moment-last': index === section.length - 1 }">
        <div class="time">{{ section }}</div>
        <div class="dot"></div>
        <div class="role">{{ "yoyoyo" }}</div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.favorites {
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
</style>
