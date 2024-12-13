const { setChanged, setLoading } = useRouteStore()
const { firstVisit, fromTo, isProject } = storeToRefs(useRouteStore())

export default defineNuxtRouteMiddleware
  ((to, from) => {
    setChanged()
    fromTo.value = { from: from.fullPath, to: to.fullPath }
    if (!firstVisit.value && !isProject.value) {
      setLoading(true)
    }
  })