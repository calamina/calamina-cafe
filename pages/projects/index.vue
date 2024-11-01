<script setup lang="ts">
import { ref, type Ref } from 'vue';
import web from '@/data/projects/web.json';
import mobile from '@/data/projects/mobile.json';
import type { ProjectModel } from '@/models/project';
import { promiseTimeout } from '@vueuse/core';
import gsap from 'gsap';
import { useImageUtils } from '~/utils/imageUtils';

const webProjects: Ref<ProjectModel[]> = ref(web);
const phoneProjects: Ref<any[]> = ref(mobile);

const webImages = useImageUtils().getImages('web')
const phoneImages = useImageUtils().getImages('phone')

promiseTimeout(800).then(() => {
  const imgs: NodeListOf<HTMLElement> = document.querySelectorAll('img');
  gsap.to(imgs, {
    clipPath: 'polygon(0% 0%, 50% 0%, 100% 0%, 100% 50%, 100% 100%, 50% 100%, 0% 100%, 0% 50%)',
    duration: 0.6,
    stagger: 0.02,
  })
})
</script>

<template>
  <div class="content">
    <div>
      <h2><span class="star">✦</span> web</h2>
      <div id="wrapper" class="img-grid">
        <NuxtLink v-for="project in webProjects" :to="'/projects/' + project.name">
          <img class="img" :src="webImages[project.name]" preload loading="lazy" alt=":(" />
        </NuxtLink>
      </div>
    </div>
    <div>
      <h2><span class="star">✦</span> phone</h2>
      <div class="img-grid img-grid-phone">
        <NuxtLink v-for="project in phoneProjects" :to="'/projects/' + project.name">
          <img class="img" :src="phoneImages[project.name]" preload loading="lazy" alt=":(" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-flow: column;
  padding: 2rem 0;
  gap: 3rem;
  width: 100%;
}

.img-grid {
  // max-width: 70rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;

  &-phone {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

    .img {
      height: 100%;
      object-fit: cover;
      aspect-ratio: 0.45;
    }
  }
}

h2,
span {
  font-size: 1.5rem;
}

span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

a {
  display: block;
}

img {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #c5c5c5;
  aspect-ratio: 1.77;

  clip-path: polygon(50% 50%, 50% 25%, 50% 50%, 75% 50%, 50% 50%, 50% 75%, 50% 50%, 25% 50%);
}

@media (max-width: 1250px) {
  .img-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    max-width: 100%;
  }
}
</style>