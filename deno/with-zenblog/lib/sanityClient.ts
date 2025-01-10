import { createZenblogClient } from "zenblog";

const zenblog = createZenblogClient({ blogId: "YOUR_ZENBLOG_ID" });

// get all posts
export async function getPosts() {
  return await zenblog.posts.list();
}

// get a post by slug
export async function getPostBySlug(slug: string) {
  return await zenblog.posts.get({ slug });
}