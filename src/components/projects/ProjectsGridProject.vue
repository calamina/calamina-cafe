<script setup lang='ts'>
import type { TypedProject } from '../../models/Types';
import { ProjectType } from '../../utils/enum';
import { getImage } from '../../utils/images';

const { project } = defineProps<{
  project: TypedProject
}>()

const url = "/projects/" + project.type.toLowerCase() + "/";
const lel = await getImage(project.name, project.type)
</script>

<template>
  <a class="project" :href="url + project.name">
    <img :src="lel.default.src" :alt="`${project.name} cover`">
    <div class="info">
      <p class="name"> {{ project.name }} </p>
      <!-- <p class="status">{{ project.type.toLowerCase() }}</p> -->
      <div v-if="project.type === ProjectType.WEB" class="status" :class="{ 'online': project.online }">
        <p> {{ project.online ? "online" : "offline" }} </p>
        <div class="status-indicator" inert :class="{ 'online': project.online }" />
      </div>
    </div>
  </a>
</template>
<style lang="scss" scoped>
.project {
  position: relative;
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  text-transform: capitalize;
  align-items: start;
  width: fit-content;
  transition: width 0.3s;
  width: 100%;

  &:hover {
    background-color: transparent;

    & .name {
      background-color: var(--highlight);
    }
  }
}

img {
  height: 12rem;
  width: auto;
  width: 100%;
  border-radius: 0.5rem;
  object-fit: contain;
  background-color: var(--bg-darker0);
}


.info {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-flow: column;
}

.name {
  // line-height: 1rem;
  padding: 0 0.75rem;
  border-radius: 0.5rem;
  // font-size: 1.5rem;
  // line-height: 2rem;
  background-color: var(--bg-darker0);
  transition: padding 0.25s;
}

.status {
  padding: 0 0.75rem;
  display: flex;
  border-radius: 0.5rem;
  gap: 0.5rem;
  // opacity: 0.6;
  align-items: center;
  background-color: var(--bg-darker0);

  &:not(.online) p {
    color: var(--color-light);
  }
}

.status-indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--bg-darker);

  &.online {
    background-color: var(--highlight);
  }
}

@media (max-width: 1280px) {
  .project {
    width: 100%;
    gap: 0.5rem;
  }
}
</style>
