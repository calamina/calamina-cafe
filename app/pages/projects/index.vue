<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content';
// definePageMeta({
//   pageTransition: transitionConfig,
// });
definePageMeta({
  middleware: 'routing',
  pageTransition: {
    name: 'appear',
    mode: 'out-in',
  }
})

const weblist: QueryBuilderParams = { 
  path: `/${WEB}`, 
  }
  const phonelist: QueryBuilderParams = { 
  path: `/${PHONE}`, 
}

</script>

<template>
  <div class="content">
    <ContentList :query="weblist" v-slot="{ list }">
      <ProjectsGrid :projects="list" :type="WEB" />
    </ContentList>
    <ContentList :query="phonelist" v-slot="{ list }">
      <ProjectsGrid :projects="list" :type="PHONE" />
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