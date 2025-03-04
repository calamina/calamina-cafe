import { map } from 'nanostores';

export interface ProjectsFilters {
    webActive: boolean
    phoneActive: boolean
    offline: boolean
    sort: 'num' | 'date' | 'alpha'
    order: 'asc' | 'desc'
}

export const ProjectsFilters = map<ProjectsFilters>({
    webActive: true,
    phoneActive: true,
    offline: true,
    sort: 'date',
    order: "asc"
})