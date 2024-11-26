import type { TransitionProps } from 'vue';
import { useRouteStore } from '../stores/route.js';
// import gsap from 'gsap';

const pageTransition: TransitionProps = {
    name: 'page-transiton',
    mode: 'out-in',
    // onBeforeLeave() {
    //     useRouteStore().setLoading(true)
    // },
    onLeave: (el: Element, done: () => void) => {
        // gsap.to(el, {
        //     opacity: 0,
        //     translateY: '1rem',
        //     duration: 0.8,
        //     onComplete: done
        // })
        setTimeout(() => {
            done()
        }, 800);
    },
    onEnter() {
        useRouteStore().setLoading(false)
        console.debug('heheh not loading')
    },
};

export default pageTransition;
