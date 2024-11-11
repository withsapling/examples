import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { html, Layout } from "jsr:@sapling/sapling";

const router = new Router();

router.get("/", async (ctx) => {
  const time = new Date().toLocaleTimeString();
  const page = await Layout({
    head: html` <title>Hello World 🌍</title> `,
  }, html`
      <div class="flex flex-col justify-center items-center h-screen gap-4">
        <h1 class="text-6xl font-bold">Hello World 🌍</h1>
        <p class="text-2xl">
          This is a site using
          <a class="text-blue-500" href="https://sapling.build">Sapling</a>,
          <a class="text-blue-500" href="https://jsr.io/@oak/oak">Oak</a>, and
          <a class="text-blue-500" href="https://deno.com">Deno</a>
        </p>
        <p class="text-base font-mono text-gray-500">
          It was server rendered at ${time}
        </p>
      </div>
    `,
  );
  // set the content type to html
  ctx.response.type = "text/html";
  // set the body to the page and trim whitespace
  ctx.response.body = page.toString().trim();
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", () => {
  console.log("Server started on http://localhost:8080");
});

app.listen({ port: 8080 });
