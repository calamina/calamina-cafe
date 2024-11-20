import gsap from 'gsap';
import type { TransitionProps } from 'vue';

const { toggleTransitionComplete } = useTransitionComposable();

const duration = 0.6;

const pageTransition: TransitionProps = {
    name: 'page-transiton',
    mode: 'out-in',
    onEnter: (el: Element, done: () => void) => {
        gsap.set(el, { 
            opacity: 0, 
            translateY: '6rem'
        });
        gsap
            .timeline({
                paused: true,
                onComplete() {
                    toggleTransitionComplete(true);
                    done();
                },
            })
            .to(el, { 
                opacity: 1,
                translateY: 0, 
                duration 
            })
            .play();
    },
    onLeave: (el: Element, done: () => void) => {
        toggleTransitionComplete(false);
        gsap.set(el, { 
            opacity: 1,
            translateY: '0',
        });
        gsap
            .timeline({ paused: true, onComplete: done })
            .to(el, {
                translateY: '2rem',
                opacity: 0,
                duration
            })
            .play();
    },
};

export default pageTransition;
