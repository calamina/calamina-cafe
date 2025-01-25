import type { TransitionProps } from 'vue';
import { useRouteStore } from '../stores/route.js';
import { gsap } from 'gsap';
import { storeToRefs } from 'pinia';

const pageTransition: TransitionProps = {
    name: 'page-transiton',
    mode: 'out-in',
    onLeave: (el: Element, done: () => void) => {
        const { isProject } = storeToRefs(useRouteStore());
        if (!isProject.value) return setTimeout(() => { done() }, 800)

        // const startTime = performance.now()
        const title = document.querySelector('h1')
        const link = document.querySelector('.project-link')
        const gallery = document.querySelector('.gallery')
        const navigation = document.querySelector('.navigation')
        const tech = document.querySelector('.tech')?.children ?? []
        const desc = document.querySelector('.info')?.children[3] ?? []
        // const stars = document.querySelector('.stars')

        const timeline = gsap.timeline({
            defaults: { duration: 0.3, ease: "power2.out" },
            onComplete: () => {
                done()
                // const endTime = performance.now()
                // console.debug(endTime - startTime + 'ms')
            },
        })
        timeline
            .to([gallery, navigation], {
                opacity: 0,
                stagger: 0.02,
            }, 0)
            .to([title, link, desc, tech], {
                opacity: 0,
                translateX: '0.5rem',
                stagger: 0.02,
            }, 0)
            // .to(stars, {
            //     delay: 0.05,
            //     gap: "2rem",
            // }, 0)
    },
    onEnter(el: Element) {
        document.documentElement.style.overflow = "visible"
        window.scrollTo({ top: 0 })
        const { isProject } = storeToRefs(useRouteStore());
        if (!isProject.value) return useRouteStore().setLoading(false)

        const title = document.querySelector('h1')
        const link = document.querySelector('.project-link')
        const gallery = document.querySelector('.gallery')?.children ?? []
        const navigation = document.querySelector('.navigation')
        const tech = document.querySelector('.tech')?.children ?? []
        const desc = document.querySelector('.info')?.children[3] ?? []
        // const stars = document.querySelector('.stars')

        gsap.set([navigation, gallery], { opacity: 0 })
        gsap.set([title, link, desc, tech], {
            opacity: 0,
            translateX: '-0.5rem'
        })
        // gsap.set(stars, {
        //     gap: "2rem",
        // })

        const timeline = gsap.timeline({ defaults: { duration: 0.3 } })
        timeline
            .to([title, link, desc, tech], {
                opacity: 1,
                translateX: 0,
                stagger: 0.04,
            }, 0)
            .to([gallery, navigation], {
                delay: 0.15,
                opacity: 1,
                stagger: 0.04,
            }, 0)
            // .to(stars, {
            //     gap: 0
            // }, 0)
    }
}

export default pageTransition;
