<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { onKeyStroke } from '@vueuse/core'

const { selected, images } = defineProps<{
    selected: HTMLImageElement | null
    images: HTMLImageElement[]
}>()
const emits = defineEmits(['unfocus'])

const image: Ref<HTMLImageElement | null> = ref(selected)
const imgSwipeTransition: Ref<string> = ref('slideToLeft');

onMounted(() => {
    document.documentElement.style.overflow = "hidden"
})

onKeyStroke('ArrowLeft', () => prevImg())
onKeyStroke('ArrowRight', () => nextImg())
onKeyStroke('Escape', () => exit())

function prevImg() {
    if (image.value) {
        imgSwipeTransition.value = "slideToLeft"
        image.value = images[images.indexOf(image.value) - 1] ?? images[images.length - 1] ?? ''
    }
}

function nextImg() {
    if (image.value) {
        imgSwipeTransition.value = "slideToRight"
        image.value = images[images.indexOf(image.value) + 1] ?? images[0] ?? ''
    }
}

function exit() {
    document.documentElement.style.overflow = "visible"
    emits('unfocus')
}
</script>

<template>
    <div v-if="image" class="overlay">
        <div class="imageView">
            <div class="options">
                <TextBrackets>
                    <Icon name="tabler:eye" />
                    Fullscreen mode
                </TextBrackets>
                <TextBrackets>{{ images.indexOf(image) + 1 }} / {{ images.length }}</TextBrackets>
                <div>
                    <TextBrackets>
                        <Icon name="tabler:hand-click" />
                        or Escape to exit
                    </TextBrackets>
                    <TextBrackets>
                        <Icon name="tabler:arrow-left-bar" />
                        <Icon name="tabler:arrow-right-bar" />
                        to navigate
                    </TextBrackets>
                </div>
            </div>
            <transition :name="imgSwipeTransition" mode="out-in">
                <img @click="exit()" :src="image.src" :alt="image.alt" :key="image.src" class="lookout">
            </transition>
            <div class="options">
                <ButtonBrackets @click="prevImg()">
                    <Icon name="tabler:arrow-left-bar" />
                    previous
                </ButtonBrackets>
                <ButtonBrackets @click="exit()">close ?</ButtonBrackets>
                <ButtonBrackets @click="prevImg()">
                    next
                    <Icon name="tabler:arrow-right-bar" />
                </ButtonBrackets>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    // padding: 1rem 0;
    // padding: 1rem;
    // backdrop-filter: blur(15px);
    background-color: var(--bg);
}

.imageView {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    // gap: 0.5rem;
    // border: 1px solid #000;
    overflow: hidden;

    .options {
        // display grid for perfect center alignment ?
        display: flex;
        justify-content: space-between;
        align-items: start;
        width: 100%;
        // padding: 0 1rem;
        padding: 1rem;

        // &:first-of-type {
        // border-bottom: 1px solid #000;
        // }

        // &:last-of-type {
        // border-top: 1px solid #000;
        // }

        div {
            display: flex;
            flex-flow: column;
            align-items: end;
        }
    }

    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
}
</style>