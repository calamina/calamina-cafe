import type { MomentType, ProjectType } from "../utils/enum"
import type { Moment } from "./Moment"
import type { Project } from "./Project"

export interface TypedProject extends Project {
  type: ProjectType
}

export interface TypedMoment extends Moment {
  type: MomentType
}

export interface ProjectFilters {
  type: ProjectType | "ALL"
  sort: 'date' | 'alpha'
  order: "ASC" | "DESC"
}