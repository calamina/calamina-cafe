<script setup lang="ts">

const { projects, type } = defineProps<{
  projects: any[]
  type: string
}>()

const routeName = computed(() => type === 'web' ? 'projects-web-project' : 'projects-phone-project')
</script>

<template>
  <div class="wrapper">
    <!-- TODO :: export header ? -->
    <div class="header">
      <h2>{{ type }}</h2>
      <span>[ {{ projects.length }} projects ]</span>
    </div>
    <div class="img-grid" :class="{ 'img-grid-phone': type === 'phone' }">
      <highlightButton v-for="project in projects" class="lookin"
        :to="{ name: routeName, params : { project: project.name} }">
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  align-items: center;
  padding-bottom: 2rem;

  &-phone {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));

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
  padding: 0 0.5rem;
  width: 100%;
  max-width: 70rem;
}

a {
  position: relative;
  display: flex;
  flex-flow: column;
  gap: 0;

  .info {
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
  aspect-ratio: 1.77;
  transition: border-color 0.3s;
}

@media (max-width: 1250px) {
  .img-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    max-width: 100%;
  }

  .header {
    max-width: 100%;
  }
}
</style>