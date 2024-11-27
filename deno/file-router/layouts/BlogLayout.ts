import { html, raw } from "@sapling/sapling";
import BaseLayout from "./BaseLayout.ts";
import { renderMarkdown } from "@sapling/markdown";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  content: string;
  draft: boolean;
  bodyClass?: string;
}

export default async function BlogLayout(props: BlogPost) {
  const mdHtml = await renderMarkdown(props.content);
  const publishedAtDate = new Date(props.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return await BaseLayout({
    bodyClass:
      `bg-white @dark:bg-black text-gray-900 @dark:text-white font-sans ${props.bodyClass}`,
    head: html`
      <meta name="robots" content="noindex" />
      <style>
        .copy-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          z-index: 10;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          color: #666;
        }
        .code-block-wrapper {
          position: relative;
          margin: 1rem 0;
        }

        .prose pre {
          width: 100%;
          display: flex;
          height: auto;
          position: relative;
          background: #f8f9fa;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 0;
          max-width: 768px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .prose pre code {
          display: block;
          padding: 0;
          overflow-x: auto;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            monospace;
          width: 100%;
        }

        /* Handle HTML entities and preserve formatting */
        .prose pre code::before {
          content: none;
        }

        .prose pre code::after {
          content: none;
        }

        /* Force line breaks to be preserved */
        .prose pre code br {
          display: block;
          content: "";
          margin-top: 0.25em;
        }
        .prose pre copy-code-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          color: #000;
        }
        @media (prefers-color-scheme: dark) {
          /* .prose pre {
            background: #1a1b1e;
          } */
        }
      </style>
    `,
  }, html`<main class="w-full max-w-prose mx-auto overflow-hidden">
      <a
        href="/blog"
        class="mt-4 ml-4 text-md flex items-center gap-2 group hover:gap-1 transition-[gap]"
      >
        <iconify-icon
          icon="mdi:arrow-left"
          class="group-hover:-translate-x-1 transition-transform"
        ></iconify-icon>
        Back to Blog</a
      >
      <article class="px-4 py-8">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-heading break-words">${props.title}</h1>
        <p class="text-gray-500 text-sm mb-4">
          Published on ${publishedAtDate}
        </p>
        <div class="prose prose-lg max-w-none w-full overflow-hidden">
          ${raw(mdHtml)}
        </div>
      </article>
    </main>`,
  );
}
