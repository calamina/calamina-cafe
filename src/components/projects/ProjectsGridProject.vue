<script setup lang='ts'>
import type { Project } from '../../models/Project';
import { ProjectType } from '../../utils/enum';
// import Icon from '../Icon.vue';
// import IconDotsDiagonal from '../Icons/IconDotsDiagonal.vue';

const { project, type } = defineProps<{
  project: Project
  type: string
}>()

const url = "/projects/" + type.toLowerCase() + "/";
</script>

<template>
  <a class="project" :href="url + project.name">
    <p class="name">
      {{ project.name }}
    </p>
    <slot></slot>
    <div class="info">
      <p class="status">{{ type.toLowerCase() }}</p>
      <div v-if="type === ProjectType.WEB" class="status">
        <p>
          {{ project.online ? "online" : "offline" }}
        </p>
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
  width: 40vw;

  &:hover {
    background-color: transparent;
  }
}

.info {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.name {
  line-height: 1rem;
}

.status {
  padding: 0 0.75rem;
  display: flex;
  border-radius: 0.5rem;
  gap: 0.5rem;
  align-items: center;
  background-color: var(--bg-darker0);
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
