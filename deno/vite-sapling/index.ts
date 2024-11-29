import { Sapling, Layout, html, serveStatic } from "@sapling/sapling";

const site = new Sapling();

site.get("/", async (c) => {
  const time = new Date().toLocaleTimeString();

  return c.html(
    await Layout({
      head: html`
        <link rel="stylesheet" href="/main.css" />
        <script type="module" src="/scripts/index.js" defer></script>
      `,
      children: html`
        <div class="px-12 flex flex-col justify-center items-center h-screen">
          <div class="border-beam-container bg-white">
            <div class="border-beam"></div>
            <div class="flex flex-col justify-center items-center gap-4">
              <h1 class="text-5xl font-bold">Hello World 🌍</h1>
              <p class="text-2xl">
                This is a site using
                <a class="text-blue-500 hover:underline" href="https://sapling.build">Sapling</a>,
                <a class="text-blue-500 hover:underline" href="https://vitejs.dev">Vite</a>, and
                <a class="text-blue-500 hover:underline" href="https://deno.com">Deno</a>
              </p>
              <p class="text-base font-mono text-gray-500">
                It was server rendered at ${time}
              </p>
              <div class="flex flex-row gap-4">
                <button
                  id="confettiButton"
                  class="px-4 py-2 rounded border-2 border-black"
                >
                  Confetti Cannon 🎉
                </button>
                <button
                  id="countButton"
                  class="px-4 py-2 rounded border-2 bg-black text-white border-black"
                >
                  Click Count: <span id="count">0</span>
                </button>
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
