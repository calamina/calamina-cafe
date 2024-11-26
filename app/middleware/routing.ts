const { setChanged, setLoading } = useRouteStore()
const { firstVisit } = storeToRefs(useRouteStore())

export default defineNuxtRouteMiddleware
  ((to, from) => {
    setChanged()
    if(!firstVisit.value) {
      setLoading(true)
    }
    // console.debug('from:', from.fullPath)
    // console.debug('to:', to.fullPath)

    // const authenticated = false;
    // if (authenticated === false) {
    //     return navigateTo('/')
    // }
  })