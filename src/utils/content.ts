import type { Article } from "@models/Article";
import type { Project } from "@models/Project";
import { getCollection } from "astro:content";

// ARTICLES
export const queryArticles = async (): Promise<Article[]> =>
  getCollection("articles").then(results => results
    .map(result => result.data)
  )
export const queryLastArticle = async () => (await queryArticles())[0]

// NOTES
export const queryNotes = async () =>
  getCollection("notes").then(results => results
    .map(result => result.data as Article)
  )
export const queryLastNote = async () => (await queryNotes())[0]

// PROJECTS
export const queryProjects = async (): Promise<Project[]> =>
  getCollection("projects").then(results => results
    .map(result => result.data as Project)
  )
export const queryProject = async (name: string) => (await queryProjects())?.find(res => res.name === name)
export const queryLastProject = async () => (await queryProjects())[0]


