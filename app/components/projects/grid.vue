<script setup lang="ts">
import type { PhoneCollectionItem, WebCollectionItem } from '@nuxt/content';
const { projects, type } = defineProps<{
  projects: WebCollectionItem[] | PhoneCollectionItem[] | null
  type: string
}>()
</script>

<template>
  <div class="tw-w-full tw-items-center tw-flex tw-flex-col tw-gap-4">
    <div class="img-grid" :class="{ 'img-grid-phone': type === 'phone' }">
      <div :id="type" class="header tw-z-20" :class="{ 'header-phone': type === 'phone' }">
        <h2 class="tw-flex tw-items-center tw-gap-2">
          <div class="tw-flex tw-items-center tw-gap-2">
            <Icon name="tabler:folder" size="1.3rem" />
            {{ type }}
          </div>
          <span class="tw-opacity-60 tw-pl-2">[{{ projects?.length }} projects]</span>
        </h2>
      </div>
      <highlightButton v-for="project in projects" id="project" class="lookin tw-rounded-2xl"
        :to="project.path">
        <img class="img" :src="(project.mini as any)" rel="preload" alt=":(" />
        <div class="info">
          <p>{{ project.name }}</p>
          <p>{{ project.num < 10 ? '0' + project?.num : project?.num }}</p>
        </div>
      </highlightButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.img-grid {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(510px, 1fr));
  grid-auto-rows: auto;
  gap: 1rem;
  align-items: center;
  // TODO : fix stupid brackets making this padding required
  padding: 0 0.5rem;
  // grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  // grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));

  &-phone {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    // grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    // grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));

    .img {
      aspect-ratio: 0.45;
    }
  }
}

h2 {
  line-height: 1;
}

.header {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--bg-darker);
  text-align: left;
  width: 100%;
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
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
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  aspect-ratio: 1.77;
  transition: border-color 0.3s;
}

@media (max-width: 1280px) {
  .img-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    max-width: calc(100% - 2rem);
  }

  .header {
    max-width: 100%;
  }
}
</style>