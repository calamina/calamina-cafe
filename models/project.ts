import type { ProjectTech } from "./ProjectTech"

export type Project = {
    id: number,
    name: string,
    link?: string,
    mini: string,
    img: string,
    imgs?: string[],
    description?: string[],
    tech?: ProjectTech,
    features?: string[],
}