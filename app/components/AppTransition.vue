<script lang="ts" setup>
import gsap from 'gsap';

const { progress } = useLoadingIndicator()
const { resetChanged } = useRouteStore()
const { changedRoute } = storeToRefs(useRouteStore())

watch(progress, () => {
  progress.value !== 0 && changedRoute.value ?
    document.querySelector('html')?.classList.add('hideScroll') :
    document.querySelector('html')?.classList.remove('hideScroll')
})

const enter = (el: Element, done: () => void) => {
  const panes = el.querySelectorAll('.pane');
  // gsap.set(panes, { rotateY: 180 })
  gsap.set(panes, { translateY: '-100vh' })
  gsap.to(panes, {
    translateY: 0,
    // rotateY: 0,
    stagger: 0.05,
    ease: "power3.inOut",
    onComplete: () => {
      done()
      resetChanged()
    }
  })
}

const leave = (el: Element, done: () => void) => {
  const panes = el.querySelectorAll('.pane');
  gsap.to(panes, {
    translateY: '100vh',
    // rotateY: 180,
    stagger: 0.05,
    ease: "power3.inOut",
    onComplete: done
  })
}

</script>

<template>
  <Transition @enter="enter" @leave="leave">
    <div class="transition" v-if="progress !== 0 && changedRoute">
      <!-- <div class="transition"> -->
      <div class="pane"></div>
      <div class="pane"></div>
      <div class="pane"></div>
      <div class="pane"></div>
      <div class="pane"></div>
      <div class="pane"></div>
      <div class="pane"></div>
      <div class="pane"></div>
      <div class="pane"></div>
      <div class="pane"></div>
      <!-- <p class="star tw-text-3xl">✦</p> -->
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.transition {
  // pointer-events: none;
  cursor: progress;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100vw;
  display: flex;
  height: 100vh;
  // padding-bottom: 4rem;
  // background-color: var(--bg-darkest);
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: url("../assets/img/svg/loader.svg") 16 16, pointer;

  div {
    width: 100%;
    height: 100%;
    background-color: var(--bg-darkest);
    backface-visibility: hidden;
    // background-color: var(--bg);
    // border-left: 4px solid var(--bg-darkest);
  }
}

.star {
  color: var(--bg);
  display: flex;
  justify-content: center;
  transform-origin: 50% 50%;
  width: fit-content;
  height: 20px;
  width: 20px;
  line-height: 26px;
  // animation: rotate 0.6s infinite;
}



// // ANIMATION
// @keyframes rotate {
//   0% {
//     transform: rotate(0)
//   }

//   100% {
//     transform: rotate(360deg);
//   }
// }</style>