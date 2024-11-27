import { html } from "@sapling/sapling";
import { Router, serveStatic } from "@sapling/router";
import Layout from "./layouts/Layout.ts";
import NotFoundLayout from "./layouts/NotFoundLayout.ts";

const router = new Router();

// Home page
router.get("/", async (c) => {
  return c.html(
    await Layout({
      title: "Home",
      description: "Welcome to Sapling",
      children: html`
        <main class="max-w-screen-lg min-h-screen mx-auto px-4 py-16 flex flex-col items-center justify-center font-sans @dark:bg-black @dark:text-white">
          <h1 class="text-4xl font-bold">Welcome to Sapling</h1>
        </main>
      `,
    }),
  );
});

// Blog page
router.get("/blog", async (c) => {
  return c.html(
    await Layout({
      title: "Blog",
      description: "Blog posts",
      children: html`<h1>Blog</h1>`,
    }),
  );
});

// Enter additional routes below


// Serve static files
// The location of this is important. It should be the last route you define.
router.get("/*", serveStatic({
  directory: "./static",
}));

// 404 Handler
router.setNotFoundHandler(async (c) => c.html(await NotFoundLayout()));

Deno.serve({
  port: 8080,
  onListen: () => console.log("Server is running on http://localhost:8080"),
  handler: router.fetch,
});
