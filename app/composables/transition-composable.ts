import { reactive } from 'vue';

// No transition to start, set default to true.
const transitionState = reactive({
    transitionComplete: true,
});

export const useTransitionComposable = () => {
    const toggleTransitionComplete = (value: boolean) => {
        transitionState.transitionComplete = value;
    };

    return {
        transitionState,
        toggleTransitionComplete,
    };
};
