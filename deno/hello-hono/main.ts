import { Hono, type Context } from "@hono/hono";
import { html, Layout } from "@sapling/sapling";

const app = new Hono();

app.get("/", async (c: Context) => {
  const time = new Date().toLocaleTimeString();
  return c.html(
    await Layout({
      head: html` <title>Hello World 🌍</title> `,
      children: html`
      <div class="px-12 flex flex-col justify-center items-center h-screen gap-4">
        <h1 class="text-6xl font-bold">Hello World 🌍</h1>
        <p class="text-2xl">
          This is a site using
          <a class="text-blue-500" href="https://sapling.land">Sapling</a>,
          <a class="text-blue-500" href="https://hono.dev">Hono</a>, and
          <a class="text-blue-500" href="https://deno.com">Deno</a>
        </p>
        <p class="text-base font-mono text-gray-500">
          It was server rendered at ${time}
        </p>
      </div>
      `,
    }),
  );
});

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: app.fetch,
});
