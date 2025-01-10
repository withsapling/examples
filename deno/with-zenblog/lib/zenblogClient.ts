import { createZenblogClient } from "zenblog";

const blogId = Deno.env.get("ZENBLOG_ID");

if (!blogId) {
  throw new Error("ZENBLOG_ID is not set in .env file");
}

const zenblog = createZenblogClient({ blogId });

// get all posts
export async function getPosts() {
  return await zenblog.posts.list();
}

// get a post by slug
export async function getPostBySlug(slug: string) {
  return await zenblog.posts.get({ slug });
}