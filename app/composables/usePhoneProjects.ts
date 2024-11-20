import type { Project } from "~/app/models/project";
import phoneProjects from "@/data/phoneProjects.json"

export const usePhoneProjects = () => {

    const data: Ref<Project[]> = ref(phoneProjects);

    const names = Object.fromEntries(
        phoneProjects.map(v => [v.name, v.name])
    ) as { [K in string]: K };

    const project = (name: string) => {
        return ref(phoneProjects.find(project => project.name === name))
    }

    const neighbours = (id: number | undefined) => {
        if (!id) return { next: ref(null), previous: ref(null) }

        const previous = ref(phoneProjects.find(project => project.id === id - 1) ?? null)
        const next = ref(phoneProjects.find(project => project.id === id + 1) ?? null)

        return { previous, next }
    }

    return { data, names, project, neighbours }
}