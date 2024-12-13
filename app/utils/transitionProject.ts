import type { TransitionProps } from 'vue';
import { useRouteStore } from '../stores/route.js';
// import gsap from 'gsap';

const pageTransition: TransitionProps = {
    name: 'page-transiton',
    mode: 'out-in',
    onLeave: (el: Element, done: () => void) => {
        setTimeout(() => {
            done()
        }, 800);
    },
    onEnter() {
        useRouteStore().setLoading(false)
    },
};

export default pageTransition;
