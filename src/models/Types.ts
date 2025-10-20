import type { ProjectType } from "../utils/enum"
import type { Project } from "./Project"

export interface TypedProject extends Project {
  type: ProjectType
  homepage?: string,
  default_branch?: string,
  language?: string,
  created_at?: Date,
  updated_at?: Date,
  git_url?: string,
}

export interface GitProject extends Project {
  id: string;
  html_url: string;
  homepage: string;
  default_branch: string;
  language: string;
  created_at: Date;
  pushed_at: Date;
}

export interface ProjectFilters {
  type: ProjectType | "ALL"
  // sort: 'date' | 'alpha'
  order: "ASC" | "DESC"
}