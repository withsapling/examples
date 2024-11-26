import { Hono } from "@hono/hono";
import { html, Layout } from "@sapling/sapling";

const app = new Hono();

app.get("/", async (c) => {
  const time = new Date().toLocaleTimeString();
  const page = await Layout({
    head: html`<title>Hello World 🌍</title> `,
    children: html`
      <div class="px-12 flex flex-col justify-center items-center h-screen gap-4">
        <h1 class="text-6xl font-bold">Hello World 🌍</h1>
        <p class="text-2xl">
          This is a site using
          <a class="text-blue-500" href="https://sapling.build">Sapling</a>,
          <a class="text-blue-500" href="https://hono.dev">Hono</a>, and
          <a class="text-blue-500" href="https://bun.sh">Bun</a>
        </p>
        <p class="text-base font-mono text-gray-500">
          It was server rendered at ${time}
        </p>
      </div>`,
  });
  return c.html(page);
});

export default app;
