<script setup lang="ts">
import type { Project } from '../../models/Project';
import { computed, ref } from 'vue';
import { throttledWatch, useMouse } from '@vueuse/core'

const { projects, type } = defineProps<{
  projects: Project[]
  type: string
}>()

const url = '/projects/' + type + '/'
const selectedProject = ref<string | undefined>(undefined)
const images = Object.entries(
  type === 'web'
    ? import.meta.glob<{ eager: true }>("/src/assets/img/content/projects/web/*.avif")
    : import.meta.glob<{ eager: true }>("/src/assets/img/content/projects/phone/*.avif")
);
const selectedImage = computed(() => images
  .filter((lel) => lel[0].includes(selectedProject.value ?? 'NOT_FOUND')).map(test => test[0])[0])

const { x, y, sourceType } = useMouse()

// const getImg = (name: string) => images
//   .filter((lel) => lel[0].includes(name)).map(test => test[0])[0]

throttledWatch(
  [x, y],
  ([x, y]) => {
    if (!selected.value) return
    const maxX = document.body.getBoundingClientRect().width
    const maxY = document.body.getBoundingClientRect().height
    const width = selected.value.getBoundingClientRect().width
    const height = selected.value.getBoundingClientRect().height

    if (maxX - x > 20 + width) {
      selected.value.style.left = (x + 20).toString() + 'px'
    }
    if (maxY - y > 20 + height) {
      // selected.value.style.top = (y + 20).toString() + 'px'
      selected.value.style.top = (y + 20).toString() + 'px'
    }
  },
  { throttle: 20 },
)

const selected = ref(null as HTMLElement | null);
</script>

<template>
  <div class="wrapper">
    <h2>{{ type }}</h2>
    <div class="projects">
      <a class="project" @mouseover="selectedProject = project.name" @mouseout="selectedProject = undefined"
         v-for="project in projects"
         :href="url + project.name">
        {{ project.name }}
        <!-- <img :src="getImg(project.name)" alt=""> -->
      </a>
    </div>
    <div class="selected" ref="selected">
      <!-- <div v-if="!selectedProject">[Select a project]</div> -->
      <img class="selectedimg" v-if="selectedProject" :key="selectedImage" :src="selectedImage" alt="">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
}

h2 {
  font-size: 3rem;
  line-height: 3rem;
  text-transform: capitalize;
}

.projects {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  // display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.project {
  width: 100%;
  padding: 1.25rem 1rem;
  background-color: var(--bg-darker0);
  border-radius: 0.5rem;
  text-transform: capitalize;
  align-items: center;
  // justify-content: center;

  &:hover {
    background-color: var(--highlight);
  }
}

.selected {
  position: absolute;
  display: flex;
  align-items: start;
  justify-content: start;
  top: 0;
  left: 0;
  max-width: 32rem;
  height: auto;
  transition: top 0.1s, left 0.1s;
  pointer-events: none;
}

.selectedimg {
  width: 100%;
  max-height: 32rem;
  object-fit: contain;
  align-self: flex-start;
  border-radius: 0.5rem;
}
</style>