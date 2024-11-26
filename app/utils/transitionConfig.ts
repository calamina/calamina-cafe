// import gsap from 'gsap';
import type { TransitionProps } from 'vue';
import { useRouteStore } from '../stores/route.js';

const pageTransition: TransitionProps = {
    name: 'page-transiton',
    mode: 'out-in',
    onEnter: (el: Element, done: () => void) => {
        done()
    },
    onLeave: (el: Element, done: () => void) => {
        setTimeout(() => {
            done()
        }, 600);
    },

    onBeforeLeave() {
        useRouteStore().setLoading(true)
    },
    onAfterEnter() {
        useRouteStore().setLoading(false)
        console.debug(useRouteStore().loading)
    },
};

export default pageTransition;
