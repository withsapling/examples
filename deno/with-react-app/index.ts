import { Sapling, Layout, html, serveStatic, Context } from "jsr:@sapling/sapling";
import { cors } from "jsr:@sapling/sapling/cors";

const site = new Sapling();

site.use(cors());

site.get("/", async (c: Context) => {
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

site.post("/hello", async (c: Context) => {
  const formData = await c.req.formData();
  const name = formData.get("name") as string;
  return c.json({ message: `Hello, ${name}!` });
});

site.get("/page", async (c: Context) => {
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


// serve static files including the React app at static/app/
site.get("/*", serveStatic({
  directory: "./static",
  dev: true,
}));


site.setNotFoundHandler(async (c) => {
  // if the path starts with /app read the app's index.html and serve it
  // the client side router should have its own 404 handler
  const url = new URL(c.req.url);
  const pathname = url.pathname;
  if (pathname.startsWith("/app")) {
    return c.html(
      await Deno.readTextFile("./static/app/index.html")
    );
  }
  // otherwise, redirect to home
  return c.redirect("/");
});

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: site.fetch,
});
