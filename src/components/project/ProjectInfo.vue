<script setup lang="ts">
import type { Project } from '../../models/Project';
import LinkIcon from '../LinkIcon.vue';
import ProjectName from './ProjectName.vue';
import ProjectTech from './ProjectTech.vue';


const { name, url = null, tech, description, online } = defineProps<{
  name: string | undefined
  tech: Project["tech"] | undefined
  description: string[] | undefined
  url?: string | undefined
  online?: boolean | undefined
}>()
</script>

<template>
  <div class="info">
    <ProjectName v-if="name" :name />
    <LinkIcon v-if="url" :url="url" :online="online" />
    <div class="description">
      <p v-for="line of description">{{ line }}</p>
    </div>
    <ProjectTech v-if="tech" :tech />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-flow: column;
  gap: 0.25rem;
  height: calc(100vh - 4rem);
  flex: 1;
}

.description {
  padding: 1.5rem 0;
  text-justify: distribute;
  opacity: 1;
  transform: translateX(0);
}

// MEDIA QUERIES
@media (max-width: 1280px) {
  .info {
    height: fit-content;
  }
}

@media (min-width: 1280px) {
  .info {
    grid-column-start: 1;
    grid-column-end: 5;
    position: sticky;
    top: 4rem;
    left: 0;
  }
}
</style>