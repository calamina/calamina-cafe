<script setup lang='ts'>
import { computed, ref, watch, type Ref } from "vue";
import type { TypedProject } from "../../models/Types";
import ProjectsGrid from "./ProjectsGrid.vue";
// import ProjectsFilters from "./ProjectsFilters.vue";
// import type { ProjectFilters, TypedProject } from "../../models/Types";

const { projects } = defineProps<{
  projects: TypedProject[];
}>()

// const filters: Ref<ProjectFilters> = ref({
//   // sort: "date",
//   type: "ALL",
//   order: "ASC",
// })

// watch(filters, () => projects)

// const filteredProjects = computed(() =>
//   projects.filter(project => filters.value.type === "ALL" || filters.value.type === project.type)
// )
</script>

<template>
  <div class="view">
    <!-- <ProjectsFilters :length="filteredProjects.length" @update="(newFilters) => filters = newFilters" /> -->
    <ProjectsGrid :projects="projects" />
    <!-- <ProjectsGrid :projects="filteredProjects" /> -->
  </div>
</template>

<style scoped>
.view {
  width: 100%;
  padding-bottom: 3rem;
}
</style>