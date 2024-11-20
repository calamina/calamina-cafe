<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content';

definePageMeta({
  pageTransition: transitionConfig,
});

const query: QueryBuilderParams = { 
  path: '/web', 
  // sort: [{ id: 1 }] 
}

// const webProjects = useWebProjects().data
// const phoneProjects = usePhoneProjects().data
</script>

<template>
  <div class="content">
    <!-- <ProjectsGrid v-if="webProjects" :projects="webProjects" type="web"></ProjectsGrid> -->
    <!-- <ProjectsGrid v-if="phoneProjects" :projects="phoneProjects" type="phone" :vertical="true"></ProjectsGrid> -->
    <ContentList :query v-slot="{ list }">
      <ProjectsGrid :projects="list" type="web" />
    </ContentList>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-flow: column;
  gap: 2rem;
  width: 100%;
}

h1 {
  text-transform: capitalize;
  font-size: 3rem;
}
</style>