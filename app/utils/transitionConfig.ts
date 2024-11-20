import gsap, { Power2 } from 'gsap';
import type { TransitionProps } from 'vue';

const { toggleTransitionComplete } = useTransitionComposable();

const duration = 0.4;

const pageTransition: TransitionProps = {
    name: 'page-transiton',
    mode: 'out-in',
    onEnter: (el: Element, done: () => void) => {
        const lel = document.querySelector('.transition')
        gsap.set(lel, {
            translateX: 0
        });
        gsap.set(el, {
            translateX: '5rem'
        });
        gsap
            .timeline({
                onComplete() {
                    toggleTransitionComplete(true);
                    done;
                },
            })
            .to(lel, {
                translateX: '-100vw',
                duration: duration / 2,
                ease: Power2.easeInOut,
            })
            .to(el, {
                translateX: 0,
                duration: duration / 2,
            }, '<')
    },
    onLeave: (el: Element, done: () => void) => {
        const lel = document.querySelector('.transition')
        gsap.set(lel, {
            translateX: '-100vw'
        });
        gsap.set(el, {
            translateX: 0
        });
        toggleTransitionComplete(false);
        gsap
            .timeline({
                // paused: true, 
                onComplete: done
            })
            .to(lel, {
                translateX: 0,
                duration: duration / 2,
                ease: Power2.easeInOut,
            })
            .to(el, {
                translateX: '5rem',
                duration: duration / 2,
            }, '<')
            .to(lel, {
                translateX: 0,
                duration: duration 
            })
        // .pause(0.5)
        // .play();
    },
};

// const pageTransition: TransitionProps = {
//     name: 'page-transiton',
//     mode: 'out-in',
//     onEnter: (el: Element, done: () => void) => {
//         gsap.set(el, { 
//             opacity: 0, 
//             translateY: '6rem'
//         });
//         gsap
//             .timeline({
//                 paused: true,
//                 onComplete() {
//                     toggleTransitionComplete(true);
//                     done();
//                 },
//             })
//             .to(el, { 
//                 opacity: 1,
//                 translateY: 0, 
//                 duration 
//             })
//             .play();
//     },
//     onLeave: (el: Element, done: () => void) => {
//         toggleTransitionComplete(false);
//         gsap.set(el, { 
//             opacity: 1,
//             translateY: '0',
//         });
//         gsap
//             .timeline({ paused: true, onComplete: done })
//             .to(el, {
//                 translateY: '2rem',
//                 opacity: 0,
//                 duration
//             })
//             .play();
//     },
// };

export default pageTransition;
