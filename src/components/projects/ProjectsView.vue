<script setup lang='ts'>
import { computed, ref, type Ref } from "vue";
import { ProjectType } from "../../utils/enum";
import ProjectsFilters from "./ProjectsFilters.vue";
import ProjectsGrid from "./ProjectsGrid.vue";
import type { ProjectFilters, TypedProject } from "../../models/Types";

const { projects } = defineProps<{
  projects: TypedProject[];
}>()

const filters: Ref<ProjectFilters> = ref({
  sort: "alpha",
  order: "asc",
  type: "ALL",
  weboffline: true,
})

const filteredProjects = computed(() =>
  projects
    .filter(project => filters.value.type === "ALL" || filters.value.type === project.type)
    // .filter(project => project.type === ProjectType.WEB && !filters.value.weboffline ? project.online : project)
    .sort((a, b) => {
      if (filters.value.sort === "alpha") {
        return filters.value.order === "asc" ? -1 : 1
      }
      return 1
      // else {
      //   return filters.value.order === "asc"
      //     ? (a.created ?? 0) < (b.created ?? 0) ? -1 : 1
      //     : (a.created ?? 0) > (b.created ?? 0) ? -1 : 1
      // }
    })
)
</script>

<template>
  <div class="view">
    <ProjectsFilters @update="(newFilters) => filters = newFilters" />
    <ProjectsGrid :projects="filteredProjects" />
  </div>
</template>

<style lang="scss" scoped>
.view {
  width: 100%;
}
</style>