import { html } from "@sapling/sapling";
import { urlFor } from "../lib/sanityClient.ts";

export interface BlogPost {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  image: any;
  body: any;
}

export function BlogPostCard({ post }: { post: BlogPost }) {
  return html`<a class="" href="/blog/${post.slug.current}">
${post.image ? html`<img class="w-full rounded-lg shadow-lg hover:scale-101 transition-all duration-300" src="${urlFor(post.image).width(600).height(300).url()}" alt="${post.image.alt}" />` : ""}
  <div class="py-4 flex flex-col gap-1 ">
    <h2 class="text-2xl font-bold ">${post.title}</h2>
    <p><time datetime="${new Date(post.publishedAt).toISOString()}">Published ${new Date(post.publishedAt).toLocaleDateString()}</time></p>
  </div>
  </a>`
}
