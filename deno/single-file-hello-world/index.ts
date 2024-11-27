import { Layout, html } from "jsr:@sapling/sapling";
import { Router } from "jsr:@sapling/router";

const router = new Router();

router.get("/", async (c) => {
  return c.html(
    await Layout({
      children: html`
        <main class="max-w-screen-lg min-h-screen mx-auto px-4 py-16 flex flex-col items-center justify-center font-sans">
          <h1 class="text-4xl font-bold">Hello World</h1>
        </main>
      `,
    }),
  );
});

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: router.fetch,
});
