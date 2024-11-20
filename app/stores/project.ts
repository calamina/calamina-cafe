export const useProjectStore = defineStore('projects', () => {
  const activeProjectName: Ref<string> = ref('');

  function getProjectName(): string {
    return activeProjectName.value
  }

  function setProjectName(name: string): void {
    activeProjectName.value = name
  }

  return {
    activeProjectName, getProjectName, setProjectName
  }
})
