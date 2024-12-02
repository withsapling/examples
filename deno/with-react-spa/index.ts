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
          <div class="flex gap-4">
            <a class="border border-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100" href="/page">
              Sapling Page
            </a>
            <a class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" href="/app">
              Open App
            </a>
          </div>
        </div>
      `,
    })
  );
});

site.get("/page", async (c) => {
  return c.html(
    await Layout({
      head: html` <title>Sapling Page</title>`,
      children: html`
        <div
          class="px-12 flex flex-col justify-center items-center h-screen gap-4"
        >
          <h1 class="text-6xl font-bold">Sapling Page</h1>
          <a class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" href="/">
            Back to Home
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


site.setNotFoundHandler((c) => {
  // if the path starts with /app and is a 404, redirect to /app
  const url = new URL(c.req.url);
  const pathname = url.pathname;

  if (pathname.startsWith("/app")) {
    return c.redirect("/app");
  }
  // otherwise, redirect to home
  return c.redirect("/");
});

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: site.fetch,
});
