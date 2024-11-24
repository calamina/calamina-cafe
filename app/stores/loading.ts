export const useLoadingStore = defineStore('loading', () => {
  const loading: Ref<boolean> = ref(false);

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  return {
    loading, setLoading
  }
})
