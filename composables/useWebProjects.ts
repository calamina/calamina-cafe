import type { Project } from "@/models/project";
import webProjects from "@/data/webProjects.json"

export const useWebProjects = () => {

    const data: Ref<Project[]> = ref(webProjects);

    const names = Object.fromEntries(
        webProjects.map(v => [v.name, v.name])
    ) as { [K in string]: K };

    const project = (name: string) => {
        return ref(webProjects.find(project => project.name === name))
    }

    const neighbours = (id: number | undefined) => {
        if (!id) return { next: ref(null), previous: ref(null) }

        const previous = ref(webProjects.find(project => project.id === id - 1) ?? null)
        const next = ref(webProjects.find(project => project.id === id + 1) ?? null)

        return { previous, next }
    }

    return { data, names, project, neighbours }
}