import { Hono, type Context } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import NotFoundLayout from "./layouts/NotFoundLayout.tsx";
import { Home } from "./pages/Home.tsx";

const site = new Hono();

// Home page
site.get("/", (c: Context) => c.html(<Home />));
// Enter additional routes here

// Serve static files
// The location of this is important. It should be the last route you define.
site.get("*", serveStatic({ root: "./static" }));

// 404 Handler
site.notFound((c: Context) => c.html(<NotFoundLayout />));

Deno.serve({
  port: 8080,
  onListen: () =>
    console.log(
      `\nSapling Server is running on %chttp://localhost:8080\n`,
      "color: green; font-weight: bold"
    ),
  handler: site.fetch,
});
