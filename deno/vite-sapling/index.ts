import { Layout, html } from "jsr:@sapling/sapling";
import { Router, serveStatic } from "jsr:@sapling/router";

const router = new Router();

router.get("/", async (c) => {
  const time = new Date().toLocaleTimeString();

  return c.html(
    await Layout({
      head: html`
        <script type="module" src="/scripts/index.js" defer></script>
      `,
      children: html`
        <div
          class="px-12 flex flex-col justify-center items-center h-screen gap-4"
        >
          <h1 class="text-6xl font-bold">Hello World 🌍</h1>
          <p class="text-2xl">
            This is a site using
            <a
              class="text-blue-500 hover:underline"
              href="https://sapling.build"
              >Sapling</a
            >,
            <a class="text-blue-500 hover:underline" href="https://vitejs.dev"
              >Vite (for client scripts)</a
            >, and
            <a class="text-blue-500 hover:underline" href="https://deno.com"
              >Deno</a
            >
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
              class="px-4 py-2 rounded border-2 border-black"
            >
              Click Count: <span id="count">0</span>
            </button>
          </div>
        </div>
      `,
    })
  );
});

router.get(
  "/*",
  serveStatic({
    directory: "./static",
    dev: Deno.env.get("ENV") === "development",
  })
);

Deno.serve({
  port: 8080,
  onListen: () => console.log(`\nSapling Server is running on %chttp://localhost:8080\n`, "color: green"),
  handler: router.fetch,
});