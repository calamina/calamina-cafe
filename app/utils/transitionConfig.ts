import gsap from 'gsap';
import type { TransitionProps } from 'vue';

const duration = 0.6;

const pageTransition: TransitionProps = {
    name: 'page-transiton',
    mode: 'out-in',
    onEnter: (el: Element, done: () => void) => {
        gsap.set(el, {
            opacity: 0,
        });
        gsap.timeline({
            onComplete: done,
        }).to(el, {
            opacity: 1,
            duration: duration / 2,
        })
    },
    onLeave: (el: Element, done: () => void) => {
        gsap.set(el, {
            opacity: 1,
        });
        gsap.timeline({
            onComplete: done
        }).to(el, {
            opacity: 0,
            duration: duration / 2,
        })
    },
};

export default pageTransition;
