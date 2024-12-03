import { html, raw } from "@sapling/sapling";
import Layout from "../layouts/Layout.ts";
import { getPostBySlug } from "../lib/contentfulClient.ts";
import { richTextToHTML } from "../lib/richText.ts";

export async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  return await Layout({
    title: post?.fields.title?.toString() ?? "Blog Post",
    children: await html`
      <main class="max-w-screen-lg min-h-screen mx-auto px-4 py-16 flex flex-col items-center justify-center font-sans gap-4">
        <h1 class="text-4xl font-bold">${post.fields.title}</h1>
        <p><time datetime="${new Date(post.fields.publishedAt).toISOString()}">Published on ${new Date(post.fields.publishedAt).toLocaleDateString()}</time></p>
        ${post.fields.featuredImage ? html`<img class="w-full rounded-lg shadow-lg" src="${post.fields.featuredImage.fields.file.url}" alt="${post.fields.featuredImage.fields.description}" />` : ""}
        <div class="prose">${raw(await richTextToHTML(post.fields.body))}</div>
      </main>
    `,
  });
}
