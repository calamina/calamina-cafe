<script setup lang="ts">
const { loading } = defineProps<{
  loading: boolean,
}>()
</script>

<template>
  <Teleport to="body">
    <transition name="imgLoad" mode="out-in">
      <div v-if="loading">
        <p class="loader">LOADING<span>❍</span></p>
        <p class="loader">LOADING<span>⊛</span></p>
        <p class="loader">LOADING<span>↻</span></p>
        <p class="loader">LOADING<span>⥁</span></p>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="scss" scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  flex-flow: column;
  justify-content: center;
  z-index: 500;
  background-color: var(--bg);
  width: 100vw;
  height: 100vh
}

.loader {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

span {
  display: block;
  width: fit-content;
  animation: rotate 4s linear infinite;
  font-size: 2rem;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(360deg)
  }
}

.imgLoad-enter-active,
.imgLoad-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}

.imgLoad-enter-from,
.imgLoad-leave-to {
  opacity: 0;
  transform: translateY(-10vh);
}
</style>