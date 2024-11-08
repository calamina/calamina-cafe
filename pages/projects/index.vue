<script setup lang="ts">
import { ref, type Ref } from 'vue';
import web from '@/data/projects/web.json';
import mobile from '@/data/projects/mobile.json';
import type { ProjectModel } from '@/models/project';

definePageMeta({
  pageTransition: transitionConfig,
});

const webProjects: Ref<ProjectModel[]> = ref(web);
const phoneProjects: Ref<any[]> = ref(mobile);

const { getImages } = useImageUtils()
const webImages = getImages('web')
const phoneImages = getImages('phone')
</script>

<template>
  <div class="content">
    <div class="wrapper">
      <div class="header">
        <h2>web</h2>
        <span>[ {{ web.length }} projects ]</span>
      </div>
      <div class="img-grid">
        <NuxtLink v-for="project in webProjects" :to="{ name: 'projects-project', params: { project: project.name } }"
          @click="(event) => event.preventDefault">
          <SelectBrackets />
          <img class="img" :src="webImages[project.name]" preload loading="lazy" alt=":(" />
          <div class="info">
            <p>{{ project.name }}</p>
            <p>{{ project.id < 10 ? '0' + project.id : project.id }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="wrapper">
      <div class="header">
        <h2>phone</h2>
        <span>[{{ mobile.length }} projects]</span>
      </div>
      <div class="img-grid img-grid-phone">
        <NuxtLink v-for="project in phoneProjects" :to="{ name: 'projects-mobile', params: { mobile: project.name } }">
          <SelectBrackets />
          <img class="img" :src="phoneImages[project.name]" preload loading="lazy" alt=":(" />
          <p>/{{ project.name }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-flow: column;
  // gap: 3rem;
  gap: 2rem;
  width: 100%;
}

.wrapper {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 1rem;
}

.img-grid {
  position: relative;
  width: 100%;
  max-width: 70rem;
  display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  align-items: center;

  &-phone {
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));

    .img {
      aspect-ratio: 0.45;
    }
  }
}

h2 {
  font-size: 1.5rem;
  font-size: 6rem;
  line-height: 6.5rem;
}

.header {
  width: 100%;
  max-width: 70rem;
  // display: flex;
}

// Maybe add inner element so that mask dosen't scale aswell
a {
  position: relative;
  display: flex;
  flex-flow: column;
  gap: 0;
  padding: 0.5rem;
  width: 100%;
  height: 100%;

  &:focus {
    outline: none;

    .wrapper {
      opacity: 1;
      transform: scale(1);
    }
  }

  &:hover {
    cursor: url("~/assets/img/svg/EyeIn.svg") 16 16, pointer;

    .wrapper {
      opacity: 1;
      transform: scale(1);
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex: 1;
    padding: 0.5rem;
    background-color: #fff;

    p:last-of-type {
      display: inline-block;
      opacity: 0.5;
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
  border: 4px solid #fff;
  // border: 4px solid transparent;
  aspect-ratio: 1.77;
  transition: border-color 0.3s;
}

@media (max-width: 1250px) {
  .img-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    max-width: 100%;
  }
}
</style>