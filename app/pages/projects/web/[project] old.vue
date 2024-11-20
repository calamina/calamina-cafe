<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { onKeyStroke } from '@vueuse/core'

definePageMeta({
  middleware: 'routing',
  pageTransition: {
    name: 'appear',
    mode: 'out-in',
  }
})

const route = useRoute()
const project = useWebProjects().project(route.params.project as string)
const { previous, next } = useWebProjects().neighbours(project?.value?.id)

const imgView: Ref<HTMLImageElement | null> = ref(null)
const gallery: Ref<HTMLImageElement[]> = ref([])

onMounted(() => {
  document.scrollingElement!.scrollTop = 0
  gallery.value = Array.from(document.querySelectorAll('.img')) as HTMLImageElement[]
})

onKeyStroke('ArrowLeft', () => {
  if (!imgView.value) {
    previous.value ?
      navigateTo({ params: { project: previous?.value?.name } }) :
      navigateTo({ name: 'projects' })
  }
})

onKeyStroke('ArrowRight', () => {
  if (!imgView.value) {
    next.value ?
      navigateTo({ params: { project: next?.value?.name } }) :
      navigateTo({ name: 'projects' })
  }
})

function focusImage(e: MouseEvent) {
  imgView.value = e.target as HTMLImageElement
}
</script>

<template>
  <div>
    <ContentDoc path="web/atlast">
      <template #not-found>
      </template>
    </ContentDoc>
  </div>
</template>

<!-- <template>
  <div class="project" v-if="project">
    <Teleport to="body">
      <transition name="appear">
        <ImageViewer v-if="imgView" :selected="imgView" :images="gallery" @unfocus="imgView = null" />
      </transition>
    </Teleport>

    <div class="info">
      <div class="title">
        <h1>
          <span class="count">{{ project.id }}/{{ projects.length }}</span>
          {{ project.name }}
        </h1>
        <a class="project-link" :href="project?.link" target="_blank">
          visit
          <Icon name="tabler:link"  />
        </a>
      </div>
      <div class="description">
        <p v-for="section in project.description">{{ section }}</p>
      </div>
      <ProjectTech v-if="project.tech" :data="project.tech" />
    </div>
    <div class="gallery">
      <button title="cover picture" @click="(event: MouseEvent) => focusImage(event)">
        <NuxtImg class="cover lookin img" :src="project.img" alt="project picture" />
      </button>
      <div v-if="project.features?.length" class="features">
        <h2>Features</h2>
        <p v-for="section in project.features">{{ section }}</p>
      </div>
      <div class="gallerita" v-if="project.imgs" :class="{ tata: project.imgs.length < 2 }">
        <button title="gallery picture" v-for="image in project.imgs" @click="(event: MouseEvent) => focusImage(event)">
          <div>
            <NuxtImg class="lookin img" :src="'/img/web/' + project.name + '/' + image" alt=":(" />
          </div>
        </button>
      </div>
    </div>
    <ProjectNavigation :previous="previous" :next="next" />
  </div>
</template> -->

<style lang="scss" scoped>
.project {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 2rem 0;
  width: calc(100vw - 8rem);
  gap: 3rem;
  overflow: auto;
}

.info {
  display: flex;
  flex-flow: column;
  max-width: 50rem;
  width: 50vw;
}

.gallery {
  display: flex;
  flex-flow: column;
  max-width: 70rem;
  width: 100%;
  gap: 1rem;
}

.cover {
  display: block;
  background-color: var(--bg-darker0);
  padding: 1rem;
  width: 100%;
  height: auto;
}

.gallerita {
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(2, auto);

  &.tata {
    grid-template-columns: 1fr;

    img {
      max-height: none;
    }
  }

  div {
    display: flex;
    padding: 1rem;
    background-color: var(--bg-darker0);
    align-items: center;
    justify-content: center;
    object-fit: contain;
    width: 100%;
  }

  img {
    max-height: 35rem;
  }
}

button {
  display: flex;
  background-color: transparent;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  position: relative;

  &:focus,
  &:hover,
  &:active {
    border: 1px solid var(--bg-darkest);

    &:after {
      display: block;
      content: "zoom";
      pointer-events: none;
      position: absolute;
      background-color: var(--bg-darkest);
      color: var(--color-lightest);
      border-left: 1rem solid var(--bg-darker0);
      border-bottom: 1rem solid var(--bg-darker0);
      padding: 0.25rem 2rem;
      top: 1rem;
      right: 1rem;
    }
  }
}

// .features {
//   padding: 2.5rem 0 2rem;

//   h2 {
//     font-size: 1.5rem;
//     padding-bottom: 1rem;
//   }

//   p {
//     padding: 0.5rem 0;

//     &:not(:last-of-type) {
//       border-bottom: 1px solid #c5c5c5;
//     }
//   }
// }

.title {
  display: flex;
  flex-flow: column;
}

.project-link {
  background-color: var(--bg-darker);
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  align-items: center;
  width: fit-content;
}

.description {
  padding: 2.5rem 0 2rem;
  max-width: 40rem;
}

.navigation {
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(2, auto);

  a {
    display: flex;
  }
}

.prev {
  justify-self: flex-start;
}

.next {
  grid-column: 2;
  justify-self: flex-end;
}

.prev,
.next {
  background-color: var(--bg-darker0);
  padding: 1rem;
  justify-content: center;
  transition: padding 0.3s;

  &:hover {
    padding: 1rem 2rem;

    .mini {
      filter: none;
    }
  }
}

.mini {
  width: 150px;
  height: auto;
  filter: grayscale(1);
  transition: filter 0.3s;
}

h1 {
  text-transform: capitalize;
  font-size: 3rem;
}

// MEDIA QUERIES
@media (max-width: 1250px) {
  .project {
    width: 100%;
  }

  .info {
    width: 100%;
  }

  .mini {
    width: 40px;
  }
}
</style>