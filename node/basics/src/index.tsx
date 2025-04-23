import { Hono, type Context } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import NotFoundLayout from "./layouts/NotFoundLayout.js";
import { Home } from "./pages/Home.js";


const site = new Hono();

// Home page
site.get("/", (c: Context) => c.html(<Home />));
// Enter additional routes here

// Serve static files
// The location of this is important. It should be the last route you define.
site.get("*", serveStatic({ root: "./static" }));

// 404 Handler
site.notFound((c: Context) => c.html(<NotFoundLayout />));

const port = 8080;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: site.fetch,
  port,
});

