<script setup lang="ts">
import LinkImageLabel from "../LinkImageLabel.vue";
import { ref } from "vue";

type MediaList = {
  title: string;
  medias: {
    id: string;
    url: string;
    label: string;
    src: string;
    type?: string | undefined;
  }[];
  toggled?: boolean | undefined;
  size?: "large" | "full" | undefined;
}

const { medias, title, size, toggled } = defineProps<MediaList>();
const active = ref(toggled ?? false)
const toggle = () => active.value = !active.value
</script>

<template>
  <div class="wrapper" :class="{ large: size === 'large', full: size === 'full' }">
    <button class="header" @click="toggle()">
      <h3>{{ title }}</h3>
      <div class="action">
        <!-- <button @click="toggle()">toggle</button> -->
        <span>{{ medias.length }}</span>
      </div>
    </button>
    <div class="medias" :class="{ 'active': active }">
      <LinkImageLabel v-for="media in medias" :url="media.url" :label="media.label">
        <img :src="media.src" :alt="media.label + 'cover'" width=50 height=50>
      </LinkImageLabel>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-flow: column;
  background-color: var(--bg);
  border-radius: 0.5rem;

  @media (max-width: 1280px) {
    grid-column: span 3;
  }
}

.medias {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  /* padding-top: 0; */
  overflow: hidden;
  transition: max-height 0.2s, padding 0.2s;

  @media (max-width: 1280px) {
    max-height: 0;
    padding: 0 0.5rem;
  }

  &.active {
    @media (max-width: 1280px) {
      max-height: 40rem;
      padding: 0.5rem;
      /* padding-top: 0; */
    }
  }
}

.large {
  grid-column: span 2;

  .medias {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 1280px) {
    grid-column: span 3;

    .medias {
      grid-template-columns: 1fr;
    }
  }
}

.full {
  grid-column: span 3;

  .medias {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));

    @media (max-width: 1280px) {
      grid-column: span 3;

      .medias {
        grid-template-columns: 1fr;
      }
    }
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--bg-darker);
  padding: 0.5rem;
  gap: 0.5rem;
  transition: border-bottom 0.2s;
  border-bottom: 0px solid transparent;
  background-color: transparent;
  cursor: default;

  &:hover {
    background-color: transparent;
  }

  @media (max-width: 1280px) {
    cursor: pointer;

    &:hover {
      background-color: var(--bg-darker0);
    }
  }

  /* 
  @media (max-width: 1280px) {
    border-bottom: 0px solid transparent;
  } */
}

.action {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

button {
  background-color: var(--bg-darker0);
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: var(--highlight);
    color: var(--color-hover);
  }

  @media (min-width: 1280px) {
    display: none;
  }
}

span {
  display: flex;
  align-items: center;
  height: 100%;
  width: 4ch;
  justify-content: end;
  padding: 0 0.5rem;
  color: var(--color-light);
}

h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--bg-darker0);

  &::before {
    content: "";
    display: block;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background-color: var(--highlight);
  }
}

img {
  border-radius: 0.5rem;
  object-fit: cover;
  height: 2.5rem;
  width: 2.5rem;
  flex-shrink: 0;
}
</style>
