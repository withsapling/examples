import { html } from "@sapling/sapling";

export interface BlogPost {
  title: string;
  slug: string;
  published_at: string;
  cover_image: string;
  excerpt: string;
}

export function BlogPostCard({ post }: { post: BlogPost }) {
  return html`<a class="flex flex-col gap-4" href="/blog/${post.slug}">
${post.cover_image ? html`<img class="w-full rounded-lg shadow-lg hover:scale-101 transition-all duration-300" src="${post.cover_image}" alt="${post.title}" />` : ""}
  <div class="flex flex-col gap-1 ">
    <h2 class="text-2xl font-bold ">${post.title}</h2>
    <p><time datetime="${new Date(post.published_at).toISOString()}">Published ${new Date(post.published_at).toLocaleDateString()}</time></p>
  </div>
  </a>`
}
