import type { ProjectDataModel } from "./projectData"

export type ProjectModel = {
    id: number,
    name: string,
    link?: string,
    img: string,
    imgs?: string[],
    description?: string[],
    tech?: ProjectDataModel,
    features?: string[],
}