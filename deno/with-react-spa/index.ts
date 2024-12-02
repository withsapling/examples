import { Sapling, Layout, html, serveStatic } from "jsr:@sapling/sapling";

const site = new Sapling();

site.get("/", async (c) => {
  return c.html(
    await Layout({
      head: html` <title>Hello World 🌍</title>`,
      children: html`
        <div
          class="px-12 flex flex-col justify-center items-center h-screen gap-4"
        >
          <h1 class="text-6xl font-bold">Sapling & React SPA</h1>
          <a class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" href="/app">
            Open App
          </a>
        </div>
      `,
    })
  );
});

site.get("/*", serveStatic({
  directory: "./static",
  dev: true,
}));

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: site.fetch,
});
