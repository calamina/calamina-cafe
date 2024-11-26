<script lang="ts" setup>
import gsap from 'gsap';

const { progress } = useLoadingIndicator()
const { resetChanged, visited } = useRouteStore()
const { changedRoute, firstVisit, loading } = storeToRefs(useRouteStore())

onMounted(() => setTimeout(() => visited(), 500))

const visible = computed(() => firstVisit.value ? true : loading.value)
// const visible = computed(() => firstVisit.value ? true : progress.value !== 0 && changedRoute.value)

watch(progress, () => {
  progress.value !== 0 && changedRoute.value ?
    document.querySelector('html')?.classList.add('hideScroll') :
    document.querySelector('html')?.classList.remove('hideScroll')
})

const enter = (el: Element, done: () => void) => {
  const panes = el.querySelectorAll('.pane');
  gsap.set(panes, { translateY: '-100vh' })
  gsap.to(panes, {
    translateY: 0,
    stagger: 0.05,
    ease: "power3.inOut",
    onComplete: () => {
      done
      resetChanged()
    }
  })
}

const leave = (el: Element, done: () => void) => {
  const panes = el.querySelectorAll('.pane');
  gsap.to(panes, {
    translateY: '100vh',
    stagger: 0.05,
    ease: "power3.inOut",
    onComplete: done
  })
}

</script>

<template>
  <Transition @enter="enter" @leave="leave">
    <div class="transition" v-if="visible">
      <div class="pane tw-flex tw-items-end tw-justify-center"><p class="load">l</p></div>
      <div class="pane tw-flex tw-items-end tw-justify-center"><p class="load">o</p></div>
      <div class="pane tw-flex tw-items-end tw-justify-center"><p class="load">a</p></div>
      <div class="pane tw-flex tw-items-end tw-justify-center"><p class="load">d</p></div>
      <div class="pane tw-flex tw-items-end tw-justify-center"><p class="load">i</p></div>
      <div class="pane tw-flex tw-items-end tw-justify-center"><p class="load">n</p></div>
      <div class="pane tw-flex tw-items-end tw-justify-center"><p class="load">g</p></div>
      <div class="pane tw-flex tw-items-end tw-justify-center"><p class="load">.</p></div>
      <div class="pane tw-flex tw-items-end tw-justify-center"><p class="load">.</p></div>
      <div class="pane tw-flex tw-items-end tw-justify-center"><p class="load">.</p></div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.transition {
  cursor: progress;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100vw;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: url("../assets/img/svg/loader.svg") 16 16, pointer;

  div {
    width: 100%;
    height: 100%;
    background-color: var(--bg-darkest);
  }
}

p {
  color: var(--bg);
  font-size: 1.5rem;
  padding-bottom: 2rem;
}
</style>