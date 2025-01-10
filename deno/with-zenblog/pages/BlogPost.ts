import { html, raw } from "@sapling/sapling";
import Layout from "../layouts/Layout.ts";
import { getPostBySlug } from "../lib/zenblogClient.ts";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export async function BlogPost({ params }: BlogPostProps) {
  const { data: post } = await getPostBySlug(params.slug);

  return await Layout({
    title: post.title,
    children: await html`
    <main class="max-w-screen-lg min-h-screen mx-auto px-4 py-16 flex flex-col items-center justify-center font-sans gap-4">
      <article class="prose lg:prose-xl">
        <h1>${post.title}</h1>
        <p><time datetime="${new Date(post.published_at).toISOString()}">Published ${new Date(post.published_at).toLocaleDateString()}</time></p>
        ${post.cover_image ? html`<img class="w-full rounded-lg shadow-lg" src="${post.cover_image}" alt="${post.title}" />` : ""}
        ${raw(post.html_content)}
      </article>
    </main>
    `,
  });
}
