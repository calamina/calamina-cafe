<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import type { Media } from '@models/Media';
import IconFolder from '@components/icons/IconFolder.vue';
import Icon from '@components/icons/Icon.vue';
import IconFolderOpen from '@components/icons/IconFolderOpen.vue';
import Fave from '@components/features/about/fave.vue';

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
const activeIndex: Ref<number> = ref(0);
// const active: Ref<Favorite> = computed(() => medias[activeIndex.value]);
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
                  :class="{ 'active': subactive.content[0].label === category.content[0].label, 'category-last': indexcateg === media.categories.length - 1 }">
            <div class="time">{{ category.name }}</div>
          </button>
        </div>
      </div>
    </div>
    <div class="details">
      <Fave v-for="favorite in subactive.content" :key="favorite.label" :label="favorite.label" :url="favorite.url"
            :src="favorite.src" />
    </div>
  </div>
</template>

<style scoped>
.favorites {
  /* container-type: inline-size; */
  border: 2px solid var(--bg-darker);
  outline: 2px solid var(--bg-darker0);
  outline-offset: 4px;
  box-shadow: rgba(100, 100, 111, 0.08) 0px 0px 29px 0px;
  height: 30rem;
  display: grid;
  grid-template-columns: 15rem 1fr;
  width: 100%;
  justify-content: center;
  align-items: center;
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
  scroll-padding-top: 5rem;
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
  /* background-color: var(--bg-darker0); */
}

.folder-name {
  width: 100%;
  border-radius: 0.5rem;
  background-color: var(--bg-darker0);
  padding: 0.25rem 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.content {
  display: flex;
  flex-flow: column;
  /* padding: 0.5rem; */
  padding-top: 0;
  gap: 0.25rem;
}

.category {
  position: relative;
  display: flex;
  padding-left: 1rem;
  /* margin-left: 2rem; */
  align-items: center;
  gap: 0.5rem;
  /* background-color: var(--bg-darker0x); */
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  width: 100%;

  &.active {
    background-color: var(--bg-darker0x);
    background-color: var(--highlight);
    color: var(--bg-darker);

    /* &::before {
      content: "";
      display: flex;
      width: 0.5rem;
      height: 0.5rem;
      background-color: var(--highlight);
      border-radius: 50%;
    } */
  }

  /* &::before {
    content: "├──";
    padding-right: 0.25rem;
  } */
}

/* .category-last::before {
  content: "└──"
} */

.details {
  display: flex;
  flex-flow: column;
  height: 100%;
  padding: 1rem;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: var(--scroll-color) transparent;
  scrollbar-gutter: stable;
  scroll-padding-top: 5rem;
  gap: 0.5rem;
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
