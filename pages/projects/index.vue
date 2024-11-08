<script setup lang="ts">
definePageMeta({
  pageTransition: transitionConfig,
});

const webProjects = useWebProjects().data
const phoneProjects = usePhoneProjects().data
</script>

<template>
  <div class="content">
    <div class="wrapper">
      <div class="header">
        <h2>web</h2>
        <span>[ {{ webProjects.length }} projects ]</span>
      </div>
      <div class="img-grid">
        <SelectBrackets v-for="project in webProjects" class="lookin"
          :to="{ name: 'projects-project', params: { project: project.name } }">
          <NuxtImg class="img" :src="project.img" preload loading="lazy" alt=":(" />
          <div class="info">
            <p>{{ project.name }}</p>
            <p>{{ project.id < 10 ? '0' + project.id : project.id }}</p>
          </div>
        </SelectBrackets>
      </div>
    </div>
    <div class="wrapper">
      <div class="header">
        <h2>phone</h2>
        <span>[ {{ phoneProjects.length }} projects ]</span>
      </div>
      <div class="img-grid img-grid-phone">
        <SelectBrackets v-for="project in phoneProjects" class="lookin"
          :to="{ name: 'projects-mobile', params: { mobile: project.name } }">
          <NuxtImg class="img" :src="project.img" preload loading="lazy" alt=":(" />
          <div class="info">
            <p>{{ project.name }}</p>
            <p>{{ project.id < 10 ? '0' + project.id : project.id }}</p>
          </div>
        </SelectBrackets>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-flow: column;
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  align-items: center;

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
  width: 100%;
  max-width: 70rem;
}

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