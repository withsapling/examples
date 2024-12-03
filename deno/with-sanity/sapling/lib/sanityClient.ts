import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const sanityClient = createClient({
  projectId: '0kpxbkrf',
  dataset: 'production',
  apiVersion: '2024-03-01',
})


const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// get all posts
export async function getPosts() {
  // order by publishedAt descending
  const posts = await sanityClient.fetch('*[_type == "post"] | order(publishedAt desc)')
  return posts
}

// get a post by slug
export async function getPostBySlug(slug: string) {
  const post = await sanityClient.fetch(`*[_type == "post" && slug.current == "${slug}"][0]`)
  return post
}