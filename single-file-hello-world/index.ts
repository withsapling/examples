/// <reference lib="deno.ns" />
/// <reference lib="dom" />
import { Layout, html } from "jsr:@sapling/sapling";
import { Router, render } from "jsr:@sapling/router";
const router = new Router();

router.get("/", async () => {
  return render(
    await Layout({
      head: html`
        <title>Sapling</title>
        <meta name="description" content="A micro SSR framework" />
      `,
      bodyClass: "font-sans @dark:bg-black @dark:text-white transition-colors duration-200",
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
  handler: async (req) => await router.handle(req) ?? new Response(null, { status: 404 }),
});
