<script setup lang="ts">
definePageMeta({
  pageTransition: transitionConfig,
});

const webProjects = useWebProjects().data
const phoneProjects = usePhoneProjects().data
</script>

<template>
  <div class="content">    
    <ProjectsGrid v-if="webProjects" :projects="webProjects" type="web"></ProjectsGrid>
    <ProjectsGrid v-if="phoneProjects" :projects="phoneProjects" type="phone" :vertical="true"></ProjectsGrid>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-flow: column;
  gap: 2rem;
  width: 100%;
}
</style>