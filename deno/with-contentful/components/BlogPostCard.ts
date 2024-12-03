import { html } from "@sapling/sapling";

export interface BlogPost {
  title: string;
  slug: string;
  publishedAt: string;
  featuredImage?: {
    fields: {
      file: {
        url: string;
      };
      description: string;
    };
  };
  body: any;
}

export function BlogPostCard({ post }: { post: BlogPost }) {
  return html`<a class="" href="/blog/${post.slug}">
  ${post.featuredImage ? html`<img class="w-full rounded-lg shadow-lg hover:scale-101 transition-all duration-300" src="${post.featuredImage.fields.file.url}" alt="${post.featuredImage.fields.description}" />` : ""}
  <div class="py-4 flex flex-col gap-1 ">
    <h2 class="text-2xl font-bold ">${post.title}</h2>
    <p><time datetime="${new Date(post.publishedAt).toISOString()}">Published ${new Date(post.publishedAt).toLocaleDateString()}</time></p>
  </div>
  </a>`
}
