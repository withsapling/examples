
import { Sapling, Layout, html, serveStatic, type Context } from "@sapling/sapling";
import ThousandIslandPage from "./thousand-island.ts";
import TenThousandIslandPage from "./ten-thousand-island.ts";
const site = new Sapling({
  dev: true,
});

site.get("/", async (c: Context) => {
  return c.html(
    await Layout({
      head: html` <title>Sapling Island Demo 🏝️</title>
      <!-- Sapling Island loaded from the CDN -->
      <script type="module" src="https://sapling-is.land"></script>
      <style>
        sapling-island {
          display: contents;
        }
        sapling-island[hydrated] p, sapling-island[hydrated] div.content {
          border: 2px dotted red;
          padding: 1rem;
        }
      </style>
      `,
      children: html`
        <div
          class="py-4 px-12 flex flex-col justify-center items-center gap-4"
        >
          <h1 class="text-6xl font-bold">Sapling Island 🏝️</h1>
          <p>This is an island that will hydrate when the width is greater than 1024px</p>
          <sapling-island loading="(min-width: 1024px)">
            <p class="text-2xl font-bold">Sapling Island 🏝️</p>
          </sapling-island>
          <p>This is an island that will hydrate when the width is less than 1024px</p>
          <sapling-island loading="(max-width: 1024px)">
            <p class="text-2xl font-bold">Sapling Island 🏝️</p>
          </sapling-island>
          <p>This is an island that will hydrate as soon as the page loads</p>
          <sapling-island loading="onload">
            <p class="text-2xl font-bold">Sapling Island 🏝️</p>
          </sapling-island>
          <p>This is an island that will hydrate when the page is idle (you likely can't see the difference)</p>
          <sapling-island loading="idle">
            <p class="text-2xl font-bold">Sapling Island 🏝️</p>
          </sapling-island>
          <h2 class="text-2xl font-bold">1000 Island Test</h2>
          <a class="bg-blue-500 text-white px-4 py-2 rounded-md" href="/thousand-island">Click here to see a page with 1000 islands 😉</a>
          <a class="bg-blue-500 text-white px-4 py-2 rounded-md" href="/ten-thousand-island">Click here to see a page with 10000 islands 🤯</a>
          <p>Keep scrolling to see an island that needs to be in view to hydrate</p>
          <div class="h-[1000px]"></div>

          <sapling-island loading="visible">
          <!-- This template tag is use to keep the script tag from being executed until the island is hydrated -->
            <template>
              <script>
                const time = document.querySelector("time");
                setInterval(() => {
                  time.textContent = new Date().toLocaleTimeString();
                }, 1000);
              </script>
            </template>
            <div class="content">
              <p class="text-2xl font-bold">Sapling Island 🏝️</p>
              <p>The time should update every second after the island is hydrated</p>
              <p>The time is <time>00:00</time></p>
            </div>
          </sapling-island>
        </div>
      `,
    })
  );
});

site.get("/thousand-island", async (c: Context) => {
  return c.html(await ThousandIslandPage());
});

site.get("/ten-thousand-island", async (c: Context) => {
  return c.html(await TenThousandIslandPage());
});

site.get("/*", serveStatic({
  directory: "./static",
}));

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: site.fetch,
});
