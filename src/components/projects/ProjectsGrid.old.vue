<script setup lang="ts">
import type { Project } from '../../models/Project';
import { computed, ref } from 'vue';
import { throttledWatch, useMouse } from '@vueuse/core'
// import IconImg from '../IconImg.vue';
// import ButtonHighlight from '../ButtonHighlight.vue';

const { projects, type } = defineProps<{
  projects: Project[]
  type: string
}>()

const url = '/projects/' + type + '/'
const selectedProject = ref<string | undefined>(undefined)
const images = Object.entries(
  import.meta.glob<{ eager: true }>("/src/assets/img/content/projects/web/*.avif"),
);
const selectedImage = computed(() => images
  .filter((lel) => lel[0].includes(selectedProject.value ?? 'NOT_FOUND')).map(test => test[0])[0])

const { x, y, sourceType } = useMouse()

const getImg = (name: string) => images
  .filter((lel) => lel[0].includes(name)).map(test => test[0])[0]

throttledWatch(
  [x, y],
  ([x, y]) => {
    if (!selected.value) return
    const maxX = document.body.getBoundingClientRect().width
    const maxY = document.body.getBoundingClientRect().height
    const width = selected.value.getBoundingClientRect().width
    const height = selected.value.getBoundingClientRect().height

    if (maxX - x > 20 + width) {
      selected.value.style.left = (x + 20).toString() + 'px'
    }
    if (maxY - y > 20 + height) {
      selected.value.style.top = (y + 20).toString() + 'px'
    }
  },
  { throttle: 20 },
)

const selected = ref(null as HTMLElement | null);
</script>

<template>
  <div class="wrapper">
    <h2>{{ type }}</h2>
    <div class="projects">
      <a class="project" @mouseover="selectedProject = project.name" @mouseout="selectedProject = undefined"
         v-for="project in projects"
         :href="url + project.name">
        {{ project.name }}
        <!-- <img :src="getImg(project.name)" alt=""> -->
      </a>
    </div>
    <div class="selected" ref="selected">
      <img class="selectedimg" :key="selectedImage" :src="selectedImage" alt="">
    </div>
    <!-- <div class="img-grid" :class="{ 'img-grid-phone': type === 'phone' }">
      <div :id="type" class="header">
        <h2 class="tw-flex tw-items-center tw-gap-2">
          <div class="tw-flex tw-items-center tw-gap-2">
            <IconImg name="tabler:folder" />
            {{ type }}
          </div>
          <span class="tw-opacity-60 tw-pl-2">[{{ projects?.length }} projects]</span>
        </h2>
      </div>
      <ButtonHighlight v-for="project in projects" :id="project.name" class="lookin tw-rounded-2xl"
                       :href="url + project.name">
        <img class="img" :src="(project.description as any)" rel="preload" alt=":(" />
        <div class="info">
          <p>{{ project.name }}</p>
          <p>{{ project.num < 10 ? '0' + project?.num : project?.num }}</p>
        </div>
      </ButtonHighlight>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
}

h2 {
  font-size: 3rem;
  line-height: 3rem;
  text-transform: capitalize;
}

.projects {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  // padding-right: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.project {
  // font-size: 1.5rem;
  // line-height: 1.5rem;
  // font-size: 3rem;
  // line-height: 3rem;
  // font-size: 5rem;
  // line-height: 5rem;
  width: 100%;
  padding: 1rem;
  background-color: var(--bg-darker0);
  border-radius: 0.5rem;
  text-transform: capitalize;

  &:hover {
    background-color: var(--highlight);
  }
}

.selected {
  position: absolute;
  top: 0;
  left: 0;
  height: 20rem;
  width: 32rem;
  // background-color: var(--bg-darker0);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: top 0.1s, left 0.1s;
  // height: calc(100vh - 6rem);
}

.selectedimg {
  height: 100%;
  // object-fit: contain;
  object-fit: cover;
}

// .img-grid {
//   position: relative;
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
//   // grid-template-columns: repeat(auto-fill, minmax(510px, 1fr));
//   grid-auto-rows: auto;
//   gap: 1rem;
//   align-items: center;
//   // TODO : fix stupid brackets making this padding required
//   padding: 0 0.5rem;
//   // grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
//   // grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));

//   &-phone {
//     grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
//     // grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
//     // grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));

//     .img {
//       aspect-ratio: 0.45;
//     }
//   }
// }

// h2 {
//   line-height: 1;
// }

// .header {
//   padding: 0.5rem;
//   border-radius: 0.5rem;
//   background-color: var(--bg-darker);
//   text-align: left;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// a {
//   position: relative;
//   display: flex;
//   flex-flow: column;
//   gap: 0;

//   .info {
//     border-bottom-left-radius: 0.5rem;
//     border-bottom-right-radius: 0.5rem;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     width: 100%;
//     flex: 1;
//     padding: 0.5rem;
//     background-color: var(--bg-lighter);

//     p:last-of-type {
//       display: inline-block;
//       opacity: 0.6;
//       text-decoration: none;
//     }
//   }

//   p {
//     line-height: 1rem;
//   }
// }

// img {
//   display: flex;
//   width: 100%;
//   align-items: center;
//   justify-content: center;
//   border-top-left-radius: 0.5rem;
//   border-top-right-radius: 0.5rem;
//   aspect-ratio: 1.77;
//   transition: border-color 0.3s;
// }

// @media (max-width: 1280px) {
//   .img-grid {
//     grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
//     max-width: calc(100% - 2rem);
//   }

//   .header {
//     max-width: 100%;
//   }
// }</style>