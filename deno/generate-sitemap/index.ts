import { Sapling, Layout, html } from "jsr:@sapling/sapling";
import SitemapXml from "./sitemap.xml.ts";

const site = new Sapling();

site.get("/", async (c) => {
  const time = new Date().toLocaleTimeString();
  return c.html(
    await Layout({
      head: html` <title>Hello World 🌍</title>`,
      children: html`
        <div
          class="px-12 flex flex-col justify-center items-center h-screen gap-4"
        >
          <h1 class="text-6xl font-bold">Hello World 🌍</h1>
          <p class="text-2xl">
            This is a site using
            <a
              class="text-blue-500 hover:underline"
              href="https://sapling.build"
              >Sapling</a
            >
            and
            <a class="text-blue-500 hover:underline" href="https://deno.com"
              >Deno</a
            >
          </p>
          <p class="text-base font-mono text-gray-500">
            It was server rendered at ${time}
          </p>
          <a class="text-blue-500 hover:underline" href="/sitemap.xml">Go to Sitemap</a>
        </div>
      `,
    })
  );
});

site.get("/sitemap.xml", (c) => SitemapXml(c));

Deno.serve({
  port: 8080,
  onListen: () => console.log("\nSapling Server is running on %chttp://localhost:8080\n", "color: green; font-weight: bold"),
  handler: site.fetch,
});
