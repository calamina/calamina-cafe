<script setup lang='ts'>
import type { TypedProject } from "../../models/Types";
import ProjectsGridProject from "./ProjectsGridProject.vue";

const { projects } = defineProps<{
  projects: TypedProject[];
}>()
</script>

<template>
  <div class="projects">
    <Suspense v-for="project in projects">
      <ProjectsGridProject :key="project.name" :project=project />
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>
.projects {
  display: flex;
  flex-flow: column;
  gap: 2.5rem 2rem;
  // align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  width: 100%;
}

@media (max-width: 1280px) {
  .projects {
    grid-template-columns: 1fr;
  }
}
</style>
