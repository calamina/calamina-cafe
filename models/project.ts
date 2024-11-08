import type { ProjectTech } from "./ProjectTech"

export type Project = {
    id: number,
    name: string,
    link?: string,
    img: string,
    imgs?: string[],
    description?: string[],
    tech?: ProjectTech,
    features?: string[],
}