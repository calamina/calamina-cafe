<script setup lang="ts">
import type { Project } from '../../models/Project';
import { computed } from 'vue';
import IconImg from '../IconImg.vue';
import { ProjectsFilters } from '../../stores/projectsFilters';
import { useStore } from '@nanostores/vue';
import type { GetImageResult } from 'astro';

const { projects, type } = defineProps<{
  projects: Project[]
  type: string
}>()

const url = '/projects/' + type + '/'
const imgs = Object.entries(
  type === 'web'
    ? import.meta.glob<{ eager: true }>("/src/assets/img/content/projects/web/*.avif")
    : import.meta.glob<{ eager: true }>("/src/assets/img/content/projects/phone/*.avif")
);

const getImg = (name: string) => imgs
  .filter((lel) => lel[0].includes(name)).map(test => test[0])[0]

const filters = useStore(ProjectsFilters)
const filterType = type + 'Active' as 'webActive' | 'phoneActive'

const filteredProjects = computed(() =>
  projects
    .filter(project => filters.value.offline ? project :
      (project.online === undefined || project.online === true))
    .sort((a, b): number => {
      if (filters.value.sort === 'date') {
        return ((a?.updated?.getTime() ?? a?.created?.getTime()) ?? 0) - ((b?.updated?.getTime() ?? b?.created?.getTime()) ?? 0)
      }
      if (filters.value.sort === 'alpha') {
        return a?.name.toUpperCase() > b?.name.toUpperCase() ? 1 : 0
      }
      return 1
    }))

</script>

<template>
  <div
    class="wrapper"
    v-if="filters[filterType]"
  >
    <!-- <h2>{{ type }}</h2> -->
    <div class="projects">
      <a
        class="project"
        v-for="project in filteredProjects"
        :href="url + project.name"
      >
        <img
          class="projectImg"
          :src="getImg(project.name)"
          alt=""
        >
        <div class="tags">
          <p
            class="tag"
            v-for="tag of project.tech?.tools"
          >{{ tag }}</p>
        </div>
        <div class="info">
          <p class="name">
            {{ project.name }}
            <span
              v-if="project.online !== undefined"
              class="status"
              :class="{ 'online': project.online }"
            ></span>
          </p>
          <button>
            <IconImg
              class="iconImg"
              name="tabler:dots-diagonal"
            />
          </button>
        </div>
      </a>
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
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  // grid-template-columns: 1fr 1fr;
  // grid-template-columns: 1fr;

  // &:hover>:not(:hover) {
  // TODO:: test ideas !!
  // opacity: 0.2;
  // filter: grayscale(1);
  // }
}

.project {
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 0.25rem;
  overflow: hidden;
  border-radius: 0.5rem;
  // padding: 1.25rem 1rem;
  // border-radius: 0.5rem;
  text-transform: capitalize;
  align-items: start;
  // justify-content: center;
  transition: opacity 0.9s ease-in-out, filter 0.9s ease-in-out;

  &:hover {
    background-color: inherit;
    transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out;


    button {
      background-color: var(--highlight);
    }

    .iconImg {
      // transform: rotate(180deg);
      animation: helico 0.3s infinite;
    }
  }
}

@keyframes helico {
  0% {
    transform: rotate(0);
  }

  33% {
    transform: rotate(180deg);
  }

  66% {
    transform: rotate(0);
  }
}

.projectImg {
  max-height: 15rem;
  width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  object-fit: contain;
  background-color: var(--bg-darker0);
  flex: 1;
  overflow: hidden;
}

.info {
  width: 100%;
  display: flex;
  gap: 0.25rem;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  width: 2.5rem;
  height: auto;
  background-color: var(--bg-darker0);
}

.iconImg {
  transition: transform 0.3s;
}

.name {
  padding: 0.25rem 0.5rem;
  display: block;
  width: 100%;
  background-color: var(--bg-darker0);
  border-radius: 0.5rem;
  position: relative;
}

.tags {
  display: flex;
  display: none;
  right: 0;
  background-color: var(--bg-darker0);
  border-radius: 0.5rem;
}

.data {
  width: 100%;
  display: flex;
  align-items: end;
  gap: 0.25rem;
}

.test {
  // background-color: var(--bg-darker0);
  width: 100%;
  // height: 0.25rem;
  border-radius: 0.5rem;
}

.status {
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--bg-darker);

  &.online {
    background-color: var(--highlight);
  }
}
</style>