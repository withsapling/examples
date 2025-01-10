import { Sapling, Layout, html, type Context, type Next } from "jsr:@sapling/sapling";

const site = new Sapling();

// This is a middleware that sets the Cache-Control header
// This is useful for static assets that don't change often
// It's a good idea to set this for all static assets, but it's not necessary for all pages
const staticContentMiddleware = (c: Context, next: Next) => {
  // Cache for 1 day, but allow serving stale content for up to 1 week while revalidating in the background
  c.res.headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
  return next();
}

// you could use this globally with the line below
// site.use(staticContentMiddleware);

// or you could use it for a specific route
site.get("/", staticContentMiddleware, async (c: Context) => {
  const time = new Date().toLocaleTimeString();
  return c.html(
    await Layout({
      head: html` <title>Hello World 🌍</title>`,
      children: html`
        <div
          class="px-12 flex flex-col justify-center items-center h-screen gap-4"
        >
          <h1 class="text-6xl font-bold">Hello World 🌍</h1>
          <p class="text-2xl">
            This is a site using
            <a
              class="text-blue-500 hover:underline"
              href="https://sapling.land"
              >Sapling</a
            >
            and
            <a class="text-blue-500 hover:underline" href="https://deno.com"
              >Deno</a
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
    })
  );
});

site.get("/:name", async (c: Context) => {
  const name = c.req.param("name");
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const time = new Date().toLocaleTimeString();
  return c.html(
    await Layout({
      head: html`<title>Hello ${capitalizedName} 🌍</title>`,
      children: html`
        <div
          class="px-12 flex flex-col justify-center items-center h-screen gap-4"
        >
          <h1 class="text-6xl font-bold">Hello ${capitalizedName} 🌍</h1>
          <p class="text-2xl">
            This is a site using
            <a
              class="text-blue-500 hover:underline"
              href="https://sapling.land"
              >Sapling</a
            >
            and
            <a class="text-blue-500 hover:underline" href="https://deno.com"
              >Deno</a
            >
          </p>
          <p class="text-base font-mono text-gray-500">
            It was server rendered at ${time}
          </p>
          <a class="text-blue-500 hover:underline" href="/">Go back</a>
        </div>
      `,
    })
  );
});

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: site.fetch,
});
