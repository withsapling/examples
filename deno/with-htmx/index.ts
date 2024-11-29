import { Sapling, serveStatic, Layout, html } from '@sapling/sapling'

const site = new Sapling();

/**
 * It's worth noting that you can't return a Sapling Layout component from an HTMX POST route.
 * This is because Sapling's Layout component adds the unoCSS classes to the head.
 * If you need to return a different class, you can define it in your own css file.
 */
site.post("/clicked", (c) => c.html(`<div class="bg-blue-500 text-white px-4 py-2 rounded">Clicked!</div>`));

// Home page
site.get("/", async (c) => c.html(await Layout({
  head: html`
    <script src="https://unpkg.com/htmx.org@2.0.3"></script>
`,
  children: html`
  <div class="flex flex-col items-center justify-center h-screen gap-4">
    <h1 class="text-2xl font-bold">Sapling with <a class="text-blue-500 hover:underline" href="https://htmx.org" target="_blank">HTMX</a></h1>
     <!-- have a button POST a click via AJAX -->
     <button class="bg-blue-500 text-white px-4 py-2 rounded" hx-post="/clicked" hx-swap="outerHTML">
     Click Me
   </button>
   </div>
    `,
})));

// Serve static files
// The location of this is important. It should be the last route you define.
site.get("/*", serveStatic({
  directory: "./static",
  // this will disable caching for static files in development
  // it is automatically passed in when you run deno task dev
  dev: Deno.env.get("ENV") === "development",
}));

Deno.serve({
  port: 8080,
  onListen: () =>
    console.log(
      `\nSapling Server is running on %chttp://localhost:8080\n`,
      "color: green; font-weight: bold"
    ),
  handler: site.fetch,
});
