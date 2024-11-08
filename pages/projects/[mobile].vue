<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { onKeyStroke } from '@vueuse/core'
import ProjectData from '@/components/project/projectData.vue';

const route = useRoute()

const project = usePhoneProjects().project(route.params.mobile as string)
const { previous, next } = usePhoneProjects().neighbours(project?.value?.id)

const imgView: Ref<HTMLImageElement | null> = ref(null)
const gallery: Ref<HTMLImageElement[]> = ref([])

onMounted(() => {
  document.scrollingElement!.scrollTop = 0
  gallery.value = Array.from(document.querySelectorAll('.img')) as HTMLImageElement[]
})

onKeyStroke('ArrowLeft', () => {
  if (!imgView.value) {
    previous ?
      navigateTo({ params: { mobile: previous?.value?.name } }) :
      navigateTo({ name: 'projects' })
  }
})

onKeyStroke('ArrowRight', () => {
  if (!imgView.value) {
    next ?
      navigateTo({ params: { mobile: next?.value?.name } }) :
      navigateTo({ name: 'projects' })
  }
})

function focusImage(e: MouseEvent) {
  imgView.value = e.target as HTMLImageElement
}

const { getCoverAndImages } = useImageUtils()
const images = getCoverAndImages(project?.value?.name)
</script>

<template>
  <div class="project" v-if="project">
    <Teleport to="body">
      <transition name="appear">
        <ImageViewer v-if="imgView" :selected="imgView" :images="gallery" @unfocus="imgView = null" />
      </transition>
    </Teleport>

    <div class="info">
      <div class="title">
        <h1>
          <!-- <span class="count">{{ project.id }}/{{ projects.length }}</span> -->
          {{ project.name }}
        </h1>
      </div>
      <div class="description">
        <p v-for="section in project.description">{{ section }}</p>
      </div>
      <ProjectData v-if="project.tech" :data="project.tech" />
    </div>
    <div class="gallery">
      <img @click="(event) => focusImage(event)" class="cover img lookin" :src="images?.cover" alt="project picture">
      <div class="gallerita" v-if="project.imgs" :class="{ tata: project.imgs.length < 2 }">
        <div v-for="image in images?.imgs">
          <img @click="(event) => focusImage(event)" class="img lookin" :src="image" alt=":(">
        </div>
      </div>
    </div>
    <!-- <ProjectNavigation :previous="previous" :next="next" :source="'phone'" :small="true" /> -->
  </div>
</template>

<style lang="scss" scoped>
.project {
  display: flex;
  flex-flow: column;
  padding: 2rem 0;
  width: calc(100vw - 8rem);
  gap: 3rem;
  overflow: auto;
  align-items: center;
}

.info {
  display: flex;
  flex-flow: column;
  max-width: 50rem;
}

.gallery {
  display: flex;
  flex-flow: column;
  max-width: 70rem;
  padding: 1rem;
  width: 100%;
  gap: 1rem;
}

.cover {
  display: block;
  background-color: #d5d5d5;
  padding: 1rem;
  width: auto;
  object-fit: contain;
  max-height: 40rem;
  // height: auto;
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
    background-color: #d5d5d5;
    align-items: center;
    justify-content: center;
    object-fit: contain;
    width: 100%;
  }

  img {
    max-height: 35rem;
  }
}

.features {
  padding: 2.5rem 0 2rem;

  h2 {
    font-size: 1.5rem;
    padding-bottom: 1rem;
  }

  p {
    padding: 0.5rem 0;

    &:not(:last-of-type) {
      border-bottom: 1px solid #c5c5c5;
    }
  }
}

.title {
  display: flex;
  flex-flow: column;
}

.project-link {
  background-color: #c5c5c5;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
  align-items: center;
  width: fit-content;
}

.description {
  padding: 2.5rem 0 2rem;
  max-width: 40rem;
}

h1 {
  text-transform: capitalize;
  font-size: 3rem;
}

.overlay {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  padding: 1rem;
  background-color: #c5c5c5;
}

.imageView {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: #dedede;
  gap: 0.5rem;
  padding: 1rem 0;

  .options {
    display: flex;
    justify-content: space-between;
    align-items: start;
    // display: grid;
    // grid-template-columns: repeat(3, 1fr);
    width: calc(100% - 2rem);

    p {
      display: flex;
      gap: 0.25rem;
      align-items: center;
    }

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding-top: 0.5rem;
      display: flex;
      gap: 0.25rem;
      align-items: center;
    }
  }

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
}

.imgFocus-enter-active,
.imgFocus-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}

.imgFocus-enter-from {
  // transform: translateY(-2rem);
  opacity: 0;
}

.imgFocus-leave-to {
  // transform: translateY(2rem);
  opacity: 0;
}

.imgSwipeNext-enter-active,
.imgSwipeNext-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}

.imgSwipeNext-enter-from {
  transform: translateX(-5rem);
  opacity: 0;
}

.imgSwipeNext-leave-to {
  transform: translateX(5rem);
  opacity: 0;
}

.imgSwipePrev-enter-active,
.imgSwipePrev-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}

.imgSwipePrev-enter-from {
  transform: translateX(5rem);
  opacity: 0;
}

.imgSwipePrev-leave-to {
  transform: translateX(-5rem);
  opacity: 0;
}


@media (max-width: 1250px) {
  .project {
    width: 100%;
  }

  .mini {
    width: 40px;
  }
}
</style>