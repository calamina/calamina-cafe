import { getCollection } from "astro:content"

export async function GET() {
  // const projects = await getCollection("webProjects")
  const notes = await getCollection("articles")

  const index = await Promise.all(
    notes.map(async (page) => {
      return {
        id: `/${page.id}`,
        slug: `/${page.id}`,
        url: `/articles/${page.id}`,
        name: page.data.name,
        text: page.body
      }
    })
  )

  return new Response(JSON.stringify(index))
}