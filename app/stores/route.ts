export const useRouteStore = defineStore('route', () => {
  
  const changedRoute = ref(false)

  function resetChanged(): void {
    changedRoute.value = false
  }
  function setChanged(): void {
    changedRoute.value = true
  }

  return {
    changedRoute, resetChanged, setChanged
  }
})