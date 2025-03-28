<script setup lang='ts'>
import { computed, ref, watch, type Ref } from "vue";
import ProjectsFilters from "./ProjectsFilters.vue";
import ProjectsGrid from "./ProjectsGrid.vue";
import type { ProjectFilters, TypedProject } from "../../models/Types";

const { projects } = defineProps<{
  projects: TypedProject[];
}>()

const filters: Ref<ProjectFilters> = ref({
  sort: "alpha",
  type: "ALL",
  order: "ASC",
})

watch(filters, () => projects)

const filteredProjects = computed(() =>
  projects
    .filter(project => filters.value.type === "ALL" || filters.value.type === project.type)
    .sort((a, b) => {
      if (filters.value.order === "ASC") {
        return a.name > b.name ? 1 : -1
      } else {
        return a.name < b.name ? 1 : -1
      }
    })
    .sort((a, b) => {
      if (filters.value.order === "ASC") {
        return a.type < b.type ? 1 : -1
      } else {
        return a.type > b.type ? 1 : -1
      }
    })
)
</script>

<template>
  <div class="view">
    <ProjectsFilters :length="filteredProjects.length" @update="(newFilters) => filters = newFilters" />
    <ProjectsGrid :projects="filteredProjects" />
  </div>
</template>

<style lang="scss" scoped>
.view {
  width: 100%;
  padding-bottom: 3rem;
}
</style>