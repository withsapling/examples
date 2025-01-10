import { html } from "@sapling/sapling";
import Layout from "../layouts/Layout.ts";
import { BlogPostCard } from "../components/BlogPostCard.ts";
import { getPosts } from "../lib/zenblogClient.ts";

export async function Blog() {
  const { data: posts } = await getPosts();

  return await Layout({
    title: "Sapling & Zenblog Example",
    children: await html`
    <main class="max-w-screen-lg min-h-screen mx-auto px-4 py-16 flex flex-col items-center justify-center font-sans gap-4">
    <h1 class="text-4xl font-bold">Sapling &amp; <a class="underline" href="https://zenblog.com?ref=sapling">Zenblog</a> Example</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${posts.map((post: any) => BlogPostCard({ post }))}
    </div>
  </main>
    `,
  });
}
