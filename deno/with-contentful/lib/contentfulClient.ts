import * as contentful from 'contentful';

const client = contentful.createClient({
  space: Deno.env.get('CONTENTFUL_SPACE_ID')!,
  environment: 'master', // defaults to 'master' if not set
  accessToken: Deno.env.get('CONTENTFUL_ACCESS_TOKEN')!,
});


export async function getPosts() {
  const posts = await client.getEntries({
    content_type: 'post',
  })
  return posts.items
}

export async function getPostBySlug(slug: string) {
  const post = await client.getEntries({
    content_type: 'post',
    'fields.slug': slug
  })
  return post.items[0]
}
