import { html } from "jsr:@hono/hono/html";

export function BaseHead({
  title = "Sapling",
  description = "Sapling is a modern SSR framework for simpler modern websites",
}) {
  return html`
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta property="og:image" content="/social.png" />
    <style>
      :root {
        --color-primary: #000;
        --color-on-primary: #fff;
        --color-secondary: #fff;
      }
      ::selection {
        background-color: var(--color-primary);
        color: var(--color-on-primary);
      }
    </style>
  `;
}
