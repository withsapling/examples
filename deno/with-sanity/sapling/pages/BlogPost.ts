import { html, raw } from "@sapling/sapling";
import Layout from "../layouts/Layout.ts";
import { getPostBySlug } from "../lib/sanityClient.ts";
import { portableTextToHTML } from "../lib/portableText.ts";

export async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return await Layout({
    title: post.title,
    children: await html`
      <main class="max-w-screen-lg min-h-screen mx-auto px-4 py-16 flex flex-col items-center justify-center font-sans gap-4">
        <h1 class="text-4xl font-bold">${post.title}</h1>
        <div class="prose">${raw(await portableTextToHTML(post.body))}</div>
      </main>
    `,
  });
}
