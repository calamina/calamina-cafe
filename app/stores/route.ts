import type { Pinia } from "pinia"

export const useRouteStore = defineStore('route', () => {
  
  const changedRoute = ref(false)
  const firstVisit = ref(true)
  const loading = ref(false)
  const fromTo: Ref<{from: string; to : string}> = ref({from: '', to: ''})
  const isProject = computed(() => fromTo.value.from?.includes('/projects/') && fromTo.value.to.includes('/projects/'))

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
    changedRoute, resetChanged, setChanged, firstVisit, visited, loading, setLoading, fromTo, isProject
  }
})

export default {
  asyncData({ $pinia }: {$pinia: Pinia}) {
    const store = useRouteStore($pinia)
  },
}