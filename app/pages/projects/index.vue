<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content';

definePageMeta({
  middleware: 'routing',
  pageTransition: transitionConfig,
});

const weblist: QueryBuilderParams = {
  path: `/${WEB}`,
}
const phonelist: QueryBuilderParams = {
  path: `/${PHONE}`,
}
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4 tw-w-full">
    <ContentList :query="weblist" v-slot="{ list }">
      <ProjectsGrid :projects="list" :type="WEB" />
    </ContentList>
    <ContentList :query="phonelist" v-slot="{ list }">
      <ProjectsGrid :projects="list" :type="PHONE" />
    </ContentList>
  </div>
</template>