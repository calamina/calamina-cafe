const { setChanged, setLoading } = useRouteStore()
const { firstVisit, fromTo, isProject } = storeToRefs(useRouteStore())

export default defineNuxtRouteMiddleware
  ((to, from) => {
    // window?.scrollTo({top: 0})

    // if(to.path === from.path) {
    //   setLoading(false)
    //   return
    // }
    // setChanged()
    // fromTo.value = { from: from.fullPath, to: to.fullPath }
    // if (!firstVisit.value && !isProject.value) {
    //   setLoading(true)
    // }
  })