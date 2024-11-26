const { setChanged, setLoading } = useRouteStore()
const { firstVisit } = storeToRefs(useRouteStore())

export default defineNuxtRouteMiddleware
  ((_to, _from) => {
    setChanged()
    if(!firstVisit.value) {
      setLoading(true)
    }
  })