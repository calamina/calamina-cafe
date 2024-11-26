import type { Pinia } from "pinia"

export const useRouteStore = defineStore('route', () => {
  
  const changedRoute = ref(false)
  const firstVisit = ref(true)
  const loading = ref(false)

  function setLoading(value: boolean): void {
    loading.value = value
  }

  function visited():void {
    firstVisit.value = false
  }

  function resetChanged(): void {
    changedRoute.value = false
  }
  function setChanged(): void {
    changedRoute.value = true
  }

  return {
    changedRoute, resetChanged, setChanged, firstVisit, visited, loading, setLoading
  }
})

export default {
  asyncData({ $pinia }: {$pinia: Pinia}) {
    const store = useRouteStore($pinia)
  },
}