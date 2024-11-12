
import { html, Layout } from "jsr:@sapling/sapling";

const handler = async () => {
  const time = new Date().toLocaleTimeString();
  const page = await Layout({
    head: html` <title>Hello World 🌍</title> `,
    children: html`
      <div class="flex flex-col justify-center items-center h-screen gap-4 text-center">
        <h1 class="text-6xl font-bold">Hello World 🌍</h1>
        <p class="text-2xl">
          This is a site using
          <a class="text-blue-500 hover:underline" href="https://sapling.build">Sapling</a> and
          <a class="text-blue-500 hover:underline" href="https://deno.com">Deno</a>
        </p>
        <p class="text-base font-mono text-gray-500">
          It was server rendered at ${time}
        </p>
      </div>
    `,
  });
  return new Response(page, {
    headers: { "Content-Type": "text/html" },
  });
};

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler,
});
