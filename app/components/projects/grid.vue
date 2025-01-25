<script setup lang="ts">
import type { Project } from '~/models/project';

const { projects, type } = defineProps<{
  projects: any[]
  type: string
}>()

const routeName = computed(() => type === 'web' ? 'projects-web-project' : 'projects-phone-project')

onMounted(() => {
  console.debug(projects)
})
</script>

<template>
  <div class="tw-w-full tw-items-center tw-flex tw-flex-col tw-gap-4">
    <!-- TODO :: export header ? -->
    <div class="header tw-z-50 tw-sticky tw-top-4">
      <h2 class="tw-flex tw-items-center tw-gap-2">
        <div class="tw-flex tw-items-center tw-gap-2">
          <!-- <span class="star tw-text-3xl tw-h-8 tw-pr-2">✦</span> -->
          <Icon name="tabler:folder" size="1.3rem" />
          {{ type }}
        </div>
        <span class="tw-opacity-60 tw-pl-2">[{{ projects.length }} projects]</span>
      </h2>
    </div>
    <div class="img-grid" :class="{ 'img-grid-phone': type === 'phone' }">
      <highlightButton v-for="project in projects" class="lookin tw-rounded-2xl"
        :to="{ name: routeName, params: { project: project.name } }">
        <!-- <img class="img" :src="project.img" rel="preload" alt=":(" /> -->
        <img class="img" :src="project.mini" rel="preload" alt=":(" />
        <!-- <NuxtImg class="img" :src="project.mini" rel="preload" alt=":(" /> -->
        <div class="info">
          <p>{{ project.name }}</p>
          <p>{{ project.id < 10 ? '0' + project.id : project.id }}</p>
        </div>
      </highlightButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.img-grid {
  position: relative;
  width: 100%;
  // width: 90%;
  // max-width: 70rem;
  display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(510px, 1fr));
  // grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
  gap: 1rem;
  gap: 2rem;
  align-items: center;
  padding: 0 2rem 2rem;
  // padding-bottom: 2rem;

  &-phone {
    // grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    // grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));

    .img {
      aspect-ratio: 0.45;
    }
  }
}

h2 {
  line-height: 1;
}

.header {
  padding: 0.5rem 1rem;
  width: 340px;
  // background-color: var(--bg);
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);

  h2 {
    display: flex;
    justify-content: space-between;
  }
}

a {
  position: relative;
  display: flex;
  flex-flow: column;
  gap: 0;

  .info {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex: 1;
    padding: 0.5rem;
    background-color: var(--bg-lighter);

    p:last-of-type {
      display: inline-block;
      opacity: 0.6;
      text-decoration: none;
    }
  }

  p {
    line-height: 1rem;
  }
}

img {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border: 4px solid var(--bg-lighter);
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  aspect-ratio: 1.77;
  transition: border-color 0.3s;
}

@media (max-width: 1250px) {
  .img-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    max-width: calc(100% - 2rem);
  }

  .header {
    max-width: 100%;
  }
}
</style>