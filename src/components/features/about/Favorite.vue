<script setup lang="ts">
import Icon from '@components/icons/Icon.vue';
import IconFolder from '@components/icons/IconFolder.vue';
import IconFolderOpen from '@components/icons/IconFolderOpen.vue';
import type { Media } from '@models/Media';
import { ref, type Ref } from 'vue';
// import Fave from './fave.astro';

interface Favorite {
  name: string;
  categories: { name: string; content: Media[] }[];
}

const { medias } = defineProps<{
  medias: Favorite[]
}>();

const folders = ref([
  { open: true },
  { open: false },
  { open: false },
  { open: false },
])

const subactive: Ref<{ name: string; content: Media[] }> = ref(medias[0].categories[0]);
const subselect = (index: number, indexcateg: number) => subactive.value = medias[index].categories[indexcateg];

const toggleFolder = (index: number) => {
  folders.value[index].open = !folders.value[index].open
};
</script>

<template>
  <div class="favorites">
    <div class="tree">
      <div v-for="(media, index) in medias" :key="media.name" class="folder">
        <button class="folder-name" @click="toggleFolder(index)">
          <Icon :icon="folders[index].open ? IconFolderOpen : IconFolder" />
          <p>{{ media.name }}</p>
        </button>
        <div class="content" v-if="folders[index].open">
          <button v-for="(category, indexcateg) in media.categories" :key="category.name"
            @click="subselect(index, indexcateg)" @focus="subselect(index, indexcateg)" class="category"
            :class="{ 'active': subactive.content[0].label === category.content[0].label }">
            <div class="time">{{ category.name }}</div>
          </button>
        </div>
      </div>
    </div>
    <div class="details">
      <Transition mode="out-in">
        <div class="list" :key="subactive.content[0].label">
          <!-- <Fave v-for="favorite in subactive.content" :key="favorite.label" :label="favorite.label" :url="favorite.url"
            :src="favorite.src" /> -->
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.favorites {
  border: 2px solid var(--bg-darker);
  outline: 2px solid var(--bg-darker0);
  outline-offset: 4px;
  box-shadow: rgba(100, 100, 111, 0.08) 0px 0px 29px 0px;
  height: 24rem;
  display: grid;
  grid-template-columns: 15rem 1fr;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 70vw;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.tree {
  padding: 1rem;
  padding-right: 0.75rem;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: var(--scroll-color) transparent;
  scrollbar-gutter: stable;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  border-right: 1px solid var(--bg-darker);
}

.folder {
  width: fit-content;
  display: flex;
  flex-flow: column;
  gap: 0.25rem;
  width: 100%;
  border-radius: 0.5rem;
}

.folder-name {
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.15rem 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &:hover {
    background-color: var(--bg-darker0);
  }
}

.content {
  position: relative;
  display: flex;
  flex-flow: column;
  /* padding: 0.5rem; */
  padding-top: 0;
  gap: 0.25rem;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0.9rem;
    width: 1px;
    background-color: var(--bg-darker);
    z-index: 2;
  }
}

.category {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.15rem 0.5rem;
  padding-left: 2rem;
  border-radius: 0.5rem;
  width: 100%;

  &:hover {
    background-color: var(--bg-darker0);
  }

  &::before {
    position: absolute;
    content: "";
    display: flex;
    left: calc(0.9rem - 1px);
    left: calc(0.9rem);
    width: 3px;
    width: 1px;
    height: 100%;
    z-index: 3;
    background-color: transparent;
    transition: background-color 0.12s;
  }

  &.active {
    background-color: var(--bg-darker0);

    &::before {
      background-color: var(--color-light);
    }
  }
}

.details {
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: var(--scroll-color) transparent;
  scrollbar-gutter: stable;
  flex: 1;
  width: 100%;
}

.list {
  padding: 0.75rem;
  gap: 1.5rem;
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
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
</style>
