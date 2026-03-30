import { getCollection } from "astro:content"

export async function GET() {
  const projects = await getCollection("projects")
  const articles = await getCollection("articles")
  const notes = await getCollection("notes")

  const articlesJson = await Promise.all(
    articles.map(async (page) => {
      return {
        id: `article/${page.id}`,
        slug: `/${page.id}`,
        url: `/articles/${page.id}`,
        name: page.data.name,
        text: page.body
      }
    })
  )
  const notesJson = await Promise.all(
    notes.map(async (page) => {
      const url = page.id.slice(1).split("/")[1]
      return {
        id: `note/${page.id}`,
        slug: `/${page.id}`,
        url: `/notes/${url}`,
        name: page.data.name,
        text: page.body
      }
    })
  )
  const projectsJson = await Promise.all(
    projects.map(async (page) => {
      const tech = Object.values(page.data.tech ?? {}).flatMap(categ => categ).join(" ")
      const description = page.data.description.join(" ")

      return {
        id: `project/${page.id}`,
        slug: `/${page.id}`,
        url: `/projects/${page.id}`,
        name: page.data.name,
        text: [tech, description]
      }
    })
  )

  const index = [...articlesJson, ...notesJson, ...projectsJson]

  return new Response(JSON.stringify(index))
}