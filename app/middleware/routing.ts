const { setChanged, setLoading } = useRouteStore()
const { firstVisit } = storeToRefs(useRouteStore())

export default defineNuxtRouteMiddleware
  ((_to, _from) => {
    setChanged()
    document.documentElement.style.overflow = "visible"
    if(!firstVisit.value) {
      setLoading(true)
    }
  })