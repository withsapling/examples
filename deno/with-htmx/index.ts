import { Sapling, serveStatic, Layout, html } from '@sapling/sapling'

const site = new Sapling();

/**
 * It's worth noting that you can't return a Sapling Layout component from an HTMX POST route.
 * This is because Sapling's Layout component is a fully rendered html document.
 * If you need to return HTML with a custom class, you can define it in your own css file(s).
 */
site.post("/clicked", (c) => c.html(`<div class="htmx-request">Hello! -Server</div>`));

// Home page
site.get("/", async (c) => c.html(await Layout({
  head: html`
    <script src="https://unpkg.com/htmx.org@2.0.3"></script>
    <style>
      .htmx-request {
        border: 1px solid red;
        padding: 1rem;
        border-radius: 0.5rem;
      }
    </style>
`,
  bodyClass: "@dark:bg-[#1f1f1f] @dark:text-white",
  children: html`
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="px-12 max-w-xl text-center flex flex-col items-center justify-center gap-6">
    <h1 class="text-5xl font-bold">Sapling with <a class="underline" href="https://htmx.org" target="_blank">htm<span class="text-blue-500">x</span></a></h1>
    <p>The button below will POST a click via AJAX to the server and swap the button with the response from the server.</p>
     <!-- have a button POST a click via AJAX -->
     <button class="bg-blue-500 text-white px-4 py-2 rounded" hx-post="/clicked" hx-swap="outerHTML">
     Say "Hi" to the server
   </button>
   </div>
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
