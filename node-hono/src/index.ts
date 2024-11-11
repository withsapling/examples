import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { html, Layout } from "@sapling/sapling";

const app = new Hono();

app.get("/", async (c) => {
  const time = new Date().toLocaleTimeString();
  const page = await Layout({
    head: html`<title>Hello World 🌍</title>`,
  },
    html`
      <div class="flex flex-col justify-center items-center h-screen gap-4">
        <h1 class="text-6xl font-bold">Hello World 🌍</h1>
        <p class="text-2xl">
          This is a site using
          <a class="text-blue-500" href="https://sapling.build">Sapling</a>,
          <a class="text-blue-500" href="https://hono.dev">Hono</a>, and
          <a class="text-blue-500" href="https://nodejs.org">Node.js</a>
        </p>
        <p class="text-base font-mono text-gray-500">
          It was server rendered at ${time}
        </p>
      </div>
    `,
  );
  return c.html(page);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
