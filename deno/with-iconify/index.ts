import { Sapling, Layout, html } from "jsr:@sapling/sapling";

const site = new Sapling();

site.get("/", async (c) => {
  const time = new Date().toLocaleTimeString();
  return c.html(
    await Layout({
      head: html`
        <title>Hello World 🌍</title>
        <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
        <style>
          iconify-icon {
            display: inline-block;
            width: 1em;
            height: 1em;
          }
        </style>
      `,
      children: html`
        <div
          class="px-12 flex flex-col justify-center items-center h-screen gap-4"
        >
          <h1 class="text-6xl font-bold">Sapling with Iconify</h1>
          <p>The icons below are from Iconify</p>
          <div class="text-4xl flex gap-4">
            <iconify-icon icon="mdi:home"></iconify-icon>
            <iconify-icon icon="mdi:home-outline"></iconify-icon>
            <iconify-icon icon="mdi:home-variant"></iconify-icon>
          </div>
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
