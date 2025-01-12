import { Sapling, Layout, html, serveStatic } from "@sapling/sapling";

const site = new Sapling();

site.get("/", async (c) => {
  const time = new Date().toLocaleTimeString();

  return c.html(
    await Layout({
      head: html`
        <link rel="stylesheet" href="/main.css" />
        <script type="module" src="/scripts/index.js" defer></script>
        <script type="module" src="/scripts/counter.js" defer></script>
      `,
      children: html`
        <div class="px-12 flex flex-col justify-center items-center h-screen">
          <div class="border-beam-container bg-white">
            <div class="border-beam"></div>
            <div class="flex flex-col justify-center items-center gap-4 max-w-md">
              <h1 class="text-5xl font-bold">Hello World 🌍</h1>
              <p class="text-2xl">
                This is a site using
                <a class="text-blue-500 hover:underline" href="https://sapling.land">Sapling</a>,
                <a class="text-blue-500 hover:underline" href="https://vitejs.dev">Vite</a>, <a class="text-blue-500 hover:underline" href="https://reactjs.org">React</a> &amp;
                <a class="text-blue-500 hover:underline" href="https://deno.com">Deno</a>
              </p>
              <div class="flex flex-col gap-4">
                <p>What you see below is a React Counter component bundled with Vite.</p>
                <p>You obviously should <span class="font-bold">not</span> reach for React for something as simple as a counter. However, this is a proof of concept that you could include a complex React component in Sapling. You could also mix this with a <a class="text-blue-500 hover:underline" href="https://sapling.land/docs/sapling-island">sapling-island</a> component to defer the React script until the component is needed.</p>
                <div id="react-component"></div>
              </div>
            </div>
          </div>
        </div>
      `,
    })
  );
});

site.get(
  "/*",
  serveStatic({
    directory: "./static",
    dev: Deno.env.get("ENV") === "development",
  })
);

Deno.serve({
  port: 8080,
  onListen: () =>
    console.log(
      `\nSapling Server is running on %chttp://localhost:8080\n`,
      "color: green"
    ),
  handler: site.fetch,
});
