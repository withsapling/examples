import { Sapling, Layout, html, Context } from "@sapling/sapling";

const site = new Sapling();

const kv = await Deno.openKv();


site.post("/items", async (c: Context) => {
  const form = await c.req.formData();
  const name = form.get("name")?.toString();
  const email = form.get("email")?.toString();
  const message = form.get("message")?.toString();
  const id = crypto.randomUUID();
  const key = ["items", id];
  const item = {
    id,
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };
  await kv.set(key, item);
  return c.redirect("/");
});

site.post("/items/:id/delete", async (c: Context) => {
  const id = c.req.param('id');
  const key = ["items", id];
  console.log(key);
  await kv.delete(key);
  return c.redirect("/");
});

site.get("/create-item", async (c: Context) => {
  return c.html(
    await Layout({
      head: html` <title>Create Item</title>`,
      children: html`
      <main class="p-12 max-w-screen-md mx-auto gap-4">
      <h1 class="mb-4 text-6xl font-bold">Create Item</h1>
      <form
      action="/items"
      method="post"
      class="flex flex-col gap-2"
    >
      <input
        class="border border-gray-300 rounded-md px-2 py-1"
        placeholder="Enter a name"
        type="text"
        name="name"
      />
      <input
        class="border border-gray-300 rounded-md px-2 py-1"
        placeholder="Enter an email"
        type="email"
        name="email"
      />
      <textarea
        rows="5"
        class="border border-gray-300 rounded-md px-2 py-1"
        placeholder="Enter a message"
        name="message"
      ></textarea>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md"
        type="submit"
      >
        Save Submission
          </button>
        </form>
      </main>
      `,
    })
  );
});

site.get("/", async (c: Context) => {
  const items: any[] = [];
  for await (const item of kv.list({ prefix: ["items"] })) {
    items.push(item.value);
  }
  return c.html(
    await Layout({
      head: html` <title>KV Items</title>`,
      children: html`
      <main class="p-12 max-w-screen-md mx-auto gap-4">
      <div class="flex justify-between items-center">
        <h1 class="mb-4 text-6xl font-bold">KV Items</h1>
        <a href="/create-item" class="bg-blue-500 text-white px-4 py-2 rounded-md">Create Item</a>
      </div>
      ${items.length > 0 ? html`<ul class="flex flex-col gap-4">
          ${items.map((item) => html`<li>
          <div class="border border-gray-300 rounded-md p-4">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-lg font-bold">Name: ${item.name}</p>  
                <p>Date: ${item.createdAt}</p>
              </div>
              <form action="/items/${item.id}/delete" method="post" class="ml-4">
                <button type="submit" class="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Delete</button>
              </form>
            </div>
            <p>Email: ${item.email}</p>
            <p>Message: ${item.message}</p>
          </div>
        </li>`)}
      </ul>` : html`<p>Currently no items</p>`}
      </main>
      `,
    })
  );
});


Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: site.fetch,
});
