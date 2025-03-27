<script setup lang='ts'>
import type { TypedProject } from "../../models/Types";
import ProjectsGridProject from "./ProjectsGridProject.vue";

const { projects } = defineProps<{
  projects: TypedProject[];
}>()
</script>

<template>
  <div class="projects">
    <Suspense>
      <ProjectsGridProject v-for="project in projects" :key="project.name" :project=project />
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>
.projects {
  display: flex;
  flex-flow: column;
  gap: 1.5rem 1rem;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  width: 100%;
}

// @media (max-width: 1280px) {
//   .projects {
//     gap: 3rem;
//   }
// }</style>
