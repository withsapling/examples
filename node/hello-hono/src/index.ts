import { serve } from "@hono/node-server";
import { Hono, type Context } from "hono";
import { html, Layout } from "@sapling/sapling";

const app = new Hono();

app.get("/", async (c: Context) => {
  const time = new Date().toLocaleTimeString();
  const page = await Layout({
    head: html` <title>Hello World 🌍</title> `,
    children: html`
      <div
        class="px-12 flex flex-col justify-center items-center h-screen gap-4"
      >
        <h1 class="text-6xl font-bold">Hello World 🌍</h1>
        <p class="text-2xl">
          This is a site using
          <a class="text-blue-500 hover:underline" href="https://sapling.land"
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
          It was server rendered at ${time}
        </p>
        <form
          action="/"
          method="get"
          onsubmit="this.action=this.action+this.name.value"
          class="flex gap-2"
        >
          <input
            class="border border-gray-300 rounded-md px-2 py-1"
            placeholder="Enter a name"
            type="text"
            name="name"
          />
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-md"
            type="submit"
          >
            Say Hello
          </button>
        </form>
      </div>
    `,
  });

  return c.html(page.toString());
});

app.get("/:name", async (c: Context) => {
  const name = c.req.param("name");
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const time = new Date().toLocaleTimeString();
  const page = await Layout({
    head: html` <title>Hello ${capitalizedName} 🌍</title> `,
    children: html`
      <div
        class="px-12 flex flex-col justify-center items-center h-screen gap-4"
      >
        <h1 class="text-6xl font-bold">Hello ${capitalizedName} 🌍</h1>
        <p class="text-2xl">
          This is a site using
          <a class="text-blue-500 hover:underline" href="https://sapling.land"
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
          It was server rendered at ${time}
        </p>
        <a class="text-blue-500 hover:underline" href="/">Go back</a>
      </div>
    `,
  });

  return c.html(page.toString());
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
