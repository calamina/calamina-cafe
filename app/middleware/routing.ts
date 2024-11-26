const { setChanged } = useRouteStore()

export default defineNuxtRouteMiddleware
  ((to, from) => {
    setChanged()
    // console.debug('from:', from.fullPath)
    // console.debug('to:', to.fullPath)

    // const authenticated = false;
    // if (authenticated === false) {
    //     return navigateTo('/')
    // }
  })