import dotenv from "dotenv";
import { Hono, type Context } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Home } from "./pages/Home.js";
import NotFoundLayout from "./layouts/NotFoundLayout.js";

dotenv.config();

const site = new Hono();

// Home page
site.get("/", async (c: Context) => c.html(await Home()));
// Enter additional routes here

// Serve static files
// The location of this is important. It should be the last route you define.
site.get(
  "/*",
  serveStatic({
    root: "./static",
  })
);

// Set the not found handler last to catch all 404s
site.notFound(async (c: Context) => c.html(await NotFoundLayout()));

const port = 8080;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: site.fetch,
  port,
});
