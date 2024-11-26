import { Hono } from "hono";
import { handle } from "hono/vercel";
import { html, Layout } from "@sapling/sapling";

const app = new Hono();

app.get("/", async (c) => {
  const time = new Date().toLocaleTimeString();
  return c.html(
    await Layout({
      title: "Home",
      description: "Welcome to Sapling",
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
            <a class="text-blue-500 hover:underline" href="https://hono.dev"
              >Hono</a
            >, and
            <a class="text-blue-500 hover:underline" href="https://nodejs.org"
              >Node.js</a
            >
          </p>
          <p class="text-base font-mono text-gray-500">
            It was server rendered at ${time} deployed on Vercel
          </p>
        </div>
      `,
    })
  );
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
