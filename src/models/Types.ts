import type { ProjectType } from "../utils/enum"
import type { Project } from "./Project"

export interface TypedProject extends Project {
  type: ProjectType
}

export interface ProjectFilters {
  type: ProjectType | "ALL"
  sort: 'date' | 'alpha'
  order: "ASC" | "DESC"
}