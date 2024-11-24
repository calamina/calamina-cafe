// const { transitionState } = useTransitionComposable();
const { setLoading } = useLoadingStore();


export default defineNuxtRouteMiddleware
    ((to, from) => {
        useNuxtApp().hook("page:start", () => {
        // useNuxtApp().hook("page:loading:start", () => {
            document.documentElement.style.overflow = "hidden"
            setLoading(true);
        });
        useNuxtApp().hook("page:finish", () => {
        // useNuxtApp().hook("page:loading:end", () => {
            document.documentElement.style.overflow = "visible";
            setLoading(false);
            // setTimeout(() => setLoading(false), 150);
        });

        // console.debug(to, from)
        // const authenticated = false;
        // if (authenticated === false) {
        //     return navigateTo('/')
        // }
    })