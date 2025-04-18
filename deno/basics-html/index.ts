import { Hono, type Context } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import NotFoundLayout from "./layouts/NotFoundLayout.ts";
import { Home } from "./pages/Home.ts";

const site = new Hono();

// Home page
site.get("/", async (c: Context) => c.html(await Home()));
// Enter additional routes here

// Serve static files
// The location of this is important. It should be the last route you define.
site.get("*", serveStatic({ root: "./static" }));

// 404 Handler
site.notFound(async (c) => c.html(await NotFoundLayout()));

Deno.serve({
  port: 8080,
  onListen: () =>
    console.log(
      `\nSapling Server is running on %chttp://localhost:8080\n`,
      "color: green; font-weight: bold"
    ),
  handler: site.fetch,
});
