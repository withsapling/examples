import { html } from "@sapling/sapling";
import Layout from "../layouts/Layout.ts";
import { getPosts } from "../lib/contentfulClient.ts";
import { BlogPost, BlogPostCard } from "../components/BlogPostCard.ts";

export async function Blog() {
  const posts = await getPosts();

  return await Layout({
    title: "Sapling & Contentful Blog",
    children: await html`
      <main class="max-w-screen-lg min-h-screen mx-auto px-4 py-16 flex flex-col items-center justify-center font-sans gap-4">
        <h1 class="text-4xl font-bold">Sapling & Contentful Blog</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${posts.map((entry) => BlogPostCard({
      post: {
        title: entry.fields.title?.toString() ?? "",
        slug: entry.fields.slug?.toString() ?? "",
        publishedAt: entry.fields.publishedAt?.toString() ?? "",
        featuredImage: entry.fields.featuredImage ?? undefined,
      },
    }))}
        </div>
      </main>
    `,
  });
}
