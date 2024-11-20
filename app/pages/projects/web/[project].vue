<script setup lang="ts">

definePageMeta({
  middleware: 'routing',
  pageTransition: {
    name: 'appear',
    mode: 'out-in',
  }
})

const { project } = useRoute().params
const path = `web/${project}`

onMounted(() => document.scrollingElement!.scrollTop = 0)
</script>

<template>
  <div>
    <ContentDoc :path class="mdcontent">
      <template #not-found>
      </template>
    </ContentDoc>
    <ProjectNavigationAlt :path />
  </div>
</template>

<style lang="scss">
.mdcontent {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 3rem;
  padding: 3rem 0;
}
</style>