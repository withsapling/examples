import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  apiVersion: '2024-03-01',
})

// get all posts
export async function getPosts() {
  const posts = await sanityClient.fetch('*[_type == "post"]')
  return posts
}

// get a post by slug
export async function getPostBySlug(slug: string) {
  const post = await sanityClient.fetch(`*[_type == "post" && slug.current == "${slug}"][0]`)
  return post
}