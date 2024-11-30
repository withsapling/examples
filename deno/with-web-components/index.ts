import { Sapling, serveStatic, Layout, html } from "@sapling/sapling";

const site = new Sapling();
// Home page
site.get("/", async (c) =>
  c.html(
    await Layout({
      head: html`
        <script type="module" src="/scripts/VanillaCounter.js"></script>
        <script type="module" src="/scripts/LitCounter.js"></script>
      `,
      bodyClass: "@dark:bg-[#1f1f1f] @dark:text-white",
      children: html`
        <div class="flex flex-col items-center justify-center h-screen">
          <div
            class="px-12 max-w-xl text-center flex flex-col items-center justify-center gap-6"
          >
            <h1 class="text-3xl font-bold">
            <a class="underline" href="https://sapling.build" target="_blank">Sapling</a> 🤝 Web Components 
            </h1>
            <p>
              There are two web components below. One is a vanilla web component
              and the other is a web component built with <a class="underline" href="https://lit.dev" target="_blank">Lit</a>.
            </p>
            <div class="flex flex-col gap-4 items-center">
              <h2 class="text-2xl font-bold">Vanilla Web Component</h2>
              <vanilla-counter></vanilla-counter>
            </div>
            <div class="flex flex-col gap-4 items-center">
              <h2 class="text-2xl font-bold">Lit Web Component</h2>
              <lit-counter></lit-counter>
            </div>
          </div>
        </div>
      `,
    })
  )
);

// Serve static files
// The location of this is important. It should be the last route you define.
site.get(
  "/*",
  serveStatic({
    directory: "./static",
    // this will disable caching for static files in development
    // it is automatically passed in when you run deno task dev
    dev: Deno.env.get("ENV") === "development",
  })
);

Deno.serve({
  port: 8080,
  onListen: () =>
    console.log(
      `\nSapling Server is running on %chttp://localhost:8080\n`,
      "color: green; font-weight: bold"
    ),
  handler: site.fetch,
});
