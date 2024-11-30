import { Sapling, serveStatic, Layout, html } from "@sapling/sapling";

const site = new Sapling();
// Home page
site.get("/", async (c) =>
  c.html(
    await Layout({
      head: html`
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
        ></script>
      `,
      bodyClass: "@dark:bg-[#1f1f1f] @dark:text-white",
      children: html`
        <div class="flex flex-col items-center justify-center h-screen">
          <div
            class="px-12 max-w-xl text-center flex flex-col items-center justify-center gap-6"
          >
            <h1 class="text-5xl font-bold">
              Sapling with
              <a class="underline" href="https://alpinejs.dev/" target="_blank"
                >Alpine.js</a
              >
            </h1>
            <p>
              The button below will increment a counter using Alpine.js.
            </p>
            <div x-data="{ count: 0 }">
              <button class="bg-[#77c1d2] text-white px-4 py-2 rounded" x-on:click="count++">Count <span x-text="count"></span></button>
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
