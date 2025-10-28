<script setup lang='ts'>
import type { TypedProject } from '../../models/Types';
import { ProjectType } from '../../utils/enum';
import { getImage } from '../../utils/images';
import { useTimeAgo } from '@vueuse/core';
import Icon from '../Icon.vue';
import IconUpdate from '../Icons/IconUpdate.vue';
import BaseTag from '../atomic/tag/BaseTag.vue';

const { project, fit = "contain" } = defineProps<{
  project: TypedProject,
  fit: "cover" | "contain"
}>()

const url = "/projects/" + project.type.toLowerCase() + "/";
const image = await getImage(project.name, project.type)
</script>

<template>
  <a class="project" :href="url + project.name">
    <img :src="image.default.src" :alt="`${project.name} cover`" :style="{ objectFit: fit }">
    <div class="info">
      <div class="info-header">
        <BaseTag class="name" pad0> {{ project.name }} </BaseTag>
        <div class="info-data">
          <p class="date" v-if="project.updated_at || project.created_at">
            <Icon :icon="IconUpdate" size="0.9rem" />
            {{ useTimeAgo(project.updated_at || project.created_at || 0) }}
          </p>
          <BaseTag pad0 v-if="project.type === ProjectType.WEB" class="status" :class="{ 'online': project.homepage }">
            <p> {{ project.homepage ? "online" : "offline" }} </p>
            <div class="status-indicator" inert :class="{ 'online': project.homepage }" />
          </BaseTag>
        </div>
      </div>
    </div>
  </a>
</template>
<style scoped>
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
      color: var(--color-hover);
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
  width: 100%;
}

.info-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.info-data {
  display: flex;
  gap: 0.5rem;
}

.date {
  padding: 0 0.75rem;
  display: flex;
  border-radius: 0.5rem;
  gap: 0.5rem;
  opacity: 0.5;
  align-items: center;
  text-transform: lowercase;
}

.status &:not(.online) p {
  color: var(--color-light);
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
