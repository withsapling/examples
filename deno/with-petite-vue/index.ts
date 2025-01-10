import { Sapling, Layout, html } from "jsr:@sapling/sapling";

const site = new Sapling();

site.get("/", async (c) => {
  const time = new Date().toLocaleTimeString();
  return c.html(
    await Layout({
      head: html`
        <title>Hello World 🌍</title>
        <script src="https://unpkg.com/petite-vue" defer init></script>
      `,
      children: html`
        <div
          class="max-w-screen-md mx-auto px-12 flex flex-col justify-center items-center h-screen gap-4 text-center"
        >
          <h1 class="text-6xl font-bold">Sapling & Petite Vue</h1>
          <p>
            This is a simple example of how to use Sapling with Petite Vue. The
            counter below is using Vue but the styles are using UnoCSS generated
            in the Sapling layout.
          </p>
          <div class="flex flex-col gap-2" v-scope="{ count: 0 }">
            <p   class="text-2xl font-mono font-bold">{{ count }}</p>
            <div class="flex gap-2">
              <button
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              @click="count--">
                Decrement -
              </button>
              <button
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            @click="count++">
                Increment +
              </button>
            </div>
          </div>
        </div>
      `,
    })
  );
});

site.get("/:name", async (c) => {
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
